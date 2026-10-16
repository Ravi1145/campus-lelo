import { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { QuickAnswer } from "@/components/exams/MbaExamPage"
import CareerQuiz from "@/components/career/CareerQuiz"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const revalidate = 3600

const PATH = "/career-quiz"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const REVIEWED = "2026-10-15"

export const metadata: Metadata = genMeta({
  title: "Career Quiz After 12th: Engineering, MBA or Other?",
  description: "A free 8-minute quiz on your interests and strengths. See which study paths fit, from engineering to MBA, and the exams and colleges to look at next.",
  path: PATH,
  keywords: ["career quiz after 12th", "career test for students", "which course is best for me", "engineering or mba quiz", "career interest test india", "free career guidance test", "psychometric test for students"],
})

const QUICK = "The CampusLelo career quiz has 48 short statements and takes about 8 minutes. It uses six interest types from Holland's RIASEC model plus six self-rated strengths, then ranks eight study paths, among them engineering, computers, management, commerce, medical, law, design and arts. It is a guidance tool, not a clinical or validated psychometric test, and your answers stay in your browser."

const faqs = [
  { question: "Is this a psychometric test?", answer: "It is a psychometric-style self-assessment: you rate statements and we score them. It is not a validated or standardised psychometric instrument and not a clinical test. Treat the result as a starting point for a conversation, not a verdict." },
  { question: "What model does it use?", answer: "Holland's RIASEC model of six interest types (Realistic, Investigative, Artistic, Social, Enterprising, Conventional), which career counsellors use widely. All statements in this quiz are our own wording." },
  { question: "How accurate is it?", answer: "Interest models give useful direction but only a modest prediction of how well you will do in a job, and your answers reflect how you see yourself today. Marks, practice, family circumstances and advice from teachers matter as much." },
  { question: "Is my data saved or shared?", answer: "No. Your answers are stored only in your own browser so you can finish later, and are never sent to us. The result link carries your answers in the link itself, so share it only with people you trust." },
  { question: "What if my top result is not what I expected?", answer: "That is useful information. Read the guide for that path, then compare the next one. If the top two are close, explore both. A counsellor can help you weigh them." },
  { question: "Does it cover online and distance degrees?", answer: "The quiz points to a study path. Most paths can be studied on campus or, for some courses, through UGC-approved online or distance programmes. Ask a counsellor to check that the programme you choose is approved." },
]

export default function CareerQuizPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "Career quiz", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "WebApplication", name: "CampusLelo career quiz", url: `${BASE_URL}${PATH}`,
        applicationCategory: "EducationalApplication", operatingSystem: "Any", inLanguage: "en-IN", dateModified: REVIEWED,
        description: QUICK, offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL },
      }) }} />

      <div className="min-h-screen bg-[#F6F8FB]">
        <div className="bg-[#012858] text-white">
          <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span><span className="text-white">Career quiz</span>
            </nav>
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">Career quiz after 12th: which study path fits you?</h1>
            <p className="max-w-2xl text-blue-100">A free 8-minute quiz on what you enjoy and what you are good at. Get your interest code, the paths that match, and the exams and colleges to look at next.</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
          <QuickAnswer text={QUICK} />
          <CareerQuiz />

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
            <h2 className="mb-4 text-xl font-bold text-[#012858]">Questions about the quiz</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">{f.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{f.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link href="/career-types" className="text-[#C90D11] hover:underline">The six interest types explained →</Link>
              <Link href="/my-admission-plan" className="text-[#C90D11] hover:underline">Build my admission plan →</Link>
              <Link href="/mba-exam-acceptance" className="text-[#C90D11] hover:underline">Which MBA colleges accept your exam →</Link>
              <Link href="/counselling" className="text-[#C90D11] hover:underline">Talk to a counsellor →</Link>
            </div>
          </section>
        </div>
      </div>
      <RelatedMbaSearches path={PATH} />
    </>
  )
}
