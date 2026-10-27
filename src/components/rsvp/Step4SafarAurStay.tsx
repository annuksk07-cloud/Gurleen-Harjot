import React from 'react';
import { MessageCircle } from 'lucide-react';
import { HOST_PHONE_DISPLAY } from '../../config';
import {
  buildHostWhatsAppHref,
  getContactTranslations,
} from '../../i18n/contactTranslations';
import {
  FullRsvpState,
  TravelDetails,
  StayDetails,
  TravelMode,
  RoomType,
} from '../../utils/rsvpTypes';

interface Step4Props {
  state: FullRsvpState;
  onChange: (updater: (prev: FullRsvpState) => FullRsvpState) => void;
  lang: string;
}

const TRAVEL_MODES: { id: TravelMode; label: string; icon: string }[] = [
  { id: 'Train', label: 'Train / Rail', icon: '🚂' },
  { id: 'Flight', label: 'Flight / Vimaan', icon: '✈️' },
  { id: 'Car', label: 'Car / Road Trip', icon: '🚗' },
  { id: 'Bus', label: 'Bus / Volvo', icon: '🚌' },
];

const ROOM_TYPES: { id: RoomType; label: string; desc: string; icon: string }[] = [
  { id: 'couple', label: 'Couple Room', desc: '1 King Bed', icon: '🛏️' },
  { id: 'family', label: 'Family Suite', desc: 'Quad / 2 Queen Beds', icon: '👨‍👩‍👧‍👦' },
  { id: 'shared', label: 'Shared / Cousins Room', desc: 'Twin / Triple sharing', icon: '🤝' },
];

const ACCESSIBILITY_OPTIONS: Array<'wheelchair ramp' | 'lift' | 'quiet room'> = [
  'wheelchair ramp',
  'lift',
  'quiet room',
];

export const Step4SafarAurStay: React.FC<Step4Props> = ({ state, onChange, lang }) => {
  const { travel, stay } = state;
  const contactT = getContactTranslations(lang);

  const updateTravel = (partial: Partial<TravelDetails>) => {
    onChange((prev) => ({
      ...prev,
      travel: {
        ...prev.travel,
        ...partial,
      },
    }));
  };

  const updateStay = (partial: Partial<StayDetails>) => {
    onChange((prev) => ({
      ...prev,
      stay: {
        ...prev.stay,
        ...partial,
      },
    }));
  };

  // Calculate nights
  const calculateNights = () => {
    if (!stay.checkInDate || !stay.checkOutDate) return null;
    const inDate = new Date(stay.checkInDate);
    const outDate = new Date(stay.checkOutDate);
    const diffTime = outDate.getTime() - inDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();

  const toggleAccessibility = (tag: 'wheelchair ramp' | 'lift' | 'quiet room') => {
    const list = stay.accessibility || [];
    if (list.includes(tag)) {
      updateStay({ accessibility: list.filter((item) => item !== tag) });
    } else {
      updateStay({ accessibility: [...list, tag] });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-stone-800 dark:to-stone-850 p-4 rounded-xl border border-amber-200 dark:border-amber-900/40">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="train">
            🧳
          </span>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-850 dark:text-amber-100">
              Safar & Rehaayish (Travel & Stay)
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              Aap aaraam se pahuchein, baaki baraat sambhal legi! Station/Airport pickup aur room details yahan batayein.
            </p>
          </div>
        </div>
      </div>

      {/* TRAVEL SECTION */}
      <section className="bg-white/80 dark:bg-stone-900/70 backdrop-blur-sm rounded-xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
          <span className="text-xl">🛤️</span>
          <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm tracking-wide uppercase">
            1. Safar Ki Jankari (Travel Details)
          </h4>
        </div>

        {/* Coming from City */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
            Kahan Se Aa Rahe Hain? (Departing City)
          </label>
          <input
            type="text"
            value={travel.city || state.city}
            onChange={(e) => updateTravel({ city: e.target.value })}
            placeholder="e.g. Delhi, Mumbai, Bengaluru, Chandigarh, London"
            className="w-full text-base px-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            autoComplete="address-level2"
            enterKeyHint="next"
          />
        </div>

        {/* Mode of Travel Chips */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            Kis Sawari Se Aana Hoga? (Mode of Transport)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {TRAVEL_MODES.map((mode) => {
              const isSelected = travel.mode === mode.id;
              return (
                <button
                  type="button"
                  key={mode.id}
                  onClick={() => updateTravel({ mode: mode.id })}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border text-sm font-medium transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/30 font-semibold'
                      : 'border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span className="text-2xl mb-1">{mode.icon}</span>
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Flight / Train Number */}
        {(travel.mode === 'Train' || travel.mode === 'Flight') && (
          <div className="animate-fadeIn">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
              {travel.mode === 'Train' ? 'Train Name / PNR ya Number' : 'Flight Code / Number (e.g. 6E 2145)'}
            </label>
            <input
              type="text"
              value={travel.carrierNumber}
              onChange={(e) => updateTravel({ carrierNumber: e.target.value })}
              placeholder={travel.mode === 'Train' ? 'e.g. Shatabdi Express 12014' : 'e.g. IndiGo 6E-502'}
              className="w-full text-base px-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              enterKeyHint="next"
            />
          </div>
        )}

        {/* Arrival & Departure Date/Time Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Arrival */}
          <div className="p-3.5 bg-stone-50 dark:bg-stone-850/60 rounded-lg border border-stone-200 dark:border-stone-800 space-y-2.5">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              🛬 Pahunchna (Arrival)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Date</label>
                <input
                  type="date"
                  value={travel.arrivalDate}
                  onChange={(e) => updateTravel({ arrivalDate: e.target.value })}
                  className="w-full text-base px-2 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Time (Approx)</label>
                <input
                  type="time"
                  value={travel.arrivalTime}
                  onChange={(e) => updateTravel({ arrivalTime: e.target.value })}
                  className="w-full text-base px-2 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          </div>

          {/* Departure */}
          <div className="p-3.5 bg-stone-50 dark:bg-stone-850/60 rounded-lg border border-stone-200 dark:border-stone-800 space-y-2.5">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              🛫 Rawangi (Departure)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Date</label>
                <input
                  type="date"
                  value={travel.departureDate}
                  onChange={(e) => updateTravel({ departureDate: e.target.value })}
                  className="w-full text-base px-2 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Time (Approx)</label>
                <input
                  type="time"
                  value={travel.departureTime}
                  onChange={(e) => updateTravel({ departureTime: e.target.value })}
                  className="w-full text-base px-2 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pickup & Drop Toggles + Need help with travel? WhatsApp us */}
        <div className="pt-2 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Pickup toggle */}
            <div
              onClick={() => updateTravel({ needPickup: !travel.needPickup })}
              className={`flex-1 p-3 rounded-lg border cursor-pointer transition-all ${
                travel.needPickup
                  ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/30'
                  : 'border-stone-200 dark:border-stone-700 bg-stone-50/40 dark:bg-stone-800/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  🚗 {contactT.pickupNeededLabel}
                </span>
                <input
                  type="checkbox"
                  checked={travel.needPickup}
                  onChange={(e) => updateTravel({ needPickup: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
              </div>
              {travel.needPickup && (
                <div className="mt-2.5 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center gap-2">
                  <select
                    value={travel.pickupLoc}
                    onChange={(e) =>
                      updateTravel({ pickupLoc: e.target.value as 'station' | 'airport' })
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs px-2 py-1 rounded border border-amber-300 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  >
                    <option value="station">Railway Station</option>
                    <option value="airport">Airport Terminal</option>
                  </select>
                  <input
                    type="time"
                    value={travel.pickupTime}
                    onChange={(e) => updateTravel({ pickupTime: e.target.value })}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs px-2 py-1 rounded border border-amber-300 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  />
                </div>
              )}
            </div>

            {/* Drop toggle */}
            <div
              onClick={() => updateTravel({ needDrop: !travel.needDrop })}
              className={`flex-1 p-3 rounded-lg border cursor-pointer transition-all ${
                travel.needDrop
                  ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/30'
                  : 'border-stone-200 dark:border-stone-700 bg-stone-50/40 dark:bg-stone-800/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  🚙 {lang === 'en' ? 'Drop needed (Return Transfer)' : 'Drop Chahiye? (Return Transfer)'}
                </span>
                <input
                  type="checkbox"
                  checked={travel.needDrop}
                  onChange={(e) => updateTravel({ needDrop: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
              </div>
              {travel.needDrop && (
                <div className="mt-2.5 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center gap-2">
                  <select
                    value={travel.dropLoc}
                    onChange={(e) =>
                      updateTravel({ dropLoc: e.target.value as 'station' | 'airport' })
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs px-2 py-1 rounded border border-amber-300 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  >
                    <option value="station">Railway Station</option>
                    <option value="airport">Airport Terminal</option>
                  </select>
                  <input
                    type="time"
                    value={travel.dropTime}
                    onChange={(e) => updateTravel({ dropTime: e.target.value })}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs px-2 py-1 rounded border border-amber-300 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Travel help note & WhatsApp button next to Pickup needed */}
          <div
            data-testid="rsvp-travel-help-box"
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 p-3 rounded-lg border border-amber-200/80 dark:border-amber-900/40 bg-amber-50/50 dark:bg-stone-850/60"
          >
            <p className="text-xs text-stone-700 dark:text-stone-300">
              {contactT.travelHelpNote} (<span dir="ltr">{HOST_PHONE_DISPLAY}</span>)
            </p>
            <a
              href={buildHostWhatsAppHref(
                'Hello, I need help with travel arrangements for the wedding'
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="rsvp-travel-whatsapp-btn"
              aria-label={`${contactT.travelHelpButton} (${HOST_PHONE_DISPLAY})`}
              className="min-h-[44px] px-4 py-2 rounded-full bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{contactT.travelHelpButton}</span>
            </a>
          </div>

          {/* Car & Parking & Carpool */}
          <div className="p-3 bg-stone-50 dark:bg-stone-850/60 rounded-lg border border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={travel.needParking}
                  onChange={(e) => updateTravel({ needParking: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span>🅿️ Venue par Car Parking Chahiye?</span>
              </label>

              {travel.needParking && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">Kitni Gaadiyan?</span>
                  <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-800">
                    <button
                      type="button"
                      onClick={() =>
                        updateTravel({ carsCount: Math.max(1, (travel.carsCount || 1) - 1) })
                      }
                      className="px-2 py-0.5 text-xs font-bold text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-700"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-bold">{travel.carsCount || 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateTravel({ carsCount: Math.min(5, (travel.carsCount || 1) + 1) })
                      }
                      className="px-2 py-0.5 text-xs font-bold text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Carpool options */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-700/60 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className="flex items-center gap-2 p-2 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 cursor-pointer text-xs text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={travel.carpoolNeed}
                  onChange={(e) => updateTravel({ carpoolNeed: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <span>🙋‍♂️ Mujhe kisi ke saath Carpool chahiye</span>
              </label>

              <div className="flex items-center justify-between p-2 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300">
                <span>🚗 Mere paas khali seat hain:</span>
                <select
                  value={travel.carpoolOfferSeats || 0}
                  onChange={(e) => updateTravel({ carpoolOfferSeats: Number(e.target.value) })}
                  className="text-xs px-2 py-1 rounded border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700"
                >
                  <option value={0}>0 (Khaali nahi)</option>
                  <option value={1}>1 seat</option>
                  <option value={2}>2 seats</option>
                  <option value={3}>3 seats</option>
                  <option value={4}>4+ seats</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAY SECTION */}
      <section className="bg-white/80 dark:bg-stone-900/70 backdrop-blur-sm rounded-xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏨</span>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm tracking-wide uppercase">
              2. Rehaayish (Hotel & Stay Arrangements)
            </h4>
          </div>

          {/* Toggle Room Chahiye */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
              {stay.needRoom ? 'Room Chahiye: Haan' : 'Room Chahiye?'}
            </span>
            <div
              onClick={() => {
                const nextVal = !stay.needRoom;
                updateStay({
                  needRoom: nextVal,
                  ownStay: nextVal ? false : stay.ownStay,
                });
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                stay.needRoom ? 'bg-amber-600' : 'bg-stone-300 dark:bg-stone-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  stay.needRoom ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </label>
        </div>

        {stay.needRoom ? (
          <div className="space-y-4 animate-fadeIn">
            {/* Rooms Stepper */}
            <div className="flex items-center justify-between p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
              <div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                  Kitne Rooms Ki Zaroorat Hai? (Number of Rooms)
                </span>
                <span className="text-[11px] text-stone-500">
                  Parivaar aur bachhon ke aaraam ke hisaab se
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    updateStay({ roomsCount: Math.max(1, (stay.roomsCount || 1) - 1) })
                  }
                  className="w-8 h-8 rounded-full border border-amber-300 bg-white dark:bg-stone-800 text-amber-900 dark:text-amber-200 font-bold hover:bg-amber-100 transition-colors"
                >
                  -
                </button>
                <span className="font-bold text-base w-6 text-center text-stone-900 dark:text-stone-100">
                  {stay.roomsCount || 1}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateStay({ roomsCount: Math.min(6, (stay.roomsCount || 1) + 1) })
                  }
                  className="w-8 h-8 rounded-full border border-amber-300 bg-white dark:bg-stone-800 text-amber-900 dark:text-amber-200 font-bold hover:bg-amber-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Check-in / Check-out Dates */}
            <div className="p-3 bg-stone-50 dark:bg-stone-850/60 rounded-lg border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Tareekh (Dates of Stay)
                </span>
                {nights !== null && nights > 0 && (
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/40 px-2 py-0.5 rounded">
                    🌙 {nights} {nights === 1 ? 'Night' : 'Nights'}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={stay.checkInDate}
                    onChange={(e) => updateStay({ checkInDate: e.target.value })}
                    className="w-full text-base px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={stay.checkOutDate}
                    onChange={(e) => updateStay({ checkOutDate: e.target.value })}
                    className="w-full text-base px-3 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
                Room Ki Pasand (Room Preference)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {ROOM_TYPES.map((type) => {
                  const isSelected = stay.roomType === type.id;
                  return (
                    <button
                      type="button"
                      key={type.id}
                      onClick={() => updateStay({ roomType: type.id })}
                      className={`flex flex-col items-start p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 ring-2 ring-amber-500/30 font-semibold'
                          : 'border-stone-200 dark:border-stone-700 bg-stone-50/40 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{type.icon}</span>
                        <span className="text-xs font-bold">{type.label}</span>
                      </div>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">
                        {type.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stay Perks / Options Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <label className="flex items-center gap-2 p-2 rounded bg-stone-50 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-700 cursor-pointer text-xs text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={stay.extraBed}
                  onChange={(e) => updateStay({ extraBed: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <span>🛏️ Extra Rollaway Bed</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded bg-stone-50 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-700 cursor-pointer text-xs text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={stay.accessibleRoom}
                  onChange={(e) => updateStay({ accessibleRoom: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <span>♿ Ground Floor / Accessible</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded bg-stone-50 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-700 cursor-pointer text-xs text-stone-700 dark:text-stone-300">
                <input
                  type="checkbox"
                  checked={stay.earlyCheckIn}
                  onChange={(e) => updateStay({ earlyCheckIn: e.target.checked })}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <span>🌅 Early Check-in Request</span>
              </label>
            </div>
          </div>
        ) : (
          /* Own Stay option */
          <div className="p-4 bg-stone-50 dark:bg-stone-850/60 rounded-lg border border-stone-200 dark:border-stone-800 space-y-3 animate-fadeIn">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700 dark:text-stone-300">
              <input
                type="checkbox"
                checked={stay.ownStay}
                onChange={(e) => updateStay({ ownStay: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span>🏨 Mera Apna Stay Hai (Staying with relatives or booked own hotel)</span>
            </label>

            {stay.ownStay && (
              <div className="pt-2 animate-fadeIn">
                <label className="block text-[11px] text-stone-500 mb-1">
                  Kahan Thehre Hain? (Hotel or Relative Area Name)
                </label>
                <input
                  type="text"
                  value={stay.ownHotelName}
                  onChange={(e) => updateStay({ ownHotelName: e.target.value })}
                  placeholder="e.g. Radisson Blu / Chachi ji ka ghar, Model Town"
                  className="w-full text-base px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                  enterKeyHint="next"
                />
              </div>
            )}
          </div>
        )}

        {/* Accessibility Needs Chips */}
        <div className="pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
            Zaroori Sahuliyat (Special Venue Accessibility Needs)
          </label>
          <div className="flex flex-wrap gap-2">
            {ACCESSIBILITY_OPTIONS.map((tag) => {
              const active = stay.accessibility?.includes(tag);
              return (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleAccessibility(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    active
                      ? 'border-amber-600 bg-amber-500 text-white font-medium shadow-sm'
                      : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {tag === 'wheelchair ramp' && '♿ Wheelchair Ramp'}
                  {tag === 'lift' && '🛗 Lift / Elevator Access'}
                  {tag === 'quiet room' && '🧘 Quiet / Rest Room'}
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
