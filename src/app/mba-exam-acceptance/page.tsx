import { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { QuickAnswer } from "@/components/exams/MbaExamPage"
import AcceptanceMatrix, { type MatrixRow, type MatrixExam } from "@/components/mba/AcceptanceMatrix"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { mbaExams } from "@/data/mba/exams"

export const revalidate = 3600

const PATH = "/mba-exam-acceptance"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

const rows: MatrixRow[] = programAdmissions
  .filter((p) => p.examsAccepted.length > 0)
  .map((p) => ({
    id: p.id,
    institution: p.institution.replace(/\s*\(.*?\)/g, "").split(",")[0],
    program: p.program.replace(/\s*\(.*?\)/g, ""),
    city: p.city,
    intake: p.intake.length > 18 ? "see source" : p.intake,
    accepted: p.examsAccepted,
    route: p.route,
    sourceUrl: p.source.url,
    sourceLabel: p.source.label,
    checked: p.source.accessed,
  }))

const used = new Set(rows.flatMap((r) => r.accepted))
const exams: MatrixExam[] = mbaExams.filter((e) => used.has(e.slug)).map((e) => ({ slug: e.slug, name: e.name }))
const cities = Array.from(new Set(rows.map((r) => r.city))).sort()
const checkedDates = rows.map((r) => r.checked).sort()
const latest = checkedDates[checkedDates.length - 1]

export const metadata: Metadata = genMeta({
  title: "MBA Colleges by Exam Accepted: CAT, XAT, CMAT, GMAT",
  description: "Pick the exams you took and see which verified MBA and PGDM programmes list them, with the official page for each. Delhi NCR, UP, Pune and Dehradun.",
  path: PATH,
  keywords: ["mba colleges accepting cmat", "mba colleges accepting xat", "mba colleges accepting gmat", "mba without cat colleges", "which mba colleges accept my exam", "mba exam acceptance"],
})

const QUICK = `This table lists ${rows.length} MBA and PGDM programmes we checked against the institute's own admission page. Pick the exams you have taken and only colleges that list all of them stay in view. A tick means the linked page lists that exam for that programme; a dash means the page we checked does not list it, which is not proof it is refused. Pages were last checked on ${latest}.`

const faqs = [
  { question: "What does a dash mean?", answer: "The institute's page, as we read it on the date shown, does not list that exam for that programme. Admission rules change each cycle and some colleges accept more exams than they list, so confirm with the college." },
  { question: "Why are some colleges missing?", answer: "We add a programme only after reading the institute's own admission page or brochure. Colleges we have not verified are left out rather than guessed." },
  { question: "Is acceptance the same for every programme at a college?", answer: "No. It is set per programme and per campus, so each row is one programme and links to its own source." },
  { question: "How often is this updated?", answer: "Each row shows the date we last checked its source. We re-check before each admission cycle." },
]

export default function MbaExamAcceptancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA & PGDM", url: "/mba" }, { name: "Exam acceptance", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE_URL}${PATH}`, url: `${BASE_URL}${PATH}`,
        name: "MBA colleges by exam accepted", description: QUICK, inLanguage: "en-IN", dateModified: latest,
        isPartOf: { "@id": `${BASE_URL}/#website` }, publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL },
        citation: rows.map((r) => ({ "@type": "CreativeWork", name: r.sourceLabel, url: r.sourceUrl })),
      }) }} />

      <div className="min-h-screen bg-[#F6F8FB]">
        <div className="bg-[#012858] text-white">
          <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/mba" className="hover:text-white">MBA & PGDM</Link><span>›</span>
              <span className="text-white">Exam acceptance</span>
            </nav>
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">Which MBA colleges accept your exam?</h1>
            <p className="max-w-3xl text-blue-100">One table, every verified programme, each row linked to the institute's own page.</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-blue-50 ring-1 ring-white/20"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> {rows.length} programmes verified. Latest check {latest}.</p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
          <QuickAnswer text={QUICK} />
          <AcceptanceMatrix rows={rows} exams={exams} cities={cities} />

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
            <h2 className="mb-4 text-xl font-bold text-[#012858]">Reading the table</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">{f.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{f.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link href="/mba-cutoff-checker" className="text-[#C90D11] hover:underline">Check your CAT percentile against published cut-offs →</Link>
              <Link href="/mba-colleges-in-delhi-ncr-without-cat" className="text-[#C90D11] hover:underline">MBA in Delhi NCR without CAT →</Link>
              <Link href="/mba-vs-pgdm" className="text-[#C90D11] hover:underline">MBA vs PGDM →</Link>
            </div>
          </section>

          <div className="max-w-xl">
            <MbaLeadForm exam="CAT" city="Delhi NCR" placement="exam-acceptance" heading="Not sure which exam to take?" subheading="A counsellor can match your stream, budget and city to the exams that open the most options." />
          </div>
        </div>
      </div>
      <RelatedMbaSearches path={PATH} />
    </>
  )
}
