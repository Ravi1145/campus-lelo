import Link from "next/link"
import { ArrowRight, CalendarDays, GitCompare, Scale, ShieldCheck, TrendingUp } from "lucide-react"
import { mbaExams } from "@/data/mba/exams"
import Reveal from "./Reveal"

// Homepage band: upcoming MBA/PGDM entrance exams (sourced dates from
// src/data/mba/exams.ts) + quick decision tools. Server component.

const ORDER = ["cat", "nmat", "snap", "mat", "xat", "cmat", "mah-mba-cet", "atma", "gmat"]

// Exams whose listed dates are a previous cycle or past sessions — don't show those as "upcoming"
const SUMMARY: Record<string, string> = {
  "mah-mba-cet": "2027 dates awaited (2026: Apr & May)",
  atma: "Several sessions a year, see next dates",
  gmat: "Available year-round",
  cmat: "CMAT 2027: date awaiting NTA confirmation",
}
const BADGE: Record<string, string> = { "mah-mba-cet": "CET" }

function nextDate(e: (typeof mbaExams)[number]): string {
  if (SUMMARY[e.slug]) return SUMMARY[e.slug]
  const d = e.keyDates.find((k) => /exam|window|attempt|session|paper/i.test(k.label) || /tests$/i.test(k.label)) ?? e.keyDates[0]
  return d ? d.value : e.datesNote ? "Dates to be confirmed" : e.frequency
}

const TOOLS = [
  { href: "/mba-cutoff-checker", label: "MBA cut-off checker", sub: "Your CAT percentile vs published", icon: TrendingUp },
  { href: "/mba-exam-acceptance", label: "Exam acceptance table", sub: "Which colleges take your exam", icon: GitCompare },
  { href: "/mba-vs-pgdm", label: "MBA vs PGDM", sub: "Degree vs diploma, explained", icon: Scale },
  { href: "/compare", label: "Compare two colleges", sub: "Side-by-side facts", icon: GitCompare },
  { href: "/editorial-policy", label: "How we verify data", sub: "Sources & review dates", icon: ShieldCheck },
]

export default function ExamGuidesBand() {
  const exams = ORDER.map((slug) => mbaExams.find((e) => e.slug === slug)).filter(Boolean) as typeof mbaExams
  return (
    <section aria-labelledby="exam-guides-heading" className="relative bg-[#011B40] px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-7xl">
        <div className="reveal-item mb-10 flex flex-wrap items-end justify-between gap-3" style={{ "--i": 0 } as React.CSSProperties}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-200">MBA &amp; PGDM 2027 admissions</p>
            <h2 id="exam-guides-heading" className="mt-1 text-3xl font-bold text-white sm:text-4xl">Upcoming entrance exams</h2>
            <p className="mt-2 max-w-xl text-sm text-blue-100 sm:text-base">Dates, pattern, eligibility and verified accepting colleges, every fact linked to its official source.</p>
          </div>
          <Link href="/exams" className="text-sm font-semibold text-orange-200 hover:underline">All exam guides →</Link>
        </div>

        {/* One ticket per exam: a stub with the name, a dashed tear line, then the dates */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((e, i) => (
            <li key={e.slug} className="reveal-item" style={{ "--i": i + 1 } as React.CSSProperties}>
              <Link href={`/exams/${e.slug}`} className="exam-ticket group relative flex h-full overflow-hidden rounded-2xl bg-[#F6F8FB] text-gray-900 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex w-24 shrink-0 flex-col items-center justify-center bg-[#012858] px-2 py-5 text-center text-white">
                  <span className="font-[family-name:var(--font-fraunces)] text-xl font-bold leading-none">{BADGE[e.slug] ?? e.name}</span>
                  <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-blue-200">Exam</span>
                </span>
                <span aria-hidden="true" className="exam-tear relative w-0 shrink-0 border-l-2 border-dashed border-gray-300" />
                <span className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-4">
                  <span className="flex items-start gap-1.5 text-sm text-gray-700">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#C90D11]" aria-hidden="true" />
                    <span>{nextDate(e)}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-[#012858]">
                    Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map(({ href, label, sub, icon: Icon }, i) => (
            <li key={href} className="reveal-item" style={{ "--i": i + 10 } as React.CSSProperties}>
              <Link href={href} className="flex h-full items-center gap-3 rounded-2xl bg-white/5 p-4 text-white ring-1 ring-white/15 transition-colors hover:bg-white/10">
                <Icon className="h-5 w-5 shrink-0 text-orange-200" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs text-blue-100">{sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
