import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {
  PWA_TRANSLATIONS,
  SEVEN_DAYS_MS,
  getPwaTranslations,
} from '../i18n/pwaTranslations';

const ROOT_DIR = process.cwd();

function readPngDimensions(filePath: string): { width: number; height: number } {
  const buf = fs.readFileSync(filePath);
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  assert.equal(buf[0], 0x89, `${filePath} must be a valid PNG`);
  assert.equal(buf[1], 0x50, `${filePath} must be a valid PNG`);
  assert.equal(buf[2], 0x4e, `${filePath} must be a valid PNG`);
  assert.equal(buf[3], 0x47, `${filePath} must be a valid PNG`);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

test('manifest.webmanifest parses and contains required fields and icons', () => {
  const manifestPath = path.join(ROOT_DIR, 'public', 'manifest.webmanifest');
  assert.equal(fs.existsSync(manifestPath), true);
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  assert.equal(manifest.name, 'Gurleen & Harjot Wedding');
  assert.equal(manifest.short_name, 'G & H');
  assert.equal(manifest.description, 'Wedding invitation');
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.id, '/');
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.orientation, 'portrait');
  assert.equal(manifest.background_color, '#FFF8EC');
  assert.equal(manifest.theme_color, '#7A3E55');
  assert.equal(manifest.lang, 'en');
  assert.equal(Array.isArray(manifest.icons), true);
  assert.equal(manifest.icons.length, 3);

  assert.deepEqual(manifest.icons[0], {
    src: '/icons/icon-192.png',
    sizes: '192x192',
    type: 'image/png',
    purpose: 'any',
  });
  assert.deepEqual(manifest.icons[1], {
    src: '/icons/icon-512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any',
  });
  assert.deepEqual(manifest.icons[2], {
    src: '/icons/icon-maskable-512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'maskable',
  });
});

test('all generated PNG icon files exist and have exact expected pixel dimensions', () => {
  const expectedIcons: Array<{ file: string; width: number; height: number }> = [
    { file: 'icon-192.png', width: 192, height: 192 },
    { file: 'icon-512.png', width: 512, height: 512 },
    { file: 'icon-maskable-512.png', width: 512, height: 512 },
    { file: 'apple-touch-icon.png', width: 180, height: 180 },
    { file: 'favicon-32.png', width: 32, height: 32 },
  ];

  for (const spec of expectedIcons) {
    const fullPath = path.join(ROOT_DIR, 'public', 'icons', spec.file);
    assert.equal(fs.existsSync(fullPath), true, `Missing ${spec.file}`);
    const dims = readPngDimensions(fullPath);
    assert.equal(dims.width, spec.width, `${spec.file} width mismatch`);
    assert.equal(dims.height, spec.height, `${spec.file} height mismatch`);
  }
});

test('main.tsx registers /sw.js only when import.meta.env.PROD is true', () => {
  const mainTsx = fs.readFileSync(path.join(ROOT_DIR, 'src', 'main.tsx'), 'utf8');
  assert.equal(mainTsx.includes('import.meta.env.PROD'), true);
  assert.equal(mainTsx.includes("register('/sw.js'"), true);
});

test('sw.js offline navigation fallback returns cached /index.html when network fails', async () => {
  const swCode = fs.readFileSync(path.join(ROOT_DIR, 'public', 'sw.js'), 'utf8');
  const listeners: Record<string, (event: any) => void> = {};

  const cachedIndexHtml = { status: 200, body: '<!doctype html><html>cached</html>' };
  const mockCache = {
    addAll: async () => undefined,
    put: async () => undefined,
    match: async (key: any) => {
      if (key === '/index.html' || key === '/') return cachedIndexHtml;
      return undefined;
    },
  };

  const sandbox = {
    URL,
    Promise,
    Response: { error: () => ({ status: 0 }) },
    self: {
      skipWaiting: () => undefined,
      clients: { claim: async () => undefined },
      addEventListener: (type: string, handler: (event: any) => void) => {
        listeners[type] = handler;
      },
    },
    caches: {
      open: async () => mockCache,
      keys: async () => [],
      delete: async () => true,
    },
    fetch: async () => {
      throw new Error('Network offline');
    },
  };

  vm.createContext(sandbox);
  vm.runInContext(swCode, sandbox);

  assert.equal(typeof listeners.fetch, 'function');

  let respondedPromise: Promise<any> | null = null;
  listeners.fetch({
    request: {
      method: 'GET',
      url: 'https://example.com/',
      mode: 'navigate',
      destination: 'document',
      headers: { has: () => false },
    },
    respondWith: (p: Promise<any>) => {
      respondedPromise = p;
    },
  });

  assert.notEqual(respondedPromise, null);
  const result = await respondedPromise!;
  assert.deepEqual(result, cachedIndexHtml);
});

test('vercel.json configures required headers for /sw.js, /manifest.webmanifest, and /icons/(.*)', () => {
  const vercelJsonPath = path.join(ROOT_DIR, 'vercel.json');
  assert.equal(fs.existsSync(vercelJsonPath), true);
  const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
  assert.equal(Array.isArray(vercelConfig.headers), true);
  assert.equal(vercelConfig.rewrites, undefined);

  const swHeader = vercelConfig.headers.find((h: any) => h.source === '/sw.js');
  assert.ok(swHeader);
  assert.deepEqual(swHeader.headers, [
    { key: 'Cache-Control', value: 'no-cache' },
    { key: 'Service-Worker-Allowed', value: '/' },
  ]);

  const manifestHeader = vercelConfig.headers.find(
    (h: any) => h.source === '/manifest.webmanifest'
  );
  assert.ok(manifestHeader);
  assert.deepEqual(manifestHeader.headers, [
    { key: 'Content-Type', value: 'application/manifest+json' },
  ]);

  const iconsHeader = vercelConfig.headers.find((h: any) => h.source === '/icons/(.*)');
  assert.ok(iconsHeader);
  assert.deepEqual(iconsHeader.headers, [
    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
  ]);
});

test('PWA translations cover all 12 built-in languages and 7-day constant is exact', () => {
  const langs = ['en', 'hi', 'pa', 'mr', 'gu', 'bn', 'bho', 'ta', 'te', 'kn', 'ml', 'ur'];
  for (const code of langs) {
    const t = getPwaTranslations(code);
    assert.ok(t.keepOnPhone.length > 0, `Missing keepOnPhone for ${code}`);
    assert.ok(t.install.length > 0, `Missing install for ${code}`);
    assert.ok(t.installApp.length > 0, `Missing installApp for ${code}`);
    assert.ok(t.iosHint.length > 0, `Missing iosHint for ${code}`);
    assert.ok(t.addedToast.length > 0, `Missing addedToast for ${code}`);
    assert.ok(t.updateReadyToast.length > 0, `Missing updateReadyToast for ${code}`);
  }
  assert.equal(PWA_TRANSLATIONS.en.keepOnPhone, 'Keep this invitation on your phone');
  assert.equal(PWA_TRANSLATIONS.en.install, 'Install');
  assert.equal(PWA_TRANSLATIONS.en.installApp, 'Install app');
  assert.equal(PWA_TRANSLATIONS.en.iosHint, 'Tap Share, then Add to Home Screen');
  assert.equal(PWA_TRANSLATIONS.en.addedToast, 'Added to your home screen');
  assert.equal(PWA_TRANSLATIONS.en.updateReadyToast, 'A new version is ready, tap to refresh');
  assert.equal(SEVEN_DAYS_MS, 7 * 24 * 60 * 60 * 1000);
});
