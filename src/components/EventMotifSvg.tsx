import React from 'react';

interface EventMotifSvgProps {
  eventId: string;
  className?: string;
}

/**
 * Custom code-only SVG motifs for each of the 5 Punjabi wedding ceremonies.
 */
export const EventMotifSvg: React.FC<EventMotifSvgProps> = ({ eventId, className = 'w-11 h-11' }) => {
  switch (eventId) {
    case 'haldi':
      // Marigold bloom & Vatna bowl
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="21" stroke="#C99A4B" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M24 10 C27 14 27 19 24 22 C21 19 21 14 24 10 Z"
            fill="#F2CF7E"
            stroke="#C99A4B"
            strokeWidth="1.2"
          />
          <path
            d="M15 15 C19 16 22 19 22 23 C18 22 15 19 15 15 Z"
            fill="#F9D8BC"
            stroke="#C99A4B"
            strokeWidth="1.2"
          />
          <path
            d="M33 15 C29 16 26 19 26 23 C30 22 33 19 33 15 Z"
            fill="#F9D8BC"
            stroke="#C99A4B"
            strokeWidth="1.2"
          />
          <path
            d="M12 26 H36 C35 33 30 37 24 37 C18 37 13 33 12 26 Z"
            fill="#FFF8EC"
            stroke="#7A3E55"
            strokeWidth="1.3"
          />
          <path d="M16 30 H32" stroke="#C99A4B" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );

    case 'mehndi':
      // Paisley Ambi & Botanical Leaf
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="21" stroke="#C99A4B" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M24 11 C32 11 35 19 33 27 C31 34 25 37 19 35 C14 33 14 26 18 22 C21 19 25 20 25 24 C25 26 23 27 21 26"
            stroke="#7A3E55"
            strokeWidth="1.35"
            strokeLinecap="round"
            fill="#CBD9C0"
            fillOpacity="0.45"
          />
          <circle cx="24" cy="16" r="1.5" fill="#C99A4B" />
          <circle cx="28" cy="21" r="1.5" fill="#C99A4B" />
          <circle cx="27" cy="27" r="1.5" fill="#C99A4B" />
          <circle cx="22" cy="31" r="1.5" fill="#C99A4B" />
        </svg>
      );

    case 'sangeet':
      // Punjabi Dhol & Jago Diya
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="21" stroke="#C99A4B" strokeWidth="1" strokeDasharray="2 2" />
          <ellipse cx="15" cy="25" rx="3.5" ry="9" fill="#F9D8BC" stroke="#7A3E55" strokeWidth="1.25" />
          <ellipse cx="33" cy="25" rx="3.5" ry="9" fill="#F9D8BC" stroke="#7A3E55" strokeWidth="1.25" />
          <path d="M15 16 C21 14 27 14 33 16" stroke="#7A3E55" strokeWidth="1.3" />
          <path d="M15 34 C21 36 27 36 33 34" stroke="#7A3E55" strokeWidth="1.3" />
          <path d="M18 16 L24 34 L30 16" stroke="#C99A4B" strokeWidth="1.1" strokeLinejoin="round" />
          <path d="M18 34 L24 16 L30 34" stroke="#C99A4B" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      );

    case 'anand-karaj':
      // Sacred Lotus & Palki Archway
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="21" stroke="#C99A4B" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M13 34 V22 C13 15 24 10 24 10 C24 10 35 15 35 22 V34"
            stroke="#C99A4B"
            strokeWidth="1.4"
            fill="#F9D8BC"
            fillOpacity="0.35"
          />
          <path
            d="M24 17 C27 21 27 26 24 30 C21 26 21 21 24 17 Z"
            fill="#F2CF7E"
            stroke="#7A3E55"
            strokeWidth="1.2"
          />
          <path
            d="M24 30 C20 29 17 25 18 21 C21 22 23 26 24 30 Z"
            fill="#FFF8EC"
            stroke="#7A3E55"
            strokeWidth="1.1"
          />
          <path
            d="M24 30 C28 29 31 25 30 21 C27 22 25 26 24 30 Z"
            fill="#FFF8EC"
            stroke="#7A3E55"
            strokeWidth="1.1"
          />
          <line x1="11" y1="34" x2="37" y2="34" stroke="#7A3E55" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );

    default:
      // Royal Bhoj Cloche / Kalash
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="21" stroke="#C99A4B" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M13 29 C13 21 18 16 24 16 C30 16 35 21 35 29 Z"
            fill="#E8A598"
            fillOpacity="0.35"
            stroke="#7A3E55"
            strokeWidth="1.3"
          />
          <circle cx="24" cy="14" r="2" fill="#C99A4B" stroke="#7A3E55" strokeWidth="1" />
          <line x1="10" y1="32" x2="38" y2="32" stroke="#C99A4B" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 35 H32" stroke="#7A3E55" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
  }
};

/**
 * Heritage Punjabi Jharokha Archway SVG for Venue Card
 */
export const HeritageArchwaySvg: React.FC<{ className?: string }> = ({ className = 'w-28 h-20' }) => (
  <svg viewBox="0 0 140 90" fill="none" className={className} aria-hidden="true">
    {/* Outer Jharokha Scalloped Arch */}
    <path
      d="M20 84 V42 C20 22 45 10 70 6 C95 10 120 22 120 42 V84"
      stroke="#C99A4B"
      strokeWidth="1.5"
      fill="#FFF8EC"
      fillOpacity="0.65"
    />
    <path
      d="M28 84 V44 C28 28 49 17 70 13 C91 17 112 28 112 44 V84"
      stroke="#7A3E55"
      strokeWidth="1"
      strokeDasharray="3 2"
    />
    {/* Hanging Marigold Toran Garland */}
    <path
      d="M28 42 Q42 52 56 42 Q70 52 84 42 Q98 52 112 42"
      stroke="#C99A4B"
      strokeWidth="1.3"
      fill="none"
    />
    <circle cx="42" cy="48" r="2.5" fill="#F2CF7E" />
    <circle cx="70" cy="48" r="3" fill="#E8A598" />
    <circle cx="98" cy="48" r="2.5" fill="#F2CF7E" />
    {/* Courtyard Pillars & Base */}
    <line x1="12" y1="84" x2="128" y2="84" stroke="#C99A4B" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="70" cy="26" r="4" fill="#F2CF7E" stroke="#C99A4B" strokeWidth="1.1" />
  </svg>
);
