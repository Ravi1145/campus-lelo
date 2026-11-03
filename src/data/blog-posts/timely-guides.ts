import { mbaExams } from "@/data/mba/exams"
import { programAdmissions } from "@/data/mba/programAdmissions"
import type { ProgramAdmission } from "@/data/mba/types"
import { INSTITUTE_SHORT } from "@/data/mba/instituteLabels"

// Time-sensitive guides for the 2027 intake: XAT colleges in Delhi NCR, and application deadlines. Exam dates and the
// list of institutes are read from src/data/mba (each value carries its source and check date); the two institute
// deadlines (MDI 28 Nov, IMT 27 Nov) are copied from those institutes' own admission pages, read 3 Nov 2026.
// Seeded into Supabase by /api/cron/seed-guides; edit them in the admin Blogs panel afterwards.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const a = (href: string, text: string) => `<a href="${href}">${text}</a>`
const ul = (items: string[]) => (items.length ? `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>` : "")
const short = (p: ProgramAdmission) => INSTITUTE_SHORT[p.id] ?? p.institution.split(",")[0]
const exam = (slug: string) => mbaExams.find((e) => e.slug === slug)
const examName = (slug: string) => exam(slug)?.name ?? slug.toUpperCase()
const NCR = ["Delhi", "Gurugram", "Ghaziabad", "Noida", "Greater Noida"]

const CTA = `<div class="cta"><p><strong>Not sure which deadlines apply to you?</strong> <a href="/mba-admission-in-delhi#lead-form">Get a free admission plan</a>: a counsellor maps your exams, scores and application dates for Delhi NCR institutes. Free, no obligation.</p></div>`

const METHOD = `<h2 id="method">How we researched this</h2>
<p><strong>Who:</strong> the CampusLelo editorial team. <strong>How:</strong> exam dates come from each exam body's official pages and the institute lists from each institute's own admission page, all read between October and November 2026 and shown with their check dates on the linked pages. Where a date could not be confirmed we say so. <strong>Why:</strong> deadlines move and portals copy last year's dates, so we show only dates we could trace to an official page. Always confirm on the exam body's and institute's own site before you pay. Read our <a href="/editorial-policy">editorial policy</a>; we correct errors with a dated note.</p>`

const programmeTable = (rows: ProgramAdmission[]) =>
  `<table><thead><tr><th>Institute</th><th>City</th><th>Programme</th><th>All exams it lists</th><th>Source (checked)</th></tr></thead><tbody>${rows
    .map(
      (p) =>
        `<tr><td>${a(`/mba-admission/${p.id}`, esc(short(p)))}</td><td>${esc(p.city)}</td><td>${esc(p.program)}</td><td>${p.examsAccepted.map((s) => esc(examName(s))).join(", ")}</td><td><a href="${p.source.url}" rel="nofollow noopener" target="_blank">${esc(p.source.label)}</a> (${p.source.accessed})</td></tr>`,
    )
    .join("")}</tbody></table>`

function xatGuide(): string {
  const x = exam("xat")
  const rows = programAdmissions.filter((p) => NCR.includes(p.city) && p.examsAccepted.includes("xat"))
  const delhi = rows.filter((p) => p.city === "Delhi")
  const dates = x ? ul(x.keyDates.map((k) => `<strong>${esc(k.label)}:</strong> ${esc(k.value)}`)) : ""
  return `<div class="quick-answer"><p><strong>Quick answer:</strong> ${rows.length} Delhi NCR programmes on our verified list state that they accept XAT, including ${delhi.length} in Delhi: ${esc(delhi.map(short).join(", "))}. XAT 2027 registration runs until 6 December 2026 and the test is on Sunday 3 January 2027.</p></div>

<p><em>Last reviewed 4 November 2026. XAT is run by XLRI; official site: <a href="https://xatonline.in" rel="nofollow noopener" target="_blank">xatonline.in</a>.</em></p>

<h2 id="contents">In this guide</h2>
<ol>
<li><a href="#dates">XAT 2027 dates</a></li>
<li><a href="#colleges">Delhi NCR colleges that accept XAT</a></li>
<li><a href="#eligibility">Eligibility and what to confirm</a></li>
<li><a href="#plan">How to plan around the deadline</a></li>
<li><a href="#faq">Frequently asked questions</a></li>
</ol>

<h2 id="dates">XAT 2027 dates</h2>
${dates}
<p>${esc(x?.eligibility.text ?? "")} Dates are copied from XAT's official site; the admit-card date is marked tentative there.</p>

<h2 id="colleges">Delhi NCR colleges that accept XAT</h2>
<p>These rows come from each institute's own admission page. Acceptance is per programme and intake, so confirm for your cycle.</p>
${programmeTable(rows)}
<h3>What the institutes' pages say about selection</h3>
${ul(rows.filter((p) => p.notes).map((p) => `<strong>${esc(short(p))}:</strong> ${esc(p.notes as string)}`))}

${CTA}

<h2 id="eligibility">Eligibility and what to confirm</h2>
<p>XAT eligibility is set by XLRI; each institute then sets its own graduation percentage and selection steps. Check three things for every institute on your list:</p>
${ul([
    "The XAT cycle it accepts (a page that says XAT 2026 does not cover the 2027 intake).",
    "Whether it uses XAT alone or XAT plus a GD, written test or interview, and how the score is weighed.",
    "Its own application deadline, which can fall before XAT registration closes: see our " + a("/blog/mba-pgdm-application-deadlines-2027-intake-delhi-ncr", "2027 deadlines guide") + ".",
  ])}
<p>We do not publish XAT percentile cut-offs for these institutes: they either do not publish one or the figures reported online contradict each other. See ${a("/mba-cutoff-delhi-ncr", "published cut-offs in Delhi NCR")}.</p>

<h2 id="plan">How to plan around the deadline</h2>
<ol>
<li>Register for XAT before 6 December 2026, and keep a second exam as a back-up (GMAT is listed by most of the institutes above).</li>
<li>Apply to each institute separately: XAT registration does not apply you anywhere.</li>
<li>Prepare for the selection round that follows the score.</li>
</ol>
<p>Related: ${a("/mba-colleges-in-delhi-accepting-xat", "Delhi colleges accepting XAT")}, ${a("/exams/xat", "XAT exam guide")}, ${a("/mba-exam-calendar", "MBA exam calendar")}.</p>

${CTA}

<h2 id="faq">Frequently asked questions</h2>
<h3>Which Delhi colleges accept XAT?</h3>
<p>On our verified list: ${esc(delhi.map(short).join(", "))}. Across Delhi NCR the list also includes ${esc(rows.filter((p) => p.city !== "Delhi").map(short).join(", "))}.</p>
<h3>When is XAT 2027?</h3>
<p>Sunday 3 January 2027, from 2:00 pm to 5:00 pm, according to XAT's official site.</p>
<h3>What is the last date to register for XAT 2027?</h3>
<p>6 December 2026, according to XAT's official site.</p>
<h3>Can I get into IMI, FORE or LBSIM with XAT?</h3>
<p>Their own admission pages list XAT among the accepted exams (alongside CAT and GMAT). Each then runs its own selection round.</p>
<h3>What XAT percentile do I need?</h3>
<p>These institutes either do not publish a fixed cut-off or the figures online conflict, so we do not publish one. Check each institute's own notices.</p>
<h3>Is XAT enough, or do I need CAT too?</h3>
<p>Several of the institutes above list XAT without requiring CAT, but MDI and the IIFT, FMS and IIT Delhi programmes are CAT-based. See ${a("/mba-colleges-in-delhi-without-cat", "MBA in Delhi without CAT")}.</p>

${METHOD}`
}

function deadlinesGuide(): string {
  const rows = mbaExams.filter((e) => e.keyDates.length)
  return `<div class="quick-answer"><p><strong>Quick answer:</strong> the next hard deadlines for the 2027 intake are MDI Gurgaon (apply by 28 November 2026), IMT Ghaziabad (27 November 2026) and XAT registration (6 December 2026). CAT 2026 registration has closed and the test is on 29 November. Most other Delhi NCR institutes publish their own dates on their admission pages, so check each one.</p></div>

<p><em>Last reviewed 4 November 2026.</em></p>

<h2 id="contents">In this guide</h2>
<ol>
<li><a href="#institutes">Institute application deadlines we could verify</a></li>
<li><a href="#exams">Exam registration and test dates</a></li>
<li><a href="#documents">Final-year and eligibility dates</a></li>
<li><a href="#plan">A simple order to work in</a></li>
<li><a href="#faq">Frequently asked questions</a></li>
</ol>

<h2 id="institutes">Institute application deadlines we could verify</h2>
<table>
<thead><tr><th>Institute</th><th>Last date to apply (2027-29)</th><th>Source</th></tr></thead>
<tbody>
<tr><td>${a("/mdi-gurgaon-pgdm-admission", "MDI Gurgaon")}</td><td>28 November 2026</td><td><a href="https://mdi.ac.in/admissions/post-graduate-diploma-in-management-pgdm" rel="nofollow noopener" target="_blank">MDI PGDM admissions</a></td></tr>
<tr><td>${a("/mba-admission/imt-ghaziabad-pgdm", "IMT Ghaziabad")}</td><td>27 November 2026</td><td><a href="https://www.imt.edu/admissions/pgdm/" rel="nofollow noopener" target="_blank">IMT PGDM admissions</a></td></tr>
</tbody>
</table>
<p>We have not yet verified application deadlines for the other Delhi NCR institutes (FMS, IIFT, IIT Delhi DMS, IMI, FORE, LBSIM, FIIB, BIMTECH and others), so we do not list them rather than guess. Open each institute's admission page from our ${a("/mba-admission", "MBA admission by college")} list.</p>

<h2 id="exams">Exam registration and test dates</h2>
<table>
<thead><tr><th>Exam</th><th>Sourced dates</th><th>Note</th></tr></thead>
<tbody>${rows.map((e) => `<tr><td>${a(`/exams/${e.slug}`, esc(e.name))}</td><td>${ul(e.keyDates.map((k) => `${esc(k.label)}: ${esc(k.value)}`))}</td><td>${esc(e.datesNote ?? "")}</td></tr>`).join("")}</tbody>
</table>
<p>GMAT can be booked year-round. All dates in one table: ${a("/mba-exam-calendar", "MBA exam calendar")}.</p>

${CTA}

<h2 id="documents">Final-year and eligibility dates</h2>
${ul([
    "<strong>MDI:</strong> final-year students who complete their degree by 30 June 2027 may apply.",
    "<strong>FORE:</strong> final-year students must show 50% by 1 October 2027.",
    "<strong>FIIB:</strong> final-year students need proof of graduation by October 2027.",
    "<strong>FMS Delhi:</strong> final-year students may apply; check the bulletin for the cut-off date.",
  ])}
<p>See each institute's eligibility on its ${a("/mba-admission", "admission page")} and in the ${a("/blog/mba-in-delhi-ncr-2027-colleges-fees-cutoffs-admission", "Delhi NCR 2027 guide")}.</p>

<h2 id="plan">A simple order to work in</h2>
<ol>
<li>This week: apply to institutes whose deadline is within a month (MDI 28 Nov, IMT 27 Nov), if they fit your exam score.</li>
<li>Before 6 December: register for XAT if your target institutes list it (see ${a("/blog/xat-2027-colleges-in-delhi-ncr-pgdm-mba-list-and-deadline", "XAT colleges in Delhi NCR")}).</li>
<li>Through December: MAT, NMAT and SNAP windows (table above) for back-up scores.</li>
<li>After results (January onward): shortlist calls, group discussion and interviews.</li>
</ol>

${CTA}

<h2 id="faq">Frequently asked questions</h2>
<h3>What is the last date to apply to MDI Gurgaon for 2027-29?</h3>
<p>28 November 2026, according to MDI's admissions page.</p>
<h3>What is the last date to apply to IMT Ghaziabad?</h3>
<p>27 November 2026, according to IMT's admissions page.</p>
<h3>Is CAT 2026 registration still open?</h3>
<p>No. CAT 2026 registration closed on 22 September 2026 and the test is on 29 November 2026.</p>
<h3>Can I still take XAT for the 2027 intake?</h3>
<p>Yes. XAT 2027 registration runs until 6 December 2026 and the test is on 3 January 2027.</p>
<h3>Do institutes close applications before exam results?</h3>
<p>Some do. MDI and IMT close in late November, before CAT results, so check each institute's date rather than assuming it follows the results.</p>
<h3>Where can I find the deadline of an institute not listed here?</h3>
<p>On that institute's own admission page. We add a date to this guide only after we trace it to an official page.</p>

${METHOD}`
}

export const XAT_DELHI_HTML = xatGuide()
export const DEADLINES_HTML = deadlinesGuide()
