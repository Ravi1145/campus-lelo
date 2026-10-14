import { Metadata } from "next"
import Link from "next/link"
import { MapPin, Star, IndianRupee, Trophy, ChevronRight, CheckCircle2 } from "lucide-react"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "Best Colleges in Greater Noida 2026 | Engineering, MBA, BBA | Fees",
  description: "Top colleges in Greater Noida 2026. Galgotias University, Sharda University, GL Bajaj, Bennett University, Amity Noida. Engineering, MBA, BBA, Law. JEE, CAT, CMAT 2026. Fees ₹1.2L–6L/yr.",
  path: "/colleges-in-greater-noida",
  keywords: [
    "colleges in greater noida 2026",
    "greater noida colleges",
    "best college greater noida",
    "engineering colleges greater noida",
    "mba colleges greater noida",
    "galgotias university greater noida",
    "sharda university greater noida",
    "gl bajaj greater noida",
    "bennett university greater noida",
    "btech colleges greater noida 2026",
    "greater noida university list",
    "knowledge park greater noida colleges",
    "yamuna expressway colleges noida",
  ],
})

const greaterNoidaColleges = [
  {
    name: "Galgotias University",
    slug: "galgotias-university-noida",
    type: "Private University",
    naac: "A",
    nirf: null,
    location: "Yamuna Expressway, Greater Noida",
    courses: ["B.Tech", "MBA", "BBA", "BCA", "M.Tech", "MCA"],
    feesRange: "₹1.5L–4L/yr",
    avgPkg: "Not published",
    highestPkg: "Not published",
    strength: 25000,
    rating: 3.8,
    reviews: 1840,
    highlight: "Largest university in Greater Noida, 25,000+ students, campus spanning 52 acres",
  },
  {
    name: "Sharda University",
    slug: "sharda-university-noida",
    type: "Private University",
    naac: "A",
    nirf: null,
    location: "Knowledge Park III, Greater Noida",
    courses: ["B.Tech", "MBBS", "MBA", "BBA", "LLB", "BArch"],
    feesRange: "₹1.8L–4.8L/yr",
    avgPkg: "Not published",
    highestPkg: "Not published",
    strength: 18000,
    rating: 3.9,
    reviews: 1420,
    highlight: "Most diverse campus: MBBS, Law, Architecture + Engineering. 6,000+ international students",
  },
  {
    name: "GL Bajaj Institute of Management & Research",
    slug: "gl-bajaj-noida",
    type: "AICTE Approved",
    naac: "A",
    nirf: null,
    location: "Greater Noida",
    courses: ["B.Tech", "PGDM", "MBA", "M.Tech"],
    feesRange: "₹1.2L–2.8L/yr",
    avgPkg: "Not published",
    highestPkg: "Not published",
    strength: 6000,
    rating: 3.9,
    reviews: 820,
    highlight: "Best ROI college in Greater Noida, lowest fees, NAAC A, solid TCS/Infosys placements",
  },
  {
    name: "Bennett University",
    slug: "bennett-university-noida",
    type: "Private University",
    naac: "A",
    nirf: null,
    location: "TechZone II, Greater Noida",
    courses: ["B.Tech", "MBA", "BBA", "M.Tech", "Law"],
    feesRange: "₹3L–6L/yr",
    avgPkg: "Not published",
    highestPkg: "Not published",
    strength: 5000,
    rating: 4.3,
    reviews: 520,
    highlight: "Times Group college: highest placement pkg in Greater Noida, Google/Microsoft recruit",
  },
  {
    name: "KIET Group of Institutions, Ghaziabad",
    slug: "kiet-ghaziabad",
    type: "AKTU Affiliated",
    naac: "A+",
    nirf: null,
    location: "Ghaziabad (Near Greater Noida)",
    courses: ["B.Tech", "MBA", "MCA", "M.Tech"],
    feesRange: "₹1.4L–3L/yr",
    avgPkg: "Not published",
    highestPkg: "Not published",
    strength: 7000,
    rating: 4.0,
    reviews: 960,
    highlight: "AKTU's best-ranked NAAC A+ college near Greater Noida, strong CSE/IT placement",
  },
  {
    name: "Amity University Noida",
    slug: "amity-university-noida",
    type: "Private University",
    naac: "A+",
    nirf: null,
    location: "Sector 125, Noida (near Greater Noida)",
    courses: ["B.Tech", "MBA", "BBA", "BCA", "Law", "Journalism"],
    feesRange: "₹2L–5.5L/yr",
    avgPkg: "Not published",
    highestPkg: "Not published",
    strength: 20000,
    rating: 4.2,
    reviews: 2100,
    highlight: "Top-ranked private university in NCR, NAAC A+, 20,000+ students",
  },
]

const faqData = [
  {
    question: "Which is the best college in Greater Noida 2026?",
    answer: "Bennett University is the best for placements. Sharda University (NAAC A) is best for variety, it offers MBBS, Law, Architecture plus Engineering. Galgotias University is the largest (25,000+ students) and most affordable. For engineering specifically: Bennett University (#1 CSE placements), KIET Ghaziabad (#2 for AKTU-affiliated), Galgotias (#3 for budget B.Tech). For MBA/PGDM in Greater Noida: GL Bajaj is the best value, Sharda offers international exposure.",
  },
  {
    question: "What courses are available in Greater Noida colleges 2026?",
    answer: "Greater Noida colleges offer B.Tech (CSE, ECE, ME, Civil), MBA, PGDM, BBA, BCA, MCA, M.Tech, MBBS (Sharda University), LLB/B.A.LLB (Sharda, Bennett), B.Arch (Sharda), Pharmacy (various). Sharda University is the most course-diverse campus. Bennett University specializes in Engineering + Management. Galgotias is strongest for B.Tech and MBA. GL Bajaj is PGDM/MBA focused. Total: 100+ programs across Greater Noida colleges.",
  },
  {
    question: "What is the fee range for colleges in Greater Noida 2026?",
    answer: "Fee range for Greater Noida colleges 2026 (per year): GL Bajaj ₹1.2L–2.8L (cheapest); Galgotias ₹1.5L–4L; KIET ₹1.4L–3L; Sharda University ₹1.8L–4.8L; Amity University ₹2L–5.5L; Bennett University ₹3L–6L (highest fees, best placements). Total 4-year B.Tech cost: GL Bajaj ₹5L–11L, Bennett ₹12L–24L. For MBA 2-year total: GL Bajaj ₹1.8L–2.5L, Galgotias ₹2L–3L, Sharda ₹2.4L–3.5L.",
  },
  {
    question: "How is Greater Noida different from Noida for colleges?",
    answer: "Greater Noida (Knowledge Park, Yamuna Expressway, TechZone) has Galgotias, Sharda, GL Bajaj, Bennett University, all private universities with large campuses. Noida (Sector 62, Sector 125) has JIIT, Amity University, generally higher-ranked with stronger placements. Greater Noida colleges are slightly more affordable with bigger campuses. Noida colleges have better metro connectivity. For top placements: Noida (JIIT, Amity) > Greater Noida. For budget + campus life: Greater Noida (Galgotias, GL Bajaj) wins.",
  },
]

export default function CollegesInGreaterNoidaPage() {
  return (
    <>
      <script id="faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqData)) }} />
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Colleges in Noida", url: "/colleges-in-noida" },
          { name: "Colleges in Greater Noida 2026", url: "/colleges-in-greater-noida" },
        ])) }} />
      <script id="list-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateItemListSchema(
          greaterNoidaColleges.map(c => ({ name: c.name, url: `/colleges/${c.slug}` }))
        )) }} />

      <div style={{ background: "#F7F9FC" }}>

        <section style={{ background: "#012858" }} className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-1.5 text-xs text-blue-200 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <Link href="/colleges-in-noida" className="hover:text-white">Noida Colleges</Link>
              <ChevronRight size={12} />
              <span className="text-white">Greater Noida</span>
            </nav>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Best Colleges in Greater Noida 2026
            </h1>
            <p className="text-blue-100 text-base max-w-3xl mb-6">
              Compare top engineering, MBA &amp; management colleges in Greater Noida. Galgotias University, Sharda University,
              GL Bajaj, Bennett University, KIET &amp; Amity. JEE/CAT/CMAT 2026 admission, fees &amp; placements.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {[["50+", "Colleges"], ["₹1.2L–6L", "Fees/yr"], ["JEE/CAT/CMAT", "Entrance"]].map(([val, label]) => (
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
                Top {greaterNoidaColleges.length} Colleges in Greater Noida 2026
              </h2>

              {greaterNoidaColleges.map((college, idx) => (
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
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F7F9FC", color: "#012858", border: "1px solid #E5E9F0" }}>{college.type}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#FFF4F2", color: "#E0170F", border: "1px solid #FFC9BE" }}>NAAC {college.naac}</span>
                        {college.nirf && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F0F7FF", color: "#0062CC", border: "1px solid #CCE0FF" }}>NIRF #{college.nirf}</span>}
                      </div>
                      <p className="text-xs italic text-gray-500 mb-3">✦ {college.highlight}</p>
                      <div className="grid grid-cols-3 gap-3 text-center mb-3">
                        {[
                          { label: "Fees/yr", val: college.feesRange },
                          { label: "Avg Pkg", val: college.avgPkg },
                          { label: "Highest", val: college.highestPkg },
                        ].map(({ label, val }) => (
                          <div key={label} className="rounded-xl p-2" style={{ background: "#F7F9FC" }}>
                            <p className="text-xs text-gray-500">{label}</p>
                            <p className="text-sm font-bold mt-0.5" style={{ color: "#012858" }}>{val}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mb-1">Courses: {college.courses.join(" · ")}</p>
                      <p className="text-xs text-gray-500">Students: {college.strength.toLocaleString()}+</p>
                      <div className="mt-3 flex gap-2">
                        <Link href={`/colleges/${college.slug}`} className="text-xs px-4 py-1.5 rounded-lg font-medium text-white" style={{ background: "#E0170F" }}>View Details</Link>
                        <Link href="/counselling" className="text-xs px-4 py-1.5 rounded-lg font-medium" style={{ background: "#F7F9FC", color: "#012858", border: "1px solid #E5E9F0" }}>Free Counselling</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-sm mb-3" style={{ color: "#012858" }}>Explore by Stream</h3>
                <ul className="space-y-1 text-sm">
                  {[
                    { label: "Engineering Colleges Noida", href: "/engineering-colleges-noida" },
                    { label: "MBA Colleges Noida", href: "/mba-colleges-noida" },
                    { label: "PGDM Colleges Noida", href: "/pgdm-colleges-noida" },
                    { label: "All Colleges in Noida", href: "/colleges-in-noida" },
                    { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
                  ].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-1.5 px-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: "#012858" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl p-5 text-sm" style={{ background: "#012858", color: "white" }}>
                <h3 className="font-bold mb-3">Greater Noida vs Noida</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-xs mb-1" style={{ color: "#E0170F" }}>Greater Noida Advantage</p>
                    <ul className="space-y-1 text-xs text-blue-100">
                      {["Larger campuses (52–100 acres)", "Slightly lower fees", "MBBS + Law options (Sharda)", "Yamuna Expressway connectivity"].map(p => (
                        <li key={p} className="flex gap-1.5"><CheckCircle2 size={11} className="flex-shrink-0 mt-0.5" style={{ color: "#E0170F" }} />{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-xs mb-1" style={{ color: "#E0170F" }}>Noida City Advantage</p>
                    <ul className="space-y-1 text-xs text-blue-100">
                      {["Better metro access (JIIT, Amity)", "Higher NIRF rankings", "Stronger IT company recruiters", "Closer to Delhi job market"].map(p => (
                        <li key={p} className="flex gap-1.5"><CheckCircle2 size={11} className="flex-shrink-0 mt-0.5" style={{ color: "#E0170F" }} />{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ background: "#FFF4F2", border: "1px solid #FFC9BE" }}>
                <p className="font-bold text-sm mb-1" style={{ color: "#012858" }}>Not sure which Greater Noida college?</p>
                <p className="text-xs text-gray-500 mb-3">Free counselling on WhatsApp, 2 min</p>
                <Link href="/counselling" className="block w-full py-2 rounded-xl text-sm font-bold text-white" style={{ background: "#E0170F" }}>Free Counselling</Link>
              </div>
            </div>
          </div>

          <section className="mt-10 bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: "#012858" }}>Colleges in Greater Noida 2026. Complete Guide</h2>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How to Choose a College in Greater Noida?</h3>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Greater Noida Knowledge Park. College Hub</h3>
                <p>Greater Noida&apos;s Knowledge Park I, II, III and TechZone areas host most of its colleges. Sharda University is in Knowledge Park III, Galgotias on Yamuna Expressway, Bennett in TechZone II. KIET and GL Bajaj are slightly farther near Ghaziabad border. All are well-connected by NH-24 and the Yamuna Expressway. The Aqua Line metro (Sector 51 to Noida Knowledge Park) connects the area to Delhi metro. Hostels are available at all major universities.</p>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#012858" }}>FAQs: Colleges in Greater Noida 2026</h2>
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
