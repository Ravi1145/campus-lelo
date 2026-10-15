"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, BadgeCheck, Check, FileText, GraduationCap, IndianRupee, Lightbulb, Lock, Sparkles, Star, BarChart3 } from "lucide-react"
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

const field = "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#012858] focus:outline-none focus:ring-2 focus:ring-[#012858]/25"

export default function AIFinderBand() {
  const [stream, setStream] = useState("")
  const [exam, setExam] = useState("")
  const [score, setScore] = useState("")
  const [budget, setBudget] = useState("")
  const router = useRouter()

  const steps = [
    { label: "Pick your stream", sub: "MBA, B.Tech, Medical and more", done: !!stream, icon: GraduationCap, tint: "bg-blue-50 text-[#024692]" },
    { label: "Choose your entrance exam", sub: "CAT, MHT-CET, NEET, etc.", done: !!exam, icon: FileText, tint: "bg-red-50 text-[#C90D11]" },
    { label: "Add your score or percentile", sub: "Get relevant college suggestions", done: !!score.trim(), icon: Star, tint: "bg-emerald-50 text-emerald-700" },
    { label: "Set a yearly budget", sub: "Find options that fit your budget", done: !!budget, icon: IndianRupee, tint: "bg-amber-50 text-amber-700" },
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
    <section aria-labelledby="ai-finder-heading" className="relative overflow-hidden section-ivory px-4 py-10 sm:px-6 sm:py-12">
      <span className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-orange-50" aria-hidden="true" />
      <span className="pointer-events-none absolute right-0 top-0 h-72 w-1/2 rounded-bl-[8rem] bg-blue-50/70" aria-hidden="true" />

      <Reveal className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        {/* Copy and the four steps */}
        <div className="reveal-item" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-[#C90D11]"><Sparkles className="h-4 w-4" aria-hidden="true" /> AI College Finder</span>
          <h2 id="ai-finder-heading" className="mt-5 text-3xl font-bold leading-[1.15] text-[#012858] sm:text-4xl">
            Not sure where to apply?
            <span className="block text-[#C90D11]">Answer 4 questions.</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-600">
            Tell us your stream, exam, score and budget. Our AI recommender suggests Pune colleges that fit, and explains why.
          </p>

          <ol className="mt-5 max-w-md" aria-label="Your answers so far">
            {steps.map(({ label, sub, done, icon: Icon, tint }, i) => (
              <li key={label} className="relative flex items-center gap-4 pb-3 last:pb-0">
                {i < steps.length - 1 && <span aria-hidden="true" className={`absolute left-[1.15rem] top-11 h-[calc(100%-2rem)] w-0.5 transition-colors duration-500 ${done ? "bg-emerald-400" : "bg-gray-200"}`} />}
                <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ring-2 transition-all duration-500 ${done ? "bg-emerald-500 text-white ring-emerald-500" : "bg-blue-50 text-[#012858] ring-blue-100"}`}>
                  {done ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
                </span>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tint}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <span>
                  <span className={`block text-base font-bold ${done ? "text-[#012858]" : "text-gray-900"}`}>{label}{done && <span className="sr-only"> (answered)</span>}</span>
                  <span className="block text-sm text-gray-600">{sub}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-6 inline-block -rotate-1 border-b-2 border-[#F4604A] pb-1 font-[family-name:var(--font-fraunces)] text-lg italic text-[#012858]">Takes under a minute. Free, no sign-up to see results.</p>
        </div>

        {/* The form */}
        <div className="reveal-item relative" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="pointer-events-none absolute -top-6 left-6 hidden -rotate-6 font-[family-name:var(--font-fraunces)] text-lg italic leading-tight text-[#012858] xl:block" aria-hidden="true">Better colleges,<br />brighter future</span>
          <form onSubmit={go} className="rounded-3xl bg-white p-5 shadow-[0_24px_60px_-30px_rgba(1,40,88,0.45)] ring-1 ring-gray-200 sm:p-6" aria-label="AI college finder">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C90D11]"><Sparkles className="h-7 w-7" aria-hidden="true" /></span>
                <div>
                  <p className="text-lg font-bold text-[#012858]">Get your personalised college shortlist</p>
                  <p className="mt-1 text-sm text-gray-600">Based on the exam, score and budget you choose.</p>
                </div>
              </div>
              <span className="hidden shrink-0 rotate-3 rounded-md bg-[#FFE9A8] px-3 py-2 text-center font-[family-name:var(--font-fraunces)] text-sm font-bold leading-tight text-[#4a3b00] shadow-sm sm:block">100% free<br />No sign-up</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-blue-50/60 p-3">
                <label htmlFor="finder-stream" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#012858]"><GraduationCap className="h-4 w-4 text-[#024692]" aria-hidden="true" /> 1. Select your stream</label>
                <select id="finder-stream" value={stream} onChange={(e) => setStream(e.target.value)} className={field}>
                  <option value="">Choose a stream</option>
                  {STREAMS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="rounded-xl bg-blue-50/60 p-3">
                <label htmlFor="finder-exam" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#012858]"><FileText className="h-4 w-4 text-[#024692]" aria-hidden="true" /> 2. Select your entrance exam</label>
                <select id="finder-exam" value={exam} onChange={(e) => setExam(e.target.value)} className={field}>
                  <option value="">Choose an exam</option>
                  {EXAMS.map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
              <div className="rounded-xl bg-blue-50/60 p-3">
                <label htmlFor="finder-score" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#012858]"><BarChart3 className="h-4 w-4 text-[#024692]" aria-hidden="true" /> 3. Your score / percentile</label>
                <input id="finder-score" value={score} onChange={(e) => setScore(e.target.value)} placeholder="e.g. 85 percentile" maxLength={30} className={field} />
              </div>
              <div className="rounded-xl bg-blue-50/60 p-3">
                <label htmlFor="finder-budget" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#012858]"><IndianRupee className="h-4 w-4 text-[#024692]" aria-hidden="true" /> 4. Yearly budget <span className="font-normal text-gray-600">(optional)</span></label>
                <select id="finder-budget" value={budget} onChange={(e) => setBudget(e.target.value)} className={field}>
                  <option value="">Choose a budget</option>
                  {BUDGETS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" className="group mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C90D11]">
              <Sparkles className="h-5 w-5" aria-hidden="true" /> Get my AI shortlist <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600"><Lock className="h-4 w-4" aria-hidden="true" /> You can change any answer on the next screen.</p>
          </form>

          <ul className="mt-3 grid grid-cols-1 gap-2 rounded-xl bg-blue-50 p-3 sm:grid-cols-3">
            {[
              { icon: BadgeCheck, text: "Personalised college list", tint: "text-emerald-600" },
              { icon: BarChart3, text: "Exams and fees from official pages", tint: "text-[#024692]" },
              { icon: Lightbulb, text: "AI explanation for each suggestion", tint: "text-amber-500" },
            ].map(({ icon: Icon, text, tint }) => (
              <li key={text} className="flex items-center gap-3 text-sm font-medium text-gray-800"><Icon className={`h-6 w-6 shrink-0 ${tint}`} aria-hidden="true" />{text}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
