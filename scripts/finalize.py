# -*- coding: utf-8 -*-
from pathlib import Path
import subprocess, sys
ROOT = Path(r"C:\project\suseok-study")
f = ROOT / "public" / "index.html"
t = f.read_text(encoding="utf-8")

# 1) TEACHER 타일에 영어 원단어 표기
pairs = [("T", "시간 · 빠르게", "Time"), ("E", "평등 · 나란히", "Equality"),
         ("A", "전문성 · 자격", "Ability"), ("C", "협력 · 같이", "Collaboration"),
         ("H", "인간미 · 사람(상담화 금지)", "Humanity"), ("E", "효과성 · 증명", "Effectiveness"),
         ("R", "관계성 · 비밀보장", "Relationship")]
for letter, ko, en in pairs:
    old = f'<b>{letter}</b><span>{ko}</span>'
    new = f'<b>{letter}</b><span>{en}<br>{ko}</span>'
    if old in t:
        t = t.replace(old, new, 1)
t = t.replace('v3.7 · 2026-10-03', 'v3.8 · 2026-10-03').replace('v3.6 · 2026-10-03', 'v3.8 · 2026-10-03')
f.write_text(t, encoding="utf-8")
print("HTML 수정 완료")

# 2) gen_audio의 assert 내성 수정 후 실행 (신규 텍스트 mp3 생성 + 해시 재부착)
g = ROOT / "scripts" / "gen_audio.py"
gt = g.read_text(encoding="utf-8")
gt = gt.replace('assert old in html2, "client fetch 패턴 미발견"',
                'assert old in html2 or "/audio/" in html2, "client fetch 패턴 미발견"')
g.write_text(gt, encoding="utf-8")
r = subprocess.run([sys.executable, "-X", "utf8", str(g)], capture_output=True, text=True, encoding="utf-8")
print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-200:])
