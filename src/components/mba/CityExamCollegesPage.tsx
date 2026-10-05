import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle2, ListChecks, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import { getMbaExam } from "@/data/mba/exams"
import { admissionsForExam, maharashtraCap } from "@/data/mba/programAdmissions"
import type { ExamProfile, ProgramAdmission } from "@/data/mba/types"
import { CapExplainer, ProgramList, QuickAnswer, SourceNote, SourcesList, collectSources, examTitleName } from "@/components/exams/MbaExamPage"
import MbaLeadForm from "@/components/leads/MbaLeadForm"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

// "MBA colleges in <city> accepting <exam>" — built only from verified
// programme records (src/data/mba/programAdmissions.ts) and the Maharashtra CAP
// rule. No cut-offs or fees are shown unless they are sourced.

type City = ProgramAdmission["city"]

export function cityExamMetadata(examSlug: string, city: City, path: string): Metadata {
  const exam = getMbaExam(examSlug)!
  return genMeta({
    title: `MBA Colleges in ${city} Accepting ${exam.name} (Verified ${examYearOr(exam)})`,
    description: `Which MBA and PGDM programmes in ${city} accept ${exam.name}? Verified against each institute's admission page${capApplies(exam, city) ? ", plus how Maharashtra CAP uses " + exam.name : ""}. Dates, pattern and next steps.`.slice(0, 160),
    path,
    keywords: [`mba colleges in ${city.toLowerCase()} accepting ${exam.name.toLowerCase()}`, `${exam.name.toLowerCase()} colleges ${city.toLowerCase()}`, `pgdm colleges accepting ${exam.name.toLowerCase()} ${city.toLowerCase()}`],
  })
}

function examYearOr(exam: ExamProfile) {
  return examTitleName(exam).replace(exam.name, "").trim() || "2026"
}

function capApplies(exam: ExamProfile, city: City) {
  return city === "Pune" && maharashtraCap.allIndiaSeatExams.includes(exam.slug)
}

export default function CityExamCollegesPage({ examSlug, city, path }: { examSlug: string; city: City; path: string }) {
  const exam = getMbaExam(examSlug)!
  const programs = admissionsForExam(exam.slug).filter((p) => p.city === city)
  const otherCities = admissionsForExam(exam.slug).filter((p) => p.city !== city)
  const cap = capApplies(exam, city)

  const faqs = [
    {
      question: `Which MBA colleges in ${city} accept ${exam.name}?`,
      answer: programs.length
        ? `Verified so far: ${programs.map((p) => `${p.institution} (${p.program})`).join("; ")}.${cap ? ` ${exam.name} is also accepted for All-India seats in MBA programmes that admit through Maharashtra's CAP.` : ""} Always confirm on the institute's admission page.`
        : cap
          ? `${exam.name} is accepted for All-India seats in MBA programmes that admit through Maharashtra's CAP. We have not yet verified individual ${city} programmes that accept ${exam.name} directly.`
          : `We have not yet verified any ${city} programmes that accept ${exam.name}.`,
    },
    {
      question: `Is ${exam.name} accepted for PGDM in ${city}?`,
      answer: `PGDM institutes set their own accepted exams. ${programs.some((p) => p.programType === "PGDM") ? "The PGDM programmes listed on this page accept it for the stated intake." : `Check each PGDM institute's admission page — we list a PGDM here only after verifying it.`}`,
    },
    ...(exam.keyDates.length ? [{ question: `When is ${examTitleName(exam)}?`, answer: exam.keyDates.map((d) => `${d.label}: ${d.value}`).join(". ") + "." }] : []),
  ]

  const answer = faqs[0].answer
  const sources = [...collectSources(exam, programs), ...(cap ? [maharashtraCap.source] : [])]
    .filter((s, i, arr) => arr.findIndex((x) => x.label === s.label) === i)
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}${path}`,
    url: `${BASE_URL}${path}`,
    name: `MBA & PGDM colleges in ${city} accepting ${exam.name}`,
    description: answer,
    inLanguage: "en-IN",
    dateModified: exam.lastReviewed,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
    citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
    ...(programs.length ? { mainEntity: { "@type": "ItemList", numberOfItems: programs.length, itemListElement: programs.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p.institution} — ${p.program}`, ...(p.collegeSlug ? { url: `${BASE_URL}/colleges/${p.collegeSlug}` } : {}) })) } } : {}),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: `MBA Colleges in ${city}`, url: city === "Pune" ? "/mba-colleges-in-pune" : "/mba-colleges-noida" },
        { name: `Accepting ${exam.name}`, url: path },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#012858] text-white">
          <div className="max-w-5xl mx-auto px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-blue-200 mb-6">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href={city === "Pune" ? "/mba-colleges-in-pune" : "/mba-colleges-noida"} className="hover:text-white">MBA Colleges in {city}</Link><span>›</span>
              <span className="text-white">Accepting {exam.name}</span>
            </nav>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">MBA & PGDM colleges in {city} accepting {exam.name}</h1>
            <p className="text-blue-100 max-w-3xl">
              {cap ? `In ${city}, ${exam.name} can be used in two ways: directly with institutes that list it, and for All-India seats in Maharashtra's CAP. ` : ""}
              We list only programmes whose admission criteria we have checked on the institute&apos;s own website.
            </p>
            <p className="text-xs text-blue-200 mt-2">Last reviewed {new Date(exam.lastReviewed + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <QuickAnswer text={answer} />
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> Verified programmes in {city}</h2>
            {programs.length ? <ProgramList programs={programs} /> : (
              <p className="text-sm text-gray-700">We haven&apos;t verified any individual {city} programmes for {exam.name} yet.{cap ? " See the CAP section below for MBA seats allotted by the State CET Cell." : ""}</p>
            )}
          </section>

          {cap && <CapExplainer examSlug={exam.slug} />}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-orange-500" /> {exam.name} at a glance</h2>
            <ul className="space-y-1.5 text-sm text-gray-700">
              <li><span className="font-semibold">Conducted by:</span> {exam.conductingBody}</li>
              {exam.keyDates.map((d) => <li key={d.label}><span className="font-semibold">{d.label}:</span> {d.value}</li>)}
              {exam.datesNote && <li className="text-gray-600">{exam.datesNote}</li>}
              <li><span className="font-semibold">Pattern:</span> {exam.pattern.sections.length} sections{exam.pattern.totalQuestions ? `, ${exam.pattern.totalQuestions} questions` : ""}, {exam.pattern.durationMinutes} minutes</li>
              <li><span className="font-semibold">Eligibility:</span> {exam.eligibility.text}</li>
            </ul>
            {exam.keyDates[0] && <SourceNote source={exam.keyDates[0].source} />}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-sm font-semibold">
              <Link href={`/exams/${exam.slug}`} className="text-orange-600 hover:underline">{exam.name} complete guide →</Link>
              <Link href={`/exams/${exam.slug}/syllabus`} className="text-orange-600 hover:underline">Syllabus & pattern →</Link>
              <Link href={`/exams/${exam.slug}/score-vs-percentile`} className="text-orange-600 hover:underline">Score vs percentile →</Link>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><ListChecks className="w-4 h-4 text-orange-500" /> How to build your shortlist</h2>
            <ul className="space-y-2">
              {[
                `Check each programme's admission page for the current intake — exam acceptance can change from year to year.`,
                `Note whether the programme is an MBA (university degree) or a PGDM (AICTE-approved diploma).`,
                cap ? `For CAP MBA seats, register with the State CET Cell in time — CAP has its own registration and rounds.` : `Track each institute's application deadline separately — there is no common counselling.`,
                `Treat previous-year cut-offs as a rough guide only, and apply to a mix of reach, target and safe options.`,
              ].map((t) => <li key={t} className="flex gap-2 text-sm text-gray-700"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{t}</li>)}
            </ul>
          </section>

          {otherCities.length > 0 && (
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Verified {exam.name} programmes in other cities</h2>
              <p className="text-sm text-gray-700 mb-3">{otherCities.map((p) => `${p.institution} (${p.city})`).join(" · ")}</p>
              <Link href={`/exams/${exam.slug}/colleges`} className="text-sm font-semibold text-orange-600 hover:underline inline-flex items-center gap-1">All verified {exam.name} programmes <ArrowRight className="w-3.5 h-3.5" /></Link>
            </section>
          )}

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

          <section className="text-sm flex flex-wrap gap-x-5 gap-y-2">
            {["cat", "xat", "cmat", "mat", "mah-mba-cet", "snap", "gmat", "atma"].filter((s) => s !== exam.slug).map((s) => {
              const e = getMbaExam(s)!
              return <Link key={s} href={`/exams/${s}`} className="text-gray-600 hover:text-orange-600">{e.name} guide</Link>
            })}
            <Link href="/mba-vs-pgdm" className="text-gray-600 hover:text-orange-600">MBA vs PGDM</Link>
          </section>

          <SourcesList sources={sources} />

          <div id="shortlist" className="max-w-xl">
            <MbaLeadForm
              exam={exam.name}
              city={city}
              placement={`city_exam:${city.toLowerCase().replace(/\s+/g, "-")}:${exam.slug}`}
              heading={`Have your ${exam.name} score? Get a free ${city} shortlist`}
              subheading="A CampusLelo counsellor will share realistic MBA/PGDM options, fees and deadlines for your score."
            />
          </div>
        </div>
      </div>
      <RelatedMbaSearches path={path} />
    </>
  )
}
