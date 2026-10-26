import React from 'react';
import { motion } from 'motion/react';
import { THEMES, ThemeDividerToken, WeddingTheme } from '../themes/themes';

interface PhulkariDividerProps {
  variant?: 'marigold' | 'sage' | 'lilac' | 'mulberry';
  theme?: WeddingTheme;
  className?: string;
}

const FALLBACK_ACCENT_MAP = {
  marigold: '#F2CF7E',
  sage: '#9BB48B',
  lilac: '#C3AFDA',
  mulberry: '#7A3E55',
};

/**
 * Renders the center SVG divider ornament based on the active theme's `divider` token
 * across all 16 themes:
 * - phulkari_flowers (sarson_subah)
 * - gold_marigold_bloom (anand_karaj)
 * - small_mandala (kesariya_gulab)
 * - mogra_gajra (paithani)
 * - mirror_circles (bandhani_garba)
 * - alpona_leaf (alpona)
 * - fish_chain (madhubani)
 * - kolam_row (kanjeevaram)
 * - diamond_chain (pochampally)
 * - arch_trio (mysore_silk)
 * - nilavilakku_lamp (kasavu)
 * - arabesque_knot (nikah)
 * - jaali_knot (mehfil_e_gulab)
 * - olive_sprig_rings (white_aisle)
 * - lotus_buds_row (kamal)
 * - small_floral (blush_modern)
 */
const ThemeCenterDividerSvg: React.FC<{
  divider: ThemeDividerToken;
  gold: string;
  accent: string;
  button: string;
  base: string;
}> = ({ divider, gold, accent, button, base }) => {
  switch (divider) {
    case 'small_mandala':
      return (
        <g>
          <circle cx="180" cy="18" r="14" fill={base} stroke={gold} strokeWidth="1.2" />
          <circle cx="180" cy="18" r="10" fill="none" stroke={button} strokeWidth="0.9" strokeDasharray="2 2" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="180"
              cy="9"
              rx="2.3"
              ry="4.5"
              transform={`rotate(${deg} 180 18)`}
              fill={accent}
              fillOpacity="0.45"
              stroke={button}
              strokeWidth="0.8"
            />
          ))}
          <circle cx="180" cy="18" r="3" fill={gold} />
        </g>
      );

    case 'mogra_gajra':
      return (
        <g>
          {[126, 140, 154, 168, 180, 192, 206, 220, 234].map((cx, i) => (
            <g key={cx}>
              <circle
                cx={cx}
                cy="18"
                r={i === 4 ? 5.2 : i % 2 === 0 ? 4.2 : 3.4}
                fill="#FFFDF9"
                stroke={gold}
                strokeWidth="1"
              />
              <circle cx={cx} cy="18" r="1.2" fill={accent} />
            </g>
          ))}
          <path
            d="M116 18 L122 14 L122 22 Z M244 18 L238 14 L238 22 Z"
            fill={accent}
          />
        </g>
      );

    case 'mirror_circles':
      return (
        <g>
          {[136, 158, 180, 202, 224].map((cx, i) => {
            const r = i === 2 ? 7.5 : 5.5;
            return (
              <g key={cx}>
                <circle
                  cx={cx}
                  cy="18"
                  r={r + 2.2}
                  fill="none"
                  stroke={button}
                  strokeWidth="1"
                  strokeDasharray="2 1.5"
                />
                <circle
                  cx={cx}
                  cy="18"
                  r={r}
                  fill="#FFFDF7"
                  stroke={gold}
                  strokeWidth="1.2"
                />
                <path
                  d={`M${cx - r * 0.5} ${18 - r * 0.5} L${cx + r * 0.4} ${18 + r * 0.4}`}
                  stroke={accent}
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </g>
      );

    case 'alpona_leaf':
      return (
        <g>
          <path
            d="M140 18 C154 6, 168 6, 180 18 C192 30, 206 30, 220 18"
            stroke={accent}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M180 4 C188 12, 188 24, 180 32 C172 24, 172 12, 180 4 Z"
            fill={base}
            stroke={button}
            strokeWidth="1.3"
          />
          <path
            d="M158 18 C164 11, 172 12, 176 18 C172 24, 164 25, 158 18 Z M202 18 C196 11, 188 12, 184 18 C188 24, 196 25, 202 18 Z"
            fill={accent}
            fillOpacity="0.4"
            stroke={gold}
            strokeWidth="1"
          />
          <circle cx="180" cy="18" r="2.2" fill={button} />
        </g>
      );

    case 'fish_chain':
      return (
        <g>
          {[142, 180, 218].map((cx) => (
            <g key={cx}>
              <path
                d={`M${cx - 10} 18 C${cx - 4} 11, ${cx + 6} 11, ${cx + 12} 18 C${cx + 6} 25, ${cx - 4} 25, ${cx - 10} 18 Z`}
                fill={accent}
                fillOpacity="0.38"
                stroke={button}
                strokeWidth="1.2"
              />
              <path
                d={`M${cx - 10} 18 L${cx - 15} 13 V23 Z`}
                fill={gold}
                stroke={button}
                strokeWidth="1"
              />
              <circle cx={cx + 6} cy="16.5" r="1.1" fill={button} />
            </g>
          ))}
        </g>
      );

    case 'kolam_row':
      return (
        <g>
          {[144, 168, 192, 216].map((cx) => (
            <g key={cx}>
              <path
                d={`M${cx} 9 L${cx + 9} 18 L${cx} 27 L${cx - 9} 18 Z`}
                fill={base}
                stroke={button}
                strokeWidth="1.2"
              />
              <circle cx={cx} cy="18" r="2.2" fill={accent} />
            </g>
          ))}
        </g>
      );

    case 'diamond_chain':
      return (
        <g>
          {[136, 158, 180, 202, 224].map((cx, i) => (
            <g key={cx}>
              <path
                d={`M${cx} 7 L${cx + 11} 18 L${cx} 29 L${cx - 11} 18 Z`}
                fill={i % 2 === 0 ? accent : base}
                fillOpacity={i % 2 === 0 ? 0.35 : 0.9}
                stroke={gold}
                strokeWidth="1.25"
                strokeDasharray="3 1"
              />
              <rect
                x={cx - 3}
                y="15"
                width="6"
                height="6"
                transform={`rotate(45 ${cx} 18)`}
                fill={button}
              />
            </g>
          ))}
        </g>
      );

    case 'arch_trio':
      return (
        <g>
          {[148, 180, 212].map((cx, i) => {
            const h = i === 1 ? 4 : 7;
            return (
              <g key={cx}>
                <path
                  d={`M${cx - 12} 29 V18 C${cx - 12} 11 ${cx - 5} ${h + 2} ${cx} ${h} C${cx + 5} ${h + 2} ${cx + 12} 11 ${cx + 12} 18 V29 Z`}
                  fill={base}
                  stroke={gold}
                  strokeWidth="1.25"
                />
                <circle cx={cx} cy="20" r="2.8" fill={accent} fillOpacity="0.65" />
              </g>
            );
          })}
        </g>
      );

    case 'nilavilakku_lamp':
      return (
        <g>
          <line x1="128" y1="16" x2="164" y2="16" stroke={gold} strokeWidth="2" />
          <line x1="128" y1="20" x2="164" y2="20" stroke={gold} strokeWidth="1" />
          <line x1="196" y1="16" x2="232" y2="16" stroke={gold} strokeWidth="2" />
          <line x1="196" y1="20" x2="232" y2="20" stroke={gold} strokeWidth="1" />
          <path
            d="M168 30 H192 M172 25 H188 M168 18 H192 M180 14 V30"
            stroke={gold}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M180 3 C184 8 184 13 180 16 C176 13 176 8 180 3 Z"
            fill={gold}
            stroke={button}
            strokeWidth="1"
          />
        </g>
      );

    case 'arabesque_knot':
      return (
        <g>
          <rect
            x="169"
            y="7"
            width="22"
            height="22"
            fill={base}
            stroke={gold}
            strokeWidth="1.2"
          />
          <rect
            x="169"
            y="7"
            width="22"
            height="22"
            transform="rotate(45 180 18)"
            fill={accent}
            fillOpacity="0.35"
            stroke={button}
            strokeWidth="1.2"
          />
          <path d="M144 18 L154 11 L164 18 L154 25 Z M196 18 L206 11 L216 18 L206 25 Z" stroke={gold} strokeWidth="1.1" fill="none" />
          <circle cx="180" cy="18" r="3.2" fill={gold} />
        </g>
      );

    case 'gold_marigold_bloom':
      return (
        <g>
          {/* Sunehri Dhoop: Gold marigold bloom with double lines */}
          <line x1="124" y1="15.5" x2="158" y2="15.5" stroke={gold} strokeWidth="1.2" />
          <line x1="124" y1="20.5" x2="158" y2="20.5" stroke={gold} strokeWidth="1.2" />
          <line x1="202" y1="15.5" x2="236" y2="20.5" stroke="none" />
          <line x1="202" y1="15.5" x2="236" y2="15.5" stroke={gold} strokeWidth="1.2" />
          <line x1="202" y1="20.5" x2="236" y2="20.5" stroke={gold} strokeWidth="1.2" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse
              key={deg}
              cx="180"
              cy="9"
              rx="2.6"
              ry="5.2"
              transform={`rotate(${deg} 180 18)`}
              fill={accent}
              fillOpacity="0.65"
              stroke={gold}
              strokeWidth="0.9"
            />
          ))}
          <circle cx="180" cy="18" r="5" fill={button} stroke={gold} strokeWidth="1.2" />
          <circle cx="180" cy="18" r="2.2" fill={gold} />
        </g>
      );

    case 'jaali_knot':
      return (
        <g>
          {/* Gulabi Jaali: Jaali knot with two rose buds */}
          <path
            d="M168 18 L180 6 L192 18 L180 30 Z"
            fill={base}
            stroke={gold}
            strokeWidth="1.3"
          />
          <path
            d="M172 18 L180 10 L188 18 L180 26 Z"
            fill={accent}
            fillOpacity="0.35"
            stroke={button}
            strokeWidth="1"
          />
          {/* Left Rose Bud */}
          <path
            d="M150 18 C154 12, 160 12, 163 18 C160 24, 154 24, 150 18 Z"
            fill={accent}
            fillOpacity="0.65"
            stroke={gold}
            strokeWidth="1"
          />
          {/* Right Rose Bud */}
          <path
            d="M210 18 C206 12, 200 12, 197 18 C200 24, 206 24, 210 18 Z"
            fill={accent}
            fillOpacity="0.65"
            stroke={gold}
            strokeWidth="1"
          />
          <circle cx="180" cy="18" r="2.5" fill={gold} />
        </g>
      );

    case 'olive_sprig_rings':
      return (
        <g>
          {/* Ivory Grove: Olive sprig with two interlocked rings */}
          <path
            d="M134 18 Q150 13 164 18 M196 18 Q210 13 226 18"
            stroke={accent}
            strokeWidth="1.2"
            fill="none"
          />
          <ellipse cx="148" cy="14" rx="4.5" ry="2" transform="rotate(-22 148 14)" fill={accent} fillOpacity="0.6" />
          <ellipse cx="156" cy="21" rx="4.5" ry="2" transform="rotate(22 156 21)" fill={accent} fillOpacity="0.6" />
          <ellipse cx="212" cy="14" rx="4.5" ry="2" transform="rotate(22 212 14)" fill={accent} fillOpacity="0.6" />
          <ellipse cx="204" cy="21" rx="4.5" ry="2" transform="rotate(-22 204 21)" fill={accent} fillOpacity="0.6" />
          {/* Two Interlocked Rings */}
          <circle cx="176" cy="18" r="7.5" fill="none" stroke={gold} strokeWidth="1.5" />
          <circle cx="184" cy="18" r="7.5" fill="none" stroke={gold} strokeWidth="1.5" />
        </g>
      );

    case 'lotus_buds_row':
      return (
        <g>
          {/* Moti Gulabi: Row of 3 serene lotus buds */}
          {[150, 180, 210].map((cx, idx) => {
            const scale = idx === 1 ? 1.15 : 0.9;
            return (
              <g key={cx} transform={`translate(${cx} 18) scale(${scale})`}>
                <path
                  d="M0 -10 C4 -4, 4 4, 0 8 C-4 4, -4 -4, 0 -10 Z"
                  fill={accent}
                  fillOpacity="0.55"
                  stroke={gold}
                  strokeWidth="1.1"
                />
                <path
                  d="M0 8 C-7 5, -9 -2, -5 -6 C-3 -2, -2 3, 0 8 Z"
                  fill={base}
                  stroke={gold}
                  strokeWidth="1"
                />
                <path
                  d="M0 8 C7 5, 9 -2, 5 -6 C3 -2, 2 3, 0 8 Z"
                  fill={base}
                  stroke={gold}
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </g>
      );

    case 'small_floral':
      return (
        <g>
          <path
            d="M148 18 C160 10, 170 10, 180 18 C190 26, 200 26, 212 18"
            stroke={gold}
            strokeWidth="1.2"
            fill="none"
          />
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="180"
              cy="12"
              rx="2.5"
              ry="4.5"
              transform={`rotate(${deg} 180 18)`}
              fill={accent}
              fillOpacity="0.5"
              stroke={gold}
              strokeWidth="0.9"
            />
          ))}
          <circle cx="180" cy="18" r="2.5" fill={button} />
        </g>
      );

    case 'phulkari_flowers':
    default:
      return (
        <g>
          {[138, 180, 222].map((cx, idx) => {
            const s = idx === 1 ? 12 : 9;
            return (
              <g key={cx}>
                <path
                  d={`M ${cx} ${18 - s} L ${cx + s * 0.45} ${18 - s * 0.45} L ${cx + s} 18 L ${cx + s * 0.45} ${18 + s * 0.45} L ${cx} ${18 + s} L ${cx - s * 0.45} ${18 + s * 0.45} L ${cx - s} 18 L ${cx - s * 0.45} ${18 - s * 0.45} Z`}
                  stroke={gold}
                  strokeWidth="1.25"
                  fill={base}
                />
                <path
                  d={`M ${cx} ${18 - s * 0.55} L ${cx + s * 0.55} 18 L ${cx} ${18 + s * 0.55} L ${cx - s * 0.55} 18 Z`}
                  stroke={button}
                  strokeWidth="1"
                  fill={accent}
                  fillOpacity="0.6"
                />
              </g>
            );
          })}
        </g>
      );
  }
};

/**
 * Corner Flourishes controlled by `theme.ornamentLevel` (1 = minimal/hidden, 2 = subtle, 3 = rich filigree).
 * Strictly ornamental floral/geometric curves — no sacred symbols.
 */
export const CornerFlourishes: React.FC<{
  theme?: WeddingTheme;
  className?: string;
}> = ({ theme = THEMES.sarson_subah, className = '' }) => {
  const level = theme?.ornamentLevel ?? 2;
  if (level <= 1) return null;

  const gold = theme?.goldStart || '#C99A4B';
  const accent = theme?.accent || '#D97C6C';

  return (
    <div
      className={`pointer-events-none absolute inset-2.5 overflow-hidden select-none ${className}`}
      aria-hidden="true"
      data-ornament-level={level}
    >
      {[
        'top-0 left-0',
        'top-0 right-0 scale-x-[-1]',
        'bottom-0 left-0 scale-y-[-1]',
        'bottom-0 right-0 scale-[-1]',
      ].map((posClass, idx) => (
        <svg
          key={idx}
          viewBox="0 0 36 36"
          className={`absolute ${posClass} ${level === 3 ? 'w-7 h-7 opacity-75' : 'w-5 h-5 opacity-50'}`}
          fill="none"
        >
          <path
            d="M2 22 V6 C2 3.8 3.8 2 6 2 H22"
            stroke={gold}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {level === 3 && (
            <>
              <path
                d="M6 16 V8 C6 6.9 6.9 6 8 6 H16"
                stroke={accent}
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle cx="10" cy="10" r="1.8" fill={gold} />
            </>
          )}
        </svg>
      ))}
    </div>
  );
};

export const PhulkariDivider: React.FC<PhulkariDividerProps> = ({
  variant = 'marigold',
  theme = THEMES.sarson_subah,
  className = '',
}) => {
  const accent = theme ? theme.accent : FALLBACK_ACCENT_MAP[variant];
  const goldStart = theme?.goldStart || '#C99A4B';
  const goldEnd = theme?.goldEnd || '#F1D58A';
  const button = theme?.button || '#7A3E55';
  const base = theme?.base || '#FFF8EC';
  const motif = theme?.motif || 'phulkari';
  const divider = theme?.divider || 'phulkari_flowers';
  const ornamentLevel = theme?.ornamentLevel ?? 2;

  return (
    <div
      data-motif={motif}
      data-divider={divider}
      data-ornament-level={ornamentLevel}
      className={`w-full py-5 px-6 flex items-center justify-center overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 360 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[340px] h-9"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <defs>
          <linearGradient id={`gold-grad-${divider}-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={goldStart} stopOpacity="0.2" />
            <stop offset="25%" stopColor={goldStart} stopOpacity="0.9" />
            <stop offset="50%" stopColor={goldEnd} stopOpacity="1" />
            <stop offset="75%" stopColor={goldStart} stopOpacity="0.9" />
            <stop offset="100%" stopColor={goldStart} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Left & Right Horizontal Stitch */}
        <motion.path
          d="M 8 18 L 116 18 M 244 18 L 352 18"
          stroke={`url(#gold-grad-${divider}-${variant})`}
          strokeWidth="1.2"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        />

        {/* Extra filigree parallel line when ornamentLevel === 3 */}
        {ornamentLevel === 3 && (
          <path
            d="M 28 14.5 L 100 14.5 M 28 21.5 L 100 21.5 M 260 14.5 L 332 14.5 M 260 21.5 L 332 21.5"
            stroke={goldStart}
            strokeOpacity="0.45"
            strokeWidth="0.75"
            strokeDasharray="3 2"
          />
        )}

        {/* Active Theme Regional Center Divider */}
        <ThemeCenterDividerSvg
          divider={divider}
          gold={goldStart}
          accent={accent}
          button={button}
          base={base}
        />

        {/* Fine Thread Accent Buds (shown for ornamentLevel >= 2) */}
        {ornamentLevel >= 2 && (
          <>
            <circle cx="106" cy="18" r="2.2" fill={goldStart} opacity="0.85" />
            <circle cx="254" cy="18" r="2.2" fill={goldStart} opacity="0.85" />
          </>
        )}
        {ornamentLevel === 3 && (
          <>
            <path d="M92 18 L96 14.5 L100 18 L96 21.5 Z" fill={accent} fillOpacity="0.65" />
            <path d="M260 18 L264 14.5 L268 18 L264 21.5 Z" fill={accent} fillOpacity="0.65" />
          </>
        )}
      </motion.svg>
    </div>
  );
};
