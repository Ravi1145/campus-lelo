# Duplicate content: inventory and plan (28 Nov 2026)

Method: crawled every URL in the live sitemap and compared (a) whole pages, using 5-word phrase overlap, and (b) individual paragraphs repeated across pages. Overlap does not prove copying from other sites; I found no word-for-word matches against other sites in the samples I searched. The issue is the site repeating itself.

## Inventory
**A. Whole-page overlap (before any fix): 165 of 504 pages, 751 page pairs over 50% identical.**
| Group | Pages | What it is |
|---|---|---|
| Pune MBA variants (under 15/20 lakh, weekend, part-time, low fees, online, executive, girls and so on) | ~12 | One template, only the keyword changed; up to 96% identical |
| Delhi and Delhi NCR "accepting CAT / GMAT / CMAT" and PGDM near-copies | ~11 | Same page, different exam word |
| Blog "X vs Y admission compared" and "exams accepted" posts | 31 + 9 | One layout filled with different institutes |
| Exam sub-pages (score-vs-percentile, colleges) | 12 | One layout per exam |
| Per-college cut-off pages | 7 | One layout per college |
| Best-MBA city pages, city MBA pages, per-college admission pages | 45 | One layout with different verified data (kept, to be enriched) |

**B. Paragraphs repeated across pages (118 blocks on 8+ pages).** Mostly harmless page furniture (lead-form text, the author box on 112 pages, "Fees, placements and cut-offs change every year" on 127). Two were a real quality problem: a block of raw search phrases ("top 10 mba colleges in kanpur placement wise") on 67 pages, linking to pages that were not about that place.

**C. Other sites:** the old collegepune.com (847 pages, still live, partner-controlled). Only `/cutoffs` overlaps heavily (73%); the other shared pages average 5%.

## Plan and status
| Step | Action | Status |
|---|---|---|
| 1 | Noindex 31 near-duplicate Pune MBA / Delhi exam / PGDM / cut-off pages; rewrite titles and headings on 12 Pune pages | Done, live (commit a0801c3) |
| 2 | Remove unsourced salary and placement figures from BSc IT and MBA in Pune pages | Done, live (d97aeee) |
| 3 | Related-search chips: only phrases about places we cover, 8 per page instead of 12 | Done in code, deploying with this commit |
| 4 | In each template group keep the pages with the most wording of their own, noindex the rest: 30 blog comparison/exams-accepted posts and 18 exam, Pune and cut-off pages | Done in code, deploying with this commit |
| 5 | Page-specific "at a glance" summary on every best-MBA page, computed from the verified data (number of ranked institutes, rank and score range, exams listed by the institutes we verified, other verified institutes in the place); the "missing from NIRF" FAQ names the place's own institutes | Done in code, deploying with this commit |
| 6 | Per-college admission pages: the four generic "how to use this page" bullets now use each institute's own exams, intake, cut-off status and neighbouring institutes. (The same paragraphs inside blog posts are covered by step 4: most of those posts are now noindexed.) | Done in code, deploying with this commit |
| 7 | Emptied the unsourced lists in `src/data/colleges.ts`: 104 student-review lists, 60 alumni lists, 60 scholarship lists; zeroed 104 invented ratings and review counts. The database has none of the review, alumni or scholarship data; it does hold ratings, review counts and average-placement numbers for most colleges, which the live pages do not show | Code done. Database ratings and placement numbers still to clear (needs your OK) |
| 8 | Bed and patient counts removed from the BJ Medical, D.Y. Patil Medical and Symbiosis Medical descriptions (code and database); the two pages built on unsourced fee, loan-rate and scholarship tables (/low-fees-mba-colleges-pune, /low-fees-engineering-colleges-pune) are noindexed until each figure is sourced | Done |
| 9 | Search Console: resubmit the sitemap, request indexing for the 5 new best-MBA pages, re-export in 2 to 4 weeks | Owner |
| 10 | Links from other sites (the main ranking lever); old domain collegepune.com (legal route) | Owner |

## What to expect
Noindexed pages move to "Excluded by noindex" in Search Console over 1 to 3 weeks; that is expected. Ranking depends on links, domain age and content quality; no step here can guarantee page 1.
