import test from 'node:test';
import assert from 'node:assert/strict';
import {
  matchRelative,
  resolvePersonalNote,
  getGuestDisplayName,
  formatPersonalisedLine,
  RELATIVES,
  GENERIC_MESSAGES,
} from './relativeMatching';
import { WEDDING_CONFIG } from '../config';

test('Relative matching logic for all 10 relatives and variations', () => {
  // 1. Rashmi Fua variations
  assert.equal(matchRelative('Rashmi bua')?.display, 'Rashmi Fua ji');
  assert.equal(matchRelative('rashmi fua')?.display, 'Rashmi Fua ji');
  assert.equal(matchRelative('Rashmi Fua ji')?.display, 'Rashmi Fua ji');
  assert.equal(matchRelative('RASHMI')?.display, 'Rashmi Fua ji');
  assert.equal(matchRelative('Rashmi buaji')?.display, 'Rashmi Fua ji');
  assert.equal(matchRelative('Rashmi fufi')?.display, 'Rashmi Fua ji');

  // 2. Ramesh Kumar
  assert.equal(matchRelative('Ramesh Kumar')?.display, 'Ramesh Kumar ji');
  assert.equal(matchRelative('ramesh')?.display, 'Ramesh Kumar ji');

  // 3. Harpreet Mausi
  assert.equal(matchRelative('harpreet mausi')?.display, 'Harpreet Mausi');
  assert.equal(matchRelative('Harpreet')?.display, 'Harpreet Mausi');
  assert.equal(matchRelative('Mausi ji')?.display, 'Harpreet Mausi');

  // 4. Gurmeet Chacha
  assert.equal(matchRelative('Gurmeet chacha')?.display, 'Gurmeet Chacha ji');
  assert.equal(matchRelative('gurmeet')?.display, 'Gurmeet Chacha ji');

  // 5. Sunita Mami
  assert.equal(matchRelative('Sunita mami')?.display, 'Sunita Mami ji');
  assert.equal(matchRelative('sunita')?.display, 'Sunita Mami ji');

  // 6. Balwinder Tau
  assert.equal(matchRelative('Balwinder tau')?.display, 'Balwinder Tau ji');
  assert.equal(matchRelative('Balwinder tauji')?.display, 'Balwinder Tau ji');

  // 7. Dadi ji
  assert.equal(matchRelative('Dadi ji')?.display, 'Dadi ji');
  assert.equal(matchRelative('dadiji')?.display, 'Dadi ji');
  assert.equal(matchRelative('Surinder Kaur')?.display, 'Dadi ji');

  // 8. Pooja Bhabhi
  assert.equal(matchRelative('Pooja bhabhi')?.display, 'Pooja Bhabhi');
  assert.equal(matchRelative('puja bhabhi')?.display, 'Pooja Bhabhi');

  // 9. Rohit Jija
  assert.equal(matchRelative('Rohit jija')?.display, 'Rohit Jija ji');
  assert.equal(matchRelative('rohit jijaji')?.display, 'Rohit Jija ji');

  // 10. Tanya
  assert.equal(matchRelative('tanya')?.display, 'Tanya');
  assert.equal(matchRelative('Tanya!')?.display, 'Tanya');
});

test('Unknown name returns generic message and Dear {name}, with zero undefined', () => {
  assert.equal(matchRelative('Neha'), null);

  const resolvedEn = resolvePersonalNote('Neha', 'en', WEDDING_CONFIG);
  assert.equal(resolvedEn.isRelative, false);
  assert.equal(resolvedEn.greeting, 'Dear Neha,');
  assert.ok(GENERIC_MESSAGES.some((m) => m.en === resolvedEn.message));
  assert.equal(resolvedEn.signOff, 'With all our love, Gurleen and Harjot');

  for (const val of Object.values(resolvedEn)) {
    const str = String(val);
    assert.ok(!str.includes('undefined'), `Found undefined in ${str}`);
    assert.ok(!str.includes('[object Object]'), `Found [object Object] in ${str}`);
  }
});

test('Skipped/empty name resolves to Dear guest, and every relative resolves without undefined', () => {
  const skipped = resolvePersonalNote(null, 'en', WEDDING_CONFIG);
  assert.equal(skipped.greeting, 'Dear guest,');
  assert.ok(GENERIC_MESSAGES.some((m) => m.en === skipped.message));
  assert.ok(!skipped.signOff.includes('undefined'));

  for (const rel of RELATIVES) {
    for (const lang of ['en', 'hi']) {
      const note = resolvePersonalNote(rel.aliases[0], lang, WEDDING_CONFIG);
      assert.equal(note.isRelative, true);
      assert.ok(!note.greeting.includes('undefined'));
      assert.ok(!note.chip.includes('undefined'));
      assert.ok(!note.message.includes('undefined'));
      assert.ok(!note.signOff.includes('undefined'));
    }
  }
});

test('getGuestDisplayName and formatPersonalisedLine resolve localised honorifics and prevent double ji', () => {
  assert.equal(getGuestDisplayName('Rashmi bua', 'en'), 'Rashmi Fua ji');
  assert.equal(getGuestDisplayName('Rashmi bua', 'hi'), 'रश्मि बुआ जी');
  assert.equal(getGuestDisplayName('Rashmi bua', 'pa'), 'ਰਸ਼ਮੀ ਭੂਆ ਜੀ');
  assert.equal(getGuestDisplayName('neha sharma', 'en'), 'Neha Sharma');
  assert.equal(getGuestDisplayName('', 'en'), null);

  const hiInvited = formatPersonalisedLine(
    '{guest} जी, आप और आपका पूरा परिवार सादर आमंत्रित हैं',
    'रश्मि बुआ जी'
  );
  assert.equal(hiInvited, 'रश्मि बुआ जी, आप और आपका पूरा परिवार सादर आमंत्रित हैं');
  assert.ok(!hiInvited.includes('जी जी'));
  assert.ok(!hiInvited.includes('{guest}'));
});

