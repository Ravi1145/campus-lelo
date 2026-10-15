import { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { QuickAnswer } from "@/components/exams/MbaExamPage"
import AdmissionPlanner, { type PlanExam, type PlanProgramme } from "@/components/plan/AdmissionPlanner"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { mbaExams } from "@/data/mba/exams"

export const revalidate = 3600

const PATH = "/my-admission-plan"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

const programmes: PlanProgramme[] = programAdmissions
  .filter((p) => p.examsAccepted.length > 0)
  .map((p) => ({ id: p.id, institution: p.institution, program: p.program, city: p.city, intake: p.intake, accepted: p.examsAccepted, source: p.source }))

const exams: PlanExam[] = mbaExams.map((e) => ({
  slug: e.slug,
  name: e.name,
  cycle: e.cycleLabel,
  officialSite: e.officialSite,
  keyDates: e.keyDates.map((k) => ({ label: k.label, value: k.value, source: k.source })),
  datesNote: e.datesNote,
  eligibility: e.eligibility,
}))

const cities = Array.from(new Set(programmes.map((p) => p.city))).sort()
const dates = [...programmes.map((p) => p.source.accessed), ...exams.flatMap((e) => [...e.keyDates.map((k) => k.source.accessed), e.eligibility.source.accessed])].sort()
const dataChecked = dates[dates.length - 1]

export const metadata: Metadata = genMeta({
  title: "My MBA Admission Plan: Dates, Colleges and Sources",
  description: "Pick your exams and get one plan with official dates, the colleges that list them, eligibility and questions to ask, each line with its source.",
  path: PATH,
  keywords: ["mba admission plan", "mba admission timeline", "mba application checklist", "mba exam dates and colleges", "how to plan mba admission", "mba admission process step by step"],
})

const QUICK = "Pick the MBA and PGDM exams you have taken or plan to take, and your city. The plan lists the official dates, the verified programmes that accept those exams, the eligibility rules and six questions to ask every college. Every line links to its source with the date we checked it. Save it in your browser, and if our sources are re-checked later the page tells you your plan may be out of date."

const faqs = [
  { question: "What are the 'receipts'?", answer: "Each date, programme and eligibility rule shows where it came from, whether the source is official or a reported one, and the day we last checked it, so you can verify it yourself." },
  { question: "Where is my plan stored?", answer: "Only in your own browser. We do not receive it. Clearing your browser data or using another device starts a fresh plan." },
  { question: "How do I know if my saved plan is out of date?", answer: "Your plan remembers the date our sources were last checked. If we re-check them after you save, a notice at the top says so." },
  { question: "Why only MBA and PGDM?", answer: "That is where our sourced data is deepest. For engineering, medical and other paths, start with the career quiz and the exam guides; we add a plan when the data behind it is verified." },
]

export default function MyAdmissionPlanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA & PGDM", url: "/mba" }, { name: "My admission plan", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "WebApplication", name: "My MBA admission plan", url: `${BASE_URL}${PATH}`,
        applicationCategory: "EducationalApplication", operatingSystem: "Any", inLanguage: "en-IN", dateModified: dataChecked,
        description: QUICK, offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL },
      }) }} />

      <div className="min-h-screen bg-[#F6F8FB]">
        <div className="bg-[#012858] text-white print:hidden">
          <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/mba" className="hover:text-white">MBA & PGDM</Link><span>›</span><span className="text-white">My admission plan</span>
            </nav>
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">My MBA admission plan, with receipts</h1>
            <p className="max-w-2xl text-blue-100">Pick your exams and city. Get your dates, the colleges that list them and the rules to check, every line with its source and the day we checked it.</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs text-blue-50 ring-1 ring-white/20"><ShieldCheck className="h-4 w-4" aria-hidden="true" /> Saved only in your browser. We warn you when our sources change.</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
          <div className="print:hidden"><QuickAnswer text={QUICK} /></div>
          <AdmissionPlanner exams={exams} programmes={programmes} cities={cities} dataChecked={dataChecked} />

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 print:hidden">
            <h2 className="mb-4 text-xl font-bold text-[#012858]">How the plan works</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">{f.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{f.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link href="/career-quiz" className="text-[#C90D11] hover:underline">Not sure MBA is for you? Take the career quiz →</Link>
              <Link href="/mba-cutoff-checker" className="text-[#C90D11] hover:underline">MBA cut-off checker →</Link>
              <Link href="/counselling" className="text-[#C90D11] hover:underline">Talk to a counsellor →</Link>
            </div>
          </section>
        </div>
      </div>
      <RelatedMbaSearches path={PATH} />
    </>
  )
}
