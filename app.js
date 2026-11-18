
// FormSaathi AI - Main JavaScript

document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE MENU
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("open");
      menuBtn.setAttribute(
        "aria-expanded",
        nav.classList.contains("open") ? "true" : "false"
      );
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. FORMS DATA
  const forms = [
    {
      name: "National Scholarship Portal",
      category: "Scholarship",
      description: "केंद्र सरकार की विभिन्न छात्रवृत्ति योजनाएँ।",
      url: "https://scholarships.gov.in/"
    },
    {
      name: "राजस्थान छात्रवृत्ति पोर्टल",
      category: "Scholarship",
      description: "राजस्थान की छात्रवृत्ति योजनाओं की जानकारी।",
      url: "https://sje.rajasthan.gov.in/"
    },
    {
      name: "राजस्थान SSO",
      category: "Government",
      description: "राजस्थान की ऑनलाइन सरकारी सेवाएँ।",
      url: "https://sso.rajasthan.gov.in/"
    },
    {
      name: "DigiLocker",
      category: "Document",
      description: "डिजिटल दस्तावेज़ सुरक्षित रखने और देखने की सुविधा।",
      url: "https://www.digilocker.gov.in/"
    },
    {
      name: "REET",
      category: "Government",
      description: "राजस्थान शिक्षक पात्रता परीक्षा की जानकारी।",
      url: "https://reet2024.co.in/"
    },
    {
      name: "VMOU",
      category: "Government",
      description: "प्रवेश, परीक्षा और परिणाम की जानकारी।",
      url: "https://www.vmou.ac.in/"
    }
  ];

  const formCards = document.getElementById("formCards");
  const searchInput = document.getElementById("searchInput");
  const filters = document.getElementById("filters");

  let activeFilter = "all";

  function renderForms() {
    if (!formCards) return;

    formCards.replaceChildren();

    const searchText = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    const filtered = forms.filter(item => {
      const matchesCategory =
        activeFilter === "all" || item.category === activeFilter;

      const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      const message = document.createElement("p");
      message.textContent = "कोई जानकारी नहीं मिली। दूसरा शब्द खोजें।";
      formCards.appendChild(message);
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement("article");
      card.className = "form-card";

      const title = document.createElement("h3");
      title.textContent = item.name;

      const description = document.createElement("p");
      description.textContent = item.description;

      const link = document.createElement("a");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "आधिकारिक वेबसाइट खोलें →";

      card.append(title, description, link);
      formCards.appendChild(card);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", renderForms);
  }

  if (filters) {
    filters.querySelectorAll(".chip").forEach(button => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter || "all";

        filters.querySelectorAll(".chip").forEach(chip => {
          chip.classList.remove("active");
        });

        button.classList.add("active");
        renderForms();
      });
    });
  }

  renderForms();

  // 3. SCHOLARSHIP FINDER
  const findButton = document.getElementById("findScholarships");
  const result = document.getElementById("scholarshipResult");
  const stateInput = document.getElementById("state");
  const classInput = document.getElementById("classLevel");
  const categoryInput = document.getElementById("category");

  if (findButton && result) {
    findButton.addEventListener("click", () => {
      const state = stateInput ? stateInput.value : "";
      const study = classInput ? classInput.value : "";
      const category = categoryInput ? categoryInput.value : "";

      if (!state || !study || !category) {
        result.textContent = "कृपया पढ़ाई, राज्य और वर्ग की जानकारी चुनें।";
        return;
      }

      result.replaceChildren();

      const heading = document.createElement("h3");
      heading.textContent = "संभावित छात्रवृत्ति पोर्टल";

      const intro = document.createElement("p");
      intro.textContent =
        "आपकी चुनी हुई जानकारी के आधार पर इन पोर्टल पर योजनाएँ जाँचें। यह पात्रता की पुष्टि नहीं है।";

      result.append(heading, intro);

      const portals = [
        {
          name: "National Scholarship Portal",
          url: "https://scholarships.gov.in/"
        }
      ];

      if (state === "Rajasthan") {
        portals.push({
          name: "Rajasthan SJE Scholarship Portal",
          url: "https://sje.rajasthan.gov.in/"
        });
        portals.push({
          name: "Rajasthan SSO",
          url: "https://sso.rajasthan.gov.in/"
        });
      }

      portals.forEach(portal => {
        const link = document.createElement("p");
        const anchor = document.createElement("a");
        anchor.href = portal.url;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        anchor.textContent = portal.name + " →";
        link.appendChild(anchor);
        result.appendChild(link);
      });

      const note = document.createElement("p");
      note.textContent =
        "आवेदन से पहले योजना की आधिकारिक पात्रता, अंतिम तारीख और नियम जरूर जाँचें।";
      result.appendChild(note);
    });
  }

  // 4. DOCUMENT CHECKLIST
  const checklist = document.getElementById("checklistItems");

  const documents = [
    "आधार कार्ड",
    "जन आधार कार्ड",
    "पासपोर्ट साइज फोटो",
    "बैंक पासबुक",
    "आय प्रमाण पत्र",
    "जाति प्रमाण पत्र (यदि लागू हो)",
    "मूल निवास प्रमाण पत्र",
    "पिछली कक्षा की मार्कशीट"
  ];

  if (checklist) {
    documents.forEach((documentName, index) => {
      const label = document.createElement("label");
      label.className = "check-item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      try {
        checkbox.checked =
          localStorage.getItem("formsaathi-check-" + index) === "true";
      } catch (error) {}

      checkbox.addEventListener("change", () => {
        try {
          localStorage.setItem(
            "formsaathi-check-" + index,
            checkbox.checked
          );
        } catch (error) {}
      });

      const span = document.createElement("span");
      span.textContent = documentName;

      label.append(checkbox, span);
      checklist.appendChild(label);
    });
  }

  // 5. FAQ ASSISTANT
  const chatBody = document.getElementById("chatBody");

  const answers = [
    {
      keywords: ["दस्तावेज़", "दस्तावेज", "स्कॉलरशिप"],
      answer: "योजना के अनुसार आधार कार्ड, फोटो, बैंक विवरण, आय प्रमाण पत्र और मार्कशीट जैसे दस्तावेज़ माँगे जा सकते हैं। आधिकारिक निर्देश जरूर पढ़ें।"
    },
    {
      keywords: ["फॉर्म", "भरने"],
      answer: "फॉर्म भरने से पहले नाम, जन्मतिथि, मोबाइल नंबर और दस्तावेज़ों की जानकारी ध्यान से जाँचें।"
    },
    {
      keywords: ["तारीख", "अंतिम"],
      answer: "आवेदन की अंतिम तारीख संबंधित सरकारी पोर्टल के नोटिफिकेशन में देखें।"
    }
  ];

  document.querySelectorAll("[data-question]").forEach(button => {
    button.addEventListener("click", () => {
      if (!chatBody) return;

      const question = button.dataset.question || "";

      const userBubble = document.createElement("div");
      userBubble.className = "bubble user";
      userBubble.textContent = question;

      const answerBubble = document.createElement("div");
      answerBubble.className = "bubble bot";

      const matched = answers.find(item =>
        item.keywords.some(keyword => question.includes(keyword))
      );

      answerBubble.textContent = matched
        ? matched.answer
        : "कृपया संबंधित सरकारी पोर्टल पर जानकारी जाँचें।";

      chatBody.append(userBubble, answerBubble);
    });
  });

  // 6. APPLICATION TRACKER
  const nameInput = document.getElementById("trackerName");
  const dateInput = document.getElementById("trackerDate");
  const statusInput = document.getElementById("trackerStatus");
  const addButton = document.getElementById("addTracker");
  const trackerList = document.getElementById("trackerList");

  if (nameInput && dateInput && statusInput && addButton && trackerList) {
    let applications = [];

    try {
      applications = JSON.parse(
        localStorage.getItem("formsaathi-applications") || "[]"
      );

      if (!Array.isArray(applications)) applications = [];
    } catch (error) {
      applications = [];
    }

    function saveApplications() {
      try {
        localStorage.setItem(
          "formsaathi-applications",
          JSON.stringify(applications)
        );
      } catch (error) {
        alert("डेटा सेव नहीं हो पाया।");
      }
    }

    function renderApplications() {
      trackerList.replaceChildren();

      if (applications.length === 0) {
        const message = document.createElement("p");
        message.textContent = "अभी कोई आवेदन सेव नहीं है।";
        trackerList.appendChild(message);
        return;
      }

      applications.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "form-card";

        const title = document.createElement("h3");
        title.textContent = item.name;

        const date = document.createElement("p");
        date.textContent = "अंतिम तारीख: " + (item.date || "नहीं दी गई");

        const status = document.createElement("p");
        status.textContent = "स्थिति: " + item.status;

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "आवेदन हटाएँ";

        remove.addEventListener("click", () => {
          applications.splice(index, 1);
          saveApplications();
          renderApplications();
        });

        card.append(title, date, status, remove);
        trackerList.appendChild(card);
      });
    }

    addButton.addEventListener("click", () => {
      const name = nameInput.value.trim();

      if (!name) {
        alert("कृपया फॉर्म का नाम लिखें।");
        return;
      }

      applications.push({
        name: name,
        date: dateInput.value,
        status: statusInput.value
      });

      saveApplications();

      nameInput.value = "";
      dateInput.value = "";
      statusInput.value = "अभी भरना है";

      renderApplications();
      alert("आपका आवेदन सेव हो गया!");
    });

    renderApplications();
  }

  // 7. SERVICE WORKER
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(error => {
        console.log("Service Worker registration failed:", error);
      });
    });
  }

});
        
