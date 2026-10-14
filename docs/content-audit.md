# Content audit: v2 homepage

Status on 13 October 2026. Every fact below was checked against the live fsdethiopia.org page that is its source. `src/data/figures.json` records the wording found (`quote`) and the date checked (`verifiedOn`) for each figure.

## Photos and assets

- All 98 manifest images and the 40 Board Ready cohort portraits were downloaded from fsdethiopia.org. Every original matches the size listed in CLAUDE.md section 6 (`assets-src/fetch-report.json`).
- Alt text was written after looking at each photo. Four news images the brief treated as title graphics are photos: India's DPI Flywheel, The Digital East, Growing Ethiopia's Insurance Market, and Designing Digital Finance Markets That Work for Women.
- The originals are not committed (`npm run assets:fetch` restores them); the AVIF/WebP copies in `public/images/` are.
- Still to confirm: the skyline panorama (`landing-page-17-1.png`) is probably Addis Ababa.

## Figures

| Figure | What we show | Status and source wording |
| --- | --- | --- |
| Year established | 2022 | Verified. About us: "Established in 2022, FSD Ethiopia is an agency that aims to support…". The ToR uses the same sentence. |
| Programme areas | 3 | Verified. The Our Work menu lists Financial Inclusion, Access to Capital and Climate Finance. |
| Regions with coordinators | 7 | Verified on Our team: Afar, Amhara, Benishangul Gumuz, Gambella, Oromia, Sidama, Somali. |
| Board Ready cohort | 40 women | Verified by count: the cohort page has 40 member cards but states no total. |
| Board Ready training | Three rounds with IFC, ESG focus | Verified on About our Board Ready Program. |
| Mobile money accounts | 139.5 million, June 2025 | Verified. "Designing Digital Finance Markets That Work for Women" cites NBE's Digital Payments Strategy 2026–2030; the month is from the open finance blog ("over 139.50 million by June 2025"). The NBE strategy is a draft and counts accounts, not people. |
| Account ownership | Women 42%, men 57%, all adults 49% (Global Findex 2025) | Verified. The gender blog says "In 2024, 42 percent of women owned an account, compared with 57 percent of men"; another post cites the same split to "Global Findex 2025". The open finance blog gives 35% (2017) to 49% (2025). We now label all three "Global Findex 2025". The 46% (2021) we had shown is not on the site and was removed. |
| Second Climate Finance Summit | 5 March 2026, nearly 200 participants, "Landscape to Legacy" theme | Verified on the press release. |
| BimaLab | 10 startups and 4 corporates, Demo Day 7 March 2024 | Verified on FSD's post. Shega reports 11 startups. |
| Insurance workshop | 11 November 2025; more than 150 participants; premiums up about half; penetration below 1% of GDP | Verified. The workshop post gives the date and the penetration figure; the participant count and premium growth are in "Growing Ethiopia's Insurance Market". The homepage now shows the exact date. |
| ECMA board guideline | Minimum 30% women on issuers' boards | Verified in `FSD_call_to_action.pdf`, which calls it a draft guideline. Not shown on the homepage. |

Removed from `figures.json` because the cited source does not contain them, and nothing displayed them:
- women's and men's digital payment use (13% / 26%);
- women holding 15% of bank board seats (World Bank 2024, said to be quoted on the Board Ready page).

## Names and spelling

| Item | Team page | Elsewhere | We use |
| --- | --- | --- | --- |
| Director of Financial Inclusion | Abel Tadelle | Bylines: Abel Taddele | Portrait: Abel Tadelle; bylines as published |
| Gender Lead | Sinidu Fikadu | Bylines: Sinidu Fekadu | Portrait: Sinidu Fikadu; bylines as published |
| Gender Expert | Hanna Hailu | Byline: Hana Hailu | Byline as published |
| Oromia coordinator | DR.Fekadu Mekonnen | — | Dr. Fekadu Mekonnen |
| Board titles | Only the Chairman has a title; the section heading is "Our Non-Executive Board of Directors" | — | "Non-Executive Director", as in the brief |
| Board chair | "Board Chairman" | Inception post: "Board Chairperson" | Board Chairman |

Board affiliations match the team page exactly, and Maleda Bisrat is on the current board.

## Funder naming

- The live site shows the UK funder only as the `UK_International_Development_logo.png` logo.
- The July 2026 Stakeholder Summit post says "UK FCDO"; the 2022 launch said "UK aid".
- Our copy says "the UK's Foreign, Commonwealth & Development Office", with the UK International Development logo in the footer. Confirm the preferred wording with FSD.
- The Gates funder is "Gates Foundation" in 2026 posts and "Bill and Melinda Gates Foundation" in 2024.

## Issues on the live site (input for the migration content audit)

- `/contact-us/` still contains template placeholder text ("Lorem ipsum…"). The menu's Contact Us uses `/contact-us-2/`.
- The footer reads "© FSD Ethiopia 2024".
- The funder logos on the homepage and Our funders page have empty alt text, so screen readers skip the funders.
- The Access to Influence release lives at a slug copied from the climate summit post (`…/2026/03/11/fsd-ethiopia-hosts-second-climate-finance-summit-ahead-of-cop32-2/`). Its title is missing a space ("FinancialInclusion").
- The insurance workshop post calls the event both "two-day" and "half-day".
- Work with us has three entry points: `/work-with-us/` hub, `/work-with-us-2/` jobs, `/call-for-applications/` (no active calls).
- Several pages use numbered duplicate slugs (`about-us-2`, `our-work-2/3/4`, `contact-us-2`), which the redirect map will need to cover.

## Opportunities on 13 October 2026

- Procurement, open:
  - "Strengthening Investor Relations Capacity Among Listed, OTC-Traded, and Prospective Public Companies in Ethiopia's Capital Market", closes 14 October 2026;
  - "Website Redesign for FSD Ethiopia", closes 16 October 2026.
- Jobs: none open. The Program Support internship closed on 2 October 2026.
- Open or closed is re-checked in the visitor's browser. Checked with the clock set to 14, 16 and 17 October: after the 16th the bar reads "See current job and procurement opportunities" and both cards show no open listings.

## Links

- India's DPI Flywheel and Access to Influence now link to their own posts. The previous links went to the archive and category pages.

## Copy written for the prototype

- Our own wording, paraphrased from FSD sources: hero headlines, How we work promises, featured-work summaries and news excerpts.
- The tagline "We help build innovative, inclusive, and sustainable financial markets for all." is FSD's own, checked on the homepage slider.
- All Amharic strings are samples flagged for native-speaker review.
