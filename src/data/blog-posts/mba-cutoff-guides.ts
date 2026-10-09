import type { BlogPost } from "@/types"

// Cut-off explainers for query clusters that had no page (Mumbai/Maharashtra CAP and CUET PG).
// Policy (docs/BEYOND-SEO-REPORT.md, src/data/mba/cutoffs.ts): no "expected" cut-offs and no
// unsourced numbers. Only the JBIMS example below carries figures, shown as reported ranges with
// both sources linked. Review after each CAP cycle.

const DATE = "2026-10-09"
const AUTHOR = "CampusLelo Editorial Team"

const a = (href: string, text: string) => `<a href="${href}">${text}</a>`
const ext = (href: string, text: string) => `<a href="${href}" rel="noopener nofollow">${text}</a>`
const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`
const ol = (items: string[]) => `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`

const capBody = `
<p><strong>Quick answer:</strong> a MAH-MBA CET CAP cut-off is the closing percentile of a round: the lowest percentile that got a seat in that institute, in that category, in that round. It changes every year and every round, so last year's number is a guide, not a promise. The official round-wise lists come from the State CET Cell Maharashtra, not from coaching sites.</p>

<h2>What is the CAP and who runs it?</h2>
<p>The centralised admission process (CAP) is how Maharashtra fills many MBA/MMS seats through ${a("/exams/mah-mba-cet", "MAH-MBA CET")} scores. The State CET Cell runs it, and the CAP pages and a Cutoff Explorer are listed at ${ext("https://cetcell.mahacet.org/cutoff-explorer/", "cetcell.mahacet.org")}. Institutes such as JBIMS say on their own sites that selection is through the CAP rounds carried out by DTE Maharashtra.</p>

<h2>What is a closing percentile?</h2>
<p>After a round, the CAP list shows, for each institute and seat category, the percentile of the last candidate who got a seat. That is the closing percentile. It is not a minimum you must clear in advance and it is not a promise for the next year. A lower score can still get a seat in a later round if seats stay vacant, and a higher score can miss out in a crowded category.</p>

<h2>Why seat category matters as much as your percentile</h2>
<p>CAP lists split seats by category and pool. Codes such as GOPENS (general open, Maharashtra pool) and GOPENAI (general open, All India pool) appear in CAP and portal tables. The pools close at different points, so always compare your score with your own category and pool, not with the overall headline number.</p>

<h2>An example: JBIMS Mumbai</h2>
<p>JBIMS does not publish a minimum cut-off on its website. Two education portals report past closing percentiles, and neither calls them official, so read them as reported figures:</p>
<table><thead><tr><th>Year</th><th>Category</th><th>Reported closing percentile</th></tr></thead><tbody>
<tr><td>2024</td><td>All India</td><td>99.99 (both portals)</td></tr>
<tr><td>2025</td><td>All India</td><td>99.98–99.99 (Cracku) / 99.99 (Careers360)</td></tr>
<tr><td>2025</td><td>General, Maharashtra (GOPENS)</td><td>99.92–99.94 (Cracku) / 99.94 (Careers360)</td></tr>
</tbody></table>
<p>We do not print 2026 figures: portals publish them as expected values, not released cut-offs. See the full page: ${a("/mba-cutoff-mumbai", "MBA cut-offs in Mumbai")}.</p>

<h2>How to read CAP cut-offs, step by step</h2>
${ol([
  "<strong>Get your exact category and pool.</strong> Your CAP application shows the seat category you are eligible for.",
  "<strong>Open the official lists for the year.</strong> Use the State CET Cell's CAP pages and Cutoff Explorer, not a summary written by a coaching site.",
  "<strong>Find the same category and pool for each institute you like.</strong> Note the closing percentile of each round, not only round one.",
  "<strong>Compare with your own percentile, with a margin.</strong> Treat institutes whose closing percentile is close to yours as reach options.",
  "<strong>Build a list of reach, target and safe options.</strong> Fill your option form in order of preference, because the allotment follows it.",
  "<strong>Check other routes too.</strong> Many institutes also accept CAT, CMAT, XAT or their own tests. See " + a("/blog/mba-entrance-exams-in-india", "which exams to take") + ".",
])}

<h2>Common mistakes</h2>
${ul([
  "Comparing a MAH-CET percentile with a CAT percentile. They are different scales built from different test-taker pools.",
  "Treating an \"expected cut-off\" on a coaching site as official. Check whether the page says it is expected or released.",
  "Looking only at round one. Closing percentiles can differ between rounds, and later rounds can matter for you.",
  "Ignoring the seat category. A general-category figure says little about a reserved-category seat.",
])}

<h2>Where to go next</h2>
${ul([
  a("/exams/mah-mba-cet/score-vs-percentile", "How MAH-CET percentiles work"),
  a("/mba-cutoff-mumbai", "MBA cut-offs in Mumbai (sourced)"),
  a("/mba-cutoff-pune", "MBA cut-offs in Pune"),
  a("/blog/mba-cutoff-vs-percentile-explained", "MBA cut-off vs percentile explained"),
  a("/mba-counselling", "Free MBA counselling: compare your score with real options"),
])}

<h2>Sources</h2>
${ul([
  ext("https://cetcell.mahacet.org/cutoff-explorer/", "State CET Cell Maharashtra: CAP pages and Cutoff Explorer (official)"),
  ext("https://www.jbims.edu/", "JBIMS Mumbai: admissions FAQ (official)"),
  ext("https://cracku.in/jbims-cut-off-2026", "Cracku: JBIMS cut-off (secondary)"),
  ext("https://www.careers360.com/mba/articles/jbims-cet-cutoff", "Careers360: JBIMS CET cut-off (secondary)"),
])}
<p>Checked on 9 October 2026. We re-check after each CAP cycle. See our ${a("/editorial-policy", "editorial policy")}.</p>`

const cuetBody = `
<p><strong>Quick answer:</strong> CUET PG is a national entrance test run by the National Testing Agency (NTA), and many universities use its scores for MBA and other management programmes. There is no single national cut-off: each participating university decides its own eligibility, selection rounds and counselling. So the cut-off that matters is the one your target university publishes.</p>

<h2>What is CUET PG?</h2>
<p>CUET (PG) is the Common University Entrance Test for postgraduate admissions, conducted by NTA. The official site is ${ext("https://exams.nta.nic.in/cuet-pg/", "exams.nta.nic.in/cuet-pg")}. NTA conducts the test and declares results. Participating universities then run their own admission process.</p>

<h2>Which colleges accept CUET PG for MBA?</h2>
<p>The list changes each year and portals disagree on how many institutions accept it, so there is no reliable single count. Use the participating-university list on the NTA site for the current cycle, then open each university's admission page to see which management programme it offers, the minimum eligibility and the selection stages.</p>

<h2>Is there a CUET PG MBA cut-off?</h2>
<p>Not one official number. Each university sets its own, often after the results, and many add a written ability test, group discussion or personal interview. Lists on coaching sites quote ranges per university, but they are estimates and they disagree with each other, so we do not print them. Look for the university's own shortlist or previous-year cut-off notice instead.</p>

<h2>How to check a university's real cut-off</h2>
${ol([
  "<strong>Open the university's admission page</strong> for the MBA or management programme and read the current-year admission bulletin.",
  "<strong>Look for last year's merit or shortlist notice.</strong> Many universities publish category-wise merit lists after counselling rounds.",
  "<strong>Note the selection stages.</strong> A CUET PG score may only get you to a written test or interview.",
  "<strong>Check the counselling portal and dates.</strong> Each university has its own, and they change every cycle.",
  "<strong>Confirm eligibility and reservation rules</strong> on the university's own page, not a summary.",
])}

<h2>CUET PG or CAT, XAT, CMAT, MAT?</h2>
<p>CUET PG mainly opens university departments. Business schools use their own mix of ${a("/exams/cat", "CAT")}, ${a("/exams/xat", "XAT")}, ${a("/exams/cmat", "CMAT")}, ${a("/exams/mat", "MAT")}, ${a("/exams/snap", "SNAP")}, ${a("/exams/nmat", "NMAT")} and others. If you are aiming for both, check which exams your target programmes accept in our ${a("/blog/mba-entrance-exams-in-india", "exam guide")}.</p>

<h2>Where to go next</h2>
${ul([
  a("/blog/mba-cutoff-vs-percentile-explained", "MBA cut-off vs percentile explained"),
  a("/blog/mba-admission-process-in-india", "MBA admission process in India"),
  a("/blog/mba-eligibility-criteria-in-india", "MBA eligibility criteria"),
  a("/mba-counselling", "Free MBA counselling"),
])}

<h2>Sources</h2>
${ul([
  ext("https://exams.nta.nic.in/cuet-pg/", "National Testing Agency: CUET (PG) (official)"),
])}
<p>Checked on 9 October 2026. Counselling status changes during the cycle, so confirm dates on each university's own portal. See our ${a("/editorial-policy", "editorial policy")}.</p>`

export const mbaCutoffGuides: BlogPost[] = [
  {
    id: 41, slug: "mah-mba-cet-cap-cutoff-explained",
    title: "MAH MBA CET CAP Cut-off Explained: How to Read Closing Percentiles",
    excerpt: "What a CAP closing percentile is, why your category and pool matter, a JBIMS example with reported figures, and a step-by-step way to read the official Maharashtra MBA cut-off lists.",
    body: capBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "6 min", category: "Exams",
    tags: ["MAH MBA CET cutoff", "MBA CAP cutoff", "JBIMS cutoff", "MBA colleges in Mumbai cut off", "closing percentile"],
  },
  {
    id: 42, slug: "cuet-pg-mba-colleges-and-cutoff-explained",
    title: "CUET PG for MBA: Colleges, Cut-off and How Admission Works",
    excerpt: "CUET PG is run by NTA, but each university sets its own MBA cut-off and counselling. See how to find a university's real cut-off and when CUET PG is the right exam.",
    body: cuetBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "5 min", category: "Exams",
    tags: ["CUET PG MBA", "CUET PG MBA cutoff", "MBA colleges accepting CUET PG", "CUET PG MBA colleges", "MBA admission through CUET PG"],
  },
]
