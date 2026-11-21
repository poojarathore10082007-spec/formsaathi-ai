'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const NV='जाँचें (सत्यापित नहीं)';
const LV={c910:'कक्षा 9–10',c1112:'कक्षा 11–12',grad:'स्नातक',dip:'डिप्लोमा',bstc:'D.El.Ed / BSTC',pg:'स्नातकोत्तर'};
const NSP='https://scholarships.gov.in', SJE='https://sje.rajasthan.gov.in';
/* ---- नमूना डेटा: कोई राशि/तिथि/नियम सत्यापित नहीं ---- */
const SCH=[
{n:'नमूना: कक्षा 9–10 मेरिट छात्रवृत्ति',lv:['c910'],st:'राजस्थान',cat:['सामान्य','OBC','SC','ST','EWS'],inc:0,g:'',ty:'मेरिट आधारित',el:'नमूना पात्रता: कक्षा 9–10 के नियमित विद्यार्थी।',u:SJE},
{n:'नमूना: कक्षा 9–10 श्रेणी आधारित सहायता',lv:['c910'],st:'केंद्र सरकार',cat:['SC','ST','OBC'],inc:2.5,g:'',ty:'श्रेणी आधारित',el:'नमूना पात्रता: आरक्षित श्रेणी, आय सीमा लागू हो सकती है।',u:NSP},
{n:'नमूना: कक्षा 11–12 छात्रा प्रोत्साहन',lv:['c1112'],st:'राजस्थान',cat:['सामान्य','OBC','SC','ST','EWS'],inc:0,g:'f',ty:'मेरिट आधारित',el:'नमूना पात्रता: केवल छात्राएँ, 11वीं–12वीं में नियमित।',u:SJE},
{n:'नमूना: कक्षा 11–12 आय आधारित छात्रवृत्ति',lv:['c1112'],st:'केंद्र सरकार',cat:['सामान्य','OBC','SC','ST','EWS'],inc:8,g:'',ty:'आय आधारित',el:'नमूना पात्रता: पारिवारिक आय सीमा के भीतर।',u:NSP},
{n:'नमूना: स्नातक (BA/BSc/BCom) छात्रवृत्ति',lv:['grad'],st:'केंद्र सरकार',cat:['SC','ST','OBC','EWS'],inc:2.5,g:'',ty:'श्रेणी आधारित',el:'नमूना पात्रता: मान्यता प्राप्त कॉलेज में नियमित प्रवेश।',u:NSP},
{n:'नमूना: स्नातक मेरिट सहायता (राजस्थान)',lv:['grad'],st:'राजस्थान',cat:['सामान्य','OBC','SC','ST','EWS'],inc:0,g:'',ty:'मेरिट आधारित',el:'नमूना पात्रता: पिछली परीक्षा में निर्धारित प्रतिशत।',u:SJE},
{n:'नमूना: डिप्लोमा विद्यार्थी छात्रवृत्ति',lv:['dip'],st:'केंद्र सरकार',cat:['सामान्य','OBC','SC','ST','EWS'],inc:8,g:'',ty:'आय आधारित',el:'नमूना पात्रता: तकनीकी डिप्लोमा में नियमित प्रवेश।',u:NSP},
{n:'नमूना: D.El.Ed / BSTC विद्यार्थी सहायता',lv:['bstc'],st:'राजस्थान',cat:['सामान्य','OBC','SC','ST','EWS'],inc:2.5,g:'',ty:'आय आधारित',el:'नमूना पात्रता: D.El.Ed / BSTC में प्रवेश प्राप्त विद्यार्थी।',u:SJE},
{n:'नमूना: स्नातकोत्तर छात्रवृत्ति',lv:['pg'],st:'केंद्र सरकार',cat:['SC','ST','OBC','EWS'],inc:2.5,g:'',ty:'श्रेणी आधारित',el:'नमूना पात्रता: PG कोर्स में नियमित प्रवेश।',u:NSP},
{n:'नमूना: PG छात्रा मेरिट सहायता',lv:['pg'],st:'राजस्थान',cat:['सामान्य','OBC','SC','ST','EWS'],inc:0,g:'f',ty:'मेरिट आधारित',el:'नमूना पात्रता: छात्राएँ, पिछली परीक्षा में उच्च अंक।',u:SJE}];
const JC=['सभी','राजस्थान सरकार','केंद्र सरकार','10वीं पास','12वीं पास','स्नातक','शिक्षक भर्ती','पुलिस और रक्षा'];
const RPSC='https://rpsc.rajasthan.gov.in',RSSB='https://rssb.rajasthan.gov.in',SSC='https://ssc.gov.in',UPSC='https://upsc.gov.in';
const JOBS=[
{n:'नमूना: पटवारी / ग्राम विकास अधिकारी स्तर भर्ती',d:'राजस्थान कर्मचारी चयन बोर्ड (नमूना)',q:'स्नातक',c:['राजस्थान सरकार','स्नातक'],u:RSSB},
{n:'नमूना: चतुर्थ श्रेणी कर्मचारी भर्ती',d:'राजस्थान कर्मचारी चयन बोर्ड (नमूना)',q:'10वीं पास',c:['राजस्थान सरकार','10वीं पास'],u:RSSB},
{n:'नमूना: कनिष्ठ सहायक / क्लर्क भर्ती',d:'राजस्थान कर्मचारी चयन बोर्ड (नमूना)',q:'12वीं पास',c:['राजस्थान सरकार','12वीं पास'],u:RSSB},
{n:'नमूना: RAS / अधीनस्थ सेवा परीक्षा',d:'राजस्थान लोक सेवा आयोग (नमूना)',q:'स्नातक',c:['राजस्थान सरकार','स्नातक'],u:RPSC},
{n:'नमूना: शिक्षक भर्ती (प्राथमिक/माध्यमिक)',d:'राजस्थान शिक्षा विभाग (नमूना)',q:'D.El.Ed / B.Ed (पद अनुसार)',c:['राजस्थान सरकार','शिक्षक भर्ती','स्नातक'],u:RSSB},
{n:'नमूना: संयुक्त स्नातक स्तरीय (CGL)',d:'कर्मचारी चयन आयोग (नमूना)',q:'स्नातक',c:['केंद्र सरकार','स्नातक'],u:SSC},
{n:'नमूना: संयुक्त हायर सेकेंडरी (CHSL)',d:'कर्मचारी चयन आयोग (नमूना)',q:'12वीं पास',c:['केंद्र सरकार','12वीं पास'],u:SSC},
{n:'नमूना: मल्टी टास्किंग स्टाफ (MTS)',d:'कर्मचारी चयन आयोग (नमूना)',q:'10वीं पास',c:['केंद्र सरकार','10वीं पास'],u:SSC},
{n:'नमूना: सिविल सेवा परीक्षा',d:'संघ लोक सेवा आयोग (नमूना)',q:'स्नातक',c:['केंद्र सरकार','स्नातक'],u:UPSC},
{n:'नमूना: कांस्टेबल भर्ती',d:'राजस्थान पुलिस (नमूना)',q:'12वीं पास',c:['राजस्थान सरकार','पुलिस और रक्षा','12वीं पास'],u:'https://police.rajasthan.gov.in'},
{n:'नमूना: GD कांस्टेबल (केंद्रीय बल)',d:'कर्मचारी चयन आयोग (नमूना)',q:'10वीं पास',c:['केंद्र सरकार','पुलिस और रक्षा','10वीं पास'],u:SSC}];
const FC=['सभी','सरकारी फॉर्म','प्रवेश','परीक्षा','एडमिट कार्ड','रिजल्ट','आंसर की','दस्तावेज़'];
const FORMS=[
{n:'नमूना: ऑनलाइन आवेदन फॉर्म गाइड',c:'सरकारी फॉर्म',i:'फॉर्म भरने से पहले फोटो, हस्ताक्षर और पहचान पत्र स्कैन करके तैयार रखें।',u:'https://sso.rajasthan.gov.in'},
{n:'नमूना: कॉलेज प्रवेश जानकारी',c:'प्रवेश',i:'प्रवेश की तिथि और प्रक्रिया संबंधित विश्वविद्यालय/कॉलेज की साइट पर देखें।',u:'https://sso.rajasthan.gov.in'},
{n:'नमूना: प्रवेश परीक्षा सूचना (NTA)',c:'परीक्षा',i:'राष्ट्रीय स्तर की प्रवेश परीक्षाओं की सूचना NTA पर मिलती है।',u:'https://nta.ac.in'},
{n:'नमूना: राजस्थान बोर्ड परीक्षा जानकारी',c:'परीक्षा',i:'राजस्थान माध्यमिक शिक्षा बोर्ड की आधिकारिक साइट देखें।',u:'https://rajeduboard.rajasthan.gov.in'},
{n:'नमूना: एडमिट कार्ड कैसे डाउनलोड करें',c:'एडमिट कार्ड',i:'संबंधित परीक्षा पोर्टल पर रजिस्ट्रेशन नंबर और जन्मतिथि से लॉगिन करें।',u:'https://nta.ac.in'},
{n:'नमूना: रिजल्ट देखने का तरीका',c:'रिजल्ट',i:'रिजल्ट केवल परीक्षा आयोजक की आधिकारिक वेबसाइट पर ही देखें।',u:'https://rajeduboard.rajasthan.gov.in'},
{n:'नमूना: CBSE जानकारी',c:'रिजल्ट',i:'CBSE से जुड़े रिजल्ट और सूचनाओं के लिए आधिकारिक साइट।',u:'https://www.cbse.gov.in'},
{n:'नमूना: आंसर की और आपत्ति प्रक्रिया',c:'आंसर की',i:'आंसर की जारी होने पर आपत्ति की अंतिम तिथि आयोजक साइट पर जाँचें।',u:RPSC},
{n:'नमूना: डिजिलॉकर से दस्तावेज़',c:'दस्तावेज़',i:'मार्कशीट आदि डिजिटल रूप में रखने के लिए DigiLocker।',u:'https://www.digilocker.gov.in'},
{n:'नमूना: जाति/आय प्रमाण पत्र जानकारी',c:'दस्तावेज़',i:'प्रमाण पत्र के लिए राज-ई-मित्र / SSO पोर्टल देखें।',u:'https://sso.rajasthan.gov.in'}];
const UPD=[{n:'डेमो अपडेट: नई जानकारी जोड़ने के लिए आधिकारिक साइट देखें',t:'नमूना'},{n:'डेमो अपडेट: छात्रवृत्ति आवेदन से पहले दस्तावेज़ तैयार रखें',t:'नमूना'}];

/* ---- कार्ड और मॉडल ---- */
const demo='<span class="badge demo">नमूना डेटा</span>';
function card(it,kind,i){
 let tags='',meta='';
 if(kind==='s'){tags=`<span class="badge">${esc(it.lv.map(l=>LV[l]).join(', '))}</span><span class="badge">${esc(it.st)}</span><span class="badge">${esc(it.ty)}</span>`;
  meta=`<div>पात्रता: ${esc(it.el)}</div><div>राशि: ${NV}</div><div>अंतिम तिथि: ${NV}</div>`}
 if(kind==='j'){tags=`<span class="badge">${esc(it.c[0])}</span>`;
  meta=`<div>विभाग: ${esc(it.d)}</div><div>योग्यता: ${esc(it.q)}</div><div>पद संख्या: ${NV}</div><div>आवेदन शुरू: ${NV}</div><div>अंतिम तिथि: ${NV}</div>`}
 if(kind==='f'){tags=`<span class="badge">${esc(it.c)}</span>`;meta=`<div>${esc(it.i)}</div>`}
 const label=kind==='f'?'आधिकारिक साइट':kind==='j'?'आधिकारिक साइट':'आवेदन पोर्टल';
 return `<article class="card"><h3>${esc(it.n)}</h3><div>${demo}${tags}</div><div class="meta">${meta}</div>
 <div class="acts"><button class="btn ghost" data-d="${kind}${i}">विवरण</button><a class="btn" href="${esc(it.u)}" target="_blank" rel="noopener noreferrer">${label}</a></div></article>`}
const DB={s:SCH,j:JOBS,f:FORMS};
function fill(el,arr,kind,empty){el.innerHTML=arr.length?arr.map(([it,i])=>card(it,kind,i)).join(''):`<div class="empty">😕 ${empty||'कोई परिणाम नहीं मिला। फ़िल्टर बदलकर देखें।'}</div>`}
const idx=a=>a.map((x,i)=>[x,i]);
function openModal(title,html){$('#mTitle').textContent=title;$('#mBody').innerHTML=html;$('#modal').hidden=false;$('#mClose').focus();document.body.style.overflow='hidden'}
function closeModal(){$('#modal').hidden=true;document.body.style.overflow=''}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2600)}
function details(code){
 const k=code[0],it=DB[k][+code.slice(1)];let h='<p class="demo-note">यह नमूना जानकारी है। राशि, तिथि और पात्रता केवल आधिकारिक अधिसूचना से सत्यापित करें।</p>';
 if(k==='s')h+=`<p><b>स्तर:</b> ${esc(it.lv.map(l=>LV[l]).join(', '))}</p><p><b>राज्य:</b> ${esc(it.st)}</p><p><b>श्रेणी:</b> ${esc(it.cat.join(', '))}</p><p><b>आय सीमा:</b> ${it.inc?'₹'+it.inc+' लाख तक (नमूना)':'सत्यापित नहीं'}</p><p><b>लिंग:</b> ${it.g==='f'?'केवल छात्रा (नमूना)':'सभी'}</p><p><b>पात्रता:</b> ${esc(it.el)}</p><p><b>राशि:</b> ${NV}</p><p><b>अंतिम तिथि:</b> ${NV}</p>`;
 if(k==='j')h+=`<p><b>विभाग:</b> ${esc(it.d)}</p><p><b>योग्यता:</b> ${esc(it.q)}</p><p><b>पद संख्या:</b> ${NV}</p><p><b>आवेदन शुरू / अंतिम तिथि:</b> ${NV}</p><p>आधिकारिक अधिसूचना के लिए नीचे दिए पोर्टल पर "भर्ती / Recruitment" सेक्शन देखें।</p>`;
 if(k==='f')h+=`<p>${esc(it.i)}</p>`;
 h+=`<div class="acts"><a class="btn" href="${esc(it.u)}" target="_blank" rel="noopener noreferrer">आधिकारिक पोर्टल खोलें</a><button class="btn ghost" id="mOk">बंद करें</button></div>`;
 openModal(it.n,h);$('#mOk').onclick=closeModal}
document.addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(b)details(b.dataset.d)});

/* ---- नेविगेशन और मेनू ---- */
const VIEWS=['home','scholarships','jobs','forms','results','chat'];
function route(){const h=(location.hash||'#home').slice(1);const v=VIEWS.includes(h)?h:'home';
 $$('.view').forEach(s=>s.hidden=s.id!==v);
 $$('.bottom a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+v));
 closeMenu();window.scrollTo(0,0);if(v==='chat')scrollMsgs();document.title=(v==='home'?'':$('#'+v+' .pt')?.textContent.replace(/^\S+\s/,'')+' – ')+'FormSaathi AI'}
window.addEventListener('hashchange',route);
function openMenu(){$('#drawer').classList.add('on');$('#scrim').classList.add('on');$('#menuBtn').setAttribute('aria-expanded','true')}
function closeMenu(){$('#drawer').classList.remove('on');$('#scrim').classList.remove('on');$('#menuBtn').setAttribute('aria-expanded','false')}
$('#menuBtn').onclick=()=>$('#drawer').classList.contains('on')?closeMenu():openMenu();
$('#scrim').onclick=closeMenu;
$('#mClose').onclick=closeModal;
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeMenu()}});

/* ---- छात्रवृत्ति फ़िल्टर ---- */
function schSearch(e){e&&e.preventDefault();
 const lv=$('#fLevel').value,st=$('#fState').value,cat=$('#fCat').value,inc=$('#fInc').value,g=$('#fGen').value,ty=$('#fType').value;
 const r=idx(SCH).filter(([s])=>(!lv||s.lv.includes(lv))&&(!st||s.st===st)&&(!cat||s.cat.includes(cat))&&(!inc||s.inc===0||(inc!=='99'&&+inc<=s.inc))&&(!g||!s.g||s.g===g)&&(!ty||s.ty===ty));
 $('#schCount').textContent=r.length+' नमूना परिणाम मिले';fill($('#schList'),r,'s')}
$('#schForm').addEventListener('submit',schSearch);
$('#schForm').addEventListener('reset',()=>setTimeout(schSearch,0));
/* ---- नौकरी और फॉर्म ---- */
function chips(box,list,cur,cb){box.innerHTML=list.map(c=>`<button type="button" class="chip${c===cur?' on':''}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
 box.onclick=e=>{const b=e.target.closest('.chip');if(b)cb(b.dataset.c)}}
let jc='सभी',fc='सभी';
function jobs(){chips($('#jobChips'),JC,jc,c=>{jc=c;jobs()});const q=$('#jobSearch').value.trim().toLowerCase();
 const r=idx(JOBS).filter(([j])=>(jc==='सभी'||j.c.includes(jc))&&(j.n+j.d+j.q).toLowerCase().includes(q));
 $('#jobCount').textContent=r.length+' नमूना भर्तियाँ';fill($('#jobList'),r,'j')}
function forms(){chips($('#formChips'),FC,fc,c=>{fc=c;forms()});const q=$('#formSearch').value.trim().toLowerCase();
 const r=idx(FORMS).filter(([f])=>(fc==='सभी'||f.c===fc)&&(f.n+f.i).toLowerCase().includes(q));
 $('#formCount').textContent=r.length+' परिणाम';fill($('#formList'),r,'f')}
$('#jobSearch').oninput=jobs;$('#formSearch').oninput=forms;
$$('.quick a[data-cat]').forEach(a=>a.addEventListener('click',()=>{fc=a.dataset.cat;$('#formSearch').value='';forms()}));
/* ---- होम खोज ---- */
$('#searchForm').addEventListener('submit',e=>{e.preventDefault();const q=$('#searchInput').value.trim().toLowerCase();
 if(q.length<2){toast('कृपया कम से कम 2 अक्षर लिखें');return}
 const all=[...idx(SCH).map(([x,i])=>[x,i,'s']),...idx(JOBS).map(([x,i])=>[x,i,'j']),...idx(FORMS).map(([x,i])=>[x,i,'f'])]
  .filter(([x])=>JSON.stringify(x).toLowerCase().includes(q));
 $('#resCount').textContent=`"${$('#searchInput').value.trim()}" के लिए ${all.length} नमूना परिणाम`;
 $('#resList').innerHTML=all.length?all.map(([x,i,k])=>card(x,k,i)).join(''):'<div class="empty">😕 कुछ नहीं मिला। कोई दूसरा शब्द आज़माएँ, जैसे "छात्रवृत्ति" या "पुलिस"।</div>';
 location.hash='#results'});
/* ---- होम सेक्शन ---- */
$('#homeUpdates').innerHTML=UPD.map(u=>`<article class="card"><span class="badge demo">${u.t}</span><h3>${u.n}</h3></article>`).join('');
fill($('#homeSch'),idx(SCH).slice(0,2),'s');fill($('#homeJobs'),idx(JOBS).slice(0,2),'j');
/* ---- टूल्स और जानकारी पेज ---- */
$('#toolAge').onclick=()=>{openModal('आयु कैलकुलेटर','<label>जन्मतिथि<input type="date" id="dob" class="field"></label><label>गणना की तिथि<input type="date" id="asOn" class="field"></label><p class="err" id="ageErr"></p><button class="btn" id="ageGo">आयु निकालें</button><p id="ageOut"></p>');
 $('#asOn').value=new Date().toISOString().slice(0,10);
 $('#ageGo').onclick=()=>{const d=new Date($('#dob').value),a=new Date($('#asOn').value);
  if(!$('#dob').value||!$('#asOn').value){$('#ageErr').textContent='दोनों तिथियाँ चुनें।';return}
  if(d>a){$('#ageErr').textContent='जन्मतिथि गणना तिथि से पहले होनी चाहिए।';return}
  $('#ageErr').textContent='';let y=a.getFullYear()-d.getFullYear(),m=a.getMonth()-d.getMonth(),dd=a.getDate()-d.getDate();
  if(dd<0){m--;dd+=new Date(a.getFullYear(),a.getMonth(),0).getDate()}if(m<0){y--;m+=12}
  $('#ageOut').innerHTML=`<b>आपकी आयु: ${y} वर्ष, ${m} माह, ${dd} दिन</b>`}};
$('#toolDocs').onclick=()=>openModal('दस्तावेज़ चेकलिस्ट','<p>आमतौर पर माँगे जाने वाले दस्तावेज़ (भर्ती/फॉर्म के अनुसार बदल सकते हैं):</p><ul><li>आधार कार्ड</li><li>पासपोर्ट साइज़ फोटो और हस्ताक्षर</li><li>10वीं/12वीं की मार्कशीट</li><li>जाति / आय / निवास प्रमाण पत्र</li><li>बैंक पासबुक (आधार से लिंक)</li><li>मोबाइल नंबर और ईमेल</li></ul>');
const INFO={
about:['हमारे बारे में','<p>FormSaathi AI विद्यार्थियों को छात्रवृत्ति, भर्ती और फॉर्म की जानकारी खोजने में मदद करने वाला एक सहायक ऐप है। यह कोई सरकारी वेबसाइट नहीं है।</p>'],
privacy:['गोपनीयता नीति','<p>यह ऐप आपका कोई व्यक्तिगत डेटा सर्वर पर नहीं भेजता। खोज और चैट आपके ब्राउज़र में ही रहती हैं। संपर्क फॉर्म अभी डेमो है और संदेश कहीं नहीं भेजता।</p>'],
disclaimer:['अस्वीकरण','<p>ऐप में दिखाई गई सारी जानकारी <b>नमूना/डेमो</b> है। आवेदन से पहले तिथि, राशि और पात्रता आधिकारिक वेबसाइट या अधिसूचना से जाँचें। हम किसी सरकारी विभाग से संबद्ध नहीं हैं।</p>'],
contact:['संपर्क','<p class="demo-note">डेमो फॉर्म: अभी कोई बैकएंड जुड़ा नहीं है, इसलिए संदेश भेजा नहीं जाएगा।</p><form id="cf" novalidate><label>नाम<input class="field" id="cn"><span class="err" id="e1"></span></label><label>मोबाइल (10 अंक)<input class="field" id="cm" inputmode="numeric" maxlength="10"><span class="err" id="e2"></span></label><label>संदेश<textarea class="field" id="cg" rows="3"></textarea><span class="err" id="e3"></span></label><button class="btn" type="submit">जाँचें</button></form>']};
document.addEventListener('click',e=>{const b=e.target.closest('[data-info]');if(!b)return;closeMenu();const [t,h]=INFO[b.dataset.info];openModal(t,h);
 const f=$('#cf');if(f)f.onsubmit=ev=>{ev.preventDefault();let ok=true;
  const c=(id,er,bad,msg)=>{$(er).textContent=bad($(id).value.trim())?msg:'';if(bad($(id).value.trim()))ok=false};
  c('#cn','#e1',v=>v.length<2,'कृपया अपना नाम लिखें।');c('#cm','#e2',v=>!/^[6-9]\d{9}$/.test(v),'सही 10 अंकों का मोबाइल नंबर लिखें।');c('#cg','#e3',v=>v.length<5,'कृपया संदेश लिखें।');
  if(ok){closeModal();toast('फॉर्म सही है – डेमो में संदेश भेजा नहीं जाता')}}});
/* ---- AI चैट (डेमो) ---- */
const SQ=['मैं किस छात्रवृत्ति के लिए पात्र हूँ?','राजस्थान में कौन सी नई भर्ती आई है?','BSTC विद्यार्थियों के लिए छात्रवृत्ति बताओ।','सरकारी फॉर्म भरने में मदद करो।','मेरी योग्यता के अनुसार नौकरी बताओ।'];
const R=[[/छात्रवृत्ति.*पात्र|पात्र/,'पात्रता स्तर, श्रेणी, आय और राज्य पर निर्भर करती है। "छात्रवृत्ति" पेज पर अपने फ़िल्टर चुनें। अंतिम पात्रता हमेशा आधिकारिक अधिसूचना से जाँचें।'],
[/भर्ती|नई/,'मैं लाइव भर्ती सूची नहीं देख सकता (डेमो मोड)। नवीनतम अधिसूचना के लिए राजस्थान कर्मचारी चयन बोर्ड और RPSC की वेबसाइट देखें। "सरकारी नौकरी" पेज पर नमूना सूची है।'],
[/BSTC|D\.?El\.?Ed|बीएसटीसी/i,'छात्रवृत्ति पेज पर स्तर में "D.El.Ed / BSTC" चुनें। वहाँ नमूना योजना दिखेगी; वास्तविक राशि और नियम राजस्थान सामाजिक न्याय विभाग या संबंधित पोर्टल पर जाँचें।'],
[/फॉर्म/,'फॉर्म भरने के लिए: 1) अधिसूचना पूरी पढ़ें 2) दस्तावेज़ तैयार रखें 3) फोटो-हस्ताक्षर सही साइज़ में रखें 4) जमा करने से पहले जाँचें 5) रसीद सुरक्षित रखें।'],
[/योग्यता|नौकरी/,'अपनी योग्यता (10वीं, 12वीं, स्नातक आदि) चुनकर "सरकारी नौकरी" पेज पर फ़िल्टर करें। पद की आयु और योग्यता सीमा आधिकारिक अधिसूचना में देखें।']];
const FALL='यह डेमो सहायक है और केवल कुछ तय सवालों का उत्तर दे सकता है। ऊपर दिए सुझाव आज़माएँ, या पेज खोजें।';
const msgs=$('#msgs');
const scrollMsgs=()=>{msgs.scrollTop=msgs.scrollHeight};
function add(t,w){const d=document.createElement('div');d.className='msg '+w;d.textContent=t;msgs.appendChild(d);scrollMsgs();return d}
function greet(){msgs.innerHTML='';add('नमस्ते! मैं FormSaathi का डेमो सहायक हूँ। नीचे से कोई सवाल चुनें या अपना सवाल लिखें।','a')}
let busy=false;
function ask(q){q=q.trim();if(!q||busy)return;busy=true;add(q,'u');
 const t=add('','a');t.innerHTML='<span class="dots"><span></span><span></span><span></span></span>';
 setTimeout(()=>{const m=R.find(r=>r[0].test(q));t.textContent=(m?m[1]:FALL);busy=false;scrollMsgs()},700)}
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const i=$('#chatInput');const v=i.value;i.value='';ask(v)});
$('#clearChat').onclick=()=>{greet();toast('चैट साफ़ हो गई')};
$('#sugg').innerHTML=SQ.map(q=>`<button type="button" class="chip">${q}</button>`).join('');
$('#sugg').onclick=e=>{const b=e.target.closest('.chip');if(b)ask(b.textContent)};
/* ---- PWA ---- */
let dp=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;$('#installBtn').hidden=false});
async function install(){closeMenu();if(dp){dp.prompt();await dp.userChoice;dp=null;$('#installBtn').hidden=true}
 else openModal('ऐप इंस्टॉल करें','<p>Android Chrome में: ऊपर दाएँ ⋮ मेनू → "Add to Home screen" / "ऐप इंस्टॉल करें" चुनें।</p><p>इंस्टॉल केवल HTTPS होस्टिंग पर उपलब्ध होता है।</p>')}
$('#installBtn').onclick=install;$('#installBtn2').onclick=install;
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
/* ---- शुरुआत ---- */
schSearch();jobs();forms();greet();route();
