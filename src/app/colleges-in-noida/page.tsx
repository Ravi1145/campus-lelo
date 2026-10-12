import { Metadata } from "next"
import Link from "next/link"
import { Building2, MapPin, Star, IndianRupee, Users, Trophy, ChevronRight, CheckCircle2, BookOpen } from "lucide-react"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo"
import QuickAnswer from "@/components/seo/QuickAnswer"
import { noidaColleges } from "@/data/noidaColleges"
import { safeJsonLd } from "@/lib/jsonld"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "Best Colleges in Noida 2026 | Fees, Rankings & Placements | CampusLelo",
  description: "Compare top colleges in Noida 2026 — Amity University, JIIT Noida, Bennett University, Galgotias, Sharda, GL Bajaj. Fees ₹1.2L–6L/yr. JEE, CUET admission guide.",
  path: "/colleges-in-noida",
  keywords: [
    "colleges in noida 2026",
    "best college in noida 2026",
    "top colleges in noida",
    "engineering colleges in noida",
    "private university noida",
    "amity university noida",
    "jiit noida",
    "bennett university noida",
    "galgotias university",
    "sharda university noida",
    "gl bajaj noida",
    "kiet ghaziabad",
    "aktu colleges noida",
    "noida college admission 2026",
    "best btech college noida 2026",
    "mba colleges noida 2026",
    "noida colleges fees 2026",
    "colleges in greater noida 2026",
    "top university in noida up",
    "jee main colleges noida",
  ],
})

const faqData = [
  {
    question: "Which is the best college in Noida in 2026?",
    answer: "JIIT (Jaypee Institute of Information Technology), Sector 62 Noida is the best CSE/engineering college in Noida and recruiters like Amazon, Microsoft, Google. Amity University (NAAC A+) is the best overall private university in Noida across all streams. Bennett University (Times Group) is best for product company placements.",
  },
  {
    question: "What are the fees for engineering colleges in Noida 2026?",
    answer: "Engineering fees in Noida 2026: GL Bajaj (AKTU) ₹1.2L–2.8L/yr; Sharda University ₹1.8L–4.8L/yr; Galgotias University ₹1.5L–4L/yr; Amity University ₹2L–5.5L/yr; JIIT Noida ₹2.8L–3.8L/yr; Bennett University (Times Group) ₹3L–6L/yr. AKTU-affiliated colleges (GL Bajaj, KIET, IMSEC) have the most affordable fees.",
  },
  {
    question: "Which entrance exam is needed for Noida colleges in 2026?",
    answer: "For engineering: JEE Main 2026 (January/April sessions) + AKTU UPSEE 2026 for AKTU-affiliated colleges; for deemed universities (Amity, Sharda, JIIT) — JEE Main or their own entrance. For MBA: CAT 2026, MAT 2026, or CMAT 2026. Galgotias and Sharda also accept CUET 2026 scores for UG admissions.",
  },
  {
    question: "Which Noida college has the highest placement package in 2026?",
    answer: "Bennett University (Times Group) offers the highest.",
  },
  {
    question: "Is Amity University Noida good for B.Tech?",
    answer: "Yes, Amity University Noida (NAAC A+) is the top-ranked private university in Noida for B.Tech. CSE placements are strong — TCS, Infosys, Amazon, Microsoft recruit from campus.. Fees are ₹2L–5.5L/yr. Best for students wanting a large campus, diverse programs, and strong brand recognition in NCR.",
  },
  {
    question: "What is the difference between JIIT, Amity, and Bennett University?",
    answer: "JIIT Sector 62: Best CSE/IT focused, highest avg placement, product company recruiters (Amazon, Google), fees ₹2.8L–3.8L. Amity: Largest campus, most diverse programs (engineering+MBA+law+design), fees ₹2L–5.5L. Bennett (Times Group): Premium placements, strong industry connections, AI/Cybersecurity programs, fees ₹3L–6L — best for product company aspirants with budget.",
  },
]

const streamPages = [
  { label: "Engineering Colleges in Noida", href: "/engineering-colleges-noida", count: "40+" },
  { label: "MBA Colleges in Noida", href: "/mba-colleges-noida", count: "20+" },
  { label: "PGDM Colleges in Noida", href: "/pgdm-colleges-noida", count: "10+" },
  { label: "Colleges in Greater Noida", href: "/colleges-in-greater-noida", count: "20+" },
]

function formatFees(min: number, max: number) {
  const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`
  return `${fmt(min)}–${fmt(max)}/yr`
}

export default function CollegesInNoidaPage() {
  return (
    <>
      <script id="faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqData)) }} />
      <script id="breadcrumb-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Colleges in Noida 2026", url: "/colleges-in-noida" },
        ])) }} />
      <script id="list-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateItemListSchema(
          noidaColleges.map(c => ({ name: `${c.name} — ${c.location}`, url: `/colleges/${c.slug}` }))
        )) }} />

      <div style={{ background: "#F7F9FC" }}>

        {/* AEO Quick Answer — targeted by speakable schema for AI Overview snippets */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickAnswer
            question="Which is the best college in Noida in 2026?"
            answer="JIIT Noida (Sector 62) is the best engineering college in Noida — NAAC A, strong CS/IT. Amity University (NAAC A+) is the best overall private university across all streams."
            note="Data verified October 2026. Source: CampusLelo placement research."
          />
        </div>

        {/* Hero */}
        <section style={{ background: "#012858" }} className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-blue-200 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <span className="text-white">Colleges in Noida 2026</span>
            </nav>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3">
              Best Colleges in Noida 2026
            </h1>
            <p className="text-blue-100 text-base sm:text-lg max-w-3xl mb-6">
              Compare {noidaColleges.length}+ top colleges in Noida &amp; Greater Noida — Amity University (),
              JIIT Noida, Bennett University, Galgotias, Sharda &amp; GL Bajaj.
              Real fees, 2026 cutoffs, placement data &amp; reviews.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              {[
                ["50+", "Colleges in Noida"],
                ["₹1.2L–6L", "Fee Range/yr"],

                ["JEE/CUET", "Entrance Exams"],
              ].map(([val, label]) => (
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

            {/* College cards — left 2/3 */}
            <div className="lg:col-span-2 space-y-5">
              <h2 className="text-lg font-bold" style={{ color: "#012858" }}>
                Top {noidaColleges.length} Colleges in Noida &amp; Greater Noida 2026
              </h2>

              {noidaColleges.map((college, idx) => (
                <div key={college.slug}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: "#012858" }}>
                      #{idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <Link href={`/colleges/${college.slug}`}
                            className="font-bold text-base hover:underline" style={{ color: "#012858" }}>
                            {college.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                            <MapPin size={11} /> {college.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#E0170F" }}>
                          <Star size={13} fill="#E0170F" />
                          {college.reviewCount > 0 ? college.rating : "—"}
                          <span className="text-xs text-gray-400 font-normal">({college.reviewCount})</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: "#F7F9FC", color: "#012858", border: "1px solid #E5E9F0" }}>
                          {college.type}
                        </span>
                        {college.naac && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: "#FFF4F2", color: "#E0170F", border: "1px solid #FFC9BE" }}>
                            NAAC {college.naac}
                          </span>
                        )}
                        {college.nirfRank && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{ background: "#F0F7FF", color: "#0062CC", border: "1px solid #CCE0FF" }}>
                            NIRF #{college.nirfRank}
                          </span>
                        )}
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-3 text-center mb-3">
                        {[
                          { icon: IndianRupee, label: "Fees/yr", val: formatFees(college.feesRange.min, college.feesRange.max) },
                          { icon: Trophy, label: "Avg Pkg", val: `₹${(college.avgPlacement / 100000).toFixed(1)}L` },
                          { icon: Users, label: "Reviews", val: college.reviewCount.toLocaleString() },
                        ].map(({ icon: Icon, label, val }) => (
                          <div key={label} className="rounded-xl p-2" style={{ background: "#F7F9FC" }}>
                            <p className="text-xs text-gray-500">{label}</p>
                            <p className="text-sm font-bold mt-0.5" style={{ color: "#012858" }}>{val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Recruiters */}
                      <p className="text-xs text-gray-500 mb-1">Top Recruiters:</p>
                      <p className="text-xs text-gray-600">{college.topRecruiters.slice(0, 6).join(" · ")}</p>

                      <div className="mt-3 flex gap-2">
                        <Link href={`/colleges/${college.slug}`}
                          className="text-xs px-4 py-1.5 rounded-lg font-medium text-white transition-colors"
                          style={{ background: "#E0170F" }}>
                          View Details
                        </Link>
                        <Link href={`/colleges/${college.slug}#fees`}
                          className="text-xs px-4 py-1.5 rounded-lg font-medium transition-colors"
                          style={{ background: "#F7F9FC", color: "#012858", border: "1px solid #E5E9F0" }}>
                          Fees & Cutoff
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* Browse by stream */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-sm mb-3" style={{ color: "#012858" }}>Browse by Stream</h3>
                <ul className="space-y-1">
                  {streamPages.map(link => (
                    <li key={link.href}>
                      <Link href={link.href}
                        className="flex justify-between items-center py-1.5 px-2 rounded-lg text-sm hover:bg-orange-50 transition-colors"
                        style={{ color: "#012858" }}>
                        <span>{link.label}</span>
                        <span className="text-xs text-gray-400">{link.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Noida vs Pune box */}
              <div className="rounded-2xl p-5 text-sm" style={{ background: "#012858", color: "white" }}>
                <h3 className="font-bold mb-3 text-base">Why Study in Noida?</h3>
                <ul className="space-y-2">
                  {[
                    "Part of Delhi NCR — job market access",
                    "Lower fees vs Delhi city colleges",
                    "AKTU + private university options",
                    "Metro connectivity to Gurugram & Delhi",
                    "50+ IT companies in Sector 62 tech hub",
                    "Bennett, JIIT, Amity — top product recruiters",
                  ].map(point => (
                    <li key={point} className="flex gap-2 text-blue-100">
                      <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#E0170F" }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compare with Pune */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-sm mb-3" style={{ color: "#012858" }}>
                  <BookOpen size={14} className="inline mr-1" />
                  Compare Cities
                </h3>
                <ul className="space-y-1 text-sm">
                  {[
                    { label: "Colleges in Pune 2026", href: "/" },
                    { label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
                    { label: "MBA Colleges Pune", href: "/mba-colleges-in-pune" },
                  ].map(l => (
                    <li key={l.href}>
                      <Link href={l.href} className="block py-1.5 px-2 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: "#012858" }}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-5 text-center" style={{ background: "#FFF4F2", border: "1px solid #FFC9BE" }}>
                <p className="font-bold text-sm mb-1" style={{ color: "#012858" }}>Not sure which college?</p>
                <p className="text-xs text-gray-500 mb-3">Get free expert counselling on WhatsApp</p>
                <Link href="/counselling"
                  className="block w-full py-2 rounded-xl text-sm font-bold text-white text-center"
                  style={{ background: "#E0170F" }}>
                  Free Counselling
                </Link>
              </div>
            </div>
          </div>

          {/* About Noida colleges — SEO text */}
          <section className="mt-12 bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold mb-4" style={{ color: "#012858" }}>
              Colleges in Noida 2026 — Complete Guide
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Types of Colleges in Noida</h3>
                <p>
                  Noida and Greater Noida have 50+ colleges spread across private universities (Amity, Sharda, Galgotias, Bennett),
                  deemed universities (JIIT), and AKTU-affiliated private colleges (GL Bajaj, KIET, IMSEC).
                  Unlike Pune which has several government colleges (COEP, AFMC), Noida has primarily private institutions —
                  making fee comparison critical. AKTU-affiliated colleges offer the most affordable fees (₹1.2L–3L/yr)
                  while private deemed universities range from ₹1.8L–6L/yr.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Noida College Admission 2026</h3>
                <p>
                  For engineering at AKTU-affiliated Noida colleges: JEE Main 2026 (January/April) + AKTU UPSEE 2026 counselling.
                  Private universities (Amity, Sharda, Galgotias) accept JEE Main or their own entrance exams.
                  Bennett University requires JEE Main or SAT scores. JIIT Noida accepts JEE Main or JIIT-SAT.
                  MBA admissions use CAT 2026 (November) or MAT/CMAT. CUET 2026 is accepted for UG at Sharda and Galgotias.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Placements at Noida Colleges 2026</h3>
                <p>
                  Noida&apos;s location in Delhi NCR gives its colleges a major advantage — the Noida/Gurgaon tech corridor
                  houses Amazon, Microsoft, HCL, Infosys, TCS, Accenture, Wipro and hundreds of startups.
                  
                  GL Bajaj and KIET (AKTU) average ₹5 — strong for their fee bracket.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Which Area of Noida Has Most Colleges?</h3>
                <p>
                  <strong>Sector 62, Noida:</strong> JIIT, multiple tech companies — best for CSE students.
                  <strong> Sector 125, Noida:</strong> Amity University main campus.
                  <strong> Knowledge Park, Greater Noida:</strong> Sharda University, GL Bajaj, multiple AKTU colleges.
                  <strong> Yamuna Expressway:</strong> Galgotias University, Sharda (alternate campus).
                  <strong> TechZone II, Greater Noida:</strong> Bennett University.
                  Greater Noida overall has the highest density of engineering colleges in UP.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#012858" }}>
              Frequently Asked Questions — Noida Colleges 2026
            </h2>
            <div className="space-y-4">
              {faqData.map((faq) => (
                <details key={faq.question}
                  className="bg-white rounded-2xl border border-gray-100 p-5 group">
                  <summary className="font-semibold text-sm cursor-pointer list-none flex justify-between items-center"
                    style={{ color: "#012858" }}>
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
