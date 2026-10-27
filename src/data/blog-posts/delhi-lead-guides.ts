import type { BlogPost } from "@/types"
import { mbaExams } from "@/data/mba/exams"
import { programAdmissions } from "@/data/mba/programAdmissions"
import type { ProgramAdmission } from "@/data/mba/types"
import { publishedCutoffs } from "@/data/mba/cutoffs"
import { INSTITUTE_SHORT } from "@/data/mba/instituteLabels"
import { nirf2025Management, NIRF_SOURCE } from "@/data/mba/nirf2025"

// 20 Delhi-focused admission guides for students deciding where to apply for MBA or PGDM.
// Nothing about a college is typed by hand: institutes, exams, intakes, notes, cut-off measures and NIRF ranks
// are read from src/data/mba/*. Each guide has its own question and its own table, so none repeats another.
//
// Publishing schedule: every guide has a `publishAt` date. blogs.ts includes a guide only once that date has
// passed at build time, and the daily workflow in .github/workflows/auto-publish.yml redeploys so scheduled
// guides appear on their date without a manual push.

const AUTHOR = "CampusLelo Editorial Team"
const REVIEWED = "2026-10-27"

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const a = (href: string, text: string) => `<a href="${href}">${text}</a>`
const ul = (items: string[]) => (items.length ? `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>` : "")
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`)
const examName = (slug: string) => mbaExams.find((e) => e.slug === slug)?.name ?? slug.replace(/-/g, " ").toUpperCase()
const examLinks = (slugs: string[]) => slugs.map((s) => (mbaExams.some((e) => e.slug === s) ? a(`/exams/${s}`, esc(examName(s))) : esc(examName(s)))).join(", ")
const short = (p: ProgramAdmission) => INSTITUTE_SHORT[p.id] ?? p.institution
const byIds = (ids: string[]) => ids.map((id) => programAdmissions.find((p) => p.id === id)).filter(Boolean) as ProgramAdmission[]
const NCR_CITIES = ["Delhi", "Gurugram", "Ghaziabad", "Noida", "Greater Noida"]
const ncr = () => programAdmissions.filter((p) => NCR_CITIES.includes(p.city))

const table = (rows: ProgramAdmission[]) =>
  rows.length === 0 ? "" : `<table><thead><tr><th>Institute</th><th>Programme</th><th>Exams it lists</th><th>Intake the source refers to</th><th>Source</th></tr></thead><tbody>${rows
    .map((p) => `<tr><td>${a(`/mba-admission/${p.id}`, esc(short(p)))}</td><td>${esc(p.program)}</td><td>${p.examsAccepted.length ? examLinks(p.examsAccepted) : "see its admission page"}</td><td>${esc(p.intake)}</td><td><a href="${p.source.url}" rel="nofollow noopener">${esc(p.source.label)}</a> (checked ${p.source.accessed})</td></tr>`)
    .join("")}</tbody></table>`

const notes = (rows: ProgramAdmission[]) => ul(rows.filter((p) => p.notes).map((p) => `<strong>${esc(short(p))}:</strong> ${esc(p.notes as string)}`))

const cutoffBlock = (match: string[]) => {
  const cs = publishedCutoffs.filter((c) => match.some((m) => c.institution.includes(m)))
  if (!cs.length) return ""
  return `<h2>Cut-offs these institutes have published</h2>
<p>Only figures an institute released itself and that we could cross-check. The "measure" column matters: a composite score, a sectional percentile and an overall percentile are different things and cannot be compared with each other.</p>
<table><thead><tr><th>Institute</th><th>Batch and exam</th><th>What the number is</th><th>Value</th></tr></thead><tbody>${cs
    .map((c) => `<tr><td>${esc(c.institution)}</td><td>${esc(c.admissionYear)} · ${esc(c.examCycle)}</td><td>${esc(c.measure)}</td><td>${esc(c.values.map((v) => `${v.category}: ${v.value}`).join("; "))}</td></tr>`)
    .join("")}</tbody></table>`
}

const NEXT = `
<h2>Next step</h2>
<p>Shortlist by the exam you hold, then confirm the current cycle on each institute's page. If you want help comparing options for your score and budget, ${a("/mba-admission-in-delhi#lead-form", "get a free Delhi MBA/PGDM shortlist")}. You can also use the ${a("/mba-cutoff-checker", "cut-off checker")}, the ${a("/mba-exam-calendar", "exam calendar")} or the ${a("/mba-exam-acceptance", "exam acceptance table")}.</p>`

const SOURCES = `
<h2>How we verify this</h2>
<p>Each row comes from the institute's own admission page or brochure for the intake shown, read on the date given. Acceptance is recorded per programme and campus. We do not publish fees, placement numbers or predicted cut-offs we cannot source, and we do not rank institutes ourselves. <strong>Always confirm on the institute's site before you apply.</strong> Last reviewed ${REVIEWED}.</p>`

const RELATED = `
<h2>Related pages</h2>
${ul([
  a("/mba-admission-in-delhi", "MBA admission in Delhi"), a("/pgdm-admission-in-delhi", "PGDM admission in Delhi"), a("/mba-colleges-in-delhi", "MBA colleges in Delhi"),
  a("/mba-colleges-in-delhi-ncr", "MBA colleges in Delhi NCR"), a("/best-mba-colleges-in-delhi", "Best MBA colleges in Delhi (NIRF 2025)"), a("/mba-vs-pgdm", "MBA vs PGDM"),
])}`

interface Spec {
  id: number
  slug: string
  title: string
  excerpt: string
  tags: string[]
  category: string
  publishAt: string
  body: () => string
}

const wrap = (quick: string, middle: string) => `<p><strong>Quick answer:</strong> ${quick}</p>${middle}${NEXT}${RELATED}${SOURCES}`

const compare = (ids: string[], intro: string, cutoffs: string[] = []) => () => {
  const rows = byIds(ids)
  const exams = Array.from(new Set(rows.flatMap((p) => p.examsAccepted)))
  const shared = exams.filter((e) => rows.every((p) => p.examsAccepted.includes(e)))
  return wrap(
    `${intro} ${shared.length ? `All ${rows.length} list ${list(shared.map(examName))}.` : `They do not share one exam: ${list(rows.map((p) => `${short(p)} lists ${p.examsAccepted.length ? list(p.examsAccepted.map(examName)) : "the exams on its page"}`))}.`}`,
    `<h2>Side by side</h2>${table(rows)}<h2>What each institute's page says about selection</h2>${notes(rows)}${cutoffs.length ? cutoffBlock(cutoffs) : ""}
<h2>How to choose between them</h2>
<p>Start with the exam column: an institute you cannot apply to with your score is not a real option. Then read the selection notes, because two institutes that list the same exam can weigh it differently or add a written test, group discussion or interview. Finally compare total fees and the latest placement report from each institute, which we do not publish here.</p>`,
  )
}

const SPECS: Spec[] = [
  {
    id: 56, slug: "fms-vs-iift-vs-iit-delhi-dms-mba-admission", publishAt: "2026-10-27", category: "MBA",
    title: "FMS vs IIFT vs IIT Delhi DMS: MBA Admission Compared",
    excerpt: "How admission works at FMS Delhi, IIFT and IIT Delhi DMS: the exam each uses, what the published cut-off number actually measures, and the steps after the score.",
    tags: ["FMS vs IIFT", "IIT Delhi DMS MBA admission", "FMS Delhi admission process", "IIFT admission process", "Delhi MBA CAT"],
    body: compare(["fms-delhi-mba", "iift-delhi-mba-ib", "iitd-dms-mba"], "These three Delhi MBA programmes all admit through CAT, but their shortlisting and published numbers differ.", ["FMS", "IIFT"]),
  },
  {
    id: 57, slug: "imi-vs-fore-vs-lbsim-vs-fiib-pgdm-exams-accepted", publishAt: "2026-10-27", category: "MBA",
    title: "IMI vs FORE vs LBSIM vs FIIB: PGDM Exams Accepted",
    excerpt: "The four Delhi PGDM programmes compared on one thing students ask first: which entrance exams each lists on its own admission page.",
    tags: ["IMI vs FORE", "LBSIM PGDM admission", "FIIB PGDM exams accepted", "PGDM colleges Delhi", "FORE School of Management admission"],
    body: compare(["imi-delhi-pgdm", "fore-delhi-pgdm", "lbsim-delhi-pgdm", "fiib-delhi-pgdm"], "These Delhi PGDM programmes differ most in how many exams they accept.", ["IMI"]),
  },
  {
    id: 58, slug: "mdi-gurgaon-vs-imt-ghaziabad-vs-bimtech-pgdm-admission", publishAt: "2026-10-27", category: "MBA",
    title: "MDI Gurgaon vs IMT Ghaziabad vs BIMTECH: PGDM Admission",
    excerpt: "Three NCR PGDM programmes compared on the exams each lists, the steps after the score and the cut-off figures each has published.",
    tags: ["MDI Gurgaon admission", "IMT Ghaziabad admission", "BIMTECH admission", "PGDM NCR", "MDI vs IMT"],
    body: compare(["mdi-gurugram-pgdm", "imt-ghaziabad-pgdm", "bimtech-greater-noida-pgdm"], "These three NCR PGDM programmes sit outside Delhi proper but draw many Delhi applicants.", ["MDI", "IMT", "BIMTECH"]),
  },
  {
    id: 59, slug: "jaipuria-vs-jbs-vs-amity-noida-mba-exams-accepted", publishAt: "2026-10-27", category: "MBA",
    title: "Jaipuria vs JBS vs Amity Noida: MBA Exams Accepted",
    excerpt: "Three Noida MBA and PGDM programmes compared on the exams each lists and the intake its source refers to.",
    tags: ["Jaipuria Noida admission", "JBS Noida MBA", "Amity Noida MBA admission", "MBA colleges Noida exams"],
    body: compare(["jaipuria-noida-pgdm", "jbs-noida-mba", "amity-noida-mba"], "Noida's institutes usually list several exams, so the useful comparison is which ones overlap with the score you hold.", ["Jaipuria", "Jaypee"]),
  },
  {
    id: 60, slug: "greater-noida-mba-pgdm-bimtech-gl-bajaj-sharda-galgotias", publishAt: "2026-10-27", category: "MBA",
    title: "Greater Noida MBA and PGDM: BIMTECH, GL Bajaj, Sharda, Galgotias",
    excerpt: "Four Greater Noida programmes compared on the exams each lists, with the source and check date for every row.",
    tags: ["Greater Noida MBA", "BIMTECH vs GL Bajaj", "Sharda MBA admission", "Galgotias MBA", "PGDM Greater Noida"],
    body: compare(["bimtech-greater-noida-pgdm", "glbimr-greater-noida-pgdm", "sharda-greater-noida-mba", "galgotias-greater-noida-mba-ba"], "Greater Noida mixes a well-known PGDM school with university MBA programmes, and their exam lists differ.", ["BIMTECH", "Sharda"]),
  },
  {
    id: 61, slug: "dehradun-mba-graphic-era-upes-dit-doon-university", publishAt: "2026-10-27", category: "MBA",
    title: "Dehradun MBA: Graphic Era, UPES, DIT and Doon University Compared",
    excerpt: "Four Dehradun MBA programmes compared on the exams each lists and what each institute's page says about selection.",
    tags: ["Dehradun MBA", "Graphic Era MBA admission", "UPES MBA admission", "DIT Dehradun MBA", "Doon University MBA"],
    body: compare(["graphic-era-dehradun-mba", "upes-dehradun-mba", "dit-dehradun-mba", "doon-university-mba"], "Dehradun's MBA programmes are university-run, and the exam lists below show how much choice you have.", ["Graphic Era", "UPES"]),
  },
  {
    id: 62, slug: "delhi-mba-pgdm-accepting-xat-and-gmat", publishAt: "2026-10-27", category: "Exams",
    title: "Delhi MBA and PGDM Colleges Accepting XAT or GMAT",
    excerpt: "Which Delhi programmes list XAT or GMAT on their own admission pages, for students who did not rely on CAT alone.",
    tags: ["Delhi MBA XAT", "Delhi PGDM GMAT", "XAT accepted colleges Delhi", "GMAT accepted colleges Delhi"],
    body: () => {
      const rows = programAdmissions.filter((p) => p.city === "Delhi" && (p.examsAccepted.includes("xat") || p.examsAccepted.includes("gmat")))
      const both = rows.filter((p) => p.examsAccepted.includes("xat") && p.examsAccepted.includes("gmat"))
      return wrap(
        `${rows.length} Delhi programmes on our verified list state that they accept XAT or GMAT${both.length ? `, and ${both.length} list both: ${list(both.map(short))}` : ""}.`,
        `<h2>Delhi programmes that list XAT or GMAT</h2>${table(rows)}<h2>What each source says</h2>${notes(rows)}
<h2>If you hold only one of the two</h2>
<p>XAT is run by XLRI and its registration closes before many institutes finish their own rounds, so read the ${a("/exams/xat", "XAT guide")} early. GMAT is booked by slot, so you can plan attempts around deadlines: see the ${a("/exams/gmat", "GMAT guide")}. Whichever you hold, confirm the exam is listed for the intake you are applying to. See also ${a("/mba-colleges-in-delhi-accepting-xat", "Delhi colleges accepting XAT")} and ${a("/mba-colleges-in-delhi-accepting-gmat", "Delhi colleges accepting GMAT")}.</p>`,
      )
    },
  },
  {
    id: 63, slug: "delhi-ncr-pgdm-mba-accepting-cmat-mat-atma", publishAt: "2026-10-27", category: "Exams",
    title: "Delhi NCR MBA and PGDM Accepting CMAT, MAT or ATMA",
    excerpt: "Delhi NCR programmes that list CMAT, MAT or ATMA on their own admission pages, with the intake each source refers to.",
    tags: ["CMAT colleges Delhi NCR", "MAT accepted colleges Noida", "ATMA PGDM", "MBA without CAT Delhi NCR"],
    body: () => {
      const rows = ncr().filter((p) => ["cmat", "mat", "atma"].some((e) => p.examsAccepted.includes(e)))
      const catOnly = ncr().filter((p) => p.examsAccepted.length > 0 && p.examsAccepted.every((e) => e === "cat"))
      return wrap(
        `${rows.length} Delhi NCR programmes on our verified list state that they accept CMAT, MAT or ATMA. ${catOnly.length ? `${list(catOnly.map(short))} list only CAT for the programmes we checked, so you would need a CAT score for ${catOnly.length === 1 ? "it" : "them"}.` : ""}`,
        `<h2>Programmes that list CMAT, MAT or ATMA</h2>${table(rows)}<h2>What each source says</h2>${notes(rows)}
<h2>Using these exams well</h2>
<p>CMAT is run by the National Testing Agency and MAT by AIMA, which holds several sessions a year; ATMA has its own schedule. Dates and eligibility are in the ${a("/exams/cmat", "CMAT")}, ${a("/exams/mat", "MAT")} and ${a("/exams/atma", "ATMA")} guides. Do not treat any of these as a guaranteed route: each institute sets its own cut-off and selection steps.</p>`,
      )
    },
  },
  {
    id: 64, slug: "cuet-pg-for-mba-institutes-that-list-it", publishAt: "2026-10-30", category: "Exams",
    title: "CUET PG for MBA: Institutes That List It and What NTA Says",
    excerpt: "Which MBA programmes on our verified list accept a CUET score, plus the CUET PG pattern and 2026 dates from NTA's own bulletin.",
    tags: ["CUET PG MBA", "CUET PG MBA colleges", "CUET PG exam pattern", "MBA through CUET PG"],
    body: () => {
      const rows = programAdmissions.filter((p) => p.examsAccepted.includes("cuet-pg"))
      const e = mbaExams.find((x) => x.slug === "cuet-pg")
      return wrap(
        `${rows.length} MBA programmes on our verified list state that they accept a CUET score: ${list(rows.map(short))}. ${e ? `According to NTA's 2026 bulletin the test is computer-based, 90 minutes, 75 questions per paper, +4 for a correct answer and -1 for a wrong one.` : ""}`,
        `<h2>Programmes that list CUET</h2>${table(rows)}<h2>What each source says</h2>${notes(rows)}
${e ? `<h2>What NTA published for 2026</h2>${ul(e.keyDates.map((k) => `<strong>${esc(k.label)}:</strong> ${esc(k.value)}`))}<p>${esc(e.datesNote ?? "")}</p>` : ""}
<h2>Read next</h2><p>Full details are in the ${a("/exams/cuet-pg", "CUET PG guide")}, with the ${a("/exams/cuet-pg/syllabus", "pattern page")} and the ${a("/exams/cuet-pg/colleges", "accepting colleges page")}.</p>`,
      )
    },
  },
  {
    id: 65, slug: "mba-pgdm-institutes-accepting-five-or-more-exams-ncr", publishAt: "2026-10-30", category: "Exams",
    title: "Delhi NCR Institutes That Accept Five or More MBA Exams",
    excerpt: "The Delhi NCR programmes that list the widest range of entrance exams, useful if your score is from a less common test.",
    tags: ["MBA colleges accepting multiple exams", "FIIB exams accepted", "Amity Noida MBA exams", "MBA with any exam Delhi NCR"],
    body: () => {
      const rows = ncr().filter((p) => p.examsAccepted.length >= 5).sort((x, y) => y.examsAccepted.length - x.examsAccepted.length)
      return wrap(
        `${rows.length} Delhi NCR programmes list five or more exams on their own pages: ${list(rows.map((p) => `${short(p)} (${p.examsAccepted.length})`))}.`,
        `<h2>Programmes with the widest exam lists</h2>${table(rows)}<h2>What each source says</h2>${notes(rows)}
<h2>What a long exam list does and does not mean</h2>
<p>A long list means the institute will consider several scores. It does not mean every exam is weighed equally or that any score will be enough: each institute sets its own cut-off, interview and weightage. Use the list to avoid being locked out by the exam you hold, then compare selection steps.</p>`,
      )
    },
  },
  {
    id: 66, slug: "mba-entrance-exam-dates-2026-27-what-to-register-for-first", publishAt: "2026-10-30", category: "Exams",
    title: "MBA Entrance Exam Dates 2026-27: What to Register For First",
    excerpt: "The sourced registration and exam dates for the main MBA exams, in one table, with a note on which dates are not yet confirmed.",
    tags: ["MBA entrance exam dates", "MBA exam calendar 2026", "CAT CMAT XAT dates", "MBA registration dates"],
    body: () => {
      const rows = mbaExams.map((e) => `<tr><td>${a(`/exams/${e.slug}`, esc(e.name))}</td><td>${esc(e.cycleLabel)}</td><td>${e.keyDates.length ? ul(e.keyDates.map((k) => `${esc(k.label)}: ${esc(k.value)}`)) : "Not yet confirmed"}</td><td>${esc(e.datesNote ?? "")}</td></tr>`).join("")
      return wrap(
        "register first for the exam whose window closes soonest and that your target institutes list. The table below gives each exam's sourced dates, and says plainly where a date is not yet confirmed.",
        `<h2>Dates by exam</h2><table><thead><tr><th>Exam</th><th>Cycle</th><th>Sourced dates</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table>
<h2>How to order your registrations</h2>${ul([
  "List the exams your target Delhi institutes accept (see the " + a("/mba-exam-acceptance", "acceptance table") + ").",
  "Sort those exams by the date their registration closes.",
  "Register for the earliest one first, and keep a second exam as a back-up.",
  "Re-check each exam's official site before paying: dates move.",
])}
<p>The same data powers the ${a("/mba-exam-calendar", "MBA exam calendar")}.</p>`,
      )
    },
  },
  {
    id: 67, slug: "which-mba-exam-do-delhi-ncr-institutes-list-most", publishAt: "2026-11-03", category: "Exams",
    title: "Which MBA Exam Do Delhi NCR Institutes List Most?",
    excerpt: "A count of how many verified Delhi NCR programmes list each entrance exam, to help you decide which score is worth chasing.",
    tags: ["which MBA exam is best Delhi NCR", "CAT vs CMAT vs XAT", "MBA exam acceptance count", "MBA entrance exam choice"],
    body: () => {
      const rows = ncr()
      const counts = new Map<string, ProgramAdmission[]>()
      for (const p of rows) for (const e of p.examsAccepted) counts.set(e, [...(counts.get(e) ?? []), p])
      const sortedCounts = [...counts.entries()].sort((x, y) => y[1].length - x[1].length)
      return wrap(
        `among the ${rows.length} Delhi NCR programmes we verified, ${sortedCounts.length ? `${examName(sortedCounts[0][0])} is listed by the most (${sortedCounts[0][1].length})` : "no exam data is available"}. The table counts listings on the programmes' own pages; it says nothing about difficulty or cut-offs.`,
        `<h2>Exam listings across verified Delhi NCR programmes</h2><table><thead><tr><th>Exam</th><th>Programmes that list it</th><th>Which</th></tr></thead><tbody>${sortedCounts
          .map(([e, ps]) => `<tr><td>${examLinks([e])}</td><td>${ps.length}</td><td>${esc(list(ps.map(short)))}</td></tr>`)
          .join("")}</tbody></table>
<h2>How to read this</h2>
<p>More listings means more institutes will consider that score, not that it is easier. A second exam widens your options; the right pair depends on the institutes you want. Check the ${a("/mba-exam-calendar", "calendar")} for deadlines.</p>`,
      )
    },
  },
  {
    id: 68, slug: "mba-or-pgdm-in-delhi-ncr-which-to-choose", publishAt: "2026-11-03", category: "MBA",
    title: "MBA or PGDM in Delhi NCR: Which Should You Choose?",
    excerpt: "How many verified Delhi NCR programmes are MBA and how many are PGDM, what the difference means, and what to check before you choose.",
    tags: ["MBA or PGDM Delhi", "PGDM vs MBA NCR", "PGDM equivalent to MBA", "choose PGDM or MBA"],
    body: () => {
      const rows = ncr()
      const mba = rows.filter((p) => p.programType === "MBA")
      const pgdm = rows.filter((p) => p.programType === "PGDM")
      return wrap(
        `of the ${rows.length} Delhi NCR programmes we verified, ${mba.length} are MBA and ${pgdm.length} are PGDM. An MBA is a university degree; a PGDM is a diploma from an AICTE-approved institute, and equivalence is not automatic.`,
        `<h2>MBA programmes we verified</h2>${ul(mba.map((p) => a(`/mba-admission/${p.id}`, esc(short(p))) + ` (${esc(p.city)})`))}
<h2>PGDM programmes we verified</h2>${ul(pgdm.map((p) => a(`/mba-admission/${p.id}`, esc(short(p))) + ` (${esc(p.city)})`))}
<h2>What to check before choosing</h2>${ul([
  "Whether you need a degree: some PhD, UGC-NET and government roles ask for an MBA or an equivalent. AIU can grant equivalence to a specific PGDM, so ask the institute for the letter.",
  "The programme's current AICTE approval and accreditation.",
  "The exams it accepts, from its own page.",
  "Total fees and the latest placement report from the institute itself.",
])}
<p>The full comparison is in ${a("/mba-vs-pgdm", "MBA vs PGDM")} and, in Hindi, ${a("/mba-kya-hai", "MBA kya hai")}.</p>`,
      )
    },
  },
  {
    id: 69, slug: "how-to-shortlist-delhi-mba-pgdm-in-five-steps", publishAt: "2026-11-03", category: "MBA",
    title: "How to Shortlist Delhi MBA and PGDM Colleges in Five Steps",
    excerpt: "A practical order for building a shortlist: exam first, then eligibility, then selection steps, then cost and outcomes.",
    tags: ["shortlist MBA colleges Delhi", "how to choose MBA college Delhi", "MBA admission planning", "PGDM shortlist"],
    body: () => wrap(
      "shortlist in this order: exam, eligibility, selection steps, then cost and outcomes. Doing it in reverse is how students fall for a college they cannot apply to.",
      `<h2>The five steps</h2><ol>
<li><strong>Exam.</strong> Write down the scores you hold or can still take, then filter institutes by the exams they list: ${a("/mba-exam-acceptance", "acceptance table")}.</li>
<li><strong>Eligibility.</strong> Read each institute's graduation and work-experience rule. Rules differ by programme: ${a("/blog/mba-eligibility-criteria-in-india", "eligibility guide")}.</li>
<li><strong>Selection steps.</strong> Note whether it adds a group discussion, written test or interview and how the score is weighed: ${a("/blog/mba-admission-process-in-india", "admission process")}.</li>
<li><strong>Cost and outcomes.</strong> Take total fees and the placement report from the institute itself and compare like for like: ${a("/blog/mba-fees-in-india-guide", "fees guide")}, ${a("/blog/mba-placements-and-salary-how-to-read-reports", "placement guide")}.</li>
<li><strong>Approval.</strong> Confirm AICTE approval and, for a PGDM, whether equivalence matters to you: ${a("/mba-vs-pgdm", "MBA vs PGDM")}.</li></ol>
<h2>Where to start in Delhi</h2><p>${a("/mba-admission-in-delhi", "MBA admission in Delhi")} and ${a("/pgdm-admission-in-delhi", "PGDM admission in Delhi")} list every programme we verified with its exams and selection notes.</p>`,
    ),
  },
  {
    id: 70, slug: "questions-to-ask-a-delhi-mba-admission-office", publishAt: "2026-11-06", category: "MBA",
    title: "12 Questions to Ask a Delhi MBA or PGDM Admission Office",
    excerpt: "A checklist of questions that get a straight answer on approval, fees, selection and outcomes before you pay a seat fee.",
    tags: ["questions to ask admission office", "MBA admission checklist", "PGDM admission questions", "before paying MBA fees"],
    body: () => wrap(
      "ask for every answer in writing or on the institute's official page. The questions below cover approval, cost, selection and outcomes, which are the four places students are most often surprised.",
      `<h2>Approval</h2>${ul(["Is this programme currently approved by AICTE for this intake? Can I see the approval letter?", "If it is a PGDM, does it hold AIU equivalence to an MBA, and for which years?", "Is the programme accredited (NBA, NAAC or another body), and until when?"])}
<h2>Cost</h2>${ul(["What is the total programme fee, including hostel, exam and other charges, for both years?", "What is refundable if I withdraw, and by what date?", "Is the seat fee adjusted against the first instalment?"])}
<h2>Selection</h2>${ul(["Which exams and which cycle's scores do you accept for this intake?", "What are the next steps after the score: group discussion, written test, interview?", "What weightage do the score, profile and interview carry?"])}
<h2>Outcomes</h2>${ul(["Can I see the latest placement report, with the number of students who sat and who were placed?", "How many companies visited, and how is the median package calculated?", "What support is there for students who are not placed in the first round?"])}
<p>Before you ask, shortlist with ${a("/blog/how-to-shortlist-delhi-mba-pgdm-in-five-steps", "five steps")} and read ${a("/blog/mba-placements-and-salary-how-to-read-reports", "how to read a placement report")}.</p>`,
    ),
  },
  {
    id: 71, slug: "published-cat-cutoffs-delhi-ncr-mba-institutes", publishAt: "2026-11-06", category: "Cutoffs",
    title: "Published MBA Cut-offs for Delhi NCR Institutes: What They Measure",
    excerpt: "Every Delhi NCR cut-off we could verify, with what each number actually measures: composite score, sectional percentile or overall percentile.",
    tags: ["FMS cutoff", "IIFT cutoff", "MDI cutoff", "IMI cutoff", "Delhi NCR MBA cutoff"],
    body: () => {
      const cs = publishedCutoffs.filter((c) => NCR_CITIES.includes(c.city))
      return wrap(
        `${cs.length} Delhi NCR institutes have a cut-off we could verify. The numbers are not comparable with each other because each measures something different.`,
        `${cutoffBlock(cs.map((c) => c.institution))}
<h2>How each institute uses its number</h2>${ul(cs.map((c) => `<strong>${esc(c.institution)}:</strong> ${esc(c.howItWorks)}`))}
<h2>Caveats</h2>${ul(cs.map((c) => `<strong>${esc(c.institution.replace(/\s*\(.*?\)/, ""))}:</strong> ${esc(c.caveats)}`))}
<p>Use these as context, never as a promise. Institutes that publish no fixed cut-off are listed on ${a("/mba-cutoff-delhi-ncr", "MBA cut-offs in Delhi NCR")}.</p>`,
      )
    },
  },
  {
    id: 72, slug: "nirf-2025-delhi-ncr-management-institutes", publishAt: "2026-11-06", category: "Rankings",
    title: "NIRF 2025: Delhi NCR Management Institutes in the Top 100",
    excerpt: "Which Delhi, Gurugram, Ghaziabad, Noida and Greater Noida institutes appear in the NIRF 2025 management ranking, with rank and score as published.",
    tags: ["NIRF 2025 management Delhi", "top MBA colleges Delhi NCR NIRF", "MDI Gurgaon NIRF rank", "IIFT NIRF rank"],
    body: () => {
      const cities = new Set(["Gurugram", "Gurgaon", "Ghaziabad", "Noida", "Gautam Budh Nagar", "Greater Noida"])
      const rows = nirf2025Management.filter((r) => r.state === "Delhi" || cities.has(r.city))
      return wrap(
        `${rows.length} institutes in Delhi, Gurugram, Ghaziabad, Noida and Greater Noida appear in the NIRF 2025 management top 100; the highest is ${rows[0] ? `${rows[0].name} at rank ${rows[0].rank}` : "not available"}. Ranks are copied as published, not re-ranked.`,
        `<h2>NIRF 2025 management ranking: Delhi NCR</h2><table><thead><tr><th>NIRF rank</th><th>Institute</th><th>City</th><th>Score</th></tr></thead><tbody>${rows
          .map((r) => `<tr><td>${r.rank}</td><td>${r.programId ? a(`/mba-admission/${r.programId}`, esc(r.name)) : esc(r.name)}</td><td>${esc(r.city)}</td><td>${r.score.toFixed(2)}</td></tr>`)
          .join("")}</tbody></table>
<p>Source: <a href="${NIRF_SOURCE.url}" rel="nofollow noopener">${esc(NIRF_SOURCE.label)}</a>, checked ${NIRF_SOURCE.accessed}. NIRF ranks only the institutes that took part, so an institute missing from this table may simply not have participated.</p>
<h2>Using a rank</h2><p>NIRF scores teaching and resources, research, graduation outcomes, outreach and perception. Treat the rank as one input and still check the programme's accepted exams, total fees and placement report. See ${a("/best-mba-colleges-in-delhi", "Best MBA colleges in Delhi")} and ${a("/best-mba-colleges-in-india", "Best MBA colleges in India")}.</p>`,
      )
    },
  },
  {
    id: 73, slug: "nirf-2025-uttar-pradesh-uttarakhand-management-institutes", publishAt: "2026-11-10", category: "Rankings",
    title: "NIRF 2025: Uttar Pradesh and Uttarakhand Management Institutes",
    excerpt: "Which Uttar Pradesh and Uttarakhand management institutes appear in the NIRF 2025 top 100, with rank and score as published.",
    tags: ["NIRF 2025 Uttar Pradesh MBA", "NIRF Uttarakhand MBA", "IIM Lucknow NIRF rank", "UPES NIRF rank"],
    body: () => {
      const rows = nirf2025Management.filter((r) => r.state === "Uttar Pradesh" || r.state === "Uttarakhand")
      return wrap(
        `${rows.length} Uttar Pradesh and Uttarakhand institutes appear in the NIRF 2025 management top 100, led by ${rows[0] ? `${rows[0].name} at rank ${rows[0].rank}` : "none"}. Ranks are copied as published.`,
        `<h2>NIRF 2025 management ranking: Uttar Pradesh and Uttarakhand</h2><table><thead><tr><th>NIRF rank</th><th>Institute</th><th>City</th><th>State</th><th>Score</th></tr></thead><tbody>${rows
          .map((r) => `<tr><td>${r.rank}</td><td>${r.programId ? a(`/mba-admission/${r.programId}`, esc(r.name)) : esc(r.name)}</td><td>${esc(r.city)}</td><td>${esc(r.state)}</td><td>${r.score.toFixed(2)}</td></tr>`)
          .join("")}</tbody></table>
<p>Source: <a href="${NIRF_SOURCE.url}" rel="nofollow noopener">${esc(NIRF_SOURCE.label)}</a>, checked ${NIRF_SOURCE.accessed}.</p>
<h2>Read next</h2><p>${a("/best-mba-colleges-in-uttar-pradesh", "Best MBA colleges in Uttar Pradesh")}, ${a("/best-mba-colleges-in-uttarakhand", "Best MBA colleges in Uttarakhand")} and ${a("/mba-colleges-in-dehradun", "MBA colleges in Dehradun")}.</p>`,
      )
    },
  },
  {
    id: 74, slug: "iim-kashipur-and-iim-lucknow-mba-admission-explained", publishAt: "2026-11-10", category: "MBA",
    title: "IIM Kashipur and IIM Lucknow: MBA Admission Explained",
    excerpt: "How admission works at the two IIMs closest to Delhi that we have verified: the exam each lists and the cut-off figures each has published.",
    tags: ["IIM Kashipur admission", "IIM Lucknow admission process", "IIM cutoff Kashipur", "IIM near Delhi"],
    body: compare(["iim-kashipur-mba", "iim-lucknow-mba"], "Both IIMs admit through CAT, with their own shortlisting.", ["Kashipur", "Lucknow"]),
  },
  {
    id: 75, slug: "how-to-read-an-mba-cutoff-composite-sectional-overall", publishAt: "2026-11-10", category: "Cutoffs",
    title: "How to Read an MBA Cut-off: Composite, Sectional or Overall",
    excerpt: "The same word, cut-off, means three different things at different institutes. How to tell which, using the published figures for Delhi NCR.",
    tags: ["what is MBA cutoff", "composite score cutoff", "sectional cutoff CAT", "MBA cutoff meaning"],
    body: () => {
      const cs = publishedCutoffs.filter((c) => NCR_CITIES.includes(c.city))
      return wrap(
        "a cut-off can be a composite score, a minimum percentile in each section, or an overall percentile, and these cannot be compared. Always read what the number measures before you compare two institutes.",
        `<h2>What each published figure measures</h2><table><thead><tr><th>Institute</th><th>What the number is</th></tr></thead><tbody>${cs.map((c) => `<tr><td>${esc(c.institution)}</td><td>${esc(c.measure)}</td></tr>`).join("")}</tbody></table>
<h2>Three rules</h2>${ul([
  "A composite score weights the CAT sections, so it is not a percentile and cannot be set beside one.",
  "A sectional minimum is a floor in each section, not a target for your overall percentile.",
  "A cut-off for the interview shortlist is not a cut-off for the final offer.",
])}
<h2>Check your own numbers</h2><p>The ${a("/mba-cutoff-checker", "cut-off checker")} compares your score with the figures institutes have published, and says plainly when none exists. More in ${a("/mba-cutoff-delhi-ncr", "MBA cut-offs in Delhi NCR")}.</p>`,
      )
    },
  },
]

const READ_TIME = "6 min"
export const delhiLeadGuides: (BlogPost & { publishAt: string })[] = SPECS.map((s) => ({
  id: s.id, slug: s.slug, title: s.title, excerpt: s.excerpt, body: s.body(), author: AUTHOR,
  date: s.publishAt, publishedAt: s.publishAt, readTime: READ_TIME, category: s.category, tags: s.tags, publishAt: s.publishAt,
}))
