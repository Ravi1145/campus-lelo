import MoreInCluster from "@/components/seo/MoreInCluster"
import type { Metadata } from "next"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"
import { btechColleges, btechFAQs } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "Best BTech Colleges in Pune 2026 | NIRF Ranked | Fees & Placements",
  description: "Best BTech colleges in Pune 2026 ranked by NIRF, NAAC and placements. COEP, PICT, VIT Pune, MIT-WPU, SIT Pune. Fees ₹80K–4.8L/yr.",
  path: "/best-btech-colleges-in-pune",
  keywords: [
    "best btech colleges in pune", "best engineering colleges in pune",
    "best btech college pune 2026", "top ranked engineering college pune",
    "best btech for cs pune", "best btech for mechanical pune",
  ],
})
export const revalidate = 300

const faqs = [
  ...btechFAQs.general.slice(5),
]

export default function BestBTechCollegesInPune() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "Best BTech Colleges", url: "/best-btech-colleges-in-pune" },
  ])
  const itemListSchema = generateCollegeListSchema(
    btechColleges.map(c => ({ name: c.name, slug: c.slug, description: c.highlights[0] })),
    "Best BTech Colleges in Pune 2026"
  )

  return (
    <>
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListSchema) }} />
      <BTechClusterPage
        h1="Best BTech Colleges in Pune 2026"
        subtitle="Top-ranked BTech engineering colleges in Pune by NIRF, NAAC, placements and fees. Verified 2026 data."
        quickAnswer="COEP is the best BTech college in Pune. For CS/IT, PICT Pune is #1. VIT Pune (NAAC A+,) is the best private autonomous college."
        stats={[
          { value: "COEP #1", label: "Top Government" },
          { value: "PICT #1", label: "Best for CS/IT" },
          { value: "NAAC A+", label: "Top 3 Accreditation" },
        ]}
        colleges={btechColleges}
        breadcrumbLabel="Best BTech Colleges"
        introHeading="Best BTech Colleges in Pune. How We Rank Them"
        introParagraphs={[
          "The best BTech college in Pune depends on your priorities: COEP is the most prestigious (cheapest government fees), PICT is the best for CS/IT placement outcomes, SIT Pune offers the highest overall placement packages, and MIT-WPU/VIT Pune offer the best infrastructure in the autonomous category.",
          "Our ranking is based on: (1) NIRF and NAAC accreditation, (2) average and highest placement packages from official NIRF data, (3) MHT-CET cutoff (higher cutoff = more demand = better college), (4) infrastructure and research facilities, and (5) alumni network quality.",
          "Key insight: The best BTech college varies by branch. COEP dominates overall. PICT is unbeatable for CS (Goldman Sachs, Deutsche Bank on campus). VIT Pune is best for Electronics. MIT-WPU leads in emerging branches (AI/ML, Data Science). SIT Pune leads in overall campus quality and placement outcomes.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "All BTech Colleges Pune", href: "/btech-colleges-in-pune" },
          { label: "Top BTech Colleges", href: "/top-btech-colleges-in-pune" },
          { label: "BTech Fees Comparison", href: "/btech-colleges-in-pune-with-fees" },
          { label: "BTech Placements Pune", href: "/btech-colleges-in-pune" },
          { label: "COEP Profile", href: "/colleges/coep-college-of-engineering-pune" },
          { label: "PICT Profile", href: "/colleges/pict-pune-institute-of-computer-technology" },
          { label: "BTech via MHT-CET", href: "/btech-colleges-in-pune-through-mht-cet" },
        ]}
        ctaHeading="Which BTech College is Best for You?"
        ctaSubtext="Free counselling: our engineers help you pick based on your MHT-CET score, branch preference and budget."
      />
      <MoreInCluster pool="btech" path="/best-btech-colleges-in-pune" />
    </>
  )
}
