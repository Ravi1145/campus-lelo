# Exam-First SEO Strategy — MBA & PGDM

**Owner:** CampusLelo · **Created:** 4 Oct 2026 · **Regions:** Pune, Noida, Greater Noida, Delhi / Delhi NCR

## 1. Positioning

The national portals (Shiksha, Collegedunia, Careers360) win head terms on volume. CampusLelo competes on **accuracy and decision support**:
- Every date, pattern, fee and acceptance claim carries a source and a "checked on" date.
- No invented cut-offs, packages or percentile tables. Where data doesn't exist, the page says so.
- Exam acceptance is tracked per **programme and campus**, not per college. Most competitor errors come from treating it per college. For example, SIBM Pune is listed as "CAT accepted" almost everywhere, but it admits through SNAP.

## 2. Architecture (implemented)

| Layer | URL pattern | Status |
|---|---|---|
| Exam hub | `/exams/{cat,xat,cmat,mat,mah-mba-cet,snap,nmat,atma,gmat}` | Live (9) |
| Exam resources | `/exams/{exam}/{syllabus,score-vs-percentile,preparation,colleges}` | Live (36 pages: 27 indexable, 9 noindexed until they have enough content) |
| City × exam colleges | `/mba-colleges-in-pune-accepting-{cat,xat,cmat,mat,mh-cet,gmat,snap}` | Rebuilt from verified data (7) |
| Programme-type guide | `/mba-vs-pgdm` | Live |
| City listings | `/mba-colleges-pune`, `/mba-colleges-in-pune`, `/pgdm-colleges-pune`, `/mba-colleges-noida`, `/pgdm-colleges-noida`, `/colleges-in-greater-noida` | Existing — content needs verification (see SEO_AUDIT §8) |

### Mapping of the routes proposed in the brief → what we built

| Proposed | Decision | Why |
|---|---|---|
| `/exams/cat` … `/exams/atma` | Built (plus `gmat`) | Reused the existing `/exams/[slug]` route, so `/exams/cat`, `/snap`, `/mat` and `/cmat` keep their URLs and any equity |
| `/exams/cat/syllabus`, `/score-vs-percentile`, `/preparation` | Built | One template; a page is generated only where the data layer has content |
| `/exams/cat/eligibility` | Folded into the hub | Eligibility is 2–3 sentences, too thin for its own URL. The hub ranks for "CAT eligibility" via an H2 |
| `/exams/cat/previous-year-papers` | **Not built** | We host no papers and won't copy third-party ones. Planned when official papers or mocks are linked (see content plan) |
| `/exams/cat/college-predictor`, `/tools/*-predictor` | **Not built** | No reliable methodology yet (see §5). The existing `/predictor` is flagged for review |
| `/tools/cat-percentile-calculator` | **Not built** | CAT percentiles are relative to each year's candidates, and IIMs publish no advance distribution. A calculator would give false numbers |
| `/mba-colleges/pune`, `/pgdm-colleges/pune` … | **Not built** | They would duplicate `/mba-colleges-pune` and `/pgdm-colleges-pune` (cannibalisation). Keep the existing URLs |
| `/colleges/cat-accepting` … | **Not built** | Collides with the `/colleges/[slug]` college-profile route. The same intent is served by `/exams/{exam}/colleges` |
| `/mba-colleges/delhi`, `/pgdm-colleges/delhi(-ncr)` | **Not built** | No verified Delhi programme data yet. These pages would be empty or fabricated |
| `/tools/college-comparison`, `/tools/mba-fees-calculator` | Existing equivalents: `/compare`, `/pune-college-fees-calculator`, `/roi-calculator` | Reuse; review their data |

## 3. Data model & verification policy

- **Static source of truth (today):** `src/data/mba/types.ts`, `exams.ts` and `programAdmissions.ts`. Public pages read these at build time, which keeps exam content in crawlable HTML and needs no client JavaScript.
- **Database (proposed):** `docs/migrations/2026-10-04-entrance-exam-model.sql`. This is a normalised model: exams → cycles → events/sections/eligibility; programmes ↔ exams (many-to-many, per intake); historical cut-offs kept separate from estimates; a source and verified date on every fact. **Not applied.**
- **Source tiers:**
  - `official`: the exam body's or institute's own site or brochure.
  - `secondary`: two or more independent portals agree, used only where the official site can't be read (the CAT site renders blank to automated readers; NTA blocks them).
  - Pages label the tier on every fact.
- **Conflicts:** if sources disagree (e.g. CMAT 2027: 24 Jan vs 7 Feb), publish **no** date and show a note that points to the official site.
- **Re-verification:** each profile has `lastReviewed`; see the tracking sheet `docs/templates/exam-content-tracker.csv`.

## 4. Exam-first internal linking

```
/exams (index) ──► /exams/{exam}  (hub)
                     ├─► /syllabus ─► /score-vs-percentile ─► /preparation ─► /colleges
                     │        (each page ends with a "Next step" card to the next one)
                     ├─► verified programme cards ─► /colleges/{slug} (profile) ─► /counselling
                     ├─► CAP explainer (CAP exams) ─► /mba-colleges-in-pune-accepting-{exam}
                     └─► related exams, /mba-vs-pgdm, counselling CTA (sidebar)
MBA cluster pages (≈30) ─► "MBA & PGDM Entrance Exam Guides" block ─► every hub
City × exam pages ─► hub + syllabus + score-vs-percentile + other-city programmes
```
MBA and PGDM stay distinct: every programme card shows an MBA/PGDM badge, and the CAP explainer states that CAP covers MBA/MMS only.

## 5. Tools policy

A tool ships only when its method can be stated on the page and backed by data:
- **College predictor:** possible once `mba_cutoffs_historical` holds published CAP round cut-offs (CET Cell publishes them per round) for at least 2 years. Output must be "previous-year closing percentile", not a prediction.
- **MAH-CET percentile:** the method is documented (per-session rank percentile), but you need your session's distribution, which only the CET Cell has. **No calculator.**
- **CAT/XAT/CMAT percentile:** no calculator.
- **Fees calculator:** possible from `mba_program_fees` once there are 10 or more verified programmes.

## 6. Indexation rules

| Page type | Rule |
|---|---|
| Exam hub | Always indexable |
| `/colleges` sub-page | Indexable when it has ≥2 verified programmes, or ≥1 programme plus the CAP route (`collegesPageIndexable`) |
| `/preparation` sub-page | Indexable when it has ≥3 preparation areas (`prepPageIndexable`) |
| Unknown exam/topic combinations | 404 (`dynamicParams = false`) |
| Filter or query-string URLs (`/colleges?exam=…`) | Not in the sitemap; canonical points to the clean URL |

The sitemap uses the same functions, so noindexed pages never appear in it.

## 7. Search Console–driven expansion

**Search Console and analytics are not connected to this workspace**, so this strategy contains no performance numbers. To enable data-driven expansion, an authorised owner should:
1. Verify `campuslelo.com` in Google Search Console (Domain property via DNS TXT). Set `NEXT_PUBLIC_GSC_VERIFICATION` if using the HTML-tag method; the layout already reads it.
2. Submit `https://campuslelo.com/sitemap.xml`.
3. Optionally connect a Search Console / GA4 connector to Claude so queries can be pulled directly.
4. After 4–6 weeks of data, run these reports monthly:
   - Pages with high impressions and CTR under 2% → rewrite titles and descriptions.
   - Queries at average position 5–20 → add an H2 or FAQ answering the exact query on the ranking page.
   - Pages with sessions but no `/counselling` conversions → strengthen the next-step links.
   - New exam queries with rising impressions → add a topic page if the content is distinct.
