import type { SourceRef } from "./types"

// ─────────────────────────────────────────────────────────────────────────────
// MBA shortlisting cut-offs — Delhi NCR & Noida.
//
// Only values an institute itself released (shortlist notices / admission
// criteria) and that ≥2 independent sources report identically. Expected or
// "trend-based" cut-offs from coaching sites are NEVER added here. If an
// institute does not publish a cut-off, it goes in `noPublishedCutoff`.
// Re-check every admission cycle.
// ─────────────────────────────────────────────────────────────────────────────

const ACCESSED = "2026-10-05"

export interface PublishedCutoff {
  institution: string
  program: string
  city: "Delhi" | "Noida" | "Greater Noida" | "Gurugram" | "Ghaziabad" | "Lucknow" | "Kashipur" | "Dehradun"
  admissionYear: string           // batch the cut-off was used for
  exam: string                    // exam slug in src/data/mba/exams.ts
  examCycle: string               // e.g. "CAT 2025"
  measure: string                 // what the number is
  values: { category: string; value: string }[]
  howItWorks: string
  caveats: string
  sources: SourceRef[]
}

export const publishedCutoffs: PublishedCutoff[] = [
  {
    institution: "Faculty of Management Studies (FMS), University of Delhi",
    program: "MBA (full-time)",
    city: "Delhi",
    admissionYear: "2026–28",
    exam: "cat",
    examCycle: "CAT 2025",
    measure: "Composite-score cut-off for the interview shortlist (General category)",
    values: [{ category: "General", value: "46.739 composite score" }],
    howItWorks: "FMS shortlists on a composite score built from CAT section scores, reported as weighted 40% VARC, 30% DILR and 30% QA. It is not a CAT percentile, so it cannot be compared directly with percentile cut-offs.",
    caveats: "Released with FMS's shortlist in March 2026, as reported. Cut-offs for other categories are published by FMS too, but we could cross-check only the General figure, so the others are not shown. FMS's own notice is at fms.edu → Results & Notifications.",
    sources: [
      { label: "Cracku — FMS shortlist cut-off 2026 (reports FMS notice of 16 Mar 2026)", url: "https://cracku.in/fms-shortlist-2026/", type: "secondary", accessed: ACCESSED },
      { label: "Careers360 — FMS Delhi cut-off 2026 (General composite 46.73)", url: "https://bschool.careers360.com/articles/fms-delhi-cutoff-2026-category-wise-cat-percentile-composite-score-mba-admission", type: "secondary", accessed: ACCESSED },
      { label: "FMS Delhi — Results & Notifications (official notices)", url: "https://fms.edu/admissions/results-and-notifications", type: "official", accessed: ACCESSED },
    ],
  },
  {
    institution: "Indian Institute of Foreign Trade (IIFT), New Delhi",
    program: "MBA (International Business)",
    city: "Delhi",
    admissionYear: "2026–28",
    exam: "cat",
    examCycle: "CAT 2025",
    measure: "Minimum CAT percentile required in each section for the shortlist",
    values: [
      { category: "General", value: "65 percentile in each section" },
      { category: "EWS / NC-OBC", value: "55 percentile in each section" },
      { category: "SC / ST / PwD", value: "30 percentile in each section" },
    ],
    howItWorks: "IIFT's 2026–28 prospectus states that it shortlists on CAT 2025 scores and other defined parameters. Meeting the sectional minimums makes you eligible for consideration; the final shortlist also depends on IIFT's overall score threshold, which varies each year.",
    caveats: "These are sectional minimums, not the score that guarantees an interview call. The official prospectus PDF does not list the numbers; they were released with IIFT's shortlist and are reported identically by several portals.",
    sources: [
      { label: "IIFT — MBA (IB) & MBA (BA) Prospectus 2026–28 (uses CAT 2025 for shortlisting)", url: "https://www.iift.ac.in/uploads/manage-files/2025/11/brochure-mbaib_mbaba_2026.pdf", type: "official", accessed: ACCESSED },
      { label: "CareerChoice360 — IIFT cut-off 2026 (official sectional cut-offs)", url: "https://careerchoice360.in/news/iift-cutoff-2026-official-out/", type: "secondary", accessed: ACCESSED },
      { label: "Collegedunia — IIFT 2026 cut-off and selection criteria", url: "https://collegedunia.com/exams/iift", type: "secondary", accessed: ACCESSED },
    ],
  },
  {
    institution: "Sharda University, Greater Noida",
    program: "MBA (Sharda School of Business Studies)",
    city: "Greater Noida",
    admissionYear: "2026 admissions (session not named on the page)",
    exam: "cat",
    examCycle: "Minimums stated on the admission page",
    measure: "Minimum percentile stated for each accepted exam",
    values: [
      { category: "MAT", value: "75 percentile or above" },
      { category: "CAT / XAT", value: "65 percentile or above, followed by a group discussion and personal interview" },
      { category: "SUAT (Sharda's own test)", value: "No minimum stated" },
    ],
    howItWorks: "Sharda lists these as its eligibility routes: a score on its own SUAT test, on MAT, or on CAT or XAT. Meeting the minimum makes you eligible. Admission also needs graduation with 50% and English proficiency.",
    caveats: "These are eligibility minimums stated by the university, not the closing score of a past batch. The page does not name an intake session, so confirm the current figures with Sharda before you apply.",
    sources: [
      { label: "Sharda University — MBA admissions", url: "https://www.sharda.ac.in/mba-admission/", type: "official", accessed: "2026-10-09" },
    ],
  },
  {
    institution: "Indian Institute of Management (IIM) Kashipur",
    program: "MBA",
    city: "Kashipur",
    admissionYear: "2025–27 (CAT 2024 figures; 2026–28 update pending)",
    exam: "cat",
    examCycle: "CAT 2024",
    measure: "Minimum CAT percentile used to select candidates for the personal interview (QA / DILR / VRC / overall)",
    values: [
      { category: "General", value: "75 / 75 / 75 / 95" },
      { category: "EWS", value: "55 / 55 / 55 / 81" },
      { category: "NC-OBC", value: "52 / 52 / 52 / 81" },
      { category: "SC", value: "45 / 45 / 45 / 66" },
      { category: "ST", value: "30 / 25 / 25 / 42" },
      { category: "DAP", value: "30 / 25 / 25 / 42" },
    ],
    howItWorks: "IIM Kashipur says these were the minimum percentiles used to select eligible candidates for the personal interview. Meeting them is the first filter; final selection adds the interview and the institute's other criteria.",
    caveats: "These are the figures IIM Kashipur publishes for CAT 2024, not for the 2026–28 batch. The institute says the 2026–28 cut-offs will be updated in line with its admission guidelines, so check the page before relying on them.",
    sources: [
      { label: "IIM Kashipur — MBA admission (minimum CAT-2024 percentiles)", url: "https://www.iimkashipur.ac.in/academics/mba/mba-admission", type: "official", accessed: "2026-10-09" },
    ],
  },
]

export interface NoPublishedCutoff {
  institution: string
  city: PublishedCutoff["city"]
  program: string
  examsNote: string
  shortlisting: string
  source: SourceRef
}

/** Institutes that do not publish an official percentile cut-off — we list no number. */
export const noPublishedCutoff: NoPublishedCutoff[] = [
  {
    institution: "Management Development Institute (MDI), Gurugram",
    city: "Gurugram",
    program: "PGDM programmes",
    examsNote: "CAT (GMAT for some applicants)",
    shortlisting: "Shortlisting for WAT/GD/PI uses CAT scores together with the application profile. MDI does not publish a fixed percentile cut-off.",
    source: { label: "MDI Gurgaon — PGDM admissions", url: "https://mdi.ac.in/admissions/post-graduate-diploma-in-management-pgdm", type: "official", accessed: ACCESSED },
  },
  {
    institution: "International Management Institute (IMI), New Delhi",
    city: "Delhi",
    program: "PGDM programmes",
    examsNote: "CAT / XAT / GMAT (check IMI's current admission page)",
    shortlisting: "Shortlisting for interviews is based on the entrance score and the application profile. An official percentile cut-off is not declared.",
    source: { label: "MBA Universe — IMI Delhi admissions (reports cut-offs are not officially declared)", url: "https://www.mbauniverse.com/college/delhimba/international-management-institute-imi-new-delhi/admissions", type: "secondary", accessed: ACCESSED },
  },
  {
    institution: "Institute of Management Technology (IMT), Ghaziabad",
    city: "Ghaziabad",
    program: "PGDM programmes",
    examsNote: "CAT / XAT / GMAT (check IMT's current admission page)",
    shortlisting: "Shortlisting combines the entrance score with academics, work experience and profile. IMT does not publish an official cut-off percentile.",
    source: { label: "MBA Universe — IMT Ghaziabad admissions", url: "https://www.mbauniverse.com/college/ghaziabadmba/institute-of-management-technology-imt-ghaziabad/admissions", type: "secondary", accessed: ACCESSED },
  },
  {
    institution: "Birla Institute of Management Technology (BIMTECH), Greater Noida",
    city: "Greater Noida",
    program: "PGDM (and PGDM IB, Insurance, Retail)",
    examsNote: "CAT 2026, XAT 2027, GMAT, CMAT 2027; MAT only for Insurance and Retail (verified)",
    shortlisting: "Shortlisting considers the entrance score, academic record and diversity. No official percentile cut-off is published.",
    source: { label: "BIMTECH — Admissions", url: "https://www.bimtech.ac.in/admissions/", type: "official", accessed: ACCESSED },
  },
  {
    institution: "Jaipuria Institute of Management, Noida",
    city: "Noida",
    program: "PGDM",
    examsNote: "CAT 2026, XAT 2027, CMAT, MAT, GMAT (verified)",
    shortlisting: "Admission is based on a valid aptitude-test score and the institute's own selection process. No official percentile cut-off is published.",
    source: { label: "Jaipuria Institute of Management — Admissions", url: "https://www.jaipuria.ac.in/admissions/", type: "official", accessed: ACCESSED },
  },
  {
    institution: "Indian Institute of Management (IIM) Lucknow",
    city: "Lucknow",
    program: "MBA (PGP)",
    examsNote: "CAT only (verified)",
    shortlisting: "Interview shortlisting uses CAT performance, scholastic record and work experience, then a written ability test and personal interview. The admission page we checked states no minimum percentile.",
    source: { label: "IIM Lucknow — MBA (PGP) admission policy", url: "https://www.iiml.ac.in/master-business-administration", type: "official", accessed: "2026-10-09" },
  },
  {
    institution: "Jaypee Business School (JBS), Noida",
    city: "Noida",
    program: "MBA",
    examsNote: "CAT, MAT, CMAT, XAT, GMAT, ATMA, CUET-PG (verified)",
    shortlisting: "Applications are shortlisted on a valid score, then a group discussion and personal interview decide selection. No cut-off is published on the admission page.",
    source: { label: "Jaypee Business School — MBA admission procedure", url: "https://jbs.ac.in/mba-admission-procedure", type: "official", accessed: "2026-10-09" },
  },
  {
    institution: "Graphic Era (Deemed to be University), Dehradun",
    city: "Dehradun",
    program: "MBA",
    examsNote: "CAT, MAT, XAT, CMAT, GMAT and the university's GEU Entrance Test (verified)",
    shortlisting: "Admission is on entrance-test scores and a personal interview. No cut-off is published on the programme page.",
    source: { label: "Graphic Era — MBA programme page", url: "https://geu.ac.in/course/master-of-business-administration-mba", type: "official", accessed: "2026-10-09" },
  },
  {
    institution: "UPES, Dehradun",
    city: "Dehradun",
    program: "MBA",
    examsNote: "UPESMET and national-level exams (individual exams not named on the page)",
    shortlisting: "Selection is an entrance test followed by a personal interview. No entrance score or cut-off is published on the programme page.",
    source: { label: "UPES School of Business — MBA", url: "https://www.upes.ac.in/school-of-business/mba", type: "official", accessed: "2026-10-09" },
  },
]

export const CUTOFFS_LAST_REVIEWED = ACCESSED
