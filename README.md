# FSD-Ethiopia-Prototype
A high-fidelity, clickable prototype of a redesigned website for FSD Ethiopia, built by Digital Tailor Agency for a competitive bid.

Project rules are in `CLAUDE.md` (v2), the design system in `design-system/fsd-ethiopia/MASTER.md` and `/styleguide/`, open content questions in `docs/content-audit.md`, and progress in `CHANGELOG.md`.

## Run it

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static site in dist/ (staging: noindex on)
PUBLIC_STAGING=false npm run build   # production build without noindex
npm run screenshots  # after a build; writes screenshots/ and checks for horizontal scroll
npm run audit:images # after a build; upscale, alt text and page-weight checks
```

## Photos

FSD Ethiopia's photos, portraits and covers are listed in `assets/manifest.json`
(CLAUDE.md section 6), plus the Board Ready cohort portraits collected from
https://fsdethiopia.org/cohort/. The optimised AVIF/WebP files in `public/images/`
and `src/data/images.json` are committed, so a fresh clone builds with every photo.
The downloaded originals in `assets-src/` are not committed. To refresh them on a
machine that can reach fsdethiopia.org:

```bash
npm run assets       # download into assets-src/, then build AVIF/WebP into public/images/
npm run build && npm run audit:images
```

Any slot whose image is missing shows the brand gradient with the three-stroke mark.
The images belong to FSD Ethiopia: use them only in this pitch prototype, and keep
the staging site `noindex`.

`npm run screenshots` needs Playwright. Install it with `npm i -D playwright`, or point
`PLAYWRIGHT_MODULE` at an existing install.

## Where things live

- `src/i18n/en.json`, `src/i18n/am.json`: all interface text, read through `t()`.
- `src/data/*.json`: figures (with sources), insights, opportunities, site details.
- `src/components/`, `src/layouts/`: Astro components; Alpine.js behaviour in `src/scripts/app.ts`.
- `scripts/subset-ethiopic.py`: re-subsets the Amharic font after `am.json` changes.
