import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateRsvpCode,
  calculatePartyTotals,
  getRsvpDeadlineStatus,
  getPartySizeMicrocopy,
  getSweetToothLabel,
  getDanceLevelLabel,
  sanitizePlainText,
  buildWhatsAppRsvpMessage,
  generateChosenEventsIcs,
  createInitialRsvpState,
} from './rsvpLogic';
import { HOST_PHONE, HOST_PHONE_DISPLAY, HOST_WHATSAPP, WEDDING_CONFIG } from '../config';
import {
  buildHostTelHref,
  buildHostWhatsAppHref,
  CONTACT_TRANSLATIONS,
  formatManualSendToast,
  getContactTranslations,
} from '../i18n/contactTranslations';
import { GuestMember } from './rsvpTypes';

test('generateRsvpCode outputs prefix and 4 uppercase alphanumeric characters', () => {
  const code = generateRsvpCode('EXP');
  assert.ok(code.startsWith('EXP-'));
  assert.equal(code.length, 8);
  assert.match(code, /^EXP-[2-9A-Z]{4}$/);
});

test('sanitizePlainText strips HTML and truncates', () => {
  const dirty = '<script>alert("hack")</script><b>Hello</b> World!';
  const clean = sanitizePlainText(dirty, 20);
  assert.equal(clean, 'alert("hack")Hello W');
});

test('getRsvpDeadlineStatus calculates remaining days or indicates late reply', () => {
  const future = new Date(Date.now() + 5 * 86400 * 1000).toISOString();
  const past = new Date(Date.now() - 2 * 86400 * 1000).toISOString();

  const statusFuture = getRsvpDeadlineStatus(future);
  assert.equal(statusFuture.isPast, false);
  assert.ok(statusFuture.daysLeft >= 4);

  const statusPast = getRsvpDeadlineStatus(past);
  assert.equal(statusPast.isPast, true);
  assert.equal(statusPast.label, 'Late reply');
});

test('calculatePartyTotals accurately counts diets, kids meals, and deduplicates allergies', () => {
  const members: GuestMember[] = [
    {
      id: '1',
      name: 'Simran',
      ageGroup: 'adult',
      diet: 'veg',
      allergies: ['peanut', 'dairy'],
      otherAllergy: '',
      attendingEvents: ['Sangeet', 'Phere'],
      needs: ['high chair'],
    },
    {
      id: '2',
      name: 'Kabir',
      ageGroup: 'child', // < 12 yrs
      diet: 'veg',
      allergies: ['peanut', 'gluten'],
      otherAllergy: 'kiwi',
      attendingEvents: ['Phere'],
      needs: [],
    },
    {
      id: '3',
      name: 'Rohan',
      ageGroup: 'senior',
      diet: 'non-veg',
      allergies: [],
      otherAllergy: '',
      attendingEvents: ['Phere', 'Reception'],
      needs: ['wheelchair'],
    },
  ];

  const totals = calculatePartyTotals(members);
  assert.equal(totals.totalGuests, 3);
  assert.equal(totals.dietCounts.veg, 2);
  assert.equal(totals.dietCounts['non-veg'], 1);
  assert.equal(totals.kidMealsCount, 1);
  // 'peanut', 'dairy', 'gluten', 'kiwi'
  assert.equal(totals.allergies.length, 4);
  assert.ok(totals.allergies.includes('peanut'));
  assert.ok(totals.allergies.includes('dairy'));
  assert.ok(totals.allergies.includes('gluten'));
  assert.ok(totals.allergies.includes('kiwi'));
});

test('getPartySizeMicrocopy returns warm funny lines', () => {
  assert.ok(getPartySizeMicrocopy(1).includes('Akele'));
  assert.ok(getPartySizeMicrocopy(2).includes('jodi'));
  assert.ok(getPartySizeMicrocopy(4).includes('dhamaka'));
  assert.ok(getPartySizeMicrocopy(7).includes('tola'));
  assert.ok(getPartySizeMicrocopy(11).includes('bogie'));
});

test('buildWhatsAppRsvpMessage formats clean emoji human-readable text and preserves RSVP code', () => {
  const state = createInitialRsvpState(WEDDING_CONFIG, 'Priya & Rahul');
  state.phone = WEDDING_CONFIG.HOST_PHONE;
  state.city = 'Delhi';
  state.side = 'dulhan';

  const res = buildWhatsAppRsvpMessage(state, WEDDING_CONFIG);
  assert.ok(res.fullText.includes('Priya & Rahul'));
  assert.ok(res.fullText.includes(state.rsvpCode));
  assert.ok(res.fullText.includes('Dulhan ki taraf'));
  assert.ok(!res.fullText.includes('RSVPDATA:'));
  assert.ok(!res.fullText.includes('base64'));
  assert.ok(res.waMeUrl.startsWith(`https://wa.me/${WEDDING_CONFIG.HOST_WHATSAPP}?text=`));
});

test('generateChosenEventsIcs filters only chosen events and includes host contact phone', () => {
  const ics = generateChosenEventsIcs(['Phere'], WEDDING_CONFIG, 'Priya');
  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('Phere'));
  assert.ok(ics.includes('Confirmed for Priya'));
  assert.ok(ics.includes(WEDDING_CONFIG.HOST_PHONE_DISPLAY));
  assert.ok(ics.includes('END:VCALENDAR'));
});

test('Host contact single source of truth config and 12-language contact helpers match spec', () => {
  assert.equal(HOST_PHONE, '7827357021');
  assert.equal(HOST_WHATSAPP, '917827357021');
  assert.equal(HOST_PHONE_DISPLAY, '+91 78273 57021');
  assert.equal(WEDDING_CONFIG.HOST_PHONE, HOST_PHONE);
  assert.equal(WEDDING_CONFIG.HOST_WHATSAPP, HOST_WHATSAPP);
  assert.equal(WEDDING_CONFIG.HOST_PHONE_DISPLAY, HOST_PHONE_DISPLAY);
  assert.equal(WEDDING_CONFIG.RSVP_WHATSAPP_NUMBER, HOST_WHATSAPP);
  assert.equal(WEDDING_CONFIG.PRIMARY_VENUE.contactPhoneDisplay, HOST_PHONE_DISPLAY);

  assert.equal(buildHostTelHref(WEDDING_CONFIG), 'tel:+917827357021');
  assert.equal(
    buildHostWhatsAppHref('Hello, I need help finding the venue', WEDDING_CONFIG),
    'https://wa.me/917827357021?text=Hello%2C%20I%20need%20help%20finding%20the%20venue'
  );

  const enT = getContactTranslations('en');
  assert.equal(enT.callForDirections, 'Call for directions');
  assert.equal(enT.whatsappUs, 'WhatsApp us');
  assert.equal(enT.askAboutEvent, 'Ask about this event');
  assert.equal(enT.travelHelpButton, 'Need help with travel? WhatsApp us');
  assert.equal(enT.footerQuestionsLine, 'Questions? We are one message away');
  assert.equal(enT.replyWithLove, 'Reply with love');
  assert.equal(enT.sendOnWhatsApp, 'Send on WhatsApp');
  assert.equal(enT.fullDetailsCopiedToast, 'Full details copied, please paste them in the chat');

  const expectedLangs = ['en', 'hi', 'pa', 'mr', 'gu', 'bn', 'bho', 'ta', 'te', 'kn', 'ml', 'ur'];
  for (const lang of expectedLangs) {
    const t = CONTACT_TRANSLATIONS[lang];
    assert.ok(t, `Missing CONTACT_TRANSLATIONS for ${lang}`);
    for (const [k, v] of Object.entries(t)) {
      assert.ok(typeof v === 'string' && v.trim().length > 0, `Empty ${k} for ${lang}`);
      assert.ok(!v.includes('undefined'), `String ${k} for ${lang} contains undefined`);
    }
    const manualToast = formatManualSendToast(lang, WEDDING_CONFIG);
    assert.ok(manualToast.includes(HOST_PHONE_DISPLAY), `Manual toast for ${lang} missing phone display`);
  }
});

