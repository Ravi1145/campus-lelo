import Link from "next/link"
import { ArrowRight, Check, Headphones } from "lucide-react"
import Reveal from "./Reveal"

// Three steps along a drawn path. Each step has a small picture of what you will see,
// built from plain markup so it stays sharp and carries no made-up numbers.

function StepOnePicture() {
  return (
    <div className="space-y-3 rounded-2xl bg-white p-4 text-left ring-1 ring-gray-200" aria-hidden="true">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Stream</p>
        <div className="mt-1.5 flex gap-1.5">
          <span className="rounded-full bg-[#012858] px-2.5 py-1 text-[11px] font-semibold text-white">MBA</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">B.Tech</span>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">Law</span>
        </div>
      </div>
      {["Exam score", "Budget"].map((label, i) => (
        <div key={label}>
          <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">{label}</p>
          <div className="relative mt-2 h-1.5 rounded-full bg-gray-200">
            <span className="how-fill absolute inset-y-0 left-0 rounded-full bg-[#012858]" style={{ "--w": i === 0 ? "62%" : "40%" } as React.CSSProperties} />
            <span className="how-thumb absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[#012858] bg-white" style={{ "--w": i === 0 ? "62%" : "40%" } as React.CSSProperties} />
          </div>
        </div>
      ))}
    </div>
  )
}

function StepTwoPicture() {
  return (
    <div className="space-y-2 rounded-2xl bg-white p-4 ring-1 ring-gray-200" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="how-row flex items-center gap-3 rounded-xl bg-gray-50 p-2.5" style={{ "--r": i } as React.CSSProperties}>
          <span className="h-8 w-8 shrink-0 rounded-lg bg-[#012858]/10" />
          <span className="flex-1 space-y-1.5">
            <span className="block h-2 w-3/4 rounded-full bg-gray-300" />
            <span className="block h-2 w-1/2 rounded-full bg-gray-200" />
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-3 w-3" strokeWidth={3} /></span>
        </div>
      ))}
      <p className="pt-1 text-center text-[11px] font-semibold text-gray-500">Fees · exams · cut-offs side by side</p>
    </div>
  )
}

function StepThreePicture() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-gray-200" aria-hidden="true">
      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="how-ring absolute inset-0 rounded-full bg-[#E0170F]/20" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#012858] text-white"><Headphones className="h-7 w-7" /></span>
      </span>
      <div className="w-full space-y-1.5">
        <span className="how-row block w-4/5 rounded-xl rounded-bl-sm bg-gray-100 px-3 py-2 text-[11px] text-gray-600" style={{ "--r": 0 } as React.CSSProperties}>Which form do I fill first?</span>
        <span className="how-row ml-auto block w-4/5 rounded-xl rounded-br-sm bg-[#012858] px-3 py-2 text-[11px] text-white" style={{ "--r": 1 } as React.CSSProperties}>Let&apos;s go through it together.</span>
      </div>
    </div>
  )
}

const STEPS = [
  { picture: StepOnePicture, title: "Tell us your goal", desc: "Share your stream, exam score and budget. It takes under a minute." },
  { picture: StepTwoPicture, title: "Get a shortlist", desc: "See colleges that match your profile, with fees, cut-offs and exams side by side." },
  { picture: StepThreePicture, title: "Apply with free counselling", desc: "A counsellor can help with forms and deadlines. The first call costs nothing." },
]

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="section-pearl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="mx-auto max-w-6xl">
        <div className="reveal-item text-center" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs font-bold uppercase tracking-wider text-[#C90D11]">How it works</p>
          <h2 id="how-heading" className="mt-2 text-3xl font-bold text-[#012858] sm:text-4xl">How CampusLelo works</h2>
        </div>

        <ol className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* The path between the three numbers: draws itself once in view */}
          <svg aria-hidden="true" viewBox="0 0 900 40" preserveAspectRatio="none" className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[0.6rem] hidden h-9 w-[67%] md:block" fill="none">
            <path className="sg-draw" pathLength={1} d="M0 20 C 120 0, 230 40, 450 20 S 780 0, 900 20" stroke="#012858" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" strokeDasharray="0" />
          </svg>
          {STEPS.map(({ picture: Picture, title, desc }, i) => (
            <li key={title} className="reveal-item relative flex flex-col items-center text-center" style={{ "--i": i + 1 } as React.CSSProperties}>
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#E0170F] font-[family-name:var(--font-fraunces)] text-xl font-bold text-white ring-8 ring-[#EEF2F8]">{i + 1}</span>
              <div className="mt-6 w-full max-w-xs flex-1"><Picture /></div>
              <h3 className="mt-6 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-600">{desc}</p>
            </li>
          ))}
        </ol>

        <div className="reveal-item mt-12 flex flex-wrap items-center justify-center gap-3" style={{ "--i": 4 } as React.CSSProperties}>
          <Link href="/counselling" className="group inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#C90D11]">
            Get free counselling <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link href="/ai-finder" className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#012858] ring-1 ring-gray-200 hover:ring-[#012858]">
            Try the AI finder
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
