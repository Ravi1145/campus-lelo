// Homepage questions. One list feeds both the visible FAQ section and the FAQ structured data, so they never drift apart.
// Rules for this file: nothing here may state a fee, cut-off, rank, package or date we have not sourced.
// Where a number matters, the answer points to the page that carries it with its source.
import { VIDEO_PRICE_INR } from "@/data/counselling"

export interface HomeFaq { q: string; a: string }

export const homeFaqs: HomeFaq[] = [
  {
    q: "Which exam do I need for an MBA in Delhi NCR or Noida?",
    a: "It depends on the college. In the programmes we have checked against official pages, CAT is accepted almost everywhere: FMS, IIFT, IMI, MDI, IMT Ghaziabad, BIMTECH and Jaipuria. Several also take XAT, GMAT, CMAT or MAT, and Jaypee Business School in Noida even lists ATMA and CUET-PG. Start with the list for Delhi NCR, then open the college's own admission page before you register for anything.",
  },
  {
    q: "Do MBA colleges publish a cut-off?",
    a: "Some do, most don't. FMS Delhi, IIFT and IIM Kashipur have released shortlist minimums, and Sharda University states minimum percentiles on its admission page. MDI, IMI, IMT, BIMTECH, Jaipuria and IIM Lucknow don't publish a fixed percentile on the pages we checked, so any single number you see for them elsewhere is an estimate. We only print figures a college released itself.",
  },
  {
    q: "Is MBA or PGDM better?",
    a: "Neither is better by default. An MBA is a degree from a university; a PGDM is a diploma from an autonomous institute, usually AICTE approved. What matters more is the college, what it teaches and how it handles placements. If you plan to study abroad or do a PhD later, check how the degree is recognised before you pick a PGDM.",
  },
  {
    q: "How does engineering admission work in Pune?",
    a: "Most seats in Maharashtra go through MHT-CET and the centralised admission process (CAP) run by the State CET Cell. Some institutes also accept JEE Main scores or run their own test. Registration dates and seat rules change every year, so read the current CAP notice instead of trusting last year's blog post, including ours.",
  },
  {
    q: "Where can I find colleges in Noida, Greater Noida, Lucknow or Dehradun?",
    a: "We have pages for each. For MBA and PGDM we checked institutes such as Jaipuria, Jaypee Business School, BIMTECH, Sharda, IIM Lucknow, IIM Kashipur and Graphic Era against their official sites. For other streams the college list is still thinner than we would like, and we say so on the page.",
  },
  {
    q: "How accurate are the fees on CampusLelo?",
    a: "Treat fee ranges as a rough guide. Colleges change fees each year and often by programme, so the only number that counts is the one on the college's own fee page or brochure. We don't show placement packages or NIRF ranks any more, because we couldn't source them. If you spot a mistake, email support@campuslelo.com and we will look at it.",
  },
  {
    q: "What does counselling cost?",
    a: `A counsellor will call or WhatsApp you for free: college information, scholarship pointers and alumni to talk to. If you want a one-to-one video session on CAP rounds, career choice and your shortlist, it costs ₹${VIDEO_PRICE_INR}, and you pay only after we confirm a slot. We can't promise you a seat, and neither can anyone else.`,
  },
  {
    q: "Which scholarships should I look at first?",
    a: "Start with the government schemes: MahaDBT in Maharashtra and the National Scholarship Portal. Eligibility, income limits and deadlines change every year, so check the official portal for your category before you apply. Our scholarship page lists what to look for and where to apply.",
  },
  {
    q: "Where does CampusLelo get its information?",
    a: "From official college and exam-body pages wherever we can, with the link and the date we checked shown next to the fact. When two sources disagree, or we can't confirm something, we leave it out. The editorial policy page explains how we handle corrections.",
  },
]
