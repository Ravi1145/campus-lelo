import { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { QuickAnswer } from "@/components/exams/MbaExamPage"
import PsychometricTest from "@/components/career/PsychometricTest"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const revalidate = 3600

const PATH = "/psychometric-test"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const REVIEWED = "2026-10-15"

export const metadata: Metadata = genMeta({
  title: "Free Psychometric Test for Students After 12th",
  description: "A free 10-minute psychometric-style test: your work style across five traits plus a short reasoning check. One question at a time, private by default.",
  path: PATH,
  keywords: ["psychometric test for students", "free psychometric test after 12th", "personality test for career", "aptitude test for students", "career aptitude test india", "psychometric test for career guidance", "big five personality test students"],
})

const QUICK = "The CampusLelo psychometric test takes about 10 minutes and shows one question at a time. Part 1 is 20 statements about your work style across five traits (openness, planning, energy from people, care, calm under pressure). Part 2 is nine reasoning questions on numbers, words and logic, with the right answers explained at the end. It is a guidance test, not a standardised, validated, IQ or clinical test, and your answers stay in your browser."

const faqs = [
  { question: "Is this a real psychometric test?", answer: "It is psychometric-style: you answer scored statements and questions. It is not a standardised or validated instrument and it is not an IQ or clinical test. Nine reasoning questions cannot measure ability. Use the result to start a conversation, not to decide." },
  { question: "What do the five traits mean?", answer: "They follow the spirit of the widely used Big Five model: openness to new ideas, planning and follow-through, energy from people, care and cooperation, and calm under pressure. High or low is not good or bad; each suits different settings." },
  { question: "How is it different from the career quiz?", answer: "The career quiz shows what you enjoy and ranks study paths. This test shows how you work and gives a short reasoning check. They answer different questions, and the result page combines them if you have taken both on this device." },
  { question: "Is my data saved or shared?", answer: "No. Your answers are stored only in your own browser so you can finish later. Nothing is sent to us." },
  { question: "Can I retake it?", answer: "Yes, as often as you like. Your answers can change as you grow, and you may notice different results on a different day." },
  { question: "Who should read my result with me?", answer: "A career counsellor, a teacher or someone in your family you trust. Book free counselling if you want help interpreting it." },
]

export default function PsychometricTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "Career quiz", url: "/career-quiz" }, { name: "Psychometric test", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "WebApplication", name: "CampusLelo psychometric test", url: `${BASE_URL}${PATH}`,
        applicationCategory: "EducationalApplication", operatingSystem: "Any", inLanguage: "en-IN", dateModified: REVIEWED,
        description: QUICK, offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL },
      }) }} />

      <div className="min-h-screen bg-[#F6F8FB]">
        <div className="bg-[#012858] text-white print:hidden">
          <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/career-quiz" className="hover:text-white">Career quiz</Link><span>›</span><span className="text-white">Psychometric test</span>
            </nav>
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">Free psychometric test for students after 12th</h1>
            <p className="max-w-2xl text-blue-100">Ten minutes, one question at a time. See how you work and how you reason, then what to explore next.</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
          <div className="print:hidden"><QuickAnswer text={QUICK} /></div>
          <PsychometricTest />

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 print:hidden">
            <h2 className="mb-4 text-xl font-bold text-[#012858]">Questions about the test</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">{f.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{f.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link href="/career-quiz" className="text-[#C90D11] hover:underline">Career quiz: what you enjoy →</Link>
              <Link href="/career-types" className="text-[#C90D11] hover:underline">The six interest types →</Link>
              <Link href="/my-admission-plan" className="text-[#C90D11] hover:underline">My admission plan →</Link>
              <Link href="/counselling" className="text-[#C90D11] hover:underline">Talk to a counsellor →</Link>
            </div>
          </section>
        </div>
      </div>
      <RelatedMbaSearches path={PATH} />
    </>
  )
}
