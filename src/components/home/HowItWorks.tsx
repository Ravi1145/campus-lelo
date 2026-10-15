import Link from "next/link"
import { ArrowRight, Check, Headphones, MessageCircle, Sparkles } from "lucide-react"
import Reveal from "./Reveal"

// Three steps along a drawn path. Each step has a small looping demo of what you will see,
// built from plain markup so it stays sharp and carries no made-up numbers.

const label = "text-[10px] font-bold uppercase tracking-wide text-gray-500"

function StepOnePicture() {
  return (
    <div className="space-y-3 rounded-2xl bg-white p-4 text-left ring-1 ring-gray-200" aria-hidden="true">
      <div>
        <p className={label}>Stream</p>
        <div className="mt-1.5 flex gap-1.5">
          {["MBA", "B.Tech", "Law"].map((t, i) => (
            <span key={t} className="hw-chip rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600" style={{ "--c": i } as React.CSSProperties}>{t}</span>
          ))}
        </div>
      </div>
      {[["Exam score", "62%"], ["Budget", "40%"]].map(([name, w], i) => (
        <div key={name}>
          <p className={label}>{name}</p>
          <div className="relative mt-2 h-1.5 rounded-full bg-gray-200">
            <span className="hw-fill absolute inset-y-0 left-0 rounded-full bg-[#012858]" style={{ "--w": w, "--d": i } as React.CSSProperties} />
            <span className="hw-thumb absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[#012858] bg-white shadow" style={{ "--w": w, "--d": i } as React.CSSProperties} />
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
        <div key={i} className="hw-in flex items-center gap-3 rounded-xl bg-gray-50 p-2.5" style={{ "--r": i } as React.CSSProperties}>
          <span className="h-8 w-8 shrink-0 rounded-lg bg-[#012858]/10" />
          <span className="flex-1 space-y-1.5">
            <span className="block h-2 w-3/4 rounded-full bg-gray-300" />
            <span className="block h-2 w-1/2 rounded-full bg-gray-200" />
          </span>
          <span className="hw-tick flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white" style={{ "--r": i } as React.CSSProperties}><Check className="h-3 w-3" strokeWidth={3} /></span>
        </div>
      ))}
      <p className="pt-1 text-center text-[11px] font-semibold text-gray-500">Fees · exams · cut-offs side by side</p>
    </div>
  )
}

function StepThreePicture() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-gray-200" aria-hidden="true">
      <span className="relative flex h-14 w-14 items-center justify-center">
        <span className="how-ring absolute inset-0 rounded-full bg-[#E0170F]/20" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#012858] text-white"><Headphones className="h-6 w-6" /></span>
      </span>
      <div className="relative w-full space-y-1.5">
        <span className="hw-msg1 block w-4/5 rounded-xl rounded-bl-sm bg-gray-100 px-3 py-2 text-[11px] text-gray-600">Which form do I fill first?</span>
        <span className="hw-typing absolute left-0 top-[2.4rem] flex gap-1 rounded-xl bg-gray-100 px-3 py-2">
          {[0, 1, 2].map((k) => <span key={k} className="hw-dot h-1.5 w-1.5 rounded-full bg-gray-500" style={{ "--k": k } as React.CSSProperties} />)}
        </span>
        <span className="hw-msg2 ml-auto block w-4/5 rounded-xl rounded-br-sm bg-[#012858] px-3 py-2 text-[11px] text-white">Let&apos;s go through it together.</span>
      </div>
    </div>
  )
}

const STEPS = [
  { picture: StepOnePicture, icon: Sparkles, title: "Tell us your goal", desc: "Share your stream, exam score and budget. It takes under a minute.", tint: "bg-blue-50 text-[#024692]" },
  { picture: StepTwoPicture, icon: Check, title: "Get a shortlist", desc: "See colleges that match your profile, with fees, cut-offs and exams side by side.", tint: "bg-emerald-50 text-emerald-700" },
  { picture: StepThreePicture, icon: MessageCircle, title: "Apply with free counselling", desc: "A counsellor can help with forms and deadlines. The first call costs nothing.", tint: "bg-red-50 text-[#C90D11]" },
]

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="relative overflow-hidden section-pearl px-4 py-10 sm:px-6 sm:py-12">
      <span aria-hidden="true" className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-orange-50" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-50" />
      <Reveal className="relative mx-auto max-w-6xl">
        <div className="reveal-item text-center" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs font-bold uppercase tracking-wider text-[#C90D11]">How it works</p>
          <h2 id="how-heading" className="mt-2 font-[family-name:var(--font-fraunces)] text-2xl font-bold text-[#012858] sm:text-3xl">How CampusLelo works</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">Three steps from &quot;where do I apply?&quot; to a filled form.</p>
        </div>

        <ol className="relative mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* The path between the numbers: draws once, a dot keeps travelling along it */}
          <svg aria-hidden="true" viewBox="0 0 900 40" preserveAspectRatio="none" className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[1.1rem] hidden h-9 w-[67%] md:block" fill="none">
            <path id="how-path" className="sg-draw" pathLength={1} d="M0 20 C 120 0, 230 40, 450 20 S 780 0, 900 20" stroke="#012858" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" />
            <circle r="6" fill="#E0170F">
              <animateMotion dur="5s" repeatCount="indefinite" path="M0 20 C 120 0, 230 40, 450 20 S 780 0, 900 20" />
            </circle>
          </svg>
          {STEPS.map(({ picture: Picture, icon: Icon, title, desc, tint }, i) => (
            <li key={title} className="reveal-item relative flex flex-col" style={{ "--i": i + 1 } as React.CSSProperties}>
              <span className="relative z-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E0170F] font-[family-name:var(--font-fraunces)] text-lg font-bold text-white ring-8 ring-[#EEF2F8]">{i + 1}</span>
              <div className="hw-card -mt-5 flex flex-1 flex-col rounded-2xl bg-white p-4 pt-8 shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200">
                <div className="flex-1"><Picture /></div>
                <div className="mt-4 flex items-start gap-3">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tint}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>
                  <div>
                    <h3 className="text-base font-bold text-[#012858]">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{desc}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="reveal-item mt-8 flex flex-wrap items-center justify-center gap-3" style={{ "--i": 4 } as React.CSSProperties}>
          <Link href="/counselling" className="group inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C90D11]">
            Get free counselling <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link href="/ai-finder" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-200 hover:ring-[#012858]">
            Try the AI finder
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
