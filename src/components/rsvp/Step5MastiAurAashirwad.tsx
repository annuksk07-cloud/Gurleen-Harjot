import React from 'react';
import {
  FullRsvpState,
  MastiDetails,
  PerformanceType,
} from '../../utils/rsvpTypes';
import { config } from '../../config';
import { getDanceLevelLabel, sanitizePlainText } from '../../utils/rsvpLogic';

interface Step5Props {
  state: FullRsvpState;
  onChange: (updater: (prev: FullRsvpState) => FullRsvpState) => void;
  lang: string;
}

const PERFORMANCE_OPTIONS: { id: PerformanceType; label: string; icon: string }[] = [
  { id: 'Dance', label: 'Bhangra / Dance', icon: '💃' },
  { id: 'Song', label: 'Gaana / Singing', icon: '🎤' },
  { id: 'Skit', label: 'Family Skit / Parivaarik Natak', icon: '🎭' },
  { id: 'Shayari', label: 'Shayari / Kavita', icon: '📜' },
];

const STARTER_WISHES = [
  'Dono ki jodi hamesha salamat rahe, zindagibhar dher saari khushiyan aur barkat mile! ✨',
  'Rab kare aapki muskaan har din aur meethi ho jaye. Mubarak ho yeh khoobsurat safar! 🥂',
  'May your journey ahead be filled with shared laughter, cozy evenings, and endless adventure! 💖',
];

// Extract distinct swatches from config
const ALL_SWATCHES = (() => {
  const map = new Map<string, string>();
  config.EVENTS.forEach((ev) => {
    ev.dressCodeSwatches?.forEach((sw) => {
      if (!map.has(sw.name)) {
        map.set(sw.name, sw.hex);
      }
    });
  });
  // Fallbacks if empty
  if (map.size === 0) {
    map.set('Marigold Gold', '#F2CF7E');
    map.set('Sage Green', '#8FAE86');
    map.set('Blush Pink', '#E8A598');
    map.set('Ivory White', '#FFF8EC');
    map.set('Royal Plum', '#8E6FB5');
  }
  return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
})();

// SVG Dancer Component reflecting dance levels 1 to 4
const SvgDancer: React.FC<{ level: number }> = ({ level }) => {
  if (level === 1) {
    // Level 1: Gentle foot tap & tea cup sway
    return (
      <svg className="w-16 h-16 text-amber-600 animate-pulse" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="24" r="12" fill="#D97706" />
        <circle cx="46" cy="22" r="2" fill="#FFFFFF" />
        <circle cx="54" cy="22" r="2" fill="#FFFFFF" />
        <path d="M47 28 Q50 31 53 28" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        {/* Torso */}
        <path d="M42 38 C42 38 50 36 58 38 L55 68 L45 68 Z" fill="#B45309" />
        {/* Tea cup in right hand */}
        <path d="M42 42 L34 50 L38 52" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
        <path d="M58 42 L66 48 L64 54" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
        <rect x="62" y="52" width="7" height="8" rx="2" fill="#78350F" />
        {/* Legs sitting/gentle tap */}
        <path d="M46 68 L44 88 L38 90" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        <path d="M54 68 L56 88 L62 90" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (level === 2) {
    // Level 2: Taali & Thumka
    return (
      <svg className="w-16 h-16 text-amber-600" viewBox="0 0 100 100" fill="none">
        <circle cx="48" cy="22" r="12" fill="#D97706" />
        <circle cx="45" cy="20" r="2" fill="#FFFFFF" />
        <circle cx="51" cy="20" r="2" fill="#FFFFFF" />
        <path d="M45 26 Q48 30 51 26" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        {/* Torso tilted */}
        <path d="M40 36 L58 36 L54 68 L44 68 Z" fill="#F59E0B" />
        {/* Clapping hands */}
        <path d="M40 40 L48 44" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
        <path d="M58 40 L50 44" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
        <circle cx="49" cy="44" r="3" fill="#D97706" />
        {/* Clapped spark */}
        <circle cx="49" cy="40" r="1.5" fill="#FBBF24" />
        {/* Legs swaying */}
        <path d="M46 68 L40 86 L36 88" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
        <path d="M52 68 L58 86 L64 88" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (level === 3) {
    // Level 3: Full Baraati arms in air & energetic step
    return (
      <svg className="w-16 h-16 text-amber-600 animate-bounce" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="20" r="12" fill="#EA580C" />
        <circle cx="46" cy="18" r="2" fill="#FFFFFF" />
        <circle cx="54" cy="18" r="2" fill="#FFFFFF" />
        <path d="M46 24 Q50 29 54 24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        {/* Turban puff */}
        <path d="M40 16 Q50 8 60 16" fill="#F97316" />
        {/* Torso */}
        <path d="M40 34 L60 34 L56 66 L44 66 Z" fill="#C2410C" />
        {/* Hands in air (Balle Balle) */}
        <path d="M40 38 L26 22 L22 14" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 38 L74 22 L78 14" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
        {/* Legs high step */}
        <path d="M46 66 L38 80 L32 82" stroke="#9A3412" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M54 66 L66 76 L72 88" stroke="#9A3412" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    );
  }
  // Level 4: Nagin dance / Floor tod! Wild energy with sparks
  return (
    <div className="relative">
      <svg className="w-16 h-16 text-amber-600 animate-wiggle" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="18" r="12" fill="#DC2626" />
        {/* Sunglasses */}
        <rect x="42" y="16" width="7" height="5" rx="1.5" fill="#1C1917" />
        <rect x="51" y="16" width="7" height="5" rx="1.5" fill="#1C1917" />
        <line x1="48" y1="18" x2="52" y2="18" stroke="#1C1917" strokeWidth="2" />
        {/* Big smile */}
        <path d="M45 24 Q50 30 55 24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        {/* Torso bending */}
        <path d="M38 32 Q54 36 62 32 L58 64 Q46 66 42 64 Z" fill="#B91C1C" />
        {/* Nagin arms waved */}
        <path d="M38 34 Q20 28 26 12 Q30 6 36 12" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
        <path d="M62 34 Q80 28 74 12 Q70 6 64 12" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
        {/* Legs dynamic floor step */}
        <path d="M44 64 L30 76 L22 74" stroke="#7F1D1D" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M56 64 L72 74 L82 82" stroke="#7F1D1D" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
      <span className="absolute -top-1 -right-1 text-sm animate-ping">🔥</span>
    </div>
  );
};

export const Step5MastiAurAashirwad: React.FC<Step5Props> = ({ state, onChange }) => {
  const { masti } = state;

  const updateMasti = (partial: Partial<MastiDetails>) => {
    onChange((prev) => ({
      ...prev,
      masti: {
        ...prev.masti,
        ...partial,
      },
    }));
  };

  const togglePerformType = (item: PerformanceType) => {
    const list = masti.performTypes || [];
    if (list.includes(item)) {
      updateMasti({ performTypes: list.filter((p) => p !== item) });
    } else {
      updateMasti({ performTypes: [...list, item] });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-amber-50 to-rose-50 dark:from-stone-800 dark:to-stone-850 p-4 rounded-xl border border-amber-200 dark:border-amber-900/40">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="party">
            🎉
          </span>
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-850 dark:text-amber-100">
              Masti & Aashirwad (Celebration & Wishes)
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              Sangeet floor par aag lagani hai ya shaant baith kar chai peeni hai? Song request aur pyaara sa aashirwad yahan bhejein!
            </p>
          </div>
        </div>
      </div>

      {/* 1. DANCE LEVEL SLIDER WITH SVG DANCER */}
      <section className="bg-white/80 dark:bg-stone-900/70 backdrop-blur-sm rounded-xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
          <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm tracking-wide uppercase flex items-center gap-2">
            <span>🕺</span> Dance Floor Energy Level
          </span>
          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
            Level {masti.danceLevel} / 4
          </span>
        </div>

        <div className="flex items-center gap-6 py-2">
          {/* Animated SVG Dancer */}
          <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-amber-50 dark:bg-stone-800 border border-amber-200 dark:border-stone-700 flex flex-col items-center justify-center p-1 shadow-inner">
            <SvgDancer level={masti.danceLevel} />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-stone-700 dark:text-stone-300">
              <span>
                {getDanceLevelLabel(masti.danceLevel).title} ({getDanceLevelLabel(masti.danceLevel).subtitle})
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="4"
              step="1"
              value={masti.danceLevel}
              onChange={(e) => updateMasti({ danceLevel: Number(e.target.value) })}
              className="w-full accent-amber-600 h-2 bg-stone-200 dark:bg-stone-700 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-stone-400">
              <span>1. Tea Sip</span>
              <span>2. Thumka</span>
              <span>3. Balle Balle</span>
              <span>4. Nagin Dance 🐍</span>
            </div>
          </div>
        </div>

        {/* Song Request Field */}
        <div className="pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
            DJ Wale Babu Ko Song Request (Track & Artist)
          </label>
          <div className="relative">
            <input
              type="text"
              value={masti.songRequest}
              onChange={(e) => updateMasti({ songRequest: e.target.value })}
              placeholder="e.g. Gur Naal Ishq Mitha, Sauda Khara Khara, London Thumakda..."
              className="w-full text-base pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              enterKeyHint="next"
            />
            <span className="absolute left-3 top-3 text-stone-400 text-sm">🎵</span>
          </div>
        </div>
      </section>

      {/* 2. PERFORMANCE & STAGE PARTICIPATION */}
      <section className="bg-white/80 dark:bg-stone-900/70 backdrop-blur-sm rounded-xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-100 dark:border-stone-800 pb-2">
          <span className="text-xl">🌟</span>
          <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm tracking-wide uppercase">
            Stage Par Perform Karna Hai? (Sangeet / Reception)
          </h4>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PERFORMANCE_OPTIONS.map((opt) => {
            const active = (masti.performTypes || []).includes(opt.id);
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => togglePerformType(opt.id)}
                className={`p-3 rounded-lg border text-xs font-medium text-center flex flex-col items-center gap-1.5 transition-all ${
                  active
                    ? 'border-amber-600 bg-amber-500 text-white font-bold shadow-sm'
                    : 'border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                }`}
              >
                <span className="text-2xl">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {(masti.performTypes || []).length > 0 && (
          <div className="pt-2 flex items-center justify-between p-3 bg-amber-50/60 dark:bg-stone-850 rounded-lg border border-amber-200 dark:border-stone-700 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-stone-850 dark:text-stone-200 block">
                Kitne Minutes Ka Slot Chahiye?
              </span>
              <span className="text-[11px] text-stone-500">Stage schedule manage karne ke liye</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  updateMasti({ performMinutes: Math.max(1, (masti.performMinutes || 3) - 1) })
                }
                className="w-7 h-7 rounded border border-amber-300 bg-white dark:bg-stone-800 font-bold text-xs"
              >
                -
              </button>
              <span className="text-sm font-bold w-12 text-center">
                {masti.performMinutes || 3} min
              </span>
              <button
                type="button"
                onClick={() =>
                  updateMasti({ performMinutes: Math.min(10, (masti.performMinutes || 3) + 1) })
                }
                className="w-7 h-7 rounded border border-amber-300 bg-white dark:bg-stone-800 font-bold text-xs"
              >
                +
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. OUTFIT COLOR SWATCHES */}
      <section className="bg-white/80 dark:bg-stone-900/70 backdrop-blur-sm rounded-xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
          <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm tracking-wide uppercase flex items-center gap-2">
            <span>👘</span> Aapka Outfit Rang (Dress Code Match)
          </span>
          {masti.outfitColor && (
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              Selected: {masti.outfitColor}
            </span>
          )}
        </div>

        <p className="text-xs text-stone-500">
          Wedding palette ke hisaab se choose karein ya apna pasandeeda rang batayein:
        </p>

        <div className="flex flex-wrap gap-2.5">
          {ALL_SWATCHES.map((sw) => {
            const isSelected = masti.outfitColor === sw.name;
            return (
              <button
                type="button"
                key={sw.name}
                onClick={() => updateMasti({ outfitColor: sw.name })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/50 font-bold text-stone-900 dark:text-stone-100 ring-2 ring-amber-500/40'
                    : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-stone-400/40"
                  style={{ backgroundColor: sw.hex }}
                />
                <span>{sw.name}</span>
              </button>
            );
          })}
        </div>

        {/* Custom text option */}
        <input
          type="text"
          value={masti.outfitColor}
          onChange={(e) => updateMasti({ outfitColor: e.target.value })}
          placeholder="Ya apna koi dusra rang likhein (e.g. Royal Blue, Golden Kurta...)"
          className="w-full text-base px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-900 dark:text-stone-100 text-xs"
        />
      </section>

      {/* 4. BIRTHDAY / ANNIVERSARY CELEBRATION WITH CAKE ANIMATION */}
      <section className="bg-white/80 dark:bg-stone-900/70 backdrop-blur-sm rounded-xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎂</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm tracking-wide uppercase">
              Is Dauran Birthday ya Anniversary Hai?
            </span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={masti.hasCelebration}
              onChange={(e) => updateMasti({ hasCelebration: e.target.checked })}
              className="w-4 h-4 text-amber-600 rounded"
            />
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
              Haan, Celebration Hai!
            </span>
          </label>
        </div>

        {masti.hasCelebration && (
          <div className="p-4 bg-amber-50/60 dark:bg-stone-850 rounded-xl border border-amber-200 dark:border-stone-700 space-y-3 animate-fadeIn">
            {/* Cake SVG animation */}
            <div className="flex items-center gap-3">
              <svg className="w-12 h-12 text-amber-600 animate-bounce" viewBox="0 0 64 64" fill="none">
                {/* Candle flame */}
                <path d="M32 8 C30 14 34 14 32 8" fill="#F59E0B" />
                <circle cx="32" cy="11" r="1.5" fill="#EF4444" />
                {/* Candle stick */}
                <rect x="31" y="14" width="2" height="10" fill="#3B82F6" />
                {/* Top tier */}
                <rect x="22" y="24" width="20" height="12" rx="3" fill="#F472B6" />
                <path d="M22 28 Q27 32 32 28 Q37 32 42 28" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                {/* Bottom tier */}
                <rect x="14" y="36" width="36" height="16" rx="4" fill="#FB7185" />
                <path d="M14 42 Q23 48 32 42 Q41 48 50 42" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                {/* Plate */}
                <ellipse cx="32" cy="54" rx="22" ry="4" fill="#CBD5E1" />
              </svg>

              <div>
                <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  Aapke khaas din par hum milkar cake zaroor katenge! 🥳
                </p>
                <p className="text-[11px] text-stone-500">
                  Naam aur tareekh batayein taaki hum surprise plan kar sakein.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Occasion</label>
                <select
                  value={masti.celebrationType}
                  onChange={(e) =>
                    updateMasti({
                      celebrationType: e.target.value as 'birthday' | 'anniversary',
                    })
                  }
                  className="w-full text-xs px-2.5 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                >
                  <option value="birthday">Janamdin (Birthday) 🎈</option>
                  <option value="anniversary">Marriage Anniversary 💍</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Kiska Din Hai? (Name)</label>
                <input
                  type="text"
                  value={masti.celebrationName}
                  onChange={(e) => updateMasti({ celebrationName: e.target.value })}
                  placeholder="e.g. Chintu / Uncle & Aunty"
                  className="w-full text-base px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Tareekh (Date)</label>
                <input
                  type="date"
                  value={masti.celebrationDate}
                  onChange={(e) => updateMasti({ celebrationDate: e.target.value })}
                  className="w-full text-base px-2.5 py-1.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5. CONSENTS (PHOTOS & WHATSAPP GROUP) */}
      <section className="bg-white/80 dark:bg-stone-900/70 backdrop-blur-sm rounded-xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-xs tracking-wide uppercase flex items-center gap-2">
          <span>📸</span> Photos & WhatsApp Group Consents
        </h4>

        <div className="space-y-2.5">
          <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/30 cursor-pointer">
            <span className="text-xs text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>📷</span> Photos aur wedding videos mein aana theek hai
            </span>
            <input
              type="checkbox"
              checked={masti.photoConsent}
              onChange={(e) => updateMasti({ photoConsent: e.target.checked })}
              className="w-4 h-4 text-amber-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800/30 cursor-pointer">
            <span className="text-xs text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>💬</span> Shaadi WhatsApp group mein updates ke liye add kar lein
            </span>
            <input
              type="checkbox"
              checked={masti.waGroupConsent}
              onChange={(e) => updateMasti({ waGroupConsent: e.target.checked })}
              className="w-4 h-4 text-amber-600 rounded"
            />
          </label>
        </div>
      </section>

      {/* 6. BLESSING NOTE & STARTER WISHES */}
      <section className="bg-white/80 dark:bg-stone-900/70 backdrop-blur-sm rounded-xl p-5 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
          <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm tracking-wide uppercase flex items-center gap-2">
            <span>💌</span> Dulha-Dulhan Ke Liye Aashirwad (Blessing Note)
          </span>
          <span className="text-[11px] text-stone-400">
            {(masti.blessingWish || '').length} / 500
          </span>
        </div>

        {/* 3 Starter Wishes */}
        <div>
          <span className="text-[11px] text-stone-500 block mb-1.5 font-medium">
            Tappable Starter Wishes (Tap to prefill):
          </span>
          <div className="space-y-1.5">
            {STARTER_WISHES.map((wish, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => updateMasti({ blessingWish: wish })}
                className="w-full text-left text-xs p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-amber-50/30 dark:bg-stone-800/50 text-stone-700 dark:text-stone-300 hover:bg-amber-100/50 transition-colors"
              >
                &ldquo;{wish}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Custom Blessing Textarea */}
        <textarea
          rows={3}
          maxLength={500}
          value={masti.blessingWish}
          onChange={(e) =>
            updateMasti({ blessingWish: sanitizePlainText(e.target.value, 500) })
          }
          placeholder="Dil se koi dua ya meethi baat likhein..."
          className="w-full text-base px-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        />

        {/* Couple Advice */}
        <div className="pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1.5">
            Couple Ke Liye Ek Mazedaar Advice (Pro-tip for Married Life)
          </label>
          <input
            type="text"
            value={masti.customAdvice}
            onChange={(e) =>
              updateMasti({ customAdvice: sanitizePlainText(e.target.value, 200) })
            }
            placeholder="e.g. Remote hamesha bhabhi ke haath mein dena, khush rahoge! 😉"
            className="w-full text-base px-3.5 py-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-850 text-stone-900 dark:text-stone-100"
            enterKeyHint="done"
          />
        </div>
      </section>
    </div>
  );
};
