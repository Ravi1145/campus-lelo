import Link from "next/link"
import {
  ArrowRight, Award, BadgeCheck, Briefcase, CalendarClock, ClipboardCheck, Clock, Compass, Cpu,
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

  const DOT = ["#E0170F", "#024692", "#16A34A", "#7C3AED", "#F59E0B", "#0D9488"]
  const TINT = ["bg-red-50 text-[#C90D11]", "bg-blue-50 text-[#024692]", "bg-emerald-50 text-emerald-700", "bg-violet-50 text-violet-700", "bg-amber-50 text-amber-800", "bg-teal-50 text-teal-700"]

  return (
    <section aria-labelledby="insights-heading" className="relative overflow-hidden section-ivory px-5 py-10 sm:px-8 lg:px-12 sm:py-12">
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div className="reveal-item flex items-center gap-3" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C90D11]"><Newspaper className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#C90D11]">From the CampusLelo desk</p>
              <h2 id="insights-heading" className="font-[family-name:var(--font-fraunces)] text-2xl font-bold text-[#012858] sm:text-3xl">Latest from the blog</h2>
              <p className="text-sm text-gray-600">Guides, exam updates and admission tips to help you choose better.</p>
            </div>
          </div>
          <Link href="/blog" className="reveal-item group inline-flex items-center gap-1.5 border-b-2 border-[#F4604A] pb-0.5 font-[family-name:var(--font-fraunces)] text-base italic text-[#012858]" style={{ "--i": 1 } as React.CSSProperties}>
            Explore all guides <ArrowRight className="h-4 w-4 text-[#E0170F] transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_22rem]">
          {/* Articles */}
          <Reveal className="space-y-4">
            <Link href={`/blog/${featured.slug}`} className="reveal-item group relative grid overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 sm:grid-cols-[1.4fr_1fr]" style={{ "--i": 0 } as React.CSSProperties}>
              <div className="p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${F.chip}`}><F.icon className="h-3.5 w-3.5" aria-hidden="true" /> {featured.category}</span>
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-[#C90D11]">Latest</span>
                </div>
                <h3 className="text-xl font-extrabold leading-snug text-[#012858] sm:text-2xl">{featured.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">{featured.excerpt}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#012858] text-xs font-bold text-white" aria-hidden="true">CL</span>
                  <p className="text-xs text-gray-600"><span className="block text-sm font-semibold text-gray-900">{featured.author}</span>{fmtDate(featured.date)} · <Clock className="-mt-0.5 inline h-3 w-3" aria-hidden="true" /> {featured.readTime}</p>
                </div>
              </div>
              <div className="relative flex min-h-40 flex-col items-center justify-center gap-3 overflow-hidden bg-blue-50 p-5 sm:rounded-l-[3rem]">
                <span aria-hidden="true" className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-orange-100/80" />
                <p aria-hidden="true" className="relative -rotate-3 text-center font-[family-name:var(--font-fraunces)] text-lg italic leading-tight text-[#012858]">Understand cut-offs,<br />choose better colleges</p>
                <span className="relative inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-4 py-2 text-sm font-bold text-white transition-colors group-hover:bg-[#C90D11]">Read full guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </div>
            </Link>

            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {rest.slice(0, 3).map((p, i) => {
                const C = cat(p.category)
                return (
                  <li key={p.slug} className="reveal-item" style={{ "--i": i + 1 } as React.CSSProperties}>
                    <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-shadow hover:shadow-[0_10px_26px_-12px_rgba(1,40,88,0.4)]">
                      <span className={`flex h-14 items-center justify-center ${C.tile}`}><C.icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" /></span>
                      <span className="flex flex-1 flex-col p-4">
                        <span className={`self-start rounded-full px-2.5 py-0.5 text-xs font-bold ${C.chip}`}>{p.category}</span>
                        <span className="mt-2 line-clamp-3 text-sm font-bold leading-snug text-[#012858]">{p.title}</span>
                        <span className="mt-auto flex items-center justify-between pt-3 text-xs text-gray-600">
                          <span>{fmtDate(p.date)} · {p.readTime}</span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-[#024692] transition-colors group-hover:bg-[#012858] group-hover:text-white"><ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
                        </span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </Reveal>

          {/* Admission calendar */}
          <Reveal as="section" className="reveal-item rounded-2xl bg-orange-50/70 p-4 ring-1 ring-orange-100">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C90D11]"><CalendarClock className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <h3 id="calendar-heading" className="font-[family-name:var(--font-fraunces)] text-xl font-bold text-[#012858]">Admission calendar</h3>
                  <p className="text-xs text-gray-600">Important exam dates and deadlines</p>
                </div>
              </div>
              <Link href="/exams" className="shrink-0 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold text-[#C90D11] hover:bg-red-100">All exams →</Link>
            </div>

            {events.length ? (
              <ol className="mt-3 divide-y divide-gray-100 rounded-xl bg-white px-3 shadow-sm">
                {events.map((ev, i) => {
                  const d = new Date(ev.iso + "T00:00:00Z")
                  return (
                    <li key={ev.iso + ev.title} className="reveal-item" style={{ "--i": i + 1 } as React.CSSProperties}>
                      <Link href={ev.href} className="group flex items-center gap-3 py-2.5">
                        <span className={`w-11 shrink-0 rounded-lg py-1 text-center leading-none ${i === 0 ? "bg-[#E0170F] text-white" : TINT[i % TINT.length]}`}>
                          <span className="block text-[10px] font-bold uppercase">{d.toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" })}</span>
                          <span className="block text-base font-extrabold">{d.getUTCDate()}</span>
                        </span>
                        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: DOT[i % DOT.length] }} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold leading-snug text-gray-900 group-hover:text-[#012858]">{ev.title}</span>
                          <span className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-gray-600">{fmtDate(ev.iso)} <Countdown iso={ev.iso} /></span>
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#024692]"><ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            ) : (
              <p className="mt-3 rounded-xl bg-white px-4 py-5 text-sm text-gray-600">No dates confirmed right now, see the <Link href="/exams" className="underline">exam guides</Link> for the latest.</p>
            )}
            <p className="mt-3 flex items-center justify-between gap-3 text-xs text-gray-600">
              <span className="flex items-center gap-2"><BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /> Dates from official exam websites.</span>
              <Link href="/editorial-policy" className="shrink-0 font-semibold text-[#024692] underline">How we verify</Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
