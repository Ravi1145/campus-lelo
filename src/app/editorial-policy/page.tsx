import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "Editorial Policy: How CampusLelo Verifies Admission Data",
  description: "How CampusLelo sources and verifies entrance exam dates, eligibility, exam patterns and college exam-acceptance — official vs secondary sources, review dates and corrections.",
  path: "/editorial-policy",
  keywords: ["campuslelo editorial policy", "how campuslelo verifies data"],
})

const LAST_UPDATED_ISO = "2026-10-05"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

const principles = [
  { title: "Official sources first", body: "Exam dates, eligibility, fees and patterns come from the conducting body's own website or notification wherever we can read it — for example xatonline.in for XAT, gmac.com for NMAT and GMAT, snaptest.org for SNAP and mat.aima.in for MAT." },
  { title: "Secondary sources are labelled", body: "When an official site cannot be read, we use a figure only if at least two independent education portals report the same value, and we label it \"secondary, cross-checked\" on the page." },
  { title: "Conflicts mean we withhold", body: "If sources disagree — for example on an exam date — we do not publish a figure. We say it is unconfirmed and link to the official website instead." },
  { title: "Acceptance is checked per programme", body: "A college can accept an exam for one programme or campus and not another. We list a programme as accepting an exam only after reading that institute's own admission page or brochure for the stated intake." },
  { title: "No invented numbers", body: "We do not publish predicted cut-offs, score-to-percentile tables or placement figures unless they come from published data with a clear method. Where data does not exist yet, the page says so." },
  { title: "Every fact shows when it was checked", body: "Pages show the source of each time-sensitive fact and the date we last checked it. Exam guides show a \"last reviewed\" date, and we re-verify them each admission cycle." },
  { title: "Advice is marked as advice", body: "Preparation tips and shortlisting suggestions are CampusLelo's editorial guidance, clearly separated from official facts." },
]

export default function EditorialPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Editorial Policy", url: "/editorial-policy" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${BASE_URL}/editorial-policy`,
        url: `${BASE_URL}/editorial-policy`,
        name: "CampusLelo Editorial Policy",
        dateModified: LAST_UPDATED_ISO,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL, publishingPrinciples: `${BASE_URL}/editorial-policy` },
      }) }} />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#012858] text-white">
          <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-blue-200 mb-6">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span><span className="text-white">Editorial Policy</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">How we verify admission information</h1>
            <p className="text-blue-100 max-w-3xl">Students make expensive decisions based on dates, cut-offs and acceptance lists. This is how CampusLelo sources, checks and corrects that information.</p>
            <p className="text-xs text-blue-200 mt-2">Last updated 5 Oct 2026</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Our principles</h2>
            <ul className="space-y-4">
              {principles.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{p.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Corrections</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              If you spot an error — a changed date, a programme that no longer accepts an exam, an outdated fee — email{" "}
              <a href="mailto:support@campuslelo.com" className="underline text-orange-600">support@campuslelo.com</a> with the page link and, ideally, the official source.
              We check the source and update the page and its &quot;last reviewed&quot; date.
            </p>
          </section>
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Counselling and leads</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              CampusLelo offers free admission counselling. When you share your details through a form, we use them to contact you about admissions, as described in our{" "}
              <Link href="/privacy" className="underline text-orange-600">privacy policy</Link>. Our counselling services do not change which facts we publish or how we verify them.
            </p>
          </section>
          <section className="text-sm flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/exams" className="text-orange-600 font-semibold hover:underline">Entrance exam guides →</Link>
            <Link href="/mba-vs-pgdm" className="text-orange-600 font-semibold hover:underline">MBA vs PGDM →</Link>
          </section>
        </div>
      </div>
    </>
  )
}
