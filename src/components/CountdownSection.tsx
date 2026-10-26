import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { WeddingConfig } from '../config';
import { calculateCountdown, CountdownTime } from '../utils/weddingUtils';
import {
  formatLocalizedEventDateParts,
  getLanguageMeta,
  TranslationDictionary,
} from '../i18n/translations';
import { getThemeEntranceMotion, THEMES, WeddingTheme } from '../themes/themes';
import { formatPersonalisedLine } from '../utils/relativeMatching';

interface CountdownSectionProps {
  config: WeddingConfig;
  langCode?: string;
  dict?: TranslationDictionary;
  theme?: WeddingTheme;
  guestDisplayName?: string | null;
}

interface FlipUnitProps {
  value: number;
  label: string;
  subLabel: string;
  theme: WeddingTheme;
}

const FlipUnit: React.FC<FlipUnitProps> = ({ value, label, subLabel, theme }) => {
  const formatted = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[4/5] max-w-[82px] min-h-[78px] rounded-2xl gold-glass-card flex items-center justify-center overflow-hidden px-2 py-3">
        {/* Subtle horizontal flip hinge line */}
        <div
          className="absolute inset-x-2 top-1/2 h-[1px] pointer-events-none"
          style={{ backgroundColor: `${theme.goldStart}33` }}
          aria-hidden="true"
        />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: -18, opacity: 0, rotateX: 35 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 18, opacity: 0, rotateX: -35 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading-serif italic text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight"
            style={{ color: theme.text }}
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="mt-2 font-english text-[11px] uppercase tracking-[0.14em] min-h-[1.1rem]"
        style={{ color: theme.text }}
      >
        {label}
      </span>
      {subLabel && subLabel !== label && (
        <span
          className="font-hindi-body text-[11px] opacity-85"
          style={{ color: theme.button }}
        >
          {subLabel}
        </span>
      )}
    </div>
  );
};

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  config,
  langCode = 'en',
  dict,
  theme = THEMES.punjabi,
  guestDisplayName = null,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateCountdown(config.WEDDING_DATETIME_ISO)
  );

  useEffect(() => {
    const update = () => {
      setTimeLeft(calculateCountdown(config.WEDDING_DATETIME_ISO));
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [config.WEDDING_DATETIME_ISO]);

  const langMeta = getLanguageMeta(langCode);
  const localizedFullDate = formatLocalizedEventDateParts(
    config.WEDDING_DATETIME_ISO,
    langMeta.locale
  ).fullDate;

  const entranceMotion = getThemeEntranceMotion(theme, prefersReducedMotion);

  const headingText = guestDisplayName
    ? formatPersonalisedLine(
        dict?.countdownHeading_guest || '{guest}, the big day is almost here',
        guestDisplayName
      )
    : dict?.countdownHeading || 'Until Our Sacred Vows';

  return (
    <section
      aria-labelledby="countdown-heading"
      className="relative w-full px-4 sm:px-6 py-[clamp(48px,7vw,76px)] overflow-hidden theme-surface-transition"
      style={{
        background: `linear-gradient(180deg, ${theme.base} 0%, ${theme.tint3} 48%, ${theme.base} 100%)`,
      }}
    >
      <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />
      <motion.div
        initial={entranceMotion.initial}
        whileInView={entranceMotion.whileInView}
        viewport={{ once: true, amount: 0.25 }}
        transition={entranceMotion.transition}
        className="relative z-10 w-full max-w-[720px] lg:max-w-[1120px] mx-auto text-center"
      >
        <p
          className="font-cursive-touch text-2xl sm:text-3xl cream-text-glow mb-1 min-h-[2.25rem]"
          style={{ color: theme.button }}
        >
          {dict?.countdownKicker || 'Counting the moments'}
        </p>
        <h2
          id="countdown-heading"
          className="font-heading-serif italic text-gold-shimmer mb-2 min-h-[2.75rem]"
          style={{ fontSize: 'clamp(1.85rem, 4vw, 2.6rem)' }}
        >
          {headingText}
        </h2>
        <p
          className="font-english text-xs tracking-[0.15em] uppercase opacity-80 mb-8 min-h-[1.25rem]"
          style={{ color: theme.text }}
        >
          {langCode === 'en' ? config.WEDDING_DATE_FULL : localizedFullDate}
        </p>

        <div
          className="max-w-[560px] mx-auto grid grid-cols-4 gap-2.5 sm:gap-4"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          <FlipUnit
            value={timeLeft.days}
            label={dict?.countdownDays || 'Days'}
            subLabel={dict?.countdownDaysSub || ''}
            theme={theme}
          />
          <FlipUnit
            value={timeLeft.hours}
            label={dict?.countdownHours || 'Hours'}
            subLabel={dict?.countdownHoursSub || ''}
            theme={theme}
          />
          <FlipUnit
            value={timeLeft.minutes}
            label={dict?.countdownMinutes || 'Minutes'}
            subLabel={dict?.countdownMinutesSub || ''}
            theme={theme}
          />
          <FlipUnit
            value={timeLeft.seconds}
            label={dict?.countdownSeconds || 'Seconds'}
            subLabel={dict?.countdownSecondsSub || ''}
            theme={theme}
          />
        </div>
      </motion.div>
    </section>
  );
};
