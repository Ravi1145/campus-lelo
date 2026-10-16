import type { NirfRow } from "./nirf2025"

// Definitions for the "best MBA colleges in …" pages. "Best" on these pages means the institute's
// NIRF 2025 Management rank (a Ministry of Education framework), shown with the rank and score as
// published. Nothing is re-ranked. Admission facts come from our own verified records.

export interface BestPageDef {
  path: string
  /** ≤ 60 characters */
  title: string
  description: string
  h1: string
  place: string
  /** which NIRF rows belong on the page */
  match: (r: NirfRow) => boolean
  /** show at most this many rows (national page) */
  limit?: number
  /** page in our own set that goes deeper on admissions for this place */
  admissionsPage?: { href: string; label: string }
  leadCity: "Delhi NCR" | "Greater Noida" | "Dehradun" | "Lucknow"
  keywords: string[]
  related: string[]
}

const state = (s: string) => (r: NirfRow) => r.state === s
const NOIDA = new Set(["Noida", "Gautam Budh Nagar"])

export const bestPages: BestPageDef[] = [
  {
    path: "/best-mba-colleges-in-india", title: "Best MBA Colleges in India 2026: NIRF Top 25 + Exams",
    description: "The top 25 management institutes in the NIRF 2025 ranking, with city, score and the entrance exams and admission details we have verified for each.",
    h1: "Best MBA Colleges in India (NIRF 2025 Top 25)", place: "India", match: () => true, limit: 25,
    admissionsPage: { href: "/mba-admission", label: "MBA admission by college" }, leadCity: "Delhi NCR",
    keywords: ["best mba colleges in india", "top mba colleges in india", "top 10 mba colleges in india", "nirf mba ranking 2025", "best b schools in india", "top management institutes in india"],
    related: ["/best-mba-colleges-in-delhi", "/best-mba-colleges-in-uttar-pradesh", "/best-mba-colleges-in-maharashtra", "/mba-exam-acceptance", "/mba-exam-calendar", "/mba-vs-pgdm"],
  },
  {
    path: "/best-mba-colleges-in-delhi", title: "Best MBA Colleges in Delhi 2026: NIRF Ranked + Exams",
    description: "Delhi's MBA and PGDM institutes in the NIRF 2025 management ranking: IIT Delhi, IIFT, IMI, FORE and more, with exams accepted and admission details we verified.",
    h1: "Best MBA Colleges in Delhi (NIRF 2025)", place: "Delhi", match: state("Delhi"),
    admissionsPage: { href: "/mba-colleges-in-delhi", label: "MBA colleges in Delhi: exams and cut-offs" }, leadCity: "Delhi NCR",
    keywords: ["best mba colleges in delhi", "top mba colleges in delhi", "top 10 mba colleges in delhi", "mba colleges in delhi nirf ranking", "best pgdm colleges in delhi"],
    related: ["/best-mba-colleges-in-india", "/best-mba-colleges-in-noida", "/best-mba-colleges-in-haryana", "/mba-colleges-in-delhi-ncr", "/mba-cutoff-delhi-ncr", "/fms-delhi-cat-cutoff", "/iift-cat-cutoff"],
  },
  {
    path: "/best-mba-colleges-in-noida", title: "Best MBA Colleges in Noida 2026: NIRF Ranked + Exams",
    description: "MBA and PGDM colleges in Noida that appear in the NIRF 2025 management ranking, with the exams each accepts and how admission works. Sourced, not guessed.",
    h1: "Best MBA Colleges in Noida (NIRF 2025)", place: "Noida", match: (r) => NOIDA.has(r.city),
    admissionsPage: { href: "/mba-colleges-noida", label: "MBA colleges in Noida: exams accepted" }, leadCity: "Delhi NCR",
    keywords: ["best mba colleges in noida", "top mba colleges in noida", "mba colleges in noida nirf", "best pgdm colleges in noida", "mba in noida"],
    related: ["/best-mba-colleges-in-greater-noida", "/best-mba-colleges-in-delhi", "/best-mba-colleges-in-uttar-pradesh", "/pgdm-colleges-noida", "/mba-colleges-in-delhi-ncr-without-cat"],
  },
  {
    path: "/best-mba-colleges-in-greater-noida", title: "Best MBA Colleges in Greater Noida 2026: NIRF + Exams",
    description: "Greater Noida's MBA and PGDM colleges in the NIRF 2025 management ranking, plus the other institutes we have verified, with exams accepted for each.",
    h1: "Best MBA Colleges in Greater Noida (NIRF 2025)", place: "Greater Noida", match: (r) => r.city === "Greater Noida",
    admissionsPage: { href: "/mba-colleges-in-greater-noida", label: "MBA colleges in Greater Noida: exams accepted" }, leadCity: "Greater Noida",
    keywords: ["best mba colleges in greater noida", "top mba colleges in greater noida", "bimtech greater noida ranking", "pgdm colleges in greater noida", "mba in greater noida"],
    related: ["/best-mba-colleges-in-noida", "/best-mba-colleges-in-uttar-pradesh", "/mba-colleges-in-delhi-ncr", "/mba-admission/bimtech-greater-noida-pgdm", "/mba-admission/glbimr-greater-noida-pgdm"],
  },
  {
    path: "/best-mba-colleges-in-uttar-pradesh", title: "Best MBA Colleges in Uttar Pradesh 2026: NIRF + Exams",
    description: "Uttar Pradesh MBA and PGDM institutes ranked by NIRF 2025: IIM Lucknow, IMT Ghaziabad, Jaipuria, Amity, BIMTECH and more, with exams accepted.",
    h1: "Best MBA Colleges in Uttar Pradesh (NIRF 2025)", place: "Uttar Pradesh", match: state("Uttar Pradesh"),
    admissionsPage: { href: "/mba-colleges-in-uttar-pradesh", label: "MBA colleges in Uttar Pradesh: exams accepted" }, leadCity: "Lucknow",
    keywords: ["best mba colleges in uttar pradesh", "top mba colleges in up", "best mba colleges in lucknow", "best mba colleges in ghaziabad", "mba colleges in up nirf"],
    related: ["/best-mba-colleges-in-noida", "/best-mba-colleges-in-greater-noida", "/mba-colleges-in-lucknow", "/mba-colleges-in-ghaziabad", "/uptac-mba-counselling", "/mba-cutoff-uttar-pradesh"],
  },
  {
    path: "/best-mba-colleges-in-uttarakhand", title: "Best MBA Colleges in Uttarakhand 2026: NIRF + Exams",
    description: "Uttarakhand MBA colleges in the NIRF 2025 management ranking: IIM Kashipur, UPES and Graphic Era, with accepted exams and admission details we verified.",
    h1: "Best MBA Colleges in Uttarakhand (NIRF 2025)", place: "Uttarakhand", match: state("Uttarakhand"),
    admissionsPage: { href: "/mba-colleges-in-uttarakhand", label: "MBA colleges in Uttarakhand: exams accepted" }, leadCity: "Dehradun",
    keywords: ["best mba colleges in uttarakhand", "best mba colleges in dehradun", "top mba colleges in dehradun", "iim kashipur nirf rank", "upes mba ranking"],
    related: ["/mba-colleges-in-dehradun", "/mba-cutoff-uttarakhand", "/mba-admission/doon-university-mba", "/mba-admission/dit-dehradun-mba", "/best-mba-colleges-in-india"],
  },
  {
    path: "/best-mba-colleges-in-haryana", title: "Best MBA Colleges in Haryana 2026: NIRF Ranked + Exams",
    description: "Haryana's MBA and PGDM institutes in the NIRF 2025 ranking, including MDI Gurgaon, Great Lakes Gurgaon, IIM Rohtak and BML Munjal, with exams accepted.",
    h1: "Best MBA Colleges in Haryana (NIRF 2025)", place: "Haryana", match: state("Haryana"),
    admissionsPage: { href: "/mba-colleges-in-gurugram", label: "MBA colleges in Gurugram: exams accepted" }, leadCity: "Delhi NCR",
    keywords: ["best mba colleges in haryana", "best mba colleges in gurgaon", "top mba colleges in gurugram", "mdi gurgaon nirf rank", "mba colleges in haryana"],
    related: ["/best-mba-colleges-in-delhi", "/mba-colleges-in-delhi-ncr", "/mdi-gurgaon-pgdm-admission", "/mba-admission/bmu-gurugram-mba", "/best-mba-colleges-in-india"],
  },
  {
    path: "/best-mba-colleges-in-maharashtra", title: "Best MBA Colleges in Maharashtra 2026: NIRF + Exams",
    description: "Maharashtra's management institutes in the NIRF 2025 ranking: IIM Mumbai, SIBM Pune, SPJIMR, NMIMS and more, with the admission routes we verified for Pune.",
    h1: "Best MBA Colleges in Maharashtra (NIRF 2025)", place: "Maharashtra", match: state("Maharashtra"),
    admissionsPage: { href: "/mba-colleges-pune", label: "MBA colleges in Pune" }, leadCity: "Delhi NCR",
    keywords: ["best mba colleges in maharashtra", "best mba colleges in mumbai", "top mba colleges in pune", "mba colleges in maharashtra nirf", "sibm pune nirf rank"],
    related: ["/mba-colleges-in-pune", "/top-10-mba-colleges-in-pune", "/mba-cutoff-pune", "/mba-cutoff-mumbai", "/best-mba-colleges-in-india"],
  },
  {
    path: "/best-mba-colleges-in-karnataka", title: "Best MBA Colleges in Karnataka 2026: NIRF Ranked",
    description: "Karnataka MBA colleges in the NIRF 2025 management ranking, including IIM Bangalore, TAPMI Manipal, Christ, Alliance and Jain, with published rank and score.",
    h1: "Best MBA Colleges in Karnataka (NIRF 2025)", place: "Karnataka", match: state("Karnataka"), leadCity: "Delhi NCR",
    keywords: ["best mba colleges in karnataka", "best mba colleges in bangalore", "top mba colleges in bangalore", "iim bangalore nirf rank"],
    related: ["/best-mba-colleges-in-india", "/best-mba-colleges-in-tamil-nadu", "/mba-exam-acceptance", "/mba-exam-calendar"],
  },
  {
    path: "/best-mba-colleges-in-tamil-nadu", title: "Best MBA Colleges in Tamil Nadu 2026: NIRF Ranked",
    description: "Tamil Nadu's MBA colleges in the NIRF 2025 management ranking, from IIM Tiruchirappalli and IIT Madras to Great Lakes and Loyola, with published rank and score.",
    h1: "Best MBA Colleges in Tamil Nadu (NIRF 2025)", place: "Tamil Nadu", match: state("Tamil Nadu"), leadCity: "Delhi NCR",
    keywords: ["best mba colleges in tamil nadu", "best mba colleges in chennai", "top mba colleges in chennai", "great lakes chennai nirf rank"],
    related: ["/best-mba-colleges-in-india", "/best-mba-colleges-in-karnataka", "/mba-exam-acceptance", "/mba-exam-calendar"],
  },
  {
    path: "/best-mba-colleges-in-gujarat", title: "Best MBA Colleges in Gujarat 2026: NIRF Ranked",
    description: "Gujarat's MBA colleges in the NIRF 2025 management ranking: IIM Ahmedabad, MICA, Nirma, IRMA and PDEU, with their published rank and score.",
    h1: "Best MBA Colleges in Gujarat (NIRF 2025)", place: "Gujarat", match: state("Gujarat"), leadCity: "Delhi NCR",
    keywords: ["best mba colleges in gujarat", "best mba colleges in ahmedabad", "top mba colleges in ahmedabad", "iim ahmedabad nirf rank"],
    related: ["/best-mba-colleges-in-india", "/best-mba-colleges-in-maharashtra", "/mba-exam-acceptance", "/mba-exam-calendar"],
  },
  {
    path: "/best-mba-colleges-in-west-bengal", title: "Best MBA Colleges in West Bengal 2026: NIRF Ranked",
    description: "West Bengal's MBA colleges in the NIRF 2025 management ranking: IIM Calcutta, IIT Kharagpur and IMI Kolkata, with their published rank and score.",
    h1: "Best MBA Colleges in West Bengal (NIRF 2025)", place: "West Bengal", match: state("West Bengal"), leadCity: "Delhi NCR",
    keywords: ["best mba colleges in west bengal", "best mba colleges in kolkata", "iim calcutta nirf rank", "top mba colleges in kolkata"],
    related: ["/best-mba-colleges-in-india", "/best-mba-colleges-in-delhi", "/mba-exam-acceptance", "/mba-exam-calendar"],
  },
]

export function getBestPage(path: string): BestPageDef | undefined {
  return bestPages.find((b) => b.path === path)
}
