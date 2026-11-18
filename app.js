

<section class="section tinted" id="tracker">
  <div class="section-head">
    <div>
      <span class="eyebrow">APPLICATION TRACKER</span>
      <h2>मेरा आवेदन ट्रैकर</h2>
      <p>अपने भरे हुए फॉर्म का रिकॉर्ड रखें।</p>
    </div>
  </div>

  <div class="finder">
    <div>
      <label for="trackerName">फॉर्म का नाम</label>
      <input id="trackerName" type="text" placeholder="जैसे REET 2027">
    </div>
    <div>
      <label for="trackerDate">अंतिम तारीख</label>
      <input id="trackerDate" type="date">
    </div>
    <div>
      <label for="trackerStatus">आवेदन की स्थिति</label>
      <select id="trackerStatus">
        <option>अभी भरना है</option>
        <option>आवेदन पूरा हुआ</option>
        <option>दस्तावेज जाँचने हैं</option>
      </select>
    </div>
    <button class="primary-btn full" id="addTracker">आवेदन सेव करें</button>
  </div>

  <div id="trackerList" class="cards"></div>
</secti
  on>

(() => {
  const nameInput = document.getElementById("trackerName");
  const dateInput = document.getElementById("trackerDate");
  const statusInput = document.getElementById("trackerStatus");
  const addButton = document.getElementById("addTracker");
  const list = document.getElementById("trackerList");

  if (!nameInput || !dateInput || !statusInput || !addButton || !list) return;

  let applications = [];

  try {
    applications = JSON.parse(
      localStorage.getItem("formsaathi-applications") || "[]"
    );
    if (!Array.isArray(applications)) applications = [];
  } catch (error) {
    applications = [];
  }

  function save() {
    try {
      localStorage.setItem(
        "formsaathi-applications",
        JSON.stringify(applications)
      );
    } catch (error) {
      alert("डेटा सेव नहीं हो पाया।");
    }
  }

  function render() {
    list.replaceChildren();

    if (applications.length === 0) {
      const message = document.createElement("p");
      message.textContent = "अभी कोई आवेदन सेव नहीं है।";
      list.appendChild(message);
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
        save();
        render();
      });

      card.append(title, date, status, remove);
      list.appendChild(card);
    });
  }

  addButton.addEventListener("click", () => {
    const name = nameInput.value.trim();

    if (!name) {
      alert("कृपया फॉर्म का नाम लिखें।");
      return;
    }

    applications.push({
      name,
      date: dateInput.value,
      status: statusInput.value
    });

    save();
    nameInput.value = "";
    dateInput.value = "";
    statusInput.value = "अभी भरना है";
    render();

    alert("आपका आवेदन सेव हो गया!");
  });
      

  render();
})();
