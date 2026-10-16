import Link from "next/link"
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react"
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { QuickAnswer, SourceNote } from "@/components/exams/MbaExamPage"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import { mbaExams } from "@/data/mba/exams"
import type { PublishedCutoff, NoPublishedCutoff } from "@/data/mba/cutoffs"
import type { ProgramAdmission, SourceRef } from "@/data/mba/types"

// One institute, one question: a page for a specific search such as "FMS Delhi CAT cutoff".
// Every figure comes from the verified data files (cutoffs.ts, programAdmissions.ts); the page only
// adds explanation. If an institute publishes no cut-off, the page says so instead of guessing.

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

export interface InstituteGuideProps {
  path: string
  h1: string
  intro: string
  quick: string
  reviewed: string
  parent: { href: string; label: string }
  faqs: { question: string; answer: string }[]
  cutoff?: PublishedCutoff
  noCutoff?: NoPublishedCutoff
  admission?: ProgramAdmission
  yearNote?: string
  howTo: string[]
  links: { href: string; label: string }[]
  leadCity: string
  leadExam: string
}

const examName = (slug: string) => mbaExams.find((e) => e.slug === slug)?.name ?? slug.replace(/-/g, " ").toUpperCase()

export default function InstituteGuide(p: InstituteGuideProps) {
  const sources: SourceRef[] = [
    ...(p.cutoff?.sources ?? []),
    ...(p.noCutoff ? [p.noCutoff.source] : []),
    ...(p.admission ? [p.admission.source] : []),
  ].filter((s, i, a) => a.findIndex((x) => x.url === s.url) === i)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA & PGDM", url: "/mba" }, { name: p.parent.label, url: p.parent.href }, { name: p.h1, url: p.path },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(p.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE_URL}${p.path}`, url: `${BASE_URL}${p.path}`,
        name: p.h1, description: p.quick, inLanguage: "en-IN", dateModified: p.reviewed,
        isPartOf: { "@id": `${BASE_URL}/#website` },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL, publishingPrinciples: `${BASE_URL}/editorial-policy` },
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
        citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
      }) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#012858] text-white">
          <div className="mx-auto max-w-5xl px-4 py-8 md:py-10">
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href={p.parent.href} className="hover:text-white">{p.parent.label}</Link><span>›</span>
              <span className="text-white">{p.h1}</span>
            </nav>
            <h1 className="mb-2 text-2xl font-extrabold md:text-3xl">{p.h1}</h1>
            <p className="max-w-3xl text-blue-100">{p.intro}</p>
            <p className="mt-2 text-xs text-blue-200">Last reviewed {p.reviewed}. Updated when the institute publishes its next admission details.</p>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-5 px-4 py-6">
          <QuickAnswer text={p.quick} />

          {p.yearNote && (
            <section className="flex gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-gray-800">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <p><span className="font-semibold">Read the year:</span> {p.yearNote}</p>
            </section>
          )}

          {p.cutoff && (
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-1 flex items-center gap-2 text-lg font-bold text-gray-900"><ShieldCheck className="h-4 w-4 text-orange-500" /> {p.cutoff.institution}: published figures ({p.cutoff.examCycle}, {p.cutoff.admissionYear} batch)</h2>
              <p className="mb-3 text-sm text-gray-600">{p.cutoff.measure}</p>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] text-sm">
                  <thead><tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wide text-gray-500"><th className="py-2 pr-4">Category</th><th className="py-2">Published figure</th></tr></thead>
                  <tbody>
                    {p.cutoff.values.map((v) => (
                      <tr key={v.category} className="border-b border-gray-50"><td className="py-2 pr-4 font-medium text-gray-800">{v.category}</td><td className="py-2 font-semibold text-gray-900">{v.value}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-gray-700">{p.cutoff.howItWorks}</p>
              <p className="mt-2 text-xs text-gray-500">{p.cutoff.caveats}</p>
              {p.cutoff.sources.map((s) => <SourceNote key={s.url} source={s} />)}
            </section>
          )}

          {p.noCutoff && (
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-bold text-gray-900">{p.noCutoff.institution}: no published cut-off</h2>
              <p className="text-sm text-gray-700">{p.noCutoff.shortlisting}</p>
              <p className="mt-2 text-sm text-gray-600">Exams noted: {p.noCutoff.examsNote}.</p>
              <SourceNote source={p.noCutoff.source} />
            </section>
          )}

          {p.admission && (
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-bold text-gray-900">Admission details for the {p.admission.intake} intake</h2>
              <p className="mb-2 text-sm text-gray-600">{p.admission.institution}, {p.admission.program}.</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">Exams it lists:</span>{" "}
                {p.admission.examsAccepted.map((s, i) => (
                  <span key={s}>{i > 0 && ", "}{mbaExams.some((e) => e.slug === s) ? <Link href={`/exams/${s}`} className="text-orange-600 underline">{examName(s)}</Link> : examName(s)}</span>
                ))}
              </p>
              {p.admission.notes && <p className="mt-2 text-sm leading-relaxed text-gray-700">{p.admission.notes}</p>}
              <SourceNote source={p.admission.source} />
            </section>
          )}

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-gray-900">How to use this</h2>
            <ul className="space-y-2">
              {p.howTo.map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />{t}</li>)}
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {p.links.map((l) => <Link key={l.href} href={l.href} className="text-orange-600 hover:underline">{l.label} →</Link>)}
              <Link href="/mba-cutoff-checker" className="text-orange-600 hover:underline">Check your percentile →</Link>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Frequently asked questions</h2>
            <div className="space-y-4">
              {p.faqs.map((f) => (
                <div key={f.question} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">{f.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div id="shortlist" className="max-w-xl">
            <MbaLeadForm exam={p.leadExam} city={p.leadCity} placement={`institute:${p.path.slice(1)}`} heading="Got your score? Get a realistic shortlist" subheading="A counsellor will compare your scores with this institute and similar options, free." />
          </div>

          <p className="text-xs text-gray-500">How we verify: <Link href="/editorial-policy" className="underline">editorial policy</Link>. Spotted a newer official figure? Email <a href="mailto:support@campuslelo.com" className="underline">support@campuslelo.com</a>.</p>
        </div>
      </div>
    </>
  )
}
