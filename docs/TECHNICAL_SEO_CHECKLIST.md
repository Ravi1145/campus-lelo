# Technical SEO Checklist — MBA/PGDM Exam Build

Tested 4 Oct 2026 against the local dev server (`localhost:5000`) and `npm run build`.

| Check | Result | How verified |
|---|---|---|
| Unique `<title>` per indexable page | ✅ 9 hubs, 36 topic pages, 7 city pages, MBA vs PGDM: all unique; ≤60 chars (MAH MBA CET hub uses a shorter fallback) | curl of each URL |
| Unique meta description | ✅ Generated per exam and topic from data (≤160 chars) | curl |
| Exactly one H1 | ✅ every new page | curl count of `<h1` |
| Self-referencing canonical | ✅ every new page | curl `link[rel=canonical]` |
| Robots: indexable pages | ✅ `index, follow` | curl meta robots |
| Robots: thin pages | ✅ `noindex, follow` on `/exams/{nmat,atma}/colleges` and 7 preparation pages with <3 areas | curl; `collegesPageIndexable`, `prepPageIndexable` |
| HTTP status: unknown exam/topic | ✅ 404 (`/exams/cat/foo`) | curl |
| Redirects | ✅ `/cat-colleges-pune` → `/mba-colleges-in-pune-accepting-cat` (308 permanent); internal links point to the target directly | curl |
| XML sitemap | ✅ hubs + indexable topics + city pages + `/mba-vs-pgdm`; noindexed pages excluded; `/cat-colleges-pune` removed | `/sitemap.xml` |
| robots.txt | ✅ unchanged from the earlier fix (`/_next/` crawlable, `/api/` blocked except og/ai-context/llm.txt) | `/robots.txt` |
| Crawlable internal links | ✅ All plain `<a href>` from server components; `/exams` cards now link to guides; MBA cluster pages link to all hubs | read_page / source |
| Breadcrumbs | ✅ Visible breadcrumb + `BreadcrumbList` JSON-LD on every new page | rendered HTML |
| Structured data appropriate to visible content | ✅ `FAQPage` only where FAQs are visible (hub, city pages, MBA vs PGDM); no `Event`/`Course` without confirmed dates; `/exams` Event list now skips undated exams | JSON-LD review |
| JSON-LD in server HTML, escaped | ✅ plain `<script>` via `safeJsonLd()` | curl |
| Exam content in crawlable HTML | ✅ statically prerendered (SSG); no client JS needed | build output (●) |
| Mobile usability | ✅ 375px: no horizontal page scroll; tab strip scrolls inside its own container; hero stacks on mobile (fixed during testing) | browser at mobile viewport |
| Console errors | ✅ none on `/exams/cat` | browser console |
| Filter / pagination indexing | ✅ no new filter URLs; `/colleges?exam=` stays out of the sitemap | sitemap review |
| Updated content dates | ✅ `lastReviewed` shown on pages and used as sitemap `lastmod` | rendered page / sitemap |
| Broken internal links | ✅ 0 (link checker from the earlier audit, re-run) | scratch script |
| Type check / build | ✅ `tsc --noEmit` clean; `npm run build` passes | CLI |
| Lint | ⚠️ No ESLint script or config in the project (`package.json` has none) | — |
| Automated tests | ⚠️ No test framework is configured (per CLAUDE.md); verification was manual plus scripted | — |
