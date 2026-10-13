# Changelog

## 0.2.0 — 2026-10-13: v2 homepage (CLAUDE.md v2, build order steps 1–4)

### Added
- **Asset pipeline (step 1).** `assets/manifest.json` lists 98 images from section 6 with original sizes, uses, credit, draft alt text and object position, plus the cohort collection rule. `npm run assets:fetch` downloads them into `assets-src/<group>/` and collects the cohort; `npm run assets:optimise` (sharp) writes AVIF and WebP at 400–1600px, never wider than the original, and `src/data/images.json`. `npm run audit:images` checks the 1.25× upscale rule, alt text and the 1.5 MB budget.
- **Design system v2 (step 2).** Section 3 tokens and type roles in `global.css`; components `Img`, `MapFrame`, `Duotone`, `ThreeStrokes`, `GradientPanel`, `SectionTitle`, `ArrowButton`, `ArrowLink`, `StatBand`, `ImageTile`, `PortraitCard`, `NewsCard`, `HBarChart`, `Credit`; `/styleguide/` shows them all.
- **Global chrome (step 3).** Dismissible announcement bar fed by `opportunities.json`; transparent header over the hero that turns teal after 80px without shifting the page; full-screen mobile menu; Fuse.js site search over a static index; closing band with FSD's tagline and the newsletter sign-up dialog; footer with link columns, social profiles, funders and network, and the regional coordination strip.
- **Homepage (step 4).** Sections 4.2–4.13 in order: hero with three tabs and glow indicator, stats band, our role, how we work, featured work slider, where we focus tiles, data snapshot, Board Ready Women band, people, Latest (News, LinkedIn, X), latest publications, opportunities.
- **Content.** Facts gathered by search and checked by a second independent search; open questions listed in `docs/content-audit.md`. New data files `news.json` and `featured.json`; `figures.json`, `site.json` and `opportunities.json` extended.

### Changed
- CLAUDE.md replaced by v2. Body text is now 16px on a 1.8 line height; Ge'ez text drops letter case and tracking.
- v1 header, footer, logo, waffle chart, work tabs, zigzag and board-seats chart removed; v1 data files, i18n, cookie consent and newsletter form logic kept.

### Fixed after review
A six-dimension review (spec, accessibility, content, images, interaction) raised 25 findings; each was checked against the code and all were fixed:
- Open or closed opportunities are now re-checked in the browser, so the announcement bar and the opportunity cards never show a call as open after its deadline (tested with the clock set to 16 October 2026).
- Hero held to min(88vh, 820px) on desktop with shorter headlines; skyline kept at its own ratio along the bottom, so it is never upscaled; glow indicator is a short bar under the active tab.
- Duotone strength applied to the image itself, so the multiply blend reaches the gradient.
- Map frame strokes are 4px centre lines traced from the logo paths.
- Sliders keep keyboard focus (aria-disabled ends; focus moves to the slider when its slide hides).
- Section backgrounds alternate white and mist; logo centred from 1024px; closing band 420px; announcement on one line on phones.
- Every number in the copy now has a figures.json entry with its source; unsourced BimaLab dates removed; the insurance workshop shows "November 2025".
- Upscale guard and image audit now account for cropping (object-cover) as well as width; title graphics are shown whole; logo tiles keep their colours.
- Language-of-parts fixes on Amharic pages; per-language search index; duplicate landmark name and a landmark-less note fixed.

### Checked
- Build passes; no horizontal scroll at 390, 768, 1280 or 1440px on `/`, `/am/` and `/styleguide/`.
- axe-core 4.10 (WCAG 2.1 A/AA and best practice): no violations on `/`, `/am/` and `/styleguide/` at 1440 and 390px, with and without the cookie banner.
- Lighthouse, mobile and desktop, `/` and `/am/`: Performance 97–100, Accessibility 100, Best Practices 100, CLS ≤ 0.003. SEO is held back only by the staging `noindex`.
- 40 scripted browser checks pass: consent, header scroll state, announcement dismissal, hero tabs, featured slider keys and focus, Latest tabs and arrows, search, newsletter dialog, mobile menu, language memory, one h1, labelled inputs, heading order, content visible without JavaScript.
- Image audit: nothing scaled past 1.25× at 390, 768, 1024, 1280 or 1440px, every image has alt text. A test build with synthetic stand-ins for all 98 photos also passed, with the hero images preloaded and about 170 KB of images on first load at 1440px (real photos will be heavier but well inside the 1.5 MB budget).

### Evaluation criteria shown on the homepage
ToR clause numbers will be added when `docs/ToR-website-redesign.pdf` is in the repo.

| Criterion (weight) | Where the homepage shows it |
| --- | --- |
| Creativity and UX of the design portfolio (25%) | Image-led layout with FSD's own events and people; map frame and three-stroke motif from the logo; visitor-controlled hero tabs; featured work slider; tiles; mobile segmented control and scroll rows |
| Data visualisation, security and CMS (20%) | Data snapshot with sourced KPIs and an accessible Chart.js chart with a table; everything editable as JSON in `src/data/` (CMS-ready); consent-gated third-party embeds; static site with no server attack surface |
| Scope and Proclamation No. 1321/2024 (15%) | Explicit cookie consent with equal Reject; analytics only after consent; LinkedIn and X embeds load only with consent; newsletter form with purpose, unticked consent, retention and CAPTCHA slot |
| Brand-aligned communication (15%) | FSD palette and typography, logo strokes as the signature, FSD's own tagline, real programmes, publications and staff, women shown as board leaders, Amharic navigation and headings |

### Known gaps
- **No photos yet.** fsdethiopia.org is blocked from the build environment, so all images show the gradient fallback. Run `npm run assets` where the site is reachable, then commit `public/images/` and `src/data/images.json`.
- Inner pages linked from the homepage are not built yet (build order steps 5–8).

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
