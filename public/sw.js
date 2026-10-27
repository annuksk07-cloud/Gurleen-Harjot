const CACHE_VERSION = 'v1';
const CACHE_NAME = `sarson-subah-pwa-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((oldKey) => caches.delete(oldKey))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

function isMediaOrRangeRequest(request, url) {
  if (request.headers && request.headers.has('range')) {
    return true;
  }
  const dest = request.destination || '';
  if (dest === 'video' || dest === 'audio') {
    return true;
  }
  if (/\.(mp4|webm|mov|m4v|mp3|wav|ogg|m4a|aac|flac)$/i.test(url.pathname)) {
    return true;
  }
  return false;
}

function isExcludedPath(url) {
  return (
    url.pathname === '/icon-maker.html' ||
    url.pathname.startsWith('/api/')
  );
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (isExcludedPath(url)) return;
  if (isMediaOrRangeRequest(request, url)) return;

  // 1. Navigation requests: Network-first with cached /index.html as offline fallback
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put('/index.html', copy);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          return (
            (await cache.match('/index.html')) ||
            (await cache.match('/')) ||
            Response.error()
          );
        })
    );
    return;
  }

  const dest = request.destination || '';
  const isAssetSWR =
    dest === 'script' ||
    dest === 'style' ||
    dest === 'font' ||
    /\.(js|mjs|css|woff2?|ttf|otf)$/i.test(url.pathname) ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com';

  // 2. Stale-while-revalidate for JS, CSS, and fonts
  if (isAssetSWR) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const networkPromise = fetch(request)
          .then((networkResponse) => {
            if (
              networkResponse &&
              (networkResponse.status === 200 || networkResponse.type === 'opaque')
            ) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || networkPromise;
      })
    );
    return;
  }

  const isImage =
    dest === 'image' ||
    /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i.test(url.pathname);

  // 3. Cache-first for images
  if (isImage) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }
        try {
          const networkResponse = await fetch(request);
          if (
            networkResponse &&
            (networkResponse.status === 200 || networkResponse.type === 'opaque')
          ) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return Response.error();
        }
      })
    );
  }
});
