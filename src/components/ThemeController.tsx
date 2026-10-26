import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Palette, X, Check, Globe, Music, Shuffle } from 'lucide-react';
import {
  getRandomDifferentThemeId,
  THEME_ORDER,
  THEMES,
  ThemeBloomType,
  ThemeId,
  WeddingTheme,
} from '../themes/themes';
import { TranslationDictionary } from '../i18n/translations';
import { ambientAudio } from '../utils/ambientAudio';

/**
 * Hanging Toran / Garland drawn in SVG in the active theme's colours for the top of the Style Chooser sheet.
 */
const SheetHeaderToranSvg: React.FC<{ theme: WeddingTheme }> = ({ theme }) => {
  const { goldStart, goldEnd, accent, button, tint1 } = theme;
  return (
    <div
      className="w-full overflow-hidden pointer-events-none select-none -mt-2 mb-2"
      aria-hidden="true"
      data-testid="sheet-header-toran"
    >
      <svg
        viewBox="0 0 480 42"
        className="w-full h-9 sm:h-10"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Top golden rod */}
        <line x1="0" y1="2" x2="480" y2="2" stroke={goldStart} strokeWidth="2.5" />
        {/* 6 Hanging mango leaves & marigold/rose garlands */}
        {[0, 80, 160, 240, 320, 400].map((x, idx) => (
          <g key={x}>
            {/* Scalloped marigold/jasmine swag */}
            <path
              d={`M ${x} 3 Q ${x + 40} 32 ${x + 80} 3`}
              stroke={goldStart}
              strokeWidth="1.6"
              strokeDasharray="4 2"
              fill={`${tint1}55`}
            />
            <path
              d={`M ${x + 6} 3 Q ${x + 40} 24 ${x + 74} 3`}
              stroke={accent}
              strokeWidth="1.2"
              fill="none"
            />
            {/* Mango leaf (Ashoka / Aamrapalli leaf) at each node */}
            <path
              d={`M ${x + 40} 16 C ${x + 46} 23, ${x + 46} 31, ${x + 40} 38 C ${x + 34} 31, ${x + 34} 23, ${x + 40} 16 Z`}
              fill={idx % 2 === 0 ? accent : button}
              fillOpacity="0.82"
              stroke={goldEnd}
              strokeWidth="1"
            />
            {/* Hanging tassel bell */}
            <circle cx={x + 40} cy="15" r="3" fill={goldStart} />
            <circle cx={x + 40} cy="39" r="2.2" fill={goldEnd} />
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Large SVG Flower Bloom cluster (`marigold`, `rose`, `lotus`, or `jasmine`) swaying gently
 * in the bottom-right background of each stylish theme card.
 */
const CardBackgroundBloomSvg: React.FC<{
  bloomType: ThemeBloomType;
  theme: WeddingTheme;
}> = ({ bloomType, theme }) => {
  const { accent, goldStart, button, base } = theme;

  return (
    <svg
      viewBox="0 0 120 120"
      className="pointer-events-none absolute -right-4 -bottom-4 w-28 h-28 opacity-30 animate-bloom-sway select-none"
      aria-hidden="true"
      fill="none"
    >
      {bloomType === 'marigold' && (
        <g transform="translate(65 65)">
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
            (deg) => (
              <ellipse
                key={deg}
                cx="0"
                cy="-24"
                rx="8"
                ry="18"
                transform={`rotate(${deg})`}
                fill={accent}
                stroke={goldStart}
                strokeWidth="1.1"
              />
            )
          )}
          <circle cx="0" cy="0" r="12" fill={goldStart} stroke={button} strokeWidth="1.5" />
        </g>
      )}

      {bloomType === 'rose' && (
        <g transform="translate(65 65)">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M0 -8 C18 -34, 36 -14, 14 10 C4 18, -8 10, 0 -8 Z"
              transform={`rotate(${deg})`}
              fill={accent}
              stroke={goldStart}
              strokeWidth="1.2"
            />
          ))}
          {[30, 150, 270].map((deg) => (
            <path
              key={deg}
              d="M0 -4 C12 -20, 22 -8, 8 6 Z"
              transform={`rotate(${deg})`}
              fill={button}
              fillOpacity="0.55"
              stroke={base}
              strokeWidth="1"
            />
          ))}
          <circle cx="0" cy="0" r="6" fill={goldStart} />
        </g>
      )}

      {bloomType === 'lotus' && (
        <g transform="translate(64 72)">
          {[-56, -28, 0, 28, 56].map((deg) => (
            <path
              key={deg}
              d="M0 0 C-14 -20, -10 -42, 0 -52 C10 -42, 14 -20, 0 0 Z"
              transform={`rotate(${deg})`}
              fill={accent}
              stroke={goldStart}
              strokeWidth="1.2"
            />
          ))}
          <path d="M-26 6 Q0 16 26 6" stroke={goldStart} strokeWidth="2" fill="none" />
          <circle cx="0" cy="-12" r="5" fill={goldStart} />
        </g>
      )}

      {bloomType === 'jasmine' && (
        <g transform="translate(64 64)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="0"
              cy="-22"
              rx="6.5"
              ry="16"
              transform={`rotate(${deg})`}
              fill={base}
              stroke={goldStart}
              strokeWidth="1.3"
            />
          ))}
          <circle cx="0" cy="0" r="9" fill={accent} stroke={goldStart} strokeWidth="1.2" />
        </g>
      )}
    </svg>
  );
};

interface BottomDockProps {
  visible: boolean;
  activeNativeName: string;
  activeTheme: WeddingTheme;
  isMuted: boolean;
  dict: TranslationDictionary;
  onOpenLanguageSheet: () => void;
  onOpenThemeSheet: () => void;
  onToggleMusic: () => void;
}

/**
 * Centered bottom dock above the safe area, rendered AFTER the guest taps "Tap to open invitation".
 * - Cream glass with a hairline, 56px high, 3 buttons >= 44px:
 *   1. Language (globe + native name)
 *   2. Theme (palette + current theme name, truncated)
 *   3. Music (note icon with equalizer bars while playing)
 * - Slides down while scrolling down and whenever an input, textarea, or select is focused;
 *   returns on scroll up or after 1.2s idle.
 */
export const BottomDock: React.FC<BottomDockProps> = ({
  visible,
  activeNativeName,
  activeTheme,
  isMuted,
  dict,
  onOpenLanguageSheet,
  onOpenThemeSheet,
  onToggleMusic,
}) => {
  const [isHiddenByScroll, setIsHiddenByScroll] = useState(false);
  const [isHiddenByFocus, setIsHiddenByFocus] = useState(false);
  const lastScrollYRef = useRef<number>(0);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!visible) return;

    const clearIdleTimer = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const scheduleIdleRestore = () => {
      clearIdleTimer();
      idleTimerRef.current = window.setTimeout(() => {
        setIsHiddenByScroll(false);
      }, 1200);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      if (delta > 6 && currentY > 60) {
        setIsHiddenByScroll(true);
        scheduleIdleRestore();
      } else if (delta < -4) {
        setIsHiddenByScroll(false);
        clearIdleTimer();
      } else {
        scheduleIdleRestore();
      }
    };

    const isFormField = (el: Element | null): boolean => {
      if (!el) return false;
      const tag = el.tagName.toLowerCase();
      return tag === 'input' || tag === 'textarea' || tag === 'select';
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (isFormField(e.target as Element | null)) {
        setIsHiddenByFocus(true);
      }
    };

    const handleFocusOut = () => {
      window.setTimeout(() => {
        if (!isFormField(document.activeElement)) {
          setIsHiddenByFocus(false);
        }
      }, 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      clearIdleTimer();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [visible]);

  if (!visible) return null;

  const isDockSlidDown = isHiddenByScroll || isHiddenByFocus;

  return (
    <motion.nav
      dir="ltr"
      aria-label="Invitation controls dock"
      data-testid="bottom-dock"
      initial={{ y: 80, opacity: 0 }}
      animate={{
        y: isDockSlidDown ? 92 : 0,
        opacity: isDockSlidDown ? 0 : 1,
      }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 -translate-x-1/2 z-[75] h-[56px] px-2 flex items-center gap-1 sm:gap-1.5 gold-glass-card shadow-lg max-w-[calc(100vw-20px)]"
      style={{
        bottom: 'max(12px, calc(env(safe-area-inset-bottom) + 8px))',
        backgroundColor: `${activeTheme.base}EB`,
        borderColor: `${activeTheme.goldStart}99`,
        color: activeTheme.text,
        pointerEvents: isDockSlidDown ? 'none' : 'auto',
      }}
    >
      {/* 1. Language Button (Globe + Native Name, >= 44px) */}
      <button
        type="button"
        data-testid="dock-language-button"
        onClick={onOpenLanguageSheet}
        aria-label={`${dict.languageChipLabel}: ${activeNativeName}`}
        className="h-[44px] min-h-[44px] min-w-[44px] px-3 rounded-full flex items-center gap-1.5 hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
        style={{ color: activeTheme.text }}
      >
        <Globe className="w-4 h-4 shrink-0" style={{ color: activeTheme.button }} aria-hidden="true" />
        <span
          className="text-xs font-medium whitespace-nowrap max-w-[84px] truncate"
          style={{ fontFamily: `var(--font-active-script), 'Jost', sans-serif` }}
        >
          {activeNativeName}
        </span>
      </button>

      <span
        aria-hidden="true"
        className="w-[1px] h-6 shrink-0"
        style={{ backgroundColor: `${activeTheme.goldStart}55` }}
      />

      {/* 2. Theme Button (Palette + Current Theme Name, truncated, >= 44px) */}
      <button
        type="button"
        data-testid="dock-theme-button"
        onClick={onOpenThemeSheet}
        aria-label={`${dict.themeSheetTitle}: ${activeTheme.name}`}
        className="h-[44px] min-h-[44px] min-w-[44px] px-3 rounded-full flex items-center gap-1.5 hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
        style={{ color: activeTheme.text }}
      >
        <Palette className="w-4 h-4 shrink-0" style={{ color: activeTheme.button }} aria-hidden="true" />
        <span className="font-english text-xs font-medium max-w-[96px] sm:max-w-[116px] truncate">
          {activeTheme.name}
        </span>
      </button>

      <span
        aria-hidden="true"
        className="w-[1px] h-6 shrink-0"
        style={{ backgroundColor: `${activeTheme.goldStart}55` }}
      />

      {/* 3. Music Button (Note icon with equalizer bars while playing, >= 44px) */}
      <button
        type="button"
        data-testid="dock-music-button"
        onClick={onToggleMusic}
        aria-label={isMuted ? dict.unmuteMusic : dict.muteMusic}
        aria-pressed={!isMuted}
        className="h-[44px] min-h-[44px] min-w-[48px] px-2.5 rounded-full flex items-center justify-center gap-1.5 hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
        style={{ color: activeTheme.text }}
      >
        <Music
          className="w-4 h-4 shrink-0"
          style={{ color: isMuted ? `${activeTheme.text}80` : activeTheme.button }}
          aria-hidden="true"
        />
        {/* Animated Equalizer Bars */}
        <span className="flex items-end gap-[2px] h-3.5 w-3.5" aria-hidden="true">
          {[0, 1, 2].map((barIdx) => (
            <motion.span
              key={barIdx}
              animate={
                isMuted
                  ? { height: '3px', opacity: 0.4 }
                  : {
                      height: barIdx === 1 ? ['4px', '13px', '5px'] : ['11px', '4px', '12px'],
                      opacity: 1,
                    }
              }
              transition={
                isMuted
                  ? { duration: 0.2 }
                  : {
                      duration: 0.65 + barIdx * 0.12,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }
              }
              className="w-[2.5px] rounded-full"
              style={{ backgroundColor: activeTheme.button }}
            />
          ))}
        </span>
      </button>
    </motion.nav>
  );
};

interface TransitionState {
  key: number;
  theme: WeddingTheme;
  x: number;
  y: number;
}

/**
 * Renders the ~900ms signature theme-change transitions.
 * Respects `prefers-reduced-motion` with a plain fade.
 */
const ThemeSignatureTransitionOverlay: React.FC<{
  transitionState: TransitionState | null;
  prefersReducedMotion: boolean;
}> = ({ transitionState, prefersReducedMotion }) => {
  if (!transitionState) return null;
  const { key, theme, x, y } = transitionState;

  if (prefersReducedMotion) {
    return (
      <motion.div
        key={key}
        aria-hidden="true"
        initial={{ opacity: 0.42 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="fixed inset-0 z-[90] pointer-events-none"
        style={{ backgroundColor: theme.tint1 }}
      />
    );
  }

  const tType = theme.transitionType;

  return (
    <motion.div
      key={key}
      aria-hidden="true"
      data-testid="theme-transition-overlay"
      data-transition-type={tType}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[90] pointer-events-none overflow-hidden"
    >
      {/* Sarson Subah: Marigold petal burst swirling out */}
      {tType === 'marigold_swirl_pulse' && (
        <div className="absolute inset-0">
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const dist = 120 + (i % 3) * 65;
            return (
              <motion.span
                key={i}
                initial={{ x, y, scale: 0.3, rotate: 0, opacity: 0.95 }}
                animate={{
                  x: x + Math.cos(angle + 0.9) * dist,
                  y: y + Math.sin(angle + 0.9) * dist,
                  scale: 1.35,
                  rotate: 260,
                  opacity: 0,
                }}
                transition={{ duration: 0.88, ease: 'easeOut' }}
                className="absolute w-4 h-3 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? '#F2CF7E' : theme.accent,
                  border: `1px solid ${theme.goldStart}`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Kesariya Gulab: Warm diya-glow bloom */}
      {tType === 'diya_glow_bloom' && (
        <motion.div
          initial={{ scale: 0.2, opacity: 0.85 }}
          animate={{
            scale: [0.2, 1.1, 1.35, 1.8],
            opacity: [0.85, 0.65, 0.78, 0],
          }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${x}px ${y}px, #F3D27A 0%, ${theme.accent}88 35%, transparent 72%)`,
          }}
        />
      )}

      {/* Paithani: Peacock fan sweep */}
      {tType === 'peacock_fan_sweep' && (
        <motion.div
          initial={{ rotate: -95, scale: 0.6, opacity: 0.8 }}
          animate={{ rotate: 45, scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            transformOrigin: `${x}px ${y}px`,
            background: `conic-gradient(from 0deg at ${x}px ${y}px, transparent 0deg, ${theme.accent}88 60deg, ${theme.goldEnd}AA 120deg, ${theme.tint2}88 180deg, transparent 240deg)`,
          }}
        />
      )}

      {/* Bandhani Garba: Garba rings */}
      {tType === 'garba_rings' && (
        <div className="absolute inset-0">
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              initial={{ scale: 0.15, rotate: 0, opacity: 0.85 }}
              animate={{ scale: 2.2 + ring * 0.6, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.88, delay: ring * 0.08, ease: 'easeOut' }}
              className="absolute w-48 h-48 -ml-24 -mt-24 rounded-full"
              style={{
                left: x,
                top: y,
                border: `3px dashed ${ring % 2 === 0 ? theme.accent : theme.goldStart}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Alpona: Alpona lines drawing across */}
      {tType === 'alpona_line_draw' && (
        <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d="M 0 200 C 100 80, 300 320, 400 200 M 0 230 C 120 330, 280 90, 400 180"
            stroke={theme.accent}
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={{ pathLength: 1, opacity: 0 }}
            transition={{ duration: 0.88, ease: 'easeInOut' }}
          />
        </svg>
      )}

      {/* Madhubani: Sun-ray burst */}
      {tType === 'sun_ray_burst' && (
        <motion.div
          initial={{ scale: 0.25, rotate: -15, opacity: 0.8 }}
          animate={{ scale: 2.2, rotate: 20, opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0"
          style={{
            transformOrigin: `${x}px ${y}px`,
            background: `repeating-conic-gradient(from 0deg at ${x}px ${y}px, ${theme.goldEnd}99 0deg 10deg, ${theme.accent}55 10deg 20deg, transparent 20deg 30deg)`,
          }}
        />
      )}

      {/* Kanjeevaram: Kolam dot grid */}
      {tType === 'kolam_grid_connect' && (
        <motion.div
          initial={{ opacity: 0.9, scale: 0.92 }}
          animate={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: `${theme.tint1}66`,
            backgroundImage: `radial-gradient(${theme.button} 2px, transparent 2.5px)`,
            backgroundSize: '28px 28px',
          }}
        />
      )}

      {/* Pochampally: Expanding diamond */}
      {tType === 'expanding_diamond' && (
        <motion.div
          initial={{
            clipPath: 'polygon(50% 42%, 58% 50%, 50% 58%, 42% 50%)',
            opacity: 0.85,
          }}
          animate={{
            clipPath: 'polygon(50% -60%, 160% 50%, 50% 160%, -60% 50%)',
            opacity: 0,
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.tint1} 0%, ${theme.accent}88 100%)`,
          }}
        />
      )}

      {/* Mysore Silk: Arch rising from bottom */}
      {tType === 'arch_rise_bottom' && (
        <motion.div
          initial={{ y: '90%', opacity: 0.88 }}
          animate={{ y: '0%', opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 h-full rounded-t-full"
          style={{
            background: `linear-gradient(180deg, ${theme.goldEnd}AA 0%, ${theme.tint1}CC 100%)`,
            borderTop: `3px solid ${theme.goldStart}`,
          }}
        />
      )}

      {/* Kasavu: Nilavilakku flame glow with gold stripes */}
      {tType === 'nilavilakku_kasavu_stripes' && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0.9 }}
          animate={{ scaleY: 1, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 origin-top"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${theme.goldEnd}CC 0%, ${theme.base}88 70%)`,
            borderTop: `12px double ${theme.goldStart}`,
            borderBottom: `12px double ${theme.goldStart}`,
          }}
        />
      )}

      {/* Zamurrad / Gulabi Jaali: 8-point star opening + rose petals */}
      {tType === 'eight_point_star' && (
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 0.1, rotate: -22.5, opacity: 0.88 }}
            animate={{ scale: 3.2, rotate: 0, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-64 h-64 -ml-32 -mt-32"
            style={{
              left: x,
              top: y,
              background: `radial-gradient(circle, ${theme.goldEnd} 0%, ${theme.accent}AA 70%)`,
              clipPath:
                'polygon(50% 0%, 65% 20%, 90% 10%, 80% 35%, 100% 50%, 80% 65%, 90% 90%, 65% 80%, 50% 100%, 35% 80%, 10% 90%, 20% 65%, 0% 50%, 20% 35%, 10% 10%, 35% 20%)',
            }}
          />
          {Array.from({ length: 10 }, (_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                initial={{ x, y, scale: 0.3, opacity: 0.9 }}
                animate={{
                  x: x + Math.cos(angle) * 140,
                  y: y + Math.sin(angle) * 140,
                  scale: 1.2,
                  opacity: 0,
                }}
                transition={{ duration: 0.88, ease: 'easeOut' }}
                className="absolute w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: '#D8829D' }}
              />
            );
          })}
        </div>
      )}

      {/* Ivory Grove / Moti Gulabi / Blush Modern: Soft blush petals */}
      {(tType === 'soft_blush_petals' ||
        tType === 'golden_sunrise_wash' ||
        tType === 'rose_petal_swirl' ||
        tType === 'white_flurry_bell' ||
        tType === 'lotus_bloom_outward') && (
        <motion.div
          initial={{ opacity: 0.72, scale: 0.94 }}
          animate={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${x}px ${y}px, ${theme.goldEnd}CC 0%, ${theme.tint1}AA 45%, ${theme.base}88 80%)`,
          }}
        />
      )}
    </motion.div>
  );
};

const NATIVE_SCRIPT_FONT_MAP: Record<ThemeId, string> = {
  sarson_subah: "'Noto Serif Gurmukhi', 'Jost', serif",
  anand_karaj: "'Noto Serif Gurmukhi', 'Jost', serif",
  kesariya_gulab: "'Tiro Devanagari Hindi', 'Jost', serif",
  paithani: "'Tiro Devanagari Marathi', 'Jost', serif",
  bandhani_garba: "'Noto Serif Gujarati', 'Jost', serif",
  alpona: "'Noto Serif Bengali', 'Jost', serif",
  madhubani: "'Tiro Devanagari Hindi', 'Jost', serif",
  kanjeevaram: "'Noto Serif Tamil', 'Jost', serif",
  pochampally: "'Noto Serif Telugu', 'Jost', serif",
  mysore_silk: "'Noto Serif Kannada', 'Jost', serif",
  kasavu: "'Noto Serif Malayalam', 'Jost', serif",
  nikah: "'Noto Nastaliq Urdu', 'Jost', serif",
  mehfil_e_gulab: "'Noto Nastaliq Urdu', 'Jost', serif",
  white_aisle: "'EB Garamond', 'Cormorant Garamond', serif",
  kamal: "'Tiro Devanagari Hindi', 'Jost', serif",
  blush_modern: "'DM Serif Display', 'Cormorant Garamond', serif",
};

interface ThemeControllerProps {
  activeTheme: WeddingTheme;
  dict: TranslationDictionary;
  isOpen: boolean;
  followLanguage: boolean;
  onClose: () => void;
  onSelectTheme: (themeId: ThemeId) => void;
  onPreviewTheme: (themeId: ThemeId | null) => void;
  onToggleFollowLanguage: (nextVal: boolean) => void;
  onPagePulse?: () => void;
}

/**
 * Style Chooser Bottom Sheet ("Apni shaadi ka rang chuno" · "16 styles" · "16 wedding styles"):
 * - Hanging SVG toran / garland at top in the active theme's colours
 * - "Follow language" toggle + "Surprise me" button (random different theme across all 16 styles)
 * - 2-column grid of all 16 stylish theme cards (150-170px tall), popping in with 60ms stagger (scale 0.9 to 1)
 */
export const ThemeController: React.FC<ThemeControllerProps> = ({
  activeTheme,
  dict,
  isOpen,
  followLanguage,
  onClose,
  onSelectTheme,
  onPreviewTheme,
  onToggleFollowLanguage,
  onPagePulse,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isPreviewHoldActive, setIsPreviewHoldActive] = useState(false);
  const [transitionState, setTransitionState] = useState<TransitionState | null>(null);

  const holdTimerRef = useRef<number | null>(null);
  const didHoldPreviewRef = useRef<boolean>(false);

  const clearHoldTimer = () => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      clearHoldTimer();
      setIsPreviewHoldActive(false);
      onPreviewTheme(null);
    }
  }, [isOpen]);

  const triggerThemeSelection = (
    nextThemeId: ThemeId,
    originX?: number,
    originY?: number
  ) => {
    const nextTheme = THEMES[nextThemeId];
    if (!nextTheme) return;

    const cx =
      typeof originX === 'number'
        ? originX
        : typeof window !== 'undefined'
        ? window.innerWidth / 2
        : 195;
    const cy =
      typeof originY === 'number'
        ? originY
        : typeof window !== 'undefined'
        ? window.innerHeight * 0.65
        : 520;

    setTransitionState({
      key: Date.now(),
      theme: nextTheme,
      x: cx,
      y: cy,
    });

    ambientAudio.playTapSound(nextTheme.tapSound);

    if (nextThemeId === 'sarson_subah' && onPagePulse) {
      onPagePulse();
    }

    onPreviewTheme(null);
    onSelectTheme(nextThemeId);

    window.setTimeout(() => {
      setTransitionState((prev) => (prev?.theme.id === nextThemeId ? null : prev));
    }, 920);
  };

  const handleCardPointerDown = (themeId: ThemeId) => {
    didHoldPreviewRef.current = false;
    clearHoldTimer();
    holdTimerRef.current = window.setTimeout(() => {
      didHoldPreviewRef.current = true;
      setIsPreviewHoldActive(true);
      onPreviewTheme(themeId);
    }, 240);
  };

  const handleCardPointerEnd = () => {
    clearHoldTimer();
    if (isPreviewHoldActive) {
      setIsPreviewHoldActive(false);
      onPreviewTheme(null);
    }
  };

  const handleCardClick = (themeId: ThemeId, e: React.MouseEvent<HTMLButtonElement>) => {
    clearHoldTimer();
    if (didHoldPreviewRef.current) {
      didHoldPreviewRef.current = false;
      setIsPreviewHoldActive(false);
      onPreviewTheme(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    triggerThemeSelection(
      themeId,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
    onClose();
  };

  const handleSurpriseMe = (e: React.MouseEvent<HTMLButtonElement>) => {
    const randomId = getRandomDifferentThemeId(activeTheme.id);
    const rect = e.currentTarget.getBoundingClientRect();
    triggerThemeSelection(
      randomId,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  };

  const allThemes = THEME_ORDER.map((id) => THEMES[id]);

  return (
    <>
      {/* ~900ms Theme Signature Transition Overlay */}
      <AnimatePresence>
        {transitionState && (
          <ThemeSignatureTransitionOverlay
            transitionState={transitionState}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </AnimatePresence>

      {/* Style Chooser Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[85] flex items-end justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="theme-sheet-heading"
          >
            {/* Backdrop — becomes translucent during press-and-hold live preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isPreviewHoldActive ? 0.08 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className={`absolute inset-0 ${
                isPreviewHoldActive ? 'bg-black/10' : 'bg-black/40 backdrop-blur-[2px]'
              }`}
            />

            <motion.div
              data-testid="theme-bottom-sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-[580px] rounded-t-3xl p-5 sm:p-6 pb-safe shadow-2xl max-h-[88svh] overflow-y-auto transition-colors duration-500"
              style={{
                backgroundColor: isPreviewHoldActive
                  ? `${activeTheme.base}80`
                  : activeTheme.base,
                backdropFilter: isPreviewHoldActive ? 'blur(4px)' : 'none',
                color: activeTheme.text,
                borderTop: `1.5px solid ${activeTheme.goldStart}88`,
              }}
            >
              {/* Hanging Toran / Garland drawn in SVG in the theme colours */}
              <SheetHeaderToranSvg theme={activeTheme} />

              {/* Grab Handle */}
              <div
                className="w-10 h-1 rounded-full mx-auto mb-3 opacity-35"
                style={{ backgroundColor: activeTheme.text }}
              />

              {/* Header: "Apni shaadi ka rang chuno" (translated) + "· 16 styles" + subtitle "16 wedding styles" */}
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <h2
                      id="theme-sheet-heading"
                      data-testid="theme-sheet-title"
                      className="font-heading-serif italic text-2xl font-semibold leading-[1.5]"
                      style={{ color: activeTheme.text }}
                    >
                      {dict.themeSheetTitle}
                    </h2>
                    <span
                      data-testid="theme-sheet-count"
                      className="font-english text-xs font-medium opacity-80"
                      style={{ color: activeTheme.button }}
                    >
                      · 16 styles
                    </span>
                  </div>
                  <p
                    data-testid="theme-sheet-subtitle"
                    className="font-english text-xs leading-relaxed opacity-75"
                  >
                    {dict.themeSheetSubtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={dict.closeButton}
                  className="min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center border cursor-pointer shrink-0"
                  style={{
                    borderColor: `${activeTheme.goldStart}66`,
                    color: activeTheme.text,
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Controls Row: "Follow language" toggle + "Surprise me" button */}
              <div
                className="flex flex-wrap items-center justify-between gap-2.5 mb-4 px-3.5 py-2.5 rounded-2xl border"
                style={{
                  backgroundColor: `${activeTheme.base}B8`,
                  borderColor: `${activeTheme.goldStart}55`,
                }}
              >
                <label className="flex items-center gap-2.5 cursor-pointer select-none min-h-[36px]">
                  <input
                    type="checkbox"
                    data-testid="follow-language-toggle"
                    checked={followLanguage}
                    onChange={(e) => onToggleFollowLanguage(e.target.checked)}
                    className="w-4 h-4 accent-[#7A3E55] rounded cursor-pointer"
                  />
                  <span className="font-english text-xs font-medium" style={{ color: activeTheme.text }}>
                    Follow language
                  </span>
                </label>

                <button
                  type="button"
                  data-testid="surprise-me-button"
                  onClick={handleSurpriseMe}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-full font-english text-xs font-medium flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.button,
                    color: activeTheme.base,
                  }}
                >
                  <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Surprise me</span>
                </button>
              </div>

              {/* 2-Column Grid of All 16 Stylish Theme Cards (60ms stagger, scale 0.9 to 1) */}
              <div
                data-testid="theme-card-grid"
                className="grid grid-cols-2 gap-3.5 sm:gap-4 pt-2"
              >
                {allThemes.map((t, idx) => {
                  const isSelected = t.id === activeTheme.id;
                  return (
                    <motion.button
                      key={t.id}
                      type="button"
                      data-testid={`theme-card-${t.id}`}
                      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.28,
                        delay: prefersReducedMotion ? 0 : idx * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onPointerDown={() => handleCardPointerDown(t.id)}
                      onPointerUp={handleCardPointerEnd}
                      onPointerLeave={handleCardPointerEnd}
                      onPointerCancel={handleCardPointerEnd}
                      onClick={(e) => handleCardClick(t.id, e)}
                      aria-pressed={isSelected}
                      className="relative min-h-[160px] h-[164px] p-3.5 pt-6 rounded-2xl flex flex-col justify-between text-start transition-all cursor-pointer select-none overflow-visible"
                      style={{
                        background: `linear-gradient(135deg, ${t.base} 0%, ${t.tint1} 62%, ${t.tint2} 100%)`,
                        color: t.text,
                        border: isSelected
                          ? `2px solid ${t.button}`
                          : `1px solid ${t.goldStart}77`,
                        boxShadow: isSelected
                          ? `0 0 0 3px ${t.base}, 0 0 0 5px ${t.goldStart}, 0 12px 26px -6px ${t.button}55`
                          : '0 6px 18px -8px rgba(78, 47, 58, 0.14)',
                      }}
                    >
                      {/* Inner clipping layer for the swaying SVG flower bloom */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
                        <CardBackgroundBloomSvg bloomType={t.bloomType} theme={t} />
                      </div>

                      {/* Top-left 1 or 2 big emoji stickers (56px, rotated -8deg, soft drop-shadow, floating 3px) overlapping card edge */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-4 left-2 z-10 flex items-center -space-x-2 animate-emoji-sticker"
                        style={{
                          filter: 'drop-shadow(0 5px 8px rgba(42, 22, 30, 0.22))',
                        }}
                      >
                        <span className="text-[56px] leading-none select-none">
                          {t.emojis[0]}
                        </span>
                        {t.emojis[1] && (
                          <span className="text-[32px] leading-none select-none translate-y-1.5">
                            {t.emojis[1]}
                          </span>
                        )}
                      </div>

                      {/* Selected Check Badge + Tiny Petal Burst at Top-Right */}
                      {isSelected && (
                        <div
                          data-testid={`theme-selected-tick-${t.id}`}
                          className="absolute -top-2.5 -right-2 z-20 flex items-center justify-center"
                        >
                          {/* Tiny Petal Burst around the check badge */}
                          {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <span
                              key={deg}
                              aria-hidden="true"
                              className="absolute w-2 h-3 rounded-full"
                              style={{
                                backgroundColor: deg % 120 === 0 ? t.goldStart : t.accent,
                                transform: `rotate(${deg}deg) translateY(-12px)`,
                              }}
                            />
                          ))}
                          <span
                            className="relative w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-white/80"
                            style={{ backgroundColor: t.button, color: '#FFFDF9' }}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                        </div>
                      )}

                      {/* Top spacer so floating sticker has room */}
                      <div className="h-4" aria-hidden="true" />

                      {/* Theme Name in the theme's own font + Native-Script Name + Mood line in cursive */}
                      <div className="relative z-10 w-full min-w-0 my-auto pt-1">
                        <p
                          className="text-base sm:text-[17px] font-semibold leading-tight truncate"
                          style={{
                            fontFamily: `'${t.latinFont}', 'Cormorant Garamond', serif`,
                            color: t.text,
                          }}
                        >
                          {t.name}
                        </p>
                        <p
                          className="text-xs font-medium opacity-90 truncate mt-0.5 leading-snug"
                          style={{
                            fontFamily: NATIVE_SCRIPT_FONT_MAP[t.id],
                            color: t.button,
                          }}
                        >
                          {t.nativeName}
                        </p>
                        <p
                          className="text-[11px] italic opacity-85 truncate mt-1"
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            color: t.text,
                          }}
                        >
                          {t.mood}
                        </p>
                      </div>

                      {/* Bottom Row: 3 Petal-Shaped Colour Dots */}
                      <div className="relative z-10 w-full flex items-center justify-start pt-1.5">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          {[t.tint1, t.accent, t.button].map((swatchHex, sIdx) => (
                            <span
                              key={sIdx}
                              className="w-3.5 h-3.5 inline-block border border-black/15 shadow-2xs"
                              style={{
                                backgroundColor: swatchHex,
                                borderRadius: '75% 15% 75% 25% / 75% 25% 75% 15%',
                                transform: 'rotate(-18deg)',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
