import { Metadata } from "next"
import { notFound } from "next/navigation"
import { generateMetadata as genMeta, fitDescription } from "@/lib/seo"
import { publishedCutoffs, noPublishedCutoff } from "@/data/mba/cutoffs"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { mbaExams } from "@/data/mba/exams"
import { INSTITUTE_SHORT, CUTOFF_MATCH, CITY_HUB } from "@/data/mba/instituteLabels"
import InstituteGuide from "@/components/mba/InstituteGuide"

// One page per verified programme: "<college> MBA admission: exams, eligibility, process".
// Every fact is read from programAdmissions.ts and cutoffs.ts. Nothing is typed by hand here.

export const revalidate = 3600
export const dynamicParams = false

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return programAdmissions.filter((p) => INSTITUTE_SHORT[p.id]).map((p) => ({ slug: p.id }))
}

const examName = (slug: string) => mbaExams.find((e) => e.slug === slug)?.name ?? slug.replace(/-/g, " ").toUpperCase()
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`)

function resolve(slug: string) {
  const p = programAdmissions.find((x) => x.id === slug)
  if (!p || !INSTITUTE_SHORT[p.id]) return null
  const token = CUTOFF_MATCH[p.id]
  const cutoff = token ? publishedCutoffs.find((c) => c.institution.includes(token)) : undefined
  const noCutoff = token && !cutoff ? noPublishedCutoff.find((n) => n.institution.includes(token)) : undefined
  return { p, short: INSTITUTE_SHORT[p.id], cutoff, noCutoff }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolve((await params).slug)
  if (!r) return {}
  const exams = r.p.examsAccepted.map(examName)
  return genMeta({
    title: `${r.short} ${r.p.programType} Admission: Exams, Eligibility`,
    description: fitDescription(`${r.short} ${r.p.programType}: the exams it lists (${list(exams)}), eligibility and selection steps from its own admission page, with the source and the date we checked.`),
    path: `/mba-admission/${r.p.id}`,
    keywords: [
      `${r.short.toLowerCase()} ${r.p.programType.toLowerCase()} admission`,
      `${r.short.toLowerCase()} admission process`,
      `${r.short.toLowerCase()} eligibility`,
      `${r.short.toLowerCase()} exams accepted`,
      `${r.short.toLowerCase()} cutoff`,
    ],
  })
}

export default async function Page({ params }: Props) {
  const r = resolve((await params).slug)
  if (!r) notFound()
  const { p, short, cutoff, noCutoff } = r
  const exams = p.examsAccepted.map(examName)
  const hub = CITY_HUB[p.city]
  const neighbours = programAdmissions
    .filter((x) => x.city === p.city && x.id !== p.id && INSTITUTE_SHORT[x.id])
    .slice(0, 3)

  const cutoffAnswer = cutoff
    ? `${short} has published figures for the ${cutoff.admissionYear} batch: ${cutoff.values.map((v) => `${v.category}, ${v.value}`).join("; ")}. ${cutoff.howItWorks}`
    : noCutoff
      ? noCutoff.shortlisting
      : "We did not find a published cut-off on the pages we checked, so none is shown here. Ask the admissions office what score the last batch needed."

  const quick = `${short} lists ${list(exams)} for its ${p.program}${p.intake.length <= 24 ? ` (${p.intake})` : ""} on the page we checked. ${p.notes ?? ""}`.trim()

  const faqs = [
    { question: `Which exams does ${short} accept?`, answer: `For the intake the source refers to (${p.intake}), the page we checked lists ${list(exams)}. A missing exam here means the page we checked did not list it, which is not the same as "not accepted".` },
    { question: `What is the ${short} admission process?`, answer: p.notes ?? `See the official page linked below for the steps.` },
    { question: `What is the ${short} cut-off?`, answer: cutoffAnswer },
    { question: `Which intake does this information refer to?`, answer: `${p.intake}. Exam lists, deadlines and criteria change every cycle, so confirm on the official page before you apply.` },
    { question: `Where is the official page?`, answer: `${p.source.label}, checked on ${p.source.accessed}. The link is in the source note above.` },
  ]

  return (
    <InstituteGuide
      path={`/mba-admission/${p.id}`}
      h1={`${short} ${p.programType} admission: exams, eligibility and process`}
      intro={`What ${p.institution} says on its own admission page: the exams it lists, who can apply and how selection works, with the source and the date we checked.`}
      quick={quick}
      reviewed={p.source.accessed}
      parent={hub ?? { href: "/mba-exam-acceptance", label: "MBA exam acceptance" }}
      faqs={faqs}
      cutoff={cutoff}
      noCutoff={noCutoff}
      admission={p}
      howTo={[
        `Compare the exams ${short} lists with the scores you hold. If you have only one of them, check the notes for any second-test rule.`,
        "Read the eligibility line in the notes before you pay an application fee, including the rule for final-year students.",
        "Exam lists and criteria change every cycle. Open the official page for the intake you are applying to.",
        "Shortlist two or three similar institutes in the same city and compare their selection steps, not only their exam lists.",
      ]}
      links={[
        ...(hub ? [hub] : []),
        { href: "/mba-exam-acceptance", label: "Filter all colleges by your exam" },
        ...(p.collegeSlug ? [{ href: `/colleges/${p.collegeSlug}`, label: `${short} college profile` }] : []),
        ...neighbours.map((n) => ({ href: `/mba-admission/${n.id}`, label: `${INSTITUTE_SHORT[n.id]} admission` })),
      ]}
      leadCity={p.city}
      leadExam={exams[0] ?? "CAT"}
    />
  )
}
