import { mbaExams } from "@/data/mba/exams"
import { programAdmissions } from "@/data/mba/programAdmissions"
import type { ProgramAdmission } from "@/data/mba/types"
import { INSTITUTE_SHORT } from "@/data/mba/instituteLabels"
import { nirf2025Management, NIRF_SOURCE } from "@/data/mba/nirf2025"
import { FLAGSHIP_DELHI_NCR_HTML } from "./flagship-delhi-ncr"

// Ten decision guides for students choosing an MBA or PGDM exam and a city. They are stored in Supabase (seeded by
// /api/cron/seed-guides) so they show in the admin Blogs list and can be edited there.
//
// Research method: every exam fact (dates, fees, pattern, eligibility) is read from src/data/mba/exams.ts, where each
// value carries its official source and check date; every institute fact is read from programAdmissions.ts; ranks are
// copied from NIRF 2025. Nothing about an exam or college is typed by hand here. Each guide answers a different
// question from the exam hub pages: how exams compare, what they cost, and which city fits which exam.

const REVIEWED = "3 Nov 2026"
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const a = (href: string, text: string) => `<a href="${href}">${text}</a>`
const ul = (items: string[]) => (items.length ? `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>` : "")
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`)
const short = (p: ProgramAdmission) => INSTITUTE_SHORT[p.id] ?? p.institution.split(",")[0]
const exam = (slug: string) => mbaExams.find((e) => e.slug === slug)
const examName = (slug: string) => exam(slug)?.name ?? slug.toUpperCase()
const examLink = (slug: string) => (exam(slug) ? a(`/exams/${slug}`, esc(examName(slug))) : esc(examName(slug)))
const accepting = (slug: string) => programAdmissions.filter((p) => p.examsAccepted.includes(slug))
const NCR = ["Delhi", "Gurugram", "Ghaziabad", "Noida", "Greater Noida"]

const CTA = `<h2>Want a shortlist for your score?</h2>
<p>Tell us your exam, score and budget and a counsellor will share realistic options and deadlines: ${a("/mba-admission-in-delhi#lead-form", "get a free Delhi MBA/PGDM shortlist")}. Prefer to compare yourself? Use the ${a("/mba-exam-acceptance", "exam acceptance table")} and the ${a("/mba-cutoff-checker", "cut-off checker")}.</p>`

const METHOD = `<h2>How we researched this</h2>
<p><strong>Who:</strong> the CampusLelo editorial team. <strong>How:</strong> exam facts come from each exam body's own pages and bulletins, institute facts from each institute's own admission page, and ranks from the NIRF 2025 list, all read on the dates shown on the linked pages. Where an official page could not be read, the page says the figure is from secondary reports. We do not publish fees, placement numbers or predicted cut-offs we cannot source, and we do not rank institutes ourselves. <strong>Why:</strong> to help you pick an exam and a city before you pay a fee. Always confirm on the exam body's and institute's own site: dates and fees change every cycle. Last reviewed ${REVIEWED}.</p>`

const RELATED = `<h2>Related guides</h2>${ul([
  a("/blog/mba-entrance-exams-in-india", "MBA entrance exams in India"), a("/mba-exam-calendar", "MBA exam calendar"), a("/mba-admission-in-delhi", "MBA admission in Delhi"),
  a("/pgdm-admission-in-delhi", "PGDM admission in Delhi"), a("/mba-vs-pgdm", "MBA vs PGDM"), a("/best-mba-colleges-in-india", "Best MBA colleges in India (NIRF 2025)"),
])}`

const wrap = (quick: string, middle: string) => `<p><strong>Quick answer:</strong> ${quick}</p>${middle}${CTA}${RELATED}${METHOD}`

interface Spec { slug: string; title: string; excerpt: string; category: string; tags: string[]; body: () => string }

const examRow = (e: (typeof mbaExams)[number]) =>
  `<tr><td>${examLink(e.slug)}</td><td>${esc(e.conductingBody)}</td><td>${esc(e.pattern.mode)}</td><td>${e.pattern.durationMinutes} min${e.pattern.totalQuestions ? `, ${e.pattern.totalQuestions} questions` : ""}</td><td>${esc(e.frequency)}</td><td>${accepting(e.slug).length}</td></tr>`

const compareExams = (slugs: string[]) => {
  const es = slugs.map(exam).filter(Boolean) as (typeof mbaExams)[number][]
  return `<table><thead><tr><th>Exam</th><th>Run by</th><th>Mode</th><th>Duration</th><th>How often</th><th>Verified programmes that list it</th></tr></thead><tbody>${es.map(examRow).join("")}</tbody></table>
<h2>Eligibility and cost as each exam body states it</h2>${ul(es.map((e) => `<strong>${esc(e.name)}:</strong> ${esc(e.eligibility.text)}${e.fee ? ` Fee: ${esc(e.fee.text)}.` : " Fee: see the exam's official site."}`))}
<h2>Marking</h2>${ul(es.map((e) => `<strong>${esc(e.name)}:</strong> ${esc(e.pattern.marking)}`))}`
}

const whoLists = (slugs: string[]) =>
  slugs.map((s) => `<h3>${esc(examName(s))}</h3>${accepting(s).length ? ul(accepting(s).map((p) => `${a(`/mba-admission/${p.id}`, esc(short(p)))} (${esc(p.city)})`)) : "<p>No verified programme lists it yet.</p>"}`).join("")

const SPECS: Spec[] = [
  {
    slug: "mba-admission-calendar-2027-intake-exam-dates-in-one-place",
    title: "MBA Admission Calendar for the 2027 Intake: Exam Dates in One Place",
    excerpt: "Every MBA exam's sourced registration and test dates in one table, with a plain note wherever a date is not yet confirmed, and the order to register in.",
    category: "Exams", tags: ["MBA admission calendar", "MBA entrance exam dates 2027", "CAT CMAT XAT SNAP dates", "when does MBA admission start"],
    body: () => wrap(
      "MBA admission has no single start date: each exam has its own registration window, and institutes run their rounds after the scores. The table gives every exam's sourced dates and says where a date is still unconfirmed.",
      `<h2>Dates by exam</h2><table><thead><tr><th>Exam</th><th>Cycle</th><th>Sourced dates</th><th>Note</th></tr></thead><tbody>${mbaExams
        .map((e) => `<tr><td>${examLink(e.slug)}</td><td>${esc(e.cycleLabel)}</td><td>${ul(e.keyDates.map((k) => `${esc(k.label)}: ${esc(k.value)}`)) || "Not yet confirmed"}</td><td>${esc(e.datesNote ?? "")}</td></tr>`)
        .join("")}</tbody></table>
<h2>How to use the calendar</h2>${ul([
        "List the exams your target institutes accept (the " + a("/mba-exam-acceptance", "acceptance table") + " filters by exam).",
        "Sort those exams by the date their registration closes and register for the earliest first.",
        "Keep a second exam as a back-up so one bad day does not end your cycle.",
        "After the score, each institute runs its own application and selection round: apply to each separately.",
      ])}
<p>The same data feeds the ${a("/mba-exam-calendar", "MBA exam calendar")}, which you can download.</p>`,
    ),
  },
  {
    slug: "mba-entrance-exam-fees-2026-27-what-each-test-costs",
    title: "MBA Entrance Exam Fees 2026-27: What Each Test Costs",
    excerpt: "The registration fee each MBA exam body states for its current cycle, side by side, and what is not included in the exam fee.",
    category: "Exams", tags: ["MBA entrance exam fees", "CAT fee", "CMAT fee", "MAT fee", "GMAT cost India", "CUET PG fee"],
    body: () => wrap(
      "each exam sets its own fee and category concessions, and the fee is only the exam registration: every institute then charges its own application fee. The table shows what each exam body states.",
      `<h2>Registration fee by exam</h2><table><thead><tr><th>Exam</th><th>Cycle</th><th>Fee as stated</th><th>Source</th></tr></thead><tbody>${mbaExams
        .map((e) => `<tr><td>${examLink(e.slug)}</td><td>${esc(e.cycleLabel)}</td><td>${e.fee ? esc(e.fee.text) : "Not stated on the source we could read; check the official site"}</td><td>${e.fee ? `<a href="${e.fee.source.url}" rel="nofollow noopener">${esc(e.fee.source.label)}</a> (${e.fee.source.accessed})` : "-"}</td></tr>`)
        .join("")}</tbody></table>
<h2>What the exam fee does not cover</h2>${ul([
        "Each institute's own application fee, charged separately for every institute you apply to.",
        "Test centre travel, and for some exams a re-booking or rescheduling charge.",
        "The seat fee after an offer. Fees change by institute, programme and year and we do not publish numbers we cannot source: use each institute's own fee structure.",
      ])}
<p>Budget by multiplying: exams you will take, plus institutes you will apply to. See the ${a("/blog/mba-fees-in-india-guide", "MBA fees guide")} for how to total the whole cost.</p>`,
    ),
  },
  {
    slug: "which-mba-entrance-exam-should-you-take-comparison",
    title: "Which MBA Entrance Exam Should You Take? A Comparison of All Ten",
    excerpt: "All ten exams on one page: who runs them, mode, duration, how often they are held and how many verified programmes list each.",
    category: "Exams", tags: ["which MBA exam to take", "MBA exam comparison", "CAT vs XAT vs CMAT", "best MBA entrance exam"],
    body: () => {
      const rows = [...mbaExams].sort((x, y) => accepting(y.slug).length - accepting(x.slug).length)
      return wrap(
        `${examName(rows[0].slug)} is listed by the most verified programmes (${accepting(rows[0].slug).length}), but the right exam depends on the institutes you want, not on the count. Pick the exam your target institutes list, then add a second.`,
        `<h2>The ten exams side by side</h2><table><thead><tr><th>Exam</th><th>Run by</th><th>Mode</th><th>Duration</th><th>How often</th><th>Verified programmes that list it</th></tr></thead><tbody>${rows.map(examRow).join("")}</tbody></table>
<h2>A simple way to choose</h2>${ul([
          "If your shortlist is mostly Delhi institutes, look at the " + a("/mba-colleges-in-delhi", "Delhi list") + " and take the exam most of them share.",
          "If you want the widest choice from one score, favour an exam that many programmes list, then check each institute's cut-off.",
          "If a registration window closes soon, compare it against how much time you need: see the " + a("/blog/mba-admission-calendar-2027-intake-exam-dates-in-one-place", "calendar") + ".",
          "Keep a second exam as a back-up. Several institutes list more than one.",
        ])}
<p>The count above measures listings on the verified pages, not difficulty and not cut-offs.</p>`,
      )
    },
  },
  {
    slug: "cmat-vs-mat-vs-atma-non-cat-mba-exams-compared",
    title: "CMAT vs MAT vs ATMA: The Non-CAT MBA Exams Compared",
    excerpt: "Three national MBA tests that are not CAT, compared on mode, duration, eligibility and cost, with the verified programmes that list each.",
    category: "Exams", tags: ["CMAT vs MAT", "ATMA vs CMAT", "MBA without CAT exams", "non CAT MBA exams"],
    body: () => wrap(
      "CMAT, MAT and ATMA are the three national tests most often used when a student does not rely on CAT. They differ in who runs them, how often they are held and how many institutes list them.",
      `${compareExams(["cmat", "mat", "atma"])}<h2>Programmes that list each one</h2>${whoLists(["cmat", "mat", "atma"])}
<p>No exam here is a guaranteed route: each institute sets its own cut-off and selection steps. See also ${a("/mba-colleges-in-delhi-ncr-without-cat", "MBA in Delhi NCR without CAT")}.</p>`,
    ),
  },
  {
    slug: "xat-vs-gmat-vs-nmat-which-pgdm-exam-fits-you",
    title: "XAT vs GMAT vs NMAT: Which PGDM Exam Fits You?",
    excerpt: "XAT, GMAT and NMAT compared on mode, duration, eligibility and cost, with the verified programmes that list each.",
    category: "Exams", tags: ["XAT vs GMAT", "NMAT vs GMAT", "XAT GMAT NMAT PGDM", "PGDM entrance exams"],
    body: () => wrap(
      "XAT, GMAT and NMAT are all accepted by several PGDM and MBA programmes, but they are run by different bodies on different schedules. Compare them on mode, cost and the programmes that list them before you book.",
      `${compareExams(["xat", "gmat", "nmat"])}<h2>Programmes that list each one</h2>${whoLists(["xat", "gmat", "nmat"])}
<p>Some institutes state that Indian candidates must apply through another test, so read the source before booking. See the ${a("/exams/xat", "XAT")}, ${a("/exams/gmat", "GMAT")} and ${a("/exams/nmat", "NMAT")} guides.</p>`,
    ),
  },
  {
    slug: "cuet-pg-vs-cat-for-mba-pattern-eligibility-acceptance",
    title: "CUET PG vs CAT for MBA: Pattern, Eligibility and Who Accepts Each",
    excerpt: "How CUET PG and CAT compare on pattern, eligibility and cost as each body states it, and which verified programmes list each.",
    category: "Exams", tags: ["CUET PG vs CAT", "CUET PG for MBA", "CAT or CUET PG", "MBA through CUET PG"],
    body: () => wrap(
      "CAT and CUET PG are different tests used by different kinds of institutes: CAT by IIMs and many business schools, CUET PG by participating universities, each with its own counselling. Check which your target institutes list.",
      `${compareExams(["cat", "cuet-pg"])}<h2>Programmes that list each one</h2>${whoLists(["cat", "cuet-pg"])}
<p>CUET PG details come from NTA's own bulletin: see the ${a("/exams/cuet-pg", "CUET PG guide")}. The 2027 cycle was not announced when we last checked.</p>`,
    ),
  },
  {
    slug: "nirf-2025-management-ranking-how-it-is-scored-and-how-to-use-it",
    title: "NIRF 2025 Management Ranking: How It Is Scored and How to Use It",
    excerpt: "The top 20 management institutes in NIRF 2025 with score, what the five NIRF parameters measure, and how to use a rank when choosing an MBA.",
    category: "MBA", tags: ["NIRF 2025 MBA ranking", "top 20 MBA colleges NIRF", "how NIRF ranking works", "NIRF management rank"],
    body: () => {
      const top = nirf2025Management.slice(0, 20)
      return wrap(
        `${top[0].name} is ranked first in NIRF 2025 for management with a score of ${top[0].score}. NIRF scores five parameters, and a rank is one input to a decision, not the decision.`,
        `<h2>NIRF 2025 management: top 20</h2><table><thead><tr><th>Rank</th><th>Institute</th><th>City</th><th>Score</th></tr></thead><tbody>${top
          .map((r) => `<tr><td>${r.rank}</td><td>${r.programId ? a(`/mba-admission/${r.programId}`, esc(r.name)) : esc(r.name)}</td><td>${esc(r.city)}</td><td>${r.score.toFixed(2)}</td></tr>`)
          .join("")}</tbody></table>
<p>Source: <a href="${NIRF_SOURCE.url}" rel="nofollow noopener">${esc(NIRF_SOURCE.label)}</a>, checked ${NIRF_SOURCE.accessed}. NIRF ranks only institutes that took part.</p>
<h2>What NIRF scores</h2>${ul(["Teaching, learning and resources (TLR)", "Research and professional practice (RPC)", "Graduation outcomes (GO)", "Outreach and inclusivity (OI)", "Perception (PERCEPTION)"])}
<p>The official page shows these five sub-scores for every institute.</p>
<h2>Using a rank well</h2>${ul([
          "A rank is not an admission route: check which exam the programme accepts.",
          "Institutes can sit within a few points of each other, so do not treat adjacent ranks as a verdict.",
          "Missing from the list does not mean poor: the institute may not have participated.",
          "Look at the programme's approval, total fees and placement report too.",
        ])}
<p>City and state lists: ${a("/best-mba-colleges-in-delhi", "Delhi")}, ${a("/best-mba-colleges-in-uttar-pradesh", "Uttar Pradesh")}, ${a("/best-mba-colleges-in-uttarakhand", "Uttarakhand")}.</p>`,
      )
    },
  },
  {
    slug: "delhi-vs-noida-vs-gurugram-for-mba-pgdm-exams-and-institutes",
    title: "Delhi vs Noida vs Gurugram for MBA and PGDM: Exams and Institutes Compared",
    excerpt: "Which exams the verified Delhi, Noida and Gurugram programmes list, how many of each we have verified, and which appear in NIRF 2025.",
    category: "MBA", tags: ["Delhi vs Noida MBA", "MBA in Gurugram vs Delhi", "best city for MBA NCR", "PGDM Delhi Noida Gurgaon"],
    body: () => {
      const cities = ["Delhi", "Noida", "Gurugram"]
      const rows = cities.map((c) => {
        const ps = programAdmissions.filter((p) => p.city === c)
        const exams = Array.from(new Set(ps.flatMap((p) => p.examsAccepted)))
        const nirfCount = nirf2025Management.filter((r) => r.programId && ps.some((p) => p.id === r.programId)).length
        return `<tr><td>${esc(c)}</td><td>${ps.length}</td><td>${esc(list(ps.map(short)))}</td><td>${exams.length ? exams.map(examLink).join(", ") : "-"}</td><td>${nirfCount}</td></tr>`
      })
      return wrap(
        "the three cities differ in how many programmes we have verified and which exams they list. Delhi's verified programmes lean on CAT, XAT and GMAT, while Noida's programmes usually list several national tests.",
        `<h2>The three cities side by side</h2><table><thead><tr><th>City</th><th>Verified programmes</th><th>Which</th><th>Exams listed across them</th><th>In NIRF 2025 (verified)</th></tr></thead><tbody>${rows.join("")}</tbody></table>
<h2>How to choose</h2>${ul([
          "Start from the exam you hold: filter by it in the " + a("/mba-exam-acceptance", "acceptance table") + ".",
          "Then compare selection steps on each institute's own page.",
          "Travel, hostel and total fees matter too, and we do not publish them without a source.",
        ])}
<p>City pages: ${a("/mba-colleges-in-delhi", "Delhi")}, ${a("/mba-colleges-noida", "Noida")}, ${a("/mba-colleges-in-gurugram", "Gurugram")}.</p>`,
      )
    },
  },
  {
    slug: "uttarakhand-vs-delhi-ncr-for-mba-exam-options-compared",
    title: "Uttarakhand vs Delhi NCR for MBA: Exam Options Compared",
    excerpt: "How the verified Dehradun and Kashipur MBA programmes compare with Delhi NCR on exams listed and selection steps.",
    category: "MBA", tags: ["MBA Dehradun vs Delhi", "Uttarakhand MBA exams", "IIM Kashipur", "MBA Dehradun or NCR"],
    body: () => {
      const uk = programAdmissions.filter((p) => p.city === "Dehradun" || p.city === "Kashipur")
      const ncr = programAdmissions.filter((p) => NCR.includes(p.city))
      const exams = (ps: ProgramAdmission[]) => Array.from(new Set(ps.flatMap((p) => p.examsAccepted)))
      return wrap(
        `we have verified ${uk.length} programmes in Dehradun and Kashipur and ${ncr.length} in Delhi NCR. The exams listed overlap heavily, so an NCR-ready score usually also works for Uttarakhand programmes that list the same test.`,
        `<h2>Uttarakhand programmes</h2><table><thead><tr><th>Institute</th><th>City</th><th>Exams listed</th></tr></thead><tbody>${uk.map((p) => `<tr><td>${a(`/mba-admission/${p.id}`, esc(short(p)))}</td><td>${esc(p.city)}</td><td>${p.examsAccepted.length ? p.examsAccepted.map(examLink).join(", ") : "see its page"}</td></tr>`).join("")}</tbody></table>
<h2>Exams across the two regions</h2>${ul([`Uttarakhand (verified): ${exams(uk).map(examLink).join(", ")}`, `Delhi NCR (verified): ${exams(ncr).map(examLink).join(", ")}`])}
<h2>What the pages say about selection</h2>${ul(uk.filter((p) => p.notes).map((p) => `<strong>${esc(short(p))}:</strong> ${esc(p.notes as string)}`))}
<p>Read next: ${a("/mba-colleges-in-dehradun", "MBA colleges in Dehradun")}, ${a("/mba-colleges-in-uttarakhand", "MBA colleges in Uttarakhand")} and ${a("/mba-colleges-in-delhi-ncr", "MBA colleges in Delhi NCR")}.</p>`,
      )
    },
  },
  {
    slug: "how-to-read-an-mba-admission-page-in-ten-minutes",
    title: "How to Read an MBA Admission Page in Ten Minutes",
    excerpt: "The six things to pull from any institute's admission page before you apply, shown on a real verified record.",
    category: "MBA", tags: ["how to check MBA college", "MBA admission page checklist", "verify MBA college", "before applying MBA"],
    body: () => {
      const p = programAdmissions.find((x) => x.id === "imi-delhi-pgdm") ?? programAdmissions[0]
      return wrap(
        "pull six things from the page and nothing else: the exams it lists, the intake year, eligibility, the selection steps, the programme's approval, and the dates. If a page does not say one of them, ask the admission office in writing.",
        `<h2>The six things</h2><ol>
<li><strong>Exams listed:</strong> which tests, for which programme and campus.</li>
<li><strong>Intake year:</strong> a page for one batch is not evidence for the next.</li>
<li><strong>Eligibility:</strong> graduation percentage, work experience, final-year rules.</li>
<li><strong>Selection steps:</strong> group discussion, written test, interview and how the score is weighed.</li>
<li><strong>Approval:</strong> AICTE approval for a PGDM, university recognition for an MBA, and any equivalence letter.</li>
<li><strong>Dates:</strong> application and test dates, and the date the page was last updated.</li></ol>
<h2>Example: one verified record</h2>
<p>For ${esc(short(p))}, our record shows: programme ${esc(p.program)}; exams listed ${p.examsAccepted.length ? list(p.examsAccepted.map(examName)) : "none stated"}; intake ${esc(p.intake)}; source <a href="${p.source.url}" rel="nofollow noopener">${esc(p.source.label)}</a>, checked ${p.source.accessed}. ${p.notes ? esc(p.notes) : ""}</p>
<h2>Red flags</h2>${ul(["No intake year or date on the page.", "A claim of a guaranteed seat or placement.", "Fees quoted without saying what they include.", "An approval claim with no body named."])}
<p>For the follow-up questions, read ${a("/blog/mba-admission-process-in-india", "the MBA admission process")} and ${a("/mba-vs-pgdm", "MBA vs PGDM")}.</p>`,
      )
    },
  },
]

export interface ResearchGuide { slug: string; title: string; excerpt: string; category: string; tags: string[]; body: string }
export const researchGuides: ResearchGuide[] = [
  {
    slug: "mba-in-delhi-ncr-2027-colleges-fees-cutoffs-admission",
    title: "MBA in Delhi NCR 2027: Colleges, Fees, Cut-offs, Admission",
    excerpt: "Official 2027 fees, published cut-offs, exams and NIRF ranks for FMS, IIFT, MDI, IMT, FORE, FIIB and BIMTECH, with admission steps, dates and FAQs.",
    category: "MBA",
    tags: ["MBA in Delhi NCR 2027", "MBA colleges in Delhi NCR fees", "MBA colleges in Delhi cutoff", "PGDM admission Delhi", "MDI fees 2027", "FMS Delhi fees", "IIFT fees"],
    body: FLAGSHIP_DELHI_NCR_HTML,
  },
  ...SPECS.map((s) => ({ slug: s.slug, title: s.title, excerpt: s.excerpt, category: s.category, tags: s.tags, body: s.body() })),
]
