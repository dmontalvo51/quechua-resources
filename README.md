# Quechua Resources — Vite + React (QR + JSON + Custom Palette)

## Quick start
```bash
npm install
npm run dev
```
Open the URL Vite prints (e.g. http://localhost:5173).

## Configure content
Edit `src/content.json`:
- `s3BaseUrl`: your S3 bucket (e.g., `https://mi-quechua-pdfs.s3.amazonaws.com`)
- Add/remove `subjects` and `items` (`type`: `web` | `youtube` | `pdf`).

## What it does
- **Web pages** open via Google Translate proxy in Quechua:
  `https://translate.google.com/translate?hl=qu&sl=auto&u=<URL>`
- **YouTube** links add `hl=qu&cc_lang_pref=qu&cc_load_policy=1` to prefer Quechua captions and force CC on.
- **PDFs** open from S3 using `s3BaseUrl` + `key`.
- **QR codes** for the page and each resource using npm `qrcode`.
- Footer shows **© Developer by Diego Montalvo**.

## Build & deploy
```bash
npm run build
npm run preview
```
Deploy `dist/` to any static host (S3/CloudFront, Vercel, Netlify, etc).

## Notes
- Translate proxy may not work on login-protected/CSP-heavy sites; public pages are best.
- Quechua captions appear only if available; otherwise YouTube may fall back or show none.
