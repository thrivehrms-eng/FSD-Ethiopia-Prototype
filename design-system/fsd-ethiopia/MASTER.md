# FSD Ethiopia — design system (master, v2)

Source of truth for every page. Page-specific overrides go in `pages/<page>.md`.
The binding specification is CLAUDE.md section 3; this file records how it is
implemented and what the `ui-ux-pro-max` skill contributed. `/styleguide/` shows
every token and component live.

## Direction

Image-led institutional site. Structure, rhythm and interaction patterns are borrowed
from r-o.com (patterns only, CLAUDE.md 2.3); everything visible is FSD's own.

| Skill output (v1 run) | v2 decision |
| --- | --- |
| Swiss Modernism 2.0 grid, clear hierarchy | Kept: 12-column grid in a 1280px container |
| Trust & Authority landing pattern (mission, proof, solution, next step) | Kept: hero, stats band, our role, how we work, featured work, opportunities |
| Waffle chart for a gap | Replaced by the data snapshot (KPI tiles plus a bar chart with a table) |
| GSAP scroll motion | Rejected: CSS only, one 16px fade-rise per element, off under reduced motion |

## Tokens

`src/styles/global.css` (`@theme`). Contrast checked with WCAG formulae.

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| teal-950 | #0B2A2C | Regional strip, deepest band | white 15.2:1 |
| teal-900 | #0F3639 | Header on scroll, footer, dark bands | white 13.1:1 |
| teal-700 | #165054 | Section titles on white or mist | 9.1:1 / 8.4:1 |
| green-600 | #276C4B | The single accent: stats, labels, rules, arrows, links | 6.3:1 on white, 5.8:1 on mist |
| green-logo | #3E8740 | Logo stroke only | 4.4:1, decorative only |
| yellow-400 | #F7DE4D | Glow, tab indicator, highlights on dark only | 9.7:1 on teal-900; fails on white |
| red-600 | #C93129 | Hero cut line, alerts | white 5.3:1 |
| ink | #141516 | Body text | 18.3:1 |
| slate | #4A5560 | Secondary text, meta | 7.6:1 on white, 7.0:1 on mist |
| mist | #F4F6F5 | Alternating sections | — |

## Type roles (classes in global.css)

- `.t-hero`: Khand 700 caps, clamp(2.75rem, 6vw, 5.25rem), line-height 0.95.
- `.t-section`: Khand 700 caps, 2.5rem, teal-700, followed by the 2px green rule (`SectionTitle`).
- `.t-label`: Poppins 600 caps, 0.8125rem, tracking 0.14em.
- `.t-stat`: Khand 700, 4rem, green-600.
- `.t-card`: Poppins 700 caps, 1.0625rem, tracking 0.06em, green-600.
- Body: Poppins 400, 16px, line-height 1.8. Amharic: Noto Sans Ethiopic, line-height 1.7, with case and tracking switched off under `:lang(am)`.

## Components (`src/components/ui/`)

`Img` (AVIF/WebP srcsets, build-time 1.25× upscale guard, gradient fallback), `MapFrame`,
`Duotone`, `ThreeStrokes`, `GradientPanel`, `SectionTitle`, `ArrowButton`, `ArrowLink`,
`StatBand`, `ImageTile`, `PortraitCard`, `NewsCard`, `HBarChart`, `Flag`.
Behaviour lives in `src/scripts/app.ts`: `tabs`, `slider` (single and scroll modes),
`heroTabs`, `latest`, `modal`, `siteHeader`, `openListings`, `siteSearch`, `cookieConsent`, `newsletterForm`.

## Rules worth repeating

- One accent on light (green-600); yellow only on dark.
- At most two map frames visible per page. Each frame's strokes keep their logo shapes but sit nudged outwards (yellow left, green up, red right), so they ring the photo instead of crossing faces near its edges.
- Portraits use the light duotone (`.duotone--portrait`): pale green highlights, teal-900 shadows, full colour on hover and focus.
- No grey placeholders: a missing photo shows `GradientPanel`.
- No photo credits or captions, and no source lines outside the Data snapshot.
- Nothing moves on its own except the hero tabs. They advance every 7 seconds, with a pause/play button, pause on hover and stop on focus (CLAUDE.md 3.5). Every animation is off under reduced motion, and the hero does not start on its own then.
