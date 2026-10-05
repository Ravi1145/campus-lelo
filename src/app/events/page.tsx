import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { Calendar, MapPin, Clock, ExternalLink, ChevronRight, Bell, GraduationCap, Building2, FileText } from "lucide-react"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "Pune College Events 2026 | Admission Open Days, Fests & Education Expos",
  description: "Upcoming college events in Pune 2026 — open days, admission counselling, tech fests, MBA events, entrance exam dates & education fairs. Stay updated with CampusLelo.",
  path: "/events",
  keywords: [
    "pune college events 2026",
    "college admission open day pune",
    "education fair pune 2026",
    "pune college fest 2026",
    "mba admission events pune",
    "engineering college open house pune",
    "college counselling events pune",
    "symbiosis open day 2026",
    "mit pune events",
    "pune college admission dates 2026",
  ],
})

export const revalidate = 3600

const upcomingEvents = [
  {
    id: 1,
    title: "Symbiosis International University — Open Day 2026",
    college: "Symbiosis International University",
    type: "Open Day",
    date: "2026-03-15",
    displayDate: "15 March 2026",
    time: "10:00 AM – 4:00 PM",
    venue: "SIU Campus, Lavale, Pune",
    description: "Explore all Symbiosis institutes — SIBM, SCMHRD, SITM, SIOM and more. Campus tours, faculty interaction, scholarship info & direct admission counselling.",
    streams: ["MBA", "Engineering", "Law", "Design", "Media"],
    registrationLink: "https://siu.edu.in",
    isFeatured: true,
    category: "open-day",
  },
  {
    id: 2,
    title: "MIT-WPU Admission Counselling Day 2026",
    college: "MIT World Peace University",
    type: "Admission Counselling",
    date: "2026-03-20",
    displayDate: "20 March 2026",
    time: "9:00 AM – 5:00 PM",
    venue: "Kothrud Campus, Pune",
    description: "Meet MIT-WPU admission counsellors, understand cutoffs, fee structure, scholarship options and hostel facilities across all B.Tech, MBA and BBA programmes.",
    streams: ["Engineering", "MBA", "BBA", "Design"],
    registrationLink: "https://mitwpu.edu.in",
    isFeatured: true,
    category: "counselling",
  },
  {
    id: 3,
    title: "MHT-CET 2026 Exam — Paper 1 (PCM)",
    college: "State CET Cell Maharashtra",
    type: "Entrance Exam",
    date: "2026-04-15",
    displayDate: "April 2026",
    time: "All Day",
    venue: "Exam Centres Across Maharashtra",
    description: "Maharashtra CET 2026 for B.Tech/B.E. admission. MHT-CET PCM paper — qualifying exam for all Maharashtra engineering colleges including COEP, VIT Pune, MIT-WPU.",
    streams: ["Engineering", "Pharmacy"],
    registrationLink: "/exams/mht-cet",
    isFeatured: false,
    category: "exam",
  },
  {
    id: 4,
    title: "Pune Education Fair 2026",
    college: "Multiple Colleges",
    type: "Education Fair",
    date: "2026-04-05",
    displayDate: "5–6 April 2026",
    time: "10:00 AM – 6:00 PM",
    venue: "Pune International Exhibition Centre (PIEC), Nagar Road",
    description: "Meet 80+ Pune colleges under one roof. Compare B.Tech, MBA, BBA, BCA, Law, Design programmes. Spot admissions, scholarship announcements & expert counselling.",
    streams: ["All Streams"],
    registrationLink: "#register",
    isFeatured: true,
    category: "fair",
  },
  {
    id: 5,
    title: "COEP Techfiesta 2026 — Annual Tech Fest",
    college: "College of Engineering Pune (COEP)",
    type: "Tech Fest",
    date: "2026-02-28",
    displayDate: "28 Feb – 2 Mar 2026",
    time: "9:00 AM – 9:00 PM",
    venue: "COEP Campus, Shivajinagar, Pune",
    description: "Maharashtra's premier engineering college annual tech festival. Robotics, hackathons, paper presentations, cultural events and 10,000+ student participation.",
    streams: ["Engineering"],
    registrationLink: "https://coep.org.in",
    isFeatured: false,
    category: "fest",
  },
  {
    id: 6,
    title: "CAT 2026 Notification & Registration",
    college: "IIM",
    type: "Entrance Exam",
    date: "2026-07-15",
    displayDate: "July–September 2026",
    time: "—",
    venue: "Online Registration",
    description: "CAT 2026 registration window. Required for admission to IIMs and top MBA colleges including SIBM Pune, SCMHRD. Start your CAT prep early for Pune MBA seats.",
    streams: ["MBA"],
    registrationLink: "/exams/cat",
    isFeatured: false,
    category: "exam",
  },
  {
    id: 7,
    title: "VIT Pune — Admission Open House 2026",
    college: "Vishwakarma Institute of Technology",
    type: "Open Day",
    date: "2026-03-28",
    displayDate: "28 March 2026",
    time: "10:00 AM – 3:00 PM",
    venue: "VIT Campus, Bibwewadi, Pune",
    description: "VIT Pune open day for B.Tech admissions. Lab tours, placement data presentation, faculty Q&A and direct interaction with current students.",
    streams: ["Engineering"],
    registrationLink: "https://vit.edu",
    isFeatured: false,
    category: "open-day",
  },
  {
    id: 8,
    title: "SNAP 2026 — Symbiosis National Aptitude Test",
    college: "Symbiosis International University",
    type: "Entrance Exam",
    date: "2026-12-15",
    displayDate: "December 2026",
    time: "All Day",
    venue: "Online Test Centres",
    description: "SNAP 2026 for MBA admission to SIBM Pune, SCMHRD, SIOM, SITM and 15 Symbiosis institutes. One of India's top MBA entrance exams with 80,000+ aspirants.",
    streams: ["MBA"],
    registrationLink: "/exams/snap",
    isFeatured: false,
    category: "exam",
  },
]

const categoryColors: Record<string, string> = {
  "open-day":   "bg-blue-50 text-blue-700 border-blue-200",
  "counselling":"bg-green-50 text-green-700 border-green-200",
  "exam":       "bg-orange-50 text-orange-700 border-orange-200",
  "fair":       "bg-purple-50 text-purple-700 border-purple-200",
  "fest":       "bg-red-50 text-red-700 border-red-200",
}

const faqs = [
  { question: "When do Pune college admissions open for 2026?", answer: "Most Pune college admissions for 2026 open between March and June. Engineering admissions via MHT-CET/JEE open in April–May. MBA admissions via CAT/SNAP/MAH-MBA-CET open January–April. Degree colleges open in June–July after HSC results." },
  { question: "Which are the biggest college events in Pune in 2026?", answer: "Major Pune college events in 2026 include: Symbiosis Open Day (March), Pune Education Fair (April), COEP Techfiesta (Feb–March), MIT-WPU Counselling Day (March), and TechIgnite at VIT Pune. These events are ideal for meeting college representatives directly." },
  { question: "How can I register for Pune college open days?", answer: "Most Pune college open days require prior registration on the college website. You can also WhatsApp CampusLelo at +91 77538 31118 for direct registration assistance and reminders before each event." },
  { question: "What is the Pune Education Fair and when does it happen?", answer: "The Pune Education Fair is an annual event where 80+ colleges from Pune set up stalls for student interaction. It typically happens in March–April at Pune International Exhibition Centre (Nagar Road). Students can compare colleges, get spot admission info and collect brochures." },
  { question: "Are there MBA-specific events in Pune in 2026?", answer: "Yes — SNAP 2026 (December), CAT 2026 (November), MAH-MBA-CET 2026 (March), Symbiosis Open Day (March) and MIT-SOM counselling events are key MBA events. SIBM and SCMHRD also conduct campus visits for shortlisted candidates after SNAP scores." },
]

export default function EventsPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Events", url: "/events" },
  ])
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />

      <main className="min-h-screen bg-[#F6F8FB]">

        {/* Hero */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-5">
              <Link href="/" className="hover:text-orange-500">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600 font-medium">Events</span>
            </nav>
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#E0170F" }}>— UPCOMING EVENTS</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#011B40" }}>
                Pune College Events 2026
              </h1>
              <p className="text-base text-gray-500 mb-6">
                Open days, admission fairs, entrance exam dates, tech fests and counselling events — everything happening at top Pune colleges in 2026.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Open Day", "Admission Counselling", "Education Fair", "Entrance Exam", "Tech Fest"].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notify banner */}
        <section className="bg-[#011B40]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-white">
              <Bell className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <p className="text-sm font-medium">Get WhatsApp reminders before every Pune college event — free</p>
            </div>
            <a href="https://wa.me/917753831118?text=Hi!%20Please%20send%20me%20Pune%20college%20event%20reminders%20for%202026."
              target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 px-5 py-2 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: "#E0170F" }}>
              Get Event Alerts →
            </a>
          </div>
        </section>

        {/* Events list */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Featured events */}
            <div className="lg:col-span-2 space-y-5">
              <h2 className="text-lg font-bold" style={{ color: "#011B40" }}>All Upcoming Events</h2>

              {upcomingEvents.map(event => (
                <div key={event.id} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {event.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500 text-white">FEATURED</span>
                    )}
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryColors[event.category] ?? "bg-gray-50 text-gray-700 border-gray-200"}`}>
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold mb-1" style={{ color: "#011B40" }}>{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{event.college}</p>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-orange-400" />{event.displayDate}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-orange-400" />{event.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-orange-400" />{event.venue}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{event.description}</p>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {event.streams.map(s => (
                        <span key={s} className="px-2.5 py-0.5 rounded-full text-xs bg-gray-50 text-gray-600 border border-gray-200">{s}</span>
                      ))}
                    </div>
                    <a href={event.registrationLink}
                      target={event.registrationLink.startsWith("http") ? "_blank" : undefined}
                      rel={event.registrationLink.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: "#E0170F" }}>
                      {event.registrationLink.startsWith("http") ? <><ExternalLink className="w-3.5 h-3.5" /> Register</> : "More Info →"}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Quick links */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold mb-4" style={{ color: "#011B40" }}>Key Exam Dates 2026</h3>
                <div className="space-y-3">
                  {[
                    { exam: "MHT-CET PCM", date: "April 2026",    href: "/exams/mht-cet" },
                    { exam: "MAH-MBA-CET", date: "March 2026",    href: "/exams/mah-mba-cet" },
                    { exam: "JEE Main",    date: "Jan & Apr 2026",href: "/exams/jee-main" },
                    { exam: "NEET UG",     date: "May 2026",      href: "/exams/neet" },
                    { exam: "CLAT",        date: "December 2026", href: "/exams/clat" },
                    { exam: "CAT 2026",    date: "November 2026", href: "/exams/cat" },
                    { exam: "SNAP 2026",   date: "December 2026", href: "/exams/snap" },
                  ].map(e => (
                    <Link key={e.exam} href={e.href} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 group">
                      <span className="text-sm font-medium group-hover:text-orange-500 transition-colors" style={{ color: "#012858" }}>{e.exam}</span>
                      <span className="text-xs text-gray-400">{e.date}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-5" style={{ background: "#011B40" }}>
                <GraduationCap className="w-8 h-8 mb-3" style={{ color: "#E0170F" }} />
                <h3 className="font-bold text-white mb-2">Need Admission Guidance?</h3>
                <p className="text-sm text-gray-300 mb-4">Our counsellors help you shortlist colleges, prepare for open days and meet admission deadlines — free.</p>
                <Link href="/counselling"
                  className="block text-center py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#E0170F" }}>
                  Get Free Counselling
                </Link>
              </div>

              {/* Quick navigation */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold mb-4" style={{ color: "#011B40" }}>Related Pages</h3>
                <div className="space-y-2">
                  {[
                    { label: "Admission Guide 2026",     href: "/admission-guide",   icon: FileText },
                    { label: "Placements in Pune",       href: "/placements",        icon: Building2 },
                    { label: "Scholarships 2026",        href: "/scholarships",      icon: GraduationCap },
                    { label: "Entrance Exams",           href: "/exams",             icon: FileText },
                    { label: "College Predictor",        href: "/predictor",         icon: GraduationCap },
                  ].map(e => (
                    <Link key={e.href} href={e.href}
                      className="flex items-center gap-3 py-2 text-sm hover:text-orange-500 transition-colors group"
                      style={{ color: "#012858" }}>
                      <e.icon className="w-4 h-4 text-gray-400 group-hover:text-orange-400 flex-shrink-0" />
                      {e.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#011B40" }}>Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-semibold mb-2" style={{ color: "#011B40" }}>{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
