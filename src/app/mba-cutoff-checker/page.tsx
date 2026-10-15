import { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { QuickAnswer } from "@/components/exams/MbaExamPage"
import CutoffChecker from "@/components/mba/CutoffChecker"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const revalidate = 3600

const PATH = "/mba-cutoff-checker"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const REVIEWED = "2026-10-15"

export const metadata: Metadata = genMeta({
  title: "MBA Cut-off Checker: Your CAT Percentile vs Published",
  description: "Enter your CAT percentiles and see which published minimums you meet at IIFT, IIM Kashipur and Sharda. Every figure has a source and a year.",
  path: PATH,
  keywords: ["mba cutoff checker", "cat percentile vs cutoff", "can i get iift with my cat percentile", "iim kashipur cutoff check", "cat percentile calculator colleges", "mba college predictor cat"],
})

const QUICK = "This checker compares your CAT percentiles with the minimums institutes have published: IIFT's sectional percentiles for the 2026-28 batch, IIM Kashipur's CAT 2024 section and overall percentiles, and the minimum Sharda University states. Meeting a minimum only makes you eligible. It is a filter for the shortlist, not an offer, and we show no guessed or expected cut-offs."

const faqs = [
  { question: "Does meeting a published cut-off mean I will get a call or a seat?", answer: "No. The figures are minimums used to shortlist or to be eligible. Final selection also uses the interview, group discussion, academics and other parameters the institute sets." },
  { question: "Why are there only a few institutes?", answer: "We list only cut-offs an institute itself released and that we could cross-check. Many colleges publish none, or only a trend quoted by coaching sites, and we do not print those." },
  { question: "Why does FMS show 'cannot compare'?", answer: "FMS shortlists on a composite score built from section scores, not percentiles. We cannot convert your percentiles into that composite, so we point to FMS's own notice." },
  { question: "Are the IIM Kashipur figures current?", answer: "They are the CAT 2024 minimums IIM Kashipur publishes. For the 2026-28 batch it shortlisted through the Joint Admission Process, where the category cut-offs are published on the JAP portal." },
  { question: "Is my data saved?", answer: "No. The checker runs in your browser and nothing you type is sent to us." },
]

export default function MbaCutoffCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA & PGDM", url: "/mba" }, { name: "MBA Cut-off Checker", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "WebApplication", name: "MBA cut-off checker", url: `${BASE_URL}${PATH}`,
        applicationCategory: "EducationalApplication", operatingSystem: "Any", inLanguage: "en-IN", dateModified: REVIEWED,
        description: QUICK, offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL },
      }) }} />

      <div className="min-h-screen bg-[#F6F8FB]">
        <div className="bg-[#012858] text-white">
          <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/mba" className="hover:text-white">MBA & PGDM</Link><span>›</span>
              <span className="text-white">Cut-off checker</span>
            </nav>
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">MBA cut-off checker</h1>
            <p className="max-w-3xl text-blue-100">Type your CAT percentiles. See, college by college, which published minimums you meet, which you miss and by how much.</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-blue-50 ring-1 ring-white/20"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> Only figures an institute published. Last reviewed 15 Oct 2026.</p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
          <QuickAnswer text={QUICK} />
          <CutoffChecker />

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
            <h2 className="mb-4 text-xl font-bold text-[#012858]">Questions about this checker</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">{f.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{f.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link href="/mba-cutoff-delhi-ncr" className="text-[#C90D11] hover:underline">MBA cut-offs Delhi NCR →</Link>
              <Link href="/mba-cutoff-uttarakhand" className="text-[#C90D11] hover:underline">IIM Kashipur cut-off →</Link>
              <Link href="/mba-exam-acceptance" className="text-[#C90D11] hover:underline">Which colleges accept which exam →</Link>
              <Link href="/exams/cat/score-vs-percentile" className="text-[#C90D11] hover:underline">How CAT percentiles work →</Link>
            </div>
          </section>

          <div className="max-w-xl">
            <MbaLeadForm exam="CAT" city="Delhi NCR" placement="cutoff-checker" heading="Want a person to read your result?" subheading="A counsellor will compare your percentiles with colleges that publish no cut-off and suggest a realistic shortlist." />
          </div>
        </div>
      </div>
      <RelatedMbaSearches path={PATH} />
    </>
  )
}
