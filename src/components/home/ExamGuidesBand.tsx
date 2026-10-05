import Link from "next/link"
import { ArrowRight, CalendarDays, GitCompare, Scale, ShieldCheck, TrendingUp } from "lucide-react"
import { mbaExams } from "@/data/mba/exams"

// Homepage band: upcoming MBA/PGDM entrance exams (sourced dates from
// src/data/mba/exams.ts) + quick decision tools. Server component.

const ORDER = ["cat", "nmat", "snap", "mat", "xat", "cmat", "mah-mba-cet", "atma", "gmat"]

// Exams whose listed dates are a previous cycle or past sessions — don't show those as "upcoming"
const SUMMARY: Record<string, string> = {
  "mah-mba-cet": "2027 dates awaited (2026: Apr & May)",
  atma: "Several sessions a year — see next dates",
  gmat: "Available year-round",
  cmat: "CMAT 2027 — date awaiting NTA confirmation",
}
const BADGE: Record<string, string> = { "mah-mba-cet": "CET" }

function nextDate(e: (typeof mbaExams)[number]): string {
  if (SUMMARY[e.slug]) return SUMMARY[e.slug]
  const d = e.keyDates.find((k) => /exam|window|attempt|session|paper/i.test(k.label) || /tests$/i.test(k.label)) ?? e.keyDates[0]
  return d ? d.value : e.datesNote ? "Dates to be confirmed" : e.frequency
}

const TOOLS = [
  { href: "/mba-vs-pgdm", label: "MBA vs PGDM", sub: "Degree vs diploma, explained", icon: Scale },
  { href: "/mba-cutoff-delhi-ncr", label: "MBA cut-offs Delhi NCR", sub: "FMS, IIFT & what's published", icon: TrendingUp },
  { href: "/compare", label: "Compare two colleges", sub: "Side-by-side facts", icon: GitCompare },
  { href: "/editorial-policy", label: "How we verify data", sub: "Sources & review dates", icon: ShieldCheck },
]

export default function ExamGuidesBand() {
  const exams = ORDER.map((slug) => mbaExams.find((e) => e.slug === slug)).filter(Boolean) as typeof mbaExams
  return (
    <section aria-labelledby="exam-guides-heading" className="relative py-16 px-4 sm:px-6 bg-rich-navy">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-300">MBA & PGDM 2027 admissions</p>
            <h2 id="exam-guides-heading" className="font-bold text-2xl sm:text-3xl text-white mt-1">Upcoming entrance exams</h2>
            <p className="mt-1 text-sm text-blue-100">Dates, pattern, eligibility and verified accepting colleges — every fact linked to its official source.</p>
          </div>
          <Link href="/exams" className="text-sm font-semibold text-orange-300 hover:underline">All exam guides →</Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {exams.map((e) => (
            <li key={e.slug}>
              <Link href={`/exams/${e.slug}`} className="group flex items-start gap-3 h-full bg-white rounded-xl border border-gray-200 p-4 shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:border-orange-300 transition-all">
                <span className="w-10 h-10 shrink-0 rounded-lg bg-[#012858] text-white text-xs font-bold flex items-center justify-center text-center leading-tight px-1">
                  {BADGE[e.slug] ?? e.name}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-gray-900">{e.name}</span>
                  <span className="mt-0.5 flex items-start gap-1 text-sm text-gray-600">
                    <CalendarDays className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{nextDate(e)}</span>
                  </span>
                </span>
                <ArrowRight className="w-4 h-4 mt-1 text-gray-400 group-hover:text-orange-600 shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {TOOLS.map(({ href, label, sub, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className="flex items-center gap-3 h-full rounded-xl bg-white/10 text-white p-4 ring-1 ring-white/15 backdrop-blur hover:bg-white/15 transition-colors">
                <Icon className="w-5 h-5 shrink-0 text-orange-300" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-sm">{label}</span>
                  <span className="block text-xs text-blue-100">{sub}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
