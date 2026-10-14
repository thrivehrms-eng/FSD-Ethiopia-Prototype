# FSD Ethiopia website prototype — CLAUDE.md (v2)

> Save this file as `CLAUDE.md` in the project root, replacing v1.
>
> v2 keeps every v1 rule: scoring focus, honest content, bilingual, WCAG 2.1 AA, data protection, one page per request. It adds three things:
> 1. An image-led design direction borrowed from r-o.com.
> 2. A verified manifest of FSD Ethiopia's own photos, people, logos and covers.
> 3. A rebuilt homepage specification.
>
> If the v1 build exists, keep its data files, i18n and form/dashboard logic. Restyle and extend; do not start over.

---

## 1. The project in one paragraph

This is a clickable, high-fidelity prototype of FSD Ethiopia's redesigned website, built by Digital Tailor Agency for a bid due on 16 October 2026. The ToR is at `docs/ToR-website-redesign.pdf`.

Scoring:
- 25% creativity and UX of the design portfolio, including the sample homepage mockup
- 20% technical capacity in data visualisation, security and CMS
- 15% understanding of scope and compliance with Proclamation No. 1321/2024
- 15% brand-aligned communication

v1 was clean but text-heavy, with grey placeholders. v2 must look like a finished, photo-rich institutional site that evaluators recognise as their own organisation: their people, their events, their reports.

---

## 2. Design direction: borrowed from r-o.com, rebuilt for FSD

The reference is https://r-o.com/ (Rogers-O'Brien Construction, Texas), inspected live on 13 October 2026. We borrow its structure, rhythm and interaction patterns, never its brand.

### 2.1 What makes the R-O site work

- **One accent colour.** A single brand colour (crimson) does all the emphasis work: stat numbers, labels, heading rules and arrow buttons. Everything else is near-black text (#141516), grey section titles (#545860) and generous white space.
- **Three typographic voices:**
  - A condensed uppercase display face for big headlines (Trump Gothic, 40px and up, about 2px tracking).
  - A wide uppercase face for labels and stat numbers (Durno, 12–20px, about 1.4px tracking).
  - An airy body face (Open Sans 15px on a 30px line height).
- **Header.** A fixed, transparent header sits over a full-bleed hero, with the logo centred and the navigation split left and right. A thin announcement bar above it advertises open roles.
- **Hero.** Full-bleed media under a brand-tinted overlay, a big condensed headline, a short paragraph and a small button. A three-step pager has a glowing gradient indicator, and the hero ends in a shaped bottom edge.
- **Stats band.** Directly under the hero: four big numbers in the brand colour, each with a small label beside it.
- **Split about block.** The photo is cut by a custom SVG mask, an angular badge shape that echoes their logo.
- **Section headings.** Condensed caps followed by a 2px brand-colour rule that runs to the container edge.
- **Values row.** Four icon columns, each with an icon in a brand-colour circle, an uppercase label, a bold one-line promise and short text.
- **Recent work slider.** A big image on the left, title, location and text on the right, and a second image staggered below. Round 40px brand-colour previous and next buttons.
- **Who we serve.** A 3×2 grid of edge-to-edge photo tiles with an overlay, an uppercase title and a sub-list. On mobile the tiles become a horizontal scroll.
- **News slider.** Horizontal cards (image left; date, uppercase title, excerpt and "Read more" right) that peek off the right edge.
- **Closing brand moment.** A skyline photo tinted in the brand colour flows into the footer, with a giant logo, the tagline and a Contact button.
- **Footer.** Brand-colour background, link columns and social icons, plus a darker strip listing the regional offices with line icons.

### 2.2 How each device becomes FSD's

| R-O device | FSD v2 version |
| --- | --- |
| One crimson accent | FSD green #276C4B as the single emphasis colour on light backgrounds; logo yellow #F7DE4D as the "glow" on dark backgrounds |
| Trump Gothic condensed caps | Khand 700, uppercase (already FSD's display face in the ToR) |
| Durno wide labels | Poppins 600, uppercase, letter-spacing 0.14em |
| Open Sans airy body text | Poppins 400, 16px, line-height 1.8 |
| Badge-shaped SVG mask | The **map frame**: an angular clip plus the three strokes from FSD's logo (section 3.4) |
| Curved hero bottom edge | An angled bottom edge with a thin red-to-yellow line along the cut |
| Background video and auto-advancing pager | Three hero tabs that advance every 7 seconds, with a visible pause button and a countdown line; no video |
| Regional office strip | Regional coordination strip: the seven regions where FSD has coordinators |
| "We're hiring" announcement bar | A live "open opportunities" bar fed from `opportunities.json` |
| Skyline closing band | FSD's own city skyline photo, duotoned teal-green, with the three-stroke mark |

### 2.3 Do not copy

Nothing from R-O appears in the prototype:
- no name, logo, wording or photos;
- no icon files, including its location SVGs;
- not its crimson colour or its exact mask path;
- not its licensed fonts (Trump Gothic, Durno).

We borrow patterns only.

---

## 3. Design system v2

### 3.1 Colour tokens

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| teal-950 | #0B2A2C | Footer regional strip, deepest band | White text passes |
| teal-900 | #0F3639 | Header on scroll, footer, dark bands, duotone shadow | White 13.1:1 |
| teal-700 | #165054 | Section titles and headings on white | 9.1:1 on white, 8.4:1 on mist |
| green-600 | #276C4B | The single accent: stats, labels, rules, arrow buttons, links | 6.3:1 on white |
| green-logo | #3E8740 | Logo stroke; large decorative use only | 4.4:1, so never body text |
| yellow-400 | #F7DE4D | Glow accents, tab indicator, highlights on dark only | 9.7:1 on teal-900; fails on white (1.35:1) |
| red-600 | #C93129 | Thin rules, the hero cut line, alerts | White 5.3:1 |
| ink | #141516 | Body text | 18.3:1 |
| slate | #4A5560 | Secondary text, captions, meta lines | 7.6:1 |
| mist | #F4F6F5 | Alternating section background | — |

### 3.2 Type

| Role | Specification |
| --- | --- |
| Hero display | Khand 700, uppercase, clamp(2.75rem, 6vw, 5.25rem), line-height 0.95, tracking 0.02em, white |
| Section title | Khand 700, uppercase, 2.5rem, teal-700, followed by the green rule |
| Label, eyebrow, tile title | Poppins 600, uppercase, 0.8125–0.9375rem, tracking 0.14em; green-600 on light, white on photos |
| Stat number | Khand 700, 4rem, green-600; the label sits beside it in Poppins 500, 0.8125rem, uppercase, slate |
| Card title | Poppins 700, uppercase, 1.0625rem, tracking 0.06em, green-600 |
| Body | Poppins 400, 1rem, line-height 1.8, ink; lead paragraphs 1.125rem |
| Amharic | Noto Sans Ethiopic, line-height 1.7 |

Under `:lang(am)`, switch off `text-transform` and `letter-spacing`. Ge'ez script has no letter case, and tracking breaks it.

### 3.3 Layout and rhythm

- Container 1280px maximum, with 24px gutters (16px below 640px).
- Section padding 96px on desktop, 56px on mobile.
- Alternate white and mist backgrounds, with no more than one dark band in a row.
- Every section title is followed by a 2px green-600 rule that fills the rest of the row. On mobile the rule sits under the title.
- Arrow links read "Read more →" in green-600; the arrow slides 4px on hover.
- Previous and next buttons are round, 44px, green-600 with white chevrons. Their disabled state is 40% opacity.

### 3.4 Signature elements

1. **Map frame.** FSD's logo has three strokes around the wordmark: a yellow chevron on the left, green at the top, red at the lower right. They appear to trace Ethiopia's outline in the flag colours.
   - Build a `<MapFrame>` component. Clip the image with `clip-path: polygon(3% 8%, 55% 0, 100% 6%, 97% 92%, 45% 100%, 0 94%)`.
   - Draw the three strokes around it at 4px, taken from the paths in `assets-src/brand/fsd-logo-colour.svg`.
   - Use it on the hero foreground, the "Our role" image, story heroes and the team page hero. Use no more than two per page.
2. **Duotone.** For low-resolution or busy photos: apply `grayscale(1) contrast(1.1)` with `mix-blend-mode: multiply` over a teal-900 to green-600 gradient. Use it on the hero background, the closing band and portrait resting states.
3. **Angled hero edge.** Use `clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%)`, with a 3px line along the cut fading from red-600 to yellow-400.
4. **Glow indicator.** A short bar with a yellow gradient glow slides under the active hero tab in 300ms. It is static under reduced motion.
5. **Three-stroke watermark.** The strokes alone, very large, at 8% opacity on dark bands.

### 3.5 Motion

- Elements fade and rise 16px when scrolled into view, over 400ms with ease-out, once per element.
- Images scale to 1.04 inside their frame on hover. Portraits go from duotone to full colour on hover and on focus.
- No parallax, no autoplay video, and nothing that moves on its own, with one exception: the hero tabs (4.2).
- **Hero autoplay (WCAG 2.2.2).**
  - The tabs advance every 7 seconds.
  - A visible pause/play button sits beside the tabs.
  - Rotation pauses while a mouse is over the hero's content or tabs, and while the hero is scrolled away or the page is hidden.
  - Rotation stops once keyboard focus enters the hero or the visitor picks a tab; only the button restarts it.
  - It never moves focus. The panels are announced only while rotation is off.
  - Under reduced motion it does not start on its own, but the visitor can press play.
- Every animation is off under `prefers-reduced-motion`.

### 3.6 Image rules

**Sizing**
- Never upscale an image beyond 1.25× its original width. Section 6 lists every original size, and most event photos are only 600×337: they belong in slots up to 600px wide.
- Full-bleed areas use only the skyline panorama (1901×595, always duotoned) or a plain gradient.
- Generate AVIF and WebP at 400, 800, 1200 and 1600px, but never wider than the original.
- Set width and height on every image, lazy-load below the fold, and set `object-position` per image so faces are never cut off.

**Alt text and credits**
- Every image gets alt text describing what it shows. Decorative duotone backgrounds get `alt=""`.
- Editorial images carry the credit "Photo: FSD Ethiopia".

**Real people**
- Staff photos are used only for staff, and cohort photos only on the Board Ready pages.
- Never use a real person's photo or name for fictional applicants, testimonials or quotes. The staff dashboard uses initials avatars.

**No placeholders**
- No grey placeholder boxes anywhere in v2. If an image is missing, use a gradient panel with the three-stroke mark.

---

## 4. Homepage v2, section by section

In every section below, `uploads/` means `https://fsdethiopia.org/wp-content/uploads/`.

### 4.0 Announcement bar
- A green-600 bar with one line of white 14px text.
- It shows the next open opportunity from `opportunities.json`, as "Now open: <title> — closes <date>", linking to `/opportunities`.
- When nothing is open, it reads "See current job and procurement opportunities".
- It can be dismissed.

### 4.1 Header
- Fixed and transparent over the hero, with white text.
- Centred `fsd-logo-reversed.svg`, 72px tall on desktop and 48px on mobile.
- Navigation on the left: Who We Are, Our Work, Insights. On the right: Newsroom, Opportunities, Contact, a search icon and the EN | አማርኛ toggle. A small UK flag sits before EN and an Ethiopian flag before አማርኛ; both are decorative, so the link text stays the accessible name.
- After 80px of scrolling, the background turns teal-900, the logo shrinks to 52px and a soft shadow appears.
- On mobile: logo on the left and a menu button on the right, opening a full-screen teal menu with large Khand items. Below 400px the menu button shows only its icon, and below 360px the "|" separator is dropped, so the flags fit.

### 4.2 Hero
- Height: min(88vh, 820px).
- **Background:** `uploads/2022/06/landing-page-17-1.png` (skyline panorama), duotoned at 40% over a teal-900 to green-600 gradient running left to right.
- **Left column:**
  - Eyebrow: "Financial Sector Deepening Ethiopia".
  - Headline in your own words, for example "Financial markets that work for every Ethiopian".
  - One sentence drawn from the About text.
  - Two buttons: Explore our work, Browse resources.
- **Right column:** a `<MapFrame>` showing the active tab's photo at 640px wide at most.
- **Three tabs along the bottom.** Each tab is a real button with a number and a label, and switching tabs swaps the photo, eyebrow, headline, sentence and buttons:

| Tab | Photo |
| --- | --- |
| 01 Who we are | `uploads/2026/07/1783776109015.jpeg` (Stakeholder Summit 2026, 1080×564) |
| 02 Our work | `uploads/2026/03/FSD-Ethiopia352026.jpg` (Second Climate Finance Summit, 600×337) |
| 03 Work with us | `uploads/2023/03/Our-Tools_-Convening01.jpg` (speaker at an FSD event, 850×602) |

- The yellow glow indicator sits under the active tab, and the hero ends in the angled bottom edge.
- **Autoplay** follows section 3.5. A thin line on the active tab fills over the 7 seconds and pauses with the timer. On phones the pause button sits under the segmented control, so the tab labels keep the full width.
- **Mobile:** the photo sits below the text, the tabs become a segmented control, and the skyline is dropped in favour of the gradient alone, to save weight.

### 4.3 Stats band
- White background. Four stats in a row (2×2 on mobile), each a Khand green number with its label beside it.
- Store them in `figures.json` with their sources:

| Number | Label | Source |
| --- | --- | --- |
| 2022 | Year FSD Ethiopia was established | https://fsdethiopia.org/about-us-2/ |
| 3 | Programme areas | Our Work menu |
| 7 | Regions with FSD regional coordinators | https://fsdethiopia.org/our-team/ |
| 40 | Women in the Board Ready cohorts | https://fsdethiopia.org/cohort/ |

### 4.4 Our role (R-O's split about block)
- The image takes 55% of the width and the text 45%.
- **Image:** a `<MapFrame>` with `uploads/2023/03/Our-Tools_-Technical-Assistance01.jpg` (an agreement signing, 850×602).
- **Text:**
  - Eyebrow: "Who we are".
  - Heading in Poppins 600, uppercase, wide tracking, slate, in your own words, for example "Fixing what holds Ethiopia's financial markets back".
  - One paragraph paraphrasing FSD's role.
  - The link "More about FSD Ethiopia →".

### 4.5 How we work (R-O's values row)
- Title and rule, then a one-line intro.
- Four columns, each with a Lucide icon in a 56px green-600 circle, an uppercase green label, a bold one-line promise and two lines of description:

| Column | Icon |
| --- | --- |
| Technical assistance | wrench |
| Grants | hand-coins |
| Research and data | bar-chart-3 |
| Convening and advocacy | megaphone |

- Source: the homepage About text and https://fsdethiopia.org/about-us-2/.
- Mobile: 2×2, then a single column.

### 4.6 Featured work (R-O's recent work slider)
- Title and rule, with round arrow buttons on the right.
- A manual slider of five items. Each slide has:
  - a large image on the left, 640px wide at most;
  - on the right: an uppercase green title, a slate meta line (date · place), two or three sentences and "Read more →";
  - a second image staggered below the text.
- Accessibility: a region with `aria-roledescription="carousel"`, slides labelled "2 of 5", and keyboard arrow support.

| Item | Large image | Second image | Facts to use |
| --- | --- | --- | --- |
| Second Climate Finance Summit | `uploads/2026/03/FSD-Ethiopia352026.jpg` | `uploads/2026/03/FSD-Ethiopia352026_2.jpg` | 5 March 2026, Addis Ababa; nearly 200 participants; ahead of COP32 |
| Stakeholder Summit: From Inception to Enduring Impact | `uploads/2026/07/1783776109015.jpeg` | none (use a gradient panel) | 9 July 2026 |
| BimaLab Ethiopia insurtech accelerator | `uploads/2024/03/3_7_06_main.jpg` | `uploads/2024/03/3_7_03.jpg` | Demo Day on 7 March 2024; 10 startups and 4 corporates |
| Access to Influence: women's digital financial inclusion | `uploads/2026/03/FSD-31126-1.jpg` | `uploads/2026/03/FSD-31126-2.jpg` | 10 March 2026, International Women's Day dialogue |
| Insurance Industry Workshop | `uploads/2025/11/FSD-Ethiopia11242025.jpg` | `uploads/2025/11/FSD-Ethiopia11242025-01.jpg` | November 2025; insurance penetration below 1% of GDP |

### 4.7 Where we focus (R-O's who we serve)
- Six 4:3 tiles in a 3×2 grid with 2px gaps.
- Each tile is a photo with a teal gradient rising from the bottom, a title in Poppins 600 uppercase white, and two or three sub-lines.
- On hover and focus, the gradient lightens and the three strokes draw in at the top-left corner.
- Mobile: a horizontal scroll-snap row with tiles 80vw wide.

| Tile | Image | Sub-lines | Link |
| --- | --- | --- | --- |
| Financial inclusion | `uploads/2023/03/fin01.jpg` | Digital payments · Agent networks · Open finance | /our-work/financial-inclusion |
| Access to capital | `uploads/2023/03/acctocap01.jpg` | Capital markets · Investor relations · ESX Academy | /our-work/access-to-capital |
| Climate finance | `uploads/2023/03/climate_fina01.jpg` | Green finance instruments · Climate Finance Summit · Islamic climate finance | /our-work/climate-finance |
| Women's economic empowerment | `uploads/2023/03/f_inc_01.jpg` | Board Ready Women · Women's digital finance | /stories/board-ready-women |
| Insurance and innovation | `uploads/2024/03/3_7_02.jpg` | BimaLab accelerator · Insurance market reform | /resources?theme=insurance |
| Research and data | `uploads/2023/03/Our-Tools_-Resources-_-Data01.jpg` | Publications · Data hub | /data |

### 4.8 Data snapshot
- A mist band with title and rule.
- **Left:** two KPI tiles, both from `figures.json` with visible sources:
  - mobile money accounts, 139.5 million in 2025;
  - account ownership, women 42% versus men 57% in 2024.
- **Right:** a Chart.js chart of account ownership by gender.
- A link to `/data`.

### 4.9 Board Ready Women band
- A teal-900 band.
- **Left:** a mosaic of 8 cohort portraits (2 rows of 4) that go from duotone to colour on hover, with the yellow three-stroke watermark behind them. Portrait sources are in section 6.4.
- **Right:**
  - Eyebrow: "Women in leadership".
  - A heading.
  - Text: three rounds of corporate governance training with IFC, with an ESG focus.
  - The stat "40 women in the cohorts".
  - Two buttons: "Read the story" and "Meet the cohort".

### 4.10 The people behind the work
- Title and rule, plus the link "Meet the full team →".
- Six 2:3 portrait cards that go from duotone to colour on hover and focus. The name is in Khand uppercase 1.5rem and the role in Poppins 500 slate.
- The six people, spelled as on the team page: Hikmet Abdella, Abel Tadelle, Gosaye Warsa, Selamsew Tesfaye, Sinidu Fikadu and Bezawit Eshetu. Photos are in section 6.2.
- Desktop shows six across, or 3×2. Mobile uses a horizontal scroll.

### 4.11 Latest (R-O's news slider)
- Title and rule, with round arrow buttons.
- Three tabs: News | LinkedIn | X. The LinkedIn and X tabs show embed slots labelled "Live feed embeds here".
- **News cards** sit side by side and peek off the right edge. Each has the image on the left (40%); on the right: the date in small slate caps, the title in uppercase green, a two-line excerpt, the author's avatar (from section 6.2 when the author is on staff) and "Read more →".
- Posts and images are in section 6.6.

### 4.12 Latest publications
- A mist band with four square covers (1920×1920 originals, shown at about 300px).
- Each shows its title and a "Download PDF" button, followed by a link to the library.
- Sources are in section 6.7.

### 4.13 Opportunities
- Two large cards side by side, each a photo with a teal overlay showing the number of open listings and the next deadline from `opportunities.json`, plus a button.
- **Careers** uses `uploads/2024/03/3_14_06_main.jpg`; **Procurement** uses `uploads/2025/02/fsd_ethiopia_992025.jpg`.

### 4.14 Closing band (R-O's skyline moment)
- Full width, 420px tall on desktop.
- The skyline `uploads/2022/06/landing-page-17-1.png`, duotoned teal to green, with a huge three-stroke watermark and the centred reversed logo.
- **Tagline:** FSD's own homepage statement about building innovative, inclusive and sustainable financial markets. Fetch the exact line from the homepage slider.
- Two buttons:
  - "Subscribe to our newsletter", which opens the Mailchimp signup with its unticked consent box.
  - "Contact us".
- The band flows seamlessly into the footer in the same teal-900.

### 4.15 Footer
- Teal-900 background.
- **Top row:** the reversed logo, the tagline and a Contact button.
- **Link columns:** Who We Are, Our Work, Insights, Newsroom, Opportunities, and Contact (comms@fsdethiopia.org, +251 9 93969696, Mon–Fri 8:30–17:00).
- **Social links:** LinkedIn, X, Facebook.
- **Partner row:** FSD Network, Gates Foundation, UK International Development and FSD Africa logos, shown in white monochrome via a CSS filter. Keep the originals if the filter makes one illegible.
- **Regional strip:** a teal-950 rounded band titled "Regional coordination", with map-pin icons for Afar, Amhara, Benishangul Gumuz, Gambella, Oromia, Sidama and Somali.
- **Legal row:** © 2026 FSD Ethiopia · Privacy · Accessibility statement · Cookie settings.

---

## 5. Inner pages v2

Keep all v1 functionality. Each page gains imagery from section 6.

### About (`/about`)
- A hero with a `<MapFrame>` showing the Stakeholder Summit photo.
- Mission and vision.
- The four ways of working, using the three `Our-Tools_` images.
- Funder and incubator logos, and the FSD Network.
- The three board portraits.
- A link to the team page.

### Team (`/about/team`) — new, must build
- Filter tabs: Leadership | Programmes | Operations | Regional coordinators | Board.
- A grid of duotone portraits, four across on desktop and two on mobile.
- A card opens a dialog with a larger portrait, the role and "[Bio to be supplied by FSD Ethiopia]".
- Regional coordinators also appear on a map of Ethiopia with their seven regions highlighted. Selecting a region shows that coordinator's card.
- Names and roles exactly as in section 6.

### Programme pages
- The hero is the programme image inside a `<MapFrame>`:

| Programme | Hero image | Programme contact |
| --- | --- | --- |
| Financial Inclusion | `fin01.jpg` | Abel Tadelle |
| Access to Capital | `acctocap01.jpg` | Gosaye Warsa |
| Climate Finance | `uploads/2023/02/climate_finance2.jpg` (857×400) | Bezawit Eshetu |

- Add the featured work slider filtered by programme, related publications with covers, and related news cards.
- A "Programme contact" card shows the portrait of the lead whose title matches. Mark this card "Confirm with FSD".

### Board Ready Women story
- A hero mosaic of cohort portraits.
- A gallery from the March 2025 and March 2026 Women's Day events.
- A cohort grid showing name and photo for all 40 members.
- Quote slots stay as placeholders.

### Resource library
- Real covers. The 2026 covers are 1920×1920; the older covers are 328×322, so show those no wider than 300px.
- Cards lift slightly on hover.

### Newsroom (`/news`)
- Image cards with author avatars.
- A filter by type: Blog, Press release, Event.

### Data hub
- A hero band using the skyline duotone.
- The charts and map from v1.

### Opportunities, application and staff pages
- A header image band using `3_14_06_main.jpg`.
- Forms are unchanged.
- The staff dashboard uses initials avatars only, never real photos.

### Privacy
- No photos. Use the three-stroke mark as illustration.

---

## 6. Asset manifest

Verified on 13 October 2026. All files are on `https://fsdethiopia.org/wp-content/uploads/` unless noted, written below as `uploads/`. Sizes are the original pixel dimensions.

All images belong to FSD Ethiopia. Use them only in this pitch prototype, and keep the staging site `noindex`.

### 6.1 Brand

| Asset | Source | Size | Use |
| --- | --- | --- | --- |
| `fsd-logo-reversed.svg` | Delivered with this brief: vector paths taken from the ToR PDF, white wordmark | vector | Header over the hero, footer, dark bands |
| `fsd-logo-colour.svg` | Delivered with this brief: same paths, wordmark in #165054. Confirm the official colour at inception | vector | Light backgrounds |
| Official logo PNG | `uploads/2022/06/logo2022_1.png` | 721×503 | Reference only |
| Logo on teal | `uploads/2022/06/FSD-Ethiopia.jpg` | 600×337 | Social card fallback |
| App icon | `uploads/2022/06/cropped-android-chrome-512x512-1.png` | 512×512 | Favicon, apple-touch-icon |
| FSD Network logo | `uploads/2022/06/fsd-network-logo.png` | 417×200 | Footer |
| Gates Foundation logo | `uploads/2022/06/bill_color2022.png` | 303×205 | Funders strip, 150px wide at most |
| UK International Development logo | `uploads/2024/04/UK_International_Development_logo.png` | 793×235 | Funders strip |
| FSD Africa logo (incubator) | `uploads/2022/06/fsd_color2022fsd.jpg` | 303×205 | Funders strip, 150px wide at most |

Logo colours from the vector file: yellow #F7DE4D, green #3E8740, red #C93129.

### 6.2 People: staff

Source: https://fsdethiopia.org/our-team/. Portraits are 1400×2100 unless noted, and most were shot against FSD's branded teal wall. Use names and roles exactly as below.

| Name | Role, as published | Group | Photo |
| --- | --- | --- | --- |
| Hikmet Abdella | Chief Executive Officer | Leadership | `uploads/2025/10/Hikmet_Abdella-min.jpg` |
| Abel Tadelle | Dir. of Financial Inclusion | Leadership | `uploads/2025/10/Abel_Taddele.jpg` |
| Selamsew Tesfaye | Dir. of Operations & Finance | Leadership | `uploads/2025/10/Selamsew_Tesfaye.jpg` |
| Gosaye Warsa | Dir. of Financial Markets | Leadership | `uploads/2025/10/Gosaye_Warsa-min.jpg` |
| Barnabas Getu | Head of Audit, Risk & Compliance | Leadership | `uploads/2025/10/Barnabas_Getu2.jpg` |
| Melaku Kebede | Program Manager – Financial Inclusion – Project Management Office | Programmes | `uploads/2025/10/Melaku_Kebede-min.jpg` |
| Sinidu Fikadu | Gender Lead | Programmes | `uploads/2025/10/Sinidu_Fikadu.jpg` |
| Bezawit Eshetu | Climate Finance Lead | Programmes | `uploads/2026/10/Bezawit.jpg` (625×938) |
| Berhanu Alene | Development Impact Manager | Programmes | `uploads/2026/07/berhanu.png` |
| Nurhassen Mensur | Technical Lead – Financial Services Deepening | Programmes | `uploads/2025/10/Nurhassen_Mensur2.jpg` |
| Hanna Leykun | Technical Lead – Financial Service Scaling | Programmes | `uploads/2025/10/Hanna_Leykun2.jpg` |
| Hanna Hailu | Gender Expert | Programmes | `uploads/2025/10/Hanna_Hailu-min.jpg` |
| Dawit Alem | Financial Market Coordinator | Programmes | `uploads/2025/10/Dawit_Alem2.jpg` |
| Afomia Kassa | Financial Inclusion Coordinator | Programmes | `uploads/2025/10/Afomia_Kassa-min.jpg` |
| Samson Berhane | Comm. & Advocacy Specialist | Programmes | `uploads/2025/10/Samson_Berhane-min.jpg` |
| Yosef Kefyalew | Communications Officer | Programmes | `uploads/2026/07/yosef-03.png` |
| Eden Afework | Programme Assistant | Programmes | `uploads/2025/10/Eden_Afework-min.jpg` |
| H/Mariam Misganaw | Finance Manager | Operations | `uploads/2025/10/Hailemariam_Misganaw-min.jpg` |
| Tazezew Abrha | Senior Finance Officer | Operations | `uploads/2026/07/tazezew.png` |
| Meron Dereje | Finance Assistant | Operations | `uploads/2026/07/meron.jpg` (625×938) |
| Rahel Taddese | Senior Procurement Officer | Operations | `uploads/2025/10/Rahel_Taddese-min.jpg` |
| Ruth Zemene | Senior HR & Admin Officer | Operations | `uploads/2025/10/Ruth_Zemene-min.jpg` |
| Agare Kassahun | Senior Executive Assistant | Operations | `uploads/2025/10/Agare_Kassahun-min.jpg` |
| Shalom Alemayehu | Admin Assistant | Operations | `uploads/2025/10/Shalom_Alemayehu-min.jpg` |
| Abebayehu Milkias | Logistics Assistant | Operations | `uploads/2025/10/Abebayehu_Milkias-min.jpg` |

The Leadership, Programmes and Operations groups are our own grouping, based on job titles.

Spelling differs between pages:
- The team page has "Abel Tadelle", "Sinidu Fikadu" and "Hanna Hailu".
- Blog bylines have "Abel Taddele", "Sinidu Fekadu" and "Hana Hailu".

Use the team page spellings on team pages and bylines as published. List the inconsistency in the content audit.

### 6.3 People: regional coordinators and board

| Name | Role | Photo | Size |
| --- | --- | --- | --- |
| Tadesse Hailu | Regional Coordinator, Benishangul Gumuz | `uploads/2025/10/Tadesse_Hailu.jpg` | 1400×2100 |
| Okello Oluch | Regional Coordinator, Gambella | `uploads/2025/10/Okello_Oluch.jpg` | 1400×2100 |
| Aklilu Tukela | Regional Coordinator, Sidama | `uploads/2025/10/Aklilu_Tukela.jpg` | 1400×2100 |
| Mubarak Ahmed | Regional Coordinator, Somali | `uploads/2025/10/Mubarak_Ahmed.jpg` | 1400×2100 |
| Ahmed Mohammed | Regional Coordinator, Afar | `uploads/2025/10/Ahmed_Mohammed.jpg` | 1400×2100 |
| Abinet Belay | Regional Coordinator, Amhara | `uploads/2025/10/Abinet_Belay.jpg` | 1400×2100 |
| Dr. Fekadu Mekonnen | Regional Coordinator, Oromia | `uploads/2026/08/DR.Fekadu-Mekonnen.jpg` | 1000×1448 |
| Admassu Tadesse | Board Chairman | `uploads/2020/02/members-11.png` | 860×1062 |
| Berhane Demissie | Non-Executive Director | `uploads/2020/02/members-12.png` | 859×1062 |
| Maleda Bisrat | Non-Executive Director | `uploads/2020/02/members-13.png` | 860×1062 |

Fetch the board members' affiliations from the team page.

### 6.4 People: Board Ready Women cohort

https://fsdethiopia.org/cohort/ lists 40 women, each with a portrait. The page shows `-683x1024` versions. The 1400×2100 originals sit at the same URL without that suffix, for example `uploads/2025/08/Mehret-photo.jpg`, `uploads/2025/08/Hiwot-Yohannes.jpg`, `uploads/2025/08/Selamawit-Bekele-pic.jpg` and `uploads/2025/11/Kokeb.jpg`, all verified.

To collect them:
1. Fetch the page and take each member's name and photo URL.
2. Strip the suffix to get the original.
3. If the original returns 404, fall back to the suffixed file.

Use only names and photos. Do not reuse the email addresses or bios shown on the page.

### 6.5 Event and programme photography

| Subject | Date | File | Size | Best use |
| --- | --- | --- | --- | --- |
| Stakeholder Summit, group on stage | 9 Jul 2026 | `uploads/2026/07/1783776109015.jpeg` | 1080×564 | Hero tab 1, featured work, About hero |
| Global Islamic Climate Finance Alliance roundtable, Baku | Jun 2026 | `uploads/2026/06/WhatsApp-Image-2026-06-26-at-2.41.54-PM-1.jpeg` | 960×647 | Climate Finance page, news |
| Second Climate Finance Summit, group | 5 Mar 2026 | `uploads/2026/03/FSD-Ethiopia352026.jpg` | 600×337 | Hero tab 2, featured work |
| Second Climate Finance Summit, plenary | 5 Mar 2026 | `uploads/2026/03/FSD-Ethiopia352026_2.jpg` | 600×337 | Featured work, second image |
| Access to Influence, women leaders panel | 10 Mar 2026 | `uploads/2026/03/FSD-31126-1.jpg` | 600×337 | Featured work, story gallery |
| Access to Influence, more photos | 10 Mar 2026 | `uploads/2026/03/FSD-31126-2.jpg`, `uploads/2026/03/FSD-31126-3.jpg` | 600×337 | Story gallery |
| Insurance Industry Workshop | Nov 2025 | `uploads/2025/11/FSD-Ethiopia11242025.jpg`, `-01.jpg`, `-02.jpg` | 600×337 | Featured work, news |
| Greening capital markets (green hills) | Aug 2025 | `uploads/2025/08/FSD_Ethiopia_A2025_Greening.jpg` | 600×337 | Climate Finance, news |
| Unlocking Potentials, Women's Day group | Mar 2025 | `uploads/2025/03/FSD_Ethiopia_A2025.jpg` | 600×337 | Story gallery |
| First Climate Finance Summit, group | Feb 2025 | `uploads/2025/02/fsd_ethiopia_992025.jpg` | 600×337 | Procurement card, news |
| ESX Academy launch, group | Feb 2025 | `uploads/2025/02/fina_sec_26.jpg` | 600×337 | Access to Capital, news |
| FSD and Finequity Africa convening, speaker | Mar 2024 | `uploads/2024/03/3_14_06_main.jpg` | 600×337 | Careers card, opportunities band |
| BimaLab Demo Day, cohort group | 7 Mar 2024 | `uploads/2024/03/3_7_06_main.jpg` | 600×337 | Featured work |
| BimaLab Demo Day gallery | 7 Mar 2024 | `uploads/2024/03/3_7_01.jpg` to `3_7_05.jpg` | 600×337 | Tiles, gallery |
| ESX rulebook collaboration meeting | Oct 2023 | `uploads/2023/10/fsdnews004.jpg` | 600×337 | News |
| Financial inclusion: woman using a phone | — | `uploads/2023/03/fin01.jpg` | 850×602 | Tile, programme hero |
| Access to capital: card payment | — | `uploads/2023/03/acctocap01.jpg` | 850×602 | Tile, programme hero |
| Climate finance: cattle grazing | — | `uploads/2023/03/climate_fina01.jpg` | 850×602 | Tile |
| Climate Finance page banner | — | `uploads/2023/02/climate_finance2.jpg` | 857×400 | Programme hero |
| Women at work, garment workshop | — | `uploads/2023/03/f_inc_01.jpg` | 737×513 | Women's empowerment tile |
| Our tools: agreement signing | — | `uploads/2023/03/Our-Tools_-Technical-Assistance01.jpg` | 850×602 | Our role, About |
| Our tools: research and data | — | `uploads/2023/03/Our-Tools_-Resources-_-Data01.jpg` | 850×602 | Research tile, About |
| Our tools: speaker at an event | — | `uploads/2023/03/Our-Tools_-Convening01.jpg` | 850×602 | Hero tab 3, About |
| City skyline panorama (likely Addis Ababa; confirm) | — | `uploads/2022/06/landing-page-17-1.png` | 1901×595 | Hero background, closing band, duotone only |
| City skyline | — | `uploads/2022/06/about_us2022.jpg` | 732×454 | About page |

### 6.6 News and blog images

All post URLs are listed on https://fsdethiopia.org/our-events/.

| Post | Date | Byline | Card image | Size |
| --- | --- | --- | --- | --- |
| Gender Integration as a Market Systems Strategy | 21 Jul 2026 | Sinidu Fekadu | `uploads/2026/07/tumbnaile-11-scaled.jpg` | 2560×1280; a designed graphic with title text, so never place other text over it |
| Ethiopia's Open Finance Future Is Closer Than It Looks | 20 Jul 2026 | Abel Taddele | `uploads/2026/07/blog.jpg` | 1680×848; graphic with text |
| From Inception to Enduring Impact | 17 Jul 2026 | — | `uploads/2026/07/1783776109015.jpeg` | 1080×564 |
| FSD Ethiopia Joins Hands Through Global Islamic Climate Finance Alliance | 27 Jun 2026 | — | `uploads/2026/06/WhatsApp-Image-2026-06-26-at-2.41.54-PM-1.jpeg` | 960×647 |
| India's DPI Flywheel: From Payment Rails to the Last Mile | 8 May 2026 | Abel Taddele | `uploads/2026/05/article-5.png` | 600×337 |
| The Digital East | 8 May 2026 | Abel Taddele | `uploads/2026/05/article-4_1_600x337.png` | 600×337 |
| Growing Ethiopia's Insurance Market | 26 Mar 2026 | Abel Taddele | `uploads/2026/03/FSD-Ethiopia_blog7.jpg` | 600×337 |
| Designing Digital Finance Markets That Work for Women | 26 Mar 2026 | Sinidu Fekadu and Hana Hailu | `uploads/2026/03/FSD-Ethiopia_blog8.jpg` | 600×337 |
| Access to Influence (press release) | 11 Mar 2026 | — | `uploads/2026/03/FSD-31126-1.jpg` | 600×337 |
| Second Climate Finance Summit (press release) | 5 Mar 2026 | — | `uploads/2026/03/FSD-Ethiopia352026.jpg` | 600×337 |
| Insurance Industry Workshop | 21 Nov 2025 | — | `uploads/2025/11/FSD-Ethiopia11242025.jpg` | 600×337 |
| Greening Ethiopia's Capital Markets | 27 Aug 2025 | — | `uploads/2025/08/FSD_Ethiopia_A2025_Greening.jpg` | 600×337 |
| Unlocking Women's Potential Through Finance and Capital Markets | 4 Mar 2025 | — | `uploads/2025/03/FSD_Ethiopia_A2025.jpg` | 600×337 |
| First Annual Climate Finance Summit | 19 Feb 2025 | — | `uploads/2025/02/fsd_ethiopia_992025.jpg` | 600×337 |
| ESX Academy launches with FSD Ethiopia's support | 19 Feb 2025 | — | `uploads/2025/02/fina_sec_26.jpg` | 600×337 |
| BimaLab Ethiopia Demo Day | 7 Mar 2024 | — | `uploads/2024/03/3_7_06_main.jpg` | 600×337 |

### 6.7 Publication covers and PDFs

PDFs sit on `https://fsdethiopia.org/wp-content/pdf/`, written below as `pdf/`.

| Publication | Cover | Size | PDF |
| --- | --- | --- | --- |
| Landscape of Climate Finance in Ethiopia (2026) | `uploads/2026/08/FSDE-Landscape-of-Climate-Finance-in-Ethiopia.jpg` | 1920×1920 | `pdf/Landscape-of-Climate-Finance-in-Ethiopia%20%281%29.pdf` |
| Feasibility of Green and Sustainable Finance Instruments in Ethiopia | `uploads/2026/08/FSDE-Scoping-Study-Report-Feasibility-of-Green-and-Sustainable-Finance-Instruments-in-Ethiopia.jpg` | 1920×1920 | `pdf/Scoping%20Study%20Report%20-%20Green%20Financial%20Instruments%20in%20Ethiopia-%20ECMA-FSD%20Ethiopia%20%281%29.pdf` |
| National Agricultural Finance Implementation Roadmap 2025–2030 | `uploads/2026/08/FSDE-National-Agriculture-Finance-Implementation-RoadmapNAFIR.jpg` | 1920×1920 | `pdf/National%20Agricultural%20Finance%20Implementation%20Roadmap%20%282025%3D2030%29_C.pdf` |
| Unlock Capital Markets to Advance Women's Economic Participation and Leadership | `uploads/2026/08/FSDE-Unlock-Capital-Markets-to-Advance-Womens-Economic-Participation-Leadership-Ethiopia-Finance-in-Ethiopia.jpg` | 1920×1920 | `pdf/FSDE_Booklet_952025.pdf` |
| Unlocking Potentials: financial inclusion and capital markets for women's economic empowerment | `uploads/2026/08/FSDE-Unlocking-Potentials-financial-inclusion-and-capital-market-for-women-economic-empowerment.jpg` | 1920×1920 | `pdf/Unlocking%20potential%20Report_Final_Com.pdf` |
| Cash-In Cash-Out Agent Mapping Strategy | `uploads/2026/08/FSDE-Enabling-Sustainable-Digital-Payment-Agent-Network-Expansion-by-Leveraging-and-Supporting-Viable-Business-Cases.jpg` | 1920×1920 | `pdf/CICO-Agent-Mapping-Strategy_NBE%20%281%29_C.pdf` |
| Mobile Money in Ethiopia | `uploads/2026/08/FSDE-Mobile-money-in-ethiopia_2.jpg` | 1920×1920 | `pdf/Financial%20Sector%20Deepening%20Ethiopia%20Blog%20_%20Mobile%20Money%20in%20Ethiopia.pdf` |
| National Financial Inclusion Strategy (NBE) | `uploads/2026/08/FSDE-National-Financial-Inclusion-Strategy.jpg` | 1920×1920 | `pdf/ethiopian-national-financial-Inclusion-strategy.pdf` |
| Climate Finance Summit workshop report | `uploads/2026/08/FSDE-Climate-Finance-Summit-2024.jpg` | 1920×1920 | `pdf/Communications%20and%20Advocacy%20-%20Financial%20Market-%202.pdf` |
| National Digital Payments Strategy 2021–2024 (NBE) | `uploads/2023/02/rc02.jpg` | 328×322 | `pdf/Ethiopia_National_Digital_Payment_Strategy_2021-2024.pdf` |
| Plan of Action for Job Creation | `uploads/2023/03/rc006.jpg` | 328×322 | `pdf/National-Plan-for-Job-Creation-Brief.pdf` |
| A Homegrown Economic Reform Agenda | `uploads/2023/03/rc001.jpg` | 328×322 | `pdf/a_homegrown_economic_reform_agenda-_a_pathway_to_prosperity_-_public_version_-_march_2020-%20%281%29.pdf` |
| Ten Years Development Plan | `uploads/2023/03/rc003.jpg` | 328×322 | `pdf/ten_year_plan_popular_version.pdf` |
| Ethiopia: Improving Ease of Doing Business | `uploads/2023/03/rc0006.jpg` | 328×322 | `pdf/Improving_Ease_of_Doing_Business_jull23.pdf` |

Newsletters, three issues from 2023–24 with no cover images: see https://fsdethiopia.org/newsletters/. Show them as text cards with the three-stroke mark.

---

## 7. Getting the assets into the project

1. Copy `fsd-logo-reversed.svg` and `fsd-logo-colour.svg` into `assets-src/brand/`.
2. Create `assets/manifest.json` from the tables in section 6. Each entry needs: id, group, url, original width and height, intended uses, credit ("Photo: FSD Ethiopia") and a draft alt text describing what the image shows.
3. Write `scripts/fetch-assets.mjs`:
   - Download every manifest URL into `assets-src/<group>/`.
   - Skip files that already exist.
   - Collect the cohort originals as described in section 6.4.
   - Print a summary of any failures.
4. Write `scripts/optimise-images.mjs` using **sharp**, which is approved as a v2 dev dependency:
   - Output AVIF and WebP at 400, 800, 1200 and 1600px, never wider than the original, into `public/images/`.
   - Write `src/data/images.json` with the variants, width, height, alt, credit and a chosen `objectPosition` for each image.
5. Performance budget:
   - Homepage first load at 1440px: 1.5 MB or less.
   - Hero LCP image: preloaded, AVIF, 200 KB or less.
   - Everything below the fold is lazy-loaded.

---

## 8. Rules carried over from v1 (still binding)

**Stack.** Astro (static), Tailwind CSS, Alpine.js, Chart.js, Leaflet, Fuse.js and Lucide; sharp is added as a dev dependency. Data lives in `src/data/*.json` and interface text in `src/i18n/en.json` and `am.json`, always through `t()`. Ask before adding anything else.

**Honest content.**
- Never invent statistics. Every number is sourced in `figures.json`, or labelled "Illustrative data".
- Quote slots read "[Quote to be supplied by FSD Ethiopia]" and unsourced results read "To be supplied".
- Fetch content from fsdethiopia.org and rewrite it for the web; don't paste long passages.

**Amharic.**
- Amharic covers navigation, buttons, hero text and headings only.
- The toggle note reads "Amharic sample – final copy supplied by FSD Ethiopia".
- Every Amharic string is flagged for review by a native speaker.

**Accessibility (WCAG 2.1 AA).**
- Landmarks, one h1 per page and a logical heading order, plus a skip link.
- Contrast of at least 4.5:1, using the section 3.1 table, and visible focus rings.
- Keyboard-operable menus, tabs, sliders and dialogs, with labels on every input.
- No meaning carried by colour alone, and `prefers-reduced-motion` respected.

**Performance.**
- A Lighthouse score of 90 or more in all four categories.
- No autoplay video, and no carousel that moves on its own except the hero tabs (3.5).
- No horizontal scroll at 390, 768, 1280 or 1440px.

**Consent and forms.**
- The cookie banner offers Accept, Reject and Preferences, with Reject as prominent as Accept. Analytics load only after consent.
- Every form collects only necessary fields and states its purpose.
- Every form has an unticked consent checkbox linked to the privacy notice.
- Every form shows "[retention period to be confirmed]" and a CAPTCHA placeholder.

**Staff pages.**
- Two-factor authentication.
- Roles: Admin, HR reviewer, Procurement reviewer, Editor.
- An audit log.
- The rule "AI suggests, people decide".
- Demo data: fictional applicants only, with initials avatars and no real photos or names.

**SEO.**
- A unique title, meta description and Open Graph tags on every page.
- Schema.org markup: Organization, Article, JobPosting.
- `noindex` on staging.

**Working style.**
- Build one page per request.
- After each page:
  1. Run the build and fix errors.
  2. Take Playwright screenshots at 1440 and 390px.
  3. List the ToR clauses the page covers.
  4. Update `CHANGELOG.md`.

---

## 9. Build order for v2: one request each

Copy each line into Claude Code in turn.

1. **Assets:** "Do section 7 of CLAUDE.md: manifest, fetch script and optimise script. Run them and show me the failure summary."
2. **Design system:** "Apply section 3. Update the Tailwind tokens and type scale. Build MapFrame, Duotone, SectionTitle, ArrowButton, StatBand, ImageTile, PortraitCard, NewsCard and a manual Slider. Update /styleguide to show all of them, then screenshot it."
3. **Global chrome:** "Build sections 4.0, 4.1, 4.14 and 4.15: announcement bar, header, closing band and footer with the regional strip. Screenshot in English and Amharic."
4. **Homepage:** "Rebuild the homepage, sections 4.2 to 4.13, with the exact images listed. Check that no image is upscaled more than 1.25×. Screenshot at 1440 and 390px."
5. **About and team:** "Build /about and /about/team from section 5, with the regional coordinator map."
6. **Programmes and story:** "Restyle the three programme pages and the Board Ready Women story from section 5, including the cohort grid from section 6.4."
7. **Insights:** "Restyle /resources, /news and /data with the real covers and images."
8. **Opportunities:** "Restyle /opportunities, /opportunities/apply and the staff pages. No real photos on staff pages."
9. **QA:**
   - "Run the v1 QA pass, plus an image audit: no placeholders, alt text everywhere, no upscaling beyond 1.25×, and the homepage within budget."
   - "Regenerate screenshots/homepage-annotated.png, with callouts mapped to ToR clauses, and screenshots/homepage-devices.png."

---

## 10. Definition of done (v2)

- [ ] Every page shows real FSD imagery, with no grey placeholders.
- [ ] The homepage follows section 4 in order and works at 390, 768, 1280 and 1440px.
- [ ] Hero tabs, sliders and dialogs work with a keyboard and respect reduced motion; hero autoplay can be paused and stops on focus.
- [ ] Team names and roles match section 6 exactly; no real person appears in fictional content.
- [ ] Every number is sourced or labelled "Illustrative data"; no invented quotes.
- [ ] axe reports no serious or critical issues; Lighthouse is 90 or more; the homepage is within the 1.5 MB budget.
- [ ] Nothing from r-o.com was copied: patterns only.
