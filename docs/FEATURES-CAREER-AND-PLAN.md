# Career quiz, interest types and the admission plan: research and decisions

Written 15 Oct 2026. Covers what was built after the portal research, why, and what it does not claim.

## What competitors do (from searches, 15 Oct 2026)

- **Mindler**: a multidimensional career decision-making battery with a peer-reviewed validation paper (Asia Pacific Career
  Development Journal, 2018). Counsellor-led packages; consumer prices not confirmed.
- **iDreamCareer**: tests aptitude, personality and interests, then a personalised report, usually sold through schools.
- **Careers360**: a 72-item questionnaire leading to a report, then to colleges and courses.
- A third-party comparison page quotes ₹299 for a full report and ₹999 with a counsellor at one provider. This is from a
  competitor's page and is not verified.
- The big college portals (CollegeDekho, Collegedunia, Shiksha) lead with predictors and comparisons; none showed a source
  line on figures in the pages we opened.

## What we built

1. **Career quiz** `/career-quiz`: 48 original statements (36 interests, 12 self-rated strengths), about 8 minutes.
   Scores six Holland (RIASEC) interest types and six strengths, then ranks eight study paths (engineering, computers,
   management, commerce, medical, law, design, arts) with links to the exams and colleges for each.
   - Answers stay in the browser. The result link keeps the answers in the URL fragment (after `#`), which servers and
     search engines never see.
   - Print or save as PDF, copy link, retake.
2. **Career interest types guide** `/career-types`: plain-language article on the six types, what each enjoys, which study
   paths it often points to, and what the model cannot tell you. This is the indexable page that can rank for searches such
   as "holland codes explained" and "which career suits my personality".
3. **My admission plan, with receipts** `/my-admission-plan` (the feature none of the six portals showed): pick exams and
   city, get official dates, programmes that list those exams, eligibility rules and six questions to ask, every line with its
   source, source type (official or reported) and check date. The plan is saved in the browser, and if our sources are
   re-checked after you saved, a notice says your plan may be out of date. Verified depth is MBA and PGDM today.
4. Also built earlier in the same push: MBA cut-off checker and exam-acceptance table.

## Honest limits (keep these on the pages)

- The quiz is a **guidance tool**, not a clinical or diagnostic test and **not a validated psychometric instrument**.
  Mindler has a published validation; we do not. We say so on the page and in the FAQ.
- RIASEC has decent support for its structure and occupational use, but it predicts job performance only modestly and it
  measures interests, not ability or values. Published RIASEC scales are copyrighted; every item here is our own wording.
- The stream weights in `src/data/career/questions.ts` are a judgement based on the model and on what each course involves.
  They are not a statistical model fitted on student outcomes. If you ever collect real outcome data (with consent), fit them.
- The plan covers MBA and PGDM only because that is where we hold sourced dates and acceptance data.
- "No one else has it" is not claimed anywhere on the site. We only say what we saw on the pages we opened.

## SEO

- New URLs in `src/app/sitemap.ts`: `/career-quiz`, `/career-types`, `/my-admission-plan`, `/mba-cutoff-checker`,
  `/mba-exam-acceptance`, `/uptac-mba-counselling`.
- Each page has a title under 58 characters, a unique description, one H1, breadcrumb and FAQ JSON-LD, and WebApplication
  or Article JSON-LD. Pages are linked from the header Tools menu, the homepage "Start here" section, the homepage link
  block and each other, so none is an orphan.
- The result and plan pages hold personal state only in the browser, so there is nothing private to index.

## Ideas for next

1. Counsellor-reviewed version of the quiz: have a qualified career counsellor review items and weights, then name them as
   reviewer on the page (this is the biggest trust upgrade).
2. A plan for engineering and medical paths once exam dates and acceptance are sourced from official pages.
3. An opt-in "email me this plan" with DPDP consent, using the existing lead flow.
4. Collect consented, anonymised quiz outcomes to test whether the weights predict what students finally chose.
