import { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { noPublishedCutoff, publishedCutoffs } from "@/data/mba/cutoffs"
import { QuickAnswer, SourceNote } from "@/components/exams/MbaExamPage"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import type { SourceRef } from "@/data/mba/types"

export const revalidate = 3600

const PATH = "/mba-cutoff-uttar-pradesh"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const REVIEWED = "2026-10-09"

export const metadata: Metadata = genMeta({
  title: "MBA Cutoff Noida, Lucknow & UP: What Is Published",
  description: "MBA cut-offs in Noida, Greater Noida, Lucknow and Uttar Pradesh: which colleges publish one, how UP's UPTAC and CUET-PG route works, and where to check official lists.",
  path: PATH,
  keywords: ["mba cutoff noida", "mba cutoff uttar pradesh", "mba colleges in up cut off", "uptac mba cutoff", "iim lucknow cutoff", "mba colleges in greater noida cut off", "aktu mba cutoff"],
})

const UPTAC: SourceRef = { label: "UPTAC (Uttar Pradesh Technical Admission Counselling): official site and notices", url: "https://uptac.samarth.edu.in/", type: "official", accessed: REVIEWED }
const UP_CITIES = ["Lucknow", "Noida", "Greater Noida", "Ghaziabad"]
const rows = noPublishedCutoff.filter((n) => UP_CITIES.includes(n.city))
const stated = publishedCutoffs.filter((c) => UP_CITIES.includes(c.city))

const QUICK = "Among the Noida, Greater Noida, Ghaziabad and Lucknow institutes we have verified, only Sharda University states minimum percentiles on its admission page (MAT 75, CAT or XAT 65). IIM Lucknow, Jaypee Business School, BIMTECH, Jaipuria and IMT publish no fixed percentile cut-off, so any single number for them is an estimate. State-affiliated MBA seats in Uttar Pradesh are filled through UPTAC counselling, whose official site lists a CUET PG paper-mapping notice for 2026. We print no expected percentiles."

const faqs = [
  { question: "What are the MBA minimum percentiles at Sharda University?", answer: "Sharda's MBA admission page states a minimum of 75 percentile for MAT and 65 percentile for CAT or XAT, the latter followed by a group discussion and personal interview. It also accepts its own SUAT test and needs graduation with 50%. These are eligibility minimums, not the closing score of a past batch." },
  { question: "What is the MBA cut-off in Noida?", answer: "Noida's institutes we have verified, Jaypee Business School and Jaipuria, do not publish a percentile cut-off on their admission pages. JBS shortlists on a valid exam score and then holds a group discussion and interview. Any single percentile quoted for them elsewhere is an estimate." },
  { question: "What is the cut-off for IIM Lucknow?", answer: "IIM Lucknow admits to its MBA (PGP) through CAT only. Its admission policy says interview shortlisting uses CAT performance, scholastic record and work experience, followed by a written ability test and personal interview. The page we checked states no minimum percentile." },
  { question: "How does MBA admission work in Uttar Pradesh colleges?", answer: "Seats in state-affiliated colleges are handled through UPTAC counselling. UPTAC's official site lists a notice on CUET PG paper mappings for 2026, and education portals report that MBA admission uses CUET PG scores. The site did not list MBA programmes on the page we checked, so confirm in the current information brochure." },
  { question: "Is there a UPSEE or AKTU entrance test for MBA?", answer: "Education portals report that the state stopped running its own MBA entrance test and moved to national exams. Confirm the current rule in UPTAC's brochure before you apply." },
  { question: "Which exams do Noida and Greater Noida MBA colleges accept?", answer: "It varies. Jaypee Business School accepts CAT, MAT, CMAT, XAT, GMAT, ATMA and CUET-PG. BIMTECH accepts CAT, XAT, GMAT and CMAT. Jaipuria accepts CAT, XAT, CMAT, MAT and GMAT. See our verified lists for details and dates." },
  { question: "Where can I find official cut-off lists for UP counselling?", answer: "UPTAC's official site lists notices such as opening and closing rank details for the year. Check it for the programme you want and the current session." },
]

export default function MbaCutoffUttarPradeshPage() {
  const sources: SourceRef[] = [UPTAC, ...rows.map((n) => n.source)].filter((s, i, a) => a.findIndex((x) => x.url === s.url) === i)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA & PGDM", url: "/mba" }, { name: "MBA Colleges in Uttar Pradesh", url: "/mba-colleges-in-uttar-pradesh" }, { name: "MBA Cutoff UP", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE_URL}${PATH}`, url: `${BASE_URL}${PATH}`,
        name: "MBA cut-offs in Noida, Greater Noida, Lucknow and Uttar Pradesh", description: QUICK, inLanguage: "en-IN", dateModified: REVIEWED,
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
              <Link href="/mba-colleges-in-uttar-pradesh" className="hover:text-white">MBA Colleges Uttar Pradesh</Link><span>›</span>
              <span className="text-white">MBA Cutoff UP</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">MBA cut-offs in Noida, Greater Noida, Lucknow and Uttar Pradesh</h1>
            <p className="text-blue-100 max-w-3xl">Which institutes publish a cut-off, how UP&apos;s UPTAC route works, and where to check official lists. No &quot;expected&quot; percentiles.</p>
            <p className="text-xs text-blue-200 mt-2">Last reviewed 9 Oct 2026 · Updated as institutes release figures</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <QuickAnswer text={QUICK} />

          <section className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-gray-800 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p><span className="font-semibold">Why UP cut-off lists disagree:</span> most Noida, Greater Noida and Lucknow institutes publish no percentile, so portals publish estimates that differ from each other. We show what each institute itself says, and nothing more.</p>
          </section>

          {stated.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> Minimum percentiles an institute states</h2>
              <div className="space-y-6">
                {stated.map((c) => (
                  <article key={c.institution} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <h3 className="font-bold text-gray-900">{c.institution}</h3>
                    <p className="text-xs text-gray-500 mb-3">{c.program} · {c.city} · {c.admissionYear}</p>
                    <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">What the number is:</span> {c.measure}</p>
                    <table className="w-full text-sm"><tbody>
                      {c.values.map((v) => <tr key={v.category} className="border-b border-gray-50"><td className="py-2 pr-4 text-gray-700">{v.category}</td><td className="py-2 font-semibold text-gray-900">{v.value}</td></tr>)}
                    </tbody></table>
                    <p className="text-sm text-gray-700 mt-3">{c.howItWorks}</p>
                    <p className="text-xs text-gray-500 mt-2">{c.caveats}</p>
                    {c.sources.map((s) => <SourceNote key={s.url} source={s} />)}
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> Verified institutes with no fixed percentile and how they shortlist</h2>
            <p className="text-sm text-gray-600 mb-4">From each institute&apos;s own admission page. We add institutes as we verify them.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead><tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100"><th className="py-2 pr-3">Institute</th><th className="py-2 pr-3">Accepted exams</th><th className="py-2">How shortlisting works</th></tr></thead>
                <tbody>
                  {rows.map((n) => (
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
            <h2 className="text-lg font-bold text-gray-900 mb-3">UP&apos;s state counselling route (UPTAC)</h2>
            <p className="text-sm text-gray-700">UPTAC runs counselling and admission for degree-level engineering institutions and other professional colleges in Uttar Pradesh. Its official site shows a notice titled &quot;CUET PG 2026 Paper Mappings for UPTAC 2026&quot;, an information brochure, a counselling procedure and opening and closing rank details. The page we checked did not list MBA programmes. Education portals report that MBA seats in AKTU-affiliated colleges use CUET PG scores, so read the current brochure to confirm which programmes and papers apply.</p>
            <SourceNote source={UPTAC} />
            <p className="text-sm text-gray-700 mt-3">Read our guide to how this works: <Link href="/blog/mba-admission-in-uttar-pradesh" className="font-bold text-[#C90D11] hover:underline">MBA admission in Uttar Pradesh: CUET PG, UPTAC and direct routes →</Link></p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">How to use this</h2>
            <ul className="space-y-2">
              {[
                "Where an institute publishes no cut-off, ask admissions for last year's closing score and how much weight the interview carries.",
                "For UPTAC counselling, compare your CUET PG score with the previous year's opening and closing ranks published by UPTAC, not with a coaching site's estimate.",
                "Apply to a mix: one or two reach options, several targets and a few colleges that accept more than one exam.",
              ].map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{t}</li>)}
            </ul>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-semibold">
              <Link href="/mba-colleges-in-uttar-pradesh" className="text-orange-600 hover:underline">MBA colleges in Uttar Pradesh →</Link>
              <Link href="/mba-colleges-in-lucknow" className="text-orange-600 hover:underline">MBA colleges in Lucknow →</Link>
              <Link href="/mba-colleges-noida" className="text-orange-600 hover:underline">MBA colleges in Noida →</Link>
              <Link href="/mba-colleges-in-greater-noida" className="text-orange-600 hover:underline">MBA colleges in Greater Noida →</Link>
              <Link href="/mba-cutoff-delhi-ncr" className="text-orange-600 hover:underline">MBA cut-offs in Delhi NCR →</Link>
              <Link href="/blog/cuet-pg-mba-colleges-and-cutoff-explained" className="text-orange-600 hover:underline">CUET PG for MBA →</Link>
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
            <MbaLeadForm city="Noida" placement="cutoff:uttar-pradesh" heading="Got your score? Get a realistic UP shortlist" subheading="A counsellor will compare your CAT, CUET PG or other score with Noida, Greater Noida and Lucknow options, free." />
          </div>

          <p className="text-xs text-gray-500">How we verify: <Link href="/editorial-policy" className="underline">editorial policy</Link>. Spotted a newer official cut-off? Email <a href="mailto:support@campuslelo.com" className="underline">support@campuslelo.com</a>.</p>
        </div>
      </div>
      <RelatedMbaSearches path="/mba-cutoff-uttar-pradesh" />
    </>
  )
}
