import { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { QuickAnswer } from "@/components/exams/MbaExamPage"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import { INTERESTS, STREAMS } from "@/data/career/questions"
import RiasecHex from "@/components/career/RiasecHex"

export const revalidate = 86400

const PATH = "/career-types"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const REVIEWED = "2026-10-15"

export const metadata: Metadata = genMeta({
  title: "Six Career Interest Types and the Courses They Suit",
  description: "Holland's six interest types explained in plain words, with the study paths each one often points to and the exams and colleges to check next.",
  path: PATH,
  keywords: ["holland codes explained", "riasec career types", "career interest types", "which career suits my personality", "career types for students india", "realistic investigative artistic social enterprising conventional"],
})

const QUICK = "Holland's model sorts career interests into six types: Realistic, Investigative, Artistic, Social, Enterprising and Conventional. Most people are a mix, so the model uses a three-letter code. Each type tends to point to some study paths, for example Investigative toward engineering or computers and Enterprising toward management. It is a guide to explore, not a prediction of success."

const TYPE_DETAIL: Record<string, { enjoys: string[]; paths: string[] }> = {
  R: { enjoys: ["building, repairing and testing things", "working outdoors or with machines and tools", "seeing a physical result at the end of the day"], paths: ["engineering", "it"] },
  I: { enjoys: ["solving hard problems with logic", "finding out why things happen", "analysing data and running experiments"], paths: ["engineering", "it", "medical"] },
  A: { enjoys: ["designing, writing, filming or making music", "inventing something new", "work where your own taste shows"], paths: ["design", "arts"] },
  S: { enjoys: ["teaching and explaining", "listening and helping people through problems", "working in a team for a shared purpose"], paths: ["medical", "arts"] },
  E: { enjoys: ["leading a team or a project", "persuading and negotiating", "starting something and watching it grow"], paths: ["management", "law", "commerce"] },
  C: { enjoys: ["keeping records accurate and organised", "following clear steps and checking details", "working with numbers and schedules"], paths: ["commerce", "management", "it"] },
}

const faqs = [
  { question: "What are Holland codes?", answer: "A three-letter summary of your strongest career interest types, such as IAS or ECS, based on John Holland's RIASEC model. The letters stand for Realistic, Investigative, Artistic, Social, Enterprising and Conventional." },
  { question: "Is my code my destiny?", answer: "No. The model describes interests, which change over time, and does not measure ability, values or circumstances. Research finds it useful for exploring careers but only a modest predictor of job performance." },
  { question: "Can I have more than one type?", answer: "Yes, most people do. That is why the model gives a code of three letters in order of strength, and why the types sit next to each other in a hexagon, since neighbouring types overlap." },
  { question: "How do I find my code?", answer: "Take our career quiz. It scores all six types and shows the study paths that match, with the exams and colleges to check next." },
]

export default function CareerTypesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "Career quiz", url: "/career-quiz" }, { name: "Interest types", url: PATH },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd({
        "@context": "https://schema.org", "@type": "Article", headline: "Six career interest types and the courses they suit", inLanguage: "en-IN",
        dateModified: REVIEWED, datePublished: REVIEWED, mainEntityOfPage: `${BASE_URL}${PATH}`,
        author: { "@type": "Organization", name: "CampusLelo" }, publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL },
      }) }} />

      <div className="min-h-screen bg-[#F6F8FB]">
        <div className="bg-[#012858] text-white">
          <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/career-quiz" className="hover:text-white">Career quiz</Link><span>›</span><span className="text-white">Interest types</span>
            </nav>
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">The six career interest types and the courses they suit</h1>
            <p className="max-w-2xl text-blue-100">Holland&apos;s model in plain words: what each type enjoys, which study paths it often points to, and what to check next.</p>
            <p className="mt-2 text-xs text-blue-200">Last reviewed 15 Oct 2026</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
          <QuickAnswer text={QUICK} />

          <section className="grid items-center gap-6 rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8 md:grid-cols-[1fr_1.1fr]" aria-labelledby="map-heading">
            <div>
              <h2 id="map-heading" className="text-xl font-bold text-[#012858]">The map</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">The six types sit around a hexagon. Neighbours overlap most: Realistic and Investigative share a love of problems, Social and Enterprising both work with people. Tap a letter to jump to that type.</p>
              <Link href="/career-quiz" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white hover:bg-[#C90D11]">Find your own shape</Link>
            </div>
            <RiasecHex linkTypes label="Hexagon of the six career interest types. Each letter links to its section below." />
          </section>

          {INTERESTS.map((t) => {
            const d = TYPE_DETAIL[t.code]
            return (
              <section key={t.code} className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby={`type-${t.code}`}>
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#012858] font-[family-name:var(--font-fraunces)] text-2xl font-bold text-white" aria-hidden="true">{t.code}</span>
                  <div>
                    <h2 id={`type-${t.code}`} className="text-2xl font-bold text-[#012858]">{t.name}: the {t.nickname}</h2>
                    <p className="mt-1 text-gray-700">{t.summary}</p>
                  </div>
                </div>
                <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-gray-700">You may enjoy</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-800">{d.enjoys.map((e) => <li key={e}>{e}</li>)}</ul>
                <h3 className="mt-5 text-sm font-bold uppercase tracking-wide text-gray-700">Study paths to explore</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-800">
                  {d.paths.map((id) => {
                    const s = STREAMS.find((x) => x.id === id)!
                    return (
                      <li key={id}>
                        <strong>{s.name}.</strong> {s.what}{" "}
                        {s.links.map((l, i) => <span key={l.href}>{i > 0 && " · "}<Link href={l.href} className="font-semibold text-[#C90D11] hover:underline">{l.label}</Link></span>)}
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
            <h2 className="text-xl font-bold text-[#012858]">What this model cannot tell you</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-800">
              <li>How good you will be at a job. Interests are only one input; marks, practice and opportunity matter too.</li>
              <li>What you value, such as pay, stability or location, which often decide real choices.</li>
              <li>Anything that stays fixed. Interests move as you try new things.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-700">Use it to build a short list, then test the list: talk to people in those fields, read the course content, and check the entrance exam you would need.</p>
            <Link href="/career-quiz" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white hover:bg-[#C90D11]">Take the career quiz</Link>
          </section>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-[#012858]">Common questions</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.question} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="mb-1 text-sm font-semibold text-gray-900">{f.question}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <RelatedMbaSearches path={PATH} />
    </>
  )
}
