import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '512kb' }));

  /**
   * Optional "More languages" server-side Gemini translation endpoint.
   * Translates the English wedding dictionary into any user-requested language in native script.
   * If GEMINI_API_KEY is missing or network fails, returns a clean 503 JSON so the client
   * shows a polite message and stays in the current language.
   */
  app.post('/api/translate', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
        res.status(503).json({
          ok: false,
          error: 'GEMINI_API_KEY_MISSING',
          message: 'Live translation is unavailable right now. Staying in the current language.',
        });
        return;
      }

      const { targetLanguage, sourceDictionary } = req.body as {
        targetLanguage?: string;
        sourceDictionary?: Record<string, string>;
      };

      const requestedLang = (targetLanguage || '').trim();
      if (!requestedLang || !sourceDictionary || typeof sourceDictionary !== 'object') {
        res.status(400).json({
          ok: false,
          error: 'INVALID_REQUEST',
          message: 'Please provide a language name to translate.',
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
      });

      const prompt = `You are a culturally sensitive Indian wedding invitation translator.
Translate the following JSON dictionary of wedding invitation strings from English into "${requestedLang}" written in its authentic native script.
Keep proper nouns like "Gurleen", "Harjot", "Amritsar", "Haldi", "Mehndi", "Sangeet" warm and natural in the target script.
Also return metadata fields:
- "code": a short lowercase language identifier (e.g. "sd", "ks", "fr", "es")
- "nativeName": the name of "${requestedLang}" in its own native script
- "englishName": the English name of "${requestedLang}"
- "dir": "rtl" if "${requestedLang}" is written right-to-left (such as Urdu, Sindhi in Arabic script, Kashmiri in Perso-Arabic script, Arabic, Persian, Hebrew), otherwise "ltr"
- "dictionary": an object with the exact same keys as the input JSON and translated string values.

Input JSON dictionary:
${JSON.stringify(sourceDictionary)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);

      if (!parsed || typeof parsed !== 'object' || !parsed.dictionary) {
        res.status(502).json({
          ok: false,
          error: 'INVALID_MODEL_RESPONSE',
          message: 'Live translation is unavailable right now. Staying in the current language.',
        });
        return;
      }

      res.json({
        ok: true,
        code: String(parsed.code || requestedLang.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) || 'custom'),
        nativeName: String(parsed.nativeName || requestedLang),
        englishName: String(parsed.englishName || requestedLang),
        dir: parsed.dir === 'rtl' ? 'rtl' : 'ltr',
        dictionary: parsed.dictionary,
      });
    } catch {
      res.status(503).json({
        ok: false,
        error: 'TRANSLATION_FAILED',
        message: 'Live translation is unavailable right now. Staying in the current language.',
      });
    }
  });

  const publicPath = path.join(__dirname, 'public');

  app.get('/sw.js', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Service-Worker-Allowed', '/');
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.sendFile(path.join(publicPath, 'sw.js'));
  });

  app.get('/manifest.webmanifest', (_req, res) => {
    res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
    res.sendFile(path.join(publicPath, 'manifest.webmanifest'));
  });

  app.use(
    '/icons',
    express.static(path.join(publicPath, 'icons'), {
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      },
    })
  );

  if (process.env.NODE_ENV !== 'production') {
    app.get('/icon-maker.html', (_req, res) => {
      res.sendFile(path.join(publicPath, 'icon-maker.html'));
    });
    app.use(express.static(publicPath));
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use(express.static(publicPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
