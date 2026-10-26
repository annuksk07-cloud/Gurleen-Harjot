import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Heart, Mail, RefreshCw, UserPen, MessageCircleHeart } from 'lucide-react';
import { WeddingConfig } from '../config';
import { TranslationDictionary } from '../i18n/translations';
import { THEMES, WeddingTheme } from '../themes/themes';
import { resolvePersonalNote } from '../utils/relativeMatching';
import { useReveal } from '../hooks/useReveal';

export interface NoteSectionProps {
  config: WeddingConfig;
  dict: TranslationDictionary;
  theme?: WeddingTheme;
  langCode: string;
  savedName: string | null;
  onOpenPopup: () => void;
}

/**
 * 5 small gold line icons for the 5 wedding celebrations
 */
const CelebrationLineIcon: React.FC<{ index: number; color: string }> = ({ index, color }) => {
  switch (index) {
    case 0:
      // Haldi — Marigold sun / bowl
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" strokeLinecap="round" />
        </svg>
      );
    case 1:
      // Mehndi — Leaf / lotus sprig
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
          <path d="M12 3C7.5 7.5 6 13 12 20c6-7 4.5-12.5 0-17Z" strokeLinejoin="round" />
          <path d="M12 8v11" strokeLinecap="round" />
        </svg>
      );
    case 2:
      // Sangeet — Musical notes
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
          <path d="M9 18V6l10-2v12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6.5" cy="18" r="2.5" />
          <circle cx="16.5" cy="16" r="2.5" />
        </svg>
      );
    case 3:
      // Wedding Ceremony — Sacred flame / arch
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
          <path d="M12 4c3.5 4.2 4.5 7.5 2.5 10.5a3.5 3.5 0 0 1-5 0C7.5 11.5 8.5 8.2 12 4Z" strokeLinejoin="round" />
          <path d="M5 19h14" strokeLinecap="round" />
        </svg>
      );
    case 4:
    default:
      // Reception — Sparkling star / lantern
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
          <path d="M12 3l2.2 6.3L20.5 12l-6.3 2.2L12 20.5l-2.2-6.3L3.5 12l6.3-2.7L12 3Z" strokeLinejoin="round" />
        </svg>
      );
  }
};

export const NoteSection: React.FC<NoteSectionProps> = ({
  config,
  dict,
  theme = THEMES.sarson_subah,
  langCode,
  savedName,
  onOpenPopup,
}) => {
  const activeTheme = theme || THEMES.sarson_subah;
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { ref: sectionRef, isRevealed } = useReveal<HTMLElement>(1500);
  const [replayKey, setReplayKey] = useState<number>(0);
  const [visibleLinesCount, setVisibleLinesCount] = useState<number>(99);

  const hasSavedName = Boolean(savedName && savedName.trim().length > 0);
  const resolvedNote = resolvePersonalNote(savedName, langCode, config);

  const sentences = resolvedNote.message
    .split(/(?<=[.!?।])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Line-by-line reveal (~120ms per line) with 1.5s failsafe
  useEffect(() => {
    if (!hasSavedName) return;
    if (prefersReducedMotion) {
      setVisibleLinesCount(99);
      return;
    }

    setVisibleLinesCount(1);
    const total = Math.max(sentences.length, 1);
    const timers: number[] = [];

    for (let i = 1; i <= total; i++) {
      timers.push(
        window.setTimeout(() => {
          setVisibleLinesCount((prev) => Math.max(prev, i + 1));
        }, i * 120)
      );
    }

    // 1.5-second failsafe so all lines are guaranteed visible
    timers.push(
      window.setTimeout(() => {
        setVisibleLinesCount(99);
      }, 1500)
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [hasSavedName, savedName, resolvedNote.message, sentences.length, replayKey, prefersReducedMotion]);

  const handleReadAgain = () => {
    setReplayKey((prev) => prev + 1);
  };

  const isHi = langCode === 'hi';
  const replySender = (savedName || resolvedNote.displayName || 'Guest').trim();
  const replyText = `Thank you for your lovely message! - ${replySender}`;
  const cleanPhone = (config?.RSVP_WHATSAPP_NUMBER || '919876543210').replace(/[^0-9]/g, '');
  const whatsappHref = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(replyText)}`;

  const celebrationCaptions = [
    dict?.event1ScriptTitle || 'Haldi',
    dict?.event2ScriptTitle || 'Mehndi',
    dict?.event3ScriptTitle || 'Sangeet',
    langCode === 'en' ? 'Wedding Ceremony' : dict?.event4ScriptTitle || 'Wedding Ceremony',
    dict?.event5ScriptTitle || 'Reception',
  ];

  return (
    <section
      ref={sectionRef}
      id="your-note"
      aria-labelledby="your-note-heading"
      className="relative w-full px-4 sm:px-6 py-16 overflow-hidden theme-surface-transition"
      style={{
        background: `linear-gradient(180deg, ${activeTheme.base} 0%, ${activeTheme.tint1} 48%, ${activeTheme.base} 100%)`,
      }}
    >
      <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />

      <div
        className="relative z-10 w-full max-w-[520px] mx-auto flex flex-col items-center text-center transition-opacity duration-500"
        style={{ opacity: isRevealed ? 1 : 1 }}
      >
        {/* Theme Ornament Above "FOR YOU" */}
        <svg viewBox="0 0 96 24" className="w-24 h-6 mb-1.5" fill="none" aria-hidden="true">
          <path
            d="M8 12 H36 M60 12 H88"
            stroke={activeTheme.goldStart}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M48 3 L54 12 L48 21 L42 12 Z"
            fill={activeTheme.goldEnd}
            stroke={activeTheme.goldStart}
            strokeWidth="1.2"
          />
          <circle cx="39" cy="12" r="1.5" fill={activeTheme.button} />
          <circle cx="57" cy="12" r="1.5" fill={activeTheme.button} />
        </svg>

        {/* Small Caps Label "FOR YOU" */}
        <p
          id="your-note-heading"
          className="font-english text-xs uppercase tracking-[0.24em] font-medium mb-6"
          style={{ color: activeTheme.button }}
        >
          {isHi ? 'आपके लिए' : 'FOR YOU'}
        </p>

        <AnimatePresence mode="wait">
          {!hasSavedName ? (
            /* LOCKED STATE (no saved name, or guest skipped) */
            <motion.div
              key="note-locked-state"
              data-testid="note-locked-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.35 }}
              className="relative w-full bg-[#FFF8EC] p-7 sm:p-8 shadow-lg border theme-shaped-box flex flex-col items-center text-center overflow-hidden"
              style={{
                borderColor: `${activeTheme.goldStart}99`,
                color: activeTheme.text,
              }}
            >
              <div
                className="absolute inset-0 theme-pattern-overlay opacity-35 pointer-events-none"
                aria-hidden="true"
              />

              {/* Sealed Envelope + Wax-Seal Heart */}
              <div className="relative z-10 mb-4 flex flex-col items-center">
                <div
                  className="relative w-16 h-12 rounded-xl flex items-center justify-center border shadow-xs"
                  style={{
                    backgroundColor: activeTheme.tint1,
                    borderColor: `${activeTheme.goldStart}99`,
                  }}
                  aria-hidden="true"
                >
                  <Mail className="w-7 h-7 opacity-80" style={{ color: activeTheme.text }} />
                  <div
                    className="absolute -bottom-2.5 w-7 h-7 rounded-full flex items-center justify-center shadow-sm border"
                    style={{
                      backgroundColor: activeTheme.button,
                      borderColor: '#F1D58A',
                    }}
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#FFF8EC] text-[#FFF8EC]" />
                  </div>
                </div>
              </div>

              <h3
                className="relative z-10 font-heading-serif italic text-2xl sm:text-[26px] mb-1"
                style={{ color: activeTheme.text }}
              >
                {isHi ? 'आपके लिए एक ख़त इंतज़ार कर रहा है' : 'A note is waiting for you'}
              </h3>

              <p
                className="relative z-10 font-english text-sm opacity-85 mb-5"
                style={{ color: activeTheme.text }}
              >
                {isHi ? 'इसे खोलने के लिए अपना नाम बताएँ' : 'Tell us your name to open it'}
              </p>

              <button
                type="button"
                data-testid="note-enter-name-btn"
                onClick={onOpenPopup}
                className="relative z-10 theme-btn min-h-[46px] px-7 py-2.5 rounded-full font-english text-xs sm:text-sm uppercase tracking-[0.14em] font-medium shadow-sm transition-all cursor-pointer"
                style={{
                  backgroundColor: activeTheme.button,
                  color: activeTheme.base,
                }}
              >
                {isHi ? 'अपना नाम लिखें' : 'Enter your name'}
              </button>
            </motion.div>
          ) : (
            /* UNLOCKED STATE: 3 Boxes in a Centred Column (max-w 520px) */
            <motion.div
              key={`note-unlocked-${savedName}-${replayKey}`}
              data-testid="note-unlocked-boxes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center gap-5"
            >
              {/* =============================================================
                  BOX 1: HANGING LUGGAGE GUEST TAG
              ============================================================= */}
              <motion.div
                data-testid="note-box-tag"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: -18, scale: 0.96 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotate: [-1.8, 1.8, -1.8],
                      }
                }
                transition={{
                  opacity: { duration: 0.4 },
                  y: { type: 'spring', stiffness: 220, damping: 16 },
                  scale: { duration: 0.4 },
                  rotate: {
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                style={{ transformOrigin: '50% 0%' }}
                className="relative w-full flex flex-col items-center"
              >
                {/* Short Hanging String + Punched Hole SVG Header */}
                <svg
                  viewBox="0 0 120 34"
                  className="w-28 h-8 -mb-2 relative z-20 pointer-events-none"
                  fill="none"
                  aria-hidden="true"
                >
                  {/* Hanging string */}
                  <path
                    d="M60 0 C59 10, 61 16, 60 24"
                    stroke={activeTheme.goldStart}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Punched grommet hole */}
                  <circle
                    cx="60"
                    cy="25"
                    r="5.5"
                    fill={activeTheme.base}
                    stroke={activeTheme.goldStart}
                    strokeWidth="2"
                  />
                </svg>

                {/* Luggage Tag Body with chamfered top shoulders */}
                <div
                  className="relative w-full bg-[#FFF8EC] pt-6 pb-5 px-5 sm:px-7 shadow-md border overflow-hidden theme-shaped-box"
                  style={{
                    borderColor: `${activeTheme.goldStart}AA`,
                    clipPath:
                      'polygon(22px 0%, calc(100% - 22px) 0%, 100% 22px, 100% 100%, 0% 100%, 0% 22px)',
                    boxShadow: '0 14px 32px -10px rgba(78, 47, 58, 0.14)',
                  }}
                >
                  <div
                    className="absolute inset-0 theme-pattern-overlay opacity-35 pointer-events-none"
                    aria-hidden="true"
                  />

                  <p
                    className="relative z-10 font-english text-[10px] uppercase tracking-[0.24em] opacity-75 mb-1"
                    style={{ color: activeTheme.text }}
                  >
                    {isHi ? 'आरक्षित अतिथि' : 'RESERVED FOR'}
                  </p>

                  {/* Guest Display Name in Cursive Display Font (~40px) */}
                  <p
                    data-testid="note-tag-display-name"
                    className="relative z-10 font-couple leading-tight my-1"
                    style={{
                      fontSize: 'clamp(2.1rem, 6vw, 2.55rem)',
                      color: activeTheme.text,
                    }}
                  >
                    {resolvedNote.displayName}
                  </p>

                  {/* Relation Chip */}
                  <div className="relative z-10 mt-1 mb-4 flex justify-center">
                    <span
                      data-testid="note-tag-relation-chip"
                      className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-english font-medium border"
                      style={{
                        backgroundColor: `${activeTheme.tint1}CC`,
                        borderColor: `${activeTheme.goldStart}99`,
                        color: activeTheme.text,
                      }}
                    >
                      {resolvedNote.chip}
                    </span>
                  </div>

                  {/* Thin Gold Divider */}
                  <div
                    className="relative z-10 w-full h-[1px] mb-3"
                    style={{ backgroundColor: `${activeTheme.goldStart}4D` }}
                    aria-hidden="true"
                  />

                  <p
                    className="relative z-10 font-english text-[11px] uppercase tracking-[0.16em] opacity-80 mb-2.5"
                    style={{ color: activeTheme.button }}
                  >
                    {isHi ? 'हर उत्सव में सादर आमंत्रित' : 'Invited to every celebration'}
                  </p>

                  {/* 5 Small Gold Line Icons with Tiny Captions */}
                  <div className="relative z-10 grid grid-cols-5 gap-1.5 sm:gap-2 w-full">
                    {celebrationCaptions.map((caption, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center border"
                          style={{
                            borderColor: `${activeTheme.goldStart}80`,
                            backgroundColor: `${activeTheme.base}E6`,
                          }}
                        >
                          <CelebrationLineIcon index={idx} color={activeTheme.goldStart} />
                        </div>
                        <span
                          className="font-english text-[9px] sm:text-[10px] leading-tight text-center opacity-85 line-clamp-2"
                          style={{ color: activeTheme.text }}
                        >
                          {caption}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* =============================================================
                  BOX 2: THE LETTER
              ============================================================= */}
              <motion.div
                data-testid="note-box-letter"
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: 0,
                        y: 16,
                        clipPath: 'inset(0% 0% 18% 0%)',
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  clipPath: 'inset(0% 0% 0% 0%)',
                }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full bg-[#FFF8EC] p-6 sm:p-8 shadow-md border overflow-hidden theme-shaped-box"
                style={{
                  borderColor: `${activeTheme.goldStart}B3`,
                  outline: `1px solid ${activeTheme.goldStart}66`,
                  outlineOffset: '-6px',
                  boxShadow: '0 16px 36px -12px rgba(78, 47, 58, 0.14)',
                }}
              >
                <div
                  className="absolute inset-0 theme-pattern-overlay opacity-35 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Corner Ornaments */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 absolute top-3 left-3 opacity-65 pointer-events-none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 14 V2 H14" stroke={activeTheme.goldStart} strokeWidth="1.5" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 absolute top-3 right-3 opacity-65 pointer-events-none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M22 14 V2 H10" stroke={activeTheme.goldStart} strokeWidth="1.5" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 absolute bottom-3 left-3 opacity-65 pointer-events-none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2 10 V22 H14" stroke={activeTheme.goldStart} strokeWidth="1.5" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 absolute bottom-3 right-3 opacity-65 pointer-events-none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M22 10 V22 H10" stroke={activeTheme.goldStart} strokeWidth="1.5" />
                </svg>

                {/* Wax-Seal Heart at Top That Cracks on View */}
                <div className="relative z-10 flex justify-center mb-3">
                  <motion.div
                    initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.85 }}
                    animate={
                      prefersReducedMotion
                        ? { scale: 1 }
                        : { scale: [0.85, 1.15, 1], y: [2, -2, 0] }
                    }
                    transition={{ duration: 0.5 }}
                    className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm border"
                    style={{
                      backgroundColor: activeTheme.button,
                      borderColor: '#F1D58A',
                    }}
                    aria-hidden="true"
                  >
                    <Heart className="w-4 h-4 fill-[#FFF8EC] text-[#FFF8EC]" />
                  </motion.div>
                </div>

                {/* Greeting: "Dear {display name}," */}
                <h3
                  data-testid="note-letter-greeting"
                  className="relative z-10 font-heading-serif italic text-xl sm:text-2xl mb-3 text-center"
                  style={{ color: activeTheme.text }}
                >
                  {resolvedNote.greeting}
                </h3>

                {/* Message at 18px serif with line-height 1.7 revealed line by line */}
                <p
                  data-testid="note-letter-body"
                  className="relative z-10 font-heading-serif text-[18px] leading-[1.7] text-center my-2 px-1"
                  style={{ color: activeTheme.text }}
                >
                  {sentences.map((sentence, idx) => {
                    const isVisible = idx < visibleLinesCount;
                    return (
                      <span
                        key={idx}
                        className="inline transition-opacity duration-300"
                        style={{ opacity: isVisible ? 1 : 0 }}
                      >
                        {sentence}{' '}
                      </span>
                    );
                  })}
                </p>

                {/* Cursive Sign-Off: "With all our love, {bride} and {groom}" */}
                <p
                  data-testid="note-letter-signoff"
                  className="relative z-10 font-cursive-touch text-2xl sm:text-3xl mt-4 text-center"
                  style={{ color: activeTheme.button }}
                >
                  {resolvedNote.signOff}
                </p>

                {/* Little Hearts Rising Once */}
                {!prefersReducedMotion && (
                  <div
                    className="pointer-events-none relative z-10 flex justify-center gap-4 mt-1 h-5 overflow-visible"
                    aria-hidden="true"
                  >
                    {[0, 1, 2].map((idx) => (
                      <motion.span
                        key={`${replayKey}-heart-${idx}`}
                        initial={{ opacity: 0.9, y: 8, scale: 0.7 }}
                        animate={{ opacity: 0, y: -22, scale: 1.15 }}
                        transition={{ duration: 1.5, delay: 0.3 + idx * 0.18, ease: 'easeOut' }}
                      >
                        <Heart
                          className="w-3.5 h-3.5"
                          style={{ color: activeTheme.button, fill: activeTheme.button }}
                        />
                      </motion.span>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* =============================================================
                  BOX 3: ACTIONS
              ============================================================= */}
              <div
                data-testid="note-box-actions"
                className="relative w-full bg-[#FFF8EC] p-4 sm:p-5 shadow-xs border theme-shaped-box flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
                style={{
                  borderColor: `${activeTheme.goldStart}80`,
                }}
              >
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="note-reply-btn"
                  className="theme-btn min-h-[44px] px-5 py-2.5 rounded-full font-english text-xs uppercase tracking-[0.14em] font-medium inline-flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.button,
                    color: activeTheme.base,
                  }}
                >
                  <MessageCircleHeart className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{isHi ? 'प्यार के साथ जवाब दें' : 'Reply with love'}</span>
                </a>

                <button
                  type="button"
                  data-testid="note-read-again-btn"
                  onClick={handleReadAgain}
                  className="theme-btn min-h-[44px] px-4 py-2.5 rounded-full border font-english text-xs uppercase tracking-[0.12em] inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.base,
                    borderColor: `${activeTheme.goldStart}99`,
                    color: activeTheme.text,
                  }}
                >
                  <RefreshCw className="w-3.5 h-3.5 shrink-0" style={{ color: activeTheme.button }} aria-hidden="true" />
                  <span>{isHi ? 'फिर से पढ़ें' : 'Read again'}</span>
                </button>

                <button
                  type="button"
                  data-testid="note-change-name-btn"
                  onClick={onOpenPopup}
                  className="theme-btn min-h-[44px] px-4 py-2.5 rounded-full border font-english text-xs uppercase tracking-[0.12em] inline-flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.base,
                    borderColor: `${activeTheme.goldStart}99`,
                    color: activeTheme.text,
                  }}
                >
                  <UserPen className="w-3.5 h-3.5 shrink-0" style={{ color: activeTheme.button }} aria-hidden="true" />
                  <span>{isHi ? 'नाम बदलें' : 'Change name'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
