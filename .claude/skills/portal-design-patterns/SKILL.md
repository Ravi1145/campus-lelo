---
name: portal-design-patterns
description: Use when designing, reviewing or planning pages, features, data or lead capture for CampusLelo or any Indian college-search portal. Gives the patterns CollegeDekho, Collegedunia, Shiksha, Careers360, CollegeVidya and KollegeApply use, the mistakes to avoid, and the one thing CampusLelo should do differently (sourced, dated facts). Read references/competitor-teardown.md for the evidence.
---

# Portal design patterns (college search, India)

Evidence base: live pages of six portals opened in a browser on 15 Oct 2026 (homepages, plus one college page on
CollegeDekho and Collegedunia and one MBA list page on Shiksha). Read-only. No traffic data, no logged-in flows, no
mobile-app screens. Treat every "they do X" as "they did X on the page I opened that day".

## 1. How these portals are built (what to expect users to know)

**Page types and URL shape**
- College profile: `/colleges/{slug}` (CollegeDekho), `/university/{id}-{slug}` (Collegedunia). One long page
  (6,000+ words, 23,000+ px tall) or a tab per topic.
- Exam page: `/exam/{exam}` with child pages `rank-predictor`, `college-predictor`, `previous-year-question-papers`.
- Listing page: `{course}/colleges/{course}-colleges-{city}` (Shiksha). Sub-lists live inside the same page as H2 sections
  ("without entrance exam", "low fees", "government", "private", "ROI") instead of separate URLs.
- News/articles feed on the same domain, linked from the homepage and college pages.

**College profile contents (in the order they appear)**
About, highlights table, courses and fees table (course, duration, eligibility, total fees), admission process, admission
dates table (programme, status, key date), exams accepted, placements, rankings table (body, category, rank), scholarships,
campus and hostel, reviews with rating bars, Q&A (Collegedunia showed "221 answered questions"), comparison blocks
("A vs B vs C"), FAQ, similar colleges, "student preferred colleges".

**Tools (every portal leads with at least one)**
College predictor, rank predictor, percentile predictor (CAT, XAT, IIFT, NMAT on Shiksha), compare colleges, course finder,
ROI calculator (CollegeVidya), test series, education loan, scholarship pages. Predictors are the main traffic hook around
exam season.

**AI assistant**: KollegeApply ("Ask Orbit AI", fixed bottom-right), CollegeVidya ("Ask Sara", in the bottom bar).

**Lead capture**
- Sticky header or bottom bar with one verb: "Get Free Counselling", "Need Counselling", "Apply Now", "Download Brochure",
  "Shortlist".
- Short forms: name, mobile, email, stream or course. Often shown after you click a college action, not up front.
- Counselling is framed as free; the portals earn from college partners. The price of that is never shown.

**Schema.org on pages**: CollegeOrUniversity, EducationalOrganization, FAQPage, BreadcrumbList, Article, Person, ItemList.
Homepages mostly only Organization/WebSite.

**Visual style**: dense, card-heavy, many orange or blue buttons, ranking badges, star ratings, "Compare" on every card.
Homepages are mega-menus first (Shiksha: 1,479 links on one page), content second.

## 2. What CampusLelo does well (keep)

- Every exam, cut-off and acceptance fact has a source link and a "checked on" date.
- It says plainly what it does not publish.
- Free phone counselling and a priced video session (₹199) are shown openly.
- DPDP consent on forms.
- MBA depth for Delhi NCR, Noida, Greater Noida, UP, Dehradun and Pune that the big portals spread thin.

## 3. Mistakes to avoid (found by comparing)

1. **Empty-looking pages after removing unsourced numbers.** Competitors fill every card with fee, package and rating. When we
   hid unsourced figures, cards showed "—". Fix with other sourced facts (exams accepted, eligibility, key dates), never with
   blanks and never with guessed numbers.
2. **Many near-duplicate pages.** Shiksha puts "low fees / govt / private / no-exam" as sections on one list page. Separate
   thin URLs per variation get ignored or noindexed. Prefer one strong page with sections.
3. **No author, no reviewer, no date on college pages.** CollegeDekho shows a named writer; Collegedunia a team byline.
   Ours has neither. Add a named author and a "last checked" date.
4. **No question and answer or review layer.** Collegedunia and CollegeDekho show hundreds of reviews and answered questions.
   Do not fake them. Collect real ones (verified students, alumni) or leave the layer out.
5. **Floating widgets stacking.** Fixed bars plus two round buttons cover text on phones. Use one persistent action.
6. **Hiding the AI helper.** Both newer portals put an assistant one tap away. Keep one clear entry point, not three.
7. **Tools without sourced data behind them.** A predictor is only as honest as its cut-off data. Use published cut-offs only.

## 4. The unique value CampusLelo should own

"The MBA admissions guide where every fact has a source, a year and a date, and where we say what we do not know."

Concrete features that follow from it (none of the six did all of these on the pages seen):
- **Acceptance matrix**: college by exam (CAT, XAT, GMAT, CMAT, MAT, NMAT, CUET PG) with the official page linked.
- **Published cut-off explorer**: only what the institute published, with year and category, plus "no cut-off published".
- **"Official brochure" link** on every college, pointing to the institute's own PDF, instead of a lead-gated download.
- **Dates tracker** that only shows official dates and marks anything unconfirmed.
- **Route explainer** for state counselling (UPTAC, MAH CET CAP) with the portal's own documents.
- **Counselling with the price shown**: a free first call, the paid video session priced openly.

## 5. Design rules for new CampusLelo pages

1. One job per section; no section repeated in a different style.
2. Headline in the serif, body in the sans, red only for the main action and for links.
3. Every figure: value, year, source link, checked-on date. If any is missing, do not render the figure.
4. Cards equal height, one row of facts, one row of tags, at most two buttons.
5. Tap targets 44px for primary controls; contrast 4.5:1 for text under 24px.
6. Motion explains something (a line drawing, a step ticking) and plays once; honour reduced motion.
7. One floating action (WhatsApp). The assistant lives in the header and on /ai-counselor.
8. Add Person (author) and dateModified to schema where the page shows them.

## 6. Checklist before shipping a page

- [ ] Title under 58 characters, description 100 to 155, one H1.
- [ ] Every number has a source line and date.
- [ ] A named author and a reviewed date where the page gives advice.
- [ ] Internal links to the exam, cut-off and counselling pages it relates to.
- [ ] No page that only restates another page's facts.
- [ ] Mobile width checked: no sideways scroll, no text under floating buttons.
- [ ] Lead form has the DPDP consent box and the consent text version.
