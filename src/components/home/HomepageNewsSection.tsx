import Link from "next/link"
import {
  ArrowRight, Award, Briefcase, CalendarClock, ClipboardCheck, Clock, Compass, Cpu,
  GraduationCap, IndianRupee, Newspaper, PenLine, Stethoscope, TrendingUp, Users,
} from "lucide-react"
import { blogs } from "@/data/blogs"
import { mbaExams } from "@/data/mba/exams"
import Reveal from "./Reveal"
import Countdown from "./Countdown"

// "Trending insights" — latest real articles (from src/data/blogs) + an
// admission calendar built from the sourced exam data (src/data/mba/exams).
// Replaces hardcoded headlines, several of which were inaccurate.

const CATEGORY: Record<string, { icon: React.ElementType; tile: string; chip: string }> = {
  Engineering: { icon: Cpu, tile: "bg-blue-50 text-[#024692]", chip: "bg-blue-50 text-[#024692]" },
  MBA: { icon: Briefcase, tile: "bg-orange-50 text-orange-700", chip: "bg-orange-50 text-orange-700" },
  Exams: { icon: PenLine, tile: "bg-violet-50 text-violet-700", chip: "bg-violet-50 text-violet-700" },
  Medical: { icon: Stethoscope, tile: "bg-emerald-50 text-emerald-700", chip: "bg-emerald-50 text-emerald-700" },
  Placements: { icon: TrendingUp, tile: "bg-sky-50 text-sky-700", chip: "bg-sky-50 text-sky-700" },
  Admissions: { icon: ClipboardCheck, tile: "bg-indigo-50 text-indigo-700", chip: "bg-indigo-50 text-indigo-700" },
  "Fees & Finance": { icon: IndianRupee, tile: "bg-amber-50 text-amber-800", chip: "bg-amber-50 text-amber-800" },
  Scholarships: { icon: Award, tile: "bg-amber-50 text-amber-800", chip: "bg-amber-50 text-amber-800" },
  Careers: { icon: Compass, tile: "bg-teal-50 text-teal-700", chip: "bg-teal-50 text-teal-700" },
  "College Life": { icon: Users, tile: "bg-rose-50 text-rose-700", chip: "bg-rose-50 text-rose-700" },
  "Student Life": { icon: Users, tile: "bg-rose-50 text-rose-700", chip: "bg-rose-50 text-rose-700" },
}
const cat = (c: string) => CATEGORY[c] ?? { icon: GraduationCap, tile: "bg-slate-100 text-slate-700", chip: "bg-slate-100 text-slate-700" }

const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })

// ── Admission calendar from sourced exam dates ──────────────────────────────
const MONTHS: Record<string, string> = { jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06", jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12" }
function datesIn(text: string): string[] {
  const out: string[] = []
  // "2 Nov – 20 Dec 2026" → give the first date its year: "2 Nov 2026 – 20 Dec 2026"
  text = text.replace(
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*)(\s*[–-]\s*\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4}))/g,
    "$1 $3$2",
  )
  // "29 Nov 2026", "6–8 Apr 2026" (takes the start), "13, 19 and 26 Dec 2026" (takes the first)
  for (const m of text.matchAll(/(\d{1,2})(?:[–-]\d{1,2}|(?:,\s*\d{1,2})*(?:\s+and\s+\d{1,2})?)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/g)) {
    out.push(`${m[3]}-${MONTHS[m[2].toLowerCase()]}-${m[1].padStart(2, "0")}`)
  }
  return out
}

const EVENT_LABEL: Record<string, string> = {
  "Exam date": "exam day",
  "Testing window": "testing window opens",
  "SNAP tests": "first test (up to 3 attempts)",
  "Paper-based test (PBT)": "paper-based test",
  "Computer-based test (CBT)": "computer-based test",
  "Admit card": "admit card release",
}

interface CalEvent { iso: string; title: string; detail: string; href: string }
function upcomingEvents(limit = 6): CalEvent[] {
  const today = new Date().toISOString().slice(0, 10)
  const events: CalEvent[] = []
  for (const e of mbaExams) {
    for (const d of e.keyDates) {
      const ds = datesIn(d.value)
      if (!ds.length) continue
      const isRegistration = /registration|scheduling/i.test(d.label)
      // registration windows → the closing date is what matters; exams → the start
      const iso = isRegistration ? ds[ds.length - 1] : ds[0]
      if (iso < today) continue
      const title = isRegistration
        ? `${e.name} ${/scheduling/i.test(d.label) ? "slot booking" : "registration"} closes`
        : `${e.name}: ${EVENT_LABEL[d.label] ?? d.label.toLowerCase()}`
      events.push({ iso, title, detail: e.fullName, href: `/exams/${e.slug}` })
    }
  }
  return events.sort((a, b) => a.iso.localeCompare(b.iso)).slice(0, limit)
}

export default function HomepageNewsSection() {
  const posts = [...blogs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
  const [featured, ...rest] = posts
  const events = upcomingEvents()
  const F = cat(featured.category)

  return (
    <section aria-labelledby="insights-heading" className="relative py-16 px-4 sm:px-6 section-pearl overflow-hidden">
      {/* soft brand glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-orange-100/60 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div className="reveal-item flex items-center gap-3" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="w-11 h-11 rounded-xl bg-[#012858] text-white flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Newspaper className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-orange-600">From the CampusLelo desk</p>
              <h2 id="insights-heading" className="text-2xl sm:text-3xl font-extrabold text-[#012858]">Latest from the blog</h2>
            </div>
          </div>
          <Link href="/blog" className="reveal-item group inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600" style={{ "--i": 1 } as React.CSSProperties}>
            All guides <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Articles ─────────────────────────────────────────── */}
          <Reveal className="lg:col-span-2 space-y-4">
            {/* Featured */}
            <Link
              href={`/blog/${featured.slug}`}
              className="reveal-item group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-[#011B40] via-[#012858] to-[#024692] p-6 sm:p-8 text-white shadow-xl shadow-blue-950/20 transition-transform duration-300 hover:-translate-y-1"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              <span aria-hidden="true" className="insights-orb absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#E0170F]/40 blur-3xl" />
              <span aria-hidden="true" className="insights-orb insights-orb--slow absolute -bottom-20 right-24 w-48 h-48 rounded-full bg-[#FB4312]/25 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                    <F.icon className="w-3.5 h-3.5" aria-hidden="true" /> {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E0170F] px-3 py-1 text-xs font-bold">Latest</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold leading-snug max-w-2xl">
                  <span className="insights-underline">{featured.title}</span>
                </h3>
                <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed line-clamp-2 max-w-2xl">{featured.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs sm:text-sm text-blue-100">
                    {featured.author} · {fmtDate(featured.date)} · <Clock className="inline w-3.5 h-3.5 -mt-0.5" aria-hidden="true" /> {featured.readTime}
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-white text-[#012858] px-4 py-2 text-sm font-bold">
                    Read guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>

            {/* List */}
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rest.map((p, i) => {
                const C = cat(p.category)
                return (
                  <li key={p.slug} className="reveal-item" style={{ "--i": i + 1 } as React.CSSProperties}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-900/5"
                    >
                      <span className={`relative w-12 h-12 shrink-0 rounded-xl ${C.tile} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                        <C.icon className="w-5 h-5" aria-hidden="true" />
                        <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#012858] text-white text-xs font-bold flex items-center justify-center">{i + 2}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${C.chip}`}>{p.category}</span>
                        <span className="mt-1.5 block font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#012858]">
                          <span className="insights-underline insights-underline--dark">{p.title}</span>
                        </span>
                        <span className="mt-1.5 flex items-center gap-2 text-xs text-gray-600">
                          {fmtDate(p.date)} · <Clock className="w-3 h-3" aria-hidden="true" /> {p.readTime}
                        </span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </Reveal>

          {/* ── Admission calendar ───────────────────────────────── */}
          <Reveal as="section" className="reveal-item rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#011B40] to-[#024692] px-5 py-4 text-white">
              <h3 id="calendar-heading" className="flex items-center gap-2 font-bold">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="insights-ping absolute inline-flex h-full w-full rounded-full bg-[#FB4312]" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FB4312]" />
                </span>
                Admission calendar
              </h3>
              <Link href="/exams" className="text-xs font-semibold text-blue-100 hover:text-white">All exams →</Link>
            </div>

            {events.length ? (
              <ol className="relative px-5 py-5">
                <span aria-hidden="true" className="absolute left-[2.15rem] top-7 bottom-7 w-px bg-gradient-to-b from-orange-300 via-blue-200 to-transparent" />
                {events.map((ev, i) => {
                  const d = new Date(ev.iso + "T00:00:00Z")
                  return (
                    <li key={ev.iso + ev.title} className="reveal-item relative" style={{ "--i": i + 1 } as React.CSSProperties}>
                      <Link href={ev.href} className="group flex items-start gap-4 rounded-xl p-2 -mx-2 transition-colors hover:bg-orange-50/60">
                        <span className={`relative z-10 w-12 shrink-0 rounded-xl text-center leading-none py-1.5 ${i === 0 ? "bg-[#E0170F] text-white shadow-md shadow-red-900/20" : "bg-[#012858] text-white"}`}>
                          <span className="block text-xs font-semibold uppercase">{d.toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" })}</span>
                          <span className="block text-lg font-extrabold">{d.getUTCDate()}</span>
                        </span>
                        <span className="min-w-0 flex-1 pt-0.5">
                          <span className="block text-sm font-bold text-gray-900 leading-snug group-hover:text-[#012858]">{ev.title}</span>
                          <span className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                            <CalendarClock className="w-3.5 h-3.5" aria-hidden="true" /> {fmtDate(ev.iso)}
                            <Countdown iso={ev.iso} />
                          </span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            ) : (
              <p className="px-5 py-6 text-sm text-gray-600">No dates confirmed right now, see the <Link href="/exams" className="underline">exam guides</Link> for the latest.</p>
            )}
            <p className="border-t border-gray-100 px-5 py-3 text-xs text-gray-600">
              Dates from official exam websites. <Link href="/editorial-policy" className="underline hover:text-orange-600">How we verify</Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
