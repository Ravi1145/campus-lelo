import type { Metadata } from "next"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { EXAM_TOPICS, prepPageIndexable, type ExamTopic } from "@/data/mba/exams"
import { admissionsForExam, collegesPageIndexable, maharashtraCap } from "@/data/mba/programAdmissions"
import type { ExamProfile, ProgramAdmission, SourceRef } from "@/data/mba/types"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import {
  CollegesBody, collectSources, MbaExamLayout, OverviewBody, PrepBody, ScoreBody, SyllabusBody, examTitleName,
} from "./MbaExamPage"

// Page-level metadata + rendering for /exams/[slug] (MBA exams) and
// /exams/[slug]/[topic]. Titles are kept ≤ 60 characters where possible.

function clip(text: string, max = 158) {
  if (text.length <= max) return text
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:—-]+$/, "") + "…"
}


function topicTitle(exam: ExamProfile, topic: ExamTopic) {
  const n = examTitleName(exam)
  switch (topic) {
    case "syllabus": return `${n} Syllabus & Exam Pattern: Section-wise Guide`
    case "score-vs-percentile": return `${exam.name} Score vs Percentile: How It Is Calculated`
    case "preparation": return `${n} Preparation Strategy: Section-wise Tips`
    case "colleges": return `MBA & PGDM Colleges Accepting ${exam.name} (Verified)`
  }
}

function topicDescription(exam: ExamProfile, topic: ExamTopic) {
  switch (topic) {
    case "syllabus": return clip(`${exam.name} exam pattern and section-wise syllabus: ${exam.pattern.sections.map((s) => s.name).join(", ")}. ${exam.pattern.durationMinutes} minutes, marking scheme and official sources.`)
    case "score-vs-percentile": return clip(`How ${exam.name} scores and percentiles are calculated, why there is no fixed score-to-percentile table, and how to use previous-year cut-offs sensibly.`)
    case "preparation": return clip(`${exam.name} preparation strategy by section, built around the official ${exam.pattern.durationMinutes}-minute pattern. Mock-test approach, time management and common mistakes.`)
    case "colleges": return clip(`MBA and PGDM programmes in Pune, Noida and Greater Noida that accept ${exam.name}, verified against each institute's admission page. Programme-level details and sources.`)
  }
}

export function examHubMetadata(exam: ExamProfile): Metadata {
  const n = examTitleName(exam)
  const full = exam.keyDates.length
    ? `${n}: Exam Date, Eligibility, Pattern & Colleges`
    : `${n}: Eligibility, Exam Pattern, Scores & Colleges`
  const title = full.length <= 60 ? full : `${n}: Dates, Eligibility, Pattern & Colleges`
  return genMeta({
    title,
    description: clip(`${exam.fullName} (${exam.name}): ${exam.keyDates.map((d) => `${d.label.toLowerCase()} ${d.value}`).slice(0, 2).join("; ") || exam.frequency}. Eligibility, pattern, syllabus and verified MBA/PGDM colleges.`),
    path: `/exams/${exam.slug}`,
    keywords: [`${exam.name.toLowerCase()} exam`, `${n.toLowerCase()}`, `${exam.name.toLowerCase()} eligibility`, `${exam.name.toLowerCase()} exam pattern`, `${exam.name.toLowerCase()} colleges pune`],
  })
}

export function examTopicMetadata(exam: ExamProfile, topic: ExamTopic): Metadata {
  const meta = genMeta({
    title: topicTitle(exam, topic),
    description: topicDescription(exam, topic),
    path: `/exams/${exam.slug}/${topic}`,
    keywords: [`${exam.name.toLowerCase()} ${EXAM_TOPICS[topic].toLowerCase()}`],
  })
  if ((topic === "colleges" && !collegesPageIndexable(exam)) || (topic === "preparation" && !prepPageIndexable(exam))) {
    return { ...meta, robots: { index: false, follow: true } }
  }
  return meta
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

// First sentence; ignores dots inside tokens like "exams.nta.ac.in" (needs whitespace or end after the dot)
const firstSentence = (t: string) => (t.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? t).trim()

/** 40–60 word direct answer to each page's main query — the AEO "answer box". */
export function quickAnswer(exam: ExamProfile, topic: "overview" | ExamTopic, programs: ProgramAdmission[]): string {
  const p = exam.pattern
  const shape = `${p.sections.length} sections${p.totalQuestions ? ` and ${p.totalQuestions} questions` : ""} in ${p.durationMinutes} minutes`
  switch (topic) {
    case "overview": {
      const examDay = exam.keyDates.find((k) => /exam|window|attempt|session|paper/i.test(k.label) || /tests$/i.test(k.label))
      const when = examDay ? `${examDay.label}: ${examDay.value}.` : exam.datesNote ? firstSentence(exam.datesNote) : ""
      return `${examTitleName(exam)}, the ${exam.fullName}, is conducted by ${exam.conductingBody}. ${when} Eligibility: ${firstSentence(exam.eligibility.text)} The test has ${shape}.`.replace(/\s+/g, " ").trim()
    }
    case "syllabus":
      return `${exam.name} has ${shape}: ${p.sections.map((x) => x.name).join(", ")}. ${firstSentence(p.marking)}`
    case "score-vs-percentile":
    {
      // Headline plus as many method points as fit in ~60 words
      let text = exam.scoring.headline
      for (const point of exam.scoring.points) {
        if ((text + " " + point).split(/\s+/).length > 62) break
        text += " " + point
      }
      return text
    }
    case "preparation":
      return `Prepare for ${exam.name} section by section: ${exam.preparation.map((a) => a.area).join(", ")}. ${exam.preparation[0]?.tips[0] ?? ""} Practise in the official ${p.durationMinutes}-minute format.`.trim()
    case "colleges": {
      const cap = maharashtraCap.allIndiaSeatExams.includes(exam.slug) ? ` ${exam.name} is also accepted for All-India seats in Maharashtra's MBA CAP.` : ""
      return programs.length
        ? `We have verified ${programs.length} programme${programs.length > 1 ? "s" : ""} accepting ${exam.name}: ${programs.map((x) => `${x.institution.split(" (")[0].split(", ")[0]} (${x.city})`).join("; ")}.${cap} Acceptance is per programme, confirm on each institute's admission page.`
        : `We have not yet verified individual programmes accepting ${exam.name}.${cap}`
    }
  }
}

function WebPageSchema({ exam, topic, title, answer, sources }: { exam: ExamProfile; topic: "overview" | ExamTopic; title: string; answer: string; sources: SourceRef[] }) {
  const url = `${BASE_URL}/exams/${exam.slug}${topic === "overview" ? "" : `/${topic}`}`
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name: title,
    description: answer,
    inLanguage: "en-IN",
    dateModified: exam.lastReviewed,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    publisher: { "@type": "Organization", name: "CampusLelo", url: BASE_URL },
    about: { "@type": "Thing", name: `${exam.name}: ${exam.fullName}`, sameAs: exam.officialSite },
    audience: { "@type": "EducationalAudience", educationalRole: "student" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
    citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.url })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
}

function Schemas({ exam, topic }: { exam: ExamProfile; topic: "overview" | ExamTopic }) {
  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Exams", url: "/exams" },
    { name: exam.name, url: `/exams/${exam.slug}` },
    ...(topic === "overview" ? [] : [{ name: EXAM_TOPICS[topic], url: `/exams/${exam.slug}/${topic}` }]),
  ]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema(crumbs)) }} />
      {topic === "overview" && exam.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(exam.faqs)) }} />
      )}
    </>
  )
}

export function MbaExamHub({ exam }: { exam: ExamProfile }) {
  const programs = admissionsForExam(exam.slug)
  const answer = quickAnswer(exam, "overview", programs)
  const sources = collectSources(exam, programs)
  const h1 = `${examTitleName(exam)}: ${exam.fullName}`
  return (
    <>
      <Schemas exam={exam} topic="overview" />
      <WebPageSchema exam={exam} topic="overview" title={h1} answer={answer} sources={sources} />
      <MbaExamLayout exam={exam} topic="overview" h1={h1} intro={exam.summary} quickAnswer={answer} sources={sources}>
        <OverviewBody exam={exam} programs={programs} />
      </MbaExamLayout>
      <RelatedMbaSearches path={`/exams/${exam.slug}`} />
    </>
  )
}

const TOPIC_INTRO: Record<ExamTopic, (e: ExamProfile) => string> = {
  syllabus: (e) => `${e.name} has ${e.pattern.sections.length} sections${e.pattern.totalQuestions ? ` and ${e.pattern.totalQuestions} questions` : ""} in ${e.pattern.durationMinutes} minutes. Here is the official pattern and the topics tested in each section.`,
  "score-vs-percentile": (e) => `How ${e.name} turns your answers into a score and percentile, and how to read previous-year cut-offs without being misled.`,
  preparation: (e) => `A section-by-section ${e.name} preparation plan based on the official exam pattern.`,
  colleges: (e) => `MBA and PGDM programmes that accept ${e.name}, checked against each institute's own admission page.`,
}

export function MbaExamTopic({ exam, topic }: { exam: ExamProfile; topic: ExamTopic }) {
  const programs = admissionsForExam(exam.slug)
  const body = {
    syllabus: <SyllabusBody exam={exam} />,
    "score-vs-percentile": <ScoreBody exam={exam} />,
    preparation: <PrepBody exam={exam} />,
    colleges: <CollegesBody exam={exam} programs={programs} />,
  }[topic]
  const answer = quickAnswer(exam, topic, programs)
  // Each sub-page lists only the sources its own content relies on
  const sources = collectSources(exam, topic === "colleges" ? programs : []).filter((s) =>
    topic === "colleges" ? true : topic === "score-vs-percentile" ? s === exam.scoring.source || s === exam.pattern.source : s === exam.pattern.source)
  const title = topicTitle(exam, topic)
  return (
    <>
      <Schemas exam={exam} topic={topic} />
      <WebPageSchema exam={exam} topic={topic} title={title} answer={answer} sources={sources} />
      <MbaExamLayout exam={exam} topic={topic} h1={title} intro={TOPIC_INTRO[topic](exam)} quickAnswer={answer} sources={sources}>
        {body}
      </MbaExamLayout>
      <RelatedMbaSearches path={`/exams/${exam.slug}/${topic}`} />
    </>
  )
}
