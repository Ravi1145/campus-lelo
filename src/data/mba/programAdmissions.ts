import type { ProgramAdmission, SourceRef } from "./types"

// ─────────────────────────────────────────────────────────────────────────────
// Verified programme-level exam acceptance.
//
// Only add a record after reading the institute's own admission page or
// brochure for the stated intake. Acceptance is per PROGRAMME and CAMPUS —
// never infer it from a college-level list. Re-verify every admission cycle.
// Unverified institutes stay out of this file (and out of exam-college lists).
// ─────────────────────────────────────────────────────────────────────────────

const ACCESSED = "2026-10-04"

export const programAdmissions: ProgramAdmission[] = [
  {
    id: "sibm-pune-mba",
    institution: "Symbiosis Institute of Business Management (SIBM), Pune",
    program: "MBA",
    programType: "MBA",
    city: "Pune",
    collegeSlug: "sibm-symbiosis-institute-business-management-pune",
    route: "University test (SNAP)",
    examsAccepted: ["snap"],
    intake: "2027–29",
    notes: "Admission to Symbiosis International University programmes is through SIU's own process, including SNAP, followed by the institute's selection rounds.",
    source: { label: "SIBM Pune — Admissions", url: "https://www.sibm.edu/admissions", type: "official", accessed: ACCESSED },
  },
  {
    id: "scmhrd-pune-mba",
    institution: "Symbiosis Centre for Management and Human Resource Development (SCMHRD), Pune",
    program: "MBA",
    programType: "MBA",
    city: "Pune",
    collegeSlug: "scmhrd-symbiosis-centre-management-hrd",
    route: "University test (SNAP)",
    examsAccepted: ["snap"],
    intake: "2027–29",
    notes: "SCMHRD's MBA applications are made through the SNAP portal; snaptest.org lists SIU's MBA programmes.",
    source: { label: "SCMHRD — Admissions", url: "https://www.scmhrd.edu/admissions", type: "official", accessed: ACCESSED },
  },
  {
    id: "mitwpu-business-mba",
    institution: "MIT World Peace University — Department of Business, Pune",
    program: "MBA",
    programType: "MBA",
    city: "Pune",
    collegeSlug: "mit-wpu-mit-world-peace-university",
    route: "Direct (institute process)",
    examsAccepted: ["cat", "xat", "nmat", "gmat", "cmat", "mah-mba-cet", "mat"],
    intake: "2026–28",
    notes: "The brochure also accepts PERA 2026. It requires 60% in graduation (55% for Maharashtra reserved categories) plus 60% in Class 10 and 12, followed by GD/extempore and personal interaction. ATMA is not listed.",
    source: { label: "MIT-WPU Department of Business brochure 2026 (PDF)", url: "https://mitwpu.edu.in/uploads/school/brochure/Department-of-Business-brochure-2026.pdf", type: "official", accessed: ACCESSED },
  },
  {
    id: "iift-delhi-mba-ib",
    institution: "Indian Institute of Foreign Trade (IIFT), New Delhi",
    program: "MBA (International Business)",
    programType: "MBA",
    city: "Delhi",
    route: "Direct (institute process)",
    examsAccepted: ["cat"],
    intake: "2026–28",
    notes: "The prospectus states that IIFT uses CAT 2025 scores and other defined parameters for shortlisting, followed by GD and PI. The 2027–29 prospectus was not yet published when this was checked.",
    source: { label: "IIFT — MBA (IB) & MBA (BA) Prospectus 2026–28 (PDF)", url: "https://www.iift.ac.in/uploads/manage-files/2025/11/brochure-mbaib_mbaba_2026.pdf", type: "official", accessed: "2026-10-05" },
  },
  {
    id: "bimtech-greater-noida-pgdm",
    institution: "Birla Institute of Management Technology (BIMTECH), Greater Noida",
    program: "PGDM (also PGDM International Business, Insurance Business Management, Retail Management)",
    programType: "PGDM",
    city: "Greater Noida",
    route: "Direct (institute process)",
    examsAccepted: ["cat", "xat", "gmat", "cmat"],
    intake: "2027–29",
    notes: "MAT is accepted only for PGDM Insurance Business Management and PGDM Retail Management. Requires 50% in graduation; final-year students can apply conditionally.",
    source: { label: "BIMTECH — Admissions", url: "https://www.bimtech.ac.in/admissions/", type: "official", accessed: ACCESSED },
  },
  {
    id: "jaipuria-noida-pgdm",
    institution: "Jaipuria Institute of Management, Noida",
    program: "PGDM",
    programType: "PGDM",
    city: "Noida",
    route: "Direct (institute process)",
    examsAccepted: ["cat", "xat", "cmat", "mat", "gmat"],
    intake: "2027–29",
    notes: "Jaipuria lists PGDM variants across its campuses — confirm which specialisations run at the Noida campus. Requires a bachelor's degree with 50%; final-year students completing by 30 June 2027 can apply.",
    source: { label: "Jaipuria Institute of Management — Admissions", url: "https://www.jaipuria.ac.in/admissions/", type: "official", accessed: ACCESSED },
  },
  {
    id: "fms-delhi-mba",
    institution: "Faculty of Management Studies (FMS), University of Delhi",
    program: "MBA (full-time)",
    programType: "MBA",
    city: "Delhi",
    route: "Direct (institute process)",
    examsAccepted: ["cat"],
    intake: "2026–28",
    notes: "FMS's information bulletin states it shortlists on weighted CAT section scores (CAT 2025 for this intake) and then runs a discussion on the statement of purpose, an extempore and a personal interview. Applicants without a CAT score are not considered. The bulletin for the 2027 intake (CAT 2026) was not yet published when this was checked.",
    source: { label: "FMS Delhi — MBA (Full Time) programme and 2026 bulletin", url: "https://www.fms.edu/programmes/mba-full-time", type: "official", accessed: "2026-10-09" },
  },
  {
    id: "imi-delhi-pgdm",
    institution: "International Management Institute (IMI), New Delhi",
    program: "PGDM",
    programType: "PGDM",
    city: "Delhi",
    route: "Direct (institute process)",
    examsAccepted: ["cat", "xat", "gmat"],
    intake: "2027–29",
    notes: "IMI's admission pages list valid CAT 2026, XAT 2027 or GMAT scores for the flagship PGDM, then an individual assessment and personal interview. Some IMI pages still show earlier cycles, so confirm the dates and GMAT validity window on the official page. The executive and online PGDM programmes use different rules.",
    source: { label: "IMI New Delhi — Admission", url: "https://www.imi.edu/delhi/admission", type: "official", accessed: "2026-10-09" },
  },
  {
    id: "mdi-gurugram-pgdm",
    institution: "Management Development Institute (MDI), Gurugram",
    program: "PGDM (and PGDM-HRM, PGDM-IB, PGDM Business Analytics, PGDM-BFS)",
    programType: "PGDM",
    city: "Gurugram",
    route: "Direct (institute process)",
    examsAccepted: ["cat"],
    intake: "2027–29",
    notes: "MDI's admission page requires CAT 2026 for its PGDM programmes. Only PGDM-IB also lets applicants use a GMAT score, and the page says Indian candidates cannot apply on the basis of GMAT (that route is for NRI and international applicants). Requires 50% in Class 10, Class 12 and graduation; final-year students completing by 30 June 2027 can apply.",
    source: { label: "MDI Gurgaon — PGDM admissions", url: "https://www.mdi.ac.in/admissions/post-graduate-diploma-in-management-pgdm", type: "official", accessed: "2026-10-09" },
  },
  {
    id: "imt-ghaziabad-pgdm",
    institution: "Institute of Management Technology (IMT), Ghaziabad",
    program: "PGDM (two-year full-time)",
    programType: "PGDM",
    city: "Ghaziabad",
    route: "Direct (institute process)",
    examsAccepted: ["cat", "xat", "gmat"],
    intake: "2027–29",
    notes: "IMT's admissions page lists CAT 2026, XAT 2027 and GMAT scores for the two-year PGDM, followed by a common test personal interview round. Requires a bachelor's degree with 50% aggregate; final-year students can apply with a provisional certificate. The executive (ExP) programme has different rules.",
    source: { label: "IMT Ghaziabad — PGDM admissions", url: "https://www.imt.edu/admissions/pgdm/", type: "official", accessed: "2026-10-09" },
  },
]

/**
 * Maharashtra MBA/MMS centralised admission process (CAP).
 * A route-level rule, not a college list: it applies to the programmes that
 * take part in CAP, which the CET Cell publishes each year.
 */
export const maharashtraCap = {
  name: "Maharashtra MBA/MMS CAP",
  stateCandidateExams: ["mah-mba-cet"],
  allIndiaSeatExams: ["mah-mba-cet", "cat", "xat", "cmat", "mat", "atma", "gmat"],
  summary:
    "MBA/MMS programmes that take part in Maharashtra's centralised admission process (CAP) allot seats through the State CET Cell. Maharashtra-domicile candidates use MAH MBA/MMS CET. All-India seats can also be allotted using national exam scores. Recent cycles had four CAP rounds, followed by institute-level admissions for any vacant seats.",
  source: { label: "MAH MBA CET CAP process as reported by MBA Universe; official notices at cetcell.mahacet.org", url: "https://cetcell.mahacet.org", type: "secondary", accessed: ACCESSED } satisfies SourceRef,
  lastReviewed: ACCESSED,
}

export function admissionsForExam(examSlug: string): ProgramAdmission[] {
  return programAdmissions.filter((p) => p.examsAccepted.includes(examSlug))
}

/**
 * An exam's "colleges" page is indexable only when it lists real, verified
 * programmes: at least two, or one plus the Maharashtra CAP route.
 */
export function collegesPageIndexable(exam: { slug: string }): boolean {
  const n = admissionsForExam(exam.slug).length
  return n >= 2 || (n >= 1 && maharashtraCap.allIndiaSeatExams.includes(exam.slug))
}

export function admissionsByCity(city: ProgramAdmission["city"]): ProgramAdmission[] {
  return programAdmissions.filter((p) => p.city === city)
}
