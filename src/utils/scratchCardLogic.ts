import { formatPersonalisedLine } from './relativeMatching';

export const SCRATCH_SESSION_KEY = 'sarson_subah_countdown_revealed';
export const SCRATCH_RESET_EVENT = 'sarson-subah:reset-scratch';
export const MAX_LIVE_PARTICLES = 220;
export const REVEAL_SEQUENCE_DURATION_MS = 3800;

export interface Point2D {
  x: number;
  y: number;
}

/**
 * Smoothly interpolates points between (x0, y0) and (x1, y1) so fast pointer
 * drags produce a continuous 26px radius scratch stroke without gaps.
 */
export function interpolateBrushPoints(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  stepPx: number = 7
): Point2D[] {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const dist = Math.hypot(dx, dy);
  if (dist <= stepPx || stepPx <= 0) {
    return [{ x: x1, y: y1 }];
  }
  const steps = Math.min(64, Math.ceil(dist / stepPx));
  const points: Point2D[] = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    points.push({
      x: x0 + dx * t,
      y: y0 + dy * t,
    });
  }
  return points;
}

/**
 * Estimates the cleared fraction of the scratch foil by sampling a small
 * grid (default 16x9 = 144 points), never reading every pixel of the canvas.
 */
export function estimateClearedRatioFromAlpha(
  getAlphaAt: (x: number, y: number) => number,
  width: number,
  height: number,
  gridCols: number = 16,
  gridRows: number = 9,
  alphaThreshold: number = 128
): number {
  if (width <= 0 || height <= 0 || gridCols <= 0 || gridRows <= 0) {
    return 0;
  }
  let cleared = 0;
  const total = gridCols * gridRows;
  for (let r = 0; r < gridRows; r++) {
    const y = Math.floor(((r + 0.5) / gridRows) * height);
    for (let c = 0; c < gridCols; c++) {
      const x = Math.floor(((c + 0.5) / gridCols) * width);
      const alpha = getAlphaAt(x, y);
      if (alpha < alphaThreshold) {
        cleared += 1;
      }
    }
  }
  return cleared / total;
}

/**
 * Determines whether the scratch threshold (40%) has been reached for the first time.
 */
export function shouldAutoFinishScratch(
  clearedRatio: number,
  alreadyRevealed: boolean,
  threshold: number = 0.4
): boolean {
  if (alreadyRevealed) return false;
  return clearedRatio >= threshold;
}

const LANG_NUMBERING_SYSTEM: Record<string, string> = {
  en: 'latn',
  hi: 'deva',
  mr: 'deva',
  bho: 'deva',
  pa: 'guru',
  gu: 'gujr',
  bn: 'beng',
  ta: 'tamldec',
  te: 'telu',
  kn: 'knda',
  ml: 'mlym',
  ur: 'arabext',
};

const DIGIT_TABLES: Record<string, string[]> = {
  deva: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
  guru: ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'],
  gujr: ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
  beng: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
  tamldec: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'],
  telu: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
  knda: ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'],
  mlym: ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯'],
  arabext: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
};

/**
 * Formats an integer using the active language's native digits (or Latin digits for English).
 */
export function formatLocalizedDigits(
  value: number,
  langCode: string = 'en',
  minDigits: number = 2
): string {
  const safeVal = Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));
  const padded = String(safeVal).padStart(minDigits, '0');
  const norm = (langCode || 'en').toLowerCase().trim();
  const numSys = LANG_NUMBERING_SYSTEM[norm] || 'latn';
  if (numSys === 'latn') {
    return padded;
  }
  const table = DIGIT_TABLES[numSys];
  if (!table) return padded;
  return padded.replace(/[0-9]/g, (d) => table[Number(d)] ?? d);
}

/**
 * Formats the post-reveal personalised countdown line:
 * "{guest}, only {n} days to go!" (or without the name when none exists).
 */
export function formatCountdownDaysToGoLine(
  days: number,
  langCode: string,
  guestDisplayName: string | null | undefined,
  templateWithGuest?: string,
  templateNoGuest?: string
): string {
  const formattedDays = formatLocalizedDigits(days, langCode, 1);
  const cleanGuest = (guestDisplayName || '').trim();
  if (cleanGuest) {
    const raw = (templateWithGuest || '{guest}, only {n} days to go!').replace(
      /\{n\}/g,
      formattedDays
    );
    return formatPersonalisedLine(raw, cleanGuest);
  }
  return (templateNoGuest || 'Only {n} days to go!').replace(/\{n\}/g, formattedDays);
}

export interface CardBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface RevealParticle {
  kind: 'shard' | 'peony' | 'willow' | 'sparkler' | 'anar' | 'flash';
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  gravity: number;
  drag: number;
  age: number;
  ttl: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
}

export interface FireworkRocket {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  targetY: number;
  launchAt: number;
  launched: boolean;
  exploded: boolean;
  style: 'peony' | 'willow' | 'crown';
  colorPrimary: string;
  colorSecondary: string;
}

export interface RevealShowState {
  elapsedSec: number;
  card: CardBounds;
  viewportWidth: number;
  viewportHeight: number;
  colors: string[];
  rockets: FireworkRocket[];
  particles: RevealParticle[];
  sparklerAccum: number;
  anarAccum: number;
}

function pushParticleCapped(list: RevealParticle[], p: RevealParticle, maxCap: number): void {
  if (list.length < maxCap) {
    list.push(p);
  }
}

/**
 * Creates the initial 3.8s reveal sequence state:
 * 1. ~60 gold foil shards across the card that fly outward and fade.
 * 2. 3 firework rockets (pataakhe) scheduled from the bottom of the card.
 * 3. 2 fuljhadi (sparklers) at left & right corners of the card (burn ~3s).
 * 4. 1 anar (fountain) at bottom centre of the card (burns ~1.5s).
 */
export function createRevealShowState(
  card: CardBounds,
  viewportWidth: number,
  viewportHeight: number,
  themeColors: string[]
): RevealShowState {
  const goldPalette = ['#FFF3C4', '#F1D58A', '#D4A853', '#C99A4B', '#9A6A22'];
  const palette = themeColors.length > 0 ? [...themeColors, ...goldPalette] : goldPalette;

  const particles: RevealParticle[] = [];
  const centerX = card.left + card.width * 0.5;
  const centerY = card.top + card.height * 0.5;

  // 1. 60 gold shards breaking outward from the card
  const cols = 10;
  const rows = 6;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const sx = card.left + ((c + 0.5) / cols) * card.width;
      const sy = card.top + ((r + 0.5) / rows) * card.height;
      const dx = sx - centerX;
      const dy = sy - centerY;
      const angle = Math.atan2(dy, dx) + (((r * 7 + c * 13) % 11) - 5) * 0.06;
      const speed = 110 + ((r * 17 + c * 29) % 150);
      pushParticleCapped(
        particles,
        {
          kind: 'shard',
          x: sx,
          y: sy,
          prevX: sx,
          prevY: sy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 65,
          gravity: 260,
          drag: 0.985,
          age: 0,
          ttl: 1.05 + ((r + c) % 5) * 0.1,
          size: 5 + ((r * 3 + c) % 4),
          color: goldPalette[(r + c) % goldPalette.length],
          rotation: ((r * 5 + c) % 12) * 0.5,
          vRot: (((r + c) % 2 === 0 ? 1 : -1) * (4 + ((r * c) % 6))),
        },
        MAX_LIVE_PARTICLES
      );
    }
  }

  // 2. Three firework rockets (pataakhe) launching from the bottom of the card to the upper screen
  const upperBaseY = Math.max(72, Math.min(viewportHeight * 0.25, card.top - 70));
  const rockets: FireworkRocket[] = [
    {
      x: card.left + card.width * 0.22,
      y: card.top + card.height - 8,
      prevX: card.left + card.width * 0.22,
      prevY: card.top + card.height - 8,
      vx: -18,
      vy: -540,
      targetY: upperBaseY + 18,
      launchAt: 0.08,
      launched: false,
      exploded: false,
      style: 'peony',
      colorPrimary: palette[0] || '#F1D58A',
      colorSecondary: '#FFF3C4',
    },
    {
      x: card.left + card.width * 0.5,
      y: card.top + card.height - 8,
      prevX: card.left + card.width * 0.5,
      prevY: card.top + card.height - 8,
      vx: 6,
      vy: -590,
      targetY: Math.max(58, upperBaseY - 22),
      launchAt: 0.45,
      launched: false,
      exploded: false,
      style: 'willow',
      colorPrimary: '#F1D58A',
      colorSecondary: palette[1] || '#E8A598',
    },
    {
      x: card.left + card.width * 0.78,
      y: card.top + card.height - 8,
      prevX: card.left + card.width * 0.78,
      prevY: card.top + card.height - 8,
      vx: 20,
      vy: -550,
      targetY: upperBaseY + 12,
      launchAt: 0.85,
      launched: false,
      exploded: false,
      style: 'crown',
      colorPrimary: palette[2] || '#D4A853',
      colorSecondary: '#FFF8EC',
    },
  ];

  return {
    elapsedSec: 0,
    card,
    viewportWidth,
    viewportHeight,
    colors: palette,
    rockets,
    particles,
    sparklerAccum: 0,
    anarAccum: 0,
  };
}

function spawnRocketBurst(state: RevealShowState, rocket: FireworkRocket): void {
  // Small flash at burst center
  pushParticleCapped(
    state.particles,
    {
      kind: 'flash',
      x: rocket.x,
      y: rocket.y,
      prevX: rocket.x,
      prevY: rocket.y,
      vx: 0,
      vy: 0,
      gravity: 0,
      drag: 1,
      age: 0,
      ttl: 0.24,
      size: 34,
      color: '#FFF8EC',
      rotation: 0,
      vRot: 0,
    },
    MAX_LIVE_PARTICLES
  );

  const count = 28;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.08;
    const isWillow = rocket.style === 'willow' || (rocket.style === 'crown' && i % 2 === 0);
    const speed = isWillow ? 85 + (i % 5) * 24 : 115 + (i % 6) * 26;
    pushParticleCapped(
      state.particles,
      {
        kind: isWillow ? 'willow' : 'peony',
        x: rocket.x,
        y: rocket.y,
        prevX: rocket.x,
        prevY: rocket.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: isWillow ? 165 : 115,
        drag: isWillow ? 0.965 : 0.975,
        age: 0,
        ttl: isWillow ? 1.65 + (i % 4) * 0.14 : 1.15 + (i % 4) * 0.1,
        size: isWillow ? 2.6 : 3.2,
        color: i % 2 === 0 ? rocket.colorPrimary : rocket.colorSecondary,
        rotation: 0,
        vRot: 0,
      },
      MAX_LIVE_PARTICLES
    );
  }
}

/**
 * Advances the reveal sequence by dtSec while strictly capping live particles at MAX_LIVE_PARTICLES (220).
 */
export function stepRevealShowState(state: RevealShowState, dtSec: number): void {
  const dt = Math.min(0.05, Math.max(0.001, dtSec));
  state.elapsedSec += dt;

  // Update rockets
  for (const rocket of state.rockets) {
    if (!rocket.launched && state.elapsedSec >= rocket.launchAt) {
      rocket.launched = true;
    }
    if (rocket.launched && !rocket.exploded) {
      rocket.prevX = rocket.x;
      rocket.prevY = rocket.y;
      rocket.x += rocket.vx * dt;
      rocket.y += rocket.vy * dt;
      rocket.vy += 180 * dt; // slight gravity on ascent
      if (rocket.y <= rocket.targetY || rocket.vy >= -40) {
        rocket.exploded = true;
        spawnRocketBurst(state, rocket);
      }
    }
  }

  // 3. Two fuljhadi (sparklers) at left & right top corners of the card for ~3.0s
  if (state.elapsedSec < 3.0) {
    state.sparklerAccum += dt;
    while (state.sparklerAccum >= 0.045) {
      state.sparklerAccum -= 0.045;
      const leftCorner = { x: state.card.left + 12, y: state.card.top + 18 };
      const rightCorner = { x: state.card.left + state.card.width - 12, y: state.card.top + 18 };
      const corners = [leftCorner, rightCorner];
      for (let c = 0; c < corners.length; c++) {
        const corner = corners[c];
        const a = ((state.elapsedSec * 37 + c * 1.9) % 1) * Math.PI * 2;
        const spd = 55 + ((Math.floor(state.elapsedSec * 100) + c * 17) % 65);
        pushParticleCapped(
          state.particles,
          {
            kind: 'sparkler',
            x: corner.x,
            y: corner.y,
            prevX: corner.x,
            prevY: corner.y,
            vx: Math.cos(a) * spd,
            vy: Math.sin(a) * spd - 20,
            gravity: 240,
            drag: 0.96,
            age: 0,
            ttl: 0.38 + (c % 2) * 0.08,
            size: 2.1,
            color: c % 2 === 0 ? '#FFF8EC' : '#F1D58A',
            rotation: 0,
            vRot: 0,
          },
          MAX_LIVE_PARTICLES
        );
      }
    }
  }

  // 4. One anar (fountain) at bottom centre of the card for ~1.5s
  if (state.elapsedSec < 1.5) {
    state.anarAccum += dt;
    while (state.anarAccum >= 0.035) {
      state.anarAccum -= 0.035;
      const baseX = state.card.left + state.card.width * 0.5;
      const baseY = state.card.top + state.card.height - 6;
      const spread = (Math.sin(state.elapsedSec * 43) * 0.42);
      const angle = -Math.PI * 0.5 + spread;
      const speed = 190 + ((Math.floor(state.elapsedSec * 120)) % 95);
      pushParticleCapped(
        state.particles,
        {
          kind: 'anar',
          x: baseX,
          y: baseY,
          prevX: baseX,
          prevY: baseY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          gravity: 340,
          drag: 0.985,
          age: 0,
          ttl: 0.68,
          size: 2.6,
          color: state.colors[Math.floor(state.elapsedSec * 20) % state.colors.length] || '#F1D58A',
          rotation: 0,
          vRot: 0,
        },
        MAX_LIVE_PARTICLES
      );
    }
  }

  // Advance and compact live particles in-place
  let writeIdx = 0;
  for (let i = 0; i < state.particles.length; i++) {
    const p = state.particles[i];
    p.age += dt;
    if (p.age >= p.ttl) {
      continue;
    }
    p.prevX = p.x;
    p.prevY = p.y;
    p.vx *= p.drag;
    p.vy = p.vy * p.drag + p.gravity * dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rotation += p.vRot * dt;
    state.particles[writeIdx++] = p;
  }
  state.particles.length = writeIdx;
}
