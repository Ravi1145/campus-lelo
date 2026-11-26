# SEO report: campuslelo.com (26 Nov 2026)

Method: live crawl of all 508 sitemap URLs on 26 Nov 2026 (title, description, H1, canonical, robots, word count, JSON-LD, image alt). No SEO tool is connected, so keyword volume, difficulty, backlinks and current rankings are **not measured**. The latest Search Console export in the project is from 27 Oct; a fresh export is needed to report rankings.

## Verdict
Technical and on-page SEO are in good shape. Rankings are limited by off-site factors (links, domain age), not by the pages. No one can guarantee page-1 rankings on every keyword; this report lists what the site controls.

## Technical and on-page results (508 pages)
| Check | Result |
|---|---|
| HTTP status | 508 of 508 return 200 |
| Title present, no duplicates | Pass (0 missing, 0 duplicate) |
| Title length | 12 pages over 60 characters, 48 under 30 (short but valid) |
| Meta description | 0 missing; 2 over 160, 3 under 70 characters |
| Exactly one H1 | Pass on all pages |
| Canonical = own URL | Pass on all pages |
| noindex pages in sitemap | 0 |
| Thin pages (under 300 words) | 0 |
| Images without alt | 0 |
| Structured data | Missing on 4 pages: /privacy, /terms, /colleges-in-pune, /colleges-in-pune/deemed-universities-pune |
| robots.txt | Present, AI crawlers allowed |

## Gaps found
1. **No "best MBA colleges in ..." pages for Delhi NCR, Gurugram, Ghaziabad, Lucknow, Dehradun** (404). Fixed in code (see below, not yet deployed).
2. **/best-mba-colleges-pune returns a 308 redirect**, so "best mba colleges in pune" depends on /mba-colleges-pune. Pune has no verified admission data, so a separate page was not added.
3. **About 15 Pune MBA pages have auto-made titles** with wrong capitals, e.g. "Mba Colleges In Pune Low Fees | CampusLelo 2026" (also part-time, weekend, executive, online, girls, data science, supply chain, international business, under 15/20 lakh). Fix the title generator in `src/data/seoPages.ts`.
4. **Pune MBA pages compete with each other**: /mba-colleges-pune, /mba-colleges-in-pune, /top-10-mba-colleges-in-pune, /mba-in-pune. Consider merging or clearly separating them.
5. **Off-site**: almost no links from other sites, domain about 6 weeks old in Google, old domain collegepune.com still live (owner and legal action).

## Done this session (in code, not committed or deployed)
- Five new pages built from NIRF 2025 data and verified records: /best-mba-colleges-in-delhi-ncr, -gurugram, -ghaziabad, -lucknow, -dehradun. Each loads (200) with 1,300 to 1,600 words, title under 60 characters, target keywords in metadata, and links to its admission page. They are added to the sitemap automatically and linked from the India, Delhi and Noida best-of pages.
- Keywords targeted by the new pages: best/top mba colleges in delhi ncr, gurgaon/gurugram, ghaziabad, lucknow, dehradun; top 10 variants; city NIRF ranking terms; pgdm variants.

## Still to do
- Fix the 15 auto-made titles (item 3), add JSON-LD to the 4 pages, lengthen the 12 over-long titles.
- Export Search Console again (last 28 days) to measure rankings by keyword; connect Ahrefs or Semrush for volume and difficulty.
- Link building: 10 to 20 relevant links (education directories, college partners, local press). This is the main lever.
- Commit and deploy the five new pages, then request indexing in Search Console.
