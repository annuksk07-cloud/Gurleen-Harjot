import { ThemeId, WeddingTheme } from '../themes/themes';

export type BuiltInLanguageCode =
  | 'en'
  | 'hi'
  | 'pa'
  | 'mr'
  | 'gu'
  | 'bn'
  | 'bho'
  | 'ta'
  | 'te'
  | 'kn'
  | 'ml'
  | 'ur';

export type LanguageCode = BuiltInLanguageCode | string;

export interface LanguageMeta {
  code: BuiltInLanguageCode;
  nativeName: string;
  englishName: string;
  scriptName: string;
  locale: string;
  dir: 'ltr' | 'rtl';
  googleFontFamily: string | null; // null for English (uses Cormorant Garamond / Jost already loaded)
  googleFontParam: string | null;
  themeId: ThemeId;
  usesLatinDisplayScript: boolean;
}

export const LANGUAGES: LanguageMeta[] = [
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    scriptName: 'Latin',
    locale: 'en-IN',
    dir: 'ltr',
    googleFontFamily: null,
    googleFontParam: null,
    themeId: 'blush_modern',
    usesLatinDisplayScript: true,
  },
  {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    scriptName: 'Devanagari',
    locale: 'hi-IN',
    dir: 'ltr',
    googleFontFamily: 'Tiro Devanagari Hindi',
    googleFontParam: 'Tiro+Devanagari+Hindi:ital,wght@0,400;1,400',
    themeId: 'kesariya_gulab',
    usesLatinDisplayScript: false,
  },
  {
    code: 'pa',
    nativeName: 'ਪੰਜਾਬੀ',
    englishName: 'Punjabi',
    scriptName: 'Gurmukhi',
    locale: 'pa-IN',
    dir: 'ltr',
    googleFontFamily: 'Noto Serif Gurmukhi',
    googleFontParam: 'Noto+Serif+Gurmukhi:wght@400;500;600;700',
    themeId: 'sarson_subah',
    usesLatinDisplayScript: false,
  },
  {
    code: 'mr',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    scriptName: 'Devanagari',
    locale: 'mr-IN',
    dir: 'ltr',
    googleFontFamily: 'Tiro Devanagari Marathi',
    googleFontParam: 'Tiro+Devanagari+Marathi:ital,wght@0,400;1,400',
    themeId: 'paithani',
    usesLatinDisplayScript: false,
  },
  {
    code: 'gu',
    nativeName: 'ગુજરાતી',
    englishName: 'Gujarati',
    scriptName: 'Gujarati',
    locale: 'gu-IN',
    dir: 'ltr',
    googleFontFamily: 'Noto Serif Gujarati',
    googleFontParam: 'Noto+Serif+Gujarati:wght@400;500;600;700',
    themeId: 'bandhani_garba',
    usesLatinDisplayScript: false,
  },
  {
    code: 'bn',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    scriptName: 'Bengali',
    locale: 'bn-IN',
    dir: 'ltr',
    googleFontFamily: 'Noto Serif Bengali',
    googleFontParam: 'Noto+Serif+Bengali:wght@400;500;600;700',
    themeId: 'alpona',
    usesLatinDisplayScript: false,
  },
  {
    code: 'bho',
    nativeName: 'भोजपुरी',
    englishName: 'Bhojpuri',
    scriptName: 'Devanagari',
    locale: 'hi-IN',
    dir: 'ltr',
    googleFontFamily: 'Tiro Devanagari Hindi',
    googleFontParam: 'Tiro+Devanagari+Hindi:ital,wght@0,400;1,400',
    themeId: 'madhubani',
    usesLatinDisplayScript: false,
  },
  {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    scriptName: 'Tamil',
    locale: 'ta-IN',
    dir: 'ltr',
    googleFontFamily: 'Noto Serif Tamil',
    googleFontParam: 'Noto+Serif+Tamil:wght@400;500;600;700',
    themeId: 'kanjeevaram',
    usesLatinDisplayScript: false,
  },
  {
    code: 'te',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    scriptName: 'Telugu',
    locale: 'te-IN',
    dir: 'ltr',
    googleFontFamily: 'Noto Serif Telugu',
    googleFontParam: 'Noto+Serif+Telugu:wght@400;500;600;700',
    themeId: 'pochampally',
    usesLatinDisplayScript: false,
  },
  {
    code: 'kn',
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    scriptName: 'Kannada',
    locale: 'kn-IN',
    dir: 'ltr',
    googleFontFamily: 'Noto Serif Kannada',
    googleFontParam: 'Noto+Serif+Kannada:wght@400;500;600;700',
    themeId: 'mysore_silk',
    usesLatinDisplayScript: false,
  },
  {
    code: 'ml',
    nativeName: 'മലയാളം',
    englishName: 'Malayalam',
    scriptName: 'Malayalam',
    locale: 'ml-IN',
    dir: 'ltr',
    googleFontFamily: 'Noto Serif Malayalam',
    googleFontParam: 'Noto+Serif+Malayalam:wght@400;500;600;700',
    themeId: 'kasavu',
    usesLatinDisplayScript: false,
  },
  {
    code: 'ur',
    nativeName: 'اردو',
    englishName: 'Urdu',
    scriptName: 'Nastaliq',
    locale: 'ur-IN',
    dir: 'rtl',
    googleFontFamily: 'Noto Nastaliq Urdu',
    googleFontParam: 'Noto+Nastaliq+Urdu:wght@400;500;600;700',
    themeId: 'nikah',
    usesLatinDisplayScript: false,
  },
];

export type TranslationDictionary = {
  // Hero & Opening
  tapToOpen: string;
  openingBlessing: string;
  weddingCity: string;
  scrollCue: string;
  muteMusic: string;
  unmuteMusic: string;
  heroInvitationForLabel: string;
  heroWelcomeLabel: string;
  heroTagline: string;

  // Language & Theme UI
  languageChipLabel: string;
  languageSheetTitle: string;
  languageSearchPlaceholder: string;
  moreLanguagesButton: string;
  moreLanguagesPromptPlaceholder: string;
  moreLanguagesTranslateButton: string;
  moreLanguagesTranslating: string;
  moreLanguagesFallbackMessage: string;
  themeButtonAria: string;
  themeSheetTitle: string;
  themeSheetSubtitle: string;
  closeButton: string;

  // Section 2: Invitation
  invitationBlessingLine: string;
  invitationFamilyLine: string;
  invitationTogetherLine: string;
  invitationSubtext: string;

  // Section 3: Couple
  coupleKicker: string;
  coupleHeading: string;
  brideRole: string;
  brideRoleNative: string;
  brideParents: string;
  brideBio: string;
  groomRole: string;
  groomRoleNative: string;
  groomParents: string;
  groomBio: string;

  // Section 4: Humari Kahani
  kahaniHeadingNative: string;
  kahaniHeadingScript: string;
  kahaniClosingLine: string;
  stop1Title: string;
  stop1Native: string;
  stop1Caption: string;
  stop2Title: string;
  stop2Native: string;
  stop2Caption: string;
  stop3Title: string;
  stop3Native: string;
  stop3Caption: string;
  stop4Title: string;
  stop4Native: string;
  stop4Caption: string;

  // Section 5: Countdown
  countdownKicker: string;
  countdownHeading: string;
  countdownDays: string;
  countdownDaysSub: string;
  countdownHours: string;
  countdownHoursSub: string;
  countdownMinutes: string;
  countdownMinutesSub: string;
  countdownSeconds: string;
  countdownSecondsSub: string;
  countdownScratchPrompt: string;
  countdownTapToReveal: string;
  countdownScratchAgain: string;
  countdownDaysToGo: string;
  countdownDaysToGo_guest: string;

  // Section 6: Hamare Utsav (Events)
  utsavHeadingNative: string;
  utsavHeadingScript: string;
  utsavSubtitle: string;
  utsavClosingLine: string;
  eventEyebrowPrefix: string;
  labelTime: string;
  labelVenue: string;
  labelDressCode: string;
  openInMaps: string;
  addToCalendar: string;
  savedToCalendar: string;

  // Event 1: Haldi
  event1NativeTitle: string;
  event1ScriptTitle: string;
  event1TimeSubline: string;
  event1VenueName: string;
  event1VenueAddress: string;
  event1DressCode: string;
  event1Swatch1: string;
  event1Swatch2: string;
  event1Swatch3: string;

  // Event 2: Mehndi
  event2NativeTitle: string;
  event2ScriptTitle: string;
  event2TimeSubline: string;
  event2VenueName: string;
  event2VenueAddress: string;
  event2DressCode: string;
  event2Swatch1: string;
  event2Swatch2: string;
  event2Swatch3: string;

  // Event 3: Sangeet
  event3NativeTitle: string;
  event3ScriptTitle: string;
  event3TimeSubline: string;
  event3VenueName: string;
  event3VenueAddress: string;
  event3DressCode: string;
  event3Swatch1: string;
  event3Swatch2: string;
  event3Swatch3: string;

  // Event 4: Phere
  event4NativeTitle: string;
  event4ScriptTitle: string;
  event4TimeSubline: string;
  event4VenueName: string;
  event4VenueAddress: string;
  event4DressCode: string;
  event4Swatch1: string;
  event4Swatch2: string;
  event4Swatch3: string;

  // Event 5: Reception
  event5NativeTitle: string;
  event5ScriptTitle: string;
  event5TimeSubline: string;
  event5VenueName: string;
  event5VenueAddress: string;
  event5DressCode: string;
  event5Swatch1: string;
  event5Swatch2: string;
  event5Swatch3: string;

  // Section 7: Primary Venue
  venueKicker: string;
  venueHeading: string;
  venueName: string;
  venueAddress1: string;
  venueAddress2: string;
  venueLandmark: string;
  venueConciergeLabel: string;

  // Section 8: Dress Code
  dressCodeKicker: string;
  dressCodeHeading: string;
  dressCodeSuggestion: string;

  // Section 9: Gallery
  galleryKicker: string;
  galleryHeading: string;
  gallerySubheading: string;
  gallerySlot1Title: string;
  gallerySlot1Caption: string;
  gallerySlot2Title: string;
  gallerySlot2Caption: string;
  gallerySlot3Title: string;
  gallerySlot3Caption: string;
  gallerySlot4Title: string;
  gallerySlot4Caption: string;
  photoSlotLabel: string;
  galleryCaptionBride: string;
  galleryCaptionGroom: string;
  galleryCaptionTogether: string;
  galleryCaptionForever: string;
  galleryLightboxClose: string;
  galleryLightboxPrev: string;
  galleryLightboxNext: string;

  // RSVP Wizard
  rsvpStep1Title: string;
  rsvpStep2Title: string;
  rsvpStep3Title: string;
  rsvpStep4Title: string;
  rsvpStep5Title: string;
  rsvpStep6Title: string;
  rsvpRailGuest: string;
  rsvpRailFamily: string;
  rsvpRailFood: string;
  rsvpRailTravel: string;
  rsvpRailFun: string;
  rsvpRailTicket: string;
  rsvpBogieLabel: string;
  rsvpStepTitle: string;
  rsvpWelcomeLine: string;
  rsvpWelcomeSubtitle: string;
  rsvpDeadlinePrefix: string;
  rsvpDeadlineSuffix: string;
  rsvpLabelName: string;
  rsvpLabelPhone: string;
  rsvpLabelEmail: string;
  rsvpLabelCity: string;
  rsvpLabelSide: string;
  rsvpOptionBride: string;
  rsvpOptionGroom: string;
  rsvpOptionBoth: string;
  rsvpLabelRelationship: string;
  rsvpLabelHowWeMet: string;
  rsvpLabelAttendance: string;
  rsvpPlaceholderName: string;
  rsvpPlaceholderCity: string;
  rsvpPlaceholderHowWeMet: string;
  rsvpAttendingYes: string;
  rsvpAttendingYesSub: string;
  rsvpAttendingMaybe: string;
  rsvpAttendingMaybeSub: string;
  rsvpAttendingNo: string;
  rsvpAttendingNoSub: string;
  rsvpBtnNext: string;
  rsvpBtnBack: string;
  rsvpBtnConfirm: string;
  rsvpRelationshipFamily: string;
  rsvpRelationshipFriend: string;
  rsvpRelationshipColleague: string;
  rsvpRelationshipRelative: string;
  rsvpRelationshipNeighbour: string;
  rsvpRelationshipCollege: string;
  rsvpRelationshipChildhood: string;
  footerWaitingLine: string;
  footerClosingLine: string;

  // Personalised Guest Variants (_guest)
  invitationBlessingLine_guest: string;
  countdownHeading_guest: string;
  utsavSubtitle_guest: string;
  eventSaveTheDate_guest: string;
  venueHeading_guest: string;
  dressCodeHeading_guest: string;
  galleryHeading_guest: string;
  rsvpHeading_guest: string;
  rsvpPassengerLabel_guest: string;
  rsvpConfirmReady_guest: string;
  rsvpToastConfirm_guest: string;
  rsvpToastCopy_guest: string;
  rsvpToastPass_guest: string;
  rsvpToastCal_guest: string;
  footerWaitingLine_guest: string;
  pageTitle_guest: string;
};

const EN_TRANSLATIONS: TranslationDictionary = {
  tapToOpen: 'Tap to open invitation',
  openingBlessing: 'The Wedding Of',
  weddingCity: 'Amritsar, Punjab',
  scrollCue: 'Scroll down',
  muteMusic: 'Mute background music',
  unmuteMusic: 'Unmute background music',
  heroInvitationForLabel: 'INVITATION FOR',
  heroWelcomeLabel: 'WELCOME',
  heroTagline: 'Two hearts, one golden morning',

  languageChipLabel: 'Language',
  languageSheetTitle: 'Choose Language',
  languageSearchPlaceholder: 'Search language...',
  moreLanguagesButton: 'More languages ✨',
  moreLanguagesPromptPlaceholder: 'Type any language...',
  moreLanguagesTranslateButton: 'Translate',
  moreLanguagesTranslating: 'Translating invitation...',
  moreLanguagesFallbackMessage:
    'Live translation is unavailable right now. Staying in the current language.',
  themeButtonAria: 'Switch wedding style',
  themeSheetTitle: 'Choose your wedding style',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'Close',

  invitationBlessingLine: 'Welcome to our wedding celebration',
  invitationFamilyLine: 'We cordially invite you and your family',
  invitationTogetherLine: 'Together with our families',
  invitationSubtext:
    'As golden mustard fields bloom in the winter sun, we invite you to share in our joy, prayers, and celebration of love.',

  coupleKicker: 'Two souls, one courtyard',
  coupleHeading: 'The Bride & Groom',
  brideRole: 'The Bride',
  brideRoleNative: 'Bride',
  brideParents: 'Daughter of Sardar Harpreet Singh & Sardarni Gurpreet Kaur Gill',
  brideBio:
    'An architect with a love for heritage courtyards, filter coffee, and winter mornings.',
  groomRole: 'The Groom',
  groomRoleNative: 'Groom',
  groomParents: 'Son of Sardar Vikramjit Singh & Sardarni Neeru Kaur Randhawa',
  groomBio:
    'A classical music enthusiast who believes every celebration begins with warm parathas.',

  kahaniHeadingNative: 'Our Story',
  kahaniHeadingScript: 'Our Story',
  kahaniClosingLine: 'Please join us as we begin our forever',
  stop1Title: 'Pehli Chai',
  stop1Native: 'First Tea',
  stop1Caption:
    'Two kulhads of ginger chai on a winter afternoon where hours felt like minutes.',
  stop2Title: 'Lambi Baatein',
  stop2Native: 'Endless Conversations',
  stop2Caption:
    'Endless evening drives, shared playlists, and stories that brought two worlds closer.',
  stop3Title: 'Ek Sawaal',
  stop3Native: 'One Question',
  stop3Caption:
    'One heartfelt question under the golden mustard sky, answered with the happiest yes.',
  stop4Title: 'Gaanth',
  stop4Native: 'Sacred Bond',
  stop4Caption:
    'Two families united in warmth, blessings, and a promise for every season ahead.',

  countdownKicker: 'Counting the moments',
  countdownHeading: 'Until Our Sacred Vows',
  countdownDays: 'Days',
  countdownDaysSub: 'Days',
  countdownHours: 'Hours',
  countdownHoursSub: 'Hours',
  countdownMinutes: 'Minutes',
  countdownMinutesSub: 'Mins',
  countdownSeconds: 'Seconds',
  countdownSecondsSub: 'Secs',
  countdownScratchPrompt: 'Scratch to reveal the big day',
  countdownTapToReveal: "Can't scratch? Tap to reveal",
  countdownScratchAgain: 'Scratch again',
  countdownDaysToGo: 'Only {n} days to go!',
  countdownDaysToGo_guest: '{guest}, only {n} days to go!',

  utsavHeadingNative: 'Our Celebrations',
  utsavHeadingScript: 'Our Celebrations',
  utsavSubtitle: 'Five days, five colours, one timeless story',
  utsavClosingLine: 'Awaiting your warm presence',
  eventEyebrowPrefix: 'EVENT',
  labelTime: 'TIME',
  labelVenue: 'VENUE',
  labelDressCode: 'DRESS CODE',
  openInMaps: 'Open in Maps',
  addToCalendar: '+ Add to calendar',
  savedToCalendar: 'Saved (.ics Downloaded)',

  event1NativeTitle: 'Haldi',
  event1ScriptTitle: 'Haldi',
  event1TimeSubline: 'Turmeric Blessings & Folk Songs',
  event1VenueName: 'The Marigold Bagh, Ranjit Avenue',
  event1VenueAddress: 'Block B, Ranjit Avenue, Amritsar, Punjab 143001',
  event1DressCode: 'Sunlit Mustard, Ivory & Fresh Marigold Hues',
  event1Swatch1: 'Marigold',
  event1Swatch2: 'Ivory',
  event1Swatch3: 'Sage',

  event2NativeTitle: 'Mehndi',
  event2ScriptTitle: 'Mehndi',
  event2TimeSubline: 'Henna Artistry & Acoustic Melodies',
  event2VenueName: 'Verandah Lawn, The Heritage Haveli',
  event2VenueAddress: 'Airport Road, Heir, Amritsar, Punjab 143001',
  event2DressCode: 'Pistachio Sage, Henna Green & Earthy Pastels',
  event2Swatch1: 'Pistachio',
  event2Swatch2: 'Henna',
  event2Swatch3: 'Earth',

  event3NativeTitle: 'Sangeet',
  event3ScriptTitle: 'Sangeet',
  event3TimeSubline: 'Music & Family Performances',
  event3VenueName: 'Sheesh Mahal Ballroom, Noor Mahal Bagh',
  event3VenueAddress: 'Majitha-Verka Bypass, Amritsar, Punjab 143001',
  event3DressCode: 'Shimmering Lilac, Blush Rose & Mirrorwork',
  event3Swatch1: 'Lilac',
  event3Swatch2: 'Blush',
  event3Swatch3: 'Plum',

  event4NativeTitle: 'Wedding Ceremony',
  event4ScriptTitle: 'Wedding Ceremony',
  event4TimeSubline: 'Baraat at 9:30 AM · Milni at 10:00 AM',
  event4VenueName: 'Heritage Courtyard',
  event4VenueAddress: 'Grand Trunk Road, Amritsar, Punjab 143001',
  event4DressCode: 'Heritage Peach, Sindoori Coral & Traditional Silk',
  event4Swatch1: 'Peach',
  event4Swatch2: 'Coral',
  event4Swatch3: 'Sindoor',

  event5NativeTitle: 'Reception',
  event5ScriptTitle: 'Reception',
  event5TimeSubline: 'Royal Bagh Welcome & Celebratory Feast',
  event5VenueName: 'The Royal Bagh Pavilion, Noor Mahal',
  event5VenueAddress: 'Grand Trunk Road, Amritsar, Punjab 143001',
  event5DressCode: 'Champagne Gold, Ivory & Regal Evening Attire',
  event5Swatch1: 'Champagne',
  event5Swatch2: 'Ivory',
  event5Swatch3: 'Gold',

  venueKicker: 'Where our families gather',
  venueHeading: 'The Wedding Venue',
  venueName: 'Noor Mahal Heritage Bagh & Pavilion',
  venueAddress1: 'Grand Trunk Road, Near Heritage Enclave',
  venueAddress2: 'Amritsar, Punjab 143001, India',
  venueLandmark: '15 minutes from Sri Guru Ram Dass Jee International Airport',
  venueConciergeLabel: 'Concierge',

  dressCodeKicker: 'Palette of the morning sun',
  dressCodeHeading: 'Dress Code Palette',
  dressCodeSuggestion:
    'We warmly invite you to dress in soft morning pastels, warm mustard golds, and breathable heritage weaves.',

  galleryKicker: 'Moments in the making',
  galleryHeading: 'Keepsake Gallery',
  gallerySubheading:
    'Arch & oval frames ready for your pre-wedding and family portraits',
  gallerySlot1Title: 'Roka Morning',
  gallerySlot1Caption: 'First blessings & marigold garlands',
  gallerySlot2Title: 'Mustard Fields',
  gallerySlot2Caption: 'Golden hour in Amritsar',
  gallerySlot3Title: 'Chai & Laughter',
  gallerySlot3Caption: 'Old city winter strolls',
  gallerySlot4Title: 'Phulkari Heirloom',
  gallerySlot4Caption: "Nani's hand-spun dupattas",
  photoSlotLabel: 'Photo Slot',
  galleryCaptionBride: 'The bride',
  galleryCaptionGroom: 'The groom',
  galleryCaptionTogether: 'Together',
  galleryCaptionForever: 'Forever',
  galleryLightboxClose: 'Close photo view',
  galleryLightboxPrev: 'Previous photo',
  galleryLightboxNext: 'Next photo',

  // RSVP Wizard
  rsvpStep1Title: 'Step 1 · Who is coming?',
  rsvpStep2Title: 'Step 2 · Your party',
  rsvpStep3Title: 'Step 3 · Food and drinks',
  rsvpStep4Title: 'Step 4 · Travel and stay',
  rsvpStep5Title: 'Step 5 · Fun and blessings',
  rsvpStep6Title: 'Step 6 · Confirm',
  rsvpRailGuest: 'Guest',
  rsvpRailFamily: 'Family',
  rsvpRailFood: 'Food',
  rsvpRailTravel: 'Travel',
  rsvpRailFun: 'Fun',
  rsvpRailTicket: 'Ticket',
  rsvpBogieLabel: 'Wedding Express · COACH {step}/6',
  rsvpStepTitle: '{title}',
  rsvpWelcomeLine: 'Welcome aboard the Wedding Express!',
  rsvpWelcomeSubtitle: 'To book your ticket, please enter the primary guest\'s details.',
  rsvpDeadlinePrefix: 'RSVP closes in',
  rsvpDeadlineSuffix: 'left',
  rsvpLabelName: 'Your full name',
  rsvpLabelPhone: 'WhatsApp phone number',
  rsvpLabelEmail: 'Email (optional)',
  rsvpLabelCity: 'Which city are you coming from?',
  rsvpLabelSide: 'Which side are you from? (Wedding side)',
  rsvpOptionBride: 'Bride\'s side',
  rsvpOptionGroom: 'Groom\'s side',
  rsvpOptionBoth: 'Both (common)',
  rsvpLabelRelationship: 'Relationship',
  rsvpLabelHowWeMet: 'How did we meet? (one-line sweet memory)',
  rsvpLabelAttendance: 'Are you coming? (Attendance)',
  rsvpPlaceholderName: 'e.g. Gurpreet Singh and family',
  rsvpPlaceholderCity: 'e.g. Chandigarh, Delhi, London, Amritsar',
  rsvpPlaceholderHowWeMet: 'e.g. Childhood games in my grandmother\'s courtyard...',
  rsvpAttendingYes: 'Yes! We\'re coming',
  rsvpAttendingYesSub: 'Ticket confirmed, we\'re ready!',
  rsvpAttendingMaybe: 'Maybe / trying',
  rsvpAttendingMaybeSub: 'We\'ll confirm the dates soon',
  rsvpAttendingNo: 'Can\'t make it',
  rsvpAttendingNoSub: 'Sending lots of love and blessings from afar',
  rsvpBtnNext: 'Next: ',
  rsvpBtnBack: 'Back',
  rsvpBtnConfirm: 'Confirm my ticket',
  rsvpRelationshipFamily: 'Family',
  rsvpRelationshipFriend: 'Friend',
  rsvpRelationshipColleague: 'Colleague',
  rsvpRelationshipRelative: 'Relative',
  rsvpRelationshipNeighbour: 'Neighbour',
  rsvpRelationshipCollege: 'College friend',
  rsvpRelationshipChildhood: 'Childhood friend',
  footerWaitingLine: 'Awaiting your warm presence',
  footerClosingLine: 'With love & gratitude — The Gill & Randhawa Families',

  invitationBlessingLine_guest: '{guest}, you and your family are warmly invited',
  countdownHeading_guest: '{guest}, the big day is almost here',
  utsavSubtitle_guest: '{guest}, these are the celebrations we would love to share with you',
  eventSaveTheDate_guest: '{guest}, save the date for the {event}',
  venueHeading_guest: '{guest}, here is how to find us',
  dressCodeHeading_guest: '{guest}, a little colour inspiration for you',
  galleryHeading_guest: '{guest}, a few of our favourite moments',
  rsvpHeading_guest: 'Welcome aboard, {guest}!',
  rsvpPassengerLabel_guest: 'PASSENGER: {GUEST}',
  rsvpConfirmReady_guest: 'Your ticket is ready, {guest}',
  rsvpToastConfirm_guest: 'Thank you, {guest}! Your ticket is confirmed and opening on WhatsApp.',
  rsvpToastCopy_guest: 'Thank you, {guest}! Your RSVP details have been copied.',
  rsvpToastPass_guest: 'Thank you, {guest}! Your guest pass has been downloaded.',
  rsvpToastCal_guest: 'Thank you, {guest}! Your calendar invite has been downloaded.',
  footerWaitingLine_guest: 'We look forward to celebrating with you, {guest}',
  pageTitle_guest: 'A wedding invitation for {guest}',
};

const HI_TRANSLATIONS: TranslationDictionary = {
  ...EN_TRANSLATIONS,
  tapToOpen: 'निमंत्रण खोलने के लिए टैप करें',
  openingBlessing: 'शुभ विवाह',
  weddingCity: 'अमृतसर, पंजाब',
  scrollCue: 'नीचे स्क्रॉल करें',
  muteMusic: 'संगीत बंद करें',
  unmuteMusic: 'संगीत चालू करें',
  languageChipLabel: 'भाषा',
  languageSheetTitle: 'भाषा चुनें',
  languageSearchPlaceholder: 'भाषा खोजें (हिन्दी, मराठी, भोजपुरी...)',
  moreLanguagesButton: 'अन्य भाषाएँ ✨',
  themeSheetTitle: 'अपनी शादी का रंग चुनो',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'बंद करें',

  invitationBlessingLine: 'हमारे विवाह उत्सव में आपका हार्दिक स्वागत है',
  invitationFamilyLine: 'आप सपरिवार सादर आमंत्रित हैं',
  invitationTogetherLine: 'हमारे दोनों परिवारों की ओर से',
  invitationSubtext:
    'सर्दियों की सुनहरी धूप और खिलते सरसों के खेतों के बीच, हम आपको हमारे प्रेम और आशीर्वाद के इस पावन उत्सव में शामिल होने के लिए आमंत्रित करते हैं।',

  coupleKicker: 'दो आत्माएँ, एक आँगन',
  coupleHeading: 'वर और वधू',
  brideRole: 'वधू',
  brideRoleNative: 'दुल्हन',
  brideParents: 'सरदार हरप्रीत सिंह एवं सरदारनी गुरप्रीत कौर गिल की सुपुत्री',
  brideBio: 'पुरानी हवेलियों, फ़िल्टर कॉफ़ी और सर्दियों की सुबह से प्रेम करने वाली आर्किटेक्ट।',
  groomRole: 'वर',
  groomRoleNative: 'दूल्हा',
  groomParents: 'सरदार विक्रमजीत सिंह एवं सरदारनी नीरू कौर रंधावा के सुपुत्र',
  groomBio: 'शास्त्रीय संगीत के प्रेमी जिनका मानना है कि हर उत्सव गरम पराठों से शुरू होता है।',

  kahaniHeadingNative: 'हमारी कहानी',
  kahaniHeadingScript: 'Humari Kahani',
  kahaniClosingLine: 'अब हमारी शादी में आप ज़रूर आना',
  stop1Title: 'पहली चाय',
  stop1Native: 'पहली मुलाक़ात',
  stop1Caption: 'सर्दियों की दोपहर में अदरक वाली दो कुल्हड़ चाय, जहाँ घंटों का पता ही न चला।',
  stop2Title: 'लंबी बातें',
  stop2Native: 'अनकही कहानियाँ',
  stop2Caption: 'शाम की लंबी ड्राइव, पसंदीदा गीत और बातें जिन्होंने दो दुनियाओं को जोड़ दिया।',
  stop3Title: 'एक सवाल',
  stop3Native: 'दिल की बात',
  stop3Caption: 'सुनहरे आसमान के नीचे पूछा गया एक सवाल, जिसका जवाब सबसे प्यारी हाँ था।',
  stop4Title: 'गाँठ',
  stop4Native: 'पवित्र बंधन',
  stop4Caption: 'दो परिवारों का स्नेह, आशीर्वाद और हर मौसम में साथ निभाने का वचन।',

  countdownKicker: 'शुभ घड़ी की प्रतीक्षा',
  countdownHeading: 'हमारे पावन फेरों तक',
  countdownDays: 'दिन',
  countdownDaysSub: 'दिन',
  countdownHours: 'घंटे',
  countdownHoursSub: 'घंटे',
  countdownMinutes: 'मिनट',
  countdownMinutesSub: 'मिनट',
  countdownSeconds: 'सेकंड',
  countdownSecondsSub: 'सेकंड',

  utsavHeadingNative: 'हमारे उत्सव',
  utsavHeadingScript: 'Hamare Utsav',
  utsavSubtitle: 'पाँच दिन, पाँच रंग, एक कहानी',
  utsavClosingLine: 'आपके आगमन की प्रतीक्षा में',
  eventEyebrowPrefix: 'समारोह',
  labelTime: 'समय',
  labelVenue: 'स्थान',
  labelDressCode: 'परिधान रंग',
  openInMaps: 'मैप्स में देखें',
  addToCalendar: '+ कैलेंडर में जोड़ें',
  savedToCalendar: 'कैलेंडर में सेव हो गया',

  event1NativeTitle: 'हल्दी',
  event1ScriptTitle: 'Haldi',
  event1TimeSubline: 'वटना और हल्दी का आशीर्वाद',
  event1VenueName: 'द मैरीगोल्ड बाग़, रणजीत एवेन्यू',
  event1VenueAddress: 'ब्लॉक बी, रणजीत एवेन्यू, अमृतसर, पंजाब 143001',
  event1DressCode: 'सरसों पीला, आइवरी और गेंदे के खिले रंग',
  event1Swatch1: 'गेंदा',
  event1Swatch2: 'आइवरी',
  event1Swatch3: 'सेज हरा',

  event2NativeTitle: 'मेहंदी',
  event2ScriptTitle: 'Mehndi',
  event2TimeSubline: 'मेहंदी रस्म और लोक गीत',
  event2VenueName: 'वरंडा लॉन, द हेरिटेज हवेली',
  event2VenueAddress: 'एयरपोर्ट रोड, हेयर, अमृतसर, पंजाब 143001',
  event2DressCode: 'पिस्ता हरा, मेहंदी और सौम्य पेस्टल रंग',
  event2Swatch1: 'पिस्ता',
  event2Swatch2: 'मेहंदी',
  event2Swatch3: 'माटी',

  event3NativeTitle: 'संगीत',
  event3ScriptTitle: 'Sangeet',
  event3TimeSubline: 'संगीत की रात और पारिवारिक नृत्य',
  event3VenueName: 'शीश महल बॉलरूम, नूर महल बाग़',
  event3VenueAddress: 'मजीठा-वेरका बाईपास, अमृतसर, पंजाब 143001',
  event3DressCode: 'चमकीला लाइलैक, गुलाबी और मिररवर्क',
  event3Swatch1: 'लाइलैक',
  event3Swatch2: 'गुलाबी',
  event3Swatch3: 'बेर',

  event4NativeTitle: 'फेरे',
  event4ScriptTitle: 'Phere',
  event4TimeSubline: 'बारात सुबह 9:30 · मिलनी सुबह 10:00',
  event4VenueName: 'हेरिटेज प्रांगण',
  event4VenueAddress: 'ग्रैंड ट्रंक रोड, अमृतसर, पंजाब 143001',
  event4DressCode: 'पारंपरिक पीच, सिंदूरी कोरल और रेशमी परिधान',
  event4Swatch1: 'पीच',
  event4Swatch2: 'कोरल',
  event4Swatch3: 'सिंदूर',

  event5NativeTitle: 'रिसेप्शन',
  event5ScriptTitle: 'Reception',
  event5TimeSubline: 'शाही स्वागत एवं प्रीतिभोज',
  event5VenueName: 'द रॉयल बाग़ पवेलियन, नूर महल',
  event5VenueAddress: 'ग्रैंड ट्रंक रोड, अमृतसर, पंजाब 143001',
  event5DressCode: 'शैंपेन गोल्ड, आइवरी और शाही परिधान',
  event5Swatch1: 'शैंपेन',
  event5Swatch2: 'आइवरी',
  event5Swatch3: 'स्वर्ण',

  venueKicker: 'जहाँ हमारे परिवार मिलेंगे',
  venueHeading: 'विवाह स्थल',
  venueName: 'नूर महल हेरिटेज बाग़ एवं पवेलियन',
  venueAddress1: 'ग्रैंड ट्रंक रोड, हेरिटेज एन्क्लेव के पास',
  venueAddress2: 'अमृतसर, पंजाब 143001, भारत',
  venueLandmark: 'श्री गुरु राम दास जी अंतरराष्ट्रीय हवाई अड्डे से 15 मिनट की दूरी पर',
  venueConciergeLabel: 'संपर्क',

  dressCodeKicker: 'सुबह की सुनहरी धूप के रंग',
  dressCodeHeading: 'परिधान रंग-पटल',
  dressCodeSuggestion:
    'हम आपको सुबह के कोमल पेस्टल, सरसों के सुनहरे रंग और पारंपरिक परिधान पहनने के लिए सादर आमंत्रित करते हैं।',

  galleryKicker: 'यादगार पल',
  galleryHeading: 'स्मृति झरोखा',
  gallerySubheading: 'प्री-वेडिंग और पारिवारिक तस्वीरों के लिए विशेष फ्रेम',
  gallerySlot1Title: 'रोका की सुबह',
  gallerySlot1Caption: 'पहला आशीर्वाद और गेंदे की माला',
  gallerySlot2Title: 'सरसों के खेत',
  gallerySlot2Caption: 'अमृतसर की सुनहरी शाम',
  gallerySlot3Title: 'चाय और मुस्कान',
  gallerySlot3Caption: 'सर्दियों की मीठी यादें',
  gallerySlot4Title: 'फुलकारी विरासत',
  gallerySlot4Caption: 'नानी के हाथ का दुपट्टा',
  photoSlotLabel: 'फ़ोटो स्थान',
  galleryCaptionBride: 'दुल्हन',
  galleryCaptionGroom: 'दूल्हा',
  galleryCaptionTogether: 'हमसफ़र',
  galleryCaptionForever: 'सदा के लिए',

  rsvpWarmWelcome: 'पधारो जी',
  rsvpHeading: 'व्हाट्सएप पर RSVP करें',
  rsvpDeadline: 'कृपया 25 नवंबर 2026 तक अपनी उपस्थिति दर्ज करें',
  rsvpNameLabel: 'आपका पूरा नाम *',
  rsvpNamePlaceholder: 'उदा. रोहन और प्रिया शर्मा',
  rsvpGuestsLabel: 'अतिथियों की संख्या',
  rsvpGuestSingular: 'अतिथि',
  rsvpGuestPlural: 'अतिथि',
  rsvpEventsLabel: 'किन समारोहों में शामिल होंगे *',
  rsvpMessageLabel: 'आशीर्वाद या संदेश (वैकल्पिक)',
  rsvpMessagePlaceholder: 'अपनी शुभकामनाएँ या संगीत के लिए पसंदीदा गीत लिखें...',
  rsvpSubmitButton: 'व्हाट्सएप द्वारा RSVP भेजें',
  rsvpThankYouPrefix: 'धन्यवाद',
  rsvpReadyMessage: 'आपका व्हाट्सएप संदेश भेजने के लिए तैयार है:',
  rsvpOpenWhatsapp: 'व्हाट्सएप खोलें',
  rsvpCopyText: 'संदेश कॉपी करें',
  rsvpCopiedText: 'कॉपी हो गया',
  rsvpErrorName: 'कृपया अपना पूरा नाम लिखें।',
  rsvpErrorEvents: 'कृपया कम से कम एक समारोह चुनें।',

  footerWaitingLine: 'आपके आगमन की प्रतीक्षा में',
  footerClosingLine: 'स्नेह और आभार सहित — गिल एवं रंधावा परिवार',
};

const PA_TRANSLATIONS: TranslationDictionary = {
  ...EN_TRANSLATIONS,
  tapToOpen: 'ਸੱਦਾ ਪੱਤਰ ਖੋਲ੍ਹਣ ਲਈ ਟੈਪ ਕਰੋ',
  openingBlessing: 'ਸ਼ੁਭ ਵਿਆਹ',
  weddingCity: 'ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ',
  scrollCue: 'ਹੇਠਾਂ ਸਕ੍ਰੋਲ ਕਰੋ',
  muteMusic: 'ਸੰਗੀਤ ਬੰਦ ਕਰੋ',
  unmuteMusic: 'ਸੰਗੀਤ ਚਾਲੂ ਕਰੋ',
  languageChipLabel: 'ਭਾਸ਼ਾ',
  languageSheetTitle: 'ਭਾਸ਼ਾ ਚੁਣੋ',
  languageSearchPlaceholder: 'ਭਾਸ਼ਾ ਖੋਜੋ (ਪੰਜਾਬੀ, ਅੰਗਰੇਜ਼ੀ...)',
  moreLanguagesButton: 'ਹੋਰ ਭਾਸ਼ਾਵਾਂ ✨',
  themeSheetTitle: 'ਆਪਣੇ ਵਿਆਹ ਦਾ ਰੰਗ ਚੁਣੋ',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'ਬੰਦ ਕਰੋ',

  invitationBlessingLine: 'ਸਾਡੇ ਵਿਆਹ ਵਿੱਚ ਤੁਹਾਡਾ ਨਿੱਘਾ ਸੁਆਗਤ ਹੈ',
  invitationFamilyLine: 'ਤੁਹਾਨੂੰ ਪਰਿਵਾਰ ਸਮੇਤ ਸਾਦਰ ਸੱਦਾ ਹੈ',
  invitationTogetherLine: 'ਸਾਡੇ ਦੋਵਾਂ ਪਰਿਵਾਰਾਂ ਵੱਲੋਂ',
  invitationSubtext:
    'ਸਰਦੀਆਂ ਦੀ ਸੁਨਹਿਰੀ ਧੁੱਪ ਅਤੇ ਖਿੜਦੇ ਸਰ੍ਹੋਂ ਦੇ ਖੇਤਾਂ ਵਿੱਚ, ਅਸੀਂ ਤੁਹਾਨੂੰ ਸਾਡੀਆਂ ਖੁਸ਼ੀਆਂ, ਅਰਦਾਸਾਂ ਅਤੇ ਪਿਆਰ ਦੇ ਇਸ ਜਸ਼ਨ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਣ ਲਈ ਸੱਦਾ ਦਿੰਦੇ ਹਾਂ।',

  coupleKicker: 'ਦੋ ਰੂਹਾਂ, ਇੱਕ ਵਿਹੜਾ',
  coupleHeading: 'ਲਾੜੀ ਅਤੇ ਲਾੜਾ',
  brideRole: 'ਲਾੜੀ',
  brideRoleNative: 'ਦੁਲਹਨ',
  brideParents: 'ਸਰਦਾਰ ਹਰਪ੍ਰੀਤ ਸਿੰਘ ਅਤੇ ਸਰਦਾਰਨੀ ਗੁਰਪ੍ਰੀਤ ਕੌਰ ਗਿੱਲ ਦੀ ਸਪੁੱਤਰੀ',
  brideBio: 'ਵਿਰਾਸਤੀ ਹਵੇਲੀਆਂ, ਫਿਲਟਰ ਕੌਫੀ ਅਤੇ ਸਰਦੀਆਂ ਦੀ ਸਵੇਰ ਨੂੰ ਪਿਆਰ ਕਰਨ ਵਾਲੀ ਆਰਕੀਟੈਕਟ।',
  groomRole: 'ਲਾੜਾ',
  groomRoleNative: 'ਦੂਲਹਾ',
  groomParents: 'ਸਰਦਾਰ ਵਿਕਰਮਜੀਤ ਸਿੰਘ ਅਤੇ ਸਰਦਾਰਨੀ ਨੀਰੂ ਕੌਰ ਰੰਧਾਵਾ ਦੇ ਸਪੁੱਤਰ',
  groomBio: 'ਸ਼ਾਸਤਰੀ ਸੰਗੀਤ ਦੇ ਸ਼ੌਕੀਨ ਜੋ ਮੰਨਦੇ ਹਨ ਕਿ ਹਰ ਜਸ਼ਨ ਗਰਮ ਪਰੌਂਠਿਆਂ ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ।',

  kahaniHeadingNative: 'ਸਾਡੀ ਕਹਾਣੀ',
  kahaniHeadingScript: 'Humari Kahani',
  kahaniClosingLine: 'ਹੁਣ ਸਾਡੇ ਵਿਆਹ ਵਿੱਚ ਤੁਸੀਂ ਜ਼ਰੂਰ ਆਉਣਾ',
  stop1Title: 'ਪਹਿਲੀ ਚਾਹ',
  stop1Native: 'ਪਹਿਲੀ ਮੁਲਾਕਾਤ',
  stop1Caption: 'ਸਰਦੀਆਂ ਦੀ ਦੁਪਹਿਰ ਵਿੱਚ ਅਦਰਕ ਵਾਲੀ ਚਾਹ ਦੇ ਦੋ ਕੁੱਲ੍ਹੜ, ਜਿੱਥੇ ਘੰਟੇ ਮਿੰਟਾਂ ਵਾਂਗ ਬੀਤ ਗਏ।',
  stop2Title: 'ਲੰਬੀਆਂ ਗੱਲਾਂ',
  stop2Native: 'ਦਿਲ ਦੀਆਂ ਗੱਲਾਂ',
  stop2Caption: 'ਸ਼ਾਮ ਦੀਆਂ ਲੰਬੀਆਂ ਡਰਾਈਵਾਂ, ਸਾਂਝੇ ਗੀਤ ਅਤੇ ਕਹਾਣੀਆਂ ਜਿਨ੍ਹਾਂ ਨੇ ਦੋ ਦਿਲਾਂ ਨੂੰ ਜੋੜ ਦਿੱਤਾ।',
  stop3Title: 'ਇੱਕ ਸਵਾਲ',
  stop3Native: 'ਪਿਆਰ ਦਾ ਇਜ਼ਹਾਰ',
  stop3Caption: 'ਸੁਨਹਿਰੀ ਸਰ੍ਹੋਂ ਦੇ ਅਸਮਾਨ ਹੇਠ ਪੁੱਛਿਆ ਇੱਕ ਸਵਾਲ, ਜਿਸ ਦਾ ਜਵਾਬ ਸਭ ਤੋਂ ਪਿਆਰੀ ਹਾਂ ਸੀ।',
  stop4Title: 'ਗੰਢ',
  stop4Native: 'ਪਵਿੱਤਰ ਰਿਸ਼ਤਾ',
  stop4Caption: 'ਦੋ ਪਰਿਵਾਰਾਂ ਦਾ ਪਿਆਰ, ਅਸੀਸਾਂ ਅਤੇ ਹਰ ਮੌਸਮ ਵਿੱਚ ਸਾਥ ਨਿਭਾਉਣ ਦਾ ਵਾਅਦਾ।',

  countdownKicker: 'ਸ਼ੁਭ ਘੜੀ ਦੀ ਉਡੀਕ',
  countdownHeading: 'ਸਾਡੇ ਵਿਆਹ ਤੱਕ',
  countdownDays: 'ਦਿਨ',
  countdownDaysSub: 'ਦਿਨ',
  countdownHours: 'ਘੰਟੇ',
  countdownHoursSub: 'ਘੰਟੇ',
  countdownMinutes: 'ਮਿੰਟ',
  countdownMinutesSub: 'ਮਿੰਟ',
  countdownSeconds: 'ਸਕਿੰਟ',
  countdownSecondsSub: 'ਸਕਿੰਟ',

  utsavHeadingNative: 'ਸਾਡੇ ਜਸ਼ਨ',
  utsavHeadingScript: 'Hamare Utsav',
  utsavSubtitle: 'ਪੰਜ ਦਿਨ, ਪੰਜ ਰੰਗ, ਇੱਕ ਕਹਾਣੀ',
  utsavClosingLine: 'ਤੁਹਾਡੀ ਆਮਦ ਦੀ ਉਡੀਕ ਵਿੱਚ',
  eventEyebrowPrefix: 'ਸਮਾਗਮ',
  labelTime: 'ਸਮਾਂ',
  labelVenue: 'ਸਥਾਨ',
  labelDressCode: 'ਪਹਿਰਾਵਾ ਰੰਗ',
  openInMaps: 'ਨਕਸ਼ੇ ਵਿੱਚ ਵੇਖੋ',
  addToCalendar: '+ ਕੈਲੰਡਰ ਵਿੱਚ ਜੋੜੋ',
  savedToCalendar: 'ਕੈਲੰਡਰ ਵਿੱਚ ਸੇਵ ਹੋ ਗਿਆ',

  event1NativeTitle: 'ਹਲਦੀ',
  event1ScriptTitle: 'Haldi',
  event1TimeSubline: 'ਵੱਟਣਾ ਅਤੇ ਹਲਦੀ ਦੀਆਂ ਅਸੀਸਾਂ',
  event1VenueName: 'ਦ ਮੈਰੀਗੋਲਡ ਬਾਗ਼, ਰਣਜੀਤ ਐਵੇਨਿਊ',
  event1VenueAddress: 'ਬਲਾਕ ਬੀ, ਰਣਜੀਤ ਐਵੇਨਿਊ, ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ 143001',
  event1DressCode: 'ਸਰ੍ਹੋਂ ਪੀਲਾ, ਆਈਵਰੀ ਅਤੇ ਗੇਂਦੇ ਦੇ ਰੰਗ',
  event1Swatch1: 'ਗੇਂਦਾ',
  event1Swatch2: 'ਆਈਵਰੀ',
  event1Swatch3: 'ਸੇਜ ਹਰਾ',

  event2NativeTitle: 'ਮਹਿੰਦੀ',
  event2ScriptTitle: 'Mehndi',
  event2TimeSubline: 'ਮਹਿੰਦੀ ਅਤੇ ਪੰਜਾਬੀ ਬੋਲੀਆਂ',
  event2VenueName: 'ਵਰਾਂਡਾ ਲੌਨ, ਦ ਹੈਰੀਟੇਜ ਹਵੇਲੀ',
  event2VenueAddress: 'ਏਅਰਪੋਰਟ ਰੋਡ, ਹੇਅਰ, ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ 143001',
  event2DressCode: 'ਪਿਸਤਾ ਹਰਾ, ਮਹਿੰਦੀ ਅਤੇ ਹਲਕੇ ਪੇਸਟਲ ਰੰਗ',
  event2Swatch1: 'ਪਿਸਤਾ',
  event2Swatch2: 'ਮਹਿੰਦੀ',
  event2Swatch3: 'ਮਿੱਟੀ ਰੰਗ',

  event3NativeTitle: 'ਸੰਗੀਤ',
  event3ScriptTitle: 'Sangeet',
  event3TimeSubline: 'ਸੰਗੀਤ ਦੀ ਰਾਤ ਅਤੇ ਪਰਿਵਾਰਕ ਭੰਗੜਾ',
  event3VenueName: 'ਸ਼ੀਸ਼ ਮਹਿਲ ਬਾਲਰੂਮ, ਨੂਰ ਮਹਿਲ ਬਾਗ਼',
  event3VenueAddress: 'ਮਜੀਠਾ-ਵੇਰਕਾ ਬਾਈਪਾਸ, ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ 143001',
  event3DressCode: 'ਚਮਕੀਲਾ ਲਾਈਲੈਕ, ਗੁਲਾਬੀ ਅਤੇ ਸ਼ੀਸ਼ਾ-ਕਢਾਈ',
  event3Swatch1: 'ਲਾਈਲੈਕ',
  event3Swatch2: 'ਗੁਲਾਬੀ',
  event3Swatch3: 'ਆਲੂਬੁਖਾਰਾ',

  event4NativeTitle: 'ਫੇਰੇ',
  event4ScriptTitle: 'Phere',
  event4TimeSubline: 'ਬਾਰਾਤ ਸਵੇਰੇ 9:30 · ਮਿਲਣੀ ਸਵੇਰੇ 10:00',
  event4VenueName: 'ਹੈਰੀਟੇਜ ਵਿਹੜਾ',
  event4VenueAddress: 'ਜੀ.ਟੀ. ਰੋਡ, ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ 143001',
  event4DressCode: 'ਵਿਰਾਸਤੀ ਪੀਚ, ਸਿੰਦੂਰੀ ਕੋਰਲ ਅਤੇ ਰੇਸ਼ਮੀ ਪਹਿਰਾਵਾ',
  event4Swatch1: 'ਪੀਚ',
  event4Swatch2: 'ਕੋਰਲ',
  event4Swatch3: 'ਸਿੰਦੂਰ',

  event5NativeTitle: 'ਰਿਸੈਪਸ਼ਨ',
  event5ScriptTitle: 'Reception',
  event5TimeSubline: 'ਸ਼ਾਹੀ ਬਾਗ਼ ਸੁਆਗਤ ਅਤੇ ਦਾਅਵਤ',
  event5VenueName: 'ਦ ਰਾਇਲ ਬਾਗ਼ ਪਵੇਲੀਅਨ, ਨੂਰ ਮਹਿਲ',
  event5VenueAddress: 'ਜੀ.ਟੀ. ਰੋਡ, ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ 143001',
  event5DressCode: 'ਸ਼ੈਂਪੇਨ ਗੋਲਡ, ਆਈਵਰੀ ਅਤੇ ਸ਼ਾਹੀ ਪਹਿਰਾਵਾ',
  event5Swatch1: 'ਸ਼ੈਂਪੇਨ',
  event5Swatch2: 'ਆਈਵਰੀ',
  event5Swatch3: 'ਸੁਨਹਿਰੀ',

  venueKicker: 'ਜਿੱਥੇ ਸਾਡੇ ਪਰਿਵਾਰ ਇਕੱਠੇ ਹੋਣਗੇ',
  venueHeading: 'ਵਿਆਹ ਦਾ ਸਥਾਨ',
  venueName: 'ਨੂਰ ਮਹਿਲ ਹੈਰੀਟੇਜ ਬਾਗ਼ ਅਤੇ ਪਵੇਲੀਅਨ',
  venueAddress1: 'ਜੀ.ਟੀ. ਰੋਡ, ਹੈਰੀਟੇਜ ਐਨਕਲੇਵ ਦੇ ਨੇੜੇ',
  venueAddress2: 'ਅੰਮ੍ਰਿਤਸਰ, ਪੰਜਾਬ 143001, ਭਾਰਤ',
  venueLandmark: 'ਸ੍ਰੀ ਗੁਰੂ ਰਾਮਦਾਸ ਜੀ ਅੰਤਰਰਾਸ਼ਟਰੀ ਹਵਾਈ ਅੱਡੇ ਤੋਂ 15 ਮਿੰਟ ਦੀ ਦੂਰੀ ਤੇ',
  venueConciergeLabel: 'ਸੰਪਰਕ',

  dressCodeKicker: 'ਸਵੇਰ ਦੀ ਸਰ੍ਹੋਂ ਧੁੱਪ ਦੇ ਰੰਗ',
  dressCodeHeading: 'ਪਹਿਰਾਵਾ ਰੰਗ — ਸਰ੍ਹੋਂ ਸੁਬਹ',
  dressCodeSuggestion:
    'ਅਸੀਂ ਤੁਹਾਨੂੰ ਹਲਕੇ ਪੇਸਟਲ, ਨਿੱਘੇ ਸਰ੍ਹੋਂ ਸੁਨਹਿਰੀ ਅਤੇ ਰਵਾਇਤੀ ਪੰਜਾਬੀ ਪਹਿਰਾਵੇ ਪਹਿਨਣ ਲਈ ਪਿਆਰ ਨਾਲ ਸੱਦਾ ਦਿੰਦੇ ਹਾਂ।',

  galleryKicker: 'ਯਾਦਗਾਰ ਪਲ',
  galleryHeading: 'ਯਾਦਾਂ ਦਾ ਝਰੋਖਾ',
  gallerySubheading: 'ਪ੍ਰੀ-ਵੈਡਿੰਗ ਅਤੇ ਪਰਿਵਾਰਕ ਤਸਵੀਰਾਂ ਲਈ ਖਾਸ ਫਰੇਮ',
  gallerySlot1Title: 'ਰੋਕੇ ਦੀ ਸਵੇਰ',
  gallerySlot1Caption: 'ਪਹਿਲੀਆਂ ਅਸੀਸਾਂ ਅਤੇ ਗੇਂਦੇ ਦੇ ਹਾਰ',
  gallerySlot2Title: 'ਸਰ੍ਹੋਂ ਦੇ ਖੇਤ',
  gallerySlot2Caption: 'ਅੰਮ੍ਰਿਤਸਰ ਦੀ ਸੁਨਹਿਰੀ ਸ਼ਾਮ',
  gallerySlot3Title: 'ਚਾਹ ਅਤੇ ਹਾਸੇ',
  gallerySlot3Caption: 'ਪੁਰਾਣੇ ਸ਼ਹਿਰ ਦੀਆਂ ਸਰਦ ਰਾਤਾਂ',
  gallerySlot4Title: 'ਫੁਲਕਾਰੀ ਵਿਰਾਸਤ',
  gallerySlot4Caption: 'ਨਾਨੀ ਦੇ ਹੱਥਾਂ ਦੀ ਕਢਾਈ',
  photoSlotLabel: 'ਫੋਟੋ ਸਲੌਟ',
  galleryCaptionBride: 'ਲਾੜੀ',
  galleryCaptionGroom: 'ਲਾੜਾ',
  galleryCaptionTogether: 'ਇਕੱਠੇ',
  galleryCaptionForever: 'ਸਦਾ ਲਈ',

  rsvpWarmWelcome: 'ਜੀ ਆਇਆਂ ਨੂੰ',
  rsvpHeading: 'ਵਟਸਐਪ ਰਾਹੀਂ RSVP ਕਰੋ',
  rsvpDeadline: 'ਕਿਰਪਾ ਕਰਕੇ 25 ਨਵੰਬਰ 2026 ਤੱਕ ਆਪਣੀ ਹਾਜ਼ਰੀ ਦੱਸੋ',
  rsvpNameLabel: 'ਤੁਹਾਡਾ ਪੂਰਾ ਨਾਮ *',
  rsvpNamePlaceholder: 'ਜਿਵੇਂ ਰੋਹਨ ਅਤੇ ਪ੍ਰਿਆ ਸ਼ਰਮਾ',
  rsvpGuestsLabel: 'ਮਹਿਮਾਨਾਂ ਦੀ ਗਿਣਤੀ',
  rsvpGuestSingular: 'ਮਹਿਮਾਨ',
  rsvpGuestPlural: 'ਮਹਿਮਾਨ',
  rsvpEventsLabel: 'ਕਿਹੜੇ ਸਮਾਗਮਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋਗੇ *',
  rsvpMessageLabel: 'ਅਸੀਸਾਂ ਜਾਂ ਸੁਨੇਹਾ (ਵਿਕਲਪਿਕ)',
  rsvpMessagePlaceholder: 'ਆਪਣੀਆਂ ਸ਼ੁਭਕਾਮਨਾਵਾਂ ਜਾਂ ਸੰਗੀਤ ਲਈ ਗੀਤ ਲਿਖੋ...',
  rsvpSubmitButton: 'ਵਟਸਐਪ ਰਾਹੀਂ RSVP ਭੇਜੋ',
  rsvpThankYouPrefix: 'ਧੰਨਵਾਦ',
  rsvpReadyMessage: 'ਤੁਹਾਡਾ ਵਟਸਐਪ ਸੁਨੇਹਾ ਭੇਜਣ ਲਈ ਤਿਆਰ ਹੈ:',
  rsvpOpenWhatsapp: 'ਵਟਸਐਪ ਖੋਲ੍ਹੋ',
  rsvpCopyText: 'ਸੁਨੇਹਾ ਕਾਪੀ ਕਰੋ',
  rsvpCopiedText: 'ਕਾਪੀ ਹੋ ਗਿਆ',
  rsvpErrorName: 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਲਿਖੋ।',
  rsvpErrorEvents: 'ਕਿਰਪਾ ਕਰਕੇ ਘੱਟੋ-ਘੱਟ ਇੱਕ ਸਮਾਗਮ ਚੁਣੋ।',

  footerWaitingLine: 'ਤੁਹਾਡੀ ਆਮਦ ਦੀ ਉਡੀਕ ਵਿੱਚ',
  footerClosingLine: 'ਪਿਆਰ ਅਤੇ ਸਤਿਕਾਰ ਸਹਿਤ — ਗਿੱਲ ਅਤੇ ਰੰਧਾਵਾ ਪਰਿਵਾਰ',
};

const MR_TRANSLATIONS: TranslationDictionary = {
  ...HI_TRANSLATIONS,
  tapToOpen: 'निमंत्रण उघडण्यासाठी टॅप करा',
  openingBlessing: 'शुभविवाह',
  weddingCity: 'अमृतसर, पंजाब',
  scrollCue: 'खाली स्क्रोल करा',
  muteMusic: 'संगीत बंद करा',
  unmuteMusic: 'संगीत सुरू करा',
  languageChipLabel: 'भाषा',
  languageSheetTitle: 'भाषा निवडा',
  moreLanguagesButton: 'इतर भाषा ✨',
  themeSheetTitle: 'आपल्या लग्नाचा रंग निवडा',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'बंद करा',
  invitationBlessingLine: 'आमच्या विवाह सोहळ्यात आपले सहर्ष स्वागत आहे',
  invitationFamilyLine: 'आपणास सहकुटुंब सहपरिवार आग्रहाचे निमंत्रण',
  invitationTogetherLine: 'आमच्या दोन्ही कुटुंबांच्या वतीने',
  invitationSubtext:
    'हिवाळ्यातील सोनेरी ऊन आणि मोहरीच्या मळ्यांच्या साक्षीने, आमच्या आनंदात आणि आशीर्वादात सहभागी होण्यासाठी आम्ही आपणास स्नेहपूर्वक निमंत्रित करतो.',
  coupleKicker: 'दोन मने, एक अंगण',
  coupleHeading: 'वधू आणि वर',
  brideRole: 'वधू',
  brideRoleNative: 'वधू',
  groomRole: 'वर',
  groomRoleNative: 'वर',
  kahaniHeadingNative: 'आमची गोष्ट',
  kahaniClosingLine: 'आमच्या लग्नाला नक्की या',
  stop1Title: 'पहिला चहा',
  stop2Title: 'लांबच्या गप्पा',
  stop3Title: 'एक प्रश्न',
  stop4Title: 'रेशीमगाठ',
  countdownKicker: 'शुभ मुहूर्ताची प्रतीक्षा',
  countdownHeading: 'मंगलाष्टकांच्या क्षणापर्यंत',
  countdownDays: 'दिवस',
  countdownDaysSub: 'दिवस',
  countdownHours: 'तास',
  countdownHoursSub: 'तास',
  countdownMinutes: 'मिनिटे',
  countdownMinutesSub: 'मिनिटे',
  countdownSeconds: 'सेकंद',
  countdownSecondsSub: 'सेकंद',
  utsavHeadingNative: 'आमचे सोहळे',
  utsavSubtitle: 'पाच दिवस, पाच रंग, एक प्रेमकथा',
  utsavClosingLine: 'आपल्या आगमनाच्या प्रतीक्षेत',
  labelTime: 'वेळ',
  labelVenue: 'स्थळ',
  labelDressCode: 'पोशाख रंग',
  openInMaps: 'नकाशात पहा',
  addToCalendar: '+ कॅलेंडरमध्ये जोडा',
  event1NativeTitle: 'हळद',
  event2NativeTitle: 'मेहंदी',
  event3NativeTitle: 'संगीत',
  event4NativeTitle: 'सप्तपदी / फेरे',
  event5NativeTitle: 'स्वागत समारंभ',
  venueKicker: 'जिथे आपली कुटुंबे एकत्र येतील',
  venueHeading: 'विवाह स्थळ',
  dressCodeHeading: 'पोशाख रंग — पैठणी',
  galleryCaptionBride: 'नवरी',
  galleryCaptionGroom: 'नवरदेव',
  galleryCaptionTogether: 'एकत्र',
  galleryCaptionForever: 'कायमचे',
  rsvpWarmWelcome: 'सुस्वागतम्',
  rsvpHeading: 'व्हॉट्सॲपवर RSVP करा',
  rsvpSubmitButton: 'व्हॉट्सॲपद्वारे RSVP पाठवा',
  footerWaitingLine: 'आपल्या आगमनाच्या प्रतीक्षेत',
  footerClosingLine: 'स्नेह आणि कृतज्ञतेसह — गिल आणि रंधावा परिवार',
};

const GU_TRANSLATIONS: TranslationDictionary = {
  ...EN_TRANSLATIONS,
  tapToOpen: 'આમંત્રણ ખોલવા માટે ટૅપ કરો',
  openingBlessing: 'શુભ વિવાહ',
  weddingCity: 'અમૃતસર, પંજાબ',
  scrollCue: 'નીચે સ્ક્રોલ કરો',
  muteMusic: 'સંગીત બંધ કરો',
  unmuteMusic: 'સંગીત ચાલુ કરો',
  languageChipLabel: 'ભાષા',
  languageSheetTitle: 'ભાષા પસંદ કરો',
  moreLanguagesButton: 'વધુ ભાષાઓ ✨',
  themeSheetTitle: 'તમારા લગ્નનો રંગ પસંદ કરો',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'બંધ કરો',
  invitationBlessingLine: 'અમારા લગ્ન ઉત્સવમાં આપનું હાર્દિક સ્વાગત છે',
  invitationFamilyLine: 'આપને સહપરિવાર પધારવા ભાવભર્યું આમંત્રણ છે',
  invitationTogetherLine: 'અમારા બંને પરિવારો તરફથી',
  invitationSubtext:
    'શિયાળાના સોનેરી તડકા અને સરસવના ખીલેલા ખેતરો વચ્ચે, અમારા આનંદ અને પ્રેમના આ પવિત્ર ઉત્સવમાં સહભાગી થવા અમે આપને હૃદયપૂર્વક આમંત્રિત કરીએ છીએ.',
  coupleKicker: 'બે આત્મા, એક આંગણું',
  coupleHeading: 'કન્યા અને વરરાજા',
  brideRole: 'કન્યા',
  brideRoleNative: 'કન્યા',
  brideParents: 'સરદાર હરપ્રીત સિંહ અને સરદારની ગુરપ્રીત કૌર ગિલની સુપુત્રી',
  groomRole: 'વરરાજા',
  groomRoleNative: 'વરરાજા',
  groomParents: 'સરદાર વિક્રમજીત સિંહ અને સરદારની નીરુ કૌર રંધાવાના સુપુત્ર',
  kahaniHeadingNative: 'અમારી વાર્તા',
  kahaniClosingLine: 'અમારા લગ્નમાં આપ જરૂર પધારજો',
  stop1Title: 'પહેલી ચા',
  stop1Native: 'પહેલી મુલાકાત',
  stop2Title: 'લાંબી વાતો',
  stop2Native: 'મીઠી વાતો',
  stop3Title: 'એક સવાલ',
  stop3Native: 'દિલની વાત',
  stop4Title: 'હસ્તમેળાપ',
  stop4Native: 'પવિત્ર બંધન',
  countdownKicker: 'શુભ ઘડીની પ્રતીક્ષા',
  countdownHeading: 'અમારા પવિત્ર ફેરા સુધી',
  countdownDays: 'દિવસ',
  countdownDaysSub: 'દિવસ',
  countdownHours: 'કલાક',
  countdownHoursSub: 'કલાક',
  countdownMinutes: 'મિનિટ',
  countdownMinutesSub: 'મિનિટ',
  countdownSeconds: 'સેકન્ડ',
  countdownSecondsSub: 'સેકન્ડ',
  utsavHeadingNative: 'અમારા ઉત્સવો',
  utsavSubtitle: 'પાંચ દિવસ, પાંચ રંગ, એક કહાની',
  utsavClosingLine: 'આપના આગમનની પ્રતીક્ષામાં',
  eventEyebrowPrefix: 'પ્રસંગ',
  labelTime: 'સમય',
  labelVenue: 'સ્થળ',
  labelDressCode: 'પરિધાન રંગ',
  openInMaps: 'નકશામાં જુઓ',
  addToCalendar: '+ કેલેન્ડરમાં ઉમેરો',
  event1NativeTitle: 'પીઠી / હળદર',
  event2NativeTitle: 'મહેંદી',
  event3NativeTitle: 'સંગીત અને ગરબા',
  event4NativeTitle: 'ફેરા',
  event5NativeTitle: 'સત્કાર સમારંભ',
  venueKicker: 'જ્યાં આપણા પરિવારો મળશે',
  venueHeading: 'લગ્ન સ્થળ',
  dressCodeHeading: 'પરિધાન રંગ — બાંધણી ગરબા',
  galleryHeading: 'યાદોની ઝલક',
  galleryCaptionBride: 'કન્યા',
  galleryCaptionGroom: 'વરરાજા',
  galleryCaptionTogether: 'સાથે',
  galleryCaptionForever: 'હંમેશા માટે',
  rsvpWarmWelcome: 'પધારો જી',
  rsvpHeading: 'વોટ્સએપ પર RSVP કરો',
  rsvpNameLabel: 'આપનું પૂરું નામ *',
  rsvpGuestsLabel: 'મહેમાનોની સંખ્યા',
  rsvpEventsLabel: 'કયા પ્રસંગોમાં હાજરી આપશો *',
  rsvpSubmitButton: 'વોટ્સએપ દ્વારા RSVP મોકલો',
  footerWaitingLine: 'આપના આગમનની પ્રતીક્ષામાં',
  footerClosingLine: 'સ્નેહ અને આભાર સહ — ગિલ અને રંધાવા પરિવાર',
};

const BN_TRANSLATIONS: TranslationDictionary = {
  ...EN_TRANSLATIONS,
  tapToOpen: 'আমন্ত্রণপত্র খুলতে ট্যাপ করুন',
  openingBlessing: 'শুভ বিবাহ',
  weddingCity: 'অমৃতসর, পাঞ্জাব',
  scrollCue: 'নিচে স্ক্রোল করুন',
  muteMusic: 'সঙ্গীত বন্ধ করুন',
  unmuteMusic: 'সঙ্গীত চালু করুন',
  languageChipLabel: 'ভাষা',
  languageSheetTitle: 'ভাষা নির্বাচন করুন',
  moreLanguagesButton: 'আরও ভাষা ✨',
  themeSheetTitle: 'আপনার বিয়ের রঙ বেছে নিন',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'বন্ধ করুন',
  invitationBlessingLine: 'আমাদের বিবাহ উৎসবে আপনাকে সাদর আমন্ত্রণ',
  invitationFamilyLine: 'সপরিবারে আপনার উপস্থিতি একান্ত কাম্য',
  invitationTogetherLine: 'আমাদের দুই পরিবারের পক্ষ থেকে',
  invitationSubtext:
    'শীতের সোনালী রোদে সরষে ফুলের মেলায়, আমাদের আনন্দ ও ভালোবাসার এই শুভ লগ্নে আপনার আশীর্বাদ ও উপস্থিতি কামনা করি।',
  coupleKicker: 'দুটি প্রাণ, একটি অঙ্গন',
  coupleHeading: 'কনে ও বর',
  brideRole: 'কনে',
  brideRoleNative: 'কনে',
  groomRole: 'বর',
  groomRoleNative: 'বর',
  kahaniHeadingNative: 'আমাদের গল্প',
  kahaniClosingLine: 'আমাদের বিয়েতে কিন্তু অবশ্যই আসবেন',
  stop1Title: 'প্রথম চা',
  stop1Native: 'প্রথম দেখা',
  stop2Title: 'লম্বা আড্ডা',
  stop2Native: 'মনের কথা',
  stop3Title: 'একটি প্রশ্ন',
  stop3Native: 'ভালোবাসার প্রস্তাব',
  stop4Title: 'মালাবদল ও গাঁটছড়া',
  stop4Native: 'পবিত্র বন্ধন',
  countdownKicker: 'শুভ লগ্নের অপেক্ষা',
  countdownHeading: 'আমাদের শুভ পরিণয় পর্যন্ত',
  countdownDays: 'দিন',
  countdownDaysSub: 'দিন',
  countdownHours: 'ঘণ্টা',
  countdownHoursSub: 'ঘণ্টা',
  countdownMinutes: 'মিনিট',
  countdownMinutesSub: 'মিনিট',
  countdownSeconds: 'সেকেন্ড',
  countdownSecondsSub: 'সেকেন্ড',
  utsavHeadingNative: 'আমাদের উৎসব',
  utsavSubtitle: 'পাঁচ দিন, পাঁচ রঙ, একটি গল্প',
  utsavClosingLine: 'আপনার আগমনের অপেক্ষায়',
  eventEyebrowPrefix: 'অনুষ্ঠান',
  labelTime: 'সময়',
  labelVenue: 'স্থান',
  labelDressCode: 'পোশাকের রঙ',
  openInMaps: 'ম্যাপে দেখুন',
  addToCalendar: '+ ক্যালেন্ডারে যোগ করুন',
  event1NativeTitle: 'গায়ে হলুদ',
  event2NativeTitle: 'মেহেন্দি',
  event3NativeTitle: 'সঙ্গীত সন্ধ্যা',
  event4NativeTitle: 'শুভদৃষ্টি ও সাতপাক',
  event5NativeTitle: 'প্রীতিভোজ',
  venueKicker: 'যেখানে আমাদের পরিবার মিলিত হবে',
  venueHeading: 'বিবাহ বাসর',
  dressCodeHeading: 'পোশাকের রঙ — আল্পনা',
  galleryHeading: 'স্মৃতির ঝাঁপি',
  galleryCaptionBride: 'কনে',
  galleryCaptionGroom: 'বর',
  galleryCaptionTogether: 'একসাথে',
  galleryCaptionForever: 'চিরকাল',
  rsvpWarmWelcome: 'সুস্বাগতম',
  rsvpHeading: 'হোয়াটসঅ্যাপে RSVP করুন',
  rsvpNameLabel: 'আপনার পুরো নাম *',
  rsvpGuestsLabel: 'অতিথির সংখ্যা',
  rsvpEventsLabel: 'যে অনুষ্ঠানগুলিতে উপস্থিত থাকবেন *',
  rsvpSubmitButton: 'হোয়াটসঅ্যাপে RSVP পাঠান',
  footerWaitingLine: 'আপনার আগমনের অপেক্ষায়',
  footerClosingLine: 'ভালোবাসা ও কৃতজ্ঞতায় — গিল ও রান্ধাওয়া পরিবার',
};

const BHO_TRANSLATIONS: TranslationDictionary = {
  ...HI_TRANSLATIONS,
  tapToOpen: 'नेवता खोले खातिर टैप करीं',
  openingBlessing: 'शुभ विवाह',
  weddingCity: 'अमृतसर, पंजाब',
  scrollCue: 'नीचे देखीं',
  languageChipLabel: 'बोली / भाषा',
  languageSheetTitle: 'आपन भाषा चुनीं',
  moreLanguagesButton: 'अउरी भाषा ✨',
  themeSheetTitle: 'आपन शादी के रंग चुनीं',
  themeSheetSubtitle: '16 wedding styles',
  invitationBlessingLine: 'हमनी के बियाह उत्सव में रउआ सब के हार्दिक स्वागत बा',
  invitationFamilyLine: 'रउआ सपरिवार सादर नेवता बा',
  invitationTogetherLine: 'हमनी के दुनो परिवार के ओर से',
  invitationSubtext:
    'जाड़ा के सुनहरा घाम आ सरसों के खेत के बीच, हमनी के एह खुशी आ आशीर्वाद के पावन उत्सव में रउआ सब के नेवता देत बानी जा।',
  coupleKicker: 'दू गो जियरा, एक आँगन',
  coupleHeading: 'दुलहिन आ दुलहा',
  brideRole: 'दुलहिन',
  brideRoleNative: 'दुलहिन',
  groomRole: 'दुलहा',
  groomRoleNative: 'दुलहा',
  kahaniHeadingNative: 'हमनी के कहानी',
  kahaniClosingLine: 'अब हमनी के शादी में रउआ ज़रूर आइब',
  stop1Title: 'पहिलकी चाय',
  stop2Title: 'लंबी बतकही',
  stop3Title: 'एगो सवाल',
  stop4Title: 'गठबंधन',
  countdownKicker: 'शुभ घड़ी के इंतजार',
  countdownHeading: 'पावन फेरा के घड़ी तक',
  utsavHeadingNative: 'हमनी के उत्सव',
  utsavSubtitle: 'पाँच दिन, पाँच रंग, एक कहानी',
  utsavClosingLine: 'राउर राह देखत बानी जा',
  event1NativeTitle: 'हल्दी आ मटकोर',
  event2NativeTitle: 'मेहंदी',
  event3NativeTitle: 'संगीत आ गीत-गवना',
  event4NativeTitle: 'फेरा',
  event5NativeTitle: 'प्रीतिभोज / रिसेप्शन',
  venueKicker: 'जहवाँ हमनी के परिवार मिली',
  venueHeading: 'बियाह के स्थान',
  dressCodeHeading: 'पहिरावा के रंग — मधुबनी',
  galleryCaptionBride: 'दुलहिन',
  galleryCaptionGroom: 'दुलहा',
  galleryCaptionTogether: 'संगे',
  galleryCaptionForever: 'सदा खातिर',
  rsvpWarmWelcome: 'पधारीं जी',
  rsvpHeading: 'व्हाट्सएप पर नेवता स्वीकार करीं',
  footerWaitingLine: 'राउर आगमन के प्रतीक्षा में',
  footerClosingLine: 'नेह आ आभार सहित — गिल आ रंधावा परिवार',
};

const TA_TRANSLATIONS: TranslationDictionary = {
  ...EN_TRANSLATIONS,
  tapToOpen: 'அழைப்பிதழைத் திறக்க தட்டவும்',
  openingBlessing: 'சுப முகூர்த்தம்',
  weddingCity: 'அமிர்தசரஸ், பஞ்சாப்',
  scrollCue: 'கீழே நகர்த்தவும்',
  muteMusic: 'இசையை நிறுத்து',
  unmuteMusic: 'இசையை இயக்கு',
  languageChipLabel: 'மொழி',
  languageSheetTitle: 'மொழியைத் தேர்ந்தெடுக்கவும்',
  moreLanguagesButton: 'மேலும் மொழிகள் ✨',
  themeSheetTitle: 'உங்கள் திருமணத்தின் நிறத்தைத் தேர்ந்தெடுக்கவும்',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'மூடு',
  invitationBlessingLine: 'எங்கள் திருமண விழாவிற்கு உங்களை அன்புடன் வரவேற்கிறோம்',
  invitationFamilyLine: 'குடும்பத்துடன் வருகை தந்து சிறப்பிக்க வேண்டுகிறோம்',
  invitationTogetherLine: 'எங்கள் இரு குடும்பங்களின் சார்பாக',
  invitationSubtext:
    'குளிர்கால பொன் வெயிலில் கடுகு வயல்கள் பூத்துக் குலுங்கும் வேளையில், எங்கள் அன்பும் ஆசியும் நிறைந்த திருமண விழாவில் பங்கேற்க உங்களை அன்போடு அழைக்கிறோம்.',
  coupleKicker: 'இரு உள்ளங்கள், ஒரு இல்லம்',
  coupleHeading: 'மணமகள் & மணமகன்',
  brideRole: 'மணமகள்',
  brideRoleNative: 'மணமகள்',
  groomRole: 'மணமகன்',
  groomRoleNative: 'மணமகன்',
  kahaniHeadingNative: 'எங்கள் கதை',
  kahaniClosingLine: 'எங்கள் திருமணத்திற்கு நிச்சயம் வாருங்கள்',
  stop1Title: 'முதல் தேநீர்',
  stop1Native: 'முதல் சந்திப்பு',
  stop2Title: 'இனிய உரையாடல்கள்',
  stop2Native: 'நெடுந்தூர பயணம்',
  stop3Title: 'ஒரு கேள்வி',
  stop3Native: 'காதல் விண்ணப்பம்',
  stop4Title: 'திருமாங்கல்யம்',
  stop4Native: 'புனித பந்தம்',
  countdownKicker: 'சுப வேளையை எதிர்நோக்கி',
  countdownHeading: 'எங்கள் திருமண முகூர்த்தம் வரை',
  countdownDays: 'நாட்கள்',
  countdownDaysSub: 'நாட்கள்',
  countdownHours: 'மணி',
  countdownHoursSub: 'மணி',
  countdownMinutes: 'நிமிடங்கள்',
  countdownMinutesSub: 'நிமிடம்',
  countdownSeconds: 'விநாடிகள்',
  countdownSecondsSub: 'விநாடி',
  utsavHeadingNative: 'திருமண நிகழ்வுகள்',
  utsavSubtitle: 'ஐந்து நாட்கள், ஐந்து வண்ணங்கள், ஒரு காவியம்',
  utsavClosingLine: 'உங்கள் வருகையை ஆவலுடன் எதிர்பார்க்கிறோம்',
  eventEyebrowPrefix: 'நிகழ்வு',
  labelTime: 'நேரம்',
  labelVenue: 'இடம்',
  labelDressCode: 'ஆடை வண்ணம்',
  openInMaps: 'வரைபடத்தில் பார்க்க',
  addToCalendar: '+ நாட்காட்டியில் சேர்க்க',
  event1NativeTitle: 'மஞ்சள் நீராட்டு (ஹல்தி)',
  event2NativeTitle: 'மருதாணி (மெஹந்தி)',
  event3NativeTitle: 'சங்கீத் & இசை இரவு',
  event4NativeTitle: 'முகூர்த்தம் / சப்தபதி',
  event5NativeTitle: 'வரவேற்பு விழா',
  venueKicker: 'நம் குடும்பங்கள் இணையும் இடம்',
  venueHeading: 'திருமண மண்டபம்',
  dressCodeHeading: 'ஆடை வண்ணம் — காஞ்சிபுரம்',
  galleryHeading: 'நினைவுத் துளிகள்',
  galleryCaptionBride: 'மணமகள்',
  galleryCaptionGroom: 'மணமகன்',
  galleryCaptionTogether: 'இணைந்து',
  galleryCaptionForever: 'என்றென்றும்',
  rsvpWarmWelcome: 'நல்வரவு',
  rsvpHeading: 'வாட்ஸ்அப் மூலம் RSVP செய்யவும்',
  rsvpNameLabel: 'உங்கள் முழு பெயர் *',
  rsvpGuestsLabel: 'விருந்தினர்கள் எண்ணிக்கை',
  rsvpEventsLabel: 'பங்கேற்கும் நிகழ்வுகள் *',
  rsvpSubmitButton: 'வாட்ஸ்அப்பில் RSVP அனுப்பவும்',
  footerWaitingLine: 'உங்கள் வருகையை ஆவலுடன் எதிர்பார்க்கிறோம்',
  footerClosingLine: 'அன்புடன் — கில் & ரந்தாவா குடும்பத்தினர்',
};

const TE_TRANSLATIONS: TranslationDictionary = {
  ...EN_TRANSLATIONS,
  tapToOpen: 'ఆహ్వానాన్ని తెరవడానికి ట్యాప్ చేయండి',
  openingBlessing: 'శుభ వివాహ महోత్సవం'.replace('मह', 'మహ'),
  weddingCity: 'అమృత్‌సర్, పంజాబ్',
  scrollCue: 'క్రిందికి స్క్రోల్ చేయండి',
  muteMusic: 'సంగీతం ఆపండి',
  unmuteMusic: 'సంగీతం ప్లే చేయండి',
  languageChipLabel: 'భాష',
  languageSheetTitle: 'భాషను ఎంచుకోండి',
  moreLanguagesButton: 'మరిన్ని భాషలు ✨',
  themeSheetTitle: 'మీ పెళ్లి రంగును ఎంచుకోండి',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'మూసివేయి',
  invitationBlessingLine: 'మా వివాహ మహోత్సవానికి మీకు సాదర స్వాగతం',
  invitationFamilyLine: 'మీరు సకుటుంబ సపరివార సమేతంగా విచ్చేయాలని కోరుకుంటున్నాము',
  invitationTogetherLine: 'మా ఇరు కుటుంబాల తరపున',
  invitationSubtext:
    'చలికాలపు బంగారు ఎండలో, ఆవాల పూల తోటల సాక్షిగా మా ఆనందం మరియు ప్రేమ వేడుకలో పాలుపంచుకోవడానికి మిమ్మల్ని ఆహ్వానిస్తున్నాము.',
  coupleKicker: 'రెండు హృదయాలు, ఒకే లోగిలి',
  coupleHeading: 'వధూవరులు',
  brideRole: 'వధువు',
  brideRoleNative: 'పెళ్లికూతురు',
  groomRole: 'వరుడు',
  groomRoleNative: 'పెళ్లికొడుకు',
  kahaniHeadingNative: 'మా కథ',
  kahaniClosingLine: 'మా పెళ్లికి మీరు తప్పకుండా రావాలి',
  stop1Title: 'మొదటి టీ',
  stop1Native: 'మొదటి పరిచయం',
  stop2Title: 'తీపి కబుర్లు',
  stop2Native: 'సాయంత్రపు ప్రయాణాలు',
  stop3Title: 'ఒక ప్రశ్న',
  stop3Native: 'ప్రేమ నివేదన',
  stop4Title: 'మాంగల్య బంధం',
  stop4Native: 'పవిత్ర బంధం',
  countdownKicker: 'శుభ ముహూర్తం కోసం ఎదురుచూపు',
  countdownHeading: 'మా సుముహూర్తం వరకు',
  countdownDays: 'రోజులు',
  countdownDaysSub: 'రోజులు',
  countdownHours: 'గంటలు',
  countdownHoursSub: 'గంటలు',
  countdownMinutes: 'నిమిషాలు',
  countdownMinutesSub: 'నిమిషాలు',
  countdownSeconds: 'సెకన్లు',
  countdownSecondsSub: 'సెకన్లు',
  utsavHeadingNative: 'మా వేడుకలు',
  utsavSubtitle: 'ఐదు రోజులు, ఐదు రంగులు, ఒకే కథ',
  utsavClosingLine: 'మీ రాక కోసం ఎదురుచూస్తూ',
  eventEyebrowPrefix: 'వేడుక',
  labelTime: 'సమయం',
  labelVenue: 'వేదిక',
  labelDressCode: 'దుస్తుల రంగు',
  openInMaps: 'మ్యాప్‌లో చూడండి',
  addToCalendar: '+ క్యాలెండర్‌లో జోడించండి',
  event1NativeTitle: 'హల్దీ / మంగళ స్నానం',
  event2NativeTitle: 'మెహందీ వేడుక',
  event3NativeTitle: 'సంగీత్ రాత్రి',
  event4NativeTitle: 'ముహూర్తం / సప్తపది',
  event5NativeTitle: 'రిసెప్షన్ విందు',
  venueKicker: 'మన కుటుంబాలు కలిసే చోటు',
  venueHeading: 'వివాహ వేదిక',
  dressCodeHeading: 'దుస్తుల రంగులు — పోచంపల్లి',
  galleryHeading: 'మధుర జ్ఞాపకాలు',
  galleryCaptionBride: 'వధువు',
  galleryCaptionGroom: 'వరుడు',
  galleryCaptionTogether: 'కలిసి',
  galleryCaptionForever: 'ఎప్పటికీ',
  rsvpWarmWelcome: 'సుస్వాగతం',
  rsvpHeading: 'వాట్సాప్‌లో RSVP చేయండి',
  rsvpNameLabel: 'మీ పూర్తి పేరు *',
  rsvpGuestsLabel: 'అతిథుల సంఖ్య',
  rsvpEventsLabel: 'హాజరయ్యే వేడుకలు *',
  rsvpSubmitButton: 'వాట్సాప్ ద్వారా RSVP పంపండి',
  footerWaitingLine: 'మీ రాక కోసం ఎదురుచూస్తూ',
  footerClosingLine: 'ప్రేమతో — గిల్ & రంధావా కుటుంబాలు',
};

const KN_TRANSLATIONS: TranslationDictionary = {
  ...EN_TRANSLATIONS,
  tapToOpen: 'ಆಮಂತ್ರಣವನ್ನು ತೆರೆಯಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
  openingBlessing: 'ಶುಭ ವಿವಾಹ',
  weddingCity: 'ಅಮೃತಸರ, ಪಂಜಾಬ್',
  scrollCue: 'ಕೆಳಗೆ ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
  muteMusic: 'ಸಂಗೀತ ನಿಲ್ಲಿಸಿ',
  unmuteMusic: 'ಸಂಗೀತ ಪ್ಲೇ ಮಾಡಿ',
  languageChipLabel: 'ಭಾಷೆ',
  languageSheetTitle: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  moreLanguagesButton: 'ಇನ್ನಷ್ಟು ಭಾಷೆಗಳು ✨',
  themeSheetTitle: 'ನಿಮ್ಮ ಮದುವೆಯ ಬಣ್ಣವನ್ನು ಆರಿಸಿ',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'ಮುಚ್ಚಿ',
  invitationBlessingLine: 'ನಮ್ಮ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ನಿಮಗೆ ಹಾರ್ದಿಕ ಸ್ವಾಗತ',
  invitationFamilyLine: 'ತಾವು ಕುಟುಂಬ ಸಮೇತರಾಗಿ ಆಗಮಿಸಿ ಆಶೀರ್ವದಿಸಬೇಕಾಗಿ ವಿನಂತಿ',
  invitationTogetherLine: 'ನಮ್ಮ ಎರಡೂ ಕುಟುಂಬಗಳ ಪರವಾಗಿ',
  invitationSubtext:
    'ಚಳಿಗಾಲದ ಹೊಂಬಿಸಿಲಿನಲ್ಲಿ ಸಾಸಿವೆ ಹೂವುಗಳು ಅರಳುವ ಶುಭ வேளೆಯಲ್ಲಿ, ನಮ್ಮ ಪ್ರೀತಿ ಮತ್ತು ಸಂಭ್ರಮದ ವಿವಾಹ ಮಹೋತ್ಸವಕ್ಕೆ ನಿಮ್ಮನ್ನು ಆತ್ಮೀಯವಾಗಿ ಸ್ವಾಗತಿಸುತ್ತೇವೆ.',
  coupleKicker: 'ಎರಡು ಜೀವಗಳು, ಒಂದೇ ಅಂಗಳ',
  coupleHeading: 'ವಧು ಮತ್ತು ವರ',
  brideRole: 'ವಧು',
  brideRoleNative: 'ಮದುಮಗಳು',
  groomRole: 'ವರ',
  groomRoleNative: 'ಮದುಮಗ',
  kahaniHeadingNative: 'ನಮ್ಮ ಕಥೆ',
  kahaniClosingLine: 'ನಮ್ಮ ಮದುವೆಗೆ ನೀವು ಖಂಡಿತ ಬರಬೇಕು',
  stop1Title: 'ಮೊದಲ ಚಹಾ',
  stop1Native: 'ಮೊದಲ ಭೇಟಿ',
  stop2Title: 'ಸುದೀರ್ಘ ಮಾತುಕತೆ',
  stop2Native: 'ಸಂಜೆಯ ಪಯಣ',
  stop3Title: 'ಒಂದು ಪ್ರಶ್ನೆ',
  stop3Native: 'ಮನದ ಮಾತು',
  stop4Title: 'ಮಾಂಗಲ್ಯ ಬಂಧ',
  stop4Native: 'ಪವಿತ್ರ ಬಂಧನ',
  countdownKicker: 'ಶುಭ ಗಳಿಗೆಗಾಗಿ ಕಾತರ',
  countdownHeading: 'ನಮ್ಮ ಶುಭ ಮುಹೂರ್ತದವರೆಗೆ',
  countdownDays: 'ದಿನಗಳು',
  countdownDaysSub: 'ದಿನಗಳು',
  countdownHours: 'ಗಂಟೆಗಳು',
  countdownHoursSub: 'ಗಂಟೆಗಳು',
  countdownMinutes: 'ನಿಮಿಷಗಳು',
  countdownMinutesSub: 'ನಿಮಿಷ',
  countdownSeconds: 'ಸೆಕೆಂಡುಗಳು',
  countdownSecondsSub: 'ಸೆಕೆಂಡ್',
  utsavHeadingNative: 'ನಮ್ಮ ಸಂಭ್ರಮಗಳು',
  utsavSubtitle: 'ಐದು ದಿನ, ಐದು ಬಣ್ಣ, ಒಂದೇ ಕಥೆ',
  utsavClosingLine: 'ನಿಮ್ಮ ಆಗಮನದ ನಿರೀಕ್ಷೆಯಲ್ಲಿ',
  eventEyebrowPrefix: 'ಸಮಾರಂಭ',
  labelTime: 'ಸಮಯ',
  labelVenue: 'ಸ್ಥಳ',
  labelDressCode: 'ಉಡುಗೆಯ ಬಣ್ಣ',
  openInMaps: 'ಮ್ಯಾಪ್‌ನಲ್ಲಿ ನೋಡಿ',
  addToCalendar: '+ ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ',
  event1NativeTitle: 'ಅರಿಶಿನ ಶಾಸ್ತ್ರ (ಹಲ್ದಿ)',
  event2NativeTitle: 'ಮೆಹಂದಿ ಸಂಭ್ರಮ',
  event3NativeTitle: 'ಸಂಗೀತ್ ಸಂಜೆ',
  event4NativeTitle: 'ಧಾರೆ ಮುಹೂರ್ತ',
  event5NativeTitle: 'ಆರತಕ್ಷತೆ ಮತ್ತು ಭೋಜನ',
  venueKicker: 'ನಮ್ಮ ಕುಟುಂಬಗಳು ಸೇರುವ ತಾಣ',
  venueHeading: 'ವಿವಾಹ ಮಂಟಪ',
  dressCodeHeading: 'ಉಡುಗೆಯ ಬಣ್ಣ — ಮೈಸೂರು ಸಿಲ್ಕ್',
  galleryHeading: 'ನೆನಪಿನಂಗಳ',
  galleryCaptionBride: 'ವಧು',
  galleryCaptionGroom: 'ವರ',
  galleryCaptionTogether: 'ಜೊತೆಯಾಗಿ',
  galleryCaptionForever: 'ಎಂದೆಂದಿಗೂ',
  rsvpWarmWelcome: 'ಸುಸ್ವಾಗತ',
  rsvpHeading: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ RSVP ಮಾಡಿ',
  rsvpNameLabel: 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು *',
  rsvpGuestsLabel: 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ',
  rsvpEventsLabel: 'ಭಾಗವಹಿಸುವ ಸಮಾರಂಭಗಳು *',
  rsvpSubmitButton: 'ವಾಟ್ಸಾಪ್ ಮೂಲಕ RSVP ಕಳುಹಿಸಿ',
  footerWaitingLine: 'ನಿಮ್ಮ ಆಗಮನದ ನಿರೀಕ್ಷೆಯಲ್ಲಿ',
  footerClosingLine: 'ಪ್ರೀತಿ ಮತ್ತು ಕೃತಜ್ಞತೆಯೊಂದಿಗೆ — ಗಿಲ್ ಮತ್ತು ರಂಧಾವಾ ಕುಟುಂಬ',
};

const ML_TRANSLATIONS: TranslationDictionary = {
  ...EN_TRANSLATIONS,
  tapToOpen: 'ക്ഷണക്കത്ത് തുറക്കാൻ ടാപ്പ് ചെയ്യുക',
  openingBlessing: 'ശുഭ വിവാഹം',
  weddingCity: 'അമൃത്സർ, പഞ്ചാബ്',
  scrollCue: 'താഴേക്ക് സ്ക്രോൾ ചെയ്യുക',
  muteMusic: 'സംഗീതം നിർത്തുക',
  unmuteMusic: 'സംഗീതം പ്ലേ ചെയ്യുക',
  languageChipLabel: 'ഭാഷ',
  languageSheetTitle: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
  moreLanguagesButton: 'കൂടുതൽ ഭാഷകൾ ✨',
  themeSheetTitle: 'നിങ്ങളുടെ വിവാഹത്തിന്റെ നിറം തിരഞ്ഞെടുക്കുക',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'അടയ്ക്കുക',
  invitationBlessingLine: 'ഞങ്ങളുടെ വിവാഹ ആഘോഷത്തിലേക്ക് ഹൃദ്യമായ സ്വാഗതം',
  invitationFamilyLine: 'കുടുംബസമേതം പങ്കെടുത്ത് അനുഗ്രഹിക്കണമെന്ന് അപേക്ഷിക്കുന്നു',
  invitationTogetherLine: 'ഞങ്ങളുടെ ഇരു കുടുംബങ്ങളുടെയും പേരിൽ',
  invitationSubtext:
    'മഞ്ഞുകാലത്തെ പൊൻവെയിലിൽ കടുകുപാടങ്ങൾ പൂത്തുലയുന്ന ഈ শুভവേളയിൽ, ഞങ്ങളുടെ സന്തോഷത്തിലും പ്രാർത്ഥനയിലും പങ്കുചേരാൻ ഞങ്ങൾ നിങ്ങളെ സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു.',
  coupleKicker: 'രണ്ട് ഹൃദയങ്ങൾ, ഒരൊറ്റ മുറ്റം',
  coupleHeading: 'വധുവും വരനും',
  brideRole: 'വധു',
  brideRoleNative: 'വധു',
  groomRole: 'വരൻ',
  groomRoleNative: 'വരൻ',
  kahaniHeadingNative: 'ഞങ്ങളുടെ കഥ',
  kahaniClosingLine: 'ഞങ്ങളുടെ വിവാഹത്തിന് തീർച്ചയായും വരണം',
  stop1Title: 'ആദ്യത്തെ ചായ',
  stop1Native: 'ആദ്യ കൂടിക്കാഴ്ച',
  stop2Title: 'നീണ്ട വർത്തമാനങ്ങൾ',
  stop2Native: 'സായാഹ്ന യാത്രകൾ',
  stop3Title: 'ഒരു ചോദ്യം',
  stop3Native: 'പ്രണയ നിവേദനം',
  stop4Title: 'താലികെട്ട്',
  stop4Native: 'പവിത്ര ബന്ധം',
  countdownKicker: 'ശുഭമുഹൂർത്തത്തിനായി കാത്തിരിപ്പ്',
  countdownHeading: 'ഞങ്ങളുടെ വിവാഹ മുഹൂർത്തം വരെ',
  countdownDays: 'ദിവസങ്ങൾ',
  countdownDaysSub: 'ദിവസം',
  countdownHours: 'മണിക്കൂർ',
  countdownHoursSub: 'മണിക്കൂർ',
  countdownMinutes: 'മിനിറ്റുകൾ',
  countdownMinutesSub: 'മിനിറ്റ്',
  countdownSeconds: 'സെക്കൻഡുകൾ',
  countdownSecondsSub: 'സെക്കൻഡ്',
  utsavHeadingNative: 'ഞങ്ങളുടെ ആഘോഷങ്ങൾ',
  utsavSubtitle: 'അഞ്ചു ദിനങ്ങൾ, അഞ്ചു നിറങ്ങൾ, ഒരു കഥ',
  utsavClosingLine: 'നിങ്ങളുടെ സാന്നിധ്യം പ്രതീക്ഷിച്ചുകൊണ്ട്',
  eventEyebrowPrefix: 'ചടങ്ങ്',
  labelTime: 'സമയം',
  labelVenue: 'സ്ഥലം',
  labelDressCode: 'വസ്ത്രധാരണ നിറം',
  openInMaps: 'മാപ്പിൽ കാണുക',
  addToCalendar: '+ കലണ്ടറിൽ ചേർക്കുക',
  event1NativeTitle: 'ഹൽദി',
  event2NativeTitle: 'മെഹന്ദി',
  event3NativeTitle: 'സംഗീത് രാവ്',
  event4NativeTitle: 'മുഹൂർത്തം / താലികെട്ട്',
  event5NativeTitle: 'വിവാഹ സൽക്കാരം',
  venueKicker: 'നമ്മുടെ കുടുംബങ്ങൾ ഒത്തുചേരുന്നയിടം',
  venueHeading: 'വിവാഹ വേദി',
  dressCodeHeading: 'വസ്ത്ര നിറങ്ങൾ — കസവ്',
  galleryHeading: 'ഓർമ്മച്ചെപ്പ്',
  galleryCaptionBride: 'മണവാട്ടി',
  galleryCaptionGroom: 'വരൻ',
  galleryCaptionTogether: 'ഒരുമിച്ച്',
  galleryCaptionForever: 'എന്നെന്നേക്കുമായി',
  rsvpWarmWelcome: 'സ്വാഗതം',
  rsvpHeading: 'വാട്ട്‌സ്ആപ്പിൽ RSVP ചെയ്യുക',
  rsvpNameLabel: 'നിങ്ങളുടെ മുഴുവൻ പേര് *',
  rsvpGuestsLabel: 'അതിഥികളുടെ എണ്ണം',
  rsvpEventsLabel: 'പങ്കെടുക്കുന്ന ചടങ്ങുകൾ *',
  rsvpSubmitButton: 'വാട്ട്‌സ്ആപ്പ് വഴി RSVP അയയ്ക്കുക',
  footerWaitingLine: 'നിങ്ങളുടെ സാന്നിധ്യം പ്രതീക്ഷിച്ചുകൊണ്ട്',
  footerClosingLine: 'സ്നേഹത്തോടെ — ഗിൽ & രന്ധാവ കുടുംബങ്ങൾ',
};

const UR_TRANSLATIONS: TranslationDictionary = {
  ...EN_TRANSLATIONS,
  tapToOpen: 'دعوت نامہ کھولنے کے لیے ٹیپ کریں',
  openingBlessing: 'جشنِ شادی خانہ آبادی',
  weddingCity: 'امرتسر، پنجاب',
  scrollCue: 'نیچے اسکرول کریں',
  muteMusic: 'موسیقی بند کریں',
  unmuteMusic: 'موسیقی چلائیں',
  languageChipLabel: 'زبان',
  languageSheetTitle: 'زبان منتخب کریں',
  languageSearchPlaceholder: 'زبان تلاش کریں (اردو، انگریزی...)',
  moreLanguagesButton: 'مزید زبانیں ✨',
  themeSheetTitle: 'اپنی شادی کا رنگ چنیں',
  themeSheetSubtitle: '16 wedding styles',
  closeButton: 'بند کریں',

  invitationBlessingLine: 'ہماری شادی کی تقریب میں آپ کا پرخلوص خیرمقدم ہے',
  invitationFamilyLine: 'آپ کو بمعہ اہلِ خانہ شرکت کی پرخلوص دعوت دی جاتی ہے',
  invitationTogetherLine: 'ہمارے دونوں خاندانوں کی جانب سے',
  invitationSubtext:
    'سردیوں کی سنہری دھوپ اور سرسوں کے کھلتے کھیتوں کے درمیان، ہم آپ کو اپنی خوشیوں، دعاؤں اور محبت کے اس جشن میں شریک ہونے کی دعوت دیتے ہیں۔',

  coupleKicker: 'دو روحیں، ایک آنگن',
  coupleHeading: 'دلہن اور دولہا',
  brideRole: 'دلہن',
  brideRoleNative: 'دلہن',
  brideParents: 'سردار ہرپریت سنگھ اور سردارنی گرپریت کور گل کی صاحبزادی',
  brideBio: 'قدیم حویلیوں، فلٹر کافی اور سردیوں کی صبح سے محبت کرنے والی آرکیٹیکٹ۔',
  groomRole: 'دولہا',
  groomRoleNative: 'دولہا',
  groomParents: 'سردار وکرم جیت سنگھ اور سردارنی نیرو کور رندھاوا کے صاحبزادے',
  groomBio: 'کلاسیکی موسیقی کے شوقین جن کا ماننا ہے کہ ہر جشن گرم پراٹھوں سے شروع ہوتا ہے۔',

  kahaniHeadingNative: 'ہماری کہانی',
  kahaniHeadingScript: 'Humari Kahani',
  kahaniClosingLine: 'اب ہماری شادی میں آپ ضرور تشریف لائیں',
  stop1Title: 'پہلی چائے',
  stop1Native: 'پہلی ملاقات',
  stop1Caption: 'سردیوں کی دوپہر میں ادرک والی چائے کے دو کلہڑ، جہاں گھنٹے لمحوں کی طرح گزر گئے۔',
  stop2Title: 'لمبی باتیں',
  stop2Native: 'شام کا سفر',
  stop2Caption: 'شام کی لمبی ڈرائیوز، پسندیدہ نغمے اور کہانیاں جنہوں نے دو دلوں کو جوڑ دیا۔',
  stop3Title: 'ایک سوال',
  stop3Native: 'اظہارِ محبت',
  stop3Caption: 'سنہرے آسمان تلے پوچھا گیا ایک سوال، جس کا جواب سب سے خوبصورت ہاں تھا۔',
  stop4Title: 'عقدِ مسنون',
  stop4Native: 'مقدس رشتہ',
  stop4Caption: 'دو خاندانوں کی محبت، دعائیں اور ہر موسم میں ساتھ نبھانے کا عہد۔',

  countdownKicker: 'سعید لمحات کا انتظار',
  countdownHeading: 'ہماری شادی کی تقریب تک',
  countdownDays: 'دن',
  countdownDaysSub: 'دن',
  countdownHours: 'گھنٹے',
  countdownHoursSub: 'گھنٹے',
  countdownMinutes: 'منٹ',
  countdownMinutesSub: 'منٹ',
  countdownSeconds: 'سیکنڈ',
  countdownSecondsSub: 'سیکنڈ',

  utsavHeadingNative: 'ہماری تقریبات',
  utsavHeadingScript: 'Hamare Utsav',
  utsavSubtitle: 'پانچ دن، پانچ رنگ، ایک کہانی',
  utsavClosingLine: 'آپ کی تشریف آوری کے منتظر',
  eventEyebrowPrefix: 'تقریب',
  labelTime: 'وقت',
  labelVenue: 'مقام',
  labelDressCode: 'لباس کے رنگ',
  openInMaps: 'نقشے میں دیکھیں',
  addToCalendar: '+ کیلنڈر میں شامل کریں',
  savedToCalendar: 'کیلنڈر میں محفوظ ہو گیا',

  event1NativeTitle: 'ہلدی',
  event1ScriptTitle: 'Haldi',
  event1TimeSubline: 'ابٹن اور ہلدی کی دعائیں',
  event1VenueName: 'دی میری گولڈ باغ، رنجیت ایونیو',
  event1VenueAddress: 'بلاک بی، رنجیت ایونیو، امرتسر، پنجاب 143001',
  event1DressCode: 'سرسوں پیلا، آئیوری اور گیندے کے رنگ',
  event1Swatch1: 'گیندا',
  event1Swatch2: 'آئیوری',
  event1Swatch3: 'سبز',

  event2NativeTitle: 'مہندی',
  event2ScriptTitle: 'Mehndi',
  event2TimeSubline: 'حنا بندی اور لوک گیت',
  event2VenueName: 'برآمدہ لان، دی ہیریٹیج حویلی',
  event2VenueAddress: 'ایئرپورٹ روڈ، امرتسر، پنجاب 143001',
  event2DressCode: 'پستہ سبز، مہندی اور ہلکے پیسٹل رنگ',
  event2Swatch1: 'پستہ',
  event2Swatch2: 'مہندی',
  event2Swatch3: 'خاکی',

  event3NativeTitle: 'سنگیت',
  event3ScriptTitle: 'Sangeet',
  event3TimeSubline: 'سنگیت کی رات اور خاندانی رقص',
  event3VenueName: 'شیش محل بال روم، نور محل باغ',
  event3VenueAddress: 'مجسٹریٹ بائی پاس، امرتسر، پنجاب 143001',
  event3DressCode: 'چمکیلا کاسنی، گلابی اور شیشہ کاری',
  event3Swatch1: 'کاسنی',
  event3Swatch2: 'گلابی',
  event3Swatch3: 'عنابی',

  event4NativeTitle: 'پھیرے',
  event4ScriptTitle: 'Phere',
  event4TimeSubline: 'بارات صبح 9:30 · ملنی صبح 10:00',
  event4VenueName: 'ہیریٹیج کورٹ یاڑ',
  event4VenueAddress: 'گرینڈ ٹرنک روڈ، امرتسر، پنجاب 143001',
  event4DressCode: 'روایتی پیچ، مرجانی اور ریشمی لباس',
  event4Swatch1: 'پیچ',
  event4Swatch2: 'مرجانی',
  event4Swatch3: 'سرخ',

  event5NativeTitle: 'استقبالیہ',
  event5ScriptTitle: 'Reception',
  event5TimeSubline: 'شاہی باغ استقبالیہ اور ضیافت',
  event5VenueName: 'دی رائل باغ پویلین، نور محل',
  event5VenueAddress: 'گرینڈ ٹرنک روڈ، امرتسر، پنجاب 143001',
  event5DressCode: 'شیمپین گولڈ، آئیوری اور شاہی لباس',
  event5Swatch1: 'شیمپین',
  event5Swatch2: 'آئیوری',
  event5Swatch3: 'سنہری',

  venueKicker: 'جہاں ہمارے خاندان جمع ہوں گے',
  venueHeading: 'مقامِ تقریب',
  venueName: 'نور محل ہیریٹیج باغ اینڈ پویلین',
  venueAddress1: 'گرینڈ ٹرنک روڈ، نزد ہیریٹیج انکلیو',
  venueAddress2: 'امرتسر، پنجاب 143001، بھارت',
  venueLandmark: 'سری گرو رام داس جی انٹرنیشنل ایئرپورٹ سے 15 منٹ کی مسافت پر',
  venueConciergeLabel: 'رابطہ',

  dressCodeKicker: 'صبح کی سنہری دھوپ کے رنگ',
  dressCodeHeading: 'لباس کے رنگ — نکاح',
  dressCodeSuggestion:
    'ہم آپ کو صبح کے نرم پیسٹل، سنہری اور روایتی ریشمی ملبوسات زیب تن کرنے کی پرخلوص دعوت دیتے ہیں۔',

  galleryKicker: 'یادگار لمحات',
  galleryHeading: 'تصویری جھروکہ',
  gallerySubheading: 'پری ویڈنگ اور خاندانی تصاویر کے لیے خاص فریم',
  gallerySlot1Title: 'روکہ کی صبح',
  gallerySlot1Caption: 'پہلی دعائیں اور گیندے کے ہار',
  gallerySlot2Title: 'سرسوں کے کھیت',
  gallerySlot2Caption: 'امرتسر کی سنہری شام',
  gallerySlot3Title: 'چائے اور مسکراہٹیں',
  gallerySlot3Caption: 'پرانے شہر کی سردیاں',
  gallerySlot4Title: 'پھلکاری وراثت',
  gallerySlot4Caption: 'نانی کے ہاتھ کا دوپٹہ',
  photoSlotLabel: 'تصویر کی جگہ',
  galleryCaptionBride: 'دلہن',
  galleryCaptionGroom: 'دولہا',
  galleryCaptionTogether: 'ایک ساتھ',
  galleryCaptionForever: 'ہمیشہ کے لیے',
  rsvpWarmWelcome: 'خوش آمدید',
  rsvpHeading: 'واٹس ایپ پر شرکت کی تصدیق کریں',
  rsvpDeadline: 'براہ کرم 25 نومبر 2026 تک اپنی آمد سے آگاہ کریں',
  rsvpNameLabel: 'آپ کا پورا نام *',
  rsvpNamePlaceholder: 'مثلاً روہن اور پریا شرما',
  rsvpGuestsLabel: 'مہمانوں کی تعداد',
  rsvpGuestSingular: 'مہمان',
  rsvpGuestPlural: 'مہمان',
  rsvpEventsLabel: 'کن تقریبات میں شرکت فرمائیں گے *',
  rsvpMessageLabel: 'نیک تمنائیں یا پیغام (اختیاری)',
  rsvpMessagePlaceholder: 'اپنی دعائیں یا سنگیت کے لیے پسندیدہ گیت لکھیں...',
  rsvpSubmitButton: 'واٹس ایپ کے ذریعے بھیجیں',
  rsvpThankYouPrefix: 'شکریہ',
  rsvpReadyMessage: 'آپ کا واٹس ایپ پیغام بھیجنے کے لیے تیار ہے:',
  rsvpOpenWhatsapp: 'واٹس ایپ کھولیں',
  rsvpCopyText: 'متن کاپی کریں',
  rsvpCopiedText: 'کاپی ہو گیا',
  rsvpErrorName: 'براہ کرم اپنا پورا نام درج کریں۔',
  rsvpErrorEvents: 'براہ کرم کم از کم ایک تقریب منتخب کریں۔',

  footerWaitingLine: 'آپ کی تشریف آوری کے منتظر',
  footerClosingLine: 'محبت اور خلوص کے ساتھ — گل اور رندھاوا خاندان',
};

export const PERSONALISED_GUEST_TRANSLATIONS: Record<
  BuiltInLanguageCode,
  Partial<TranslationDictionary>
> = {
  en: {
    heroInvitationForLabel: 'INVITATION FOR',
    heroWelcomeLabel: 'WELCOME',
    heroTagline: 'Two hearts, one golden morning',
    invitationBlessingLine_guest: '{guest}, you and your family are warmly invited',
    countdownHeading_guest: '{guest}, the big day is almost here',
    utsavSubtitle_guest: '{guest}, these are the celebrations we would love to share with you',
    eventSaveTheDate_guest: '{guest}, save the date for the {event}',
    venueHeading_guest: '{guest}, here is how to find us',
    dressCodeHeading_guest: '{guest}, a little colour inspiration for you',
    galleryHeading_guest: '{guest}, a few of our favourite moments',
    rsvpHeading_guest: 'Welcome aboard, {guest}!',
    rsvpPassengerLabel_guest: 'PASSENGER: {GUEST}',
    rsvpConfirmReady_guest: 'Your ticket is ready, {guest}',
    rsvpToastConfirm_guest: 'Thank you, {guest}! Your ticket is confirmed and opening on WhatsApp.',
    rsvpToastCopy_guest: 'Thank you, {guest}! Your RSVP details have been copied.',
    rsvpToastPass_guest: 'Thank you, {guest}! Your guest pass has been downloaded.',
    rsvpToastCal_guest: 'Thank you, {guest}! Your calendar invite has been downloaded.',
    footerWaitingLine_guest: 'We look forward to celebrating with you, {guest}',
    pageTitle_guest: 'A wedding invitation for {guest}',
    countdownScratchPrompt: 'Scratch to reveal the big day',
    countdownTapToReveal: "Can't scratch? Tap to reveal",
    countdownScratchAgain: 'Scratch again',
    countdownDaysToGo: 'Only {n} days to go!',
    countdownDaysToGo_guest: '{guest}, only {n} days to go!',
  },
  hi: {
    heroInvitationForLabel: 'आपके लिए निमंत्रण',
    heroWelcomeLabel: 'स्वागत है',
    heroTagline: 'सरसों के फूलों की सुनहरी सुबह, दो दिलों का मिलन',
    invitationBlessingLine_guest: '{guest}, आप सपरिवार सादर आमंत्रित हैं',
    countdownHeading_guest: '{guest}, वह शुभ दिन बस आने ही वाला है',
    utsavSubtitle_guest: '{guest}, ये हैं वे उत्सव जिन्हें हम आपके साथ मनाना चाहते हैं',
    eventSaveTheDate_guest: '{guest}, {event} की तारीख़ याद रखिएगा',
    venueHeading_guest: '{guest}, यहाँ हम तक पहुँचने का पता है',
    dressCodeHeading_guest: '{guest}, आपके लिए रंगों की थोड़ी सी झलक',
    galleryHeading_guest: '{guest}, हमारे कुछ पसंदीदा पल',
    rsvpHeading_guest: 'स्वागत है, {guest}!',
    rsvpPassengerLabel_guest: 'यात्री: {GUEST}',
    rsvpConfirmReady_guest: 'आपका टिकट तैयार है, {guest}',
    rsvpToastConfirm_guest: 'धन्यवाद, {guest}! आपका टिकट पक्का हो गया है, व्हाट्सएप खुल रहा है।',
    rsvpToastCopy_guest: 'धन्यवाद, {guest}! आपकी जानकारी कॉपी हो गई है।',
    rsvpToastPass_guest: 'धन्यवाद, {guest}! आपका अतिथि पास डाउनलोड हो गया है।',
    rsvpToastCal_guest: 'धन्यवाद, {guest}! कैलेंडर निमंत्रण डाउनलोड हो गया है।',
    footerWaitingLine_guest: 'आपके साथ जश्न मनाने का इंतज़ार रहेगा, {guest}',
    pageTitle_guest: '{guest} के लिए विवाह निमंत्रण',
    countdownScratchPrompt: 'शुभ दिन जानने के लिए यहाँ स्क्रैच करें',
    countdownTapToReveal: 'स्क्रैच नहीं हो रहा? देखने के लिए टैप करें',
    countdownScratchAgain: 'फिर से स्क्रैच करें',
    countdownDaysToGo: 'बस {n} दिन बाकी हैं!',
    countdownDaysToGo_guest: '{guest}, बस {n} दिन बाकी हैं!',
  },
  pa: {
    heroInvitationForLabel: 'ਤੁਹਾਡੇ ਲਈ ਸੱਦਾ',
    heroWelcomeLabel: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    heroTagline: 'ਸਰ੍ਹੋਂ ਦੇ ਫੁੱਲਾਂ ਦੀ ਸੁਨਹਿਰੀ ਸਵੇਰ, ਦੋ ਦਿਲਾਂ ਦਾ ਮਿਲਾਪ',
    invitationBlessingLine_guest: '{guest}, ਤੁਹਾਨੂੰ ਅਤੇ ਤੁਹਾਡੇ ਪਰਿਵਾਰ ਨੂੰ ਨਿੱਘਾ ਸੱਦਾ ਹੈ',
    countdownHeading_guest: '{guest}, ਉਹ ਸ਼ੁਭ ਦਿਨ ਬੱਸ ਆਉਣ ਹੀ ਵਾਲਾ ਹੈ',
    utsavSubtitle_guest: '{guest}, ਇਹ ਹਨ ਉਹ ਜਸ਼ਨ ਜੋ ਅਸੀਂ ਤੁਹਾਡੇ ਨਾਲ ਸਾਂਝੇ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹਾਂ',
    eventSaveTheDate_guest: '{guest}, {event} ਦੀ ਤਾਰੀਖ਼ ਯਾਦ ਰੱਖਿਓ',
    venueHeading_guest: '{guest}, ਸਾਡੇ ਤੱਕ ਪਹੁੰਚਣ ਦਾ ਪਤਾ ਇੱਥੇ ਹੈ',
    dressCodeHeading_guest: '{guest}, ਤੁਹਾਡੇ ਲਈ ਰੰਗਾਂ ਦੀ ਇੱਕ ਛੋਟੀ ਜਿਹੀ ਝਲਕ',
    galleryHeading_guest: '{guest}, ਸਾਡੇ ਕੁਝ ਪਿਆਰੇ ਪਲ',
    rsvpHeading_guest: 'ਜੀ ਆਇਆਂ ਨੂੰ, {guest}!',
    rsvpPassengerLabel_guest: 'ਯਾਤਰੀ: {GUEST}',
    rsvpConfirmReady_guest: 'ਤੁਹਾਡੀ ਟਿਕਟ ਤਿਆਰ ਹੈ, {guest}',
    rsvpToastConfirm_guest: 'ਧੰਨਵਾਦ, {guest}! ਤੁਹਾਡੀ ਟਿਕਟ ਪੱਕੀ ਹੋ ਗਈ ਹੈ, ਵਟਸਐਪ ਖੁੱਲ੍ਹ ਰਿਹਾ ਹੈ।',
    rsvpToastCopy_guest: 'ਧੰਨਵਾਦ, {guest}! ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਕਾਪੀ ਹੋ ਗਈ ਹੈ।',
    rsvpToastPass_guest: 'ਧੰਨਵਾਦ, {guest}! ਤੁਹਾਡਾ ਮਹਿਮਾਨ ਪਾਸ ਡਾਊਨਲੋਡ ਹੋ ਗਿਆ ਹੈ।',
    rsvpToastCal_guest: 'ਧੰਨਵਾਦ, {guest}! ਕੈਲੰਡਰ ਸੱਦਾ ਡਾਊਨਲੋਡ ਹੋ ਗਿਆ ਹੈ।',
    footerWaitingLine_guest: 'ਤੁਹਾਡੇ ਨਾਲ ਜਸ਼ਨ ਮਨਾਉਣ ਦੀ ਉਡੀਕ ਰਹੇਗੀ, {guest}',
    pageTitle_guest: '{guest} ਲਈ ਵਿਆਹ ਦਾ ਸੱਦਾ',
    countdownScratchPrompt: 'ਸ਼ੁਭ ਦਿਨ ਦੇਖਣ ਲਈ ਇੱਥੇ ਸਕ੍ਰੈਚ ਕਰੋ',
    countdownTapToReveal: 'ਸਕ੍ਰੈਚ ਨਹੀਂ ਹੋ ਰਿਹਾ? ਦੇਖਣ ਲਈ ਟੈਪ ਕਰੋ',
    countdownScratchAgain: 'ਦੁਬਾਰਾ ਸਕ੍ਰੈਚ ਕਰੋ',
    countdownDaysToGo: 'ਬੱਸ {n} ਦਿਨ ਬਾਕੀ ਹਨ!',
    countdownDaysToGo_guest: '{guest}, ਬੱਸ {n} ਦਿਨ ਬਾਕੀ ਹਨ!',
  },
  mr: {
    heroInvitationForLabel: 'आपणास निमंत्रण',
    heroWelcomeLabel: 'सुस्वागतम्',
    heroTagline: 'सोनेरी सकाळ आणि दोन मनांचे पवित्र मिलन',
    invitationBlessingLine_guest: '{guest}, आपण सहकुटुंब सादर आमंत्रित आहात',
    countdownHeading_guest: '{guest}, तो मंगल दिवस आता अगदी जवळ आला आहे',
    utsavSubtitle_guest: '{guest}, हे सोहळे तुमच्यासोबत साजरे करायला आम्हाला खूप आवडेल',
    eventSaveTheDate_guest: '{guest}, {event} साठी ही तारीख नक्की राखून ठेवा',
    venueHeading_guest: '{guest}, आमच्यापर्यंत पोहोचण्याचा पत्ता येथे आहे',
    dressCodeHeading_guest: '{guest}, तुमच्यासाठी रंगांची एक छोटीशी प्रेरणा',
    galleryHeading_guest: '{guest}, आमचे काही आवडते क्षण',
    rsvpHeading_guest: 'आपले स्वागत आहे, {guest}!',
    rsvpPassengerLabel_guest: 'प्रवासी: {GUEST}',
    rsvpConfirmReady_guest: 'तुमचे तिकीट तयार आहे, {guest}',
    rsvpToastConfirm_guest: 'धन्यवाद, {guest}! तुमचे तिकीट निश्चित झाले आहे, व्हॉट्सॲप उघडत आहे.',
    rsvpToastCopy_guest: 'धन्यवाद, {guest}! तुमची माहिती कॉपी झाली आहे.',
    rsvpToastPass_guest: 'धन्यवाद, {guest}! तुमचा अतिथी पास डाउनलोड झाला आहे.',
    rsvpToastCal_guest: 'धन्यवाद, {guest}! कॅलेंडर निमंत्रण डाउनलोड झाले आहे.',
    footerWaitingLine_guest: 'तुमच्यासोबत हा आनंदोत्सव साजरा करण्याची उत्सुकता आहे, {guest}',
    pageTitle_guest: '{guest} यांच्यासाठी विवाह निमंत्रण',
    countdownScratchPrompt: 'मंगल दिवस पाहण्यासाठी येथे स्क्रॅच करा',
    countdownTapToReveal: 'स्क्रॅच होत नाहीये? पाहण्यासाठी टॅप करा',
    countdownScratchAgain: 'पुन्हा स्क्रॅच करा',
    countdownDaysToGo: 'फक्त {n} दिवस उरले आहेत!',
    countdownDaysToGo_guest: '{guest}, फक्त {n} दिवस उरले आहेत!',
  },
  gu: {
    heroInvitationForLabel: 'આપના માટે નિમંત્રણ',
    heroWelcomeLabel: 'સ્વાગત છે',
    heroTagline: 'સોનેરી સવાર અને બે હૃદયોનું પવિત્ર મિલન',
    invitationBlessingLine_guest: '{guest}, આપ સહપરિવાર સાદર આમંત્રિત છો',
    countdownHeading_guest: '{guest}, એ શુભ દિવસ હવે બસ નજીક જ છે',
    utsavSubtitle_guest: '{guest}, આ છે એ ઉત્સવો જે અમે આપની સાથે ઉજવવા માંગીએ છીએ',
    eventSaveTheDate_guest: '{guest}, {event} માટે આ તારીખ યાદ રાખજો',
    venueHeading_guest: '{guest}, અમારા સુધી પહોંચવાનું સરનામું અહીં છે',
    dressCodeHeading_guest: '{guest}, આપના માટે રંગોની થોડી પ્રેરણા',
    galleryHeading_guest: '{guest}, અમારી કેટલીક મનપસંદ ક્ષણો',
    rsvpHeading_guest: 'સ્વાગત છે, {guest}!',
    rsvpPassengerLabel_guest: 'મુસાફર: {GUEST}',
    rsvpConfirmReady_guest: 'આપની ટિકિટ તૈયાર છે, {guest}',
    rsvpToastConfirm_guest: 'આભાર, {guest}! આપની ટિકિટ કન્ફર્મ થઈ ગઈ છે, વોટ્સએપ ખૂલી રહ્યું છે.',
    rsvpToastCopy_guest: 'આભાર, {guest}! આપની વિગતો કોપી થઈ ગઈ છે.',
    rsvpToastPass_guest: 'આભાર, {guest}! આપનો ગેસ્ટ પાસ ડાઉનલોડ થઈ ગયો છે.',
    rsvpToastCal_guest: 'આભાર, {guest}! કેલેન્ડર આમંત્રણ ડાઉનલોડ થઈ ગયું છે.',
    footerWaitingLine_guest: 'આપની સાથે ઉજવણી કરવાની આતુરતાથી રાહ જોઈશું, {guest}',
    pageTitle_guest: '{guest} માટે લગ્નનું આમંત્રણ',
    countdownScratchPrompt: 'શુભ દિવસ જોવા માટે અહીં સ્ક્રેચ કરો',
    countdownTapToReveal: 'સ્ક્રેચ નથી થતું? જોવા માટે ટેપ કરો',
    countdownScratchAgain: 'ફરીથી સ્ક્રેચ કરો',
    countdownDaysToGo: 'ફક્ત {n} દિવસ બાકી છે!',
    countdownDaysToGo_guest: '{guest}, ફક્ત {n} દિવસ બાકી છે!',
  },
  bn: {
    heroInvitationForLabel: 'আপনার জন্য আমন্ত্রণ',
    heroWelcomeLabel: 'স্বাগতম',
    heroTagline: 'সোনালি সকাল ও দুটি হৃদয়ের শুভ মিলন',
    invitationBlessingLine_guest: '{guest}, আপনাকে ও আপনার পরিবারকে সাদর আমন্ত্রণ',
    countdownHeading_guest: '{guest}, সেই শুভ দিনটি প্রায় এসেই গেছে',
    utsavSubtitle_guest: '{guest}, এই উৎসবগুলো আমরা আপনার সাথে ভাগ করে নিতে চাই',
    eventSaveTheDate_guest: '{guest}, {event}-এর তারিখটি মনে রাখবেন',
    venueHeading_guest: '{guest}, আমাদের কাছে পৌঁছানোর ঠিকানা এখানে',
    dressCodeHeading_guest: '{guest}, আপনার জন্য রঙের একটু অনুপ্রেরণা',
    galleryHeading_guest: '{guest}, আমাদের কিছু প্রিয় মুহূর্ত',
    rsvpHeading_guest: 'স্বাগতম, {guest}!',
    rsvpPassengerLabel_guest: 'যাত্রী: {GUEST}',
    rsvpConfirmReady_guest: 'আপনার টিকিট তৈরি, {guest}',
    rsvpToastConfirm_guest: 'ধন্যবাদ, {guest}! আপনার টিকিট নিশ্চিত হয়েছে, হোয়াটসঅ্যাপ খুলছে।',
    rsvpToastCopy_guest: 'ধন্যবাদ, {guest}! আপনার তথ্য কপি হয়েছে।',
    rsvpToastPass_guest: 'ধন্যবাদ, {guest}! আপনার গেস্ট পাস ডাউনলোড হয়েছে।',
    rsvpToastCal_guest: 'ধন্যবাদ, {guest}! ক্যালেন্ডার আমন্ত্রণ ডাউনলোড হয়েছে।',
    footerWaitingLine_guest: 'আপনার সাথে আনন্দ ভাগ করে নেওয়ার অপেক্ষায় রইলাম, {guest}',
    pageTitle_guest: '{guest}-এর জন্য বিয়ের আমন্ত্রণ',
    countdownScratchPrompt: 'শুভ দিনটি জানতে এখানে স্ক্র্যাচ করুন',
    countdownTapToReveal: 'স্ক্র্যাচ করতে পারছেন না? দেখতে ট্যাপ করুন',
    countdownScratchAgain: 'আবার স্ক্র্যাচ করুন',
    countdownDaysToGo: 'আর মাত্র {n} দিন বাকি!',
    countdownDaysToGo_guest: '{guest}, আর মাত্র {n} দিন বাকি!',
  },
  bho: {
    heroInvitationForLabel: 'रउआ खातिर नेवता',
    heroWelcomeLabel: 'स्वागत बा',
    heroTagline: 'सरसों के फूलन के सुनहरा भोर, दू दिलन के मिलन',
    invitationBlessingLine_guest: '{guest}, रउआ सपरिवार सादर नेवता बा',
    countdownHeading_guest: '{guest}, ऊ शुभ दिन अब बस आवे वाला बा',
    utsavSubtitle_guest: '{guest}, ईहे ऊ उत्सव बा जवन हमनी रउआ संगे मनावल चाहत बानी',
    eventSaveTheDate_guest: '{guest}, {event} खातिर ई तारीख याद रखब',
    venueHeading_guest: '{guest}, हमनी लगे पहुँचे के पता इहाँ बा',
    dressCodeHeading_guest: '{guest}, रउआ खातिर रंगन के तनी प्रेरणा',
    galleryHeading_guest: '{guest}, हमनी के कुछ सबसे प्यारा पल',
    rsvpHeading_guest: 'स्वागत बा, {guest}!',
    rsvpPassengerLabel_guest: 'यात्री: {GUEST}',
    rsvpConfirmReady_guest: 'रउआ के टिकट तैयार बा, {guest}',
    rsvpToastConfirm_guest: 'धन्यवाद, {guest}! रउआ के टिकट पक्का हो गइल, व्हाट्सएप खुलत बा।',
    rsvpToastCopy_guest: 'धन्यवाद, {guest}! रउआ के जानकारी कॉपी हो गइल बा।',
    rsvpToastPass_guest: 'धन्यवाद, {guest}! रउआ के पास डाउनलोड हो गइल बा।',
    rsvpToastCal_guest: 'धन्यवाद, {guest}! कैलेंडर नेवता डाउनलोड हो गइल बा।',
    footerWaitingLine_guest: 'रउआ संगे ई जश्न मनावे के इंतजार रही, {guest}',
    pageTitle_guest: '{guest} खातिर बियाह के नेवता',
    countdownScratchPrompt: 'शुभ दिन जाने खातिर इहाँ स्क्रैच करीं',
    countdownTapToReveal: 'स्क्रैच नइखे होखत? देखे खातिर टैप करीं',
    countdownScratchAgain: 'फेर से स्क्रैच करीं',
    countdownDaysToGo: 'बस {n} दिन बाचल बा!',
    countdownDaysToGo_guest: '{guest}, बस {n} दिन बाचल बा!',
  },
  ta: {
    heroInvitationForLabel: 'உங்களுக்கான அழைப்பிதழ்',
    heroWelcomeLabel: 'வரவேற்கிறோம்',
    heroTagline: 'பொன்னிறக் காலைப் பொழுதில் இரு உள்ளங்களின் சங்கமம்',
    invitationBlessingLine_guest: '{guest}, நீங்களும் உங்கள் குடும்பத்தினரும் அன்புடன் அழைக்கப்படுகிறீர்கள்',
    countdownHeading_guest: '{guest}, அந்தத் திருநாள் நெருங்கிவிட்டது',
    utsavSubtitle_guest: '{guest}, உங்களுடன் பகிர்ந்து கொள்ள விரும்பும் கொண்டாட்டங்கள் இவை',
    eventSaveTheDate_guest: '{guest}, {event} நிகழ்விற்கு இந்த நாளை குறித்து வைத்துக்கொள்ளுங்கள்',
    venueHeading_guest: '{guest}, எங்களை வந்தடையும் வழி இதோ',
    dressCodeHeading_guest: '{guest}, உங்களுக்கான வண்ணத் தேர்வுகள் இதோ',
    galleryHeading_guest: '{guest}, எங்களின் சில இனிய தருணங்கள்',
    rsvpHeading_guest: 'வரவேற்கிறோம், {guest}!',
    rsvpPassengerLabel_guest: 'பயணி: {GUEST}',
    rsvpConfirmReady_guest: 'உங்கள் பயணச்சீட்டு தயார், {guest}',
    rsvpToastConfirm_guest: 'நன்றி, {guest}! உங்கள் பயணச்சீட்டு உறுதி செய்யப்பட்டது.',
    rsvpToastCopy_guest: 'நன்றி, {guest}! உங்கள் விவரங்கள் நகலெடுக்கப்பட்டன.',
    rsvpToastPass_guest: 'நன்றி, {guest}! உங்கள் விருந்தினர் அனுமதிச்சீட்டு பதிவிறக்கப்பட்டது.',
    rsvpToastCal_guest: 'நன்றி, {guest}! நாட்காட்டி நிகழ்வு பதிவிறக்கப்பட்டது.',
    footerWaitingLine_guest: 'உங்களுடன் இணைந்து கொண்டாட ஆவலுடன் காத்திருக்கிறோம், {guest}',
    pageTitle_guest: '{guest} அவர்களுக்கான திருமண அழைப்பிதழ்',
    countdownScratchPrompt: 'திருநாளைக் காண இங்கே தேய்க்கவும்',
    countdownTapToReveal: 'தேய்க்க முடியவில்லையா? காண தட்டவும்',
    countdownScratchAgain: 'மீண்டும் தேய்க்கவும்',
    countdownDaysToGo: 'இன்னும் {n} நாட்களே உள்ளன!',
    countdownDaysToGo_guest: '{guest}, இன்னும் {n} நாட்களே உள்ளன!',
  },
  te: {
    heroInvitationForLabel: 'మీ కోసం ఆహ్వానం',
    heroWelcomeLabel: 'స్వాగతం',
    heroTagline: 'బంగారు ఉదయాన రెండు హృదయాల పవిత్ర కలయిక',
    invitationBlessingLine_guest: '{guest}, మిమ్మల్ని మరియు మీ కుటుంబాన్ని సాదరంగా ఆహ్వానిస్తున్నాము',
    countdownHeading_guest: '{guest}, ఆ శుభ దినం దగ్గరలోనే ఉంది',
    utsavSubtitle_guest: '{guest}, మీతో పంచుకోవాలనుకుంటున్న వేడుకలు ఇవే',
    eventSaveTheDate_guest: '{guest}, {event} కోసం ఈ తేదీని గుర్తుంచుకోండి',
    venueHeading_guest: '{guest}, మమ్మల్ని చేరుకునే మార్గం ఇదే',
    dressCodeHeading_guest: '{guest}, మీ కోసం దుస్తుల రంగుల సూచన',
    galleryHeading_guest: '{guest}, మాకు ఇష్టమైన కొన్ని మధుర క్షణాలు',
    rsvpHeading_guest: 'స్వాగతం, {guest}!',
    rsvpPassengerLabel_guest: 'ప్రయాణికులు: {GUEST}',
    rsvpConfirmReady_guest: 'మీ టికెట్ సిద్ధంగా ఉంది, {guest}',
    rsvpToastConfirm_guest: 'ధన్యవాదాలు, {guest}! మీ టికెట్ నిర్ధారించబడింది.',
    rsvpToastCopy_guest: 'ధన్యవాదాలు, {guest}! మీ వివరాలు కాపీ చేయబడ్డాయి.',
    rsvpToastPass_guest: 'ధన్యవాదాలు, {guest}! మీ అతిథి పాస్ డౌన్‌లోడ్ చేయబడింది.',
    rsvpToastCal_guest: 'ధన్యవాదాలు, {guest}! క్యాలెండర్ ఆహ్వానం డౌన్‌లోడ్ చేయబడింది.',
    footerWaitingLine_guest: 'మీతో కలిసి వేడుక జరుపుకోవడానికి ఎదురుచూస్తున్నాము, {guest}',
    pageTitle_guest: '{guest} కోసం వివాహ ఆహ్వానం',
    countdownScratchPrompt: 'శుభ దినాన్ని చూడటానికి ఇక్కడ స్క్రాచ్ చేయండి',
    countdownTapToReveal: 'స్క్రాచ్ చేయలేకపోతున్నారా? చూడటానికి టాప్ చేయండి',
    countdownScratchAgain: 'మళ్ళీ స్క్రాచ్ చేయండి',
    countdownDaysToGo: 'ఇంకా {n} రోజులు మాత్రమే ఉన్నాయి!',
    countdownDaysToGo_guest: '{guest}, ఇంకా {n} రోజులు మాత్రమే ఉన్నాయి!',
  },
  kn: {
    heroInvitationForLabel: 'ನಿಮಗಾಗಿ ಆಮಂತ್ರಣ',
    heroWelcomeLabel: 'ಸುಸ್ವಾಗತ',
    heroTagline: 'ಹೊನ್ನಿನ ಮುಂಜಾನೆಯಲ್ಲಿ ಎರಡು ಹೃದಯಗಳ ಶುಭ ಮಿಲನ',
    invitationBlessingLine_guest: '{guest}, ನಿಮಗೂ ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೂ ಆತ್ಮೀಯ ಸ್ವಾಗತ',
    countdownHeading_guest: '{guest}, ಆ ಶುಭ ದಿನ ಹತ್ತಿರವಾಗುತ್ತಿದೆ',
    utsavSubtitle_guest: '{guest}, ನಿಮ್ಮೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲು ಬಯಸುವ ಸಂಭ್ರಮಗಳಿವು',
    eventSaveTheDate_guest: '{guest}, {event} ಶುಭಕಾರ್ಯಕ್ಕಾಗಿ ಈ ದಿನಾಂಕವನ್ನು ನೆನಪಿಡಿ',
    venueHeading_guest: '{guest}, ನಮ್ಮನ್ನು ತಲುಪುವ ವಿಳಾಸ ಇಲ್ಲಿದೆ',
    dressCodeHeading_guest: '{guest}, ನಿಮಗಾಗಿ ಬಣ್ಣಗಳ ಪುಟ್ಟ ಸ್ಫೂರ್ತಿ',
    galleryHeading_guest: '{guest}, ನಮ್ಮ ನೆಚ್ಚಿನ ಕೆಲವು ಸುಂದರ ಕ್ಷಣಗಳು',
    rsvpHeading_guest: 'ಸುಸ್ವಾಗತ, {guest}!',
    rsvpPassengerLabel_guest: 'ಪ್ರಯಾಣಿಕರು: {GUEST}',
    rsvpConfirmReady_guest: 'ನಿಮ್ಮ ಟಿಕೆಟ್ ಸಿದ್ಧವಾಗಿದೆ, {guest}',
    rsvpToastConfirm_guest: 'ಧನ್ಯವಾದಗಳು, {guest}! ನಿಮ್ಮ ಟಿಕೆಟ್ ದೃಢೀಕರಿಸಲಾಗಿದೆ.',
    rsvpToastCopy_guest: 'ಧನ್ಯವಾದಗಳು, {guest}! ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಕಾಪಿ ಮಾಡಲಾಗಿದೆ.',
    rsvpToastPass_guest: 'ಧನ್ಯವಾದಗಳು, {guest}! ನಿಮ್ಮ ಅತಿಥಿ ಪಾಸ್ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ.',
    rsvpToastCal_guest: 'ಧನ್ಯವಾದಗಳು, {guest}! ಕ್ಯಾಲೆಂಡರ್ ಆಹ್ವಾನ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ.',
    footerWaitingLine_guest: 'ನಿಮ್ಮೊಂದಿಗೆ ಸಂಭ್ರಮಿಸಲು ನಾವು ಕಾತರದಿಂದ ಕಾಯುತ್ತಿದ್ದೇವೆ, {guest}',
    pageTitle_guest: '{guest} ಅವರಿಗಾಗಿ ವಿವಾಹ ಆಮಂತ್ರಣ',
    countdownScratchPrompt: 'ಶುಭ ದಿನವನ್ನು ನೋಡಲು ಇಲ್ಲಿ ಸ್ಕ್ರ್ಯಾಚ್ ಮಾಡಿ',
    countdownTapToReveal: 'ಸ್ಕ್ರ್ಯಾಚ್ ಮಾಡಲು ಆಗುತ್ತಿಲ್ಲವೇ? ನೋಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
    countdownScratchAgain: 'ಮತ್ತೆ ಸ್ಕ್ರ್ಯಾಚ್ ಮಾಡಿ',
    countdownDaysToGo: 'ಇನ್ನು ಕೇವಲ {n} ದಿನಗಳು ಬಾಕಿ ಇವೆ!',
    countdownDaysToGo_guest: '{guest}, ಇನ್ನು ಕೇವಲ {n} ದಿನಗಳು ಬಾಕಿ ಇವೆ!',
  },
  ml: {
    heroInvitationForLabel: 'നിങ്ങൾക്കായുള്ള ക്ഷണം',
    heroWelcomeLabel: 'സ്വാഗതം',
    heroTagline: 'സുവർണ്ണ പ്രഭാതത്തിൽ രണ്ട് ഹൃദയങ്ങളുടെ സംഗമം',
    invitationBlessingLine_guest: '{guest}, നിങ്ങളെയും കുടുംബത്തെയും സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു',
    countdownHeading_guest: '{guest}, ആ സുദിനം ഇതാ അടുത്തെത്തി',
    utsavSubtitle_guest: '{guest}, നിങ്ങളോടൊപ്പം പങ്കിടാൻ ഞങ്ങൾ ആഗ്രഹിക്കുന്ന ആഘോഷങ്ങളാണിവ',
    eventSaveTheDate_guest: '{guest}, {event} ചടങ്ങിനായി ഈ തീയതി മാറ്റിവെക്കുക',
    venueHeading_guest: '{guest}, ഞങ്ങളുടെ വേദിയിലേക്കുള്ള വഴി ഇതാ',
    dressCodeHeading_guest: '{guest}, നിങ്ങൾക്കായി നിറങ്ങളുടെ ഒരു ചെറിയ പ്രചോദനം',
    galleryHeading_guest: '{guest}, ഞങ്ങളുടെ പ്രിയപ്പെട്ട ചില നിമിഷങ്ങൾ',
    rsvpHeading_guest: 'സ്വാഗതം, {guest}!',
    rsvpPassengerLabel_guest: 'യാത്രക്കാരൻ: {GUEST}',
    rsvpConfirmReady_guest: 'നിങ്ങളുടെ ടിക്കറ്റ് തയ്യാറാണ്, {guest}',
    rsvpToastConfirm_guest: 'നന്ദി, {guest}! നിങ്ങളുടെ ടിക്കറ്റ് സ്ഥിരീകരിച്ചു.',
    rsvpToastCopy_guest: 'നന്ദി, {guest}! നിങ്ങളുടെ വിവരങ്ങൾ പകർത്തി.',
    rsvpToastPass_guest: 'നന്ദി, {guest}! നിങ്ങളുടെ ഗസ്റ്റ് പാസ് ഡൗൺലോഡ് ചെയ്തു.',
    rsvpToastCal_guest: 'നന്ദി, {guest}! കലണ്ടർ ക്ഷണം ഡൗൺലോഡ് ചെയ്തു.',
    footerWaitingLine_guest: 'നിങ്ങളോടൊപ്പം ആഘോഷിക്കാൻ ഞങ്ങൾ കാത്തിരിക്കുന്നു, {guest}',
    pageTitle_guest: '{guest} എന്നവർക്കുള്ള വിവാഹ ക്ഷണക്കത്ത്',
    countdownScratchPrompt: 'സുദിനം കാണാൻ ഇവിടെ സ്ക്രാച്ച് ചെയ്യുക',
    countdownTapToReveal: 'സ്ക്രാച്ച് ചെയ്യാൻ കഴിയുന്നില്ലേ? കാണാൻ ടാപ്പ് ചെയ്യുക',
    countdownScratchAgain: 'വീണ്ടും സ്ക്രാച്ച് ചെയ്യുക',
    countdownDaysToGo: 'ഇനി {n} ദിവസങ്ങൾ മാത്രം!',
    countdownDaysToGo_guest: '{guest}, ഇനി {n} ദിവസങ്ങൾ മാത്രം!',
  },
  ur: {
    heroInvitationForLabel: 'آپ کے لیے دعوت نامہ',
    heroWelcomeLabel: 'خوش آمدید',
    heroTagline: 'سنہری صبح اور دو دلوں کا مقدس ملاپ',
    invitationBlessingLine_guest: '{guest}، آپ کو بمعہ اہلِ خانہ پرخلوص دعوت دی جاتی ہے',
    countdownHeading_guest: '{guest}، وہ سعید دن بس آنے ہی والا ہے',
    utsavSubtitle_guest: '{guest}، یہ ہیں وہ تقریبات جن میں ہم آپ کا ساتھ چاہتے ہیں',
    eventSaveTheDate_guest: '{guest}، {event} کی تاریخ یاد رکھیے گا',
    venueHeading_guest: '{guest}، ہم تک پہنچنے کا پتہ یہاں ہے',
    dressCodeHeading_guest: '{guest}، آپ کے لیے رنگوں کی ایک خوبصورت جھلک',
    galleryHeading_guest: '{guest}، ہمارے کچھ پسندیدہ یادگار لمحات',
    rsvpHeading_guest: 'خوش آمدید، {guest}!',
    rsvpPassengerLabel_guest: 'مسافر: {GUEST}',
    rsvpConfirmReady_guest: 'آپ کا ٹکٹ تیار ہے، {guest}',
    rsvpToastConfirm_guest: 'شکریہ، {guest}! آپ کا ٹکٹ کنفرم ہو گیا ہے، واٹس ایپ کھل رہا ہے۔',
    rsvpToastCopy_guest: 'شکریہ، {guest}! آپ کی تفصیلات کاپی ہو گئی ہیں۔',
    rsvpToastPass_guest: 'شکریہ، {guest}! آپ کا مہمان پاس ڈاؤن لوڈ ہو گیا ہے۔',
    rsvpToastCal_guest: 'شکریہ، {guest}! کیلنڈر دعوت نامہ ڈاؤن لوڈ ہو گیا ہے۔',
    footerWaitingLine_guest: 'آپ کے ساتھ خوشیاں منانے کے منتظر رہیں گے، {guest}',
    pageTitle_guest: '{guest} کے لیے شادی کا دعوت نامہ',
    countdownScratchPrompt: 'سعید دن دیکھنے کے لیے یہاں اسکریچ کریں',
    countdownTapToReveal: 'اسکریچ نہیں ہو رہا؟ دیکھنے کے لیے ٹیپ کریں',
    countdownScratchAgain: 'دوبارہ اسکریچ کریں',
    countdownDaysToGo: 'بس {n} دن باقی ہیں!',
    countdownDaysToGo_guest: '{guest}، بس {n} دن باقی ہیں!',
  },
};

export const BUILTIN_TRANSLATIONS: Record<BuiltInLanguageCode, TranslationDictionary> = {
  en: { ...EN_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.en },
  hi: { ...HI_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.hi },
  pa: { ...PA_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.pa },
  mr: { ...MR_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.mr },
  gu: { ...GU_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.gu },
  bn: { ...BN_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.bn },
  bho: { ...BHO_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.bho },
  ta: { ...TA_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.ta },
  te: { ...TE_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.te },
  kn: { ...KN_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.kn },
  ml: { ...ML_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.ml },
  ur: { ...UR_TRANSLATIONS, ...PERSONALISED_GUEST_TRANSLATIONS.ur },
};

const STORAGE_LANG_KEY = 'sarson_subah_lang';
const STORAGE_CUSTOM_TRANSLATIONS_KEY = 'sarson_subah_custom_translations_v1';

export interface CustomLanguageRecord {
  code: string;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
  dictionary: Partial<TranslationDictionary>;
}

export function getStoredCustomLanguages(): Record<string, CustomLanguageRecord> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_CUSTOM_TRANSLATIONS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveCustomLanguage(record: CustomLanguageRecord): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCustomLanguages();
    existing[record.code] = record;
    window.localStorage.setItem(STORAGE_CUSTOM_TRANSLATIONS_KEY, JSON.stringify(existing));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Resolves a translation dictionary for any built-in or cached custom language,
 * falling back to English (`en`) for any missing key.
 */
export function getTranslationDictionary(
  langCode: string,
  customMap?: Record<string, CustomLanguageRecord>
): TranslationDictionary {
  const normalized = (langCode || 'en').toLowerCase().trim() as BuiltInLanguageCode;
  if (normalized in BUILTIN_TRANSLATIONS) {
    return {
      ...EN_TRANSLATIONS,
      ...BUILTIN_TRANSLATIONS[normalized],
    };
  }
  const map = customMap || getStoredCustomLanguages();
  const custom = map[normalized] || map[langCode];
  if (custom && custom.dictionary) {
    return {
      ...EN_TRANSLATIONS,
      ...custom.dictionary,
    };
  }
  return EN_TRANSLATIONS;
}

/**
 * Looks up a single translation key with automatic fallback to English.
 */
export function translateKey(
  langCode: string,
  key: keyof TranslationDictionary,
  customMap?: Record<string, CustomLanguageRecord>
): string {
  const dict = getTranslationDictionary(langCode, customMap);
  return dict[key] || EN_TRANSLATIONS[key] || '';
}

export function getLanguageMeta(
  langCode: string,
  customMap?: Record<string, CustomLanguageRecord>
): {
  code: string;
  nativeName: string;
  englishName: string;
  locale: string;
  dir: 'ltr' | 'rtl';
  googleFontFamily: string | null;
  googleFontParam: string | null;
  themeId: ThemeId;
  usesLatinDisplayScript: boolean;
} {
  const normalized = (langCode || 'en').toLowerCase().trim();
  const builtIn = LANGUAGES.find((l) => l.code === normalized);
  if (builtIn) return builtIn;

  const map = customMap || getStoredCustomLanguages();
  const custom = map[normalized] || map[langCode];
  if (custom) {
    return {
      code: custom.code,
      nativeName: custom.nativeName,
      englishName: custom.englishName,
      locale: 'en-IN',
      dir: custom.dir || 'ltr',
      googleFontFamily: null,
      googleFontParam: null,
      themeId: 'blush_modern',
      usesLatinDisplayScript: false,
    };
  }

  return LANGUAGES[0];
}

/**
 * Detects initial language from:
 * 1. URL hash deep-link (`/#pa`, `/#hi`, `/#ur`, etc.)
 * 2. `localStorage` (`sarson_subah_lang`)
 * 3. `navigator.language`
 * 4. Default `'pa'` (Punjabi / Sarson Subah) or `'en'`
 */
export function detectInitialLanguage(): string {
  if (typeof window === 'undefined') return 'en';

  // 1. Check URL hash deep-link like /#pa or /#ur
  const rawHash = (window.location.hash || '').replace(/^#\/?/, '').trim().toLowerCase();
  if (rawHash) {
    if (LANGUAGES.some((l) => l.code === rawHash)) {
      return rawHash;
    }
    const custom = getStoredCustomLanguages();
    if (custom[rawHash]) {
      return rawHash;
    }
  }

  // 2. Check localStorage
  try {
    const saved = window.localStorage.getItem(STORAGE_LANG_KEY);
    if (saved) {
      const clean = saved.trim().toLowerCase();
      if (LANGUAGES.some((l) => l.code === clean) || getStoredCustomLanguages()[clean]) {
        return clean;
      }
    }
  } catch {
    // Ignore storage read error
  }

  // 3. Check navigator.language
  if (typeof navigator !== 'undefined' && navigator.language) {
    const baseLang = navigator.language.split('-')[0].toLowerCase();
    const matched = LANGUAGES.find((l) => l.code === baseLang);
    if (matched) {
      return matched.code;
    }
  }

  return 'en';
}

export function persistLanguageChoice(langCode: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_LANG_KEY, langCode);
  } catch {
    // Ignore storage error
  }
}

/**
 * Loads tiny character-subsetted Google Fonts (via `&text=...`, ~1KB each) for the
 * 11 non-Latin native language chip labels and the 16 theme card titles so the
 * selector bottom sheets render native scripts and each theme's own font cleanly,
 * while only the active language's full font is loaded for the page.
 */
export function ensureLanguageChipLabelsFont(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById('lang-chip-labels-subset-fonts')) return;

  const container = document.createElement('div');
  container.id = 'lang-chip-labels-subset-fonts';

  const subsets: Array<{ family: string; sampleText: string }> = [
    {
      family: 'Tiro+Devanagari+Hindi',
      sampleText: 'हिन्दीभोजपुरीकेसरियागुलाबमधुबनीआँगनकमलशुद्धिपधारोजीजयजिनेन्द्रप्रणाम',
    },
    {
      family: 'Noto+Serif+Gurmukhi',
      sampleText: 'ਪੰਜਾਬੀਸਰ੍ਹੋਂਸਵੇਰਆਨੰਦਕਾਰਜਜੀਆਇਆਂਨੂੰਸਤਸ੍ਰੀਅਕਾਲ',
    },
    { family: 'Tiro+Devanagari+Marathi', sampleText: 'मराठीपैठणीसोहळासुस्वागतम्' },
    { family: 'Noto+Serif+Gujarati', sampleText: 'ગુજરાતીબાંધણીગરબાપધારોજી' },
    { family: 'Noto+Serif+Bengali', sampleText: 'বাংলাআলপনাশুভদৃষ্টিস্বাগতম' },
    { family: 'Noto+Serif+Tamil', sampleText: 'தமிழ்காஞ்சிபுரம்கோலம்நல்வரவு' },
    { family: 'Noto+Serif+Telugu', sampleText: 'తెలుగుపోచంపల్లిఇక్కత్సుస్వాగతం' },
    { family: 'Noto+Serif+Kannada', sampleText: 'ಕನ್ನಡಮೈಸೂರುಸಿಲ್ಕ್ಸುಸ್ವಾಗತ' },
    { family: 'Noto+Serif+Malayalam', sampleText: 'മലയാളംകസവ്നിലവിളക്ക്സ്വാഗതം' },
    { family: 'Noto+Nastaliq+Urdu', sampleText: 'اردونکاحِتہذیبمحفلِگلابالسلامعلیکمآداب' },
    // Subsetted Latin display fonts for the 16 theme cards
    { family: 'Rozha+One', sampleText: 'Kesariya Gulab' },
    { family: 'Yeseva+One', sampleText: 'Paithani Sohala' },
    { family: 'Forum', sampleText: 'Bandhani Rang' },
    { family: 'Prata', sampleText: 'Lal Paar' },
    { family: 'Fraunces', sampleText: 'Madhubani Aangan' },
    { family: 'Cinzel+Decorative', sampleText: 'KanjeevaramSarson Subah' },
    { family: 'Bodoni+Moda', sampleText: 'Pochampally Ikat' },
    { family: 'Libre+Baskerville', sampleText: 'Mysore Silk' },
    { family: 'Instrument+Serif', sampleText: 'Kasavu' },
    { family: 'Cardo', sampleText: 'Sunehri DhoopMoti Gulabi' },
    { family: 'Playfair+Display', sampleText: 'ZamurradGulabi Jaali' },
    { family: 'EB+Garamond', sampleText: 'Ivory Grove' },
    { family: 'DM+Serif+Display', sampleText: 'Blush Modern' },
  ];

  for (const item of subsets) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${item.family}&text=${encodeURIComponent(
      item.sampleText
    )}&display=swap`;
    document.head.appendChild(link);
  }
  document.head.appendChild(container);
}

/**
 * Dynamically loads ONLY the active language's full Google Font (`display=swap`)
 * and removes any previous dynamic language font link so unused scripts are never downloaded.
 * Also sets `--font-active-script` and `dir="rtl" | "ltr"` on `document.documentElement`.
 */
export function syncActiveLanguageDomAndFont(
  langCode: string,
  customMap?: Record<string, CustomLanguageRecord>
): void {
  if (typeof document === 'undefined') return;
  ensureLanguageChipLabelsFont();
  const meta = getLanguageMeta(langCode, customMap);
  const root = document.documentElement;

  root.lang = meta.code;
  root.dir = meta.dir;

  const existingLink = document.getElementById('active-lang-google-font') as HTMLLinkElement | null;

  if (meta.googleFontParam && meta.googleFontFamily) {
    const href = `https://fonts.googleapis.com/css2?family=${meta.googleFontParam}&display=swap`;
    if (existingLink) {
      if (existingLink.href !== href) {
        existingLink.href = href;
      }
    } else {
      const link = document.createElement('link');
      link.id = 'active-lang-google-font';
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
    root.style.setProperty(
      '--font-active-script',
      `'${meta.googleFontFamily}', 'Cormorant Garamond', serif`
    );
  } else {
    if (existingLink) {
      existingLink.remove();
    }
    root.style.setProperty('--font-active-script', `'Cormorant Garamond', Georgia, serif`);
  }
}

/**
 * Formats an ISO date using `Intl.DateTimeFormat` with the active language's locale.
 */
export function formatLocalizedEventDateParts(
  isoDateStr: string,
  locale: string
): {
  weekday: string;
  dayNumber: string;
  monthYear: string;
  fullDate: string;
} {
  const date = new Date(isoDateStr);
  if (Number.isNaN(date.getTime())) {
    return {
      weekday: 'Saturday',
      dayNumber: '12',
      monthYear: 'December 2026',
      fullDate: 'Saturday, 12 December 2026',
    };
  }

  try {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      timeZone: 'Asia/Kolkata',
    }).format(date);

    const dayNumber = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      timeZone: 'Asia/Kolkata',
    }).format(date);

    const monthYear = new Intl.DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    }).format(date);

    const fullDate = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Kolkata',
    }).format(date);

    return { weekday, dayNumber, monthYear, fullDate };
  } catch {
    return {
      weekday: 'Saturday',
      dayNumber: '12',
      monthYear: 'December 2026',
      fullDate: 'Saturday, 12 December 2026',
    };
  }
}

/**
 * Formats an ISO timestamp's time using `Intl.DateTimeFormat` with the active language's locale.
 */
export function formatLocalizedEventTime(isoDateStr: string, locale: string): string {
  const date = new Date(isoDateStr);
  if (Number.isNaN(date.getTime())) {
    return '10:30 AM';
  }
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    }).format(date);
  } catch {
    return '10:30 AM';
  }
}

export const NEUTRAL_GREETINGS: Record<string, string> = {
  en: 'Welcome',
  hi: 'स्वागत है',
  pa: 'ਜੀ ਆਇਆਂ ਨੂੰ',
  mr: 'स्वागत',
  gu: 'સ્વાગત છે',
  bn: 'স্বাগতম',
  ta: 'வரவேற்கிறோம்',
  te: 'స్వాగతం',
  kn: 'ಸ್ವಾಗತ',
  ml: 'സ്വാਗതം',
  ur: 'خوش آمدید',
  bho: 'स्वागत बा',
};

/**
 * Returns the neutral "Welcome" greeting in the active language for the Opening & Invitation header.
 */
export function getLocalizedGreeting(theme?: WeddingTheme, langCode?: string): string {
  if (langCode && NEUTRAL_GREETINGS[langCode]) {
    return NEUTRAL_GREETINGS[langCode];
  }
  if (theme?.langCode && NEUTRAL_GREETINGS[theme.langCode]) {
    return NEUTRAL_GREETINGS[theme.langCode];
  }
  return NEUTRAL_GREETINGS.en;
}

