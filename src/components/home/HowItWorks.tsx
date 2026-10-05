import Link from "next/link"
import { ArrowRight, Headphones, ListChecks, Target } from "lucide-react"
import Reveal from "./Reveal"

const STEPS = [
  { icon: Target, title: "Tell us your goal", desc: "Share your stream, exam score and budget. It takes under a minute." },
  { icon: ListChecks, title: "Get a shortlist", desc: "See colleges that match your profile, with fees, cut-offs and exams side by side." },
  { icon: Headphones, title: "Apply with free counselling", desc: "A counsellor helps with forms, deadlines and choices — at no cost to you." },
]

export default function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="section-pearl px-4 sm:px-6 py-16 sm:py-20">
      <Reveal className="mx-auto max-w-6xl">
        <div className="reveal-item text-center" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs font-bold uppercase tracking-wider text-orange-600">How it works</p>
          <h2 id="how-heading" className="mt-2 text-3xl font-extrabold text-[#012858] sm:text-4xl">From confusion to admission in 3 steps</h2>
        </div>

        <ol className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Connector — draws itself from left to right when revealed */}
          <span aria-hidden="true" className="how-line absolute left-[16.6%] right-[16.6%] top-[2.15rem] hidden h-0.5 rounded-full bg-gradient-to-r from-[#E0170F] via-[#FB4312] to-[#024692] md:block" />
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <li key={title} className="reveal-item relative" style={{ "--i": i + 1 } as React.CSSProperties}>
              <div className="group mt-9 flex h-[calc(100%-2.25rem)] flex-col items-center rounded-2xl bg-white p-6 pt-0 text-center ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-orange-200">
                <span className="relative -mt-9 flex h-[4.5rem] w-[4.5rem] items-center justify-center">
                  <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E0170F] to-[#024692] opacity-90 transition-transform duration-500 group-hover:rotate-180" />
                  <span className="relative flex h-[3.9rem] w-[3.9rem] items-center justify-center rounded-full bg-white">
                    <Icon className="h-7 w-7 text-[#012858] transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  </span>
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#E0170F] text-xs font-extrabold text-white ring-4 ring-[#F6F8FB]">{i + 1}</span>
                </span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="reveal-item mt-12 flex flex-wrap items-center justify-center gap-3" style={{ "--i": 4 } as React.CSSProperties}>
          <Link href="/counselling" className="group inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-transform hover:-translate-y-0.5">
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
