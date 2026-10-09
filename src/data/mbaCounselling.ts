// Content for /mba-counselling. Plans and prices come from ./counselling so they never drift.
// Nothing here states a placement figure, rank, fee or seat count: those live in the sourced
// MBA data (src/data/mba) and are linked, not repeated.
import { VIDEO_PRICE_INR } from "./counselling"

export const MBA_COUNSELLING_UPDATED = "2026-10-09"

export const MBA_QUICK_ANSWER = `CampusLelo offers free MBA and PGDM counselling by phone or WhatsApp, covering admission, exam choice and management career guidance, plus an optional one-to-one video session for ₹${VIDEO_PRICE_INR}. A counsellor helps you choose between MBA and PGDM, pick the right entrance exam, shortlist colleges that fit your score, budget and city, and plan your applications. CampusLelo does not guarantee admission or placements.`

/** Pre-select these in the booking form. Must match what the counsellor can actually cover. */
export const MBA_HELP_TOPICS = [
  "MBA vs PGDM",
  "Which exam to take",
  "College shortlist",
  "Specialisation and career path",
  "GD, PI and SOP",
  "Fees, loans, scholarships",
  "Career switch",
  "Application help",
]

export const MBA_AREAS = [
  {
    title: "Management career guidance",
    desc: "Which specialisation fits you (marketing, finance, HR, operations, analytics, business analytics) and what roles each usually leads to, so the course you pick matches where you want to work in five years.",
    href: "/blog/mba-specialisations-explained",
    cta: "Read: MBA specialisations explained",
  },
  {
    title: "Choosing the exam and the college",
    desc: "CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH-MBA-CET or GMAT: which one your target colleges accept, with each exam's official source, and which colleges fit your score, budget and city.",
    href: "/mba-exam-calendar",
    cta: "See all exam dates",
  },
  {
    title: "Admission process advice",
    desc: "Registration, exam, shortlist, GD, PI and writing round, offer and fee deadlines in the right order, so you do not miss a step.",
    href: "/blog/mba-admission-process-in-india",
    cta: "Read: MBA admission process",
  },
  {
    title: "Fees, loans and scholarships",
    desc: "What the total cost really includes, how to compare programmes by total cost and not just first-year fee, and which scholarships to check first.",
    href: "/blog/mba-fees-in-india-guide",
    cta: "Read: MBA fees guide",
  },
  {
    title: "Career switchers and working professionals",
    desc: "Full-time, part-time, executive or online: which format fits your work experience and what recruiters usually look for in a switch.",
    href: "/blog/executive-online-part-time-mba-india",
    cta: "Read: executive and part-time MBA",
  },
  {
    title: "Parents and families",
    desc: "A plain-language view of options, costs and risks so the decision is made together, with questions to ask any college before you pay a fee.",
    href: "/blog/how-to-choose-an-mba-college-in-india",
    cta: "Read: how to choose an MBA college",
  },
]

export const MBA_CHECKS = [
  { q: "Is your degree and score eligible?", a: "Check the programme's own eligibility, not a listing site's. Our exam pages link the official source for each exam." },
  { q: "Do you need an exam score before you apply?", a: "Most full-time programmes use CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH-MBA-CET or GMAT. Some accept more than one. Check which ones the college accepts for the programme you want." },
  { q: "Can you afford the total cost?", a: "Add tuition, hostel, travel and living for the whole programme, then compare it with how you plan to fund it. Do not decide on first-year fee alone." },
  { q: "Are the placement numbers explained?", a: "Ask how the college defines average and median, how many students sat for placements and how many were placed. A single headline figure tells you little." },
  { q: "Is the programme recognised?", a: "Check the approval and accreditation the college claims on the regulator's or accreditor's own website." },
]

export const MBA_STEPS = [
  { title: "Send a request", desc: "Choose free phone counselling or the video session, and tell us your exam, budget and city." },
  { title: "We contact you", desc: "A counsellor calls or WhatsApps you. For the video session we confirm a slot first and then send a payment link." },
  { title: "Get a plan", desc: "Leave with a shortlist, the exams to prepare for and the dates to watch." },
]

export const MBA_FAQS = [
  {
    q: "Is MBA counselling on CampusLelo free?",
    a: `Yes, the first step is free. A counsellor calls or WhatsApps you about MBA and PGDM admission, exam choice and career direction, and shares scholarship information and alumni connections. A one-to-one video session with an experienced counsellor is optional and costs ₹${VIDEO_PRICE_INR}.`,
  },
  {
    q: "What does MBA career guidance include?",
    a: "It covers choosing between MBA and PGDM, picking a specialisation, understanding the roles each one leads to, deciding whether to join straight after graduation or after work experience, and planning your applications. It is guidance to help you decide, not a promise of a job or salary.",
  },
  {
    q: "Which entrance exam should I take for MBA?",
    a: "It depends on the colleges you want. CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH-MBA-CET and GMAT are accepted by different colleges, and some colleges accept several. Our exam calendar lists dates with official sources, and a counsellor can map your target colleges to the exams they accept.",
  },
  {
    q: "Can I get an MBA without CAT?",
    a: "Yes. Many colleges accept other exams such as XAT, SNAP, NMAT, CMAT, MAT, MAH-MBA-CET or GMAT, and some programmes have their own process. Check each college's official admission page. See our guides to MBA without CAT in India and in Delhi NCR.",
  },
  {
    q: "Do you guarantee admission or placements?",
    a: "No. Admission depends on your score, category, seats and each college's rules, and placements depend on the college, the year and your own performance. CampusLelo helps you choose well and apply correctly.",
  },
  {
    q: "How do I pay for the video session?",
    a: `You send a request first. We confirm the slot on WhatsApp and then send a secure payment link for ₹${VIDEO_PRICE_INR}. Nothing is charged on this website.`,
  },
  {
    q: "Which cities do you cover for MBA counselling?",
    a: "We have sourced MBA admission data for Pune, Delhi, Noida, Greater Noida, Gurugram and Ghaziabad, and our counsellors also help with programmes in other cities. Tell us your preferred location in the request.",
  },
  {
    q: "What happens to my phone number and details?",
    a: "We use them only to contact you about counselling, and share them only with a college or counsellor you ask about. You tick a consent box before sending, and you can withdraw consent or ask us to erase your data at any time by emailing grievance@campuslelo.com. See our Privacy Notice.",
  },
]
