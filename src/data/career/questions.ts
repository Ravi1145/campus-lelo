// Career interest and strengths self-assessment.
//
// Structure: six interest types from Holland's RIASEC model (a public career-theory framework) and six
// self-rated strengths. EVERY ITEM BELOW IS ORIGINAL WORDING written for CampusLelo. No item is copied
// from a published test, because published scales are copyrighted.
//
// This is a guidance tool, not a validated psychometric instrument and not a clinical or diagnostic test.
// The stream mapping is a judgement built on the model and on what each course involves; it is not a prediction.

export type Interest = "R" | "I" | "A" | "S" | "E" | "C"
export type Strength = "analytic" | "verbal" | "creative" | "people" | "lead" | "organise"

export interface InterestInfo { code: Interest; name: string; nickname: string; summary: string }

export const INTERESTS: InterestInfo[] = [
  { code: "R", name: "Realistic", nickname: "Doer", summary: "You like practical, hands-on work with tools, machines, the outdoors or physical results." },
  { code: "I", name: "Investigative", nickname: "Thinker", summary: "You like analysing, researching and solving hard problems with logic and evidence." },
  { code: "A", name: "Artistic", nickname: "Creator", summary: "You like original ideas and self-expression through design, writing, media or the arts." },
  { code: "S", name: "Social", nickname: "Helper", summary: "You like teaching, caring for and working with people." },
  { code: "E", name: "Enterprising", nickname: "Persuader", summary: "You like leading, persuading, selling and building something that grows." },
  { code: "C", name: "Conventional", nickname: "Organiser", summary: "You like order, accuracy, clear procedures and working with numbers and records." },
]

export interface StrengthInfo { code: Strength; name: string }
export const STRENGTHS: StrengthInfo[] = [
  { code: "analytic", name: "Numbers and logic" },
  { code: "verbal", name: "Language and communication" },
  { code: "creative", name: "Creativity" },
  { code: "people", name: "Understanding people" },
  { code: "lead", name: "Leading and deciding" },
  { code: "organise", name: "Organising and detail" },
]

export interface Question { id: number; kind: "interest" | "strength"; key: Interest | Strength; text: string }

const interestItems: Record<Interest, string[]> = {
  R: [
    "I enjoy building or fixing things with my hands.",
    "I would rather work outdoors or in a workshop than at a desk all day.",
    "I would enjoy taking a machine or gadget apart to see how it works.",
    "I like tasks where I can see a physical result at the end of the day.",
    "I am comfortable using tools, equipment or hardware.",
    "I would rather do something practical than write a long essay about it.",
  ],
  I: [
    "I enjoy solving puzzles or hard maths problems.",
    "I like finding out why something happens, not just that it happens.",
    "I enjoy reading about science, technology or how the world works.",
    "I like running a small experiment to test an idea.",
    "I can spend a long time on one difficult problem.",
    "I like looking at data to find a pattern.",
  ],
  A: [
    "I enjoy drawing, designing, writing or making music.",
    "I like coming up with ideas that are new or different.",
    "I notice how things look: colours, layout, style.",
    "I prefer work where I can show my own taste.",
    "I enjoy telling stories in words, pictures or video.",
    "Strict rules and fixed steps make me feel boxed in.",
  ],
  S: [
    "I enjoy helping people with their problems.",
    "I am a good listener, and friends talk to me when they are stressed.",
    "I like teaching or explaining things to others.",
    "I enjoy working in a team more than alone.",
    "I would like a job where I help people stay healthy or learn.",
    "I care about how my work affects other people's lives.",
  ],
  E: [
    "I like persuading people to try my idea.",
    "I enjoy leading a group or taking charge of a project.",
    "I am curious about how a business starts and grows.",
    "I like competing and aiming to win.",
    "I am comfortable speaking in front of a group.",
    "I would take a calculated risk for a bigger reward.",
  ],
  C: [
    "I like keeping things organised: files, schedules, lists.",
    "I enjoy work that follows clear steps and keeps accurate records.",
    "I double-check my work for small mistakes.",
    "I like working with numbers, accounts or spreadsheets.",
    "I prefer to know exactly what is expected of me.",
    "I find it satisfying to finish a long task neatly and on time.",
  ],
}

const strengthItems: Record<Strength, string[]> = {
  analytic: ["I can work through a multi-step maths or logic problem without giving up.", "I find graphs and tables easy to understand."],
  verbal: ["I can explain a complex idea clearly in writing.", "I can read a long passage and remember the main points."],
  creative: ["I come up with several different solutions to one problem.", "People tell me my work looks original."],
  people: ["People trust me with their problems.", "I can tell when someone is upset even if they do not say it."],
  lead: ["Others follow my lead when a group needs direction.", "I stay calm and decide when things go wrong."],
  organise: ["I finish tasks on time without reminders.", "My notes, files and plans are in order."],
}

// Interleave the six interest types so neighbouring questions are not about the same thing.
function build(): Question[] {
  const out: Question[] = []
  let id = 0
  for (let round = 0; round < 6; round++) {
    for (const t of INTERESTS) out.push({ id: id++, kind: "interest", key: t.code, text: interestItems[t.code][round] })
  }
  for (let round = 0; round < 2; round++) {
    for (const s of STRENGTHS) out.push({ id: id++, kind: "strength", key: s.code, text: strengthItems[s.code][round] })
  }
  return out
}
export const QUESTIONS: Question[] = build()

export const SCALE_INTEREST = ["Not me at all", "Not really", "Maybe", "Fairly me", "Very much me"]
export const SCALE_STRENGTH = ["Not true", "Slightly true", "Somewhat true", "Mostly true", "Very true"]

// ── Streams ────────────────────────────────────────────────────────────────────
export interface StreamFit {
  id: string
  name: string
  /** weights add up to about 1; interest codes and strengths are scored 0 to 100 */
  interests: Partial<Record<Interest, number>>
  strengths: Partial<Record<Strength, number>>
  what: string
  links: { label: string; href: string }[]
}

export const STREAMS: StreamFit[] = [
  { id: "engineering", name: "Engineering", interests: { R: 0.3, I: 0.35, C: 0.05 }, strengths: { analytic: 0.25, organise: 0.05 },
    what: "Building and improving machines, structures, electronics and systems. Entry is usually through MHT-CET, JEE Main or similar.",
    links: [{ label: "Engineering colleges in Pune", href: "/engineering-colleges-pune" }, { label: "MHT-CET guide", href: "/exams/mht-cet" }, { label: "JEE Main guide", href: "/exams/jee-main" }] },
  { id: "it", name: "Computers and IT", interests: { I: 0.35, R: 0.1, C: 0.15 }, strengths: { analytic: 0.3, organise: 0.1 },
    what: "Software, data and computer applications. Routes include B.Tech in computers, BCA and BSc IT.",
    links: [{ label: "Computer engineering colleges", href: "/computer-engineering-colleges-pune" }, { label: "BSc IT colleges", href: "/bsc-it-colleges-pune" }] },
  { id: "management", name: "Management (MBA and BBA)", interests: { E: 0.35, C: 0.1, S: 0.1, I: 0.05 }, strengths: { lead: 0.2, verbal: 0.1, analytic: 0.1 },
    what: "Running teams, products and businesses. BBA after Class 12, MBA or PGDM after graduation through CAT, XAT, CMAT and others.",
    links: [{ label: "Which MBA colleges accept your exam", href: "/mba-exam-acceptance" }, { label: "MBA cut-off checker", href: "/mba-cutoff-checker" }, { label: "BBA colleges", href: "/bba-colleges-pune" }] },
  { id: "commerce", name: "Commerce and Finance", interests: { C: 0.35, E: 0.15, I: 0.1 }, strengths: { analytic: 0.2, organise: 0.2 },
    what: "Accounts, finance, banking and business operations, through B.Com, BBA, CA and related paths.",
    links: [{ label: "BBA colleges", href: "/bba-colleges-pune" }, { label: "Commerce colleges", href: "/colleges?stream=Commerce" }] },
  { id: "medical", name: "Medical and Healthcare", interests: { I: 0.3, S: 0.35, R: 0.05 }, strengths: { people: 0.15, analytic: 0.1, organise: 0.05 },
    what: "Caring for patients and understanding the body, through NEET for MBBS and related courses.",
    links: [{ label: "Medical colleges in Pune", href: "/medical-colleges-pune" }, { label: "NEET guide", href: "/exams/neet" }] },
  { id: "law", name: "Law", interests: { E: 0.2, I: 0.2, S: 0.1 }, strengths: { verbal: 0.35, analytic: 0.1, lead: 0.05 },
    what: "Arguing, drafting and advising, through LLB and five-year integrated law courses.",
    links: [{ label: "Law colleges in Pune", href: "/law-colleges-pune" }] },
  { id: "design", name: "Design and Architecture", interests: { A: 0.5, R: 0.1, I: 0.1 }, strengths: { creative: 0.25, organise: 0.05 },
    what: "Designing products, spaces, graphics and experiences, through B.Des, B.Arch and related entrance tests.",
    links: [{ label: "Design colleges", href: "/design-colleges-pune" }, { label: "Architecture colleges", href: "/architecture-colleges-pune" }] },
  { id: "arts", name: "Arts, Media and Humanities", interests: { A: 0.3, S: 0.25, I: 0.1 }, strengths: { verbal: 0.2, creative: 0.1, people: 0.05 },
    what: "Writing, media, psychology, languages and social sciences, through BA and related courses.",
    links: [{ label: "Arts colleges", href: "/arts-colleges-pune" }] },
]
