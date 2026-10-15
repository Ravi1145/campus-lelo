"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowRight, BadgeCheck, Building2, CalendarClock, FileText, GitCompare, GraduationCap,
  Search, ShieldCheck, SlidersHorizontal, Sparkles, Users,
} from "lucide-react"
import { exams } from "@/data/exams"
import { examTimeline } from "@/lib/examTimeline"

// Homepage hero — "Marketplace / Directory" pattern (UI/UX Pro Max): search is the
// primary action, one red CTA, trust proof directly below. Animations run once on
// load (no decorative infinite loops) and are disabled for reduced motion (globals.css).

const ROTATING = ["Engineering", "MBA", "Medical", "Law", "Design", "Commerce"]
const STREAMS = ["Engineering", "MBA", "Medical", "Law", "Design", "Pharmacy", "Arts", "Commerce", "BBA", "BCA", "MCA"]
const EXAMS = ["MHT-CET", "JEE Main", "CAT", "NEET", "CLAT", "SNAP", "CMAT", "XAT", "MAT"]

const POPULAR = [
  { label: "MBA in Pune", href: "/mba-in-pune" },
  { label: "B.Tech", href: "/colleges?stream=Engineering" },
  { label: "CAT colleges", href: "/mba-colleges-in-pune-accepting-cat" },
  { label: "BBA", href: "/colleges?stream=BBA" },
  { label: "Medical", href: "/colleges?stream=Medical" },
  { label: "Law", href: "/colleges?stream=Law" },
]

const STATS = [
  { icon: Building2, value: 100, suffix: "+", label: "Colleges profiled" },
  { icon: GraduationCap, value: 50, suffix: "+", label: "Courses & streams" },
  { icon: Users, value: 0, suffix: "", text: "Free", label: "College search & shortlist" },
  { icon: FileText, value: 9, suffix: "", label: "MBA exam guides" },
  { icon: ShieldCheck, value: 0, suffix: "", text: "Sourced", label: "Exam & admission data" },
]

const DAY = 86_400_000

/** Nearest upcoming deadline across all exams (registration close or exam day). */
function useNextDeadline() {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => setNow(Date.now()), [])
  return useMemo(() => {
    if (now === null) return null
    let best: { text: string; days: number; href: string } | null = null
    for (const e of exams) {
      const t = examTimeline(e.applicationDate, e.examDate, now)
      if (t.daysTo === undefined || (t.status !== "open" && t.status !== "upcoming")) continue
      const text = t.status === "open" ? `${e.name} registration closes` : `${e.name} exam`
      if (!best || t.daysTo < best.days) best = { text, days: t.daysTo, href: `/exams/${e.name.toLowerCase().replace(/\s+/g, "-")}` }
    }
    return best
  }, [now])
}

function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setI((x) => (x + 1) % ROTATING.length), 2200)
    return () => window.clearInterval(id)
  }, [])
  return (
    // Own line with fixed height so words of different widths never reflow the heading
    <span aria-hidden="true" className="relative flex h-[1.15em] overflow-hidden">
      <span key={ROTATING[i]} className="hero-word inline-block text-[#E0170F]">
        {ROTATING[i]}
      </span>
    </span>
  )
}

function CountUp({ to, suffix, start }: { to: number; suffix: string; start: boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return }
    const t0 = performance.now(), dur = 1200
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // Safety net: hidden tabs pause rAF — make sure the final value lands
    const done = window.setTimeout(() => setV(to), dur + 200)
    return () => { cancelAnimationFrame(raf); window.clearTimeout(done) }
  }, [to, start])
  return <>{start ? v : to}{suffix}</>
}

export default function HeroSection() {
  const router = useRouter()
  const [tab, setTab] = useState<"search" | "filter">("search")
  const [q, setQ] = useState("")
  const [stream, setStream] = useState("")
  const [exam, setExam] = useState("")
  const deadline = useNextDeadline()

  const statsRef = useRef<HTMLDivElement>(null)
  const [statsOn, setStatsOn] = useState(false)
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { setStatsOn(true); io.disconnect() } })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (tab === "search") {
      router.push(q.trim() ? `/colleges?search=${encodeURIComponent(q.trim())}` : "/colleges")
    } else {
      const p = new URLSearchParams()
      if (stream) p.set("stream", stream)
      if (exam) p.set("exam", exam)
      router.push(`/colleges${p.toString() ? `?${p}` : ""}`)
    }
  }

  const field = "w-full rounded-xl border border-gray-200 bg-white py-3.5 text-sm text-gray-900 focus:border-[#024692] focus:outline-none focus:ring-2 focus:ring-[#024692]/20"

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden hero-mesh">
      {/* Background: dotted grid + brand glows */}
      <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-50" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-24 right-1/3 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:pb-14 lg:pt-12">
        {/* ── Left: copy + search ─────────────────────────────── */}
        <div>
          <p className="hero-in inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#012858] shadow-sm ring-1 ring-gray-200" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="insights-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Admissions 2026–27 · Pune
          </p>

          <h1 id="hero-heading" className="hero-in mt-5 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-[#012858] sm:text-5xl lg:text-[3.4rem]" style={{ "--i": 1 } as React.CSSProperties}>
            {/* Accessible name / SEO text is "Find the right college in Pune"; the stream word is decorative */}
            Find the right <RotatingWord />
            college in Pune, Noida or Delhi NCR
          </h1>
          <p className="hero-in mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg" style={{ "--i": 2 } as React.CSSProperties}>
            Compare colleges by fees, entrance exams and cut-offs, then talk it through with a counsellor. The first call is free.
          </p>

          {/* Search card — the one primary action */}
          <form onSubmit={submit} className="hero-in mt-7 rounded-2xl bg-white p-2.5 shadow-xl shadow-blue-950/10 ring-1 ring-gray-200" style={{ "--i": 3 } as React.CSSProperties} aria-label="Find colleges">
            <div role="tablist" aria-label="Search mode" className="flex gap-1 p-1">
              {([["search", "Search", Search], ["filter", "By stream & exam", SlidersHorizontal]] as const).map(([id, label, Icon]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${tab === id ? "bg-[#012858] text-white" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" /> {label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 p-1 sm:flex-row">
              {tab === "search" ? (
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                  <label htmlFor="hero-q" className="sr-only">Search colleges, courses or exams</label>
                  <input id="hero-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder='Try "MBA colleges with hostel" or "COEP"' className={`${field} pl-10 pr-3`} />
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <label htmlFor="hero-stream" className="sr-only">Course or stream</label>
                    <select id="hero-stream" value={stream} onChange={(e) => setStream(e.target.value)} className={`${field} px-3`}>
                      <option value="">Any stream</option>
                      {STREAMS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="hero-exam" className="sr-only">Entrance exam</label>
                    <select id="hero-exam" value={exam} onChange={(e) => setExam(e.target.value)} className={`${field} px-3`}>
                      <option value="">Any exam</option>
                      {EXAMS.map((x) => <option key={x}>{x}</option>)}
                    </select>
                  </div>
                </>
              )}
              <button type="submit" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-all hover:bg-[#C90D11]">
                Find colleges <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </form>

          {/* Popular + secondary actions */}
          <div className="hero-in mt-4 flex flex-wrap items-center gap-2" style={{ "--i": 4 } as React.CSSProperties}>
            <span className="text-xs font-semibold text-gray-600">Popular:</span>
            {POPULAR.map((c) => (
              <Link key={c.label} href={c.href} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-700 ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:text-[#012858] hover:ring-[#012858]">
                {c.label}
              </Link>
            ))}
          </div>

          <div className="hero-in mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold" style={{ "--i": 5 } as React.CSSProperties}>
            <a href={`https://wa.me/917753831118?text=${encodeURIComponent("Hi! I need a free college shortlist for Pune admissions. Can you help?")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#15803D] hover:underline">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Free shortlist on WhatsApp
            </a>
            <Link href="/ai-finder" className="inline-flex items-center gap-1.5 text-[#012858] hover:underline">
              <Sparkles className="h-4 w-4 text-[#E0170F]" aria-hidden="true" /> Try the AI finder
            </Link>
            {deadline && (
              <Link href={deadline.href} className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 ring-1 ring-orange-200 hover:bg-orange-100">
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                {deadline.text} {deadline.days === 0 ? "today" : `in ${deadline.days} day${deadline.days === 1 ? "" : "s"}`}
              </Link>
            )}
          </div>
        </div>

        {/* ── Right: visual with live info cards (desktop) ─────────── */}
        <div className="relative hidden lg:block">
          <div className="hero-in hero-frame relative overflow-hidden rounded-[2.25rem] shadow-2xl shadow-blue-950/20 ring-1 ring-black/5" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="relative aspect-[4/4.4]">
              <Image src="/hero-students.webp" alt="Students on a Pune college campus" fill priority quality={85} sizes="(min-width: 1024px) 45vw, 0px" className="object-cover object-[60%_center]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#011B40]/55 via-transparent to-transparent" />
            </div>
          </div>

          {/* Floating cards — real, linked information */}
          {deadline && (
            <Link href={deadline.href} className="hero-pop absolute -left-8 top-10 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 pr-5 shadow-xl ring-1 ring-gray-200 backdrop-blur transition-transform hover:-translate-y-1" style={{ "--i": 5 } as React.CSSProperties}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0170F] text-white"><CalendarClock className="h-5 w-5" aria-hidden="true" /></span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Next deadline</span>
                <span className="block text-sm font-bold text-gray-900">{deadline.text}</span>
                <span className="block text-xs font-semibold text-orange-700">{deadline.days === 0 ? "Today" : `in ${deadline.days} days`}</span>
              </span>
            </Link>
          )}
          <Link href="/compare?c1=coep-college-of-engineering-pune&c2=pict-pune-institute-of-computer-technology" className="hero-pop absolute -right-6 top-1/2 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 pr-5 shadow-xl ring-1 ring-gray-200 backdrop-blur transition-transform hover:-translate-y-1" style={{ "--i": 6 } as React.CSSProperties}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#012858] text-white"><GitCompare className="h-5 w-5" aria-hidden="true" /></span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Compare side by side</span>
              <span className="block text-sm font-bold text-gray-900">COEP vs PICT</span>
            </span>
          </Link>
          <Link href="/editorial-policy" className="hero-pop absolute -left-4 bottom-8 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 pr-5 shadow-xl ring-1 ring-gray-200 backdrop-blur transition-transform hover:-translate-y-1" style={{ "--i": 7 } as React.CSSProperties}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white"><BadgeCheck className="h-5 w-5" aria-hidden="true" /></span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Every fact sourced</span>
              <span className="block text-sm font-bold text-gray-900">Official exam &amp; college sites</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── Proof strip ─────────────────────────────────────── */}
      <div ref={statsRef} className="relative border-y border-gray-100 bg-white/80 backdrop-blur">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:grid-cols-5 lg:px-8">
          {STATS.map(({ icon: Icon, value, suffix, text, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#E0170F]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <dt className="sr-only">{label}</dt>
                <dd className="text-lg font-extrabold leading-none text-[#012858]">{text ?? <CountUp to={value} suffix={suffix} start={statsOn} />}</dd>
                <dd className="mt-1 text-xs text-gray-600" aria-hidden="true">{label}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
