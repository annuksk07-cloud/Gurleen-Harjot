import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { WeddingConfig } from '../config';
import { calculateCountdown, CountdownTime } from '../utils/weddingUtils';
import {
  formatLocalizedEventDateParts,
  getLanguageMeta,
  TranslationDictionary,
} from '../i18n/translations';
import { getThemeEntranceMotion, THEMES, WeddingTheme } from '../themes/themes';
import { formatPersonalisedLine } from '../utils/relativeMatching';
import { ambientAudio } from '../utils/ambientAudio';
import {
  SCRATCH_SESSION_KEY,
  SCRATCH_RESET_EVENT,
  REVEAL_SEQUENCE_DURATION_MS,
  interpolateBrushPoints,
  estimateClearedRatioFromAlpha,
  shouldAutoFinishScratch,
  formatLocalizedDigits,
  formatCountdownDaysToGoLine,
  createRevealShowState,
  stepRevealShowState,
  CardBounds,
} from '../utils/scratchCardLogic';

interface CountdownSectionProps {
  config: WeddingConfig;
  langCode?: string;
  dict?: TranslationDictionary;
  theme?: WeddingTheme;
  guestDisplayName?: string | null;
}

interface ArchFlipTileProps {
  value: number;
  langCode: string;
  primaryLabel: string;
  englishSecondaryLabel: string;
  theme: WeddingTheme;
  index: number;
  justRevealed: boolean;
  prefersReducedMotion: boolean;
}

const ArchFlipTile: React.FC<ArchFlipTileProps> = ({
  value,
  langCode,
  primaryLabel,
  englishSecondaryLabel,
  theme,
  index,
  justRevealed,
  prefersReducedMotion,
}) => {
  const localizedValue = formatLocalizedDigits(value, langCode, 2);
  const showSecondary =
    englishSecondaryLabel &&
    primaryLabel.trim().toLowerCase() !== englishSecondaryLabel.trim().toLowerCase();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : justRevealed
            ? { opacity: 0, rotateY: -85, y: 10, scale: 0.92 }
            : false
      }
      animate={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.25 : 0.52,
        delay: prefersReducedMotion ? 0 : justRevealed ? 0.14 + index * 0.12 : 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformPerspective: 600 }}
      className="flex flex-col items-center"
    >
      {/* Arch-shaped tile */}
      <div
        className="relative w-full max-w-[78px] h-[82px] sm:h-[88px] flex flex-col items-center justify-center overflow-hidden px-1.5 py-2 shadow-xs"
        style={{
          borderRadius: '999px 999px 14px 14px',
          backgroundColor: '#FFFDF7',
          border: `1px solid ${theme.goldStart}99`,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 12px rgba(78, 47, 58, 0.08)',
        }}
      >
        {/* Subtle inner arch hairline */}
        <div
          className="pointer-events-none absolute inset-1 opacity-45"
          style={{
            borderRadius: '999px 999px 11px 11px',
            border: `1px solid ${theme.goldStart}66`,
          }}
          aria-hidden="true"
        />

        {/* Horizontal flip hinge line */}
        <div
          className="absolute inset-x-2 top-1/2 h-[1px] pointer-events-none"
          style={{ backgroundColor: `${theme.goldStart}2E` }}
          aria-hidden="true"
        />

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={localizedValue}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: -14, opacity: 0, rotateX: 35 }
            }
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { y: 14, opacity: 0, rotateX: -35 }
            }
            transition={{ duration: prefersReducedMotion ? 0.15 : 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 font-heading-serif italic text-2xl sm:text-[28px] font-semibold tabular-nums leading-none"
            style={{ color: theme.text }}
          >
            {localizedValue}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Primary unit label in active language */}
      <span
        className="mt-1.5 font-english text-[11px] uppercase tracking-[0.12em] leading-tight text-center"
        style={{ color: theme.text }}
      >
        {primaryLabel}
      </span>

      {/* English secondary label when active language is non-English */}
      {showSecondary && (
        <span
          className="font-english text-[10px] uppercase tracking-[0.1em] opacity-75 leading-tight"
          style={{ color: theme.button }}
        >
          {englishSecondaryLabel}
        </span>
      )}
    </motion.div>
  );
};

interface BrushSpeck {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  ttl: number;
  size: number;
  color: string;
}

function readInitialRevealedState(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(SCRATCH_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  config,
  langCode = 'en',
  dict,
  theme = THEMES.punjabi,
  guestDisplayName = null,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isRevealed, setIsRevealed] = useState<boolean>(() => readInitialRevealedState());
  const [justRevealed, setJustRevealed] = useState<boolean>(false);
  const [isFireworksActive, setIsFireworksActive] = useState<boolean>(false);
  const [isTabHidden, setIsTabHidden] = useState<boolean>(() =>
    typeof document !== 'undefined' ? document.hidden : false
  );
  const [scratchResetNonce, setScratchResetNonce] = useState<number>(0);

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateCountdown(config.WEDDING_DATETIME_ISO)
  );

  const cardRef = useRef<HTMLDivElement | null>(null);
  const foilCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fireworksCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const hasTriggeredRevealRef = useRef<boolean>(isRevealed);
  const isPointerDownRef = useRef<boolean>(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastSampleTimeRef = useRef<number>(0);
  const lastVibrateTimeRef = useRef<number>(0);
  const brushSpecksRef = useRef<BrushSpeck[]>([]);

  // Track tab visibility so animations and intervals pause when hidden
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVisChange = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', onVisChange);
    return () => document.removeEventListener('visibilitychange', onVisChange);
  }, []);

  // Live 1s countdown ticking ONLY after reveal and while tab is visible
  useEffect(() => {
    if (!isRevealed || isTabHidden) return;
    const update = () => {
      setTimeLeft(calculateCountdown(config.WEDDING_DATETIME_ISO));
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [isRevealed, isTabHidden, config.WEDDING_DATETIME_ISO]);

  // Reset handler for "Scratch again" and "Reset demo"
  const handleResetScratch = useCallback(() => {
    try {
      window.sessionStorage.removeItem(SCRATCH_SESSION_KEY);
    } catch {
      // Ignore storage error
    }
    hasTriggeredRevealRef.current = false;
    isPointerDownRef.current = false;
    lastPointRef.current = null;
    brushSpecksRef.current = [];
    maskCanvasRef.current = null;
    setIsFireworksActive(false);
    setJustRevealed(false);
    setIsRevealed(false);
    setScratchResetNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onExternalReset = () => {
      handleResetScratch();
    };
    window.addEventListener(SCRATCH_RESET_EVENT, onExternalReset);
    return () => window.removeEventListener(SCRATCH_RESET_EVENT, onExternalReset);
  }, [handleResetScratch]);

  // Trigger the reveal sequence exactly once
  const triggerReveal = useCallback(() => {
    if (hasTriggeredRevealRef.current) return;
    hasTriggeredRevealRef.current = true;
    isPointerDownRef.current = false;

    try {
      window.sessionStorage.setItem(SCRATCH_SESSION_KEY, '1');
    } catch {
      // Ignore storage error
    }

    setTimeLeft(calculateCountdown(config.WEDDING_DATETIME_ISO));
    setJustRevealed(true);
    setIsRevealed(true);

    if (!prefersReducedMotion) {
      try {
        navigator.vibrate?.([20, 40, 20, 40, 60]);
      } catch {
        // Ignore vibrate error
      }
      ambientAudio.playFireworksRevealSound();
      setIsFireworksActive(true);
    }
  }, [config.WEDDING_DATETIME_ISO, prefersReducedMotion]);

  // Draw & animate the gold scratch foil canvas while unrevealed
  useEffect(() => {
    if (isRevealed) return;
    const canvas = foilCanvasRef.current;
    const cardEl = cardRef.current;
    if (!canvas || !cardEl) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = cardEl.getBoundingClientRect();
    const cssWidth = Math.max(260, Math.round(rect.width || 380));
    const cssHeight = Math.max(200, Math.round(rect.height || 230));
    const pxWidth = Math.round(cssWidth * dpr);
    const pxHeight = Math.round(cssHeight * dpr);

    canvas.width = pxWidth;
    canvas.height = pxHeight;

    // Create or resize offscreen scratch mask canvas (stores destination-out brush alpha)
    let maskCanvas = maskCanvasRef.current;
    if (!maskCanvas || maskCanvas.width !== pxWidth || maskCanvas.height !== pxHeight) {
      maskCanvas = document.createElement('canvas');
      maskCanvas.width = pxWidth;
      maskCanvas.height = pxHeight;
      const mCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
      if (mCtx) {
        mCtx.fillStyle = '#000000';
        mCtx.fillRect(0, 0, pxWidth, pxHeight);
      }
      maskCanvasRef.current = maskCanvas;
    }

    const promptText = dict?.countdownScratchPrompt || 'Scratch to reveal the big day';
    let rafId = 0;
    let startTime = performance.now();
    let lastFrameTime = startTime;

    const renderFoilFrame = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastFrameTime) / 1000));
      lastFrameTime = now;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';

      // 1. Metallic gold gradient drawn in code
      const grad = ctx.createLinearGradient(0, 0, cssWidth, cssHeight);
      grad.addColorStop(0, '#9A6A22');
      grad.addColorStop(0.22, '#DFB65B');
      grad.addColorStop(0.48, '#FFF1B8');
      grad.addColorStop(0.74, '#C99A4B');
      grad.addColorStop(1, '#8C5C19');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Soft inner bevel highlight
      ctx.strokeStyle = 'rgba(255, 248, 236, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(8, 8, cssWidth - 16, cssHeight - 16);

      // 2. Faint embossed repeat of the theme's pattern at 10% opacity
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = theme.text || '#3E2430';
      ctx.fillStyle = '#FFF8EC';
      ctx.lineWidth = 1;
      const step = 28;
      for (let py = 14; py < cssHeight; py += step) {
        for (let px = 14; px < cssWidth; px += step) {
          ctx.beginPath();
          ctx.moveTo(px, py - 7);
          ctx.lineTo(px + 7, py);
          ctx.lineTo(px, py + 7);
          ctx.lineTo(px - 7, py);
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // 3. Diagonal glint every 3s
      const cycleMs = 3000;
      const elapsedInCycle = (now - startTime) % cycleMs;
      if (elapsedInCycle < 1300) {
        const glintProgress = elapsedInCycle / 1300;
        const glintCenter = -cssHeight + glintProgress * (cssWidth + cssHeight * 2);
        const glintGrad = ctx.createLinearGradient(
          glintCenter - 55,
          0,
          glintCenter + 55,
          cssHeight
        );
        glintGrad.addColorStop(0, 'rgba(255, 253, 240, 0)');
        glintGrad.addColorStop(0.5, 'rgba(255, 253, 240, 0.52)');
        glintGrad.addColorStop(1, 'rgba(255, 253, 240, 0)');
        ctx.fillStyle = glintGrad;
        ctx.fillRect(0, 0, cssWidth, cssHeight);
      }

      // 4. Center text "Scratch to reveal the big day" + small animated hand icon tracing a short arc
      const arcPhase = prefersReducedMotion ? 0 : Math.sin(now / 380) * 18;
      const arcY = prefersReducedMotion ? 0 : -Math.abs(Math.cos(now / 380)) * 5;
      const handX = cssWidth / 2 + arcPhase;
      const handY = cssHeight / 2 - 20 + arcY;

      // Dashed short arc guide
      ctx.save();
      ctx.strokeStyle = 'rgba(62, 36, 48, 0.35)';
      ctx.lineWidth = 1.25;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(cssWidth / 2, cssHeight / 2 - 6, 26, Math.PI * 1.18, Math.PI * 1.82);
      ctx.stroke();
      ctx.restore();

      // Small hand / sparkle pointer icon
      ctx.save();
      ctx.translate(handX, handY);
      ctx.fillStyle = '#3E2430';
      ctx.strokeStyle = '#FFF8EC';
      ctx.lineWidth = 1.2;
      // Stylized pointing hand silhouette
      ctx.beginPath();
      ctx.roundRect(-6, -4, 12, 13, 4);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(-2.5, -12, 5, 10, 2.5);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Prompt label
      ctx.save();
      ctx.font = `600 16px var(--font-active-script), 'Cormorant Garamond', Georgia, serif`;
      ctx.fillStyle = '#3E2430';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(255, 248, 236, 0.85)';
      ctx.shadowBlur = 8;
      ctx.fillText(promptText, cssWidth / 2, cssHeight / 2 + 20, cssWidth - 36);
      ctx.restore();

      // 5. Apply scratch mask so scratched strokes have alpha = 0 (destination-out)
      if (maskCanvasRef.current) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(maskCanvasRef.current, 0, 0);
        ctx.restore();
      }

      // 6. Flying gold specks off the brush while scratching
      const specks = brushSpecksRef.current;
      if (specks.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        let w = 0;
        for (let i = 0; i < specks.length; i++) {
          const sp = specks[i];
          sp.age += dt;
          if (sp.age >= sp.ttl) continue;
          sp.x += sp.vx * dt;
          sp.y += sp.vy * dt;
          sp.vy += 180 * dt;
          const alpha = Math.max(0, 1 - sp.age / sp.ttl);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = sp.color;
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fill();
          specks[w++] = sp;
        }
        specks.length = w;
        ctx.restore();
      }

      ctx.restore();

      if (!isTabHidden && !hasTriggeredRevealRef.current) {
        rafId = window.requestAnimationFrame(renderFoilFrame);
      }
    };

    renderFoilFrame(performance.now());
    if (!isTabHidden) {
      rafId = window.requestAnimationFrame(renderFoilFrame);
    }

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isRevealed, isTabHidden, dict?.countdownScratchPrompt, theme.text, prefersReducedMotion, scratchResetNonce]);

  // Helper to apply a 26px soft-edged brush stroke and check 40% threshold every 150ms
  const applyScratchPoint = useCallback(
    (clientX: number, clientY: number, forceSample: boolean = false) => {
      if (hasTriggeredRevealRef.current) return;
      const canvas = foilCanvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      if (!canvas || !maskCanvas) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const dpr = canvas.width / rect.width;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const prev = lastPointRef.current || { x, y };
      const points = interpolateBrushPoints(prev.x, prev.y, x, y, 6);
      lastPointRef.current = { x, y };

      const mCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
      const vCtx = canvas.getContext('2d');
      const radius = 26;

      const stampSoftBrush = (ctx: CanvasRenderingContext2D, bx: number, by: number) => {
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.globalCompositeOperation = 'destination-out';
        const radGrad = ctx.createRadialGradient(bx, by, radius * 0.25, bx, by, radius);
        radGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        radGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.92)');
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      for (const pt of points) {
        if (mCtx) stampSoftBrush(mCtx, pt.x, pt.y);
        if (vCtx) stampSoftBrush(vCtx, pt.x, pt.y);
      }

      // Spawn small gold specks flying off the brush
      if (!prefersReducedMotion && brushSpecksRef.current.length < 36) {
        const goldColors = ['#FFF3C4', '#F1D58A', '#D4A853', '#9A6A22'];
        for (let i = 0; i < 2; i++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = 35 + Math.random() * 65;
          brushSpecksRef.current.push({
            x,
            y,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd - 25,
            age: 0,
            ttl: 0.32 + Math.random() * 0.18,
            size: 1.5 + Math.random() * 1.5,
            color: goldColors[i % goldColors.length],
          });
        }
      }

      const now = performance.now();
      // Tiny haptic (5ms every 120ms while scratching)
      if (!prefersReducedMotion && now - lastVibrateTimeRef.current >= 120) {
        lastVibrateTimeRef.current = now;
        try {
          navigator.vibrate?.(5);
        } catch {
          // Ignore vibrate error
        }
      }

      // Sample small 16x9 grid every 150ms (or on pointerup)
      if (forceSample || now - lastSampleTimeRef.current >= 150) {
        lastSampleTimeRef.current = now;
        if (mCtx) {
          const mw = maskCanvas.width;
          const mh = maskCanvas.height;
          const imgData = mCtx.getImageData(0, 0, mw, mh).data;
          const ratio = estimateClearedRatioFromAlpha(
            (sx, sy) => {
              const idx = (sy * mw + sx) * 4 + 3;
              return imgData[idx] ?? 255;
            },
            mw,
            mh,
            16,
            9,
            128
          );
          if (shouldAutoFinishScratch(ratio, hasTriggeredRevealRef.current, 0.4)) {
            triggerReveal();
          }
        }
      }
    },
    [prefersReducedMotion, triggerReveal]
  );

  // Fixed full-viewport fireworks + foil shards canvas (~3.8s, removed from DOM when done)
  useEffect(() => {
    if (!isFireworksActive || prefersReducedMotion) return;
    const fwCanvas = fireworksCanvasRef.current;
    if (!fwCanvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vw = window.innerWidth || 430;
    const vh = window.innerHeight || 900;
    fwCanvas.width = Math.round(vw * dpr);
    fwCanvas.height = Math.round(vh * dpr);

    const cardRectRaw = cardRef.current?.getBoundingClientRect();
    const cardBounds: CardBounds = cardRectRaw
      ? {
          left: cardRectRaw.left,
          top: cardRectRaw.top,
          width: cardRectRaw.width,
          height: cardRectRaw.height,
        }
      : {
          left: vw * 0.1,
          top: vh * 0.35,
          width: Math.min(vw * 0.8, 440),
          height: 230,
        };

    const showState = createRevealShowState(cardBounds, vw, vh, [
      theme.goldStart,
      theme.goldEnd,
      theme.button,
      theme.accent,
    ]);

    let rafId = 0;
    let lastTime = performance.now();

    const tickFireworks = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      if (!document.hidden) {
        stepRevealShowState(showState, dt);

        const ctx = fwCanvas.getContext('2d');
        if (ctx) {
          ctx.save();
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, vw, vh);

          // Draw rising rockets (pataakhe) with thin golden trail
          for (const rocket of showState.rockets) {
            if (rocket.launched && !rocket.exploded) {
              ctx.save();
              ctx.strokeStyle = '#FFF3C4';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(rocket.prevX, rocket.prevY + 14);
              ctx.lineTo(rocket.x, rocket.y);
              ctx.stroke();

              ctx.fillStyle = '#FFF8EC';
              ctx.beginPath();
              ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }

          // Draw bright white-gold fuljhadi cores at left & right corners for first 3s
          if (showState.elapsedSec < 3.0) {
            const corners = [
              { x: showState.card.left + 12, y: showState.card.top + 18 },
              { x: showState.card.left + showState.card.width - 12, y: showState.card.top + 18 },
            ];
            for (const corner of corners) {
              ctx.save();
              const coreGrad = ctx.createRadialGradient(
                corner.x,
                corner.y,
                1,
                corner.x,
                corner.y,
                12
              );
              coreGrad.addColorStop(0, '#FFFFFF');
              coreGrad.addColorStop(0.45, '#FFF3C4');
              coreGrad.addColorStop(1, 'rgba(241, 213, 138, 0)');
              ctx.fillStyle = coreGrad;
              ctx.beginPath();
              ctx.arc(corner.x, corner.y, 12, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }

          // Draw live particles (capped at 220)
          for (const p of showState.particles) {
            const lifeRatio = Math.max(0, 1 - p.age / p.ttl);
            ctx.save();
            ctx.globalAlpha = lifeRatio;

            if (p.kind === 'flash') {
              const fg = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.size);
              fg.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
              fg.addColorStop(0.5, 'rgba(241, 213, 138, 0.45)');
              fg.addColorStop(1, 'rgba(241, 213, 138, 0)');
              ctx.fillStyle = fg;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.kind === 'shard') {
              ctx.translate(p.x, p.y);
              ctx.rotate(p.rotation);
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.moveTo(0, -p.size);
              ctx.lineTo(p.size * 0.8, 0);
              ctx.lineTo(0, p.size);
              ctx.lineTo(-p.size * 0.8, 0);
              ctx.closePath();
              ctx.fill();
            } else if (p.kind === 'willow') {
              ctx.strokeStyle = p.color;
              ctx.lineWidth = p.size;
              ctx.lineCap = 'round';
              ctx.beginPath();
              ctx.moveTo(p.prevX, p.prevY);
              ctx.lineTo(p.x, p.y);
              ctx.stroke();
            } else {
              // peony, sparkler, anar
              ctx.strokeStyle = p.color;
              ctx.lineWidth = p.size * 0.85;
              ctx.lineCap = 'round';
              ctx.beginPath();
              ctx.moveTo(p.prevX, p.prevY);
              ctx.lineTo(p.x, p.y);
              ctx.stroke();

              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 0.65, 0, Math.PI * 2);
              ctx.fill();
            }

            ctx.restore();
          }

          ctx.restore();
        }
      }

      if (showState.elapsedSec * 1000 < REVEAL_SEQUENCE_DURATION_MS) {
        rafId = window.requestAnimationFrame(tickFireworks);
      } else {
        setIsFireworksActive(false);
      }
    };

    rafId = window.requestAnimationFrame(tickFireworks);
    const doneTimer = window.setTimeout(() => {
      setIsFireworksActive(false);
    }, REVEAL_SEQUENCE_DURATION_MS + 80);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearTimeout(doneTimer);
    };
  }, [isFireworksActive, prefersReducedMotion, theme.goldStart, theme.goldEnd, theme.button, theme.accent]);

  const langMeta = getLanguageMeta(langCode);
  const localizedFullDate = formatLocalizedEventDateParts(
    config.WEDDING_DATETIME_ISO,
    langMeta.locale
  ).fullDate;
  const englishFullDate = config.WEDDING_DATE_FULL;
  const showEnglishSecondaryDate =
    langCode !== 'en' &&
    localizedFullDate.trim().toLowerCase() !== englishFullDate.trim().toLowerCase();

  const entranceMotion = getThemeEntranceMotion(theme, prefersReducedMotion);

  const headingText = guestDisplayName
    ? formatPersonalisedLine(
        dict?.countdownHeading_guest || '{guest}, the big day is almost here',
        guestDisplayName
      )
    : dict?.countdownHeading || 'Until Our Sacred Vows';

  const daysToGoLine = formatCountdownDaysToGoLine(
    timeLeft.days,
    langCode,
    guestDisplayName,
    dict?.countdownDaysToGo_guest,
    dict?.countdownDaysToGo
  );

  return (
    <section
      id="countdown-section"
      aria-labelledby="countdown-heading"
      className="relative w-full px-4 sm:px-6 py-[clamp(48px,7vw,76px)] overflow-hidden theme-surface-transition"
      style={{
        background: `linear-gradient(180deg, ${theme.base} 0%, ${theme.tint3} 48%, ${theme.base} 100%)`,
      }}
    >
      {/* Fixed full-viewport fireworks canvas portalled to document.body (pointer-events: none, removed from DOM when done) */}
      {isFireworksActive &&
        !prefersReducedMotion &&
        typeof document !== 'undefined' &&
        createPortal(
          <canvas
            ref={fireworksCanvasRef}
            data-testid="countdown-fireworks-canvas"
            aria-hidden="true"
            className="fixed inset-0 w-full h-full pointer-events-none z-[85]"
          />,
          document.body
        )}

      <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />
      <motion.div
        initial={entranceMotion.initial}
        whileInView={entranceMotion.whileInView}
        viewport={{ once: true, amount: 0.25 }}
        transition={entranceMotion.transition}
        className="relative z-10 w-full max-w-[720px] lg:max-w-[1120px] mx-auto text-center flex flex-col items-center"
      >
        <p
          className="font-cursive-touch text-2xl sm:text-3xl cream-text-glow mb-1 min-h-[2.25rem]"
          style={{ color: theme.button }}
        >
          {dict?.countdownKicker || 'Counting the moments'}
        </p>
        <h2
          id="countdown-heading"
          className="font-heading-serif italic text-gold-shimmer mb-6 min-h-[2.75rem]"
          style={{ fontSize: 'clamp(1.85rem, 4vw, 2.6rem)' }}
        >
          {headingText}
        </h2>

        {/* ===================================================================
            SCRATCH-TO-REVEAL CARD
            width: min(92%, 440px), height: 230px, active theme shape, gold hairline,
            soft shadow, and 4 corner ornaments.
        =================================================================== */}
        <motion.div
          ref={cardRef}
          data-testid="countdown-scratch-card"
          aria-label="Scratch card, double tap to reveal"
          role={!isRevealed ? 'button' : 'region'}
          tabIndex={!isRevealed ? 0 : -1}
          onDoubleClick={() => {
            if (!isRevealed) triggerReveal();
          }}
          onKeyDown={(e) => {
            if (!isRevealed && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              triggerReveal();
            }
          }}
          animate={
            justRevealed && !prefersReducedMotion
              ? { scale: [1, 1.036, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 'min(92%, 440px)',
            height: '230px',
            backgroundColor: '#FFF8EC',
            border: `1px solid ${theme.goldStart}CC`,
            boxShadow:
              '0 18px 42px -12px rgba(62, 36, 48, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          }}
          className="relative mx-auto overflow-hidden theme-shaped-box flex flex-col items-center justify-center px-3 sm:px-5 py-3.5 select-none focus:outline-none focus:ring-2"
        >
          {/* Subtle pattern overlay inside the soft ivory card */}
          <div
            className="absolute inset-0 theme-pattern-overlay opacity-25 pointer-events-none"
            aria-hidden="true"
          />

          {/* 4 Corner Ornaments */}
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 absolute top-2.5 left-2.5 opacity-75 pointer-events-none z-20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 14 V2 H14" stroke={theme.goldStart} strokeWidth="1.5" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 absolute top-2.5 right-2.5 opacity-75 pointer-events-none z-20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M22 14 V2 H10" stroke={theme.goldStart} strokeWidth="1.5" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 absolute bottom-2.5 left-2.5 opacity-75 pointer-events-none z-20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 10 V22 H14" stroke={theme.goldStart} strokeWidth="1.5" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 absolute bottom-2.5 right-2.5 opacity-75 pointer-events-none z-20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M22 10 V22 H10" stroke={theme.goldStart} strokeWidth="1.5" />
          </svg>

          {/* REVEALED CONTENT: Only rendered in the DOM AFTER reveal so date & numbers
              never exist in the page text before the reveal */}
          {isRevealed && (
            <div
              data-testid="countdown-revealed-content"
              className="relative z-10 w-full flex flex-col items-center justify-center gap-2.5"
            >
              {/* Weekday-date line (translated, with English secondary line when in non-English) */}
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : justRevealed
                      ? { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }
                      : false
                }
                animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.25 : 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <p
                  data-testid="countdown-date-primary"
                  className="font-heading-serif italic text-base sm:text-lg font-semibold leading-snug"
                  style={{ color: theme.text }}
                >
                  {langCode === 'en' ? englishFullDate : localizedFullDate}
                </p>
                {showEnglishSecondaryDate && (
                  <p
                    data-testid="countdown-date-secondary"
                    className="font-english text-[11px] uppercase tracking-[0.14em] opacity-80 leading-tight mt-0.5"
                    style={{ color: theme.button }}
                  >
                    {englishFullDate}
                  </p>
                )}
              </motion.div>

              {/* 4 Arch-Shaped Countdown Tiles */}
              <div
                data-testid="countdown-tiles-grid"
                className="w-full max-w-[360px] mx-auto grid grid-cols-4 gap-2 sm:gap-3"
                role="timer"
                aria-live="polite"
                aria-atomic="true"
              >
                <ArchFlipTile
                  value={timeLeft.days}
                  langCode={langCode}
                  primaryLabel={dict?.countdownDays || 'Days'}
                  englishSecondaryLabel="Days"
                  theme={theme}
                  index={0}
                  justRevealed={justRevealed}
                  prefersReducedMotion={prefersReducedMotion}
                />
                <ArchFlipTile
                  value={timeLeft.hours}
                  langCode={langCode}
                  primaryLabel={dict?.countdownHours || 'Hours'}
                  englishSecondaryLabel="Hours"
                  theme={theme}
                  index={1}
                  justRevealed={justRevealed}
                  prefersReducedMotion={prefersReducedMotion}
                />
                <ArchFlipTile
                  value={timeLeft.minutes}
                  langCode={langCode}
                  primaryLabel={dict?.countdownMinutes || 'Minutes'}
                  englishSecondaryLabel="Minutes"
                  theme={theme}
                  index={2}
                  justRevealed={justRevealed}
                  prefersReducedMotion={prefersReducedMotion}
                />
                <ArchFlipTile
                  value={timeLeft.seconds}
                  langCode={langCode}
                  primaryLabel={dict?.countdownSeconds || 'Seconds'}
                  englishSecondaryLabel="Seconds"
                  theme={theme}
                  index={3}
                  justRevealed={justRevealed}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            </div>
          )}

          {/* GOLD SCRATCH FOIL CANVAS: Mounted ONLY before reveal, with touch-action: none */}
          {!isRevealed && (
            <canvas
              ref={foilCanvasRef}
              data-testid="countdown-foil-canvas"
              style={{ touchAction: 'none' }}
              onPointerDown={(e) => {
                if (prefersReducedMotion) {
                  triggerReveal();
                  return;
                }
                isPointerDownRef.current = true;
                try {
                  e.currentTarget.setPointerCapture(e.pointerId);
                } catch {
                  // Ignore pointer capture errors on synthetic events
                }
                lastPointRef.current = null;
                applyScratchPoint(e.clientX, e.clientY, false);
              }}
              onPointerMove={(e) => {
                if (!isPointerDownRef.current) return;
                applyScratchPoint(e.clientX, e.clientY, false);
              }}
              onPointerUp={(e) => {
                if (!isPointerDownRef.current) return;
                isPointerDownRef.current = false;
                lastPointRef.current = null;
                applyScratchPoint(e.clientX, e.clientY, true);
              }}
              onPointerCancel={() => {
                isPointerDownRef.current = false;
                lastPointRef.current = null;
              }}
              className="absolute inset-0 z-30 w-full h-full cursor-grab active:cursor-grabbing"
            />
          )}
        </motion.div>

        {/* BELOW CARD: Fallback button before reveal; Personalised days-to-go line + Scratch again after reveal */}
        <div className="mt-4 min-h-[2.75rem] flex flex-col items-center justify-center gap-2">
          {!isRevealed ? (
            <button
              type="button"
              data-testid="countdown-tap-reveal-btn"
              onClick={triggerReveal}
              className="theme-btn min-h-[44px] px-5 py-2 rounded-full border font-english text-xs sm:text-sm tracking-[0.08em] inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              style={{
                backgroundColor: `${theme.base}E6`,
                borderColor: `${theme.goldStart}99`,
                color: theme.text,
              }}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" style={{ color: theme.button }} aria-hidden="true" />
              <span>{dict?.countdownTapToReveal || "Can't scratch? Tap to reveal"}</span>
            </button>
          ) : (
            <>
              <motion.p
                data-testid="countdown-days-to-go-line"
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : justRevealed
                      ? { opacity: 0, y: 8 }
                      : false
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0.25 : 0.55,
                  delay: prefersReducedMotion ? 0 : justRevealed ? 0.65 : 0,
                }}
                className="font-heading-serif italic text-lg sm:text-xl font-medium"
                style={{ color: theme.button }}
              >
                {daysToGoLine}
              </motion.p>

              {config.SAMPLE_MODE && (
                <button
                  type="button"
                  data-testid="countdown-scratch-again-btn"
                  onClick={handleResetScratch}
                  className="font-english text-xs underline opacity-75 hover:opacity-100 inline-flex items-center gap-1.5 py-1 px-2 cursor-pointer"
                  style={{ color: theme.text }}
                >
                  <RotateCcw className="w-3 h-3" aria-hidden="true" />
                  <span>{dict?.countdownScratchAgain || 'Scratch again'}</span>
                </button>
              )}
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};
