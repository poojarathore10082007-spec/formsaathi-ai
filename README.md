# FormSaathi AI — शुरुआती मोबाइल-फ्रेंडली वेबसाइट

## इस ZIP में क्या है?
- मोबाइल-फ्रेंडली हिंदी वेबसाइट
- फॉर्म/योजना कार्ड और सर्च/कैटेगरी फ़िल्टर
- शुरुआती स्कॉलरशिप Finder (यह पात्रता की अंतिम पुष्टि नहीं करता)
- डॉक्यूमेंट चेकलिस्ट (ब्राउज़र में सेव)
- FAQ आधारित डेमो सहायता चैट
- PWA manifest और service worker (इंस्टॉल/ऑफलाइन बेसिक सपोर्ट)
- गोपनीयता और अस्वीकरण के शुरुआती पेज

## मोबाइल से कैसे चलाएँ?
1. ZIP को फोन में Extract करें।
2. `index.html` खोलकर preview देखें। कुछ मोबाइल फाइल मैनेजर में JavaScript/Service Worker सीमित हो सकते हैं।
3. ऑनलाइन चलाने के लिए GitHub Pages या Netlify जैसे static hosting पर सभी फाइलें एक साथ अपलोड करें।
4. वेबसाइट HTTPS पर खुलने के बाद Chrome के मेन्यू से “Install app” / “Add to Home screen” चुनें।

## जरूरी सीमाएँ
- यह पहला frontend prototype है; अभी कोई असली AI API, user login, database, live सरकारी डेटा, भुगतान, विज्ञापन या admin panel नहीं है।
- कार्ड में दिए आधिकारिक लिंक शुरुआत के लिए हैं; प्रकाशित करने से पहले हर लिंक और वर्तमान योजना विवरण जाँचें।
- Premium बटन/भुगतान अभी जोड़ा नहीं गया है। वास्तविक भुगतान से पहले backend, सुरक्षा और वैधानिक अनुपालन चाहिए।
- Android Play Store ऐप के लिए बाद में PWA wrapper/Capacitor और Play Console प्रक्रिया करनी होगी।

## अगला विकास चरण
1. सरकारी योजनाओं के verified records और admin update panel
2. सुरक्षित backend + user accounts (केवल जरूरत होने पर)
3. AI सहायता के लिए सुरक्षित server-side API integration
4. वैध payment gateway और subscription management
5. विज्ञापन/analytics और स्पष्ट consent/privacy controls
