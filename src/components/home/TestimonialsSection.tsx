import Link from "next/link"
import { ArrowRight, BadgeCheck, MessageCircle, Phone, Sparkles, Video } from "lucide-react"
import Reveal from "./Reveal"
import { VIDEO_PRICE_INR } from "@/data/counselling"

// "Why CampusLelo": the tools, and the counselling offer. Every row describes a
// feature that exists on the site and links to it; no quotes, ratings or student
// counts. The chat bubbles are labelled as an example, not a real student.

const NAVY = "#012858"
const RED = "#E0170F"

// Small drawings, one per tool. They animate once when the section scrolls into view.
function CompareArt() {
  return (
    <svg viewBox="0 0 72 72" className="h-full w-full" aria-hidden="true">
      <line x1="36" y1="8" x2="36" y2="64" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
      {[[10, 34, 0], [20, 22, 1], [30, 40, 2]].map(([x, h, d]) => (
        <rect key={x} className="sg-bar" style={{ "--d": d } as React.CSSProperties} x={x} y={64 - h} width="7" height={h} rx="2" fill={NAVY} />
      ))}
      {[[42, 26, 3], [52, 44, 4], [62, 32, 5]].map(([x, h, d]) => (
        <rect key={x} className="sg-bar" style={{ "--d": d } as React.CSSProperties} x={x} y={64 - h} width="7" height={h} rx="2" fill={RED} />
      ))}
    </svg>
  )
}

function FinderArt() {
  return (
    <svg viewBox="0 0 72 72" className="h-full w-full" aria-hidden="true">
      {[16, 36, 56].map((y) => <circle key={y} cx="12" cy={y} r="4" fill="#CBD5E1" />)}
      {[16, 36, 56].map((y) => (
        <path key={y} className="sg-draw" pathLength={1} d={`M16 ${y} C 34 ${y}, 38 36, 54 36`} fill="none" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" />
      ))}
      <path className="sg-star" d="M58 24 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill={RED} />
    </svg>
  )
}

function ExamArt() {
  return (
    <svg viewBox="0 0 72 72" className="h-full w-full" aria-hidden="true">
      <rect x="8" y="14" width="56" height="50" rx="7" fill="#fff" stroke={NAVY} strokeWidth="2" />
      <rect x="8" y="14" width="56" height="13" rx="7" fill={NAVY} />
      <line x1="22" y1="8" x2="22" y2="20" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="8" x2="50" y2="20" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2, 3].map((c) => [0, 1].map((r) => (
        <circle key={`${c}${r}`} cx={20 + c * 11} cy={38 + r * 12} r="2.2" fill="#CBD5E1" />
      )))}
      <circle className="sg-pop" cx="42" cy="50" r="6" fill="none" stroke={RED} strokeWidth="2.2" />
    </svg>
  )
}

function CutoffArt() {
  return (
    <svg viewBox="0 0 72 72" className="h-full w-full" aria-hidden="true">
      <line x1="8" y1="62" x2="66" y2="62" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="8" y1="10" x2="8" y2="62" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="8" y1="30" x2="66" y2="30" stroke={RED} strokeWidth="1.2" strokeDasharray="3 3" />
      <path className="sg-draw" pathLength={1} d="M10 54 L24 44 L36 48 L50 28 L64 18" fill="none" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="sg-pop" cx="64" cy="18" r="4" fill={RED} />
    </svg>
  )
}

// Small mock-ups on the right of each row. Labels only, no figures.
function CompareMini() {
  return (
    <div className="hidden w-32 shrink-0 rounded-lg bg-white p-1.5 ring-1 ring-gray-200 md:block" aria-hidden="true">
      <div className="mb-1.5 grid grid-cols-[3.2rem_1fr_1fr] gap-1.5"><span /><span className="h-5 rounded bg-blue-100" /><span className="h-5 rounded bg-orange-100" /></div>
      {["Fees", "Exams", "NAAC", "Hostel"].map((r) => (
        <div key={r} className="grid grid-cols-[3.2rem_1fr_1fr] items-center gap-1.5 py-1 text-[9px] font-semibold text-gray-500"><span>{r}</span><span className="h-1 rounded-full bg-gray-200" /><span className="h-1 rounded-full bg-gray-200" /></div>
      ))}
    </div>
  )
}

function FinderMini() {
  return (
    <div className="hidden w-32 shrink-0 flex-wrap justify-end gap-1 md:flex" aria-hidden="true">
      <span className="hw-in inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#012858] ring-1 ring-gray-200" style={{ "--r": 0 } as React.CSSProperties}><Sparkles className="h-3 w-3 text-[#E0170F]" /> Your profile</span>
      {["MBA", "Pune", "Your percentile", "Your budget"].map((t, i) => (
        <span key={t} className="hw-in rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-600 ring-1 ring-gray-200" style={{ "--r": i + 1 } as React.CSSProperties}>{t}</span>
      ))}
    </div>
  )
}

function ExamMini() {
  return (
    <div className="hidden w-28 shrink-0 md:block" aria-hidden="true">
      <p className="us-note -rotate-3 rounded-sm bg-[#FFF1C2] px-2 py-1 font-[family-name:var(--font-fraunces)] text-[11px] italic leading-tight text-[#4a3b00] shadow-md">Stay updated.<br />Never miss important dates!</p>
    </div>
  )
}

function CutoffMini() {
  return (
    <div className="hidden w-32 shrink-0 items-center gap-1 md:flex" aria-hidden="true">
      <svg viewBox="0 0 90 50" className="h-9 w-16" fill="none">
        <path className="sg-draw" pathLength={1} d="M4 40 L22 30 L38 34 L58 16 L84 8" stroke="#012858" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="sg-pop" cx="84" cy="8" r="3.5" fill="#E0170F" />
      </svg>
      <span className="rounded-md bg-white px-1.5 py-1 text-[9px] font-bold leading-tight text-[#012858] shadow ring-1 ring-gray-200">Past-year<br />cut-off trends</span>
    </div>
  )
}

const TOOLS = [
  { art: CompareArt, mini: CompareMini, title: "Compare side by side", desc: "Put two colleges next to each other and compare fees, accepted exams and NAAC grade.", href: "/compare", cta: "Compare colleges" },
  { art: FinderArt, mini: FinderMini, title: "AI college finder", desc: "Answer four quick questions about your stream, score and budget and get a matched shortlist.", href: "/ai-finder", cta: "Try the AI finder" },
  { art: ExamArt, mini: ExamMini, title: "Exam guides with dates", desc: "CAT, XAT, SNAP, NMAT, MAT and more: dates, pattern and eligibility, linked to the official source.", href: "/exams", cta: "See exam guides" },
  { art: CutoffArt, mini: CutoffMini, title: "Published cut-offs", desc: "Only cut-offs that a college or exam body has published, each with its source and the date we checked.", href: "/mba-cutoff-delhi-ncr", cta: "MBA cut-offs" },
]

export default function TestimonialsSection() {
  return (
    <section aria-labelledby="why-heading" className="relative overflow-hidden section-ivory px-4 py-7 sm:px-6 sm:py-8">
      <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-50" />
      <Reveal className="relative mx-auto max-w-7xl">
        <div className="reveal-item flex items-start justify-between gap-4" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="max-w-2xl">
            <p className="inline-block border-b-2 border-[#E0170F] pb-0.5 text-xs font-bold uppercase tracking-widest text-[#C90D11]">Only at CampusLelo</p>
            <h2 id="why-heading" className="mt-2 font-[family-name:var(--font-fraunces)] text-xl font-bold leading-tight text-[#012858] sm:text-2xl">Tools for comparing colleges, and a person to ask</h2>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">Free for students. Use the tools <span className="border-b-2 border-[#F4604A]">on your own</span>, or ask a counsellor when you get stuck.</p>
          </div>
          <p aria-hidden="true" className="hidden -rotate-6 text-right font-[family-name:var(--font-fraunces)] text-sm italic leading-tight text-[#012858] md:block">Same dreams.<br />Smarter choices.</p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3.5 lg:grid-cols-12">
          {/* Counselling: a conversation, then the offer */}
          <div className="reveal-item relative overflow-hidden rounded-xl bg-[#011B40] p-3.5 text-white lg:col-span-5 lg:self-start" style={{ "--i": 1 } as React.CSSProperties}>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-100"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask our counsellor <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold normal-case tracking-normal text-blue-200">Example chat</span></p>
            <div className="mt-2 space-y-1.5" aria-hidden="true">
              <div className="bubble bubble-left max-w-[88%] rounded-xl rounded-bl-md bg-white/15 px-2.5 py-1.5 text-xs text-blue-50" style={{ "--b": 0 } as React.CSSProperties}>
                I have a CMAT score and no CAT. What can I apply to?
              </div>
              <div className="bubble bubble-right flex items-end gap-2" style={{ "--b": 1 } as React.CSSProperties}>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E0170F] text-[9px] font-bold">CL</span>
                <span className="rounded-xl rounded-bl-md bg-white/10 px-2.5 py-1.5 text-xs text-white">Let&apos;s check which colleges accept CMAT, then shortlist by your budget and city.</span>
              </div>
              <div className="bubble bubble-left inline-flex items-center gap-1 rounded-xl rounded-bl-md bg-white/10 px-2.5 py-1.5" style={{ "--b": 2 } as React.CSSProperties}>
                <span className="typing-dot" /><span className="typing-dot" style={{ animationDelay: "0.15s" }} /><span className="typing-dot" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>

            <h3 className="mt-3 font-[family-name:var(--font-fraunces)] text-base font-bold leading-tight">Get guidance that fits you</h3>
            <p className="mt-1 text-xs leading-snug text-blue-100">Not sure which colleges you can get into? Start with a free call, or book an expert video session for CAP rounds and a personal shortlist.</p>

            <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
              <Link href="/counselling#plans" className="group flex items-start gap-2 rounded-lg bg-white/5 p-2 ring-1 ring-white/15 transition-colors hover:bg-white/10">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/15"><Phone className="h-3 w-3" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1"><span className="block text-xs font-bold">Free call</span><span className="block text-[10px] leading-snug text-blue-100">Scholarships, alumni, forms and deadlines.</span></span>
              </Link>
              <Link href="/counselling#plans" className="group flex items-start gap-2 rounded-lg bg-white/5 p-2 ring-1 ring-white/15 transition-colors hover:bg-white/10">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#E0170F]"><Video className="h-3 w-3" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1"><span className="block text-xs font-bold">Video session · ₹{VIDEO_PRICE_INR}</span><span className="block text-[10px] leading-snug text-blue-100">CAP rounds, career choice, a personal shortlist.</span></span>
              </Link>
            </div>

            <Link href="/counselling#plans" className="group mt-2.5 flex min-h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#E0170F] px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#C90D11]">
              Talk to an expert <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          {/* The tools: one numbered row each */}
          <ol className="grid content-start gap-2 lg:col-span-7">
            {TOOLS.map(({ art: Art, mini: Mini, title, desc, href, cta }, i) => (
              <li key={title} className="reveal-item" style={{ "--i": i + 2 } as React.CSSProperties}>
                <Link href={href} className="group relative flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-shadow duration-200 hover:shadow-[0_12px_28px_-14px_rgba(1,40,88,0.45)]">
                  <span className="absolute left-2 top-1 font-[family-name:var(--font-fraunces)] text-[10px] font-bold text-gray-400" aria-hidden="true">0{i + 1}</span>
                  <span className="mt-2 h-10 w-10 shrink-0 rounded-lg bg-white p-1 ring-1 ring-gray-200"><Art /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-[family-name:var(--font-fraunces)] text-sm font-bold text-[#012858]">{title}</span>
                    <span className="block text-xs leading-snug text-gray-600">{desc}</span>
                    <span className="mt-0.5 inline-flex min-h-7 items-center gap-1 text-xs font-bold text-[#C90D11]">{cta} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                  </span>
                  <Mini />
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#024692] transition-colors group-hover:bg-[#012858] group-hover:text-white"><ArrowRight className="h-3 w-3" aria-hidden="true" /></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <p className="reveal-item mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-0 text-center text-xs text-gray-600" style={{ "--i": 7 } as React.CSSProperties}>
          <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          Exam dates and cut-offs link to their official source. We show the date we checked.
          <Link href="/editorial-policy" className="inline-flex min-h-9 items-center font-bold text-[#012858] underline underline-offset-2">How we verify data</Link>
        </p>
      </Reveal>
    </section>
  )
}
