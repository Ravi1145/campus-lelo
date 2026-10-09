// Types for the MBA / PGDM entrance-exam data layer.
//
// Every time-sensitive fact carries a source and a verification date so pages can
// show "last verified" and editors can see what needs re-checking each cycle.
// Policy: never add a fact without a source. If a fact cannot be verified, leave
// it out and point readers to the official website instead.

export type SourceType = "official" | "secondary"

export interface SourceRef {
  label: string
  url: string
  /** official = exam body / institute; secondary = cross-checked aggregator reports */
  type: SourceType
  /** ISO date the source was last checked */
  accessed: string
}

export interface KeyDate {
  label: string
  value: string
  source: SourceRef
}

export interface ExamSection {
  name: string
  questions?: number
  minutes?: number
  notes?: string
}

export interface ExamPattern {
  mode: string
  durationMinutes: number
  totalQuestions?: number
  sections: ExamSection[]
  marking: string
  /** score scale, e.g. "36–360" */
  scoreRange?: string
  source: SourceRef
}

export interface ExamTopicPrep {
  area: string
  tips: string[]
}

export type ProgramType = "MBA" | "PGDM"

export interface ExamProfile {
  /** URL slug under /exams/ — must stay stable once published */
  slug: string
  name: string
  fullName: string
  conductingBody: string
  officialSite: string
  /** "Once a year", "Multiple sessions a year", … */
  frequency: string
  /** Admission cycle the dates below belong to, e.g. "CAT 2026 (MBA/PGDM 2027–29)" */
  cycleLabel: string
  programs: ProgramType[]
  /** Short factual summary shown at the top of the hub */
  summary: string
  /** Where this exam is typically used (factual, sourced in `usageSource`) */
  usage: string
  usageSource?: SourceRef
  keyDates: KeyDate[]
  /** Shown when the current cycle's dates are not yet officially confirmed */
  datesNote?: string
  eligibility: { text: string; source: SourceRef }
  fee?: { text: string; source: SourceRef }
  pattern: ExamPattern
  /** Topics/areas tested — section-level syllabus summary */
  syllabus: { section: string; topics: string[] }[]
  /** How the score / percentile is produced — methodology only, no fabricated tables */
  scoring: { headline: string; points: string[]; source?: SourceRef }
  /** Editorial preparation guidance (opinion, labelled as such on the page) */
  preparation: ExamTopicPrep[]
  /** Official mock / practice resources, only when the exam body provides them */
  officialPractice?: { label: string; url: string }[]
  faqs: { question: string; answer: string }[]
  relatedExams: string[]
  lastReviewed: string
}

export type AdmissionRoute = "Direct (institute process)" | "Maharashtra CAP" | "University test (SNAP)"

export interface ProgramAdmission {
  id: string
  institution: string
  program: string
  programType: ProgramType
  city: "Pune" | "Noida" | "Greater Noida" | "Delhi" | "Gurugram" | "Ghaziabad" | "Lucknow" | "Kashipur" | "Dehradun"
  /** /colleges/[slug] page, when one exists */
  collegeSlug?: string
  route: AdmissionRoute
  /** exam slugs from ExamProfile.slug */
  examsAccepted: string[]
  /** admission intake the source refers to */
  intake: string
  notes?: string
  source: SourceRef
}
