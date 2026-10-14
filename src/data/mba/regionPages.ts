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
  leadCity: "Delhi NCR" | "Greater Noida" | "Dehradun" | "Lucknow"
  /** page that explains cut-offs for this region (default: Delhi NCR) */
  cutoffPage?: string
  /** sibling pages shown in "More MBA pages" */
  related: string[]
  /** extra questions for this page, appended to the generated FAQs (answers must be sourced) */
  extraFaqs?: { question: string; answer: string }[]
}

const NCR: City[] = ["Delhi", "Gurugram", "Ghaziabad", "Noida", "Greater Noida"]

export const regionPages: RegionPageDef[] = [
  {
    path: "/mba-colleges-in-delhi",
    title: "MBA Colleges in Delhi 2027: Exams, Cut-offs, Verified",
    description: "MBA and PGDM in Delhi: FMS, IIFT, IIT Delhi DMS, IMI, FORE, LBSIM and FIIB, with the exams each accepts and how to apply. Checked against official pages.",
    h1: "MBA Colleges in Delhi 2027",
    place: "Delhi",
    cities: ["Delhi"],
    scope: "all",
    question: "Which are the MBA and PGDM colleges in Delhi, and which exams do they accept?",
    keywords: ["mba colleges in delhi", "best mba colleges in delhi", "pgdm colleges in delhi", "mba in delhi", "fms delhi mba", "iift mba", "imi delhi pgdm", "fore school of management", "lbsim delhi pgdm", "iit delhi mba admission", "fiib delhi pgdm"],
    leadCity: "Delhi NCR",
    related: ["/mba-colleges-in-delhi-ncr", "/mba-colleges-in-delhi-accepting-cat", "/mba-cutoff-delhi-ncr", "/mba-colleges-in-delhi-ncr-without-cat", "/mba-vs-pgdm"],
  },
  {
    path: "/mba-colleges-in-delhi-ncr",
    title: "MBA Colleges in Delhi NCR 2027: Verified Exams & Cut-offs",
    description: "MBA and PGDM in Delhi, Gurugram, Ghaziabad, Noida and Greater Noida: accepted exams and dates for FMS, IIFT, IIT Delhi, IMI, FORE, LBSIM, MDI, IMT, BML Munjal, BIMTECH and more.",
    h1: "MBA Colleges in Delhi NCR 2027",
    place: "Delhi NCR",
    cities: NCR,
    scope: "all",
    question: "Which MBA and PGDM colleges in Delhi NCR have we verified, and which exams do they accept?",
    keywords: ["mba colleges in delhi ncr", "best mba colleges in delhi ncr", "pgdm colleges in delhi ncr", "mba colleges in gurgaon", "mba colleges in ghaziabad", "mba in ncr", "bml munjal university mba", "mdi gurgaon pgdm"],
    leadCity: "Delhi NCR",
    related: ["/mba-colleges-in-delhi", "/mba-colleges-in-gurugram", "/mba-colleges-in-ghaziabad", "/pgdm-colleges-in-delhi-ncr", "/mba-colleges-in-greater-noida", "/mba-colleges-noida", "/mba-colleges-in-delhi-ncr-without-cat", "/mba-cutoff-delhi-ncr"],
  },
  {
    path: "/pgdm-colleges-in-delhi-ncr",
    title: "PGDM Colleges in Delhi NCR 2027: Exams Accepted",
    description: "PGDM in Delhi NCR: IMI, FORE, LBSIM, FIIB, MDI, IMT, BIMTECH and Jaipuria, with the exams each accepts and how PGDM differs from an MBA.",
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
    cutoffPage: "/mba-cutoff-uttar-pradesh",
    related: ["/mba-colleges-noida", "/colleges-in-greater-noida", "/pgdm-colleges-noida", "/mba-colleges-in-delhi-ncr", "/mba-colleges-in-delhi-ncr-without-cat"],
  },
  {
    path: "/mba-colleges-noida",
    title: "MBA Colleges in Noida 2027: Exams Accepted (Verified)",
    description: "MBA and PGDM in Noida: Jaipuria and Jaypee Business School, the exams each accepts, how selection works, and where to find Greater Noida and Delhi NCR options.",
    h1: "MBA Colleges in Noida 2027",
    place: "Noida",
    cities: ["Noida"],
    scope: "all",
    question: "Which MBA and PGDM colleges in Noida have we verified, and which exams do they accept?",
    keywords: ["mba colleges in noida", "best mba colleges in noida", "mba in noida", "top mba colleges in noida", "pgdm colleges in noida", "jaipuria noida", "jaypee business school noida"],
    leadCity: "Delhi NCR",
    cutoffPage: "/mba-cutoff-uttar-pradesh",
    related: ["/mba-colleges-in-greater-noida", "/pgdm-colleges-noida", "/mba-colleges-in-uttar-pradesh", "/mba-colleges-in-delhi-ncr", "/mba-cutoff-uttar-pradesh", "/mba-colleges-in-delhi-ncr-without-cat"],
  },
  {
    path: "/pgdm-colleges-noida",
    title: "PGDM Colleges in Noida & Greater Noida: Exams Accepted",
    description: "PGDM programmes in Noida and Greater Noida: BIMTECH and Jaipuria, the exams each accepts, and what a PGDM means compared with an MBA. Checked against official pages.",
    h1: "PGDM Colleges in Noida and Greater Noida 2027",
    place: "Noida and Greater Noida",
    cities: ["Noida", "Greater Noida"],
    scope: "pgdm",
    question: "Which PGDM colleges in Noida and Greater Noida have we verified, and which exams do they accept?",
    keywords: ["pgdm colleges in noida", "pgdm colleges in greater noida", "best pgdm colleges in noida", "pgdm in noida", "bimtech pgdm", "jaipuria noida pgdm"],
    leadCity: "Delhi NCR",
    cutoffPage: "/mba-cutoff-uttar-pradesh",
    related: ["/mba-colleges-noida", "/mba-colleges-in-greater-noida", "/mba-vs-pgdm", "/pgdm-colleges-in-delhi-ncr", "/mba-cutoff-uttar-pradesh"],
  },
  {
    path: "/mba-colleges-in-dehradun",
    title: "MBA Colleges in Dehradun: Exams Accepted (Verified)",
    description: "MBA programmes in Dehradun, Graphic Era and UPES, with the entrance exams each accepts, how selection works and where IIM Kashipur fits in Uttarakhand.",
    h1: "MBA Colleges in Dehradun 2027",
    place: "Dehradun",
    cities: ["Dehradun"],
    scope: "all",
    question: "Which MBA colleges in Dehradun have we verified, and which exams do they accept?",
    keywords: ["mba colleges in dehradun", "best mba colleges in dehradun", "mba in dehradun", "graphic era mba", "upes mba", "mba admission dehradun"],
    leadCity: "Dehradun",
    cutoffPage: "/mba-cutoff-uttarakhand",
    related: ["/mba-colleges-in-uttarakhand", "/mba-cutoff-uttarakhand", "/mba-colleges-in-delhi-ncr", "/mba-counselling", "/mba-vs-pgdm"],
    extraFaqs: [
      {
        question: "Is CAT mandatory for an MBA in Dehradun?",
        answer: "Not for the two programmes we verified. Graphic Era's MBA page lists CAT, MAT, XAT, CMAT and GMAT as well as its own GEU Entrance Test, and UPES lists its own UPESMET alongside national-level exams. Both then hold a personal interview. IIM Kashipur, which is in Kashipur and not Dehradun, does require CAT. Confirm the current cycle on each college's own page.",
      },
    ],
  },
  {
    path: "/mba-colleges-in-uttarakhand",
    title: "MBA Colleges in Uttarakhand: IIM Kashipur, Dehradun",
    description: "MBA colleges in Uttarakhand we have verified: IIM Kashipur, Graphic Era and UPES in Dehradun, with accepted exams, selection steps and IIM Kashipur's published cut-offs.",
    h1: "MBA Colleges in Uttarakhand 2027",
    place: "Uttarakhand",
    cities: ["Kashipur", "Dehradun"],
    scope: "all",
    question: "Which MBA colleges in Uttarakhand have we verified, and which exams do they accept?",
    keywords: ["mba colleges in uttarakhand", "best mba colleges in uttarakhand", "iim kashipur mba", "mba in uttarakhand", "mba colleges in dehradun and kashipur"],
    leadCity: "Dehradun",
    cutoffPage: "/mba-cutoff-uttarakhand",
    related: ["/mba-colleges-in-dehradun", "/mba-cutoff-uttarakhand", "/mba-colleges-in-uttar-pradesh", "/mba-counselling", "/exams/cat"],
  },
  {
    path: "/mba-colleges-in-lucknow",
    title: "MBA Colleges in Lucknow: IIM Lucknow and Exams (Verified)",
    description: "MBA in Lucknow, starting with IIM Lucknow's CAT-based admission, and how UP's MBA seats are filled through CUET-PG and UPTAC counselling. Checked against official pages.",
    h1: "MBA Colleges in Lucknow 2027",
    place: "Lucknow",
    cities: ["Lucknow"],
    scope: "all",
    question: "Which MBA colleges in Lucknow have we verified, and which exams do they accept?",
    keywords: ["mba colleges in lucknow", "best mba colleges in lucknow", "iim lucknow mba", "mba admission lucknow", "pgdm colleges in lucknow", "mba in lucknow"],
    leadCity: "Lucknow",
    cutoffPage: "/mba-cutoff-uttar-pradesh",
    related: ["/mba-colleges-in-uttar-pradesh", "/uptac-mba-counselling", "/mba-cutoff-uttar-pradesh", "/blog/mba-admission-in-uttar-pradesh", "/mba-counselling", "/exams/cat"],
  },
  {
    path: "/mba-colleges-in-uttar-pradesh",
    title: "MBA Colleges in Uttar Pradesh: Noida, Lucknow, Verified",
    description: "MBA and PGDM in Uttar Pradesh: Noida, Greater Noida, Ghaziabad and Lucknow programmes with accepted exams, plus how UP's CUET-PG and UPTAC route works.",
    h1: "MBA Colleges in Uttar Pradesh 2027",
    place: "Uttar Pradesh",
    cities: ["Noida", "Greater Noida", "Ghaziabad", "Lucknow"],
    scope: "all",
    question: "Which MBA and PGDM colleges in Uttar Pradesh have we verified, and which exams do they accept?",
    keywords: ["mba colleges in uttar pradesh", "best mba colleges in up", "mba colleges in up", "mba admission in up", "pgdm colleges in uttar pradesh", "aktu mba colleges"],
    leadCity: "Delhi NCR",
    cutoffPage: "/mba-cutoff-uttar-pradesh",
    related: ["/mba-colleges-in-lucknow", "/uptac-mba-counselling", "/mba-colleges-noida", "/mba-colleges-in-greater-noida", "/mba-cutoff-uttar-pradesh", "/blog/mba-admission-in-uttar-pradesh", "/mba-colleges-in-delhi-ncr"],
  },
  {
    path: "/mba-colleges-in-gurugram",
    title: "MBA Colleges in Gurugram (Gurgaon): Exams Accepted",
    description: "MBA and PGDM in Gurugram: MDI Gurgaon and BML Munjal University, the exams each accepts, how selection works and how to apply. Checked against official pages.",
    h1: "MBA Colleges in Gurugram (Gurgaon) 2027",
    place: "Gurugram",
    cities: ["Gurugram"],
    scope: "all",
    question: "Which MBA and PGDM colleges in Gurugram have we verified, and which exams do they accept?",
    keywords: ["mba colleges in gurgaon", "mba colleges in gurugram", "pgdm colleges in gurgaon", "mdi gurgaon pgdm", "bml munjal university mba", "mba in gurgaon"],
    leadCity: "Delhi NCR",
    related: ["/mba-colleges-in-delhi-ncr", "/mba-colleges-in-delhi", "/mba-colleges-in-ghaziabad", "/mba-colleges-in-delhi-ncr-without-cat", "/mba-cutoff-delhi-ncr", "/mba-counselling"],
  },
  {
    path: "/mba-colleges-in-ghaziabad",
    title: "MBA Colleges in Ghaziabad: IMT and Exams Accepted",
    description: "PGDM in Ghaziabad: IMT Ghaziabad's CAT, XAT and GMAT route, how selection works, and where to find other Delhi NCR and Uttar Pradesh options. Checked against official pages.",
    h1: "MBA and PGDM Colleges in Ghaziabad 2027",
    place: "Ghaziabad",
    cities: ["Ghaziabad"],
    scope: "all",
    question: "Which MBA and PGDM colleges in Ghaziabad have we verified, and which exams do they accept?",
    keywords: ["mba colleges in ghaziabad", "pgdm colleges in ghaziabad", "imt ghaziabad pgdm", "imt ghaziabad admission", "mba in ghaziabad"],
    leadCity: "Delhi NCR",
    cutoffPage: "/mba-cutoff-uttar-pradesh",
    related: ["/mba-colleges-in-delhi-ncr", "/mba-colleges-in-uttar-pradesh", "/mba-colleges-in-gurugram", "/mba-colleges-noida", "/mba-colleges-in-delhi-ncr-without-cat", "/mba-counselling"],
  },
  {
    path: "/mba-colleges-in-delhi-accepting-cat",
    title: "MBA Colleges in Delhi Accepting CAT (Verified)",
    description: "MBA and PGDM in Delhi that use CAT scores: FMS, IIFT, IIT Delhi DMS, IMI, FORE and LBSIM, with the intake each source covers and how shortlisting works.",
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
