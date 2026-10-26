import { WeddingConfig } from '../config';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export interface RsvpPayload {
  guestName: string;
  guestsCount: number;
  attendingEvents: string[];
  message: string;
}

export interface RsvpValidationResult {
  valid: boolean;
  errors: {
    guestName?: string;
    attendingEvents?: string;
    guestsCount?: string;
  };
}

/**
 * Calculates remaining days, hours, minutes, and seconds until target ISO datetime.
 */
export function calculateCountdown(targetIso: string, nowMs: number = Date.now()): CountdownTime {
  const targetMs = new Date(targetIso).getTime();
  if (Number.isNaN(targetMs) || nowMs >= targetMs) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const diffSeconds = Math.floor((targetMs - nowMs) / 1000);
  const days = Math.floor(diffSeconds / 86400);
  const hours = Math.floor((diffSeconds % 86400) / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
  };
}

/**
 * Formats a Date object as UTC iCalendar timestamp (YYYYMMDDTHHMMSSZ).
 */
export function formatIcsUtcDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return '20261212T050000Z';
  }
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

const LANGUAGE_ENGLISH_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  pa: 'Punjabi',
  mr: 'Marathi',
  gu: 'Gujarati',
  bn: 'Bengali',
  bho: 'Bhojpuri',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  ml: 'Malayalam',
  ur: 'Urdu',
};

export function getLanguageDisplayName(langCode?: string): string {
  if (!langCode) return 'English';
  const normalized = langCode.trim().toLowerCase();
  return LANGUAGE_ENGLISH_NAMES[normalized] || 'English';
}

/**
 * Generates RFC 5545 compliant .ics calendar content for the wedding.
 */
export function generateIcsContent(config: WeddingConfig, langCode?: string): string {
  const dtStart = formatIcsUtcDate(config.WEDDING_DATETIME_ISO);
  const dtEnd = formatIcsUtcDate(config.WEDDING_END_DATETIME_ISO);
  const dtStamp = formatIcsUtcDate(new Date().toISOString());
  const langName = getLanguageDisplayName(langCode);

  const location = `${config.PRIMARY_VENUE.name}, ${config.PRIMARY_VENUE.addressLine1}, ${config.PRIMARY_VENUE.addressLine2}`;
  const scheduleSummary = config.EVENTS.map(
    (evt) => `${evt.name.en}: ${evt.date} at ${evt.time} - ${evt.venueName}`
  ).join('\\n');

  const description = [
    `Language: ${langName}`,
    `Wedding Celebration of ${config.COUPLE_DISPLAY_NAMES}`,
    config.INVITATION_ENGLISH_LINE,
    '',
    'Celebration Schedule:',
    scheduleSummary,
    '',
    `Venue Maps: ${config.PRIMARY_VENUE.mapsUrl}`,
    `Hashtag: ${config.HASHTAG}`,
  ].join('\\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sarson Subah Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${config.HASHTAG.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}@sarsonsubah.invite`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Wedding of ${config.COUPLE_DISPLAY_NAMES}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `URL:${config.PRIMARY_VENUE.mapsUrl}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

/**
 * Validates RSVP form input before opening WhatsApp.
 */
export function validateRsvpPayload(payload: RsvpPayload): RsvpValidationResult {
  const errors: RsvpValidationResult['errors'] = {};
  const trimmedName = payload.guestName.trim();

  if (!trimmedName) {
    errors.guestName = 'Please enter your full name so we can reserve your place.';
  } else if (trimmedName.length < 2) {
    errors.guestName = 'Please enter at least 2 characters for your name.';
  }

  if (!Number.isInteger(payload.guestsCount) || payload.guestsCount < 1 || payload.guestsCount > 15) {
    errors.guestsCount = 'Please choose between 1 and 15 guests.';
  }

  if (!Array.isArray(payload.attendingEvents) || payload.attendingEvents.length === 0) {
    errors.attendingEvents = 'Please select at least one celebration you will attend.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds the formatted WhatsApp RSVP message and wa.me URL from config.
 */
export function buildWhatsAppRsvp(
  whatsappNumber: string,
  coupleDisplayNames: string,
  payload: RsvpPayload
): { messageText: string; whatsappUrl: string } {
  const sanitizedPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const trimmedName = payload.guestName.trim();
  const trimmedNote = payload.message.trim();
  const eventsList = payload.attendingEvents.join(', ');

  const lines = [
    `Sat Sri Akal & Namaste!`,
    `RSVP for ${coupleDisplayNames}'s Wedding Celebration`,
    ``,
    `Guest Name: ${trimmedName}`,
    `Number of Guests: ${payload.guestsCount}`,
    `Events Attending: ${eventsList}`,
  ];

  if (trimmedNote) {
    lines.push(`Blessings / Note: ${trimmedNote}`);
  }

  const messageText = lines.join('\n');
  const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(messageText)}`;

  return { messageText, whatsappUrl };
}

export interface KahaniMetrics {
  p: number;
  q: number;
  r: number;
  rEase: number;
  e: number;
  carScale: number;
  carBottomPercent: number;
  carTranslateYSvh: number;
  carOpacity: number;
  shadowScale: number;
  roadExtraScale: number;
  roadExtraTranslateYSvh: number;
  bgExtraScale: number;
  extraHeartsProgress: number;
  bobY: number;
  bobRotateDeg: number;
  introOpacity: number;
  outroOpacity: number;
}

/**
 * Pure scroll math for Section 4 ("Humari Kahani"):
 * - q = min(p / 0.86, 1) drives the entire original journey (e = q^1.8, scale 0.08 -> 1.0,
 *   bottom 40% -> 90%, stops at q = 0.2, 0.4, 0.6, 0.8, and closing line at q >= 0.92).
 * - For p from 0.86 to 1.0, r = (p - 0.86) / 0.14 with a soft ease-out:
 *   car scale 1.0 -> 1.14, bottom edge 90% -> 94%, shadow grows with it, road & background
 *   move 3% faster, 8 extra coral & gold hearts rise once at r = 0.3, and the car settles
 *   with one tiny bounce at r = 1.
 */
export function computeKahaniMetrics(rawP: number): KahaniMetrics {
  const p = Math.min(1, Math.max(0, Number.isFinite(rawP) ? rawP : 0));
  const q = Math.min(p / 0.86, 1);
  const r = p <= 0.86 ? 0 : Math.min(1, (p - 0.86) / 0.14);
  // Soft ease-out for the extra push
  const rEase = 1 - Math.pow(1 - r, 2.4);

  const e = Math.pow(q, 1.8);

  // Base scale on q (0.08 -> 1.0), plus extra push on r (1.0 -> 1.14)
  const baseScale = 0.08 + 0.92 * e + 0.14 * rEase;

  // One tiny settle bounce near r = 1 (from r = 0.82 to r = 1.0, settling cleanly at r = 1)
  let settleScaleOffset = 0;
  let settleYOffset = 0;
  if (r > 0.82 && r < 1) {
    const tb = (r - 0.82) / 0.18;
    const damp = 1 - tb;
    settleScaleOffset = 0.016 * Math.sin(tb * Math.PI * 2) * damp;
    settleYOffset = -3.2 * Math.sin(tb * Math.PI * 2) * damp;
  }

  const carScale = baseScale + settleScaleOffset;
  const carBottomPercent = 40 + 50 * e + 4 * rEase;
  // Car container is anchored at bottom: 10% (which is 90% from top of stage)
  const carTranslateYSvh = (carBottomPercent - 90) || 0;
  const carOpacity = q <= 0 ? 0 : Math.min(1, q / 0.06);

  // Shadow grows with the car during the extra scroll push
  const shadowScale = 1 + 0.14 * rEase;

  // Road and background move 3% faster during the extra push
  const roadExtraScale = 1 + 0.03 * rEase;
  const roadExtraTranslateYSvh = 1.8 * rEase;
  const bgExtraScale = 1 + 0.03 * rEase;

  // 8 extra small coral and gold hearts rise once starting at r = 0.3
  const extraHeartsProgress = r < 0.3 ? 0 : Math.min(1, (r - 0.3) / 0.68);

  // Subtle bobbing (+/- 2px, +/- 0.4deg rotation, scaled with car size; calms as car settles at r = 1)
  const bobDamp = r > 0 ? 1 - 0.75 * rEase : 1;
  const bobY = Math.sin(p * Math.PI * 20) * 2 * Math.min(1, baseScale) * bobDamp + settleYOffset;
  const bobRotateDeg = Math.cos(p * Math.PI * 20) * 0.4 * Math.min(1, baseScale) * bobDamp;

  // Heading at q < 0.1 fading out
  const introOpacity = q >= 0.1 ? 0 : q <= 0.03 ? 1 : 1 - (q - 0.03) / 0.07;

  // Closing invite prompt "अब हमारी शादी में आप ज़रूर आना" fades in on q >= 0.92 and stays 1.0 throughout r
  const outroOpacity = q < 0.92 ? 0 : Math.min(1, (q - 0.92) / 0.06);

  return {
    p,
    q,
    r,
    rEase,
    e,
    carScale,
    carBottomPercent,
    carTranslateYSvh,
    carOpacity,
    shadowScale,
    roadExtraScale,
    roadExtraTranslateYSvh,
    bgExtraScale,
    extraHeartsProgress,
    bobY,
    bobRotateDeg,
    introOpacity,
    outroOpacity,
  };
}

/**
 * Computes opacity and vertical slide transform (px) for each of the 4 stops
 * (q = 0.2, 0.4, 0.6, 0.8), active for ~0.12 of journey progress q.
 */
export function computeStopCardStyle(
  rawQ: number,
  stopCenter: number
): { opacity: number; translateY: number } {
  const q = Math.min(1, Math.max(0, Number.isFinite(rawQ) ? rawQ : 0));
  const halfWindow = 0.065; // ~0.13 total window (core 0.12)
  const fadeRamp = 0.022;
  const dist = q - stopCenter;
  const absDist = Math.abs(dist);

  if (absDist >= halfWindow) {
    return { opacity: 0, translateY: dist < 0 ? -18 : -10 };
  }

  if (absDist <= halfWindow - fadeRamp) {
    return { opacity: 1, translateY: 0 };
  }

  const ratio = (halfWindow - absDist) / fadeRamp;
  const smooth = ratio * ratio * (3 - 2 * ratio);
  const translateY = dist < 0 ? -18 * (1 - smooth) : -10 * (1 - smooth);

  return {
    opacity: smooth,
    translateY,
  };
}

/**
 * Resolves tap direction for "Shaadi ki Stories":
 * - Left 35% (relX < 0.35) -> 'prev'
 * - Right 65% (relX >= 0.35) -> 'next'
 */
export function resolveStoryTapDirection(
  clientX: number,
  containerLeft: number,
  containerWidth: number
): 'prev' | 'next' {
  const width = Math.max(1, containerWidth);
  const relX = (clientX - containerLeft) / width;
  return relX < 0.35 ? 'prev' : 'next';
}

/**
 * Computes the fill ratio (0..1) for each of the 5 top segmented story bars.
 */
export function computeStorySegmentFill(
  segmentIndex: number,
  activeStoryIndex: number,
  activeElapsedRatio: number,
  isClosingState: boolean
): number {
  if (isClosingState || segmentIndex < activeStoryIndex) {
    return 1;
  }
  if (segmentIndex > activeStoryIndex) {
    return 0;
  }
  return Math.min(1, Math.max(0, Number.isFinite(activeElapsedRatio) ? activeElapsedRatio : 0));
}

/**
 * Formats a 0-based event index as "EVENT 01" .. "EVENT 05".
 */
export function formatEventEyebrow(index: number): string {
  const num = Math.max(1, Math.floor(index) + 1);
  return `EVENT ${String(num).padStart(2, '0')}`;
}

/**
 * Splits a full event date string like "Friday, 11th December 2026" into
 * `{ weekday: "Friday", dayNumber: "11", monthYear: "December 2026", datePart: "11th December 2026" }`.
 */
export function splitEventDateParts(dateStr: string): {
  weekday: string;
  dayNumber: string;
  monthYear: string;
  datePart: string;
} {
  const trimmed = (dateStr || '').trim();
  const commaIdx = trimmed.indexOf(',');
  const weekday = commaIdx === -1 ? '' : trimmed.slice(0, commaIdx).trim();
  const datePart = commaIdx === -1 ? trimmed : trimmed.slice(commaIdx + 1).trim();

  // Extract leading day digits (e.g., "11th December 2026" -> dayNumber "11", monthYear "December 2026")
  const match = datePart.match(/^(\d{1,2})(?:st|nd|rd|th)?\s+(.+)$/i);
  if (match) {
    return {
      weekday,
      dayNumber: match[1],
      monthYear: match[2].trim(),
      datePart,
    };
  }

  return {
    weekday,
    dayNumber: datePart,
    monthYear: '',
    datePart,
  };
}

/**
 * Splits an event time string (e.g. "10:30 AM (Baraat at 9:30 AM)") into mainTime and subline.
 */
export function splitEventTimeParts(
  timeStr: string,
  explicitSubline?: string
): { mainTime: string; subline: string } {
  const raw = (timeStr || '').trim();
  const parenMatch = raw.match(/^(.+?)\s*\((.+)\)\s*$/);
  if (parenMatch) {
    return {
      mainTime: parenMatch[1].trim(),
      subline: explicitSubline?.trim() || parenMatch[2].trim(),
    };
  }
  return {
    mainTime: raw,
    subline: (explicitSubline || '').trim(),
  };
}

/**
 * Blends two 6-digit hex colours (50/50 by default) so adjacent block boundaries match seamlessly.
 */
export function mixHexColors(hexA: string, hexB: string, weightB: number = 0.5): string {
  const cleanA = (hexA || '#FFF8EC').replace('#', '').trim();
  const cleanB = (hexB || '#FFF8EC').replace('#', '').trim();
  if (cleanA.length !== 6 || cleanB.length !== 6) {
    return hexA || '#FFF8EC';
  }
  const rA = parseInt(cleanA.slice(0, 2), 16);
  const gA = parseInt(cleanA.slice(2, 4), 16);
  const bA = parseInt(cleanA.slice(4, 6), 16);

  const rB = parseInt(cleanB.slice(0, 2), 16);
  const gB = parseInt(cleanB.slice(2, 4), 16);
  const bB = parseInt(cleanB.slice(4, 6), 16);

  const wA = 1 - weightB;
  const r = Math.round(rA * wA + rB * weightB);
  const g = Math.round(gA * wA + gB * weightB);
  const b = Math.round(bA * wA + bB * weightB);

  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Builds the 4-stop vertical gradient for each event block in Hamare Utsav:
 * 0% blends from previous block's bgTo, 20% is own bgFrom, 80% is own bgTo, 100% blends into next block's bgFrom
 * (using #FFF8EC / theme.base before the first block and after the last one) so 100% of block i === 0% of block i+1.
 */
export function buildEventBlockGradient(
  prevBgTo: string,
  bgFrom: string,
  bgTo: string,
  nextBgFrom: string,
  baseColor: string = '#FFF8EC'
): string {
  const normBase = (baseColor || '#FFF8EC').toUpperCase();
  const startStop =
    prevBgTo.toUpperCase() === normBase ? baseColor : mixHexColors(prevBgTo, bgFrom, 0.5);
  const endStop =
    nextBgFrom.toUpperCase() === normBase ? baseColor : mixHexColors(bgTo, nextBgFrom, 0.5);
  return `linear-gradient(180deg, ${startStop} 0%, ${bgFrom} 20%, ${bgTo} 80%, ${endStop} 100%)`;
}







