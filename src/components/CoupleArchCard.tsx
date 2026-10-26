import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { getThemeEntranceMotion, THEMES, WeddingTheme } from '../themes/themes';
import { CornerFlourishes } from './PhulkariDivider';

interface CoupleProfile {
  firstName: string;
  fullName: string;
  firstNameByLang?: Record<string, string>;
  fullNameByLang?: Record<string, string>;
  parentsLine: string;
  bioLine: string;
  photoSrc: string;
  fallbackSrc?: string;
  photoPlaceholderLabel: string;
}

interface CoupleArchCardProps {
  profile: CoupleProfile;
  langCode?: string;
  roleLabel: string;
  hindiRoleLabel: string;
  parentsLine?: string;
  bioLine?: string;
  gradientStyle: string;
  theme?: WeddingTheme;
  delay?: number;
}

export const CoupleArchCard: React.FC<CoupleArchCardProps> = ({
  profile,
  langCode = 'en',
  roleLabel,
  hindiRoleLabel,
  parentsLine,
  bioLine,
  gradientStyle,
  theme = THEMES.sarson_subah,
  delay = 0,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [currentSrc, setCurrentSrc] = useState(profile.photoSrc);
  const [imgError, setImgError] = useState(false);
  const showImage = Boolean(currentSrc) && !imgError;

  const handleImgError = () => {
    if (profile.fallbackSrc && currentSrc !== profile.fallbackSrc) {
      setCurrentSrc(profile.fallbackSrc);
    } else {
      setImgError(true);
    }
  };

  const localizedFirst =
    (langCode !== 'en' && profile.firstNameByLang?.[langCode]) || profile.firstName;
  const localizedFull =
    (langCode !== 'en' && profile.fullNameByLang?.[langCode]) || profile.fullName;
  const usesLatinDisplay = langCode === 'en' || !profile.firstNameByLang?.[langCode];

  const entranceMotion = getThemeEntranceMotion(theme, prefersReducedMotion, delay);

  return (
    <motion.article
      initial={entranceMotion.initial}
      whileInView={entranceMotion.whileInView}
      viewport={{ once: true, amount: 0.25 }}
      transition={entranceMotion.transition}
      className="gold-glass-card rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />
      <CornerFlourishes theme={theme} />
      {/* Arch Photo Frame with Double Thin Gold Line */}
      <div
        className="relative z-10 w-52 h-64 p-1 rounded-t-full rounded-b-2xl shadow-sm mb-5 transition-all"
        style={{
          border: `1px solid ${theme.goldStart}`,
          backgroundColor: `${theme.base}E6`,
        }}
      >
        <div
          className="relative w-full h-full p-1 rounded-t-full rounded-b-xl overflow-hidden transition-all"
          style={{
            border: `1px solid ${theme.goldStart}99`,
            background: gradientStyle,
          }}
        >
          {showImage ? (
            <div className="relative w-full h-full overflow-hidden rounded-t-full rounded-b-lg">
              <img
                src={currentSrc}
                alt={localizedFull}
                width={416}
                height={512}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={handleImgError}
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                style={{ objectPosition: 'center 20%' }}
              />
              {/* Very soft warm colour grade (8% multiply overlay in active theme's tint) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: theme.tint1,
                  mixBlendMode: 'multiply',
                  opacity: 0.08,
                }}
                aria-hidden="true"
              />
            </div>
          ) : (
            <>
              {/* Delicate Jharokha & Lotus Silhouette inside Arch Slot */}
              <svg
                viewBox="0 0 120 150"
                fill="none"
                className="w-28 h-36 opacity-80"
                aria-hidden="true"
              >
                <path
                  d="M16 140 V68 C16 36 38 14 60 10 C82 14 104 36 104 68 V140"
                  stroke={theme.goldStart}
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx="60"
                  cy="56"
                  r="18"
                  fill={theme.base}
                  fillOpacity="0.65"
                  stroke={theme.goldStart}
                  strokeWidth="1.1"
                />
                <path
                  d="M60 44 C64 50 64 58 60 64 C56 58 56 50 60 44 Z"
                  fill={theme.goldEnd}
                  stroke={theme.button}
                  strokeWidth="1"
                />
                <path
                  d="M46 112 C46 95 74 95 74 112"
                  stroke={theme.button}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>
              <span
                className="mt-1 font-english text-[11px] tracking-wider uppercase opacity-75 cream-text-glow"
                style={{ color: theme.text }}
              >
                {profile.photoPlaceholderLabel}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Role Kicker */}
      <div
        className="flex items-center justify-center gap-2 text-xs mb-1 min-h-[1.25rem]"
        style={{ color: theme.button }}
      >
        <span className="font-hindi-body">{hindiRoleLabel}</span>
        <span aria-hidden="true">·</span>
        <span className="font-english uppercase tracking-[0.16em]">{roleLabel}</span>
      </div>

      {/* Name in Monsieur La Doulaise (Latin) or Native Script */}
      <h3
        className={`${
          usesLatinDisplay ? 'font-couple text-4xl' : 'font-couple-native text-3xl font-semibold'
        } cream-text-glow my-1 min-h-[2.5rem] flex items-center justify-center`}
        style={{ color: theme.text }}
      >
        {localizedFirst}
      </h3>
      <p
        className="font-heading-serif italic text-lg font-medium mb-2 min-h-[1.75rem]"
        style={{ color: theme.text }}
      >
        {localizedFull}
      </p>

      {/* Parents' Names & One-line Bio */}
      <p
        className="font-english text-xs opacity-90 leading-relaxed max-w-[300px] mb-2 min-h-[2.5rem]"
        style={{ color: theme.text }}
      >
        {parentsLine || profile.parentsLine}
      </p>
      <p
        className="font-heading-serif italic text-base leading-snug max-w-[300px] min-h-[2.5rem]"
        style={{ color: theme.button }}
      >
        “{bioLine || profile.bioLine}”
      </p>
    </motion.article>
  );
};
