# PikaPrep — Live deployment package

This package uses the latest supplied `index (13).html` as the app frontend and routes all Gemini requests through a server-side endpoint. The Gemini key is never stored in browser code.

## Deploy on Render
1. Upload the contents of this folder to the root of your GitHub repository (not the ZIP itself).
2. In Render, create **New → Web Service** and connect that repository.
3. Runtime: Node. Build command: `npm install`. Start command: `npm start`.
4. In Render → Environment, add `GEMINI_API_KEY` with your Google AI Studio key. Optionally add `GEMINI_MODEL` (default: `gemini-3-flash-preview`).
5. Deploy. Open `/api/health` on the deployed site; `configured` should be `true`.

## Local run
- Node.js 20+
- `npm install`
- Set `GEMINI_API_KEY` in your shell or copy `.env.example` to `.env` and fill the key.
- `npm start`, then open `http://localhost:3000`.

## Important
- Never commit `.env` or paste the API key into HTML/JS/GitHub.
- The app's PDF.js and other frontend libraries load from CDNs and therefore require internet access.
- Uploaded file parsing currently occurs in the browser; the extracted text/image payload is sent to the protected server proxy. This package does not add accounts, cloud storage, or cross-device sync.
- The app stores student data in browser localStorage. Clearing browser data can remove it.
- The app limits API proxy calls to 20 per minute per IP as a basic safeguard; tune after observing actual use.
