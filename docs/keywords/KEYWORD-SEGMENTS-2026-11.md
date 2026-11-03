# Keyword clusters and segments (4 Nov 2026)

All 8,979 keywords we hold, each assigned a segment, a topic, an entity (institute, exam, city), a target page and a status. Full list: `KEYWORD-SEGMENTS-2026-11.csv`.

## Sources

- 8,819 real Google India autocomplete suggestions (`mba-keywords.csv`, harvest of Oct 2026).
- The 22 opportunity-table keywords from the 4 Nov SEO audit.
- 138 institute keyword families (admission, eligibility, exams, fees 2027-29, cut-off, last date) for the 23 institutes with a verified record.

## What the numbers mean

- Autocomplete shows what people type. It has **no search volume**; no SEO tool is connected, so volume and difficulty are unknown.
- `live` means a page exists whose topic matches the keyword. It does **not** mean the page ranks. Most generic rows point at a topic page, not a page built for that exact phrase.
- `needs official fee figure` and `needs official placement report`: we publish these only when the institute's own page gives the figure, so the page does not exist yet.

## Segments

| Segment | Keywords | Meaning |
|---|---|---|
| generic | 2,637 | No city, exam or institute named |
| city-list | 2,040 | City or region lists (best/top/list colleges in a place) |
| exam | 1,990 | Names an entrance exam (CAT, XAT, CMAT and so on) |
| institute | 1,357 | Names one of the 23 institutes we have verified |
| other-institute | 955 | Names an institute we have no verified record for (not built) |

## Status

| Status | Keywords |
|---|---|
| live | 6,972 |
| no verified record | 955 |
| needs official placement report | 335 |
| gap: needs page | 250 |
| needs official fee figure | 231 |
| out of focus / no verified data | 150 |
| needs sourced data | 86 |

## Topics (live vs not live)

| Topic | Keywords | Live | Not live |
|---|---|---|---|
| fees | 1,525 | 1,090 | 435 |
| general | 1,425 | 1,026 | 399 |
| rankings | 1,128 | 1,051 | 77 |
| cutoff | 1,026 | 864 | 162 |
| placements | 951 | 299 | 652 |
| admission | 863 | 759 | 104 |
| exams | 779 | 761 | 18 |
| deadline | 511 | 485 | 26 |
| mode | 285 | 209 | 76 |
| specialisation | 247 | 223 | 24 |
| eligibility | 239 | 205 | 34 |

## Institute segment: keywords per verified institute

| Institute | Keywords |
|---|---|
| Amity Noida | 103 |
| IMT Ghaziabad | 87 |
| SIBM Pune | 87 |
| FMS Delhi | 85 |
| IIFT | 76 |
| MDI Gurgaon | 75 |
| IIM Lucknow | 75 |
| Jaipuria Noida | 71 |
| IIM Kashipur | 70 |
| BIMTECH | 68 |
| UPES | 66 |
| GL Bajaj | 66 |
| Graphic Era | 59 |
| SCMHRD | 59 |
| Sharda | 53 |
| IIT Delhi DMS | 48 |
| LBSIM | 48 |
| FORE | 47 |
| BML Munjal | 45 |
| Doon University | 32 |
| JBS Noida | 15 |
| IMI Delhi | 8 |
| DIT Dehradun | 7 |
| FIIB | 7 |

## Biggest unbuilt opportunity: institute fee keywords with no official figure yet

These phrases have an institute page but no fee guide, because we do not yet hold the official figure. Build order: collect the figure from the institute's own page, then publish a fee guide like the MDI, IMT, FORE and BIMTECH ones.

| Keyword | Institute |
|---|---|
| doon university mba fees | Doon University |
| jaipuria noida mba fees | Jaipuria Noida |
| amity noida mba fees | Amity Noida |
| jbs noida mba fees | JBS Noida |
| sibm pune mba fees | SIBM Pune |
| scmhrd mba fees | SCMHRD |
| graphic era mba fees | Graphic Era |
| sharda university mba fees | Sharda |
| lbsim mba fees | LBSIM |
| iim lucknow noida campus mba fees | IIM Lucknow |
| mba fees upes | UPES |
| mba fees in dit dehradun | DIT Dehradun |
| fms delhi mba fees | FMS Delhi |
| iift mba fees | IIFT |

## Where the keywords are live on the site

- `/mba-searches`: crawlable index that links every verified institute to its admission, fee, cut-off and deadline page, with each exam and city guide.
- Fee guides: MDI Gurgaon, IMT Ghaziabad, FORE, BIMTECH (official 2027-29 figures).
- Deadlines and XAT guides for 2027; the 100 Delhi lead keywords are in `DELHI-100-LEAD-KEYWORDS.md`.

## How to refresh

Re-run the harvest (`harvest.mjs`, `cluster.mjs`) for new autocomplete data, then re-run the segmentation script and rebuild the CSV. Add a verified institute to `programAdmissions.ts` and its keyword family appears automatically in the topic index.
