# Technical SEO audit: campuslelo.com

_Audited 2026-10-09. Live site (https://www.campuslelo.com) plus the local production build that contains today's fixes. SEOmator scores: 96/100 live (6-page browser crawl), 97/100 local (25-page crawl)._
_Not available: real-user Core Web Vitals (CrUX / PageSpeed API key not configured). Lab values below are from a headless browser._

## Technical score: **88 / 100** (before the host fix below; ~94 after)

| Category | Status | Score | Notes |
| --- | --- | --- | --- |
| Crawlability | pass | 94 | robots.txt valid, sitemap referenced, AI crawlers allowed, `/api/` and `/admin/` blocked, no accidental noindex. |
| Indexability | **warn** | 72 | **Canonical host conflict (below).** Everything else clean: 930 sitemap URLs, all 200, all self-canonical, no duplicate titles. |
| Security | pass | 96 | HTTPS enforced, HSTS (2 years, preload), CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy. Added `frame-ancestors`. |
| URL structure | pass | 95 | Clean hyphenated slugs, trailing slash redirects in one hop, no query-string content URLs in the sitemap. |
| Mobile | pass | 100 | Viewport, no horizontal scroll, touch targets pass. |
| Core Web Vitals (lab) | warn | 80 | First byte 0.2–0.5 s with CDN and Brotli. FCP 2.2 s on one page (target 1.8 s). CLS fine. INP not measurable headless. |
| Structured data | pass | 95 | Organization, WebSite, FAQPage, Service, Dataset, WebPage (speakable), Article, BreadcrumbList, CollegeOrUniversity. |
| JS rendering | pass | 100 | All pages server-rendered; 850+ words in raw HTML. |
| IndexNow | pass | 85 | Key file served (200). The file name still carries the old brand (`collegepune2026indexnow.txt`); works, harmless. |

## Critical issue (fix first)

**Canonical host conflict.** `https://campuslelo.com/*` returns **308 → `https://www.campuslelo.com/*`**, but every canonical tag, `og:url`, the sitemap and `robots.txt` use the non-`www` address. Google is told "the main address is X" while X redirects to Y. This can produce "Page with redirect" / "Alternate page with proper canonical" statuses in Search Console and slow indexing. It also makes SEOmator report the hreflang set as not self-referencing.

Fix at the host (no code change): in the hosting dashboard (Vercel → Project → Settings → Domains) make **`campuslelo.com` the primary** domain and redirect `www.campuslelo.com` to it. Then `curl -sI https://campuslelo.com/mba` should return 200 with no redirect.
Alternative: keep `www` as primary and set `NEXT_PUBLIC_BASE_URL=https://www.campuslelo.com` in the host's environment variables, then redeploy. The site reads that variable everywhere. Pick one; don't mix.

## High priority

1. **Deploy today's build.** The live sitemap has 918 URLs and the live pages lack the `<main>` landmark. The local build has 930 URLs plus the Delhi/NCR pages, `<main>`, header labels and the fixes below.
2. **Page weight (fixed in part).** Homepage HTML was 742 KB raw (about half is Next.js data sent for hydration). Looping strips no longer ship duplicate cards in the server HTML: **742 → 649 KB, ~3,800 → ~3,250 DOM elements.** Still above ideal; the homepage has many sections. Next steps if you want it lighter: fewer cards per rail, lazy-mount below-the-fold sections.
3. **Two-hop redirect chain** `http://campuslelo.com` → `https://campuslelo.com` → `https://www.campuslelo.com`. Disappears or shortens once the primary domain is set correctly.

## Medium priority

4. **Accessibility names (fixed):** the header search box and the two mobile icon buttons had no accessible name. Added labels.
5. **Image dimensions (fixed):** 25 homepage images had no width/height (layout-shift risk). Added to the college logo images; verify CLS after deploy.
6. **`frame-ancestors` (fixed):** added to the CSP for normal pages (the `/embed/*` widget keeps its own CSP).
7. **Server response 634 ms on two cold pages.** CDN hits are fast; cold ISR renders are slower. Acceptable; monitor in Search Console.
8. **Colour contrast:** SEOmator flags about 10 potential contrast spots on the homepage. Needs a visual check.

## Low priority / informational

- No `alt-svc` header detected (HTTP/3 advertisement); informational on Vercel.
- INP could not be measured in a headless run; check real INP in Search Console → Core Web Vitals once there is traffic.
- Test artefacts excluded: "localhost URL", "sitemap domain" and HTTP-vs-HTTPS canonical findings come from auditing a local server, not from the live site.

## Verification

- `scripts/seo-index-audit.mjs`: all 930 sitemap URLs 200, indexable, self-canonical, unique titles.
- `scripts/seo-broken-links.mjs`: 0 broken internal links.
- Browser check of the build: loops intact (60 logos, 24 guide cards), one `<main>`, no console errors, no unnamed header controls.

## Agent-friendliness (opportunity, not a failure)

Semantic landmarks are now in place, forms use real labels, and interactive controls are real `<button>`/`<a>` elements. Remaining gap: a few icon-only controls elsewhere may lack names; the SEOmator run found none after the header fix on the audited pages.
