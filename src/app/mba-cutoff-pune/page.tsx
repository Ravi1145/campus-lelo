import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { admissionsByCity, maharashtraCap } from "@/data/mba/programAdmissions"
import { getMbaExam } from "@/data/mba/exams"
import { QuickAnswer, SourceNote } from "@/components/exams/MbaExamPage"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import type { SourceRef } from "@/data/mba/types"

export const revalidate = 3600

const PATH = "/mba-cutoff-pune"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const REVIEWED = "2026-10-09"

export const metadata: Metadata = genMeta({
  title: "MBA Cutoff Pune: MAH-CET, SNAP & CAT, Sourced",
  description: "MBA cut-offs in Pune without guesswork: how SIBM, SCMHRD, MIT-WPU and Maharashtra CAP seats are selected, which exams count, and where official cut-offs are.",
  path: PATH,
  keywords: ["mba cutoff pune", "mba colleges in pune cut off", "mah cet mba cutoff pune", "snap cutoff sibm pune", "pumba cutoff", "cat cutoff mba pune"],
})

const CET_CELL: SourceRef = { label: "State CET Cell Maharashtra: CAP pages and Cutoff Explorer", url: "https://cetcell.mahacet.org/cutoff-explorer/", type: "official", accessed: REVIEWED }

const pune = admissionsByCity("Pune")
const examName = (slug: string) => getMbaExam(slug)?.name ?? slug

const QUICK = "Pune's MBA programmes do not share one cut-off. Symbiosis institutes such as SIBM and SCMHRD admit through the SNAP test followed by their own selection rounds, MIT-WPU lists the exams it accepts and its own selection stages, and many other seats are filled through Maharashtra's centralised admission process (CAP), where each round closes at a different percentile by category. We print no expected percentiles, because they cannot be verified. Official CAP lists come from the State CET Cell."

const faqs = [
  { question: "What is the MAH-CET MBA cut-off for Pune colleges?", answer: "There is no single cut-off. In the CAP, each institute and seat category closes at a different percentile in each round, and the figures change every year. The official lists are published by the State CET Cell Maharashtra. Percentiles quoted for a college on other sites are usually estimates." },
  { question: "What is the SNAP cut-off for SIBM Pune?", answer: "SIBM admits through the SNAP test and then runs its own selection process. We have not verified an official SNAP cut-off, so we do not print one. Check SIBM's admissions page for the current process." },
  { question: "Which exams do Pune MBA colleges accept?", answer: "It depends on the college and the seat. SNAP is used for Symbiosis programmes, MAH-MBA CET is used for state CAP seats, and many institutes also accept CAT, XAT, CMAT, MAT, NMAT or GMAT. The table on this page shows what we have verified from official sources." },
  { question: "Can I get into a Pune MBA college with 50 percentile?", answer: "We cannot promise a seat at any percentile. Admission depends on your category, the seats left in each CAP round and each college's own criteria. A counsellor can compare your score with options that are realistic for you." },
  { question: "How are MBA cut-offs decided in Maharashtra?", answer: "For CAP seats, the closing percentile of a round is the lowest percentile that got a seat in that institute and category. It depends on how many candidates apply, their scores and their preferences, so it moves every year and every round." },
]

export default function MBACutoffPune() {
  const cap = maharashtraCap
  const sources: SourceRef[] = [CET_CELL, cap.source, ...pune.map((p) => p.source)].filter((s, i, arr) => arr.findIndex((x) => x.url === s.url) === i)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" }, { name: "MBA Cutoff Pune", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${BASE_URL}${PATH}`,
        url: `${BASE_URL}${PATH}`,
        name: "MBA cut-offs in Pune",
        description: QUICK,
        inLanguage: "en-IN",
        dateModified: REVIEWED,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL, publishingPrinciples: `${BASE_URL}/editorial-policy` },
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
        citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
      }) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#012858] text-white">
          <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-blue-200 mb-6">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/mba-colleges-in-pune" className="hover:text-white">MBA Colleges Pune</Link><span>›</span>
              <span className="text-white">MBA Cutoff Pune</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">MBA cutoff Pune: what is published and what is not</h1>
            <p className="text-blue-100 max-w-3xl">How Pune&apos;s MBA programmes select students, which exams count, and where the official cut-offs are. No &quot;expected&quot; percentiles.</p>
            <p className="text-xs text-blue-200 mt-2">Last reviewed 9 Oct 2026 · Updated after each CAP round</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <QuickAnswer text={QUICK} />

          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-gray-800 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <span className="font-semibold">Why we removed the old percentile table:</span> earlier versions of this page showed expected cut-offs by college. We could not verify them against official sources, so we took them down.
              A wrong cut-off can send a student to the wrong shortlist, so we show only what we can source.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> How verified Pune programmes select students</h2>
            <p className="text-sm text-gray-600 mb-4">From each institute&apos;s own admissions page. We add institutes as we verify them.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead><tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100"><th className="py-2 pr-3">Institute</th><th className="py-2 pr-3">Route</th><th className="py-2 pr-3">Exams accepted</th><th className="py-2">Notes</th></tr></thead>
                <tbody>
                  {pune.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 align-top">
                      <td className="py-3 pr-3"><span className="font-semibold text-gray-900">{p.institution}</span><span className="block text-xs text-gray-500">{p.program} · {p.intake}</span></td>
                      <td className="py-3 pr-3 text-gray-700">{p.route}</td>
                      <td className="py-3 pr-3 text-gray-700">{p.examsAccepted.map((s) => examName(s)).join(", ")}</td>
                      <td className="py-3 text-gray-700">{p.notes} <a href={p.source.url} target="_blank" rel="noopener noreferrer" className="text-xs underline text-gray-500 hover:text-orange-600">source</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Maharashtra CAP seats: where cut-offs really come from</h2>
            <p className="text-sm text-gray-700">{cap.summary}</p>
            <p className="text-sm text-gray-700 mt-3">The closing percentile of a round is the lowest percentile that got a seat in that institute and category. It differs by round, category and year. Use the State CET Cell&apos;s own lists for your year, then read them with our guide.</p>
            <SourceNote source={CET_CELL} />
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-semibold">
              <Link href="/blog/mah-mba-cet-cap-cutoff-explained" className="text-orange-600 hover:underline">How to read CAP cut-offs →</Link>
              <Link href="/exams/mah-mba-cet/score-vs-percentile" className="text-orange-600 hover:underline">How MAH-CET percentiles work →</Link>
              <Link href="/exams/snap/score-vs-percentile" className="text-orange-600 hover:underline">How SNAP percentiles work →</Link>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">How to use cut-offs when you choose</h2>
            <ul className="space-y-2">
              {[
                "A cut-off is a past closing point, not a minimum you must clear or a promise for this year.",
                "MAH-CET, SNAP and CAT percentiles are different scales. Do not compare them directly.",
                "Compare your score with your own category and pool, not the headline number.",
                "Apply to a mix: one or two reach options, several targets and a few safe colleges that accept more than one exam.",
              ].map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{t}</li>)}
            </ul>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-semibold">
              <Link href="/blog/mba-cutoff-vs-percentile-explained" className="text-orange-600 hover:underline">Cut-off vs percentile explained →</Link>
              <Link href="/mba-admission-process-pune" className="text-orange-600 hover:underline">MBA admission process in Pune →</Link>
              <Link href="/mba-colleges-in-pune-accepting-mh-cet" className="text-orange-600 hover:underline">Pune MBA colleges accepting MAH-CET →</Link>
              <Link href="/mba-colleges-in-pune-accepting-cat" className="text-orange-600 hover:underline">Pune MBA colleges accepting CAT →</Link>
              <Link href="/mba-cutoff-mumbai" className="text-orange-600 hover:underline">MBA cut-offs in Mumbai →</Link>
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
            <MbaLeadForm
              city="Pune"
              placement="cutoff:pune"
              heading="Got your score? Get a realistic Pune shortlist"
              subheading="A counsellor will compare your MAH-CET, SNAP or CAT score with Pune options and deadlines, free."
            />
          </div>

          <p className="text-xs text-gray-500">How we verify: <Link href="/editorial-policy" className="underline">editorial policy</Link>. Spotted an official cut-off we missed? Email <a href="mailto:support@campuslelo.com" className="underline">support@campuslelo.com</a>.</p>
        </div>
      </div>
      <RelatedMbaSearches path="/mba-cutoff-pune" />
    </>
  )
}
