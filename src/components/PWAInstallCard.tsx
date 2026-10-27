import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share, X } from 'lucide-react';
import { WeddingTheme } from '../themes/themes';
import { getPwaTranslations } from '../i18n/pwaTranslations';

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAInstallCardProps {
  visible: boolean;
  isIOS: boolean;
  hasDeferredPrompt: boolean;
  showManualHint: boolean;
  langCode: string;
  theme: WeddingTheme;
  onInstall: () => void;
  onDismiss: () => void;
}

export const PWAInstallCard: React.FC<PWAInstallCardProps> = ({
  visible,
  isIOS,
  hasDeferredPrompt,
  showManualHint,
  langCode,
  theme,
  onInstall,
  onDismiss,
}) => {
  const pwaStrings = getPwaTranslations(langCode);
  const displayIosHint = (isIOS && !hasDeferredPrompt) || showManualHint;

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          key="pwa-install-card"
          data-testid="pwa-install-card"
          role="region"
          aria-label={pwaStrings.keepOnPhone}
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-1/2 -translate-x-1/2 z-[76] w-[min(92vw,390px)] rounded-2xl px-3.5 py-3 shadow-xl backdrop-blur-md flex items-center gap-3"
          style={{
            bottom: 'calc(max(12px, calc(env(safe-area-inset-bottom) + 8px)) + 64px)',
            backgroundColor: `${theme.base}F5`,
            border: `1px solid ${theme.goldStart}AA`,
            color: theme.text,
          }}
        >
          {/* App Icon on the Left */}
          <img
            src="/icons/icon-192.png"
            alt="Gurleen & Harjot Wedding"
            width={44}
            height={44}
            className="w-11 h-11 rounded-xl shrink-0 object-cover shadow-xs"
            style={{ border: `1px solid ${theme.goldStart}88` }}
          />

          {/* Center Copy */}
          <div className="flex-1 min-w-0 text-start">
            <p
              data-testid="pwa-install-card-title"
              className="text-[13px] font-semibold leading-snug"
              style={{
                color: theme.text,
                fontFamily: `var(--font-active-script), 'Jost', sans-serif`,
              }}
            >
              {pwaStrings.keepOnPhone}
            </p>

            {displayIosHint && (
              <p
                data-testid="pwa-ios-hint"
                className="mt-1 flex items-center gap-1.5 text-[12px] leading-snug opacity-90"
                style={{
                  color: theme.button,
                  fontFamily: `var(--font-active-script), 'Jost', sans-serif`,
                }}
              >
                <Share className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{pwaStrings.iosHint}</span>
              </p>
            )}
          </div>

          {/* Right Action: Install Button (when not in iOS-only hint mode) */}
          {!displayIosHint && (
            <button
              type="button"
              data-testid="pwa-install-card-btn"
              onClick={onInstall}
              className="shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-full text-[13px] font-medium shadow-xs active:scale-95 transition-transform cursor-pointer"
              style={{
                backgroundColor: theme.button,
                color: theme.base,
                border: `1px solid ${theme.goldEnd}88`,
                fontFamily: `var(--font-active-script), 'Jost', sans-serif`,
              }}
            >
              {pwaStrings.install}
            </button>
          )}

          {/* Dismiss Button */}
          <button
            type="button"
            data-testid="pwa-install-card-dismiss"
            onClick={onDismiss}
            aria-label={pwaStrings.dismissAria}
            className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
            style={{ color: `${theme.text}B3` }}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
