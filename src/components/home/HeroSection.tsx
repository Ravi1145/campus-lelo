"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowRight, Briefcase, Cpu, GraduationCap, Palette, Pill, Scale, Search, Stethoscope, TrendingUp,
} from "lucide-react"

// Homepage hero, portal style: one search row with filters, stream shortcuts.
// Roughly half the height of the earlier hero.
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

export interface HeroProof { programmes: number; exams: number; cutoffs: number; checked: string }

// Typewriter for the rest of the heading. The sentence is real text in the HTML, split into letters that are only
// faded in, so crawlers and screen readers get it at once and the layout never jumps while it types. Runs once; with reduced motion the sentence is simply shown.
function TypeTail({ text }: { text: string }) {
  const [n, setN] = useState<number | null>(0) // letters start hidden; null = show everything (reduced motion)
  const [caret, setCaret] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(null); return }
    let i = 0
    let timer = 0
    setCaret(true)
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        i += 1
        setN(i)
        if (i >= text.length) {
          window.clearInterval(timer)
          window.setTimeout(() => setCaret(false), 2400)
        }
      }, 55)
    }, 700)
    return () => { window.clearTimeout(start); window.clearInterval(timer) }
  }, [text])

  let idx = 0
  return (
    <>
      <span>
        {text.split(" ").map((word, w) => (
          <span key={w}>
            {w > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((ch) => {
                const k = idx++
                const shown = n === null || k < n
                const isCaret = caret && n !== null && k === Math.min(n, text.length) - 1
                return <span key={k} className={`tw-ch${shown ? " tw-on" : ""}${isCaret ? " tw-caret" : ""}`}>{ch}</span>
              })}
            </span>
          </span>
        ))}
      </span>
    </>
  )
}

function RotatingWord() {
  const [i, setI] = useState(0)
  const [widths, setWidths] = useState<number[] | null>(null)
  const box = useRef<HTMLSpanElement>(null)

  // Measure each word with the heading's own font, so the box is exactly as wide as the word on show and the
  // rest of the sentence slides to meet it. The measuring uses a canvas, so no extra text enters the HTML.
  useEffect(() => {
    const measure = () => {
      const el = box.current
      const ctx = document.createElement("canvas").getContext("2d")
      if (!el || !ctx) return
      const cs = getComputedStyle(el)
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      setWidths(ROTATING.map((w) => Math.ceil(ctx.measureText(w).width) + 6))
    }
    measure()
    document.fonts?.ready.then(measure)
  }, [])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setI((x) => (x + 1) % ROTATING.length), 2400)
    return () => window.clearInterval(id)
  }, [])

  return (
    // The word is drawn by CSS from data-w, so it is not text in the HTML: the H1 reads
    // "Find the right college in Pune, Noida or Delhi NCR" to crawlers and screen readers.
    // Before the widths are measured (server render, first paint) the box falls back to the longest word.
    <span ref={box} aria-hidden="true" className="rot-word" style={widths ? { width: widths[i], minWidth: 0 } : undefined}>
      <span key={ROTATING[i]} data-w={ROTATING[i]} className="hero-word rot-word-inner" />
      <span key={`u-${ROTATING[i]}`} className="rot-underline" />
    </span>
  )
}

export default function HeroSection(_props: { proof?: HeroProof } = {}) {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [stream, setStream] = useState("")
  const [exam, setExam] = useState("")


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
    <section aria-labelledby="hero-heading" className="relative flex min-h-[705px] items-center overflow-hidden bg-[#DCEBFA] lg:min-h-[480px]">
      {/* Campus photo behind the hero. A white wash on the left keeps the text readable. Decorative, so empty alt.
          Slow zoom only (no scrolling, no fade); off for reduced motion. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <Image src="/hero/campus-sunset.webp" alt="" fill priority quality={85} sizes="100vw" className="hero-slide-img object-cover object-[60%_center]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/94 via-white/72 to-white/8 max-lg:from-white/92 max-lg:via-white/82 max-lg:to-white/72" />

      <div className="relative mx-auto grid w-full max-w-[calc(var(--container-7xl)+6rem)] grid-cols-1 gap-4 px-5 py-7 sm:px-8 lg:gap-5 lg:px-12 lg:py-9">
        {/* Left: headline, one search row, stream shortcuts */}
        <div className="min-w-0">
          <p className="hero-in inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#012858] shadow-sm ring-1 ring-gray-200" style={{ "--i": 0 } as React.CSSProperties}>
            Admissions 2026–27 · Pune, Noida, Delhi NCR
          </p>

          <h1 id="hero-heading" className="hero-in mt-3 font-[family-name:var(--font-fraunces)] text-[1.7rem] font-bold leading-tight tracking-tight text-[#012858] sm:text-[2.2rem]" style={{ "--i": 1 } as React.CSSProperties}>
            {/* Accessible name / SEO text is "Find the right college in Pune, Noida or Delhi NCR"; the stream word is decorative */}
            Find the right <RotatingWord /><TypeTail text="college in Pune, Noida or Delhi NCR" />
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

      </div>
    </section>
  )
}
