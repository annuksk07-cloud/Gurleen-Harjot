import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Clock, MapPin, ArrowDown } from 'lucide-react';
import { WeddingConfig, WeddingEvent } from '../config';
import {
  formatEventEyebrow,
  splitEventDateParts,
  splitEventTimeParts,
  buildEventBlockGradient,
} from '../utils/weddingUtils';
import {
  formatLocalizedEventDateParts,
  formatLocalizedEventTime,
  getLanguageMeta,
  TranslationDictionary,
} from '../i18n/translations';
import {
  getParticleVisualSpec,
  getThemeEntranceMotion,
  getThemeEventPalette,
  THEMES,
  ThemeParticleType,
  WeddingTheme,
} from '../themes/themes';
import { formatPersonalisedLine } from '../utils/relativeMatching';
import { buildHostWhatsAppHref, getContactTranslations } from '../i18n/contactTranslations';

interface HamareUtsavSectionProps {
  config: WeddingConfig;
  langCode?: string;
  dict?: TranslationDictionary;
  theme?: WeddingTheme;
  guestDisplayName?: string | null;
  onDownloadCalendar: () => void;
}

interface BlockParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  vAngle: number;
  opacity: number;
  color: string;
  shape:
    | 'petal'
    | 'leaf'
    | 'sparkle'
    | 'rose'
    | 'dust'
    | 'mogra'
    | 'shiuli'
    | 'mango'
    | 'diya_rose'
    | 'jasmine_shimmer'
    | 'lotus';
}

function createParticles(
  count: number,
  width: number,
  height: number,
  particleType: ThemeParticleType,
  theme: WeddingTheme
): BlockParticle[] {
  const spec = getParticleVisualSpec(particleType, theme);
  const list: BlockParticle[] = [];
  for (let i = 0; i < count; i++) {
    const color = spec.colors[i % spec.colors.length];
    const isDustOrUp =
      spec.shape === 'dust' ||
      spec.motionMode === 'float_up' ||
      (spec.motionMode === 'rose_and_sparks_up' && i % 2 === 1);
    list.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: isDustOrUp ? -(0.22 + Math.random() * 0.28) : 0.28 + Math.random() * 0.42,
      size: spec.shape === 'dust' ? 2.2 + Math.random() * 2.5 : 5 + Math.random() * 4.5,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.02,
      opacity: 0.32 + Math.random() * 0.4,
      color,
      shape: spec.shape,
    });
  }
  return list;
}

/**
 * Clean 1.75px stroke hanger line icon for the Dress Code rail badge.
 */
const HangerLineIcon: React.FC<{ color: string; className?: string }> = ({
  color,
  className = 'w-[18px] h-[18px]',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 6a2.5 2.5 0 1 0-2.5-2.5" />
    <path d="M12 6v2" />
    <path d="M3.4 17.2 12 10.5l8.6 6.7A1.5 1.5 0 0 1 19.6 20H4.4a1.5 1.5 0 0 1-1-2.8Z" />
  </svg>
);

/**
 * 120px wide gold hairline with a small diamond in the middle, driven by active theme gold.
 */
const GoldDiamondHairline: React.FC<{
  goldStart?: string;
  goldEnd?: string;
  className?: string;
}> = ({ goldStart = '#C99A4B', goldEnd = '#F1D58A', className = '' }) => (
  <div
    aria-hidden="true"
    className={`flex items-center justify-center ${className}`}
    style={{ width: '120px' }}
  >
    <span
      className="flex-1 h-[1px]"
      style={{
        background: `linear-gradient(90deg, ${goldStart}26 0%, ${goldStart} 100%)`,
      }}
    />
    <span
      className="w-2 h-2 rotate-45 mx-2 shrink-0"
      style={{
        background: `linear-gradient(135deg, ${goldStart} 0%, ${goldEnd} 100%)`,
        border: `1px solid ${goldStart}`,
      }}
    />
    <span
      className="flex-1 h-[1px]"
      style={{
        background: `linear-gradient(90deg, ${goldStart} 0%, ${goldStart}26 100%)`,
      }}
    />
  </div>
);

interface EventBlockProps {
  event: WeddingEvent;
  index: number;
  langCode: string;
  dict?: TranslationDictionary;
  theme: WeddingTheme;
  prevBgTo: string;
  bgFrom: string;
  bgTo: string;
  nextBgFrom: string;
  accentColor: string;
  particleType: ThemeParticleType;
  swatchHexes: [string, string, string];
  openInMapsLabel: string;
  addToCalendarLabel: string;
  guestDisplayName?: string | null;
  config: WeddingConfig;
  onDownloadCalendar: () => void;
  prefersReducedMotion: boolean;
}

const EventBlock: React.FC<EventBlockProps> = ({
  event,
  index,
  langCode,
  dict,
  theme,
  prevBgTo,
  bgFrom,
  bgTo,
  nextBgFrom,
  accentColor,
  particleType,
  swatchHexes,
  openInMapsLabel,
  addToCalendarLabel,
  guestDisplayName = null,
  config,
  onDownloadCalendar,
  prefersReducedMotion,
}) => {
  const blockRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>(event.imageSrc);
  const [triedFallback, setTriedFallback] = useState<boolean>(false);
  const [imgFailed, setImgFailed] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(event.imageSrc);
    setTriedFallback(false);
    setImgFailed(false);
  }, [event.imageSrc]);

  const handleImageError = () => {
    if (!triedFallback && event.fallbackImageSrc) {
      setTriedFallback(true);
      setImgSrc(event.fallbackImageSrc);
    } else {
      setImgFailed(true);
    }
  };

  // Ghost word slow parallax (+/- 30px as the block scrolls)
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [30, -30]
  );

  // Canvas of at most 14 particles per block, running ONLY while the block is in view
  useEffect(() => {
    if (prefersReducedMotion) return;
    const blockEl = blockRef.current;
    const canvas = canvasRef.current;
    if (!blockEl || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let isVisible = false;
    let width = Math.max(320, blockEl.clientWidth);
    let height = Math.max(520, blockEl.clientHeight);
    canvas.width = width;
    canvas.height = height;

    const particles = createParticles(12, width, height, particleType, theme);

    const handleResize = () => {
      if (!blockEl || !canvas) return;
      width = Math.max(320, blockEl.clientWidth);
      height = Math.max(520, blockEl.clientHeight);
      canvas.width = width;
      canvas.height = height;
    };

    const renderFrame = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.angle) * 0.14;
        p.y += p.vy;
        p.angle += p.vAngle;

        if (p.vy > 0 && p.y > height + 16) {
          p.y = -12;
          p.x = Math.random() * width;
        } else if (p.vy < 0 && p.y < -16) {
          p.y = height + 12;
          p.x = Math.random() * width;
        }
        if (p.x < -16) p.x = width + 12;
        if (p.x > width + 16) p.x = -12;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'petal' || p.shape === 'rose' || p.shape === 'mogra') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.9, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'leaf' || p.shape === 'mango') {
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.75, 0, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.75, 0, 0, -p.size);
          ctx.fill();
        } else if (p.shape === 'sparkle') {
          const s = p.size * 0.85;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.32, -s * 0.32);
          ctx.lineTo(s, 0);
          ctx.lineTo(s * 0.32, s * 0.32);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.32, s * 0.32);
          ctx.lineTo(-s, 0);
          ctx.lineTo(-s * 0.32, -s * 0.32);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'shiuli') {
          ctx.fillStyle = '#FFFDF7';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#D9463E';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nowVisible = Boolean(entry && entry.isIntersecting);
        if (nowVisible && !isVisible) {
          isVisible = true;
          handleResize();
          rafId = window.requestAnimationFrame(renderFrame);
        } else if (!nowVisible && isVisible) {
          isVisible = false;
          if (rafId) {
            window.cancelAnimationFrame(rafId);
            rafId = 0;
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(blockEl);
    window.addEventListener('resize', handleResize);

    return () => {
      isVisible = false;
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [particleType, theme, prefersReducedMotion]);

  const langMeta = getLanguageMeta(langCode);
  const eventNum = index + 1;
  const eyebrowPrefix = dict?.eventEyebrowPrefix || 'EVENT';
  const eyebrowText =
    langCode === 'en'
      ? formatEventEyebrow(index)
      : `${eyebrowPrefix} ${String(eventNum).padStart(2, '0')}`;

  // Localized event fields from dictionary (index 0..4)
  const nativeTitleMap = [
    dict?.event1NativeTitle,
    dict?.event2NativeTitle,
    dict?.event3NativeTitle,
    dict?.event4NativeTitle,
    dict?.event5NativeTitle,
  ];
  const scriptTitleMap = [
    dict?.event1ScriptTitle,
    dict?.event2ScriptTitle,
    dict?.event3ScriptTitle,
    dict?.event4ScriptTitle,
    dict?.event5ScriptTitle,
  ];
  const timeSublineMap = [
    dict?.event1TimeSubline,
    dict?.event2TimeSubline,
    dict?.event3TimeSubline,
    dict?.event4TimeSubline,
    dict?.event5TimeSubline,
  ];
  const venueNameMap = [
    dict?.event1VenueName,
    dict?.event2VenueName,
    dict?.event3VenueName,
    dict?.event4VenueName,
    dict?.event5VenueName,
  ];
  const venueAddressMap = [
    dict?.event1VenueAddress,
    dict?.event2VenueAddress,
    dict?.event3VenueAddress,
    dict?.event4VenueAddress,
    dict?.event5VenueAddress,
  ];
  const dressCodeMap = [
    dict?.event1DressCode,
    dict?.event2DressCode,
    dict?.event3DressCode,
    dict?.event4DressCode,
    dict?.event5DressCode,
  ];
  const swatchNamesMap = [
    [dict?.event1Swatch1, dict?.event1Swatch2, dict?.event1Swatch3],
    [dict?.event2Swatch1, dict?.event2Swatch2, dict?.event2Swatch3],
    [dict?.event3Swatch1, dict?.event3Swatch2, dict?.event3Swatch3],
    [dict?.event4Swatch1, dict?.event4Swatch2, dict?.event4Swatch3],
    [dict?.event5Swatch1, dict?.event5Swatch2, dict?.event5Swatch3],
  ];

  const localizedNativeTitle = nativeTitleMap[index] || event.hindiTitle;
  const localizedScriptTitle = scriptTitleMap[index] || event.englishTitle;
  const ghostWord = localizedNativeTitle;

  // Date & time formatting using Intl.DateTimeFormat with the active language locale
  const fallbackDateParts = splitEventDateParts(event.date);
  const intlDateParts = event.isoStart
    ? formatLocalizedEventDateParts(event.isoStart, langMeta.locale)
    : null;

  const weekday =
    langCode === 'en'
      ? fallbackDateParts.weekday
      : intlDateParts?.weekday || fallbackDateParts.weekday;
  const dayNumber =
    langCode === 'en'
      ? fallbackDateParts.dayNumber
      : intlDateParts?.dayNumber || fallbackDateParts.dayNumber;
  const monthYear =
    langCode === 'en'
      ? fallbackDateParts.monthYear
      : intlDateParts?.monthYear || fallbackDateParts.monthYear;

  const fallbackTimeParts = splitEventTimeParts(event.time, event.timeSubline);
  const mainTime =
    langCode === 'en' || !event.isoStart
      ? fallbackTimeParts.mainTime
      : formatLocalizedEventTime(event.isoStart, langMeta.locale);
  const subline = timeSublineMap[index] || fallbackTimeParts.subline;

  const venueName = venueNameMap[index] || event.venueName;
  const venueAddress = venueAddressMap[index] || event.venueAddress;
  const cleanDressCodeText = (dressCodeMap[index] || event.dressCodeLine).replace(
    /^Dress\s*Code\s*:\s*/i,
    ''
  );

  // Desktop 2-column split: Events 2 and 4 (0-based index 1 and 3) mirror it with image on the right
  const isDesktopMirrored = index === 1 || index === 3;
  const easeCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const baseSwatches =
    event.dressCodeSwatches && event.dressCodeSwatches.length > 0
      ? event.dressCodeSwatches
      : event.dressCodeColors.map((hex, i) => ({
          name: `Shade 0${i + 1}`,
          hex,
        }));

  const swatches = baseSwatches.map((s, i) => ({
    name: swatchNamesMap[index]?.[i] || s.name,
    hex: theme.id === 'sarson_subah' ? s.hex : swatchHexes[i] || s.hex,
  }));

  return (
    <article
      ref={blockRef}
      data-testid={`utsav-block-${event.id}`}
      aria-label={`${localizedNativeTitle} — ${localizedScriptTitle}`}
      className="relative w-full theme-surface-transition"
      style={{
        background: buildEventBlockGradient(
          prevBgTo,
          bgFrom,
          bgTo,
          nextBgFrom,
          theme.base
        ),
      }}
    >
      {/* Static SVG Theme Pattern at ~6% opacity */}
      <div className="absolute inset-0 theme-pattern-overlay z-[0]" aria-hidden="true" />

      {/* Per-block Canvas of <= 14 particles running only when in view */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        />
      )}

      {/* Responsive Container */}
      <div
        className={`relative z-[2] w-full max-w-[720px] lg:max-w-[1120px] mx-auto px-4 sm:px-8 lg:px-10 py-[clamp(56px,8vw,88px)] flex flex-col items-center text-center lg:grid lg:gap-x-12 lg:items-center ${
          isDesktopMirrored
            ? 'lg:grid-cols-[45fr_55fr]'
            : 'lg:grid-cols-[55fr_45fr]'
        }`}
      >
        {/* =================================================================
            PART A: HEADER (Eyebrow, Native Name, Latin Script Name, Hairline)
        ================================================================= */}
        <div
          className={`order-1 w-full flex flex-col items-center text-center lg:items-start lg:text-start lg:row-start-1 lg:self-end ${
            isDesktopMirrored ? 'lg:col-start-1' : 'lg:col-start-2'
          }`}
        >
          {/* 1. Eyebrow */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0, ease: easeCurve }}
            className="font-english uppercase font-medium mb-2 min-h-[1rem]"
            style={{
              fontSize: '11px',
              letterSpacing: '0.25em',
              color: accentColor,
            }}
          >
            {eyebrowText}
          </motion.p>

          {/* 2. Native name, large */}
          <motion.h3
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease: easeCurve }}
            className="font-hindi-heading cream-text-glow leading-[1.28] relative z-[2] min-h-[3rem]"
            style={{
              fontSize: 'clamp(34px, 5.8vw, 44px)',
              color: theme.text,
            }}
          >
            {localizedNativeTitle}
          </motion.h3>

          {/* 3. Latin script name in Monsieur La Doulaise */}
          <motion.p
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 20, scale: 0.96, filter: 'blur(4px)' }
            }
            whileInView={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            }
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, delay: 0.2, ease: easeCurve }}
            className="font-couple leading-[1.2] relative z-[3] px-2 lg:px-0 select-none"
            style={{
              fontSize: 'clamp(50px, 8vw, 62px)',
              color: accentColor,
              marginTop: '-12px',
              textShadow: `0 2px 10px ${theme.base}E0`,
            }}
          >
            {localizedScriptTitle}
          </motion.p>

          {/* 4. Thin gold hairline with a small diamond in the middle, 120px wide (mobile & tablet) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.26, ease: easeCurve }}
            className="my-4 lg:hidden"
          >
            <GoldDiamondHairline goldStart={theme.goldStart} goldEnd={theme.goldEnd} />
          </motion.div>
        </div>

        {/* =================================================================
            PART B: IMAGE + GHOST WORD
        ================================================================= */}
        <div
          className={`order-2 relative w-full max-w-[460px] sm:max-w-[520px] lg:max-w-none mx-auto flex items-center justify-center mt-1 lg:mt-0 lg:row-start-1 lg:row-span-2 lg:self-center ${
            isDesktopMirrored ? 'lg:col-start-2' : 'lg:col-start-1'
          }`}
        >
          {/* Huge ghost word behind the image */}
          <motion.span
            aria-hidden="true"
            style={{
              y: ghostY,
              color: accentColor,
              opacity: 0.12,
              fontSize: 'clamp(100px, 26vw, 195px)',
            }}
            className="font-hindi-heading absolute inset-0 flex items-center justify-center pointer-events-none select-none leading-none whitespace-nowrap z-[1]"
          >
            {ghostWord}
          </motion.span>

          {/* Image wrapper: no background, no box-shadow, no backdrop-filter, no overflow clipping */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 40, scale: 0.94, filter: 'blur(6px)' }
            }
            whileInView={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            }
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: easeCurve }}
            className="relative z-[2] w-full"
          >
            {!imgFailed ? (
              <img
                src={imgSrc}
                alt={`${localizedNativeTitle} (${localizedScriptTitle}) illustration`}
                width={1122}
                height={1402}
                decoding="async"
                loading={index === 0 ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-full max-w-full h-auto aspect-[4/5] block object-contain mx-auto"
                style={{
                  filter: 'drop-shadow(0 18px 28px rgba(78, 47, 58, 0.18))',
                }}
              />
            ) : (
              <div
                role="img"
                aria-label={`${localizedScriptTitle} illustration placeholder`}
                className="w-full aspect-[4/5] mx-auto rounded-t-full rounded-b-3xl border flex flex-col items-center justify-center p-8 text-center"
                style={{ borderColor: `${theme.goldStart}80` }}
              >
                <p
                  className="font-hindi-heading text-3xl mb-2"
                  style={{ color: theme.text }}
                >
                  {localizedNativeTitle}
                </p>
                <p
                  className="font-couple text-4xl mb-2"
                  style={{ color: accentColor }}
                >
                  {localizedScriptTitle}
                </p>
                <p
                  className="font-english text-xs opacity-75"
                  style={{ color: theme.text }}
                >
                  4:5 Event Illustration Slot ({event.imageSrc})
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* =================================================================
            PART C: OPEN EVENT INFO LAYOUT (No box, no background, no border, no backdrop-filter)
        ================================================================= */}
        <div
          data-testid={`utsav-info-${event.id}`}
          className={`order-3 w-full mt-[8px] lg:mt-3 flex flex-col items-center text-center lg:items-start lg:text-start lg:row-start-2 lg:self-start ${
            isDesktopMirrored ? 'lg:col-start-1' : 'lg:col-start-2'
          }`}
          style={{ color: theme.text }}
        >
          {/* 1. Date block */}
          <div className="flex flex-col items-center lg:items-start">
            {guestDisplayName && (
              <p
                data-testid={`utsav-save-date-${event.id}`}
                className="font-heading-serif italic text-base sm:text-lg mb-2 font-medium"
                style={{ color: theme.button }}
              >
                {formatPersonalisedLine(
                  dict?.eventSaveTheDate_guest || '{guest}, save the date for the {event}',
                  guestDisplayName,
                  {
                    event: langCode === 'en' ? localizedScriptTitle : localizedNativeTitle,
                  }
                )}
              </p>
            )}
            {weekday && (
              <p
                className="font-english uppercase font-medium min-h-[1rem]"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.24em',
                  color: accentColor,
                }}
              >
                {weekday}
              </p>
            )}

            <p
              className="font-heading-serif italic font-semibold leading-[0.95] my-1 select-none"
              style={{
                fontSize: 'clamp(72px, 22vw, 120px)',
                color: accentColor,
              }}
            >
              {dayNumber}
            </p>

            {monthYear && (
              <p
                className="font-heading-serif italic font-medium min-h-[1.75rem]"
                style={{ fontSize: '22px', color: theme.text }}
              >
                {monthYear}
              </p>
            )}

            <GoldDiamondHairline
              goldStart={theme.goldStart}
              goldEnd={theme.goldEnd}
              className="my-5"
            />
          </div>

          {/* 2. Itinerary rail: width min(86%, 420px), logical properties for LTR & RTL */}
          <div
            className="relative mx-auto lg:mx-0 text-start my-2"
            style={{ width: 'min(86%, 420px)' }}
          >
            <div className="space-y-5 relative z-[2]">
              {/* Row 1: TIME */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0, ease: easeCurve }}
                className="relative flex items-start gap-4"
              >
                {/* 1px Gold Vertical Line Segment from Row 1 Badge Center down to Row 2 Badge Center */}
                <motion.span
                  aria-hidden="true"
                  initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: 0.05, ease: easeCurve }}
                  className="absolute start-[19.5px] top-[40px] -bottom-[20px] w-[1px] z-[1]"
                  style={{
                    backgroundColor: theme.goldStart,
                    transformOrigin: 'top',
                  }}
                />
                <div
                  className="relative z-[2] w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    border: `1px solid ${theme.goldStart}`,
                    backgroundColor: `${theme.base}99`,
                  }}
                >
                  <Clock
                    className="w-[18px] h-[18px]"
                    style={{ color: accentColor }}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p
                    className="font-english text-[11px] uppercase tracking-[0.2em] leading-tight"
                    style={{ color: theme.button }}
                  >
                    {dict?.labelTime || 'TIME'}
                  </p>
                  <p
                    className="font-english text-[15px] font-normal leading-snug mt-0.5"
                    style={{ color: theme.text }}
                  >
                    {mainTime}
                  </p>
                  {subline && (
                    <p
                      className="font-heading-serif italic text-[14px] opacity-85 leading-snug mt-0.5"
                      style={{ color: theme.text }}
                    >
                      {subline}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Row 2: VENUE */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.12, ease: easeCurve }}
                className="relative flex items-start gap-4"
              >
                {/* 1px Gold Vertical Line Segment from Row 2 Badge Center down to Row 3 Badge Center */}
                <motion.span
                  aria-hidden="true"
                  initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: 0.2, ease: easeCurve }}
                  className="absolute start-[19.5px] top-[40px] -bottom-[20px] w-[1px] z-[1]"
                  style={{
                    backgroundColor: theme.goldStart,
                    transformOrigin: 'top',
                  }}
                />
                <div
                  className="relative z-[2] w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    border: `1px solid ${theme.goldStart}`,
                    backgroundColor: `${theme.base}99`,
                  }}
                >
                  <MapPin
                    className="w-[18px] h-[18px]"
                    style={{ color: accentColor }}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p
                    className="font-english text-[11px] uppercase tracking-[0.2em] leading-tight"
                    style={{ color: theme.button }}
                  >
                    {dict?.labelVenue || 'VENUE'}
                  </p>
                  <p
                    className="font-english text-[15px] font-normal leading-snug mt-0.5"
                    style={{ color: theme.text }}
                  >
                    {venueName}
                  </p>
                  {venueAddress && (
                    <p
                      className="font-english text-[13px] opacity-80 leading-snug mt-0.5"
                      style={{ color: theme.text }}
                    >
                      {venueAddress}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Row 3: DRESS CODE */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.24, ease: easeCurve }}
                className="relative flex items-start gap-4"
              >
                <div
                  className="relative z-[2] w-[40px] h-[40px] rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    border: `1px solid ${theme.goldStart}`,
                    backgroundColor: `${theme.base}99`,
                  }}
                >
                  <HangerLineIcon color={accentColor} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p
                    className="font-english text-[11px] uppercase tracking-[0.2em] leading-tight"
                    style={{ color: theme.button }}
                  >
                    {dict?.labelDressCode || 'DRESS CODE'}
                  </p>
                  <p
                    className="font-english text-[15px] font-normal leading-snug mt-0.5"
                    style={{ color: theme.text }}
                  >
                    {cleanDressCodeText}
                  </p>

                  {/* 3 colour swatch circles (22px, hairline border), each with a tiny name under it */}
                  <div
                    className="flex items-start gap-4 mt-2.5"
                    aria-label={`Dress code palette for ${localizedScriptTitle}`}
                  >
                    {swatches.map((swatch, idx) => (
                      <div
                        key={`${event.id}-swatch-${idx}`}
                        className="flex flex-col items-center gap-1"
                      >
                        <span
                          className="w-[22px] h-[22px] rounded-full block"
                          style={{
                            backgroundColor: swatch.hex,
                            border: '1px solid rgba(78, 47, 58, 0.32)',
                          }}
                          title={`${swatch.name} (${swatch.hex})`}
                        />
                        <span
                          className="font-english text-[10px] leading-none opacity-85"
                          style={{ color: theme.text }}
                        >
                          {swatch.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 3. Buttons row: theme button "Open in Maps" and ghost button "+ Add to calendar" */}
          <div className="mt-6 w-full max-w-[420px] mx-auto lg:mx-0 flex flex-col min-[360px]:flex-row items-stretch min-[360px]:items-center gap-2.5 sm:gap-3">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${openInMapsLabel} for ${localizedScriptTitle}`}
              className="theme-btn flex-1 h-[48px] min-h-[48px] px-3 sm:px-4 rounded-full active:scale-[0.99] font-english text-[11px] sm:text-xs uppercase tracking-[0.09em] sm:tracking-[0.12em] flex items-center justify-center gap-1.5 whitespace-nowrap transition-transform"
              style={{
                backgroundColor: theme.button,
                color: theme.base,
              }}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{openInMapsLabel}</span>
            </a>

            <button
              type="button"
              onClick={onDownloadCalendar}
              aria-label={`${addToCalendarLabel} — ${localizedScriptTitle}`}
              className="theme-btn flex-1 h-[48px] min-h-[48px] px-3 sm:px-4 rounded-full bg-transparent active:scale-[0.99] font-english text-[11px] sm:text-xs uppercase tracking-[0.09em] sm:tracking-[0.12em] flex items-center justify-center whitespace-nowrap transition-colors cursor-pointer"
              style={{
                color: theme.button,
                border: `1px solid ${theme.button}`,
              }}
            >
              <span>{addToCalendarLabel}</span>
            </button>
          </div>

          {/* 4. Small text link "Ask about this event" opening WhatsApp */}
          <div className="mt-2 w-full max-w-[420px] mx-auto lg:mx-0 flex justify-center lg:justify-start">
            <a
              href={buildHostWhatsAppHref(
                `Hello, I have a question about the ${event.name?.en || event.englishTitle}`,
                config
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`utsav-ask-event-${event.id}`}
              aria-label={`${getContactTranslations(langCode).askAboutEvent} — ${localizedScriptTitle}`}
              className="min-h-[44px] px-3 py-2 inline-flex items-center justify-center gap-1.5 font-english text-xs underline underline-offset-4 opacity-90 hover:opacity-100 transition-opacity"
              style={{ color: theme.button }}
            >
              <span>{getContactTranslations(langCode).askAboutEvent}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export const HamareUtsavSection: React.FC<HamareUtsavSectionProps> = ({
  config,
  langCode = 'en',
  dict,
  theme = THEMES.sarson_subah,
  guestDisplayName = null,
  onDownloadCalendar,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const utsav = config.HAMARE_UTSAV;
  const events = config.EVENTS;

  // Compute each event's palette:
  // If theme is 'sarson_subah' ("Sarson Subah"), keep exact event colours from config;
  // otherwise rotate through tint1, tint2, tint3, and accent of the active theme.
  const blockPalettes = events.map((evt, idx) => {
    if (theme.id === 'sarson_subah') {
      return {
        bgFrom: evt.bgFrom,
        bgTo: evt.bgTo,
        accent: evt.accent,
        particleType: evt.particleType as ThemeParticleType,
        swatchHexes: [
          evt.dressCodeSwatches[0]?.hex || evt.dressCodeColors[0],
          evt.dressCodeSwatches[1]?.hex || evt.dressCodeColors[1],
          evt.dressCodeSwatches[2]?.hex || evt.dressCodeColors[2],
        ] as [string, string, string],
      };
    }
    return getThemeEventPalette(theme, idx);
  });

  const openInMapsLabel = dict?.openInMaps || utsav.openInMapsLabel;
  const addToCalendarLabel = dict?.addToCalendar || utsav.addToCalendarLabel;
  const introSubtitleText = guestDisplayName
    ? formatPersonalisedLine(
        dict?.utsavSubtitle_guest ||
          '{guest}, these are the celebrations we would love to share with you',
        guestDisplayName
      )
    : dict?.utsavSubtitle || utsav.subtitleLine;

  return (
    <section
      id="hamare-utsav-section"
      aria-labelledby="hamare-utsav-heading"
      className="relative w-full theme-surface-transition"
      style={{ backgroundColor: theme.base }}
    >
      {/* SECTION INTRO */}
      <div
        className="relative w-full px-6 pt-14 pb-6 text-center theme-surface-transition overflow-hidden"
        style={{ backgroundColor: theme.base }}
      >
        <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />
        <motion.div
          initial={getThemeEntranceMotion(theme, prefersReducedMotion).initial}
          whileInView={getThemeEntranceMotion(theme, prefersReducedMotion).whileInView}
          viewport={{ once: true, amount: 0.3 }}
          transition={getThemeEntranceMotion(theme, prefersReducedMotion).transition}
          className="relative z-10 max-w-[720px] lg:max-w-[1120px] mx-auto flex flex-col items-center"
        >
          <h2
            id="hamare-utsav-heading"
            className="font-hindi-heading cream-text-glow leading-tight min-h-[2.75rem]"
            style={{
              fontSize: 'clamp(34px, 5vw, 46px)',
              color: theme.text,
            }}
          >
            {dict?.utsavHeadingNative || utsav.headingHindi}
          </h2>
          {(dict?.utsavHeadingNative || utsav.headingHindi).trim().toLowerCase() !==
            (dict?.utsavHeadingScript || utsav.headingEnglish).trim().toLowerCase() && (
            <p
              className="font-couple leading-none -mt-2 mb-3 select-none"
              style={{
                fontSize: 'clamp(46px, 7vw, 60px)',
                color: theme.button,
                textShadow: `0 2px 10px ${theme.base}E6`,
              }}
            >
              {dict?.utsavHeadingScript || utsav.headingEnglish}
            </p>
          )}
          <p
            data-testid="utsav-intro-subtitle"
            className="font-heading-serif italic text-xl sm:text-2xl opacity-90 min-h-[1.75rem]"
            style={{ color: theme.text }}
          >
            {introSubtitleText}
          </p>
        </motion.div>
      </div>

      {/* 5 FULL-BLEED EVENT BLOCKS */}
      <div className="w-full">
        {events.map((event, idx) => {
          const currentPal = blockPalettes[idx];
          const prevBgTo = idx === 0 ? theme.base : blockPalettes[idx - 1].bgTo;
          const nextBgFrom =
            idx === events.length - 1 ? theme.base : blockPalettes[idx + 1].bgFrom;

          return (
            <EventBlock
              key={event.id}
              event={event}
              index={idx}
              langCode={langCode}
              dict={dict}
              theme={theme}
              prevBgTo={prevBgTo}
              bgFrom={currentPal.bgFrom}
              bgTo={currentPal.bgTo}
              nextBgFrom={nextBgFrom}
              accentColor={currentPal.accent}
              particleType={currentPal.particleType}
              swatchHexes={currentPal.swatchHexes}
              openInMapsLabel={openInMapsLabel}
              addToCalendarLabel={addToCalendarLabel}
              guestDisplayName={guestDisplayName}
              config={config}
              onDownloadCalendar={onDownloadCalendar}
              prefersReducedMotion={prefersReducedMotion}
            />
          );
        })}
      </div>

      {/* END OF SECTION */}
      <div
        className="w-full text-center px-6 pt-8 pb-12 flex flex-col items-center justify-center theme-surface-transition"
        style={{ backgroundColor: theme.base }}
      >
        <p
          className="font-hindi-heading text-xl sm:text-2xl cream-text-glow mb-2 min-h-[2rem]"
          style={{ color: theme.text }}
        >
          {dict?.utsavClosingLine || utsav.closingHindiLine}
        </p>
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border"
          style={{
            borderColor: `${theme.goldStart}80`,
            color: theme.button,
            backgroundColor: theme.base,
          }}
        >
          <ArrowDown className="w-4 h-4" />
        </span>
      </div>
    </section>
  );
};
