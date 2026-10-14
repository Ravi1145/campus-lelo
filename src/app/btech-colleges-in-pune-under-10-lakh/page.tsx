import type { Metadata } from "next"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { btechColleges } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "BTech Colleges in Pune Under 10 Lakh Total Fees 2026 | Best Value Engineering",
  description: "Best BTech colleges in Pune with total 4-year fees under ₹10 lakh. COEP, PICT, VIT Pune, PCCOE, MIT-WPU, top-ranked engineering colleges under ₹10L total fees.",
  path: "/btech-colleges-in-pune-under-10-lakh",
  keywords: [
    "btech colleges in pune under 10 lakh", "engineering colleges pune under 10 lakh",
    "btech pune 10 lakh fees", "best value btech college pune",
    "btech under 10 lakh pune 2026", "affordable engineering colleges pune",
  ],
})
export const revalidate = 300

const under10LColleges = btechColleges.filter(c => c.feesTotal.max <= 1000000)

const faqs = [
  { question: "Which BTech colleges in Pune have total fees under 10 lakh?", answer: "BTech colleges in Pune with 4-year total fees under ₹10 lakh: COEP (₹3.2L–7.2L), PICT (₹5.6L–7.6L), VIT Pune (₹6.4L–8.8L), PCCOE (₹5.4L–7.4L), DYPCOE (₹4.2L–6.2L), AISSMS COE (₹4.4L–6.2L). These cover the best government and autonomous private colleges in Pune, all NAAC-accredited." },
]

export default function BTechUnder10Lakh() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "Under 10 Lakh", url: "/btech-colleges-in-pune-under-10-lakh" },
  ])

  return (
    <>
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <BTechClusterPage
        h1="BTech Colleges in Pune Under 10 Lakh Total Fees 2026"
        subtitle="Best-value BTech colleges in Pune with total 4-year fees under ₹10 lakh. COEP, PICT, VIT Pune, PCCOE with top placements and NAAC grades."
        quickAnswer="COEP (₹3.2L–7.2L), PICT (₹5.6L–7.6L), VIT Pune (₹6.4L–8.8L), PCCOE (₹5.4L–7.4L), DYPCOE (₹4.2L–6.2L) all have BTech 4-year total fees under ₹10L. These are the highest-ROI BTech colleges in Pune placements at ₹5–9L total investment."
        stats={[
          { value: "6+", label: "Colleges Under ₹10L" },
          { value: "₹3.2L", label: "Lowest (COEP)" },
          { value: "NAAC A+", label: "VIT Pune Grade" },
        ]}
        colleges={under10LColleges.length >= 3 ? under10LColleges : btechColleges.slice(0, 6)}
        breadcrumbLabel="Under 10 Lakh"
        introHeading="Why BTech Under ₹10L in Pune is the Best Investment"
        introParagraphs={[
          "Pune's BTech colleges under ₹10 lakh total fees include COEP, PICT (best CS in Pune), VIT Pune (NAAC A+,), PCCOE (NAAC A+), and DYPCOE, all delivering ₹7 average placements. This is an extraordinary combination of quality and affordability rare in Indian engineering education.",
          "The secret is simple: autonomous SPPU-affiliated colleges receive government grants that reduce fees without compromising academic quality. Their autonomy allows curriculum innovation while SPPU affiliation ensures national recognition. This is why PICT, VIT Pune, and PCCOE consistently outperform many more expensive private colleges in placement outcomes.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "BTech Under 5 Lakh", href: "/btech-colleges-in-pune-under-5-lakh" },
          { label: "BTech Fees Comparison", href: "/btech-colleges-in-pune-with-fees" },
          { label: "Best BTech Colleges", href: "/best-btech-colleges-in-pune" },
          { label: "BTech Placements Pune", href: "/btech-colleges-in-pune" },
          { label: "Engineering Scholarships", href: "/engineering-colleges-pune-scholarship" },
        ]}
        ctaHeading="Find the Best BTech College in Your Budget"
        ctaSubtext="Free counselling: our engineers help you pick the highest-ROI BTech college for your MHT-CET score and budget."
      />
    </>
  )
}
