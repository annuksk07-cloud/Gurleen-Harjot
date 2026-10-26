import test from 'node:test';
import assert from 'node:assert/strict';
import { WEDDING_CONFIG } from '../config';
import {
  calculateCountdown,
  generateIcsContent,
  validateRsvpPayload,
  buildWhatsAppRsvp,
  computeKahaniMetrics,
  computeStopCardStyle,
  resolveStoryTapDirection,
  computeStorySegmentFill,
  formatEventEyebrow,
  splitEventDateParts,
  splitEventTimeParts,
  buildEventBlockGradient,
} from './weddingUtils';
import {
  LANGUAGES,
  getTranslationDictionary,
  translateKey,
  formatLocalizedEventDateParts,
  formatLocalizedEventTime,
} from '../i18n/translations';
import {
  THEMES,
  THEME_ORDER,
  getRandomDifferentThemeId,
  getThemeEntranceMotion,
  getThemeEventPalette,
  getThemeForLanguage,
  getThemePatternDataUri,
} from '../themes/themes';

test('calculateCountdown computes days, hours, minutes, seconds accurately', () => {
  const target = '2026-12-12T10:30:00Z';
  const now = new Date('2026-12-10T08:15:30Z').getTime();
  const res = calculateCountdown(target, now);

  assert.equal(res.isPast, false);
  assert.equal(res.days, 2);
  assert.equal(res.hours, 2);
  assert.equal(res.minutes, 14);
  assert.equal(res.seconds, 30);
});

test('calculateCountdown clamps to zero when target date is in the past', () => {
  const target = '2026-12-12T10:30:00Z';
  const now = new Date('2026-12-15T00:00:00Z').getTime();
  const res = calculateCountdown(target, now);

  assert.equal(res.isPast, true);
  assert.equal(res.days, 0);
  assert.equal(res.hours, 0);
  assert.equal(res.minutes, 0);
  assert.equal(res.seconds, 0);
});

test('generateIcsContent outputs valid VCALENDAR and VEVENT structure with config data', () => {
  const ics = generateIcsContent(WEDDING_CONFIG);
  assert.ok(ics.startsWith('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('BEGIN:VEVENT'));
  assert.ok(ics.includes(WEDDING_CONFIG.COUPLE_DISPLAY_NAMES));
  assert.ok(ics.includes(WEDDING_CONFIG.PRIMARY_VENUE.name));
  assert.ok(ics.trim().endsWith('END:VCALENDAR'));
});

test('validateRsvpPayload rejects empty name or empty events and accepts valid payload', () => {
  const invalid = validateRsvpPayload({
    guestName: '   ',
    guestsCount: 2,
    attendingEvents: [],
    message: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.guestName);
  assert.ok(invalid.errors.attendingEvents);

  const valid = validateRsvpPayload({
    guestName: 'Rohan Sharma',
    guestsCount: 3,
    attendingEvents: ['हल्दी (Sarson Haldi Courtyard)', 'फेरे (Phere & Sacred Vows)'],
    message: 'Warmest blessings to Simran and Arjun!',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('buildWhatsAppRsvp constructs prefilled wa.me link using config phone number', () => {
  const { messageText, whatsappUrl } = buildWhatsAppRsvp(
    WEDDING_CONFIG.RSVP_WHATSAPP_NUMBER,
    WEDDING_CONFIG.COUPLE_DISPLAY_NAMES,
    {
      guestName: 'Meera & Kabir',
      guestsCount: 2,
      attendingEvents: ['संगीत', 'फेरे'],
      message: 'Cannot wait to celebrate in Amritsar!',
    }
  );

  assert.ok(messageText.includes('Meera & Kabir'));
  assert.ok(messageText.includes('Number of Guests: 2'));
  assert.ok(whatsappUrl.startsWith(`https://wa.me/${WEDDING_CONFIG.RSVP_WHATSAPP_NUMBER}?text=`));
  assert.ok(decodeURIComponent(whatsappUrl).includes('Cannot wait to celebrate in Amritsar!'));
});

test('WEDDING_CONFIG holds required envelope video, couple fields, and namesByLang', () => {
  assert.equal(WEDDING_CONFIG.VIDEO_SRC, '/wedding-video.mp4');
  assert.equal(WEDDING_CONFIG.COUPLE_DISPLAY_NAMES, 'Gurleen & Harjot');
  assert.equal(WEDDING_CONFIG.namesByLang.pa, 'ਗੁਰਲੀਨ ਅਤੇ ਹਰਜੋਤ');
  assert.equal(WEDDING_CONFIG.namesByLang.ur, 'گرلین اور ہرجوت');
  assert.equal(WEDDING_CONFIG.HASHTAG, '#GurleenWedsHarjot');
  assert.equal(WEDDING_CONFIG.TAP_TO_OPEN_TEXT, 'Tap to open invitation');
  assert.equal(WEDDING_CONFIG.CAR_SRC, '/car.png');
  assert.equal(WEDDING_CONFIG.ROAD_SRC, '/road.png');
  assert.equal(WEDDING_CONFIG.HUMARI_KAHANI.stops.length, 4);
});

test('computeKahaniMetrics runs main journey on q = min(p/0.86, 1) and extra push on r = (p - 0.86)/0.14', () => {
  const start = computeKahaniMetrics(0);
  assert.equal(start.q, 0);
  assert.equal(start.r, 0);
  assert.equal(start.e, 0);
  assert.ok(Math.abs(start.carScale - 0.08) < 1e-6);
  assert.equal(start.carBottomPercent, 40);
  assert.equal(start.carTranslateYSvh, -50);
  assert.equal(start.carOpacity, 0);
  assert.equal(start.introOpacity, 1);
  assert.equal(start.outroOpacity, 0);

  const mid = computeKahaniMetrics(0.43);
  const expectedE = Math.pow(0.5, 1.8);
  assert.ok(Math.abs(mid.q - 0.5) < 1e-6);
  assert.equal(mid.r, 0);
  assert.ok(Math.abs(mid.e - expectedE) < 1e-6);
  assert.ok(Math.abs(mid.carScale - (0.08 + 0.92 * expectedE)) < 1e-6);
  assert.ok(Math.abs(mid.carBottomPercent - (40 + 50 * expectedE)) < 1e-6);
  assert.equal(mid.carOpacity, 1);
  assert.equal(mid.introOpacity, 0);

  const atMainEnd = computeKahaniMetrics(0.86);
  assert.ok(Math.abs(atMainEnd.q - 1) < 1e-6);
  assert.ok(Math.abs(atMainEnd.r) < 1e-6);
  assert.ok(Math.abs(atMainEnd.carScale - 1.0) < 1e-6);
  assert.ok(Math.abs(atMainEnd.carBottomPercent - 90) < 1e-6);
  assert.ok(Math.abs(atMainEnd.carTranslateYSvh) < 1e-6);
  assert.equal(atMainEnd.outroOpacity, 1);
  assert.equal(atMainEnd.extraHeartsProgress, 0);

  const midExtra = computeKahaniMetrics(0.93);
  assert.ok(midExtra.r > 0.49 && midExtra.r < 0.51);
  assert.ok(midExtra.carScale > 1.0 && midExtra.carScale < 1.14);
  assert.ok(midExtra.carBottomPercent > 90 && midExtra.carBottomPercent < 94);
  assert.ok(midExtra.extraHeartsProgress > 0);
  assert.equal(midExtra.outroOpacity, 1);

  const end = computeKahaniMetrics(1);
  assert.equal(end.q, 1);
  assert.equal(end.r, 1);
  assert.ok(Math.abs(end.carScale - 1.14) < 1e-6);
  assert.ok(Math.abs(end.carBottomPercent - 94) < 1e-6);
  assert.ok(Math.abs(end.carTranslateYSvh - 4) < 1e-6);
  assert.ok(Math.abs(end.shadowScale - 1.14) < 1e-6);
  assert.ok(Math.abs(end.roadExtraScale - 1.03) < 1e-6);
  assert.ok(Math.abs(end.bgExtraScale - 1.03) < 1e-6);
  assert.equal(end.outroOpacity, 1);
});

test('computeStopCardStyle activates stops at q = 0.2, 0.4, 0.6, 0.8 for ~0.12 progress', () => {
  for (const center of [0.2, 0.4, 0.6, 0.8]) {
    const active = computeStopCardStyle(center, center);
    assert.equal(active.opacity, 1);
    assert.equal(active.translateY, 0);

    const outsideBefore = computeStopCardStyle(center - 0.1, center);
    assert.equal(outsideBefore.opacity, 0);

    const outsideAfter = computeStopCardStyle(center + 0.1, center);
    assert.equal(outsideAfter.opacity, 0);
  }
});

test('Shaadi ki Stories helpers resolve 35%/65% tap zones and segment fill ratios', () => {
  assert.equal(WEDDING_CONFIG.EVENTS.length, 5);
  assert.equal(WEDDING_CONFIG.EVENTS[0].imageSrc, '/events/haldi.png');
  assert.equal(WEDDING_CONFIG.EVENTS[4].imageSrc, '/events/reception.png');

  assert.equal(resolveStoryTapDirection(100, 0, 400), 'prev');
  assert.equal(resolveStoryTapDirection(139, 0, 400), 'prev');
  assert.equal(resolveStoryTapDirection(140, 0, 400), 'next');
  assert.equal(resolveStoryTapDirection(320, 0, 400), 'next');

  assert.equal(computeStorySegmentFill(0, 2, 0.5, false), 1);
  assert.equal(computeStorySegmentFill(1, 2, 0.5, false), 1);
  assert.equal(computeStorySegmentFill(2, 2, 0.5, false), 0.5);
  assert.equal(computeStorySegmentFill(3, 2, 0.5, false), 0);
  assert.equal(computeStorySegmentFill(4, 2, 0.5, true), 1);
});

test('Hamare Utsav helpers format eyebrows, split weekday/date, and verify dressCodeColors config', () => {
  assert.equal(WEDDING_CONFIG.HAMARE_UTSAV.headingHindi, 'हमारे उत्सव');
  assert.equal(WEDDING_CONFIG.HAMARE_UTSAV.headingEnglish, 'Hamare Utsav');
  assert.equal(WEDDING_CONFIG.HAMARE_UTSAV.subtitleLine, 'Paanch din, paanch rang, ek kahani');
  assert.equal(WEDDING_CONFIG.HAMARE_UTSAV.closingHindiLine, 'आपके आगमन की प्रतीक्षा में');
  assert.equal(WEDDING_CONFIG.HAMARE_UTSAV.addToCalendarLabel, '+ Add to calendar');

  assert.equal(formatEventEyebrow(0), 'EVENT 01');
  assert.equal(formatEventEyebrow(4), 'EVENT 05');

  const split = splitEventDateParts('Friday, 11th December 2026');
  assert.equal(split.weekday, 'Friday');
  assert.equal(split.dayNumber, '11');
  assert.equal(split.monthYear, 'December 2026');
  assert.equal(split.datePart, '11th December 2026');

  const timeSplit = splitEventTimeParts('10:30 AM (Baraat at 9:30 AM)');
  assert.equal(timeSplit.mainTime, '10:30 AM');
  assert.equal(timeSplit.subline, 'Baraat at 9:30 AM');

  const gradHaldi = buildEventBlockGradient('#FFF8EC', '#FFF6D6', '#F8E39A', '#DDEBD3');
  const gradMehndi = buildEventBlockGradient('#F8E39A', '#DDEBD3', '#B9D1AC', '#EBDDF7');
  assert.ok(gradHaldi.includes('#FFF8EC 0%, #FFF6D6 20%, #F8E39A 80%'));
  const haldiEndHex = gradHaldi.match(/#[0-9A-F]{6}(?=\s+100%)/i)?.[0];
  const mehndiStartHex = gradMehndi.match(/#[0-9A-F]{6}(?=\s+0%)/i)?.[0];
  assert.ok(haldiEndHex && haldiEndHex === mehndiStartHex);

  for (const evt of WEDDING_CONFIG.EVENTS) {
    assert.ok(Array.isArray(evt.dressCodeColors), `dressCodeColors missing on ${evt.id}`);
    assert.ok(evt.dressCodeColors.length >= 2 && evt.dressCodeColors.length <= 3);
    assert.equal(evt.dressCodeSwatches.length, 3, `dressCodeSwatches should have 3 items on ${evt.id}`);
  }
});

test('i18n dictionary provides all 12 native-script languages, RTL for Urdu, and English fallback', () => {
  const expectedCodes = ['en', 'hi', 'pa', 'mr', 'gu', 'bn', 'bho', 'ta', 'te', 'kn', 'ml', 'ur'];
  assert.deepEqual(
    LANGUAGES.map((l) => l.code),
    expectedCodes
  );

  const urduMeta = LANGUAGES.find((l) => l.code === 'ur');
  assert.equal(urduMeta?.dir, 'rtl');
  assert.equal(urduMeta?.googleFontFamily, 'Noto Nastaliq Urdu');

  for (const code of expectedCodes) {
    const dict = getTranslationDictionary(code);
    assert.ok(dict.tapToOpen.length > 0, `tapToOpen empty for ${code}`);
    assert.ok(dict.countdownDays.length > 0, `countdownDays empty for ${code}`);
    assert.ok(dict.rsvpSubmitButton.length > 0, `rsvpSubmitButton empty for ${code}`);
  }

  // Fallback to English for unknown language or missing custom key
  const fallbackVal = translateKey('unknown-lang', 'tapToOpen', {
    'unknown-lang': {
      code: 'unknown-lang',
      nativeName: 'Custom',
      englishName: 'Custom',
      dir: 'ltr',
      dictionary: {},
    },
  });
  assert.equal(fallbackVal, 'Tap to open invitation');

  const dateParts = formatLocalizedEventDateParts('2026-12-11T10:30:00+05:30', 'pa-IN');
  assert.ok(dateParts.weekday.length > 0);
  assert.ok(dateParts.dayNumber.length > 0);
  const timeFormatted = formatLocalizedEventTime('2026-12-11T10:30:00+05:30', 'hi-IN');
  assert.ok(timeFormatted.length > 0);
});

test('THEMES defines all 16 styles, emotion layer tokens, language-follow mapping, and generic event names', () => {
  assert.equal(THEME_ORDER.length, 16);

  // Punjabi native label fix for Sarson Subah
  assert.equal(THEMES.sarson_subah.name, 'Sarson Subah');
  assert.equal(THEMES.sarson_subah.nativeName, 'ਸਰ੍ਹੋਂ ਸਵੇਰ');
  assert.equal(THEMES.sarson_subah.base, '#FFF8EC');
  assert.equal(THEMES.sarson_subah.latinFont, 'Monsieur La Doulaise');

  // Renamed themes verification
  assert.equal(THEMES.anand_karaj.name, 'Sunehri Dhoop');
  assert.equal(THEMES.anand_karaj.nativeName, 'ਸੁਨਹਿਰੀ ਧੁੱਪ');
  assert.equal(THEMES.anand_karaj.mood, 'shaant, sukoon, khushi');
  assert.equal(THEMES.anand_karaj.latinFont, 'Pinyon Script');

  assert.equal(THEMES.nikah.name, 'Zamurrad');
  assert.equal(THEMES.nikah.nativeName, 'زمرد');
  assert.equal(THEMES.nikah.mood, 'sukoon aur sajaawat');
  assert.deepEqual(THEMES.nikah.emojis, ['🌹', '✨']);

  assert.equal(THEMES.mehfil_e_gulab.name, 'Gulabi Jaali');
  assert.equal(THEMES.mehfil_e_gulab.nativeName, 'گلابی جالی');
  assert.equal(THEMES.mehfil_e_gulab.mood, 'nazakat aur roshni');
  assert.equal(THEMES.mehfil_e_gulab.latinFont, 'Allura');

  assert.equal(THEMES.white_aisle.name, 'Ivory Grove');
  assert.equal(THEMES.white_aisle.nativeName, 'Olive & Ivory');
  assert.equal(THEMES.white_aisle.mood, 'grace aur khushi');
  assert.equal(THEMES.white_aisle.latinFont, 'Pinyon Script');

  assert.equal(THEMES.kamal.name, 'Moti Gulabi');
  assert.equal(THEMES.kamal.nativeName, 'मोती गुलाबी');
  assert.equal(THEMES.kamal.mood, 'sukoon aur taazgi');
  assert.equal(THEMES.kamal.latinFont, 'Parisienne');

  assert.equal(THEMES.bandhani_garba.name, 'Bandhani Rang');
  assert.equal(THEMES.bandhani_garba.nativeName, 'બાંધણી રંગ');
  assert.equal(THEMES.bandhani_garba.mood, 'josh aur rang');

  assert.equal(THEMES.alpona.name, 'Lal Paar');
  assert.equal(THEMES.alpona.nativeName, 'লাল পাড়');
  assert.equal(THEMES.alpona.mood, 'kavita jaisa pyaar');
  assert.deepEqual(THEMES.alpona.emojis, ['🌸', '🌺']);

  assert.equal(THEMES.kanjeevaram.nativeName, 'காஞ்சிபுரம் பட்டு');
  assert.equal(THEMES.kanjeevaram.mood, 'shaan aur garima');

  assert.equal(THEMES.kasavu.nativeName, 'കസവ്');

  assert.equal(THEMES.kesariya_gulab.nativeName, 'केसरिया गुलाब');
  assert.equal(THEMES.kesariya_gulab.mood, 'rang, roshni, raunak');

  // Language to default theme mapping
  assert.equal(getThemeForLanguage('hi').id, 'kesariya_gulab');
  assert.equal(getThemeForLanguage('pa').id, 'sarson_subah');
  assert.equal(getThemeForLanguage('mr').id, 'paithani');
  assert.equal(getThemeForLanguage('gu').id, 'bandhani_garba');
  assert.equal(getThemeForLanguage('bn').id, 'alpona');
  assert.equal(getThemeForLanguage('bho').id, 'madhubani');
  assert.equal(getThemeForLanguage('ta').id, 'kanjeevaram');
  assert.equal(getThemeForLanguage('te').id, 'pochampally');
  assert.equal(getThemeForLanguage('kn').id, 'mysore_silk');
  assert.equal(getThemeForLanguage('ml').id, 'kasavu');
  assert.equal(getThemeForLanguage('ur').id, 'nikah');
  assert.equal(getThemeForLanguage('en').id, 'blush_modern');

  // Strict sacred symbol rule check
  assert.equal(WEDDING_CONFIG.SACRED_HEADER, false);
  assert.equal(WEDDING_CONFIG.FAMILY_BLESSING_LINE, '');
  const forbiddenSacredChars = ['🕉', '☬', '✝', '☪', '卐'];

  for (const id of THEME_ORDER) {
    const t = THEMES[id];
    assert.ok(t.nativeName.length > 0, `nativeName missing on ${id}`);
    assert.equal('community' in t, false, `community should not exist on ${id}`);
    assert.ok(t.mood.length > 0, `mood missing on ${id}`);
    assert.ok(t.moodLine.length > 0, `moodLine missing on ${id}`);
    assert.ok(t.closingLine.length > 0, `closingLine missing on ${id}`);
    assert.ok(['spacious', 'cosy', 'compact'].includes(t.density), `invalid density on ${id}`);
    assert.ok([1, 2, 3].includes(t.ornamentLevel), `invalid ornamentLevel on ${id}`);
    assert.ok(t.emojis.length >= 1 && t.emojis.length <= 2, `invalid emojis on ${id}`);
    for (const em of t.emojis) {
      for (const sacred of forbiddenSacredChars) {
        assert.equal(em.includes(sacred), false, `sacred symbol found in emoji on ${id}`);
      }
    }

    const uri = getThemePatternDataUri(t);
    assert.ok(uri.startsWith('url("data:image/svg+xml,'), `invalid pattern URI on ${id}`);

    const motionSpec = getThemeEntranceMotion(t, false);
    assert.equal('x' in motionSpec.initial, false, `horizontal x entrance not allowed on ${id}`);

    const reducedSpec = getThemeEntranceMotion(t, true);
    assert.deepEqual(reducedSpec.initial, { opacity: 0 });
    assert.deepEqual(reducedSpec.whileInView, { opacity: 1 });

    const randomOther = getRandomDifferentThemeId(id, () => 0.42);
    assert.notEqual(randomOther, id);
  }

  // Generic event names everywhere (Haldi, Mehndi, Sangeet, Phere, Reception) and "16 wedding styles" subtitle
  const baseEn = getTranslationDictionary('en');
  assert.equal(baseEn.themeSheetSubtitle, '16 wedding styles');
  assert.equal(baseEn.event1ScriptTitle, 'Haldi');
  assert.equal(baseEn.event2ScriptTitle, 'Mehndi');
  assert.equal(baseEn.event3ScriptTitle, 'Sangeet');
  assert.equal(baseEn.event4ScriptTitle, 'Phere');
  assert.equal(baseEn.event5ScriptTitle, 'Reception');
  assert.equal(baseEn.event1NativeTitle, 'Haldi');
  assert.equal(baseEn.event4NativeTitle, 'Phere');
  assert.equal(baseEn.event5NativeTitle, 'Reception');

  const paithaniEvents = [0, 1, 2, 3, 4].map((i) => getThemeEventPalette(THEMES.paithani, i));
  assert.notEqual(paithaniEvents[0].bgTo, paithaniEvents[1].bgTo);
  assert.notEqual(paithaniEvents[1].bgTo, paithaniEvents[2].bgTo);
});

test('PHOTOS config contains four valid verified stock photos with fallbacks and credits', () => {
  const { PHOTOS } = WEDDING_CONFIG;
  assert.ok(PHOTOS, 'PHOTOS config should exist');

  const requiredSlots = ['bride', 'groom', 'couple1', 'couple2'] as const;
  for (const slot of requiredSlots) {
    const photo = PHOTOS[slot];
    assert.ok(photo, `Slot ${slot} missing`);
    assert.ok(photo.src.startsWith('https://images.pexels.com/') || photo.src.startsWith('https://images.unsplash.com/'));
    assert.ok(photo.src.includes('w=1200'), 'Should request w=1200 high-res image');
    assert.ok(photo.credit && photo.credit.length > 0, `Credit missing on ${slot}`);
    assert.ok(photo.sourceUrl && photo.sourceUrl.startsWith('https://'), `Source URL missing on ${slot}`);
    assert.ok(photo.fallbackSrc && photo.fallbackSrc.startsWith('/events/'), `Fallback image missing on ${slot}`);
    assert.ok(photo.alt && photo.alt.length > 0, `Alt text missing on ${slot}`);
  }

  // Check Couple section profiles are wired to PHOTOS
  assert.equal(WEDDING_CONFIG.BRIDE.photoSrc, PHOTOS.bride.src);
  assert.equal(WEDDING_CONFIG.GROOM.photoSrc, PHOTOS.groom.src);
  assert.equal(WEDDING_CONFIG.BRIDE.fallbackSrc, PHOTOS.bride.fallbackSrc);
  assert.equal(WEDDING_CONFIG.GROOM.fallbackSrc, PHOTOS.groom.fallbackSrc);
});

test('All 12 supported languages define gallery captions for bride, groom, together, forever', () => {
  for (const lang of LANGUAGES) {
    const dict = getTranslationDictionary(lang.code);
    assert.ok(dict.galleryCaptionBride && dict.galleryCaptionBride.length > 0, `galleryCaptionBride missing on ${lang.code}`);
    assert.ok(dict.galleryCaptionGroom && dict.galleryCaptionGroom.length > 0, `galleryCaptionGroom missing on ${lang.code}`);
    assert.ok(dict.galleryCaptionTogether && dict.galleryCaptionTogether.length > 0, `galleryCaptionTogether missing on ${lang.code}`);
    assert.ok(dict.galleryCaptionForever && dict.galleryCaptionForever.length > 0, `galleryCaptionForever missing on ${lang.code}`);
  }

  // Exact English dictionary strings check
  const enDict = getTranslationDictionary('en');
  assert.equal(enDict.galleryCaptionBride, 'The bride');
  assert.equal(enDict.galleryCaptionGroom, 'The groom');
  assert.equal(enDict.galleryCaptionTogether, 'Together');
  assert.equal(enDict.galleryCaptionForever, 'Forever');
});

