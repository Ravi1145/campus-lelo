import { Metadata } from "next"
import { notFound } from "next/navigation"
import { EXAM_TOPICS, getMbaExam, mbaExams, type ExamTopic } from "@/data/mba/exams"
import { MbaExamTopic, examTopicMetadata } from "@/components/exams/MbaExamRoutes"

// /exams/[slug]/[topic] — sub-pages for MBA/PGDM exam hubs:
// syllabus · score-vs-percentile · preparation · colleges.
// Only the combinations listed here exist; anything else is a 404.

interface Props {
  params: Promise<{ slug: string; topic: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return mbaExams.flatMap((exam) =>
    (Object.keys(EXAM_TOPICS) as ExamTopic[]).map((topic) => ({ slug: exam.slug, topic })),
  )
}

function resolve(slug: string, topic: string) {
  const exam = getMbaExam(slug)
  if (!exam || !(topic in EXAM_TOPICS)) return null
  return { exam, topic: topic as ExamTopic }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, topic } = await params
  const r = resolve(slug, topic)
  return r ? examTopicMetadata(r.exam, r.topic) : {}
}

export default async function ExamTopicPage({ params }: Props) {
  const { slug, topic } = await params
  const r = resolve(slug, topic)
  if (!r) notFound()
  return <MbaExamTopic exam={r.exam} topic={r.topic} />
}
