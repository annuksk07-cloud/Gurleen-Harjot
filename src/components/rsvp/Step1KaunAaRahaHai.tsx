import React from 'react';
import { Check, Heart, Sparkles, Send } from 'lucide-react';
import { HOST_PHONE } from '../../config';
import { WeddingTheme } from '../../themes/themes';
import { FullRsvpState, WeddingSide } from '../../utils/rsvpTypes';
import { sanitizePlainText } from '../../utils/rsvpLogic';
import { TranslationDictionary } from '../../i18n/translations';

interface Step1Props {
  state: FullRsvpState;
  updateState: (patch: Partial<FullRsvpState>) => void;
  onNext: () => void;
  onSkipToConfirm: () => void;
  theme: WeddingTheme;
  dict: TranslationDictionary;
}

const SIDE_OPTIONS: Array<{ value: WeddingSide; label: string; icon: string }> = [
  { value: 'dulhan', label: 'Dulhan ki taraf', icon: '👰' },
  { value: 'dulhe', label: 'Dulhe ki taraf', icon: '🤵' },
  { value: 'dono', label: 'Dono (Common)', icon: '🤝' },
];

const RELATIONSHIPS = [
  'Family',
  'Friend',
  'Colleague',
  'Relative',
  'Neighbour',
  'College Gang',
  'Childhood Friend',
];

export const Step1KaunAaRahaHai: React.FC<Step1Props> = ({
  state,
  updateState,
  onNext,
  onSkipToConfirm,
  theme,
  dict,
}) => {
  const [errorName, setErrorName] = React.useState('');
  const [errorPhone, setErrorPhone] = React.useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!state.primaryName.trim() || state.primaryName.trim().length < 2) {
      setErrorName('Please enter your name (at least 2 characters)');
      hasError = true;
    } else {
      setErrorName('');
    }

    if (!state.phone.trim() || state.phone.replace(/[^0-9]/g, '').length < 8) {
      setErrorPhone('Please enter a valid phone number');
      hasError = true;
    } else {
      setErrorPhone('');
    }

    if (hasError) return;

    // Sync member 1's name with primaryName
    if (state.members.length > 0 && !state.members[0].name.trim()) {
      const updatedMembers = [...state.members];
      updatedMembers[0] = { ...updatedMembers[0], name: state.primaryName.trim() };
      updateState({ members: updatedMembers });
    }

    if (state.attendance === 'declined') {
      onSkipToConfirm();
    } else {
      onNext();
    }
  };

  return (
    <form onSubmit={handleNext} noValidate className="space-y-6">
      {/* Step Header */}
      <div className="text-center sm:text-start">
        <span
          className="text-xs font-english uppercase tracking-widest font-semibold px-3 py-1 rounded-full border inline-block mb-2"
          style={{
            backgroundColor: `${theme.tint1}66`,
            borderColor: `${theme.goldStart}80`,
            color: theme.button,
          }}
        >
          {dict.rsvpStep1Title}
        </span>
        <h3 className="font-heading-serif italic text-2xl sm:text-3xl" style={{ color: theme.text }}>
          {dict.rsvpWelcomeLine} 🚂
        </h3>
        <p className="text-xs sm:text-sm font-english opacity-85 mt-1" style={{ color: theme.text }}>
          {dict.rsvpWelcomeSubtitle}
        </p>
      </div>

      {/* Primary Guest Name */}
      <div>
        <label
          htmlFor="rsvp-primary-name"
          className="block font-english text-xs uppercase tracking-[0.12em] font-medium mb-1.5"
          style={{ color: theme.text }}
        >
          {dict.rsvpLabelName} *
        </label>
        <input
          id="rsvp-primary-name"
          type="text"
          inputMode="text"
          autoComplete="name"
          enterKeyHint="next"
          value={state.primaryName}
          onChange={(e) => {
            const val = sanitizePlainText(e.target.value, 80);
            updateState({ primaryName: val });
            if (errorName) setErrorName('');
          }}
          placeholder={dict.rsvpPlaceholderName}
          className="w-full text-base min-h-[48px] px-4 py-2.5 rounded-2xl font-english border focus:outline-none focus:ring-2 shadow-inner"
          style={{
            backgroundColor: `${theme.base}F2`,
            borderColor: errorName ? '#DC2626' : `${theme.goldStart}99`,
            color: theme.text,
          }}
        />
        {errorName && (
          <p role="alert" className="mt-1 text-xs text-rose-600 font-medium">
            {errorName}
          </p>
        )}
      </div>

      {/* Phone & Optional Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="rsvp-primary-phone"
            className="block font-english text-xs uppercase tracking-[0.12em] font-medium mb-1.5"
            style={{ color: theme.text }}
          >
            {dict.rsvpLabelPhone} *
          </label>
          <input
            id="rsvp-primary-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            value={state.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9+ -]/g, '').slice(0, 16);
              updateState({ phone: val });
              if (errorPhone) setErrorPhone('');
            }}
            placeholder={`e.g. ${HOST_PHONE}`}
            className="w-full text-base min-h-[48px] px-4 py-2.5 rounded-2xl font-english border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: `${theme.base}F2`,
              borderColor: errorPhone ? '#DC2626' : `${theme.goldStart}99`,
              color: theme.text,
            }}
          />
          {errorPhone && (
            <p role="alert" className="mt-1 text-xs text-rose-600 font-medium">
              {errorPhone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="rsvp-primary-email"
            className="block font-english text-xs uppercase tracking-[0.12em] font-medium mb-1.5"
            style={{ color: theme.text }}
          >
            {dict.rsvpLabelEmail}
          </label>
          <input
            id="rsvp-primary-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            enterKeyHint="next"
            value={state.email}
            onChange={(e) => updateState({ email: sanitizePlainText(e.target.value, 80) })}
            placeholder="e.g. rahul@example.com"
            className="w-full text-base min-h-[48px] px-4 py-2.5 rounded-2xl font-english border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: `${theme.base}F2`,
              borderColor: `${theme.goldStart}99`,
              color: theme.text,
            }}
          />
        </div>
      </div>

      {/* City */}
      <div>
        <label
          htmlFor="rsvp-city"
          className="block font-english text-xs uppercase tracking-[0.12em] font-medium mb-1.5"
          style={{ color: theme.text }}
        >
          {dict.rsvpLabelCity}
        </label>
        <input
          id="rsvp-city"
          type="text"
          inputMode="text"
          autoComplete="address-level2"
          enterKeyHint="next"
          value={state.city}
          onChange={(e) => {
            const val = sanitizePlainText(e.target.value, 60);
            updateState({
              city: val,
              travel: { ...state.travel, city: val },
            });
          }}
          placeholder={dict.rsvpPlaceholderCity}
          className="w-full text-base min-h-[48px] px-4 py-2.5 rounded-2xl font-english border focus:outline-none focus:ring-2"
          style={{
            backgroundColor: `${theme.base}F2`,
            borderColor: `${theme.goldStart}99`,
            color: theme.text,
          }}
        />
      </div>

      {/* Side Chips */}
      <div>
        <span
          className="block font-english text-xs uppercase tracking-[0.12em] font-medium mb-2"
          style={{ color: theme.text }}
        >
          {dict.rsvpLabelSide}
        </span>
        <div className="grid grid-cols-3 gap-2">
          {SIDE_OPTIONS.map((opt) => {
            const isSelected = state.side === opt.value;
            // Map the value to dictionary keys if needed
            const label = opt.value === 'dulhan' ? dict.rsvpOptionBride : opt.value === 'dulhe' ? dict.rsvpOptionGroom : dict.rsvpOptionBoth;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateState({ side: opt.value })}
                className="min-h-[46px] px-3 py-2 rounded-2xl border text-xs sm:text-sm font-english flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                style={{
                  backgroundColor: isSelected ? theme.button : `${theme.base}E6`,
                  color: isSelected ? theme.base : theme.text,
                  borderColor: isSelected ? theme.button : `${theme.goldStart}80`,
                  boxShadow: isSelected ? '0 4px 12px -2px rgba(0,0,0,0.18)' : 'none',
                }}
              >
                <span>{opt.icon}</span>
                <span className="font-medium truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Relationship Chips */}
      <div>
        <span
          className="block font-english text-xs uppercase tracking-[0.12em] font-medium mb-2"
          style={{ color: theme.text }}
        >
          {dict.rsvpLabelRelationship}
        </span>
        <div className="flex flex-wrap gap-2">
          {RELATIONSHIPS.map((rel) => {
            const isSelected = state.relationship === rel;
            // Assuming the keys for relationships are something like rsvpRelationshipFamily
            const label = rel === 'Family' ? dict.rsvpRelationshipFamily : rel === 'Friend' ? dict.rsvpRelationshipFriend : rel === 'Colleague' ? dict.rsvpRelationshipColleague : rel === 'Relative' ? dict.rsvpRelationshipRelative : rel === 'Neighbour' ? dict.rsvpRelationshipNeighbour : rel === 'College friend' ? dict.rsvpRelationshipCollege : dict.rsvpRelationshipChildhood;
            return (
              <button
                key={rel}
                type="button"
                onClick={() => updateState({ relationship: rel })}
                className="min-h-[40px] px-3.5 py-1.5 rounded-full border text-xs font-english transition-all cursor-pointer"
                style={{
                  backgroundColor: isSelected ? theme.button : `${theme.base}D9`,
                  color: isSelected ? theme.base : theme.text,
                  borderColor: isSelected ? theme.button : `${theme.goldStart}73`,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* One line story: Kaise mile hum se? */}
      <div>
        <label
          htmlFor="rsvp-how-we-met"
          className="block font-english text-xs uppercase tracking-[0.12em] font-medium mb-1.5"
          style={{ color: theme.text }}
        >
          {dict.rsvpLabelHowWeMet}
        </label>
        <input
          id="rsvp-how-we-met"
          type="text"
          inputMode="text"
          enterKeyHint="next"
          value={state.howWeMet}
          onChange={(e) => updateState({ howWeMet: sanitizePlainText(e.target.value, 120) })}
          placeholder={dict.rsvpPlaceholderHowWeMet}
          className="w-full text-base min-h-[48px] px-4 py-2.5 rounded-2xl font-english border focus:outline-none focus:ring-2"
          style={{
            backgroundColor: `${theme.base}F2`,
            borderColor: `${theme.goldStart}99`,
            color: theme.text,
          }}
        />
      </div>

      {/* Attendance Cards */}
      <div>
        <span
          className="block font-english text-xs uppercase tracking-[0.12em] font-medium mb-2.5"
          style={{ color: theme.text }}
        >
          {dict.rsvpLabelAttendance} *
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Pakka */}
          <button
            type="button"
            onClick={() => updateState({ attendance: 'attending' })}
            className="p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between"
            style={{
              backgroundColor: state.attendance === 'attending' ? `${theme.button}` : `${theme.base}E6`,
              color: state.attendance === 'attending' ? theme.base : theme.text,
              borderColor: state.attendance === 'attending' ? theme.button : `${theme.goldStart}80`,
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl">🥳</span>
              {state.attendance === 'attending' && <Check className="w-4 h-4" />}
            </div>
            <p className="font-heading-serif italic text-base font-bold">{dict.rsvpAttendingYes}</p>
            <p className="text-[11px] opacity-85 mt-0.5">{dict.rsvpAttendingYesSub}</p>
          </button>

          {/* Shayad */}
          <button
            type="button"
            onClick={() => updateState({ attendance: 'tentative' })}
            className="p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between"
            style={{
              backgroundColor: state.attendance === 'tentative' ? `${theme.button}` : `${theme.base}E6`,
              color: state.attendance === 'tentative' ? theme.base : theme.text,
              borderColor: state.attendance === 'tentative' ? theme.button : `${theme.goldStart}80`,
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl">🤔</span>
              {state.attendance === 'tentative' && <Check className="w-4 h-4" />}
            </div>
            <p className="font-heading-serif italic text-base font-bold">{dict.rsvpAttendingMaybe}</p>
            <p className="text-[11px] opacity-85 mt-0.5">{dict.rsvpAttendingMaybeSub}</p>
          </button>

          {/* Nahi aa paayenge */}
          <button
            type="button"
            onClick={() => updateState({ attendance: 'declined' })}
            className="p-3.5 rounded-2xl border text-start transition-all cursor-pointer flex flex-col justify-between"
            style={{
              backgroundColor: state.attendance === 'declined' ? '#7A2E3A' : `${theme.base}E6`,
              color: state.attendance === 'declined' ? '#FFF8EC' : theme.text,
              borderColor: state.attendance === 'declined' ? '#7A2E3A' : `${theme.goldStart}80`,
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl">💌</span>
              {state.attendance === 'declined' && <Check className="w-4 h-4" />}
            </div>
            <p className="font-heading-serif italic text-base font-bold">{dict.rsvpAttendingNo}</p>
            <p className="text-[11px] opacity-85 mt-0.5">{dict.rsvpAttendingNoSub}</p>
          </button>
        </div>
      </div>

      {/* If declining: show heartfelt blessing field and Skip to Confirm */}
      {state.attendance === 'declined' && (
        <div
          className="p-4 sm:p-5 rounded-2xl border space-y-3 animate-in fade-in duration-300"
          style={{
            backgroundColor: `${theme.tint1}50`,
            borderColor: `${theme.goldStart}99`,
          }}
        >
          <div className="flex items-center gap-2" style={{ color: theme.button }}>
            <Heart className="w-4 h-4 fill-current" />
            <span className="font-heading-serif italic font-semibold text-sm">
              We will miss you! Please write a blessing:
            </span>
          </div>
          <textarea
            rows={3}
            value={state.declineBlessing}
            onChange={(e) => updateState({ declineBlessing: sanitizePlainText(e.target.value, 400) })}
            placeholder="Sending lots of love and blessings..."
            className="w-full text-base px-3.5 py-2.5 rounded-xl font-english border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: `${theme.base}FA`,
              borderColor: `${theme.goldStart}80`,
              color: theme.text,
            }}
          />
          <button
            type="button"
            onClick={onSkipToConfirm}
            className="theme-btn w-full min-h-[48px] px-6 py-2.5 rounded-full font-english text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            style={{ backgroundColor: theme.button, color: theme.base }}
          >
            <Send className="w-4 h-4 rtl-flip" />
            <span>Skip To Confirm & Send Wishes on WhatsApp</span>
          </button>
        </div>
      )}

      {/* Next Step CTA */}
      {state.attendance !== 'declined' && (
        <button
          type="submit"
          className="theme-btn w-full min-h-[48px] px-6 py-3 rounded-full font-english text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          style={{ backgroundColor: theme.button, color: theme.base }}
        >
          <span>{dict.rsvpBtnNext} Add your party (Step 2)</span>
          <Sparkles className="w-4 h-4" />
        </button>
      )}
    </form>
  );
};
