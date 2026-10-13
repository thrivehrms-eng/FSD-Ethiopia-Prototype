# FSD Ethiopia — design system (master)

Source of truth for every page. Page-specific overrides go in `pages/<page>.md`.

Generated with the `ui-ux-pro-max` skill (`--design-system`, variance 5, motion 3,
density 4) and then reconciled with the interim brand in `CLAUDE.md`. Where the
two disagreed, the brand wins. Official guidelines replace this at inception.

## What we kept from the skill, and what we overrode

| Skill output | Decision | Why |
| --- | --- | --- |
| Style: Swiss Modernism 2.0 (12-column grid, rational spacing, clear hierarchy) | **Kept** | Fits an evidence-led institution read by policymakers and donors. |
| Landing pattern: Trust & Authority (mission hero, proof, solution overview, clear next step) | **Kept**, adapted | Proof means sourced figures and partners, not sales badges. Next step is "read the evidence" or "work with us", not "get a quote". |
| Pattern: Portfolio Grid | **Rejected** | Built for visual portfolios; FSD Ethiopia's homepage is about work areas and evidence. |
| Palette: navy #1E3A5F, blue #2563EB, ochre #A16207 | **Overridden** | Brand palette below. |
| Type: EB Garamond / Crimson Text | **Overridden** | Brand type is Khand, Poppins and Noto Sans Ethiopic. |
| Motion: subtle scroll reveal (GSAP) | **Rejected** | GSAP is not in the stack. One motion moment only (hero waffle fill), and none under reduced motion. |
| Chart: waffle chart for a percentage gap | **Kept** | Used in the hero for the women/men digital-payment gap, with a text and table fallback. |
| Cookie consent, language switch | No database match | Follows `CLAUDE.md` requirements and WCAG defaults. |

## Colour tokens

| Token | Hex | Use | Contrast note |
| --- | --- | --- | --- |
| `teal-900` | #0F3639 | Header, footer, dark bands | White text 13.1:1 |
| `teal-700` | #165054 | Headings on white | 9.1:1 on white |
| `green-600` | #276C4B | Primary buttons, links | 6.3:1 on white (5.6:1 on mist) |
| `green-500` | #267A40 | Hover, icons | 5.3:1 on white |
| `yellow-400` | #F7DE4D | Accents on dark only | Fails on white (1.35:1); 9.7:1 on teal-900 |
| `red-600` | #C93129 | Small accents, alerts | 5.3:1 on white |
| `ink` | #1C2B2D | Body text | 14.7:1 on white |
| `mist` | #EEF3F1 | Quiet section background | |
| `line` | #C9D6D2 | Decorative rules only | Inputs use a `teal-700` border (9.1:1) |

Motif: left-to-right gradient #276C4B → #0F3639, and a zigzag band that closes sections.

## Type

- Display: Khand 600/700. Condensed, so headings run large and tight (line-height 1.0–1.1).
- Body and UI: Poppins 300–700, base 17px, line-height 1.65, measure ≤ 68ch.
- Amharic: Noto Sans Ethiopic, line-height 1.7, applied through `:lang(am)`.
- Scale (1.25 ratio): 14 · 17 · 21 · 27 · 33 · 42 · 52 · 72 px.
- Sentence case everywhere. No all-caps eyebrows.

## Layout

- 12-column grid, max width 1240px, 20px gutters on mobile and 32px on desktop.
- Left-aligned text. Centre alignment only for single short lines.
- Section rhythm: 64px mobile / 112px desktop.
- Radius: 2px on inputs and buttons, 0 on bands. Hierarchy comes from rules and space, not from cards and shadows.

## Principles

1. **Evidence first.** Each claim carries its source; illustrative numbers are labelled.
2. **One bold moment per page.** On the homepage it is the hero waffle chart. Everything else is quiet.
3. **Women as leaders.** Board-ready leaders are shown in leadership sections, not only as beneficiaries in gap statistics.
4. **Light for slow phones.** No hero photos or carousels; system-light JavaScript; fonts self-hosted, subset, `font-display: swap`.
5. **Privacy visible.** Purpose, consent and retention appear at the point of collection.

## Anti-patterns to avoid

From the skill: low hierarchy, no publication filtering, cluttered visuals, emoji icons.
Added for this brand: yellow on white, numbered markers on non-sequences, arrow glyphs
appended to every button, identical card grids with drop shadows, carousels, autoplay.
