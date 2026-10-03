
var T=[["s0","개념"],["s1","TEACHER"],["s2","최신 논문"],["s3","자기수업컨설팅"],["s4","빈칸"],["s5","선다형"],["s6","면접"]],nv=document.getElementById("nv");
T.forEach(function(t,i){var b=document.createElement("button");b.textContent=t[1];b.onclick=function(){document.querySelectorAll("section").forEach(function(s){s.classList.remove("on")});document.getElementById(t[0]).classList.add("on");nv.querySelectorAll("button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");window.scrollTo(0,0)};if(i==0){b.classList.add("on");document.getElementById(t[0]).classList.add("on")}nv.appendChild(b)});
function bs(t){var u=new SpeechSynthesisUtterance(t);u.lang="ko-KR";speechSynthesis.cancel();speechSynthesis.speak(u)}
document.addEventListener("click",function(e){
 if(e.target.classList&&e.target.classList.contains("say")){var b=e.target,c=b.closest(".card").cloneNode(true);c.querySelectorAll(".say").forEach(function(x){x.remove()});var txt=c.innerText.trim();b.classList.add("busy");
  fetch("/audio/"+(b.dataset.h||"")+".mp3").then(function(r){if(!r.ok)throw new Error("no-mp3");return r.blob()}).then(function(blob){b.classList.remove("busy");new Audio(URL.createObjectURL(blob)).play()}).catch(function(e){b.classList.remove("busy");bs(txt)})}).catch(function(err){b.classList.remove("busy");alert("ElevenLabs 실패 — 브라우저 음성으로 대체. "+err.message);bs(txt)});}
 if(e.target.classList&&e.target.classList.contains("chk")){var q=e.target.closest(".q"),res=q.querySelector(".res"),exp=q.querySelector(".exp"),key=[].indexOf.call(document.querySelectorAll(".q"),q),cnt=(window.__t=window.__t||{})[key]=(window.__t[key]||0)+1,ok=true,labels;
  if(q.querySelector(".bf")){q.querySelectorAll(".bf").forEach(function(i){var g=i.value.replace(/\s+/g,"").toLowerCase()===i.dataset.k.replace(/\s+/g,"").toLowerCase();i.style.borderColor=g?"var(--ok)":"var(--bad)";if(!g)ok=false})}
  else{labels=q.querySelectorAll(".opts label");var n=0;labels.forEach(function(l,i){if(l.querySelector("input").checked)n=i+1});ok=String(n)===q.dataset.ans}
  if(ok){res.textContent="정답입니다!";res.className="res ok";exp.style.display="block"}
  else if(cnt<2){res.textContent="아쉽네요 — 한 번 더 시도해 보세요.";res.className="res bad";if(labels)labels.forEach(function(l){l.querySelector("input").checked=false})}
  else{res.textContent="정답 확인 — 해설을 읽어보세요.";res.className="res bad";
   if(labels){labels.forEach(function(l){l.style.borderColor=""});labels[q.dataset.ans-1].style.borderColor="var(--ok)"}else{q.querySelectorAll(".bf").forEach(function(i){i.value=i.dataset.k})}
   exp.style.display="block"}}});
