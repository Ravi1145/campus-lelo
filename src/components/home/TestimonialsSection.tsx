import Link from "next/link"
import { ArrowRight, BadgeCheck, Phone, Video } from "lucide-react"
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

const TOOLS = [
  { art: CompareArt, title: "Compare side by side", desc: "Put two colleges next to each other and compare fees, accepted exams and NAAC grade.", href: "/compare", cta: "Compare colleges" },
  { art: FinderArt, title: "AI college finder", desc: "Answer four quick questions about your stream, score and budget and get a matched shortlist.", href: "/ai-finder", cta: "Try the finder" },
  { art: ExamArt, title: "Exam guides with dates", desc: "CAT, XAT, SNAP, NMAT, MAT and more, dates, pattern and eligibility, linked to the official source.", href: "/exams", cta: "See exam guides" },
  { art: CutoffArt, title: "Published cut-offs", desc: "Only cut-offs that a college or exam body has published, each with its source and the date we checked.", href: "/mba-cutoff-delhi-ncr", cta: "MBA cut-offs" },
]

export default function TestimonialsSection() {
  return (
    <section aria-labelledby="why-heading" className="section-ivory px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-7xl">
        <div className="reveal-item max-w-2xl" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#C90D11]">Why CampusLelo</p>
          <h2 id="why-heading" className="mt-2 text-3xl font-bold text-[#012858] sm:text-4xl">Tools for comparing colleges, and a person to ask</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">Free for students. Use the tools on your own, or ask a counsellor when you get stuck.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Counselling: a conversation, then the offer */}
          <div className="reveal-item relative overflow-hidden rounded-3xl bg-[#011B40] p-6 text-white sm:p-8 lg:col-span-5" style={{ "--i": 1 } as React.CSSProperties}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-200">An example conversation</p>
            <div className="mt-4 space-y-3" aria-hidden="true">
              <div className="bubble bubble-left max-w-[85%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm text-blue-50" style={{ "--b": 0 } as React.CSSProperties}>
                I have a CMAT score and no CAT. What can I apply to?
              </div>
              <div className="bubble bubble-right ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#E0170F] px-4 py-3 text-sm text-white" style={{ "--b": 1 } as React.CSSProperties}>
                Let&apos;s check which colleges accept CMAT, then shortlist by your budget and city.
              </div>
              <div className="bubble bubble-left inline-flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3" style={{ "--b": 2 } as React.CSSProperties}>
                <span className="typing-dot" /><span className="typing-dot" style={{ animationDelay: "0.15s" }} /><span className="typing-dot" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>

            <h3 className="mt-8 text-2xl font-bold leading-tight sm:text-[1.7rem]">Guidance that fits: a free call, or a ₹{VIDEO_PRICE_INR} video session</h3>
            <p className="mt-3 text-sm leading-relaxed text-blue-100">Not sure which college or exam is right? Start with free phone counselling, scholarship information and alumni to talk to. For one-to-one help with CAP rounds, career choice and a personal shortlist, book an expert video session.</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/15">
                <Phone className="h-5 w-5 text-orange-300" aria-hidden="true" />
                <p className="mt-2 text-sm font-bold">Phone call</p>
                <p className="mt-0.5 text-xs text-blue-100">Free. Scholarships, alumni, forms and deadlines.</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/15">
                <Video className="h-5 w-5 text-orange-300" aria-hidden="true" />
                <p className="mt-2 text-sm font-bold">Video session · ₹{VIDEO_PRICE_INR}</p>
                <p className="mt-0.5 text-xs text-blue-100">CAP rounds, career choice, a personal shortlist.</p>
              </div>
            </div>

            <Link href="/counselling#plans" className="group mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#C90D11]">
              See free and paid options <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          {/* The tools: one numbered row each, with a small drawing */}
          <ol className="grid content-start gap-4 lg:col-span-7">
            {TOOLS.map(({ art: Art, title, desc, href, cta }, i) => (
              <li key={title} className="reveal-item" style={{ "--i": i + 2 } as React.CSSProperties}>
                <Link href={href} className="group relative flex items-center gap-5 rounded-3xl bg-[#F6F8FB] p-5 ring-1 ring-gray-200 transition-colors duration-200 hover:bg-white hover:ring-[#012858]/30 sm:gap-6 sm:p-6">
                  <span className="absolute left-5 top-4 font-[family-name:var(--font-fraunces)] text-sm font-bold text-gray-400 sm:left-6" aria-hidden="true">0{i + 1}</span>
                  <span className="mt-4 h-20 w-20 shrink-0 rounded-2xl bg-white p-2 ring-1 ring-gray-200 sm:h-24 sm:w-24"><Art /></span>
                  <span className="mt-3 min-w-0 flex-1">
                    <span className="block text-lg font-bold text-[#012858]">{title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-gray-600">{desc}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11]">
                      {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <p className="reveal-item mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-gray-600" style={{ "--i": 7 } as React.CSSProperties}>
          <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          Exam dates and cut-offs link to their official source.
          <Link href="/editorial-policy" className="font-bold text-[#012858] underline-offset-2 hover:underline">How we verify data</Link>
        </p>
      </Reveal>
    </section>
  )
}
