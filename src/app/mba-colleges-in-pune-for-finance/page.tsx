import type { Metadata } from "next"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"
import { safeJsonLd } from "@/lib/jsonld"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const metadata: Metadata = genMeta({
  title: "MBA in Finance Colleges in Pune 2026 | Best MBA Finance Placement & Fees",
  description: "Best MBA Finance colleges in Pune 2026. SIBM, SCMHRD, MIT-SOM with top banking, investment banking, BFSI placements. Fees, CAT/MAH-CET cutoffs and admission.",
  path: "/mba-colleges-in-pune-for-finance",
  keywords: ["mba in finance pune", "mba finance colleges pune", "best mba finance pune", "mba finance placement pune", "investment banking mba pune"],
})
export const revalidate = 300

const faqs = [
  { question: "What is the scope of MBA Finance from Pune?", answer: "MBA Finance graduates from Pune are hired in investment banking, corporate finance, financial analysis, wealth management, risk management, and fintech. Pune has 50+ NBFCs, major bank headquarters, and growing fintech companies. Top recruiters: Goldman Sachs, Deutsche Bank, HDFC, ICICI, Axis Bank, Bajaj Finserv." },
]

export default function MBAFinance() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "MBA for Finance", url: "/mba-colleges-in-pune-for-finance" },
  ])
  return (
    <>
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA in Finance: Top Colleges in Pune 2026"
        subtitle="Best MBA Finance colleges in Pune. SIBM, SCMHRD, PUMBA with investment banking, BFSI and corporate finance placements."
        quickAnswer="SIBM Pune is the top MBA Finance college. Goldman Sachs, Deutsche Bank, JPMorgan recruit here. SCMHRD is #2. PUMBA offers government MBA Finance at ₹1.25L/yr with banking sector placements."
        stats={[
          { value: "8+", label: "MBA Finance Colleges" },
          { value: "Banks/BFSI", label: "Top Sectors" },
          { value: "SNAP/CAT/MAH-CET", label: "Exams" },
        ]}
                colleges={mbaColleges.filter(c => c.specializations.includes("Finance"))}
        introHeading="MBA Finance in Pune. Why It's One of India's Best"
        introParagraphs={[
          "Pune is one of India's strongest cities for MBA Finance careers. The city hosts 50+ NBFCs, major bank regional offices (HDFC, ICICI, Axis, Kotak), insurance companies (LIC, Bajaj Allianz), and a fast-growing fintech sector. MBA Finance graduates from Pune have direct access to campus placements from India's top financial institutions.",
          "SIBM Pune stands apart for Finance MBA, it's the only Pune college where global investment banks (Goldman Sachs, Deutsche Bank, Barclays) conduct campus placement. This makes SIBM's Finance MBA comparable to IIM-level opportunities in terms of career outcomes.",
          "For students who cannot target SIBM/SCMHRD, PUMBA's Finance MBA (₹1.25L total fees) and MIT-SOM's Finance MBA (₹7L total) offer excellent placements in retail banking, corporate finance, and BFSI sector at ₹8 starting packages.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA for Marketing", href: "/mba-colleges-in-pune-for-marketing" },
          { label: "MBA for Business Analytics", href: "/mba-colleges-in-pune-for-business-analytics" },
          { label: "MBA Highest Package Pune", href: "/mba-colleges-in-pune" },
          { label: "SIBM vs SCMHRD", href: "/sibm-vs-scmhrd-pune" },
          { label: "MBA Placements Pune", href: "/mba-colleges-in-pune" },
        ]}
        ctaHeading="MBA Finance in Pune. Get Personalised Guidance"
        ctaSubtext="Our counsellors will help you target SIBM, SCMHRD or PUMBA based on your CAT/MAH-CET score."
      />
      <RelatedMbaSearches path="/mba-colleges-in-pune-for-finance" />
    </>
  )
}
