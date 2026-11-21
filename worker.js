// Cloudflare Worker: API key सिर्फ यहाँ (Secret) रहती है, वेबसाइट में कभी नहीं।
const SYSTEM = "तुम FormSaathi AI हो, भारत (खासकर राजस्थान) के विद्यार्थियों के सहायक। सरल हिंदी में छोटे उत्तर दो। छात्रवृत्ति, भर्ती, फॉर्म और परीक्षा पर मार्गदर्शन दो। तिथि, राशि, पद संख्या या पात्रता कभी अंदाज़े से मत बताओ; हमेशा कहो कि आधिकारिक वेबसाइट/अधिसूचना से जाँचें। असंबंधित विषयों पर विनम्रता से मना करो।";
export default {
  async fetch(req, env) {
    const origin = env.ALLOWED_ORIGIN; // जैसे https://yourname.github.io
    const cors = { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
    const out = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (req.method !== 'POST' || req.headers.get('Origin') !== origin) return out({ error: 'forbidden' }, 403);
    let b; try { b = await req.json(); } catch { return out({ error: 'bad request' }, 400); }
    let msgs = (Array.isArray(b.messages) ? b.messages : []).slice(-10)
      .map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content || '').slice(0, 1000) }));
    while (msgs.length && msgs[0].role !== 'user') msgs.shift();
    if (!msgs.length || msgs[msgs.length - 1].role !== 'user') return out({ error: 'bad request' }, 400);
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: env.MODEL || 'claude-haiku-5-5', max_tokens: 600, system: SYSTEM, messages: msgs })
    });
    if (!r.ok) return out({ error: 'upstream error' }, 502);
    const d = await r.json();
    return out({ text: (d.content || []).filter(c => c.type === 'text').map(c => c.text).join('') });
  }
};
