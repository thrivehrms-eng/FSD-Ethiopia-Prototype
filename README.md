# FSD-Ethiopia-Prototype
A high-fidelity, clickable prototype of a redesigned website for FSD Ethiopia, built by Digital Tailor Agency for a competitive bid.

Project rules are in `CLAUDE.md`, the design system in `design-system/fsd-ethiopia/MASTER.md`, and progress in `CHANGELOG.md`.

## Run it

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static site in dist/ (staging: noindex on)
PUBLIC_STAGING=false npm run build   # production build without noindex
npm run screenshots  # after a build; writes screenshots/ and checks for horizontal scroll
```

`npm run screenshots` needs Playwright. Install it with `npm i -D playwright`, or point
`PLAYWRIGHT_MODULE` at an existing install.

## Where things live

- `src/i18n/en.json`, `src/i18n/am.json`: all interface text, read through `t()`.
- `src/data/*.json`: figures (with sources), insights, opportunities, site details.
- `src/components/`, `src/layouts/`: Astro components; Alpine.js behaviour in `src/scripts/app.ts`.
- `scripts/subset-ethiopic.py`: re-subsets the Amharic font after `am.json` changes.
