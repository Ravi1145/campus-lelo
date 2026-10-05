import { Metadata } from "next"
import Link from "next/link"
import { MapPin, Star, IndianRupee, Trophy, ChevronRight } from "lucide-react"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "Best MBA Colleges in Noida 2026 | CAT, MAT, SNAP | Fees & Placements",
  description: "Top MBA colleges in Noida 2026 — Amity Business School (avg ₹8 LPA), JIIT MBA, Sharda University MBA, Galgotias MBA. CAT/MAT/CMAT admission. Fees ₹2L–8L. Compare placements & cutoffs.",
  path: "/mba-colleges-noida",
  keywords: [
    "mba colleges in noida 2026",
    "best mba college noida",
    "mba admission noida 2026",
    "cat colleges noida",
    "mat cmat colleges noida",
    "amity business school noida mba",
    "mba fees noida 2026",
    "pgdm colleges noida",
    "top mba placement college noida",
    "mba greater noida 2026",
    "mba college near delhi 2026",
  ],
})

const mbaColleges = [
  {
    name: "Amity Business School, Noida",
    slug: "amity-university-noida",
    type: "Private University",
    naac: "A+",
    nirf: 51,
    location: "Sector 125, Noida",
    fees: "₹3.5L–5L total",
    avgPkg: "₹8 LPA",
    highestPkg: "₹22 LPA",
    exams: ["CAT", "MAT", "GMAT", "AMITY JMC"],
    recruiters: ["Deloitte", "KPMG", "Amazon", "Accenture", "EY", "Cognizant", "Wipro", "HUL"],
    rating: 4.2,
    reviews: 980,
    highlight: "Largest MBA campus in Noida — 10,000+ alumni across Fortune 500",
  },
  {
    name: "Jaypee Business School (JIIT Noida)",
    slug: "jaypee-institute-noida",
    type: "Deemed University",
    naac: "A",
    nirf: null,
    location: "Sector 62, Noida",
    fees: "₹4L–5L total",
    avgPkg: "₹7.5 LPA",
    highestPkg: "₹18 LPA",
    exams: ["CAT", "GMAT", "MAT"],
    recruiters: ["Amazon", "Deloitte", "EY", "ICICI Bank", "HDFC", "Wipro", "HCL"],
    rating: 4.1,
    reviews: 620,
    highlight: "Tech-integrated MBA — best for IT + MBA combo in Noida Sector 62",
  },
  {
    name: "Sharda School of Business Studies",
    slug: "sharda-university-noida",
    type: "Private University",
    naac: "A",
    nirf: 101,
    location: "Knowledge Park III, Greater Noida",
    fees: "₹2.4L–3.5L total",
    avgPkg: "₹5.5 LPA",
    highestPkg: "₹14 LPA",
    exams: ["CAT", "MAT", "CMAT", "SUAT"],
    recruiters: ["TCS", "Infosys", "HCL", "Byju's", "Paytm", "Capgemini", "ICICI"],
    rating: 3.9,
    reviews: 750,
    highlight: "Affordable MBA with international exposure — 6,000+ foreign students on campus",
  },
  {
    name: "Galgotias University — MBA",
    slug: "galgotias-university-noida",
    type: "Private University",
    naac: "A",
    nirf: null,
    location: "Yamuna Expressway, Greater Noida",
    fees: "₹2L–3L total",
    avgPkg: "₹4.8 LPA",
    highestPkg: "₹12 LPA",
    exams: ["CAT", "MAT", "CMAT", "CUET PG"],
    recruiters: ["TCS", "Wipro", "HCL", "Cognizant", "Byju's", "Amazon", "Capgemini"],
    rating: 3.8,
    reviews: 580,
    highlight: "Most affordable MBA near Delhi NCR — total fees just ₹2L–3L",
  },
  {
    name: "GL Bajaj Institute of Management & Research",
    slug: "gl-bajaj-noida",
    type: "AICTE Approved",
    naac: "A",
    nirf: null,
    location: "Greater Noida",
    fees: "₹1.8L–2.5L total",
    avgPkg: "₹4.2 LPA",
    highestPkg: "₹10 LPA",
    exams: ["CAT", "MAT", "CMAT", "ATMA"],
    recruiters: ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Mphasis"],
    rating: 3.9,
    reviews: 820,
    highlight: "Best value MBA in Greater Noida — NAAC A, fees under ₹2.5L total",
  },
  {
    name: "Bennett University — MBA",
    slug: "bennett-university-noida",
    type: "Private University",
    naac: "A",
    nirf: null,
    location: "TechZone II, Greater Noida",
    fees: "₹5L–7L total",
    avgPkg: "₹8.5 LPA",
    highestPkg: "₹24 LPA",
    exams: ["CAT", "GMAT", "MAT"],
    recruiters: ["Goldman Sachs", "Deloitte", "EY", "Amazon", "Microsoft", "TCS", "Infosys", "Adobe"],
    rating: 4.3,
    reviews: 320,
    highlight: "Times Group MBA — highest avg placement among new NCR MBA colleges",
  },
]

const faqData = [
  {
    question: "Which is the best MBA college in Noida in 2026?",
    answer: "Amity Business School Noida (NAAC A+, NIRF #51) is the best MBA college in Noida with average placement ₹8 LPA, recruiters Deloitte, KPMG, Amazon, EY and 10,000+ alumni. Bennett University MBA is the best for placements (avg ₹8.5 LPA) but newer. For affordability, GL Bajaj (₹1.8L total fees) or Galgotias (₹2L total) are the best value options.",
  },
  {
    question: "What is the MBA fee in Noida colleges 2026?",
    answer: "MBA fees in Noida 2026 (total 2 years): GL Bajaj ₹1.8L–2.5L; Galgotias ₹2L–3L; Sharda University ₹2.4L–3.5L; Amity Business School ₹3.5L–5L; JIIT MBA ₹4L–5L; Bennett University ₹5L–7L. Compare this with Pune — PUMBA ₹1.25L (government) and SIBM Pune ₹16L–22L.",
  },
  {
    question: "Is CAT score needed for MBA in Noida?",
    answer: "Most Noida MBA colleges accept CAT, MAT, CMAT or their own entrance. Amity accepts CAT/MAT/GMAT/Amity JMC. GL Bajaj accepts CAT/MAT/CMAT/ATMA. Galgotias accepts CAT/MAT/CMAT/CUET PG. Bennett University prefers CAT or GMAT. You do NOT need a high CAT score for most Noida MBA colleges — MAT or CMAT scores are sufficient for admissions at Sharda, GL Bajaj, Galgotias.",
  },
  {
    question: "What is the placement like for MBA in Noida 2026?",
    answer: "MBA placement in Noida 2026: Bennett University (best — avg ₹8.5 LPA, highest ₹24 LPA, Goldman Sachs recruiter). Amity Business School (avg ₹8 LPA, Deloitte, KPMG, Amazon). JIIT MBA (avg ₹7.5 LPA, EY, ICICI, HDFC). Sharda (avg ₹5.5 LPA). GL Bajaj (avg ₹4.2 LPA). Compared to Pune — SIBM Pune (₹28 LPA avg) and PUMBA (₹6 LPA avg government) are stronger but harder to get into.",
  },
]

export default function MBACollegesNoidaPage() {
  return (
    <>
      <script id="faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqData)) }} />
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Colleges in Noida", url: "/colleges-in-noida" },
          { name: "MBA Colleges in Noida 2026", url: "/mba-colleges-noida" },
        ])) }} />
      <script id="list-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateItemListSchema(
          mbaColleges.map(c => ({ name: c.name, url: `/colleges/${c.slug}` }))
        )) }} />

      <main style={{ background: "#F7F9FC" }}>

        <section style={{ background: "#012858" }} className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-blue-200 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <Link href="/colleges-in-noida" className="hover:text-white">Noida Colleges</Link>
              <ChevronRight size={12} />
              <span className="text-white">MBA</span>
            </nav>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Best MBA Colleges in Noida 2026
            </h1>
            <p className="text-blue-100 text-base max-w-3xl mb-6">
              Compare top MBA &amp; PGDM colleges in Noida &amp; Greater Noida — Amity Business School, Bennett University,
              JIIT MBA, Sharda, Galgotias &amp; GL Bajaj. CAT/MAT/CMAT 2026 admission, fees &amp; placements.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {[["20+", "MBA Colleges"], ["₹1.8L–7L", "Total Fees"], ["₹8.5 LPA", "Best Avg Pkg"], ["CAT/MAT/CMAT", "Entrance"]].map(([val, label]) => (
                <div key={label} className="bg-white/10 rounded-xl px-4 py-2 text-white">
                  <span className="font-bold" style={{ color: "#E0170F" }}>{val}</span>
                  <span className="ml-1.5 text-blue-100">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-5">
              <h2 className="text-lg font-bold" style={{ color: "#012858" }}>
                Top {mbaColleges.length} MBA Colleges in Noida 2026
              </h2>

              {mbaColleges.map((college, idx) => (
                <div key={college.slug} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: "#012858" }}>#{idx + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <Link href={`/colleges/${college.slug}`} className="font-bold text-base hover:underline" style={{ color: "#012858" }}>{college.name}</Link>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><MapPin size={11} />{college.location}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#E0170F" }}>
                          <Star size={13} fill="#E0170F" />{college.rating}
                          <span className="text-xs text-gray-400 font-normal">({college.reviews})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F7F9FC", color: "#012858", border: "1px solid #E5E9F0" }}>{college.type}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#FFF4F2", color: "#E0170F", border: "1px solid #FFC9BE" }}>NAAC {college.naac}</span>
                        {college.nirf && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F0F7FF", color: "#0062CC", border: "1px solid #CCE0FF" }}>NIRF #{college.nirf}</span>}
                      </div>
                      <p className="text-xs italic text-gray-500 mb-3">✦ {college.highlight}</p>
                      <div className="grid grid-cols-3 gap-3 text-center mb-3">
                        {[
                          { icon: IndianRupee, label: "Total Fees", val: college.fees },
                          { icon: Trophy, label: "Avg Pkg", val: college.avgPkg },
                          { icon: Trophy, label: "Highest", val: college.highestPkg },
                        ].map(({ label, val }) => (
                          <div key={label} className="rounded-xl p-2" style={{ background: "#F7F9FC" }}>
                            <p className="text-xs text-gray-500">{label}</p>
                            <p className="text-sm font-bold mt-0.5" style={{ color: "#012858" }}>{val}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Exams: {college.exams.join(" · ")}</p>
                      <p className="text-xs text-gray-500">Recruiters: {college.recruiters.slice(0, 5).join(" · ")}</p>
                      <div className="mt-3 flex gap-2">
                        <Link href={`/colleges/${college.slug}`} className="text-xs px-4 py-1.5 rounded-lg font-medium text-white" style={{ background: "#E0170F" }}>View Details</Link>
                        <Link href="/counselling" className="text-xs px-4 py-1.5 rounded-lg font-medium" style={{ background: "#F7F9FC", color: "#012858", border: "1px solid #E5E9F0" }}>Free Counselling</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-sm mb-3" style={{ color: "#012858" }}>Also Explore</h3>
                <ul className="space-y-1 text-sm">
                  {[
                    { label: "All Colleges in Noida", href: "/colleges-in-noida" },
                    { label: "MBA Cutoff Delhi NCR", href: "/mba-cutoff-delhi-ncr" },
                    { label: "MBA in Delhi NCR & Noida Guide", href: "/blog/mba-colleges-delhi-ncr-noida-guide" },
                    { label: "Engineering Colleges Noida", href: "/engineering-colleges-noida" },
                    { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
                    { label: "Best MBA Colleges India 2026", href: "/mba-colleges-in-pune" },
                  ].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-1.5 px-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: "#012858" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-5 text-sm" style={{ background: "#012858", color: "white" }}>
                <h3 className="font-bold mb-3">Noida MBA vs Pune MBA</h3>
                <div className="space-y-2 text-xs text-blue-100">
                  <p><span className="font-semibold" style={{ color: "#E0170F" }}>Noida Best:</span> Delhi NCR job market, lower fees, CAT not mandatory</p>
                  <p><span className="font-semibold" style={{ color: "#E0170F" }}>Pune Best:</span> SIBM (avg ₹28 LPA), SCMHRD (avg ₹19 LPA), PUMBA (govt college)</p>
                  <p><span className="font-semibold" style={{ color: "#E0170F" }}>Verdict:</span> Top 15 MBA → Pune. Budget MBA with NCR placement → Noida</p>
                </div>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ background: "#FFF4F2", border: "1px solid #FFC9BE" }}>
                <p className="font-bold text-sm mb-1" style={{ color: "#012858" }}>Confused between MBA colleges?</p>
                <p className="text-xs text-gray-500 mb-3">Talk to an expert — free on WhatsApp</p>
                <Link href="/counselling" className="block w-full py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#E0170F" }}>Free Counselling</Link>
              </div>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#012858" }}>FAQs — MBA Colleges in Noida 2026</h2>
            <div className="space-y-4">
              {faqData.map(faq => (
                <details key={faq.question} className="bg-white rounded-2xl border border-gray-100 p-5 group">
                  <summary className="font-semibold text-sm cursor-pointer list-none flex justify-between items-center" style={{ color: "#012858" }}>
                    {faq.question}
                    <ChevronRight size={16} className="flex-shrink-0 group-open:rotate-90 transition-transform text-gray-400" />
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
      <RelatedMbaSearches path="/mba-colleges-noida" />
    </>
  )
}
