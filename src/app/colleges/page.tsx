import { Metadata } from "next"
import { collegeHref } from "@/lib/collegeHref"
import { Suspense } from "react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema, generateItemListSchema } from "@/lib/seo"
import Link from "next/link"
import CollegeGrid from "@/components/colleges/CollegeGrid"
import CollegeListFallback from "@/components/colleges/CollegeListFallback"
import CollegesHeroSearch from "@/components/colleges/CollegesHeroSearch"
import { colleges } from "@/data/colleges"
import { seoPageHref } from "@/data/seoPages"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "Colleges in Pune 2026: Compare by Stream & Fees",
  description: "Browse colleges in Pune by stream, fees and location: engineering, MBA, medical, government, private and deemed. Compare and shortlist free.",
  path: "/colleges",
  keywords: [
    "colleges in pune", "engineering colleges pune", "mba colleges pune",
    "medical colleges pune", "pune university colleges list", "colleges in pune with fees",
    "best college pune 2026", "naac a+ colleges pune", "nirf ranked colleges pune",
  ],
})

const listingFaqs = [
  { question: "How many colleges are there in Pune?", answer: "Pune has over 800 colleges including 400+ engineering colleges, 100+ MBA institutes, and 50+ medical colleges. CampusLelo profiles 103+ top colleges with verified fees, placements, and NAAC data." },
  { question: "What is the fee range for engineering colleges in Pune?", answer: "Engineering fees in Pune 2026: Government (COEP) ₹80K–1.8L/yr; Autonomous private (PICT, VIT Pune) ₹1.4L–2.2L/yr; Deemed universities (SIT, MIT-WPU) ₹2L–4.8L/yr. SC/ST students get full fee waiver at government colleges." },
  { question: "Which entrance exam is needed for Pune college admission?", answer: "MHT-CET (April–May 2026) for engineering at SPPU-affiliated colleges. NEET 2026 (May 3) for medical. CAT 2026 (November) for PUMBA/IMT MBA. SNAP 2026 (December) for Symbiosis MBA colleges. SET 2026 (May) for Symbiosis UG programs." },
]

export default function CollegesPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges in Pune", url: "/colleges" },
  ])
  const faqSchema = generateFAQSchema(listingFaqs)
  const topColleges = colleges.slice(0, 10)
  const itemList = generateItemListSchema(
    topColleges.map(c => ({ name: c.name, url: collegeHref(c.slug), description: `${c.type} college, NAAC ${c.naac}` }))
  )

  return (
    <>
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="item-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemList) }} />
      <div className="bg-surface min-h-screen">
        {/* Page Header: compact, headline and search side by side */}
        <div className="bg-[#011B40]">
          <div className="max-w-[calc(var(--container-7xl)+3rem)] mx-auto px-4 sm:px-6 py-8 sm:py-11">
            <nav aria-label="Breadcrumb" className="text-xs text-blue-200 mb-4 flex gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden="true">›</span>
              <span className="text-white" aria-current="page">Colleges in Pune</span>
            </nav>

            <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  All Colleges in Pune <span className="text-[#FB4312]">2026</span>
                </h1>
                <p className="mt-2 text-sm text-blue-100 max-w-xl leading-relaxed">
                  Compare {colleges.length}+ engineering, MBA, medical, law and arts colleges by fees, NAAC grade and accepted exams.
                </p>
              </div>
              <CollegesHeroSearch />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-blue-200">Explore:</span>
              {["Engineering", "MBA", "Medical", "Law", "Design", "Government"].map(s => (
                <Link key={s} href={seoPageHref(`${s.toLowerCase()}-colleges-pune`)}
                  className="text-xs font-semibold bg-white/10 text-white ring-1 ring-white/15 hover:bg-white hover:text-[#012858] px-3 py-1.5 rounded-full transition-colors">
                  {s} Colleges →
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Suspense fallback={<CollegeListFallback />}>
          <CollegeGrid />
        </Suspense>

        {/* GEO + FAQ Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions: Pune Colleges 2026</h2>
          <div className="space-y-4">
            {listingFaqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Related searches */}
          <div className="mt-10">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Related Searches</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Engineering Colleges Pune", href: "/colleges-in-pune/engineering-colleges-pune" },
                { label: "MBA Colleges Pune", href: "/colleges-in-pune/mba-colleges-pune" },
                { label: "Government Colleges Pune", href: "/government-colleges-pune" },
                { label: "NAAC A+ Colleges Pune", href: "/colleges-in-pune/naac-a-plus-colleges-pune" },
                { label: "Low Fee Colleges Pune", href: "/colleges-in-pune/low-fee-colleges-pune" },
                { label: "MHT-CET Colleges Pune", href: "/engineering-colleges-pune" },
                { label: "Colleges with Hostel Pune", href: "/colleges-in-pune-with-hostel" },
                { label: "Medical Colleges Pune", href: "/colleges-in-pune/medical-colleges-pune" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
