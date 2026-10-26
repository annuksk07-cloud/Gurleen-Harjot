import { WeddingConfig } from '../config';

export interface Relative {
  aliases: string[];
  display: string;
  displayByLang?: Record<string, string>;
  chipEn: string;
  chipHi: string;
  en: string;
  hi: string;
}

export const RELATIVES: Relative[] = [
  {
    aliases: ["rashmi fua", "rashmi"],
    display: "Rashmi Fua ji",
    displayByLang: { hi: "रश्मि बुआ जी", pa: "ਰਸ਼ਮੀ ਭੂਆ ਜੀ" },
    chipEn: "Your dear aunt (Fua)",
    chipHi: "आपकी प्यारी बुआ जी",
    en: "From the day we learned to walk, you have held our hands and blessed every step. Our wedding feels complete only when your blessings are part of it. Please come early and sit with us, because we saved a very special seat for you.",
    hi: "जबसे हमने चलना सीखा, आपने हमारा हाथ थामा और हर कदम पर आशीर्वाद दिया। आपके आशीर्वाद के बिना हमारी शादी अधूरी है। ज़रा जल्दी आइएगा, आपके लिए हमने ख़ास जगह रखी है।"
  },
  {
    aliases: ["ramesh kumar", "ramesh"],
    display: "Ramesh Kumar ji",
    displayByLang: { hi: "रमेश कुमार जी", pa: "ਰਮੇਸ਼ ਕੁਮਾਰ ਜੀ" },
    chipEn: "Our dear family friend",
    chipHi: "हमारे प्यारे पारिवारिक मित्र",
    en: "You have been part of our family stories for so long that we never thought of you as a guest. Your laughter and your advice are a big part of who we are. Please bring your smile and your dancing shoes, because the dance floor is waiting!",
    hi: "आप हमारे परिवार की कहानियों में इतने समय से हैं कि हमने आपको कभी मेहमान माना ही नहीं। आपकी हँसी और सलाह हमारे जीवन का हिस्सा है। अपनी मुस्कान और नाचने वाले जूते साथ लाइएगा, डांस फ्लोर आपका इंतज़ार कर रहा है!"
  },
  {
    aliases: ["harpreet mausi", "harpreet", "mausi"],
    display: "Harpreet Mausi",
    displayByLang: { hi: "हरप्रीत मौसी", pa: "ਹਰਪ੍ਰੀਤ ਮਾਸੀ" },
    chipEn: "Your lovely aunt (Mausi)",
    chipHi: "आपकी प्यारी मौसी",
    en: "You were the first to know our secret and the first to keep it! Thank you for every sweet dish and every scolding that was really love. Come ready to dance, because no wedding feels like a wedding without Mausi.",
    hi: "हमारा राज़ सबसे पहले आपको पता चला और सबसे पहले आपने ही उसे संभाला! हर मिठाई और हर डाँट के लिए शुक्रिया, जो असल में प्यार थी। नाचने के लिए तैयार होकर आइएगा, मौसी के बिना कोई शादी शादी नहीं लगती।"
  },
  {
    aliases: ["gurmeet chacha", "gurmeet"],
    display: "Gurmeet Chacha ji",
    displayByLang: { hi: "गुरमीत चाचा जी", pa: "ਗੁਰਮੀਤ ਚਾਚਾ ਜੀ" },
    chipEn: "Our dear uncle (Chacha)",
    chipHi: "हमारे प्यारे चाचा जी",
    en: "You taught us to be brave and to laugh at our own mistakes. As we start a new journey, your hand on our shoulder means the world. Please come and bless us, and save one bhangra for us.",
    hi: "आपने हमें हिम्मत से जीना और अपनी गलतियों पर हँसना सिखाया। नई राह पर चलते वक़्त हमारे कंधे पर आपका हाथ हमारे लिए बहुत बड़ी बात है। आकर आशीर्वाद दीजिए, और एक भांगड़ा हमारे लिए बचाकर रखिए।"
  },
  {
    aliases: ["sunita mami", "sunita", "mami"],
    display: "Sunita Mami ji",
    displayByLang: { hi: "सुनीता मामी जी", pa: "ਸੁਨੀਤਾ ਮਾਮੀ ਜੀ" },
    chipEn: "Our dear aunt (Mami)",
    chipHi: "हमारी प्यारी मामी जी",
    en: "Your hugs always smelled of home-cooked love, and you always made us feel like your own children. We cannot wait to see you with sweets in one hand and blessings in the other.",
    hi: "आपके गले लगने में हमेशा घर के खाने जैसा प्यार महकता था, और आपने हमें हमेशा अपने बच्चों जैसा माना। एक हाथ में मिठाई और दूसरे में आशीर्वाद लिए आपको देखने का इंतज़ार है।"
  },
  {
    aliases: ["balwinder tau", "balwinder", "tau"],
    display: "Balwinder Tau ji",
    displayByLang: { hi: "बलविंदर ताऊ जी", pa: "ਬਲਵਿੰਦਰ ਤਾਇਆ ਜੀ" },
    chipEn: "Our dear uncle (Tau ji)",
    chipHi: "हमारे आदरणीय ताऊ जी",
    en: "You are the pillar of our family and the one we all look up to. Your stories, your blessings and your presence will make our day truly royal. We would be honoured to have you lead the family in blessing us.",
    hi: "आप हमारे परिवार का सहारा हैं और हम सबके आदर्श। आपकी कहानियाँ, आशीर्वाद और मौजूदगी हमारे दिन को सचमुच शाही बना देंगी। परिवार की ओर से हमें आशीर्वाद देने का सम्मान आपको ही मिले, यही हमारी इच्छा है।"
  },
  {
    aliases: ["dadi", "dadi ji", "dadiji", "surinder kaur"],
    display: "Dadi ji",
    displayByLang: { hi: "दादी जी", pa: "ਦਾਦੀ ਜੀ" },
    chipEn: "Our beloved grandmother",
    chipHi: "हमारी प्यारी दादी जी",
    en: "Every prayer in our house began with you, and so did this love story. Your blessings are the biggest gift we could ask for. Please take the best seat, because today you are our queen.",
    hi: "हमारे घर की हर दुआ आपसे शुरू हुई, और ये प्रेम कहानी भी। आपका आशीर्वाद हमारे लिए सबसे बड़ा तोहफ़ा है। सबसे अच्छी कुर्सी पर बैठिएगा, क्योंकि आज आप हमारी महारानी हैं।"
  },
  {
    aliases: ["pooja bhabhi", "pooja", "puja bhabhi", "bhabhi"],
    display: "Pooja Bhabhi",
    displayByLang: { hi: "पूजा भाभी", pa: "ਪੂਜਾ ਭਾਬੀ" },
    chipEn: "Our dear sister-in-law (Bhabhi)",
    chipHi: "हमारी प्यारी भाभी",
    en: "You have been our best friend, our secret keeper and our fashion adviser. Thank you for being there at every step. Get ready with us, because the mehndi, the music and the masti are not complete without you.",
    hi: "आप हमारी सबसे अच्छी दोस्त, राज़दार और फ़ैशन सलाहकार रही हैं। हर कदम पर साथ देने के लिए शुक्रिया। हमारे साथ तैयार होइएगा, क्योंकि मेहंदी, संगीत और मस्ती आपके बिना अधूरी है।"
  },
  {
    aliases: ["rohit jija", "rohit"],
    display: "Rohit Jija ji",
    displayByLang: { hi: "रोहित जीजा जी", pa: "ਰੋਹਿਤ ਜੀਜਾ ਜੀ" },
    chipEn: "Our dear brother-in-law (Jija ji)",
    chipHi: "हमारे प्यारे जीजा जी",
    en: "Thank you for every joke, every ride and every time you made us feel at ease. We promise the food and the music will never run out. Come with full energy, because our favourite Jija ji must lead the dance!",
    hi: "हर मज़ाक, हर सफ़र और हर बार हमें सहज महसूस कराने के लिए शुक्रिया। हम वादा करते हैं कि खाना और संगीत कभी कम नहीं पड़ेगा। पूरे जोश के साथ आइएगा, डांस की अगुवाई हमारे प्यारे जीजा जी को ही करनी है!"
  },
  {
    aliases: ["tanya"],
    display: "Tanya",
    displayByLang: { hi: "तान्या", pa: "ਤਾਨਿਆ" },
    chipEn: "Our partner in crime (cousin)",
    chipHi: "हमारी शरारतों की साथी",
    en: "You are our partner in crime and the keeper of all our secrets, and this wedding could never happen without you. Let us dance until our feet hurt and take a hundred photos. Come ready, because the squad is only complete with you!",
    hi: "तुम हमारी हर शरारत की साथी और हमारे राज़ों की रखवाली हो, और तुम्हारे बिना ये शादी हो ही नहीं सकती। चलो इतना नाचें कि पैर दुखने लगें और सौ तस्वीरें खींचें। तैयार होकर आना, टोली तुम्हारे बिना अधूरी है!"
  }
];

export const GENERIC_MESSAGES = [
  {
    en: "Your presence will make our day brighter, and we are so happy to share this special time with you. Please come with a big smile and lots of blessings!",
    hi: "आपके आने से हमारा दिन और भी खूबसूरत हो जाएगा। इस ख़ास पल को आपके साथ बाँटकर हमें बहुत खुशी होगी। मुस्कान और आशीर्वाद के साथ आइएगा!"
  },
  {
    en: "Some people turn ordinary days into memories, and you are one of them. Thank you for being part of our story. We cannot wait to celebrate with you.",
    hi: "कुछ लोग आम दिनों को यादों में बदल देते हैं, आप उन्हीं में से हैं। हमारी कहानी का हिस्सा बनने के लिए शुक्रिया। आपके साथ जश्न मनाने का बेसब्री से इंतज़ार है।"
  },
  {
    en: "A wedding is only as warm as the people in it, and you are one of the warmest. Your blessings and good wishes mean the world to us. See you soon!",
    hi: "शादी की रौनक उसमें आने वाले अपनों से होती है, और आप सबसे ख़ास अपनों में हैं। आपकी दुआएँ हमारे लिए बहुत मायने रखती हैं। जल्द मिलते हैं!"
  }
];

const HONORIFICS = new Set(['ji', 'jee', 'sir', 'madam', 'mr', 'mrs', 'uncle', 'aunty']);

function normalizeTokens(input: string): string[] {
  const cleaned = (input || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .trim();

  if (!cleaned) return [];

  const rawTokens = cleaned.split(/\s+/).filter(Boolean);
  const mapped: string[] = [];

  for (const token of rawTokens) {
    if (HONORIFICS.has(token)) continue;
    if (token === 'bua' || token === 'buaji' || token === 'fufi' || token === 'fuaji') {
      mapped.push('fua');
    } else if (token === 'jijaji') {
      mapped.push('jija');
    } else if (token === 'tauji') {
      mapped.push('tau');
    } else if (token === 'dadiji') {
      mapped.push('dadi');
    } else if (token === 'mausiji') {
      mapped.push('mausi');
    } else if (token === 'chachaji') {
      mapped.push('chacha');
    } else if (token === 'mamiji') {
      mapped.push('mami');
    } else if (token === 'bhabhiji') {
      mapped.push('bhabhi');
    } else {
      mapped.push(token);
    }
  }

  return mapped;
}

export function matchRelative(name: string): Relative | null {
  const tokens = normalizeTokens(name);
  if (tokens.length === 0) return null;

  let bestMatch: Relative | null = null;
  let maxMatchedTokens = 0;
  let maxAliasLength = 0;

  for (const rel of RELATIVES) {
    for (const alias of rel.aliases) {
      const aliasTokens = normalizeTokens(alias);
      if (aliasTokens.length === 0) continue;

      const allPresent = aliasTokens.every((t) => tokens.includes(t));
      if (allPresent) {
        const tokenCount = aliasTokens.length;
        const charLen = aliasTokens.join(' ').length;
        if (
          tokenCount > maxMatchedTokens ||
          (tokenCount === maxMatchedTokens && charLen > maxAliasLength)
        ) {
          maxMatchedTokens = tokenCount;
          maxAliasLength = charLen;
          bestMatch = rel;
        }
      }
    }
  }

  return bestMatch;
}

export function toTitleCase(input: string): string {
  const trimmed = (input || '').trim();
  if (!trimmed) return '';
  return trimmed
    .split(/\s+/)
    .map((word) => {
      if (word.length === 0) return word;
      if (word.toLowerCase() === 'ji' || word.toLowerCase() === 'jee') {
        return 'ji';
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

export function getGuestDisplayName(
  rawName: string | null | undefined,
  langCode: string = 'en'
): string | null {
  const trimmed = (rawName || '').trim();
  if (!trimmed) return null;

  const relative = matchRelative(trimmed);
  if (relative) {
    const normalizedLang = (langCode || 'en').toLowerCase().trim();
    if (normalizedLang !== 'en' && relative.displayByLang?.[normalizedLang]) {
      return relative.displayByLang[normalizedLang];
    }
    return relative.display;
  }

  return toTitleCase(trimmed);
}

export function formatPersonalisedLine(
  template: string | undefined,
  guestDisplayName: string | null | undefined,
  extra?: Record<string, string>
): string {
  if (!template) return '';
  const cleanGuest = (guestDisplayName || '').trim();
  let result = template
    .replace(/\{guest\}/g, cleanGuest)
    .replace(/\{GUEST\}/g, cleanGuest.toUpperCase());

  if (extra) {
    for (const [key, val] of Object.entries(extra)) {
      const safeVal = (val || '').trim();
      result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), safeVal);
    }
  }

  // Collapse any doubled honorifics (e.g. "जी जी" -> "जी", "ਜੀ ਜੀ" -> "ਜੀ", "ji ji" -> "ji")
  result = result
    .replace(/जी\s+जी/g, 'जी')
    .replace(/ਜੀ\s+ਜੀ/g, 'ਜੀ')
    .replace(/\bji\s+ji\b/gi, 'ji')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return result;
}

export function getGenericMessage(name: string): { en: string; hi: string } {
  const clean = (name || 'guest').trim().toLowerCase() || 'guest';
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  return GENERIC_MESSAGES[Math.abs(hash) % GENERIC_MESSAGES.length];
}

export function getSafeCoupleSignOffNames(config?: Partial<WeddingConfig>): string {
  const brideFirst = config?.BRIDE?.firstName?.trim();
  const groomFirst = config?.GROOM?.firstName?.trim();
  if (brideFirst && groomFirst) {
    return `${brideFirst} and ${groomFirst}`;
  }
  if (config?.COUPLE_DISPLAY_NAMES) {
    const parts = config.COUPLE_DISPLAY_NAMES.split('&')
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]} and ${parts[1]}`;
    }
    if (parts.length === 1) {
      return parts[0];
    }
  }
  return 'Gurleen and Harjot';
}

export interface ResolvedPersonalNote {
  relative: Relative | null;
  isRelative: boolean;
  displayName: string;
  chip: string;
  greeting: string;
  message: string;
  signOff: string;
}

export function resolvePersonalNote(
  rawName: string | null | undefined,
  langCode: string = 'en',
  config?: Partial<WeddingConfig>
): ResolvedPersonalNote {
  const trimmed = (rawName || '').trim();
  const relative = trimmed ? matchRelative(trimmed) : null;
  const normalizedLang = (langCode || 'en').toLowerCase().trim();
  const isHi = normalizedLang === 'hi';

  const resolvedGuestName = getGuestDisplayName(trimmed, normalizedLang);
  const displayName =
    resolvedGuestName ||
    (isHi ? 'अतिथि' : 'guest');

  const chip = relative
    ? isHi
      ? relative.chipHi
      : relative.chipEn
    : isHi
      ? 'हमारे आदरणीय अतिथि'
      : 'Our honoured guest';

  const greeting = isHi ? `प्रिय ${displayName},` : `Dear ${displayName},`;

  const generic = getGenericMessage(trimmed || 'guest');
  const message = relative
    ? isHi
      ? relative.hi
      : relative.en
    : isHi
      ? generic.hi
      : generic.en;

  const coupleNames = getSafeCoupleSignOffNames(config);
  const signOff = isHi
    ? `ढेर सारे प्यार के साथ, ${coupleNames}`
    : `With all our love, ${coupleNames}`;

  return {
    relative,
    isRelative: Boolean(relative),
    displayName,
    chip,
    greeting,
    message,
    signOff,
  };
}
