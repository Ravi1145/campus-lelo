import { Metadata } from "next"
import Link from "next/link"
import { MapPin, Star, IndianRupee, Trophy, ChevronRight, CheckCircle2 } from "lucide-react"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo"
import { noidaColleges } from "@/data/noidaColleges"
import { safeJsonLd } from "@/lib/jsonld"

export const revalidate = 3600

const engineeringColleges = noidaColleges.filter(c => c.stream === "Engineering")

export const metadata: Metadata = genMeta({
  title: "Best Engineering Colleges in Noida 2026 | JEE, AKTU | Fees & Placements",
  description: "Top engineering colleges in Noida 2026 — JIIT Noida (₹8.5L avg pkg), Amity University, Bennett University, Galgotias, GL Bajaj, KIET. JEE Main & AKTU UPSEE admission. Fees ₹1.2L–6L/yr.",
  path: "/engineering-colleges-noida",
  keywords: [
    "engineering colleges in noida 2026",
    "best engineering college in noida",
    "btech colleges noida 2026",
    "jee main colleges noida",
    "aktu colleges noida 2026",
    "jiit noida btech",
    "amity university btech noida",
    "bennett university engineering",
    "galgotias university btech",
    "gl bajaj greater noida",
    "kiet ghaziabad",
    "cse colleges noida 2026",
    "engineering colleges greater noida",
    "top btech college up 2026",
    "private engineering college noida fees",
  ],
})

const faqData = [
  {
    question: "Which is the best engineering college in Noida in 2026?",
    answer: "JIIT (Jaypee Institute of Information Technology) Sector 62 Noida is the best engineering college in Noida for CSE/IT —, recruiters Amazon, Microsoft, Google. Amity University (NAAC A+) is the best for overall campus and diversity. Bennett University is best for product company placements.",
  },
  {
    question: "What is the fee for B.Tech in Noida colleges 2026?",
    answer: "B.Tech fees in Noida 2026: GL Bajaj (AKTU) ₹1.2L–2.8L/yr; Galgotias ₹1.5L–4L/yr; Sharda University ₹1.8L–4.8L/yr; JIIT Noida ₹2.8L–3.8L/yr; Amity University ₹2L–5.5L/yr; Bennett University ₹3L–6L/yr. Total 4-year cost ranges from ₹5L (GL Bajaj) to ₹24L (Bennett).",
  },
  {
    question: "Can I get admission in Noida engineering college with JEE Main 2026?",
    answer: "Yes. Most Noida engineering colleges accept JEE Main 2026. AKTU-affiliated colleges (GL Bajaj, KIET, IMSEC) use AKTU UPSEE + JEE Main. Amity, Sharda, Galgotias accept JEE Main or their own entrance. JIIT Noida accepts JEE Main (75th percentile+) or JIIT-SAT. Bennett University requires JEE Main 75+ percentile or SAT.",
  },
  {
    question: "Which CSE college in Noida gives the best placements?",
    answer: "For CSE placements in Noida 2026: JIIT Sector 62. Bennett University. Amity University. GL Bajaj.",
  },
]

function formatFees(min: number, max: number) {
  const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`
  return `${fmt(min)}–${fmt(max)}/yr`
}

export default function EngineeringCollegesNoidaPage() {
  return (
    <>
      <script id="faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqData)) }} />
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Colleges in Noida", url: "/colleges-in-noida" },
          { name: "Engineering Colleges in Noida 2026", url: "/engineering-colleges-noida" },
        ])) }} />
      <script id="list-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateItemListSchema(
          engineeringColleges.map(c => ({ name: c.name, url: `/colleges/${c.slug}` }))
        )) }} />

      <div style={{ background: "#F7F9FC" }}>

        {/* Hero */}
        <section style={{ background: "#012858" }} className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-blue-200 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <Link href="/colleges-in-noida" className="hover:text-white">Noida Colleges</Link>
              <ChevronRight size={12} />
              <span className="text-white">Engineering</span>
            </nav>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Best Engineering Colleges in Noida 2026
            </h1>
            <p className="text-blue-100 text-base max-w-3xl mb-6">
              Compare top B.Tech colleges in Noida &amp; Greater Noida — JIIT, Amity University, Bennett, Galgotias, GL Bajaj &amp; KIET.
              JEE Main &amp; AKTU UPSEE 2026 admission guide, fees and placement data.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {[["40+", "Engineering Colleges"], ["₹1.2L–6L", "Fees/yr"], ["JEE/AKTU", "Entrance"]].map(([val, label]) => (
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
                Top {engineeringColleges.length} Engineering Colleges in Noida &amp; Greater Noida 2026
              </h2>

              {engineeringColleges.map((college, idx) => (
                <div key={college.slug} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: "#012858" }}>#{idx + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <Link href={`/colleges/${college.slug}`} className="font-bold text-base hover:underline" style={{ color: "#012858" }}>
                            {college.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><MapPin size={11} />{college.location}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#E0170F" }}>
                          <Star size={13} fill="#E0170F" />{college.rating}
                          <span className="text-xs text-gray-400 font-normal">({college.reviewCount})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F7F9FC", color: "#012858", border: "1px solid #E5E9F0" }}>{college.type}</span>
                        {college.naac && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#FFF4F2", color: "#E0170F", border: "1px solid #FFC9BE" }}>NAAC {college.naac}</span>}
                        {college.nirfRank && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F0F7FF", color: "#0062CC", border: "1px solid #CCE0FF" }}>NIRF #{college.nirfRank}</span>}
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F0FFF4", color: "#166534", border: "1px solid #BBF7D0" }}>{college.affiliation.includes("AKTU") ? "AKTU" : "Private University"}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center mb-3">
                        {[
                          { icon: IndianRupee, label: "Fees/yr", val: formatFees(college.feesRange.min, college.feesRange.max) },
                          { icon: Trophy, label: "Avg Pkg", val: `₹${(college.avgPlacement / 100000).toFixed(1)}L` },
                          { icon: Trophy, label: "Highest", val: `₹${(college.highestPlacement / 100000).toFixed(0)}L` },
                        ].map(({ label, val }) => (
                          <div key={label} className="rounded-xl p-2" style={{ background: "#F7F9FC" }}>
                            <p className="text-xs text-gray-500">{label}</p>
                            <p className="text-sm font-bold mt-0.5" style={{ color: "#012858" }}>{val}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Courses: {college.specializations.slice(0, 4).join(", ")}</p>
                      <p className="text-xs text-gray-500">Recruiters: {college.topRecruiters.slice(0, 5).join(" · ")}</p>
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
                <h3 className="font-bold text-sm mb-3" style={{ color: "#012858" }}>Quick Links — Noida</h3>
                <ul className="space-y-1 text-sm">
                  {[
                    { label: "All Colleges in Noida", href: "/colleges-in-noida" },
                    { label: "MBA Colleges Noida", href: "/mba-colleges-noida" },
                  ].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-1.5 px-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: "#012858" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-5 text-sm" style={{ background: "#012858", color: "white" }}>
                <h3 className="font-bold mb-3">AKTU vs Private University</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-xs mb-1" style={{ color: "#E0170F" }}>AKTU Affiliated (GL Bajaj, KIET)</p>
                    <ul className="space-y-1 text-xs text-blue-100">
                      {["₹1.2L–3L fees/yr", "JEE Main + UPSEE", "Solid IT placements", "Recognized across UP"].map(p => (
                        <li key={p} className="flex gap-1.5"><CheckCircle2 size={11} className="flex-shrink-0 mt-0.5" style={{ color: "#E0170F" }} />{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-xs mb-1" style={{ color: "#E0170F" }}>Private University (Amity, JIIT, Bennett)</p>
                    <ul className="space-y-1 text-xs text-blue-100">
                      {["₹2L–6L fees/yr", "Higher avg placement", "Product co. recruiters", "Better infrastructure"].map(p => (
                        <li key={p} className="flex gap-1.5"><CheckCircle2 size={11} className="flex-shrink-0 mt-0.5" style={{ color: "#E0170F" }} />{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ background: "#FFF4F2", border: "1px solid #FFC9BE" }}>
                <p className="font-bold text-sm mb-1" style={{ color: "#012858" }}>Which college suits you?</p>
                <p className="text-xs text-gray-500 mb-3">Get free expert advice on WhatsApp</p>
                <Link href="/counselling" className="block w-full py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#E0170F" }}>Free Counselling</Link>
              </div>
            </div>
          </div>

          {/* SEO text */}
          <section className="mt-10 bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: "#012858" }}>Engineering Colleges in Noida 2026 — Complete Guide</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">AKTU vs Private University — Which is Better?</h3>
                <p>AKTU-affiliated colleges (GL Bajaj, KIET, IMSEC) offer B.Tech at ₹1.2L–3L/yr — comparable to government college fees. They are NAAC A or A+ rated with decent IT placements (TCS, Infosys, Wipro). Private universities (Amity, JIIT, Bennett, Galgotias) charge ₹2L–6L/yr but offer better infrastructure, higher placements, and product company recruiters. For budget-conscious students, GL Bajaj and KIET offer the best ROI.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Which Branch to Choose in Noida 2026?</h3>
                <p>CSE and IT remain the strongest branches at Noida colleges — nearly all top recruiters hire CSE/IT students. AI & ML, Data Science specializations are available at Amity, Sharda, Galgotias and Bennett. ECE is strong at JIIT Noida (Qualcomm, Samsung recruit). Mechanical and Civil have weaker placements at Noida private colleges — better to choose COEP Pune or SPPU colleges for Mechanical. For CSE: JIIT &gt; Bennett &gt; Amity &gt; Galgotias &gt; GL Bajaj.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#012858" }}>FAQs — Engineering Colleges in Noida</h2>
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
    </>
  )
}
