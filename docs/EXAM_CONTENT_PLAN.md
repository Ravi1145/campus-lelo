# Exam Content Plan

Tracking sheet: `docs/templates/exam-content-tracker.csv`. Data lives in `src/data/mba/exams.ts`. Add facts there with a `SourceRef`; pages update automatically.

## Editorial rules
1. **Source every fact.** Prefer the exam body's own site. Use a secondary source only when two independent portals agree, and label it.
2. **Withhold, don't guess.** Conflicting or unconfirmed dates go in `datesNote`, not `keyDates`.
3. **No numbers without data.** No score-vs-percentile tables, predicted cut-offs, or "X percentile gets you college Y" unless backed by published data with a stated method and an "estimate" label.
4. **Mark editorial content as editorial.** Preparation tips are labelled as CampusLelo guidance.
5. **Per-programme acceptance only.** Add to `programAdmissions.ts` only after reading the institute's admission page for the stated intake.

## Current coverage (4 Oct 2026)

| Exam | Cycle covered | Dates | Pattern | Prep areas | Verified programmes | Gaps / next actions |
|---|---|---|---|---|---|---|
| CAT | 2026 | ✅ secondary (official site unreadable) | ✅ secondary | 4 | 3 (+CAP) | Confirm marking scheme from the CAT 2026 notification PDF; add the result date when announced |
| XAT | 2027 | ✅ official | ✅ official | 4 | 3 (+CAP) | Confirm fee; official eligibility page link was 404 |
| CMAT | 2027 | ⚠️ withheld (sources conflict) | ✅ secondary | 2 | 3 (+CAP) | Get the NTA information bulletin → add dates; expand prep to 3+ areas |
| MAT | Dec 2026 | ✅ official | ✅ official | 2 | 2 (+CAP) | Expand prep; add Feb/May 2027 sessions when announced |
| MAH MBA CET | 2026 (2027 awaited) | ✅ (2026) | ✅ secondary | 2 | 1 (+CAP) | Add the 2027 schedule when the CET Cell publishes it; add official CAP round cut-off PDFs; expand prep |
| SNAP | 2026 | ✅ official (test dates) | ✅ secondary (new 4-section pattern) | 2 | 2 | Confirm the pattern from the SNAP 2026 bulletin; add the result date; expand prep |
| NMAT | 2026 | ✅ official | ✅ official (section times secondary) | 1 | 1 | Verify more NMAT programmes (NMIMS etc.) → colleges page becomes indexable |
| ATMA | 2026 sessions | ✅ official (past sessions) | ✅ secondary | 1 | 0 (+CAP) | Verify ATMA programmes; add upcoming sessions |
| GMAT | Focus Edition | n/a (year-round) | ✅ official | 1 | 3 (+CAP) | Expand prep |

## Next content to build (priority order)
1. **Verify 10 more Pune programmes**: PUMBA (CAP), BVIMR, DYPIM, IIMP/Indira University (the admission route changed — verify), SIIB, SIMS, SIOM, BIMM, FLAME (exam list not on its MBA page), IMDR. Each one makes city × exam pages more useful.
2. **Verify 8+ NCR institutes**: Amity Business School (site blocked automated access — check manually), IMS Ghaziabad, IMT Ghaziabad, Jaipuria Noida (campus-wise programmes), GL Bajaj PGDM, Lloyd, Galgotias MBA, IILM. Then build `/pgdm-colleges-noida` and a Delhi NCR page from verified data.
3. **MAH MBA CAP cut-off data**: download the CET Cell's round-wise cut-off PDFs for 2025 and 2026 into `mba_cutoffs_historical`. That unlocks a sourced "previous-year CAP closing percentile" table and, later, a predictor.
4. **Official practice links**: CAT (IIM mock), NMAT and GMAT (GMAC), SNAP mocks (snaptest.org). Add to `officialPractice`.
5. **Expand preparation** for CMAT, MAT, MAH-CET, SNAP, NMAT, ATMA and GMAT to 3+ areas each, so those pages become indexable.
6. **PGDM specialisation pages**: only where 3+ verified programmes exist (start with International Business: BIMTECH, …).

## Refresh calendar
| When | Action |
|---|---|
| Late Jul – Aug | CAT notification; XAT registration; NMAT and SNAP registration → update dates |
| Sep – Oct | CMAT notification (NTA); MAT December session |
| Dec – Jan | Admit cards, exam days, answer keys, results (CAT result early Jan) → update hubs |
| Feb – Mar | MAH MBA CET schedule and registration |
| Jun – Sep | MAH MBA CAP rounds → publish verified round-wise data |
| Every cycle | Re-verify every `programAdmissions` record for the new intake; bump `lastReviewed` |
