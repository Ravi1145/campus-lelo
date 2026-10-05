# SEO Implementation Report — MBA/PGDM Exam-First Build

**Date:** 4 Oct 2026 · **Stage:** 1 (foundation + highest-value pages)

## Implemented

### New data layer — `src/data/mba/`
- `types.ts`: typed model; every fact has a `SourceRef` (official or secondary, plus the date checked).
- `exams.ts`: 9 sourced profiles (CAT, XAT, CMAT, MAT, MAH MBA CET, SNAP, NMAT, ATMA, GMAT), covering dates, eligibility, fee, pattern, syllabus, scoring method, preparation and FAQs.
- `programAdmissions.ts`: 5 verified programme records (SIBM, SCMHRD, MIT-WPU, BIMTECH, Jaipuria Noida), the Maharashtra CAP rule, and the indexability rules.

### New pages
| Page | Count |
|---|---|
| Exam hubs `/exams/{exam}` (existing route extended; legacy MHT-CET/JEE/NEET pages unchanged) | 9 |
| Exam sub-pages `/exams/{exam}/{syllabus,score-vs-percentile,preparation,colleges}` | 36 (27 indexable) |
| `/mba-vs-pgdm` | 1 |
| `/mba-colleges-in-pune-accepting-snap` | 1 |

### Rebuilt / corrected
- 6 city × exam pages (`/mba-colleges-in-pune-accepting-{cat,cmat,gmat,mat,mh-cet,xat}`) now use one verified-data template. The old versions, with unsourced cut-offs, are archived in `docs/archive/replaced-pages-2026-10-04/`.
- `/cat-colleges-pune` → 301 to `/mba-colleges-in-pune-accepting-cat` (duplicate intent). Internal links were updated and the URL was removed from the sitemap.
- Exam acceptance data fixed: SIBM and SCMHRD → SNAP only; MIT-WPU → the verified list without ATMA. The SIBM "CAT 90+" cut-off was removed.
- `src/data/exams.ts`: corrected 2026 dates for CAT, SNAP, MAT and CMAT. Added XAT, NMAT, MAH MBA CET and ATMA rows to the `/exams` calendar.
- `/exams`: Event schema is output only for confirmed dates (the fabricated `2026-01-01` placeholder is gone). Cards link to each guide, and an MBA/PGDM exam-guide strip was added.
- Blanket "PGDM = MBA" claims corrected on 4 pages; SCMHRD is no longer described as a PGDM.
- `MBAClusterPage` (about 30 MBA pages) now links to every exam hub.
- `/llms.txt`: removed unverified MBA cut-offs, added the exam-guide links and corrected the MBA exam timeline. A conflicting `public/llms.txt` was causing a **500 error in dev**; the static file is archived and the dynamic route is kept.
- Sitemap: added hubs, indexable topics and new pages; noindexed pages are excluded by the same rule functions.

### Database
- Proposed normalised schema: `docs/migrations/2026-10-04-entrance-exam-model.sql`. It is **not applied**; the existing tables and production data are untouched.

## Tested & verified
See `docs/TECHNICAL_SEO_CHECKLIST.md`. In summary:
- `tsc --noEmit` is clean and `npm run build` passes, with every new route prerendered.
- Every new URL returns 200, has one H1, a self-canonical and the correct robots tag. An unknown topic returns 404 and the old CAT URL redirects permanently.
- The sitemap contents and exclusions were verified.
- The source-level link check finds 0 broken internal links. A crawl of 76 rendered links found 0 errors after the `/llms.txt` fix.
- Mobile at 375px has no horizontal overflow, after a hero-layout fix made during testing. There are no console errors.

## Not done / pending (with reasons)
| Item | Reason / next step |
|---|---|
| Percentile calculators, college predictors, `/tools/*` | No reliable methodology or data (strategy §5). Needs official CAP cut-off history first |
| Previous-year papers / mock pages | Need official sources to link; no third-party copying |
| Delhi / Delhi NCR listing pages | No verified programme data; building them now would mean fabricating |
| Pune exam × PGDM pages, specialisation clusters | Need ≥3 verified programmes per page |
| 26 files still claiming SIBM/SCMHRD accept CAT; about 22 MBA pages with unsourced percentile cut-offs; 3 pages with stale 2025-cycle text | Content backlog, listed file by file in `docs/SEO_AUDIT.md` §8 |
| Data inconsistency across the site | Different figures for SIBM's NIRF rank (13 vs 14) and average package (₹24 vs ₹28 LPA). Pick one sourced figure and centralise it |
| `/predictor` | Uses hardcoded per-college thresholds; review or label as indicative |
| `/mba-colleges-in-pune-cutoff-{50,70,90}-percentile` | Need verified CAP data, or noindex |
| Engineering/medical cut-offs in `/llms.txt` | Out of this brief's scope; same verification policy should apply |
| Search Console / analytics data | Not connected; steps in strategy §7 |
| Lint / automated tests | The project has no ESLint config and no test framework |
| Applying the DB migration | Needs owner review on staging |

---

## Stage 2 — AEO / GEO / AIO + lead capture (5 Oct 2026)

### Answer-engine & AI-search optimisation
- **Quick answers:** each exam hub, exam sub-page, city × exam page and `/mba-vs-pgdm` opens with a 35–60 word direct answer built from verified data (`.quick-answer`).
- **WebPage JSON-LD** on those pages, with the real `dateModified`, the publisher, `citation` (source URLs), `speakable` (pointing at the quick answer), and an `ItemList` of verified programmes on city pages.
- **Visible "Sources" list** on every exam and city page, linking to the editorial policy and a corrections email.
- **New `/editorial-policy` page** describing the verification process (official vs secondary, withholding conflicts, per-programme acceptance), referenced as `publishingPrinciples`. Linked from the footer, every sources list, `llms.txt` and the sitemap.
- **`/api/ai-context` feed:** a new `mbaEntranceExams` block (exam profiles with source URLs, verified programmes, the CAP rule). The unverified SNAP/CAT cutoffs were removed.
- **Header MBA menu:** now links MAH MBA CET, NMAT, the CAT-colleges page and MBA vs PGDM.

### Lead capture
- **New `MbaLeadForm`:** name, phone, exam (pre-filled), score, MBA/PGDM, city and consent, with a honeypot field. It fires a `generate_lead` dataLayer event (source, placement, exam, programme) for GTM/GA4.
- **Placed on:** all 9 exam hubs and 36 sub-pages (sticky sidebar), 7 city × exam pages, `/mba-vs-pgdm`, and about 30 MBA cluster pages (`source: mba_cluster`).
- **`/api/leads` hardening:**
  - Fails loudly (503) only if *both* the database and the email backup fail; previously it always said "Thank you" even when the lead was lost.
  - Rate limit of 10 per IP per 10 minutes, plus a honeypot.
  - The name falls back to "Website visitor" so the NOT NULL column never fails.
  - UTM, exam, programme, city and consent details now survive: they were silently dropped before, and are now folded into `message`. The proposed columns are in `docs/migrations/2026-10-05-leads-attribution.sql`.
- **Mailer:** user-typed values are now HTML-escaped (an injection risk before), and the function returns `false` when no recipient is configured instead of reporting success.

### Verified
- `tsc` clean, `npm run build` passes, and 0 broken internal links.
- Lead helpers: scripted assertions for the name fallback, attribution line, UTM filtering, honeypot and phone validation.
- Browser: form validation errors display correctly, and an end-to-end submission with the honeypot filled reaches the success screen and fires `generate_lead` without storing anything.
- API: 400 on bad phone or source, and 429 after the limit (tested at the earlier limit of 5). Honeypot requests answer in about 12ms with no database or email call.
- JSON-LD parses on all updated page types, and there's no horizontal overflow at 375px.
- **Not tested:** a real lead submission. It would write to the production Supabase table and send an email; please submit one test lead yourself after deploying.

### Found, not fixed
- A dev-only React warning about a duplicate key for `coep-college-of-engineering-pune` from a global component, present before this work. The source isn't confirmed (not the header, footer, compare bar or search modal).
- The homepage "SNAP Colleges in Pune" link pointed to the CAT page. **Fixed:** it now points to `/mba-colleges-in-pune-accepting-snap`.

---

## Stage 3 — Delhi NCR & Noida MBA (5 Oct 2026)

- **`/mba-cutoff-delhi-ncr`** (new). Targets "mba cutoff delhi / delhi ncr", "fms cutoff", "iift cutoff", "mdi cutoff".
  - Shows only shortlist cut-offs an institute released and independent sources report identically: the FMS Delhi 2026–28 General composite of 46.739, and IIFT's 2026–28 sectional minimums of 65/55/30.
  - Lists MDI, IMI, IMT, BIMTECH and Jaipuria as "no official cut-off published", with no invented numbers.
  - Includes a quick answer, FAQ/WebPage/Breadcrumb schema with citations, and a lead form (placement `cutoff:delhi-ncr`).
  - Data lives in `src/data/mba/cutoffs.ts`.
- **Blog post `/blog/mba-colleges-delhi-ncr-noida-guide`** (new). Targets "mba colleges in delhi ncr", "mba colleges in noida", "pgdm colleges greater noida".
  - Covers the region map, MBA vs PGDM, verified exam acceptance, 2027 exam dates, cut-offs (linking to the cutoff page), a shortlisting method and FAQs, with a sources section.
  - Stored in `src/data/blog-posts/mba-delhi-ncr-noida.ts`.
- **IIFT New Delhi** added as a verified programme (official 2026–28 prospectus: CAT-based shortlisting). It now appears on `/exams/cat/colleges`.
- **Fixes:**
  - The sitemap now merges database and static blog posts. Before, static posts vanished from the sitemap whenever the database had any posts.
  - Article styling: the `prose` classes were used without `@tailwindcss/typography`, so every HTML blog post rendered H2s as 16px plain text with unstyled tables. A minimal zero-specificity `.prose` stylesheet was added to `globals.css`.
  - MBA/PGDM blog posts now show the shortlist lead form in the sidebar.
- **Internal links:** header MBA menu, `/mba-colleges-noida`, `/pgdm-colleges-noida`, `/mba-in-noida` and the cutoff page ↔ blog.
- **Verified:** build passes; both pages return 200 with one H1, a self-canonical, index robots and valid JSON-LD; both are in the sitemap; 0 broken links (all 14 article links return 200); no horizontal overflow; no console errors on the cutoff page.
- **Pending:**
  - 2027–29 cut-offs: update after CAT 2026 results in Jan 2027.
  - FMS category-wise composites: add once a second source or the official notice is confirmed.
  - Verify more NCR programmes (IMI, IMT, MDI, FORE, LBSIM, DU departments) via their official admission pages.
