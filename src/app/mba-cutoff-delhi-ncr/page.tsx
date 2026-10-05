import { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { publishedCutoffs, noPublishedCutoff, CUTOFFS_LAST_REVIEWED } from "@/data/mba/cutoffs"
import { getMbaExam } from "@/data/mba/exams"
import { QuickAnswer, SourceNote } from "@/components/exams/MbaExamPage"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import type { SourceRef } from "@/data/mba/types"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const revalidate = 3600

const PATH = "/mba-cutoff-delhi-ncr"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

export const metadata: Metadata = genMeta({
  title: "MBA Cutoff Delhi NCR & Noida: FMS, IIFT, MDI, IMI, IMT",
  description: "MBA cut-offs in Delhi NCR and Noida, sourced: FMS Delhi and IIFT shortlist cut-offs, and which schools (MDI, IMI, IMT, BIMTECH, Jaipuria) publish no official percentile.",
  path: PATH,
  keywords: ["mba cutoff delhi", "mba cutoff delhi ncr", "cat cutoff delhi colleges", "fms delhi cutoff", "iift cutoff", "mdi gurgaon cutoff", "mba colleges noida cutoff"],
})

const cat = getMbaExam("cat")!
const fms = publishedCutoffs.find((c) => c.institution.startsWith("Faculty of Management Studies"))!
const iift = publishedCutoffs.find((c) => c.institution.startsWith("Indian Institute of Foreign Trade"))!

const QUICK_ANSWER = `For 2026–28 admissions, FMS Delhi's interview shortlist cut-off was a composite score of ${fms.values[0].value.replace(" composite score", "")} for the General category, and IIFT required at least 65 percentile in every CAT section (General). MDI Gurugram, IMI New Delhi, IMT Ghaziabad, BIMTECH and Jaipuria Noida do not publish official percentile cut-offs.`

const faqs = [
  { question: "What CAT percentile is needed for FMS Delhi?", answer: `FMS does not shortlist on a single CAT percentile. It uses a composite score built from CAT section scores (reported as 40% VARC, 30% DILR, 30% QA). For 2026–28, the General-category shortlist cut-off was reported as ${fms.values[0].value}.` },
  { question: "What is the IIFT sectional cut-off?", answer: "For 2026–28 (CAT 2025), IIFT required 65 percentile in each section for General, 55 for EWS/NC-OBC and 30 for SC/ST/PwD candidates. These are minimums for consideration, not a guarantee of an interview call." },
  { question: "What is the MDI Gurgaon cut-off?", answer: "MDI does not publish an official CAT percentile cut-off. It shortlists using CAT scores together with the application profile. Figures you see online are estimates based on past trends." },
  { question: "Which MBA colleges in Noida accept a lower CAT percentile?", answer: "Noida and Greater Noida institutes such as Jaipuria Noida and BIMTECH do not publish official cut-offs, so no reliable percentile can be quoted. Both accept several exams (CAT, XAT, CMAT, GMAT and, for some programmes, MAT). Apply to a mix of reach, target and safe options and check each institute's current criteria." },
  { question: "When will 2027–29 cut-offs be available?", answer: `Shortlist cut-offs for 2027–29 come after CAT 2026 results (CAT is on 29 Nov 2026). We update this page when institutes release them. Last reviewed ${CUTOFFS_LAST_REVIEWED}.` },
]

const allSources: SourceRef[] = [...publishedCutoffs.flatMap((c) => c.sources), ...noPublishedCutoff.map((n) => n.source)]
  .filter((s, i, arr) => arr.findIndex((x) => x.url === s.url) === i)

export default function MbaCutoffDelhiNcrPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "Exams", url: "/exams" }, { name: "CAT", url: "/exams/cat" }, { name: "MBA Cutoff Delhi NCR", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${BASE_URL}${PATH}`,
        url: `${BASE_URL}${PATH}`,
        name: "MBA cut-offs in Delhi NCR and Noida",
        description: QUICK_ANSWER,
        inLanguage: "en-IN",
        dateModified: CUTOFFS_LAST_REVIEWED,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL, publishingPrinciples: `${BASE_URL}/editorial-policy` },
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
        citation: allSources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
      }) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#012858] text-white">
          <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-blue-200 mb-6">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/exams" className="hover:text-white">Exams</Link><span>›</span>
              <Link href="/exams/cat" className="hover:text-white">CAT</Link><span>›</span>
              <span className="text-white">MBA Cutoff Delhi NCR</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">MBA cut-offs in Delhi NCR & Noida (sourced)</h1>
            <p className="text-blue-100 max-w-3xl">The cut-offs institutes actually released, separated from schools that publish none. We don&apos;t print &quot;expected&quot; percentiles.</p>
            <p className="text-xs text-blue-200 mt-2">Last reviewed {new Date(CUTOFFS_LAST_REVIEWED + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })} · Next update after CAT 2026 results</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <QuickAnswer text={QUICK_ANSWER} />

          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-gray-800 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <span className="font-semibold">Why most &quot;Delhi MBA cut-off&quot; lists disagree:</span> most Delhi NCR schools don&apos;t publish cut-offs, so portals publish estimates from past trends.
              Even for FMS, reported sectional minimums differ widely between sites. Below we show only figures that institutes released and that independent sources report identically.
            </p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> Published shortlist cut-offs — 2026–28 admissions ({fms.examCycle})</h2>
            <div className="space-y-6">
              {[fms, iift].map((c) => (
                <article key={c.institution} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <h3 className="font-bold text-gray-900">{c.institution}</h3>
                  <p className="text-xs text-gray-500 mb-3">{c.program} · {c.city} · Batch {c.admissionYear} · {c.examCycle}</p>
                  <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">What the number is:</span> {c.measure}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead><tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100"><th className="py-2 pr-4">Category</th><th className="py-2">Cut-off</th></tr></thead>
                      <tbody>
                        {c.values.map((v) => <tr key={v.category} className="border-b border-gray-50"><td className="py-2 pr-4 text-gray-700">{v.category}</td><td className="py-2 font-semibold text-gray-900">{v.value}</td></tr>)}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-700 mt-3">{c.howItWorks}</p>
                  <p className="text-xs text-gray-500 mt-2">{c.caveats}</p>
                  {c.sources.map((s) => <SourceNote key={s.url} source={s} />)}
                </article>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Delhi NCR & Noida schools with no official cut-off</h2>
            <p className="text-sm text-gray-600 mb-4">These institutes shortlist on the entrance score plus profile. Any single percentile you see for them is an estimate.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead><tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100"><th className="py-2 pr-3">Institute</th><th className="py-2 pr-3">Accepted exams</th><th className="py-2">How shortlisting works</th></tr></thead>
                <tbody>
                  {noPublishedCutoff.map((n) => (
                    <tr key={n.institution} className="border-b border-gray-50 align-top">
                      <td className="py-3 pr-3"><span className="font-semibold text-gray-900">{n.institution}</span><span className="block text-xs text-gray-500">{n.program} · {n.city}</span></td>
                      <td className="py-3 pr-3 text-gray-700">{n.examsNote}</td>
                      <td className="py-3 text-gray-700">{n.shortlisting} <a href={n.source.url} target="_blank" rel="noopener noreferrer" className="text-xs underline text-gray-500 hover:text-orange-600">source{n.source.type === "secondary" ? " (secondary)" : ""}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">How to use these cut-offs with your CAT score</h2>
            <ul className="space-y-2">
              {[
                "A cut-off is the minimum for an interview call, not an admission guarantee — final selection adds WAT/GD/PI, academics and work experience.",
                "FMS uses a composite score, not a percentile. Compare your CAT section scores, not your overall percentile.",
                "IIFT's numbers are per-section minimums. A weak section can rule you out even with a high overall percentile.",
                `${cat.scoring.headline} So last year's numbers are a guide, not a promise.`,
                "Apply to a mix: one or two reach schools, several targets and a few safe options that accept multiple exams.",
              ].map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{t}</li>)}
            </ul>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-semibold">
              <Link href="/exams/cat" className="text-orange-600 hover:underline">CAT 2026 guide →</Link>
              <Link href="/exams/cat/score-vs-percentile" className="text-orange-600 hover:underline">How CAT percentiles work →</Link>
              <Link href="/exams/cat/colleges" className="text-orange-600 hover:underline">Verified CAT-accepting programmes →</Link>
              <Link href="/blog/mba-colleges-delhi-ncr-noida-guide" className="text-orange-600 hover:underline">MBA in Delhi NCR & Noida guide →</Link>
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
              exam="CAT"
              city="Delhi NCR"
              placement="cutoff:delhi-ncr"
              heading="Got your CAT score? Get a realistic Delhi NCR shortlist"
              subheading="A counsellor will map your sectional scores to Delhi NCR and Noida options and deadlines — free."
            />
          </div>

          <p className="text-xs text-gray-500">How we verify: <Link href="/editorial-policy" className="underline">editorial policy</Link>. Spotted a newer official cut-off? Email <a href="mailto:support@campuslelo.com" className="underline">support@campuslelo.com</a>.</p>
        </div>
      </div>
      <RelatedMbaSearches path="/mba-cutoff-delhi-ncr" />
    </>
  )
}
