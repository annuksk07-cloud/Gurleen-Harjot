import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Heart, Sparkles, ChevronLeft, Flame, AlertCircle, UtensilsCrossed, Info } from 'lucide-react';
import { WeddingTheme } from '../../themes/themes';
import { WeddingConfig } from '../../config';
import { FullRsvpState } from '../../utils/rsvpTypes';
import { calculatePartyTotals, getSweetToothLabel, sanitizePlainText } from '../../utils/rsvpLogic';
import { FoodMark } from './FoodMarks';

interface Step3Props {
  state: FullRsvpState;
  updateState: (patch: Partial<FullRsvpState>) => void;
  onNext: () => void;
  onPrev: () => void;
  config: WeddingConfig;
  theme: WeddingTheme;
}

const BEVERAGE_OPTIONS = [
  'Chai',
  'Coffee',
  'Mocktail',
  'Lassi',
  'Thandai',
  'Soft drinks',
  'Juice',
];

const MENU_CATEGORIES = [
  { key: 'welcomeDrinks', label: 'Welcome Drinks' },
  { key: 'starters', label: 'Starters' },
  { key: 'mains', label: 'Mains' },
  { key: 'breadsAndRice', label: 'Breads & Rice' },
  { key: 'liveCounters', label: 'Live Counters' },
  { key: 'desserts', label: 'Desserts' },
] as const;

export const Step3Khana: React.FC<Step3Props> = ({
  state,
  updateState,
  onNext,
  onPrev,
  config,
  theme,
}) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const totals = calculatePartyTotals(state.members);
  const [activeMenuTab, setActiveMenuTab] = useState<string>('welcomeDrinks');

  const updateDietPrefs = (patch: Partial<FullRsvpState['dietPreferences']>) => {
    updateState({
      dietPreferences: { ...state.dietPreferences, ...patch },
    });
  };

  const updateSeating = (patch: Partial<FullRsvpState['seating']>) => {
    updateState({
      seating: { ...state.seating, ...patch },
    });
  };

  const toggleBeverage = (bev: string) => {
    const exists = state.dietPreferences.beverages.includes(bev);
    const next = exists
      ? state.dietPreferences.beverages.filter((b) => b !== bev)
      : [...state.dietPreferences.beverages, bev];
    updateDietPrefs({ beverages: next });
  };

  const toggleFavoriteDish = (dishName: string) => {
    const favorites = state.dietPreferences.menuFavorites;
    if (favorites.includes(dishName)) {
      updateDietPrefs({ menuFavorites: favorites.filter((f) => f !== dishName) });
    } else {
      if (favorites.length >= 5) return; // Up to 5 favorites max
      updateDietPrefs({ menuFavorites: [...favorites, dishName] });
    }
  };

  const sweetInfo = getSweetToothLabel(state.dietPreferences.sweetToothLevel);

  // Animated sweet SVG based on sweetToothLevel (scale 0.8 to 1.6)
  const sweetScale = 0.8 + state.dietPreferences.sweetToothLevel * 0.16;

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
          Step 3 · Khana & Menu Love
        </span>
        <h3 className="font-heading-serif italic text-2xl sm:text-3xl" style={{ color: theme.text }}>
          Shaadi ki Daawat & Rasoi Preferences 🍲
        </h3>
        <p className="text-xs sm:text-sm font-english opacity-85 mt-1" style={{ color: theme.text }}>
          Har plate mein swaad aur pyaar! Apni aur parivaar ki pasand darj karein.
        </p>
      </div>

      {/* Auto-Counted Totals Banner */}
      <div
        className="p-4 rounded-2xl border shadow-inner"
        style={{
          backgroundColor: `${theme.tint1}40`,
          borderColor: `${theme.goldStart}99`,
        }}
      >
        <div className="flex items-center gap-2 mb-2 font-english text-xs font-bold uppercase tracking-wider" style={{ color: theme.button }}>
          <UtensilsCrossed className="w-4 h-4" />
          <span>Auto-Counted Guest Totals ({totals.totalGuests} People)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-english">
          <div className="p-2 rounded-xl bg-white/70 border border-emerald-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FoodMark diet="veg" className="w-3.5 h-3.5" />
              <span>Veg:</span>
            </span>
            <span className="font-bold">{totals.dietCounts.veg}</span>
          </div>

          <div className="p-2 rounded-xl bg-white/70 border border-rose-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FoodMark diet="non-veg" className="w-3.5 h-3.5" />
              <span>Non-veg:</span>
            </span>
            <span className="font-bold">{totals.dietCounts['non-veg']}</span>
          </div>

          <div className="p-2 rounded-xl bg-white/70 border border-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FoodMark diet="jain" className="w-3.5 h-3.5" />
              <span>Jain:</span>
            </span>
            <span className="font-bold">{totals.dietCounts.jain}</span>
          </div>

          <div className="p-2 rounded-xl bg-white/70 border border-blue-300 flex items-center justify-between">
            <span>👶 Kid Meals:</span>
            <span className="font-bold">{totals.kidMealsCount}</span>
          </div>
        </div>

        {/* Deduplicated Allergy Summary */}
        {totals.allergies.length > 0 && (
          <div className="mt-2.5 pt-2 border-t border-rose-200 flex items-start gap-1.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Allergy Alert on record:</strong> {totals.allergies.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Special Dietary Toggles & Steppers */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-4"
        style={{
          backgroundColor: `${theme.base}F2`,
          borderColor: `${theme.goldStart}80`,
        }}
      >
        <span className="block font-english text-xs uppercase tracking-wider font-bold" style={{ color: theme.button }}>
          Special Dietary Requirements
        </span>

        {/* Boolean Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex items-center gap-2 p-2.5 rounded-xl border bg-white/80 cursor-pointer">
            <input
              type="checkbox"
              checked={state.dietPreferences.noOnionGarlic}
              onChange={(e) => updateDietPrefs({ noOnionGarlic: e.target.checked })}
              className="w-4 h-4 rounded accent-[#7A3E55]"
            />
            <span className="text-xs font-english font-medium">Bina Pyaaz-Lehsun (No Onion/Garlic)</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border bg-white/80 cursor-pointer">
            <input
              type="checkbox"
              checked={state.dietPreferences.sattvic}
              onChange={(e) => updateDietPrefs({ sattvic: e.target.checked })}
              className="w-4 h-4 rounded accent-[#7A3E55]"
            />
            <span className="text-xs font-english font-medium">Shuddh Sattvic Bhojan</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border bg-white/80 cursor-pointer">
            <input
              type="checkbox"
              checked={state.dietPreferences.softFoodSeniors}
              onChange={(e) => updateDietPrefs({ softFoodSeniors: e.target.checked })}
              className="w-4 h-4 rounded accent-[#7A3E55]"
            />
            <span className="text-xs font-english font-medium">Soft Food for Seniors</span>
          </label>
        </div>

        {/* Stepper counts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Jain Plates */}
          <div className="p-3 rounded-xl border bg-white/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-english font-bold">Jain Special Plates</p>
              <p className="text-[10px] opacity-75">No root veg</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateDietPrefs({ jainSpecialPlates: Math.max(0, state.dietPreferences.jainSpecialPlates - 1) })}
                className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-sm bg-gray-50"
              >
                −
              </button>
              <span className="text-sm font-bold tabular-nums min-w-[16px] text-center">
                {state.dietPreferences.jainSpecialPlates}
              </span>
              <button
                type="button"
                onClick={() => updateDietPrefs({ jainSpecialPlates: state.dietPreferences.jainSpecialPlates + 1 })}
                className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-sm bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Gluten Free */}
          <div className="p-3 rounded-xl border bg-white/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-english font-bold">Gluten-Free Plates</p>
              <p className="text-[10px] opacity-75">Wheat-free</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateDietPrefs({ glutenFreeCount: Math.max(0, state.dietPreferences.glutenFreeCount - 1) })}
                className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-sm bg-gray-50"
              >
                −
              </button>
              <span className="text-sm font-bold tabular-nums min-w-[16px] text-center">
                {state.dietPreferences.glutenFreeCount}
              </span>
              <button
                type="button"
                onClick={() => updateDietPrefs({ glutenFreeCount: state.dietPreferences.glutenFreeCount + 1 })}
                className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-sm bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Diabetic Friendly */}
          <div className="p-3 rounded-xl border bg-white/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-english font-bold">Diabetic-Friendly</p>
              <p className="text-[10px] opacity-75">Low GI / sugar-free</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateDietPrefs({ diabeticFriendlyCount: Math.max(0, state.dietPreferences.diabeticFriendlyCount - 1) })}
                className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-sm bg-gray-50"
              >
                −
              </button>
              <span className="text-sm font-bold tabular-nums min-w-[16px] text-center">
                {state.dietPreferences.diabeticFriendlyCount}
              </span>
              <button
                type="button"
                onClick={() => updateDietPrefs({ diabeticFriendlyCount: state.dietPreferences.diabeticFriendlyCount + 1 })}
                className="w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-sm bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spice Slider */}
      <div
        className="p-4 sm:p-5 rounded-2xl border"
        style={{
          backgroundColor: `${theme.base}F2`,
          borderColor: `${theme.goldStart}80`,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="spice-slider" className="font-english text-xs uppercase tracking-wider font-bold flex items-center gap-1.5" style={{ color: theme.button }}>
            <Flame className="w-4 h-4 text-orange-600" />
            <span>Teekha Meter (Spice Tolerance)</span>
          </label>
          <span className="font-heading-serif italic font-semibold text-sm" style={{ color: theme.accent }}>
            {['', 'Mild & Gentle', 'Medium Masala', 'Teekha & Chatpata', 'Mirchi ka Dushman 🌶️🔥'][state.dietPreferences.spiceLevel]}
          </span>
        </div>

        <input
          id="spice-slider"
          type="range"
          min="1"
          max="4"
          step="1"
          value={state.dietPreferences.spiceLevel}
          onChange={(e) => updateDietPrefs({ spiceLevel: Number(e.target.value) as 1 | 2 | 3 | 4 })}
          className="w-full h-2.5 bg-gradient-to-r from-yellow-200 via-orange-400 to-red-600 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-[11px] font-english opacity-80 mt-1">
          <span>Mild</span>
          <span>Medium</span>
          <span>Teekha</span>
          <span>Dushman 🌶️</span>
        </div>
      </div>

      {/* Beverage Preferences Chips */}
      <div>
        <label className="block font-english text-xs uppercase tracking-wider font-bold mb-2" style={{ color: theme.text }}>
          Peevan / Beverages of Choice
        </label>
        <div className="flex flex-wrap gap-2">
          {BEVERAGE_OPTIONS.map((bev) => {
            const isSelected = state.dietPreferences.beverages.includes(bev);
            return (
              <button
                key={bev}
                type="button"
                onClick={() => toggleBeverage(bev)}
                className="min-h-[38px] px-3.5 py-1.5 rounded-full border text-xs font-english transition-all cursor-pointer flex items-center gap-1.5"
                style={{
                  backgroundColor: isSelected ? theme.button : `${theme.base}`,
                  color: isSelected ? theme.base : theme.text,
                  borderColor: isSelected ? theme.button : `${theme.goldStart}73`,
                }}
              >
                {isSelected && '✓ '}
                <span>{bev}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sweet-Tooth Meter with Animated Growing Sweet */}
      <div
        className="p-4 sm:p-5 rounded-2xl border"
        style={{
          backgroundColor: `${theme.tint1}35`,
          borderColor: `${theme.goldStart}80`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <label htmlFor="sweet-tooth-slider" className="font-english text-xs uppercase tracking-wider font-bold block" style={{ color: theme.button }}>
              Mithai / Sweet-Tooth Meter
            </label>
            <p className="font-heading-serif italic text-sm font-semibold mt-0.5" style={{ color: theme.accent }}>
              {sweetInfo.title} — <span className="opacity-90">{sweetInfo.subtitle}</span>
            </p>
          </div>

          {/* Animated growing sweet */}
          <motion.div
            animate={
              prefersReducedMotion
                ? { scale: sweetScale }
                : { scale: [sweetScale, sweetScale * 1.08, sweetScale], rotate: [0, -3, 3, 0] }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-12 h-12 flex items-center justify-center shrink-0"
          >
            <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-md">
              {/* Gulab Jamun in Golden Syrup */}
              <circle cx="20" cy="22" r="14" fill="#6B2F1F" />
              <ellipse cx="20" cy="22" rx="13" ry="12" fill="#8B3E28" />
              <path d="M14 17 Q20 12 26 17" stroke="#F5DC9C" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
              {/* Pistachio flake */}
              <ellipse cx="18" cy="18" rx="2.5" ry="1.2" fill="#75A66B" transform="rotate(-20 18 18)" />
              <circle cx="23" cy="22" r="1" fill="#F5DC9C" />
            </svg>
          </motion.div>
        </div>

        <input
          id="sweet-tooth-slider"
          type="range"
          min="1"
          max="5"
          step="1"
          value={state.dietPreferences.sweetToothLevel}
          onChange={(e) => updateDietPrefs({ sweetToothLevel: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
          className="w-full h-2.5 bg-gradient-to-r from-amber-200 via-pink-300 to-amber-600 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-[11px] font-english opacity-80 mt-1">
          <span>Level 1 (Shagun)</span>
          <span>Level 3 (Foodie)</span>
          <span>Level 5 (Swimming pool)</span>
        </div>
      </div>

      {/* Chef Note */}
      <div>
        <label htmlFor="chef-note" className="block font-english text-xs uppercase tracking-wider font-bold mb-1.5" style={{ color: theme.text }}>
          Chef ko Note / Kitchen Message
        </label>
        <textarea
          id="chef-note"
          rows={2}
          value={state.dietPreferences.chefNote}
          onChange={(e) => updateDietPrefs({ chefNote: sanitizePlainText(e.target.value, 200) })}
          placeholder="e.g. Dadi ke liye bina mirchi ki khichdi, ya bachon ke liye plain milk..."
          className="w-full text-base px-3.5 py-2.5 rounded-xl font-english border focus:outline-none focus:ring-1"
          style={{
            backgroundColor: `${theme.base}F2`,
            borderColor: `${theme.goldStart}80`,
            color: theme.text,
          }}
        />
      </div>

      {/* ===================================================================
          MENU LOVE CARD (From config.MENU)
      =================================================================== */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-4"
        style={{
          backgroundColor: `${theme.base}FC`,
          borderColor: `${theme.goldStart}99`,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h4 className="font-heading-serif italic text-lg sm:text-xl font-bold flex items-center gap-2" style={{ color: theme.button }}>
              <Heart className="w-5 h-5 text-rose-600 fill-current" />
              <span>Menu Love: Tap to Heart Your Favourites</span>
            </h4>
            <p className="text-xs font-english opacity-85" style={{ color: theme.text }}>
              Apni pasandida dishes pe dil dabayein ({state.dietPreferences.menuFavorites.length}/5 selected).
            </p>
          </div>
        </div>

        {/* Disclaimer Notice: Counts are only a hint for caterer */}
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
          <span>
            <strong>Mehmaan dhyan dein:</strong> Yeh counts aur pasand sirf caterer bhaiya ke andaze ke liye hain, menu mein badlaav sambhav hai.
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => {
            const isTabActive = activeMenuTab === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveMenuTab(cat.key)}
                className="min-h-[36px] px-3 py-1.5 rounded-full border text-xs font-english whitespace-nowrap transition-all cursor-pointer"
                style={{
                  backgroundColor: isTabActive ? theme.button : `${theme.base}`,
                  color: isTabActive ? theme.base : theme.text,
                  borderColor: isTabActive ? theme.button : `${theme.goldStart}73`,
                  fontWeight: isTabActive ? 600 : 400,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dishes in Active Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {((config.MENU as any)?.[activeMenuTab] || []).map((dish: any) => {
            const isHearted = state.dietPreferences.menuFavorites.includes(dish.name);
            return (
              <div
                key={dish.id}
                className="p-3 rounded-xl border flex items-center justify-between gap-2.5 transition-all"
                style={{
                  backgroundColor: isHearted ? `${theme.tint1}66` : 'white',
                  borderColor: isHearted ? theme.accent : `${theme.goldStart}50`,
                }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <FoodMark diet={dish.isVeg ? 'veg' : 'non-veg'} className="w-3.5 h-3.5" />
                    <span className="font-english font-semibold text-xs truncate" style={{ color: theme.text }}>
                      {dish.name}
                    </span>
                  </div>
                  {/* Dietary tags */}
                  {dish.tags && dish.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {dish.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-700 font-english capitalize">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Heart Button */}
                <button
                  type="button"
                  onClick={() => toggleFavoriteDish(dish.name)}
                  aria-label={`Heart ${dish.name}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 cursor-pointer shrink-0 border"
                  style={{
                    backgroundColor: isHearted ? '#F43F5E' : 'white',
                    color: isHearted ? 'white' : '#9CA3AF',
                    borderColor: isHearted ? '#F43F5E' : '#E5E7EB',
                  }}
                >
                  <Heart className={`w-4 h-4 ${isHearted ? 'fill-current' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Suggest a Dish */}
        <div className="pt-2">
          <label htmlFor="suggest-dish" className="block text-xs font-english font-medium mb-1" style={{ color: theme.text }}>
            Koi khaas dish jo miss ho gayi? (Suggest a Dish)
          </label>
          <input
            id="suggest-dish"
            type="text"
            value={state.dietPreferences.suggestedDish}
            onChange={(e) => updateDietPrefs({ suggestedDish: sanitizePlainText(e.target.value, 80) })}
            placeholder="e.g. Malai Kofta, Rabri Falooda, Garlic Naan..."
            className="w-full text-xs min-h-[40px] px-3 py-2 rounded-xl font-english border focus:outline-none"
            style={{
              backgroundColor: 'white',
              borderColor: `${theme.goldStart}80`,
              color: theme.text,
            }}
          />
        </div>
      </div>

      {/* ===================================================================
          SEATING PREFERENCES
      =================================================================== */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3.5"
        style={{
          backgroundColor: `${theme.base}F2`,
          borderColor: `${theme.goldStart}80`,
        }}
      >
        <span className="block font-english text-xs uppercase tracking-wider font-bold" style={{ color: theme.button }}>
          Seating & Table Preferences (Baithne ki vyavastha)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="group-name" className="block text-[11px] font-english uppercase tracking-wider font-medium mb-1" style={{ color: theme.text }}>
              Table / Group Name
            </label>
            <input
              id="group-name"
              type="text"
              value={state.seating.groupName}
              onChange={(e) => updateSeating({ groupName: sanitizePlainText(e.target.value, 40) })}
              placeholder="e.g. Chachu Clan, College Gang, Delhi Friends..."
              className="w-full text-base min-h-[42px] px-3.5 py-2 rounded-xl font-english border focus:outline-none"
              style={{
                backgroundColor: 'white',
                borderColor: `${theme.goldStart}80`,
                color: theme.text,
              }}
            />
          </div>

          <div>
            <label htmlFor="sit-with-names" className="block text-[11px] font-english uppercase tracking-wider font-medium mb-1" style={{ color: theme.text }}>
              Inke Saath Baithna Hai (Names)
            </label>
            <input
              id="sit-with-names"
              type="text"
              value={state.seating.sitWithNames}
              onChange={(e) => updateSeating({ sitWithNames: sanitizePlainText(e.target.value, 80) })}
              placeholder="e.g. Simran, Rohan & Neha..."
              className="w-full text-base min-h-[42px] px-3.5 py-2 rounded-xl font-english border focus:outline-none"
              style={{
                backgroundColor: 'white',
                borderColor: `${theme.goldStart}80`,
                color: theme.text,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <label className="flex items-center gap-2 p-2.5 rounded-xl border bg-white cursor-pointer">
            <input
              type="checkbox"
              checked={state.seating.eldersNearEntrance}
              onChange={(e) => updateSeating({ eldersNearEntrance: e.target.checked })}
              className="w-4 h-4 rounded accent-[#7A3E55]"
            />
            <span className="text-xs font-english font-medium">Buzurgon ke liye gate ke paas aasan</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border bg-white cursor-pointer">
            <input
              type="checkbox"
              checked={state.seating.kidsZone}
              onChange={(e) => updateSeating({ kidsZone: e.target.checked })}
              className="w-4 h-4 rounded accent-[#7A3E55]"
            />
            <span className="text-xs font-english font-medium">Bachon ke zone / games ke paas seat</span>
          </label>
        </div>
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
          <span>Agla Padav: Safar & Stay (Step 4)</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
