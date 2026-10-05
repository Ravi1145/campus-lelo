# 90-Day SEO Roadmap — MBA/PGDM (Oct 2026 – Jan 2027)

Timed to the admission calendar: CAT on 29 Nov, NMAT window 2 Nov – 20 Dec, SNAP on 13/19/26 Dec, MAT in December, XAT on 3 Jan, CAT results in early January.

## Days 0–14 (by 18 Oct) — launch & clean-up
- [ ] Deploy to campuslelo.com, set the Vercel env vars, and 301 collegepune.com (from the main audit). **Blocks everything else.**
- [ ] Verify the Search Console domain property and submit the sitemap (strategy §7).
- [ ] Clear the content backlog in `SEO_AUDIT.md` §8: remove the SIBM/SCMHRD CAT claims (26 files) and the unsourced cut-offs (about 22 pages). Prioritise `/mba-colleges-pune`, `/mba-in-pune`, `/mba-cutoff-pune` and `/top-10-mba-colleges-in-pune`.
- [ ] Noindex `/mba-colleges-in-pune-cutoff-{50,70,90}-percentile` until CAP data is verified.
- [ ] Get the NTA CMAT 2027 bulletin → add dates (tracker).

## Days 15–45 (to 18 Nov) — CAT/NMAT season
- [ ] Verify 10 Pune programmes (content plan §1). Every 3 additions measurably strengthens the city × exam pages.
- [ ] Verify 8 NCR PGDM/MBA programmes → rebuild `/pgdm-colleges-noida` from verified data; draft a Delhi NCR PGDM page (publish at ≥5 verified).
- [ ] Expand preparation content for CMAT, MAT, MAH-CET and SNAP to 3+ areas each, so those pages become indexable.
- [ ] Add official practice links (IIM CAT mock, GMAC NMAT/GMAT, SNAP mocks).
- [ ] Rewrite the remaining long titles (89) from the main audit, starting with MBA pages.

## Days 46–75 (to 18 Dec) — exam days
- [ ] Update hubs on admit-card and exam days (CAT, NMAT, SNAP, MAT).
- [ ] Publish a "CAT 2026 — what happens after the exam" section on the hub: answer key, result timing (from the official notice only), how institutes shortlist.
- [ ] Load MAH MBA CAP round-wise cut-off PDFs (2025 and 2026) into the DB model; design a "previous-year closing percentile" table with sources.
- [ ] First Search Console review: queries at positions 5–20 → add an H2 or FAQ on the ranking page.

## Days 76–90 (to 2 Jan) — results & shortlisting
- [ ] XAT exam-day update (3 Jan) and CAT result update (from the official notice).
- [ ] If CAP data is loaded and reviewed: launch a CAP "previous-year cut-off explorer" (historical data, clearly labelled — not a predictor).
- [ ] Review conversions: hub → `/counselling` path; strengthen CTAs on the pages with the most traffic.
- [ ] Re-verify every `programAdmissions` record for the 2027 intake; update `lastReviewed`.

## Success measures (set once Search Console data exists)
- Indexed pages: all sitemap URLs indexed in GSC Coverage.
- Impressions for exam-cluster queries (CAT, XAT, MAH MBA CET, SNAP) per month.
- CTR on hubs ≥ site average; average position for the "colleges accepting {exam} pune" cluster.
- Counselling leads attributed to `/exams/*` and `/mba-colleges-in-pune-accepting-*`.
