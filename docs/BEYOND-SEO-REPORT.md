# Beyond SEO report: campuslelo.com

_2026-10-09. Mode: **Native Agent Scraping** (no Apify token, no Search Console, GA4 or backlink exports). Everything marked Confirmed was measured; the rest is labelled. No ranking, traffic, search-volume or backlink figure below is invented._

## 1. Executive summary

The site is technically healthy (SEOmator 97/100, 929 indexable URLs, 0 broken internal links, AI-readiness 100) and has an unusually strong, verifiable MBA/PGDM content base. **The limiting factors are now off-site and data-related, not on-page:** CampusLelo has no measurable brand footprint yet, the live site is behind the local build, the www/non-www canonical conflict is unresolved, and the Delhi NCR pages rest on 7 verified institutes against competitors that list hundreds.

Realistic expectation: these changes improve the probability of being crawled, understood, trusted and cited. They do not guarantee rankings or AI citations.

## 2. Data sources used

| Source | Status |
| --- | --- |
| Own-site crawl (local build + live), SEOmator 251 rules | Confirmed |
| Sitemap, robots.txt, headers, canonical, schema | Confirmed |
| Keyword research: Google India autocomplete, 7,119 queries (no volumes) | Confirmed (what is searched), volumes Not verified |
| Live web search (US-only tool, `site:` unreliable) | Directional |
| Google Search Console, GA4, Google Business Profile | **Not available** |
| Backlinks, DR/DA, referring domains | **Not available** (Ahrefs connector not authorised) |
| Real-user Core Web Vitals (CrUX) | **Not available** |
| Apify | **Not available** (needs `APIFY_API_TOKEN`) |

## 3. Confirmed findings

- **Index health:** all 929 sitemap URLs return 200, one self-canonical, unique titles, no accidental noindex. **Critical:** `campuslelo.com` 308-redirects to `www`, while every canonical, the sitemap and robots name the non-www host.
- **Deployment gap:** live sitemap lists 918 URLs; the build has 929 plus the Delhi/NCR, About, press and calendar pages.
- **Brand footprint (Directional):** searches for "CampusLelo" and "CampusLelo college discovery Pune" return **no page from the site and no description of the brand**; results are unrelated "campus" pages and big portals. A `site:` check was inconclusive (the tool does not support the operator reliably), so verify in Search Console.
- **SERP competitors for "MBA colleges in Delhi NCR accepting CAT":** Careers360, Hitbullseye and college blogs. Their pages list FMS, DMS IIT Delhi, IIFT, MDI, LBSIM, FORE, Fortune, Apeejay, EMPI, BML Munjal, Jaypee Business School, IMI, BIMTECH and more, and are explicitly not primary-source verified.
- **Pune vs Delhi coverage (Confirmed):** Pune has ~50 dedicated MBA pages; before this work Delhi's 353 queries mapped to one article. Now 10 dedicated Delhi/NCR/Greater Noida pages exist, built from 7 verified programmes.

## 4. Where the opportunity is

| Priority | Issue / opportunity | Impact | Effort | Action |
| --- | --- | --- | --- | --- |
| Must fix now | Canonical host conflict | 5 | 1 | Make `campuslelo.com` primary in the host (or set `NEXT_PUBLIC_BASE_URL` to www). |
| Must fix now | Deploy the build | 5 | 1 | Push, redeploy, submit `sitemap.xml` in Search Console and Bing. |
| High | No measurable brand/entity | 5 | 3 | See section 6. |
| High | Delhi NCR depth: 7 verified vs competitors' dozens | 4 | 3 | Verify the next institutes from their official pages (FORE, LBSIM, DMS IIT Delhi, BML Munjal, Jaypee Business School, Fortune, Apeejay) and add them to `programAdmissions.ts`; every verified record lifts all 10 pages and the exam pages automatically. |
| High | Fees and placements missing on city pages | 4 | 3 | Add official figures with sources. This is the largest unmet intent on "MBA colleges in Delhi with fees". |
| High | No author identity or credentials | 4 | 2 | Named authors/reviewers with Person schema (needs real names from you). |
| Strategic | Backlinks and mentions | 5 | 4 | Follow `docs/BACKLINK_STRATEGY.md`; promote the calendar and widget first. |
| Monitor | Greater Noida page rests on one verified programme | 2 | 2 | Add verified institutes; watch in Search Console. |

## 5. Keyword-to-page map (verified in the repo)

| Intent cluster | Queries | Page |
| --- | --- | --- |
| MBA colleges in Delhi (list, best, top) | 273 | `/mba-colleges-in-delhi` |
| Delhi NCR / Gurugram / Ghaziabad | 220 | `/mba-colleges-in-delhi-ncr` |
| Without CAT / direct admission, NCR | 60 | `/mba-colleges-in-delhi-ncr-without-cat` |
| Greater Noida | 56 | `/mba-colleges-in-greater-noida` |
| Cut-offs, Delhi NCR | 42 | `/mba-cutoff-delhi-ncr` |
| PGDM in NCR | 26 | `/pgdm-colleges-in-delhi-ncr` |
| Noida | 190 | `/mba-colleges-noida` |
| Pune | 714 | 50+ pages led by `/mba-colleges-in-pune` |
| National topics (fees, placements, eligibility…) | ~3,000 | 10 guides under `/blog/…`, hub `/mba` |

Full list with intent and funnel stage: `docs/keywords/mba-keywords.csv`.

## 6. AI-friendly SEO: AEO, GEO, entity, reputation, conversation

| Layer | Current state | Next step |
| --- | --- | --- |
| **AEO** (answer readiness) | Answer blocks with question headings on counselling, region, exam, college, homepage and city pages; FAQ schema; speakable markup. | Add more question-style H2s on the older Pune cluster pages. |
| **GEO** (citability) | Sourced exam data, dates with "last updated", generated `llms.txt`, `llms-full.txt` and `/api/ai-context`. Note: Google says `llms.txt` is not a ranking or citation lever; keep it for tooling, do not rely on it. | Raise guide sections toward 134–167-word self-contained blocks. |
| **Entity SEO** | Organization, WebSite, LocalBusiness, `sameAs` to X, Facebook, Instagram, YouTube, About page, press kit. No Wikipedia/Wikidata, no named people. | Confirm every `sameAs` account is real and active; add Person entities for authors; keep name, address and phone identical everywhere. |
| **Reputation SEO** | Editorial policy and per-fact sources. No third-party reviews or press yet. | Collect genuine, consented student reviews; publish the exam calendar and cut-off explainers to journalists (`/press`). |
| **Conversation SEO** | Quick answers, comparison table, counselling plans, forms capturing budget and city. | Answer real questions in communities (r/CATpreparation, r/MBA_India, Quora) as the brand, disclosed, linking only where it truly helps. Never mass-post. |

## 7. Conversion SEO

Lead forms now capture course, location and budget, and the counselling page separates free phone counselling from the ₹199 video session. Gaps: no payment checkout (by design for now), and no event tracking confirmed in GA4 (`generate_lead` dataLayer events are pushed; verify they arrive).

## 8. Query/lead growth model (illustrative, not a forecast)

If the goal is **500 qualified leads/month** at a blended 7% form-conversion rate, the site needs about **7,100 qualified visits/month**. Organic search alone will not reach that quickly for a new brand; plan for organic pages + Google Business Profile (if you have a staffed office) + conversion fixes + authority links working together. Current traffic and conversion are **Not verified** (no GA4/GSC access).

## 9. Plan

**30 days:** fix canonical host; deploy; submit sitemap (Google, Bing); verify domain in Search Console; set up GA4 conversion events; confirm `sameAs` accounts; verify 5–7 more Delhi NCR institutes.
**60 days:** add sourced fees and placement data; named authors with Person schema; first 10 outreach emails/week (calendar, widget, press); YouTube explainers for CAT dates and MBA vs PGDM.
**90 days:** review Search Console queries per cluster in `docs/keywords/mba-keywords.csv`; double down on pages with impressions but low clicks; add Mumbai/Bangalore only after Pune/NCR are strong; refresh exam data after each notification.

## 10. Exact next actions

1. Host: make `campuslelo.com` the primary domain.
2. Push the local commit and redeploy.
3. Connect Search Console and send me an export (queries, pages, countries) so rankings can be analysed with real data.
4. Optional: provide `APIFY_API_TOKEN` to unlock SERP, maps, trends and authority checks.
5. Provide real author names/credentials, opening hours and official fee/placement figures.

## 11. Data not available / needed next

Search Console, GA4, GBP, backlink and authority data, real-user Core Web Vitals, SERP rank positions, search volumes, and any Apify access.
