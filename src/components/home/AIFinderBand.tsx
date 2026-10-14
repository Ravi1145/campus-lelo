"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, BadgeCheck, Clock3, Sparkles, Wand2 } from "lucide-react"
import Reveal from "./Reveal"

// Homepage AI finder: collects the four inputs the real AI recommender uses
// (stream, exam, score, budget) and opens /ai-finder pre-filled.
// Option values match src/components/ai/AIRecommender.tsx exactly.

const STREAMS = ["Engineering", "MBA/Management", "Medical (MBBS)", "Commerce/BBA", "Arts/Humanities", "BCA/BSc IT"]
const EXAMS = ["MHT-CET", "JEE Main/Advanced", "NEET", "CAT", "SNAP", "MAT/CMAT", "Class 12 Merit"]
const BUDGETS = [
  { label: "Under ₹1L / year", value: 100000 },
  { label: "₹1–3L / year", value: 300000 },
  { label: "₹3–5L / year", value: 500000 },
  { label: "₹5–10L / year", value: 1000000 },
  { label: "Above ₹10L / year", value: 2500000 },
]

const POINTS = [
  { icon: Clock3, text: "Takes under a minute" },
  { icon: BadgeCheck, text: "Free: no sign-up to see results" },
  { icon: Wand2, text: "Matches your score, budget and goals" },
]

const field = "w-full rounded-xl border border-white/15 bg-white px-3.5 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FB4312]"

export default function AIFinderBand() {
  const [stream, setStream] = useState("")
  const [exam, setExam] = useState("")
  const [score, setScore] = useState("")
  const [budget, setBudget] = useState("")
  const router = useRouter()

  const go = (e: React.FormEvent) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (stream) p.set("stream", stream)
    if (exam) p.set("exam", exam)
    if (score.trim()) p.set("score", score.trim())
    if (budget) p.set("budget", budget)
    router.push(`/ai-finder${p.toString() ? `?${p}` : ""}`)
  }

  return (
    <section aria-labelledby="ai-finder-heading" className="relative overflow-hidden bg-gradient-to-br from-[#011B40] via-[#012858] to-[#0B1E52] px-4 sm:px-6 py-16 sm:py-20">
      {/* Floating brand glows */}
      <span aria-hidden="true" className="insights-orb pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#E0170F]/25 blur-3xl" />
      <span aria-hidden="true" className="insights-orb insights-orb--slow pointer-events-none absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-[#024692]/50 blur-3xl" />
      <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

      <Reveal className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="reveal-item" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur">
            <Sparkles className="finder-sparkle h-3.5 w-3.5 text-[#FB4312]" aria-hidden="true" /> AI College Finder
          </span>
          <h2 id="ai-finder-heading" className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Not sure where to apply?
            <span className="block bg-gradient-to-r from-[#FB4312] to-[#FF9E8A] bg-clip-text text-transparent">Answer 4 questions.</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-blue-100">
            Tell us your stream, exam, score and budget. Our AI recommender suggests Pune colleges that fit, and explains why.
          </p>
          <ul className="mt-6 space-y-3">
            {POINTS.map(({ icon: Icon, text }, i) => (
              <li key={text} className="reveal-item flex items-center gap-3 text-sm text-white" style={{ "--i": i + 1 } as React.CSSProperties}>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                  <Icon className="h-4 w-4 text-[#FF9E8A]" aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Form card with animated gradient border */}
        <div className="reveal-item finder-border rounded-3xl p-[1.5px]" style={{ "--i": 2 } as React.CSSProperties}>
          <form onSubmit={go} className="rounded-3xl bg-[#0B1E52]/90 p-6 sm:p-7 backdrop-blur-xl" aria-label="AI college finder">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="finder-stream" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-blue-100">1 · Stream</label>
                <select id="finder-stream" value={stream} onChange={(e) => setStream(e.target.value)} className={field}>
                  <option value="">Choose a stream</option>
                  {STREAMS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="finder-exam" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-blue-100">2 · Entrance exam</label>
                <select id="finder-exam" value={exam} onChange={(e) => setExam(e.target.value)} className={field}>
                  <option value="">Choose an exam</option>
                  {EXAMS.map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="finder-score" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-blue-100">3 · Score / percentile</label>
                <input id="finder-score" value={score} onChange={(e) => setScore(e.target.value)} placeholder="e.g. 85 percentile" maxLength={30} className={field} />
              </div>
              <div>
                <label htmlFor="finder-budget" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-blue-100">4 · Yearly budget</label>
                <select id="finder-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={field}>
                  <option value="">Choose a budget</option>
                  {BUDGETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E0170F] to-[#C90D11] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/30 transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" /> Get my AI shortlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <p className="mt-3 text-center text-xs text-blue-200">You can change any answer on the next screen.</p>
          </form>
        </div>
      </Reveal>
    </section>
  )
}
