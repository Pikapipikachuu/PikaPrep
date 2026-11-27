'use strict';
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';

// The app uses trusted CDN scripts/styles and inline app code, so CSP is disabled;
// other Helmet protections remain enabled.
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(express.json({ limit: '28mb' }));
app.use('/api/', rateLimit({ windowMs: 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'PikaPrep API', model: MODEL, configured: Boolean(API_KEY) });
});

app.post('/api/gemini', async (req, res) => {
  if (!API_KEY) return res.status(503).json({ error: { message: 'Gemini API key is not configured on the server. Add GEMINI_API_KEY in Render Environment settings.' } });
  const payload = req.body;
  if (!payload || !Array.isArray(payload.contents) || !payload.contents.length) {
    return res.status(400).json({ error: { message: 'Invalid Gemini request payload.' } });
  }
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent?key=${encodeURIComponent(API_KEY)}`;
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(120000)
    });
    const body = await upstream.text();
    res.status(upstream.status).type('application/json').send(body);
  } catch (err) {
    const status = err.name === 'TimeoutError' ? 504 : 502;
    res.status(status).json({ error: { message: status === 504 ? 'Gemini request timed out. Please try again.' : 'Could not reach Gemini API. Please try again.' } });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`PikaPrep listening on port ${PORT}`));
