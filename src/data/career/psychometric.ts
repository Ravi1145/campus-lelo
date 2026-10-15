// Psychometric-style test: personality (five traits, in the spirit of the public "Big Five" model) and a short
// aptitude check (numbers, words, logic). ALL ITEMS ARE ORIGINAL WORDING for CampusLelo.
//
// This is a guidance tool, not a standardised or validated psychometric instrument, not an IQ test and not a clinical
// test. Three sample questions per aptitude area cannot measure ability; they are a practice check.

export type Trait = "openness" | "conscientiousness" | "extraversion" | "agreeableness" | "steadiness"

export interface TraitInfo {
  code: Trait
  name: string
  high: string
  low: string
  workHigh: string
}

export const TRAITS: TraitInfo[] = [
  { code: "openness", name: "Openness to new ideas", high: "You enjoy new ideas, variety and imagining other ways of doing things.", low: "You prefer what is tested and practical, and like clear, familiar ways of working.", workHigh: "creative, research and fast-changing settings" },
  { code: "conscientiousness", name: "Planning and follow-through", high: "You plan ahead, finish what you start and keep things in order.", low: "You work flexibly and at your own pace, and may find strict schedules tiring.", workHigh: "structured, deadline-driven settings such as engineering, accounts and operations" },
  { code: "extraversion", name: "Energy from people", high: "You gain energy from being with others and speaking up in a group.", low: "You do your best thinking alone or in small groups, and prefer to listen first.", workHigh: "people-facing roles such as sales, management and teaching" },
  { code: "agreeableness", name: "Care and cooperation", high: "You look for common ground, help others and avoid conflict.", low: "You are direct, comfortable disagreeing and happy to compete.", workHigh: "care, service and team-based roles" },
  { code: "steadiness", name: "Calm under pressure", high: "You stay even-tempered when things go wrong or deadlines close in.", low: "You feel pressure strongly, which can make you thorough, but you may need ways to unwind.", workHigh: "high-pressure settings such as medicine, law and trading" },
]

export interface PersonalityItem { id: number; trait: Trait; text: string; reverse?: boolean }

const P: [Trait, string, boolean?][] = [
  ["openness", "I enjoy trying ideas and activities I have never tried before."],
  ["conscientiousness", "I plan my work before I start it."],
  ["extraversion", "I feel energised after spending time with a group."],
  ["agreeableness", "I try to see things from the other person's point of view."],
  ["steadiness", "I stay calm when things go wrong."],
  ["openness", "I like to ask \"what if\" about everyday things."],
  ["conscientiousness", "I keep going until a task is properly finished."],
  ["extraversion", "I start conversations with people I do not know."],
  ["agreeableness", "I would rather help than compete."],
  ["steadiness", "Exams and deadlines do not make me panic."],
  ["openness", "I prefer to do things the usual way.", true],
  ["conscientiousness", "I often leave things to the last minute.", true],
  ["extraversion", "In a group I prefer to stay quiet.", true],
  ["agreeableness", "I find it hard to forgive people who upset me.", true],
  ["steadiness", "I worry a lot about small things.", true],
  ["openness", "New places, music or art excite me."],
  ["conscientiousness", "My notes, files and belongings are tidy."],
  ["extraversion", "I like being at the centre of a lively gathering."],
  ["agreeableness", "I can make people feel at ease."],
  ["steadiness", "My mood stays fairly even through the week."],
]
export const PERSONALITY: PersonalityItem[] = P.map(([trait, text, reverse], id) => ({ id, trait, text, reverse }))
export const PERSONALITY_SCALE = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"]

export type Area = "numbers" | "words" | "logic"
export const AREAS: { code: Area; name: string }[] = [
  { code: "numbers", name: "Numbers" },
  { code: "words", name: "Words" },
  { code: "logic", name: "Logic" },
]

export interface AptitudeItem { id: number; area: Area; text: string; options: string[]; answer: number; why: string }

export const APTITUDE: AptitudeItem[] = [
  { id: 0, area: "numbers", text: "A book costs ₹240 after a 20% discount. What was the price before the discount?", options: ["₹288", "₹300", "₹312", "₹320"], answer: 1, why: "After a 20% discount you pay 80% of the price. 240 ÷ 0.8 = 300." },
  { id: 1, area: "words", text: "Book is to reading as fork is to ...", options: ["eating", "cooking", "kitchen", "metal"], answer: 0, why: "A book is used for reading, and a fork is used for eating." },
  { id: 2, area: "logic", text: "All doctors are graduates. Some graduates are teachers. Which statement must be true?", options: ["All teachers are doctors", "Some doctors are teachers", "All doctors are graduates", "No teacher is a doctor"], answer: 2, why: "That statement is given. The others do not have to follow from the two facts." },
  { id: 3, area: "numbers", text: "What comes next: 3, 6, 12, 24, ... ?", options: ["36", "42", "48", "54"], answer: 2, why: "Each number is double the one before. 24 × 2 = 48." },
  { id: 4, area: "words", text: "Which one does not belong: apple, mango, carrot, banana?", options: ["apple", "mango", "carrot", "banana"], answer: 2, why: "Apple, mango and banana are fruits. A carrot is a vegetable." },
  { id: 5, area: "logic", text: "Monday, Wednesday, Friday, ... What comes next?", options: ["Saturday", "Sunday", "Monday", "Tuesday"], answer: 1, why: "The pattern skips one day each time, so after Friday comes Sunday." },
  { id: 6, area: "numbers", text: "If 5 pens cost ₹90, how much do 8 pens cost at the same rate?", options: ["₹126", "₹135", "₹144", "₹150"], answer: 2, why: "One pen costs 90 ÷ 5 = ₹18. Eight pens cost 8 × 18 = ₹144." },
  { id: 7, area: "words", text: "Which word means almost the same as \"scarce\"?", options: ["rare", "plenty", "heavy", "cheap"], answer: 0, why: "Scarce means in short supply, which is close to rare." },
  { id: 8, area: "logic", text: "A is taller than B. B is taller than C. Who is the shortest?", options: ["A", "B", "C", "Cannot tell"], answer: 2, why: "A > B > C, so C is the shortest." },
]
