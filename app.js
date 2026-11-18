const forms = [
 {title:"राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)",category:"छात्रवृत्ति",icon:"🎓",desc:"केंद्र और विभिन्न संस्थानों की छात्रवृत्ति योजनाओं की जानकारी।",url:"https://scholarships.gov.in/"},
 {title:"राजस्थान छात्रवृत्ति पोर्टल",category:"छात्रवृत्ति",icon:"📚",desc:"राजस्थान में उपलब्ध छात्रवृत्ति सेवाओं की आधिकारिक जानकारी।",url:"https://sje.rajasthan.gov.in/"},
 {title:"REET / शिक्षक भर्ती जानकारी",category:"परीक्षा",icon:"📝",desc:"शिक्षक पात्रता परीक्षा और संबंधित सूचनाओं के लिए आधिकारिक वेबसाइट।",url:"https://rajeduboard.rajasthan.gov.in/"},
 {title:"VMOU विद्यार्थी पोर्टल",category:"प्रवेश",icon:"🏫",desc:"दूरस्थ शिक्षा, प्रवेश और परीक्षा संबंधी आधिकारिक जानकारी।",url:"https://www.vmou.ac.in/"},
 {title:"DigiLocker",category:"प्रमाण पत्र",icon:"📄",desc:"डिजिटल दस्तावेज़ और प्रमाणपत्र प्राप्त करने की सरकारी सेवा।",url:"https://www.digilocker.gov.in/"},
 {title:"राजस्थान SSO",category:"प्रमाण पत्र",icon:"🔐",desc:"राजस्थान की अनेक ऑनलाइन सरकारी सेवाओं के लिए एकीकृत लॉगिन।",url:"https://sso.rajasthan.gov.in/"}
];
const cards=document.getElementById('formCards');let active='सभी';
function renderCards(){const q=document.getElementById('searchInput').value.trim().toLowerCase();const shown=forms.filter(x=>(active==='सभी'||x.category===active)&&(`${x.title} ${x.desc} ${x.category}`.toLowerCase().includes(q)));cards.innerHTML=shown.length?shown.map(x=>`<article class="form-card"><div class="card-icon">${x.icon}</div><h3>${x.title}</h3><p>${x.desc}</p><div class="card-meta"><span class="tag">${x.category}</span><button class="text-link" data-url="${x.url}">आधिकारिक वेबसाइट ↗</button></div></article>`).join(''):'<p>इस खोज से मेल खाती जानकारी नहीं मिली।';}
renderCards();document.getElementById('searchInput').addEventListener('input',renderCards);
document.getElementById('filters').addEventListener('click',e=>{if(!e.target.matches('button'))return;active=e.target.dataset.filter;document.querySelectorAll('.chip').forEach(b=>b.classList.toggle('active',b===e.target));renderCards();});
cards.addEventListener('click',e=>{const b=e.target.closest('[data-url]');if(b)window.open(b.dataset.url,'_blank','noopener,noreferrer');});
const docs=['आधार कार्ड','पासपोर्ट साइज फोटो','बैंक पासबुक / खाता विवरण','आय प्रमाण पत्र (यदि लागू हो)','जाति / EWS प्रमाण पत्र (यदि लागू हो)','निवास प्रमाण पत्र (यदि लागू हो)','पिछली कक्षा की मार्कशीट','मोबाइल नंबर और ईमेल'];
const checklist=document.getElementById('checklistItems');checklist.innerHTML=docs.map((d,i)=>`<label class="check-row"><input type="checkbox" data-check="${i}"><span>${d}</span></label>`).join('');
document.querySelectorAll('[data-check]').forEach(c=>{c.checked=localStorage.getItem('fs-doc-'+c.dataset.check)==='true';c.addEventListener('change',()=>localStorage.setItem('fs-doc-'+c.dataset.check,c.checked));});
document.getElementById('findScholarships').addEventListener('click',()=>{const level=document.getElementById('classLevel').value,state=document.getElementById('state').value,cat=document.getElementById('category').value;const out=document.getElementById('scholarshipResult');if(!level||!state||!cat){out.textContent='कृपया पढ़ाई, राज्य और वर्ग — तीनों विकल्प चुनें।';return;}out.innerHTML='<b>शुरुआत यहाँ से करें:</b><br>• राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर उपलब्ध योजनाएँ देखें।<br>• राजस्थान के विद्यार्थी SJE पोर्टल पर अपनी श्रेणी और कोर्स के अनुसार योजनाएँ जाँचें।<br>• आपकी चुनी जानकारी: '+[level,state,cat].join(' • ')+'<br><small>यह पात्रता की पुष्टि नहीं है। अंतिम पात्रता, आय सीमा और तारीख आधिकारिक योजना दिशानिर्देश से जाँचें।</small><br><a href="https://scholarships.gov.in/" target="_blank" rel="noopener">NSP खोलें ↗</a> &nbsp; <a href="https://sje.rajasthan.gov.in/" target="_blank" rel="noopener">राजस्थान SJE ↗</a>';});
const answers=[
 [/दस्तावेज़|कागज|document/i,'आमतौर पर पहचान पत्र, फोटो, बैंक विवरण, पिछली कक्षा की मार्कशीट और योजना के अनुसार आय/जाति/निवास प्रमाण पत्र माँगे जा सकते हैं। सही सूची संबंधित योजना के आधिकारिक नोटिफिकेशन में देखें।'],
 [/तारीख|last date|अंतिम/i,'आवेदन की तारीख संबंधित विभाग या आधिकारिक पोर्टल के नोटिस/Announcements सेक्शन में देखें। सोशल मीडिया पोस्ट पर अकेले भरोसा न करें।'],
 [/पहले|भरने|जाँच|check/i,'फॉर्म भरने से पहले पात्रता, आवेदन की अंतिम तारीख, नाम/जन्मतिथि की स्पेलिंग, दस्तावेज़ों का फॉर्मेट और फीस (यदि हो) जाँचें। सबमिट करने के बाद रसीद डाउनलोड करें।'],
 [/hello|नमस्ते|हाय/i,'नमस्ते! बताइए, आपको किस फॉर्म या स्कॉलरशिप की सामान्य जानकारी चाहिए?']
];
function ask(q){const body=document.getElementById('chatBody');body.insertAdjacentHTML('beforeend',`<div class="bubble user">${q}</div>`);const match=answers.find(a=>a[0].test(q));const answer=match?match[1]:'इस सवाल का सटीक जवाब देने के लिए योजना/फॉर्म का नाम बताएं। आधिकारिक नोटिफिकेशन में दी गई जानकारी को प्राथमिकता दें।';body.insertAdjacentHTML('beforeend',`<div class="bubble bot">${answer}</div>`);body.scrollTop=body.scrollHeight;}
document.querySelector('.quick-questions').addEventListener('click',e=>{if(e.target.dataset.question)ask(e.target.dataset.question);});
document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
