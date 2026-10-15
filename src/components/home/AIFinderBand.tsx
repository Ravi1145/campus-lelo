"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Check, Sparkles } from "lucide-react"
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

const field = "w-full rounded-xl border border-white/15 bg-white px-3.5 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FB4312]"

export default function AIFinderBand() {
  const [stream, setStream] = useState("")
  const [exam, setExam] = useState("")
  const [score, setScore] = useState("")
  const [budget, setBudget] = useState("")
  const router = useRouter()
  const steps = [
    { label: "Pick your stream", done: !!stream },
    { label: "Choose your entrance exam", done: !!exam },
    { label: "Add your score or percentile", done: !!score.trim() },
    { label: "Set a yearly budget", done: !!budget },
  ]

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
    <section aria-labelledby="ai-finder-heading" className="relative overflow-hidden bg-[#011B40] px-4 sm:px-6 py-16 sm:py-20">

      <Reveal className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div className="reveal-item" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[#FF8A73]" aria-hidden="true" /> AI College Finder
          </span>
          <h2 id="ai-finder-heading" className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Not sure where to apply?
            <span className="block text-[#FF8A73]">Answer 4 questions.</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-blue-100">
            Tell us your stream, exam, score and budget. Our AI recommender suggests Pune colleges that fit, and explains why.
          </p>
          <ol className="mt-8" aria-label="Your answers so far">
            {steps.map(({ label, done }, i) => (
              <li key={label} className="relative flex items-center gap-4 pb-5 last:pb-0">
                {i < steps.length - 1 && <span aria-hidden="true" className={`absolute left-[0.95rem] top-9 h-[calc(100%-1.5rem)] w-0.5 transition-colors duration-500 ${done ? "bg-emerald-400" : "bg-white/15"}`} />}
                <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-2 transition-all duration-500 ${done ? "bg-emerald-400 text-[#011B40] ring-emerald-400 scale-105" : "bg-transparent text-blue-100 ring-white/30"}`}>
                  {done ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
                </span>
                <span className={`text-sm transition-colors duration-300 ${done ? "font-semibold text-white" : "text-blue-100"}`}>{label}{done && <span className="sr-only"> (answered)</span>}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-blue-100">Takes under a minute. Free, no sign-up to see results.</p>
        </div>

        {/* Form card */}
        <div className="reveal-item rounded-3xl ring-1 ring-white/20" style={{ "--i": 2 } as React.CSSProperties}>
          <form onSubmit={go} className="rounded-3xl bg-[#0B1E52] p-6 sm:p-7" aria-label="AI college finder">
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
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#C90D11]"
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
