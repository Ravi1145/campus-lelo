// Single source of truth for CampusLelo's counselling offer. Used by the
// /counselling page, the booking form, the homepage card and the structured data,
// so the price and what each plan includes never drift apart.

export const VIDEO_PRICE_INR = 199

export type PlanId = "free_phone" | "video_199"

export interface CounsellingPlan {
  id: PlanId
  name: string
  tagline: string
  priceLabel: string
  priceNote: string
  cta: string
  /** Short value for the lead record */
  recordLabel: string
  includes: string[]
}

export const PLANS: CounsellingPlan[] = [
  {
    id: "free_phone",
    name: "Free phone counselling",
    tagline: "A counsellor calls you with the basics, at no cost.",
    priceLabel: "Free",
    priceNote: "No payment, no card",
    cta: "Request a free call",
    recordLabel: "Free phone counselling",
    includes: [
      "Phone or WhatsApp call from a counsellor",
      "College information: fees, exams accepted, cut-off sources",
      "Scholarship information for your category and course",
      "Alumni connection — talk to students who studied there",
      "A first list of colleges to look at",
    ],
  },
  {
    id: "video_199",
    name: "Expert video counselling",
    tagline: "A one-to-one video session with an experienced counsellor.",
    priceLabel: `₹${VIDEO_PRICE_INR}`,
    priceNote: "One session · pay after your slot is confirmed",
    cta: `Book a video session — ₹${VIDEO_PRICE_INR}`,
    recordLabel: `Expert video counselling (₹${VIDEO_PRICE_INR})`,
    includes: [
      "Everything in the free plan",
      "CAP round guidance: how to fill and order your options, and what to do after each allotment",
      "Career choice and growth path: which course, college and specialisation fit your goals",
      "A personal shortlist built around your score, budget and city",
      "Help with applications: documents, forms and deadlines, so you don't miss a step",
    ],
  },
]

export const FREE_FOR_EVERYONE = [
  { title: "Scholarship information", desc: "Government, institute and private scholarships, with eligibility and where to apply.", href: "/scholarships", cta: "See scholarships" },
  { title: "Alumni connection", desc: "Ask students and alumni of a college what it is really like — free.", href: "/alumni", cta: "Meet alumni" },
  { title: "College and exam information", desc: "Fees, exams, rankings and sourced cut-offs for every college we list.", href: "/colleges", cta: "Browse colleges" },
]

export const HELP_TOPICS = [
  "CAP round guidance",
  "College shortlist",
  "Career choice",
  "Scholarships",
  "Alumni connection",
  "Application help",
]

export const COUNSELLING_FAQS = [
  {
    q: "Which counselling is free and which is paid?",
    a: `Phone counselling is free: a counsellor calls or WhatsApps you, shares college and scholarship information and connects you with alumni. A one-to-one video session with an experienced counsellor costs ₹${VIDEO_PRICE_INR}. It covers CAP round guidance, career choice and growth, a personal shortlist and help with applications.`,
  },
  {
    q: "How do I pay for the ₹199 video session?",
    a: "You send a request with your preferred date and time. We confirm the slot on WhatsApp and send a secure payment link. No payment is taken on this website, and you pay only after the slot is confirmed.",
  },
  {
    q: "What is CAP round guidance?",
    a: "CAP is the centralised admission process many state admissions use. In the video session your counsellor explains how the rounds work, how to fill and order your option form, what to do after each allotment, and which documents and deadlines to watch.",
  },
  {
    q: "Will you guarantee me admission?",
    a: "No one can guarantee a seat. Admission depends on your score, category, the seats available and the rules of each round. We help you choose well, apply correctly and not miss deadlines.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "Know your approximate exam scores, stream and budget, and keep your marksheets handy. For CAP guidance, also keep your registration details ready if you have them.",
  },
  {
    q: "Is there free college counselling on CampusLelo?",
    a: "Yes. CampusLelo offers free phone counselling: a counsellor calls or WhatsApps the student, shares college and scholarship information and connects the student with alumni. Scholarship information and alumni connection are free for every student, with no booking needed.",
  },
  {
    q: "How is the video session different from phone counselling?",
    a: `Phone counselling at CampusLelo is free and covers the basics: college information, scholarships, alumni and a first list of colleges. The ₹${VIDEO_PRICE_INR} expert video session is a one-to-one conversation with an experienced counsellor on CAP round guidance, career choice and growth, a personal shortlist and application support.`,
  },
  {
    q: "Who can book CampusLelo counselling?",
    a: "Any student or parent can request counselling: students choosing a course after class 12, graduates choosing a postgraduate programme such as an MBA or PGDM, and families comparing colleges in Pune and Delhi NCR.",
  },
  {
    q: "How long does CampusLelo take to respond to a counselling request?",
    a: "A counsellor contacts the student on WhatsApp or by phone after a request is sent. For the video session, CampusLelo confirms the date and time first and then sends the payment link. Response time depends on the day and the number of requests.",
  }
]

/** Last time the offer and prices above were reviewed. Shown on the page and in structured data. */
export const COUNSELLING_UPDATED = "2026-10-05"

/** Direct answer shown at the top of /counselling and reused in llms.txt and the AI-context API. */
export const QUICK_ANSWER = `CampusLelo offers two kinds of college counselling. Phone counselling is free and includes scholarship information and alumni connection. A one-to-one expert video session costs ₹${VIDEO_PRICE_INR} and covers CAP round guidance, career choice and growth, a personal shortlist and help with applications. CampusLelo does not guarantee admission.`

/** Feature-by-plan matrix (rendered as a table on the page, and as text in llms.txt). */
export const COMPARISON: { feature: string; free: string; video: string }[] = [
  { feature: "Price", free: "Free", video: `₹${VIDEO_PRICE_INR} per session` },
  { feature: "How it is delivered", free: "Phone or WhatsApp call", video: "One-to-one video call" },
  { feature: "College information (fees, exams, sourced cut-offs)", free: "Yes", video: "Yes" },
  { feature: "Scholarship information", free: "Yes", video: "Yes" },
  { feature: "Alumni connection", free: "Yes", video: "Yes" },
  { feature: "CAP round guidance", free: "Basics only", video: "Yes — option form, choice order, what to do after each allotment" },
  { feature: "Career choice and growth path", free: "No", video: "Yes" },
  { feature: "Personal shortlist built on score, budget and city", free: "A first list of colleges", video: "Yes, with reasons for each college" },
  { feature: "Help with applications, documents and deadlines", free: "No", video: "Yes" },
  { feature: "Payment", free: "None", video: "Payment link sent after the slot is confirmed; nothing is charged on the website" },
  { feature: "Admission guaranteed", free: "No", video: "No" },
]

/** Plain-text summary for llms.txt (Markdown). */
export function counsellingMarkdown(base: string): string {
  return [
    `- Free phone counselling: a counsellor calls or WhatsApps the student. Includes college information, scholarship information, alumni connection and a first list of colleges. No payment.`,
    `- Expert video counselling: ₹${VIDEO_PRICE_INR} per one-to-one session. Covers CAP round guidance (option form, choice order, what to do after each allotment), career choice and growth, a personal shortlist built on score, budget and city, and help with applications, documents and deadlines.`,
    `- Payment: the student requests a slot, CampusLelo confirms it on WhatsApp and sends a payment link. No payment is taken on the website.`,
    `- Always free for every student: scholarship information (${base}/scholarships) and alumni connection (${base}/alumni).`,
    `- CampusLelo does not guarantee admission to any college.`,
    `- Book or compare plans: ${base}/counselling (last reviewed ${COUNSELLING_UPDATED}).`,
  ].join("\n")
}
