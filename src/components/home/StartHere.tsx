import Link from "next/link"
import { ArrowRight, ArrowUpRight, BadgeCheck, BarChart3, Brain, Check, ClipboardList, Compass, GitCompare, Grid3x3, Sparkles } from "lucide-react"
import Reveal from "./Reveal"
import type { HeroProof } from "./HeroSection"

// "Start here": three signature tools get the stage (psychometric test, career quiz, admission plan),
// each with a looping mini-demo. The other tools sit in a scrolling rail below. No invented numbers.

const bar = "h-1.5 rounded-full bg-white/20"

function PsyDemo() {
  const traits = [["Curiosity", "78%"], ["Discipline", "64%"], ["Teamwork", "86%"], ["Calm under stress", "52%"]]
  return (
    <div className="space-y-2.5 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15" aria-hidden="true">
      {traits.map(([name, w], i) => (
        <div key={name}>
          <p className="text-[11px] font-semibold text-blue-100">{name}</p>
          <div className={`relative mt-1 ${bar}`}><span className="hw-fill absolute inset-y-0 left-0 rounded-full bg-[#F4604A]" style={{ "--w": w, "--d": i * 0.5 } as React.CSSProperties} /></div>
        </div>
      ))}
    </div>
  )
}

function QuizDemo() {
  return (
    <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15" aria-hidden="true">
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/20"><span className="hw-fill block h-full rounded-full bg-[#F4604A]" style={{ "--w": "70%" } as React.CSSProperties} /></div>
      <p className="text-sm font-semibold text-white">I like fixing things to see how they work.</p>
      <div className="mt-3 flex gap-1.5">
        {["Not me", "Maybe", "Yes"].map((t, i) => (
          <span key={t} className="hw-chip flex-1 rounded-lg bg-[#F1F4F9] px-2 py-1.5 text-center text-[11px] font-semibold text-gray-600" style={{ "--c": i } as React.CSSProperties}>{t}</span>
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        {["R", "I", "A", "S", "E", "C"].map((l, i) => (
          <span key={l} className="hw-tick flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-[#024692]" style={{ "--r": i * 0.4 } as React.CSSProperties}>{l}</span>
        ))}
      </div>
    </div>
  )
}

function PlanDemo() {
  return (
    <div className="relative space-y-2 rounded-2xl bg-white/10 p-4 pl-8 ring-1 ring-white/15" aria-hidden="true">
      <span className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-white/30" />
      {["Your exams", "Colleges that list them", "Dates, each with a source"].map((t, i) => (
        <div key={t} className="hw-in relative flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-[11px] font-semibold text-[#012858]" style={{ "--r": i } as React.CSSProperties}>
          <span className="absolute -left-[1.45rem] flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 text-white"><Check className="h-2.5 w-2.5" strokeWidth={4} /></span>
          {t}
          <span className="ml-auto rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">Source</span>
        </div>
      ))}
    </div>
  )
}

const HERO_TOOLS = [
  { demo: PsyDemo, icon: Brain, title: "Psychometric test", desc: "Ten minutes, one question at a time. See your work style and a short reasoning check, then what to explore.", href: "/psychometric-test", cta: "Take the test", bg: "bg-[#012858]" },
  { demo: QuizDemo, icon: Compass, title: "Career quiz", desc: "48 short statements, 8 minutes. See your interest code and which study paths fit, from engineering to MBA.", href: "/career-quiz", cta: "Start the quiz", bg: "bg-[#024692]" },
  { demo: PlanDemo, icon: ClipboardList, title: "My admission plan", desc: "Pick your exams and city. Get your dates and colleges on one page, every line with its source and check date.", href: "/my-admission-plan", cta: "Build my plan", bg: "bg-[#8E0B0B]" },
]

const MORE = [
  { icon: BarChart3, title: "MBA cut-off checker", desc: "Type your CAT percentiles and see which published minimums you meet.", href: "/mba-cutoff-checker" },
  { icon: Grid3x3, title: "Exam acceptance table", desc: "Pick the exams you took. Only colleges that list all of them stay in view.", href: "/mba-exam-acceptance" },
  { icon: Sparkles, title: "AI college finder", desc: "Answer four questions and get a matched shortlist.", href: "/ai-finder" },
  { icon: GitCompare, title: "Compare two colleges", desc: "Put two colleges side by side on the facts we have checked.", href: "/compare" },
]

export default function StartHere(_props: { proof: HeroProof }) {
  return (
    <section aria-labelledby="start-heading" className="relative overflow-hidden section-ivory px-4 py-10 sm:px-6 sm:py-12">
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-50" />
      <Reveal className="relative mx-auto max-w-7xl">
        <div className="reveal-item flex flex-wrap items-end justify-between gap-4" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#C90D11]"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Only on CampusLelo</p>
            <h2 id="start-heading" className="mt-3 font-[family-name:var(--font-fraunces)] text-2xl font-bold leading-tight text-[#012858] sm:text-3xl">Know yourself first. Then pick the college.</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">Three free tools built to help you choose, not just browse. Each one ends with a next step, and every figure carries its source and date.</p>
          </div>
          <Link href="/editorial-policy" className="inline-flex min-h-9 items-center gap-1.5 text-sm font-bold text-[#012858] underline-offset-4 hover:underline">How we verify data <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>

        {/* The three signature tools */}
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {HERO_TOOLS.map(({ demo: Demo, icon: Icon, title, desc, href, cta, bg }, i) => (
            <li key={title} className="reveal-item" style={{ "--i": i + 1 } as React.CSSProperties}>
              <Link href={href} className={`us-card group relative flex h-full flex-col overflow-hidden rounded-3xl ${bg} p-5 text-white shadow-[0_18px_40px_-22px_rgba(1,40,88,0.7)]`}>
                <span aria-hidden="true" className="us-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/10" />
                <span className="relative flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#012858]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="rounded-full bg-[#FFE9A8] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#4a3b00]">Signature · Free</span>
                </span>
                <h3 className="relative mt-4 font-[family-name:var(--font-fraunces)] text-xl font-bold">{title}</h3>
                <p className="relative mt-1 text-sm leading-relaxed text-blue-100">{desc}</p>
                <div className="relative mt-4 flex-1"><Demo /></div>
                <span className="relative mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#012858] transition-colors group-hover:bg-[#FFE9A8]">{cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* More tools: scrolling rail */}
        <div className="reveal-item mt-6" style={{ "--i": 5 } as React.CSSProperties}>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#012858]">More free tools</h3>
            <span className="us-hint text-xs font-semibold text-gray-500" aria-hidden="true">Scroll sideways →</span>
          </div>
          <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0" aria-label="More free tools, scroll sideways">
            {MORE.map(({ icon: Icon, title, desc, href }) => (
              <li key={title} className="w-64 shrink-0 snap-start sm:w-72 lg:flex-1">
                <Link href={href} className="group flex h-full items-start gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-gray-200 transition-shadow hover:shadow-[0_10px_26px_-14px_rgba(1,40,88,0.45)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#012858] text-white transition-transform group-hover:-rotate-6"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span>
                    <span className="flex items-center gap-1 text-sm font-bold text-[#012858]">{title}<ArrowUpRight className="h-3.5 w-3.5 text-[#C90D11]" aria-hidden="true" /></span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-gray-700">{desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="reveal-item mt-3 grid gap-2 text-sm text-gray-800 sm:grid-cols-3" style={{ "--i": 6 } as React.CSSProperties}>
          {["The official page is linked next to every exam, eligibility and cut-off fact", "The year is shown, so a 2024 cut-off is never passed off as this year's", "Gaps are stated: colleges that publish no cut-off are listed as such"].map((t) => (
            <li key={t} className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span>{t}</span></li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
