# MBA / PGDM Keyword Map

Demand and difficulty are **relative estimates** from SERP observation. No SEO tool was connected (Ahrefs or Semrush would add volumes). Status: **Live** = page exists and is indexable · **Noindex** = page exists but is held back · **Planned** = needs verified data first · **Won't build** = reason given.

The existing workbook (`keyword-research.json`) has 80 keywords; 14 of them are MBA/exam-related, and those are all mapped below. Its "CollegePune" title suggestions are obsolete.

## Exam information

| Keyword cluster | Intent | Demand | Target URL | Status |
|---|---|---|---|---|
| cat exam 2026, cat exam date, cat 2026 registration, cat eligibility, cat application fee | Info | High | `/exams/cat` | Live |
| cat syllabus, cat exam pattern, cat sections, cat marking scheme | Info | High | `/exams/cat/syllabus` | Live |
| cat score vs percentile, how is cat percentile calculated | Info | High | `/exams/cat/score-vs-percentile` | Live |
| cat preparation strategy, cat varc/dilr/qa preparation | Info | High | `/exams/cat/preparation` | Live |
| cat percentile calculator, cat college predictor | Tool | High | — | Won't build (no reliable method; see strategy §5) |
| cat previous year papers, cat mock test | Info | High | — | Planned (link official resources only) |
| xat 2027, xat exam date, xat registration, xat eligibility | Info | Med–High | `/exams/xat` | Live |
| xat syllabus, xat decision making, xat pattern | Info | Medium | `/exams/xat/syllabus` | Live |
| xat preparation | Info | Medium | `/exams/xat/preparation` | Live |
| cmat exam pattern, cmat syllabus, cmat eligibility | Info | Medium | `/exams/cmat`, `/exams/cmat/syllabus` | Live |
| cmat 2027 exam date | Info | Medium | `/exams/cmat` | Live (date withheld until NTA confirms) |
| mat exam date december 2026, mat pbt cbt, mat syllabus | Info | Medium | `/exams/mat`, `/exams/mat/syllabus` | Live |
| mah mba cet syllabus, mah cet mba pattern, mah mba cet eligibility | Info | High (Pune) | `/exams/mah-mba-cet`, `/syllabus` | Live |
| mah mba cet percentile, mah cet normalization | Info | High (Pune) | `/exams/mah-mba-cet/score-vs-percentile` | Live |
| mah mba cap rounds, mba cap process maharashtra | Info | High (Pune) | `/exams/mah-mba-cet` (CAP section + FAQ) | Live (candidate for its own page once round-wise data is verified) |
| mah mba cet college predictor, mah cet cutoff pune colleges | Tool/Info | High | — | Planned (needs official CAP cut-off data) |
| snap 2026 exam dates, snap pattern, snap new section ethics | Info | Medium | `/exams/snap`, `/syllabus` | Live |
| nmat 2026 registration, nmat exam window, nmat pattern | Info | Medium | `/exams/nmat`, `/syllabus` | Live |
| atma exam dates, atma pattern | Info | Low–Med | `/exams/atma`, `/syllabus` | Live |
| gmat focus pattern, gmat score range | Info | Medium | `/exams/gmat`, `/syllabus` | Live |

## College discovery

| Keyword cluster | Intent | Demand | Target URL | Status |
|---|---|---|---|---|
| mba colleges in pune accepting cat, cat colleges pune | Commercial | High | `/mba-colleges-in-pune-accepting-cat` (`/cat-colleges-pune` → 301) | Live (rebuilt) |
| mba colleges in pune through cet / accepting mah cet | Commercial | High | `/mba-colleges-in-pune-accepting-mh-cet` | Live (rebuilt) |
| snap colleges pune, symbiosis mba snap | Commercial | Medium | `/mba-colleges-in-pune-accepting-snap` | Live (new) |
| mba colleges in pune accepting cmat / mat / xat / gmat | Commercial | Medium | `/mba-colleges-in-pune-accepting-{cmat,mat,xat,gmat}` | Live (rebuilt) |
| colleges accepting cat / xat / cmat (national) | Commercial | High | `/exams/{exam}/colleges` | Live (NMAT/ATMA noindexed) |
| pgdm colleges accepting cat in noida / greater noida / delhi ncr | Commercial | Medium | `/exams/cat/colleges` (city sections) | Live (2 verified NCR institutes) — city pages Planned |
| colleges accepting 60 / 70 / 80 / 90 percentile in cat | Commercial | High | — | Won't build until historical cut-offs are verified (currently fabrication risk) |
| mba colleges in pune cutoff 50/70/90 percentile (existing pages) | Commercial | Medium | `/mba-colleges-in-pune-cutoff-*` | Existing — **needs verification or noindex** |
| best pgdm colleges in pune, pgdm colleges in pune with fees | Commercial | Medium | `/pgdm-colleges-pune` | Existing (equivalence claims fixed; cut-offs and fees still unverified) |
| best pgdm colleges in noida / greater noida | Commercial | Medium | `/pgdm-colleges-noida`, `/colleges-in-greater-noida` | Existing — verify |
| mba colleges in delhi / delhi ncr, pgdm colleges in delhi | Commercial | High | — | Planned (no verified data) |

## Programme-type & decision content

| Keyword cluster | Intent | Target URL | Status |
|---|---|---|---|
| mba vs pgdm, difference between mba and pgdm, is pgdm equivalent to mba | Info | `/mba-vs-pgdm` | Live |
| pgdm aiu equivalence, pgdm aicte approval | Info | `/mba-vs-pgdm` | Live |
| pgdm specialisations (marketing, finance, HR, analytics …) | Commercial | — | Planned: only where verified programmes exist (BIMTECH IB, Insurance and Retail are verified) |
| mba hr / finance / marketing colleges pune (existing) | Commercial | `/mba-colleges-in-pune-for-*` | Existing — verify cut-off and package claims |
