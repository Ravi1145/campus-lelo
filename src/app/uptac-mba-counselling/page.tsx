import { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { QuickAnswer, SourceNote } from "@/components/exams/MbaExamPage"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import type { SourceRef } from "@/data/mba/types"

export const revalidate = 3600

const PATH = "/uptac-mba-counselling"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const REVIEWED = "2026-10-15"

export const metadata: Metadata = genMeta({
  title: "UPTAC MBA Counselling 2026: CUET PG Route Explained",
  description: "How UP's UPTAC counselling fills MBA seats through CUET PG, which official documents to read, and what we leave out because sources disagree. Sourced.",
  path: PATH,
  keywords: ["uptac mba counselling", "uptac mba counselling 2026", "cuet pg mba uptac", "mba admission in up through cuet pg", "uptac pg counselling", "uptac mba cutoff", "aktu mba admission"],
})

const SOURCES: SourceRef[] = [
  { label: "UPTAC: Entrance examinations (CUET PG for MBA, MCA and lateral entry)", url: "https://uptac.admissions.nic.in/entrance-examinations/", type: "official", accessed: REVIEWED },
  { label: "UPTAC: CUET PG counselling documents", url: "https://uptac.admissions.nic.in/document-category/cuet-pg-counselling/", type: "official", accessed: REVIEWED },
  { label: "UPTAC admissions portal (Information Brochure 2026, schedule, procedure)", url: "https://uptac.samarth.edu.in/", type: "official", accessed: REVIEWED },
]

const QUICK = "UPTAC, the Uttar Pradesh Technical Admission Counselling, fills MBA, MBA lateral, MCA and MCA lateral seats through CUET PG scores. Its portal lists an Information Brochure 2026, a Counselling Procedure 2026 and a combined MBA and MCA schedule for 2026-27, and the 2025 cycle ran a special round with opening and closing ranks. We do not print dates, fees or eligibility marks here, because the pages we compared disagree; read the brochure on the official portal."

const faqs = [
  { question: "What is UPTAC MBA counselling?", answer: "UPTAC is the Uttar Pradesh Technical Admission Counselling. For MBA, MBA lateral, MCA and MCA lateral its entrance-examinations page lists CUET PG as the entrance exam, so seats are allotted through counselling on CUET PG scores." },
  { question: "Which exam do you need for MBA seats through UPTAC?", answer: "CUET PG. UPTAC's entrance-examinations page names CUET PG for MBA, MBA lateral, MCA and MCA lateral. CAT, XAT and other scores are not the route for these counselling seats. Colleges can also run their own admissions outside counselling, so check each college." },
  { question: "Where are the 2026 UPTAC dates and fees?", answer: "In the official documents. The UPTAC portal lists an Information Brochure 2026, a Counselling Procedure 2026 and a combined MBA and MCA schedule for 2026-27. We do not copy dates or fees here because the aggregator pages we compared give different dates for the same cycle." },
  { question: "Is there an UPTAC MBA cut-off?", answer: "UPTAC publishes opening and closing ranks after allotment rounds, not a percentile cut-off. For the 2025 cycle it posted PG opening and closing ranks and special-round vacancy lists on its documents pages. Ranks change every year, so use them as a guide to the level only." },
  { question: "Do UPTAC seats cover Noida, Greater Noida and Lucknow colleges?", answer: "UPTAC counselling covers institutes in Uttar Pradesh that take part, which can include colleges in Noida, Greater Noida, Lucknow and Ghaziabad. Which colleges are listed in a given year is in the official seat matrix, so check the brochure and vacancy lists." },
  { question: "Can I also apply to IIMs or private MBA colleges while in UPTAC?", answer: "Yes. UPTAC is one route. IIM Lucknow and IIM Kashipur use CAT and their own process, and many private colleges run direct admissions. Compare the routes before you fill choices." },
]

const readList = [
  "Eligibility: required graduation marks, the category relaxation and rules for final-year students.",
  "Domicile: whether seats or rounds are limited by domicile or by where you passed your qualifying exam.",
  "Fees: the registration fee and the seat-confirmation deposit for your category.",
  "Rounds: how many rounds there are, whether a special round follows, and the dates of each.",
  "CUET PG mapping: which CUET PG papers UPTAC accepts for MBA and MCA (it publishes a paper-mapping document).",
  "Seat matrix: the colleges and seats on offer, then the previous year's opening and closing ranks.",
]

export default function UptacMbaCounsellingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA & PGDM", url: "/mba" }, { name: "MBA Colleges in Uttar Pradesh", url: "/mba-colleges-in-uttar-pradesh" }, { name: "UPTAC MBA Counselling", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE_URL}${PATH}`, url: `${BASE_URL}${PATH}`,
        name: "UPTAC MBA counselling: the CUET PG route explained", description: QUICK, inLanguage: "en-IN", dateModified: REVIEWED,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL, publishingPrinciples: `${BASE_URL}/editorial-policy` },
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
        citation: SOURCES.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
      }) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#012858] text-white">
          <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-blue-200 mb-6">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/mba-colleges-in-uttar-pradesh" className="hover:text-white">MBA Colleges in Uttar Pradesh</Link><span>›</span>
              <span className="text-white">UPTAC MBA counselling</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">UPTAC MBA counselling 2026: the CUET PG route</h1>
            <p className="text-blue-100 max-w-3xl">How Uttar Pradesh fills MBA seats through counselling, what to read on the official portal, and what we deliberately do not print.</p>
            <p className="text-xs text-blue-200 mt-2">Last reviewed 15 Oct 2026 · We re-check the portal before each admission cycle</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <QuickAnswer text={QUICK} />

          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-gray-800 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p><span className="font-semibold">Why no dates on this page:</span> aggregator sites give different registration and allotment dates for the same UPTAC cycle. Counselling dates also get revised. Take them from the schedule on the official portal.</p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> What the official portal shows</h2>
            <ul className="space-y-2 mt-3">
              {[
                "MBA, MBA lateral, MCA and MCA lateral are listed against CUET PG as the entrance exam.",
                "The 2026 portal lists an Information Brochure 2026, a Counselling Procedure 2026 and a CUET PG 2026 paper-mapping document for UPTAC.",
                "A combined MBA and MCA schedule is listed for the 2026-27 session.",
                "In 2025 UPTAC ran a special round for MBA and MCA and posted PG opening and closing ranks.",
              ].map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{t}</li>)}
            </ul>
            {SOURCES.map((s) => <SourceNote key={s.url} source={s} />)}
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Read these in the Information Brochure before you register</h2>
            <p className="text-sm text-gray-600 mb-3">These are the details students most often get wrong from third-party pages.</p>
            <ul className="space-y-2">
              {readList.map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{t}</li>)}
            </ul>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-semibold">
              <Link href="/mba-colleges-in-uttar-pradesh" className="text-orange-600 hover:underline">MBA colleges in Uttar Pradesh →</Link>
              <Link href="/mba-colleges-in-lucknow" className="text-orange-600 hover:underline">MBA colleges in Lucknow →</Link>
              <Link href="/mba-colleges-noida" className="text-orange-600 hover:underline">MBA colleges in Noida →</Link>
              <Link href="/mba-cutoff-uttar-pradesh" className="text-orange-600 hover:underline">MBA cut-offs in UP →</Link>
              <Link href="/blog/mba-admission-in-uttar-pradesh" className="text-orange-600 hover:underline">MBA admission in Uttar Pradesh →</Link>
              <Link href="/mba-counselling" className="text-orange-600 hover:underline">Free MBA counselling →</Link>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{f.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div id="shortlist" className="max-w-xl">
            <MbaLeadForm exam="CUET PG" city="Lucknow" placement="uptac-mba-counselling" heading="Not sure which route suits your score?" subheading="A counsellor will compare UPTAC counselling with CAT-based and direct-admission options for you." />
          </div>

          <p className="text-xs text-gray-500">How we verify: <Link href="/editorial-policy" className="underline">editorial policy</Link>. Spotted a newer official notice? Email <a href="mailto:support@campuslelo.com" className="underline">support@campuslelo.com</a>.</p>
        </div>
      </div>
      <RelatedMbaSearches path={PATH} />
    </>
  )
}
