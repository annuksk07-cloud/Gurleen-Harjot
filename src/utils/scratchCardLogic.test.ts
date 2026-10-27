import test from 'node:test';
import assert from 'node:assert/strict';
import {
  interpolateBrushPoints,
  estimateClearedRatioFromAlpha,
  shouldAutoFinishScratch,
  formatLocalizedDigits,
  formatCountdownDaysToGoLine,
  createRevealShowState,
  stepRevealShowState,
  MAX_LIVE_PARTICLES,
} from './scratchCardLogic';

test('interpolateBrushPoints produces continuous points along a fast stroke', () => {
  const pts = interpolateBrushPoints(0, 0, 70, 0, 7);
  assert.equal(pts.length, 10);
  assert.deepEqual(pts[pts.length - 1], { x: 70, y: 0 });
});

test('estimateClearedRatioFromAlpha samples grid and triggers auto-finish at 40%', () => {
  // Simulate left 45% of card scratched (alpha = 0) and right 55% intact (alpha = 255)
  const ratio = estimateClearedRatioFromAlpha(
    (x) => (x < 45 ? 0 : 255),
    100,
    100,
    20,
    10,
    128
  );
  assert.ok(ratio >= 0.4 && ratio <= 0.5, `Expected ~0.45 ratio, got ${ratio}`);
  assert.equal(shouldAutoFinishScratch(ratio, false, 0.4), true);
  assert.equal(shouldAutoFinishScratch(ratio, true, 0.4), false);
  assert.equal(shouldAutoFinishScratch(0.35, false, 0.4), false);
});

test('formatLocalizedDigits renders script digits for Hindi, Punjabi, and Latin for English', () => {
  assert.equal(formatLocalizedDigits(5, 'en', 2), '05');
  assert.equal(formatLocalizedDigits(12, 'hi', 2), '१२');
  assert.equal(formatLocalizedDigits(12, 'pa', 2), '੧੨');
  assert.equal(formatLocalizedDigits(47, 'bn', 2), '৪৭');
});

test('formatCountdownDaysToGoLine personalises with guest name and avoids double honorifics', () => {
  const enWithGuest = formatCountdownDaysToGoLine(
    412,
    'en',
    'Rashmi Fua ji',
    '{guest}, only {n} days to go!',
    'Only {n} days to go!'
  );
  assert.equal(enWithGuest, 'Rashmi Fua ji, only 412 days to go!');

  const enNoGuest = formatCountdownDaysToGoLine(
    412,
    'en',
    null,
    '{guest}, only {n} days to go!',
    'Only {n} days to go!'
  );
  assert.equal(enNoGuest, 'Only 412 days to go!');

  const hiWithGuest = formatCountdownDaysToGoLine(
    412,
    'hi',
    'रश्मि बुआ जी',
    '{guest} जी, बस {n} दिन बाकी हैं!',
    'बस {n} दिन बाकी हैं!'
  );
  assert.equal(hiWithGuest, 'रश्मि बुआ जी, बस ४१२ दिन बाकी हैं!');
  assert.ok(!hiWithGuest.includes('जी जी'));
});

test('createRevealShowState and stepRevealShowState enforce 220 particle cap and launch 3 rockets', () => {
  const state = createRevealShowState(
    { left: 40, top: 300, width: 350, height: 230 },
    430,
    932,
    ['#C99A4B', '#E8A598', '#7A3E55']
  );

  // Initially 60 foil shards and 3 scheduled rockets
  assert.equal(state.particles.length, 60);
  assert.equal(state.rockets.length, 3);

  // Step through 3.8 seconds in 30ms increments
  for (let t = 0; t < 3.8; t += 0.03) {
    stepRevealShowState(state, 0.03);
    assert.ok(
      state.particles.length <= MAX_LIVE_PARTICLES,
      `Particle count ${state.particles.length} exceeded cap ${MAX_LIVE_PARTICLES}`
    );
  }

  // All 3 rockets must have launched and exploded
  assert.ok(state.rockets.every((r) => r.launched && r.exploded));
});
