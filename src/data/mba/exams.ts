import type { ExamProfile, SourceRef } from "./types"

// ─────────────────────────────────────────────────────────────────────────────
// MBA / PGDM entrance exam profiles.
//
// Rules for editing this file:
//  • Every date, fee, pattern and eligibility fact must cite a SourceRef.
//  • "official" = exam body's own site. "secondary" = two or more independent
//    education portals reporting the same figure (used only when the official
//    site cannot be read). Pages label secondary facts accordingly.
//  • If sources conflict, do NOT publish the figure — set `datesNote` instead.
//  • No score-vs-percentile tables, cutoff predictions or invented numbers.
//  • Re-verify each admission cycle and bump `lastReviewed`.
// ─────────────────────────────────────────────────────────────────────────────

const ACCESSED = "2026-10-04"

const src = (label: string, url: string, type: SourceRef["type"] = "official"): SourceRef => ({ label, url, type, accessed: ACCESSED })

const CAT_SECONDARY = src("CAT 2026 notification as reported by Careers360 and iQuanta (iimcat.ac.in could not be machine-read)", "https://iimcat.ac.in", "secondary")
const XAT_OFFICIAL = src("XAT official website (XLRI)", "https://xatonline.in")
const NMAT_OFFICIAL = src("GMAC: NMAT 2026-27 key info", "https://www.gmac.com/resources/learners/how-to-apply/exams-preparation/nmat-exam")
const SNAP_OFFICIAL = src("SNAP official website (Symbiosis International University)", "https://www.snaptest.org")
const MAT_OFFICIAL = src("AIMA MAT official website", "https://mat.aima.in")
const ATMA_OFFICIAL = src("ATMA official website (AIMS)", "https://atmaaims.com")
const CMAT_SECONDARY = src("CMAT pattern & eligibility as reported by Careers360 and MBA Universe (NTA site blocked automated access)", "https://exams.nta.ac.in/CMAT/", "secondary")
const MAHCET_OFFICIAL = src("State Common Entrance Test Cell, Maharashtra", "https://cetcell.mahacet.org")
const MAHCET_SECONDARY = src("MAH MBA CET pattern & CAP process as reported by MBA Universe", "https://www.mbauniverse.com/mah-mba-cet", "secondary")
const GMAT_OFFICIAL = src("GMAC: GMAT Focus Edition exam structure", "https://accounts.gmac.com/exams/gmat-exam/about/exam-structure")

export const mbaExams: ExamProfile[] = [
  // ── CAT ────────────────────────────────────────────────────────────────────
  {
    slug: "cat",
    name: "CAT",
    fullName: "Common Admission Test",
    conductingBody: "Indian Institutes of Management (IIM Indore is convening CAT 2026)",
    officialSite: "https://iimcat.ac.in",
    frequency: "Once a year (November)",
    cycleLabel: "CAT 2026: for MBA/PGDM admissions 2027–29",
    programs: ["MBA", "PGDM"],
    summary: "CAT is the computer-based entrance test run by the IIMs. Its percentile is used by the IIMs and by many other MBA and PGDM programmes across India, including Pune and Delhi NCR institutes.",
    usage: "IIMs and a large number of non-IIM MBA/PGDM programmes. In Maharashtra, CAT scores are also accepted for All-India seats allotted through the State CET Cell's CAP process.",
    usageSource: MAHCET_SECONDARY,
    keyDates: [
      { label: "Registration", value: "3 Aug 2026 to 22 Sep 2026 (deadline extended from 15 Sep)", source: CAT_SECONDARY },
      { label: "Exam date", value: "Sunday, 29 Nov 2026, three sessions", source: CAT_SECONDARY },
      { label: "Result", value: "Expected in the first week of January 2027 (not yet officially confirmed)", source: CAT_SECONDARY },
    ],
    eligibility: {
      text: "Bachelor's degree with at least 50% marks or equivalent CGPA (45% for SC, ST and PwD candidates). Final-year students can apply if they complete their degree within the time allowed by the IIMs. Professional qualifications such as CA, CS and ICWA (CMA) are also eligible.",
      source: CAT_SECONDARY,
    },
    fee: { text: "₹2,700 (General, EWS, NC-OBC); ₹1,350 (SC, ST, PwD)", source: CAT_SECONDARY },
    pattern: {
      mode: "Computer-based test",
      durationMinutes: 120,
      totalQuestions: 68,
      sections: [
        { name: "Verbal Ability & Reading Comprehension (VARC)", questions: 24, minutes: 40 },
        { name: "Data Interpretation & Logical Reasoning (DILR)", questions: 22, minutes: 40 },
        { name: "Quantitative Ability (QA)", questions: 22, minutes: 40 },
      ],
      marking: "In recent CAT cycles: +3 for a correct answer, −1 for a wrong multiple-choice answer, and no penalty for wrong type-in-the-answer (TITA) questions. Confirm in the CAT 2026 notification.",
      source: CAT_SECONDARY,
    },
    syllabus: [
      { section: "VARC", topics: ["Reading comprehension passages", "Para-jumbles", "Para-summary", "Odd sentence out"] },
      { section: "DILR", topics: ["Data sets with tables, charts and caselets", "Arrangements and scheduling", "Games and tournaments", "Venn diagrams and set-based puzzles"] },
      { section: "QA", topics: ["Arithmetic (percentages, ratios, time-speed-distance, work)", "Algebra (equations, inequalities, functions)", "Geometry and mensuration", "Number systems", "Modern maths (permutations, combinations, probability, progressions)"] },
    ],
    scoring: {
      headline: "CAT percentiles are relative, there is no fixed score-to-percentile conversion.",
      points: [
        "Because CAT runs in multiple sessions, raw scores are normalised and reported as scaled scores.",
        "Your percentile is the share of all test-takers who scored at or below your scaled score, so the score needed for a given percentile changes every year with paper difficulty and the number of candidates.",
        "Treat any \"score vs percentile\" chart as an estimate based on a previous year, not a prediction.",
        "Institutes set their own shortlisting criteria, which often combine the CAT percentile with academics, work experience and interviews.",
      ],
      source: CAT_SECONDARY,
    },
    preparation: [
      { area: "VARC", tips: ["Read long-form opinion and analysis pieces daily to build RC speed.", "Practise para-jumbles and summaries untimed first, then under section time.", "Review every wrong RC answer against the passage to find the reasoning error."] },
      { area: "DILR", tips: ["Use sectional mocks to practise choosing which sets to attempt in 40 minutes.", "Learn to skim all sets in the first few minutes before committing.", "Keep a log of set types you consistently get wrong."] },
      { area: "QA", tips: ["Arithmetic and algebra usually carry the most weight, build these first.", "Practise TITA questions, which carry no negative marking.", "Revise formulas weekly and track accuracy per topic."] },
      { area: "Mocks", tips: ["Start full-length mocks a few months before the exam.", "Spend at least as long analysing a mock as taking it.", "Practise in the same 40-minute sectional format as the real test."] },
    ],
    faqs: [
      { question: "When is CAT 2026?", answer: "CAT 2026 is on Sunday, 29 November 2026, in three sessions. IIM Indore is the convening institute. Always confirm on iimcat.ac.in." },
      { question: "Is there a fixed CAT score for 99 percentile?", answer: "No. CAT percentiles are calculated from normalised scores relative to all candidates that year, so the score for any percentile changes from year to year." },
      { question: "Can final-year students take CAT?", answer: "Yes, final-year graduation students can apply provided they complete their degree within the period allowed by the IIMs." },
      { question: "Do Pune MBA colleges accept CAT?", answer: "Many do, but acceptance depends on the programme. Symbiosis (SIU) MBA programmes admit through SNAP, while Maharashtra CAP All-India seats accept CAT. Check each programme's admission page." },
    ],
    relatedExams: ["xat", "snap", "nmat", "cmat"],
    lastReviewed: ACCESSED,
  },

  // ── XAT ────────────────────────────────────────────────────────────────────
  {
    slug: "xat",
    name: "XAT",
    fullName: "Xavier Aptitude Test",
    conductingBody: "XLRI: Xavier School of Management, Jamshedpur (on behalf of XAMI)",
    officialSite: "https://xatonline.in",
    frequency: "Once a year (early January)",
    cycleLabel: "XAT 2027: for MBA/PGDM admissions 2027–29",
    programs: ["MBA", "PGDM"],
    summary: "XAT is a national management entrance test run by XLRI. It is known for its Decision Making section and is accepted by XLRI and many other MBA and PGDM institutes.",
    usage: "XLRI and other XAMI member institutes. XAT's official site says 250+ B-schools accept the score.",
    usageSource: XAT_OFFICIAL,
    keyDates: [
      { label: "Registration", value: "15 Jul 2026 to 6 Dec 2026", source: XAT_OFFICIAL },
      { label: "Admit card", value: "20 Dec 2026 (tentative)", source: XAT_OFFICIAL },
      { label: "Exam date", value: "Sunday, 3 Jan 2027, 2:00 pm: 5:00 pm", source: XAT_OFFICIAL },
    ],
    eligibility: {
      text: "A bachelor's degree of at least three years in any discipline. Final-year students can apply if their results are declared in time for admission (reported as by June 2027). Reported as no minimum graduation percentage for XAT itself, though individual institutes may set their own.",
      source: src("XAT eligibility as reported by Cracku and Hitbullseye", "https://xatonline.in", "secondary"),
    },
    pattern: {
      mode: "Computer-based test",
      durationMinutes: 180,
      totalQuestions: 95,
      sections: [
        { name: "Verbal Ability & Logical Reasoning (VALR)", questions: 26, notes: "Part 1: VALR, DM and QA-DI share 170 minutes" },
        { name: "Decision Making (DM)", questions: 21 },
        { name: "Quantitative Aptitude & Data Interpretation (QA & DI)", questions: 28 },
        { name: "General Knowledge (GK)", questions: 20, minutes: 10, notes: "Part 2" },
      ],
      marking: "+1 per correct answer and −0.25 per incorrect answer. You can leave up to 8 questions unanswered without penalty; each further unanswered question costs 0.1 marks. GK has no negative marking.",
      source: XAT_OFFICIAL,
    },
    syllabus: [
      { section: "VALR", topics: ["Reading comprehension", "Critical reasoning", "Para-jumbles and sentence completion", "Vocabulary in context"] },
      { section: "Decision Making", topics: ["Business and ethical dilemmas", "Situational judgement", "Data-based decision caselets"] },
      { section: "QA & DI", topics: ["Arithmetic", "Algebra", "Geometry", "Data interpretation sets"] },
      { section: "GK", topics: ["Current affairs", "Business and economy", "Static general knowledge"] },
    ],
    scoring: {
      headline: "XAT percentiles depend on that year's candidate pool.",
      points: [
        "XLRI publishes overall and sectional percentiles for each candidate.",
        "Institutes use XAT scores in different ways, some use the overall percentile, some add sectional cut-offs.",
        "GK is used by some institutes (including XLRI) at the interview stage rather than for shortlisting. Check each institute's process.",
      ],
      source: XAT_OFFICIAL,
    },
    preparation: [
      { area: "Decision Making", tips: ["Practise caselets that weigh stakeholder interests, not just profit.", "Read the question carefully, options often differ in a single qualifier."] },
      { area: "VALR", tips: ["XAT verbal is denser than CAT; practise philosophical and abstract passages.", "Critical reasoning questions reward eliminating options rather than guessing."] },
      { area: "QA & DI", tips: ["Accuracy matters because of negative marking, attempt selectively.", "Practise data interpretation sets mixed with arithmetic."] },
      { area: "GK", tips: ["Follow business news through the year; GK carries no negative marking."] },
    ],
    faqs: [
      { question: "When is XAT 2027?", answer: "XAT 2027 is on Sunday, 3 January 2027, from 2:00 pm to 5:00 pm, according to xatonline.in." },
      { question: "What is the last date to register for XAT 2027?", answer: "Registration runs from 15 July 2026 to 6 December 2026 on xatonline.in." },
      { question: "Is there negative marking in XAT?", answer: "Yes: 0.25 marks are deducted for each wrong answer. Leaving more than 8 questions unanswered also costs 0.1 marks per extra question. The GK section has no negative marking." },
    ],
    relatedExams: ["cat", "nmat", "snap", "cmat"],
    lastReviewed: ACCESSED,
  },

  // ── CMAT ───────────────────────────────────────────────────────────────────
  {
    slug: "cmat",
    name: "CMAT",
    fullName: "Common Management Admission Test",
    conductingBody: "National Testing Agency (NTA)",
    officialSite: "https://exams.nta.ac.in/CMAT/",
    frequency: "Once a year",
    cycleLabel: "CMAT 2027: for MBA/PGDM admissions 2027–29",
    programs: ["MBA", "PGDM"],
    summary: "CMAT is a national-level management entrance test conducted by the NTA for AICTE-approved MBA and PGDM programmes. In Maharashtra, it is accepted for All-India seats in the CAP process.",
    usage: "AICTE-approved MBA/PGDM programmes nationwide; Maharashtra CAP All-India seats.",
    usageSource: MAHCET_SECONDARY,
    keyDates: [],
    datesNote: "Education portals currently report different CMAT 2027 exam dates, and we could not confirm them on the NTA website. We will add dates once NTA's information bulletin is verified. Check exams.nta.ac.in/CMAT for the latest notice.",
    eligibility: {
      text: "Graduates in any discipline from a recognised institution; final-year students can also apply. No age limit. Only Indian citizens can apply.",
      source: CMAT_SECONDARY,
    },
    pattern: {
      mode: "Computer-based test",
      durationMinutes: 180,
      totalQuestions: 100,
      sections: [
        { name: "Quantitative Techniques & Data Interpretation", questions: 20 },
        { name: "Logical Reasoning", questions: 20 },
        { name: "Language Comprehension", questions: 20 },
        { name: "General Awareness", questions: 20 },
        { name: "Innovation & Entrepreneurship", questions: 20 },
      ],
      marking: "+4 for each correct answer, −1 for each incorrect answer (400 marks in total).",
      scoreRange: "Out of 400",
      source: CMAT_SECONDARY,
    },
    syllabus: [
      { section: "Quantitative Techniques & DI", topics: ["Arithmetic", "Algebra", "Geometry", "Tables and charts"] },
      { section: "Logical Reasoning", topics: ["Series", "Coding-decoding", "Blood relations", "Arrangements", "Syllogisms"] },
      { section: "Language Comprehension", topics: ["Reading comprehension", "Grammar and usage", "Vocabulary", "Para-jumbles"] },
      { section: "General Awareness", topics: ["Current affairs", "Business and economy", "Static GK"] },
      { section: "Innovation & Entrepreneurship", topics: ["Start-up ecosystem", "Entrepreneurship concepts", "Government schemes for start-ups"] },
    ],
    scoring: {
      headline: "CMAT reports a score out of 400 and a percentile/rank for each candidate.",
      points: [
        "Institutes and the Maharashtra CAP use the CMAT score or percentile for merit lists.",
        "There is no fixed score-to-percentile conversion, it depends on that year's candidates.",
      ],
      source: CMAT_SECONDARY,
    },
    preparation: [
      { area: "General Awareness & I&E", tips: ["These two sections are knowledge-based and reward steady revision of current affairs and start-up news.", "Make short notes of government schemes and business news."] },
      { area: "Quant, LR & Language", tips: ["Questions are generally more direct than CAT, accuracy and speed matter.", "With −1 marking, avoid blind guesses."] },
    ],
    faqs: [
      { question: "What is the CMAT exam pattern?", answer: "CMAT has 100 questions in 5 sections of 20 questions each, carrying 400 marks in 180 minutes. Each correct answer earns 4 marks and each wrong answer loses 1." },
      { question: "When is CMAT 2027?", answer: "We have not yet been able to verify the CMAT 2027 date from NTA. Please check exams.nta.ac.in/CMAT for the official schedule." },
      { question: "Is CMAT accepted in Pune?", answer: "Yes. CMAT is accepted for All-India seats in Maharashtra's MBA CAP process, and some Pune programmes accept it directly. Check each programme's admission criteria." },
    ],
    relatedExams: ["mah-mba-cet", "mat", "atma", "cat"],
    lastReviewed: ACCESSED,
  },

  // ── MAT ────────────────────────────────────────────────────────────────────
  {
    slug: "mat",
    name: "MAT",
    fullName: "Management Aptitude Test",
    conductingBody: "All India Management Association (AIMA)",
    officialSite: "https://mat.aima.in",
    frequency: "Several sessions a year, in paper-based and computer-based modes",
    cycleLabel: "MAT December 2026",
    programs: ["MBA", "PGDM"],
    summary: "MAT is AIMA's management aptitude test, held several times a year. Its score is valid for one year and is used by many MBA and PGDM institutes, including in Maharashtra's CAP All-India seats.",
    usage: "MBA/PGDM institutes nationwide; Maharashtra CAP All-India seats.",
    usageSource: MAHCET_SECONDARY,
    keyDates: [
      { label: "Paper-based test (PBT)", value: "Exam 20 Dec 2026, registration closes 14 Dec 2026", source: MAT_OFFICIAL },
      { label: "Computer-based test (CBT)", value: "Exam 27 Dec 2026, registration closes 21 Dec 2026", source: MAT_OFFICIAL },
    ],
    eligibility: {
      text: "Graduates in any discipline can apply, and final-year undergraduate students can appear provisionally. Many institutes require at least 50% in graduation (45% for reserved categories) for admission, check the institute you are applying to.",
      source: src("MAT eligibility as reported by Careers360", "https://mat.aima.in", "secondary"),
    },
    fee: { text: "₹2,300 for one mode (PBT or CBT); ₹4,000 for both modes", source: MAT_OFFICIAL },
    pattern: {
      mode: "Paper-based (PBT) or computer-based (CBT)",
      durationMinutes: 120,
      totalQuestions: 150,
      sections: [
        { name: "Language Comprehension", questions: 30 },
        { name: "Intelligence & Critical Reasoning", questions: 30 },
        { name: "Mathematical Skills", questions: 30 },
        { name: "Data Analysis & Sufficiency", questions: 30 },
        { name: "Economic & Business Environment", questions: 30 },
      ],
      marking: "0.25 marks deducted for each incorrect answer.",
      source: MAT_OFFICIAL,
    },
    syllabus: [
      { section: "Language Comprehension", topics: ["Reading comprehension", "Grammar", "Vocabulary", "Sentence correction"] },
      { section: "Intelligence & Critical Reasoning", topics: ["Series", "Coding", "Arrangements", "Critical reasoning"] },
      { section: "Mathematical Skills", topics: ["Arithmetic", "Algebra", "Geometry", "Mensuration"] },
      { section: "Data Analysis & Sufficiency", topics: ["Tables and graphs", "Data sufficiency"] },
      { section: "Economic & Business Environment", topics: ["Business news", "Economy", "Current affairs"] },
    ],
    scoring: {
      headline: "MAT reports a composite score and percentile; the score is valid for one year.",
      points: [
        "AIMA scales results so that different sessions can be compared.",
        "Because MAT runs several times a year, you can retake it to improve your score before admission deadlines.",
      ],
      source: MAT_OFFICIAL,
    },
    preparation: [
      { area: "Time management", tips: ["150 questions in 120 minutes means under a minute each, practise full-length timed papers.", "Choose PBT or CBT based on which format you perform better in."] },
      { area: "Economic & Business Environment", tips: ["Follow business news regularly; this section is knowledge-based."] },
    ],
    faqs: [
      { question: "When is MAT December 2026?", answer: "The paper-based MAT is on 20 December 2026 and the computer-based MAT is on 27 December 2026, according to mat.aima.in." },
      { question: "How long is a MAT score valid?", answer: "AIMA states that a MAT score is valid for one year." },
    ],
    relatedExams: ["cmat", "atma", "mah-mba-cet"],
    lastReviewed: ACCESSED,
  },

  // ── MAH MBA CET ────────────────────────────────────────────────────────────
  {
    slug: "mah-mba-cet",
    name: "MAH MBA CET",
    fullName: "Maharashtra MBA/MMS Common Entrance Test",
    conductingBody: "State Common Entrance Test Cell, Maharashtra",
    officialSite: "https://cetcell.mahacet.org",
    frequency: "Once a year, with a first and a second attempt",
    cycleLabel: "MAH MBA/MMS CET 2026 (admissions 2026–28), the 2027 cycle has not been announced yet",
    programs: ["MBA"],
    summary: "MAH MBA/MMS CET is Maharashtra's state entrance test for MBA and MMS programmes admitted through the centralised admission process (CAP). It is the main route into many Pune MBA programmes for Maharashtra-domicile candidates.",
    usage: "MBA/MMS programmes in Maharashtra that admit through the State CET Cell's CAP. It is not required for PGDM programmes, which run their own admissions.",
    usageSource: MAHCET_SECONDARY,
    keyDates: [
      { label: "2026 first attempt", value: "6–8 Apr 2026", source: MAHCET_SECONDARY },
      { label: "2026 second attempt", value: "9 May 2026", source: MAHCET_SECONDARY },
      { label: "2026 second-attempt result", value: "Declared 12 Jun 2026", source: MAHCET_OFFICIAL },
    ],
    datesNote: "These are the 2026 cycle dates. The CET Cell has not yet announced the 2027 schedule, check cetcell.mahacet.org.",
    eligibility: {
      text: "A bachelor's degree in any discipline with at least 50% marks; final-year students can apply if they pass before admission. Relaxed marks apply to reserved-category candidates of Maharashtra domicile, see the CET Cell information brochure.",
      source: MAHCET_SECONDARY,
    },
    pattern: {
      mode: "Computer-based test",
      durationMinutes: 150,
      totalQuestions: 200,
      sections: [
        { name: "Logical Reasoning", questions: 75 },
        { name: "Abstract Reasoning", questions: 25 },
        { name: "Quantitative Aptitude", questions: 50 },
        { name: "Verbal Ability & Reading Comprehension", questions: 50 },
      ],
      marking: "+1 per correct answer; no negative marking. Questions are multiple choice with five options.",
      scoreRange: "Out of 200",
      source: MAHCET_SECONDARY,
    },
    syllabus: [
      { section: "Logical Reasoning", topics: ["Arrangements", "Syllogisms", "Coding-decoding", "Blood relations", "Critical reasoning"] },
      { section: "Abstract Reasoning", topics: ["Figure series", "Pattern completion", "Odd figure out"] },
      { section: "Quantitative Aptitude", topics: ["Arithmetic", "Data interpretation", "Number systems", "Basic algebra"] },
      { section: "Verbal Ability & RC", topics: ["Reading comprehension", "Grammar", "Vocabulary", "Para-jumbles"] },
    ],
    scoring: {
      headline: "MAH MBA CET results are reported as percentiles calculated within each test session.",
      points: [
        "Because the exam runs in several sessions, each candidate's percentile is calculated against candidates in the same session; the top scorer in each session gets the 100th percentile.",
        "Reported formula: percentile = (number of candidates in the session with a score equal to or lower than yours ÷ total candidates in the session) × 100.",
        "CAP merit lists use these percentiles. Previous-year CAP cut-offs are a guide only, they change every year.",
      ],
      source: MAHCET_SECONDARY,
    },
    preparation: [
      { area: "Speed", tips: ["200 questions in 150 minutes with no negative marking, attempt every question.", "Logical and abstract reasoning make up half the paper; practise these daily."] },
      { area: "Mocks", tips: ["Practise full-length mocks in the CET interface style to build stamina for 150 minutes."] },
    ],
    faqs: [
      { question: "Is MAH MBA CET required for PGDM colleges in Pune?", answer: "No. MAH MBA CET is used for MBA/MMS programmes admitted through Maharashtra's CAP. PGDM institutes run their own admissions and accept the exams they list, which may or may not include MAH-CET." },
      { question: "What is the CAP process?", answer: "CAP is the centralised admission process run by Maharashtra's State CET Cell. Candidates register, fill college preferences and are allotted seats over several rounds based on merit. Recent cycles had four CAP rounds, followed by institute-level admissions for any vacant seats." },
      { question: "Can candidates from outside Maharashtra get admission through CAP?", answer: "Yes, for All-India seats. These can be allotted using MAH-CET or national exam scores such as CAT, XAT, CMAT, MAT, ATMA or GMAT. Check the CET Cell brochure for the current year." },
      { question: "Is there negative marking in MAH MBA CET?", answer: "No. Each correct answer carries one mark and there is no penalty for wrong answers." },
    ],
    relatedExams: ["cmat", "cat", "mat", "atma"],
    lastReviewed: ACCESSED,
  },

  // ── SNAP ───────────────────────────────────────────────────────────────────
  {
    slug: "snap",
    name: "SNAP",
    fullName: "Symbiosis National Aptitude Test",
    conductingBody: "Symbiosis International (Deemed University)",
    officialSite: "https://www.snaptest.org",
    frequency: "Once a year, with up to three attempts in December",
    cycleLabel: "SNAP 2026: for Symbiosis MBA admissions 2027–29",
    programs: ["MBA"],
    summary: "SNAP is Symbiosis International University's entrance test for its MBA programmes, including SIBM Pune and SCMHRD. You can take it up to three times, and your best score counts.",
    usage: "MBA programmes at Symbiosis International University institutes, 17 institutes and 32 MBA programmes, according to snaptest.org.",
    usageSource: SNAP_OFFICIAL,
    keyDates: [
      { label: "SNAP tests", value: "13, 19 and 26 Dec 2026 (up to three attempts)", source: SNAP_OFFICIAL },
    ],
    datesNote: "Registration deadlines and result dates are published on snaptest.org. Check there before applying.",
    eligibility: {
      text: "A graduate in any discipline from a recognised university with at least 50% marks (45% for SC/ST candidates).",
      source: SNAP_OFFICIAL,
    },
    fee: { text: "₹2,550 per SNAP attempt, plus ₹1,000 per programme applied to (plus taxes). Paying the SNAP fee alone does not register you for any programme.", source: SNAP_OFFICIAL },
    pattern: {
      mode: "Computer-based test",
      durationMinutes: 60,
      totalQuestions: 60,
      sections: [
        { name: "General English", questions: 10 },
        { name: "Analytical & Logical Reasoning", questions: 20 },
        { name: "Quantitative, Data Interpretation & Data Sufficiency", questions: 20 },
        { name: "Ethics, Morality & Values", questions: 10, notes: "New section reported for SNAP 2026" },
      ],
      marking: "+1 per correct answer, −0.25 per incorrect answer; no penalty for unanswered questions. No sectional time limits.",
      source: src("SNAP 2026 pattern as reported by IMS, Cracku and iQuanta (not listed on the snaptest.org homepage)", "https://www.snaptest.org", "secondary"),
    },
    syllabus: [
      { section: "General English", topics: ["Reading comprehension", "Verbal reasoning", "Verbal ability"] },
      { section: "Analytical & Logical Reasoning", topics: ["Puzzles", "Arrangements", "Critical reasoning"] },
      { section: "Quantitative, DI & DS", topics: ["Arithmetic", "Data interpretation", "Data sufficiency"] },
      { section: "Ethics, Morality & Values", topics: ["Situational and ethical judgement questions (new for 2026, check the official SNAP bulletin for scope)"] },
    ],
    scoring: {
      headline: "Your best SNAP attempt counts.",
      points: [
        "snaptest.org states that the highest score across attempts is considered, without normalisation.",
        "Each Symbiosis institute then runs its own shortlisting and selection process for the programmes you applied to.",
      ],
      source: SNAP_OFFICIAL,
    },
    preparation: [
      { area: "Speed", tips: ["SNAP is short: practise answering quickly and skipping hard questions.", "Use the three attempts strategically: treat the first as a real exam, not a trial."] },
      { area: "Programme registration", tips: ["Register and pay for each programme separately, the SNAP fee alone does not count as an application."] },
    ],
    faqs: [
      { question: "Which colleges accept SNAP in Pune?", answer: "SNAP is used for admission to Symbiosis International University's MBA programmes, including SIBM Pune and SCMHRD in Pune." },
      { question: "How many times can I take SNAP?", answer: "Up to three times. The highest score is considered." },
      { question: "Does SIBM Pune accept CAT?", answer: "SIBM Pune's admissions page says admission to SIU programmes is based on SIU's own processes, including SNAP. Do not apply with a CAT score alone." },
    ],
    relatedExams: ["cat", "nmat", "xat"],
    lastReviewed: ACCESSED,
  },

  // ── NMAT ───────────────────────────────────────────────────────────────────
  {
    slug: "nmat",
    name: "NMAT",
    fullName: "NMAT by GMAC",
    conductingBody: "Graduate Management Admission Council (GMAC)",
    officialSite: "https://www.mba.com/exams/nmat-by-gmac",
    frequency: "Once a year in a testing window, with up to three attempts",
    cycleLabel: "NMAT 2026: for MBA/PGDM admissions 2027",
    programs: ["MBA", "PGDM"],
    summary: "NMAT by GMAC is a flexible, computer-based test. You choose your date, time and section order, and can take it up to three times in a testing year.",
    usage: "NMIMS and other MBA/PGDM programmes in India that list NMAT among accepted tests.",
    keyDates: [
      { label: "Registration", value: "20 Aug: 10 Oct 2026", source: NMAT_OFFICIAL },
      { label: "Test scheduling", value: "20 Aug: 22 Oct 2026", source: NMAT_OFFICIAL },
      { label: "Testing window", value: "2 Nov: 20 Dec 2026", source: NMAT_OFFICIAL },
    ],
    eligibility: {
      text: "Participating programmes generally require a graduate degree with at least 50% marks. Check each programme's own eligibility rules.",
      source: src("NMAT eligibility as reported by MBA Universe", "https://www.mbauniverse.com/nmat", "secondary"),
    },
    fee: { text: "₹3,000 (India); retake ₹3,000; rescheduling ₹1,200", source: NMAT_OFFICIAL },
    pattern: {
      mode: "Computer-based (test centre or online)",
      durationMinutes: 120,
      totalQuestions: 108,
      sections: [
        { name: "Language Skills", questions: 36, minutes: 28 },
        { name: "Quantitative Skills", questions: 36, minutes: 52 },
        { name: "Logical Reasoning", questions: 36, minutes: 40 },
      ],
      marking: "No negative marking. (Per-section times are as reported by MBA Universe; GMAC confirms the 120-minute total.)",
      scoreRange: "36–360",
      source: NMAT_OFFICIAL,
    },
    syllabus: [
      { section: "Language Skills", topics: ["Reading comprehension", "Grammar", "Vocabulary", "Para-jumbles"] },
      { section: "Quantitative Skills", topics: ["Arithmetic", "Algebra", "Data interpretation", "Data sufficiency"] },
      { section: "Logical Reasoning", topics: ["Critical reasoning", "Arrangements", "Coding", "Series"] },
    ],
    scoring: {
      headline: "NMAT scores range from 36 to 360 and are valid for one admission cycle.",
      points: [
        "There is no negative marking, so attempt every question.",
        "You can take NMAT up to three times in a testing year, with at least 15 days between attempts. Programmes generally consider your best score, check each programme's policy.",
        "Section times are fixed per section (28, 52 and 40 minutes); section times are reported by MBA Universe.",
      ],
      source: NMAT_OFFICIAL,
    },
    preparation: [
      { area: "Strategy", tips: ["Choose a section order that starts with your strongest section.", "Attempt every question: there is no negative marking.", "Use your first attempt early in the window so you have time to retake."] },
    ],
    officialPractice: [{ label: "Official NMAT practice materials (mba.com)", url: "https://www.mba.com/exams/nmat-by-gmac" }],
    faqs: [
      { question: "How many times can I take NMAT?", answer: "Up to three times in a testing year, with at least 15 days between attempts, according to GMAC." },
      { question: "Is there negative marking in NMAT?", answer: "No. GMAC states that no marks are deducted for incorrect or unanswered questions." },
    ],
    relatedExams: ["cat", "snap", "xat", "gmat"],
    lastReviewed: ACCESSED,
  },

  // ── ATMA ───────────────────────────────────────────────────────────────────
  {
    slug: "atma",
    name: "ATMA",
    fullName: "AIMS Test for Management Admissions",
    conductingBody: "Association of Indian Management Schools (AIMS)",
    officialSite: "https://atmaaims.com",
    frequency: "Several sessions a year",
    cycleLabel: "ATMA 2026 sessions",
    programs: ["MBA", "PGDM"],
    summary: "ATMA is a national entrance test run by AIMS for MBA, MMS, PGDM and MCA admissions. Several sessions are held each year. In Maharashtra, ATMA is accepted for CAP All-India seats.",
    usage: "MBA, MMS, PGDM and MCA programmes; Maharashtra CAP All-India seats.",
    usageSource: MAHCET_SECONDARY,
    keyDates: [
      { label: "Recent sessions", value: "22 Feb, 3 May, 12 Jul and 9 Aug 2026", source: ATMA_OFFICIAL },
    ],
    datesNote: "Upcoming session dates are announced on atmaaims.com.",
    eligibility: {
      text: "A bachelor's degree with at least 50% marks (45% for SC/ST); final-year students can apply.",
      source: src("ATMA eligibility as reported by Careers360", "https://atmaaims.com", "secondary"),
    },
    fee: { text: "Fee concessions: 25% for women candidates and 50% for candidates from specified north-eastern states (full fee on atmaaims.com).", source: ATMA_OFFICIAL },
    pattern: {
      mode: "Computer-based test",
      durationMinutes: 180,
      totalQuestions: 180,
      sections: [
        { name: "Analytical Reasoning Skills I", questions: 30, minutes: 30 },
        { name: "Analytical Reasoning Skills II", questions: 30, minutes: 30 },
        { name: "Verbal Skills I", questions: 30, minutes: 30 },
        { name: "Verbal Skills II", questions: 30, minutes: 30 },
        { name: "Quantitative Skills I", questions: 30, minutes: 30 },
        { name: "Quantitative Skills II", questions: 30, minutes: 30 },
      ],
      marking: "+1 per correct answer, −0.25 per incorrect answer.",
      source: src("ATMA pattern as reported by Careers360", "https://atmaaims.com", "secondary"),
    },
    syllabus: [
      { section: "Analytical Reasoning", topics: ["Critical reasoning", "Arrangements", "Series", "Inferences"] },
      { section: "Verbal Skills", topics: ["Reading comprehension", "Grammar", "Vocabulary"] },
      { section: "Quantitative Skills", topics: ["Arithmetic", "Algebra", "Geometry", "Data interpretation"] },
    ],
    scoring: {
      headline: "ATMA reports scaled scores and percentiles for each section and overall.",
      points: ["Institutes use the overall percentile or scaled score in their merit lists.", "Because ATMA has several sessions a year, you can retake it before admission deadlines."],
    },
    preparation: [
      { area: "Pacing", tips: ["Each section is timed separately at 30 minutes, practise sectional timing.", "With −0.25 marking, skip questions you cannot narrow down."] },
    ],
    faqs: [
      { question: "How often is ATMA held?", answer: "ATMA is held several times a year. Recent 2026 sessions were in February, May, July and August. Check atmaaims.com for upcoming dates." },
      { question: "Is ATMA accepted in Pune?", answer: "ATMA is one of the national exams accepted for Maharashtra CAP All-India seats, and some Pune programmes accept it directly. Check each programme's admission criteria." },
    ],
    relatedExams: ["mat", "cmat", "mah-mba-cet"],
    lastReviewed: ACCESSED,
  },

  // ── GMAT ───────────────────────────────────────────────────────────────────
  {
    slug: "gmat",
    name: "GMAT",
    fullName: "Graduate Management Admission Test (Focus Edition)",
    conductingBody: "Graduate Management Admission Council (GMAC)",
    officialSite: "https://www.mba.com/exams/gmat-exam",
    frequency: "Available year-round",
    cycleLabel: "GMAT Focus Edition",
    programs: ["MBA", "PGDM"],
    summary: "GMAT is GMAC's global business-school admission test, available year-round. In India it is mainly used for one-year and executive programmes, and some two-year MBA/PGDM programmes accept it too. It is also accepted for Maharashtra CAP All-India seats.",
    usage: "Global business schools; some Indian MBA/PGDM programmes; Maharashtra CAP All-India seats.",
    usageSource: MAHCET_SECONDARY,
    keyDates: [],
    datesNote: "GMAT can be booked year-round at test centres or online through mba.com.",
    eligibility: {
      text: "GMAC does not set a minimum degree percentage for taking the GMAT. Each programme sets its own admission eligibility.",
      source: GMAT_OFFICIAL,
    },
    pattern: {
      mode: "Computer-adaptive (test centre or online)",
      durationMinutes: 135,
      totalQuestions: 64,
      sections: [
        { name: "Quantitative Reasoning", questions: 21, minutes: 45 },
        { name: "Verbal Reasoning", questions: 23, minutes: 45 },
        { name: "Data Insights", questions: 20, minutes: 45 },
      ],
      marking: "Computer-adaptive scoring; total score range 205–805.",
      scoreRange: "205–805",
      source: GMAT_OFFICIAL,
    },
    syllabus: [
      { section: "Quantitative Reasoning", topics: ["Arithmetic", "Algebra", "Word problems"] },
      { section: "Verbal Reasoning", topics: ["Reading comprehension", "Critical reasoning"] },
      { section: "Data Insights", topics: ["Data sufficiency", "Multi-source reasoning", "Table analysis", "Graphics interpretation", "Two-part analysis"] },
    ],
    scoring: {
      headline: "GMAT Focus scores range from 205 to 805, with section scores reported separately.",
      points: ["Each of the three sections is scored on a 60–90 scale and the total on 205–805.", "Indian programmes that accept GMAT usually publish their own minimum score or percentile guidance."],
      source: GMAT_OFFICIAL,
    },
    preparation: [
      { area: "Strategy", tips: ["The test is adaptive, accuracy on early questions in each section matters.", "Use GMAC's official practice exams, which use real retired questions."] },
    ],
    officialPractice: [{ label: "Official GMAT practice (mba.com)", url: "https://www.mba.com/exams/gmat-exam" }],
    faqs: [
      { question: "Is GMAT accepted for MBA in Pune?", answer: "Some Pune programmes list GMAT among accepted tests, for example, MIT-WPU's Department of Business brochure for 2026 lists GMAT. GMAT is also accepted for Maharashtra CAP All-India seats." },
    ],
    relatedExams: ["nmat", "cat"],
    lastReviewed: ACCESSED,
  },
]

export const MBA_EXAM_SLUGS = mbaExams.map((e) => e.slug)

export function getMbaExam(slug: string): ExamProfile | undefined {
  return mbaExams.find((e) => e.slug === slug)
}

/** Sub-pages generated for each exam hub. Each must render distinct content. */
export const EXAM_TOPICS = {
  syllabus: "Syllabus & Exam Pattern",
  "score-vs-percentile": "Score vs Percentile",
  preparation: "Preparation Strategy",
  colleges: "Accepting MBA & PGDM Colleges",
} as const

export type ExamTopic = keyof typeof EXAM_TOPICS

/**
 * Preparation pages are indexable only once they cover at least 3 areas —
 * thinner pages stay reachable for users but are noindexed (no filler content).
 */
export function prepPageIndexable(exam: ExamProfile): boolean {
  return exam.preparation.length >= 3
}
