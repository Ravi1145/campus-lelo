# Portal research: what to change at CampusLelo

Based on the teardown in `.claude/skills/portal-design-patterns/references/competitor-teardown.md`
(six portals, 15 Oct 2026). Limits: homepage plus a few inner pages, no traffic data, no logged-in screens.
"CollegeWollege" in your message was read as CollegeDekho; tell me if you meant another site.

## Mistakes we are making now

| # | Mistake | Evidence | Fix |
|---|---|---|---|
| 1 | College pages have no named author, reviewer or "last checked" date | CollegeDekho shows a named writer; Collegedunia a team byline | Add author, reviewer and checked date to college and guide pages; add Person to schema |
| 2 | College pages have no fee, eligibility or admission-date table, because unsourced figures were removed | Competitors show course, duration, eligibility, total fees and key dates tables | Collect official fee and date pages per college and add a sourced table (value, year, source, checked) |
| 3 | We built many thin variant pages (68 are noindex) | Shiksha puts low-fee, government, no-exam as sections on one list page | Fold variants into section blocks on one strong page per city and course |
| 4 | No question and answer layer | Collegedunia page showed 221 answered questions; CollegeDekho has related questions | Start a real Q&A: answer student questions from counselling with a named counsellor; do not seed fake ones |
| 5 | The AI helper is hard to find after we removed the floating chat | KollegeApply and CollegeVidya keep an assistant in view | One "Ask" entry in the header that opens the AI counsellor |
| 6 | Cards showed empty fields once figures were hidden | Competitor cards are always full | Done for the home card; apply the same to the college list cards |
| 7 | Two separate floating actions and a bottom bar covered text | Seen on our own mobile pages | Done: one WhatsApp button only |
| 8 | Homepage tools are not tied to our own sourced data | Competitors lead with predictors | Build a "Can I get in?" tool on published cut-offs only (FMS, IIFT, IIM Kashipur and others as data allows) |

## Features to add, in priority order

1. **Fee, eligibility and key-dates table per MBA college** with source links (highest value; students want fees first).
2. **"Official brochure" link** on each college page pointing to the institute's own PDF (no lead gate).
3. **Cut-off check tool**: enter exam, section scores and category; show which institutes' published minimums you meet,
   with year and a plain warning that it is a filter, not an offer.
4. **Comparison pages** for the most searched pairs, built from the acceptance matrix and published facts only.
5. **Named author and reviewer** on every guide; a short "how we checked this" box.
6. **Real reviews and Q&A** collected from verified students and alumni (opt in, DPDP consent), added only when real.
7. **Header "Ask" entry** for the AI counsellor.
8. **Exam pages with child pages** like competitors: `/exams/cat/college-predictor`, `/exams/cat/dates`, built on sourced data.

## Design changes

- Keep the flat, serif-headline look. It already looks less like the crowded competitor pages.
- Put the three facts students check first (fees, exams accepted, key dates) at the top of every college page, each with a
  small "source, checked on" line.
- Use tabs or an in-page contents bar on long college pages (Collegedunia uses 17 tabs; we only need 6: Overview, Courses and
  fees, Admission, Exams and cut-offs, Reviews and Q&A, Compare).
- Keep one primary action per screen: "Free counselling" in the header, "View details" on cards.

## Unique value to say out loud

"Every fact has a source and a date, and we tell you what we do not know." Put this in the hero sub-line, the footer and
the counselling page. None of the six portals showed a source line on figures in the pages opened.

## Do not copy

- Unsourced packages and ratings.
- Fake or seeded reviews and testimonials.
- Lead-gated brochures.
- Hidden prices for counselling.
