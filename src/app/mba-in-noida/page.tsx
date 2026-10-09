import { Metadata } from "next"
import Link from "next/link"
import { MapPin, Star, IndianRupee, Trophy, ChevronRight, CheckCircle2 } from "lucide-react"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "MBA in Noida 2026 — Fees, Colleges, Admission, Placements Guide",
  description: "Complete MBA in Noida 2026 guide — top colleges (Amity, Bennett, JIIT, Sharda, GL Bajaj), fees ₹1.8L–7L, CAT/MAT/CMAT cutoffs, placements up to ₹24 LPA. Everything you need to know about MBA admission in Noida.",
  path: "/mba-in-noida",
  keywords: [
    "mba in noida",
    "mba in noida 2026",
    "mba course noida",
    "mba in noida fees",
    "mba admission noida 2026",
    "mba colleges noida 2026",
    "mba in noida salary",
    "is mba good in noida",
    "mba in noida vs pune",
    "mba in noida after graduation",
    "2 year mba noida",
    "part time mba noida 2026",
  ],
})

const mbaComparison = [
  { college: "Amity Business School", naac: "A+", nirf: 51, fees: "₹3.5L–5L", avg: "₹8 LPA", exam: "CAT/MAT/AMITY JMC", highlight: "Best overall" },
  { college: "Bennett University MBA", naac: "A", nirf: null, fees: "₹5L–7L", avg: "₹8.5 LPA", exam: "CAT/GMAT", highlight: "Best placements" },
  { college: "JIIT MBA (Jaypee)", naac: "A", nirf: null, fees: "₹4L–5L", avg: "₹7.5 LPA", exam: "CAT/GMAT/MAT", highlight: "Best for IT+MBA" },
  { college: "Sharda University MBA", naac: "A", nirf: 101, fees: "₹2.4L–3.5L", avg: "₹5.5 LPA", exam: "CAT/MAT/CMAT", highlight: "International campus" },
  { college: "GL Bajaj PGDM", naac: "A", nirf: null, fees: "₹1.8L–2.5L", avg: "₹4.2 LPA", exam: "CAT/MAT/CMAT/ATMA", highlight: "Best budget MBA" },
  { college: "Galgotias University MBA", naac: "A", nirf: null, fees: "₹2L–3L", avg: "₹4.8 LPA", exam: "CAT/MAT/CUET PG", highlight: "Most affordable" },
]

const faqData = [
  {
    question: "Is doing an MBA in Noida worth it in 2026?",
    answer: "Yes, MBA in Noida is worth it — especially from top colleges. Amity Business School (avg ₹8 LPA, NIRF #51), Bennett University (avg ₹8.5 LPA, Goldman Sachs recruiter), and JIIT MBA (avg ₹7.5 LPA, ICICI/HDFC) offer strong returns. The Delhi NCR job market — with headquarters of Amazon India, Microsoft, Deloitte India, and KPMG in Noida/Gurgaon — means excellent placement opportunities. Budget MBA options (GL Bajaj at ₹1.8L total) offer 3x salary jump for graduates with 0–2 years experience.",
  },
  {
    question: "What is the MBA fee in Noida 2026?",
    answer: "MBA fees in Noida 2026 (total 2 years): GL Bajaj PGDM ₹1.8L–2.5L (cheapest, NAAC A); Galgotias MBA ₹2L–3L; Sharda University MBA ₹2.4L–3.5L; Amity Business School ₹3.5L–5L; JIIT MBA ₹4L–5L; Bennett University ₹5L–7L. Compare with Pune — PUMBA MBA ₹1.25L (govt) and SIBM Pune ₹16L–22L. Noida offers mid-range MBA options at ₹2L–5L total with good NCR placements.",
  },
  {
    question: "What CAT score is needed for MBA in Noida 2026?",
    answer: "CAT score needed for MBA in Noida 2026: Bennett University (CAT 85+ percentile or GMAT 700+); Amity Business School (CAT 70+ percentile or MAT 700+); JIIT MBA (CAT 75+ percentile or GMAT 650+); Sharda University (CAT 50+ or MAT 500+, or SUAT exam); Galgotias MBA (CAT 40+, CMAT 200+, or CUET PG); GL Bajaj PGDM (CAT 40+, MAT 500+, CMAT 200+, ATMA 60+). Most Noida MBA colleges accept MAT or CMAT — you don't need a high CAT score for admission.",
  },
  {
    question: "What is the average salary after MBA in Noida 2026?",
    answer: "Average MBA salary after graduation in Noida 2026: Bennett University avg ₹8.5 LPA (highest ₹24 LPA, Goldman Sachs, Deloitte); Amity Business School avg ₹8 LPA (highest ₹22 LPA, KPMG, Amazon); JIIT MBA avg ₹7.5 LPA (highest ₹18 LPA, EY, ICICI); Sharda University avg ₹5.5 LPA; GL Bajaj avg ₹4.2 LPA. Top MBA roles from Noida colleges: Business Analyst, Financial Analyst, Marketing Manager, Operations Manager. Expected salary range for Noida MBA fresh grads: ₹4L–10L depending on college and specialization.",
  },
  {
    question: "MBA in Noida vs MBA in Pune — which is better?",
    answer: "MBA in Pune vs Noida depends on your goal. For top MBA: Pune wins (SIBM Pune avg ₹28 LPA, SCMHRD avg ₹19 LPA). For budget MBA: Noida wins (GL Bajaj ₹1.8L total, Galgotias ₹2L total vs PUMBA ₹1.25L govt Pune). For Delhi NCR placement: Noida wins — Amazon, Microsoft, Deloitte, KPMG NCR offices hire Noida MBA grads. For overall MBA ecosystem: Pune wins with 200+ MBA colleges and 50+ years of management education tradition. Verdict: Aspirants targeting top-50 IIM/SIBM should prefer Pune. Budget MBA with NCR job preference → Noida.",
  },
]

export default function MBAInNoidaPage() {
  return (
    <>
      <script id="faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqData)) }} />
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Colleges in Noida", url: "/colleges-in-noida" },
          { name: "MBA Colleges in Noida", url: "/mba-colleges-noida" },
          { name: "MBA in Noida 2026 Guide", url: "/mba-in-noida" },
        ])) }} />

      <div style={{ background: "#F7F9FC" }}>

        <section style={{ background: "#012858" }} className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-blue-200 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <Link href="/colleges-in-noida" className="hover:text-white">Noida Colleges</Link>
              <ChevronRight size={12} />
              <Link href="/mba-colleges-noida" className="hover:text-white">MBA Noida</Link>
              <ChevronRight size={12} />
              <span className="text-white">MBA in Noida Guide</span>
            </nav>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              MBA in Noida 2026 — Complete Guide
            </h1>
            <p className="text-blue-100 text-base max-w-3xl mb-6">
              Everything about doing an MBA in Noida — best colleges, fees, CAT/MAT cutoffs, placements,
              specializations and how Noida MBA compares with Pune, Delhi and Hyderabad.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {[["20+", "MBA Colleges"], ["₹1.8L–7L", "Total 2yr Fees"], ["₹8.5 LPA", "Best Avg Pkg"], ["CAT/MAT/CMAT", "Entrance Exams"]].map(([val, label]) => (
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

            <div className="lg:col-span-2 space-y-8">

              {/* Quick comparison table */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: "#012858" }}>
                  MBA Colleges in Noida 2026 — Quick Comparison
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: "#F7F9FC" }}>
                        <th className="text-left p-2 font-semibold" style={{ color: "#012858" }}>College</th>
                        <th className="text-center p-2 font-semibold" style={{ color: "#012858" }}>NAAC</th>
                        <th className="text-center p-2 font-semibold" style={{ color: "#012858" }}>Total Fees</th>
                        <th className="text-center p-2 font-semibold" style={{ color: "#012858" }}>Avg Pkg</th>
                        <th className="text-center p-2 font-semibold" style={{ color: "#012858" }}>Entrance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mbaComparison.map((row, i) => (
                        <tr key={row.college} className={i % 2 === 0 ? "bg-white" : ""} style={{ borderTop: "1px solid #F0F0F0" }}>
                          <td className="p-2">
                            <p className="font-semibold" style={{ color: "#012858" }}>{row.college}</p>
                            <p className="text-green-600 text-xs font-medium">{row.highlight}</p>
                          </td>
                          <td className="p-2 text-center">
                            <span className="px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: "#FFF4F2", color: "#E0170F" }}>{row.naac}</span>
                          </td>
                          <td className="p-2 text-center font-medium" style={{ color: "#012858" }}>{row.fees}</td>
                          <td className="p-2 text-center font-bold" style={{ color: "#E0170F" }}>{row.avg}</td>
                          <td className="p-2 text-center text-gray-500">{row.exam}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex gap-3">
                  <Link href="/mba-colleges-noida" className="text-xs px-4 py-2 rounded-lg font-medium text-white" style={{ background: "#E0170F" }}>
                    See Full College Details
                  </Link>
                  <Link href="/counselling" className="text-xs px-4 py-2 rounded-lg font-medium" style={{ background: "#F7F9FC", color: "#012858", border: "1px solid #E5E9F0" }}>
                    Free Counselling
                  </Link>
                </div>
              </div>

              {/* MBA Specializations */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: "#012858" }}>MBA Specializations in Noida 2026</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { spec: "MBA Finance", colleges: "Amity, JIIT, Bennett, Sharda", demand: "High — HDFC, ICICI, Axis Bank recruit", color: "#F0F7FF" },
                    { spec: "MBA Marketing", colleges: "Amity, GL Bajaj, Galgotias, Sharda", demand: "High — FMCG, e-commerce, EdTech", color: "#F0FFF4" },
                    { spec: "MBA HR", colleges: "Amity, Sharda, Galgotias, GL Bajaj", demand: "Moderate — TCS, Infosys, large MNCs", color: "#FFF4F2" },
                    { spec: "MBA Operations", colleges: "JIIT, Amity, Bennett", demand: "High for logistics/supply chain NCR", color: "#F7F0FF" },
                    { spec: "MBA Business Analytics", colleges: "Amity, Bennett, JIIT", demand: "Very High — data-driven NCR companies", color: "#FFF0F0" },
                    { spec: "MBA International Business", colleges: "Amity, Sharda", demand: "Moderate — export/import, MNC India ops", color: "#F0FFFF" },
                  ].map(s => (
                    <div key={s.spec} className="rounded-xl p-3" style={{ background: s.color }}>
                      <p className="font-semibold text-sm mb-1" style={{ color: "#012858" }}>{s.spec}</p>
                      <p className="text-xs text-gray-500 mb-1">Offered at: {s.colleges}</p>
                      <p className="text-xs font-medium" style={{ color: "#E0170F" }}>{s.demand}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* MBA in Noida Admission Timeline */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: "#012858" }}>MBA in Noida 2026 — Admission Timeline</h2>
                <div className="space-y-3">
                  {[
                    { month: "Nov 2025", event: "CAT 2025 Registration (closed)", status: "done" },
                    { month: "Nov 2025", event: "CAT 2025 Exam", status: "done" },
                    { month: "Jan 2026", event: "CMAT 2026 Registration opens", status: "done" },
                    { month: "Jan 2026", event: "CAT 2025 Results announced", status: "done" },
                    { month: "Feb 2026", event: "CMAT 2026 Exam", status: "current" },
                    { month: "Feb–Mar 2026", event: "Amity, Bennett, JIIT shortlists out", status: "upcoming" },
                    { month: "Mar–Apr 2026", event: "GD/PI rounds at Noida colleges", status: "upcoming" },
                    { month: "May 2026", event: "Final admissions &amp; fee payment", status: "upcoming" },
                    { month: "Jul 2026", event: "MBA Batch 2026–28 begins", status: "upcoming" },
                  ].map(item => (
                    <div key={item.event} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-20 text-xs font-medium pt-0.5 ${item.status === "done" ? "text-gray-400" : item.status === "current" ? "text-orange-500" : "text-gray-500"}`}>
                        {item.month}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`flex-shrink-0 w-2 h-2 rounded-full ${item.status === "done" ? "bg-green-400" : item.status === "current" ? "bg-orange-400" : "bg-gray-300"}`} />
                        <p className={`text-sm ${item.status === "done" ? "text-gray-400" : "text-gray-700"}`} dangerouslySetInnerHTML={{ __html: item.event }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-sm mb-3" style={{ color: "#012858" }}>MBA in Noida — Quick Links</h3>
                <ul className="space-y-1 text-sm">
                  {[
                    { label: "MBA Colleges in Noida", href: "/mba-colleges-noida" },
                    { label: "MBA Cutoff Delhi NCR", href: "/mba-cutoff-delhi-ncr" },
                    { label: "MBA in Delhi NCR & Noida Guide", href: "/blog/mba-colleges-delhi-ncr-noida-guide" },
                    { label: "PGDM Colleges Noida", href: "/pgdm-colleges-noida" },
                    { label: "Engineering Colleges Noida", href: "/engineering-colleges-noida" },
                    { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
                    { label: "Greater Noida Colleges", href: "/colleges-in-greater-noida" },
                  ].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-1.5 px-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: "#012858" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-5 text-sm" style={{ background: "#012858", color: "white" }}>
                <h3 className="font-bold mb-3">MBA Noida vs Pune — Quick Verdict</h3>
                <div className="space-y-2 text-xs text-blue-100">
                  <p><span className="font-semibold" style={{ color: "#E0170F" }}>Choose Noida:</span> Delhi NCR job market, lower fees, MAT/CMAT accepted</p>
                  <p><span className="font-semibold" style={{ color: "#E0170F" }}>Choose Pune:</span> Stronger MBA brand (SIBM, SCMHRD), better avg ₹28 LPA</p>
                  <p><span className="font-semibold" style={{ color: "#E0170F" }}>Budget MBA:</span> GL Bajaj Noida ₹1.8L &gt; vs PUMBA Pune ₹1.25L (govt, harder to get)</p>
                  <p><span className="font-semibold" style={{ color: "#E0170F" }}>Top MBA:</span> Both offer SNAP/CAT colleges but Pune wins on ranking</p>
                </div>
              </div>

              {/* Who should choose Noida MBA */}
              <div className="rounded-2xl p-5 text-sm bg-white border border-gray-100">
                <h3 className="font-bold mb-3 text-sm" style={{ color: "#012858" }}>Choose Noida MBA If...</h3>
                <ul className="space-y-2">
                  {[
                    "You want Delhi NCR corporate placement",
                    "Budget under ₹5L for full MBA",
                    "CAT score 40–70 percentile",
                    "From UP/Bihar/NCR (no relocation cost)",
                    "Want MAT/CMAT admission option",
                  ].map(p => (
                    <li key={p} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#E0170F" }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ background: "#FFF4F2", border: "1px solid #FFC9BE" }}>
                <p className="font-bold text-sm mb-1" style={{ color: "#012858" }}>MBA in Noida or Pune?</p>
                <p className="text-xs text-gray-500 mb-3">Talk to a counsellor — free on WhatsApp</p>
                <Link href="/counselling" className="block w-full py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#E0170F" }}>Free Counselling</Link>
              </div>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#012858" }}>FAQs — MBA in Noida 2026</h2>
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
      </div>
      <RelatedMbaSearches path="/mba-in-noida" />
    </>
  )
}
