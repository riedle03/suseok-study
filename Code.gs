var VERSION="v2.2 · 2026-10-03";
function doGet(){return HtmlService.createHtmlOutput(HTML_().replace("__VER__",VERSION)).setTitle("수석교사 준비 학습실").addMetaTag("viewport","width=device-width,initial-scale=1");}
function tts(t){var k=PropertiesService.getScriptProperties().getProperty("ELEVEN_API_KEY");if(!k)return{ok:false,err:"키 없음(ELEVEN_API_KEY)"};var e="",ms=["eleven_v4","eleven_v3","eleven_multilingual_v2"];for(var i=0;i<ms.length;i++){try{var r=UrlFetchApp.fetch("https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",{method:"post",contentType:"application/json",headers:{"xi-api-key":k},payload:JSON.stringify({text:String(t).slice(0,900),model_id:ms[i]}),muteHttpExceptions:true});if(r.getResponseCode()==200)return{ok:true,a:Utilities.base64Encode(r.getBlob().getBytes())};e=ms[i]+" HTTP"+r.getResponseCode()+" "+r.getContentText().slice(0,120);}catch(x){e=ms[i]+" "+x;}}return{ok:false,err:e};}
function HTML_(){return `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>수석교사 준비 학습실</title>
<style>
:root{--ink:#1a2136;--sub:#66708a;--ln:#e4e8f1;--bl:#2c5ce6;--tint:#eef2ff;--bg:#f8f9fd;--ok:#0e8a52;--bad:#c9403a}
*{box-sizing:border-box;margin:0}html{font-size:17px}
body{font-family:Pretendard,"Apple SD Gothic Neo","Malgun Gothic",sans-serif;background:var(--bg);color:var(--ink);line-height:1.75}
header{background:linear-gradient(135deg,#101c3a,#2c5ce6);color:#fff;text-align:center;padding:44px 20px 34px}header h1{font-size:1.8rem}header p{opacity:.9;margin-top:6px}
.ver{display:inline-block;margin-top:10px;font-size:.72rem;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.4);border-radius:999px;padding:3px 12px}
main{max-width:820px;margin:0 auto;padding:18px 20px 80px}
nav{position:sticky;top:0;z-index:9;display:flex;gap:6px;overflow-x:auto;background:var(--bg);padding:12px 0;border-bottom:1px solid var(--ln)}nav::-webkit-scrollbar{display:none}
nav button{flex:0 0 auto;border:1px solid var(--ln);background:#fff;border-radius:999px;padding:9px 16px;font-size:.9rem;cursor:pointer}nav button.on{background:var(--bl);color:#fff;border-color:var(--bl);font-weight:700}
h2{font-size:1.45rem;margin:30px 0 4px;font-weight:800}.hint{color:var(--sub);font-size:.9rem;margin-bottom:12px}
.card{background:#fff;border:1px solid var(--ln);border-radius:16px;padding:20px;margin:13px 0;box-shadow:0 1px 3px rgba(20,30,60,.05)}
.kw{background:#fff1c9;border-radius:5px;padding:1px 6px;font-weight:700}
.mono{font-family:ui-monospace,Consolas,monospace;background:#f4f6fb;border-radius:12px;padding:15px;white-space:pre-wrap;line-height:1.9;font-size:.92rem}
.say{border:1.5px solid var(--bl);color:var(--bl);background:#fff;border-radius:999px;padding:6px 15px;font-size:.84rem;cursor:pointer;margin-top:10px}
input.bf{border:0;border-bottom:2.5px solid var(--bl);outline:none;font:inherit;width:120px;background:#fff9e6;text-align:center}
label.opt{display:block;border:1.5px solid var(--ln);border-radius:12px;padding:11px 14px;margin:7px 0;cursor:pointer}label.opt:hover{border-color:var(--bl);background:var(--tint)}
.res{font-weight:700;margin-top:8px;min-height:1.3em}.res.ok{color:var(--ok)}.res.bad{color:var(--bad)}
.exp{display:none;background:var(--tint);border-left:4px solid var(--bl);padding:11px 13px;border-radius:0 10px 10px 0;font-size:.92rem;margin-top:9px}
.chk{background:var(--bl);color:#fff;border:0;border-radius:12px;padding:10px 20px;font-size:.98rem;font-weight:700;cursor:pointer;margin-top:9px}
footer{text-align:center;color:var(--sub);font-size:.8rem;padding:24px}
section{display:none}section.on{display:block}
</style></head><body>
<header><h1>수석교사 준비 학습실</h1><p>수업컨설팅 · 개념 → 최신 논문 → 문제 → 면접</p><span class="ver">__VER__</span></header>
<main><nav id="nv"></nav>
<section id="s0"><h2>수업컨설팅이란</h2><p class="hint">정의 · 구별 · 원리 · 절차</p>
<div class="card"><b>한 문장 정의</b> — <span class="kw">교사가 자발적으로 의뢰</span>하고, 전문가가 수평적 관계에서 진단·조언하며, <span class="kw">최종 선택·책임은 교사</span>에게 남는 수업 개선 전문 자문 활동 <button class="say">🔊 듣기</button></div>
<div class="card"><b>삼형제</b> — 장학=건강검진(위계) / 코칭=<span class="kw">교사</span> 전문성이 궁극 / 컨설팅=<span class="kw">학습자</span> 문제 개선이 최우선 · "이름만 바뀐 수업장학 금지" <button class="say">🔊 듣기</button></div>
<div class="card"><b>6원리 "자전돌 자한학"</b> — <span class="kw">자발성·전문성·독립성·자문성·한시성·학습성</span> <button class="say">🔊 듣기</button></div>
<div class="card"><b>절차(이상수 2010)</b><div class="mono">협력관계 형성 → 수행분석 → 원인분석 → 개입안 설계·실행 → 협력적 평가 (↺)</div>원인은 교사 한 변인에만 있지 않다</div></section>
<section id="s1"><h2>TEACHER 원리</h2><p class="hint">컨설턴트 행동 강령 (오영범 외 2014)</p>
<div class="card"><div class="mono">T 시간 — 빠르게(부담=저항 1원인) · E 평등 — 나란히(서비스)
A 전문성 — 5영역 체계 접근 · C 협력 — 실천 주체는 교사
H 인간미 — 래포, 단 상담화 금지 · E 효과성 — 데이터·증거 기반
R 관계성 — 비밀보장</div><button class="say">🔊 듣기</button></div></section>
<section id="s2"><h2>최신 핵심 논문</h2><p class="hint">2024~2025</p>
<div class="card"><b>신진주·임정훈(2024)</b> 271편 메타 — 발전기 <span class="kw">2010(142편)</span>=수석교사제·컨설팅장학 제도화 / <span class="kw">중등 23.5%·국어 5.7%</span> / 실험연구 4.9% <button class="say">🔊 듣기</button></div>
<div class="card"><b>권희청 외(2021)</b> — 전문성=<span class="kw">황금열쇠</span> · 선택·책임=컨설티 · <span class="kw">한 번으로도 충분</span> <button class="say">🔊 듣기</button></div>
<div class="card"><b>박일수(2024)</b> — 역량 3차원: <span class="kw">교직소양·일반역량·직무역량</span> × 학생교육·교사지원 × 지식·기능·태도 <button class="say">🔊 듣기</button></div>
<div class="card"><b>임다미 외(2025)</b> — 적응·성장·발전·<span class="kw">나눔기</span> / 나눔기="컨설팅·코칭 전략" <button class="say">🔊 듣기</button></div>
<div class="card"><b>이영주 외(2025)</b> — AI는 대체가 아니라 <span class="kw">성찰 역량 증강</span> <button class="say">🔊 듣기</button></div></section>
<section id="s3"><h2>자기수업컨설팅 · 3층 역할</h2>
<div class="card"><div class="mono">zoom out(되돌아보기) 큰 그림·상호작용·원인
zoom in(들여다보기) 4요소: 교사·학생·내용·환경
action(새롭게 경험하기) 적용</div><button class="say">🔊 듣기</button></div>
<div class="card"><b>3층 역할</b> ①직접 지원 ②<span class="kw">역량 이전</span>(동료가 AI로 자기수업컨설팅을 스스로) ③시스템화 <button class="say">🔊 듣기</button></div></section>
<section id="s4"><h2>빈칸 채우기</h2><p class="hint">틀리면 1회 재시도 → 정답·해설</p>
<div class="q" data-ans="컨설티"><div class="card">최종 선택과 책임은 <input class="bf" data-k="컨설티">에게 남는다(자문성). <button class="chk">채점</button><div class="res"></div><div class="exp">자문성 — 조언하되 선택·책임은 의뢰 교사가 진다(이재덕 2013).</div></div></div>
<div class="q" data-ans="나눔기"><div class="card">임다미 외(2025) 4단계의 마지막은 <input class="bf" data-k="나눔기">이다. <button class="chk">채점</button><div class="res"></div><div class="exp">나눔기 = 협력적 문제 해결을 위한 컨설팅·코칭 전략 단계.</div></div></div>
<div class="q" data-ans="H"><div class="card">TEACHER에서 개인 상담화를 금지하는 원리는 <input class="bf" data-k="H">(인간미)이다. <button class="chk">채점</button><div class="res"></div><div class="exp">H 인간미 — 래포는 형성하되 상담가 역할과 구분.</div></div></div></section>
<section id="s5"><h2>선다형</h2><p class="hint">5지선다 · 재시도 후 정답·해설</p>
<div class="q" data-ans="3"><div class="card">수업컨설팅의 원리가 아닌 것은?<div class="opts">
<label class="opt"><input type="radio" name="a">자발성</label><label class="opt"><input type="radio" name="a">전문성</label><label class="opt"><input type="radio" name="a">감독성</label><label class="opt"><input type="radio" name="a">한시성</label><label class="opt"><input type="radio" name="a">학습성</label></div>
<button class="chk">채점</button><div class="res"></div><div class="exp">6원리는 자발·전문·독립·자문·한시·학습 — 감독은 장학의 속성.</div></div></div>
<div class="q" data-ans="2"><div class="card">코칭과 컨설팅의 목적 차이로 옳은 것은?<div class="opts">
<label class="opt"><input type="radio" name="b">코칭=학습자 문제</label><label class="opt"><input type="radio" name="b">코칭=교사 전문성 궁극, 컨설팅=학습자 문제 최우선</label><label class="opt"><input type="radio" name="b">둘 다 장학</label><label class="opt"><input type="radio" name="b">컨설팅은 질문만 한다</label><label class="opt"><input type="radio" name="b">차이가 없다</label></div>
<button class="chk">채점</button><div class="res"></div><div class="exp">Denton &amp; Hasbrouk(홍성연·전영미 2013 재인용).</div></div></div></section>
<section id="s6"><h2>면접 스크립트</h2>
<div class="card"><b>15초 · 개념</b><br>"수업컨설팅은 교사가 자발적으로 의뢰하고, 전문성을 갖춘 컨설턴트가 수평적 관계에서 진단해 대안을 제시하되 최종 선택과 책임은 교사에게 남는 활동입니다. 저는 답을 주는 사람이 아니라 교사가 자기 해답을 찾도록 자료와 질문을 설계하는 컨설턴트가 되겠습니다." <button class="say">🔊 듣기</button></div>
<div class="card"><b>30초 · 4편 연결</b><br>"신진주·임정훈(2024)에 따르면 수업컨설팅 연구는 수석교사제가 시행된 2010년에 폭발했지만 중등과 국어는 아직 공백입니다. 권희청 외(2021)는 전문성이 황금열쇠이고 선택·책임은 교사에게 있다고 했습니다. 박일수(2024)는 역량을 교직소양·일반역량·직무역량으로, 임다미 외(2025)는 나눔기의 역할을 컨설팅·코칭으로 규정했습니다. 저는 이 연구들이 가리키는 자리 — 중등 직업계고 국어, 나눔기의 컨설팅 — 을 수석교사로 채우겠습니다." <button class="say">🔊 듣기</button></div></section>
<footer>2027 수석교사 준비 · __VER__</footer></main>
<script>
var T=[["s0","개념"],["s1","TEACHER"],["s2","최신 논문"],["s3","자기수업컨설팅"],["s4","빈칸"],["s5","선다형"],["s6","면접"]],nv=document.getElementById("nv");
T.forEach(function(t,i){var b=document.createElement("button");b.textContent=t[1];b.onclick=function(){document.querySelectorAll("section").forEach(function(s){s.classList.remove("on")});document.getElementById(t[0]).classList.add("on");nv.querySelectorAll("button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");window.scrollTo(0,0)};if(i==0){b.classList.add("on");document.getElementById(t[0]).classList.add("on")}nv.appendChild(b)});
function bs(t){var u=new SpeechSynthesisUtterance(t);u.lang="ko-KR";speechSynthesis.cancel();speechSynthesis.speak(u)}
document.addEventListener("click",function(e){
 if(e.target.classList&&e.target.classList.contains("say")){var b=e.target,c=b.closest(".card").cloneNode(true);c.querySelectorAll(".say").forEach(function(x){x.remove()});var txt=c.innerText.trim();b.classList.add("busy");
  google.script.run.withSuccessHandler(function(r){b.classList.remove("busy");if(r&&r.ok){new Audio("data:audio/mpeg;base64,"+r.a).play()}else{alert("ElevenLabs 실패 — 브라우저 음성으로 대체. "+(r&&r.err||""));bs(txt)}}).withFailureHandler(function(e2){b.classList.remove("busy");alert("서버 호출 실패 — 브라우저 음성으로 대체. "+e2);bs(txt)}).tts(txt);}
 if(e.target.classList&&e.target.classList.contains("chk")){var q=e.target.closest(".q"),res=q.querySelector(".res"),exp=q.querySelector(".exp"),key=q.dataset.ans+(q.querySelectorAll(".bf").length?"":"|"+[].indexOf.call(document.querySelectorAll(".q"),q));
  var cnt=(window.__t=window.__t||{})[key]=(window.__t[key]||0)+1,ok=true,labels;
  if(q.querySelector(".bf")){q.querySelectorAll(".bf").forEach(function(i){var g=i.value.replace(/\s+/g,"").toLowerCase()===i.dataset.k.replace(/\s+/g,"").toLowerCase();i.style.borderColor=g?"var(--ok)":"var(--bad)";if(!g)ok=false});}
  else{labels=q.querySelectorAll(".opts label");var n=0;labels.forEach(function(l,i){if(l.querySelector("input").checked)n=i+1});ok=String(n)===q.dataset.ans;}
  if(ok){res.textContent="정답입니다!";res.className="res ok";exp.style.display="block"}
  else if(cnt<2){res.textContent="아쉽네요 — 한 번 더 시도해 보세요.";res.className="res bad";if(labels)labels.forEach(function(l){l.querySelector("input").checked=false});}
  else{res.textContent="정답 확인 — 해설을 읽어보세요.";res.className="res bad";
   if(labels){labels.forEach(function(l){l.style.borderColor=""});labels[q.dataset.ans-1].style.borderColor="var(--ok)";}
   else{q.querySelectorAll(".bf").forEach(function(i){i.value=i.dataset.k});}
   exp.style.display="block"}}});
</script></body></html>`;}
