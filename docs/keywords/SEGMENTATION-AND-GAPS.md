# Keyword clusters, segmentation and gaps (MBA and PGDM)

Built from the real Google India autocomplete harvest in `docs/keywords/` (`harvest.mjs` then `cluster.mjs`). Autocomplete shows what people type. It has no search-volume column, so sizes below are counts of distinct suggestions, not searches per month. Rank chances are judgement, not data.

- Relevant queries after filtering: **8,819**; mapped to a page today: **7,139** (81%)
- Clusters: **165**; with a pillar page: **127**; without one: **38**

## 1. Segmentation (each query is tagged on five axes)

### Search intent

| Search intent | Queries | Share |
| --- | --- | --- |
| commercial | 4109 | 47% |
| informational | 3335 | 38% |
| transactional | 1251 | 14% |
| navigational | 124 | 1% |

### Funnel stage

| Funnel stage | Queries | Share |
| --- | --- | --- |
| consideration | 4233 | 48% |
| awareness | 3335 | 38% |
| decision | 1251 | 14% |

### Topic (what the searcher wants)

| Topic (what the searcher wants) | Queries | Share |
| --- | --- | --- |
| fees-funding | 1451 | 16% |
| general | 1165 | 13% |
| placements-salary | 1091 | 12% |
| exam-dates-prep | 964 | 11% |
| best-top-ranking | 883 | 10% |
| cutoff-percentile | 787 | 9% |
| admission-process | 486 | 6% |
| mode-format | 401 | 5% |
| specialization | 356 | 4% |
| no-exam-direct | 320 | 4% |
| eligibility-profile | 312 | 4% |
| college-specific | 297 | 3% |

### Location

| Location | Queries | Share |
| --- | --- | --- |
| (none) | 4986 | 57% |
| pune | 715 | 8% |
| mumbai | 537 | 6% |
| delhi | 423 | 5% |
| lucknow | 361 | 4% |
| noida | 269 | 3% |
| dehradun | 254 | 3% |
| bangalore | 243 | 3% |
| hyderabad | 220 | 2% |
| uttar pradesh | 184 | 2% |
| gurgaon | 172 | 2% |
| ghaziabad | 135 | 2% |

### Exam named

| Exam named | Queries | Share |
| --- | --- | --- |
| (none) | 6671 | 76% |
| cat | 645 | 7% |
| mah-mba-cet | 258 | 3% |
| xat | 179 | 2% |
| nmat | 168 | 2% |
| cmat | 167 | 2% |
| gmat | 162 | 2% |
| mat | 156 | 2% |
| cuet-pg | 147 | 2% |
| snap | 146 | 2% |
| atma | 120 | 1% |

## 2. Which clusters have no pillar page

38 clusters (1,776 suggestions) have no pillar page. They fall into three groups:

| Group | Clusters | Suggestions | What to do |
| --- | --- | --- | --- |
| Other cities (Mumbai, Bengaluru, Hyderabad) | 32 | 909 | Outside the cities CampusLelo verifies. Do not write: there is no sourced data. Revisit if you add those cities. |
| Pune placements and college-specific | 3 | 303 | Placement figures and rankings are not published here until sourced. Serve the intent with the per-college admission pages and the placement-report guide. |
| General and CUET PG | 3 | 564 | General lists need a verified college list; CUET PG needs NTA's official notice. Both are queued. |

## 3. Clusters in our cities with a pillar but no supporting page

These are the best near-term wins: the topic exists, but only one page serves it.

| Cluster | Suggestions | Pillar today | Sample queries |
| --- | --- | --- | --- |
| fees-funding:lucknow | 85 | /mba-colleges-in-lucknow | mba colleges in lucknow with low fees; mba colleges in lucknow fees |
| cutoff-percentile:delhi-ncr | 81 | /mba-cutoff-delhi-ncr | mba colleges in delhi for 50 percentile; mba cutoff for iit delhi |
| placements-salary:lucknow | 74 | /mba-colleges-in-lucknow | mba colleges in lucknow with placement; lucknow university mba average package |
| fees-funding:dehradun | 60 | /mba-colleges-in-dehradun | mba colleges in dehradun with fee structure; mba colleges in dehradun fees |
| placements-salary:dehradun | 59 | /mba-colleges-in-dehradun | graphic era mba average package; upes dehradun mba average package |
| general:lucknow | 56 | /mba-colleges-in-lucknow | mba colleges in lucknow government; mba colleges in lucknow university |
| best-top-ranking:uttar pradesh | 54 | /mba-colleges-in-uttar-pradesh | best mba colleges in uttar pradesh; top 10 mba colleges in uttar pradesh private |
| no-exam-direct:delhi-ncr | 49 | /mba-colleges-in-delhi-ncr-without-cat | mba colleges in delhi without cat; mba colleges in delhi direct admission |
| admission-process:pune | 37 | /mba-admission-process-pune | mba colleges in pune admission open; mba colleges in pune admission |
| best-top-ranking:dehradun | 36 | /mba-colleges-in-dehradun | mba colleges in dehradun top 10; top mba colleges in dehradun rank wise |
| general:dehradun | 33 | /mba-colleges-in-dehradun | pgdm colleges in dehradun; mba colleges in dehradun |
| fees-funding:uttar pradesh | 31 | /mba-colleges-in-uttar-pradesh | mba colleges in up with low fees; mba fees in uttar pradesh |
| fees-funding:ghaziabad | 28 | /mba-colleges-in-delhi-ncr | mba colleges in ghaziabad with low fees; mba colleges in ghaziabad with fee structure |
| best-top-ranking:lucknow | 27 | /mba-colleges-in-lucknow | lucknow university mba ranking; top mba colleges in lucknow |
| admission-process:lucknow | 26 | /mba-colleges-in-lucknow | how to get admission in mba in lucknow university; iim lucknow mba admission process |
| fees-funding:uttarakhand | 25 | /mba-colleges-in-uttarakhand | mba colleges in uttarakhand with low fees; mba colleges in roorkee with fees |
| placements-salary:uttarakhand | 25 | /mba-colleges-in-uttarakhand | mba jobs in uttarakhand; mba iit roorkee placements |
| best-top-ranking:uttarakhand | 24 | /mba-colleges-in-uttarakhand | top mba colleges in haridwar; mba colleges in uttarakhand list |
| placements-salary:ghaziabad | 24 | /mba-colleges-in-delhi-ncr | imt ghaziabad mba placements; imt ghaziabad mba average package |
| admission-process:dehradun | 18 | /mba-colleges-in-dehradun | upes dehradun mba admission process; graphic era mba admission |
| best-top-ranking:ghaziabad | 17 | /mba-colleges-in-delhi-ncr | best mba colleges in ghaziabad; top mba colleges in ghaziabad |
| exam-dates-prep:uttar pradesh | 16 | /mba-colleges-in-uttar-pradesh | aktu mba admission last date; aktu mba registration last date 2026 |
| cutoff-percentile:noida | 15 | /mba-cutoff-uttar-pradesh | mba sibm noida cutoff; bimtech noida mba cutoff |
| cutoff-percentile:lucknow | 15 | /mba-cutoff-uttar-pradesh | iim lucknow mba cutoff; lucknow university mba cutoff |
| admission-process:uttar pradesh | 15 | /blog/mba-admission-in-uttar-pradesh | mba admission up; aktu mba admission |

## 4. What was built from this

**One page per verified programme: `/mba-admission/<programme>`** (25 pages plus the hub `/mba-admission`). They target the college-specific and city-specific clusters that had no supporting page: `college-specific`, `admission-process`, `eligibility-profile`, `exam-dates-prep` and `cutoff-percentile` in Pune, Delhi NCR, Noida, Ghaziabad, Lucknow, Uttarakhand and Dehradun, for example "jaipuria noida mba admission process", "iim lucknow mba admission process", "upes dehradun mba admission process" and "imt ghaziabad mba admission". Every fact on them is read from the verified data files, with the source and check date shown. Where an institute publishes no cut-off, the page says so.

Also built earlier in this series: eight exam-acceptance articles and three single-institute pages (FMS Delhi, IIFT, MDI Gurgaon).

## 5. Next pages, in order

| Priority | Page | Why | Needs |
| --- | --- | --- | --- |
| 1 | CUET PG dates, syllabus and registration | 103 suggestions, no pillar; many MBA candidates | NTA official notice (read and cite) |
| 2 | MBA fees explainer per city (Delhi NCR, Pune, Lucknow, Dehradun) | Large fee clusters, thin support | Each college's own fee page, one at a time |
| 3 | MBA admission process: Lucknow, Dehradun, Uttarakhand hubs | Pillar exists, 0 supporting pages | Already in the data; link the new college pages |
| 4 | More verified programmes (Bennett, NIET, KIET, Lloyd, IMS Ghaziabad) | Each unlocks several queries | Official admission pages or PDFs from you |

## 6. How to measure

1. Request indexing for `/mba-admission` and the 25 pages in Search Console.
2. After 4 weeks, filter Search Console queries by `/mba-admission/` and compare impressions with the cluster sizes above.
3. Re-run `harvest.mjs`, `cluster.mjs` and `report.mjs` each quarter.
