"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarCheck2, CalendarClock, CheckCircle2, ExternalLink, Hourglass, Radio } from "lucide-react"
import { exams } from "@/data/exams"
import { examTimeline, type ExamStatus, type ExamTimeline } from "@/lib/examTimeline"
import Reveal from "./Reveal"

// Exam season tracker — every exam shown as a "ticket" with a live status
// computed from today's date (registration open / exam in N days / completed),
// a progress bar from registration-open to exam day, and stream filters.
// Replaces a static table that labelled already-finished 2026 exams "upcoming".

const FILTERS = [
  { id: "all", label: "All exams", match: () => true },
  { id: "eng", label: "Engineering", match: (s: string[]) => s.some((x) => /engineering|pharmacy/i.test(x)) },
  { id: "mba", label: "MBA & PGDM", match: (s: string[]) => s.some((x) => /mba|pgdm|management/i.test(x)) },
  { id: "med", label: "Medical", match: (s: string[]) => s.some((x) => /medical|dental/i.test(x)) },
  { id: "more", label: "Design & more", match: (s: string[]) => s.some((x) => /architecture|law|media|design/i.test(x)) },
] as const

const ORDER: Record<ExamStatus, number> = { open: 0, ongoing: 1, upcoming: 2, awaited: 3, completed: 4 }

const STATUS_UI: Record<ExamStatus, { label: (t: ExamTimeline) => string; pill: string; icon: React.ElementType }> = {
  open: { label: (t) => `Registration open · closes in ${t.daysTo} day${t.daysTo === 1 ? "" : "s"}`, pill: "bg-emerald-50 text-emerald-800 ring-emerald-200", icon: Radio },
  ongoing: { label: () => "Exam in progress", pill: "bg-orange-50 text-orange-700 ring-orange-200", icon: Hourglass },
  upcoming: { label: (t) => `Exam in ${t.daysTo} day${t.daysTo === 1 ? "" : "s"}`, pill: "bg-blue-50 text-[#024692] ring-blue-200", icon: CalendarClock },
  awaited: { label: () => "Dates awaited", pill: "bg-slate-100 text-slate-700 ring-slate-200", icon: CalendarClock },
  completed: { label: () => "2026 cycle completed · next dates awaited", pill: "bg-slate-100 text-slate-600 ring-slate-200", icon: CheckCircle2 },
}

const slugOf = (name: string) => name.toLowerCase().replace(/\s+/g, "-")
const fmt = (ms: number, opts: Intl.DateTimeFormatOptions) => new Date(ms).toLocaleDateString("en-IN", { ...opts, timeZone: "UTC" })

export default function ExamCalendar({ generatedAt = Date.now() }: { generatedAt?: number }) {
  // Server and first client render share one timestamp (no hydration mismatch);
  // then statuses refresh to the visitor's actual "today".
  const [now, setNow] = useState(generatedAt)
  useEffect(() => setNow(Date.now()), [])
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all")

  const rows = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter)!
    return exams
      .filter((e) => f.match(e.streams))
      .map((e) => ({ e, t: examTimeline(e.applicationDate, e.examDate, now) }))
      .sort((a, b) => ORDER[a.t.status] - ORDER[b.t.status] || (a.t.examStart ?? Infinity) - (b.t.examStart ?? Infinity))
  }, [filter, now])

  const all = useMemo(() => exams.map((e) => examTimeline(e.applicationDate, e.examDate, now).status), [now])
  const openCount = all.filter((s) => s === "open").length
  const upcomingCount = all.filter((s) => s === "upcoming" || s === "ongoing").length

  return (
    <section aria-labelledby="exam-tracker-heading" className="relative py-10 px-4 sm:px-6 section-ivory overflow-hidden">
      <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative max-w-7xl mx-auto">
        {/* Heading + live summary */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#012858] px-3 py-1.5 text-xs font-semibold text-white">
              <CalendarCheck2 className="w-3.5 h-3.5" aria-hidden="true" /> Live exam tracker
            </span>
            <h2 id="exam-tracker-heading" className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#012858]">Entrance exam season at a glance</h2>
            <p className="mt-1 text-sm text-gray-600">Status updates automatically from today&apos;s date. Tap an exam for its full guide.</p>
          </div>
          <dl className="flex gap-3">
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-emerald-200 shadow-sm">
              <dt className="text-xs font-medium text-emerald-800 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2" aria-hidden="true"><span className="insights-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
                Registrations open
              </dt>
              <dd className="text-2xl font-extrabold text-gray-900">{openCount}</dd>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-blue-200 shadow-sm">
              <dt className="text-xs font-medium text-[#024692]">Exams coming up</dt>
              <dd className="text-2xl font-extrabold text-gray-900">{upcomingCount}</dd>
            </div>
          </dl>
        </div>

        {/* Filters */}
        <div role="tablist" aria-label="Filter exams by stream" className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                filter === f.id ? "bg-[#012858] text-white shadow-md shadow-blue-900/20 scale-105" : "bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-orange-300 hover:text-[#012858]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Tickets — key forces a fresh stagger animation when the filter changes */}
        <Reveal key={filter} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map(({ e, t }, i) => {
            const S = STATUS_UI[t.status]
            const done = t.status === "completed"
            const dateMs = t.status === "open" ? t.appEnd : t.examStart
            return (
              <article
                key={e.id}
                className={`ticket reveal-item group relative flex overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-orange-200 ${done ? "opacity-80" : ""}`}
                style={{ "--i": Math.min(i, 8) } as React.CSSProperties}
              >
                {/* Main part */}
                <div className="min-w-0 flex-1 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${S.pill}`}>
                      <S.icon className={`w-3.5 h-3.5 ${t.status === "open" ? "ticket-blink" : ""}`} aria-hidden="true" />
                      {S.label(t)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-extrabold text-gray-900">
                    <Link href={`/exams/${slugOf(e.name)}`} className="after:absolute after:inset-0 hover:text-[#012858]">{e.name}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{e.fullName}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.streams.slice(0, 3).map((s) => <span key={s} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{s}</span>)}
                  </div>

                  {/* Progress: registration → exam day */}
                  {t.progress !== undefined && !done && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{t.appStart ? `Reg. opened ${fmt(t.appStart, { day: "numeric", month: "short" })}` : "Registration open"}</span>
                        <span>Exam day</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden" role="progressbar" aria-label={`${e.name} season progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(t.progress * 100)}>
                        <div className="ticket-progress h-full rounded-full bg-gradient-to-r from-[#FB4312] to-[#E0170F]" style={{ "--p": `${Math.max(4, t.progress * 100)}%` } as React.CSSProperties} />
                      </div>
                    </div>
                  )}
                  <p className="mt-3 text-xs text-gray-600">
                    <span className="font-semibold text-gray-700">Apply:</span> {e.applicationDate}
                  </p>
                </div>

                {/* Perforated stub */}
                <div className="ticket-stub relative z-10 flex w-28 shrink-0 flex-col items-center justify-center gap-1 border-l-2 border-dashed border-gray-200 px-2 py-4 text-center">
                  {dateMs ? (
                    <>
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-600">{t.status === "open" ? "Closes" : done ? "Was" : "Exam"}</span>
                      <span className="text-3xl font-extrabold leading-none text-[#012858]">{fmt(dateMs, { day: "numeric" })}</span>
                      <span className="text-xs font-semibold uppercase text-gray-600">{fmt(dateMs, { month: "short", year: "numeric" })}</span>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-gray-600">Dates<br />awaited</span>
                  )}
                  <a
                    href={e.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 mt-2 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-orange-700 hover:bg-orange-50"
                    aria-label={`${e.name} official website`}
                  >
                    Official <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </article>
            )
          })}
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-600">Dates from official exam websites, always confirm before applying.</p>
          <Link href="/exams" className="group inline-flex items-center gap-1.5 rounded-xl bg-[#012858] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#024692]">
            All exam guides <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
