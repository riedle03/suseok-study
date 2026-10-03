# -*- coding: utf-8 -*-
# mp3 사전 생성 → public/audio/ + index.html에 해시 부착 (커밋·배포용, 런타임 API 호출 0회)
import hashlib, json, re, time
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(r"C:\project\suseok-study")
KEY = (Path(r"C:\Users\lovyu\AppData\Local\eohaksil-secrets\elevenlabs.key").read_text(encoding="utf-8").strip())
HTML = ROOT / "public" / "index.html"
AUD = ROOT / "public" / "audio"
AUD.mkdir(exist_ok=True)
html = HTML.read_text(encoding="utf-8")

# 카드 텍스트 추출: 각 say 버튼의 소속 card를 div 카운팅으로 정확히 찾음
texts = []
for m in re.finditer(r'<button class="say"', html):
    s = html.rfind('<div class="card">', 0, m.start())
    i = s; d = 0
    while True:
        mo = re.search(r'<div\b|</div>', html[i:])
        i += mo.end(); d += 1 if mo.group(0).startswith('<div') else -1
        if d == 0: break
    seg = html[s:i]
    t = re.sub(r'<button class="say".*?</button>', '', seg, flags=re.S)
    t = re.sub(r'<[^>]+>', ' ', t); t = re.sub(r'\s+', ' ', t).strip()
    texts.append(t)
say_btns = re.findall(r'<button class="say"[^>]*>[^<]*</button>', html)
assert len(say_btns) == len(texts), (len(say_btns), len(texts))

def tts(text, sha):
    models = ["eleven_v4", "eleven_v3", "eleven_multilingual_v2"]
    for m in models:
        req = Request("https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
            data=json.dumps({"text": text[:900], "model_id": m}).encode(),
            headers={"xi-api-key": KEY, "Content-Type": "application/json"})
        try:
            r = urlopen(req, timeout=120)
            if r.status == 200:
                (AUD / (sha + ".mp3")).write_bytes(r.read())
                return m
        except Exception as e:
            print("  폴백:", m, str(e)[:80])
    raise SystemExit("TTS 실패: " + text[:40])

out, idx = [], 0
for t in texts:
    if not t:
        continue
    sha = hashlib.sha1(t.encode()).hexdigest()[:16]
    f = AUD / (sha + ".mp3")
    if not f.exists():
        m = tts(t, sha)
        print(f"{idx+1}. 생성 ({m}): {t[:36]}…")
        time.sleep(0.4)
    else:
        print(f"{idx+1}. 기존 재사용: {t[:36]}…")
    out.append((sha, t))
    idx += 1

# .say 버튼에 data-h 부착 (순서 일치)
it = iter(out)
def repl(m):
    sha, _ = next(it)
    return f'<button class="say" data-h="{sha}">🔊</button>'
html2 = re.sub(r'<button class="say"[^>]*>[^<]*</button>', repl, html)

# 클라이언트: 정적 mp3 우선, 404면 /api/tts 폴백
old = 'fetch("/api/tts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:txt})})'
new = 'fetch("/audio/"+(b.dataset.h||"")+".mp3").then(function(r){if(!r.ok)throw 0;return r.blob()}).catch(function(){return fetch("/api/tts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:txt})}).then(function(r){return r.blob()})})'
assert old in html2 or "/audio/" in html2, "client fetch 패턴 미발견"
html2 = html2.replace(old, new)
HTML.write_text(html2, encoding="utf-8")
print("완료: mp3", idx, "개, index.html 해시 부착")
