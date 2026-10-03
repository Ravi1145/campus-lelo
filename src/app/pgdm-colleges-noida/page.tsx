import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { MapPin, Star, IndianRupee, Trophy, ChevronRight } from "lucide-react"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "Best PGDM Colleges in Noida 2026 | Fees, Placements & Admission",
  description: "Top PGDM colleges in Noida 2026 — GL Bajaj (NAAC A, avg ₹4.2 LPA), Amity Business School (NIRF #51), JIIT MBA, IMT Ghaziabad (avg ₹13 LPA). CMAT/CAT/MAT admission. Fees ₹1.8L–8L.",
  path: "/pgdm-colleges-noida",
  keywords: [
    "pgdm colleges in noida 2026",
    "pgdm in noida",
    "best pgdm college noida",
    "pgdm admission noida 2026",
    "pgdm colleges noida fees",
    "pgdm noida placement",
    "gl bajaj pgdm noida",
    "imt ghaziabad pgdm",
    "cmat colleges noida pgdm",
    "pgdm vs mba noida 2026",
    "pgdm course noida",
    "pgdm colleges near delhi 2026",
  ],
})

const pgdmColleges = [
  {
    name: "IMT Ghaziabad (Near Noida)",
    slug: "imt-ghaziabad",
    type: "Autonomous Institute",
    naac: "A+",
    nirf: 37,
    location: "Raj Nagar, Ghaziabad (15 km from Noida)",
    fees: "₹7L–9L total",
    avgPkg: "₹13 LPA",
    highestPkg: "₹42 LPA",
    exams: ["CAT", "GMAT", "XAT", "CMAT"],
    recruiters: ["HDFC Bank", "Amazon", "Deloitte", "EY", "Flipkart", "Axis Bank", "ICICI", "Mahindra"],
    rating: 4.4,
    reviews: 1240,
    highlight: "Best PGDM near Noida — AACSB accredited, NIRF #37, avg ₹13 LPA placement",
  },
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
    recruiters: ["Deloitte", "KPMG", "Amazon", "Accenture", "EY", "Cognizant", "HUL", "Wipro"],
    rating: 4.2,
    reviews: 980,
    highlight: "Largest PGDM/MBA campus in Noida — 10,000+ alumni across Fortune 500 companies",
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
    highlight: "Best value PGDM in Greater Noida — NAAC A, AICTE approved, fees under ₹2.5L total",
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
    highlight: "Tech-integrated PGDM — best for IT + management combo, strong fin-tech placements",
  },
  {
    name: "Bennett University — MBA/PGDM",
    slug: "bennett-university-noida",
    type: "Private University",
    naac: "A",
    nirf: null,
    location: "TechZone II, Greater Noida",
    fees: "₹5L–7L total",
    avgPkg: "₹8.5 LPA",
    highestPkg: "₹24 LPA",
    exams: ["CAT", "GMAT", "MAT"],
    recruiters: ["Goldman Sachs", "Deloitte", "EY", "Amazon", "Microsoft", "TCS", "Adobe"],
    rating: 4.3,
    reviews: 320,
    highlight: "Times Group backed — highest avg placement ₹8.5 LPA among new NCR PGDM colleges",
  },
  {
    name: "Galgotias University — MBA/PGDM",
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
    highlight: "Most affordable PGDM near Delhi NCR — total fees just ₹2L–3L for 2 years",
  },
]

const faqData = [
  {
    question: "What is the difference between PGDM and MBA in Noida colleges?",
    answer: "PGDM (Post Graduate Diploma in Management) is awarded by autonomous institutes approved by AICTE, while MBA is a degree awarded by universities (UGC). In Noida, IMT Ghaziabad and GL Bajaj offer PGDM; Amity, JIIT, and Galgotias offer MBA. PGDM from a reputed institute (IMT Ghaziabad — NIRF #37) is considered equivalent or superior to MBA from lesser-known universities. For placements, PGDM from IMT Ghaziabad (avg ₹13 LPA) beats MBA from most Noida universities.",
  },
  {
    question: "Which is the best PGDM college in Noida in 2026?",
    answer: "IMT Ghaziabad (near Noida, 15 km) is the best PGDM college in NCR Noida region — NAAC A+, NIRF #37, AACSB accredited, avg placement ₹13 LPA. Within Noida city, Amity Business School (NIRF #51, avg ₹8 LPA) and Bennett University (avg ₹8.5 LPA) are the best. For budget: GL Bajaj (₹1.8L total fees, NAAC A) offers the best value PGDM in Greater Noida.",
  },
  {
    question: "What is the PGDM fee in Noida colleges 2026?",
    answer: "PGDM fees in Noida 2026 (total 2 years): GL Bajaj ₹1.8L–2.5L; Galgotias ₹2L–3L; Amity Business School ₹3.5L–5L; JIIT MBA ₹4L–5L; Bennett University ₹5L–7L; IMT Ghaziabad ₹7L–9L. IMT Ghaziabad is the costliest but offers avg ₹13 LPA placement. GL Bajaj is the cheapest PGDM in Greater Noida with AICTE approval.",
  },
  {
    question: "Can I get PGDM in Noida with a low CAT score?",
    answer: "Yes. GL Bajaj Noida accepts CAT/MAT/CMAT/ATMA — even below 50 percentile. Galgotias University accepts CMAT and CUET PG alongside CAT. Sharda University accepts its own entrance exam (SUAT) + CAT/MAT. IMT Ghaziabad requires CAT 85+ percentile or GMAT 650+. If your CAT score is low, target GL Bajaj (PGDM, ₹1.8L fees), Galgotias (MBA/PGDM, ₹2L fees), or Sharda University (MBA, ₹2.4L fees) for admission.",
  },
]

export default function PGDMCollegesNoidaPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqData)) }} />
      <Script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Colleges in Noida", url: "/colleges-in-noida" },
          { name: "PGDM Colleges in Noida 2026", url: "/pgdm-colleges-noida" },
        ])) }} />
      <Script id="list-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateItemListSchema(
          pgdmColleges.map(c => ({ name: c.name, url: `/colleges/${c.slug}` }))
        )) }} />

      <main style={{ background: "#F7F9FC" }}>

        <section style={{ background: "#16324F" }} className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-blue-200 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <Link href="/colleges-in-noida" className="hover:text-white">Noida Colleges</Link>
              <ChevronRight size={12} />
              <span className="text-white">PGDM</span>
            </nav>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Best PGDM Colleges in Noida 2026
            </h1>
            <p className="text-blue-100 text-base max-w-3xl mb-6">
              Compare top PGDM &amp; MBA colleges in Noida &amp; Greater Noida — IMT Ghaziabad, Amity Business School,
              GL Bajaj, JIIT &amp; Bennett University. CAT/CMAT/MAT 2026 admission, fees &amp; placements.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {[["15+", "PGDM Colleges"], ["₹1.8L–9L", "Total Fees"], ["₹13 LPA", "Best Avg Pkg"], ["CAT/CMAT/MAT", "Entrance"]].map(([val, label]) => (
                <div key={label} className="bg-white/10 rounded-xl px-4 py-2 text-white">
                  <span className="font-bold" style={{ color: "#FF6B35" }}>{val}</span>
                  <span className="ml-1.5 text-blue-100">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-5">
              <h2 className="text-lg font-bold" style={{ color: "#16324F" }}>
                Top {pgdmColleges.length} PGDM Colleges in Noida &amp; NCR 2026
              </h2>

              {pgdmColleges.map((college, idx) => (
                <div key={college.slug} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: "#16324F" }}>#{idx + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <Link href={`/colleges/${college.slug}`} className="font-bold text-base hover:underline" style={{ color: "#16324F" }}>{college.name}</Link>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><MapPin size={11} />{college.location}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#FF6B35" }}>
                          <Star size={13} fill="#FF6B35" />{college.rating}
                          <span className="text-xs text-gray-400 font-normal">({college.reviews})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F7F9FC", color: "#16324F", border: "1px solid #E5E9F0" }}>{college.type}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#FFF7F0", color: "#FF6B35", border: "1px solid #FFD9C5" }}>NAAC {college.naac}</span>
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
                            <p className="text-sm font-bold mt-0.5" style={{ color: "#16324F" }}>{val}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Exams: {college.exams.join(" · ")}</p>
                      <p className="text-xs text-gray-500">Recruiters: {college.recruiters.slice(0, 5).join(" · ")}</p>
                      <div className="mt-3 flex gap-2">
                        <Link href={`/colleges/${college.slug}`} className="text-xs px-4 py-1.5 rounded-lg font-medium text-white" style={{ background: "#FF6B35" }}>View Details</Link>
                        <Link href="/counselling" className="text-xs px-4 py-1.5 rounded-lg font-medium" style={{ background: "#F7F9FC", color: "#16324F", border: "1px solid #E5E9F0" }}>Free Counselling</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-sm mb-3" style={{ color: "#16324F" }}>Also Explore</h3>
                <ul className="space-y-1 text-sm">
                  {[
                    { label: "All Colleges in Noida", href: "/colleges-in-noida" },
                    { label: "MBA Colleges Noida", href: "/mba-colleges-noida" },
                    { label: "Engineering Colleges Noida", href: "/engineering-colleges-noida" },
                    { label: "PGDM Colleges in Pune", href: "/mba-colleges-in-pune" },
                    { label: "Greater Noida Colleges", href: "/colleges-in-greater-noida" },
                  ].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-1.5 px-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: "#16324F" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-5 text-sm" style={{ background: "#16324F", color: "white" }}>
                <h3 className="font-bold mb-3">PGDM vs MBA — Noida 2026</h3>
                <div className="space-y-2 text-xs text-blue-100">
                  <p><span className="font-semibold" style={{ color: "#FF6B35" }}>PGDM Best:</span> IMT Ghaziabad (avg ₹13 LPA) — autonomous, industry-aligned curriculum</p>
                  <p><span className="font-semibold" style={{ color: "#FF6B35" }}>MBA Best:</span> Amity (NIRF #51, ₹8 LPA), Bennett (₹8.5 LPA avg pkg)</p>
                  <p><span className="font-semibold" style={{ color: "#FF6B35" }}>Budget Pick:</span> GL Bajaj PGDM ₹1.8L total fees, NAAC A approved</p>
                </div>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ background: "#FFF7F0", border: "1px solid #FFD9C5" }}>
                <p className="font-bold text-sm mb-1" style={{ color: "#16324F" }}>PGDM or MBA — which is better for you?</p>
                <p className="text-xs text-gray-500 mb-3">Free expert advice on WhatsApp</p>
                <Link href="/counselling" className="block w-full py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#FF6B35" }}>Free Counselling</Link>
              </div>
            </div>
          </div>

          <section className="mt-10 bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: "#16324F" }}>PGDM Colleges in Noida 2026 — Complete Guide</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">PGDM vs MBA in Noida — Key Difference</h3>
                <p>PGDM (Post Graduate Diploma in Management) is awarded by AICTE-approved autonomous institutes, while MBA is a university degree. In Noida, IMT Ghaziabad and GL Bajaj offer PGDM; Amity University, JIIT, and Galgotias offer MBA. The key difference: PGDM curricula are updated annually by the institute autonomously, while MBA curricula require university approval. For placements, PGDM from IMT Ghaziabad (NIRF #37, avg ₹13 LPA) outperforms MBA from most Noida universities.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Which PGDM Entrance Exam for Noida 2026?</h3>
                <p>IMT Ghaziabad requires CAT 85+ percentile or GMAT 650+. GL Bajaj accepts CAT, MAT, CMAT, ATMA — even with 40-50 percentile. Amity Business School accepts its own AMITY JMC exam alongside CAT/MAT. Galgotias accepts CUET PG + CAT/CMAT. For low CAT scorers, GL Bajaj and Galgotias are the most accessible PGDM options in Noida NCR. CMAT 2026 scores (announced Jan/Feb) are accepted by most Noida PGDM colleges.</p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#16324F" }}>FAQs — PGDM Colleges in Noida 2026</h2>
            <div className="space-y-4">
              {faqData.map(faq => (
                <details key={faq.question} className="bg-white rounded-2xl border border-gray-100 p-5 group">
                  <summary className="font-semibold text-sm cursor-pointer list-none flex justify-between items-center" style={{ color: "#16324F" }}>
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
    </>
  )
}
