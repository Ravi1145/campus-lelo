import type { BlogPost } from "@/types"
import { mbaExams } from "@/data/mba/exams"
import { publishedCutoffs, noPublishedCutoff, CUTOFFS_LAST_REVIEWED } from "@/data/mba/cutoffs"

// National MBA / PGDM guides written for the query clusters that had no page
// (see docs/MBA_KEYWORD_CLUSTERS.md). Policy: no fees, packages, cut-offs or
// dates are written by hand here. Exam facts are generated from the sourced
// data in src/data/mba/*.ts; everything else is explanation and method.
// Review each cycle (CAT results, Jan 2027).

const DATE = "2026-10-05"
const AUTHOR = "CampusLelo Editorial Team"

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const a = (href: string, text: string) => `<a href="${href}">${text}</a>`
const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`
const ol = (items: string[]) => `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`
const table = (head: string[], rows: string[][]) =>
  `<table><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`

const examLink = (slug: string, name: string) => a(`/exams/${slug}`, name)

/** One row per exam: who runs it, how often, what it is used for. */
const examOverview = () =>
  table(
    ["Exam", "Conducted by", "How often", "Used for"],
    mbaExams.map((e) => [examLink(e.slug, e.name), esc(e.conductingBody), esc(e.frequency), e.programs.join(" / ")]),
  )

/** Eligibility exactly as verified in the exam data. */
const eligibilityTable = () =>
  table(["Exam", "Eligibility (as published by the exam body)"], mbaExams.map((e) => [examLink(e.slug, e.name), esc(e.eligibility.text)]))

/** Registration + exam dates where the data has them; otherwise point to the guide. */
const datesTable = () =>
  table(
    ["Exam (cycle)", "Registration", "Exam date / window"],
    mbaExams.map((e) => {
      const reg = e.keyDates.find((k) => /registration|application/i.test(k.label))
      const exam = e.keyDates.find((k) => /exam|test|window|session|attempt/i.test(k.label) && !/registration|result/i.test(k.label))
      const fallback = `See the ${a(`/exams/${e.slug}`, `${e.name} guide`)}`
      return [`${examLink(e.slug, e.name)}<br><small>${esc(e.cycleLabel)}</small>`, reg ? esc(reg.value) : fallback, exam ? esc(exam.value) : e.datesNote ? esc(e.datesNote) : fallback]
    }),
  )

const SOURCES = `
<h2>Sources and how we verify</h2>
<p>Exam facts above come from the exam bodies' own pages and are checked against secondary reports; every fact has its source and review date on the linked exam guide. Read our ${a("/editorial-policy", "editorial policy")}. Always confirm on the official site before you pay or register:</p>
${ul([
  ...mbaExams.map((e) => `<a href="${e.officialSite}" rel="noopener nofollow">${esc(e.name)} — official site</a>`),
  `<a href="https://www.aicte-india.org" rel="noopener nofollow">AICTE</a> — approval status of PGDM programmes`,
  `<a href="https://www.ugc.gov.in" rel="noopener nofollow">UGC</a> — recognition of universities and online/distance programmes`,
  `<a href="https://www.nirfindia.org" rel="noopener nofollow">NIRF</a> — Ministry of Education rankings (Management category)`,
  `<a href="https://aiu.ac.in" rel="noopener nofollow">Association of Indian Universities</a> — degree equivalence`,
])}
<p><small>Last reviewed ${DATE}. We do not publish estimated cut-offs, fees or placement numbers we cannot source.</small></p>`

const RELATED = (links: [string, string][]) => `
<h2>Related guides</h2>
${ul(links.map(([h, t]) => a(h, t)))}
<p>Not sure where to start? ${a("/ai-finder", "Use the AI college finder")}, ${a("/compare", "compare two colleges side by side")} or ${a("/counselling", "talk to a free counsellor")}.</p>`

const COMMON_LINKS: [string, string][] = [
  ["/mba-colleges-in-pune", "MBA colleges in Pune"],
  ["/mba-colleges-noida", "MBA colleges in Noida"],
  ["/blog/mba-colleges-delhi-ncr-noida-guide", "MBA colleges in Delhi NCR & Noida"],
  ["/exams", "All MBA entrance exam guides"],
  ["/mba-vs-pgdm", "MBA vs PGDM"],
]

// ──────────────────────────────────────────────────────────────────────────
// 1. Fees
// ──────────────────────────────────────────────────────────────────────────
const feesBody = `
<p><strong>Quick answer:</strong> there is no single "MBA fee in India". The total cost of a two-year MBA or PGDM depends on the type of institute, the city, whether you stay on campus and what the institute counts as "fees". We do not quote a national average because it would mislead you. Instead, this guide shows what the total cost is made of, how to get the real number from any institute, and how to lower it.</p>

<h2>What does an MBA in India actually cost?</h2>
<p>When people search "MBA in India fees" or "MBA courses in India fees", they usually want one number. The number you need is the <em>total programme cost</em>, for the full duration, including everything you will pay. Add these up for each college you shortlist:</p>
${table(
  ["Cost item", "Where to find it", "Common trap"],
  [
    ["Tuition (all years)", "Fee structure in the admission brochure or on the admissions page", "Some pages show one year, others the full programme — check which"],
    ["Hostel and mess", "Hostel page or brochure", "Often listed separately and not included in the headline fee"],
    ["One-time charges", "Brochure: admission, caution deposit, registration, library, alumni", "Caution deposits are refundable; fees are not"],
    ["Books, laptop, insurance", "Ask admissions or current students", "Rarely listed in the fee table"],
    ["Exam and placement fees", "Brochure footnotes", "Hidden in the small print"],
    ["Travel and living costs", "Your own estimate for the city", "Can matter as much as tuition in a big city"],
  ],
)}
<p>Total cost = (tuition + hostel and mess) for each year, plus one-time charges, plus your own living costs. Do this calculation for every shortlisted college so you compare like with like.</p>

<h2>Why does the same degree cost so much more at some colleges?</h2>
${ul([
  "<strong>Type of institute:</strong> a university department, a government institute, a private university and a standalone PGDM institute are funded and priced differently.",
  "<strong>Location:</strong> metro campuses cost more to run, and living costs add to the bill.",
  "<strong>Brand and network:</strong> institutes with strong recruiter relationships charge for them.",
  "<strong>Programme type:</strong> an MBA, a PGDM, an executive or part-time programme and a specialised programme all have different structures — see " + a("/mba-vs-pgdm", "MBA vs PGDM") + ".",
])}

<h2>How to find an institute's official fee</h2>
${ol([
  "Open the institute's own admissions page and look for \"fee structure\" or \"fees and scholarships\". Approved institutes usually publish a mandatory-disclosure page too.",
  "Download the current-year brochure. Fees change every batch, so ignore old PDFs.",
  "Check what is included: tuition only, or tuition plus hostel and other charges.",
  "Ask for the refund and withdrawal policy in writing before paying any seat-confirmation amount.",
  "Treat a figure on an aggregator site as a lead, not as proof. Confirm it on the institute's page.",
])}

<h2>How to get a scholarship for an MBA in India</h2>
<p>Queries such as "how to get scholarship for MBA in India" and "MBA in India with scholarship" are common. The main routes:</p>
${ul([
  "<strong>Institute scholarships:</strong> merit or need-based awards offered by the college, usually based on entrance score or academics. Details are in the brochure.",
  "<strong>Government and state schemes:</strong> some categories and income groups qualify for state or central scholarships. Check the National Scholarship Portal and your state's portal for current eligibility.",
  "<strong>Corporate and foundation scholarships:</strong> offered by outside bodies; deadlines are usually before the batch starts.",
  "<strong>Education loans:</strong> compare interest rate, moratorium period and processing fee across banks before accepting a college's tie-up.",
])}
<p>Pune and NCR students can see city-specific options on our ${a("/mba-colleges-in-pune-scholarship", "MBA scholarships in Pune")} and ${a("/low-fees-mba-colleges-pune", "low-fee MBA colleges in Pune")} pages.</p>

<h2>Is a costlier MBA always better?</h2>
<p>No. Judge cost against what you get back. Compare the total cost with the institute's published placement report, read carefully using our guide to ${a("/blog/mba-placements-and-salary-how-to-read-reports", "reading MBA placement reports")}. A lower-cost programme with a clear route to your target role can beat a premium one that does not fit your goal.</p>
${RELATED([...COMMON_LINKS, ["/blog/how-to-choose-an-mba-college-in-india", "How to choose an MBA college in India"]])}
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
// 2. Placements
// ──────────────────────────────────────────────────────────────────────────
const placementsBody = `
<p><strong>Quick answer:</strong> an "average package" tells you much less than it seems to. Before you compare MBA colleges on placements, find out whether the figure is a mean or a median, how many students it covers, and what is counted in the pay. This guide shows how to read a placement report, and what to ask when the numbers look too good.</p>

<h2>What does "MBA average package" really mean?</h2>
<p>Searches like "MBA average package" and "MBA colleges in India placement wise" assume every institute reports the same thing. They do not. Check these terms in each report:</p>
${table(
  ["Term", "What it means", "What to watch"],
  [
    ["Average (mean)", "Total pay of placed students divided by their number", "A few very high offers pull the average up"],
    ["Median", "The middle value: half the batch earned more, half less", "Usually the fairer figure; not every institute reports it"],
    ["Highest package", "The single best offer", "One student; says nothing about the typical outcome"],
    ["CTC vs fixed pay", "CTC may include variable pay, bonuses and benefits", "Ask for the fixed component"],
    ["Domestic vs international", "Some reports mix both", "Check which offers are counted"],
  ],
)}

<h2>How to read a placement report</h2>
${ol([
  "<strong>Find the batch size and the number placed.</strong> A percentage placed means little without these.",
  "<strong>Check who is counted.</strong> Some institutes exclude students who opted out of placements, which raises the percentage.",
  "<strong>Look for the median, not only the average.</strong> If only the average and the highest are given, ask for the median.",
  "<strong>Look at sectors and roles.</strong> Consulting, finance, product and sales roles pay differently; match them to your goal.",
  "<strong>Look at several years.</strong> One strong year is less reliable than a steady pattern.",
  "<strong>Check the source.</strong> Prefer the institute's own report or a regulator-linked disclosure over a ranking site's summary.",
])}

<h2>What should I ask about "100% placement" claims?</h2>
<p>A claim of "100% placement" is only meaningful with a definition. Ask: 100% of which students? Does it include internships, pre-placement offers or offers that were later declined? Does it count students who did not sit for placements? If the institute cannot answer in writing, treat the number with caution.</p>

<h2>How placements differ by city</h2>
<p>Recruiters concentrate in certain cities, so internship access and local offers differ. For city-level pages with our verified information, see ${a("/mba-placements-pune", "MBA placements in Pune")}, ${a("/mba-colleges-noida", "MBA colleges in Noida")} and our ${a("/blog/mba-colleges-delhi-ncr-noida-guide", "Delhi NCR guide")}.</p>

<h2>Placement versus cost</h2>
<p>Put the placement figure next to the total cost from our ${a("/blog/mba-fees-in-india-guide", "MBA fees guide")}. A simple check: how many years of the median salary would it take to repay the total cost (and any loan)? Use the median where it is available, not the highest package.</p>
${RELATED([...COMMON_LINKS, ["/blog/how-to-choose-an-mba-college-in-india", "How to choose an MBA college in India"]])}
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
// 3. How to choose
// ──────────────────────────────────────────────────────────────────────────
const chooseBody = `
<p><strong>Quick answer:</strong> there is no single "best MBA college in India" — there is the best fit for your exam score, budget, goal and city. A published ranking is a starting point, not the answer. Use the steps below to build a shortlist of five to eight colleges and then compare them on the same criteria.</p>

<h2>Which is the best college for MBA in India?</h2>
<p>People search "best MBA colleges in India" and "top MBA colleges in India ranking" hoping for one list. Rankings such as NIRF's Management category (published by the Ministry of Education at nirfindia.org) are useful, but they weigh factors that may not match your priorities. Read the methodology, then check the criteria below for your own case.</p>

<h2>Eight criteria to compare MBA colleges</h2>
${table(
  ["Criterion", "What to check", "Where"],
  [
    ["Approval and recognition", "Is the programme AICTE-approved (PGDM) or offered by a UGC-recognised university (MBA)?", "AICTE and UGC websites"],
    ["Exam fit", "Does the college accept the exam you have taken or can take?", "Institute's admission page; our " + a("/exams", "exam guides")],
    ["Selection process", "Cut-off, profile weighting, GD/WAT/PI", "Admission page; " + a("/blog/mba-cutoff-vs-percentile-explained", "cut-off guide")],
    ["Total cost", "Tuition, hostel, one-time charges", a("/blog/mba-fees-in-india-guide", "MBA fees guide")],
    ["Placements", "Median, batch size, sectors, years", a("/blog/mba-placements-and-salary-how-to-read-reports", "placement guide")],
    ["Curriculum and specialisation", "Electives that match your target role", a("/blog/mba-specialisations-explained", "specialisations guide")],
    ["Location and network", "Industry presence, internships, alumni", "City pages below"],
    ["Format", "Full-time, executive, online, part-time", a("/blog/executive-online-part-time-mba-india", "format guide")],
  ],
)}

<h2>How to build a shortlist</h2>
${ol([
  "<strong>Start with your exam and score.</strong> List colleges that accept it. See which exams exist in our " + a("/blog/mba-entrance-exams-in-india", "complete exam list") + ".",
  "<strong>Drop what you cannot afford.</strong> Use total cost, not the headline fee.",
  "<strong>Check approval and recognition.</strong> Remove anything you cannot verify.",
  "<strong>Rank on placements that you understand.</strong> Prefer median and a multi-year view.",
  "<strong>Compare two at a time.</strong> Our " + a("/compare", "comparison tool") + " puts fees, exams and rankings side by side.",
  "<strong>Talk to students and alumni.</strong> Ask what the report does not say.",
])}

<h2>Best MBA colleges by city</h2>
<p>If a city matters to you, start with our city pages: ${a("/best-mba-colleges-pune", "best MBA colleges in Pune")}, ${a("/top-10-mba-colleges-in-pune", "top 10 MBA colleges in Pune")}, ${a("/mba-colleges-noida", "MBA colleges in Noida")} and the ${a("/blog/mba-colleges-delhi-ncr-noida-guide", "Delhi NCR guide")}. You can also filter all colleges by stream, exam and fees on our ${a("/colleges?stream=MBA", "MBA college list")}.</p>

<h2>Is a CMAT or MAT score enough for a good MBA?</h2>
<p>Many good programmes accept ${examLink("cmat", "CMAT")}, ${examLink("mat", "MAT")}, ${examLink("snap", "SNAP")} or ${examLink("xat", "XAT")} as well as ${examLink("cat", "CAT")}. Acceptance is set by each programme, so confirm it on the institute's page. Do not rule a college out by exam alone; check the exam list for each college you like.</p>
${RELATED(COMMON_LINKS)}
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
// 4. Cut-off vs percentile
// ──────────────────────────────────────────────────────────────────────────
const cutoffBody = `
<p><strong>Quick answer:</strong> a score, a percentile and a cut-off are three different things. Your score is the marks you got. Your percentile shows how you ranked against other test-takers. A cut-off is a threshold an institute uses to shortlist you for the next round, and many institutes publish none. Predicted "cut-off lists" on random sites are guesses; here we show what is officially published.</p>

<h2>What is an MBA entrance exam cut-off?</h2>
<p>A cut-off is the minimum score or percentile an institute uses at a stage of selection. People often search "MBA cut-off for IIM", "IIFT MBA cut-off" or "BIMTECH MBA cut-off" expecting one figure. In practice:</p>
${ul([
  "<strong>Sectional cut-offs</strong> require a minimum in each section, not only overall.",
  "<strong>Overall or composite cut-offs</strong> combine section scores with weights chosen by the institute.",
  "<strong>Category-wise cut-offs</strong> differ for reserved categories.",
  "<strong>Shortlist cut-offs</strong> decide who is called for GD/WAT/PI; the <em>final</em> selection also weighs academics, work experience, diversity and interview performance.",
])}

<h2>Score vs percentile: how are they different?</h2>
<p>Percentile is relative: it tells you where you stand among those who took the exam. Exams held in several sessions convert raw scores to a common scale so sessions can be compared. How each exam produces its score or percentile is on its guide:</p>
${table(
  ["Exam", "How the score / percentile is produced"],
  mbaExams.map((e) => [examLink(e.slug, e.name), esc(e.scoring.headline)]),
)}

<h2>Which institutes publish a cut-off — and which do not?</h2>
<p>We list a cut-off only when it is published or reported consistently by several sources, and we say exactly what the number measures. These Delhi NCR examples show how different two "cut-offs" can be:</p>
${table(
  ["Institute", "What was published", "How to read it"],
  publishedCutoffs.map((c) => [
    `${esc(c.institution)}<br><small>${esc(c.program)}, ${esc(c.admissionYear)} · ${esc(c.examCycle)}</small>`,
    c.values.map((v) => `${esc(v.category)}: ${esc(v.value)}`).join("<br>"),
    esc(c.howItWorks),
  ]),
)}
<p>Other institutes publish no fixed percentile cut-off. For these, we show no number:</p>
${table(
  ["Institute", "How shortlisting works"],
  noPublishedCutoff.map((n) => [`${esc(n.institution)}<br><small>${esc(n.program)}</small>`, esc(n.shortlisting)]),
)}
<p>See ${a("/mba-cutoff-delhi-ncr", "MBA cut-off in Delhi NCR")} for sources, categories and caveats, and ${a("/mba-cutoff-pune", "MBA cut-off in Pune")} for Pune.</p>

<h2>What percentile do I need for an MBA?</h2>
<p>There is no single answer. It depends on the institute, the programme, your category and how strong the rest of your profile is. Use these steps instead of a rule of thumb:</p>
${ol([
  "Take the exam's score-versus-percentile page (for example " + a("/exams/cat/score-vs-percentile", "CAT score vs percentile") + ") to understand your result.",
  "Open each shortlisted institute's admission page and note its stated minimums, if any.",
  "Check whether it accepts more than one exam; a second exam can help.",
  "Treat anything labelled \"expected cut-off\" as an estimate, not a fact.",
])}
${RELATED([["/exams", "MBA entrance exam guides"], ["/mba-cutoff-delhi-ncr", "MBA cut-off in Delhi NCR"], ["/mba-cutoff-pune", "MBA cut-off in Pune"], ["/blog/mba-admission-process-in-india", "MBA admission process in India"], ["/blog/mba-without-cat-india", "MBA without CAT"]])}
<p><small>Cut-off data reviewed ${CUTOFFS_LAST_REVIEWED}.</small></p>
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
// 5. Admission process
// ──────────────────────────────────────────────────────────────────────────
const admissionBody = `
<p><strong>Quick answer:</strong> admission to an MBA or PGDM in India usually follows the same path: take an entrance exam, register with the institutes you want, get shortlisted, take the selection round (group discussion, written ability test and/or personal interview) and then receive and accept an offer. Exact stages, weights and dates vary by institute, so always follow the institute's own admission page.</p>

<h2>How does MBA admission work in India, step by step?</h2>
${ol([
  "<strong>Choose your exams.</strong> Most programmes accept one or more of the exams listed in our " + a("/blog/mba-entrance-exams-in-india", "exam guide") + ". Some institutes also run their own test.",
  "<strong>Check eligibility.</strong> See " + a("/blog/mba-eligibility-criteria-in-india", "MBA eligibility criteria") + ".",
  "<strong>Register for the exam</strong> in the window announced by the exam body (dates below).",
  "<strong>Take the exam and get your score.</strong> Understand it with our " + a("/blog/mba-cutoff-vs-percentile-explained", "cut-off vs percentile guide") + ".",
  "<strong>Apply to institutes.</strong> Each has its own application form and fee, separate from the exam registration.",
  "<strong>Shortlisting.</strong> Institutes shortlist using your score, academics, work experience and profile.",
  "<strong>Selection round.</strong> Group discussion, written ability test and/or personal interview — the mix differs by institute.",
  "<strong>Offer and confirmation.</strong> Pay the seat-confirmation amount only after reading the refund policy.",
])}

<h2>MBA entrance exam dates and registration</h2>
<p>Dates below are as verified for the current cycle, with the source on each exam guide. Where an official date is not confirmed, we say so rather than guess.</p>
${datesTable()}

<h2>What documents do I need for MBA admission?</h2>
<p>Typical requirements are your graduation mark sheets and degree or provisional certificate, class 10 and 12 mark sheets, a valid entrance-exam score card, category and other certificates if claiming a reservation, work-experience letters where relevant, photographs and identity proof. The institute's admission page has the definitive list.</p>

<h2>MBA admission by city</h2>
<p>State and city processes differ. For Maharashtra, including the CAP process, see ${a("/mba-admission-process-pune", "MBA admission process in Pune")}; for Delhi NCR and Noida, see our ${a("/blog/mba-colleges-delhi-ncr-noida-guide", "Delhi NCR guide")} and ${a("/mba-colleges-noida", "MBA colleges in Noida")}.</p>
${RELATED(COMMON_LINKS)}
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
// 6. Eligibility
// ──────────────────────────────────────────────────────────────────────────
const eligibilityBody = `
<p><strong>Quick answer:</strong> for most MBA and PGDM programmes you need a bachelor's degree, usually with a minimum percentage of marks, plus a valid score in an accepted entrance exam. The exact minimum marks, age rules and work-experience requirements are set by the exam body and by each institute. The table below shows what each major exam publishes.</p>

<h2>What is the eligibility for MBA in India?</h2>
<p>These are the eligibility conditions published by each exam body, as verified for the current cycle. They tell you who can <em>take</em> the exam; individual institutes may add their own requirements.</p>
${eligibilityTable()}

<h2>Can I do an MBA without work experience?</h2>
<p>Yes. Most full-time MBA and PGDM programmes in India accept fresh graduates, and work experience is usually a plus rather than a requirement. Executive and part-time programmes are different: they typically require work experience — see ${a("/blog/executive-online-part-time-mba-india", "executive, online and part-time MBA")}.</p>

<h2>Can I do an MBA after BCom, BSc, BA or engineering?</h2>
<p>Generally yes: MBA programmes accept graduates from any discipline, provided they meet the minimum marks. Your background affects how you present your profile and which specialisation suits you, not whether you are allowed to apply. See ${a("/blog/mba-specialisations-explained", "MBA specialisations")}.</p>

<h2>Can final-year students apply?</h2>
<p>Many exams allow final-year students to register, on the condition that they complete the degree within the time the institute allows. Read the exam's notification for the exact rule; it is stated in the eligibility text above where the exam body publishes it.</p>

<h2>Institute-level eligibility</h2>
<p>Institutes can set additional criteria, such as minimum marks in graduation or school, age or work experience for specific programmes. Check each shortlisted institute's page. For Pune, see ${a("/mba-admission-process-pune", "MBA admission process in Pune")}; for Delhi NCR, see our ${a("/blog/mba-colleges-delhi-ncr-noida-guide", "Delhi NCR guide")}.</p>
${RELATED(COMMON_LINKS)}
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
// 7. MBA without CAT
// ──────────────────────────────────────────────────────────────────────────
const withoutCatBody = `
<p><strong>Quick answer:</strong> yes, you can do an MBA without CAT. Many institutes accept other national exams (XAT, CMAT, MAT, SNAP, NMAT, GMAT, ATMA), state-level tests such as MAH-MBA-CET, or their own entrance process. A few admit through management quota or direct admission. Each route has trade-offs, and you should verify approval before you pay anything.</p>

<h2>Can you do an MBA without CAT?</h2>
<p>CAT is the entrance exam for the IIMs and is accepted by many other institutes, but it is not the only way in. Searches such as "MBA colleges in India without CAT" and "MBA without CAT colleges" are common because several routes exist.</p>

<h2>Exams you can take instead of CAT</h2>
<p>Which colleges accept which exam is set by each programme, so confirm on the institute's admission page.</p>
${table(
  ["Exam", "Conducted by", "How often", "Guide"],
  mbaExams.filter((e) => e.slug !== "cat").map((e) => [esc(e.name), esc(e.conductingBody), esc(e.frequency), a(`/exams/${e.slug}`, "Dates, pattern and eligibility")]),
)}

<h2>Other routes to an MBA without CAT</h2>
${ul([
  "<strong>State common entrance tests:</strong> in Maharashtra, " + examLink("mah-mba-cet", "MAH-MBA-CET") + " leads to the centralised admission process for many seats.",
  "<strong>Institute-level tests:</strong> some institutes run their own test and interview.",
  "<strong>Management quota and direct admission:</strong> some programmes admit a share of students without a national score. These seats can carry higher fees, so ask for the fee in writing and check the approval status.",
  "<strong>Executive MBA:</strong> programmes for working professionals often use experience and an interview rather than CAT — see " + a("/blog/executive-online-part-time-mba-india", "executive MBA") + ".",
])}

<h2>How do I check that a no-CAT MBA is genuine?</h2>
${ol([
  "Confirm the programme's approval: AICTE for PGDM, UGC recognition for the university offering an MBA.",
  "Ask for the admission criteria and fees in writing, including all one-time charges.",
  "Read the refund policy before paying the seat-confirmation amount.",
  "Check the placement report for the same programme, using our " + a("/blog/mba-placements-and-salary-how-to-read-reports", "placement guide") + ".",
  "Be cautious of any institute that guarantees admission or placement.",
])}

<h2>MBA without CAT by city</h2>
<p>For specific options, see ${a("/mba-admission-pune-without-cat", "MBA admission in Pune without CAT")}, ${a("/mba-colleges-in-pune-without-entrance-exam", "MBA colleges in Pune without an entrance exam")}, ${a("/mba-colleges-in-pune-direct-admission", "direct admission in Pune")} and the ${a("/blog/mba-colleges-delhi-ncr-noida-guide", "Delhi NCR guide")}. For Pune colleges that accept other exams, see ${a("/mba-colleges-in-pune-accepting-cmat", "CMAT")}, ${a("/mba-colleges-in-pune-accepting-mat", "MAT")}, ${a("/mba-colleges-in-pune-accepting-snap", "SNAP")} and ${a("/mba-colleges-in-pune-accepting-xat", "XAT")}.</p>
${RELATED(COMMON_LINKS)}
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
// 8. Executive / online / part-time
// ──────────────────────────────────────────────────────────────────────────
const executiveBody = `
<p><strong>Quick answer:</strong> executive, part-time, weekend and online MBAs are formats for people who work while they study. They differ in schedule, work-experience requirements and, importantly, in recognition. Before you enrol in any of them, confirm that the programme and the degree are recognised.</p>

<h2>What is the difference between executive, part-time, weekend and online MBA?</h2>
${table(
  ["Format", "Typical schedule", "Who it suits", "Check"],
  [
    ["Full-time MBA / PGDM", "Daily classes on campus, usually two years", "Freshers and early-career candidates", "Approval (AICTE / UGC), selection process"],
    ["Executive MBA", "Compact or weekend modules for working professionals", "Candidates with several years of experience", "Minimum experience, how selection works"],
    ["Part-time / evening MBA", "Weekday evenings alongside a job", "Professionals in the same city as the campus", "Duration, class timings, attendance rules"],
    ["Weekend MBA", "Classes on Saturdays and Sundays", "Working professionals", "Number of contact hours"],
    ["Online / distance MBA", "Learning platform, recorded and live sessions", "Those who cannot attend campus", "UGC recognition of the programme, assessment and placement support"],
  ],
)}

<h2>Is an online MBA valid in India?</h2>
<p>Online and distance degrees are valid only when the offering university and the specific programme are recognised by the regulator. Check the programme on the UGC website and the university's own page before you enrol. This applies to searches like "MBA in India online" and "executive MBA in India online".</p>

<h2>Can I do an MBA in one year?</h2>
<p>Some programmes, often executive or international-style, run for one year. Searches such as "one year MBA India" and "MBA in 1 year" lead to a mix of options; the entry requirements are usually higher (work experience, a strong profile). Check whether the programme is approved and whether the degree is accepted for the job or further study you have in mind.</p>

<h2>What to check before you choose an executive or part-time MBA</h2>
${ol([
  "<strong>Recognition:</strong> approval for PGDM, university recognition for MBA, UGC status for online.",
  "<strong>Eligibility:</strong> minimum years of work experience, and which exam or test is required (some accept GMAT, CAT or the institute's own test).",
  "<strong>Schedule:</strong> will the timetable work with your job and travel?",
  "<strong>Total cost:</strong> use the worksheet in our " + a("/blog/mba-fees-in-india-guide", "MBA fees guide") + ".",
  "<strong>Outcomes:</strong> ask for alumni outcomes, not only a placement page; many working students are not placed through campus recruitment.",
])}

<h2>Executive and part-time MBA by city</h2>
<p>See ${a("/mba-colleges-in-pune-executive", "executive MBA colleges in Pune")}, ${a("/mba-colleges-in-pune-part-time", "part-time MBA in Pune")}, ${a("/mba-colleges-in-pune-weekend", "weekend MBA in Pune")} and ${a("/mba-colleges-in-pune-online", "online MBA in Pune")}. For Noida and Delhi NCR, see ${a("/mba-colleges-noida", "MBA colleges in Noida")} and our ${a("/blog/mba-colleges-delhi-ncr-noida-guide", "Delhi NCR guide")}.</p>
${RELATED(COMMON_LINKS)}
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
// 9. Specialisations
// ──────────────────────────────────────────────────────────────────────────
const specBody = `
<p><strong>Quick answer:</strong> an MBA specialisation is the set of electives you study in your second year (and sometimes from the first). Marketing, finance, HR, business analytics, operations and supply chain are the most searched. Pick the one that matches the role you want, then check which colleges are strong in it. We do not list salaries by specialisation because they vary by college and year.</p>

<h2>What are the main MBA specialisations?</h2>
${table(
  ["Specialisation", "What you study", "Typical roles", "Good fit if you"],
  [
    ["Marketing (including digital marketing)", "Consumer behaviour, branding, pricing, digital channels, market research", "Brand, product marketing, digital marketing, sales and category roles", "Like understanding customers and campaigns"],
    ["Finance (including banking)", "Corporate finance, valuation, investments, risk, financial markets", "Corporate finance, banking, investment and risk roles", "Are comfortable with numbers and models"],
    ["Human resource management", "Talent acquisition, performance, compensation, labour law, organisational behaviour", "HR business partner, talent, learning and compensation roles", "Enjoy working with people and policy"],
    ["Business analytics and data science", "Statistics, data tools, forecasting, analytics for decisions", "Business and data analyst, analytics consultant roles", "Like working with data to answer business questions"],
    ["Operations and supply chain", "Process design, procurement, logistics, inventory", "Operations, procurement, logistics and supply-chain roles", "Prefer process and systems problems"],
    ["International business", "Global trade, cross-border strategy, trade policy", "Trade, export-import, global strategy roles", "Want an international orientation"],
    ["Entrepreneurship", "Venture building, funding, business models", "Founder, startup, venture roles", "Plan to build or join early-stage ventures"],
    ["Healthcare and hospital management", "Hospital operations, healthcare economics, policy", "Hospital administration, healthcare consulting", "Want a healthcare-sector career"],
  ],
)}

<h2>How do I choose an MBA specialisation?</h2>
${ol([
  "<strong>Start from the role, not the label.</strong> Read ten job descriptions for the role you want and note the skills they ask for.",
  "<strong>Check the curriculum.</strong> Electives and faculty vary more than the specialisation name suggests.",
  "<strong>Look at who recruits.</strong> The institute's placement report lists the sectors; match them to your target — see " + a("/blog/mba-placements-and-salary-how-to-read-reports", "how to read placement reports") + ".",
  "<strong>Keep some flexibility.</strong> Some institutes let you choose or change a specialisation after the first year — ask before you enrol.",
])}

<h2>Best colleges for each specialisation</h2>
<p>Strength in a specialisation depends on the college, so check the programme page. For Pune, we have separate pages: ${a("/mba-colleges-in-pune-for-marketing", "marketing")}, ${a("/mba-colleges-in-pune-for-finance", "finance")}, ${a("/mba-colleges-in-pune-for-hr", "HR")}, ${a("/mba-colleges-in-pune-for-business-analytics", "business analytics")}, ${a("/mba-colleges-in-pune-for-data-science", "data science")}, ${a("/mba-colleges-in-pune-for-operations", "operations")}, ${a("/mba-colleges-in-pune-for-supply-chain", "supply chain")}, ${a("/mba-colleges-in-pune-for-international-business", "international business")} and ${a("/mba-colleges-in-pune-for-entrepreneurship", "entrepreneurship")}. For Noida and Delhi NCR, see ${a("/mba-colleges-noida", "MBA colleges in Noida")} and the ${a("/blog/mba-colleges-delhi-ncr-noida-guide", "Delhi NCR guide")}.</p>

<h2>Is a specialisation different from a PGDM programme name?</h2>
<p>Yes. A PGDM can carry a specialised title (for example, a PGDM in international business) that works like a dedicated programme. Read ${a("/mba-vs-pgdm", "MBA vs PGDM")} to understand how the two differ.</p>
${RELATED(COMMON_LINKS)}
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
// 10. Entrance exams list
// ──────────────────────────────────────────────────────────────────────────
const examsBody = `
<p><strong>Quick answer:</strong> India's main MBA and PGDM entrance exams are CAT, XAT, CMAT, MAT, SNAP, NMAT, ATMA, GMAT and, for Maharashtra, MAH-MBA-CET. Most candidates take two or three to widen their options. The table lists who runs each exam and how often; open any exam for dates, pattern, eligibility and accepting colleges.</p>

<h2>Which entrance exams are there for MBA in India?</h2>
${examOverview()}

<h2>MBA entrance exam dates and registration</h2>
<p>Prefer one table you can bookmark or download? See the ${a("/mba-exam-calendar", "MBA exam calendar")} (free CSV and embeddable widget).</p>
${datesTable()}

<h2>What is the syllabus of the MBA entrance exams?</h2>
<p>Most exams test verbal ability and reading comprehension, quantitative ability and data interpretation with logical reasoning. Some add decision-making or general-knowledge sections. See the section-wise syllabus and pattern for each exam on its page, for example ${a("/exams/cat/syllabus", "CAT syllabus and pattern")}, ${a("/exams/xat/syllabus", "XAT syllabus and pattern")} and ${a("/exams/snap/syllabus", "SNAP syllabus and pattern")}.</p>

<h2>Which MBA entrance exam should I take?</h2>
${ul([
  "<strong>Aiming at the IIMs and the widest choice:</strong> " + examLink("cat", "CAT") + " is accepted most widely.",
  "<strong>Want a second shot with a different pattern:</strong> add " + examLink("xat", "XAT") + " or " + examLink("snap", "SNAP") + ".",
  "<strong>Targeting Maharashtra seats:</strong> " + examLink("mah-mba-cet", "MAH-MBA-CET") + " alongside CAT, CMAT or others.",
  "<strong>Want more attempts in a year:</strong> " + examLink("atma", "ATMA") + ", " + examLink("mat", "MAT") + " and " + examLink("gmat", "GMAT") + " offer several sessions.",
  "<strong>Prefer a computer-based test with multiple attempts:</strong> " + examLink("nmat", "NMAT") + " and " + examLink("snap", "SNAP") + " allow more than one attempt in their window.",
])}
<p>If you want to avoid CAT, read ${a("/blog/mba-without-cat-india", "MBA without CAT")}. For eligibility, see ${a("/blog/mba-eligibility-criteria-in-india", "MBA eligibility criteria")}.</p>

<h2>What is an MBA, and how long is it?</h2>
<p>An MBA (Master of Business Administration) is a postgraduate management degree, usually two years full-time. A PGDM (Post Graduate Diploma in Management) is a similar programme offered by autonomous institutes; see ${a("/mba-vs-pgdm", "MBA vs PGDM")} for the difference. One-year and part-time formats exist — see ${a("/blog/executive-online-part-time-mba-india", "executive and part-time MBA")}.</p>
${RELATED(COMMON_LINKS)}
${SOURCES}`

// ──────────────────────────────────────────────────────────────────────────
export const mbaIndiaGuides: BlogPost[] = [
  {
    id: 29, slug: "mba-fees-in-india-guide",
    title: "MBA Fees in India: What the Total Cost Includes and How to Find It",
    excerpt: "There is no single MBA fee in India. See what the total cost of an MBA or PGDM is made of, how to get the official number, and how scholarships and loans can lower it.",
    body: feesBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "7 min", category: "MBA",
    tags: ["MBA fees in India", "MBA colleges in India low fees", "MBA scholarship India", "PGDM fees", "MBA education loan"],
  },
  {
    id: 30, slug: "mba-placements-and-salary-how-to-read-reports",
    title: "MBA Average Package & Placements: How to Read a Placement Report",
    excerpt: "Average, median and highest package mean different things. Learn how to read an MBA placement report, what to ask about '100% placement' claims, and how to compare colleges fairly.",
    body: placementsBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "7 min", category: "Placements",
    tags: ["MBA average package", "MBA placements India", "MBA colleges placement wise", "median salary MBA", "placement report"],
  },
  {
    id: 31, slug: "how-to-choose-an-mba-college-in-india",
    title: "How to Choose the Best MBA College in India: 8 Criteria That Matter",
    excerpt: "There is no single best MBA college in India. Use eight criteria and a six-step method to build a shortlist that fits your exam score, budget, goal and city.",
    body: chooseBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "8 min", category: "MBA",
    tags: ["best MBA colleges in India", "top MBA colleges in India", "MBA college ranking India", "how to choose MBA college", "NIRF management"],
  },
  {
    id: 32, slug: "mba-cutoff-vs-percentile-explained",
    title: "MBA Cut-off vs Percentile Explained: What Percentile Do You Need?",
    excerpt: "Score, percentile and cut-off are different things. See how each exam produces its score, which institutes publish cut-offs, and which do not — with verified examples.",
    body: cutoffBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "9 min", category: "Exams",
    tags: ["MBA cutoff", "MBA entrance exam cut off", "IIFT cutoff", "FMS cutoff", "percentile for MBA"],
  },
  {
    id: 33, slug: "mba-admission-process-in-india",
    title: "MBA Admission Process in India: Steps, Exam Dates & Documents",
    excerpt: "From entrance exam to offer letter: the eight-step MBA and PGDM admission process in India, with verified exam dates, documents needed and links to each exam guide.",
    body: admissionBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "8 min", category: "MBA",
    tags: ["MBA admission process", "MBA admission 2027", "MBA admission schedule", "MBA admission documents", "MBA entrance exam dates"],
  },
  {
    id: 34, slug: "mba-eligibility-criteria-in-india",
    title: "MBA Eligibility Criteria in India: Marks, Degree & Work Experience",
    excerpt: "Who can do an MBA in India? Exam-wise eligibility as published by each exam body, plus answers on work experience, non-engineering graduates and final-year students.",
    body: eligibilityBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "6 min", category: "MBA",
    tags: ["MBA eligibility criteria", "MBA eligibility India", "MBA without work experience", "MBA after BCom", "MBA after engineering"],
  },
  {
    id: 35, slug: "mba-without-cat-india",
    title: "MBA Without CAT in India: Exams, Direct Admission & How to Verify",
    excerpt: "Yes, you can do an MBA without CAT. See the other exams you can take, state and institute routes, how direct admission works and how to check a programme is genuine.",
    body: withoutCatBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "7 min", category: "MBA",
    tags: ["MBA without CAT", "MBA colleges without CAT", "MBA direct admission", "PGDM without entrance exam", "CMAT MAT SNAP XAT"],
  },
  {
    id: 36, slug: "executive-online-part-time-mba-india",
    title: "Executive, Online & Part-Time MBA in India: Which Format Fits You?",
    excerpt: "Executive, part-time, weekend and online MBA compared: schedule, who each suits, work-experience rules and how to check a programme is recognised before you enrol.",
    body: executiveBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "7 min", category: "MBA",
    tags: ["executive MBA India", "online MBA India", "part time MBA", "MBA for working professionals", "weekend MBA"],
  },
  {
    id: 37, slug: "mba-specialisations-explained",
    title: "MBA Specialisations Explained: Marketing, Finance, HR, Analytics & More",
    excerpt: "What each MBA specialisation covers, the roles it leads to, who it suits and how to choose — marketing, finance, HR, business analytics, operations, international business and more.",
    body: specBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "8 min", category: "MBA",
    tags: ["MBA specialisations", "MBA in marketing", "MBA in finance", "MBA in HR", "MBA business analytics"],
  },
  {
    id: 38, slug: "mba-entrance-exams-in-india",
    title: "MBA Entrance Exams in India: Full List, Dates & Which One to Take",
    excerpt: "CAT, XAT, CMAT, MAT, SNAP, NMAT, ATMA, GMAT and MAH-MBA-CET compared: who runs them, how often, current-cycle dates and a simple way to choose which exams to take.",
    body: examsBody, author: AUTHOR, date: DATE, publishedAt: DATE, readTime: "7 min", category: "Exams",
    tags: ["MBA entrance exams in India", "MBA entrance exam list", "MBA entrance exam dates 2027", "MBA syllabus", "which MBA exam to take"],
  },
]
