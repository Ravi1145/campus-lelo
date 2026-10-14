import type { Metadata } from "next"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"
import { safeJsonLd } from "@/lib/jsonld"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const metadata: Metadata = genMeta({
  title: "MBA in Marketing Colleges in Pune 2026 | Best MBA Marketing Pune",
  description: "Best MBA Marketing colleges in Pune 2026. Compare fees, placements in FMCG, e-commerce and digital marketing, NAAC grades and admission for MBA Marketing specialization.",
  path: "/mba-colleges-in-pune-for-marketing",
  keywords: ["mba in marketing pune", "mba marketing colleges pune", "best mba marketing pune", "mba marketing fees pune", "mba marketing placement pune"],
})
export const revalidate = 300

const marketingColleges = mbaColleges.filter(c => c.specializations.includes("Marketing"))

const faqs = [
  { question: "What is the scope of MBA Marketing from Pune?", answer: "MBA Marketing graduates from Pune are hired by FMCG companies (HUL, ITC, Nestle), e-commerce (Amazon, Flipkart, Meesho), automotive (Tata Motors, Bajaj, Mahindra in Pune), fintech, and digital marketing agencies. Pune's proximity to Mumbai's advertising hub gives Marketing MBA students unique internship access." },
]

export default function MBAMarketing() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "MBA for Marketing", url: "/mba-colleges-in-pune-for-marketing" },
  ])
  return (
    <>
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA in Marketing: Colleges in Pune 2026"
        subtitle="Best MBA Marketing colleges in Pune with top placements in FMCG, e-commerce, automotive and digital marketing."
        quickAnswer="SIBM Pune is the best MBA Marketing college in Pune. Top recruiters: Amazon, Flipkart, P&G, HUL, ITC. Key exams: SNAP (Symbiosis), MAH-CET MBA (others)."
        stats={[
          { value: `${marketingColleges.length}+`, label: "MBA Mktg Colleges" },
          { value: "FMCG/E-com", label: "Top Sectors" },
          { value: "₹1.25L–16L/yr", label: "Fees" },
        ]}
                colleges={mbaColleges.filter(c => c.specializations.includes("Marketing"))}
        introHeading="MBA Marketing in Pune. Industry, Scope & Colleges"
        introParagraphs={[
          "Pune is an ideal city for MBA Marketing because of its diverse industrial base: Bajaj Auto, Tata Motors, Mahindra for automotive marketing; 500+ IT companies for B2B/tech marketing; and proximity to Mumbai's media and FMCG headquarters. MBA Marketing from Pune gives graduates access to multiple high-paying marketing career tracks.",
          "MBA Marketing specialization covers consumer behaviour, brand management, digital marketing, market research, advertising, product management, and sales strategy. Pune MBA colleges have updated their Marketing curriculum to include data analytics, performance marketing, and e-commerce, skills in highest demand.",
          "Pune's growing startup ecosystem (200+ funded startups in 2024-25) is also creating Marketing roles in product growth, content strategy, and performance marketing, offering MBA Marketing graduates from Pune an exciting alternative to traditional FMCG roles.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA for Finance", href: "/mba-colleges-in-pune-for-finance" },
          { label: "MBA for HR", href: "/mba-colleges-in-pune-for-hr" },
          { label: "MBA for Business Analytics", href: "/mba-colleges-in-pune-for-business-analytics" },
          { label: "MBA Placements Pune", href: "/mba-colleges-in-pune" },
          { label: "Best MBA Colleges Pune", href: "/mba-colleges-pune" },
        ]}
        ctaHeading="MBA Marketing: Choose the Right Pune College"
        ctaSubtext="Free counselling to pick the right MBA Marketing college based on your target industry and budget."
      />
      <RelatedMbaSearches path="/mba-colleges-in-pune-for-marketing" />
    </>
  )
}
