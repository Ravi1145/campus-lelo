import { publishedCutoffs } from "./cutoffs"
import type { SourceRef } from "./types"

// Numeric form of the published MBA cut-offs, for the cut-off checker.
// These numbers mirror src/data/mba/cutoffs.ts exactly (same institutes, same cycles). If a figure
// changes there, change it here. Never add an expected, trend-based or coaching-site number.

export type Category = "General" | "EWS" | "NC-OBC" | "SC" | "ST" | "PwD"
export const CATEGORIES: Category[] = ["General", "EWS", "NC-OBC", "SC", "ST", "PwD"]

export interface Minimums {
  qa?: number
  dilr?: number
  vrc?: number
  overall?: number
}

export interface CheckRule {
  id: string
  institution: string
  short: string
  city: string
  examCycle: string
  /** what the minimums are, in one sentence */
  basis: string
  /** minimum percentiles by category; a missing category means we have no published figure for it */
  minimums: Partial<Record<Category, Minimums>>
  /** shown when the minimums cannot be compared with percentiles at all */
  notComparable?: string
  caveat: string
  sources: SourceRef[]
}

function sourcesFor(name: string): SourceRef[] {
  return publishedCutoffs.find((c) => c.institution.includes(name))?.sources ?? []
}


export const checkRules: CheckRule[] = [
  {
    id: "iift",
    institution: "Indian Institute of Foreign Trade (IIFT), New Delhi",
    short: "IIFT New Delhi",
    city: "Delhi",
    examCycle: "CAT 2025 (2026–28 batch)",
    basis: "Minimum CAT percentile in each of the three sections for the shortlist.",
    minimums: {
      General: { qa: 65, dilr: 65, vrc: 65 },
      EWS: { qa: 55, dilr: 55, vrc: 55 },
      "NC-OBC": { qa: 55, dilr: 55, vrc: 55 },
      SC: { qa: 30, dilr: 30, vrc: 30 },
      ST: { qa: 30, dilr: 30, vrc: 30 },
      PwD: { qa: 30, dilr: 30, vrc: 30 },
    },
    caveat: "Meeting the sectional minimums makes you eligible for consideration. IIFT's shortlist also uses other parameters, then a group discussion and interview.",
    sources: sourcesFor("IIFT"),
  },
  {
    id: "iim-kashipur",
    institution: "Indian Institute of Management (IIM) Kashipur",
    short: "IIM Kashipur",
    city: "Kashipur",
    examCycle: "CAT 2024 (2025–27 batch)",
    basis: "Minimum CAT percentile in each section and overall, used to select candidates for the personal interview.",
    minimums: {
      General: { qa: 75, dilr: 75, vrc: 75, overall: 95 },
      EWS: { qa: 55, dilr: 55, vrc: 55, overall: 81 },
      "NC-OBC": { qa: 52, dilr: 52, vrc: 52, overall: 81 },
      SC: { qa: 45, dilr: 45, vrc: 45, overall: 66 },
      ST: { qa: 30, dilr: 25, vrc: 25, overall: 42 },
      PwD: { qa: 30, dilr: 25, vrc: 25, overall: 42 },
    },
    caveat: "These are the CAT 2024 figures IIM Kashipur publishes. The 2026–28 batch was shortlisted through the Joint Admission Process (JAP 2026), so that year's category cut-offs are on the JAP portal.",
    sources: sourcesFor("Kashipur"),
  },
  {
    id: "sharda",
    institution: "Sharda University, Greater Noida",
    short: "Sharda University",
    city: "Greater Noida",
    examCycle: "Stated on the admission page (session not named)",
    basis: "Minimum overall percentile stated for CAT or XAT, followed by a group discussion and interview.",
    minimums: {
      General: { overall: 65 }, EWS: { overall: 65 }, "NC-OBC": { overall: 65 }, SC: { overall: 65 }, ST: { overall: 65 }, PwD: { overall: 65 },
    },
    caveat: "An eligibility minimum stated by the university, not the closing score of a past batch. The page does not name the session, so confirm with Sharda before you apply.",
    sources: sourcesFor("Sharda"),
  },
  {
    id: "fms",
    institution: "Faculty of Management Studies (FMS), University of Delhi",
    short: "FMS Delhi",
    city: "Delhi",
    examCycle: "CAT 2025 (2026–28 batch)",
    basis: "General-category composite-score cut-off for the interview shortlist: 46.739.",
    minimums: {},
    notComparable: "FMS shortlists on a composite built from your CAT section scores (weighted 40% VARC, 30% DILR, 30% QA), not on percentiles. Percentiles cannot be turned into that composite here, so use FMS's own notice.",
    caveat: "Only the General figure could be cross-checked, so other categories are not shown.",
    sources: sourcesFor("Faculty of Management Studies"),
  },
]

