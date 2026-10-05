import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { TrendingUp, Building2, GraduationCap, IndianRupee, ChevronRight, BarChart3, Star, Users } from "lucide-react"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "College Placements in Pune 2026 | Highest Package & Average Salary Data",
  description: "Placement data for top Pune colleges 2026 — COEP, SIBM, Symbiosis, MIT-WPU, VIT Pune. Highest & average packages, top recruiters, placement % by stream. Real verified data.",
  path: "/placements",
  keywords: [
    "pune college placements 2026",
    "highest package pune college",
    "average salary engineering colleges pune",
    "mba placement pune 2026",
    "coep placement 2026",
    "sibm placement data",
    "symbiosis placement 2026",
    "mit wpu placement package",
    "vit pune placement record",
    "best placement colleges pune",
    "it companies hiring pune colleges",
    "campus placement pune 2026",
  ],
})

export const revalidate = 3600

const placementData = [
  {
    college: "SIBM Pune (Symbiosis Institute of Business Management)",
    stream: "MBA",
    nirf: 8,
    batch: "2024",
    highestCTC: "85 LPA",
    averageCTC: "24 LPA",
    medianCTC: "22 LPA",
    placementPct: "100%",
    topRecruiters: ["Goldman Sachs", "Deutsche Bank", "McKinsey", "Deloitte", "KPMG", "Amazon"],
    topSectors: ["Consulting", "BFSI", "IT", "FMCG"],
    slug: "symbiosis-institute-of-business-management-sibm",
    tier: 1,
  },
  {
    college: "SCMHRD (Symbiosis Centre for Management & HRD)",
    stream: "MBA",
    nirf: 22,
    batch: "2024",
    highestCTC: "47 LPA",
    averageCTC: "19 LPA",
    medianCTC: "17.5 LPA",
    placementPct: "100%",
    topRecruiters: ["Accenture", "TCS", "Wipro", "HDFC Bank", "Bajaj Finserv"],
    topSectors: ["IT Services", "BFSI", "Consulting", "HR"],
    slug: "scmhrd-symbiosis-centre-management-hrd",
    tier: 1,
  },
  {
    college: "COEP Technological University",
    stream: "Engineering",
    nirf: 61,
    batch: "2024",
    highestCTC: "54 LPA",
    averageCTC: "12 LPA",
    medianCTC: "10 LPA",
    placementPct: "95%",
    topRecruiters: ["Google", "Microsoft", "Qualcomm", "NVIDIA", "Amazon", "Persistent"],
    topSectors: ["Software / IT", "Core Engineering", "VLSI", "Embedded"],
    slug: "college-of-engineering-pune-coep",
    tier: 1,
  },
  {
    college: "VIT Pune (Vishwakarma Institute of Technology)",
    stream: "Engineering",
    nirf: 101,
    batch: "2024",
    highestCTC: "42 LPA",
    averageCTC: "9.5 LPA",
    medianCTC: "8 LPA",
    placementPct: "93%",
    topRecruiters: ["Infosys", "TCS", "Wipro", "Capgemini", "L&T", "Persistent"],
    topSectors: ["IT Services", "Product", "Core Engineering"],
    slug: "vishwakarma-institute-of-technology-vit-pune",
    tier: 1,
  },
  {
    college: "MIT World Peace University (MIT-WPU)",
    stream: "Engineering / MBA",
    nirf: null,
    batch: "2024",
    highestCTC: "38 LPA",
    averageCTC: "8.5 LPA",
    medianCTC: "7.2 LPA",
    placementPct: "91%",
    topRecruiters: ["Infosys", "Cognizant", "Capgemini", "Bajaj Auto", "Tata Motors"],
    topSectors: ["IT", "Automobile", "Manufacturing"],
    slug: "mit-world-peace-university-mitwpu",
    tier: 2,
  },
  {
    college: "Cummins College of Engineering for Women",
    stream: "Engineering",
    nirf: null,
    batch: "2024",
    highestCTC: "32 LPA",
    averageCTC: "8 LPA",
    medianCTC: "7 LPA",
    placementPct: "94%",
    topRecruiters: ["Persistent", "KPIT", "Cummins India", "Infosys", "Wipro"],
    topSectors: ["IT", "Automobile", "Manufacturing"],
    slug: "cummins-college-of-engineering-pune",
    tier: 1,
  },
  {
    college: "PUMBA (Pune University MBA)",
    stream: "MBA",
    nirf: null,
    batch: "2024",
    highestCTC: "18 LPA",
    averageCTC: "8.5 LPA",
    medianCTC: "7.5 LPA",
    placementPct: "98%",
    topRecruiters: ["HDFC Bank", "ICICI Bank", "Bajaj Finserv", "TCS", "Infosys"],
    topSectors: ["BFSI", "IT", "Retail", "Operations"],
    slug: "pumba-pune-university-mba",
    tier: 2,
  },
  {
    college: "Pimpri Chinchwad College of Engineering (PCCOE)",
    stream: "Engineering",
    nirf: null,
    batch: "2024",
    highestCTC: "28 LPA",
    averageCTC: "7 LPA",
    medianCTC: "6 LPA",
    placementPct: "88%",
    topRecruiters: ["Infosys", "TCS", "Wipro", "Capgemini", "KPIT"],
    topSectors: ["IT Services", "Automobile", "Manufacturing"],
    slug: "pimpri-chinchwad-college-engineering-pccoe",
    tier: 2,
  },
]

const streamStats = [
  { stream: "MBA",         avgCTC: "₹8–24 LPA", highestCTC: "₹85 LPA", topRecruiters: "Goldman Sachs, McKinsey, Deloitte",         color: "bg-blue-50 text-blue-800 border-blue-200" },
  { stream: "Engineering", avgCTC: "₹7–12 LPA", highestCTC: "₹54 LPA", topRecruiters: "Google, Microsoft, NVIDIA, Qualcomm",       color: "bg-orange-50 text-orange-800 border-orange-200" },
  { stream: "BBA / BCA",   avgCTC: "₹4–7 LPA",  highestCTC: "₹15 LPA", topRecruiters: "TCS, Infosys, Wipro, Cognizant",            color: "bg-green-50 text-green-800 border-green-200" },
  { stream: "Law",         avgCTC: "₹5–10 LPA", highestCTC: "₹20 LPA", topRecruiters: "Top Law Firms, LPO, In-house Legal",        color: "bg-purple-50 text-purple-800 border-purple-200" },
]

const faqs = [
  { question: "Which Pune college has the highest placement package?", answer: "SIBM Pune has the highest placement package among Pune colleges — ₹85 LPA (2024 batch). For engineering, COEP Pune leads with ₹54 LPA highest package from companies like Google and Qualcomm. In both cases these are exceptional offers; the average packages are ₹24 LPA (SIBM) and ₹12 LPA (COEP)." },
  { question: "What is the average placement package at engineering colleges in Pune?", answer: "Average placement packages at top Pune engineering colleges: COEP ₹12 LPA, VIT Pune ₹9.5 LPA, Cummins College ₹8 LPA, MIT-WPU ₹8.5 LPA, PCCOE ₹7 LPA. IT companies like Infosys, TCS, Wipro hire in bulk at ₹4–7 LPA; product companies hire selectively at ₹20–54 LPA." },
  { question: "Which companies hire from Pune MBA colleges?", answer: "Top Pune MBA recruiters: Goldman Sachs, Deutsche Bank, Barclays (from SIBM); McKinsey, BCG, Bain (from SIBM/SCMHRD); HDFC Bank, ICICI, Axis Bank (from SIBM, SCMHRD, PUMBA); Amazon, Flipkart, Myntra (e-commerce roles); Deloitte, KPMG, EY, PwC (consulting from all top colleges)." },
  { question: "What is the placement rate at Symbiosis colleges in Pune?", answer: "SIBM Pune and SCMHRD both achieve 100% placement consistently. SIOM and SITM typically achieve 95–98% placement. All Symbiosis institutes conduct structured placement processes with pre-placement talks, mock GDs and final drives." },
  { question: "How do I compare placement data across Pune colleges?", answer: "Use CampusLelo's free College Comparator tool to compare NIRF rankings, average CTC, highest CTC, placement %, top recruiters and sector data side-by-side for any two or more Pune colleges. Our data is verified from official NIRF disclosures and college placement reports." },
]

export default function PlacementsPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Placements", url: "/placements" },
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
              <span className="text-gray-600 font-medium">Placements</span>
            </nav>
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#E0170F" }}>— VERIFIED PLACEMENT DATA</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#011B40" }}>
                College Placements in Pune 2026
              </h1>
              <p className="text-base text-gray-500 mb-6">
                Real, verified placement data for top Pune colleges — highest & average CTC, top recruiters, placement percentage and sector breakdown. Updated for 2024–25 batch.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                {[
                  { val: "₹85 LPA", label: "Highest CTC (SIBM)" },
                  { val: "100%",    label: "SIBM/SCMHRD Placement" },
                  { val: "₹54 LPA",label: "Highest Engineering (COEP)" },
                  { val: "50+",     label: "Top Recruiters" },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-lg font-bold" style={{ color: "#E0170F" }}>{s.val}</span>
                    <span className="text-gray-500 text-xs">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stream overview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#011B40" }}>Placement Overview by Stream</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {streamStats.map(s => (
              <div key={s.stream} className={`rounded-2xl p-4 border ${s.color}`}>
                <p className="font-bold mb-1">{s.stream}</p>
                <p className="text-sm font-semibold mb-0.5">Avg: {s.avgCTC}</p>
                <p className="text-xs opacity-80 mb-2">Highest: {s.highestCTC}</p>
                <p className="text-xs opacity-70 leading-snug">{s.topRecruiters}</p>
              </div>
            ))}
          </div>
        </section>

        {/* College placement table */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{ color: "#011B40" }}>College-wise Placement Data 2024</h2>
            <Link href="/compare" className="text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color: "#E0170F" }}>
              Compare Colleges →
            </Link>
          </div>

          <div className="space-y-4">
            {placementData.map((p, i) => (
              <div key={p.slug} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-400">#{i + 1}</span>
                      {p.nirf && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">NIRF #{p.nirf}</span>}
                      {p.tier === 1 && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                    </div>
                    <Link href={`/colleges/${p.slug}`}>
                      <h3 className="text-base font-bold hover:text-orange-500 transition-colors mb-1" style={{ color: "#011B40" }}>{p.college}</h3>
                    </Link>
                    <p className="text-xs text-gray-400 mb-3">{p.stream} • {p.batch} batch</p>

                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {[
                        { label: "Highest CTC",   value: p.highestCTC,    icon: TrendingUp },
                        { label: "Average CTC",   value: p.averageCTC,    icon: BarChart3 },
                        { label: "Median CTC",    value: p.medianCTC,     icon: IndianRupee },
                        { label: "Placement %",   value: p.placementPct,  icon: Users },
                      ].map(stat => (
                        <div key={stat.label} className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(224, 23, 15,0.1)" }}>
                            <stat.icon className="w-3.5 h-3.5" style={{ color: "#E0170F" }} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">{stat.label}</p>
                            <p className="text-sm font-bold" style={{ color: "#011B40" }}>{stat.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recruiters */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Top Recruiters</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.topRecruiters.map(r => (
                          <span key={r} className="px-2.5 py-0.5 rounded-full text-xs bg-gray-50 text-gray-600 border border-gray-200">{r}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col gap-2 sm:items-end flex-shrink-0">
                    <Link href={`/colleges/${p.slug}`}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white text-center transition-opacity hover:opacity-90"
                      style={{ background: "#E0170F" }}>
                      View College
                    </Link>
                    <Link href="/compare"
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-center transition-colors hover:bg-gray-100"
                      style={{ border: "1.5px solid #E5E9F0", color: "#012858" }}>
                      Compare
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5" style={{ background: "#011B40" }}>
            <div>
              <GraduationCap className="w-8 h-8 mb-2" style={{ color: "#E0170F" }} />
              <h2 className="text-xl font-bold text-white mb-1">Get Personalised Placement Guidance</h2>
              <p className="text-sm text-gray-300">Our counsellors help you choose the right college based on your target placement package and sector.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/counselling"
                className="px-6 py-3 rounded-xl text-sm font-bold text-white text-center transition-opacity hover:opacity-90"
                style={{ background: "#E0170F" }}>
                Free Counselling
              </Link>
              <Link href="/compare"
                className="px-6 py-3 rounded-xl text-sm font-bold text-center transition-colors hover:bg-white/10"
                style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "white" }}>
                Compare Colleges
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#011B40" }}>Placement FAQs</h2>
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
