/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { MapPin, CalendarPlus, Check, Phone, MessageCircle } from 'lucide-react';
import { WEDDING_CONFIG } from './config';
import { HeroOpening } from './components/HeroOpening';
import { NoteSection } from './components/NoteSection';
import { CornerFlourishes, PhulkariDivider } from './components/PhulkariDivider';
import { HumariKahaniSection } from './components/HumariKahaniSection';
import { CountdownSection } from './components/CountdownSection';
import { HamareUtsavSection } from './components/HamareUtsavSection';
import { PolaroidGallery } from './components/PolaroidGallery';
import { HeritageArchwaySvg } from './components/EventMotifSvg';
import { RsvpSection } from './components/RsvpSection';
import { WelcomePopup } from './components/WelcomePopup';
import { LanguageSheet } from './components/LanguageSheet';
import { BottomDock, ThemeController } from './components/ThemeController';
import { BeforeInstallPromptEvent, PWAInstallCard } from './components/PWAInstallCard';
import { generateIcsContent } from './utils/weddingUtils';
import {
  clearPwaDismissal,
  detectIsIOS,
  detectIsStandalone,
  getPwaTranslations,
  isPwaDismissedRecently,
  persistPwaDismissal,
} from './i18n/pwaTranslations';
import {
  CustomLanguageRecord,
  detectInitialLanguage,
  getLanguageMeta,
  getLocalizedGreeting,
  getStoredCustomLanguages,
  getTranslationDictionary,
  LANGUAGES,
  persistLanguageChoice,
  syncActiveLanguageDomAndFont,
} from './i18n/translations';
import {
  applyThemeCssVariables,
  getThemeEntranceMotion,
  getThemeForLanguage,
  resolveThemeId,
  THEMES,
  ThemeId,
} from './themes/themes';
import { ambientAudio } from './utils/ambientAudio';
import { formatPersonalisedLine, getGuestDisplayName } from './utils/relativeMatching';
import {
  buildHostTelHref,
  buildHostWhatsAppHref,
  getContactTranslations,
} from './i18n/contactTranslations';

/**
 * ============================================================================
 * 10-SECOND EDITABLE CONFIG RE-EXPORT
 * All names, dates, venues, phones, and media URLs live in `WEDDING_CONFIG`
 * (defined in `./config.ts` and referenced below as `CONFIG`).
 * ============================================================================
 */
export const CONFIG = WEDDING_CONFIG;

const STORAGE_THEME_KEY = 'sarson_subah_theme';
const STORAGE_FOLLOW_LANG_KEY = 'sarson_subah_follow_lang';

function detectInitialTheme(initialLang: string): ThemeId {
  if (typeof window !== 'undefined') {
    const rawHash = (window.location.hash || '').replace(/^#\/?/, '').trim().toLowerCase();
    if (rawHash && LANGUAGES.some((l) => l.code === rawHash)) {
      return getThemeForLanguage(rawHash).id;
    }
    try {
      const savedTheme = window.localStorage.getItem(STORAGE_THEME_KEY);
      if (savedTheme && savedTheme in THEMES) {
        return resolveThemeId(savedTheme);
      }
    } catch {
      // Ignore storage error
    }
  }
  if (initialLang && initialLang !== 'en') {
    return getThemeForLanguage(initialLang).id;
  }
  return 'sarson_subah';
}

function detectInitialFollowLanguage(): boolean {
  if (typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(STORAGE_FOLLOW_LANG_KEY);
      if (saved === 'false') return false;
      if (saved === 'true') return true;
    } catch {
      // Ignore storage error
    }
  }
  return true;
}

export default function App() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const invitationRef = useRef<HTMLElement | null>(null);
  const pendingNoteToastRef = useRef<boolean>(false);
  const toastTimerRef = useRef<number | null>(null);

  const [customLanguages, setCustomLanguages] = useState<Record<string, CustomLanguageRecord>>(
    () => getStoredCustomLanguages()
  );
  const [activeLangCode, setActiveLangCode] = useState<string>(() => detectInitialLanguage());
  const [savedName, setSavedName] = useState<string | null>(() => {
    try {
      return window.localStorage.getItem('guest_name');
    } catch {
      return null;
    }
  });
  const [hasSkippedWelcome, setHasSkippedWelcome] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem('skip_welcome') === 'true';
    } catch {
      return false;
    }
  });
  const [showWelcomePopup, setShowWelcomePopup] = useState<boolean>(false);
  const [noteToastVisible, setNoteToastVisible] = useState<boolean>(false);

  const [activeThemeId, setActiveThemeId] = useState<ThemeId>(() =>
    detectInitialTheme(detectInitialLanguage())
  );
  const [previewThemeId, setPreviewThemeId] = useState<ThemeId | null>(null);
  const [followLanguage, setFollowLanguage] = useState<boolean>(() =>
    detectInitialFollowLanguage()
  );

  const [isInvitationOpened, setIsInvitationOpened] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });
  const [isHeroRevealed, setIsHeroRevealed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(() => detectIsStandalone());
  const [isIOS] = useState<boolean>(() => detectIsIOS());
  const [pwaCardDismissed, setPwaCardDismissed] = useState<boolean>(() => isPwaDismissedRecently());
  const [pwaManualHintOpen, setPwaManualHintOpen] = useState<boolean>(false);
  const [pwaInstalledToast, setPwaInstalledToast] = useState<boolean>(false);
  const [pwaUpdateToast, setPwaUpdateToast] = useState<boolean>(false);

  const [isLanguageSheetOpen, setIsLanguageSheetOpen] = useState(false);
  const [isThemeSheetOpen, setIsThemeSheetOpen] = useState(false);
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);
  const [isPagePulsing, setIsPagePulsing] = useState(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => ambientAudio.getMuted());

  const [calendarSaved, setCalendarSaved] = useState(false);
  const [activeSwatchIndex, setActiveSwatchIndex] = useState<number>(4);

  // Open welcome popup ~500ms after first paint if no name and no skip flag are saved
  useEffect(() => {
    let hasName = false;
    let hasSkip = false;
    try {
      hasName = Boolean(window.localStorage.getItem('guest_name'));
      hasSkip = window.localStorage.getItem('skip_welcome') === 'true';
    } catch {
      hasName = Boolean(savedName);
      hasSkip = hasSkippedWelcome;
    }

    if (!hasName && !hasSkip) {
      const timer = window.setTimeout(() => {
        setShowWelcomePopup(true);
      }, 500);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  // Capture beforeinstallprompt, appinstalled, standalone display-mode changes, and SW updates
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    let installedTimer: number | null = null;
    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      setPwaManualHintOpen(false);
      setPwaInstalledToast(true);
      if (installedTimer) window.clearTimeout(installedTimer);
      installedTimer = window.setTimeout(() => {
        setPwaInstalledToast(false);
      }, 4000);
    };

    const handleSwUpdateReady = () => {
      setPwaUpdateToast(true);
    };

    const mq =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(display-mode: standalone)')
        : null;
    const handleDisplayModeChange = (ev: MediaQueryListEvent) => {
      if (ev.matches) {
        setIsStandalone(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('sarson-subah:sw-update-ready', handleSwUpdateReady);
    mq?.addEventListener?.('change', handleDisplayModeChange);

    return () => {
      if (installedTimer) window.clearTimeout(installedTimer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('sarson-subah:sw-update-ready', handleSwUpdateReady);
      mq?.removeEventListener?.('change', handleDisplayModeChange);
    };
  }, []);

  // Effective theme includes live press-and-hold preview when active
  const effectiveThemeId = previewThemeId || activeThemeId;
  const activeTheme = THEMES[effectiveThemeId] || THEMES.sarson_subah;
  const committedTheme = THEMES[activeThemeId] || THEMES.sarson_subah;

  const dict = getTranslationDictionary(activeLangCode, customLanguages);
  const langMeta = getLanguageMeta(activeLangCode, customLanguages);
  const localizedGreeting = getLocalizedGreeting(activeTheme, activeLangCode);
  const guestDisplayName = getGuestDisplayName(savedName, activeLangCode);

  // Sync active language font, dir="rtl"|"ltr", and lang attribute
  useEffect(() => {
    syncActiveLanguageDomAndFont(activeLangCode, customLanguages);
  }, [activeLangCode, customLanguages]);

  // Sync document.title with guestDisplayName when saved
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (guestDisplayName) {
      document.title = formatPersonalisedLine(
        dict.pageTitle_guest || 'A wedding invitation for {guest}',
        guestDisplayName
      );
    } else {
      document.title = `Sarson Subah — ${CONFIG.COUPLE_DISPLAY_NAMES} Wedding Invitation`;
    }
  }, [guestDisplayName, dict.pageTitle_guest]);

  // Sync active theme CSS variables, shape/button attributes, pattern URI, and Latin font
  useEffect(() => {
    applyThemeCssVariables(activeTheme);
  }, [activeTheme]);

  // Persist committed theme and cross-fade audio track when committed theme changes
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_THEME_KEY, committedTheme.id);
    } catch {
      // Ignore storage error
    }
    const track = CONFIG.THEME_AUDIO_TRACKS?.[committedTheme.id] || CONFIG.AUDIO_SRC || '';
    ambientAudio.setTheme(committedTheme.id, track);
  }, [committedTheme]);

  // Listen to URL hash deep-links (e.g., /#pa, /#hi, /#ur)
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = (window.location.hash || '').replace(/^#\/?/, '').trim().toLowerCase();
      if (!rawHash) return;
      const isSupported =
        LANGUAGES.some((l) => l.code === rawHash) || Boolean(customLanguages[rawHash]);
      if (isSupported && rawHash !== activeLangCode) {
        handleSelectLanguage(rawHash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeLangCode, customLanguages, followLanguage]);

  const handleToggleFollowLanguage = (nextVal: boolean) => {
    setFollowLanguage(nextVal);
    try {
      window.localStorage.setItem(STORAGE_FOLLOW_LANG_KEY, String(nextVal));
    } catch {
      // Ignore storage error
    }
  };

  const handleSelectLanguage = (langCode: string, newCustomRecord?: CustomLanguageRecord) => {
    const normalized = langCode.trim().toLowerCase();
    if (newCustomRecord) {
      setCustomLanguages((prev) => ({
        ...prev,
        [newCustomRecord.code]: newCustomRecord,
      }));
    }

    // Instant <300ms soft blur cross-fade on text
    setIsLangTransitioning(true);
    window.setTimeout(() => {
      setActiveLangCode(normalized);
      persistLanguageChoice(normalized);

      if (followLanguage) {
        setActiveThemeId(getThemeForLanguage(normalized).id);
      }

      window.setTimeout(() => {
        setIsLangTransitioning(false);
      }, 150);
    }, 80);
  };

  const handleSelectTheme = (themeId: ThemeId) => {
    const canonicalId = resolveThemeId(themeId);
    setPreviewThemeId(null);
    setActiveThemeId(canonicalId);
  };

  const handleTriggerPagePulse = () => {
    if (prefersReducedMotion) return;
    setIsPagePulsing(true);
    window.setTimeout(() => setIsPagePulsing(false), 620);
  };

  const handleToggleMusic = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    ambientAudio.setMuted(nextMuted);
    if (!nextMuted) {
      const track = CONFIG.THEME_AUDIO_TRACKS?.[activeTheme.id] || CONFIG.AUDIO_SRC || '';
      ambientAudio.start(activeTheme.id, track);
    }
  };

  const scrollToInvitation = () => {
    invitationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToYourNote = () => {
    document.getElementById('your-note')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCalendar = () => {
    const icsContent = generateIcsContent(CONFIG);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const slug = CONFIG.COUPLE_DISPLAY_NAMES.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${slug || 'Wedding'}-Invitation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCalendarSaved(true);
    window.setTimeout(() => setCalendarSaved(false), 4000);
  };

  const handleSaveGuestName = (name: string) => {
    setSavedName(name);
    setHasSkippedWelcome(false);
    pendingNoteToastRef.current = true;
    try {
      window.localStorage.setItem('guest_name', name);
      window.localStorage.removeItem('skip_welcome');
    } catch {
      // Ignore storage error
    }
  };

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
    if (pendingNoteToastRef.current) {
      pendingNoteToastRef.current = false;
      setNoteToastVisible(true);
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      toastTimerRef.current = window.setTimeout(() => {
        setNoteToastVisible(false);
      }, 3600);
    }
  };

  const handleSkipWelcome = () => {
    pendingNoteToastRef.current = false;
    setHasSkippedWelcome(true);
    try {
      window.localStorage.setItem('skip_welcome', 'true');
    } catch {
      // Ignore storage error
    }
    setShowWelcomePopup(false);
  };

  const handleChangeGuestName = () => {
    setShowWelcomePopup(true);
  };

  const handleTriggerPwaInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setDeferredPrompt(null);
          setPwaCardDismissed(true);
          setPwaManualHintOpen(false);
        }
      } catch {
        setPwaCardDismissed(false);
        setPwaManualHintOpen(true);
      }
    } else {
      setPwaCardDismissed(false);
      setPwaManualHintOpen(true);
    }
  };

  const handleDismissPwaCard = () => {
    persistPwaDismissal();
    setPwaCardDismissed(true);
    setPwaManualHintOpen(false);
  };

  const handleResetDemo = () => {
    try {
      window.localStorage.removeItem('guest_name');
      window.localStorage.removeItem('skip_welcome');
      window.sessionStorage.removeItem('sarson_subah_countdown_revealed');
    } catch {
      // Ignore storage error
    }
    clearPwaDismissal();
    window.dispatchEvent(new CustomEvent('sarson-subah:reset-scratch'));
    window.dispatchEvent(new CustomEvent('sarson-subah:reset-hero'));
    setIsInvitationOpened(false);
    setIsHeroRevealed(false);
    setPwaCardDismissed(false);
    setPwaManualHintOpen(false);
    setSavedName(null);
    setHasSkippedWelcome(false);
    setNoteToastVisible(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowWelcomePopup(true);
  };

  const themeSwatches = [
    { name: 'Base Silk', hex: activeTheme.base },
    { name: `${activeTheme.name} Tint I`, hex: activeTheme.tint1 },
    { name: `${activeTheme.name} Tint II`, hex: activeTheme.tint2 },
    { name: `${activeTheme.name} Tint III`, hex: activeTheme.tint3 },
    { name: `${activeTheme.name} Gold`, hex: activeTheme.goldEnd },
    { name: `${activeTheme.name} Accent`, hex: activeTheme.accent },
  ];

  const displaySwatches =
    activeTheme.id === 'sarson_subah' ? CONFIG.DRESS_CODE.swatches : themeSwatches;
  const selectedSwatch = displaySwatches[activeSwatchIndex] || displaySwatches[0];

  const coupleDisplayName =
    (activeLangCode !== 'en' && CONFIG.namesByLang?.[activeLangCode]) ||
    CONFIG.COUPLE_DISPLAY_NAMES;
  const usesLatinCoupleFont =
    activeLangCode === 'en' || !CONFIG.namesByLang?.[activeLangCode];

  const sectionEntrance = getThemeEntranceMotion(activeTheme, prefersReducedMotion);

  return (
    <div
      className="min-h-screen w-full relative theme-surface-transition pb-[88px]"
      style={{
        overflowX: 'clip',
        backgroundColor: activeTheme.base,
        color: activeTheme.text,
      }}
    >
      {/* Hidden SVG Filter for Bhojpuri Hand-Drawn Wobbly Madhubani Double-Line Border */}
      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <defs>
          <filter id="madhubani-wobble" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.035"
              numOctaves="2"
              result="noise"
              seed="7"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Searchable 12-Language Bottom Sheet + "More languages" Gemini Translation */}
      <LanguageSheet
        activeLangCode={activeLangCode}
        activeNativeName={langMeta.nativeName}
        dict={dict}
        theme={activeTheme}
        customLanguages={customLanguages}
        isOpen={isLanguageSheetOpen}
        onOpen={() => setIsLanguageSheetOpen(true)}
        onClose={() => setIsLanguageSheetOpen(false)}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* First-Visit Welcome Name Popup (Wrapped in ErrorBoundary inside WelcomePopup) */}
      <AnimatePresence>
        {showWelcomePopup && (
          <WelcomePopup
            config={CONFIG}
            dict={dict}
            theme={activeTheme}
            langCode={activeLangCode}
            activeNativeName={langMeta.nativeName}
            savedName={savedName}
            onClose={handleCloseWelcomePopup}
            onSaveName={handleSaveGuestName}
            onSkip={handleSkipWelcome}
            onOpenLanguageSheet={() => setIsLanguageSheetOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Toast: "Your note is waiting below" shown after popup closes */}
      <AnimatePresence>
        {noteToastVisible && (
          <motion.div
            key="note-waiting-toast"
            data-testid="note-waiting-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[95] px-5 py-2.5 rounded-full shadow-lg border font-english text-xs sm:text-sm font-medium whitespace-nowrap pointer-events-none"
            style={{
              backgroundColor: activeTheme.button,
              color: activeTheme.base,
              borderColor: `${activeTheme.goldEnd}AA`,
            }}
          >
            {activeLangCode === 'hi'
              ? 'आपका ख़त नीचे इंतज़ार कर रहा है'
              : 'Your note is waiting below'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast: "Added to your home screen" on appinstalled */}
      <AnimatePresence>
        {pwaInstalledToast && (
          <motion.div
            key="pwa-installed-toast"
            data-testid="pwa-installed-toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[96] px-5 py-2.5 rounded-full shadow-lg border font-english text-xs sm:text-sm font-medium whitespace-nowrap pointer-events-none"
            style={{
              backgroundColor: activeTheme.button,
              color: activeTheme.base,
              borderColor: `${activeTheme.goldEnd}AA`,
            }}
          >
            {getPwaTranslations(activeLangCode).addedToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast: "A new version is ready, tap to refresh" when new SW takes over */}
      <AnimatePresence>
        {pwaUpdateToast && (
          <motion.button
            type="button"
            key="pwa-update-toast"
            data-testid="pwa-update-toast"
            onClick={() => window.location.reload()}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.28 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[98] px-5 py-2.5 rounded-full shadow-lg border font-english text-xs sm:text-sm font-medium whitespace-nowrap cursor-pointer active:scale-95 transition-transform"
            style={{
              backgroundColor: activeTheme.button,
              color: activeTheme.base,
              borderColor: `${activeTheme.goldEnd}AA`,
            }}
          >
            {getPwaTranslations(activeLangCode).updateReadyToast}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Style Chooser Bottom Sheet */}
      <ThemeController
        activeTheme={activeTheme}
        dict={dict}
        isOpen={isThemeSheetOpen}
        followLanguage={followLanguage}
        onClose={() => setIsThemeSheetOpen(false)}
        onSelectTheme={handleSelectTheme}
        onPreviewTheme={setPreviewThemeId}
        onToggleFollowLanguage={handleToggleFollowLanguage}
        onPagePulse={handleTriggerPagePulse}
      />

      {/* Dismissible PWA Install Card above the Dock (after opening video ends) */}
      <PWAInstallCard
        visible={!isStandalone && isHeroRevealed && (!pwaCardDismissed || pwaManualHintOpen)}
        isIOS={isIOS}
        hasDeferredPrompt={Boolean(deferredPrompt)}
        showManualHint={pwaManualHintOpen}
        langCode={activeLangCode}
        theme={activeTheme}
        onInstall={handleTriggerPwaInstall}
        onDismiss={handleDismissPwaCard}
      />

      {/* Centered Bottom Dock */}
      <BottomDock
        visible={isInvitationOpened}
        activeNativeName={langMeta.nativeName}
        activeTheme={activeTheme}
        isMuted={isMuted}
        dict={dict}
        langCode={activeLangCode}
        showInstallItem={!isStandalone}
        onOpenLanguageSheet={() => setIsLanguageSheetOpen(true)}
        onOpenThemeSheet={() => setIsThemeSheetOpen(true)}
        onToggleMusic={handleToggleMusic}
        onInstallApp={handleTriggerPwaInstall}
      />

      {/* Full-Width Responsive Invitation Main Container */}
      <motion.main
        animate={isPagePulsing ? { scale: [1, 1.018, 1] } : { scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        className="relative z-10 w-full min-h-screen theme-surface-transition lang-blur-transition"
        style={{
          overflowX: 'clip',
          backgroundColor: activeTheme.base,
          opacity: isLangTransitioning ? 0.68 : 1,
          filter: isLangTransitioning ? 'blur(3px)' : 'blur(0px)',
        }}
      >
        {/* SECTION 1: OPENING */}
        <HeroOpening
          config={CONFIG}
          langCode={activeLangCode}
          activeNativeName={langMeta.nativeName}
          dict={dict}
          theme={activeTheme}
          isMuted={isMuted}
          savedName={savedName}
          hasSkippedWelcome={hasSkippedWelcome}
          onOpenYourNote={handleScrollToYourNote}
          onChangeName={handleChangeGuestName}
          onOpenLanguageSheet={() => setIsLanguageSheetOpen(true)}
          onOpenInvitation={() => setIsInvitationOpened(true)}
          onRevealComplete={() => setIsHeroRevealed(true)}
          onScrollToInvite={scrollToInvitation}
        />

        {/* SECTION 2: PERSONAL NOTE SECTION (id="your-note") */}
        <NoteSection
          config={CONFIG}
          dict={dict}
          theme={activeTheme}
          langCode={activeLangCode}
          savedName={savedName}
          onOpenPopup={handleChangeGuestName}
        />

        <PhulkariDivider variant="marigold" theme={activeTheme} />

        {/* SECTION 3: MULTILINGUAL INVITATION */}
        <section
          ref={invitationRef}
          id="invitation-section"
          aria-labelledby="invitation-heading"
          className="relative w-full px-4 sm:px-6 theme-density-section text-center overflow-hidden theme-surface-transition"
          style={{
            background: `linear-gradient(180deg, ${activeTheme.base} 0%, ${activeTheme.tint1} 52%, ${activeTheme.base} 100%)`,
          }}
        >
          <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />
          <CornerFlourishes theme={activeTheme} />
          <motion.div
            initial={sectionEntrance.initial}
            whileInView={sectionEntrance.whileInView}
            viewport={{ once: true, amount: 0.1 }}
            transition={sectionEntrance.transition}
            className="relative z-10 w-full max-w-[720px] lg:max-w-[1120px] mx-auto flex flex-col items-center"
          >
            <div className="w-full max-w-[560px] mx-auto flex flex-col items-center">
              {/* Auspicious Kalash & Sarson Sprig SVG */}
              <svg viewBox="0 0 64 48" fill="none" className="w-14 h-11 mb-3" aria-hidden="true">
                <path
                  d="M32 6 C36 12 36 18 32 23 C28 18 28 12 32 6 Z"
                  fill={activeTheme.goldEnd}
                  stroke={activeTheme.goldStart}
                  strokeWidth="1.2"
                />
                <path
                  d="M21 15 C27 16 30 20 30 25 C24 24 21 20 21 15 Z"
                  fill={activeTheme.tint2}
                  stroke={activeTheme.goldStart}
                  strokeWidth="1.1"
                />
                <path
                  d="M43 15 C37 16 34 20 34 25 C40 24 43 20 43 15 Z"
                  fill={activeTheme.tint2}
                  stroke={activeTheme.goldStart}
                  strokeWidth="1.1"
                />
                <path
                  d="M22 26 H42 C41 36 37 42 32 42 C27 42 23 36 22 26 Z"
                  fill={activeTheme.base}
                  stroke={activeTheme.button}
                  strokeWidth="1.3"
                />
              </svg>

              {/* Active Theme Greeting */}
              <p
                className="font-hindi-heading text-lg sm:text-xl tracking-wide mb-2 min-h-[1.75rem]"
                style={{ color: activeTheme.button }}
              >
                {localizedGreeting}
              </p>

              {/* Optional Family Blessing Line */}
              {CONFIG.FAMILY_BLESSING_LINE && (
                <p
                  className="font-heading-serif italic text-sm sm:text-base mb-3 opacity-90"
                  style={{ color: activeTheme.text }}
                >
                  {CONFIG.FAMILY_BLESSING_LINE}
                </p>
              )}

              {/* Primary Invitation Blessing Heading */}
              <h2
                id="invitation-heading"
                className="font-heading-serif italic mb-2 min-h-[2.5rem] font-semibold"
                style={{
                  fontSize: 'clamp(1.75rem, 4.2vw, 2.5rem)',
                  color: activeTheme.button,
                }}
              >
                {guestDisplayName
                  ? formatPersonalisedLine(
                      dict.invitationBlessingLine_guest ||
                        '{guest}, you and your family are warmly invited',
                      guestDisplayName
                    )
                  : dict.invitationBlessingLine}
              </h2>

              {/* Family Invitation Line */}
              <p
                className="font-hindi-heading text-base sm:text-lg mb-3 opacity-95"
                style={{ color: activeTheme.text }}
              >
                {dict.invitationFamilyLine}
              </p>

              {/* Together With Our Families */}
              <p
                className="font-cursive-touch text-2xl sm:text-3xl mb-3"
                style={{ color: activeTheme.button }}
              >
                {dict.invitationTogetherLine}
              </p>

              {/* Invitation Subtext */}
              <p
                className="font-english text-sm sm:text-base leading-relaxed opacity-90 max-w-[480px]"
                style={{ color: activeTheme.text }}
              >
                {dict.invitationSubtext}
              </p>
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: HUMARI KAHANI */}
        <PhulkariDivider variant="marigold" theme={activeTheme} />
        <HumariKahaniSection config={CONFIG} dict={dict} theme={activeTheme} />
        <PhulkariDivider variant="lilac" theme={activeTheme} />

        {/* SECTION 5: COUNTDOWN */}
        <CountdownSection
          config={CONFIG}
          langCode={activeLangCode}
          dict={dict}
          theme={activeTheme}
          guestDisplayName={guestDisplayName}
        />

        <PhulkariDivider variant="lilac" theme={activeTheme} />

        {/* SECTION 6: HAMARE UTSAV */}
        <HamareUtsavSection
          config={CONFIG}
          langCode={activeLangCode}
          dict={dict}
          theme={activeTheme}
          guestDisplayName={guestDisplayName}
          onDownloadCalendar={handleDownloadCalendar}
        />

        <PhulkariDivider variant="mulberry" theme={activeTheme} />

        {/* SECTION 7: VENUE */}
        <section
          id="venue-section"
          aria-labelledby="venue-heading"
          className="relative w-full px-4 sm:px-6 py-[clamp(48px,7vw,76px)] overflow-hidden theme-surface-transition"
          style={{
            background: `linear-gradient(180deg, ${activeTheme.base} 0%, ${activeTheme.tint2} 55%, ${activeTheme.base} 100%)`,
          }}
        >
          <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />
          <motion.div
            initial={sectionEntrance.initial}
            whileInView={sectionEntrance.whileInView}
            viewport={{ once: true, amount: 0.1 }}
            transition={sectionEntrance.transition}
            className="relative z-10 w-full max-w-[720px] lg:max-w-[1120px] mx-auto"
          >
            <div className="w-full max-w-[560px] mx-auto gold-glass-card rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center">
              <HeritageArchwaySvg className="w-32 h-22 mb-3" />

              <p
                className="font-cursive-touch text-2xl sm:text-3xl mb-0.5 min-h-[2rem]"
                style={{ color: activeTheme.button }}
              >
                {dict.venueKicker}
              </p>
              <h2
                id="venue-heading"
                className="font-heading-serif italic text-gold-shimmer mb-3 min-h-[2.75rem]"
                style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)' }}
              >
                {guestDisplayName
                  ? formatPersonalisedLine(
                      dict.venueHeading_guest || '{guest}, here is how to find us',
                      guestDisplayName
                    )
                  : dict.venueHeading}
              </h2>

              <h3
                className="font-heading-serif italic text-2xl font-semibold mb-1"
                style={{ color: activeTheme.text }}
              >
                {dict.venueName}
              </h3>
              <p
                className="font-english text-sm opacity-90"
                style={{ color: activeTheme.text }}
              >
                {dict.venueAddress1}
              </p>
              <p
                className="font-english text-sm opacity-90 mb-2"
                style={{ color: activeTheme.text }}
              >
                {dict.venueAddress2}
              </p>
              <p
                className="font-english text-xs mb-6"
                style={{ color: activeTheme.button }}
              >
                {dict.venueLandmark} · {dict.venueConciergeLabel}:{' '}
                <span dir="ltr">{CONFIG.HOST_PHONE_DISPLAY}</span>
              </p>

              <div className="w-full space-y-3">
                <a
                  href={CONFIG.PRIMARY_VENUE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-btn w-full min-h-[46px] px-5 py-2.5 rounded-full font-english text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow-sm transition-all"
                  style={{
                    backgroundColor: activeTheme.button,
                    color: activeTheme.base,
                  }}
                >
                  <MapPin className="w-4 h-4" />
                  <span>{dict.openInMaps}</span>
                </a>

                {/* Two host contact buttons under the map button */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={buildHostTelHref(CONFIG)}
                    data-testid="venue-call-directions-btn"
                    aria-label={`${getContactTranslations(activeLangCode).callForDirections} (${CONFIG.HOST_PHONE_DISPLAY})`}
                    className="theme-btn w-full min-h-[46px] px-4 py-2.5 rounded-full border font-english text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all"
                    style={{
                      backgroundColor: activeTheme.base,
                      color: activeTheme.text,
                      borderColor: `${activeTheme.goldStart}B3`,
                    }}
                  >
                    <Phone className="w-4 h-4 shrink-0" style={{ color: activeTheme.button }} aria-hidden="true" />
                    <span>{getContactTranslations(activeLangCode).callForDirections}</span>
                  </a>

                  <a
                    href={buildHostWhatsAppHref('Hello, I need help finding the venue', CONFIG)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="venue-whatsapp-us-btn"
                    aria-label={`${getContactTranslations(activeLangCode).whatsappUs} (${CONFIG.HOST_PHONE_DISPLAY})`}
                    className="theme-btn w-full min-h-[46px] px-4 py-2.5 rounded-full border font-english text-xs uppercase tracking-[0.12em] flex items-center justify-center gap-2 transition-all"
                    style={{
                      backgroundColor: activeTheme.base,
                      color: activeTheme.text,
                      borderColor: `${activeTheme.goldStart}B3`,
                    }}
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" style={{ color: activeTheme.button }} aria-hidden="true" />
                    <span>{getContactTranslations(activeLangCode).whatsappUs}</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="theme-btn w-full min-h-[46px] px-5 py-2.5 rounded-full border font-english text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer"
                  style={{
                    backgroundColor: activeTheme.base,
                    color: activeTheme.text,
                    borderColor: `${activeTheme.goldStart}B3`,
                  }}
                >
                  {calendarSaved ? (
                    <>
                      <Check
                        className="w-4 h-4 shrink-0"
                        style={{ color: activeTheme.button }}
                      />
                      <span>{dict.savedToCalendar}</span>
                    </>
                  ) : (
                    <>
                      <CalendarPlus
                        className="w-4 h-4 shrink-0"
                        style={{ color: activeTheme.button }}
                      />
                      <span>{dict.addToCalendar}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        <PhulkariDivider variant="marigold" theme={activeTheme} />

        {/* SECTION 8: DRESS CODE PALETTE SWATCHES */}
        <section
          id="dress-code-section"
          aria-labelledby="dress-code-heading"
          className="relative w-full px-4 sm:px-6 py-[clamp(48px,7vw,72px)] overflow-hidden theme-surface-transition"
          style={{
            background: `linear-gradient(180deg, ${activeTheme.base} 0%, ${activeTheme.tint1} 50%, ${activeTheme.base} 100%)`,
          }}
        >
          <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />
          <motion.div
            initial={sectionEntrance.initial}
            whileInView={sectionEntrance.whileInView}
            viewport={{ once: true, amount: 0.1 }}
            transition={sectionEntrance.transition}
            className="relative z-10 w-full max-w-[720px] lg:max-w-[1120px] mx-auto text-center"
          >
            <div className="w-full max-w-[560px] mx-auto">
              <p
                className="font-cursive-touch text-2xl sm:text-3xl cream-text-glow mb-0.5 min-h-[2rem]"
                style={{ color: activeTheme.button }}
              >
                {dict.dressCodeKicker}
              </p>
              <h2
                id="dress-code-heading"
                className="font-heading-serif italic text-gold-shimmer mb-3 min-h-[2.75rem]"
                style={{ fontSize: 'clamp(1.85rem, 4vw, 2.5rem)' }}
              >
                {guestDisplayName
                  ? formatPersonalisedLine(
                      dict.dressCodeHeading_guest ||
                        '{guest}, a little colour inspiration for you',
                      guestDisplayName
                    )
                  : `${dict.dressCodeHeading} — ${activeTheme.name}`}
              </h2>

              <p
                className="font-english text-xs sm:text-sm opacity-90 leading-relaxed mb-7 cream-text-glow min-h-[2.5rem]"
                style={{ color: activeTheme.text }}
              >
                {dict.dressCodeSuggestion}
              </p>

              {/* Row of Colour Swatches from the Active Theme Palette */}
              <div
                className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-4"
                role="group"
                aria-label={`${activeTheme.name} dress code colour swatches`}
              >
                {displaySwatches.map((swatch, index) => {
                  const isSelected = index === activeSwatchIndex;
                  return (
                    <button
                      key={`${swatch.name}-${swatch.hex}`}
                      type="button"
                      onClick={() => setActiveSwatchIndex(index)}
                      aria-label={`${swatch.name} (${swatch.hex})`}
                      aria-pressed={isSelected}
                      className={`min-w-[46px] min-h-[46px] w-12 h-12 rounded-full border transition-all flex items-center justify-center cursor-pointer shadow-xs ${
                        isSelected ? 'scale-110 ring-2' : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: swatch.hex,
                        borderColor: isSelected ? activeTheme.button : `${activeTheme.goldStart}99`,
                      }}
                    >
                      {isSelected && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: activeTheme.text }}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div
                className="flex items-center justify-center gap-2 text-xs font-english"
                style={{ color: activeTheme.text }}
              >
                <span className="font-medium">{selectedSwatch.name}</span>
                <span aria-hidden="true">·</span>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: activeTheme.button }}
                >
                  {selectedSwatch.hex}
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        <PhulkariDivider variant="lilac" theme={activeTheme} />

        {/* SECTION 9: GALLERY */}
        <section
          id="gallery-section"
          aria-labelledby="gallery-heading"
          className="relative w-full px-4 sm:px-6 py-[clamp(48px,7vw,76px)] overflow-hidden theme-surface-transition"
          style={{
            background: `linear-gradient(180deg, ${activeTheme.base} 0%, ${activeTheme.tint3} 48%, ${activeTheme.base} 100%)`,
          }}
        >
          <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />
          <div className="relative z-10 w-full max-w-[720px] lg:max-w-[1120px] mx-auto">
            <motion.div
              initial={sectionEntrance.initial}
              whileInView={sectionEntrance.whileInView}
              viewport={{ once: true, amount: 0.1 }}
              transition={sectionEntrance.transition}
              className="text-center mb-8 sm:mb-10"
            >
              <p
                className="font-cursive-touch text-2xl sm:text-3xl cream-text-glow mb-0.5 min-h-[2rem]"
                style={{ color: activeTheme.button }}
              >
                {dict.galleryKicker}
              </p>
              <h2
                id="gallery-heading"
                className="font-heading-serif italic text-gold-shimmer mb-2 min-h-[2.75rem]"
                style={{ fontSize: 'clamp(1.85rem, 4vw, 2.6rem)' }}
              >
                {guestDisplayName
                  ? formatPersonalisedLine(
                      dict.galleryHeading_guest || '{guest}, a few of our favourite moments',
                      guestDisplayName
                    )
                  : dict.galleryHeading}
              </h2>
              <p
                className="font-english text-xs sm:text-sm opacity-80 min-h-[1.25rem]"
                style={{ color: activeTheme.text }}
              >
                {dict.gallerySubheading}
              </p>
            </motion.div>

            <PolaroidGallery
              dict={dict}
              theme={activeTheme}
              langCode={activeLangCode}
            />
          </div>
        </section>

        <PhulkariDivider variant="sage" theme={activeTheme} />

        {/* SECTION 10: RSVP */}
        <RsvpSection
          config={CONFIG}
          dict={dict}
          theme={activeTheme}
          langCode={activeLangCode}
          savedName={savedName}
          guestDisplayName={guestDisplayName}
        />

        <PhulkariDivider variant="marigold" theme={activeTheme} />

        {/* FOOTER */}
        <footer
          aria-label="Wedding Invitation Closing Footer"
          className="relative w-full px-4 sm:px-6 pt-12 text-center overflow-hidden theme-surface-transition"
          style={{
            paddingBottom: 'calc(88px + env(safe-area-inset-bottom, 0px))',
            background: `linear-gradient(180deg, ${activeTheme.base} 0%, ${activeTheme.goldEnd} 45%, ${activeTheme.tint1} 100%)`,
          }}
        >
          <div className="absolute inset-0 theme-pattern-overlay" aria-hidden="true" />
          <motion.div
            initial={sectionEntrance.initial}
            whileInView={sectionEntrance.whileInView}
            viewport={{ once: true, amount: 0.1 }}
            transition={sectionEntrance.transition}
            className="relative z-10 w-full max-w-[560px] mx-auto pb-6 flex flex-col items-center"
          >
            <p
              data-testid="footer-waiting-line"
              className="font-hindi-heading text-2xl cream-text-glow mb-3 min-h-[2rem]"
              style={{ color: activeTheme.button }}
            >
              {guestDisplayName
                ? formatPersonalisedLine(
                    dict.footerWaitingLine_guest ||
                      'We look forward to celebrating with you, {guest}',
                    guestDisplayName
                  )
                : dict.footerWaitingLine}
            </p>

            <p
              className={`${
                usesLatinCoupleFont ? 'font-couple' : 'font-couple-native font-semibold'
              } cream-text-glow my-1`}
              style={{
                fontSize: usesLatinCoupleFont
                  ? 'clamp(2.5rem, 8vw, 3.5rem)'
                  : 'clamp(1.85rem, 6vw, 2.5rem)',
                color: activeTheme.text,
              }}
            >
              {coupleDisplayName}
            </p>

            <p
              dir="ltr"
              className="font-heading-serif italic text-xl cream-text-glow tracking-wide mt-2 mb-4"
              style={{ color: activeTheme.button }}
            >
              {CONFIG.HASHTAG}
            </p>

            <p
              className="font-english text-xs tracking-wider uppercase opacity-85 cream-text-glow"
              style={{ color: activeTheme.text }}
            >
              {dict.footerClosingLine}
            </p>

            {/* Footer Host Contact Block */}
            <div
              data-testid="footer-contact-block"
              className="mt-6 w-full max-w-[420px] rounded-2xl border px-4 py-4 flex flex-col items-center gap-2.5 shadow-xs"
              style={{
                backgroundColor: `${activeTheme.base}E6`,
                borderColor: `${activeTheme.goldStart}80`,
                color: activeTheme.text,
              }}
            >
              <p className="font-heading-serif italic text-base sm:text-lg font-medium">
                {getContactTranslations(activeLangCode).footerQuestionsLine}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
                <a
                  href={buildHostTelHref(CONFIG)}
                  data-testid="footer-call-link"
                  aria-label={`${getContactTranslations(activeLangCode).callHostAria}: ${CONFIG.HOST_PHONE_DISPLAY}`}
                  className="min-h-[44px] px-4 py-2 rounded-full border font-english text-xs font-medium inline-flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: activeTheme.base,
                    borderColor: `${activeTheme.goldStart}99`,
                    color: activeTheme.text,
                  }}
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: activeTheme.button }} aria-hidden="true" />
                  <span dir="ltr">{CONFIG.HOST_PHONE_DISPLAY}</span>
                </a>

                <a
                  href={buildHostWhatsAppHref('Hello, I have a question about the wedding invitation', CONFIG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-whatsapp-btn"
                  aria-label={`${getContactTranslations(activeLangCode).whatsappUs} (${CONFIG.HOST_PHONE_DISPLAY})`}
                  className="theme-btn min-h-[44px] px-4 py-2 rounded-full font-english text-xs uppercase tracking-[0.12em] font-medium inline-flex items-center justify-center gap-2 shadow-xs transition-all"
                  style={{
                    backgroundColor: activeTheme.button,
                    color: activeTheme.base,
                  }}
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{getContactTranslations(activeLangCode).whatsappUs}</span>
                </a>
              </div>
            </div>

            <p
              className="font-english text-[10px] tracking-wider uppercase opacity-60 cream-text-glow mt-4"
              style={{ color: activeTheme.text }}
            >
              Sample photos: Unsplash and Pexels
            </p>

            {CONFIG.SAMPLE_MODE && (
              <button
                type="button"
                data-testid="reset-demo-btn"
                onClick={handleResetDemo}
                className="font-english text-[10px] tracking-wider uppercase opacity-65 hover:opacity-100 cream-text-glow mt-3 underline cursor-pointer"
                style={{ color: activeTheme.text }}
              >
                Reset demo
              </button>
            )}
          </motion.div>
        </footer>
      </motion.main>
    </div>
  );
}
