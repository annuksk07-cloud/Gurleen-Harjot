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
import { WEDDING_CONFIG } from '../config';
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
  state.phone = '9876543210';
  state.city = 'Delhi';
  state.side = 'dulhan';

  const res = buildWhatsAppRsvpMessage(state, WEDDING_CONFIG);
  assert.ok(res.fullText.includes('Priya & Rahul'));
  assert.ok(res.fullText.includes(state.rsvpCode));
  assert.ok(res.fullText.includes('Dulhan ki taraf'));
  assert.ok(!res.fullText.includes('RSVPDATA:'));
  assert.ok(!res.fullText.includes('base64'));
  assert.ok(res.waMeUrl.startsWith(`https://wa.me/${WEDDING_CONFIG.RSVP_WHATSAPP_NUMBER}?text=`));
});

test('generateChosenEventsIcs filters only chosen events', () => {
  const ics = generateChosenEventsIcs(['Phere'], WEDDING_CONFIG, 'Priya');
  assert.ok(ics.includes('BEGIN:VCALENDAR'));
  assert.ok(ics.includes('Phere'));
  assert.ok(ics.includes('Confirmed for Priya'));
  assert.ok(ics.includes('END:VCALENDAR'));
});
