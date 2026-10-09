import type { ProgramAdmission } from "./types"

// Definitions for the Delhi / Delhi NCR / Greater Noida MBA & PGDM landing pages.
// Content is generated from the verified records in programAdmissions.ts and the
// published cut-offs in cutoffs.ts (see components/mba/RegionMbaPage.tsx).

export type City = ProgramAdmission["city"]
export type Scope = "all" | "pgdm" | "noCat"

export interface RegionPageDef {
  path: string
  /** ≤ 60 characters */
  title: string
  /** ≤ 160 characters */
  description: string
  h1: string
  /** plain-language place name used inside generated sentences */
  place: string
  cities: City[]
  exam?: string
  scope: Scope
  /** the question in the answer block */
  question: string
  keywords: string[]
  /** city shown pre-selected in the lead form */
  leadCity: "Delhi NCR" | "Greater Noida"
  /** sibling pages shown in "More MBA pages" */
  related: string[]
}

const NCR: City[] = ["Delhi", "Gurugram", "Ghaziabad", "Noida", "Greater Noida"]

export const regionPages: RegionPageDef[] = [
  {
    path: "/mba-colleges-in-delhi",
    title: "MBA Colleges in Delhi 2027: Exams, Cut-offs, Verified",
    description: "MBA and PGDM programmes in Delhi — FMS, IIFT and IMI — with the entrance exams each accepts, published cut-offs and how to apply. Checked against official pages.",
    h1: "MBA Colleges in Delhi 2027",
    place: "Delhi",
    cities: ["Delhi"],
    scope: "all",
    question: "Which are the MBA and PGDM colleges in Delhi, and which exams do they accept?",
    keywords: ["mba colleges in delhi", "best mba colleges in delhi", "pgdm colleges in delhi", "mba in delhi", "fms delhi mba", "iift mba", "imi delhi pgdm"],
    leadCity: "Delhi NCR",
    related: ["/mba-colleges-in-delhi-ncr", "/mba-colleges-in-delhi-accepting-cat", "/mba-cutoff-delhi-ncr", "/mba-colleges-in-delhi-ncr-without-cat", "/mba-vs-pgdm"],
  },
  {
    path: "/mba-colleges-in-delhi-ncr",
    title: "MBA Colleges in Delhi NCR 2027: Verified Exams & Cut-offs",
    description: "MBA and PGDM in Delhi, Gurugram, Ghaziabad, Noida and Greater Noida: accepted exams, published cut-offs and dates for FMS, IIFT, IMI, MDI, IMT, BIMTECH and Jaipuria.",
    h1: "MBA Colleges in Delhi NCR 2027",
    place: "Delhi NCR",
    cities: NCR,
    scope: "all",
    question: "Which MBA and PGDM colleges in Delhi NCR have we verified, and which exams do they accept?",
    keywords: ["mba colleges in delhi ncr", "best mba colleges in delhi ncr", "pgdm colleges in delhi ncr", "mba colleges in gurgaon", "mba colleges in ghaziabad", "mba in ncr"],
    leadCity: "Delhi NCR",
    related: ["/mba-colleges-in-delhi", "/pgdm-colleges-in-delhi-ncr", "/mba-colleges-in-greater-noida", "/mba-colleges-noida", "/mba-colleges-in-delhi-ncr-without-cat", "/mba-cutoff-delhi-ncr"],
  },
  {
    path: "/pgdm-colleges-in-delhi-ncr",
    title: "PGDM Colleges in Delhi NCR 2027: Exams Accepted",
    description: "PGDM programmes in Delhi NCR — IMI, MDI, IMT, BIMTECH and Jaipuria — with the exams each accepts and what a PGDM means compared with an MBA.",
    h1: "PGDM Colleges in Delhi NCR 2027",
    place: "Delhi NCR",
    cities: NCR,
    scope: "pgdm",
    question: "Which PGDM colleges in Delhi NCR have we verified, and which exams do they accept?",
    keywords: ["pgdm colleges in delhi ncr", "pgdm colleges in delhi", "pgdm colleges in gurgaon", "pgdm vs mba delhi", "pgdm in ncr"],
    leadCity: "Delhi NCR",
    related: ["/mba-colleges-in-delhi-ncr", "/mba-vs-pgdm", "/pgdm-colleges-noida", "/mba-colleges-in-delhi-ncr-without-cat", "/blog/mba-colleges-delhi-ncr-noida-guide"],
  },
  {
    path: "/mba-colleges-in-greater-noida",
    title: "MBA Colleges in Greater Noida: Exams Accepted (Verified)",
    description: "MBA and PGDM in Greater Noida: BIMTECH's programmes, the exams each accepts, how admission works and where to find other colleges in Noida and Greater Noida.",
    h1: "MBA Colleges in Greater Noida 2027",
    place: "Greater Noida",
    cities: ["Greater Noida"],
    scope: "all",
    question: "Which MBA and PGDM colleges in Greater Noida have we verified, and which exams do they accept?",
    keywords: ["mba colleges in greater noida", "best mba colleges in greater noida", "pgdm colleges in greater noida", "bimtech greater noida", "mba in greater noida"],
    leadCity: "Greater Noida",
    related: ["/mba-colleges-noida", "/colleges-in-greater-noida", "/pgdm-colleges-noida", "/mba-colleges-in-delhi-ncr", "/mba-colleges-in-delhi-ncr-without-cat"],
  },
  {
    path: "/mba-colleges-in-delhi-accepting-cat",
    title: "MBA Colleges in Delhi Accepting CAT (Verified)",
    description: "MBA and PGDM programmes in Delhi that use CAT scores — FMS, IIFT and IMI — with the intake each source refers to and how shortlisting works.",
    h1: "MBA Colleges in Delhi Accepting CAT",
    place: "Delhi",
    cities: ["Delhi"],
    exam: "cat",
    scope: "all",
    question: "Which MBA colleges in Delhi accept a CAT score?",
    keywords: ["mba colleges in delhi accepting cat score", "cat colleges in delhi", "mba in delhi through cat", "delhi mba cat cutoff"],
    leadCity: "Delhi NCR",
    related: ["/mba-colleges-in-delhi", "/mba-colleges-in-delhi-ncr-accepting-cat", "/exams/cat", "/exams/cat/score-vs-percentile", "/mba-cutoff-delhi-ncr"],
  },
  ...(["cat", "xat", "gmat", "cmat"] as const).map((exam): RegionPageDef => ({
    path: `/mba-colleges-in-delhi-ncr-accepting-${exam}`,
    title: `MBA Colleges in Delhi NCR Accepting ${exam.toUpperCase()} (Verified)`,
    description: `MBA and PGDM programmes in Delhi NCR that accept ${exam.toUpperCase()} scores, checked against each institute's admission page, with the exam dates and how to apply.`,
    h1: `MBA Colleges in Delhi NCR Accepting ${exam.toUpperCase()}`,
    place: "Delhi NCR",
    cities: NCR,
    exam,
    scope: "all",
    question: `Which MBA and PGDM colleges in Delhi NCR accept ${exam.toUpperCase()}?`,
    keywords: [`mba colleges in delhi ncr accepting ${exam} score`, `${exam} colleges in delhi ncr`, `${exam} colleges in noida`, `${exam} colleges in gurgaon`],
    leadCity: "Delhi NCR",
    related: ["/mba-colleges-in-delhi-ncr", `/exams/${exam}`, `/exams/${exam}/score-vs-percentile`, "/mba-colleges-in-delhi-ncr-without-cat", "/mba-cutoff-delhi-ncr"],
  })),
  {
    path: "/mba-colleges-in-delhi-ncr-without-cat",
    title: "MBA in Delhi NCR Without CAT: Verified Exam Options",
    description: "Delhi NCR MBA and PGDM programmes that accept XAT, GMAT, CMAT or MAT as well as CAT, and those that need CAT. Checked against official admission pages.",
    h1: "MBA in Delhi NCR Without CAT",
    place: "Delhi NCR",
    cities: NCR,
    scope: "noCat",
    question: "Can you do an MBA in Delhi NCR without CAT?",
    keywords: ["mba colleges in delhi ncr without cat", "mba without cat in delhi", "mba without cat in noida", "mba colleges in noida without cat", "mba colleges in greater noida without entrance exam", "pgdm without cat delhi"],
    leadCity: "Delhi NCR",
    related: ["/mba-colleges-in-delhi-ncr", "/blog/mba-without-cat-india", "/exams/xat", "/exams/cmat", "/exams/gmat"],
  },
]

export function getRegionPage(path: string): RegionPageDef | undefined {
  return regionPages.find((p) => p.path === path)
}
