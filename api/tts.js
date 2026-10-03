// Vercel Serverless — ElevenLabs TTS with cache (/tmp + 메모리)
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const cacheDir = "/tmp/tts-cache";
try { fs.mkdirSync(cacheDir, { recursive: true }); } catch (e) {}
const mem = {};
module.exports = async (req, res) => {
  if (req.method === "OPTIONS") return res.status(204).end();
  const { text } = req.method === "POST" ? req.body : {};
  const key = process.env.ELEVEN_API_KEY;
  if (!key) return res.status(500).json({ ok: false, err: "ELEVEN_API_KEY 미설정" });
  const hash = crypto.createHash("sha1").update(text || "").digest("hex");
  const file = path.join(cacheDir, hash + ".mp3");
  if (mem[hash]) return send(res, mem[hash]);
  try {
    if (fs.existsSync(file)) {
      const buf = fs.readFileSync(file);
      mem[hash] = buf;
      return send(res, buf);
    }
  } catch (e) {}
  const models = ["eleven_v4", "eleven_v3", "eleven_multilingual_v2"];
  let lastErr = "";
  for (const m of models) {
    try {
      const r = await fetch("https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL", {
        method: "POST",
        headers: { "xi-api-key": key, "Content-Type": "application/json" },
        body: JSON.stringify({ text: String(text).slice(0, 900), model_id: m })
      });
      if (r.ok) {
        const buf = Buffer.from(await r.arrayBuffer());
        try { fs.writeFileSync(file, buf); } catch (e) {}
        mem[hash] = buf;
        return send(res, buf);
      }
      lastErr = m + " HTTP" + r.status + " " + (await r.text()).slice(0, 140);
    } catch (e) { lastErr = m + " " + e; }
  }
  res.status(502).json({ ok: false, err: lastErr });
};
function send(res, buf) {
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", "public, max-age=31536000");
  res.status(200).send(buf);
}
