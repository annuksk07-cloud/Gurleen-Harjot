import React, { useState } from 'react';
import {
  FullRsvpState,
} from '../../utils/rsvpTypes';
import { config } from '../../config';
import {
  calculatePartyTotals,
  getDanceLevelLabel,
  getSweetToothLabel,
  generateChosenEventsIcs,
  generateGuestPassCanvas,
} from '../../utils/rsvpLogic';
import { TranslationDictionary } from '../../i18n/translations';
import { formatPersonalisedLine } from '../../utils/relativeMatching';
import { VegNonVegMark } from './FoodMarks';

interface Step6Props {
  state: FullRsvpState;
  onChange: (updater: (prev: FullRsvpState) => FullRsvpState) => void;
  onEditStep: (step: number) => void;
  onFinalSubmit: () => void;
  onCopyDetails: () => void;
  onShowToast: (msg: string) => void;
  lang: string;
  dict?: TranslationDictionary;
  guestDisplayName?: string | null;
}

export const Step6Confirm: React.FC<Step6Props> = ({
  state,
  onChange,
  onEditStep,
  onFinalSubmit,
  onCopyDetails,
  onShowToast,
  lang,
  dict,
  guestDisplayName = null,
}) => {
  const [downloadingPass, setDownloadingPass] = useState(false);
  const [downloadingCal, setDownloadingCal] = useState(false);
  const totals = calculatePartyTotals(state.members);
  const activeGuestName = guestDisplayName || state.primaryName.trim() || null;

  // Save guest pass canvas PNG
  const handleDownloadGuestPass = async () => {
    try {
      setDownloadingPass(true);
      const chosenEventList = Array.from(
        new Set(state.members.flatMap((m) => m.attendingEvents || []))
      );
      const dataUrl = await generateGuestPassCanvas({
        guestName: activeGuestName || 'Special Guest',
        partySize: state.members.length,
        side: state.side,
        events: chosenEventList.length > 0 ? chosenEventList : ['All Events'],
        rsvpCode: state.rsvpCode,
        coupleNames: config.COUPLE_DISPLAY_NAMES,
        weddingDate: config.WEDDING_DATE_FULL,
        venueName: config.EVENTS[3]?.venueName || 'Heritage Courtyard',
      });

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Wedding-Express-Pass-${state.rsvpCode}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onShowToast(
        activeGuestName
          ? formatPersonalisedLine(
              dict?.rsvpToastPass_guest ||
                'Thank you, {guest}! Your guest pass has been downloaded.',
              activeGuestName
            )
          : '🎫 Guest pass downloaded!'
      );
    } catch {
      onShowToast('Could not create guest pass.');
    } finally {
      setDownloadingPass(false);
    }
  };

  // Add chosen events to calendar (.ics)
  const handleAddToCalendar = () => {
    try {
      setDownloadingCal(true);
      const chosenEventList = Array.from(
        new Set(state.members.flatMap((m) => m.attendingEvents || []))
      );
      const icsData = generateChosenEventsIcs(
        chosenEventList,
        config,
        activeGuestName || 'Guest',
        lang
      );

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Wedding-Events-${state.rsvpCode}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      onShowToast(
        activeGuestName
          ? formatPersonalisedLine(
              dict?.rsvpToastCal_guest ||
                'Thank you, {guest}! Your calendar invite has been downloaded.',
              activeGuestName
            )
          : '📅 Calendar events (.ics) downloaded!'
      );
    } catch {
      onShowToast('Could not create calendar file.');
    } finally {
      setDownloadingCal(false);
    }
  };

  // Update RSVP (reopen draft with same code and new timestamp)
  const handleUpdateRsvp = () => {
    onChange((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      isConfirmed: false,
      currentStep: 1,
    }));
    onEditStep(1);
    onShowToast(
      activeGuestName
        ? `✏️ Welcome back, ${activeGuestName}! Your saved RSVP draft is open.`
        : '✏️ Saved RSVP draft reopened!'
    );
  };

  const confirmHeadingText = activeGuestName
    ? formatPersonalisedLine(
        dict?.rsvpConfirmReady_guest || 'Your ticket is ready, {guest}',
        activeGuestName
      )
    : lang === 'en'
      ? 'Your Wedding Express Ticket'
      : 'Aapka Shaadi Express Ticket';

  const passengerLineText = formatPersonalisedLine(
    dict?.rsvpPassengerLabel_guest || 'PASSENGER: {GUEST}',
    activeGuestName || 'GUEST'
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Ticket Confirmation Stub Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
          Boarding Pass & Final Summary
        </span>
        <h3
          data-testid="rsvp-confirm-heading"
          className="font-serif text-2xl font-bold text-stone-900 dark:text-amber-100"
        >
          {confirmHeadingText}
        </h3>
        <p className="text-xs text-stone-600 dark:text-stone-300">
          {lang === 'en'
            ? 'Please review your details below before sending your confirmation on WhatsApp.'
            : 'Kripya saari jankari check kar lein. Confirmation ke baad seedha WhatsApp par details bheji jayengi.'}
        </p>
      </div>

      {/* VINTAGE TICKET STUB CONTAINER */}
      <div className="relative bg-gradient-to-b from-[#FFFDF9] to-[#FBF6EE] dark:from-stone-900 dark:to-stone-950 border-2 border-amber-600/40 rounded-2xl shadow-xl overflow-hidden">
        {/* Golden hairline ornamental border */}
        <div className="absolute inset-2 border border-amber-400/30 rounded-xl pointer-events-none" />

        {/* Rubber Stamp "CONFIRMED" Watermark / Badge if confirmed */}
        {state.isConfirmed && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 transform -rotate-12 select-none animate-stamp">
            <div className="border-4 border-red-600/80 dark:border-red-500/90 rounded-lg px-8 py-3 bg-red-50/20 backdrop-blur-[1px] shadow-2xl">
              <span className="font-black text-4xl sm:text-5xl tracking-widest text-red-600/90 dark:text-red-500/90 uppercase">
                CONFIRMED
              </span>
              <span className="block text-[11px] font-mono text-center text-red-700/80 mt-1 tracking-wider">
                CODE: {state.rsvpCode} · WEDDING EXPRESS
              </span>
            </div>
          </div>
        )}

        {/* Ticket Header Bar */}
        <div className="bg-amber-900 text-amber-100 px-5 py-3 flex items-center justify-between border-b border-amber-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚂</span>
            <div>
              <span className="font-serif text-sm font-bold tracking-wide">
                WEDDING EXPRESS PASS
              </span>
              <span className="block text-[10px] text-amber-300 font-mono">
                {passengerLineText}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 block">
              RSVP CODE
            </span>
            <span className="font-mono text-base font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/60 text-amber-200">
              {state.rsvpCode}
            </span>
          </div>
        </div>

        {/* Ticket Body Content */}
        <div className="p-5 sm:p-7 space-y-6 text-stone-850 dark:text-stone-200 relative z-10">
          {/* Step 1 Overview */}
          <div className="flex items-start justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                {passengerLineText}
              </span>
              <h4 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                {activeGuestName || 'Guest'}
              </h4>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-300 pt-0.5">
                {state.phone && <span>📞 {state.phone}</span>}
                {state.city && <span>📍 {state.city}</span>}
                <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded font-semibold text-[11px]">
                  {state.side === 'dulhan'
                    ? dict?.rsvpOptionBride || "Bride's side 🌸"
                    : state.side === 'dulhe'
                    ? dict?.rsvpOptionGroom || "Groom's side 👑"
                    : dict?.rsvpOptionBoth || 'Both (common) 🤝'}
                </span>
                {state.relationship && (
                  <span className="text-stone-500 font-mono text-[11px]">
                    ({state.relationship})
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-xs text-amber-700 dark:text-amber-400 hover:underline font-semibold"
            >
              Edit ✏️
            </button>
          </div>

          {/* Attendance Status */}
          <div className="p-3 bg-stone-100/70 dark:bg-stone-850 rounded-lg flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase font-mono text-stone-400 block">
                Attendance Confirmation
              </span>
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {state.attendance === 'attending' && '🎉 Pakka! Hum poore josh se aa rahe hain'}
                {state.attendance === 'tentative' && '🤔 Shayad (Dates confirm kar rahe hain)'}
                {state.attendance === 'declined' && '🌸 Nahi aa paayenge (Dil se shubhkaamnayein)'}
              </span>
            </div>
            <span className="text-2xl">
              {state.attendance === 'attending' ? '✅' : state.attendance === 'tentative' ? '⏳' : '💌'}
            </span>
          </div>

          {/* Parivaar / Passenger List */}
          <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                👥 Parivaar (Party Members: {state.members.length})
              </span>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-xs text-amber-700 dark:text-amber-400 hover:underline font-semibold"
              >
                Edit ✏️
              </button>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-stone-800">
              {state.members.map((m, idx) => (
                <div key={m.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-stone-400">#{idx + 1}</span>
                    <span className="font-semibold text-stone-850 dark:text-stone-200">
                      {m.name || `Member ${idx + 1}`}
                    </span>
                    <span className="text-[11px] text-stone-400">({m.ageGroup})</span>
                    <VegNonVegMark type={m.diet} size="sm" showLabel={false} />
                  </div>

                  <div className="text-right text-[11px] text-stone-500">
                    {m.allergies.length > 0 && (
                      <span className="text-rose-600 dark:text-rose-400 mr-2">
                        ⚠️ {m.allergies.join(', ')}
                      </span>
                    )}
                    <span>{m.attendingEvents.length} Events</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Khana & Caterer Summary */}
          <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                🍽️ Khana & Caterer Hints
              </span>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-xs text-amber-700 dark:text-amber-400 hover:underline font-semibold"
              >
                Edit ✏️
              </button>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {Object.entries(totals.dietCounts).map(([type, count]) => (
                <span
                  key={type}
                  className="bg-stone-100 dark:bg-stone-800 px-2.5 py-1 rounded-md text-stone-700 dark:text-stone-300 capitalize"
                >
                  {type}: <strong>{count}</strong>
                </span>
              ))}
              {totals.kidMeals > 0 && (
                <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 px-2.5 py-1 rounded-md">
                  Kid Meals: <strong>{totals.kidMeals}</strong>
                </span>
              )}
            </div>

            {/* Favorite dishes */}
            {state.dietPreferences.menuFavorites.length > 0 && (
              <div className="text-xs text-stone-600 dark:text-stone-300 pt-1">
                <span className="text-stone-400 font-mono">Loved Dishes: </span>
                <span className="font-medium">
                  {state.dietPreferences.menuFavorites.join(', ')}
                </span>
              </div>
            )}

            <div className="text-xs text-stone-500 pt-1 flex flex-wrap gap-3">
              <span>🌶️ Spice: {state.dietPreferences.spiceLevel} / 4</span>
              <span>🍬 Sweet-Tooth: {getSweetToothLabel(state.dietPreferences.sweetToothLevel).title}</span>
            </div>
          </div>

          {/* Travel & Stay Overview */}
          <div className="space-y-2 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                🧳 Safar & Rehaayish (Travel & Stay)
              </span>
              <button
                type="button"
                onClick={() => onEditStep(4)}
                className="text-xs text-amber-700 dark:text-amber-400 hover:underline font-semibold"
              >
                Edit ✏️
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-stone-50 dark:bg-stone-850/60 rounded">
                <span className="text-stone-400 font-mono block mb-1">TRAVEL</span>
                <p className="font-semibold text-stone-800 dark:text-stone-200">
                  {state.travel.mode} · Arriving {state.travel.arrivalDate} ({state.travel.arrivalTime})
                </p>
                {state.travel.carrierNumber && (
                  <span className="text-stone-500 text-[11px] block">
                    No: {state.travel.carrierNumber}
                  </span>
                )}
                {state.travel.needPickup && (
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium block mt-0.5">
                    🚗 Pickup needed at {state.travel.pickupLoc} ({state.travel.pickupTime})
                  </span>
                )}
              </div>

              <div className="p-2.5 bg-stone-50 dark:bg-stone-850/60 rounded">
                <span className="text-stone-400 font-mono block mb-1">STAY</span>
                {state.stay.needRoom ? (
                  <div>
                    <p className="font-semibold text-stone-800 dark:text-stone-200">
                      {state.stay.roomsCount} Room(s) · {state.stay.roomType}
                    </p>
                    <span className="text-stone-500 text-[11px] block">
                      {state.stay.checkInDate} to {state.stay.checkOutDate}
                    </span>
                  </div>
                ) : (
                  <p className="font-semibold text-stone-800 dark:text-stone-200">
                    Self-arranged ({state.stay.ownHotelName || 'Own Stay'})
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Masti & Blessing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-bold">
                🎉 Masti, Sangeet & Aashirwad
              </span>
              <button
                type="button"
                onClick={() => onEditStep(5)}
                className="text-xs text-amber-700 dark:text-amber-400 hover:underline font-semibold"
              >
                Edit ✏️
              </button>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <div>
                <span className="font-semibold">Dance Energy:</span> Level {state.masti.danceLevel}/4 ({getDanceLevelLabel(state.masti.danceLevel).title})
              </div>
              {state.masti.songRequest && (
                <div>
                  <span className="font-semibold">DJ Request:</span> &ldquo;{state.masti.songRequest}&rdquo;
                </div>
              )}
              {state.masti.blessingWish && (
                <div className="italic text-stone-700 dark:text-stone-300 pt-1 border-t border-stone-100 dark:border-stone-800">
                  &ldquo;{state.masti.blessingWish}&rdquo;
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="space-y-3 pt-2">
        {/* BIG MAIN CTA: Pakka, ticket confirm karo */}
        <button
          type="button"
          onClick={onFinalSubmit}
          className="w-full min-h-[52px] px-6 py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm shadow-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white cursor-pointer"
        >
          <span className="text-xl">🎟️</span>
          <span>Pakka, ticket confirm karo (Send via WhatsApp)</span>
        </button>

        {/* Action Row: Copy details, Save guest pass, Add chosen events to calendar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={onCopyDetails}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-50 transition-colors shadow-sm cursor-pointer"
          >
            <span>📋</span>
            <span>Copy Details</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadGuestPass}
            disabled={downloadingPass}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <span>🎫</span>
            <span>{downloadingPass ? 'Generating...' : 'Save Guest Pass'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCalendar}
            disabled={downloadingCal}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-50 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <span>📅</span>
            <span>{downloadingCal ? 'Adding...' : 'Add to Calendar'}</span>
          </button>
        </div>

        {/* Update my RSVP button */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={handleUpdateRsvp}
            className="text-xs text-stone-500 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-300 underline font-medium cursor-pointer"
          >
            ✏️ Update my RSVP (Reopen saved draft with code {state.rsvpCode})
          </button>
        </div>
      </div>
    </div>
  );
};
