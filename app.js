
const forms = [
  {
    name: "National Scholarship Portal",
    category: "Scholarship",
    state: "All India",
    link: "https://scholarships.gov.in/",
    description: "केंद्र सरकार की छात्रवृत्ति योजनाओं का आधिकारिक पोर्टल।"
  },
  {
    name: "Rajasthan SJE Scholarship",
    category: "Scholarship",
    state: "Rajasthan",
    link: "https://sje.rajasthan.gov.in/",
    description: "राजस्थान सामाजिक न्याय एवं अधिकारिता विभाग की योजनाएँ।"
  },
  {
    name: "Rajasthan SSO",
    category: "Government",
    state: "Rajasthan",
    link: "https://sso.rajasthan.gov.in/",
    description: "राजस्थान की सरकारी सेवाओं का पोर्टल।"
  },
  {
    name: "DigiLocker",
    category: "Document",
    state: "All India",
    link: "https://www.digilocker.gov.in/",
    description: "डिजिटल दस्तावेज प्राप्त करने का सरकारी प्लेटफॉर्म।"
  }
];

const scholarshipData = [
  {
    name: "National Scholarship Portal",
    state: "All India",
    eligibility: "योजना के अनुसार पात्रता अलग-अलग होती है।",
    documents: "आधार, बैंक विवरण, शैक्षणिक प्रमाणपत्र, आय प्रमाणपत्र और अन्य योजना-विशिष्ट दस्तावेज।",
    link: "https://scholarships.gov.in/"
  },
  {
    name: "Rajasthan SJE Scholarship",
    state: "Rajasthan",
    eligibility: "श्रेणी, कक्षा, आय और योजना के नियमों के अनुसार।",
    documents: "जन आधार, आय प्रमाणपत्र, जाति प्रमाणपत्र (जहाँ लागू हो), मार्कशीट और बैंक विवरण।",
    link: "https://sje.rajasthan.gov.in/"
  },
  {
    name: "Rajasthan SSO Scholarship Services",
    state: "Rajasthan",
    eligibility: "संबंधित सेवा और योजना की आधिकारिक शर्तों के अनुसार।",
    documents: "योजना के अनुसार आवश्यक दस्तावेज।",
    link: "https://sso.rajasthan.gov.in/"
  }
];

const $ = (id) => document.getElementById(id);

function renderForms(list = forms) {
  const container = $("formCards");
  if (!container) return;

  container.innerHTML = list.map(item => `
    <article class="form-card">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>${item.state} · ${item.category}</p>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">
        आधिकारिक वेबसाइट खोलें
      </a>
    </article>
  `).join("");
}

function filterForms() {
  const search = ($("searchInput")?.value || "").toLowerCase();
  const filtered = forms.filter(item =>
    `${item.name} ${item.category} ${item.state} ${item.description}`
      .toLowerCase().includes(search)
  );
  renderForms(filtered);
}

function setupFilters() {
  $("searchInput")?.addEventListener("input", filterForms);

  $("filters")?.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    const category = button.dataset.filter;
    const filtered = category === "all"
      ? forms
      : forms.filter(item => item.category.toLowerCase() === category.toLowerCase());

    renderForms(filtered);
  });
}

function findScholarships() {
  const state = $("state")?.value || "All India";
  const result = $("scholarshipResult");
  if (!result) return;

  const matches = scholarshipData.filter(item =>
    state === "All India" ||
    item.state === state ||
    item.state === "All India"
  );

  result.innerHTML = matches.map(item => `
    <article class="form-card">
      <h3>${item.name}</h3>
      <p><strong>पात्रता:</strong> ${item.eligibility}</p>
      <p><strong>जरूरी दस्तावेज:</strong> ${item.documents}</p>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">
        आधिकारिक जानकारी देखें
      </a>
    </article>
  `).join("") || "<p>अभी कोई जानकारी उपलब्ध नहीं है।</p>";
}

function setupChecklist() {
  const container = $("checklistItems");
  if (!container) return;

  const tasks = [
    "आधार कार्ड",
    "बैंक पासबुक",
    "आय प्रमाणपत्र",
    "मार्कशीट",
    "फोटो",
    "योजना के अनुसार अन्य दस्तावेज"
  ];

  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem("formsaathi-checklist") || "[]");
  } catch (error) {}

  container.innerHTML = tasks.map((task, index) => `
    <label>
      <input type="checkbox" data-task="${index}"
        ${saved.includes(index) ? "checked" : ""}>
      ${task}
    </label>
  `).join("");

  container.addEventListener("change", () => {
    const checked = [...container.querySelectorAll("input:checked")]
      .map(input => Number(input.dataset.task));

    try {
      localStorage.setItem("formsaathi-checklist", JSON.stringify(checked));
    } catch (error) {}
  });
}

function setupScholarshipButton() {
  $("findScholarships")?.addEventListener("click", findScholarships);
}

function setupFAQ() {
  const body = $("chatBody");
  if (!body) return;

  body.innerHTML = `
    <p><strong>FormSaathi AI:</strong> नमस्ते! छात्रवृत्ति या सरकारी फॉर्म के बारे में पूछें।</p>
    <p>सही जानकारी के लिए संबंधित सरकारी पोर्टल पर नियम जरूर जाँचें।</p>
  `;
}

function setupMenu() {
  $("menuBtn")?.addEventListener("click", () => {
    $("nav")?.classList.toggle("open");
  });
}

function startApp() {
  renderForms();
  setupFilters();
  setupChecklist();
  setupScholarshipButton();
  setupFAQ();
  setupMenu();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}
