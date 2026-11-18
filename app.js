

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
