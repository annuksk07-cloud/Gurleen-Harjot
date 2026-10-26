import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WeddingConfig } from '../config';
import { computeKahaniMetrics, computeStopCardStyle } from '../utils/weddingUtils';
import { TranslationDictionary } from '../i18n/translations';
import { THEMES, WeddingTheme } from '../themes/themes';

interface HumariKahaniSectionProps {
  config: WeddingConfig;
  dict?: TranslationDictionary;
  theme?: WeddingTheme;
}

const SIX_CLOUDS = [
  { id: 1, top: '6%', left: '6%', width: 88, duration: 26, delay: 0 },
  { id: 2, top: '11%', left: '58%', width: 104, duration: 32, delay: 1.5 },
  { id: 3, top: '16%', left: '22%', width: 76, duration: 29, delay: 0.8 },
  { id: 4, top: '21%', left: '68%', width: 82, duration: 34, delay: 2.2 },
  { id: 5, top: '25%', left: '8%', width: 92, duration: 28, delay: 1.1 },
  { id: 6, top: '28%', left: '44%', width: 70, duration: 31, delay: 0.4 },
];

const SIX_HEARTS = [
  { id: 1, offsetX: -32, phase: 0.0, color: '#E8A598', size: 14 },
  { id: 2, offsetX: 28, phase: 0.16, color: '#C99A4B', size: 13 },
  { id: 3, offsetX: -16, phase: 0.33, color: '#F2CF7E', size: 15 },
  { id: 4, offsetX: 38, phase: 0.5, color: '#E8A598', size: 12 },
  { id: 5, offsetX: -24, phase: 0.66, color: '#C99A4B', size: 14 },
  { id: 6, offsetX: 14, phase: 0.83, color: '#E8A598', size: 13 },
];

// 8 extra small coral and gold hearts that rise once starting at r = 0.3
const EIGHT_EXTRA_HEARTS = [
  { id: 1, offsetX: -54, delay: 0.0, riseDist: 118, color: '#E8A598', size: 13 },
  { id: 2, offsetX: -36, delay: 0.05, riseDist: 134, color: '#C99A4B', size: 12 },
  { id: 3, offsetX: -18, delay: 0.09, riseDist: 126, color: '#F2CF7E', size: 14 },
  { id: 4, offsetX: -4, delay: 0.02, riseDist: 142, color: '#E8A598', size: 13 },
  { id: 5, offsetX: 12, delay: 0.07, riseDist: 128, color: '#C99A4B', size: 14 },
  { id: 6, offsetX: 28, delay: 0.04, riseDist: 136, color: '#E8A598', size: 12 },
  { id: 7, offsetX: 44, delay: 0.11, riseDist: 120, color: '#F2CF7E', size: 13 },
  { id: 8, offsetX: 58, delay: 0.06, riseDist: 130, color: '#C99A4B', size: 12 },
];

const TWELVE_ROAD_PETALS = [
  { id: 1, side: -1, baseY: 38, spreadX: 42, phase: 0.05, color: '#F2CF7E', rot: 25 },
  { id: 2, side: 1, baseY: 41, spreadX: 46, phase: 0.14, color: '#F9D8BC', rot: -30 },
  { id: 3, side: -1, baseY: 46, spreadX: 64, phase: 0.22, color: '#E8A598', rot: 40 },
  { id: 4, side: 1, baseY: 50, spreadX: 70, phase: 0.31, color: '#F2CF7E', rot: -20 },
  { id: 5, side: -1, baseY: 55, spreadX: 88, phase: 0.39, color: '#FFF8EC', rot: 15 },
  { id: 6, side: 1, baseY: 59, spreadX: 94, phase: 0.48, color: '#F9D8BC', rot: -45 },
  { id: 7, side: -1, baseY: 64, spreadX: 112, phase: 0.56, color: '#F2CF7E', rot: 35 },
  { id: 8, side: 1, baseY: 69, spreadX: 118, phase: 0.65, color: '#E8A598', rot: -25 },
  { id: 9, side: -1, baseY: 74, spreadX: 136, phase: 0.73, color: '#F9D8BC', rot: 50 },
  { id: 10, side: 1, baseY: 79, spreadX: 144, phase: 0.81, color: '#F2CF7E', rot: -35 },
  { id: 11, side: -1, baseY: 84, spreadX: 162, phase: 0.89, color: '#FFF8EC', rot: 20 },
  { id: 12, side: 1, baseY: 88, spreadX: 168, phase: 0.96, color: '#F2CF7E', rot: -15 },
];

interface LocalizedStop {
  id: string;
  progress: number;
  title: string;
  nativeSubtitle: string;
  caption: string;
  illustrationSrc: string;
  illustrationLabel: string;
}

interface StopCardOverlayProps {
  stop: LocalizedStop;
  theme: WeddingTheme;
  scrollYProgress: MotionValue<number>;
}

const StopCardOverlay: React.FC<StopCardOverlayProps> = ({
  stop,
  theme,
  scrollYProgress,
}) => {
  const [imgErr, setImgErr] = useState(false);
  const opacity = useTransform(scrollYProgress, (p) => {
    const q = Math.min(p / 0.86, 1);
    return computeStopCardStyle(q, stop.progress).opacity;
  });
  const y = useTransform(scrollYProgress, (p) => {
    const q = Math.min(p / 0.86, 1);
    return computeStopCardStyle(q, stop.progress).translateY;
  });
  const pointerEvents = useTransform(scrollYProgress, (p) => {
    const q = Math.min(p / 0.86, 1);
    return computeStopCardStyle(q, stop.progress).opacity > 0.15 ? 'auto' : 'none';
  });

  return (
    <motion.div
      style={{ opacity, y, pointerEvents, willChange: 'transform, opacity' }}
      className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-30 w-[88%] max-w-[340px] flex flex-col items-center"
    >
      {/* Empty 1:1 Slot Above the Card for an Illustration Later */}
      <div
        className="w-16 h-16 sm:w-18 sm:h-18 aspect-square rounded-2xl backdrop-blur-md shadow-xs mb-2 flex flex-col items-center justify-center overflow-hidden p-1.5"
        style={{
          border: `1px solid ${theme.goldStart}B3`,
          backgroundColor: `${theme.base}D9`,
        }}
      >
        {stop.illustrationSrc && !imgErr ? (
          <img
            src={stop.illustrationSrc}
            alt={stop.title}
            width={160}
            height={160}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImgErr(true)}
            className="w-full h-full object-contain"
          />
        ) : (
          <span
            className="font-english text-[9px] uppercase tracking-wider text-center leading-tight"
            style={{ color: theme.button }}
          >
            {stop.illustrationLabel}
          </span>
        )}
      </div>

      {/* Soft Glass Card */}
      <div className="w-full gold-glass-card rounded-3xl px-5 py-3.5 text-center">
        <div className="flex items-baseline justify-center gap-2 mb-1">
          <h3
            className="font-heading-serif italic text-2xl font-semibold"
            style={{ color: theme.text }}
          >
            {stop.title}
          </h3>
          <span aria-hidden="true" style={{ color: theme.goldStart }}>
            ·
          </span>
          <span className="font-hindi-heading text-base" style={{ color: theme.button }}>
            {stop.nativeSubtitle}
          </span>
        </div>
        <p
          className="font-english text-xs opacity-90 leading-relaxed"
          style={{ color: theme.text }}
        >
          {stop.caption}
        </p>
      </div>
    </motion.div>
  );
};

interface ParallaxPetalItemProps {
  petal: (typeof TWELVE_ROAD_PETALS)[number];
  easedProgress: MotionValue<number>;
}

const ParallaxPetalItem: React.FC<ParallaxPetalItemProps> = ({ petal, easedProgress }) => {
  const transform = useTransform(easedProgress, (e) => {
    const cycle = (e * 1.8 + petal.phase) % 1;
    const speedFactor = 0.35 + e * 1.45;
    const dx = petal.side * (18 + cycle * petal.spreadX * speedFactor);
    const dy = cycle * 140 * speedFactor;
    const rot = petal.rot + cycle * 95 * petal.side;
    const scale = 0.55 + cycle * 0.65;
    return `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg) scale(${scale.toFixed(2)})`;
  });

  const opacity = useTransform(easedProgress, (e) => {
    if (e < 0.02) return 0;
    const cycle = (e * 1.8 + petal.phase) % 1;
    return Math.sin(cycle * Math.PI) * 0.8;
  });

  return (
    <motion.div
      style={{
        top: `${petal.baseY}%`,
        left: '50%',
        transform,
        opacity,
        willChange: 'transform, opacity',
      }}
      className="absolute pointer-events-none z-15"
      aria-hidden="true"
    >
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
        <path
          d="M7 1 C11 4 12 11 7 17 C2 11 3 4 7 1 Z"
          fill={petal.color}
          stroke="#C99A4B"
          strokeWidth="0.6"
        />
      </svg>
    </motion.div>
  );
};

interface RisingHeartItemProps {
  heart: (typeof SIX_HEARTS)[number];
  scrollYProgress: MotionValue<number>;
}

const RisingHeartItem: React.FC<RisingHeartItemProps> = ({ heart, scrollYProgress }) => {
  const transform = useTransform(scrollYProgress, (p) => {
    const q = Math.min(p / 0.86, 1);
    const cycle = (q * 3.2 + heart.phase) % 1;
    const riseY = -cycle * 105;
    const swayX = heart.offsetX * 1.35 + Math.sin(cycle * Math.PI * 2) * 9;
    const scale = 0.75 + cycle * 0.45;
    return `translate3d(${swayX.toFixed(1)}px, ${riseY.toFixed(1)}px, 0) scale(${scale.toFixed(2)})`;
  });

  const opacity = useTransform(scrollYProgress, (p) => {
    const q = Math.min(p / 0.86, 1);
    if (q < 0.06) return 0;
    const cycle = (q * 3.2 + heart.phase) % 1;
    return Math.sin(cycle * Math.PI) * 0.85;
  });

  return (
    <motion.div
      style={{
        left: '50%',
        top: '24%',
        transform,
        opacity,
        willChange: 'transform, opacity',
      }}
      className="absolute pointer-events-none z-0"
      aria-hidden="true"
    >
      <svg
        width={heart.size}
        height={heart.size}
        viewBox="0 0 24 24"
        fill={heart.color}
        stroke="#FFF8EC"
        strokeWidth="1"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
};

interface ExtraBurstHeartItemProps {
  heart: (typeof EIGHT_EXTRA_HEARTS)[number];
  scrollYProgress: MotionValue<number>;
}

const ExtraBurstHeartItem: React.FC<ExtraBurstHeartItemProps> = ({ heart, scrollYProgress }) => {
  const transform = useTransform(scrollYProgress, (p) => {
    const m = computeKahaniMetrics(p);
    const localProgress = Math.min(
      1,
      Math.max(0, (m.extraHeartsProgress - heart.delay) / (1 - heart.delay))
    );
    const eased = 1 - Math.pow(1 - localProgress, 2.2);
    const riseY = -eased * heart.riseDist;
    const swayX = heart.offsetX + Math.sin(eased * Math.PI * 1.5) * 10;
    const scale = 0.65 + eased * 0.5;
    return `translate3d(${swayX.toFixed(1)}px, ${riseY.toFixed(1)}px, 0) scale(${scale.toFixed(2)})`;
  });

  const opacity = useTransform(scrollYProgress, (p) => {
    const m = computeKahaniMetrics(p);
    if (m.r < 0.3) return 0;
    const localProgress = Math.min(
      1,
      Math.max(0, (m.extraHeartsProgress - heart.delay) / (1 - heart.delay))
    );
    if (localProgress <= 0) return 0;
    return localProgress < 0.25
      ? localProgress / 0.25
      : Math.max(0.25, 1 - (localProgress - 0.25) * 0.85);
  });

  return (
    <motion.div
      style={{
        left: '50%',
        top: '20%',
        transform,
        opacity,
        willChange: 'transform, opacity',
      }}
      className="absolute pointer-events-none z-0"
      aria-hidden="true"
    >
      <svg
        width={heart.size}
        height={heart.size}
        viewBox="0 0 24 24"
        fill={heart.color}
        stroke="#FFF8EC"
        strokeWidth="1"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </motion.div>
  );
};

export const HumariKahaniSection: React.FC<HumariKahaniSectionProps> = ({
  config,
  dict,
  theme = THEMES.punjabi,
}) => {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [carSrc, setCarSrc] = useState<string>(config.CAR_SRC);
  const [carTriedFallback, setCarTriedFallback] = useState<boolean>(false);
  const [carFailed, setCarFailed] = useState<boolean>(!config.CAR_SRC && !config.CAR_FALLBACK_SRC);

  const [roadSrc, setRoadSrc] = useState<string>(config.ROAD_SRC);
  const [roadTriedFallback, setRoadTriedFallback] = useState<boolean>(false);
  const [roadFailed, setRoadFailed] = useState<boolean>(
    !config.ROAD_SRC && !config.ROAD_FALLBACK_SRC
  );

  const handleCarError = () => {
    if (!carTriedFallback && config.CAR_FALLBACK_SRC && carSrc !== config.CAR_FALLBACK_SRC) {
      setCarTriedFallback(true);
      setCarSrc(config.CAR_FALLBACK_SRC);
    } else {
      setCarFailed(true);
    }
  };

  const handleRoadError = () => {
    if (!roadTriedFallback && config.ROAD_FALLBACK_SRC && roadSrc !== config.ROAD_FALLBACK_SRC) {
      setRoadTriedFallback(true);
      setRoadSrc(config.ROAD_FALLBACK_SRC);
    } else {
      setRoadFailed(true);
    }
  };

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const easedProgress = useTransform(scrollYProgress, (p) => {
    const m = computeKahaniMetrics(p);
    return m.e + 0.03 * m.rEase;
  });

  const bgExtraTransform = useTransform(scrollYProgress, (p) => {
    const m = computeKahaniMetrics(p);
    return `scale(${m.bgExtraScale.toFixed(4)})`;
  });

  const roadExtraTransform = useTransform(scrollYProgress, (p) => {
    const m = computeKahaniMetrics(p);
    return `translate3d(0, ${m.roadExtraTranslateYSvh.toFixed(3)}svh, 0) scale(${m.roadExtraScale.toFixed(4)})`;
  });

  const carTransform = useTransform(scrollYProgress, (p) => {
    const m = computeKahaniMetrics(p);
    return `translate3d(-50%, calc(${m.carTranslateYSvh.toFixed(3)}svh + ${m.bobY.toFixed(2)}px), 0) scale(${m.carScale.toFixed(4)}) rotate(${m.bobRotateDeg.toFixed(3)}deg)`;
  });

  const shadowTransform = useTransform(scrollYProgress, (p) => {
    const m = computeKahaniMetrics(p);
    return `translate3d(-50%, 0, 0) scale(${m.shadowScale.toFixed(4)})`;
  });

  const carOpacity = useTransform(scrollYProgress, (p) => computeKahaniMetrics(p).carOpacity);
  const introOpacity = useTransform(scrollYProgress, (p) => computeKahaniMetrics(p).introOpacity);
  const introY = useTransform(scrollYProgress, (p) => {
    const q = Math.min(p / 0.86, 1);
    const clamped = Math.min(0.1, Math.max(0, q));
    return -(clamped / 0.1) * 14;
  });

  const outroOpacity = useTransform(scrollYProgress, (p) => computeKahaniMetrics(p).outroOpacity);
  const outroY = useTransform(scrollYProgress, (p) => {
    const q = Math.min(p / 0.86, 1);
    if (q < 0.92) return 14;
    const ratio = Math.min(1, (q - 0.92) / 0.06);
    return (1 - ratio) * 14;
  });

  const kahani = config.HUMARI_KAHANI;

  const localizedStops: LocalizedStop[] = [
    {
      ...kahani.stops[0],
      title: dict?.stop1Title || kahani.stops[0].title,
      nativeSubtitle: dict?.stop1Native || kahani.stops[0].hindiSubtitle,
      caption: dict?.stop1Caption || kahani.stops[0].caption,
    },
    {
      ...kahani.stops[1],
      title: dict?.stop2Title || kahani.stops[1].title,
      nativeSubtitle: dict?.stop2Native || kahani.stops[1].hindiSubtitle,
      caption: dict?.stop2Caption || kahani.stops[1].caption,
    },
    {
      ...kahani.stops[2],
      title: dict?.stop3Title || kahani.stops[2].title,
      nativeSubtitle: dict?.stop3Native || kahani.stops[2].hindiSubtitle,
      caption: dict?.stop3Caption || kahani.stops[2].caption,
    },
    {
      ...kahani.stops[3],
      title: dict?.stop4Title || kahani.stops[3].title,
      nativeSubtitle: dict?.stop4Native || kahani.stops[3].hindiSubtitle,
      caption: dict?.stop4Caption || kahani.stops[3].caption,
    },
  ];

  const headingNative = dict?.kahaniHeadingNative || kahani.headingHindi;
  const headingScript = dict?.kahaniHeadingScript || kahani.headingEnglish;
  const closingLine = dict?.kahaniClosingLine || kahani.closingHindiLine;

  if (prefersReducedMotion) {
    const staticMetrics = computeKahaniMetrics(0.7);

    return (
      <section
        id="humari-kahani-section"
        aria-labelledby="humari-kahani-heading"
        className="relative w-full overflow-hidden py-12 px-5 theme-surface-transition"
        style={{
          background: `linear-gradient(180deg, ${theme.base} 0%, ${theme.tint1} 28%, ${theme.tint3} 52%, ${theme.tint2} 78%, ${theme.goldEnd} 100%)`,
        }}
      >
        <div className="max-w-[420px] mx-auto text-center mb-8">
          {headingNative.trim().toLowerCase() !== headingScript.trim().toLowerCase() && (
            <p
              className="font-hindi-heading text-xl cream-text-glow mb-1"
              style={{ color: theme.button }}
            >
              {headingNative}
            </p>
          )}
          <h2
            id="humari-kahani-heading"
            className="font-couple text-5xl cream-text-glow font-normal"
            style={{ color: theme.text }}
          >
            {headingScript}
          </h2>
        </div>

        <div className="max-w-[380px] mx-auto space-y-4 mb-8">
          {localizedStops.map((stop) => (
            <div key={stop.id} className="gold-glass-card rounded-3xl p-4 flex items-center gap-3.5">
              <div
                className="w-14 h-14 aspect-square shrink-0 rounded-2xl flex items-center justify-center p-1.5 text-center"
                style={{
                  border: `1px solid ${theme.goldStart}99`,
                  backgroundColor: `${theme.base}D9`,
                }}
              >
                <span
                  className="font-english text-[9px] uppercase tracking-wider"
                  style={{ color: theme.button }}
                >
                  {stop.illustrationLabel}
                </span>
              </div>
              <div className="text-start">
                <div className="flex items-baseline gap-2">
                  <h3
                    className="font-heading-serif italic text-xl font-semibold"
                    style={{ color: theme.text }}
                  >
                    {stop.title}
                  </h3>
                  <span className="font-hindi-heading text-sm" style={{ color: theme.button }}>
                    {stop.nativeSubtitle}
                  </span>
                </div>
                <p className="font-english text-xs opacity-90 mt-0.5" style={{ color: theme.text }}>
                  {stop.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="relative w-full h-[360px] rounded-3xl overflow-hidden mb-8"
          style={{ border: `1px solid ${theme.goldStart}73` }}
        >
          <div
            className="absolute inset-x-0 top-0 h-[34%]"
            style={{
              background: `linear-gradient(180deg, ${theme.base} 0%, ${theme.tint1} 52%, ${theme.tint3} 82%, ${theme.goldEnd} 100%)`,
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[66%]"
            style={{
              background: `linear-gradient(180deg, ${theme.goldEnd} 0%, ${theme.tint2} 48%, ${theme.goldEnd} 100%)`,
            }}
          />
          {!roadFailed ? (
            <img
              src={roadSrc}
              alt="Perspective wedding journey road"
              width={1024}
              height={1536}
              decoding="async"
              referrerPolicy="no-referrer"
              onError={handleRoadError}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[66%] w-auto object-contain object-bottom"
            />
          ) : (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[66%] w-48 rounded-t-3xl border border-dashed border-[#C99A4B] bg-[#FFF8EC]/70 flex items-center justify-center p-3 text-center">
              <span className="font-english text-xs text-[#4E2F3A]">Road Placeholder</span>
            </div>
          )}

          <div
            style={{
              bottom: '10%',
              left: '50%',
              width: '60%',
              transformOrigin: 'bottom center',
              transform: `translate3d(-50%, 0, 0) scale(${staticMetrics.carScale.toFixed(3)})`,
            }}
            className="absolute z-20 flex flex-col items-center"
          >
            {!carFailed ? (
              <img
                src={carSrc}
                alt="Gurleen and Harjot in vintage wedding car"
                width={1024}
                height={1536}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={handleCarError}
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="w-full aspect-[2/3] rounded-3xl border border-[#C99A4B] bg-[#FFF8EC]/90 flex items-center justify-center p-4 text-center">
                <span className="font-english text-xs text-[#4E2F3A]">Car Placeholder</span>
              </div>
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="font-hindi-heading text-xl cream-text-glow" style={{ color: theme.button }}>
            {closingLine}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={wrapperRef}
      id="humari-kahani-section"
      aria-label="Humari Kahani — Scroll-driven wedding journey"
      className="relative w-full h-[520svh]"
    >
      {/* Full-bleed Sticky 100svh Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-[100svh] max-h-[100svh] overflow-hidden select-none">
        {/* LAYER 1 & 2 WRAPPER: FULL-BLEED SKY & GROUND */}
        <motion.div
          style={{
            transform: bgExtraTransform,
            transformOrigin: '50% 34%',
            willChange: 'transform',
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          {/* LAYER 1: SKY */}
          <div
            className="absolute inset-x-0 top-0 h-[36%] overflow-hidden theme-surface-transition"
            style={{
              background: `linear-gradient(180deg, ${theme.base} 0%, ${theme.tint1} 46%, ${theme.tint3} 80%, ${theme.goldEnd} 100%)`,
            }}
          >
            {/* Marigold Horizon Sun Glow at ~34% from top */}
            <div
              className="absolute left-1/2 -bottom-12 -translate-x-1/2 w-[90%] max-w-[900px] h-28 rounded-full blur-2xl opacity-85"
              style={{
                background: `radial-gradient(circle, ${theme.goldEnd} 0%, transparent 72%)`,
              }}
            />

            {/* 6 Slow Drifting SVG Clouds */}
            {SIX_CLOUDS.map((cloud) => (
              <motion.svg
                key={cloud.id}
                viewBox="0 0 120 44"
                fill="none"
                style={{
                  top: cloud.top,
                  left: cloud.left,
                  width: `${cloud.width}px`,
                  willChange: 'transform',
                }}
                animate={{ x: [0, 18, -10, 0] }}
                transition={{
                  duration: cloud.duration,
                  delay: cloud.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute opacity-75 pointer-events-none"
              >
                <path
                  d="M22 34 H96 C105 34 112 28 112 20 C112 13 106 8 98 8 C95 8 92 9 90 11 C86 4 78 0 68 0 C56 0 46 8 44 18 C41 16 37 15 33 15 C23 15 15 22 15 30 C15 32 18 34 22 34 Z"
                  fill={theme.base}
                  fillOpacity="0.82"
                />
              </motion.svg>
            ))}
          </div>

          {/* LAYER 2: GROUND */}
          <div
            className="absolute inset-x-0 bottom-0 h-[66%] overflow-hidden theme-surface-transition"
            style={{
              background: `linear-gradient(180deg, ${theme.goldEnd} 0%, ${theme.tint2} 45%, ${theme.goldEnd} 100%)`,
            }}
          >
            {/* Soft Horizon Mist Seam Blending Sky & Ground at 34% from top */}
            <div
              className="absolute inset-x-0 top-0 h-10"
              style={{
                background: `linear-gradient(180deg, ${theme.goldEnd}E6 0%, transparent 100%)`,
              }}
            />
          </div>
        </motion.div>

        {/* CENTERED 9:16 STAGE */}
        <div
          data-testid="kahani-9-16-stage"
          className="relative z-10 mx-auto h-[100svh] max-h-[100svh] w-full sm:w-auto sm:aspect-[9/16] max-w-full"
        >
          {/* LAYER 3: ROAD */}
          <motion.div
            style={{
              transform: roadExtraTransform,
              transformOrigin: '50% 0%',
              willChange: 'transform',
            }}
            className="absolute inset-x-0 bottom-0 h-[66svh] flex items-end justify-center pointer-events-none z-10"
          >
            {!roadFailed ? (
              <img
                src={roadSrc}
                alt="One-point perspective road"
                width={1024}
                height={1536}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={handleRoadError}
                className="h-full w-auto max-w-none object-contain object-bottom select-none"
              />
            ) : (
              <div
                data-testid="road-placeholder-box"
                className="h-full w-56 rounded-t-3xl border border-dashed border-[#C99A4B] bg-[#FFF8EC]/75 flex items-center justify-center p-4 text-center"
              >
                <span className="font-english text-xs text-[#4E2F3A]">
                  Road Illustration Placeholder ({config.ROAD_SRC})
                </span>
              </div>
            )}
          </motion.div>

          {/* 12 Parallax Petals Drifting Outward & Downward Along Road Edges */}
          {TWELVE_ROAD_PETALS.map((petal) => (
            <ParallaxPetalItem key={petal.id} petal={petal} easedProgress={easedProgress} />
          ))}

          {/* LAYER 4: CAR */}
          <motion.div
            data-testid="kahani-car-wrapper"
            style={{
              bottom: '10%',
              left: '50%',
              width: '60%',
              transformOrigin: 'bottom center',
              transform: carTransform,
              opacity: carOpacity,
              willChange: 'transform, opacity',
            }}
            className="absolute z-20 pointer-events-none flex flex-col items-center"
          >
            {SIX_HEARTS.map((heart) => (
              <RisingHeartItem key={heart.id} heart={heart} scrollYProgress={scrollYProgress} />
            ))}

            {EIGHT_EXTRA_HEARTS.map((heart) => (
              <ExtraBurstHeartItem
                key={`extra-${heart.id}`}
                heart={heart}
                scrollYProgress={scrollYProgress}
              />
            ))}

            {/* Soft Elliptical Shadow Under the Car */}
            <motion.div
              aria-hidden="true"
              className="absolute bottom-[6.2%] left-1/2 w-[88%] h-7 rounded-full pointer-events-none z-0"
              style={{
                transform: shadowTransform,
                willChange: 'transform',
                background:
                  'radial-gradient(ellipse at center, rgba(78, 47, 58, 0.48) 0%, rgba(78, 47, 58, 0.22) 52%, rgba(78, 47, 58, 0) 76%)',
              }}
            />

            {/* Car Image or Labelled Placeholder Box */}
            {!carFailed ? (
              <img
                src={carSrc}
                alt="Gurleen and Harjot driving toward the wedding celebration"
                width={1024}
                height={1536}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={handleCarError}
                className="relative z-10 w-full h-auto max-w-full object-contain select-none"
              />
            ) : (
              <div
                data-testid="car-placeholder-box"
                className="relative z-10 w-full aspect-[2/3] rounded-3xl border border-[#C99A4B] bg-[#FFF8EC]/90 flex flex-col items-center justify-center p-4 text-center shadow-sm"
              >
                <span className="font-heading-serif italic text-lg text-[#4E2F3A]">
                  Wedding Car Slot
                </span>
                <span className="font-english text-[11px] text-[#7A3E55] mt-1">
                  {config.CAR_SRC}
                </span>
              </div>
            )}
          </motion.div>

          {/* 1. At q < 0.1: Heading */}
          <motion.div
            style={{
              opacity: introOpacity,
              y: introY,
              willChange: 'transform, opacity',
            }}
            className="absolute top-7 sm:top-9 inset-x-0 z-30 flex flex-col items-center text-center px-6 pointer-events-none"
          >
            {headingNative.trim().toLowerCase() !== headingScript.trim().toLowerCase() && (
              <p
                className="font-hindi-heading text-xl sm:text-2xl cream-text-glow mb-1"
                style={{ color: theme.button }}
              >
                {headingNative}
              </p>
            )}
            <h2
              className="font-couple leading-tight cream-text-glow font-normal"
              style={{
                fontSize: 'clamp(2.75rem, 8vw, 3.5rem)',
                color: theme.text,
              }}
            >
              {headingScript}
            </h2>
          </motion.div>

          {/* 2. Four Stops at q = 0.2, 0.4, 0.6, 0.8 */}
          {localizedStops.map((stop) => (
            <StopCardOverlay
              key={stop.id}
              stop={stop}
              theme={theme}
              scrollYProgress={scrollYProgress}
            />
          ))}

          {/* 3. At q >= 0.92: Closing invitation prompt + down arrow */}
          <motion.div
            style={{
              opacity: outroOpacity,
              y: outroY,
              willChange: 'transform, opacity',
            }}
            className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-[360px] pointer-events-none"
          >
            <div className="gold-glass-card rounded-3xl px-5 py-3.5 text-center flex flex-col items-center">
              <p
                className="font-hindi-heading text-xl sm:text-2xl cream-text-glow leading-snug"
                style={{ color: theme.button }}
              >
                {closingLine}
              </p>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="mt-1.5 w-7 h-7 rounded-full flex items-center justify-center shadow-xs"
                style={{
                  border: `1px solid ${theme.goldStart}99`,
                  backgroundColor: `${theme.base}D9`,
                }}
                aria-hidden="true"
              >
                <ChevronDown className="w-4 h-4" style={{ color: theme.button }} />
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
