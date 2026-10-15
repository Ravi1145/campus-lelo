import Link from "next/link"
import { ArrowRight, BellRing, CalendarDays, ClipboardList, GraduationCap, ListChecks, TrendingUp } from "lucide-react"
import { mbaExams } from "@/data/mba/exams"
import Reveal from "./Reveal"

// Homepage "Upcoming entrance exams": one card per MBA/PGDM exam with its exam date, registration window and
// quick links, all read from the sourced data in src/data/mba/exams.ts. No dates are typed here.

const ORDER = ["cat", "nmat", "snap", "mat", "xat", "cmat", "mah-mba-cet", "atma", "gmat"]
const STRIPE = ["#E0170F", "#024692", "#F4A53A"]
const BADGE: Record<string, string> = { "mah-mba-cet": "MAH CET" }

// Exams whose listed dates are a previous cycle or past sessions: say what is true now.
const DATE_NOTE: Record<string, string> = {
  "mah-mba-cet": "2027 dates awaited",
  atma: "Several sessions a year",
  gmat: "Year-round",
  cmat: "2027: date awaited",
}
const REG_NOTE: Record<string, string> = {
  "mah-mba-cet": "Not announced yet",
  cmat: "Not announced yet",
  gmat: "Open throughout",
  atma: "See the guide",
}

type Exam = (typeof mbaExams)[number]

const clean = (v: string) => v.replace(/\s*\([^)]*\)/g, "").replace(/,\s*\d{1,2}:\d{2}.*$/, "").replace(/\s*:\s*/g, " to ").trim()

function examDate(e: Exam): string {
  if (DATE_NOTE[e.slug]) return DATE_NOTE[e.slug]
  const d = e.keyDates.find((k) => /exam date|testing window|tests$|paper-based/i.test(k.label))
  if (!d) return "See the guide"
  const m = d.value.match(/^Exam (.*?),/)
  return clean(m ? m[1] : d.value)
}

function registration(e: Exam): string {
  if (REG_NOTE[e.slug]) return REG_NOTE[e.slug]
  const r = e.keyDates.find((k) => /^registration$/i.test(k.label))
  if (r) return clean(r.value)
  const closes = e.keyDates.map((k) => k.value.match(/registration closes (.*)$/i)?.[1]).find(Boolean)
  return closes ? `Closes ${closes}` : "See the guide"
}

const PILLS = [
  { label: "All exams", href: "/exams" },
  { label: "MBA / PGDM", href: "/mba", on: true },
  { label: "Engineering", href: "/exams/mht-cet" },
  { label: "Medical", href: "/exams/neet" },
  { label: "Law", href: "/law-colleges-pune" },
  { label: "Design", href: "/design-colleges-pune" },
]

const SHORTCUTS = [
  { href: "/my-admission-plan", title: "My admission plan", sub: "Dates and colleges on one page", icon: ClipboardList, tone: "bg-emerald-50 text-emerald-700" },
  { href: "/mba-cutoff-checker", title: "MBA cut-off checker", sub: "Your percentile vs published minimums", icon: TrendingUp, tone: "bg-blue-50 text-blue-700" },
  { href: "/mba-exam-acceptance", title: "Top colleges by exam", sub: "Which colleges list your exam", icon: GraduationCap, tone: "bg-amber-50 text-amber-700" },
  { href: "/exams", title: "Syllabus and pattern", sub: "Every exam guide in one place", icon: ListChecks, tone: "bg-violet-50 text-violet-700" },
]

export default function ExamGuidesBand() {
  const exams = ORDER.map((slug) => mbaExams.find((e) => e.slug === slug)).filter(Boolean) as Exam[]
  return (
    <section aria-labelledby="exam-guides-heading" className="section-ivory px-4 py-10 sm:px-6 sm:py-12">
      <Reveal className="mx-auto max-w-7xl">
        <div className="reveal-item grid items-end gap-4 lg:grid-cols-[1.1fr_1fr]" style={{ "--i": 0 } as React.CSSProperties}>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#024692]">Entrance exams</p>
            <h2 id="exam-guides-heading" className="mt-2 text-2xl font-bold leading-tight text-[#012858] sm:text-3xl">Upcoming entrance exams</h2>
            <p className="mt-3 max-w-xl text-base text-gray-600">Dates, eligibility, pattern and the colleges that accept each exam, every fact linked to its official source.</p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#024692] ring-1 ring-blue-100"><BellRing className="h-6 w-6" aria-hidden="true" /></span>
              <div>
                <p className="text-lg font-bold text-[#012858]">Never miss an important date</p>
                <p className="mt-0.5 text-sm text-gray-600">Get a message when an exam date changes. Separate from counselling.</p>
              </div>
            </div>
            <Link href="/news#alerts" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#012858] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#024692]">
              Get exam alerts <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="reveal-item mt-5 flex flex-wrap items-center gap-2" style={{ "--i": 1 } as React.CSSProperties}>
          {PILLS.map((p) => (
            <Link key={p.label} href={p.href} className={`inline-flex min-h-9 items-center rounded-full px-4 text-sm font-semibold transition-colors ${p.on ? "bg-[#012858] text-white" : "bg-gray-100 text-[#012858] hover:bg-gray-200"}`}>{p.label}</Link>
          ))}
          <Link href="/exams" className="ml-auto inline-flex min-h-9 items-center gap-1.5 text-sm font-bold text-[#024692] hover:underline">View all exams <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>

        <ul className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0" aria-label="Upcoming entrance exams, scroll sideways">
          {exams.map((e, i) => (
            <li key={e.slug} className="reveal-item w-[78vw] shrink-0 snap-start sm:w-72" style={{ "--i": i + 2 } as React.CSSProperties}>
              <article className="group relative flex h-full flex-col rounded-xl bg-white p-4 shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-shadow duration-300 hover:shadow-[0_10px_26px_-12px_rgba(1,40,88,0.4)]" style={{ borderLeft: `4px solid ${STRIPE[i % 3]}` }}>
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#012858] px-1 text-center font-[family-name:var(--font-fraunces)] text-xs font-bold leading-tight text-white">{BADGE[e.slug] ?? e.name}</span>
                  <div className="min-w-0">
                    <h3 className="flex items-center gap-2 text-base font-bold text-[#012858]">{e.name}<span className="rounded-full bg-red-50 px-2 py-0.5 font-sans text-[11px] font-bold text-[#C90D11]">PG</span></h3>
                    <p className="truncate text-sm text-gray-600">{e.fullName}</p>
                  </div>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-3">
                  <div className="flex gap-2">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                    <div><dt className="text-xs text-gray-600">Exam date</dt><dd className="text-sm font-semibold leading-snug text-gray-900">{examDate(e)}</dd></div>
                  </div>
                  <div className="flex gap-2">
                    <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                    <div><dt className="text-xs text-gray-600">Registration</dt><dd className="text-sm font-semibold leading-snug text-gray-900">{registration(e)}</dd></div>
                  </div>
                </dl>
                <div className="mt-auto flex items-center justify-between pt-3 text-sm font-semibold text-[#024692]">
                  <nav aria-label={`${e.name} guides`} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <Link href={`/exams/${e.slug}/syllabus`} className="py-2 hover:underline">Syllabus</Link><span aria-hidden="true" className="text-gray-300">|</span>
                    <Link href={`/exams/${e.slug}`} className="py-2 hover:underline">Pattern</Link><span aria-hidden="true" className="text-gray-300">|</span>
                    <Link href={`/exams/${e.slug}/colleges`} className="py-2 hover:underline">Top colleges</Link>
                  </nav>
                  <Link href={`/exams/${e.slug}`} aria-label={`${e.name} guide`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#024692] transition-colors group-hover:bg-[#012858] group-hover:text-white"><ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SHORTCUTS.map(({ href, title, sub, icon: Icon, tone }, i) => (
            <li key={href} className="reveal-item" style={{ "--i": i + 11 } as React.CSSProperties}>
              <Link href={href} className={`group flex h-full items-center gap-3 rounded-xl p-3 ring-1 ring-black/5 transition-transform hover:-translate-y-0.5 ${tone.split(" ")[0]}`}>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white ${tone.split(" ")[1]}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1"><span className="block font-bold text-gray-900">{title}</span><span className="block text-sm text-gray-700">{sub}</span></span>
                <ArrowRight className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
