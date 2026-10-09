import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { CheckCircle2, ChevronRight, Calendar, FileText, GraduationCap, Building2, BookOpen, AlertCircle, IndianRupee, Users, BarChart3 } from "lucide-react"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "Pune College Admission Guide 2026 | Step-by-Step Process for All Streams",
  description: "Complete admission guide for Pune colleges 2026 — Engineering (MHT-CET/JEE), MBA (CAT/SNAP), Medical (NEET), Law (CLAT). Eligibility, dates, documents & fees. Free counselling.",
  path: "/admission-guide",
  keywords: [
    "pune college admission guide 2026",
    "how to get admission in pune college",
    "engineering admission pune 2026",
    "mba admission pune 2026",
    "mht-cet admission process pune",
    "cap round pune 2026",
    "pune college admission process",
    "documents required college admission pune",
    "admission cutoff pune colleges 2026",
    "direct admission pune engineering college",
    "management quota pune college admission",
    "pune university affiliated colleges admission",
  ],
})

export const revalidate = 3600

const streams = [
  {
    id: "engineering",
    name: "Engineering (B.Tech / B.E.)",
    icon: Building2,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    accent: "#3B82F6",
    exams: ["MHT-CET (PCM)", "JEE Main", "JEE Advanced"],
    eligibility: "12th (PCM) with minimum 50% (45% for reserved). Maharashtra domicile required for state quota.",
    seats: "Merit seats (80%) via MHT-CET/JEE. Management quota (20%) — direct admission.",
    keyDates: [
      { event: "MHT-CET Registration",      date: "Feb–March 2026" },
      { event: "MHT-CET PCM Exam",           date: "April–May 2026" },
      { event: "MHT-CET Result",             date: "June 2026" },
      { event: "CAP Round 1",                date: "July 2026" },
      { event: "CAP Round 2",                date: "August 2026" },
      { event: "Direct Admission Deadline",  date: "September 2026" },
    ],
    steps: [
      "Clear MHT-CET (PCM) or JEE Main with a good percentile",
      "Register on the DTE Maharashtra CAP portal",
      "Fill preferences in order of priority (college + branch)",
      "Attend document verification at Facilitation Centre",
      "Accept allotment and pay seat acceptance fees",
      "Report to college and complete enrollment",
    ],
    topColleges: [
      { name: "COEP Pune",   href: "/colleges/coep-college-of-engineering-pune", cutoff: "98.5+ percentile" },
      { name: "VIT Pune",    href: "/colleges/vit-pune-vishwakarma-institute-of-technology", cutoff: "90+ percentile" },
      { name: "MIT-WPU",     href: "/colleges/mit-wpu-mit-world-peace-university", cutoff: "85+ percentile" },
      { name: "Cummins",     href: "/colleges/cummins-college-of-engineering-pune", cutoff: "88+ percentile" },
    ],
    fees: "₹1.5L – ₹4.5L per year (government approved). Management quota: ₹3L – ₹8L per year.",
  },
  {
    id: "mba",
    name: "MBA / PGDM",
    icon: GraduationCap,
    color: "bg-orange-50 text-orange-700 border-orange-200",
    accent: "#E0170F",
    exams: ["CAT", "SNAP", "MAH-MBA-CET", "CMAT", "XAT"],
    eligibility: "Graduation in any stream with minimum 50% (45% for reserved). Final year students can also apply.",
    seats: "Most Pune MBA colleges accept CAT + MAH-CET + SNAP scores. Each college has its own cutoff.",
    keyDates: [
      { event: "CAT 2026 Notification",      date: "July 2026" },
      { event: "SNAP 2026 Registration",     date: "August 2026" },
      { event: "MAH-MBA-CET 2026",           date: "March 2026" },
      { event: "SNAP Exam",                  date: "December 2026" },
      { event: "SIBM / SCMHRD GD-PI",       date: "Jan–Feb 2027" },
      { event: "PUMBA Admission",            date: "May–June 2026" },
    ],
    steps: [
      "Appear for CAT (for IIMs, SIBM, SCMHRD) and/or SNAP (for Symbiosis) and MAH-MBA-CET (for PUMBA, DY Patil)",
      "Apply separately to each college with score + application form",
      "Clear Written Ability Test (WAT) and Group Discussion (GD)",
      "Attend Personal Interview (PI) at the college",
      "Receive admission offer and pay acceptance fees",
      "Complete document verification and enrollment",
    ],
    topColleges: [
      { name: "SIBM Pune",  href: "/colleges/sibm-symbiosis-institute-business-management-pune", cutoff: "CAT 98%ile / SNAP 98+" },
      { name: "SCMHRD",     href: "/colleges/scmhrd-symbiosis-centre-management-hrd", cutoff: "CAT 95%ile / SNAP 95+" },
      { name: "PUMBA",      href: "/mba-in-pune", cutoff: "MAH-MBA-CET 95+ %ile" },
      { name: "MIT-SOM",    href: "/mba-in-pune", cutoff: "CAT 70+ %ile" },
    ],
    fees: "SIBM ₹24.5L total. SCMHRD ₹20L total. PUMBA ₹2.5L total (Government). MIT-SOM ₹14L total.",
  },
  {
    id: "medical",
    name: "Medical (MBBS / BDS)",
    icon: BookOpen,
    color: "bg-red-50 text-red-700 border-red-200",
    accent: "#EF4444",
    exams: ["NEET UG"],
    eligibility: "12th (PCB) with 50%+ (40% for reserved). Age 17+ on 31 Dec 2026. NEET is mandatory.",
    seats: "State quota via MCC counselling. Maharashtra state quota via DMER Maharashtra.",
    keyDates: [
      { event: "NEET UG 2026 Exam",         date: "May 2026" },
      { event: "NEET Result",               date: "June 2026" },
      { event: "MCC Round 1 Counselling",   date: "July 2026" },
      { event: "MCC Round 2 Counselling",   date: "August 2026" },
      { event: "State Quota Round 1",       date: "August 2026" },
      { event: "Mop-up Round",              date: "September 2026" },
    ],
    steps: [
      "Appear for NEET UG 2026 and secure a high score (700+ for government MBBS)",
      "Register on MCC counselling portal for All India Quota seats",
      "Register on DMER Maharashtra portal for state quota seats",
      "Fill college and course preferences",
      "Attend document verification and pay admission fees",
      "Report to allotted college and complete enrollment",
    ],
    topColleges: [
      { name: "BJ Medical College",       href: "/colleges?stream=Medical", cutoff: "NEET 650+ (Govt)" },
      { name: "Armed Forces Medical",     href: "/colleges?stream=Medical", cutoff: "NEET 620+" },
      { name: "DY Patil Medical",         href: "/colleges?stream=Medical", cutoff: "NEET 450+ (Private)" },
      { name: "Bharati Vidyapeeth Med",   href: "/colleges?stream=Medical", cutoff: "NEET 500+ (Private)" },
    ],
    fees: "Government MBBS: ₹40K–1L/yr. Private MBBS: ₹12L–25L/yr.",
  },
  {
    id: "law",
    name: "Law (LLB / BA LLB)",
    icon: FileText,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    accent: "#8B5CF6",
    exams: ["CLAT", "AILET", "MH-CET Law"],
    eligibility: "5-year BA LLB: 12th pass 45%+. 3-year LLB: Graduation with 45%+.",
    seats: "National Law Schools via CLAT. State law colleges via MH-CET Law. ILS Pune & SLS Pune are top Pune options.",
    keyDates: [
      { event: "CLAT 2026 Notification",   date: "January 2026" },
      { event: "MH-CET Law Registration",  date: "February 2026" },
      { event: "CLAT Exam",                date: "December 2026" },
      { event: "MH-CET Law Exam",          date: "April 2026" },
      { event: "MH-CET Law CAP Round 1",  date: "June 2026" },
      { event: "SLS/ILS Admission",        date: "July 2026" },
    ],
    steps: [
      "Appear for CLAT (for NLUs) or MH-CET Law (for Maharashtra law colleges)",
      "Apply to Symbiosis Law School (SLS) separately — SLAT exam required",
      "Apply to ILS Pune, DY Patil Law based on MH-CET Law score",
      "Attend GD/PI at private law colleges (SLS, DSNLU)",
      "Accept seat allotment and pay fees",
      "Submit documents and complete enrollment",
    ],
    topColleges: [
      { name: "Symbiosis Law School (SLS)", href: "/law-colleges-pune", cutoff: "SLAT + CLAT" },
      { name: "ILS Law College",            href: "/law-colleges-pune", cutoff: "MH-CET Law 80%ile" },
      { name: "DY Patil Law College",       href: "/law-colleges-pune", cutoff: "MH-CET Law 70%ile" },
      { name: "MAEER MIT Law School",       href: "/law-colleges-pune", cutoff: "MH-CET Law 65%ile" },
    ],
    fees: "ILS/DY Patil: ₹40K–1.5L/yr. SLS Pune: ₹4L–6L/yr.",
  },
]

const documents = [
  "10th Marksheet & Certificate (SSC)",
  "12th Marksheet & Certificate (HSC)",
  "Leaving Certificate from last school/college",
  "Caste Certificate (if SC/ST/OBC/NT/SBC)",
  "Non-Creamy Layer Certificate (for OBC/NT)",
  "EWS Certificate (for EWS category)",
  "Aadhaar Card (original + 2 copies)",
  "Passport size photographs (8–10 copies)",
  "Entrance Exam Scorecard (MHT-CET / NEET / CAT / SNAP / CLAT)",
  "Domicile Certificate (Maharashtra)",
  "Migration Certificate (if from another state/board)",
  "Medical Fitness Certificate",
]

const faqs = [
  { question: "What is the CAP Round process for Pune engineering admissions?", answer: "CAP (Centralized Admission Process) is the official DTE Maharashtra process for engineering admissions. Students register online, fill preferences, get allotted a college based on MHT-CET/JEE percentile and category, verify documents, and pay fees to confirm the seat. There are typically 2 main rounds + 1 mop-up round. Cutoffs vary every year based on state merit." },
  { question: "Can I get direct admission in Pune engineering colleges without MHT-CET?", answer: "Yes — management quota seats (typically 20% of total intake) allow direct admission without going through CAP rounds. These seats have higher fees but no CET requirement. Some colleges also offer admission through JEE Main score under the institute quota. Call +91 77538 31118 for direct admission assistance." },
  { question: "What documents are required for college admission in Pune?", answer: "Standard documents: 10th & 12th marksheets, Leaving Certificate, Aadhaar Card, caste/category certificate if applicable, entrance exam scorecard (MHT-CET/NEET/CAT etc.), Domicile Certificate, and passport photographs. Some colleges also require a Medical Fitness Certificate and Migration Certificate for students from other states/boards." },
  { question: "What is the eligibility for MBA admission in Pune without CAT?", answer: "MBA in Pune without CAT: You can get MBA admission using MAH-MBA-CET (for PUMBA, DY Patil MBA, Indira College etc.) or SNAP (for all Symbiosis institutes). CMAT and MAT scores are also accepted by many private MBA colleges. PUMBA is the most sought-after non-CAT option with government fees (₹1.25L/year)." },
  { question: "How do I apply for admission to Symbiosis colleges in Pune?", answer: "Symbiosis admissions follow their own process: (1) Register on SET (Symbiosis Entrance Test) portal for UG courses or SNAP for MBA; (2) Appear for the respective entrance test; (3) Clear the Written Ability Test (WAT) + Personal Interview (PI) at your chosen Symbiosis institute; (4) Receive offer letter and pay fees. Each Symbiosis institute (SIBM, SCMHRD, SIC, SLS, SIT) has separate cutoffs." },
]

export default function AdmissionGuidePage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Admission Guide", url: "/admission-guide" },
  ])
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />

      <div className="min-h-screen bg-[#F6F8FB]">

        {/* Hero */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-5">
              <Link href="/" className="hover:text-orange-500">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600 font-medium">Admission Guide</span>
            </nav>
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#E0170F" }}>— COMPLETE 2026 GUIDE</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#011B40" }}>
                Pune College Admission Guide 2026
              </h1>
              <p className="text-base text-gray-500 mb-6">
                Step-by-step admission process for Engineering, MBA, Medical and Law colleges in Pune — eligibility, exam dates, CAP rounds, documents and direct admission options.
              </p>
              <div className="flex flex-wrap gap-3">
                {streams.map(s => (
                  <a key={s.id} href={`#${s.id}`}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-opacity hover:opacity-80 ${s.color}`}>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stream sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          {streams.map(stream => {
            const Icon = stream.icon
            return (
              <div key={stream.id} id={stream.id} className="scroll-mt-24">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold border mb-4 ${stream.color}`}>
                  <Icon className="w-4 h-4" />
                  {stream.name}
                </div>

                <div className="grid lg:grid-cols-3 gap-5">
                  {/* Main content */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Overview */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100">
                      <h2 className="text-lg font-bold mb-3" style={{ color: "#011B40" }}>Eligibility & Process</h2>
                      <div className="space-y-3 text-sm text-gray-600">
                        <p><span className="font-semibold" style={{ color: "#012858" }}>Eligibility:</span> {stream.eligibility}</p>
                        <p><span className="font-semibold" style={{ color: "#012858" }}>Entrance Exams:</span> {stream.exams.join(", ")}</p>
                        <p><span className="font-semibold" style={{ color: "#012858" }}>Seat Types:</span> {stream.seats}</p>
                        <p><span className="font-semibold" style={{ color: "#012858" }}>Fee Range:</span> {stream.fees}</p>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100">
                      <h3 className="font-bold mb-4" style={{ color: "#011B40" }}>Admission Process — Step by Step</h3>
                      <ol className="space-y-3">
                        {stream.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm text-gray-600">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5" style={{ background: stream.accent }}>
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Top colleges */}
                    <div className="bg-white rounded-2xl p-5 border border-gray-100">
                      <h3 className="font-bold mb-3" style={{ color: "#011B40" }}>Top Pune Colleges — Cutoffs 2025</h3>
                      <div className="space-y-2">
                        {stream.topColleges.map((c, i) => (
                          <Link key={i} href={c.href}
                            className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 group">
                            <span className="text-sm font-medium group-hover:text-orange-500 transition-colors" style={{ color: "#012858" }}>{c.name}</span>
                            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">{c.cutoff}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key dates */}
                  <div>
                    <div className="bg-white rounded-2xl p-5 border border-gray-100 sticky top-24">
                      <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "#011B40" }}>
                        <Calendar className="w-4 h-4" style={{ color: "#E0170F" }} />
                        Key Dates 2026
                      </h3>
                      <div className="space-y-3">
                        {stream.keyDates.map((d, i) => (
                          <div key={i} className="flex flex-col gap-0.5 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                            <span className="text-xs font-semibold" style={{ color: "#E0170F" }}>{d.date}</span>
                            <span className="text-sm" style={{ color: "#012858" }}>{d.event}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/counselling"
                        className="mt-4 block text-center py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
                        style={{ background: "#E0170F" }}>
                        Get Admission Help
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Documents checklist */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="bg-white rounded-2xl p-5 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(224, 23, 15,0.1)" }}>
                <FileText className="w-5 h-5" style={{ color: "#E0170F" }} />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: "#011B40" }}>Documents Checklist — Pune College Admissions</h2>
                <p className="text-sm text-gray-500">Required documents for all streams</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-gray-50">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#22C55E" }} />
                  <span className="text-sm" style={{ color: "#012858" }}>{doc}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-orange-50 border border-orange-200">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-600" />
              <p className="text-sm text-orange-700">Always carry originals + 3 self-attested photocopies of each document. Some colleges require more — verify with the college before your admission date.</p>
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#011B40" }}>Useful Admission Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "College Predictor",      desc: "Find colleges by your MHT-CET / JEE / NEET score",  href: "/predictor",      icon: GraduationCap, bg: "bg-blue-50 text-blue-700" },
              { title: "Compare Colleges",       desc: "Compare fees, cutoffs and placements side-by-side",  href: "/compare",        icon: BarChart3,     bg: "bg-green-50 text-green-700" },
              { title: "Fees Calculator",        desc: "Estimate total course fees including hostel",         href: "/pune-college-fees-calculator", icon: IndianRupee, bg: "bg-orange-50 text-orange-700" },
              { title: "Free Counselling",       desc: "Talk to an expert — free on WhatsApp",               href: "/counselling",    icon: Users,         bg: "bg-purple-50 text-purple-700" },
            ].map(card => {
              const Icon = card.icon
              return (
                <Link key={card.href} href={card.href}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.bg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold mb-1 group-hover:text-orange-500 transition-colors" style={{ color: "#011B40" }}>{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-snug">{card.desc}</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#011B40" }}>Admission FAQs</h2>
          <div className="space-y-4 max-w-3xl">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-semibold mb-2" style={{ color: "#011B40" }}>{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
