import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

if (import.meta.env.PROD && typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const hadController = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        if (registration.waiting && navigator.serviceWorker.controller) {
          window.dispatchEvent(new CustomEvent('sarson-subah:sw-update-ready'));
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              window.dispatchEvent(new CustomEvent('sarson-subah:sw-update-ready'));
            }
          });
        });
      })
      .catch(() => {
        // Ignore service worker registration errors
      });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hadController) {
        window.dispatchEvent(new CustomEvent('sarson-subah:sw-update-ready'));
      }
    });
  });
}

