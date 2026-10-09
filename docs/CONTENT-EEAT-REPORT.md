# Content quality and E-E-A-T report: campuslelo.com

_2026-10-09. Method: sampled the local production build (about 175 of 940 sitemap URLs across 8 page groups) for word count, headings, links, dates and sources, plus manual spot checks. Scores are my judgement from that sample, not a tool score. No Search Console, GA4 or ranking data was available._

## Scores (judgement)

| | Score |
| --- | --- |
| Content quality | **62 / 100** |
| Experience | 8 / 25 |
| Expertise | 12 / 25 |
| Authoritativeness | 8 / 25 |
| Trustworthiness | 15 / 25 |
| AI citation readiness | **72 / 100** |

The gap is not writing quality or length. It is **unverified numbers on the highest-volume pages, no named people, and no review dates on college pages.**

## Google's Who / How / Why test

| Question | Finding |
| --- | --- |
| **Who** | Blog bylines say "CampusLelo Editorial Team" and schema marks that team as a `Person` (it should be an `Organization`). No named author, credentials or reviewer anywhere. Fails where readers expect a person (admissions advice, counselling). |
| **How** | Strong on MBA pages: each fact links its official source and shows a "checked" date. Weak on college profiles: no sources shown, no date. |
| **Why** | Helpful intent is clear on the MBA, cut-off and counselling pages (they say what is unknown). Weaker on older Pune landing pages that read as keyword pages with generic figures. |

## What the sample shows

| Group | URLs | Avg words | Thin (<300) | Visible review date | Sources shown |
| --- | --- | --- | --- | --- | --- |
| Home | 1 | 3,364 | 0 | yes | yes |
| MBA region and cut-off pages | 23 | 1,626 | 0 | **100%** | **100%** |
| MBA counselling pages | 2 | 1,440 | 0 | 100% | 100% |
| Blog | 33 | 868 | 0 | yes | 36% |
| College profiles | 127 | 671 | 0 | **0%** | 100% mention "official" only |
| College sub-pages (fees, cutoff, admission, placements, scholarship) | 520 | 389 | 0 (min 362) | **0%** | **0%** |
| Exam pages | 44 | 823 | 1 (JEE Advanced, 299) | 72% | 100% |
| Pune landing pages | 153 | 787 | 2 | 24% | 28% |

Every sampled page has exactly one H1, and internal linking is healthy (about 60–230 links per 1,000 words in the sample).

## Issues, by severity

### Critical (trust and accuracy)
1. **Unsourced placement and ranking figures on high-traffic pages.** Seen in the sample: the homepage FAQ (for example "SIBM ... ₹28 LPA average"), 29 of 29 sampled college profiles that carry NIRF or package figures (for example COEP "NIRF #49" and "₹12.0 LPA"), four blog posts, and about ten Pune landing pages. They have no source and no date. This breaks the verified-data rule the MBA section follows, and wrong placement claims are the fastest way to lose trust (and invite complaints).
2. **No named author or reviewer.** "CampusLelo Editorial Team" is marked as a `Person` in schema. Counselling and admission advice with no accountable person is a weak E-E-A-T signal.

### High
3. **College profiles and sub-pages show no "last verified" date** (0% of 147 sampled). Fees, cut-offs and placements change every year.
4. **Pune landing pages: 24% dated, 28% sourced.** Older pages predate the sourcing standard.
5. **Blog: only 36% show sources.** The newer MBA guides do; older city guides do not.

### Medium
6. Two thin pages: `/colleges-in-pune/colleges-in-shivajinagar-pune` (239 words), `/courses/btech-mechanical-engineering-pune` (271 words).
7. College sub-pages average 389 words and share a template. They are fine for their narrow queries but risk looking repetitive if figures are generic. Sources and dates would fix most of that.

### Low
8. Title tail: `/courses/btech-mechanical-engineering-pune` is one character over.

## Strengths
- MBA, cut-off, region and counselling pages are the best in the set: 1,400–1,600 words, direct answer first, per-fact sources, "checked" dates, honest "not published" statements. These suit AI citation (quotable answers, tables, FAQ schema).
- Clear contact route, privacy notice with DPDP consent, grievance email, editorial policy page.
- One H1 per page, healthy internal linking, structured data on every page type.

## Recommendations

| Priority | Action | Effort |
| --- | --- | --- |
| 1 | Remove or source every placement and NIRF figure on the homepage, college profiles (127) and ~10 Pune landing pages. Show a figure only with its source and date, otherwise link the college's own placement page. | Substantial |
| 2 | Name a real author and a reviewer (name, role, credentials, photo) on blog and counselling pages. Change the `Person` author schema to the real person and make the team an `Organization`. **Needs your input.** | Quick once names exist |
| 3 | Add "Last verified" dates to college profiles and sub-pages from the data's own review date. | Moderate |
| 4 | Add a short "How we sourced this" line and sources to older blog posts and Pune landing pages. | Moderate |
| 5 | Expand the two thin pages or merge them into their parents. | Quick |
| 6 | Add first-hand evidence where you have it: counsellor-reviewed shortlists, real student questions answered, anonymised outcomes with permission. Do not invent any. **Needs your input.** | Ongoing |

## AI citation readiness (72 / 100)
- Good: answer-first blocks, FAQ schema, tables, speakable markup, sources, dates on the MBA pages.
- Gaps: older pages lack direct-answer blocks and sources; no named author entities; unverified figures make a page unsafe for an AI to quote.
- Note (Google's own guidance): this is the same work as normal SEO. It is not a separate discipline, and `llms.txt` is not a citation lever.

## Not verified
Readability scores, keyword density, real rankings and traffic. A 600-word page that fully answers a query can outrank a 2,000-word one, so word counts above are coverage floors, not targets.
