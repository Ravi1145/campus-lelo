import Link from "next/link"
import Image from "next/image"
import { blogImageAt } from "@/lib/blogImage"
import { ArrowRight, BadgeCheck, CalendarDays, FileText, User } from "lucide-react"
import { blogs } from "@/data/blogs"
import { mbaExams } from "@/data/mba/exams"
import Countdown from "./Countdown"

// Latest guides (real articles from src/data/blogs) next to an admission calendar built from the sourced exam
// data (src/data/mba/exams). Plain white cards, one blue accent, one red accent for the next date.

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
  const events = upcomingEvents()

  return (
    <section aria-labelledby="insights-heading" className="bg-white px-5 py-10 sm:px-8 lg:px-12 sm:py-12">
      <div className="mx-auto max-w-[calc(var(--container-7xl)+6rem)]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_22rem] lg:gap-0">
          {/* Articles: thumbnail, title, author and date on one line each */}
          <div className="lg:pr-10">
            <h2 id="insights-heading" className="text-2xl font-bold text-[#0F172A] sm:text-3xl">Latest from the blog</h2>
            <p className="mt-1 text-sm text-gray-600">Guides, exam updates and admission tips to help you choose better.</p>

            <ol className="mt-5 space-y-1">
              {posts.map((p, i) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-gray-50">
                    <span className="relative h-[4.5rem] w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100 ring-1 ring-gray-200 sm:h-20 sm:w-32">
                      <Image src={blogImageAt(i, p.image)} alt="" fill sizes="8rem" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-[15px] font-bold leading-snug text-[#012858] group-hover:underline">{p.title}</span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                        <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" aria-hidden="true" />{p.author}</span>
                        <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{fmtDate(p.date)}</span>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-[#024692]">{p.category}</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>

            <div className="mt-6 text-center">
              <Link href="/blog" className="group inline-flex items-center gap-2 rounded-full bg-[#E0170F] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C90D11]">
                View all guides <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Admission calendar as a timeline */}
          <section aria-labelledby="calendar-heading" className="lg:border-l lg:border-gray-200 lg:pl-10">
            <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-200">
              <div className="flex items-center justify-between gap-3">
                <h3 id="calendar-heading" className="text-base font-bold text-[#012858]">Admission calendar</h3>
                <Link href="/exams" className="text-xs font-bold text-[#C90D11] hover:underline">All exams →</Link>
              </div>

              {events.length ? (
                <ol className="relative mt-4 space-y-3 before:absolute before:bottom-3 before:left-[13px] before:top-3 before:w-px before:bg-gray-300">
                  {events.slice(0, 5).map((ev, i) => (
                    <li key={ev.iso + ev.title} className="relative pl-9">
                      <span className={`absolute left-0 top-3 flex h-[26px] w-[26px] items-center justify-center rounded-full ring-4 ring-gray-50 ${i === 0 ? "bg-[#E0170F] text-white" : "bg-blue-50 text-[#024692]"}`} aria-hidden="true"><FileText className="h-3.5 w-3.5" /></span>
                      <Link href={ev.href} className="block rounded-xl bg-white p-3 ring-1 ring-gray-200 transition-colors hover:ring-[#012858]/40">
                        <span className="block text-sm font-bold leading-snug text-gray-900">{ev.title}</span>
                        <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                          <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{fmtDate(ev.iso)}</span>
                          <Countdown iso={ev.iso} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-3 rounded-xl bg-white px-4 py-5 text-sm text-gray-600">No dates confirmed right now, see the <Link href="/exams" className="underline">exam guides</Link> for the latest.</p>
              )}

              <p className="mt-4 flex items-center justify-between gap-3 border-t border-gray-200 pt-3 text-xs text-gray-600">
                <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 shrink-0 text-[#024692]" aria-hidden="true" /> Dates from official exam websites.</span>
                <Link href="/editorial-policy" className="shrink-0 font-semibold text-[#024692] underline">How we verify</Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
