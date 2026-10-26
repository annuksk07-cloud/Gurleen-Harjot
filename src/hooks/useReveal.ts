import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal hook that shows content by default before JS mounts,
 * uses an IntersectionObserver with threshold 0.1 and once: true,
 * immediately reveals if IntersectionObserver is unavailable or the element
 * is already in view on load, and includes a 1.5-second failsafe timer.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(timeoutMs: number = 1500) {
  const ref = useRef<T | null>(null);
  // Show content by default prior to mount, and guarantee visibility via failsafe
  const [isRevealed, setIsRevealed] = useState<boolean>(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setIsRevealed(true);
      return;
    }

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const inViewOnLoad = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewOnLoad) {
      setIsRevealed(true);
      return;
    }

    const failsafeTimer = window.setTimeout(() => {
      setIsRevealed(true);
    }, timeoutMs);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio >= 0.1) {
            setIsRevealed(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      window.clearTimeout(failsafeTimer);
      observer.disconnect();
    };
  }, [timeoutMs]);

  return { ref, isRevealed };
}
