import type { Metadata } from "next"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"
import { safeJsonLd } from "@/lib/jsonld"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune Under 10 Lakh Total Fees 2026 | Best Value MBA",
  description: "Top MBA colleges in Pune under 10 lakh total fees (2-year). Compare fees, placements, MAH-CET cutoffs for affordable MBA in Pune with good placement records.",
  path: "/mba-colleges-in-pune-under-10-lakh",
  keywords: ["mba colleges in pune under 10 lakh", "mba pune 10 lakh fees", "affordable mba pune 10 lakh", "mba under 10 lakh pune 2026"],
})
export const revalidate = 300

const faqs = [
  { question: "What is the MAH-CET cutoff for MBA colleges under 10 lakh in Pune?", answer: "MBA colleges in Pune under â‚¹10 lakh have MAH-CET cutoffs ranging from 70â€“90 percentile for Open category. PUMBA (â‚¹2.5L) requires 95+ percentile. IIMP (â‚¹9L) accepts 70-80 percentile. BVIMR (â‚¹7L) accepts 65-75 percentile." },
]

export default function MBAUnder10Lakh() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Under 10 Lakh", url: "/mba-colleges-in-pune-under-10-lakh" },
  ])
  return (
    <>
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Colleges in Pune Under 10 Lakh Total Fees 2026"
        subtitle="Best value MBA colleges in Pune with total 2-year fees under â‚¹10 lakh. Good placements, NAAC accreditation, MAH-CET admission."
        quickAnswer="MBA colleges in Pune under â‚¹10 lakh include PUMBA (â‚¹2.5L), BVIMR (â‚¹7L), and Indira MBA (â‚¹9L). Admission via MAH-CET MBA â€” cutoffs range 65â€“95 percentile."
        stats={[
          { value: "5+", label: "Colleges Under â‚¹10L" },
          { value: "â‚¹2.5Lâ€“9L", label: "Total Fees Range" },
          { value: "MAH-CET", label: "Primary Exam" },
        ]}
                colleges={mbaColleges.filter(c => c.feesTotal <= 1000000)}
        introHeading="Why Choose MBA Under 10 Lakh in Pune?"
        introParagraphs={[
          "Pune offers excellent MBA programs under â‚¹10 lakh total that provide strong returns on investment. These colleges â€” primarily government and SPPU-affiliated â€” have built decades of industry relationships and deliver consistent placements despite their affordable fee structures.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Under 5 Lakh", href: "/mba-colleges-in-pune-under-5-lakh" },
          { label: "MBA Under 15 Lakh", href: "/mba-colleges-in-pune-under-15-lakh" },
          { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
          { label: "MBA Scholarship Pune", href: "/mba-colleges-in-pune-scholarship" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
        ]}
        ctaHeading="Find the Best MBA Under 10 Lakh in Pune"
        ctaSubtext="Free counselling to identify the best value MBA college for your MAH-CET score and career goals."
      />
      <RelatedMbaSearches path="/mba-colleges-in-pune-under-10-lakh" />
    </>
  )
}
