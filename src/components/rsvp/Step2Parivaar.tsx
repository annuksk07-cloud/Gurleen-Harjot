import React from 'react';
import { Plus, Trash2, Copy, Users, Check, Sparkles, ChevronLeft } from 'lucide-react';
import { WeddingTheme } from '../../themes/themes';
import { WeddingConfig } from '../../config';
import {
  FullRsvpState,
  GuestMember,
  AgeGroup,
  DietType,
  AllergyType,
  SpecialNeed,
} from '../../utils/rsvpTypes';
import { FoodMark } from './FoodMarks';
import { getPartySizeMicrocopy, sanitizePlainText } from '../../utils/rsvpLogic';

interface Step2Props {
  state: FullRsvpState;
  updateState: (patch: Partial<FullRsvpState>) => void;
  onNext: () => void;
  onPrev: () => void;
  config: WeddingConfig;
  theme: WeddingTheme;
}

const ALLERGY_OPTIONS: AllergyType[] = [
  'peanut',
  'tree nut',
  'dairy',
  'gluten',
  'shellfish',
  'egg',
  'soy',
  'sesame',
];

const SPECIAL_NEEDS: SpecialNeed[] = [
  'high chair',
  'wheelchair',
  'elder seat',
  'stroller space',
];

const DIET_OPTIONS: Array<{ value: DietType; label: string }> = [
  { value: 'veg', label: 'Veg' },
  { value: 'non-veg', label: 'Non-veg' },
  { value: 'jain', label: 'Jain' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'eggetarian', label: 'Eggetarian' },
];

const AGE_GROUPS: Array<{ value: AgeGroup; label: string; sub: string }> = [
  { value: 'adult', label: 'Adult', sub: '18+' },
  { value: 'teen', label: 'Teen', sub: '13-17' },
  { value: 'child', label: 'Child', sub: '5-12' },
  { value: 'under5', label: 'Under 5', sub: 'Toddler' },
  { value: 'senior', label: 'Senior', sub: '60+' },
];

/**
 * Clean SVG Avatar for each age group.
 */
const AvatarIcon: React.FC<{ ageGroup: AgeGroup; color: string }> = ({ ageGroup, color }) => {
  switch (ageGroup) {
    case 'under5':
      return (
        <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 shrink-0">
          <circle cx="18" cy="18" r="14" fill="#FCE8D5" stroke={color} strokeWidth="1.5" />
          {/* Baby tuft of hair */}
          <path d="M18 6 C17 3, 20 2, 19 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="13" cy="17" r="1.5" fill={color} />
          <circle cx="23" cy="17" r="1.5" fill={color} />
          <path d="M15 22 Q18 25 21 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="20" r="1.5" fill="#E8927C" opacity="0.6" />
          <circle cx="26" cy="20" r="1.5" fill="#E8927C" opacity="0.6" />
        </svg>
      );
    case 'child':
      return (
        <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 shrink-0">
          <circle cx="18" cy="18" r="14" fill="#FDEED9" stroke={color} strokeWidth="1.5" />
          {/* Playful side cap / hair */}
          <path d="M7 15 Q18 8 29 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="13" cy="19" r="1.8" fill={color} />
          <circle cx="23" cy="19" r="1.8" fill={color} />
          <path d="M14 23 Q18 27 22 23" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'teen':
      return (
        <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 shrink-0">
          <circle cx="18" cy="18" r="14" fill="#FCE9DE" stroke={color} strokeWidth="1.5" />
          {/* Cool sunglasses */}
          <rect x="9" y="14" width="7" height="5" rx="1.5" fill={color} />
          <rect x="20" y="14" width="7" height="5" rx="1.5" fill={color} />
          <line x1="16" y1="16.5" x2="20" y2="16.5" stroke={color} strokeWidth="1.5" />
          <path d="M15 23 Q18 26 21 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'senior':
      return (
        <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 shrink-0">
          <circle cx="18" cy="18" r="14" fill="#F9EDE1" stroke={color} strokeWidth="1.5" />
          {/* Eyeglasses */}
          <circle cx="13" cy="17" r="3.5" stroke={color} strokeWidth="1.4" />
          <circle cx="23" cy="17" r="3.5" stroke={color} strokeWidth="1.4" />
          <line x1="16.5" y1="17" x2="19.5" y2="17" stroke={color} strokeWidth="1.4" />
          <path d="M9 13 Q18 8 27 13" stroke="#999" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 24 Q18 27 22 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'adult':
    default:
      return (
        <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 shrink-0">
          <circle cx="18" cy="18" r="14" fill="#FDF3E7" stroke={color} strokeWidth="1.5" />
          <path d="M8 14 Q18 6 28 14" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="13" cy="18" r="1.6" fill={color} />
          <circle cx="23" cy="18" r="1.6" fill={color} />
          <path d="M14 23 Q18 26 22 23" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
};

export const Step2Parivaar: React.FC<Step2Props> = ({
  state,
  updateState,
  onNext,
  onPrev,
  config,
  theme,
}) => {
  const allEventTitles = config.EVENTS.map((e) => e.englishTitle);

  const updateMember = (id: string, patch: Partial<GuestMember>) => {
    const updated = state.members.map((m) => {
      if (m.id !== id) return m;
      const next = { ...m, ...patch };
      return next;
    });

    // If sameDietForAll is true and person 1 changed their diet, update all
    if (state.sameDietForAll && patch.diet && id === state.members[0]?.id) {
      const synched = updated.map((m) => ({ ...m, diet: patch.diet! }));
      updateState({ members: synched });
      return;
    }

    updateState({ members: updated });
  };

  const handleToggleSameDiet = (checked: boolean) => {
    updateState({
      sameDietForAll: checked,
      members: checked && state.members.length > 0
        ? state.members.map((m) => ({ ...m, diet: state.members[0].diet }))
        : state.members,
    });
  };

  const handleAddMember = () => {
    if (state.members.length >= 12) return;
    const newMember: GuestMember = {
      id: `member-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: '',
      ageGroup: 'adult',
      diet: state.sameDietForAll && state.members[0] ? state.members[0].diet : 'veg',
      allergies: [],
      otherAllergy: '',
      attendingEvents: [...allEventTitles],
      needs: [],
    };
    updateState({ members: [...state.members, newMember] });
  };

  const handleDuplicateLast = () => {
    if (state.members.length >= 12 || state.members.length === 0) return;
    const last = state.members[state.members.length - 1];
    const duplicated: GuestMember = {
      ...last,
      id: `member-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: '',
    };
    updateState({ members: [...state.members, duplicated] });
  };

  const handleRemoveMember = (id: string) => {
    if (state.members.length <= 1) return; // Must have at least 1 person
    updateState({ members: state.members.filter((m) => m.id !== id) });
  };

  const toggleMemberAllergy = (m: GuestMember, allergy: AllergyType) => {
    const exists = m.allergies.includes(allergy);
    const next = exists ? m.allergies.filter((a) => a !== allergy) : [...m.allergies, allergy];
    updateMember(m.id, { allergies: next });
  };

  const toggleMemberNeed = (m: GuestMember, need: SpecialNeed) => {
    const exists = m.needs.includes(need);
    const next = exists ? m.needs.filter((n) => n !== need) : [...m.needs, need];
    updateMember(m.id, { needs: next });
  };

  const toggleMemberEvent = (m: GuestMember, eventTitle: string) => {
    const exists = m.attendingEvents.includes(eventTitle);
    const next = exists
      ? m.attendingEvents.filter((t) => t !== eventTitle)
      : [...m.attendingEvents, eventTitle];
    updateMember(m.id, { attendingEvents: next });
  };

  const microcopy = getPartySizeMicrocopy(state.members.length);

  return (
    <div className="space-y-6">
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
          Step 2 · Parivaar (Guest Builder)
        </span>
        <h3 className="font-heading-serif italic text-2xl sm:text-3xl" style={{ color: theme.text }}>
          Har mehmaan ka khaas khayaal! 👥
        </h3>
        {/* Warm microcopy */}
        <p
          className="text-xs sm:text-sm font-english mt-1 font-medium p-2.5 rounded-xl border"
          style={{
            backgroundColor: `${theme.tint1}40`,
            borderColor: `${theme.goldStart}73`,
            color: theme.button,
          }}
        >
          {microcopy}
        </p>
      </div>

      {/* Global Toggle: Same food for all */}
      <div
        className="flex items-center justify-between p-3.5 rounded-2xl border"
        style={{
          backgroundColor: `${theme.base}F2`,
          borderColor: `${theme.goldStart}80`,
        }}
      >
        <div className="flex items-center gap-2">
          <FoodMark diet="veg" className="w-4 h-4" />
          <span className="text-xs sm:text-sm font-english font-medium" style={{ color: theme.text }}>
            Sab ke liye same khana (Apply Person 1's diet to all)
          </span>
        </div>
        <input
          type="checkbox"
          checked={state.sameDietForAll}
          onChange={(e) => handleToggleSameDiet(e.target.checked)}
          aria-label="Sab ke liye same khana toggle"
          className="w-5 h-5 rounded cursor-pointer accent-[#7A3E55]"
        />
      </div>

      {/* Member Cards List */}
      <div className="space-y-4">
        {state.members.map((member, index) => {
          return (
            <div
              key={member.id}
              className="p-4 sm:p-5 rounded-2xl border shadow-sm transition-all animate-in fade-in duration-200"
              style={{
                backgroundColor: `${theme.base}FC`,
                borderColor: `${theme.goldStart}80`,
              }}
            >
              {/* Member Card Header */}
              <div className="flex items-center justify-between border-b pb-3 mb-3.5" style={{ borderColor: `${theme.goldStart}40` }}>
                <div className="flex items-center gap-2.5">
                  <AvatarIcon ageGroup={member.ageGroup} color={theme.button} />
                  <div>
                    <span className="font-english font-bold text-xs uppercase tracking-wider" style={{ color: theme.button }}>
                      Mehmaan #{index + 1}
                    </span>
                    <span className="text-xs opacity-75 font-english ml-2" style={{ color: theme.text }}>
                      {index === 0 ? '(Primary Guest)' : ''}
                    </span>
                  </div>
                </div>

                {/* Remove button (Person 1 cannot be removed if alone) */}
                {state.members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member.id)}
                    aria-label={`Remove Mehmaan #${index + 1}`}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Name & Age Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[11px] font-english uppercase tracking-wider font-medium mb-1" style={{ color: theme.text }}>
                    Mehmaan ka Naam *
                  </label>
                  <input
                    type="text"
                    inputMode="text"
                    enterKeyHint="next"
                    value={member.name}
                    onChange={(e) => {
                      const val = sanitizePlainText(e.target.value, 60);
                      updateMember(member.id, { name: val });
                      if (index === 0) updateState({ primaryName: val });
                    }}
                    placeholder={index === 0 ? state.primaryName || 'Aapka Naam' : `Mehmaan #${index + 1} ka naam`}
                    className="w-full text-base min-h-[44px] px-3.5 py-2 rounded-xl font-english border focus:outline-none focus:ring-1"
                    style={{
                      backgroundColor: `${theme.base}`,
                      borderColor: `${theme.goldStart}80`,
                      color: theme.text,
                    }}
                  />
                </div>

                {/* Age Group */}
                <div>
                  <label className="block text-[11px] font-english uppercase tracking-wider font-medium mb-1" style={{ color: theme.text }}>
                    Umra / Age Group
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {AGE_GROUPS.map((ag) => {
                      const isSelected = member.ageGroup === ag.value;
                      return (
                        <button
                          key={ag.value}
                          type="button"
                          onClick={() => updateMember(member.id, { ageGroup: ag.value })}
                          className="min-h-[36px] px-2.5 py-1 rounded-xl border text-xs font-english transition-all cursor-pointer flex items-center gap-1"
                          style={{
                            backgroundColor: isSelected ? theme.button : `${theme.base}`,
                            color: isSelected ? theme.base : theme.text,
                            borderColor: isSelected ? theme.button : `${theme.goldStart}73`,
                          }}
                        >
                          <span className="font-medium">{ag.label}</span>
                          <span className="text-[10px] opacity-75">({ag.sub})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Diet Selection (with Indian Food Marks) */}
              <div className="mb-4">
                <label className="block text-[11px] font-english uppercase tracking-wider font-medium mb-1.5" style={{ color: theme.text }}>
                  Bhojan / Diet Preference
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIET_OPTIONS.map((dietOpt) => {
                    const isSelected = member.diet === dietOpt.value;
                    return (
                      <button
                        key={dietOpt.value}
                        type="button"
                        onClick={() => updateMember(member.id, { diet: dietOpt.value })}
                        className="min-h-[38px] px-3 py-1.5 rounded-xl border text-xs font-english transition-all cursor-pointer flex items-center gap-2"
                        style={{
                          backgroundColor: isSelected ? `${theme.tint1}80` : `${theme.base}`,
                          color: theme.text,
                          borderColor: isSelected ? theme.button : `${theme.goldStart}66`,
                          boxShadow: isSelected ? `inset 0 0 0 1.5px ${theme.button}` : 'none',
                        }}
                      >
                        <FoodMark diet={dietOpt.value} className="w-3.5 h-3.5" />
                        <span className="font-medium">{dietOpt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 ml-0.5 text-emerald-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Allergies Chips */}
              <div className="mb-4">
                <label className="block text-[11px] font-english uppercase tracking-wider font-medium mb-1" style={{ color: theme.text }}>
                  Allergies (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {ALLERGY_OPTIONS.map((al) => {
                    const isSelected = member.allergies.includes(al);
                    return (
                      <button
                        key={al}
                        type="button"
                        onClick={() => toggleMemberAllergy(member, al)}
                        className="min-h-[32px] px-2.5 py-1 rounded-full border text-[11px] font-english transition-all cursor-pointer capitalize"
                        style={{
                          backgroundColor: isSelected ? '#BE123C' : `${theme.base}`,
                          color: isSelected ? '#FFFFFF' : theme.text,
                          borderColor: isSelected ? '#BE123C' : `${theme.goldStart}66`,
                        }}
                      >
                        {isSelected && '✓ '}
                        {al}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  value={member.otherAllergy || ''}
                  onChange={(e) => updateMember(member.id, { otherAllergy: sanitizePlainText(e.target.value, 40) })}
                  placeholder="Other allergy (e.g. mushroom, kiwi, mustard)..."
                  className="w-full text-xs min-h-[36px] px-3 py-1.5 rounded-lg font-english border focus:outline-none"
                  style={{
                    backgroundColor: `${theme.base}`,
                    borderColor: `${theme.goldStart}66`,
                    color: theme.text,
                  }}
                />
              </div>

              {/* Attending Events for this person */}
              <div className="mb-3.5">
                <label className="block text-[11px] font-english uppercase tracking-wider font-medium mb-1.5" style={{ color: theme.text }}>
                  Yeh mehmaan kin samaroh mein shamil honge?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {config.EVENTS.map((evt) => {
                    const isSelected = member.attendingEvents.includes(evt.englishTitle);
                    return (
                      <button
                        key={evt.id}
                        type="button"
                        onClick={() => toggleMemberEvent(member, evt.englishTitle)}
                        className="min-h-[34px] px-2.5 py-1 rounded-xl border text-xs font-english transition-all cursor-pointer flex items-center gap-1.5"
                        style={{
                          backgroundColor: isSelected ? theme.button : `${theme.base}`,
                          color: isSelected ? theme.base : theme.text,
                          borderColor: isSelected ? theme.button : `${theme.goldStart}66`,
                        }}
                      >
                        <span className="font-hindi-heading text-xs">{evt.hindiTitle}</span>
                        <span className="text-[10px] opacity-80">({evt.englishTitle})</span>
                        {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Needs */}
              <div>
                <label className="block text-[11px] font-english uppercase tracking-wider font-medium mb-1" style={{ color: theme.text }}>
                  Special Assistance / Needs
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SPECIAL_NEEDS.map((nd) => {
                    const isSelected = member.needs.includes(nd);
                    return (
                      <button
                        key={nd}
                        type="button"
                        onClick={() => toggleMemberNeed(member, nd)}
                        className="min-h-[32px] px-2.5 py-1 rounded-full border text-[11px] font-english transition-all cursor-pointer capitalize"
                        style={{
                          backgroundColor: isSelected ? `${theme.goldEnd}E6` : `${theme.base}`,
                          color: theme.text,
                          borderColor: isSelected ? theme.accent : `${theme.goldStart}66`,
                          fontWeight: isSelected ? 600 : 400,
                        }}
                      >
                        {isSelected && '✓ '}
                        {nd}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row Builder Controls */}
      <div className="flex flex-wrap gap-2.5 pt-2">
        {state.members.length < 12 && (
          <button
            type="button"
            onClick={handleAddMember}
            className="flex-1 min-h-[44px] px-4 py-2.5 rounded-full border font-english text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:opacity-90"
            style={{
              backgroundColor: `${theme.tint1}80`,
              borderColor: theme.goldStart,
              color: theme.button,
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Mehmaan Jodein (Add Person)</span>
          </button>
        )}

        {state.members.length < 12 && state.members.length > 0 && (
          <button
            type="button"
            onClick={handleDuplicateLast}
            className="min-h-[44px] px-4 py-2.5 rounded-full border font-english text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            style={{
              backgroundColor: `${theme.base}`,
              borderColor: `${theme.goldStart}80`,
              color: theme.text,
            }}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Duplicate Last</span>
          </button>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: `${theme.goldStart}40` }}>
        <button
          type="button"
          onClick={onPrev}
          className="min-h-[48px] px-5 py-3 rounded-full border font-english text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          style={{
            backgroundColor: `${theme.base}`,
            borderColor: `${theme.goldStart}99`,
            color: theme.text,
          }}
        >
          <ChevronLeft className="w-4 h-4 rtl-flip" />
          <span>Peechhe</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="theme-btn flex-1 min-h-[48px] px-6 py-3 rounded-full font-english text-xs uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          style={{ backgroundColor: theme.button, color: theme.base }}
        >
          <span>Agla Padav: Khana & Menu (Step 3)</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
