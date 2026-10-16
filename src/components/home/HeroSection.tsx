"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowRight, BadgeCheck, Brain, Briefcase, Building2, CalendarClock, ClipboardList, Compass, Cpu, FileText,
  GraduationCap, Palette, Pill, Scale, Search, ShieldCheck, Sparkles, Stethoscope, TrendingUp,
} from "lucide-react"
import { exams } from "@/data/exams"
import { examTimeline } from "@/lib/examTimeline"

// Homepage hero, portal style: one search row with filters, stream shortcuts, and a slim live panel
// (next deadline plus what we have checked). Roughly half the height of the earlier hero.
// Animations run once on load, plus a gentle rotating word; all are off for reduced motion (globals.css).

const ROTATING = ["Engineering", "MBA", "Medical", "Law", "Design", "Commerce"]
const STREAMS = ["Engineering", "MBA", "Medical", "Law", "Design", "Pharmacy", "Arts", "Commerce", "BBA", "BCA", "MCA"]
const EXAMS = ["MHT-CET", "JEE Main", "CAT", "NEET", "CLAT", "SNAP", "CMAT", "XAT", "MAT"]

const STREAM_TILES = [
  { label: "Engineering", icon: Cpu, href: "/colleges?stream=Engineering", tint: "bg-blue-50 text-[#024692]" },
  { label: "MBA", icon: Briefcase, href: "/mba-in-pune", tint: "bg-orange-50 text-orange-700" },
  { label: "Medical", icon: Stethoscope, href: "/colleges?stream=Medical", tint: "bg-red-50 text-[#C90D11]" },
  { label: "Law", icon: Scale, href: "/colleges?stream=Law", tint: "bg-violet-50 text-violet-700" },
  { label: "Design", icon: Palette, href: "/design-colleges-pune", tint: "bg-pink-50 text-pink-700" },
  { label: "Pharmacy", icon: Pill, href: "/colleges?stream=Pharmacy", tint: "bg-emerald-50 text-emerald-700" },
  { label: "Commerce", icon: TrendingUp, href: "/colleges?stream=Commerce", tint: "bg-amber-50 text-amber-800" },
  { label: "Arts", icon: GraduationCap, href: "/colleges?stream=Arts", tint: "bg-teal-50 text-teal-700" },
]

const SIGNATURE = [
  { label: "Psychometric test", icon: Brain, href: "/psychometric-test" },
  { label: "Career quiz", icon: Compass, href: "/career-quiz" },
  { label: "Admission plan", icon: ClipboardList, href: "/my-admission-plan" },
]

export interface HeroProof { programmes: number; exams: number; cutoffs: number; checked: string }

function buildStats(p: HeroProof) {
  return [
    { icon: Building2, value: p.programmes, label: "MBA programmes checked" },
    { icon: FileText, value: p.exams, label: "Exam guides with sources" },
    { icon: GraduationCap, value: p.cutoffs, label: "Cut-off sets published" },
  ]
}

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
    // The word is drawn by CSS from data-w, so it is not text in the HTML: the H1 reads
    // "Find the right college in Pune, Noida or Delhi NCR" to crawlers and screen readers.
    // The box reserves the width of the longest word, so the heading never reflows.
    <span aria-hidden="true" className="rot-word">
      <span key={ROTATING[i]} data-w={ROTATING[i]} className="hero-word rot-word-inner" />
    </span>
  )
}

function CountUp({ to, start }: { to: number; start: boolean }) {
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
    const done = window.setTimeout(() => setV(to), dur + 200)
    return () => { cancelAnimationFrame(raf); window.clearTimeout(done) }
  }, [to, start])
  return <>{start ? v : to}</>
}

export default function HeroSection({ proof }: { proof: HeroProof }) {
  const STATS = useMemo(() => buildStats(proof), [proof])
  const router = useRouter()
  const [q, setQ] = useState("")
  const [stream, setStream] = useState("")
  const [exam, setExam] = useState("")
  const deadline = useNextDeadline()

  const panelRef = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { setOn(true); io.disconnect() } })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (q.trim()) p.set("search", q.trim())
    if (stream) p.set("stream", stream)
    if (exam) p.set("exam", exam)
    router.push(`/colleges${p.toString() ? `?${p}` : ""}`)
  }

  const sel = "min-h-12 w-full min-w-0 rounded-xl border border-gray-200 bg-white px-2.5 text-sm text-gray-900 focus:border-[#024692] focus:outline-none focus:ring-2 focus:ring-[#024692]/20"

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-[#DCEBFA]">
      {/* Campus photo behind the hero. A white wash on the left keeps the text readable. Decorative, so empty alt.
          Slow zoom only (no scrolling, no fade); off for reduced motion. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image src="/hero/campus-sunset.webp" alt="" fill priority quality={85} sizes="100vw" className="hero-slide-img object-cover object-[60%_center]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/94 via-white/72 to-white/8 max-lg:from-white/92 max-lg:via-white/82 max-lg:to-white/72" />

      <div className="relative mx-auto grid max-w-[calc(var(--container-7xl)+6rem)] grid-cols-1 gap-4 px-5 py-7 sm:px-8 lg:gap-5 lg:px-12 lg:py-9">
        {/* Left: headline, one search row, stream shortcuts */}
        <div className="min-w-0">
          <p className="hero-in inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#012858] shadow-sm ring-1 ring-gray-200" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="insights-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Admissions 2026–27 · Pune, Noida, Delhi NCR
          </p>

          <h1 id="hero-heading" className="hero-in mt-3 font-[family-name:var(--font-fraunces)] text-[1.7rem] font-bold leading-tight tracking-tight text-[#012858] sm:text-[2.2rem]" style={{ "--i": 1 } as React.CSSProperties}>
            {/* Accessible name / SEO text is "Find the right college in Pune, Noida or Delhi NCR"; the stream word is decorative */}
            Find the right <RotatingWord />college in Pune, Noida or Delhi NCR
          </h1>
          <p className="hero-in mt-2 text-sm text-gray-600 sm:text-base" style={{ "--i": 2 } as React.CSSProperties}>
            Compare by fees, entrance exams and cut-offs. The first counselling call is free.
          </p>

          <form onSubmit={submit} className="hero-in mt-4 rounded-2xl bg-white p-2.5 shadow-lg shadow-blue-950/10 ring-1 ring-gray-200" style={{ "--i": 3 } as React.CSSProperties} aria-label="Find colleges">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-[1.1fr_1fr_1fr_auto]">
              <div className="relative col-span-2 md:col-span-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <label htmlFor="hero-q" className="sr-only">Search colleges, courses or exams</label>
                <input id="hero-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder='Try "MBA with hostel" or "COEP"' className={`${sel} pl-9`} />
              </div>
              <div>
                <label htmlFor="hero-stream" className="sr-only">Course or stream</label>
                <select id="hero-stream" value={stream} onChange={(e) => setStream(e.target.value)} className={sel}>
                  <option value="">Any stream</option>
                  {STREAMS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="hero-exam" className="sr-only">Entrance exam</label>
                <select id="hero-exam" value={exam} onChange={(e) => setExam(e.target.value)} className={sel}>
                  <option value="">Any exam</option>
                  {EXAMS.map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
              <button type="submit" className="group col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E0170F] px-6 text-sm font-bold text-white transition-colors hover:bg-[#C90D11] md:col-span-1">
                Find colleges <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </div>
          </form>

          {/* Stream shortcuts: a single scrolling row */}
          <ul className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden" aria-label="Browse by stream">
            {STREAM_TILES.map(({ label, icon: Icon, href, tint }, i) => (
              <li key={label} className="hero-pop shrink-0" style={{ "--i": i } as React.CSSProperties}>
                <Link href={href} className="group flex min-h-12 items-center gap-2.5 rounded-full bg-white py-1 pl-1.5 pr-4 text-sm font-semibold text-[#012858] ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:ring-[#012858]">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full ${tint} transition-transform group-hover:scale-110`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: signature tools and live proof */}
        <div ref={panelRef} className="hero-in rounded-2xl bg-[#011B40] p-5 text-white shadow-xl shadow-blue-950/20" style={{ "--i": 3 } as React.CSSProperties}>
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-100"><Sparkles className="h-3.5 w-3.5 text-[#F4604A]" aria-hidden="true" /> Only on CampusLelo</p>
            {deadline && (
              <Link href={deadline.href} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-orange-200 hover:bg-white/15">
                <CalendarClock className="h-3 w-3" aria-hidden="true" />
                {deadline.text} {deadline.days === 0 ? "today" : `in ${deadline.days}d`}
              </Link>
            )}
          </div>

          <ul className="mt-4 grid grid-cols-3 gap-2.5">
            {SIGNATURE.map(({ label, icon: Icon, href }, i) => (
              <li key={label} className="hero-pop" style={{ "--i": i + 3 } as React.CSSProperties}>
                <Link href={href} className="group flex h-full flex-col items-center gap-1.5 rounded-xl bg-white/10 px-2 py-5 text-center text-xs font-semibold leading-tight ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#012858]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E0170F] text-white"><Icon className="h-4 w-4" aria-hidden="true" /></span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <dl className="mt-4 hidden grid-cols-3 gap-2 border-t border-white/10 pt-4 sm:grid">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <dt className="sr-only">{label}</dt>
                <dd className="flex items-center justify-center gap-1 text-lg font-extrabold leading-none"><Icon className="h-3.5 w-3.5 text-blue-200" aria-hidden="true" /><CountUp to={value} start={on} /></dd>
                <dd className="mt-1 text-[10px] leading-tight text-blue-200" aria-hidden="true">{label}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 hidden items-center justify-center gap-1.5 text-[11px] text-blue-100 sm:flex">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" /> Sources checked {proof.checked}
            <Link href="/editorial-policy" className="inline-flex items-center gap-1 font-bold text-white underline underline-offset-2"><BadgeCheck className="h-3 w-3" aria-hidden="true" />How we verify</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
