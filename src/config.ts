/**
 * ============================================================================
 * SARSON SUBAH — MASTER WEDDING CONFIGURATION (EDIT IN 10 SECONDS)
 * ============================================================================
 * Every name, date, venue, phone number, media slot, and map link lives in
 * this ONE object. Update any value below to customize the entire invitation.
 */
export const WEDDING_CONFIG = {
  // 1. Opening Video & Audio Slots
  SAMPLE_MODE: true, // Show "Reset demo" link in footer
  VIDEO_SRC: "/wedding-video.mp4", // 9:16 10s envelope-to-mustard-fields video in /public
  POSTER_SRC: "", // Optional poster image URL
  AUDIO_SRC: "", // Optional external audio URL (synthesized ambient music plays if empty)
  REVEAL_DELAY_SECONDS: 8.0, // 10s video: last 2s calm archway holds & fades in text at 8.0s
  TAP_TO_OPEN_TEXT: "Tap to open invitation",
  VIDEO_PLACEHOLDER_LABEL: "Video yahan aayegi",

  // 2. Couple & Family Details
  COUPLE_DISPLAY_NAMES: "Gurleen & Harjot",
  namesByLang: {
    pa: "ਗੁਰਲੀਨ ਅਤੇ ਹਰਜੋਤ",
    hi: "गुरलीन और हरजोत",
    mr: "गुरलीन आणि हरजोत",
    gu: "ગુરલીન અને હરજોત",
    bn: "গুরলীন ও হরজোৎ",
    bho: "गुरलीन आ हरजोत",
    ta: "குர்லீன் & ஹர்ஜோத்",
    te: "గుర్లీన్ & హర్జోత్",
    kn: "ಗುರ್ಲೀನ್ & ಹರ್ಜೋತ್",
    ml: "ഗുർലീൻ & ഹർജോത്",
    ur: "گرلین اور ہرجوت",
  } as Record<string, string>,
  THEME_AUDIO_TRACKS: {
    sarson_subah: "", // e.g. "/audio/punjabi.mp3" — synthesizes tumbi/santoor melody when empty
    anand_karaj: "",
    kesariya_gulab: "",
    paithani: "",
    bandhani_garba: "",
    alpona: "",
    madhubani: "",
    kanjeevaram: "",
    pochampally: "",
    mysore_silk: "",
    kasavu: "",
    nikah: "",
    mehfil_e_gulab: "",
    white_aisle: "",
    kamal: "",
    blush_modern: "",
    punjabi: "",
    hindi: "",
    marathi: "",
    gujarati: "",
    bengali: "",
    bhojpuri: "",
    tamil: "",
    telugu: "",
    kannada: "",
    malayalam: "",
    urdu: "",
    english: "",
  } as Record<string, string>,
  WEDDING_DATE_DISPLAY: "12 · 12 · 2026",
  WEDDING_DATE_FULL: "Saturday, 12th December 2026",
  WEDDING_DATETIME_ISO: "2026-12-12T10:30:00+05:30",
  WEDDING_END_DATETIME_ISO: "2026-12-13T01:00:00+05:30",
  WEDDING_CITY: "Amritsar, Punjab",
  HASHTAG: "#GurleenWedsHarjot",

  // 2B. Sacred Header & Family Blessing Slots (Strictly opt-in & family-supplied)
  SACRED_HEADER: false, // Default false. When true, shows SACRED_HEADER_SYMBOL once at very top of opening header
  SACRED_HEADER_SYMBOL: "", // Optional single static symbol supplied by the family
  FAMILY_BLESSING_LINE: "", // Empty editable config string for family-supplied shlokas, gurbani, ayat, or Bible verses

  // 3. Multilingual Invitation Lines
  OPENING_HINDI_BLESSING: "शुभ विवाह",
  INVITATION_PUNJABI_LINE: "ਸਾਡੇ ਵਿਆਹ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
  INVITATION_HINDI_LINE: "आप सपरिवार सादर आमंत्रित हैं",
  INVITATION_ENGLISH_LINE: "Together with our families",
  INVITATION_SUBTEXT:
    "As golden mustard fields bloom in the winter sun, we invite you to share in our joy, prayers, and celebration of love.",

  // 3B. Real Stock Photos Config (Free-license Unsplash / Pexels CDN)
  PHOTOS: {
    bride: {
      src: "https://images.pexels.com/photos/30497750/pexels-photo-30497750.jpeg?auto=compress&cs=tinysrgb&w=1200",
      fallbackSrc: "/events/phere.png",
      credit: "Photo by Shivam on Pexels",
      sourceUrl: "https://www.pexels.com/photo/30497750/",
      alt: "Indian bride in a red bridal lehenga with jewelry and maang tikka",
    },
    groom: {
      src: "https://images.pexels.com/photos/35043826/pexels-photo-35043826.jpeg?auto=compress&cs=tinysrgb&w=1200",
      fallbackSrc: "/events/reception.png",
      credit: "Photo on Pexels",
      sourceUrl: "https://www.pexels.com/photo/35043826/",
      alt: "Indian groom in an ornate sherwani with talwar and pearl haar",
    },
    couple1: {
      src: "https://images.pexels.com/photos/32060316/pexels-photo-32060316.jpeg?auto=compress&cs=tinysrgb&w=1200",
      fallbackSrc: "/events/sangeet.png",
      credit: "Photo on Pexels",
      sourceUrl: "https://www.pexels.com/photo/32060316/",
      alt: "Indian wedding couple smiling warmly holding hands in traditional attire",
    },
    couple2: {
      src: "https://images.pexels.com/photos/35069916/pexels-photo-35069916.jpeg?auto=compress&cs=tinysrgb&w=1200",
      fallbackSrc: "/events/haldi.png",
      credit: "Photo on Pexels",
      sourceUrl: "https://www.pexels.com/photo/35069916/",
      alt: "Indian bride and groom in traditional wedding ceremony attire embracing warmly",
    },
  },

  // 4. Bride & Groom Profiles (with Photo Slots)
  BRIDE: {
    firstName: "Gurleen",
    fullName: "Gurleen Kaur Gill",
    firstNameByLang: {
      pa: "ਗੁਰਲੀਨ",
      hi: "गुरलीन",
      mr: "गुरलीन",
      gu: "ગુરલીન",
      bn: "গুরলীন",
      bho: "गुरलीन",
      ta: "குர்லீன்",
      te: "గుర్లీన్",
      kn: "ಗುರ್ಲೀನ್",
      ml: "ഗുർലീൻ",
      ur: "گرلین",
    } as Record<string, string>,
    fullNameByLang: {
      pa: "ਗੁਰਲੀਨ ਕੌਰ ਗਿੱਲ",
      hi: "गुरलीन कौर गिल",
      mr: "गुरलीन कौर गिल",
      gu: "ગુરલીन કૌર ગિલ",
      bn: "গুরলীন কৌর গিল",
      bho: "गुरलीन कौर गिल",
      ta: "குர்லீன் கௌர் கில்",
      te: "గుర్లీన్ కౌర్ గిల్",
      kn: "ಗುರ್ಲೀನ್ ಕೌರ್ ಗಿಲ್",
      ml: "ഗുർലീൻ കൗർ ഗിൽ",
      ur: "گرلین کور گل",
    } as Record<string, string>,
    parentsLine: "Daughter of Sardar Harpreet Singh & Sardarni Gurpreet Kaur Gill",
    bioLine: "An architect with a love for heritage courtyards, filter coffee, and winter mornings.",
    photoSrc: "https://images.pexels.com/photos/30497750/pexels-photo-30497750.jpeg?auto=compress&cs=tinysrgb&w=1200",
    fallbackSrc: "/events/phere.png",
    photoPlaceholderLabel: "Gurleen's Portrait Slot",
  },
  GROOM: {
    firstName: "Harjot",
    fullName: "Harjot Singh Randhawa",
    firstNameByLang: {
      pa: "ਹਰਜੋਤ",
      hi: "हरजोत",
      mr: "हरजोत",
      gu: "હરજોત",
      bn: "হরজোৎ",
      bho: "हरजोत",
      ta: "ஹர்ஜோத்",
      te: "హర్జోత్",
      kn: "ಹರ್ಜೋತ್",
      ml: "ഹർജോത്",
      ur: "ہرجوت",
    } as Record<string, string>,
    fullNameByLang: {
      pa: "ਹਰਜੋਤ ਸਿੰਘ ਰੰਧਾਵਾ",
      hi: "हरजोत सिंह रंधावा",
      mr: "हरजोत सिंग रंधावा",
      gu: "હરજોત સિંહ રંધાવા",
      bn: "হরজোৎ সিং রান্ধাওয়া",
      bho: "हरजोत सिंह रंधावा",
      ta: "ஹர்ஜோத் சிங் ரந்தாவா",
      te: "హర్జోత్ సింగ్ రంధావా",
      kn: "ಹರ್ಜೋತ್ ಸಿಂಗ್ ರಂಧಾವಾ",
      ml: "ഹർജോത് സിംഗ് രന്ധാവ",
      ur: "ہرجوت سنگھ رندھاوا",
    } as Record<string, string>,
    parentsLine: "Son of Sardar Vikramjit Singh & Sardarni Neeru Kaur Randhawa",
    bioLine: "A classical music enthusiast who believes every celebration begins with warm parathas.",
    photoSrc: "https://images.pexels.com/photos/35043826/pexels-photo-35043826.jpeg?auto=compress&cs=tinysrgb&w=1200",
    fallbackSrc: "/events/reception.png",
    photoPlaceholderLabel: "Harjot's Portrait Slot",
  },

  // 4B. Section 4 — "Humari Kahani" (Scroll-Driven Car Journey)
  CAR_SRC: "/car.png",
  CAR_FALLBACK_SRC:
    "https://drive.google.com/uc?export=view&id=1isai2JM3f5PfJ3rApUE5-AsxJnEcTbtw",
  ROAD_SRC: "/road.png",
  ROAD_FALLBACK_SRC:
    "https://drive.google.com/uc?export=view&id=1aJfP9ClVAhP8uMV8iGLsm3EVOLMRTCrr",
  HUMARI_KAHANI: {
    headingEnglish: "Humari Kahani",
    headingHindi: "हमारी कहानी",
    skyImageSrc: "", // Optional sky image slot to add later
    groundImageSrc: "", // Optional fields image slot to add later
    closingHindiLine: "अब हमारी शादी में आप ज़रूर आना",
    stops: [
      {
        id: "pehli-chai",
        progress: 0.2,
        title: "Pehli Chai",
        hindiSubtitle: "पहली चाय",
        caption: "Two kulhads of ginger chai on a winter afternoon where hours felt like minutes.",
        illustrationSrc: "", // 1:1 illustration slot to add later
        illustrationLabel: "Illustration 01 · 1:1",
      },
      {
        id: "lambi-baatein",
        progress: 0.4,
        title: "Lambi Baatein",
        hindiSubtitle: "लंबी बातें",
        caption: "Endless evening drives, shared playlists, and stories that brought two worlds closer.",
        illustrationSrc: "",
        illustrationLabel: "Illustration 02 · 1:1",
      },
      {
        id: "ek-sawaal",
        progress: 0.6,
        title: "Ek Sawaal",
        hindiSubtitle: "एक सवाल",
        caption: "One heartfelt question under the golden mustard sky, answered with the happiest yes.",
        illustrationSrc: "",
        illustrationLabel: "Illustration 03 · 1:1",
      },
      {
        id: "gaanth",
        progress: 0.8,
        title: "Gaanth",
        hindiSubtitle: "गाँठ",
        caption: "Two families united in warmth, blessings, and a promise for every season ahead.",
        illustrationSrc: "",
        illustrationLabel: "Illustration 04 · 1:1",
      },
    ],
  },

  // 5. Section 6 — "Hamare Utsav" (Normal-Flow Vertical Wedding Events Section)
  HAMARE_UTSAV: {
    headingHindi: "हमारे उत्सव",
    headingEnglish: "Hamare Utsav",
    subtitleLine: "Paanch din, paanch rang, ek kahani",
    closingHindiLine: "आपके आगमन की प्रतीक्षा में",
    addToCalendarLabel: "+ Add to calendar",
    openInMapsLabel: "Open in Maps",
  },

  EVENTS: [
    {
      id: "haldi",
      name: {
        en: "Haldi",
        hi: "हल्दी",
        pa: "ਹਲਦੀ",
        mr: "हल्दी",
        gu: "હળદર",
        bn: "হলুদ",
        bho: "हल्दी",
        ta: "மஞ்சள்",
        te: "హల్ది",
        kn: "ಅರಿಶಿನ",
        ml: "മഞ്ഞൾ",
        ur: "ہلدی",
      },
      hindiTitle: "हल्दी",
      ghostHindi: "हल्दी",
      punjabiTitle: "ਹਲਦੀ",
      englishTitle: "Haldi",
      isoStart: "2026-12-11T10:30:00+05:30",
      date: "Friday, 11th December 2026",
      time: "10:30 AM onwards",
      timeSubline: "Turmeric Blessings & Folk Songs",
      venueName: "The Marigold Bagh, Ranjit Avenue",
      venueAddress: "Block B, Ranjit Avenue, Amritsar, Punjab 143001",
      mapsUrl: "https://maps.google.com/?q=Ranjit+Avenue+Amritsar+Punjab",
      dressCodeLine: "Sunlit Mustard, Ivory & Fresh Marigold Hues",
      dressCodeColors: ["#F2CF7E", "#FFF8EC", "#8FAE86"],
      dressCodeSwatches: [
        { name: "Marigold", hex: "#F2CF7E" },
        { name: "Ivory", hex: "#FFF8EC" },
        { name: "Sage", hex: "#8FAE86" },
      ],
      bgFrom: "#FFF6D6",
      bgTo: "#F8E39A",
      accent: "#8FAE86",
      accentColor: "#8FAE86",
      particleType: "marigold_petals" as const,
      imageSrc: "/events/haldi.png",
      fallbackImageSrc:
        "https://drive.google.com/uc?export=view&id=1VygtigioFDqmUCteVMqemU1G7CInp0K9",
      note: "Sunlit morning of turmeric blessings, folk boliyan, and marigold showers.",
    },
    {
      id: "mehndi",
      name: {
        en: "Mehndi",
        hi: "मेहंदी",
        pa: "ਮਹਿੰਦੀ",
        mr: "मेहंदी",
        gu: "મેહંદી",
        bn: "মেহেদি",
        bho: "मेहंदी",
        ta: "மருதாணி",
        te: "మెహందీ",
        kn: "ಮೆಹಂದಿ",
        ml: "മെഹന്ദി",
        ur: "مہندی",
      },
      hindiTitle: "मेहंदी",
      ghostHindi: "मेहंदी",
      punjabiTitle: "ਮਹਿੰਦੀ",
      englishTitle: "Mehndi",
      isoStart: "2026-12-11T15:30:00+05:30",
      date: "Friday, 11th December 2026",
      time: "3:30 PM onwards",
      timeSubline: "Henna Artistry & Acoustic Melodies",
      venueName: "Verandah Lawn, The Heritage Haveli",
      venueAddress: "Airport Road, Heir, Amritsar, Punjab 143001",
      mapsUrl: "https://maps.google.com/?q=Airport+Road+Amritsar+Punjab",
      dressCodeLine: "Pistachio Sage, Henna Green & Earthy Pastels",
      dressCodeColors: ["#CBD9C0", "#8FAE86", "#9A6B4A"],
      dressCodeSwatches: [
        { name: "Pistachio", hex: "#CBD9C0" },
        { name: "Henna", hex: "#8FAE86" },
        { name: "Earth", hex: "#9A6B4A" },
      ],
      bgFrom: "#DDEBD3",
      bgTo: "#B9D1AC",
      accent: "#9A6B4A",
      accentColor: "#9A6B4A",
      particleType: "green_leaves" as const,
      imageSrc: "/events/mehndi.png",
      fallbackImageSrc:
        "https://drive.google.com/uc?export=view&id=1NzDAD8V77OOosFXyyAwyCNYFNqQek80g",
      note: "Intricate henna artistry, kulhad chai, and acoustic folk melodies.",
    },
    {
      id: "sangeet",
      name: {
        en: "Sangeet",
        hi: "संगीत",
        pa: "ਸੰਗੀਤ",
        mr: "संगीत",
        gu: "સંગીત",
        bn: "সঙ্গীত",
        bho: "संगीत",
        ta: "சங்கீத்",
        te: "సంగీత్",
        kn: "ಸಂಗೀತ್",
        ml: "സംഗീത്",
        ur: "سنگیت",
      },
      hindiTitle: "संगीत",
      ghostHindi: "संगीत",
      punjabiTitle: "ਸੰਗੀਤ",
      englishTitle: "Sangeet",
      isoStart: "2026-12-11T20:00:00+05:30",
      date: "Friday, 11th December 2026",
      time: "8:00 PM onwards",
      timeSubline: "Music & Family Performances",
      venueName: "Sheesh Mahal Ballroom, Noor Mahal Bagh",
      venueAddress: "Majitha-Verka Bypass, Amritsar, Punjab 143001",
      mapsUrl: "https://maps.google.com/?q=Majitha+Verka+Bypass+Amritsar+Punjab",
      dressCodeLine: "Shimmering Lilac, Blush Rose & Mirrorwork",
      dressCodeColors: ["#E2D7EE", "#E8A598", "#8E6FB5"],
      dressCodeSwatches: [
        { name: "Lilac", hex: "#E2D7EE" },
        { name: "Blush", hex: "#E8A598" },
        { name: "Plum", hex: "#8E6FB5" },
      ],
      bgFrom: "#EBDDF7",
      bgTo: "#F7D6E6",
      accent: "#8E6FB5",
      accentColor: "#8E6FB5",
      particleType: "confetti_sparkles" as const,
      imageSrc: "/events/sangeet.png",
      fallbackImageSrc:
        "https://drive.google.com/uc?export=view&id=1Ey-GP-0XmSwNAMcaG1gPR8GMBSuWYXhZ",
      note: "Dhol beats, family choreography, and dancing under warm lantern light.",
    },
    {
      id: "phere",
      name: {
        en: "Wedding Ceremony",
        hi: "फेरे",
        pa: "ਫੇਰੇ",
        mr: "फेरे",
        gu: "ફેરે",
        bn: "বিয়ে ও সাত পাক",
        bho: "फेरा",
        ta: "திருமண சடங்கு",
        te: "వివాహ వేడుక",
        kn: "ಮದುವೆ ಸಮಾರಂಭ",
        ml: "വിവാഹ ചടങ്ങ്",
        ur: "تقریب نکاح و پھیرے",
      },
      hindiTitle: "फेरे",
      ghostHindi: "फेरे",
      punjabiTitle: "ਫੇਰੇ",
      englishTitle: "Phere",
      isoStart: "2026-12-12T10:30:00+05:30",
      date: "Saturday, 12th December 2026",
      time: "10:30 AM (Baraat at 9:30 AM)",
      timeSubline: "Baraat at 9:30 AM · Milni at 10:00 AM",
      venueName: "Heritage Courtyard",
      venueAddress: "Grand Trunk Road, Amritsar, Punjab 143001",
      mapsUrl: "https://maps.google.com/?q=Amritsar+Grand+Trunk+Road+Punjab",
      dressCodeLine: "Heritage Peach, Sindoori Coral & Traditional Silk",
      dressCodeColors: ["#F9D8BC", "#E8A598", "#C2413B"],
      dressCodeSwatches: [
        { name: "Peach", hex: "#F9D8BC" },
        { name: "Coral", hex: "#E8A598" },
        { name: "Sindoor", hex: "#C2413B" },
      ],
      bgFrom: "#FBD9C0",
      bgTo: "#F2B3A0",
      accent: "#C2413B",
      accentColor: "#C2413B",
      particleType: "rose_petals" as const,
      imageSrc: "/events/phere.png",
      fallbackImageSrc:
        "https://drive.google.com/uc?export=view&id=1ZdNXtVwxUhtx8WpSjaut64XzbmBbDR-e",
      note: "Sacred hymns and vows in the serene winter morning breeze.",
    },
    {
      id: "reception",
      name: {
        en: "Reception",
        hi: "रिसेप्शन",
        pa: "ਰਿਸੈਪਸ਼ਨ",
        mr: "रिसेप्शन",
        gu: "રિસેપ્શન",
        bn: "রিসেপশন",
        bho: "रिसेप्शन",
        ta: "வரவேற்பு",
        te: "రిసెప్షన్",
        kn: "ರಿಸೆಪ್ಷನ್",
        ml: "റിസപ്ഷൻ",
        ur: "ریسیپشن",
      },
      hindiTitle: "रिसेप्शन",
      ghostHindi: "रिसेप्शन",
      punjabiTitle: "ਰਿਸੈਪਸ਼ਨ",
      englishTitle: "Reception",
      isoStart: "2026-12-12T19:30:00+05:30",
      date: "Saturday, 12th December 2026",
      time: "7:30 PM onwards",
      timeSubline: "Royal Bagh Welcome & Celebratory Feast",
      venueName: "The Royal Bagh Pavilion, Noor Mahal",
      venueAddress: "Grand Trunk Road, Amritsar, Punjab 143001",
      mapsUrl: "https://maps.google.com/?q=Grand+Trunk+Road+Amritsar+Punjab",
      dressCodeLine: "Champagne Gold, Ivory & Regal Evening Attire",
      dressCodeColors: ["#F1D58A", "#FFF8EC", "#B8923F"],
      dressCodeSwatches: [
        { name: "Champagne", hex: "#F1D58A" },
        { name: "Ivory", hex: "#FFF8EC" },
        { name: "Gold", hex: "#B8923F" },
      ],
      bgFrom: "#F4E6CF",
      bgTo: "#E3D3B0",
      accent: "#B8923F",
      accentColor: "#B8923F",
      particleType: "gold_dust" as const,
      imageSrc: "/events/reception.png",
      fallbackImageSrc:
        "https://drive.google.com/uc?export=view&id=1tueSu4eO4uY4X0ffkMOyNDWm-pGNof0f",
      note: "A celebratory evening feast with live music and Amritsari hospitality.",
    },
  ],

  // 6. Primary Venue & Contacts
  PRIMARY_VENUE: {
    name: "Noor Mahal Heritage Bagh & Pavilion",
    addressLine1: "Grand Trunk Road, Near Heritage Enclave",
    addressLine2: "Amritsar, Punjab 143001, India",
    landmark: "15 minutes from Sri Guru Ram Dass Jee International Airport",
    mapsUrl: "https://maps.google.com/?q=Amritsar+Grand+Trunk+Road+Punjab",
    contactPhoneDisplay: "+91 98765 43210",
  },

  // 7. Dress Code Swatches ("Sarson Subah" Palette)
  DRESS_CODE: {
    suggestionLine:
      "We warmly invite you to dress in soft morning pastels, warm mustard golds, and breathable heritage weaves.",
    swatches: [
      { name: "Ivory Silk", hex: "#FFF8EC" },
      { name: "Soft Apricot", hex: "#F9D8BC" },
      { name: "Punjabi Sage", hex: "#CBD9C0" },
      { name: "Morning Lilac", hex: "#E2D7EE" },
      { name: "Sarson Marigold", hex: "#F2CF7E" },
      { name: "Warm Coral", hex: "#E8A598" },
    ],
  },

  // 8. Gallery Slots (Arch & Oval Shapes ready for photos)
  GALLERY_SLOTS: [
    {
      id: "slot-1",
      shape: "arch" as const,
      title: "Roka Morning",
      caption: "First blessings & marigold garlands",
      imageSrc: "", // Leave empty for code placeholder, or paste image path later
      gradient: "linear-gradient(155deg, #FFF8EC 0%, #F9D8BC 55%, #F2CF7E 100%)",
    },
    {
      id: "slot-2",
      shape: "oval" as const,
      title: "Mustard Fields",
      caption: "Golden hour in Amritsar",
      imageSrc: "",
      gradient: "linear-gradient(155deg, #FFF8EC 0%, #CBD9C0 60%, #F2CF7E 100%)",
    },
    {
      id: "slot-3",
      shape: "oval" as const,
      title: "Chai & Laughter",
      caption: "Old city winter strolls",
      imageSrc: "",
      gradient: "linear-gradient(155deg, #FFF8EC 0%, #E2D7EE 60%, #F9D8BC 100%)",
    },
    {
      id: "slot-4",
      shape: "arch" as const,
      title: "Phulkari Heirloom",
      caption: "Nani's hand-spun dupattas",
      imageSrc: "",
      gradient: "linear-gradient(155deg, #FFF8EC 0%, #F2CF7E 50%, #E8A598 100%)",
    },
  ],

  // 9. WhatsApp RSVP Configuration (No backend needed)
  RSVP_WHATSAPP_NUMBER: "919876543210", // International format without '+' for wa.me link
  RSVP_DEADLINE: "2026-11-25T23:59:59+05:30",
  RSVP_DEADLINE_TEXT: "Kindly RSVP by 25th November 2026",

  // 9B. Master Wedding Feast Menu (for Menu Love favorites)
  MENU: {
    welcomeDrinks: [
      { id: 'wd-1', name: 'Fresh Mint Kesari Thandai', isVeg: true, tags: ['jain-friendly', 'contains nuts'] as const },
      { id: 'wd-2', name: 'Amritsari Malai Rose Lassi', isVeg: true, tags: ['gluten-free'] as const },
      { id: 'wd-3', name: 'Kokum Jeera Sparkler', isVeg: true, tags: ['vegan', 'jain-friendly', 'gluten-free'] as const },
      { id: 'wd-4', name: 'Chilli Guava Mary', isVeg: true, tags: ['vegan', 'gluten-free'] as const },
    ],
    starters: [
      { id: 'st-1', name: 'Tandoori Paneer Tikka Angara', isVeg: true, tags: ['gluten-free'] as const },
      { id: 'st-2', name: 'Crispy Kurkuri Bhindi Cones', isVeg: true, tags: ['vegan', 'jain-friendly', 'gluten-free'] as const },
      { id: 'st-3', name: 'Amritsari Ajwaini Fish Fry', isVeg: false, tags: ['gluten-free'] as const },
      { id: 'st-4', name: 'Murgh Malai Tikka Pistachio', isVeg: false, tags: ['contains nuts'] as const },
      { id: 'st-5', name: 'Dahi Ke Kebab / Sholay', isVeg: true, tags: ['jain-friendly'] as const },
      { id: 'st-6', name: 'Soya Chaap Afghani Tawa', isVeg: true, tags: ['contains nuts'] as const },
    ],
    mains: [
      { id: 'mn-1', name: 'Dal Makhani Slow-Simmered 24hrs', isVeg: true, tags: ['gluten-free'] as const },
      { id: 'mn-2', name: 'Shahi Paneer Lababdar', isVeg: true, tags: ['jain-friendly', 'contains nuts'] as const },
      { id: 'mn-3', name: 'Butter Chicken Old-Delhi Heritage', isVeg: false, tags: ['gluten-free', 'contains nuts'] as const },
      { id: 'mn-4', name: 'Subz Miloni Handi', isVeg: true, tags: ['vegan', 'jain-friendly', 'gluten-free'] as const },
      { id: 'mn-5', name: 'Amritsari Pindi Chhole', isVeg: true, tags: ['vegan', 'gluten-free'] as const },
      { id: 'mn-6', name: 'Rara Gosht Punjabi Masala', isVeg: false, tags: ['gluten-free'] as const },
    ],
    breadsAndRice: [
      { id: 'br-1', name: 'Chur Chur Kulcha with Imli Chutney', isVeg: true, tags: ['jain-friendly'] as const },
      { id: 'br-2', name: 'Garlic & Fresh Coriander Naan', isVeg: true, tags: [] as const },
      { id: 'br-3', name: 'Missi Roti with White Butter', isVeg: true, tags: ['gluten-free'] as const },
      { id: 'br-4', name: 'Awadhi Dum Saffron Biryani', isVeg: true, tags: ['gluten-free'] as const },
      { id: 'br-5', name: 'Murgh Dum Pukht Biryani', isVeg: false, tags: ['gluten-free'] as const },
    ],
    liveCounters: [
      { id: 'lc-1', name: 'Live Chaat Street: Golgappe, Dahi Bhalla & Papdi', isVeg: true, tags: ['jain-friendly'] as const },
      { id: 'lc-2', name: 'Wood-fired Truffle & Burrata Naan Bites', isVeg: true, tags: [] as const },
      { id: 'lc-3', name: 'Live Tawa Sigri: Galouti Kebab with Sheermal', isVeg: false, tags: [] as const },
      { id: 'lc-4', name: 'Steamed Artisanal Dim Sum & Bao Station', isVeg: true, tags: ['vegan'] as const },
    ],
    desserts: [
      { id: 'ds-1', name: 'Live Kesari Jalebi with Lachedar Rabri', isVeg: true, tags: ['contains nuts'] as const },
      { id: 'ds-2', name: 'Warm Gulab Jamun Flambé with Pistachio', isVeg: true, tags: ['contains nuts'] as const },
      { id: 'ds-3', name: 'Royal Matka Kulfi Falooda', isVeg: true, tags: ['gluten-free', 'contains nuts'] as const },
      { id: 'ds-4', name: 'Dark Chocolate Silk Paan Truffles', isVeg: true, tags: ['gluten-free'] as const },
    ],
  },

  // 10. Footer
  FOOTER_HINDI_LINE: "आपके आगमन की प्रतीक्षा में",
  FOOTER_CLOSING_LINE: "With love & gratitude — The Gill & Randhawa Families",
};

export type WeddingConfig = typeof WEDDING_CONFIG;
export type WeddingEvent = (typeof WEDDING_CONFIG.EVENTS)[number];
export const config = WEDDING_CONFIG;
export const PHOTOS = WEDDING_CONFIG.PHOTOS;
export type WeddingPhotos = typeof WEDDING_CONFIG.PHOTOS;

