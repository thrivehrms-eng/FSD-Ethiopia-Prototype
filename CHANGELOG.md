# Changelog

## 0.1.0 — 2026-10-13

### Added
- Project scaffold: Astro 7 (static output), Tailwind CSS 4, Alpine.js, Chart.js and Lucide, all pinned to exact versions.
- Design system in `design-system/fsd-ethiopia/MASTER.md`, generated with the `ui-ux-pro-max` skill and reconciled with the interim brand.
- i18n: `t()` helper with English fallback, `src/i18n/en.json` and `src/i18n/am.json` (every Amharic string flagged for native-speaker review), `/` and `/am/` routes, an EN | አማርኛ toggle that sets `<html lang>` and remembers the choice.
- Shared layout: skip link, landmarks, sticky header with keyboard-operable mobile menu, Amharic sample notice, footer with contact details, social placeholders, FSD Network, privacy, accessibility and cookie-settings links.
- Cookie consent: Accept all and Reject all with equal prominence, a Preferences dialog, and analytics that load only after consent (a local stand-in script that sends nothing).
- Newsletter form: email only, stated purpose, unticked consent checkbox linked to the privacy notice, retention placeholder, CAPTCHA placeholder, inline errors, simulated submission.
- Homepage: mission hero with a waffle chart of the digital-payments gender gap, Who we are, keyboard-operable tabs for the three programme areas, a Chart.js chart of women's board seats with a table alternative, Board Ready Program with a quote slot, latest insights, procurement and careers, funders, Organization schema.
- Sourced figures in `src/data/figures.json`, with insights, opportunities and site details in `src/data/`.
- Self-hosted, subset fonts (Khand, Poppins, Noto Sans Ethiopic subset to 32 KB via `scripts/subset-ethiopic.py`).
- `noindex` on staging builds; set `PUBLIC_STAGING=false` to remove it for production.
- `npm run screenshots`: full-page captures at 1440 and 390 px plus cookie-banner captures, with a horizontal-overflow check at 390, 768, 1280 and 1440 px.

### Checked
- Build passes. No horizontal scroll at 390, 768, 1280 or 1440 px on `/` or `/am/`.
- Lighthouse (mobile and desktop, `/` and `/am/`): Performance 100, Accessibility 100, Best Practices 100. SEO is 63 on staging because of the intentional `noindex` and 100 with `PUBLIC_STAGING=false`.
- Scripted browser checks (24): no analytics before consent or after rejection, analytics after opt-in, dialog Escape and focus return, tab arrow keys, form validation and focus, unticked consent, language memory, mobile menu focus and Escape, one h1, labelled inputs, no skipped heading levels.

### Homepage and the evaluation criteria
ToR clause numbers will be added when `docs/ToR-website-redesign.pdf` is in the repo.

| Criterion (weight) | Where the homepage shows it |
| --- | --- |
| Creativity and UX of the homepage (25%) | Hero pairs the mission with the gap the work addresses; tabs for programme areas; one motion moment; mobile-first layout |
| Data visualisation, security and CMS (20%) | Waffle chart and Chart.js chart, both with table alternatives and source links; lazy-loaded charting; JSON data files ready for a CMS; no third-party requests before consent |
| Scope and PDPP No. 1321/2024 compliance (15%) | Explicit cookie consent, Reject as prominent as Accept, analytics gated on consent, minimal newsletter form with purpose, unticked consent and retention statement |
| Brand-aligned communication (15%) | Brand palette, Khand and Poppins, gradient and zigzag motif, real FSD Ethiopia content in plain English, women shown as board leaders |

### Known gaps
- `fsdethiopia.org` was blocked from the build environment. Content and figures come from search-index summaries of FSD Ethiopia pages and must be checked against the live pages (`verified: false` in `figures.json`).
- The official logo (`assets-src/logo2022_1.png`) and the ToR PDF are not in the repo. An interim text wordmark is used.
- Social profile URLs are unknown and shown as "link to be confirmed". FSD Network URLs were added from general knowledge and need checking.
- Linked inner pages (About, Our work, Board Ready, Insights, Contact, Privacy, Accessibility) are not built yet.
- No photography yet, so the balanced-imagery requirement is still open.
