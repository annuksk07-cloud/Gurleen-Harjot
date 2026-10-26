import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { WeddingTheme } from '../themes/themes';
import { TranslationDictionary } from '../i18n/translations';
import { PHOTOS } from '../config';

interface PolaroidGalleryProps {
  dict: TranslationDictionary;
  theme: WeddingTheme;
  langCode?: string;
}

interface GalleryPhotoItem {
  id: 'bride' | 'groom' | 'couple1' | 'couple2';
  src: string;
  fallbackSrc: string;
  credit: string;
  sourceUrl: string;
  alt: string;
  caption: string;
  swayRotate: number[];
  duration: number;
  delay: number;
}

export const PolaroidGallery: React.FC<PolaroidGalleryProps> = ({ dict, theme }) => {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryPhotoItem[] = [
    {
      id: 'bride',
      src: PHOTOS.bride.src,
      fallbackSrc: PHOTOS.bride.fallbackSrc,
      credit: PHOTOS.bride.credit,
      sourceUrl: PHOTOS.bride.sourceUrl,
      alt: PHOTOS.bride.alt,
      caption: dict.galleryCaptionBride || 'The bride',
      swayRotate: [-1.4, 1.4, -1.4],
      duration: 5.0,
      delay: 0,
    },
    {
      id: 'groom',
      src: PHOTOS.groom.src,
      fallbackSrc: PHOTOS.groom.fallbackSrc,
      credit: PHOTOS.groom.credit,
      sourceUrl: PHOTOS.groom.sourceUrl,
      alt: PHOTOS.groom.alt,
      caption: dict.galleryCaptionGroom || 'The groom',
      swayRotate: [1.3, -1.3, 1.3],
      duration: 5.6,
      delay: 0.35,
    },
    {
      id: 'couple1',
      src: PHOTOS.couple1.src,
      fallbackSrc: PHOTOS.couple1.fallbackSrc,
      credit: PHOTOS.couple1.credit,
      sourceUrl: PHOTOS.couple1.sourceUrl,
      alt: PHOTOS.couple1.alt,
      caption: dict.galleryCaptionTogether || 'Together',
      swayRotate: [-1.5, 1.2, -1.5],
      duration: 5.2,
      delay: 0.7,
    },
    {
      id: 'couple2',
      src: PHOTOS.couple2.src,
      fallbackSrc: PHOTOS.couple2.fallbackSrc,
      credit: PHOTOS.couple2.credit,
      sourceUrl: PHOTOS.couple2.sourceUrl,
      alt: PHOTOS.couple2.alt,
      caption: dict.galleryCaptionForever || 'Forever',
      swayRotate: [1.2, -1.5, 1.2],
      duration: 4.8,
      delay: 0.5,
    },
  ];

  // Individual fallback states per image
  const [photoSrcs, setPhotoSrcs] = useState<Record<string, string>>({
    bride: PHOTOS.bride.src,
    groom: PHOTOS.groom.src,
    couple1: PHOTOS.couple1.src,
    couple2: PHOTOS.couple2.src,
  });

  const handleImageError = (id: 'bride' | 'groom' | 'couple1' | 'couple2', fallback: string) => {
    setPhotoSrcs((prev) => {
      if (prev[id] !== fallback) {
        return { ...prev, [id]: fallback };
      }
      return prev;
    });
  };

  const handlePrev = useCallback(() => {
    setLightboxIndex((curr) => {
      if (curr === null) return null;
      return curr === 0 ? galleryItems.length - 1 : curr - 1;
    });
  }, [galleryItems.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((curr) => {
      if (curr === null) return null;
      return curr === galleryItems.length - 1 ? 0 : curr + 1;
    });
  }, [galleryItems.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxIndex]);

  const activePhoto = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <div className="relative w-full max-w-[1040px] mx-auto px-2 sm:px-4">
      {/* Delicate Golden String Line */}
      <div className="relative w-full mb-6 sm:mb-8" aria-hidden="true">
        <svg
          className="w-full h-8 sm:h-10 overflow-visible pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 1000 32"
          fill="none"
        >
          {/* Subtle drop shadow for depth */}
          <path
            d="M 0 14 Q 250 28 500 26 T 1000 14"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="2.5"
            transform="translate(0, 1.5)"
          />
          {/* Shimmering Gold String */}
          <path
            d="M 0 14 Q 250 28 500 26 T 1000 14"
            stroke="url(#polaroidGoldStringGrad)"
            strokeWidth="1.8"
          />
          <defs>
            <linearGradient id="polaroidGoldStringGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={`${theme.goldStart}66`} />
              <stop offset="25%" stopColor={theme.goldEnd} />
              <stop offset="50%" stopColor={theme.goldStart} />
              <stop offset="75%" stopColor={theme.goldEnd} />
              <stop offset="100%" stopColor={`${theme.goldStart}66`} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 4 Polaroid Cards Hanging on Gold String */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 items-start">
        {galleryItems.map((item, index) => {
          const imgSrc = photoSrcs[item.id];
          return (
            <motion.div
              key={item.id}
              className="relative flex flex-col items-center"
              style={{ transformOrigin: 'top center' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      rotate: item.swayRotate,
                      opacity: 1,
                    }
              }
              transition={
                prefersReducedMotion
                  ? { opacity: { duration: 0.4 } }
                  : {
                      rotate: {
                        repeat: Infinity,
                        duration: item.duration,
                        ease: 'easeInOut',
                        delay: item.delay,
                      },
                      opacity: { duration: 0.5 },
                    }
              }
            >
              {/* Golden Clothespin Clip connecting card to the string */}
              <div
                className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
                aria-hidden="true"
              >
                <div
                  className="w-3.5 sm:w-4 h-6 sm:h-7 rounded-[2px] shadow-xs flex flex-col justify-between p-0.5"
                  style={{
                    background: `linear-gradient(180deg, ${theme.goldEnd} 0%, ${theme.goldStart} 65%, #7D591E 100%)`,
                    border: '0.5px solid rgba(255,255,255,0.7)',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
                  }}
                >
                  <div className="w-full h-1 bg-white/50 rounded-full" />
                  <div className="w-1.5 h-1.5 mx-auto rounded-full bg-amber-950/70" />
                  <div className="w-full h-1 bg-black/30 rounded-full" />
                </div>
              </div>

              {/* Polaroid Card */}
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`${item.caption} - ${dict.galleryLightboxClose || 'Click to view photo'}`}
                className="group relative w-full text-left bg-[#FFFDF9] rounded-sm p-2 sm:p-2.5 pb-4 sm:pb-5 cursor-pointer transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
                style={{
                  boxShadow:
                    '0 10px 24px -4px rgba(60, 30, 20, 0.16), 0 3px 8px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(220, 205, 180, 0.4)',
                }}
              >
                {/* Photo Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2px] bg-[#FAF5EE]">
                  <img
                    src={imgSrc}
                    alt={item.caption}
                    width={480}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(item.id, item.fallbackSrc)}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ objectPosition: 'center 20%' }}
                  />

                  {/* Soft Warm Colour Grade: 8% multiply overlay in active theme's tint */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundColor: theme.tint1,
                      mixBlendMode: 'multiply',
                      opacity: 0.08,
                    }}
                    aria-hidden="true"
                  />

                  {/* Subtle hover icon */}
                  <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/40 text-white/90 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="mt-3 text-center px-1">
                  <p
                    className="font-heading-serif italic text-base sm:text-lg font-medium leading-tight tracking-wide transition-colors group-hover:opacity-90"
                    style={{ color: theme.text }}
                  >
                    {item.caption}
                  </p>
                  <p
                    className="font-english text-[10px] tracking-wider uppercase opacity-55 mt-0.5"
                    style={{ color: theme.button }}
                  >
                    0{index + 1}
                  </p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal (Uncropped Photo View via Portal) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxIndex !== null && activePhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                role="dialog"
                aria-modal="true"
                aria-label={`${activePhoto.caption} photo lightbox`}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
                onClick={handleClose}
              >
                {/* Top Navigation Controls */}
                <div
                  className="absolute top-4 right-4 z-60 flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label={dict.galleryLightboxClose || 'Close lightbox'}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer border border-white/20"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Left Prev Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label={dict.galleryLightboxPrev || 'Previous photo'}
                  className="absolute left-3 sm:left-6 z-60 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Next Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label={dict.galleryLightboxNext || 'Next photo'}
                  className="absolute right-3 sm:right-6 z-60 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer border border-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Lightbox Content Container */}
                <motion.div
                  key={activePhoto.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-w-full max-h-[92vh] flex flex-col items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Uncropped Photo */}
                  <div className="relative overflow-hidden rounded-lg shadow-2xl bg-black/40 flex items-center justify-center">
                    <img
                      src={photoSrcs[activePhoto.id]}
                      alt={activePhoto.caption}
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="max-h-[75vh] sm:max-h-[80vh] max-w-[90vw] w-auto h-auto object-contain rounded-md block"
                    />

                    {/* Soft Warm Colour Grade: 8% multiply overlay in active theme's tint */}
                    <div
                      className="absolute inset-0 pointer-events-none rounded-md"
                      style={{
                        backgroundColor: theme.tint1,
                        mixBlendMode: 'multiply',
                        opacity: 0.08,
                      }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Caption & Source Attribution Bar */}
                  <div className="mt-3 text-center text-white px-4 max-w-[500px]">
                    <h3 className="font-heading-serif italic text-xl sm:text-2xl text-amber-100/95 tracking-wide">
                      {activePhoto.caption}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-1 text-xs text-white/75 font-english">
                      <span>
                        0{lightboxIndex + 1} / 0{galleryItems.length}
                      </span>
                      <span aria-hidden="true">·</span>
                      <a
                        href={activePhoto.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-200/90 hover:text-amber-100 underline decoration-amber-300/40 hover:decoration-amber-200 transition-colors"
                      >
                        {activePhoto.credit}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
