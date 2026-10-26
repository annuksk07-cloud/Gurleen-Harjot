import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Heart, Train } from 'lucide-react';
import { WeddingTheme } from '../../themes/themes';
import { TranslationDictionary } from '../../i18n/translations';

interface RsvpProgressRailProps {
  currentStep: number; // 1 to 6
  onStepClick: (step: number) => void;
  maxAccessibleStep: number;
  theme: WeddingTheme;
  dict: TranslationDictionary;
}

export const RsvpProgressRail: React.FC<RsvpProgressRailProps> = ({
  currentStep,
  onStepClick,
  maxAccessibleStep,
  theme,
  dict,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const getStepLabel = (step: number) => {
    switch(step) {
      case 1: return { title: dict.rsvpStep1Title, short: dict.rsvpRailGuest };
      case 2: return { title: dict.rsvpStep2Title, short: dict.rsvpRailFamily };
      case 3: return { title: dict.rsvpStep3Title, short: dict.rsvpRailFood };
      case 4: return { title: dict.rsvpStep4Title, short: dict.rsvpRailTravel };
      case 5: return { title: dict.rsvpStep5Title, short: dict.rsvpRailFun };
      case 6: return { title: dict.rsvpStep6Title, short: dict.rsvpRailTicket };
      default: return { title: '', short: '' };
    }
  };

  const currentLabel = getStepLabel(currentStep);
  const progressPercent = ((currentStep - 1) / 5) * 100;

  return (
    <nav
      aria-label="RSVP Wizard Steps"
      className="w-full max-w-[640px] mx-auto mb-6 px-2 sm:px-4"
    >
      {/* Train Tracker Header Banner */}
      <div className="flex items-center justify-between text-xs font-english mb-2.5 px-1">
        <div className="flex items-center gap-1.5 font-medium tracking-wider uppercase" style={{ color: theme.button }}>
          <Train className="w-4 h-4 rtl-flip" aria-hidden="true" />
          <span>{dict.rsvpBogieLabel.replace('{step}', currentStep.toString())}</span>
        </div>
        <div className="font-heading-serif italic text-sm" style={{ color: theme.accent }}>
          {currentLabel.title}
        </div>
      </div>

      {/* Progress Rail (Railway track styling) */}
      <div className="relative w-full py-3">
        {/* Railway ties background */}
        <div
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: `${theme.tint1}80` }}
        >
          {/* Active filled line */}
          <motion.div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: theme.button,
            }}
          />
        </div>

        {/* Railway track sleepers / ties pattern */}
        <div
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-3.5 pointer-events-none opacity-25"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${theme.text} 0px, ${theme.text} 2px, transparent 2px, transparent 12px)`,
          }}
          aria-hidden="true"
        />

        {/* Travelling Heart Icon along the rail */}
        <motion.div
          animate={
            prefersReducedMotion
              ? { left: `${progressPercent}%` }
              : { left: `${progressPercent}%`, scale: [1, 1.25, 1] }
          }
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center justify-center"
        >
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center shadow-md border"
            style={{
              backgroundColor: theme.accent,
              borderColor: theme.goldEnd,
              color: '#FFF8EC',
            }}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
          </span>
        </motion.div>

        {/* Step Nodes */}
        <ol className="relative z-10 flex items-center justify-between list-none p-0 m-0">
          {[1, 2, 3, 4, 5, 6].map((step) => {
            const label = getStepLabel(step);
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            const isClickable = step <= maxAccessibleStep;

            return (
              <li key={step} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => isClickable && onStepClick(step)}
                  disabled={!isClickable}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`Step ${step}: ${label.title}`}
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition-all ${
                    isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                  }`}
                >
                  <span
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm border"
                    style={{
                      backgroundColor: isCurrent
                        ? theme.button
                        : isCompleted
                        ? theme.goldEnd
                        : `${theme.base}F2`,
                      color: isCurrent ? theme.base : theme.text,
                      borderColor: isCurrent ? theme.button : `${theme.goldStart}99`,
                    }}
                  >
                    {step}
                  </span>
                </button>
                <span
                  className="hidden sm:block text-[11px] font-english tracking-tight whitespace-nowrap mt-0.5 select-none"
                  style={{
                    color: isCurrent ? theme.button : theme.text,
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  {label.short}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
