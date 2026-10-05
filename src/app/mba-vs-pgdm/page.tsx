import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { mbaExams } from "@/data/mba/exams"
import { QuickAnswer } from "@/components/exams/MbaExamPage"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const metadata: Metadata = genMeta({
  title: "MBA vs PGDM: Differences in Degree, Approval & Admission",
  description: "MBA vs PGDM explained: university degree vs AICTE-approved diploma, what AIU equivalence means, how admissions differ in Pune (CAP vs institute process) and how to choose.",
  path: "/mba-vs-pgdm",
  keywords: ["mba vs pgdm", "difference between mba and pgdm", "pgdm vs mba fees", "is pgdm equivalent to mba", "pgdm aiu equivalence"],
})

const LAST_REVIEWED = "4 Oct 2026"
const LAST_REVIEWED_ISO = "2026-10-04"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

const QUICK_ANSWER =
  "An MBA is a master's degree awarded by a university; a PGDM is a post-graduate diploma awarded by an AICTE-approved autonomous institute. A PGDM is not automatically equivalent to an MBA — the Association of Indian Universities grants equivalence to specific PGDM programmes for a fixed period. Compare individual programmes, not the label."

const rows: { aspect: string; mba: string; pgdm: string }[] = [
  { aspect: "What you receive", mba: "A master's degree awarded by a university", pgdm: "A post-graduate diploma awarded by an autonomous institute" },
  { aspect: "Who awards it", mba: "Universities — state, central, private or deemed — and their affiliated colleges or departments", pgdm: "Stand-alone institutes approved by AICTE to run the PGDM programme" },
  { aspect: "Curriculum", mba: "Set by the university; changes go through university bodies", pgdm: "Designed by the institute within AICTE's framework, so it can be updated more often" },
  { aspect: "Equivalence to a degree", mba: "It is a degree", pgdm: "Not automatically a degree. AIU can grant a specific PGDM programme equivalence to an MBA for higher studies, for a fixed period" },
  { aspect: "Admission in Maharashtra", mba: "Many programmes admit through the State CET Cell's CAP (MAH MBA CET for state candidates; national exams for All-India seats)", pgdm: "Institute's own process using the national exams it lists (e.g. CAT, XAT, CMAT, MAT, GMAT)" },
  { aspect: "Fees", mba: "Varies widely — university departments are often cheaper; private and deemed universities can cost more", pgdm: "Varies widely by institute — compare total programme cost, not just the first-year fee" },
]

const faqs = [
  { question: "Is PGDM equivalent to MBA?", answer: "Not automatically. A PGDM is a diploma. The Association of Indian Universities (AIU) grants MBA equivalence to specific PGDM programmes for admission to higher studies, usually for a fixed period. Check whether your programme currently holds AIU equivalence if you plan a PhD or a job that asks for an \"MBA or equivalent\"." },
  { question: "Which is better, MBA or PGDM?", answer: "Neither is better by label. Compare the specific programme: approvals and accreditation, faculty, curriculum, placement reports with sources, total fees and the exams it accepts." },
  { question: "Do I need MAH MBA CET for PGDM colleges in Pune?", answer: "No. MAH MBA CET is used for MBA/MMS programmes admitted through Maharashtra's CAP. PGDM institutes set their own accepted exams, which may or may not include MAH-CET." },
  { question: "What should I check before joining a PGDM?", answer: "Check the institute's current AICTE approval for the PGDM programme and intake, any NBA accreditation, whether AIU equivalence is in force (if that matters to you), and audited placement data." },
]

const sources = [
  { label: "AICTE — approval of technical and management institutions", url: "https://www.aicte-india.org" },
  { label: "Association of Indian Universities (AIU) — equivalence", url: "https://www.aiu.ac.in" },
  { label: "Example: AIU equivalence letter for a PGDM programme, valid Jul 2025 – Jun 2028 (FORE School of Management)", url: "https://www.fsm.ac.in/images/cms/AIU-Approval-for-PGDM-from-July-2025-to-June-2028.pdf" },
]

export default function MbaVsPgdmPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "MBA vs PGDM", url: "/mba-vs-pgdm" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${BASE_URL}/mba-vs-pgdm`,
        url: `${BASE_URL}/mba-vs-pgdm`,
        name: "MBA vs PGDM: what actually differs",
        description: QUICK_ANSWER,
        inLanguage: "en-IN",
        dateModified: LAST_REVIEWED_ISO,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL },
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
        citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
      }) }} />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#012858] text-white">
          <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-blue-200 mb-6">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span><span className="text-white">MBA vs PGDM</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">MBA vs PGDM: what actually differs</h1>
            <p className="text-blue-100 max-w-3xl">An MBA is a university degree. A PGDM is a diploma from an AICTE-approved autonomous institute. Here is how that affects recognition, admissions and your choice — without the marketing claims.</p>
            <p className="text-xs text-blue-200 mt-2">Last reviewed {LAST_REVIEWED}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <QuickAnswer text={QUICK_ANSWER} />
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-x-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-4">MBA vs PGDM at a glance</h2>
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100">
                  <th className="py-2 pr-4">Aspect</th><th className="py-2 pr-4">MBA</th><th className="py-2">PGDM</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.aspect} className="border-b border-gray-50 align-top">
                    <th scope="row" className="py-3 pr-4 text-left font-semibold text-gray-900">{r.aspect}</th>
                    <td className="py-3 pr-4 text-gray-700">{r.mba}</td>
                    <td className="py-3 text-gray-700">{r.pgdm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Is a PGDM &quot;equivalent&quot; to an MBA?</h2>
            <p className="text-gray-700 leading-relaxed">
              Not automatically. A PGDM is a diploma, even from a well-known institute. The Association of Indian Universities (AIU) can grant a <em>specific</em> PGDM programme
              equivalence to an MBA degree for admission to higher studies, and that equivalence is granted for a fixed period. Equivalence matters if you plan a PhD,
              UGC-NET or a job that asks for an &quot;MBA or equivalent&quot;. For most private-sector jobs, employers look at the institute and your skills rather than the label.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">Before you join, ask the institute for its current AICTE approval and, if relevant, its AIU equivalence letter with validity dates.</p>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Checklist before you choose</h2>
            <ul className="space-y-2">
              {[
                "Current AICTE approval for the exact programme and intake (PGDM), or the university's recognition (MBA)",
                "NBA accreditation of the programme, if claimed — check the accreditation period",
                "AIU equivalence and its validity dates, if you may study further",
                "Placement report for the latest batch, ideally audited, with median as well as highest salary",
                "Total programme cost including hostel, and the refund policy",
                "Which entrance exams the programme accepts this year",
              ].map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{t}</li>)}
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Entrance exam guides for MBA and PGDM</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mbaExams.map((e) => (
                <Link key={e.slug} href={`/exams/${e.slug}`} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 text-sm group">
                  <span><span className="font-semibold text-gray-900">{e.name}</span><span className="block text-xs text-gray-500">{e.programs.join(" / ")}</span></span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500" />
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-4 text-sm">
              <Link href="/mba-colleges-pune" className="font-semibold text-orange-600 hover:underline">MBA colleges in Pune →</Link>
              <Link href="/pgdm-colleges-pune" className="font-semibold text-orange-600 hover:underline">PGDM colleges in Pune →</Link>
              <Link href="/pgdm-colleges-noida" className="font-semibold text-orange-600 hover:underline">PGDM colleges in Noida →</Link>
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

          <section className="text-xs text-gray-500">
            <p className="flex items-center gap-1.5 font-semibold text-gray-600 mb-1"><ShieldCheck className="w-3.5 h-3.5" /> Sources</p>
            <ul className="space-y-1">
              {sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">{s.label}</a></li>)}
            </ul>
          </section>

          <div id="shortlist" className="max-w-xl">
            <MbaLeadForm
              placement="guide:mba-vs-pgdm"
              heading="Still deciding between MBA and PGDM?"
              subheading="Get a free shortlist of verified MBA and PGDM options based on your exam score, budget and city."
            />
          </div>
        </div>
      </div>
      <RelatedMbaSearches path="/mba-vs-pgdm" />
    </>
  )
}
