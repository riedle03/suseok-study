# -*- coding: utf-8 -*-
import re
from pathlib import Path
f = Path(r"C:\project\suseok-study\public\index.html")
t = f.read_text(encoding="utf-8")
pat = re.compile(r'fetch\("/audio/".*?new Audio\(URL\.createObjectURL\(blob\)\)\.play\(\)', re.S)
new = ('fetch("/audio/"+(b.dataset.h||"")+".mp3")'
       '.then(function(r){if(!r.ok)throw new Error("no-mp3");return r.blob()})'
       '.then(function(blob){b.classList.remove("busy");new Audio(URL.createObjectURL(blob)).play()})'
       '.catch(function(e){b.classList.remove("busy");bs(txt)})')
t2, n = pat.subn(new, t, count=1)
t2 = t2.replace("v3.3 · 2026-10-03", "v3.4 · 2026-10-03")
f.write_text(t2, encoding="utf-8")
print("교체:", n)
