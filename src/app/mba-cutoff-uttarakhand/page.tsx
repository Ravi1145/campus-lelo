import { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { publishedCutoffs, noPublishedCutoff } from "@/data/mba/cutoffs"
import { QuickAnswer, SourceNote } from "@/components/exams/MbaExamPage"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import type { SourceRef } from "@/data/mba/types"

export const revalidate = 3600

const PATH = "/mba-cutoff-uttarakhand"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const REVIEWED = "2026-10-09"

export const metadata: Metadata = genMeta({
  title: "MBA Cutoff Uttarakhand: IIM Kashipur and Dehradun",
  description: "IIM Kashipur's own published CAT minimum percentiles by category, plus which Dehradun MBA colleges (Graphic Era, UPES) publish no cut-off. Official sources only.",
  path: PATH,
  keywords: ["iim kashipur mba cutoff", "iim kashipur cutoff", "mba cutoff uttarakhand", "mba colleges in dehradun cut off", "doon business school mba cut off", "graphic era mba cutoff"],
})

const iimk = publishedCutoffs.find((c) => c.institution.includes("Kashipur"))!
const noCutoff = noPublishedCutoff.filter((n) => n.city === "Dehradun")

const QUICK = "IIM Kashipur publishes the minimum CAT percentiles it used to pick candidates for the personal interview. For CAT 2024 the General category minimums were 75 in each of the three sections and 95 overall. These are the 2024 figures, and the institute says the 2026–28 cut-offs will be updated. Dehradun's Graphic Era and UPES publish no cut-off on the pages we checked: they admit on entrance scores and a personal interview."

const faqs = [
  { question: "What is the IIM Kashipur cut-off?", answer: "IIM Kashipur publishes minimum CAT percentiles used to select candidates for the personal interview. For CAT 2024 the General category minimums were 75 in QA, DILR and VRC and 95 overall. EWS was 55/55/55/81, NC-OBC 52/52/52/81, SC 45/45/45/66, and ST and DAP 30/25/25/42. These are CAT 2024 figures. The institute says the 2026–28 figures will be updated." },
  { question: "Is the IIM Kashipur cut-off the score that gets me a seat?", answer: "No. It is the minimum used to select candidates for the interview. Final selection adds the interview and the institute's other criteria, so clearing the minimum does not guarantee a seat." },
  { question: "Does IIM Kashipur accept GMAT?", answer: "The admission page we checked says admission to its MBA is through the Common Admission Test (CAT) and does not mention GMAT." },
  { question: "What is the cut-off for MBA in Dehradun?", answer: "Graphic Era and UPES do not publish a cut-off on the programme pages we checked. Graphic Era accepts CAT, MAT, XAT, CMAT, GMAT and its own entrance test, then holds a personal interview. UPES lists its own entrance test and national-level exams, then an interview, and does not name the individual national exams on the page we checked." },
  { question: "Do coaching sites quote cut-offs for Dehradun colleges?", answer: "Yes, but where the college publishes none, those figures are estimates, and they differ from site to site. We do not print them. Ask the college's admissions office for the previous year's closing score." },
  { question: "When will the 2026–28 IIM Kashipur cut-off be available?", answer: "IIM Kashipur says on its admission page that the 2026–28 cut-offs will be updated in line with its admission guidelines. We re-check the page and update this one when the numbers appear." },
]

const split = (v: string) => v.split("/").map((x) => x.trim())

export default function MbaCutoffUttarakhandPage() {
  const sources: SourceRef[] = [...iimk.sources, ...noCutoff.map((n) => n.source)].filter((s, i, a) => a.findIndex((x) => x.url === s.url) === i)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA & PGDM", url: "/mba" }, { name: "MBA Colleges in Uttarakhand", url: "/mba-colleges-in-uttarakhand" }, { name: "MBA Cutoff Uttarakhand", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE_URL}${PATH}`, url: `${BASE_URL}${PATH}`,
        name: "MBA cut-offs in Uttarakhand: IIM Kashipur and Dehradun", description: QUICK, inLanguage: "en-IN", dateModified: REVIEWED,
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
              <Link href="/mba-colleges-in-uttarakhand" className="hover:text-white">MBA Colleges Uttarakhand</Link><span>›</span>
              <span className="text-white">MBA Cutoff Uttarakhand</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">MBA cut-offs in Uttarakhand: IIM Kashipur and Dehradun</h1>
            <p className="text-blue-100 max-w-3xl">What IIM Kashipur actually publishes, which Dehradun colleges publish nothing, and why we print no &quot;expected&quot; percentiles.</p>
            <p className="text-xs text-blue-200 mt-2">Last reviewed 9 Oct 2026 · Updated when IIM Kashipur releases 2026–28 figures</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <QuickAnswer text={QUICK} />

          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-gray-800 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p><span className="font-semibold">Read the year:</span> the table below is for CAT 2024. IIM Kashipur says the 2026–28 cut-offs are still to be updated, so use it as a guide to the level, not as this year&apos;s requirement.</p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> IIM Kashipur: minimum CAT percentiles for the interview ({iimk.examCycle})</h2>
            <p className="text-sm text-gray-600 mb-4">{iimk.measure}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[520px]">
                <thead><tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100"><th className="py-2 pr-4">Category</th><th className="py-2 pr-4">QA</th><th className="py-2 pr-4">DILR</th><th className="py-2 pr-4">VRC</th><th className="py-2">Overall</th></tr></thead>
                <tbody>
                  {iimk.values.map((v) => { const [qa, dilr, vrc, total] = split(v.value); return (
                    <tr key={v.category} className="border-b border-gray-50"><td className="py-2 pr-4 font-medium text-gray-800">{v.category}</td><td className="py-2 pr-4 text-gray-700">{qa}</td><td className="py-2 pr-4 text-gray-700">{dilr}</td><td className="py-2 pr-4 text-gray-700">{vrc}</td><td className="py-2 font-semibold text-gray-900">{total}</td></tr>
                  ) })}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-700 mt-3">{iimk.howItWorks}</p>
            <p className="text-xs text-gray-500 mt-2">{iimk.caveats}</p>
            {iimk.sources.map((s) => <SourceNote key={s.url} source={s} />)}
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Dehradun MBA colleges that publish no cut-off</h2>
            <p className="text-sm text-gray-600 mb-4">Both admit on entrance scores and a personal interview. Any single percentile you see for them elsewhere is an estimate.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead><tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100"><th className="py-2 pr-3">Institute</th><th className="py-2 pr-3">Accepted exams</th><th className="py-2">How selection works</th></tr></thead>
                <tbody>
                  {noCutoff.map((n) => (
                    <tr key={n.institution} className="border-b border-gray-50 align-top">
                      <td className="py-3 pr-3"><span className="font-semibold text-gray-900">{n.institution}</span><span className="block text-xs text-gray-500">{n.program} · {n.city}</span></td>
                      <td className="py-3 pr-3 text-gray-700">{n.examsNote}</td>
                      <td className="py-3 text-gray-700">{n.shortlisting} <a href={n.source.url} target="_blank" rel="noopener noreferrer" className="text-xs underline text-gray-500 hover:text-orange-600">source</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">How to use these numbers</h2>
            <ul className="space-y-2">
              {[
                "A minimum percentile is a filter for the interview call, not a promise of a seat. Final selection adds the interview and other criteria.",
                "IIM Kashipur's minimums are sectional as well as overall, so a weak section can rule you out even with a high overall percentile.",
                "CAT percentiles move with each year's test-taker pool. Treat a past minimum as a level, not a target.",
                "For colleges that publish nothing, ask admissions for the previous year's closing score and the weight given to the interview.",
              ].map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{t}</li>)}
            </ul>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-semibold">
              <Link href="/mba-colleges-in-uttarakhand" className="text-orange-600 hover:underline">MBA colleges in Uttarakhand →</Link>
              <Link href="/mba-colleges-in-dehradun" className="text-orange-600 hover:underline">MBA colleges in Dehradun →</Link>
              <Link href="/exams/cat/score-vs-percentile" className="text-orange-600 hover:underline">How CAT percentiles work →</Link>
              <Link href="/blog/mba-cutoff-vs-percentile-explained" className="text-orange-600 hover:underline">Cut-off vs percentile explained →</Link>
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
            <MbaLeadForm exam="CAT" city="Dehradun" placement="cutoff:uttarakhand" heading="Got your CAT score? Get a realistic shortlist" subheading="A counsellor will compare your CAT sections with IIM Kashipur, Dehradun and other options, free." />
          </div>

          <p className="text-xs text-gray-500">How we verify: <Link href="/editorial-policy" className="underline">editorial policy</Link>. Spotted a newer official cut-off? Email <a href="mailto:support@campuslelo.com" className="underline">support@campuslelo.com</a>.</p>
        </div>
      </div>
      <RelatedMbaSearches path="/mba-cutoff-uttarakhand" />
    </>
  )
}
