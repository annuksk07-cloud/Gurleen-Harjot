import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Search, Sparkles, X, Check } from 'lucide-react';
import {
  BUILTIN_TRANSLATIONS,
  CustomLanguageRecord,
  LANGUAGES,
  TranslationDictionary,
  saveCustomLanguage,
} from '../i18n/translations';
import { WeddingTheme } from '../themes/themes';

interface LanguageSheetProps {
  activeLangCode: string;
  activeNativeName: string;
  dict: TranslationDictionary;
  theme: WeddingTheme;
  customLanguages: Record<string, CustomLanguageRecord>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelectLanguage: (langCode: string, customRecord?: CustomLanguageRecord) => void;
}

export const LanguageFloatingChip: React.FC<{
  activeNativeName: string;
  theme: WeddingTheme;
  onOpen: () => void;
}> = ({ activeNativeName, theme, onOpen }) => {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-testid="floating-language-chip"
      aria-label={`Change language (${activeNativeName})`}
      className="fixed top-3 left-4 z-50 h-[44px] min-h-[44px] px-3.5 rounded-full flex items-center gap-2 backdrop-blur-md shadow-sm active:scale-95 transition-all cursor-pointer"
      style={{
        backgroundColor: `${theme.base}E0`,
        border: `1px solid ${theme.goldStart}99`,
        color: theme.text,
      }}
    >
      <Globe className="w-4 h-4 shrink-0" style={{ color: theme.button }} aria-hidden="true" />
      <span
        className="text-xs font-medium tracking-wide whitespace-nowrap"
        style={{ fontFamily: `var(--font-active-script), 'Jost', sans-serif` }}
      >
        {activeNativeName}
      </span>
    </button>
  );
};

export const LanguageSheet: React.FC<LanguageSheetProps> = ({
  activeLangCode,
  dict,
  theme,
  customLanguages,
  isOpen,
  onClose,
  onSelectLanguage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLangName, setCustomLangName] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [politeNotice, setPoliteNotice] = useState<string | null>(null);

  const allLanguages = useMemo(() => {
    const customList = Object.values(customLanguages).map((c) => ({
      code: c.code,
      nativeName: c.nativeName,
      englishName: c.englishName,
      scriptName: c.dir === 'rtl' ? 'RTL' : 'Custom',
      fontFamily: null as string | null,
    }));
    return [
      ...LANGUAGES.map((l) => ({
        code: l.code,
        nativeName: l.nativeName,
        englishName: l.englishName,
        scriptName: l.scriptName,
        fontFamily: l.googleFontFamily,
      })),
      ...customList.filter((c) => !LANGUAGES.some((b) => b.code === c.code)),
    ];
  }, [customLanguages]);

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allLanguages;
    return allLanguages.filter(
      (item) =>
        item.nativeName.toLowerCase().includes(q) ||
        item.englishName.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [allLanguages, searchQuery]);

  const handleMoreLanguageTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = customLangName.trim();
    if (!target || isTranslating) return;

    setPoliteNotice(null);

    // Check if it matches one of the 12 built-in languages first
    const matchedBuiltIn = LANGUAGES.find(
      (l) =>
        l.englishName.toLowerCase() === target.toLowerCase() ||
        l.nativeName.toLowerCase() === target.toLowerCase() ||
        l.code.toLowerCase() === target.toLowerCase()
    );
    if (matchedBuiltIn) {
      onSelectLanguage(matchedBuiltIn.code);
      setCustomLangName('');
      setShowCustomInput(false);
      onClose();
      return;
    }

    // Check if already cached in localStorage
    const cachedEntry = Object.values(customLanguages).find(
      (c) =>
        c.englishName.toLowerCase() === target.toLowerCase() ||
        c.nativeName.toLowerCase() === target.toLowerCase() ||
        c.code.toLowerCase() === target.toLowerCase()
    );
    if (cachedEntry) {
      onSelectLanguage(cachedEntry.code, cachedEntry);
      setCustomLangName('');
      setShowCustomInput(false);
      onClose();
      return;
    }

    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetLanguage: target,
          sourceDictionary: BUILTIN_TRANSLATIONS.en,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data || !data.ok || !data.dictionary) {
        setPoliteNotice(dict.moreLanguagesFallbackMessage);
        setIsTranslating(false);
        return;
      }

      const record: CustomLanguageRecord = {
        code: String(data.code || target.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8)),
        nativeName: String(data.nativeName || target),
        englishName: String(data.englishName || target),
        dir: data.dir === 'rtl' ? 'rtl' : 'ltr',
        dictionary: data.dictionary,
      };

      saveCustomLanguage(record);
      onSelectLanguage(record.code, record);
      setCustomLangName('');
      setShowCustomInput(false);
      onClose();
    } catch {
      setPoliteNotice(dict.moreLanguagesFallbackMessage);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="language-sheet-heading"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Bottom Sheet */}
          <motion.div
            data-testid="language-bottom-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[560px] rounded-t-3xl p-5 sm:p-6 pb-safe shadow-2xl max-h-[85svh] overflow-y-auto"
            style={{
              backgroundColor: theme.base,
              color: theme.text,
              borderTop: `1px solid ${theme.goldStart}80`,
            }}
          >
            {/* Grab Handle */}
            <div className="w-10 h-1 rounded-full mx-auto mb-4 opacity-35" style={{ backgroundColor: theme.text }} />

            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 shrink-0" style={{ color: theme.button }} aria-hidden="true" />
                <h2
                  id="language-sheet-heading"
                  className="font-heading-serif italic text-2xl font-semibold leading-[1.8]"
                  style={{ color: theme.text }}
                >
                  {dict.languageSheetTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={dict.closeButton}
                className="min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center border transition-colors cursor-pointer"
                style={{
                  borderColor: `${theme.goldStart}66`,
                  color: theme.text,
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search
                className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3.5 opacity-60 pointer-events-none"
                style={{ color: theme.text }}
              />
              <input
                type="search"
                data-testid="language-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={dict.languageSearchPlaceholder}
                aria-label={dict.languageSearchPlaceholder}
                className="w-full min-h-[44px] ps-10 pe-4 py-2 rounded-2xl font-english text-sm focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: `${theme.tint1}45`,
                  border: `1px solid ${theme.goldStart}66`,
                  color: theme.text,
                }}
              />
            </div>

            {/* Grid of 12 Native-Script Language Chips + "More languages" Chip */}
            <div
              data-testid="language-chip-grid"
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3"
            >
              {filteredLanguages.map((lang) => {
                const isSelected = lang.code === activeLangCode;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    data-testid={`lang-option-${lang.code}`}
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      onClose();
                    }}
                    aria-pressed={isSelected}
                    className="min-h-[48px] px-3.5 py-2 rounded-2xl border flex items-center justify-between gap-2 text-start transition-all cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? theme.button : `${theme.base}`,
                      color: isSelected ? theme.base : theme.text,
                      borderColor: isSelected ? theme.button : `${theme.goldStart}66`,
                    }}
                  >
                    <div className="min-w-0">
                      <p
                        className="text-sm font-medium leading-snug truncate"
                        style={{
                          fontFamily: lang.fontFamily
                            ? `'${lang.fontFamily}', 'Jost', serif`
                            : `'Jost', sans-serif`,
                        }}
                      >
                        {lang.nativeName}
                      </p>
                      <p className="font-english text-[11px] opacity-75 truncate">
                        {lang.englishName}
                      </p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                );
              })}

              {/* "More languages" Chip at the end of the grid */}
              <button
                type="button"
                data-testid="more-languages-chip"
                onClick={() => {
                  setShowCustomInput((v) => !v);
                  setPoliteNotice(null);
                }}
                className="min-h-[48px] px-3.5 py-2 rounded-2xl border border-dashed flex items-center justify-center gap-1.5 font-english text-xs font-medium transition-all cursor-pointer"
                style={{
                  borderColor: theme.button,
                  color: theme.button,
                  backgroundColor: `${theme.tint1}30`,
                }}
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{dict.moreLanguagesButton}</span>
              </button>
            </div>

            {/* Expandable Custom Language Input via Server-side Gemini */}
            <AnimatePresence>
              {showCustomInput && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleMoreLanguageTranslate}
                  className="overflow-hidden pt-2"
                >
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      data-testid="custom-language-input"
                      value={customLangName}
                      onChange={(e) => setCustomLangName(e.target.value)}
                      placeholder={dict.moreLanguagesPromptPlaceholder}
                      disabled={isTranslating}
                      className="flex-1 min-h-[44px] px-3.5 py-2 rounded-2xl font-english text-sm focus:outline-none"
                      style={{
                        backgroundColor: `${theme.tint1}35`,
                        border: `1px solid ${theme.goldStart}77`,
                        color: theme.text,
                      }}
                    />
                    <button
                      type="submit"
                      data-testid="custom-language-submit"
                      disabled={isTranslating || !customLangName.trim()}
                      className="min-h-[44px] px-5 py-2 rounded-2xl font-english text-xs uppercase tracking-wider font-medium transition-opacity disabled:opacity-50 cursor-pointer"
                      style={{
                        backgroundColor: theme.button,
                        color: theme.base,
                      }}
                    >
                      {isTranslating
                        ? dict.moreLanguagesTranslating
                        : dict.moreLanguagesTranslateButton}
                    </button>
                  </div>

                  {politeNotice && (
                    <p
                      role="status"
                      data-testid="more-languages-fallback-notice"
                      className="mt-2.5 font-english text-xs px-3 py-2 rounded-xl"
                      style={{
                        backgroundColor: `${theme.tint2}55`,
                        color: theme.text,
                      }}
                    >
                      {politeNotice}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
