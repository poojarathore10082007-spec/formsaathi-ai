
document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE MENU
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // 2. FORMS AND SERVICES
  const forms = [
    {
      title: "National Scholarship Portal",
      category: "Scholarship",
      description: "केंद्र सरकार की छात्रवृत्ति योजनाएँ।",
      url: "https://scholarships.gov.in/"
    },
    {
      title: "राजस्थान छात्रवृत्ति",
      category: "Scholarship",
      description: "राजस्थान की छात्रवृत्ति योजनाओं की जानकारी।",
      url: "https://sje.rajasthan.gov.in/"
    },
    {
      title: "राजस्थान SSO",
      category: "Government",
      description: "राजस्थान की ऑनलाइन सरकारी सेवाएँ।",
      url: "https://sso.rajasthan.gov.in/"
    },
    {
      title: "DigiLocker",
      category: "Document",
      description: "डिजिटल दस्तावेज़ प्राप्त करने की सुविधा।",
      url: "https://www.digilocker.gov.in/"
    },
    {
      title: "VMOU",
      category: "Government",
      description: "प्रवेश, परीक्षा और परिणाम की जानकारी।",
      url: "https://www.vmou.ac.in/"
    },
    {
      title: "REET",
      category: "Government",
      description: "REET परीक्षा की आधिकारिक जानकारी।",
      url: "https://rajeduboard.rajasthan.gov.in/"
    },
    {
      title: "Aadhaar Services",
      category: "Document",
      description: "आधार कार्ड की ऑनलाइन सेवाएँ।",
      url: "https://myaadhaar.uidai.gov.in/"
    },
    {
      title: "राजस्थान जन आधार",
      category: "Document",
      description: "जन आधार नामांकन और अपडेट।",
      url: "https://janaadhaar.rajasthan.gov.in/"
    },
    {
      title: "PAN Card Services",
      category: "Document",
      description: "PAN और e-PAN से जुड़ी सेवाएँ।",
      url: "https://www.incometax.gov.in/iec/foportal/"
    },
    {
      title: "Voter Services",
      category: "Document",
      description: "वोटर पंजीकरण और पहचान पत्र सेवाएँ।",
      url: "https://voters.eci.gov.in/"
    }
  ];

  const formsList = document.getElementById("formsList");
  const formSearch = document.getElementById("formSearch");
  const formFilter = document.getElementById("formFilter");

  function renderForms() {
    if (!formsList) return;

    const search = formSearch ? formSearch.value.toLowerCase().trim() : "";
    const filter = formFilter ? formFilter.value : "All";

    const filteredForms = forms.filter(form => {
      const matchesSearch =
        form.title.toLowerCase().includes(search) ||
        form.description.toLowerCase().includes(search);

      const matchesFilter =
        filter === "All" || form.category === filter;

      return matchesSearch && matchesFilter;
    });

    formsList.innerHTML = "";

    if (filteredForms.length === 0) {
      formsList.textContent = "कोई जानकारी नहीं मिली।";
      return;
    }

    filteredForms.forEach(form => {
      const card = document.createElement("article");
      card.className = "form-card";

      const title = document.createElement("h3");
      title.textContent = form.title;

      const category = document.createElement("p");
      category.textContent = "श्रेणी: " + form.category;

      const description = document.createElement("p");
      description.textContent = form.description;

      const link = document.createElement("a");
      link.href = form.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "आधिकारिक वेबसाइट खोलें →";

      card.append(title, category, description, link);
      formsList.appendChild(card);
    });
  }

  if (formSearch) {
    formSearch.addEventListener("input", renderForms);
  }

  if (formFilter) {
    formFilter.addEventListener("change", renderForms);
  }

  renderForms();

  // 3. SCHOLARSHIP FINDER
  const findScholarships = document.getElementById("findScholarships");
  const scholarshipResult = document.getElementById("scholarshipResult");

  if (findScholarships && scholarshipResult) {
    findScholarships.addEventListener("click", () => {
      const level = document.getElementById("classLevel");
      const state = document.getElementById("state");
      const category = document.getElementById("category");

      if (!level || !state || !category) return;

      if (!level.value || !state.value || !category.value) {
        scholarshipResult.textContent =
          "कृपया पढ़ाई, राज्य और वर्ग की जानकारी चुनें।";
        return;
      }

      scholarshipResult.innerHTML = "";

      const message = document.createElement("p");
      message.textContent =
        "अपनी जानकारी के अनुसार इन आधिकारिक पोर्टल पर योजनाएँ जाँचें। पात्रता की पुष्टि संबंधित नियमों से करें।";

      scholarshipResult.appendChild(message);

      const portals = [
        {
          name: "National Scholarship Portal",
          url: "https://scholarships.gov.in/"
        }
      ];

      if (state.value.toLowerCase().includes("rajasthan")) {
        portals.push({
          name: "राजस्थान सामाजिक न्याय विभाग",
          url: "https://sje.rajasthan.gov.in/"
        });
      }

      portals.forEach(portal => {
        const link = document.createElement("a");
        link.href = portal.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = portal.name + " →";
        link.style.display = "block";
        link.style.marginTop = "10px";
        scholarshipResult.appendChild(link);
      });
    });
  }

  // 4. DOCUMENT CHECKLIST
  const checklistItems = document.getElementById("checklistItems");

  const documents = [
    "आधार कार्ड",
    "जन आधार कार्ड",
    "मूल निवास प्रमाण पत्र",
    "आय प्रमाण पत्र",
    "जाति प्रमाण पत्र (यदि लागू हो)",
    "10वीं की अंकतालिका",
    "12वीं की अंकतालिका",
    "बैंक पासबुक",
    "पासपोर्ट साइज फोटो"
  ];

  if (checklistItems) {
    checklistItems.innerHTML = "";

    let savedChecks = [];

    try {
      savedChecks = JSON.parse(
        localStorage.getItem("formsaathiChecklist") || "[]"
      );
    } catch (error) {
      savedChecks = [];
    }

    documents.forEach((documentName, index) => {
      const label = document.createElement("label");
      label.className = "check-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = savedChecks.includes(index);

      checkbox.addEventListener("change", () => {
        let current = [];

        try {
          current = JSON.parse(
            localStorage.getItem("formsaathiChecklist") || "[]"
          );
        } catch (error) {
          current = [];
        }

        const updated = checkbox.checked
          ? [...current.filter(item => item !== index), index]
          : current.filter(item => item !== index);

        localStorage.setItem(
          "formsaathiChecklist",
          JSON.stringify(updated)
        );
      });

      const text = document.createElement("span");
      text.textContent = documentName;

      label.append(checkbox, text);
      checklistItems.appendChild(label);
    });
  }

  // 5. FAQ ASSISTANT
  const chatBody = document.getElementById("chatBody");
  const userQuestion = document.getElementById("userQuestion");
  const sendQuestion = document.getElementById("sendQuestion");

  const answers = {
    "स्कॉलरशिप के लिए कौन से दस्तावेज़ चाहिए?":
      "आमतौर पर आधार कार्ड, आय प्रमाण पत्र, बैंक विवरण, अंकतालिका और फोटो की जरूरत हो सकती है। योजना के नियम जरूर जाँचें।",

    "फॉर्म भरने से पहले क्या जाँचें?":
      "नाम, जन्मतिथि, शैक्षणिक जानकारी, दस्तावेज़ और आवेदन की अंतिम तारीख ध्यान से जाँचें।",

    "आवेदन की सही तारीख कहाँ देखें?":
      "आवेदन की तारीख संबंधित सरकारी विभाग या आधिकारिक भर्ती पोर्टल पर देखें।"
  };

  function addChatMessage(question, answer) {
    if (!chatBody) return;

    const userBubble = document.createElement("div");
    userBubble.className = "bubble user";
    userBubble.textContent = question;

    const answerBubble = document.createElement("div");
    answerBubble.className = "bubble bot";
    answerBubble.textContent = answer;

    chatBody.append(userBubble, answerBubble);
  }

  document.querySelectorAll("[data-question]").forEach(button => {
    button.addEventListener("click", () => {
      const question = button.dataset.question;
      const answer = answers[question] ||
        "कृपया संबंधित आधिकारिक पोर्टल पर जानकारी जाँचें।";

      addChatMessage(question, answer);
    });
  });

  if (sendQuestion && userQuestion && chatBody) {
    sendQuestion.addEventListener("click", () => {
      const question = userQuestion.value.trim();

      if (!question) return;

      const text = question.toLowerCase();
      let answer;

      if (text.includes("स्कॉलरशिप") || text.includes("छात्रवृत्ति")) {
        answer =
          "छात्रवृत्ति के लिए National Scholarship Portal और अपने राज्य के आधिकारिक पोर्टल पर पात्रता, तारीख और दस्तावेज़ जाँचें।";
      } else if (text.includes("फॉर्म")) {
        answer =
          "फॉर्म भरने से पहले नाम, जन्मतिथि, योग्यता, दस्तावेज़ और अंतिम तारीख जाँचें।";
      } else if (text.includes("भर्ती") || text.includes("नौकरी")) {
        answer =
          "भर्ती की जानकारी RSSB, RPSC, SSC और UPSC की आधिकारिक वेबसाइट पर देखें।";
      } else {
        answer =
          "इस सवाल का जवाब अभी उपलब्ध नहीं है। कृपया संबंधित सरकारी पोर्टल पर जानकारी जाँचें।";
      }

      addChatMessage(question, answer);
      userQuestion.value = "";
    });
  }

  // 6. APPLICATION TRACKER
  const trackerName = document.getElementById("trackerName");
  const trackerDate = document.getElementById("trackerDate");
  const trackerStatus = document.getElementById("trackerStatus");
  const addTracker = document.getElementById("addTracker");
  const trackerList = document.getElementById("trackerList");

  let applications = [];

  try {
    applications = JSON.parse(
      localStorage.getItem("formsaathiApplications") || "[]"
    );
  } catch (error) {
    applications = [];
  }

  function renderApplications() {
    if (!trackerList) return;

    trackerList.innerHTML = "";

    if (applications.length === 0) {
      trackerList.textContent = "अभी कोई आवेदन नहीं जोड़ा गया है।";
      return;
    }

    applications.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "form-card";

      const title = document.createElement("h3");
      title.textContent = item.name;

      const date = document.createElement("p");
      date.textContent = "तारीख: " + (item.date || "नहीं दी गई");

      const status = document.createElement("p");
      status.textContent = "स्थिति: " + item.status;

      const remove = document.createElement("button");
      remove.textContent = "हटाएँ";

      remove.addEventListener("click", () => {
        applications.splice(index, 1);
        saveApplications();
      });

      card.append(title, date, status, remove);
      trackerList.appendChild(card);
    });
  }

  function saveApplications() {
    localStorage.setItem(
      "formsaathiApplications",
      JSON.stringify(applications)
    );
    renderApplications();
  }

  if (addTracker && trackerName && trackerDate && trackerStatus) {
    addTracker.addEventListener("click", () => {
      const name = trackerName.value.trim();

      if (!name) {
        alert("कृपया आवेदन का नाम लिखें।");
        return;
      }

      applications.push({
        name,
        date: trackerDate.value,
        status: trackerStatus.value
      });

      trackerName.value = "";
      trackerDate.value = "";
      saveApplications();
    });
  }

  renderApplications();

  // 7. EXAM COUNTDOWN
  const examName = document.getElementById("examName");
  const examDate = document.getElementById("examDate");
  const addExam = document.getElementById("addExam");
  const examList = document.getElementById("examList");

  let exams = [];

  try {
    exams = JSON.parse(
      localStorage.getItem("formsaathiExams") || "[]"
    );
  } catch (error) {
    exams = [];
  }

  function getDaysLeft(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const examDay = new Date(dateString + "T00:00:00");
    return Math.ceil((examDay - today) / 86400000);
  }

  function renderExams() {
    if (!examList) return;

    examList.innerHTML = "";

    if (exams.length === 0) {
      examList.textContent = "अभी कोई परीक्षा नहीं जोड़ी गई है।";
      return;
    }

    exams.forEach((exam, index) => {
      const card = document.createElement("article");
      card.className = "form-card";

      const title = document.createElement("h3");
      title.textContent = exam.name;

      const date = document.createElement("p");
      date.textContent = "परीक्षा की तारीख: " + exam.date;

      const days = getDaysLeft(exam.date);
      const remaining = document.createElement("p");

      remaining.textContent =
        days > 0
          ? "परीक्षा में " + days + " दिन बाकी हैं।"
          : days === 0
            ? "आज आपकी परीक्षा है। शुभकामनाएँ!"
            : "यह परीक्षा की तारीख बीत चुकी है।";

      const remove = document.createElement("button");
      remove.textContent = "हटाएँ";

      remove.addEventListener("click", () => {
        exams.splice(index, 1);
        saveExams();
      });

      card.append(title, date, remaining, remove);
      examList.appendChild(card);
    });
  }

  function saveExams() {
    localStorage.setItem("formsaathiExams", JSON.stringify(exams));
    renderExams();
  }

  if (addExam && examName && examDate) {
    addExam.addEventListener("click", () => {
      const name = examName.value.trim();
      const date = examDate.value;

      if (!name || !date) {
        alert("कृपया परीक्षा का नाम और तारीख भरें।");
        return;
      }

      if (getDaysLeft(date) < 0) {
        alert("कृपया आज या भविष्य की तारीख चुनें।");
        return;
      }

      exams.push({ name, date });

      examName.value = "";
      examDate.value = "";
      saveExams();
    });
  }

  renderExams();

  // 8. SERVICE WORKER
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.log("Service Worker registration failed:", error);
    });
  }

});
                                       
