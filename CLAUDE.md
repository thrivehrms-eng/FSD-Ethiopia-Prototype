# FSD Ethiopia website prototype — project context

## What this is
A high-fidelity, clickable prototype of a redesigned website for FSD Ethiopia, built by Digital Tailor Agency for a competitive bid. The Terms of Reference are in `docs/ToR-website-redesign.pdf`; read it before your first task. Bid deadline: 16 October 2026. Evaluators will see the prototype as a staging link and as screenshots inside the PDF proposal.

Evaluators score:
- Creativity and UX of the homepage mockup and design portfolio: 25%
- Technical capacity in data visualisation, security and CMS: 20%
- Understanding of scope and compliance with Ethiopia's Personal Data Protection Proclamation No. 1321/2024: 15%
- Brand-aligned communication: 15%

Every page you build must make at least one of these visible. After each page, list the ToR clauses it demonstrates.

## Audiences
- Primary: policymakers, donors, financial institutions, development partners.
- Secondary: underserved communities, researchers, job and procurement applicants.
- Design first for a busy senior reader. Design second for a first-time visitor on a phone with a slow connection.

## Stack
- Astro with static output, Tailwind CSS and Alpine.js.
- Chart.js for charts, Leaflet for maps, Fuse.js for search and Lucide for icons.
- No React, Vue or UI kits. There is no backend: forms, logins and emails are simulated in the browser.
- Data lives in `src/data/*.json`. Interface text lives in `src/i18n/en.json` and `src/i18n/am.json`.
- Never hard-code visible text in a page; always use the `t()` helper.
- Ask before adding any dependency not listed here.

## Brand
Official guidelines arrive at inception. Until then, use the values below, which were sampled from the ToR document and FSD Ethiopia's current site.

Fonts:
- Khand 600 and 700 for display headings.
- Poppins 300 to 700 for body text and interface labels.
- Noto Sans Ethiopic for all Amharic text, with line-height 1.7.

Colours, as Tailwind tokens:

| Token | Hex | Use |
| --- | --- | --- |
| teal-900 | #0F3639 | Header, footer, dark bands |
| teal-700 | #165054 | Headings on white |
| green-600 | #276C4B | Primary buttons, links |
| green-500 | #267A40 | Hover states, icons |
| yellow-400 | #F7DE4D | Accents on dark backgrounds only; fails contrast on white |
| red-600 | #C93129 | Small accents, alerts |

Visual elements:
- Motif: a left-to-right gradient from #276C4B to #0F3639, and a subtle zigzag band at the end of sections.
- Logo: `assets-src/logo2022_1.png`. Never stretch it, recolour it or place it on a busy photo.

Tone: confident, evidence-led, plain English. Avoid hype words.

## Content rules
- Use real FSD Ethiopia content, fetched from these pages:
  - https://fsdethiopia.org/ (About text, publications, footer)
  - https://fsdethiopia.org/our-work-3/ (Financial Inclusion)
  - https://fsdethiopia.org/our-work-2/ (Access to Capital)
  - https://fsdethiopia.org/our-work-4/ (Climate Finance)
  - https://fsdethiopia.org/about-our-board-ready-program/
  - https://fsdethiopia.org/blogs/
  - https://fsdethiopia.org/procurement-opportunities/
  - https://fsdethiopia.org/work-with-us-2/
- Shorten and tighten that text for the web; do not paste long passages.
- Never invent statistics. Sourced figures live in `src/data/figures.json` with their source URLs. Any other number shown must carry a visible "Illustrative data" label.
- Never invent quotes from real people. Quote slots read "[Quote to be supplied by FSD Ethiopia]". Results without a source read "To be supplied".
- Applicants on staff pages are fictional. Mark those pages "Demo data – fictional applicants".
- Amharic text is for navigation, buttons, hero text and section headings only. The toggle shows the note "Amharic sample – final copy supplied by FSD Ethiopia". Flag every string in `am.json` for review by a native speaker.

## Required on every page
Accessibility (WCAG 2.1 AA):
- Landmarks, one h1 and a logical heading order.
- Text contrast of at least 4.5:1, visible focus rings and a skip link.
- Menus, modals and tabs fully operable by keyboard.
- A label on every input and alt text on every image.
- No meaning carried by colour alone; respect prefers-reduced-motion.

Layout and performance:
- Mobile-first. Check widths of 390, 768, 1280 and 1440 px, with no horizontal scroll.
- No carousels and no autoplay video.
- Lazy-load images below the fold, use WebP or AVIF, and set width and height on every image.
- Target a Lighthouse score of 90 or more in all four categories.

Language: an "EN | አማርኛ" toggle in the header. It sets `<html lang>` and remembers the visitor's choice.

Cookie consent: an explicit-consent banner with Accept, Reject and Preferences, where Reject is as prominent as Accept. Analytics scripts load only after consent.

Footer:
- Contact details and LinkedIn, X and Facebook links.
- A Mailchimp signup with an unticked consent checkbox.
- Links to the privacy notice, accessibility statement and cookie settings.
- The FSD Network.

Gender-responsive content: balanced imagery, inclusive language, and women shown as leaders, not only as beneficiaries.

SEO:
- A unique title and meta description on every page, plus Open Graph tags.
- Schema.org markup: Organization on the homepage, Article on stories and posts, JobPosting on open vacancies.
- Add `noindex` while on staging.

## Data protection: show it in the interface
Every form:
- Collects only necessary fields.
- States its purpose.
- Has an unticked consent checkbox that links to the privacy notice.
- States the retention period as "[retention period to be confirmed]".
- Shows a CAPTCHA placeholder.

The privacy page lets people request access to, correction of or deletion of their data.

Staff pages show:
- Two-factor authentication.
- Role-based access, with roles Admin, HR reviewer, Procurement reviewer and Editor.
- An audit log.
- The rule that the AI screening tool suggests scores but a person makes every decision.

## Working style
- Build one page per request, reusing existing components. Don't rewrite finished components unless asked.
- After each page:
  1. Run the build and fix any errors.
  2. Take Playwright screenshots at 1440 and 390 widths into `screenshots/`.
  3. Report the ToR clauses the page covers.
- Keep `CHANGELOG.md` updated with what was built.
