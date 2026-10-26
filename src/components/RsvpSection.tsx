import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { WeddingConfig } from '../config';
import { TranslationDictionary } from '../i18n/translations';
import { WeddingTheme, THEMES } from '../themes/themes';
import { FullRsvpState } from '../utils/rsvpTypes';
import {
  createInitialRsvpState,
  saveRsvpDraft,
  getRsvpDeadlineStatus,
  buildWhatsAppRsvpMessage,
} from '../utils/rsvpLogic';
import { formatPersonalisedLine } from '../utils/relativeMatching';
import { RsvpProgressRail } from './rsvp/RsvpProgressRail';
import { Step1KaunAaRahaHai } from './rsvp/Step1KaunAaRahaHai';
import { Step2Parivaar } from './rsvp/Step2Parivaar';
import { Step3Khana } from './rsvp/Step3Khana';
import { Step4SafarAurStay } from './rsvp/Step4SafarAurStay';
import { Step5MastiAurAashirwad } from './rsvp/Step5MastiAurAashirwad';
import { Step6Confirm } from './rsvp/Step6Confirm';

interface RsvpSectionProps {
  config: WeddingConfig;
  dict?: TranslationDictionary;
  theme?: WeddingTheme;
  langCode?: string;
  savedName?: string | null;
  guestDisplayName?: string | null;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  config,
  dict,
  theme = THEMES.sarson_subah,
  langCode = 'en',
  savedName = null,
  guestDisplayName = null,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const lastSyncedGuestRef = useRef<string | null>(null);

  // Initialize state from localStorage or prefilled guest name
  const [rsvpState, setRsvpState] = useState<FullRsvpState>(() => {
    const initial = createInitialRsvpState(config, guestDisplayName || savedName || '');
    if (guestDisplayName && !initial.primaryName.trim()) {
      initial.primaryName = guestDisplayName;
      if (initial.members.length > 0 && !initial.members[0].name.trim()) {
        initial.members[0] = { ...initial.members[0], name: guestDisplayName };
      }
    }
    return initial;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasStepError, setHasStepError] = useState(false);
  const [stepErrorMessage, setStepErrorMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showConfettiBurst, setShowConfettiBurst] = useState(false);

  // Sync primaryName immediately whenever savedName / guestDisplayName is set or changed
  useEffect(() => {
    if (guestDisplayName) {
      setRsvpState((prev) => {
        const shouldReplace =
          !prev.primaryName.trim() ||
          prev.primaryName === lastSyncedGuestRef.current ||
          prev.primaryName === savedName;
        if (!shouldReplace) return prev;

        const nextMembers = [...prev.members];
        if (nextMembers.length > 0) {
          nextMembers[0] = { ...nextMembers[0], name: guestDisplayName };
        }
        return {
          ...prev,
          primaryName: guestDisplayName,
          members: nextMembers,
        };
      });
      lastSyncedGuestRef.current = guestDisplayName;
    } else if (!savedName && lastSyncedGuestRef.current) {
      // Guest cleared/reset demo
      setRsvpState((prev) => {
        if (prev.primaryName !== lastSyncedGuestRef.current) return prev;
        const nextMembers = [...prev.members];
        if (nextMembers.length > 0) {
          nextMembers[0] = { ...nextMembers[0], name: '' };
        }
        return {
          ...prev,
          primaryName: '',
          members: nextMembers,
        };
      });
      lastSyncedGuestRef.current = null;
    }
  }, [guestDisplayName, savedName]);

  // Helper to partially update RSVP state
  const updateState = (patch: Partial<FullRsvpState>) => {
    setRsvpState((prev) => ({ ...prev, ...patch }));
  };

  // Auto-save draft changes to localStorage
  useEffect(() => {
    saveRsvpDraft(rsvpState);
  }, [rsvpState]);

  // Check deadline status periodically
  const [deadlineStatus, setDeadlineStatus] = useState(() =>
    getRsvpDeadlineStatus(config.RSVP_DEADLINE)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDeadlineStatus(getRsvpDeadlineStatus(config.RSVP_DEADLINE));
    }, 30000);
    return () => clearInterval(timer);
  }, [config.RSVP_DEADLINE]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Scroll to ticket smoothly
  const scrollToTicketTop = () => {
    if (ticketRef.current) {
      ticketRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Step change with validation
  const goToStep = (targetStep: number) => {
    if (targetStep < 1 || targetStep > 6) return;

    // Validate if moving forward from Step 1
    if (rsvpState.currentStep === 1 && targetStep > 1) {
      if (!rsvpState.primaryName.trim()) {
        setHasStepError(true);
        setStepErrorMessage(
          langCode === 'en'
            ? 'Please enter your full name'
            : 'Kripya apna shubh naam darj karein (Please enter your name)'
        );
        if (!prefersReducedMotion) {
          setIsShaking(true);
          window.setTimeout(() => setIsShaking(false), 600);
        }
        return;
      }
    }

    setHasStepError(false);
    setStepErrorMessage(null);

    setRsvpState((prev) => ({
      ...prev,
      currentStep: targetStep,
    }));

    scrollToTicketTop();
  };

  const handleNextStep = () => {
    goToStep(rsvpState.currentStep + 1);
  };

  const handlePrevStep = () => {
    goToStep(rsvpState.currentStep - 1);
  };

  const activeGuestForToast = guestDisplayName || rsvpState.primaryName.trim() || null;

  // Final WhatsApp Submission from Step 6
  const handleFinalConfirmSubmit = () => {
    // 1. Mark confirmed and timestamp
    setRsvpState((prev) => ({
      ...prev,
      isConfirmed: true,
      updatedAt: new Date().toISOString(),
    }));

    // 2. Shake & Confetti Burst
    if (!prefersReducedMotion) {
      setIsShaking(true);
      setShowConfettiBurst(true);
      window.setTimeout(() => setIsShaking(false), 700);
      window.setTimeout(() => setShowConfettiBurst(false), 2400);
    }

    // 3. Build WhatsApp payload
    const waResult = buildWhatsAppRsvpMessage(rsvpState, config, langCode);

    // If shortened, copy the full text to clipboard and notify with toast
    if (waResult.isShortened) {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(waResult.fullText).catch(() => {});
      }
      showToast(
        activeGuestForToast
          ? formatPersonalisedLine(
              dict?.rsvpToastCopy_guest || 'Thank you, {guest}! Your RSVP details have been copied.',
              activeGuestForToast
            )
          : langCode === 'en'
            ? 'Full RSVP details copied to clipboard!'
            : 'Poora data copy ho gaya, chat mein paste kar dein'
      );
    } else {
      showToast(
        activeGuestForToast
          ? formatPersonalisedLine(
              dict?.rsvpToastConfirm_guest ||
                'Thank you, {guest}! Your ticket is confirmed and opening on WhatsApp.',
              activeGuestForToast
            )
          : langCode === 'en'
            ? 'Ticket confirmed! Opening WhatsApp...'
            : '🎉 Ticket confirm ho gayi! WhatsApp par bhej rahe hain...'
      );
    }

    // 4. Open WhatsApp
    window.setTimeout(() => {
      const a = document.createElement('a');
      a.href = waResult.waMeUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 450);
  };

  // Copy details button
  const handleCopyDetails = async () => {
    const waResult = buildWhatsAppRsvpMessage(rsvpState, config, langCode);
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(waResult.fullText);
        showToast(
          activeGuestForToast
            ? formatPersonalisedLine(
                dict?.rsvpToastCopy_guest ||
                  'Thank you, {guest}! Your RSVP details have been copied.',
                activeGuestForToast
              )
            : langCode === 'en'
              ? 'RSVP details copied to clipboard!'
              : '📋 RSVP details clipboard par copy ho gayi hain!'
        );
      }
    } catch {
      showToast(langCode === 'en' ? 'Could not copy details.' : 'Copy karne mein samasya aayi.');
    }
  };

  const rsvpHeadingText = guestDisplayName
    ? formatPersonalisedLine(
        dict?.rsvpHeading_guest || 'Welcome aboard, {guest}!',
        guestDisplayName
      )
    : langCode === 'en'
      ? 'Wedding Express · RSVP'
      : 'Shaadi Express · RSVP';

  const passengerBannerText = guestDisplayName
    ? formatPersonalisedLine(
        dict?.rsvpPassengerLabel_guest || 'PASSENGER: {GUEST}',
        guestDisplayName
      )
    : null;

  return (
    <section
      id="rsvp-section"
      aria-labelledby="rsvp-heading"
      className="relative w-full px-4 sm:px-6 py-[clamp(48px,7vw,76px)] overflow-hidden theme-surface-transition"
      style={{
        background: `linear-gradient(175deg, ${theme.base} 0%, ${theme.tint1} 52%, ${theme.tint3} 100%)`,
      }}
    >
      <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            data-testid="rsvp-toast"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-[90vw] sm:max-w-md bg-stone-900/95 text-amber-200 px-5 py-3 rounded-full shadow-2xl border border-amber-500/50 flex items-center gap-3 backdrop-blur-md text-xs sm:text-sm font-medium"
            role="status"
            aria-live="polite"
          >
            <span>🚂</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Particle Burst Layer */}
      {showConfettiBurst && !prefersReducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-[95] overflow-hidden">
          {Array.from({ length: 32 }).map((_, i) => {
            const left = Math.random() * 100;
            const size = 6 + Math.random() * 8;
            const colors = [theme.goldStart, theme.accent, theme.button, '#F59E0B', '#DC2626'];
            const color = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                initial={{
                  x: `${left}vw`,
                  y: '45vh',
                  scale: 0.2,
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${left + (Math.random() * 30 - 15)}vw`,
                  y: '105vh',
                  scale: 1,
                  rotate: Math.random() * 720,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.8 + Math.random() * 0.8,
                  ease: 'easeOut',
                }}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size * 1.5}px`,
                  backgroundColor: color,
                  borderRadius: i % 2 === 0 ? '50%' : '2px',
                }}
              />
            );
          })}
        </div>
      )}

      {/* MAIN CONTAINER */}
      <div
        ref={ticketRef}
        className="relative z-10 w-full max-w-[760px] mx-auto space-y-6"
      >
        {/* SECTION HEADER & GREETING */}
        <div className="text-center space-y-2">
          <p
            className="font-punjabi text-base cream-text-glow tracking-wider"
            style={{ color: theme.button }}
          >
            {dict?.rsvpWarmWelcome || 'Welcome'}
          </p>

          <h2
            id="rsvp-heading"
            className="font-heading-serif italic text-gold-shimmer font-bold"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 2.85rem)' }}
          >
            {rsvpHeadingText}
          </h2>

          <p
            className="font-english text-xs sm:text-sm tracking-wide opacity-85 max-w-lg mx-auto"
            style={{ color: theme.text }}
          >
            {dict?.rsvpDeadline || config.RSVP_DEADLINE_TEXT}
          </p>
        </div>

        {/* DEADLINE COUNTDOWN / LATE BANNER */}
        <div className="mx-auto max-w-xl">
          {deadlineStatus.isPassed ? (
            /* Polite Late Reply Banner */
            <div className="bg-amber-100/90 dark:bg-stone-850 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 p-3.5 rounded-xl shadow-sm flex items-start gap-3">
              <span className="text-2xl mt-0.5">⏳</span>
              <div className="text-xs">
                <span className="font-bold uppercase tracking-wider block">
                  Late reply window active
                </span>
                <p className="mt-0.5 opacity-90">
                  {langCode === 'en'
                    ? 'The RSVP date has passed, but you are very special to us! Please still send your details so we can arrange your stay and meals.'
                    : 'Tareekh nikal chuki hai, par aap hamare khaas hain! Kripya apni details zaroor bhej dein taaki hum catering aur stay adjust kar sakein.'}
                </p>
              </div>
            </div>
          ) : (
            /* Active Countdown Badge */
            <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border border-amber-400/50 rounded-full px-4 py-2 shadow-sm flex items-center justify-between text-xs text-stone-800 dark:text-amber-100">
              <div className="flex items-center gap-2">
                <span className="text-base animate-pulse">⏰</span>
                <span className="font-semibold">
                  {dict?.rsvpDeadlinePrefix || 'RSVP closes in'}{' '}
                  <strong className="text-amber-700 dark:text-amber-400 font-bold">
                    {deadlineStatus.daysLeft} {langCode === 'en' ? 'days' : 'din'}
                  </strong>
                </span>
              </div>
              <div className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                {deadlineStatus.hoursLeft}h : {deadlineStatus.minutesLeft}m{' '}
                {dict?.rsvpDeadlineSuffix || 'left'}
              </div>
            </div>
          )}
        </div>

        {/* 6-STEP PROGRESS RAIL */}
        <div className="bg-white/70 dark:bg-stone-900/70 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <RsvpProgressRail
            currentStep={rsvpState.currentStep}
            onStepClick={goToStep}
            maxAccessibleStep={6}
            theme={theme}
            dict={dict!}
          />
        </div>

        {/* STEP ERROR BANNER */}
        {hasStepError && stepErrorMessage && (
          <div
            role="alert"
            className="p-3 bg-rose-100/90 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn"
          >
            <span>⚠️</span>
            <span>{stepErrorMessage}</span>
          </div>
        )}

        {/* TICKET WIZARD CARD WRAPPER */}
        <div
          className={`gold-glass-card rounded-3xl p-5 sm:p-8 shadow-2xl relative transition-all duration-300 ${
            isShaking ? 'animate-shake' : ''
          }`}
          style={{
            backgroundColor: `${theme.base}F2`,
            borderColor: `${theme.goldStart}99`,
          }}
        >
          {/* Ticket Passenger Header Strip when a guest name is saved */}
          {passengerBannerText && (
            <div
              data-testid="rsvp-ticket-passenger"
              className="mb-4 px-3.5 py-1.5 rounded-full border inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider uppercase"
              style={{
                backgroundColor: `${theme.tint1}88`,
                borderColor: `${theme.goldStart}99`,
                color: theme.button,
              }}
            >
              <span>🎫</span>
              <span>{passengerBannerText}</span>
            </div>
          )}

          {/* STEP CONTENT SWITCHER */}
          <div className="relative">
            {rsvpState.currentStep === 1 && (
              <Step1KaunAaRahaHai
                state={rsvpState}
                updateState={updateState}
                onNext={handleNextStep}
                onSkipToConfirm={() => goToStep(6)}
                theme={theme}
                dict={dict!}
              />
            )}

            {rsvpState.currentStep === 2 && (
              <Step2Parivaar
                state={rsvpState}
                updateState={updateState}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
                config={config}
                theme={theme}
              />
            )}

            {rsvpState.currentStep === 3 && (
              <Step3Khana
                state={rsvpState}
                updateState={updateState}
                onNext={handleNextStep}
                onPrev={handlePrevStep}
                config={config}
                theme={theme}
              />
            )}

            {rsvpState.currentStep === 4 && (
              <Step4SafarAurStay
                state={rsvpState}
                onChange={setRsvpState}
                lang={langCode}
              />
            )}

            {rsvpState.currentStep === 5 && (
              <Step5MastiAurAashirwad
                state={rsvpState}
                onChange={setRsvpState}
                lang={langCode}
              />
            )}

            {rsvpState.currentStep === 6 && (
              <Step6Confirm
                state={rsvpState}
                onChange={setRsvpState}
                onEditStep={goToStep}
                onFinalSubmit={handleFinalConfirmSubmit}
                onCopyDetails={handleCopyDetails}
                onShowToast={showToast}
                lang={langCode}
                dict={dict}
                guestDisplayName={guestDisplayName}
              />
            )}
          </div>

          {/* STEP NAVIGATION CONTROLS (For Steps 4 and 5) */}
          {(rsvpState.currentStep === 4 || rsvpState.currentStep === 5) && (
            <div className="pt-8 border-t border-stone-200/60 dark:border-stone-800/80 mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 sm:px-6 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 font-semibold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300 hover:bg-black/5 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>←</span>
                <span>{dict?.rsvpBtnBack || 'Back'}</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 sm:px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: theme.button,
                  color: theme.base,
                }}
              >
                <span>
                  {rsvpState.currentStep === 4
                    ? `${dict?.rsvpBtnNext || 'Next: '}${dict?.rsvpStep5Title || 'Step 5 · Fun and blessings'}`
                    : `${dict?.rsvpBtnNext || 'Next: '}${dict?.rsvpStep6Title || 'Step 6 · Confirm'}`}
                </span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

