# Content audit: v2 homepage

Status on 13 October 2026. fsdethiopia.org could not be reached from the build environment (DNS blocked), so every fact below came from search-engine results for FSD Ethiopia's own pages, checked where possible by a second, independent search. Each item needs a check against the live site before the proposal is submitted. Figures stay `verified: false` in `src/data/figures.json` until then.

## Photos and assets

- **No photos are in the build yet.** All 98 manifest images and the cohort page failed to download (`ENOTFOUND`); see `assets-src/fetch-report.json`. Every slot shows the brief's fallback (gradient panel with the three-stroke mark).
- To fix: on a machine that can reach fsdethiopia.org, run `npm run assets` (fetch, then optimise), check `npm run audit:images`, commit `public/images/` and `src/data/images.json`.
- The skyline panorama (`landing-page-17-1.png`) is described as "likely Addis Ababa; confirm".

## Names and spelling

| Item | Team page | Elsewhere | Used on the homepage |
| --- | --- | --- | --- |
| Director of Financial Inclusion | Abel Tadelle | Blog bylines: Abel Taddele | Portrait card: Abel Tadelle; bylines: Abel Taddele |
| Gender Lead | Sinidu Fikadu | Blog bylines: Sinidu Fekadu | Portrait card: Sinidu Fikadu; bylines: Sinidu Fekadu |
| Gender Expert | Hanna Hailu | Blog bylines: Hana Hailu | Byline: Hana Hailu |
| BimaLab winner | "Ekub" (FSD) | "Equb" (Shega) | Not named on the homepage |

## Facts to confirm

| Fact | What we show | Issue |
| --- | --- | --- |
| Year established | 2022 | About page and launch (19 May 2022, Hyatt Regency) say 2022; the "Main Home" page and some 2024–25 documents say 2021. |
| Board Ready cohort size | 40 women | From the brief. Search results named 35 members; the count was not found in any snippet. |
| Mobile money accounts | 139.5 million, June 2025 | From the NBE draft NDPS 2026–2030 as cited by FSD. The draft may change; an NBE director later cited 157 million. Counts accounts, not people. |
| Account ownership by gender, 2024 | Women 42%, men 57%; all adults 49% | Cited in FSD's Gender Integration blog; unrounded 41.6% and 56.5% per UNCDF. One fact-checker could not reproduce the gender split. The 2024 survey excluded Amhara, Tigray, Harari and Somali (about 30% of the population). |
| BimaLab cohort | 10 startups and 4 corporates | FSD's figure. Shega reports 11 startups; the launch post said 15 were selected (11 + 4 = 15). The launch month and cohort length were left out because sources disagree. |
| Second Climate Finance Summit theme | "Landscape to Legacy: Ethiopia's Climate Finance Path to COP32" | Medium confidence. COP32 is in 2027; copy does not imply 2026. |
| Insurance workshop | November 2025 (month only, as in the brief); more than 150 participants; premiums up about half; penetration below 1% of GDP | Search results gave 11 November 2025; the report file name carries a June 2025 date and one snippet called it two days. |
| Open finance blog date | 20 July 2026 | Listing pages show 17 July. |
| Access to Influence press release | Links to the press release category | The release's own URL was not found. |
| India's DPI Flywheel | Links to the May 2026 archive | The post's own URL was not found. |
| Board member Maleda Bisrat | Not shown on the homepage | 2022 wording only; not seen on the current team page in search results. |
| Social profiles | linkedin.com/company/fsd-ethiopia, x.com/FSDEthiopia, facebook.com/FSDEthiopia | Found in search results; confirm with FSD. |
| Funder name | UK International Development | The 2022 launch says UK aid / FCDO; the 2024 logo file says UK International Development. |

## Opportunities

- The only open listing on 13 October 2026 is the investor relations call, closing 14 October 2026. Its exact formal title and submission address were not retrieved. Open or closed is re-checked in the visitor's browser, so after that date the announcement bar reads "See current job and procurement opportunities" and both cards show no open listings, without a rebuild. Add new calls to `src/data/opportunities.json`.
- No staff vacancy was open. The Program Support internship closed on 2 October 2026.

## Numbers in the copy

Every number in hero, featured-work and news copy has an entry in `src/data/figures.json` with its source URL and `usedIn`, so the pre-submission check covers them all.

## Copy written for the prototype

The hero headlines, How we work promises and descriptions, featured-work summaries and news excerpts are our own wording, paraphrased from FSD sources. The tagline "We help build innovative, inclusive, and sustainable financial markets for all." is FSD's own (homepage slider). All Amharic strings are samples flagged for native-speaker review.
