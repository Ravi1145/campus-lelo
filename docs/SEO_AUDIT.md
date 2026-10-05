# SEO Audit — CampusLelo (campuslelo.com)
**Date:** 4 October 2026 · **Type:** Full site audit · **Method:** Codebase review (166 public routes, sitemap, redirects, metadata, schema) + live-domain checks + web SERP sampling.
**Data note:** No SEO tool was connected (the Ahrefs connector needs authorizing in claude.ai connector settings). Volume and difficulty below are relative estimates from SERP observation, not measured figures.

---

## Executive Summary

The codebase is strong on SEO. It has 166 indexable routes, a dense programmatic cluster (30 MBA and 9 B.Tech long-tail pages), consistent canonicals through `lib/seo.ts`, FAQ and breadcrumb schema on most pages, and good AI-crawler access. **None of that counts yet.** campuslelo.com still serves the GoDaddy "Launching Soon" page, and the old **collegepune.com** deployment is live and ranks on page 1 for "best engineering colleges in pune 2026".

**Overall: critical issues.** The foundation is good, but the domain situation and a few risky schema patterns can undo it.

**Top 3 priorities**
1. **Domain migration.** Deploy the app to campuslelo.com and 301 every collegepune.com URL to the same path. Then file a Change of Address in Search Console. Without this you either rank on the old brand or lose the rankings you have.
2. **Remove the fabricated review and rating schema.** Hardcoded `rating` values, `reviewCount` that defaults to 1, and sample reviews are all marked up as `AggregateRating` and `Review`. This risks a Google manual action.
3. **Clean up crawl signals.** 4 sitemap URLs 301-redirect, 13 sitemap URLs have no page, 22 internal links are broken (including 2 in the sitewide footer), and `/_next/` is blocked in robots.

---

## 1. Keyword Opportunity Table

| Keyword | Est. Difficulty | Opportunity | Current Ranking | Intent | Recommended Content Type |
|---|---|---|---|---|---|
| best engineering colleges in pune 2026 | Hard | High | collegepune.com on page 1; campuslelo none | Commercial | Pillar page `/engineering-colleges-pune` |
| mba colleges in pune accepting mah cet | Moderate | High | Not ranked | Commercial | `/mba-colleges-in-pune-accepting-mh-cet` + percentile table |
| mah mba cet cutoff pune colleges 2026 | Moderate | High | Not ranked | Informational | Data page with college-wise percentile cutoffs |
| mht cet cutoff pune colleges 2026 | Moderate | High | Not ranked | Informational | `/cutoffs/[exam]/[college]` hub, branch-wise |
| mba colleges in pune 70 percentile | Easy | High | Not ranked | Commercial | Existing 70-percentile page; add a real list |
| engineering colleges in pune with fees | Moderate | High | Not ranked | Commercial | `/btech-colleges-in-pune-with-fees` sortable table |
| coep vs pict | Easy | High | Not ranked | Commercial | `/coep-vs-pict-pune` (exists) |
| vit pune vs mit wpu | Easy | High | Not ranked | Commercial | `/vit-pune-vs-mit-wpu` (exists) |
| sibm vs scmhrd | Easy–Moderate | High | Not ranked | Commercial | `/sibm-vs-scmhrd-pune` (exists; fix the links pointing to it) |
| pict cutoff 2026 | Moderate | High | Not ranked | Informational | College cutoff subpage |
| coep fees 2026 | Moderate | Medium | Not ranked | Informational | `/colleges/coep.../fees` |
| top 10 mba colleges in pune | Hard | Medium | Not ranked | Commercial | `/top-10-mba-colleges-in-pune` |
| colleges in pune | Hard | Medium | collegepune.com variants | Navigational/Commercial | `/colleges-in-pune` hub |
| low fees engineering colleges in pune | Easy | Medium | Not ranked | Commercial | Existing page |
| direct admission engineering colleges pune | Easy | Medium | Not ranked | Transactional | Existing page; add "management quota" FAQ |
| colleges in hinjewadi / wakad / kharadi | Easy | Medium | Not ranked | Local | Area pages (Kharadi, Aundh and Baner are linked but missing) |
| mht cet counselling 2026 pune cap round | Moderate | Medium | Not ranked | Informational | `/mht-cet-counselling-pune-2026`, updated each round |
| what percentile is needed for pict | Easy | Medium | Not ranked | Question | FAQ block on the PICT page |
| is mit wpu good for btech | Easy | Medium | Not ranked | Question | FAQ block, linked from the comparison page |
| mba in pune without cat | Easy | Medium | Not ranked | Commercial | `/mba-admission-pune-without-cat` |
| sppu affiliated colleges list | Moderate | Medium | Not ranked | Navigational | `/sppu-affiliated-colleges-pune` |
| pune college fees calculator | Easy | Low–Medium | Not ranked | Tool | Existing tool page (needs metadata) |
| best mba colleges in pune for finance | Easy | Low–Medium | Not ranked | Commercial | Existing page |

---

## 2. On-Page Issues

| Page | Issue | Severity | Recommended Fix |
|---|---|---|---|
| Site-wide (`lib/seo.ts:351`, `components/colleges/ReviewSection.tsx:348`) | `AggregateRating` built from hardcoded `college.rating`. `reviewCount` falls back to `1`. The sample reviews ("Rahul Sharma", "Priya Desai") are output as `Review` schema. | **Critical** | Output rating and review schema only from real, moderated user reviews stored in the database. Delete the fallback to `1`. |
| `/alumni`, `/alumni/[slug]` | Named alumni profiles appear to be illustrative, and they reuse the same names as the sample reviews. Fake testimonials damage E-E-A-T. | **High** | Replace with verified alumni (with consent) or label them as illustrative and add `noindex` until they're real. |
| `/best-mba-colleges-pune`, `/bsc-colleges-pune`, `/btech-colleges-pune`, `/top-engineering-colleges-pune` | Each page exists **and** is a 301 source in `next.config.ts`, so the page can never be reached. All four are also in the sitemap. | **High** | Choose one: delete the page, or remove the redirect. Then drop the URL from the sitemap. |
| Footer (`components/layout/Footer.tsx`) | Sitewide links to `/colleges/mit-world-peace-university-pune` and `/colleges/sit-pune-symbiosis-institute-of-technology` don't match any local slug. They likely 404 unless the slugs exist in Supabase. | **High** | Change them to `mit-wpu-mit-world-peace-university` and `symbiosis-institute-of-technology-pune`. |
| `/mba-colleges-in-pune-for-hr`, `/mba-colleges-in-pune-for-finance` | The "SIBM vs SCMHRD" link points to `/compare/symbiosis-institute-of-business-management-sibm-vs-symbiosis-institute-of-technology-pune`, which is a wrong pair and a `notFound`. | High | Point it to `/sibm-vs-scmhrd-pune`. |
| `/admission-guide` | 4 college links use slugs that don't exist (e.g. `college-of-engineering-pune-coep`). | High | Use the canonical slugs from `src/data/colleges.ts`. |
| `/medical-colleges-pune` | Links to `/colleges/dy-patil-medical-college-pune`, which isn't a known slug. | Medium | Fix the slug or add the college. |
| `/colleges-hinjewadi-pune`, `/colleges-viman-nagar-pune` | Link to `/colleges-kharadi-pune`, `/colleges-aundh-pune` and `/colleges-baner-pune`, which don't exist. | Medium | Build these 3 area pages. They're high-value local-intent keywords. |
| Noida pages (`/colleges-in-noida` etc.) | 8 links to Noida pages that don't exist. A Noida cluster also dilutes a Pune-focused brand. | Medium | Move Noida to its own section or subdomain later, or remove it. At minimum, remove the dead links. |
| `/ask`, `/nirf-insights`, `/predictor`, `/roi-calculator` | `page.tsx` has no metadata. Check that the sibling `layout.tsx` provides a title, description and canonical. | Medium | Add `genMeta()` to each layout or page. |
| 89 pages | Title is over 65 characters, so it gets truncated in the SERP. Examples: `/colleges/[slug]/placements` (99), `/city/[city]/[stream]` (90), `/compare/[slug]` (86). | Medium | Keep titles at or under 60 characters. Lead with the keyword and drop the "\| CampusLelo" suffix when space is short. |
| 73 pages | Meta description is over 165 characters, e.g. `/courses/[slug]` (243) and `/compare/[slug]` (237). | Low | Trim to 140–160 characters and end with a CTA. |
| `/colleges/[slug]/fees` (54 chars), `/terms` (49), `/pharmacy-colleges-pune` (76), `/design-colleges-pune` (98) | Meta description is too short. | Low | Expand to around 150 characters. |
| `lib/seo.ts` (`alternates.languages`) | `mr-IN` hreflang points to the English URL, which is an invalid self-alternate. | Medium | Remove `mr-IN` until Marathi pages exist. |
| `lib/seo.ts` (college schema) | `dateModified` is set to *today* on every render, which fakes freshness. | Medium | Use the real `updated_at` from the database. |
| `next.config.ts` headers | `Last-Modified: new Date()` at build time on every page. | Low | Remove it, or set it per page from the content's update date. |
| Programmatic MBA/B.Tech pages (~39) | Templated pages of about 3.5–4 KB, each with 3 intro paragraphs and 3 FAQs. Thin, near-duplicate risk under the scaled-content policy. | High | Add unique data to each page (cutoff table, fee table, recruiter list) and aim for 800+ unique words on the top 15. Merge or `noindex` the weakest ones (`-online`, `-weekend`, `-part-time`, `-under-15-lakh`). |
| College subpages (104 colleges × 5 = 520 URLs) | Risk that fees, cutoff, admission and scholarship pages for colleges with little data are thin. | Medium | `noindex` subpages that lack real data. Only list data-rich subpages in the sitemap. |

---

## 3. Content Gap Recommendations

| Topic | Why it matters | Format | Priority | Effort |
|---|---|---|---|---|
| College-wise **MAH MBA CET percentile cutoffs** (CAP rounds, past 3 years) | Competitors such as thetoppercentile and cracku own this SERP. Very high intent in Jun–Aug. | Data table hub + per-college pages | High | Substantial |
| **MHT-CET branch-wise cutoffs** (CSE/IT/ENTC per college, per CAP round) | Highest-volume informational query in the niche. `/cutoffs` exists; make it authoritative. | Interactive table + downloadable data | High | Substantial |
| Kharadi, Aundh, Baner area pages | Already linked internally. Local intent with weak competition. | Landing pages | High | Quick win (each) |
| Real student reviews (moderated) | Careers360 and Collegedunia win on UGC. Reviews also unlock valid rating schema. | Review system (UI exists) | High | Substantial |
| "X vs Y" comparisons: PICT vs VIT, COEP vs VJTI, SCMHRD vs SIIB, MIT-WPU vs Symbiosis | Low difficulty, high conversion. Only 14 pairs exist. | Comparison pages | Medium | Moderate |
| CAP round process explainer + document checklist | Funnel stage: decision. Featured snippet and PAA bait. | HowTo guide | Medium | Moderate |
| Hostel and PG costs near campuses (Hinjewadi, Kothrud, Lohegaon) | Parent-intent query that big portals don't cover. | Guide | Medium | Moderate |
| Placement reports with sources (NIRF data PDFs) | E-E-A-T: cite NIRF and college placement reports and show "last verified" dates. | Data pages | Medium | Moderate |
| Blog freshness | Only about 20 static blogs. Competitors publish every week in admission season. | Editorial calendar (`blogCalendar.ts` exists) | Medium | Ongoing |

---

## 4. Technical SEO Checklist

| Check | Status | Details |
|---|---|---|
| Production domain serves the app | **Fail** | campuslelo.com serves the GoDaddy placeholder (H1 "Launching Soon", about 85 words, no meta description). Its live sitemap is GoDaddy's (`sitemap.website.xml`). |
| Old-domain migration | **Fail** | collegepune.com returns 200 with the old "CollegePune" build and ranks on page 1. There are no 301s to campuslelo.com. |
| HTTPS / www → apex | Pass | `www.campuslelo.com` → apex; HSTS is configured in `next.config.ts`. |
| robots.txt | **Warning** | `src/app/robots.ts` **and** `public/robots.txt` both exist and conflict. `robots.ts` disallows `/_next/`, which blocks the JS and CSS Google needs to render pages. |
| XML sitemap | **Warning** | Dynamic and thorough, but it has 4 URLs that 301 and 13 URLs with no page (`/colleges-aundh-pune`, `/colleges-baner-pune`, `/colleges-kharadi-pune`, `/colleges-nigdi-pune`, 9 Noida URLs). `/alumni`, `/mba-in-pune` and `/pgdm-in-pune` are missing from it. Blog `lastModified` is always `new Date()`. |
| Canonical tags | Pass | Set on every page via `genMeta({ path })`. The root layout correctly leaves canonical unset. |
| Redirects | Pass (with caveat) | About 100 well-organized 301s, no chains. 4 of them shadow real pages (see section 2). |
| Broken internal links | **Fail** | 22 unresolved internal hrefs, 2 of them in the sitewide footer. |
| Structured data coverage | Pass | FAQ, Breadcrumb, ItemList, CollegeOrUniversity, Course, BlogPosting, Organization. |
| Structured data validity | **Fail** | Self-serving or fabricated `AggregateRating` and `Review` (Critical). `LocalBusiness` with an Undri street address: confirm it is a real, staffed office. |
| JSON-LD rendering method | **Warning** | 139 of 146 schema blocks use `next/script` (`<Script>`), which injects them on the client after hydration. Google renders them, but many AI crawlers and Bing see less. Use a plain `<script type="application/ld+json">` in server components. |
| hreflang | **Warning** | Invalid `mr-IN` alternate pointing to the English URL. |
| Mobile / viewport | Pass | Tailwind responsive layout; Next.js sets the viewport. |
| Fonts | Pass | `next/font` with `display: swap`; secondary font not preloaded. |
| Page speed / CWV risks | **Warning** | Three global client widgets (AIChatWidget, LeadWidgets, LeadBar) plus GTM plus framer-motion on every page can hurt INP and LCP. The PWA's `aggressiveFrontEndNavCaching` can serve stale content. Measure with PageSpeed Insights after launch. |
| Images | **Warning** | `remotePatterns` allows hotlinking from `collegedunia.com` image hosts. That's a copyright and reliability risk, and it sends competitor-hosted signals. Self-host the images in Supabase Storage. |
| AI crawler access / llms.txt | Pass | Explicit allow rules, `llms.txt` and `llms-full.txt`, `/api/ai-context`. |
| Meta keywords | Info | Ignored by Google. Harmless, but the shared default list is added to every page. |
| Indexation of tool pages | Warning | `/ask`, `/predictor`, `/roi-calculator` and `/nirf-insights` rely on a layout for metadata. Verify. |

---

## 5. Competitor Comparison Summary

Competitors observed in the SERP for core Pune queries: **Collegedunia**, **Careers360**, **Shiksha** (national portals) and **thetoppercentile.co.in** (MBA CET niche). Getmyuni and Sunstone also appear.

| Dimension | CampusLelo (codebase) | Collegedunia | Careers360 | thetoppercentile | Winner |
|---|---|---|---|---|---|
| Keyword footprint (Pune) | About 680 URLs planned; 0 indexed on the new domain | Very large, national | Very large; about 700 Pune colleges listed | Narrow (MBA CET) | Collegedunia / Careers360 |
| Content depth per page | Medium; programmatic pages are thin | High (UGC + data) | High (data + rankings) | High in its niche | Competitors |
| Publishing frequency | Low (about 20 blogs) | Daily | Daily | Weekly in season | Competitors |
| Backlink signals | New domain, effectively none | Very strong | Very strong | Moderate | Competitors |
| Technical score | Strong (canonicals, schema, sitemap, AI access) once deployed | Good but heavy pages | Good | Basic WordPress | **CampusLelo** (after fixes) |
| SERP features | None yet; FAQ schema ready | PAA, rich results | PAA, ranking lists | Some PAA | Competitors |
| Differentiator | AI counselor, predictor, ROI calculator, Pune-only focus | Breadth | Rankings and predictors | CET expertise | Your edge is **local depth + tools** |

**Takeaway:** Don't fight the national portals on head terms right away. Win long-tail Pune queries first: cutoffs by percentile, area pages, "X vs Y" comparisons, fee filters. Use your tools (predictor, fees calculator) as link-worthy assets.

---

## 6. Prioritized Action Plan

### Quick Wins (this week)

| # | Action | Impact | Effort | Dependencies |
|---|---|---|---|---|
| 1 | Deploy the Next.js app to campuslelo.com (point DNS to Vercel and remove the GoDaddy site builder). | High | 1–2 h | Vercel project, DNS access |
| 2 | Add a path-preserving 301 from collegepune.com/* to campuslelo.com/* (Vercel domain redirect or a middleware host check). Keep both domains verified in GSC and file a **Change of Address**. Keep the old domain registered for 12+ months. | High | 1–2 h | #1 |
| 3 | Remove the `AggregateRating` fallback and stop outputting hardcoded or sample reviews as schema (`lib/seo.ts:351–370`, `ReviewSection.tsx:348`). | High | 1 h | — |
| 4 | Delete `public/robots.txt`. In `robots.ts`, remove `/_next/` from `disallow` and add `/api/` (except `/api/llm.txt` and `/api/ai-context`). | High | 15 min | — |
| 5 | Fix the 4 shadowed pages and remove them, plus the 13 phantom URLs, from `sitemap.ts`. | Medium | 30 min | — |
| 6 | Fix the 22 broken internal links (footer first). | Medium | 1 h | — |
| 7 | Remove the `mr-IN` hreflang. Replace `dateModified: today` and blog `lastModified: new Date()` with real timestamps. | Medium | 30 min | — |
| 8 | Add metadata to `/ask`, `/predictor`, `/roi-calculator` and `/nirf-insights`. | Medium | 30 min | — |
| 9 | Submit the sitemap in GSC and Bing Webmaster Tools, and ping IndexNow (`/api/indexnow` exists). | Medium | 15 min | #1 |

### Strategic Investments (this quarter)

| # | Action | Impact | Effort | Dependencies |
|---|---|---|---|---|
| 1 | **Cutoff data hub:** college × branch × CAP round for MHT-CET and MAH MBA CET, 3 years of data with sources. It's the biggest traffic and link magnet in the niche. | High | Multi-day | Data collection |
| 2 | **Programmatic page quality pass:** give the top 15 cluster pages unique tables and 800+ words, and merge or `noindex` the weakest 10. | High | Multi-day | — |
| 3 | **Real review system** with moderation. Re-enable rating schema only from real data. | High | Multi-day | Supabase tables (partly built) |
| 4 | **Switch JSON-LD to server-rendered `<script>`** across 139 usages, ideally through a shared `<JsonLd>` component. | Medium | Half day | — |
| 5 | **Area page cluster** (Kharadi, Aundh, Baner, Nigdi, Pimpri, Lohegaon), interlinked with a "Colleges by area" hub. | Medium | Half day | — |
| 6 | **Comparison expansion** from 14 to about 40 high-intent pairs, using data-driven templates with verdict summaries. | Medium | Half day | — |
| 7 | **Link building:** pitch the fees calculator, placement comparator and cutoff hub to Pune student subreddits, Quora, local education journalists and college clubs. Get listed on Google Business Profile only if the Undri office is real. | High | Ongoing | #1 |
| 8 | **E-E-A-T:** add an About/Editorial page with named authors and credentials, a methodology page for rankings, and "last verified" dates with sources on data pages. Today `/about` redirects to the homepage. | Medium | Half day | — |
| 9 | **Decide on Noida:** separate section or brand, or remove it, to keep the topical focus on Pune. | Medium | Moderate | Business decision |
| 10 | **Performance:** lazy-load the chat and lead widgets after interaction or idle, check INP once live, and replace hotlinked collegedunia images. | Medium | Half day | #1 |

---

*Sources (SERP sampling, 4 Oct 2026):* [Collegedunia — Engineering colleges in Pune](https://collegedunia.com/engineering/pune-colleges) · [Careers360 — Pune engineering via MHT-CET](https://engineering.careers360.com/colleges/ranking/top-engineering-colleges-in-pune-accepting-mht-cet-score) · [Getmyuni — Pune engineering](https://getmyuni.com/engineering-colleges/pune) · [Sunstone — Top engineering colleges in Pune 2026](https://sunstone.in/blog/top-engineering-colleges-in-pune-2026-compare-colleges) · [collegepune.com — Engineering colleges Pune](https://collegepune.com/engineering-colleges-pune) · [thetoppercentile — MAH MBA CET colleges](https://thetoppercentile.co.in/top-10-mba-colleges-in-maharashtra-through-mah-mba-cet-2026) · [Cracku — 70–80 percentile MBA CET colleges](https://cracku.in/mah-mba-cet-colleges-accepting-70-80-percentile/) · [Careers360 — Pune degree colleges list](https://university.careers360.com/colleges/list-of-degree-colleges-in-pune?page=3)

---

## 7. Fix Log — 4 Oct 2026

**Fixed in code** (verified: `tsc` clean, `npm run build` passes, rendered HTML checked on the dev server)
- Fabricated review markup removed. `generateCollegeSchema` no longer outputs `AggregateRating` or `Review` from static data, and `ReviewSection` adds rating markup only from moderated database reviews.
- Fake freshness removed: `dateModified` is only output when a real `updatedAt` is passed. Sitemap blog `lastmod` uses each post's `updated_at` or `date`. The build-time `Last-Modified` header is gone.
- Invalid `mr-IN` hreflang removed.
- robots: `public/robots.txt` deleted. `/_next/` is crawlable again. `/api/` is disallowed except `/api/og`, `/api/ai-context` and `/api/llm.txt`.
- Shadowed pages: the `/bsc-colleges-pune` redirect was removed, so the dedicated BSc page now serves. The other 3 duplicates keep their 301s and are out of the sitemap.
- Sitemap: 16 URLs that redirect or don't exist were removed. Added `/mba-in-pune`, `/pgdm-in-pune`, `/colleges-in-greater-noida` and `/pgdm-colleges-noida`.
- 22 broken internal links fixed (footer, admission guide, medical, MBA HR/Finance, area and Noida pages). 16 links that went through redirects now point straight at the destination.
- `/alumni` and `/alumni/*` are `noindex, follow` and out of the sitemap until the profiles are verified.
- JSON-LD: 348 `next/script` tags in 144 files now render server-side as plain `<script>`, serialized with `safeJsonLd()` (`src/lib/jsonld.ts`), which escapes `<` to prevent `</script>` injection.
- `.env.local` base URL changed from collegepune.com to campuslelo.com.

**Still open (needs you or a later pass)**
- Deploy to campuslelo.com. Set `NEXT_PUBLIC_BASE_URL` and `NEXT_PUBLIC_SITE_URL` to `https://campuslelo.com` in Vercel.
- 301 every collegepune.com path to campuslelo.com, then file a GSC Change of Address and submit the sitemap.
- 89 long titles and 73 long meta descriptions.
- Thin programmatic pages, Kharadi/Aundh/Baner area pages, and the cutoff hub (see section 6).
- Replace the hotlinked collegedunia images. Confirm the Undri `LocalBusiness` address is a real office.
- The unreachable page files (`btech-colleges-pune`, `top-engineering-colleges-pune`, `best-mba-colleges-pune`) can be deleted.

---

## 8. MBA / PGDM & Entrance-Exam Audit — 4 Oct 2026

Scope: every MBA/PGDM page, the exam data (`src/data/exams.ts`, `src/data/mbaColleges.ts`, `src/data/colleges.ts`) and exam routes.

### Findings

| # | Finding | Severity | Status |
|---|---|---|---|
| 1 | SIBM Pune and SCMHRD were listed as accepting **CAT** (and XAT/GMAT), with invented "CAT 85–90+ percentile" cut-offs. Official SIU/SIBM pages say admission is through **SNAP**. | **Critical** (factually wrong, high-intent pages) | Data fixed in `mbaColleges.ts` and `colleges.ts`. CAT city pages rebuilt. 26 other files still mention it (backlog below). |
| 2 | MIT-WPU MBA listed **ATMA**. The official 2026 brochure lists CAT, XAT, NMAT, GMAT, CMAT, MAH-CET, PERA and MAT, without ATMA. | High | Fixed |
| 3 | Six "MBA colleges in Pune accepting [exam]" pages and `/cat-colleges-pune` published per-college percentile cut-offs with no source. | **Critical** | Rebuilt from verified data; the old versions are archived in `docs/archive/replaced-pages-2026-10-04/` |
| 4 | `/cat-colleges-pune` and `/mba-colleges-in-pune-accepting-cat` targeted the same keyword (cannibalisation). | High | 301 to `/mba-colleges-in-pune-accepting-cat` |
| 5 | Pages claimed "AICTE-approved PGDM is fully equivalent to MBA for all purposes". In fact, AIU grants equivalence to specific programmes for a fixed period. One page also called SCMHRD a PGDM; it awards an MBA through SIU. | High | Fixed on `/pgdm-colleges-pune`, `/pgdm-in-pune`, `/mba-in-pune` and `/direct-admission-mba-colleges-pune`. New `/mba-vs-pgdm` guide added. |
| 6 | Exam data had stale or wrong dates: CAT 2026 as "Nov 23" (correct date 29 Nov), CMAT "Mar 20 2026", SNAP "Dec 6/13/20". There were no XAT, NMAT, ATMA or MAH MBA CET entries and no sources anywhere. | High | Replaced with a sourced data layer (`src/data/mba/`) |
| 7 | `/exams` emitted Event schema with a placeholder `startDate: 2026-01-01` for exams without a parseable date. | High (fabricated structured data) | Now outputs events only for confirmed dates |
| 8 | `/exams` cards did not link to the exam detail pages. | Medium | Fixed: each card links to its guide, plus an MBA/PGDM exam-guide strip |
| 9 | No exam sub-pages (syllabus, score vs percentile, preparation, colleges) existed. | High (missed demand) | 36 sub-pages built: 27 indexable, 9 noindexed until they have enough verified content (2 colleges pages, 7 preparation pages) |
| 10 | The predictor (`/predictor`) uses hardcoded per-college CAT/SNAP/MAT/CMAT thresholds without a stated methodology. | High | **Pending** — see the implementation report |
| 11 | Delhi / Delhi NCR: no verified MBA/PGDM data. | Medium | **Pending** — no pages created, by design |

### Content backlog — unverified MBA claims still live
Files that still say SIBM/SCMHRD accept CAT, or give CAT cut-offs for them:
`admission-guide`, `best-mba-colleges-pune` (unreachable, 301), `colleges-wakad-pune`, `commerce-colleges-pune`, `cutoffs`, `direct-admission-mba-colleges-pune`, `events`, `mba-admission-pune-without-cat`, `mba-colleges-in-pune-for-finance`, `mba-colleges-in-pune`, `mba-colleges-pune`, `mba-cutoff-pune`, `mba-in-pune`, `page.tsx` (home), `predictor`, `private-mba-colleges-pune`, `sibm-vs-scmhrd-pune`, `top-10-mba-colleges-in-pune`, `top-placement-colleges-pune`, `components/home/HomepageNewsSection`, `components/home/PuneCollegeGuide`, `data/blogs.ts`, `data/colleges.ts` (SIBM FAQ text around lines 530–575), `data/seoPages.ts`.

MBA pages with unsourced percentile cut-offs (number of claims): `mba-colleges-pune` (11), `mba-in-pune` (10), `pune-colleges-comparison-engineering-mba` (8), `mba-cutoff-pune` (8), `top-10-mba-colleges-in-pune` (6), `mba-admission-pune-without-cat` (6), `direct-admission-mba-colleges-pune` (5), `private-mba-colleges-pune` (4), `mba-colleges-pune-scholarship` (4), `mba-colleges-in-pune-under-5-lakh` (4), plus about 12 pages with 1–2 claims each. The three `mba-colleges-in-pune-cutoff-{50,70,90}-percentile` pages need real CAP cut-off data or should be noindexed.

Stale 2025-cycle text: `mba-admission-process-pune`, `mba-cutoff-pune`, `mba-in-noida`.
