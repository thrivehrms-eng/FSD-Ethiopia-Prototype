# Changelog

## 0.3.0 — 2026-10-13: FSD Ethiopia's own photos, verified content

### Added
- **Real photography throughout the homepage.**
  - All 98 images from CLAUDE.md section 6 and the 40 Board Ready cohort portraits, downloaded from fsdethiopia.org. Every original matches the size in the brief.
  - 134 images optimised into 896 AVIF/WebP files in `public/images/`, 39 MB. The 32 MB of originals stay out of git; `npm run assets:fetch` restores them.
- `docs/ToR-website-redesign.pdf`: the re-advertised ToR (5 October 2026) from FSD's procurement page, so the homepage can be mapped to its clauses (below).
- Second open procurement call: "Website Redesign for FSD Ethiopia", closing 16 October 2026.

### Changed
- **Alt text.** Rewritten for 28 images after looking at each photo. Four news images are photos rather than title graphics, so they now fill their card.
- **Map frame.** The strokes now ring the photo instead of crossing it. Each keeps its logo shape but moves outwards: yellow left, green up, red right. With real photos, the yellow chevron had crossed faces near the left edge. The frame gains side padding so the strokes stay inside the column.
- **Portraits.** The duotone now uses a light green for highlights and teal for shadows, so faces stay legible at rest. Hover and focus still bring back full colour.
- **Partner logos.** The UK International Development logo keeps its colours on a white chip, because the white filter turned it into a blank box. The Gates Foundation and FSD Africa tiles are cropped to their wordmarks so they read at footer size.
- **Content checked against the live site** (`docs/content-audit.md`).
  - All 15 figures are now `verified: true`, each with the source wording found and the date checked.
  - Account ownership is labelled "Global Findex 2025", and the unsourced 46% (2021) was dropped.
  - The insurance workshop shows its exact date, 11 November 2025.
  - The Access to Influence and India's DPI Flywheel cards link to their own posts.
  - The investor relations call carries its exact title and ToR link.
  - The funder is named "the UK's Foreign, Commonwealth & Development Office", matching FSD's July 2026 wording.
  - Maleda Bisrat is confirmed on the current board.
- Removed two unused figures that their cited sources do not contain: the digital-payment gender split and the 15% bank-board share. Also removed the unsourced claim that many mobile money accounts are inactive.
- `npm run assets:optimise` encodes four images at a time and writes atomically.
- `npm run audit:images` now counts every response body (it under-counted before) and reports the LCP image and its size.

### Checked
- Build passes; no horizontal scroll at 390, 768, 1280 or 1440px on `/`, `/am/` and `/styleguide/`.
- **Image audit:** nothing scaled past 1.25× at 390, 768, 1024, 1280 or 1440px; every image has alt text; no fallback panels.
  - First load at 1440px is 655 KB of the 1.5 MB budget.
  - The LCP image is a preloaded AVIF of 9–68 KB depending on width, against a 200 KB limit.
- **axe-core:** no violations on `/`, `/am/` and `/styleguide/` at 1440 and 390px, with and without the cookie banner.
- **Lighthouse with photos:**
  - Performance 99 on mobile and 100 on desktop; Accessibility 100; Best Practices 100.
  - LCP 1.9–2.0s on mobile and 0.5s on desktop; CLS at most 0.002. The ToR asks for pages under 3 seconds.
  - SEO 66 only because staging is `noindex`.
- 40 scripted browser checks pass.
- With the clock set to 14, 16 and 17 October 2026, the announcement bar and opportunity cards switch from two open calls, to one, to none.

### Homepage against the ToR
Clause numbers refer to `docs/ToR-website-redesign.pdf`.

| ToR clause | Where the homepage shows it |
| --- | --- |
| 2 Overall objective (primary and secondary audiences) | Hero tabs for who we are, our work and working with us; data, publications and opportunities each one click from the homepage |
| 3.1 Design and UX: brand imagery, gender responsive, mobile | FSD's own event photos, staff and cohort portraits; women leaders in the Board Ready band and the people row; layouts checked at 390–1440px |
| 3.1 WCAG 2.1 AA | axe 0 violations, Lighthouse Accessibility 100, keyboard-operable tabs, sliders and dialogs, reduced-motion support |
| 3.2 Bilingual toggle | EN \| አማርኛ in the header; `/am/` homepage with Amharic navigation, buttons and headings |
| 3.3 APIs (Mailchimp, X, LinkedIn) | Newsletter sign-up in the closing band; LinkedIn and X tabs in Latest |
| 3.3 Analytics under Proclamation 1321/2024 | Analytics load only after consent; Reject is as prominent as Accept |
| 3.3 SEO and schema markup | Unique title, description and Open Graph tags; Organization schema; `noindex` on staging |
| 3.3 Performance: under 3 seconds, lazy loading, compressed images | AVIF/WebP at four widths, lazy below the fold, LCP 1.9s on mobile |
| 3.4 Data visualisation and resource library | Data snapshot with sourced KPIs and a Chart.js chart with a table; latest publications with real covers and PDF links |
| 3.5 CAPTCHA on forms | CAPTCHA slot on the newsletter form |
| 3.6 Content audit | `docs/content-audit.md`, including issues found on the live site |
| 3.7 Job and procurement portals reachable from the homepage | Announcement bar, Opportunities cards with live counts and deadlines, header navigation |
| 4 Brand alignment and communications | FSD palette, type and logo strokes; storytelling in Featured work; programme visibility in Where we focus; social feeds; searchable site; newsletter and contact |
| 5.2 Sample homepage mockup | This homepage |

### Known gaps
- Inner pages linked from the homepage are not built yet (build order steps 5–8).
- Map frame strokes still pass over the outer edges of a photo, so check each new photo used in a frame.

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
ToR clause numbers were added in 0.3.0.

| Criterion (weight) | Where the homepage shows it |
| --- | --- |
| Creativity and UX of the design portfolio (25%) | Image-led layout with FSD's own events and people; map frame and three-stroke motif from the logo; visitor-controlled hero tabs; featured work slider; tiles; mobile segmented control and scroll rows |
| Data visualisation, security and CMS (20%) | Data snapshot with sourced KPIs and an accessible Chart.js chart with a table; everything editable as JSON in `src/data/` (CMS-ready); consent-gated third-party embeds; static site with no server attack surface |
| Scope and Proclamation No. 1321/2024 (15%) | Explicit cookie consent with equal Reject; analytics only after consent; LinkedIn and X embeds load only with consent; newsletter form with purpose, unticked consent, retention and CAPTCHA slot |
| Brand-aligned communication (15%) | FSD palette and typography, logo strokes as the signature, FSD's own tagline, real programmes, publications and staff, women shown as board leaders, Amharic navigation and headings |

### Known gaps
- **No photos yet** (resolved in 0.3.0). fsdethiopia.org was blocked from the build environment, so all images showed the gradient fallback.
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
