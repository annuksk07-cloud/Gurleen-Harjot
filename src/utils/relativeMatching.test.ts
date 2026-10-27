import test from 'node:test';
import assert from 'node:assert/strict';
import {
  matchRelative,
  resolvePersonalNote,
  getGuestDisplayName,
  formatPersonalisedLine,
  RELATIVES,
  GENERIC_MESSAGES,
  SUPPORTED_NOTE_LANGS,
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
    for (const lang of SUPPORTED_NOTE_LANGS) {
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

test('All 12 languages exist for every relative and generic message with strict script, length, and fallback rules', () => {
  const expectedLangs = ['en', 'hi', 'pa', 'mr', 'gu', 'bn', 'ta', 'te', 'kn', 'ml', 'ur', 'bho'] as const;
  assert.deepEqual(SUPPORTED_NOTE_LANGS, expectedLangs);

  const devanagariRegex = /[\u0900-\u097F]/;
  const latinRegex = /[A-Za-z]/;

  for (const rel of RELATIVES) {
    for (const lang of expectedLangs) {
      const msg = rel.messages[lang];
      const chip = rel.chips[lang];
      const disp = rel.displayByLang[lang];

      assert.ok(typeof msg === 'string' && msg.trim().length > 0, `Empty message for ${rel.display} in ${lang}`);
      assert.ok(typeof chip === 'string' && chip.trim().length > 0, `Empty chip for ${rel.display} in ${lang}`);
      assert.ok(typeof disp === 'string' && disp.trim().length > 0, `Empty display for ${rel.display} in ${lang}`);

      const wordCount = msg.trim().split(/\s+/).length;
      assert.ok(
        wordCount >= 40 && wordCount <= 60,
        `Word count for ${rel.display} in ${lang} is ${wordCount} (expected 40-60)`
      );

      assert.ok(!msg.includes('undefined'), `Message contains undefined for ${rel.display} in ${lang}`);
      assert.ok(!chip.includes('undefined'), `Chip contains undefined for ${rel.display} in ${lang}`);

      if (lang !== 'en') {
        assert.notEqual(msg, rel.messages.en, `Message fell back to English for ${rel.display} in ${lang}`);
        assert.notEqual(chip, rel.chips.en, `Chip fell back to English for ${rel.display} in ${lang}`);

        // No Latin letters inside native-script messages or chips
        assert.ok(
          !latinRegex.test(msg),
          `Latin letters found in native message for ${rel.display} (${lang}): ${msg}`
        );
        assert.ok(
          !latinRegex.test(chip),
          `Latin letters found in native chip for ${rel.display} (${lang}): ${chip}`
        );
      }

      // No non-Hindi language contains Devanagari unless it is mr or bho
      if (lang !== 'hi' && lang !== 'mr' && lang !== 'bho') {
        assert.ok(
          !devanagariRegex.test(msg),
          `Devanagari characters found in ${lang} message for ${rel.display}: ${msg}`
        );
        assert.ok(
          !devanagariRegex.test(chip),
          `Devanagari characters found in ${lang} chip for ${rel.display}: ${chip}`
        );
      }

      // Resolved note check for each relative in each language
      const resolved = resolvePersonalNote(rel.aliases[0], lang, WEDDING_CONFIG);
      assert.ok(!resolved.message.includes('undefined'));
      assert.ok(!resolved.chip.includes('undefined'));
      assert.ok(!resolved.greeting.includes('undefined'));
      assert.ok(!resolved.signOff.includes('undefined'));
      if (lang !== 'en') {
        assert.ok(
          !latinRegex.test(resolved.message),
          `Latin letters in resolved message for ${rel.display} (${lang})`
        );
        assert.ok(
          !latinRegex.test(resolved.chip),
          `Latin letters in resolved chip for ${rel.display} (${lang})`
        );
      }
    }
  }

  for (let i = 0; i < GENERIC_MESSAGES.length; i++) {
    const gen = GENERIC_MESSAGES[i];
    for (const lang of expectedLangs) {
      const msg = gen.messages[lang];
      assert.ok(typeof msg === 'string' && msg.trim().length > 0, `Empty generic[${i}] in ${lang}`);
      assert.ok(!msg.includes('undefined'), `Generic[${i}] contains undefined in ${lang}`);

      if (lang !== 'en') {
        assert.notEqual(msg, gen.messages.en, `Generic[${i}] equals English in ${lang}`);
        assert.ok(
          !latinRegex.test(msg),
          `Latin letters found in generic[${i}] (${lang}): ${msg}`
        );
      }

      if (lang !== 'hi' && lang !== 'mr' && lang !== 'bho') {
        assert.ok(
          !devanagariRegex.test(msg),
          `Devanagari found in generic[${i}] (${lang}): ${msg}`
        );
      }
    }

    // Check unknown guest name in native language has no Latin letters except the guest name itself
    for (const lang of expectedLangs) {
      if (lang === 'en') continue;
      const customNote = resolvePersonalNote('Neha', lang, WEDDING_CONFIG);
      assert.ok(!latinRegex.test(customNote.message), `Latin in generic message for ${lang}`);
      assert.ok(!latinRegex.test(customNote.chip), `Latin in generic chip for ${lang}`);
      const greetingWithoutGuest = customNote.greeting.replace(/Neha/g, '');
      assert.ok(
        !latinRegex.test(greetingWithoutGuest),
        `Latin letters outside guest name in greeting (${lang}): ${customNote.greeting}`
      );
    }
  }
});

test('WEDDING_CONFIG.SHOW_DATE_ON_HERO defaults to false and hero stage labels exist in all 12 languages', async () => {
  const { getTranslationDictionary } = await import('../i18n/translations');
  assert.equal(WEDDING_CONFIG.SHOW_DATE_ON_HERO, false);

  const enDict = getTranslationDictionary('en');
  assert.equal(enDict.heroInvitationForLabel, 'INVITATION FOR');
  assert.equal(enDict.heroWelcomeLabel, 'WELCOME');

  const hiDict = getTranslationDictionary('hi');
  assert.equal(hiDict.heroInvitationForLabel, 'आपके लिए निमंत्रण');
  assert.equal(hiDict.heroWelcomeLabel, 'स्वागत है');

  for (const lang of SUPPORTED_NOTE_LANGS) {
    const d = getTranslationDictionary(lang);
    assert.ok(d.heroInvitationForLabel && d.heroInvitationForLabel.trim().length > 0);
    assert.ok(d.heroWelcomeLabel && d.heroWelcomeLabel.trim().length > 0);
    if (lang !== 'en') {
      assert.notEqual(d.heroInvitationForLabel, 'INVITATION FOR');
      assert.notEqual(d.heroWelcomeLabel, 'WELCOME');
    }
  }
});

