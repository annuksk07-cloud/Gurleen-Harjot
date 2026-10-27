import { HOST_PHONE, HOST_PHONE_DISPLAY, HOST_WHATSAPP, WeddingConfig } from '../config';

export interface ContactTranslationStrings {
  callForDirections: string;
  whatsappUs: string;
  askAboutEvent: string;
  travelHelpNote: string;
  travelHelpButton: string;
  pickupNeededLabel: string;
  footerQuestionsLine: string;
  replyWithLove: string;
  sendOnWhatsApp: string;
  confirmTicketCta: string;
  fullDetailsCopiedToast: string;
  manualSendErrorToast: string;
  callHostAria: string;
}

export const CONTACT_TRANSLATIONS: Record<string, ContactTranslationStrings> = {
  en: {
    callForDirections: 'Call for directions',
    whatsappUs: 'WhatsApp us',
    askAboutEvent: 'Ask about this event',
    travelHelpNote: 'Need help with travel?',
    travelHelpButton: 'Need help with travel? WhatsApp us',
    pickupNeededLabel: 'Pickup needed (Station / Airport)',
    footerQuestionsLine: 'Questions? We are one message away',
    replyWithLove: 'Reply with love',
    sendOnWhatsApp: 'Send on WhatsApp',
    confirmTicketCta: 'Confirm ticket & send on WhatsApp',
    fullDetailsCopiedToast: 'Full details copied, please paste them in the chat',
    manualSendErrorToast: 'Could not complete automatically. Please send your details to {phone}',
    callHostAria: 'Call host',
  },
  hi: {
    callForDirections: 'रास्ते के लिए कॉल करें',
    whatsappUs: 'व्हाट्सएप करें',
    askAboutEvent: 'इस उत्सव के बारे में पूछें',
    travelHelpNote: 'यात्रा में मदद चाहिए?',
    travelHelpButton: 'यात्रा में मदद चाहिए? व्हाट्सएप करें',
    pickupNeededLabel: 'पिकअप चाहिए? (स्टेशन / एयरपोर्ट)',
    footerQuestionsLine: 'कोई सवाल है? हम बस एक संदेश दूर हैं',
    replyWithLove: 'प्यार के साथ जवाब दें',
    sendOnWhatsApp: 'व्हाट्सएप पर भेजें',
    confirmTicketCta: 'टिकट पक्का करें और व्हाट्सएप पर भेजें',
    fullDetailsCopiedToast: 'पूरी जानकारी कॉपी हो गई है, कृपया चैट में पेस्ट करें',
    manualSendErrorToast: 'स्वतः पूरा नहीं हो सका। कृपया अपनी जानकारी {phone} पर भेजें',
    callHostAria: 'मेज़बान को कॉल करें',
  },
  pa: {
    callForDirections: 'ਰਸਤੇ ਲਈ ਕਾਲ ਕਰੋ',
    whatsappUs: 'ਵਟਸਐਪ ਕਰੋ',
    askAboutEvent: 'ਇਸ ਸਮਾਗਮ ਬਾਰੇ ਪੁੱਛੋ',
    travelHelpNote: 'ਸਫ਼ਰ ਵਿੱਚ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?',
    travelHelpButton: 'ਸਫ਼ਰ ਵਿੱਚ ਮਦਦ ਚਾਹੀਦੀ ਹੈ? ਵਟਸਐਪ ਕਰੋ',
    pickupNeededLabel: 'ਪਿਕਅੱਪ ਚਾਹੀਦਾ ਹੈ? (ਸਟੇਸ਼ਨ / ਏਅਰਪੋਰਟ)',
    footerQuestionsLine: 'ਕੋਈ ਸਵਾਲ ਹੈ? ਅਸੀਂ ਸਿਰਫ਼ ਇੱਕ ਸੁਨੇਹੇ ਦੀ ਦੂਰੀ ਤੇ ਹਾਂ',
    replyWithLove: 'ਪਿਆਰ ਨਾਲ ਜਵਾਬ ਦਿਓ',
    sendOnWhatsApp: 'ਵਟਸਐਪ ਤੇ ਭੇਜੋ',
    confirmTicketCta: 'ਟਿਕਟ ਪੱਕੀ ਕਰੋ ਅਤੇ ਵਟਸਐਪ ਤੇ ਭੇਜੋ',
    fullDetailsCopiedToast: 'ਪੂਰੀ ਜਾਣਕਾਰੀ ਕਾਪੀ ਹੋ ਗਈ ਹੈ, ਕਿਰਪਾ ਕਰਕੇ ਚੈਟ ਵਿੱਚ ਪੇਸਟ ਕਰੋ',
    manualSendErrorToast: 'ਆਪਣੇ ਆਪ ਪੂਰਾ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਜਾਣਕਾਰੀ {phone} ਤੇ ਭੇਜੋ',
    callHostAria: 'ਮੇਜ਼ਬਾਨ ਨੂੰ ਕਾਲ ਕਰੋ',
  },
  mr: {
    callForDirections: 'मार्गासाठी कॉल करा',
    whatsappUs: 'व्हॉट्सअ‍ॅप करा',
    askAboutEvent: 'या सोहळ्याबद्दल विचारा',
    travelHelpNote: 'प्रवासात मदत हवी आहे का?',
    travelHelpButton: 'प्रवासात मदत हवी आहे? व्हॉट्सअ‍ॅप करा',
    pickupNeededLabel: 'पिकअप हवे आहे का? (स्टेशन / विमानतळ)',
    footerQuestionsLine: 'काही प्रश्न आहेत? आम्ही फक्त एका मेसेजच्या अंतरावर आहोत',
    replyWithLove: 'प्रेमाने उत्तर द्या',
    sendOnWhatsApp: 'व्हॉट्सअ‍ॅपवर पाठवा',
    confirmTicketCta: 'तिकीट निश्चित करा आणि व्हॉट्सअ‍ॅपवर पाठवा',
    fullDetailsCopiedToast: 'सर्व तपशील कॉपी झाले आहेत, कृपया चॅटमध्ये पेस्ट करा',
    manualSendErrorToast: 'आपोआप पूर्ण होऊ शकले नाही. कृपया आपला तपशील {phone} वर पाठवा',
    callHostAria: 'यजमानांना कॉल करा',
  },
  gu: {
    callForDirections: 'રસ્તા માટે કૉલ કરો',
    whatsappUs: 'વોટ્સએપ કરો',
    askAboutEvent: 'આ પ્રસંગ વિશે પૂછો',
    travelHelpNote: 'મુસાફરીમાં મદદ જોઈએ છે?',
    travelHelpButton: 'મુસાફરીમાં મદદ જોઈએ છે? વોટ્સએપ કરો',
    pickupNeededLabel: 'પિકઅપ જોઈએ છે? (સ્ટેશન / એરપોર્ટ)',
    footerQuestionsLine: 'કોઈ પ્રશ્ન છે? અમે ફક્ત એક સંદેશ દૂર છીએ',
    replyWithLove: 'પ્રેમથી જવાબ આપો',
    sendOnWhatsApp: 'વોટ્સએપ પર મોકલો',
    confirmTicketCta: 'ટિકિટ કન્ફર્મ કરો અને વોટ્સએપ પર મોકલો',
    fullDetailsCopiedToast: 'સંપૂર્ણ વિગતો કોપી થઈ ગઈ છે, કૃપા કરીને ચેટમાં પેસ્ટ કરો',
    manualSendErrorToast: 'આપમેળે પૂર્ણ થઈ શક્યું નથી. કૃપા કરીને તમારી વિગતો {phone} પર મોકલો',
    callHostAria: 'યજમાનને કૉલ કરો',
  },
  bn: {
    callForDirections: 'পথের জন্য কল করুন',
    whatsappUs: 'হোয়াটসঅ্যাপ করুন',
    askAboutEvent: 'এই অনুষ্ঠান সম্পর্কে জিজ্ঞাসা করুন',
    travelHelpNote: 'যাত্রায় সাহায্য প্রয়োজন?',
    travelHelpButton: 'যাত্রায় সাহায্য প্রয়োজন? হোয়াটসঅ্যাপ করুন',
    pickupNeededLabel: 'পিকআপ প্রয়োজন? (স্টেশন / এয়ারপোর্ট)',
    footerQuestionsLine: 'কোনো প্রশ্ন আছে? আমরা মাত্র এক বার্তা দূরে',
    replyWithLove: 'ভালোবাসার সাথে উত্তর দিন',
    sendOnWhatsApp: 'হোয়াটসঅ্যাপে পাঠান',
    confirmTicketCta: 'টিকিট নিশ্চিত করুন ও হোয়াটসঅ্যাপে পাঠান',
    fullDetailsCopiedToast: 'সম্পূর্ণ বিবরণ কপি হয়েছে, অনুগ্রহ করে চ্যাটে পেস্ট করুন',
    manualSendErrorToast: 'স্বয়ংক্রিয়ভাবে সম্পন্ন হয়নি। অনুগ্রহ করে আপনার বিবরণ {phone} নম্বরে পাঠান',
    callHostAria: 'আয়োজককে কল করুন',
  },
  bho: {
    callForDirections: 'रास्ता खातिर फोन करीं',
    whatsappUs: 'व्हाट्सएप करीं',
    askAboutEvent: 'ई रस्म के बारे में पूछीं',
    travelHelpNote: 'सफर में मदद चाहीं?',
    travelHelpButton: 'सफर में मदद चाहीं? व्हाट्सएप करीं',
    pickupNeededLabel: 'पिकअप चाहीं? (स्टेशन / एयरपोर्ट)',
    footerQuestionsLine: 'कवनो सवाल बा? हमनी बस एक सनेस दूर बानी जा',
    replyWithLove: 'दुलार से जवाब दीं',
    sendOnWhatsApp: 'व्हाट्सएप पर भेजीं',
    confirmTicketCta: 'टिकट पक्का करीं आ व्हाट्सएप पर भेजीं',
    fullDetailsCopiedToast: 'पूरा जानकारी कॉपी हो गइल बा, कृपया चैट में पेस्ट कर दीं',
    manualSendErrorToast: 'अपने आप ना हो पावल। कृपया आपन जानकारी {phone} पर भेजीं',
    callHostAria: 'मेजबान के फोन करीं',
  },
  ta: {
    callForDirections: 'வழி அறிய அழைக்கவும்',
    whatsappUs: 'வாட்ஸ்அப் செய்யவும்',
    askAboutEvent: 'இந்த நிகழ்வைப் பற்றி கேளுங்கள்',
    travelHelpNote: 'பயணத்தில் உதவி தேவையா?',
    travelHelpButton: 'பயண உதவிக்கு வாட்ஸ்அப் செய்யவும்',
    pickupNeededLabel: 'பிக்அப் தேவையா? (நிலையம் / விமான நிலையம்)',
    footerQuestionsLine: 'கேள்விகள் உள்ளதா? நாங்கள் ஒரு செய்தி தொலைவில் உள்ளோம்',
    replyWithLove: 'அன்புடன் பதிலளிக்கவும்',
    sendOnWhatsApp: 'வாட்ஸ்அப்பில் அனுப்பவும்',
    confirmTicketCta: 'டிக்கெட்டை உறுதிசெய்து வாட்ஸ்அப்பில் அனுப்பவும்',
    fullDetailsCopiedToast: 'முழு விவரங்களும் நகலெடுக்கப்பட்டன, அரட்டையில் ஒட்டவும்',
    manualSendErrorToast: 'தானாக முடிக்க முடியவில்லை. உங்கள் விவரங்களை {phone} என்ற எண்ணிற்கு அனுப்பவும்',
    callHostAria: 'விருந்தோம்பியை அழைக்கவும்',
  },
  te: {
    callForDirections: 'దారి కోసం కాల్ చేయండి',
    whatsappUs: 'వాట్సాప్ చేయండి',
    askAboutEvent: 'ఈ వేడుక గురించి అడగండి',
    travelHelpNote: 'ప్రయాణంలో సహాయం కావాలా?',
    travelHelpButton: 'ప్రయాణ సహాయం కోసం వాట్సాప్ చేయండి',
    pickupNeededLabel: 'పికప్ కావాలా? (స్టేషన్ / ఎయిర్‌పోర్ట్)',
    footerQuestionsLine: 'ప్రశ్నలు ఉన్నాయా? మేము ఒక్క సందేశం దూరంలో ఉన్నాము',
    replyWithLove: 'ప్రేమతో సమాధానం ఇవ్వండి',
    sendOnWhatsApp: 'వాట్సాప్‌లో పంపండి',
    confirmTicketCta: 'టికెట్ నిర్ధారించి వాట్సాప్‌లో పంపండి',
    fullDetailsCopiedToast: 'పూర్తి వివరాలు కాపీ చేయబడ్డాయి, దయచేసి చాట్‌లో పేస్ట్ చేయండి',
    manualSendErrorToast: 'స్వయంచాలకంగా పూర్తి కాలేదు. దయచేసి మీ వివరాలను {phone} కు పంపండి',
    callHostAria: 'ఆతిథ్యమిచ్చేవారికి కాల్ చేయండి',
  },
  kn: {
    callForDirections: 'ದಾರಿ ತಿಳಿಯಲು ಕರೆ ಮಾಡಿ',
    whatsappUs: 'ವಾಟ್ಸಾಪ್ ಮಾಡಿ',
    askAboutEvent: 'ಈ ಸಮಾರಂಭದ ಬಗ್ಗೆ ಕೇಳಿ',
    travelHelpNote: 'ಪ್ರಯಾಣಕ್ಕೆ ಸಹಾಯ ಬೇಕೇ?',
    travelHelpButton: 'ಪ್ರಯಾಣದ ಸಹಾಯಕ್ಕಾಗಿ ವಾಟ್ಸಾಪ್ ಮಾಡಿ',
    pickupNeededLabel: 'ಪಿಕಪ್ ಬೇಕೇ? (ನಿಲ್ದಾಣ / ವಿಮಾನ ನಿಲ್ದಾಣ)',
    footerQuestionsLine: 'ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ನಾವು ಒಂದೇ ಸಂದೇಶದ ದೂರದಲ್ಲಿದ್ದೇವೆ',
    replyWithLove: 'ಪ್ರೀತಿಯಿಂದ ಉತ್ತರಿಸಿ',
    sendOnWhatsApp: 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕಳುಹಿಸಿ',
    confirmTicketCta: 'ಟಿಕೆಟ್ ಖಚಿತಪಡಿಸಿ ಮತ್ತು ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಕಳುಹಿಸಿ',
    fullDetailsCopiedToast: 'ಪೂರ್ಣ ವಿವರಗಳನ್ನು ಕಾಪಿ ಮಾಡಲಾಗಿದೆ, ದಯವಿಟ್ಟು ಚಾಟ್‌ನಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ',
    manualSendErrorToast: 'ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪೂರ್ಣಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ವಿವರಗಳನ್ನು {phone} ಗೆ ಕಳುಹಿಸಿ',
    callHostAria: 'ಆತಿಥೇಯರಿಗೆ ಕರೆ ಮಾಡಿ',
  },
  ml: {
    callForDirections: 'വഴി അറിയാൻ വിളിക്കുക',
    whatsappUs: 'വാട്ട്‌സ്ആപ്പ് ചെയ്യുക',
    askAboutEvent: 'ഈ ചടങ്ങിനെക്കുറിച്ച് ചോദിക്കുക',
    travelHelpNote: 'യാത്രയിൽ സഹായം വേണോ?',
    travelHelpButton: 'യാത്രാ സഹായത്തിന് വാട്ട്‌സ്ആപ്പ് ചെയ്യുക',
    pickupNeededLabel: 'പിക്കപ്പ് വേണോ? (സ്റ്റേഷൻ / എയർപോർട്ട്)',
    footerQuestionsLine: 'ചോദ്യങ്ങളുണ്ടോ? ഞങ്ങൾ ഒരു സന്ദേശം അകലെയാണ്',
    replyWithLove: 'സ്നേഹത്തോടെ മറുപടി നൽകുക',
    sendOnWhatsApp: 'വാട്ട്‌സ്ആപ്പിൽ അയയ്ക്കുക',
    confirmTicketCta: 'ടിക്കറ്റ് സ്ഥിരീകരിച്ച് വാട്ട്‌സ്ആപ്പിൽ അയയ്ക്കുക',
    fullDetailsCopiedToast: 'മുഴുവൻ വിവരങ്ങളും പകർത്തി, ദയവായി ചാറ്റിൽ പേസ്റ്റ് ചെയ്യുക',
    manualSendErrorToast: 'സ്വയമേവ പൂർത്തിയാക്കാൻ കഴിഞ്ഞില്ല. നിങ്ങളുടെ വിവരങ്ങൾ {phone} എന്ന നമ്പറിലേക്ക് അയയ്ക്കുക',
    callHostAria: 'ആതിഥേയരെ വിളിക്കുക',
  },
  ur: {
    callForDirections: 'راستے کے لیے کال کریں',
    whatsappUs: 'واٹس ایپ کریں',
    askAboutEvent: 'اس تقریب کے بارے میں پوچھیں',
    travelHelpNote: 'سفر میں مدد چاہیے؟',
    travelHelpButton: 'سفر میں مدد چاہیے؟ واٹس ایپ کریں',
    pickupNeededLabel: 'پک اپ چاہیے؟ (اسٹیشن / ایئرپورٹ)',
    footerQuestionsLine: 'کوئی سوال ہے؟ ہم بس ایک پیغام کی دوری پر ہیں',
    replyWithLove: 'محبت کے ساتھ جواب دیں',
    sendOnWhatsApp: 'واٹس ایپ پر بھیجیں',
    confirmTicketCta: 'ٹکٹ کنفرم کریں اور واٹس ایپ پر بھیجیں',
    fullDetailsCopiedToast: 'مکمل تفصیلات کاپی ہو گئی ہیں، براہ کرم چیٹ میں پیسٹ کریں',
    manualSendErrorToast: 'خودکار طور پر مکمل نہیں ہو سکا۔ براہ کرم اپنی تفصیلات {phone} پر بھیجیں',
    callHostAria: 'میزبان کو کال کریں',
  },
};

export function getContactTranslations(langCode?: string): ContactTranslationStrings {
  const normalized = (langCode || 'en').trim().toLowerCase();
  return CONTACT_TRANSLATIONS[normalized] || CONTACT_TRANSLATIONS.en;
}

export function buildHostTelHref(config?: Partial<WeddingConfig>): string {
  const whatsappDigits = (config?.HOST_WHATSAPP || HOST_WHATSAPP).replace(/[^0-9]/g, '');
  const phoneDigits = (config?.HOST_PHONE || HOST_PHONE).replace(/[^0-9]/g, '');
  const fullIntl = whatsappDigits.startsWith('91') ? whatsappDigits : `91${phoneDigits}`;
  return `tel:+${fullIntl}`;
}

export function buildHostWhatsAppHref(text?: string, config?: Partial<WeddingConfig>): string {
  const whatsappDigits = (config?.HOST_WHATSAPP || config?.RSVP_WHATSAPP_NUMBER || HOST_WHATSAPP).replace(
    /[^0-9]/g,
    ''
  );
  if (!text) {
    return `https://wa.me/${whatsappDigits}`;
  }
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(text)}`;
}

export function formatManualSendToast(langCode?: string, config?: Partial<WeddingConfig>): string {
  const t = getContactTranslations(langCode);
  const displayPhone = config?.HOST_PHONE_DISPLAY || HOST_PHONE_DISPLAY;
  return t.manualSendErrorToast.replace('{phone}', displayPhone);
}
