
const forms = [
  {title:"राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)",category:"छात्रवृत्ति",icon:"🎓",desc:"केंद्र और विभिन्न संस्थानों की छात्रवृत्ति योजनाओं की जानकारी।",url:"https://scholarships.gov.in/"},
  {title:"राजस्थान छात्रवृत्ति पोर्टल",category:"छात्रवृत्ति",icon:"📚",desc:"राजस्थान में उपलब्ध छात्रवृत्ति सेवाओं की आधिकारिक जानकारी।",url:"https://sje.rajasthan.gov.in/"},
  {title:"REET / शिक्षक भर्ती जानकारी",category:"परीक्षा",icon:"📝",desc:"शिक्षक पात्रता परीक्षा और संबंधित सूचनाएँ।",url:"https://rajeduboard.rajasthan.gov.in/"},
  {title:"VMOU विद्यार्थी पोर्टल",category:"प्रवेश",icon:"🏫",desc:"दूरस्थ शिक्षा, प्रवेश और परीक्षा संबंधी जानकारी।",url:"https://www.vmou.ac.in/"},
  {title:"DigiLocker",category:"प्रमाण पत्र",icon:"📄",desc:"डिजिटल दस्तावेज़ और प्रमाणपत्र।",url:"https://www.digilocker.gov.in/"},
  {title:"राजस्थान SSO",category:"प्रमाण पत्र",icon:"🔐",desc:"राजस्थान की ऑनलाइन सरकारी सेवाएँ।",url:"https://sso.rajasthan.gov.in/"}
];

// FORM CARDS
const cards = document.getElementById('formCards');
let active = 'सभी';

function renderCards() {
  if (!cards) return;

  const search = document.getElementById('searchInput');
  const q = search ? search.value.trim().toLowerCase() : '';

  const shown = forms.filter(x =>
    (active === 'सभी' || x.category === active) &&
    `${x.title} ${x.desc} ${x.category}`.toLowerCase().includes(q)
  );

  cards.innerHTML = shown.length
    ? shown.map(x => `
      <article class="form-card">
        <div class="card-icon">${x.icon}</div>
        <h3>${x.title}</h3>
        <p>${x.desc}</p>
        <div class="card-meta">
          <span class="tag">${x.category}</span>
          <button class="text-link" data-url="${x.url}">
            आधिकारिक वेबसाइट ↗
          </button>
        </div>
      </article>
    `).join('')
    : '<p>इस खोज से मेल खाती जानकारी नहीं मिली।</p>';
}

renderCards();

document.getElementById('searchInput')?.addEventListener('input', renderCards);

document.getElementById('filters')?.addEventListener('click', e => {
  const btn = e.target.closest('button[data-filter]');
  if (!btn) return;

  active = btn.dataset.filter;

  document.querySelectorAll('.chip').forEach(b =>
    b.classList.toggle('active', b === btn)
  );

  renderCards();
});

cards?.addEventListener('click', e => {
  const btn = e.target.closest('[data-url]');
  if (btn) window.open(btn.dataset.url, '_blank', 'noopener,noreferrer');
});

// DOCUMENT CHECKLIST
const docs = [
  'आधार कार्ड',
  'पासपोर्ट साइज फोटो',
  'बैंक पासबुक / खाता विवरण',
  'आय प्रमाण पत्र (यदि लागू हो)',
  'जाति / EWS प्रमाण पत्र (यदि लागू हो)',
  'निवास प्रमाण पत्र (यदि लागू हो)',
  'पिछली कक्षा की मार्कशीट',
  'मोबाइल नंबर और ईमेल'
];

const checklist = document.getElementById('checklistItems');

if (checklist) {
  checklist.innerHTML = docs.map((d, i) => `
    <label class="check-row">
      <input type="checkbox" data-check="${i}">
      <span>${d}</span>
    </label>
  `).join('');

  checklist.querySelectorAll('[data-check]').forEach(c => {
    try {
      c.checked = localStorage.getItem('fs-doc-' + c.dataset.check) === 'true';
    } catch (e) {}

    c.addEventListener('change', () => {
      try {
        localStorage.setItem('fs-doc-' + c.dataset.check, c.checked);
      } catch (e) {}
    });
  });
}

// SCHOLARSHIP FINDER
const scholarshipData = [
  {
    name: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)',
    description: 'केंद्र सरकार और अन्य संस्थाओं की उपलब्ध छात्रवृत्तियों की जानकारी।',
    url: 'https://scholarships.gov.in/',
    states: ['राजस्थान', 'अन्य राज्य']
  },
  {
    name: 'राजस्थान SJE पोर्टल',
    description: 'राजस्थान के विद्यार्थियों के लिए सामाजिक न्याय एवं अधिकारिता विभाग की योजनाएँ।',
    url: 'https://sje.rajasthan.gov.in/',
    states: ['राजस्थान']
  },
  {
    name: 'राजस्थान SSO',
    description: 'राजस्थान की विभिन्न ऑनलाइन सरकारी सेवाओं और आवेदन सुविधाओं के लिए।',
    url: 'https://sso.rajasthan.gov.in/',
    states: ['राजस्थान']
  }
];

document.getElementById('findScholarships')?.addEventListener('click', () => {
  const level = document.getElementById('classLevel').value;
  const state = document.getElementById('state').value;
  const category = document.getElementById('category').value;
  const out = document.getElementById('scholarshipResult');

  if (!level || !state || !category) {
    out.textContent = 'कृपया पढ़ाई, राज्य और वर्ग — तीनों विकल्प चुनें।';
    return;
  }

  const results = scholarshipData.filter(item =>
    item.states.includes(state)
  );

  out.innerHTML = `
    <h3>आपके चुने हुए विकल्प</h3>
    <p><b>पढ़ाई:</b> ${level}</p>
    <p><b>राज्य:</b> ${state}</p>
    <p><b>वर्ग:</b> ${category}</p>
    <h3>संबंधित आधिकारिक पोर्टल</h3>
    ${results.map(item => `
      <div style="padding:13px;margin:10px 0;background:white;border:1px solid #e6ebf2;border-radius:10px">
        <b>${item.name}</b>
        <p>${item.description}</p>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer">
          आधिकारिक वेबसाइट खोलें ↗
        </a>
      </div>
    `).join('')}
    <small>
      ध्यान दें: ये संबंधित सरकारी पोर्टल हैं, पात्रता की पुष्टि नहीं।
      वास्तविक योजना, आय सीमा, अंतिम तारीख और नियम आधिकारिक नोटिफिकेशन में जाँचें।
    </small>
  `;
});

// FAQ ASSISTANT
const answers = [
  [/दस्तावेज़|कागज|document/i,
    'आमतौर पर पहचान पत्र, फोटो, बैंक विवरण, मार्कशीट और योजना के अनुसार आय, जाति या निवास प्रमाण पत्र माँगे जा सकते हैं। सही सूची आधिकारिक नोटिफिकेशन में देखें।'],

  [/तारीख|last date|अंतिम/i,
    'आवेदन की तारीख संबंधित विभाग या आधिकारिक पोर्टल के नोटिस सेक्शन में देखें।'],

  [/पहले|भरने|जाँच|check/i,
    'फॉर्म भरने से पहले पात्रता, अंतिम तारीख, नाम, जन्मतिथि, दस्तावेज़ और फीस जाँचें। सबमिट करने के बाद रसीद डाउनलोड करें।'],

  [/hello|नमस्ते|हाय/i,
    'नमस्ते! बताइए, आपको किस फॉर्म या स्कॉलरशिप की सामान्य जानकारी चाहिए?']
];

function ask(q) {
  const body = document.getElementById('chatBody');
  if (!body) return;

  const user = document.createElement('div');
  user.className = 'bubble user';
  user.textContent = q;
  body.appendChild(user);

  const match = answers.find(a => a[0].test(q));
  const reply = document.createElement('div');
  reply.className = 'bubble bot';
  reply.textContent = match
    ? match[1]
    : 'इस सवाल का सटीक जवाब देने के लिए योजना या फॉर्म का नाम बताएँ। आधिकारिक नोटिफिकेशन को प्राथमिकता दें।';

  body.appendChild(reply);
  body.scrollTop = body.scrollHeight;
}

document.querySelector('.quick-questions')?.addEventListener('click', e => {
  if (e.target.dataset.question) ask(e.target.dataset.question);
});

// MOBILE MENU
document.getElementById('menuBtn')?.addEventListener('click', () => {
  document.getElementById('nav')?.classList.toggle('open');
});

document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav')?.classList.remove('open');
  });
});

// SERVICE WORKER
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
   }
