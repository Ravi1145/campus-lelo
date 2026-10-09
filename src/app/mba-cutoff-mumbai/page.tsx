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

const PATH = "/mba-cutoff-mumbai"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const REVIEWED = "2026-10-09"

export const metadata: Metadata = genMeta({
  title: "MBA Cutoff Mumbai: JBIMS and MAH-CET CAP, Sourced",
  description: "MBA cut-offs in Mumbai without guesswork: what JBIMS publishes, where the official MAH-CET CAP cut-offs are, and reported closing percentiles labelled as such.",
  path: PATH,
  keywords: ["mba colleges in mumbai cut off", "jbims cutoff", "mba cutoff mumbai", "mah cet mba cutoff jbims", "mba colleges in mumbai with cat cut off", "jbims cat cutoff"],
})

const src = (label: string, url: string, type: SourceRef["type"]): SourceRef => ({ label, url, type, accessed: REVIEWED })

const JBIMS_OFFICIAL = src("JBIMS official website: admissions FAQ and announcements", "https://www.jbims.edu/", "official")
const CET_CELL = src("State CET Cell Maharashtra: CAP pages and Cutoff Explorer", "https://cetcell.mahacet.org/cutoff-explorer/", "official")
const CRACKU = src("Cracku: JBIMS cut-off 2026 (past CAP closing percentiles)", "https://cracku.in/jbims-cut-off-2026", "secondary")
const C360 = src("Careers360: JBIMS CET cut-off (past-year trend tables)", "https://www.careers360.com/mba/articles/jbims-cet-cutoff", "secondary")

// Past CAP closing percentiles for JBIMS as reported by two portals. Neither labels them official, so they
// are shown as "reported" with both readings, never as a single confirmed figure. 2026 figures are expected
// values on those sites, so we do not print them.
const REPORTED = [
  { year: "2024", category: "All India", reading: "99.99", note: "Both sites report 99.99." },
  { year: "2025", category: "All India", reading: "99.98–99.99", note: "Cracku: 99.98–99.99. Careers360: 99.99." },
  { year: "2025", category: "General, Maharashtra (GOPENS)", reading: "99.92–99.94", note: "Cracku: 99.92–99.94. Careers360: 99.94." },
]

const QUICK = "JBIMS, Mumbai's government management institute, selects MBA (MMS) students through Maharashtra's centralised admission process (CAP) using MAH-MBA CET scores, and also considers CAT and CMAT. Its website publishes no minimum cut-off. Two education portals report that it closed at about the 99.99 percentile for the All India category in 2024 and 2025, but these are reported figures, not official ones. Round-wise closing percentiles come from the State CET Cell."

const faqs = [
  { question: "What is the JBIMS cut-off?", answer: "JBIMS does not publish a minimum cut-off on its website. Education portals report that its All India category closed at about the 99.99 percentile in 2024 and 2025 and its General Maharashtra category at about 99.92–99.94 in 2025. These are reported figures for past CAP rounds, not official ones, and they change every year." },
  { question: "How does JBIMS admit students?", answer: "JBIMS's website says selection is through the common admission process (CAP rounds) run by DTE Maharashtra, and that applicants may appear for MAH-MBA CET. It also says the institute considers national tests such as CAT and CMAT." },
  { question: "Where can I find the official MBA CAP cut-offs?", answer: "The State CET Cell Maharashtra runs the CAP and lists a Cutoff Explorer and CAP pages for each year on cetcell.mahacet.org. Check there for the institute-wise closing percentiles of each round. We could not confirm whether the explorer includes MBA/MMS lists, so check the CAP page for your year." },
  { question: "Is the 99.99 percentile the cut-off for 2026?", answer: "No. The 2026 figures on portals are expected values, not released cut-offs, so we do not publish them. Use the official CAP lists after each round." },
  { question: "Which other Mumbai MBA colleges publish a cut-off?", answer: "We have only verified JBIMS so far. We have not yet checked NMIMS, SPJIMR, Welingkar, KJ Somaiya and other Mumbai institutes against their own admission pages, so we do not state their cut-offs or exams. Check each institute's official admissions page." },
  { question: "Can I get into JBIMS with a lower percentile?", answer: "Closing percentiles reported for past years are very high, and admission depends on your category, seats and the CAP round. We cannot promise a seat at any percentile. A counsellor can compare your score with realistic options." },
]

export default function MbaCutoffMumbaiPage() {
  const sources = [JBIMS_OFFICIAL, CET_CELL, CRACKU, C360]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA & PGDM", url: "/mba" }, { name: "MBA Cutoff Mumbai", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${BASE_URL}${PATH}`,
        url: `${BASE_URL}${PATH}`,
        name: "MBA cut-offs in Mumbai: JBIMS and MAH-CET CAP",
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
              <Link href="/mba" className="hover:text-white">MBA &amp; PGDM</Link><span>›</span>
              <span className="text-white">MBA Cutoff Mumbai</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">MBA cut-offs in Mumbai: JBIMS and MAH-CET CAP</h1>
            <p className="text-blue-100 max-w-3xl">What Mumbai&apos;s top government MBA institute actually publishes, where the official numbers are, and which reported figures to treat with caution. No &quot;expected&quot; percentiles.</p>
            <p className="text-xs text-blue-200 mt-2">Last reviewed 9 Oct 2026 · Updated after each CAP round</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <QuickAnswer text={QUICK} />

          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-gray-800 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <span className="font-semibold">Why Mumbai cut-off lists disagree:</span> JBIMS does not release a cut-off, so portals publish estimates and past closing percentiles that differ by a few hundredths of a percentile.
              Below we show past figures only where two portals report them, as a range, and we label them as reported.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> What JBIMS says on its own website</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Selection is through the common admission process (CAP rounds) carried out by DTE Maharashtra.</li>
              <li>Applicants may appear for MAH-MBA CET. The institute also considers national-level tests such as CAT and CMAT.</li>
              <li>The page we checked gives no minimum percentile or cut-off, and no seat counts.</li>
            </ul>
            <SourceNote source={JBIMS_OFFICIAL} />
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">JBIMS closing percentiles reported for past years</h2>
            <p className="text-sm text-gray-600 mb-4">Reported by two education portals for earlier CAP rounds. Neither calls them official, so treat them as a rough guide, not a target.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[560px]">
                <thead><tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100"><th className="py-2 pr-4">Year</th><th className="py-2 pr-4">Category</th><th className="py-2 pr-4">Reported closing percentile</th><th className="py-2">Note</th></tr></thead>
                <tbody>
                  {REPORTED.map((r) => (
                    <tr key={r.year + r.category} className="border-b border-gray-50 align-top">
                      <td className="py-2.5 pr-4 text-gray-700">{r.year}</td>
                      <td className="py-2.5 pr-4 text-gray-700">{r.category}</td>
                      <td className="py-2.5 pr-4 font-semibold text-gray-900">{r.reading}</td>
                      <td className="py-2.5 text-gray-600">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">We do not publish 2026 figures: on both sites they are expected values, not released cut-offs. CAP closing percentiles differ by round, so a single number is only part of the picture.</p>
            <SourceNote source={CRACKU} />
            <SourceNote source={C360} />
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Where to find the official round-wise cut-offs</h2>
            <p className="text-sm text-gray-700">The State CET Cell Maharashtra runs the CAP. Its site lists CAP pages for each academic year and a Cutoff Explorer. Open the page for your year and look for MBA/MMS cut-off or allotment lists. We could not confirm that the explorer covers MBA/MMS, so check the CAP page too.</p>
            <SourceNote source={CET_CELL} />
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">How to use this with your score</h2>
            <ul className="space-y-2">
              {[
                "A closing percentile is the lowest score that got a seat in a round, for one category. It is not a minimum you must clear.",
                "Your category and domicile matter as much as your percentile: the All India and Maharashtra pools close at different points.",
                "MAH-CET percentiles and CAT percentiles are different scales. Do not compare them directly. See how each exam builds its score.",
                "Apply to a mix: one or two reach options, several targets and a few safe colleges that accept more than one exam.",
              ].map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{t}</li>)}
            </ul>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-semibold">
              <Link href="/exams/mah-mba-cet" className="text-orange-600 hover:underline">MAH-MBA CET guide →</Link>
              <Link href="/exams/mah-mba-cet/score-vs-percentile" className="text-orange-600 hover:underline">How MAH-CET percentiles work →</Link>
              <Link href="/blog/mba-cutoff-vs-percentile-explained" className="text-orange-600 hover:underline">Cut-off vs percentile explained →</Link>
              <Link href="/blog/mah-mba-cet-cap-cutoff-explained" className="text-orange-600 hover:underline">How to read CAP cut-offs →</Link>
              <Link href="/mba-cutoff-pune" className="text-orange-600 hover:underline">MBA cut-offs in Pune →</Link>
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
              exam="MAH-MBA CET"
              city="Mumbai"
              placement="cutoff:mumbai"
              heading="Got your score? Get a realistic Mumbai shortlist"
              subheading="A counsellor will compare your MAH-CET, CAT or CMAT score with Mumbai and Maharashtra options and deadlines, free."
            />
          </div>

          <p className="text-xs text-gray-500">How we verify: <Link href="/editorial-policy" className="underline">editorial policy</Link>. Spotted an official cut-off we missed? Email <a href="mailto:support@campuslelo.com" className="underline">support@campuslelo.com</a>.</p>
        </div>
      </div>
      <RelatedMbaSearches path="/mba-cutoff-mumbai" />
    </>
  )
}
