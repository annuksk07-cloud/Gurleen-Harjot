import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Heart, Mail } from 'lucide-react';
import { TranslationDictionary } from '../i18n/translations';
import { THEMES, WeddingTheme } from '../themes/themes';
import { WeddingConfig } from '../config';

export interface WelcomePopupProps {
  config: WeddingConfig;
  dict: TranslationDictionary;
  theme?: WeddingTheme;
  langCode: string;
  activeNativeName?: string;
  savedName: string | null;
  onClose: () => void;
  onSaveName: (name: string) => void;
  onSkip: () => void;
  onOpenLanguageSheet?: () => void;
}

class WelcomePopupErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  override componentDidCatch() {
    // Fail silently and let the rest of the site work normally
  }

  override render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const WelcomePopupInner: React.FC<WelcomePopupProps> = ({
  dict,
  theme = THEMES.sarson_subah,
  langCode,
  activeNativeName = 'English',
  savedName,
  onClose,
  onSaveName,
  onSkip,
  onOpenLanguageSheet,
}) => {
  const activeTheme = theme || THEMES.sarson_subah;
  const [nameInput, setNameInput] = useState<string>(() => savedName || '');
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setNameInput(savedName || '');
  }, [savedName]);

  // Body scroll lock while popup is mounted
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  // Autofocus name field on open
  useEffect(() => {
    const t = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => window.clearTimeout(t);
  }, []);

  // Focus trap + Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (submittedName) {
          onClose();
        } else if (savedName) {
          onClose();
        } else {
          onSkip();
        }
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submittedName, savedName, onClose, onSkip]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (trimmed.length < 2 || submittedName) return;

    setSubmittedName(trimmed);
    onSaveName(trimmed);

    closeTimerRef.current = window.setTimeout(() => {
      onClose();
    }, 900);
  };

  const isHi = langCode === 'hi';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-heading"
      data-testid="welcome-popup-overlay"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Blurred backdrop over the opening screen */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (submittedName || savedName) {
            onClose();
          } else {
            onSkip();
          }
        }}
        aria-hidden="true"
      />

      {/* Reachable Language Chip above the popup */}
      {onOpenLanguageSheet && (
        <div dir="ltr" className="fixed top-3 left-4 sm:left-5 z-[120] pt-safe">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLanguageSheet();
            }}
            aria-label={`${dict?.languageChipLabel || 'Language'}: ${activeNativeName}`}
            className="h-[44px] min-h-[44px] px-3.5 rounded-full flex items-center gap-2 backdrop-blur-md shadow-md active:scale-95 transition-all cursor-pointer"
            style={{
              backgroundColor: `${activeTheme.base}F2`,
              border: `1px solid ${activeTheme.goldStart}B3`,
              color: activeTheme.text,
            }}
          >
            <Globe className="w-4 h-4 shrink-0" style={{ color: activeTheme.button }} aria-hidden="true" />
            <span
              className="text-xs font-medium tracking-wide whitespace-nowrap"
              style={{ fontFamily: `var(--font-active-script), 'Jost', sans-serif` }}
            >
              {activeNativeName}
            </span>
          </button>
        </div>
      )}

      {/* Cream Card in the active theme's shape, pattern, and ornaments */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[420px] bg-[#FFF8EC] p-6 sm:p-8 shadow-2xl border overflow-hidden text-center theme-shaped-box"
        style={{
          borderColor: `${activeTheme.goldStart}99`,
          color: activeTheme.text,
          boxShadow: '0 24px 60px rgba(38, 18, 24, 0.38)',
        }}
      >
        {/* Subtle active theme pattern overlay */}
        <div
          className="absolute inset-0 theme-pattern-overlay opacity-40 pointer-events-none"
          aria-hidden="true"
        />

        {/* Inner ornamental gold frame */}
        <div
          className="pointer-events-none absolute inset-2.5 rounded-[14px] border opacity-60"
          style={{ borderColor: `${activeTheme.goldStart}77` }}
          aria-hidden="true"
        />

        {/* Envelope & Wax Seal Heart Emblem */}
        <div className="relative z-10 flex flex-col items-center mb-4">
          <div
            className="relative w-14 h-11 rounded-lg flex items-center justify-center shadow-xs border"
            style={{
              backgroundColor: activeTheme.tint1,
              borderColor: `${activeTheme.goldStart}99`,
            }}
            aria-hidden="true"
          >
            <Mail className="w-6 h-6 opacity-80" style={{ color: activeTheme.text }} />
            <motion.div
              key={submittedName ? 'seal-pressed' : 'seal-ready'}
              initial={{ scale: submittedName ? 0.85 : 1 }}
              animate={{ scale: submittedName ? 1.12 : 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute -bottom-2.5 w-7 h-7 rounded-full flex items-center justify-center shadow-md border"
              style={{
                backgroundColor: activeTheme.button,
                borderColor: '#F1D58A',
              }}
            >
              <Heart className="w-3.5 h-3.5 fill-[#FFF8EC] text-[#FFF8EC]" />
            </motion.div>
          </div>
        </div>

        {!submittedName ? (
          <form
            onSubmit={handleSubmit}
            className="relative z-10 flex flex-col items-center gap-3.5 pt-2"
          >
            <h2
              id="welcome-popup-heading"
              className="font-heading-serif italic text-2xl sm:text-[26px] leading-snug"
              style={{ color: activeTheme.text }}
            >
              {isHi ? 'स्वागत है! आपका नाम क्या है?' : "Welcome! What's your name?"}
            </h2>

            <p
              className="font-english text-sm opacity-85 max-w-[300px]"
              style={{ color: activeTheme.text }}
            >
              {isHi
                ? 'हम आपके लिए एक छोटा सा ख़त लिखना चाहेंगे।'
                : 'We would love to write you a little note.'}
            </p>

            <div className="w-full mt-1">
              <input
                ref={inputRef}
                type="text"
                autoFocus
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Rashmi Fua"
                aria-label={isHi ? 'आपका नाम' : "What's your name?"}
                maxLength={40}
                className="w-full px-4 py-3 rounded-xl border text-[16px] text-center font-english focus:outline-none focus:ring-2 transition-all bg-white/90"
                style={{
                  borderColor: `${activeTheme.goldStart}AA`,
                  color: activeTheme.text,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={nameInput.trim().length < 2}
              className="theme-btn w-full min-h-[48px] py-3 px-6 rounded-full font-english text-xs sm:text-sm uppercase tracking-[0.14em] font-medium shadow-md transition-all cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed mt-1"
              style={{
                backgroundColor: activeTheme.button,
                color: activeTheme.base,
              }}
            >
              {isHi ? 'आगे बढ़ें' : 'Continue'}
            </button>

            <button
              type="button"
              onClick={onSkip}
              className="font-english text-xs underline opacity-75 hover:opacity-100 py-1.5 min-h-[44px] flex items-center justify-center cursor-pointer"
              style={{ color: activeTheme.text }}
            >
              {isHi ? 'अभी छोड़ें' : 'Skip for now'}
            </button>
          </form>
        ) : (
          <motion.div
            key="welcome-success-moment"
            data-testid="welcome-success-moment"
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 flex flex-col items-center justify-center py-6 gap-2"
          >
            {/* Popping heart */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 6 }}
              animate={{ scale: 1.15, opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              aria-hidden="true"
            >
              <Heart
                className="w-7 h-7"
                style={{ color: activeTheme.button, fill: activeTheme.button }}
              />
            </motion.div>

            <h2
              id="welcome-popup-heading"
              className="font-heading-serif italic text-2xl sm:text-[26px] leading-snug"
              style={{ color: activeTheme.text }}
            >
              {isHi
                ? `आपसे मिलकर खुशी हुई, ${submittedName}!`
                : `Nice to meet you, ${submittedName}!`}
            </h2>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export const WelcomePopup: React.FC<WelcomePopupProps> = (props) => {
  return (
    <WelcomePopupErrorBoundary>
      <WelcomePopupInner {...props} />
    </WelcomePopupErrorBoundary>
  );
};
