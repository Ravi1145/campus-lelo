import Link from "next/link"
import { ArrowRight, BookOpen, Calendar, CheckCircle2, ExternalLink, GraduationCap, Info, Landmark, ListChecks, ShieldCheck, Target, Users } from "lucide-react"
import type { ExamProfile, ProgramAdmission, SourceRef } from "@/data/mba/types"
import { EXAM_TOPICS, getMbaExam, type ExamTopic } from "@/data/mba/exams"
import { maharashtraCap } from "@/data/mba/programAdmissions"
import MbaLeadForm from "@/components/leads/MbaLeadForm"

// ── helpers ──────────────────────────────────────────────────────────────────

export function examYear(exam: ExamProfile): string {
  return exam.cycleLabel.match(/\b(20\d\d)\b/)?.[1] ?? ""
}

export function examTitleName(exam: ExamProfile): string {
  const y = examYear(exam)
  return y ? `${exam.name} ${y}` : exam.name
}

const TOPIC_ORDER: ("overview" | ExamTopic)[] = ["overview", "syllabus", "score-vs-percentile", "preparation", "colleges"]

export function topicHref(exam: ExamProfile, topic: "overview" | ExamTopic) {
  return topic === "overview" ? `/exams/${exam.slug}` : `/exams/${exam.slug}/${topic}`
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
}

const card = "bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
const h2 = "text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"

// ── small building blocks ────────────────────────────────────────────────────

export function SourceNote({ source }: { source: SourceRef }) {
  return (
    <p className="mt-3 text-xs text-gray-500 flex items-start gap-1.5">
      <ShieldCheck className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${source.type === "official" ? "text-green-600" : "text-amber-500"}`} />
      <span>
        {source.type === "official" ? "Source (official): " : "Source (secondary, cross-checked): "}
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">{source.label}</a>
        {" · checked "}{formatDate(source.accessed)}
      </span>
    </p>
  )
}

export function PatternTable({ exam }: { exam: ExamProfile }) {
  const p = exam.pattern
  const hasQ = p.sections.some((s) => s.questions)
  const hasM = p.sections.some((s) => s.minutes)
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-100">
            <th className="py-2 pr-3 font-semibold">Section</th>
            {hasQ && <th className="py-2 pr-3 font-semibold">Questions</th>}
            {hasM && <th className="py-2 pr-3 font-semibold">Time</th>}
          </tr>
        </thead>
        <tbody>
          {p.sections.map((s) => (
            <tr key={s.name} className="border-b border-gray-50 align-top">
              <td className="py-2 pr-3 text-gray-800">{s.name}{s.notes && <span className="block text-xs text-gray-500">{s.notes}</span>}</td>
              {hasQ && <td className="py-2 pr-3 text-gray-700">{s.questions ?? "—"}</td>}
              {hasM && <td className="py-2 pr-3 text-gray-700">{s.minutes ? `${s.minutes} min` : "—"}</td>}
            </tr>
          ))}
          <tr className="font-semibold text-gray-900">
            <td className="py-2 pr-3">Total</td>
            {hasQ && <td className="py-2 pr-3">{p.totalQuestions ?? "—"}</td>}
            {hasM && <td className="py-2 pr-3">{p.durationMinutes} min</td>}
          </tr>
        </tbody>
      </table>
      {!hasM && <p className="mt-2 text-sm text-gray-700">Total duration: {p.durationMinutes} minutes · {p.mode}</p>}
      <p className="mt-3 text-sm text-gray-700"><span className="font-semibold">Marking:</span> {p.marking}</p>
      {p.scoreRange && <p className="mt-1 text-sm text-gray-700"><span className="font-semibold">Score scale:</span> {p.scoreRange}</p>}
    </div>
  )
}

export function ProgramList({ programs }: { programs: ProgramAdmission[] }) {
  if (!programs.length) return null
  return (
    <ul className="space-y-3">
      {programs.map((p) => (
        <li key={p.id} className="p-4 rounded-xl border border-gray-100">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              {p.collegeSlug ? (
                <Link href={`/colleges/${p.collegeSlug}`} className="font-semibold text-gray-900 hover:text-orange-600">{p.institution}</Link>
              ) : (
                <p className="font-semibold text-gray-900">{p.institution}</p>
              )}
              <p className="text-xs text-gray-500 mt-0.5">{p.program} · {p.city} · Intake {p.intake}</p>
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.programType === "MBA" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>{p.programType}</span>
          </div>
          <p className="text-sm text-gray-700 mt-2">
            <span className="font-semibold">Accepts: </span>
            {p.examsAccepted.map((slug, i) => {
              const e = getMbaExam(slug)
              return (
                <span key={slug}>
                  {i > 0 && ", "}
                  {e ? <Link href={`/exams/${slug}`} className="underline hover:text-orange-600">{e.name}</Link> : slug.toUpperCase()}
                </span>
              )
            })}
            {" · "}<span className="text-gray-500">{p.route}</span>
          </p>
          {p.notes && <p className="text-xs text-gray-600 mt-1">{p.notes}</p>}
          <SourceNote source={p.source} />
        </li>
      ))}
    </ul>
  )
}

export function CapExplainer({ examSlug }: { examSlug: string }) {
  if (!maharashtraCap.allIndiaSeatExams.includes(examSlug)) return null
  const isState = maharashtraCap.stateCandidateExams.includes(examSlug)
  return (
    <section className={card}>
      <h2 className={h2}><Landmark className="w-4 h-4 text-orange-500" /> Pune & Maharashtra: MBA admission through CAP</h2>
      <p className="text-gray-700 leading-relaxed text-sm">{maharashtraCap.summary}</p>
      <p className="text-gray-700 leading-relaxed text-sm mt-2">
        {isState
          ? "For Maharashtra-domicile candidates, MAH MBA/MMS CET is the main exam for CAP MBA seats."
          : `${getMbaExam(examSlug)?.name} is one of the national exams accepted for CAP All-India seats.`}{" "}
        CAP covers MBA/MMS programmes only. PGDM institutes run their own admissions — check each institute&apos;s accepted exams.
      </p>
      <SourceNote source={maharashtraCap.source} />
    </section>
  )
}

// ── layout ───────────────────────────────────────────────────────────────────

export function MbaExamLayout({
  exam, topic, h1, intro, quickAnswer, sources, children,
}: {
  exam: ExamProfile
  topic: "overview" | ExamTopic
  h1: string
  intro: string
  /** 40–60 word direct answer to the page's main query (AEO) */
  quickAnswer: string
  /** Every source cited on the page, listed visibly (GEO / trust) */
  sources: SourceRef[]
  children: React.ReactNode
}) {
  const idx = TOPIC_ORDER.indexOf(topic)
  const next = TOPIC_ORDER[idx + 1]
  const related = exam.relatedExams.map(getMbaExam).filter(Boolean) as ExamProfile[]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#012858] text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span>›</span>
            <Link href="/exams" className="hover:text-white">Exams</Link><span>›</span>
            {topic === "overview" ? (
              <span className="text-white">{exam.name}</span>
            ) : (
              <>
                <Link href={`/exams/${exam.slug}`} className="hover:text-white">{exam.name}</Link><span>›</span>
                <span className="text-white">{EXAM_TOPICS[topic]}</span>
              </>
            )}
          </nav>
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {exam.programs.map((p) => <span key={p} className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-blue-100">{p}</span>)}
                <span className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-blue-100">{exam.cycleLabel}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold mb-2">{h1}</h1>
              <p className="text-blue-100 max-w-3xl">{intro}</p>
              <p className="text-xs text-blue-200 mt-2">Conducted by {exam.conductingBody} · Last reviewed {formatDate(exam.lastReviewed)}</p>
            </div>
            <a href={exam.officialSite} target="_blank" rel="noopener noreferrer" className="self-start shrink-0 flex items-center gap-1.5 bg-[#E0170F] hover:bg-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-semibold">
              <ExternalLink className="w-4 h-4" /> Official website
            </a>
          </div>
          <nav aria-label={`${exam.name} guide sections`} className="mt-8 flex gap-2 overflow-x-auto pb-1">
            {TOPIC_ORDER.map((t) => (
              <Link
                key={t}
                href={topicHref(exam, t)}
                aria-current={t === topic ? "page" : undefined}
                className={`whitespace-nowrap px-3.5 py-2 rounded-full text-sm font-medium ${t === topic ? "bg-white text-[#012858]" : "bg-white/10 text-white hover:bg-white/20"}`}
              >
                {t === "overview" ? "Overview" : EXAM_TOPICS[t]}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6 min-w-0">
            <QuickAnswer text={quickAnswer} />
            {children}
            <SourcesList sources={sources} />
            {next && (
              <Link href={topicHref(exam, next)} className="flex items-center justify-between p-5 rounded-2xl bg-orange-50 border border-orange-100 hover:border-orange-300 group">
                <div>
                  <p className="text-xs uppercase tracking-wide text-orange-700 font-semibold">Next step</p>
                  <p className="font-bold text-gray-900">{exam.name} {EXAM_TOPICS[next as ExamTopic]}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          <aside className="space-y-6">
            <div className={card}>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><Info className="w-4 h-4 text-orange-500" /> {exam.name} at a glance</h3>
              <dl className="space-y-2 text-sm">
                <div><dt className="text-xs uppercase tracking-wide text-gray-400">Conducted by</dt><dd className="text-gray-800">{exam.conductingBody}</dd></div>
                <div><dt className="text-xs uppercase tracking-wide text-gray-400">Held</dt><dd className="text-gray-800">{exam.frequency}</dd></div>
                <div><dt className="text-xs uppercase tracking-wide text-gray-400">Mode</dt><dd className="text-gray-800">{exam.pattern.mode}</dd></div>
                <div><dt className="text-xs uppercase tracking-wide text-gray-400">Duration</dt><dd className="text-gray-800">{exam.pattern.durationMinutes} minutes{exam.pattern.totalQuestions ? ` · ${exam.pattern.totalQuestions} questions` : ""}</dd></div>
                <div><dt className="text-xs uppercase tracking-wide text-gray-400">Used for</dt><dd className="text-gray-800">{exam.programs.join(" and ")} admissions</dd></div>
              </dl>
            </div>

            <div id="shortlist" className="lg:sticky lg:top-28">
              <MbaLeadForm
                exam={exam.name}
                placement={`exam_${topic}:${exam.slug}`}
                heading={`Not sure which colleges fit your ${exam.name} score?`}
                subheading="Get a free MBA/PGDM shortlist from a CampusLelo counsellor, based on your score, budget and city."
              />
            </div>

            {related.length > 0 && (
              <div className={card}>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-orange-500" /> Related exams</h3>
                <ul className="space-y-1">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/exams/${r.slug}`} className="flex items-center justify-between py-1.5 text-sm text-gray-800 hover:text-orange-600">
                        {r.name} <span className="text-xs text-gray-400">{r.fullName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={card}>
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-orange-500" /> MBA or PGDM?</h3>
              <p className="text-sm text-gray-600 mb-3">An MBA is a university degree; a PGDM is a diploma from an autonomous institute. Know the difference before you apply.</p>
              <Link href="/mba-vs-pgdm" className="text-sm font-semibold text-orange-600 hover:underline">MBA vs PGDM explained →</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// ── topic bodies ─────────────────────────────────────────────────────────────

export function OverviewBody({ exam, programs }: { exam: ExamProfile; programs: ProgramAdmission[] }) {
  return (
    <>
      <section className={card}>
        <h2 className={h2}><BookOpen className="w-4 h-4 text-orange-500" /> What is {exam.name}?</h2>
        <p className="text-gray-700 leading-relaxed">{exam.summary}</p>
        <p className="text-gray-700 leading-relaxed mt-2"><span className="font-semibold">Accepted for:</span> {exam.usage}</p>
        {exam.usageSource && <SourceNote source={exam.usageSource} />}
      </section>

      <section className={card}>
        <h2 className={h2}><Calendar className="w-4 h-4 text-orange-500" /> {exam.cycleLabel}: important dates</h2>
        {exam.keyDates.length > 0 && (
          <dl className="divide-y divide-gray-50">
            {exam.keyDates.map((d) => (
              <div key={d.label} className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-sm text-gray-500">{d.label}</dt>
                <dd className="sm:col-span-2 text-sm font-semibold text-gray-900">{d.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {exam.datesNote && <p className="text-sm text-gray-700 mt-2 bg-amber-50 border border-amber-100 rounded-lg p-3">{exam.datesNote}</p>}
        {exam.keyDates[0] && <SourceNote source={exam.keyDates[0].source} />}
      </section>

      <section className={card}>
        <h2 className={h2}><CheckCircle2 className="w-4 h-4 text-orange-500" /> {exam.name} eligibility</h2>
        <p className="text-gray-700 leading-relaxed">{exam.eligibility.text}</p>
        <SourceNote source={exam.eligibility.source} />
        {exam.fee && (
          <>
            <h3 className="font-semibold text-gray-900 mt-5 mb-1">Application fee</h3>
            <p className="text-gray-700">{exam.fee.text}</p>
            <SourceNote source={exam.fee.source} />
          </>
        )}
      </section>

      <section className={card}>
        <h2 className={h2}><ListChecks className="w-4 h-4 text-orange-500" /> {exam.name} exam pattern</h2>
        <PatternTable exam={exam} />
        <SourceNote source={exam.pattern.source} />
        <Link href={topicHref(exam, "syllabus")} className="inline-block mt-3 text-sm font-semibold text-orange-600 hover:underline">Full {exam.name} syllabus by section →</Link>
      </section>

      <CapExplainer examSlug={exam.slug} />

      {programs.length > 0 && (
        <section className={card}>
          <h2 className={h2}><Users className="w-4 h-4 text-orange-500" /> Verified MBA & PGDM programmes accepting {exam.name}</h2>
          <ProgramList programs={programs.slice(0, 3)} />
          <Link href={topicHref(exam, "colleges")} className="inline-block mt-3 text-sm font-semibold text-orange-600 hover:underline">All verified programmes accepting {exam.name} →</Link>
        </section>
      )}

      <FaqSection faqs={exam.faqs} />
    </>
  )
}

export function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs.length) return null
  return (
    <section className={card}>
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
  )
}

export function SyllabusBody({ exam }: { exam: ExamProfile }) {
  return (
    <>
      <section className={card}>
        <h2 className={h2}><ListChecks className="w-4 h-4 text-orange-500" /> {exam.name} exam pattern</h2>
        <PatternTable exam={exam} />
        <SourceNote source={exam.pattern.source} />
      </section>
      <section className={card}>
        <h2 className={h2}><BookOpen className="w-4 h-4 text-orange-500" /> Section-wise {exam.name} syllabus</h2>
        <p className="text-sm text-gray-600 mb-4">{exam.name} does not publish a detailed topic syllabus. The topics below are the areas that are commonly tested in each section.</p>
        <div className="space-y-4">
          {exam.syllabus.map((s) => (
            <div key={s.section}>
              <h3 className="font-semibold text-gray-900">{s.section}</h3>
              <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                {s.topics.map((t) => <li key={t} className="text-sm text-gray-700 flex gap-2"><span className="text-orange-500">•</span>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      {exam.officialPractice && (
        <section className={card}>
          <h2 className={h2}><Target className="w-4 h-4 text-orange-500" /> Official practice resources</h2>
          <ul className="space-y-1">
            {exam.officialPractice.map((r) => <li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sm underline text-gray-800 hover:text-orange-600">{r.label}</a></li>)}
          </ul>
        </section>
      )}
    </>
  )
}

export function ScoreBody({ exam }: { exam: ExamProfile }) {
  return (
    <>
      <section className={card}>
        <h2 className={h2}><Target className="w-4 h-4 text-orange-500" /> {exam.scoring.headline}</h2>
        <ul className="space-y-2">
          {exam.scoring.points.map((p) => <li key={p} className="text-gray-700 text-sm leading-relaxed flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />{p}</li>)}
        </ul>
        {exam.scoring.source && <SourceNote source={exam.scoring.source} />}
      </section>
      <section className={card}>
        <h2 className={h2}><Info className="w-4 h-4 text-orange-500" /> Why we don&apos;t publish a {exam.name} percentile calculator</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          A reliable score-to-percentile calculator needs the official score distribution for the current year, which {exam.conductingBody.split(" (")[0]} does not publish in advance.
          Calculators built on previous years or coaching surveys can be off by several percentile points. Instead of giving you a false number,
          we explain how the percentile is produced and point you to the official scorecard.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mt-2">Use previous-year cut-offs only as a rough guide, and keep a mix of reach, target and safe options on your shortlist.</p>
      </section>
    </>
  )
}

export function PrepBody({ exam }: { exam: ExamProfile }) {
  return (
    <>
      <section className={card}>
        <h2 className={h2}><Target className="w-4 h-4 text-orange-500" /> {exam.name} preparation strategy</h2>
        <p className="text-sm text-gray-600 mb-4">These tips are CampusLelo&apos;s editorial guidance, based on the official exam pattern. They are not official advice from the exam body.</p>
        <div className="space-y-5">
          {exam.preparation.map((p) => (
            <div key={p.area}>
              <h3 className="font-semibold text-gray-900">{p.area}</h3>
              <ul className="mt-1 space-y-1">
                {p.tips.map((t) => <li key={t} className="text-sm text-gray-700 flex gap-2"><span className="text-orange-500">•</span>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className={card}>
        <h2 className={h2}><ListChecks className="w-4 h-4 text-orange-500" /> Plan around the pattern</h2>
        <PatternTable exam={exam} />
        <SourceNote source={exam.pattern.source} />
      </section>
      {exam.officialPractice && (
        <section className={card}>
          <h2 className={h2}><BookOpen className="w-4 h-4 text-orange-500" /> Official mocks and practice</h2>
          <ul className="space-y-1">
            {exam.officialPractice.map((r) => <li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sm underline text-gray-800 hover:text-orange-600">{r.label}</a></li>)}
          </ul>
        </section>
      )}
    </>
  )
}

export function CollegesBody({ exam, programs }: { exam: ExamProfile; programs: ProgramAdmission[] }) {
  const byCity = programs.reduce<Record<string, ProgramAdmission[]>>((acc, p) => ((acc[p.city] ||= []).push(p), acc), {})
  return (
    <>
      <section className={card}>
        <h2 className={h2}><ShieldCheck className="w-4 h-4 text-orange-500" /> How we verify these lists</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          We list a programme only after checking that institute&apos;s own admission page or brochure for the stated intake. Exams are accepted per programme and campus, not per college,
          so a college may accept {exam.name} for one programme but not another. Always confirm on the institute&apos;s website before applying.
        </p>
      </section>
      {Object.entries(byCity).map(([city, list]) => (
        <section key={city} className={card}>
          <h2 className={h2}><Users className="w-4 h-4 text-orange-500" /> MBA & PGDM programmes in {city} accepting {exam.name}</h2>
          <ProgramList programs={list} />
        </section>
      ))}
      <CapExplainer examSlug={exam.slug} />
      {programs.length === 0 && (
        <section className={card}>
          <p className="text-sm text-gray-700">We haven&apos;t verified any individual programmes for {exam.name} yet. We&apos;re adding institutes as we confirm their current admission criteria.</p>
        </section>
      )}
    </>
  )
}


// ── AEO / GEO blocks ────────────────────────────────────────────────────────

export function QuickAnswer({ text }: { text: string }) {
  return (
    <section aria-label="Quick answer" className="quick-answer bg-blue-50 border border-blue-100 rounded-2xl p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#012858] mb-1">Quick answer</p>
      <p className="text-gray-800 leading-relaxed">{text}</p>
    </section>
  )
}

export function SourcesList({ sources }: { sources: SourceRef[] }) {
  if (!sources.length) return null
  return (
    <section aria-labelledby="sources-heading" className="text-xs text-gray-600 bg-white rounded-2xl border border-gray-100 p-5">
      <h2 id="sources-heading" className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-green-600" /> Sources</h2>
      <ul className="space-y-1">
        {sources.map((s) => (
          <li key={s.label}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-600">{s.label}</a>
            {" "}— {s.type === "official" ? "official" : "secondary, cross-checked"}, checked {formatDate(s.accessed)}
          </li>
        ))}
      </ul>
      <p className="mt-2">How we verify: <Link href="/editorial-policy" className="underline hover:text-orange-600">CampusLelo editorial policy</Link>. Spotted an error? Email <a href="mailto:support@campuslelo.com" className="underline">support@campuslelo.com</a>.</p>
    </section>
  )
}

export function collectSources(exam: ExamProfile, programs: ProgramAdmission[] = []): SourceRef[] {
  const all: SourceRef[] = [exam.eligibility.source, exam.pattern.source, ...exam.keyDates.map((d) => d.source), ...programs.map((p) => p.source)]
  if (exam.fee) all.push(exam.fee.source)
  if (exam.usageSource) all.push(exam.usageSource)
  if (exam.scoring.source) all.push(exam.scoring.source)
  const seen = new Set<string>()
  return all.filter((s) => (seen.has(s.label) ? false : (seen.add(s.label), true)))
}
