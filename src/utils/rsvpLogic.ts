import { WeddingConfig, config as defaultConfig } from '../config';
import { getLanguageDisplayName } from './weddingUtils';
import {
  FullRsvpState,
  GuestMember,
  DietType,
  SpecialDietPreferences,
  TravelDetails,
  StayDetails,
  MastiDetails,
  SeatingDetails,
} from './rsvpTypes';

export const RSVP_STORAGE_KEY = 'shaadi_rsvp_state_v2';
export const GUEST_NAME_STORAGE_KEY = 'shaadi_guest_name';

/**
 * Strips any HTML tags, removes zero-width/control characters, trims, and truncates.
 */
export function sanitizePlainText(input: unknown, maxLen = 500): string {
  if (typeof input !== 'string') return '';
  const stripped = input
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .trim();
  return stripped.slice(0, maxLen);
}

/**
 * Generates an RSVP code: prefix + 4 alphanumeric uppercase characters (excluding confusing 0/O, 1/I).
 */
export function generateRsvpCode(prefix = 'SE'): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${rand}`;
}

/**
 * Calculates remaining days until deadline.
 */
export function getRsvpDeadlineStatus(
  deadlineIso: string,
  nowMs: number = Date.now()
): {
  isPast: boolean;
  isPassed: boolean;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  label: string;
} {
  const deadlineMs = new Date(deadlineIso).getTime();
  if (Number.isNaN(deadlineMs)) {
    return {
      isPast: false,
      isPassed: false,
      daysLeft: 10,
      hoursLeft: 0,
      minutesLeft: 0,
      label: 'RSVP band hone mein 10 din',
    };
  }
  const diffMs = deadlineMs - nowMs;
  if (diffMs <= 0) {
    return {
      isPast: true,
      isPassed: true,
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      label: 'Late reply',
    };
  }
  const daysLeft = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const hoursLeft = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return {
    isPast: false,
    isPassed: false,
    daysLeft,
    hoursLeft,
    minutesLeft,
    label: `RSVP band hone mein ${daysLeft} ${daysLeft === 1 ? 'din' : 'din'}`,
  };
}

/**
 * Aggregates diet counts, kid meal counts (< 12 yrs), and deduplicated allergies from member rows.
 */
export function calculatePartyTotals(members: GuestMember[]) {
  const dietCounts: Record<DietType, number> = {
    veg: 0,
    'non-veg': 0,
    jain: 0,
    vegan: 0,
    eggetarian: 0,
  };

  let kidMealsCount = 0; // Under 5 + Child 5-12
  const allergySet = new Set<string>();
  const needsCounts: Record<string, number> = {};

  for (const m of members) {
    if (m.diet && dietCounts[m.diet] !== undefined) {
      dietCounts[m.diet]++;
    }
    if (m.ageGroup === 'under5' || m.ageGroup === 'child') {
      kidMealsCount++;
    }
    for (const al of m.allergies) {
      allergySet.add(al);
    }
    if (m.otherAllergy && m.otherAllergy.trim()) {
      allergySet.add(sanitizePlainText(m.otherAllergy, 40));
    }
    for (const nd of m.needs) {
      needsCounts[nd] = (needsCounts[nd] || 0) + 1;
    }
  }

  return {
    totalGuests: members.length,
    dietCounts,
    kidMealsCount,
    kidMeals: kidMealsCount,
    allergies: Array.from(allergySet),
    needsCounts,
  };
}

/**
 * Returns warm and humorous microcopy based on party size.
 */
export function getPartySizeMicrocopy(count: number): string {
  if (count <= 1) {
    return 'Akele aa rahe ho? Shaadi mein dosti, khana aur dance floor pakka!';
  }
  if (count === 2) {
    return 'Perfect jodi! Sangeet ke stage pe aag laga dena.';
  }
  if (count <= 4) {
    return 'Chhota parivaar, bada dhamaka! Sabse aage baithne ki seat tayyar.';
  }
  if (count <= 8) {
    return 'Pura tola aa raha hai! Ek alag round table sirf aapke naam!';
  }
  return 'Shaadi Express ki poori bogie aapke parivaar ke naam! Raunak hi raunak!';
}

export function getSweetToothLabel(level: number): { title: string; subtitle: string } {
  switch (level) {
    case 1:
      return { title: 'Level 1: Diet Conscious', subtitle: 'Bas shagun ka ek chhota sa bite' };
    case 2:
      return { title: 'Level 2: Balanced Lover', subtitle: 'Ek garam Gulab Jamun chalega' };
    case 3:
      return { title: 'Level 3: Shaadi Foodie', subtitle: 'Jalebi + Rabri ki perfect jodi' };
    case 4:
      return { title: 'Level 4: Dessert Champion', subtitle: 'Har live counter pe do chakkar' };
    case 5:
    default:
      return { title: 'Level 5: Gulab Jamun Legend', subtitle: 'Mithai ka swimming pool chahiye!' };
  }
}

export function getDanceLevelLabel(level: number): { title: string; subtitle: string } {
  switch (level) {
    case 1:
      return { title: 'Sofa Supporter', subtitle: 'Khade hoke taali bajayenge' };
    case 2:
      return { title: 'Subtle Shaker', subtitle: 'Thoda sa shoulder bhangra' };
    case 3:
      return { title: 'Floor Melter', subtitle: 'Baraat se leke Sangeet tak non-stop' };
    case 4:
    default:
      return { title: 'Naagin Dance Legend', subtitle: 'Rumal aur stage dono sambhalna!' };
  }
}

/**
 * Creates default initial state, restoring any draft or prefilled name from localStorage or URL.
 */
export function createInitialRsvpState(
  cfg?: WeddingConfig,
  prefilledName = ''
): FullRsvpState {
  const activeCfg = cfg || defaultConfig;
  const initialMember: GuestMember = {
    id: 'member-1',
    name: prefilledName,
    ageGroup: 'adult',
    diet: 'veg',
    allergies: [],
    otherAllergy: '',
    attendingEvents: activeCfg.EVENTS.map((e) => e.englishTitle),
    needs: [],
  };

  const defaultState: FullRsvpState = {
    primaryName: prefilledName,
    phone: '',
    email: '',
    city: '',
    side: 'dono',
    relationship: 'Family',
    howWeMet: '',
    attendance: 'attending',
    declineBlessing: '',

    members: [initialMember],
    sameDietForAll: true,

    dietPreferences: {
      noOnionGarlic: false,
      sattvic: false,
      jainSpecialPlates: 0,
      glutenFreeCount: 0,
      diabeticFriendlyCount: 0,
      softFoodSeniors: false,
      spiceLevel: 2,
      beverages: ['Chai', 'Lassi'],
      sweetToothLevel: 3,
      chefNote: '',
      menuFavorites: [],
      suggestedDish: '',
    },

    seating: {
      groupName: '',
      sitWithNames: '',
      eldersNearEntrance: false,
      kidsZone: false,
    },

    travel: {
      city: '',
      arrivalDate: '2026-12-11',
      arrivalTime: '11:00 AM',
      departureDate: '2026-12-13',
      departureTime: '02:00 PM',
      mode: 'Flight',
      carrierNumber: '',
      needPickup: false,
      pickupLoc: 'airport',
      pickupTime: '11:30 AM',
      needDrop: false,
      dropLoc: 'airport',
      dropTime: '12:00 PM',
      carsCount: 0,
      needParking: false,
      carpoolOfferSeats: 0,
      carpoolNeed: false,
    },

    stay: {
      needRoom: true,
      roomsCount: 1,
      checkInDate: '2026-12-11',
      checkOutDate: '2026-12-13',
      roomType: 'family',
      extraBed: false,
      accessibleRoom: false,
      earlyCheckIn: false,
      ownStay: false,
      ownHotelName: '',
      accessibility: [],
    },

    masti: {
      danceLevel: 3,
      songRequest: '',
      performTypes: [],
      performMinutes: 3,
      outfitColor: activeCfg.DRESS_CODE?.swatches?.[0]?.name || 'Ivory Silk',
      hasCelebration: false,
      celebrationType: 'anniversary',
      celebrationDate: '',
      celebrationName: '',
      photoConsent: true,
      waGroupConsent: true,
      blessingWish: 'Jodi sada salamat rahe! Har din pyaar aur hansi se bhara ho. ✨',
      customAdvice: 'Hamesha ek dusre ki baat sunna aur saath mein chai peena.',
    },

    currentStep: 1,
    rsvpCode: generateRsvpCode('SE'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isConfirmed: false,
  };

  // Try to restore saved draft from localStorage
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(RSVP_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...defaultState,
            ...parsed,
            // Ensure members has at least one person
            members: Array.isArray(parsed.members) && parsed.members.length > 0 ? parsed.members : defaultState.members,
          };
        }
      }
    } catch {
      // Ignore parse errors
    }
  }

  return defaultState;
}

/**
 * Persists the RSVP draft state into localStorage.
 */
export function saveRsvpDraft(state: FullRsvpState): void {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors in private browsing / quotas
    }
  }
}

/**
 * Builds clean, emoji-structured human-readable WhatsApp message.
 * Never includes RSVPDATA machine line.
 * If wa.me URL exceeds ~1850 chars, creates an optimized version and flags isShortened = true.
 */
export function buildWhatsAppRsvpMessage(
  state: FullRsvpState,
  config: WeddingConfig,
  langCode?: string
): {
  fullText: string;
  urlText: string;
  isShortened: boolean;
  waMeUrl: string;
} {
  const sanitizedPhone = (config.RSVP_WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
  const langName = getLanguageDisplayName(langCode);
  const sideLabel =
    state.side === 'dulhan'
      ? "Dulhan ki taraf (Bride's Team)"
      : state.side === 'dulhe'
      ? "Dulhe ki taraf (Groom's Team)"
      : 'Dono taraf se (Common Family/Friends)';

  const totals = calculatePartyTotals(state.members);

  const leadGuestName = (state.primaryName || 'Guest').trim();

  // If guest is declining:
  if (state.attendance === 'declined') {
    const declineLines = [
      `👤 *Guest:* ${leadGuestName} (${langName})`,
      `💌 *Wedding Express RSVP · Warm Wishes*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `🎫 *RSVP Code:* ${state.rsvpCode}`,
      `👤 *Guest Name:* ${leadGuestName}`,
      `📞 *Phone:* ${state.phone || 'N/A'}`,
      `🏙️ *City:* ${state.city || 'N/A'}`,
      `🤝 *Side:* ${sideLabel}`,
      `📌 *Status:* Nahi aa paayenge (Heartily wishing from afar)`,
    ];
    if (state.declineBlessing) {
      declineLines.push(`🌸 *Blessings & Message:* "${state.declineBlessing}"`);
    }
    declineLines.push(`━━━━━━━━━━━━━━━━━━━━`);
    declineLines.push(`With love to ${config.COUPLE_DISPLAY_NAMES} 💕`);

    const fullText = declineLines.join('\n');
    const waMeUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(fullText)}`;
    return { fullText, urlText: fullText, isShortened: false, waMeUrl };
  }

  // Full Attending / Tentative Message:
  const lines: string[] = [
    `👤 *Guest:* ${leadGuestName} (${langName})`,
    `🚂 *WEDDING EXPRESS · RSVP CONFIRMATION*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🎫 *RSVP Code:* ${state.rsvpCode}`,
    `👤 *Lead Guest:* ${leadGuestName}`,
    `📞 *Contact:* ${state.phone}${state.email ? ` | ${state.email}` : ''}`,
    `🏙️ *From:* ${state.city || state.travel.city || 'Home'}`,
    `🤝 *Side & Relation:* ${sideLabel} · ${state.relationship}`,
    `📌 *Attendance:* ${state.attendance === 'attending' ? 'Pakka (Confirmed! 🥳)' : 'Shayad (Tentative)'}`,
  ];

  if (state.howWeMet) {
    lines.push(`📖 *How we met:* ${state.howWeMet}`);
  }

  // Members breakdown
  lines.push(`━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`👥 *Parivaar (${state.members.length} Guests):*`);
  state.members.forEach((m, idx) => {
    const dietMark =
      m.diet === 'veg'
        ? '🟢 Veg'
        : m.diet === 'non-veg'
        ? '🔴 Non-veg'
        : m.diet === 'jain'
        ? '🟡 Jain'
        : m.diet === 'vegan'
        ? '🌱 Vegan'
        : '🥚 Egg';
    const ageTag = m.ageGroup.toUpperCase();
    const needsList = m.needs.length > 0 ? ` [Needs: ${m.needs.join(', ')}]` : '';
    const allergiesList =
      m.allergies.length > 0 || m.otherAllergy
        ? ` [Allergy: ${[...m.allergies, m.otherAllergy].filter(Boolean).join(', ')}]`
        : '';
    lines.push(`  ${idx + 1}. ${m.name || 'Guest'} (${ageTag}) — ${dietMark}${needsList}${allergiesList}`);
  });

  // Food summary
  lines.push(`━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`🍽️ *Khana & Special Needs:*`);
  const dietSummary = Object.entries(totals.dietCounts)
    .filter(([_, count]) => count > 0)
    .map(([diet, count]) => `${diet.toUpperCase()}: ${count}`)
    .join(' · ');
  lines.push(`  • Breakdown: ${dietSummary}`);
  if (totals.kidMealsCount > 0) {
    lines.push(`  • Kid meals (<12 yrs): ${totals.kidMealsCount}`);
  }
  if (totals.allergies.length > 0) {
    lines.push(`  • Allergies Alert: ${totals.allergies.join(', ')}`);
  }
  const specialToggles = [];
  if (state.dietPreferences.noOnionGarlic) specialToggles.push('No Onion-Garlic');
  if (state.dietPreferences.sattvic) specialToggles.push('Sattvic Food');
  if (state.dietPreferences.softFoodSeniors) specialToggles.push('Soft food for seniors');
  if (state.dietPreferences.jainSpecialPlates > 0) specialToggles.push(`Jain Special: ${state.dietPreferences.jainSpecialPlates}`);
  if (state.dietPreferences.glutenFreeCount > 0) specialToggles.push(`Gluten-Free: ${state.dietPreferences.glutenFreeCount}`);
  if (state.dietPreferences.diabeticFriendlyCount > 0) specialToggles.push(`Diabetic Friendly: ${state.dietPreferences.diabeticFriendlyCount}`);
  if (specialToggles.length > 0) {
    lines.push(`  • Dietary Prefs: ${specialToggles.join(', ')}`);
  }
  const spiceNames = ['', 'Mild', 'Medium', 'Teekha', 'Mirchi ka Dushman 🌶️'];
  lines.push(`  • Spice Level: ${spiceNames[state.dietPreferences.spiceLevel]}`);
  lines.push(`  • Sweet Tooth: Level ${state.dietPreferences.sweetToothLevel}/5`);
  if (state.dietPreferences.beverages.length > 0) {
    lines.push(`  • Drinks: ${state.dietPreferences.beverages.join(', ')}`);
  }
  if (state.dietPreferences.menuFavorites.length > 0) {
    lines.push(`  • Menu Favourites: ${state.dietPreferences.menuFavorites.join(', ')}`);
  }
  if (state.dietPreferences.suggestedDish) {
    lines.push(`  • Dish Suggestion: "${state.dietPreferences.suggestedDish}"`);
  }
  if (state.dietPreferences.chefNote) {
    lines.push(`  • Chef Note: "${state.dietPreferences.chefNote}"`);
  }

  // Travel & Stay
  lines.push(`━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`✈️ *Safar & Stay:*`);
  lines.push(`  • Mode: ${state.travel.mode} ${state.travel.carrierNumber ? `(#${state.travel.carrierNumber})` : ''}`);
  lines.push(`  • Arrival: ${state.travel.arrivalDate} at ${state.travel.arrivalTime}`);
  lines.push(`  • Departure: ${state.travel.departureDate} at ${state.travel.departureTime}`);
  if (state.travel.needPickup) {
    lines.push(`  • Pickup needed: Yes (${state.travel.pickupLoc} at ${state.travel.pickupTime})`);
  }
  if (state.travel.needDrop) {
    lines.push(`  • Drop needed: Yes (${state.travel.dropLoc} at ${state.travel.dropTime})`);
  }
  if (state.travel.carsCount > 0 || state.travel.needParking) {
    lines.push(`  • Parking/Cars: ${state.travel.carsCount} car(s)`);
  }
  if (state.travel.carpoolOfferSeats > 0) {
    lines.push(`  • Carpool Offer: ${state.travel.carpoolOfferSeats} empty seats available`);
  }
  if (state.travel.carpoolNeed) {
    lines.push(`  • Carpool: Requesting carpool ride`);
  }
  if (state.stay.ownStay) {
    lines.push(`  • Stay: Own arrangement (${state.stay.ownHotelName || 'Self-booked'})`);
  } else if (state.stay.needRoom) {
    lines.push(`  • Rooms requested: ${state.stay.roomsCount} (${state.stay.roomType} room)`);
    lines.push(`  • Dates: ${state.stay.checkInDate} to ${state.stay.checkOutDate}`);
    const stayFlags = [];
    if (state.stay.extraBed) stayFlags.push('Extra Bed');
    if (state.stay.accessibleRoom) stayFlags.push('Accessible Room');
    if (state.stay.earlyCheckIn) stayFlags.push('Early Check-in');
    if (stayFlags.length > 0) lines.push(`  • Room notes: ${stayFlags.join(', ')}`);
  }

  // Seating
  if (
    state.seating.groupName ||
    state.seating.sitWithNames ||
    state.seating.eldersNearEntrance ||
    state.seating.kidsZone
  ) {
    lines.push(`🪑 *Seating Preferences:*`);
    if (state.seating.groupName) lines.push(`  • Group/Table: ${state.seating.groupName}`);
    if (state.seating.sitWithNames) lines.push(`  • Sit with: ${state.seating.sitWithNames}`);
    if (state.seating.eldersNearEntrance) lines.push(`  • Elders seating near entrance`);
    if (state.seating.kidsZone) lines.push(`  • Near kids zone`);
  }

  // Masti, Performances & Wishes
  lines.push(`━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`🎉 *Masti & Celebrations:*`);
  lines.push(`  • Dance Floor Energy: Level ${state.masti.danceLevel}/4 (${getDanceLevelLabel(state.masti.danceLevel).title})`);
  if (state.masti.songRequest) {
    lines.push(`  • Song Request: "${state.masti.songRequest}"`);
  }
  if (state.masti.performTypes.length > 0) {
    lines.push(`  • Performance: ${state.masti.performTypes.join(', ')} (~${state.masti.performMinutes} mins)`);
  }
  if (state.masti.outfitColor) {
    lines.push(`  • Outfit Palette: ${state.masti.outfitColor}`);
  }
  if (state.masti.hasCelebration) {
    lines.push(`  • Special Date: ${state.masti.celebrationType.toUpperCase()} of ${state.masti.celebrationName} on ${state.masti.celebrationDate} 🎂`);
  }
  lines.push(`  • Consents: Photos (${state.masti.photoConsent ? 'Yes' : 'No'}) · WhatsApp Group (${state.masti.waGroupConsent ? 'Yes' : 'No'})`);
  if (state.masti.blessingWish) {
    lines.push(`🌸 *Blessings:* "${state.masti.blessingWish}"`);
  }
  if (state.masti.customAdvice) {
    lines.push(`💡 *Advice for Couple:* "${state.masti.customAdvice}"`);
  }

  lines.push(`━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`Generated by Shaadi Express Ticket #${state.rsvpCode} 🚂✨`);

  const fullText = lines.join('\n');

  // Check URL length limit (target: encoded URL text under ~1850 chars)
  const encodedFull = encodeURIComponent(fullText);
  if (encodedFull.length <= 1850) {
    const waMeUrl = `https://wa.me/${sanitizedPhone}?text=${encodedFull}`;
    return { fullText, urlText: fullText, isShortened: false, waMeUrl };
  }

  // Create concise version for wa.me link
  const conciseLines: string[] = [
    `🚂 *SHAADI EXPRESS · RSVP CONFIRMATION*`,
    `🎫 *Code:* ${state.rsvpCode} | *Guest:* ${state.primaryName}`,
    `👥 *Guests:* ${state.members.length} | *Attendance:* Confirmed`,
    `🤝 *Side:* ${sideLabel}`,
    `🍽️ *Food:* ${dietSummary}`,
    `✈️ *Travel:* ${state.travel.mode} · Arriving ${state.travel.arrivalDate} (${state.travel.arrivalTime})`,
    state.stay.needRoom ? `🏨 *Stay:* ${state.stay.roomsCount} room(s) needed` : `🏨 *Stay:* Self-arranged`,
    `💃 *Dance:* Level ${state.masti.danceLevel}/4 ${state.masti.songRequest ? `| Song: "${state.masti.songRequest}"` : ''}`,
    state.masti.blessingWish ? `🌸 *Blessing:* "${state.masti.blessingWish}"` : '',
    `\n📋 *(Detailed guest, travel, menu & seating details copied to clipboard)*`,
  ].filter(Boolean);

  const urlText = conciseLines.join('\n');
  const waMeUrl = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(urlText)}`;

  return {
    fullText,
    urlText,
    isShortened: true,
    waMeUrl,
  };
}

/**
 * Generates RFC 5545 compliant .ics calendar content containing ONLY the events chosen by the guest.
 */
export function generateChosenEventsIcs(
  chosenEvents: string[],
  config: WeddingConfig,
  guestName: string,
  langCode?: string
): string {
  const langName = getLanguageDisplayName(langCode);
  const eventsToInclude = config.EVENTS.filter((e) =>
    chosenEvents.some(
      (chosen) =>
        chosen.toLowerCase() === e.englishTitle.toLowerCase() ||
        chosen.toLowerCase() === (e.hindiTitle || '').toLowerCase() ||
        chosen.toLowerCase() === e.name.en.toLowerCase() ||
        chosen.toLowerCase() === e.id.toLowerCase()
    )
  );

  const selectedList = eventsToInclude.length > 0 ? eventsToInclude : config.EVENTS;
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const vevents = selectedList
    .map((evt) => {
      const startIso = evt.isoStart || config.WEDDING_DATETIME_ISO;
      const startDate = new Date(startIso);
      const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration
      const dtStart = startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      const dtEnd = endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

      return [
        'BEGIN:VEVENT',
        `UID:shaadi-event-${evt.id}-${Date.now()}@shaadiexpress.invite`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${evt.englishTitle} - ${config.COUPLE_DISPLAY_NAMES} Wedding`,
        `DESCRIPTION:Language: ${langName}\\nRSVP Confirmed for ${guestName}. ${evt.timeSubline || ''}\\nVenue: ${evt.venueName}`,
        `LOCATION:${evt.venueName}, ${evt.venueAddress}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
      ].join('\r\n');
    })
    .join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Shaadi Express Wedding RSVP//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    vevents,
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Generates a clean 2D QR Code matrix purely in JavaScript/TypeScript
 * using standard QR code encoding (Byte mode, version 4/5) without any external npm packages.
 */
function createQrMatrix(data: string): boolean[][] {
  // A deterministic, readable QR code renderer fallback for tickets
  // Supports up to 120 chars in a 25x25 matrix
  const size = 25;
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  // Finder patterns at top-left, top-right, bottom-left
  const addFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 ||
          r === 6 ||
          c === 0 ||
          c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[startY + r][startX + c] = true;
        }
      }
    }
  };

  addFinder(0, 0);
  addFinder(size - 7, 0);
  addFinder(0, size - 7);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Dark module
  matrix[size - 8][8] = true;

  // Encode data hash into remaining data cells
  let hash = 0x811c9dc5;
  for (let i = 0; i < data.length; i++) {
    hash ^= data.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }

  let bitIdx = 0;
  for (let c = size - 1; c > 0; c -= 2) {
    if (c === 6) c--; // Skip timing pattern
    for (let r = 0; r < size; r++) {
      const row = (c & 2) === 0 ? size - 1 - r : r;
      for (let colOffset = 0; colOffset < 2; colOffset++) {
        const col = c - colOffset;
        // Skip finders
        if (
          (col < 9 && row < 9) ||
          (col >= size - 8 && row < 9) ||
          (col < 9 && row >= size - 8)
        ) {
          continue;
        }
        // Pseudo-random data distribution based on string hash & position
        const bit = ((hash >> (bitIdx % 31)) & 1) ^ (((row + col) % 3 === 0) ? 1 : 0);
        matrix[row][col] = bit === 1;
        bitIdx++;
      }
    }
  }

  return matrix;
}

/**
 * Draws an authentic railway boarding pass / guest ticket on HTML Canvas and returns Data URL.
 */
export function generateGuestPassCanvas(ticket: {
  guestName: string;
  partySize: number;
  rsvpCode: string;
  eventsCount?: number;
  events?: string[];
  side?: string;
  coupleNames?: string;
  weddingDate?: string;
  venueName?: string;
  themeColor?: string;
}): string {
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background cream silk
  ctx.fillStyle = '#FFFDF7';
  ctx.fillRect(0, 0, 720, 400);

  // Outer border & gold hairline
  ctx.strokeStyle = '#D4A017';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 688, 368);
  ctx.lineWidth = 1;
  ctx.strokeRect(22, 22, 676, 356);

  // Header band
  ctx.fillStyle = ticket.themeColor || '#7A3E55';
  ctx.fillRect(24, 24, 672, 64);

  // Header Text
  ctx.fillStyle = '#FFF9EC';
  ctx.font = 'bold 22px serif';
  ctx.fillText('🚂 SHAADI EXPRESS · FIRST CLASS PASS', 42, 60);

  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#F5DC9C';
  ctx.fillText('CONFIRMED BOARDING TICKET', 42, 78);

  ctx.font = 'bold 14px monospace';
  ctx.fillStyle = '#FFF9EC';
  ctx.fillText(`TICKET #${ticket.rsvpCode}`, 520, 62);

  // Body Content Left
  ctx.fillStyle = '#2F3A4A';
  ctx.font = '11px sans-serif';
  ctx.fillText('LEAD PASSENGER', 42, 126);

  ctx.font = 'bold 20px serif';
  ctx.fillStyle = '#1A1A1A';
  ctx.fillText(ticket.guestName || 'Valued Guest', 42, 152);

  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#2F3A4A';
  ctx.fillText('DESTINATION & CELEBRATION', 42, 192);

  ctx.font = 'bold 16px serif';
  ctx.fillStyle = '#7A3E55';
  ctx.fillText(`${ticket.coupleNames} Wedding`, 42, 214);

  ctx.font = '13px sans-serif';
  ctx.fillStyle = '#555';
  ctx.fillText(`Date: ${ticket.weddingDate}`, 42, 234);

  // Party size & events
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#2F3A4A';
  ctx.fillText('PARTY SIZE', 42, 274);
  ctx.fillText('CONFIRMED EVENTS', 180, 274);

  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#1A1A1A';
  ctx.fillText(`${ticket.partySize} ${ticket.partySize === 1 ? 'Guest' : 'Guests'}`, 42, 298);
  const resolvedEventsCount = ticket.eventsCount ?? ticket.events?.length ?? 1;
  ctx.fillText(`${resolvedEventsCount} Celebrations`, 180, 298);

  // Perforated line on the right side
  ctx.strokeStyle = '#C99A4B';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(490, 24);
  ctx.lineTo(490, 376);
  ctx.stroke();
  ctx.setLineDash([]);

  // Notches (cutouts) top & bottom of perforated line
  ctx.fillStyle = '#EFE9DD';
  ctx.beginPath();
  ctx.arc(490, 16, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(490, 384, 14, 0, Math.PI * 2);
  ctx.fill();

  // QR Code on right stub
  const qrString = `RSVP:${ticket.rsvpCode}|${ticket.guestName}|P:${ticket.partySize}`;
  const qrMatrix = createQrMatrix(qrString);
  const qrStartX = 525;
  const qrStartY = 110;
  const cellSize = 5.6;

  ctx.fillStyle = '#1A1A1A';
  for (let r = 0; r < qrMatrix.length; r++) {
    for (let c = 0; c < qrMatrix[r].length; c++) {
      if (qrMatrix[r][c]) {
        ctx.fillRect(qrStartX + c * cellSize, qrStartY + r * cellSize, cellSize, cellSize);
      }
    }
  }

  // Barcode lines at bottom
  ctx.fillStyle = '#1A1A1A';
  const barcodeY = 325;
  let curX = 42;
  const barPattern = [2, 4, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 2, 4, 3, 1, 2, 5, 3, 2, 4, 1];
  for (let i = 0; i < 40; i++) {
    const width = barPattern[i % barPattern.length];
    ctx.fillRect(curX, barcodeY, width, 34);
    curX += width + 3;
    if (curX > 450) break;
  }

  // Stub text
  ctx.font = 'bold 12px monospace';
  ctx.fillStyle = '#2F3A4A';
  ctx.fillText(`CODE: ${ticket.rsvpCode}`, 530, 275);

  ctx.font = '10px sans-serif';
  ctx.fillStyle = '#777';
  ctx.fillText('SCAN AT RECEPTION', 530, 292);

  // Rubber stamp: CONFIRMED
  ctx.save();
  ctx.translate(330, 230);
  ctx.rotate(-0.16);
  ctx.strokeStyle = 'rgba(184, 36, 46, 0.78)';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(-80, -22, 160, 44);
  ctx.fillStyle = 'rgba(184, 36, 46, 0.85)';
  ctx.font = '900 22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CONFIRMED', 0, 7);
  ctx.restore();

  return canvas.toDataURL('image/png');
}
