import type { BlogPost } from "@/types"
import { mbaExams } from "@/data/mba/exams"
import { programAdmissions } from "@/data/mba/programAdmissions"
import type { ProgramAdmission } from "@/data/mba/types"

// Exam-acceptance guides, generated from the verified programme records in
// src/data/mba/programAdmissions.ts. Nothing here is typed by hand about a college:
// every institute, exam list, intake and source link is read from that file, so a
// guide can never say more than the data does. Re-verify each admission cycle.

const DATE = "2026-10-15"
const AUTHOR = "CampusLelo Editorial Team"

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const a = (href: string, text: string) => `<a href="${href}">${text}</a>`
const ul = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`
const examName = (slug: string) => mbaExams.find((e) => e.slug === slug)?.name ?? slug.replace(/-/g, " ").toUpperCase()
// Only exams with a guide page get a link; others (for example CUET PG) are plain text
const examLinks = (slugs: string[]) =>
  slugs.map((s) => (mbaExams.some((e) => e.slug === s) ? a(`/exams/${s}`, esc(examName(s))) : esc(examName(s)))).join(", ")

const sorted = (list: ProgramAdmission[]) =>
  [...list].sort((x, y) => x.city.localeCompare(y.city) || x.institution.localeCompare(y.institution))

const table = (rows: ProgramAdmission[]) =>
  `<table><thead><tr><th>Institute</th><th>Programme</th><th>City</th><th>Exams it lists</th><th>Intake the source refers to</th><th>Source</th></tr></thead><tbody>${rows
    .map(
      (p) =>
        `<tr><td>${esc(p.institution)}</td><td>${esc(p.program)}</td><td>${esc(p.city)}</td><td>${examLinks(p.examsAccepted)}</td><td>${esc(p.intake)}</td><td><a href="${p.source.url}" rel="noopener nofollow">${esc(p.source.label)}</a> (${esc(p.source.type)}, checked ${esc(p.source.accessed)})</td></tr>`,
    )
    .join("")}</tbody></table>`

const details = (rows: ProgramAdmission[]) =>
  ul(rows.filter((p) => p.notes).map((p) => `<strong>${esc(p.institution)}:</strong> ${esc(p.notes as string)}`))

const SOURCES = `
<h2>How we verify this list</h2>
<p>Each row comes from the institute's own admission page or brochure for the intake shown, read on the date in the last column of the table. Acceptance is recorded per programme and campus, never copied from a college-level list. Read our ${a("/editorial-policy", "editorial policy")}. If an institute is missing here, it means we have not yet read its official page, not that it does not accept the exam.</p>
<p><strong>Always confirm on the institute's site before you apply.</strong> Exam lists, deadlines and cut-offs change every cycle. ${a("/mba-exam-acceptance", "Filter the full acceptance table")} by the exams you took, or ${a("/mba-cutoff-checker", "check your percentile against published cut-offs")}.</p>
<p><small>Last reviewed ${DATE}.</small></p>`

const RELATED = (links: [string, string][]) => `
<h2>Related guides</h2>
${ul(links.map(([h, t]) => a(h, t)))}
<p>Not sure where to start? ${a("/ai-finder", "Use the AI college finder")}, ${a("/my-admission-plan", "build your admission plan")} or ${a("/counselling", "talk to a free counsellor")}.</p>`

const COMMON: [string, string][] = [
  ["/mba-exam-acceptance", "MBA exam acceptance table"],
  ["/blog/mba-entrance-exams-in-india", "MBA entrance exams in India"],
  ["/blog/mba-without-cat-india", "MBA without CAT in India"],
  ["/mba-colleges-in-delhi-ncr", "MBA colleges in Delhi NCR"],
  ["/mba-colleges-in-dehradun", "MBA colleges in Dehradun"],
]

type Spec = {
  id: number
  slug: string
  title: string
  excerpt: string
  tags: string[]
  category: string
  pick: (p: ProgramAdmission) => boolean
  /** Opening line; the count is read from the data */
  lead: (n: number) => string
  /** Plain explanation of what the reader should do with this list */
  how: string
}

const NCR = ["Delhi", "Gurugram", "Ghaziabad", "Noida", "Greater Noida"]

const SPECS: Spec[] = [
  {
    id: 44, slug: "mba-colleges-accepting-atma",
    title: "MBA and PGDM Colleges Accepting ATMA: Verified List",
    excerpt: "Which MBA and PGDM programmes list ATMA on their own admission pages, with the intake each source refers to and a link to the official page.",
    tags: ["MBA colleges accepting ATMA", "ATMA accepted colleges", "ATMA PGDM", "MBA entrance exam ATMA"], category: "Exams",
    pick: (p) => p.examsAccepted.includes("atma"),
    lead: (n) => `<strong>Quick answer:</strong> ${n === 1 ? "one programme" : `${n} programmes`} on our verified list state that they accept ATMA. This is a short list because we only include an institute after reading its own admission page.`,
    how: "ATMA is accepted by far fewer programmes than CAT or CMAT, so do not rely on it as your only score. Check whether your target institute lists it for the intake you are applying to, and keep a second exam (CMAT or MAT) as a back-up. See the " + a("/exams/atma", "ATMA exam guide") + " for pattern and dates.",
  },
  {
    id: 45, slug: "pgdm-mba-colleges-greater-noida-exams-accepted",
    title: "PGDM and MBA in Greater Noida: Exams Each College Accepts",
    excerpt: "The Greater Noida MBA and PGDM programmes we have verified, which entrance exams each one lists on its own page, and how to confirm before you apply.",
    tags: ["PGDM Greater Noida", "MBA colleges Greater Noida", "Greater Noida MBA entrance exams", "GL Bajaj PGDM", "BIMTECH"], category: "MBA",
    pick: (p) => p.city === "Greater Noida",
    lead: (n) => `<strong>Quick answer:</strong> we have verified ${n} MBA or PGDM ${n === 1 ? "programme" : "programmes"} in Greater Noida against the institute's own admission page. The table shows the exams each one lists.`,
    how: "Compare the exam column with the scores you hold. Where two institutes list the same exam, compare their selection steps (group discussion, interview, weightage) in the notes below, not only the exam name.",
  },
  {
    id: 46, slug: "mba-colleges-dehradun-uttarakhand-exams-accepted",
    title: "MBA Colleges in Dehradun and Kashipur: Exams Accepted",
    excerpt: "Verified MBA programmes in Dehradun and Kashipur, the entrance exams each lists on its own page, and what to check before you apply.",
    tags: ["MBA colleges Dehradun", "MBA Uttarakhand", "IIM Kashipur", "UPES MBA", "Graphic Era MBA", "DIT University MBA"], category: "MBA",
    pick: (p) => p.city === "Dehradun" || p.city === "Kashipur",
    lead: (n) => `<strong>Quick answer:</strong> we have verified ${n} MBA ${n === 1 ? "programme" : "programmes"} in Dehradun and Kashipur against the institute's own page. The table shows which exams each lists.`,
    how: "IIM Kashipur and the Dehradun private universities work differently: an IIM sets its own shortlisting and process, while the universities generally take a valid score plus a group discussion or interview. Read the notes under the table and the " + a("/mba-colleges-in-dehradun", "Dehradun MBA guide") + " and " + a("/mba-cutoff-uttarakhand", "Uttarakhand cut-offs") + " for more.",
  },
  {
    id: 47, slug: "mba-colleges-noida-exams-accepted",
    title: "MBA Colleges in Noida: Which Exams Each One Accepts",
    excerpt: "Verified MBA and PGDM programmes in Noida and the entrance exams each lists on its own admission page, with sources and check dates.",
    tags: ["MBA colleges Noida", "Noida MBA entrance exams", "Amity Noida MBA", "Jaipuria Noida PGDM", "JBS Noida"], category: "MBA",
    pick: (p) => p.city === "Noida",
    lead: (n) => `<strong>Quick answer:</strong> we have verified ${n} MBA or PGDM ${n === 1 ? "programme" : "programmes"} in Noida against the institute's own page. Exams are listed per programme.`,
    how: "Noida institutes often accept several exams, but weightage and cut-offs differ. Use the table to shortlist by the exams you hold, then open each source link for the selection process.",
  },
  {
    id: 48, slug: "mba-colleges-delhi-ncr-accepting-cmat",
    title: "MBA Colleges in Delhi NCR Accepting CMAT: Verified List",
    excerpt: "Delhi NCR MBA and PGDM programmes that list CMAT on their own admission pages, across Delhi, Gurugram, Ghaziabad, Noida and Greater Noida.",
    tags: ["MBA colleges accepting CMAT Delhi NCR", "CMAT accepted colleges", "CMAT Noida", "CMAT PGDM"], category: "Exams",
    pick: (p) => NCR.includes(p.city) && p.examsAccepted.includes("cmat"),
    lead: (n) => `<strong>Quick answer:</strong> ${n} Delhi NCR ${n === 1 ? "programme" : "programmes"} on our verified list state that they accept CMAT.`,
    how: "CMAT is a national test from the National Testing Agency; see the " + a("/exams/cmat", "CMAT guide") + " for dates and the " + a("/exams/cmat/score-vs-percentile", "score and percentile page") + ". Some institutes ask for a second test or have their own selection rounds, so read the notes.",
  },
  {
    id: 49, slug: "mba-colleges-delhi-ncr-accepting-xat",
    title: "MBA Colleges in Delhi NCR Accepting XAT: Verified List",
    excerpt: "Delhi NCR MBA and PGDM programmes that list XAT on their own admission pages, with the intake each source refers to.",
    tags: ["MBA colleges accepting XAT Delhi NCR", "XAT accepted colleges", "XAT PGDM", "XAT Noida"], category: "Exams",
    pick: (p) => NCR.includes(p.city) && p.examsAccepted.includes("xat"),
    lead: (n) => `<strong>Quick answer:</strong> ${n} Delhi NCR ${n === 1 ? "programme" : "programmes"} on our verified list state that they accept XAT.`,
    how: "XAT is run by XLRI and has a registration window that closes before many institutes finish their own rounds, so check dates early in the " + a("/exams/xat", "XAT guide") + ".",
  },
  {
    id: 50, slug: "mba-colleges-accepting-gmat-india",
    title: "MBA Colleges in India That List GMAT: Verified List",
    excerpt: "Which MBA and PGDM programmes list GMAT on their own admission pages, and a note on programmes that do not take it for Indian applicants.",
    tags: ["MBA colleges accepting GMAT India", "GMAT accepted colleges", "GMAT for MBA in India"], category: "Exams",
    pick: (p) => p.examsAccepted.includes("gmat"),
    lead: (n) => `<strong>Quick answer:</strong> ${n} ${n === 1 ? "programme" : "programmes"} on our verified list state that they accept GMAT.`,
    how: "GMAT acceptance varies by programme. Some institutes state that Indian candidates must apply through another test, so read each source before booking the exam. See the " + a("/exams/gmat", "GMAT guide") + ".",
  },
  {
    id: 51, slug: "mba-colleges-accepting-nmat",
    title: "MBA Colleges Accepting NMAT by GMAC: Verified List",
    excerpt: "MBA and PGDM programmes that list NMAT on their own admission pages, with the intake each source refers to and the official link.",
    tags: ["MBA colleges accepting NMAT", "NMAT accepted colleges", "NMAT by GMAC colleges"], category: "Exams",
    pick: (p) => p.examsAccepted.includes("nmat"),
    lead: (n) => `<strong>Quick answer:</strong> ${n} ${n === 1 ? "programme" : "programmes"} on our verified list state that they accept NMAT by GMAC.`,
    how: "NMAT has a testing window and you can usually book a slot, so plan your attempts using the " + a("/exams/nmat", "NMAT guide") + ", and keep the application deadlines of your target institutes in mind.",
  },
]

const build = (s: Spec): BlogPost | null => {
  const rows = sorted(programAdmissions.filter(s.pick))
  if (rows.length === 0) return null
  const body = `
<p>${s.lead(rows.length)}</p>
<h2>Verified programmes</h2>
${table(rows)}
<h2>What each source says</h2>
${details(rows)}
<h2>How to use this list</h2>
<p>${s.how}</p>
<h2>What this list does not tell you</h2>
<p>It does not give cut-offs, fees or placement figures, because we publish those only when a college or exam body has published them. It also does not rank the institutes. Use ${a("/mba-cutoff-checker", "the cut-off checker")} for published minimums and the official links above for fees.</p>
${RELATED(COMMON)}
${SOURCES}`
  return {
    id: s.id, slug: s.slug, title: s.title, excerpt: s.excerpt, body, author: AUTHOR,
    date: DATE, publishedAt: DATE, readTime: "5 min", category: s.category, tags: s.tags,
  }
}

export const mbaAcceptanceGuides: BlogPost[] = SPECS.map(build).filter((x): x is BlogPost => x !== null)
