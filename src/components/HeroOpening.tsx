import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Globe, Heart, Pencil } from 'lucide-react';
import { WeddingConfig } from '../config';
import { FallingPetalsCanvas } from './FallingPetalsCanvas';
import { ambientAudio } from '../utils/ambientAudio';
import {
  getLanguageMeta,
  TranslationDictionary,
} from '../i18n/translations';
import { THEMES, WeddingTheme } from '../themes/themes';
import { getGuestDisplayName } from '../utils/relativeMatching';

interface HeroOpeningProps {
  config: WeddingConfig;
  langCode: string;
  activeNativeName: string;
  dict: TranslationDictionary;
  theme: WeddingTheme;
  isMuted?: boolean;
  savedName?: string | null;
  hasSkippedWelcome?: boolean;
  onOpenYourNote?: () => void;
  onChangeName?: () => void;
  onOpenLanguageSheet: () => void;
  onOpenInvitation?: () => void;
  onRevealComplete?: () => void;
  onScrollToInvite: () => void;
}

interface GuestNamePlateProps {
  guestDisplayName: string;
  plateLabel: string;
  langCode: string;
  delay?: number;
  onClick?: () => void;
}

const GuestNamePlate: React.FC<GuestNamePlateProps> = ({
  guestDisplayName,
  plateLabel,
  langCode,
  delay = 0,
  onClick,
}) => {
  const isDevanagari = langCode === 'hi' || langCode === 'mr' || langCode === 'bho';
  const hasNonLatinChars = /[^\u0000-\u007F]/.test(guestDisplayName);

  const nameFontFamily = !hasNonLatinChars
    ? "'Monsieur La Doulaise', 'Great Vibes', cursive"
    : isDevanagari
      ? "'Amita', var(--font-active-script), serif"
      : 'var(--font-active-script), serif';

  return (
    <motion.button
      type="button"
      data-testid="hero-guest-name-plate"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: 'min(86%, 360px)',
        backgroundColor: 'rgba(255, 248, 236, 0.88)',
        border: '1px solid rgba(201, 154, 75, 0.78)',
        boxShadow: '0 8px 26px rgba(62, 36, 48, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
      }}
      className="relative overflow-hidden rounded-full px-4 py-2.5 backdrop-blur-md flex items-center justify-between gap-3 cursor-pointer active:scale-[0.98] transition-transform mx-auto"
      aria-label={`${plateLabel} ${guestDisplayName}`}
    >
      {/* Soft shimmer sweep every 6s */}
      <motion.span
        aria-hidden="true"
        initial={{ x: '-140%' }}
        animate={{ x: ['-140%', '220%'] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 4.2,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,248,236,0) 0%, rgba(241,213,138,0.45) 50%, rgba(255,248,236,0) 100%)',
        }}
      />

      {/* Small wax-seal heart icon on the left */}
      <span
        aria-hidden="true"
        className="relative z-10 w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-xs"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #9E4758 0%, #6D2938 100%)',
          border: '1px solid #D4A853',
        }}
      >
        <Heart className="w-3.5 h-3.5 fill-[#FFF8EC] text-[#FFF8EC]" />
      </span>

      {/* Center: Small caps label + Guest Name in display font at 28px */}
      <span className="relative z-10 flex-1 min-w-0 flex flex-col items-center text-center leading-tight">
        <span
          data-testid="hero-guest-name-plate-label"
          className="font-english uppercase font-semibold block"
          style={{
            fontSize: '13px',
            letterSpacing: langCode === 'en' ? '0.18em' : '0.04em',
            color: '#9A6A22',
          }}
        >
          {plateLabel}
        </span>
        <motion.span
          key={guestDisplayName}
          initial={{ clipPath: 'inset(-25% 100% -25% 0%)', opacity: 0.4 }}
          animate={{ clipPath: 'inset(-25% 0% -25% 0%)', opacity: 1 }}
          transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
          className="block truncate w-full py-1"
          style={{
            fontFamily: nameFontFamily,
            fontSize: '28px',
            fontWeight: hasNonLatinChars ? 700 : 400,
            color: '#3E2430',
            lineHeight: hasNonLatinChars ? 1.35 : 1.2,
          }}
        >
          {guestDisplayName}
        </motion.span>
      </span>

      {/* Tiny pencil icon on the right */}
      <span
        aria-hidden="true"
        className="relative z-10 w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
        style={{
          color: '#9A6A22',
          backgroundColor: 'rgba(212, 168, 83, 0.14)',
        }}
      >
        <Pencil className="w-3.5 h-3.5" />
      </span>
    </motion.button>
  );
};

export const HeroOpening: React.FC<HeroOpeningProps> = ({
  config,
  langCode,
  activeNativeName,
  dict,
  theme = THEMES.sarson_subah,
  isMuted = false,
  savedName = null,
  onChangeName,
  onOpenLanguageSheet,
  onOpenInvitation,
  onRevealComplete,
  onScrollToInvite,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const backdropVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isOpened, setIsOpened] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  const [isRevealed, setIsRevealed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  const [videoFailed, setVideoFailed] = useState<boolean>(!config.VIDEO_SRC);

  const hasValidVideo = Boolean(config.VIDEO_SRC) && !videoFailed;
  const langMeta = getLanguageMeta(langCode);
  const coupleDisplayName =
    (langCode !== 'en' && config.namesByLang?.[langCode]) || config.COUPLE_DISPLAY_NAMES;
  const usesLatinCoupleFont = langCode === 'en' || !config.namesByLang?.[langCode];
  const isDevanagariScript = langCode === 'hi' || langCode === 'mr' || langCode === 'bho';

  const coupleFontFamily = usesLatinCoupleFont
    ? "'Monsieur La Doulaise', 'Great Vibes', cursive"
    : isDevanagariScript
      ? "'Amita', var(--font-active-script), serif"
      : `var(--font-active-script), '${langMeta.googleFontFamily || 'Cormorant Garamond'}', serif`;

  const guestDisplayName = getGuestDisplayName(savedName, langCode);
  const invitationForLabel =
    dict.heroInvitationForLabel || (langCode === 'hi' ? 'आपके लिए निमंत्रण' : 'INVITATION FOR');
  const welcomeLabel = dict.heroWelcomeLabel || (langCode === 'hi' ? 'स्वागत है' : 'WELCOME');
  const heroTaglineText = dict.heroTagline || 'Two hearts, one golden morning';

  useEffect(() => {
    setVideoFailed(!config.VIDEO_SRC);
  }, [config.VIDEO_SRC]);

  useEffect(() => {
    if (isOpened && isRevealed) {
      onRevealComplete?.();
      window.dispatchEvent(new CustomEvent('sarson-subah:hero-revealed'));
    }
  }, [isOpened, isRevealed, onRevealComplete]);

  // Listen for "Reset demo" event to return cleanly to Stage A
  useEffect(() => {
    const handleResetHero = () => {
      setIsOpened(false);
      setIsRevealed(false);
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.pause();
        try {
          videoEl.currentTime = 0.001;
        } catch {
          // Ignore seek error
        }
      }
    };
    window.addEventListener('sarson-subah:reset-hero', handleResetHero);
    return () => window.removeEventListener('sarson-subah:reset-hero', handleResetHero);
  }, []);

  // Sync video muted state if toggled via BottomDock
  useEffect(() => {
    if (videoRef.current && isOpened) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, isOpened]);

  // Keep ambientAudio theme synced whenever theme changes
  useEffect(() => {
    const themeTrack = config.THEME_AUDIO_TRACKS?.[theme.id] || config.AUDIO_SRC || '';
    ambientAudio.setTheme(theme.id, themeTrack);
  }, [theme.id, config.THEME_AUDIO_TRACKS, config.AUDIO_SRC]);

  // Ensure the video and backdrop poster video are paused on their first frame (closed envelope) on load
  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl && !isOpened) {
      videoEl.pause();
      try {
        if (videoEl.currentTime === 0) {
          videoEl.currentTime = 0.001;
        }
      } catch {
        // Ignore seek before metadata ready
      }
    }

    const bgVideoEl = backdropVideoRef.current;
    if (bgVideoEl) {
      bgVideoEl.pause();
      try {
        if (bgVideoEl.currentTime === 0) {
          bgVideoEl.currentTime = 0.001;
        }
      } catch {
        // Ignore seek before metadata ready
      }
    }
  }, [isOpened, config.VIDEO_SRC]);

  const startExperience = () => {
    if (isOpened) return;
    setIsOpened(true);
    onOpenInvitation?.();

    // Start background music for the active theme
    const themeTrack = config.THEME_AUDIO_TRACKS?.[theme.id] || config.AUDIO_SRC || '';
    ambientAudio.start(theme.id, themeTrack);
    ambientAudio.setMuted(isMuted);

    // Play the 9:16 envelope video with sound from frame 0
    const videoEl = videoRef.current;
    if (hasValidVideo && videoEl) {
      try {
        videoEl.currentTime = 0;
      } catch {
        // Ignore if not seekable
      }
      videoEl.muted = isMuted;
      videoEl.volume = 1.0;

      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser blocks unmuted video, retry muted so video still plays smoothly
          videoEl.muted = true;
          videoEl.play().catch(() => {
            setVideoFailed(true);
            setIsRevealed(true);
          });
        });
      }
    } else {
      window.setTimeout(() => {
        setIsRevealed(true);
      }, 400);
    }
  };

  // 10s failsafe timer to reveal Stage B if video fails to end, play, or load
  useEffect(() => {
    if (!isOpened || isRevealed) return;

    const failsafeMs = hasValidVideo ? 10000 : 400;
    const timer = window.setTimeout(() => {
      setIsRevealed(true);
    }, failsafeMs);

    return () => window.clearTimeout(timer);
  }, [isOpened, isRevealed, hasValidVideo]);

  return (
    <section
      aria-label="Opening Wedding Invitation Hero"
      className="relative w-full h-[100svh] min-h-[100svh] max-h-[100svh] overflow-hidden flex items-center justify-center select-none theme-surface-transition"
      style={{
        background: `linear-gradient(165deg, ${theme.base} 0%, ${theme.tint1} 38%, ${theme.goldEnd} 72%, ${theme.tint3} 100%)`,
      }}
    >
      {/* Tablet & Desktop Side Fill: Heavily blurred, scaled copy of the video's poster frame (blur 40px) over active theme gradient */}
      {hasValidVideo && (
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none z-0"
        >
          <video
            ref={backdropVideoRef}
            src={config.VIDEO_SRC || undefined}
            poster={config.POSTER_SRC || undefined}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            onLoadedMetadata={(e) => {
              e.currentTarget.pause();
              try {
                if (e.currentTarget.currentTime === 0) {
                  e.currentTarget.currentTime = 0.001;
                }
              } catch {
                // Ignore seek error
              }
            }}
            className="w-full h-full object-cover opacity-85"
            style={{
              filter: 'blur(40px)',
              transform: 'scale(1.22)',
            }}
          />
        </div>
      )}

      {/* Centered 9:16 Video Frame at 100svh height (never stretched or cropped) */}
      <div
        data-testid="hero-video-frame"
        className="relative z-10 h-[100svh] w-full sm:w-auto sm:aspect-[9/16] max-w-full overflow-hidden flex flex-col justify-between theme-surface-transition"
        style={{
          background: `linear-gradient(165deg, ${theme.base} 0%, ${theme.tint1} 38%, ${theme.goldEnd} 72%, ${theme.tint3} 100%)`,
        }}
      >
        {/* Gradient Fallback Background (Visible only if video fails to load or VIDEO_SRC is empty) */}
        {!hasValidVideo && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <motion.div
              animate={{
                x: [0, 18, -12, 0],
                y: [0, -22, 14, 0],
                scale: [1, 1.06, 0.97, 1],
              }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-16 -left-16 w-72 h-72 rounded-full opacity-65 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${theme.goldEnd} 0%, transparent 70%)`,
              }}
            />
            <motion.div
              animate={{
                x: [0, -20, 15, 0],
                y: [0, 18, -16, 0],
                scale: [1, 0.95, 1.05, 1],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/3 -right-20 w-80 h-80 rounded-full opacity-60 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${theme.tint1} 0%, transparent 70%)`,
              }}
            />
            <motion.div
              animate={{
                x: [0, 14, -14, 0],
                y: [0, -14, 20, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-16 left-8 w-72 h-72 rounded-full opacity-55 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${theme.tint2} 0%, transparent 70%)`,
              }}
            />
          </div>
        )}

        {/* Full-Screen 9:16 Video Element — Paused on first frame (closed envelope) on load, never autoplay */}
        <video
          ref={videoRef}
          data-testid="hero-main-video"
          src={config.VIDEO_SRC || undefined}
          poster={config.POSTER_SRC || undefined}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            if (!isOpened) {
              e.currentTarget.pause();
              try {
                if (e.currentTarget.currentTime === 0) {
                  e.currentTarget.currentTime = 0.001;
                }
              } catch {
                // Ignore seek errors
              }
            }
          }}
          onEnded={(e) => {
            const vid = e.currentTarget;
            vid.pause();
            try {
              if (Number.isFinite(vid.duration) && vid.duration > 0.2 && vid.currentTime < vid.duration - 0.1) {
                vid.currentTime = vid.duration - 0.05;
              }
            } catch {
              // Ignore seek errors
            }
            setIsRevealed(true);
          }}
          onError={() => {
            setVideoFailed(true);
            if (isOpened) setIsRevealed(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            hasValidVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Drifting Petals Canvas (Shown in fallback mode or gently after opening) */}
        {(!hasValidVideo || isOpened) && (
          <FallingPetalsCanvas
            petalCount={14}
            theme={theme}
            className="absolute inset-0 z-10"
          />
        )}

        {/* ===================================================================
            STAGE A: PRE-TAP ENVELOPE OVERLAY (Closed Envelope)
            Shows ONLY:
            1. Top-left language chip
            2. Below it (>= 16px gap): Guest Name Plate ("INVITATION FOR")
            3. Couple names in ivory #FFF8EC with soft shadow, clamp(44px, 13vw, 76px)
            4. Wax seal (uncovered center), small gold ornament & "TAP TO OPEN INVITATION" button
            Fades out within 400ms (opacity and a 12px lift) on tap.
        =================================================================== */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              key="envelope-pre-tap-overlay"
              data-testid="hero-stage-a"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={startExperience}
              className="absolute inset-0 z-30 flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-3 pb-8 sm:pb-12 cursor-pointer"
            >
              {/* Top Column: Language Chip at top-left, then >= 18px gap, then Guest Name Plate + Couple Names */}
              <div className="w-full flex flex-col items-center">
                <div
                  dir="ltr"
                  className="w-full flex items-center justify-start pt-safe min-h-[44px]"
                >
                  <button
                    type="button"
                    data-testid="hero-language-chip"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLanguageSheet();
                    }}
                    aria-label={`${dict.languageChipLabel}: ${activeNativeName}`}
                    className="h-[44px] min-h-[44px] px-3.5 rounded-full flex items-center gap-2 backdrop-blur-md shadow-sm active:scale-95 transition-all cursor-pointer"
                    style={{
                      backgroundColor: `${theme.base}D9`,
                      border: `1px solid ${theme.goldStart}99`,
                      color: theme.text,
                    }}
                  >
                    <Globe
                      className="w-4 h-4 shrink-0"
                      style={{ color: theme.button }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-medium tracking-wide whitespace-nowrap"
                      style={{
                        fontSize: '13px',
                        fontFamily: `var(--font-active-script), 'Jost', sans-serif`,
                      }}
                    >
                      {activeNativeName}
                    </span>
                  </button>
                </div>

                {/* Upper Envelope Flap Area (20px below language chip so >= 16px at all viewports) */}
                <div className="w-full max-w-[390px] flex flex-col items-center gap-2 mt-[20px]">
                  {guestDisplayName && (
                    <GuestNamePlate
                      guestDisplayName={guestDisplayName}
                      plateLabel={invitationForLabel}
                      langCode={langCode}
                      onClick={onChangeName}
                    />
                  )}
                  <h1
                    data-testid="hero-stage-a-couple-names"
                    className="flex items-center justify-center select-text text-center px-1"
                    style={{
                      color: '#FFF8EC',
                      textShadow: '0 2px 14px rgba(70,30,40,.45)',
                      fontFamily: coupleFontFamily,
                      fontWeight: usesLatinCoupleFont ? 400 : 700,
                      fontSize: 'clamp(44px, 13vw, 76px)',
                      lineHeight: usesLatinCoupleFont ? 1.12 : 1.28,
                    }}
                  >
                    {coupleDisplayName}
                  </h1>
                </div>
              </div>

              {/* Middle Area: Intentionally empty so the envelope's golden wax seal is never covered */}
              <div className="flex-1 w-full pointer-events-none" aria-hidden="true" />

              {/* Bottom Area: Small gold ornament and "TAP TO OPEN INVITATION" button */}
              <div className="w-full flex flex-col items-center gap-2.5">
                <svg
                  viewBox="0 0 120 18"
                  className="w-28 h-4 shrink-0"
                  fill="none"
                  aria-hidden="true"
                  data-testid="hero-stage-a-ornament"
                >
                  <path
                    d="M6 9 H48 M72 9 H114"
                    stroke="#F1D58A"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                  />
                  <path
                    d="M60 2.5 L65 9 L60 15.5 L55 9 Z"
                    fill="#F1D58A"
                    stroke="#D4A853"
                    strokeWidth="1.1"
                  />
                </svg>

                <button
                  type="button"
                  data-testid="hero-tap-to-open-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    startExperience();
                  }}
                  style={{ fontSize: '13px' }}
                  className="relative min-h-[48px] min-w-[44px] px-6 sm:px-7 py-3 rounded-full font-english tracking-[0.14em] uppercase text-[#FFF8EC] bg-[#4E2F3A]/45 hover:bg-[#4E2F3A]/60 backdrop-blur-[3px] border border-[#F1D58A]/85 shadow-[0_6px_24px_rgba(48,22,30,0.45)] active:scale-95 transition-colors cursor-pointer"
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [0.25, 0.75, 0.25] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="pointer-events-none absolute inset-0 rounded-full border border-[#FFF8EC]/80 shadow-[0_0_18px_rgba(241,213,138,0.55)]"
                  />
                  <motion.span
                    animate={{ opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 ivory-gold-envelope-text"
                  >
                    {dict.tapToOpen}
                  </motion.span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================================================================
            STAGE B: POST-VIDEO REVEAL OVER FINAL FRAME
            150ms stagger, handwriting stroke on couple names, soft radial glow only
        =================================================================== */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center pt-4 pb-8 px-4 sm:px-5 text-center pointer-events-none">
          <AnimatePresence>
            {isOpened && isRevealed && (
              <motion.div
                key="hero-revealed-content"
                data-testid="hero-revealed-content"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[420px] mx-auto flex flex-col items-center pointer-events-auto px-3 py-6 gap-[15px]"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(255,248,236,0.88) 0%, rgba(255,248,236,0.52) 64%, rgba(255,248,236,0) 100%)',
                }}
              >
                {/* 1. (0.00s) Guest Name Plate with label "WELCOME" (when name is saved) */}
                {guestDisplayName && (
                  <GuestNamePlate
                    guestDisplayName={guestDisplayName}
                    plateLabel={welcomeLabel}
                    langCode={langCode}
                    delay={0}
                    onClick={onChangeName}
                  />
                )}

                {/* 2. (0.15s) Thin Gold Ornament Divider & Small Label "The Wedding Of" / "शुभ विवाह" */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="flex flex-col items-center gap-[12px]"
                >
                  <svg
                    viewBox="0 0 120 18"
                    className="w-28 h-4 shrink-0"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9 H48 M72 9 H114"
                      stroke="#C99A4B"
                      strokeWidth="1.15"
                      strokeLinecap="round"
                    />
                    <path
                      d="M60 2.5 L65 9 L60 15.5 L55 9 Z"
                      fill="#D4A853"
                      stroke="#9A6A22"
                      strokeWidth="1.1"
                    />
                  </svg>

                  <p
                    data-testid="hero-opening-blessing"
                    className="uppercase text-center leading-snug"
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      background: 'linear-gradient(90deg, #9A6A22 0%, #D4A853 50%, #9A6A22 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      color: '#9A6A22',
                    }}
                  >
                    {dict.openingBlessing}
                  </p>
                </motion.div>

                {/* 3. (0.30s) Couple Names: clamp(44px, 13vw, 76px), plum #3E2430, handwriting-style stroke */}
                <motion.h2
                  data-testid="hero-couple-names"
                  initial={{ clipPath: 'inset(-25% 100% -25% 0%)', opacity: 0.35 }}
                  animate={{ clipPath: 'inset(-25% 0% -25% 0%)', opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center select-text max-w-full px-1 py-1"
                  style={{
                    fontFamily: coupleFontFamily,
                    fontWeight: usesLatinCoupleFont ? 400 : 700,
                    fontSize: 'clamp(44px, 13vw, 76px)',
                    lineHeight: usesLatinCoupleFont ? 1.12 : 1.32,
                    color: '#3E2430',
                    textShadow: '0 2px 18px rgba(255,248,236,0.9)',
                  }}
                >
                  {coupleDisplayName}
                </motion.h2>

                {/* 4. (0.45s) Tagline: italic serif 20px in plum at 80% opacity, translated */}
                <motion.p
                  data-testid="hero-tagline"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.45 }}
                  className="font-heading-serif italic text-center max-w-[340px]"
                  style={{
                    fontSize: '20px',
                    lineHeight: 1.35,
                    color: 'rgba(62, 36, 48, 0.8)',
                    textShadow: '0 1px 12px rgba(255,248,236,0.85)',
                  }}
                >
                  {heroTaglineText}
                </motion.p>

                {/* Optional Date Line (only when config.SHOW_DATE_ON_HERO is true) */}
                {config.SHOW_DATE_ON_HERO && (
                  <motion.p
                    data-testid="hero-date"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, delay: 0.52 }}
                    className="uppercase text-center"
                    style={{
                      fontFamily: "'Jost', var(--font-active-script), sans-serif",
                      fontWeight: 600,
                      fontSize: '14px',
                      letterSpacing: '0.18em',
                      color: '#3E2430',
                      textShadow: '0 1px 10px rgba(255,248,236,0.85)',
                    }}
                  >
                    {config.WEDDING_DATE_DISPLAY}
                  </motion.p>
                )}

                {/* 5. (0.60s) Location: Jost 500, 14px, letter-spacing .16em, plum */}
                <motion.p
                  data-testid="hero-location"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.6 }}
                  className="uppercase text-center"
                  style={{
                    fontFamily: "'Jost', var(--font-active-script), sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    letterSpacing: '0.16em',
                    color: '#3E2430',
                    textShadow: '0 1px 10px rgba(255,248,236,0.85)',
                  }}
                >
                  {dict.weddingCity}
                </motion.p>

                {/* 6. (0.75s) Scroll cue: "Scroll down" (translated) 16px in gold (#9A6A22) with bouncing chevron */}
                <motion.button
                  type="button"
                  data-testid="hero-scroll-cue"
                  onClick={onScrollToInvite}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.75 }}
                  className="mt-1 min-h-[44px] min-w-[44px] px-4 py-1.5 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer group"
                  style={{ color: '#9A6A22' }}
                  aria-label="Scroll to invitation details"
                >
                  <span
                    className="font-heading-serif italic font-medium leading-none"
                    style={{
                      fontSize: '16px',
                      color: '#9A6A22',
                      textShadow: '0 1px 10px rgba(255,248,236,0.9)',
                    }}
                  >
                    {dict.scrollCue}
                  </span>
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-7 h-7 rounded-full flex items-center justify-center shadow-xs"
                    style={{
                      border: '1px solid #C99A4B',
                      backgroundColor: 'rgba(255, 248, 236, 0.88)',
                    }}
                  >
                    <ChevronDown className="w-4 h-4" style={{ color: '#9A6A22' }} />
                  </motion.span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
