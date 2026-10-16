"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowRight, BadgeCheck, Briefcase, Building2, CalendarClock, Castle, ChevronLeft, ChevronRight, Factory, Landmark,
  Library, Mountain, Search, ShieldCheck, Sparkles, TowerControl,
} from "lucide-react"
import { exams } from "@/data/exams"
import { examTimeline } from "@/lib/examTimeline"

// Homepage hero: campus photo, one big search bar, popular links, and a row of city shortcuts.
// Search sends the text to /colleges. City circles link to the city pages we have sourced data for.
// The photo has a slow zoom only (no scrolling, no fade); it is off for reduced motion (globals.css).

const ROTATING = ["Engineering", "MBA", "Medical", "Law", "Design", "Commerce"]

const POPULAR = [
  { label: "Psychometric test", href: "/psychometric-test", usp: true },
  { label: "Career quiz", href: "/career-quiz", usp: true },
  { label: "My admission plan", href: "/my-admission-plan", usp: true },
  { label: "MBA in Pune", href: "/mba-in-pune" },
  { label: "CAT colleges", href: "/mba-colleges-in-pune-accepting-cat" },
  { label: "B.Tech", href: "/colleges?stream=Engineering" },
]

const CITIES = [
  { label: "Pune", href: "/colleges-in-pune", icon: Castle },
  { label: "Delhi NCR", href: "/mba-colleges-in-delhi-ncr", icon: Landmark },
  { label: "Noida", href: "/colleges-in-noida", icon: Building2 },
  { label: "Greater Noida", href: "/colleges-in-greater-noida", icon: TowerControl },
  { label: "Gurugram", href: "/mba-colleges-in-gurugram", icon: Briefcase },
  { label: "Ghaziabad", href: "/mba-colleges-in-ghaziabad", icon: Factory },
  { label: "Lucknow", href: "/mba-colleges-in-lucknow", icon: Library },
  { label: "Dehradun", href: "/mba-colleges-in-dehradun", icon: Mountain },
]

export interface HeroProof { programmes: number; exams: number; cutoffs: number; checked: string }

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
    // Width is reserved by the longest word, so the heading never reflows
    <span aria-hidden="true" className="relative inline-block overflow-hidden align-bottom">
      <span className="invisible">Engineering</span>
      <span key={ROTATING[i]} className="hero-word absolute left-0 top-0 text-[#FF5A47]">{ROTATING[i]}</span>
    </span>
  )
}

export default function HeroSection({ proof }: { proof: HeroProof }) {
  const router = useRouter()
  const [q, setQ] = useState("")
  const deadline = useNextDeadline()
  const rail = useRef<HTMLUListElement>(null)
  const [overflow, setOverflow] = useState(false)
  useEffect(() => {
    const el = rail.current
    if (!el) return
    const check = () => setOverflow(el.scrollWidth > el.clientWidth + 4)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(q.trim() ? `/colleges?search=${encodeURIComponent(q.trim())}` : "/colleges")
  }
  const slide = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * Math.max(240, rail.current.clientWidth * 0.7), behavior: "smooth" })

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-[#011B40]">
      {/* Campus photo under a navy wash that is strongest on the left, where the text sits. Decorative, so empty alt. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image src="/hero/campus-sunset.webp" alt="" fill priority quality={82} sizes="100vw" className="hero-slide-img object-cover object-[62%_center]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#011B40]/92 via-[#011B40]/62 to-[#011B40]/10 max-lg:from-[#011B40]/88 max-lg:via-[#011B40]/72 max-lg:to-[#011B40]/60" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#011B40]/85 to-transparent" />

      <div className="relative mx-auto max-w-[calc(var(--container-7xl)+6rem)] px-5 pb-7 pt-8 sm:px-8 lg:px-12 lg:pb-8 lg:pt-11">
        <div className="min-w-0 lg:max-w-[58rem]">
          <p className="hero-in inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="insights-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Admissions 2026–27 · Pune, Noida, Delhi NCR
          </p>

          <h1 id="hero-heading" className="hero-in mt-5 font-[family-name:var(--font-fraunces)] text-[2.1rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[2.7rem] lg:text-[3.3rem]" style={{ "--i": 1 } as React.CSSProperties}>
            {/* Accessible name / SEO text is "Find the right college in Pune, Noida or Delhi NCR"; the stream word is decorative */}
            Find the right <RotatingWord /> college
            <span className="block">in Pune, Noida or Delhi NCR</span>
          </h1>
          <p className="hero-in mt-4 max-w-2xl text-sm text-blue-50 sm:text-lg" style={{ "--i": 2 } as React.CSSProperties}>
            Compare colleges by fees, entrance exams and cut-offs, then talk it through with a counsellor. The first call is free.
          </p>

          {/* One big search bar */}
          <form onSubmit={submit} className="hero-in mt-5 flex items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-black/30 sm:p-2.5" style={{ "--i": 3 } as React.CSSProperties} aria-label="Search colleges">
            <label htmlFor="hero-q" className="sr-only">Search colleges, courses or exams</label>
            <Search className="ml-2 h-5 w-5 shrink-0 text-gray-500 sm:ml-3" aria-hidden="true" />
            <input id="hero-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder='Search colleges, exams, courses: try "MBA with hostel" or "COEP"' className="min-h-12 min-w-0 flex-1 bg-transparent px-1 text-sm text-gray-900 outline-none placeholder:text-gray-500 sm:text-base" />
            <button type="submit" className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#E0170F] px-4 text-sm font-bold text-white transition-colors hover:bg-[#C90D11] sm:px-8">
              <span>Search</span>
              <ArrowRight className="hidden h-4 w-4 transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true" />
            </button>
          </form>

          {/* Popular: the three tools only CampusLelo has come first */}
          <div className="hero-in mt-3 flex flex-wrap items-center gap-2" style={{ "--i": 4 } as React.CSSProperties}>
            <span className="text-sm font-semibold text-blue-100">Popular:</span>
            {POPULAR.map((p) => (
              <Link key={p.label} href={p.href} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium text-white ring-1 transition-colors ${p.usp ? "bg-[#E0170F]/85 ring-[#FF8A73]/60 hover:bg-[#E0170F]" : "bg-white/5 ring-white/40 hover:bg-white hover:text-[#012858]"}`}>
                {p.usp && <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
                {p.label}
              </Link>
            ))}
          </div>

          {/* What we have checked, in one line, with the live exam countdown */}
          <p className="hero-in mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-blue-100 sm:text-sm" style={{ "--i": 5 } as React.CSSProperties}>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />{proof.programmes} MBA programmes and {proof.exams} exam guides checked against official pages (latest check {proof.checked})</span>
            <Link href="/editorial-policy" className="inline-flex items-center gap-1 font-bold text-white underline underline-offset-2"><BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />How we verify</Link>
            {deadline && (
              <Link href={deadline.href} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-bold text-orange-200 ring-1 ring-white/20 hover:bg-white/15">
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                {deadline.text} {deadline.days === 0 ? "today" : `in ${deadline.days} days`}
              </Link>
            )}
          </p>
        </div>

        {/* City shortcuts: a row of circles with arrows */}
        <div className="hero-in relative mt-5 border-t border-white/15 pt-4" style={{ "--i": 6 } as React.CSSProperties}>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-100">Browse by city</p>
          <button type="button" onClick={() => slide(-1)} aria-label="Previous cities" className={`absolute -left-1 top-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white text-[#012858] shadow-lg transition-colors hover:bg-[#FFE9A8] ${overflow ? "hidden lg:flex" : "hidden"}`}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <ul ref={rail} className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:gap-8 sm:px-8 lg:mx-0 lg:justify-between lg:px-0 [&::-webkit-scrollbar]:hidden" aria-label="Browse colleges by city">
            {CITIES.map(({ label, href, icon: Icon }) => (
              <li key={label} className="shrink-0 snap-start">
                <Link href={href} className="group flex w-20 flex-col items-center gap-2 text-center sm:w-24">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/50 backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white group-hover:text-[#012858] sm:h-[4.5rem] sm:w-[4.5rem]">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-tight text-white">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => slide(1)} aria-label="Next cities" className={`absolute -right-1 top-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white text-[#012858] shadow-lg transition-colors hover:bg-[#FFE9A8] ${overflow ? "hidden lg:flex" : "hidden"}`}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
