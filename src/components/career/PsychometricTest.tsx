"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, ListChecks, Printer, RotateCcw, Sparkles } from "lucide-react"
import { APTITUDE, PERSONALITY, PERSONALITY_SCALE } from "@/data/career/psychometric"
import { A_TOTAL, P_TOTAL, STEPS, answered, emptyState, parseState, scorePsy, type PsyState } from "@/lib/psychometricScore"
import { decode as decodeQuiz, score as scoreQuiz } from "@/lib/careerScore"

const KEY = "campuslelo-psychometric-v1"
const QUIZ_KEY = "campuslelo-career-quiz-v1"
const R = 26
const CIRC = 2 * Math.PI * R

type Phase = "intro" | "test" | "result"

function Ring({ done, label }: { done: number; label: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0 -rotate-90" role="img" aria-label={label}>
      <circle cx="32" cy="32" r={R} fill="none" stroke="#E2E8F0" strokeWidth="6" />
      <circle cx="32" cy="32" r={R} fill="none" stroke="#E0170F" strokeWidth="6" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - done / STEPS)} className="psy-ring" />
    </svg>
  )
}

function Bar({ label, value, note }: { label: string; value: number; note: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm"><span className="font-semibold text-gray-900">{label}</span><span className="tabular-nums text-gray-700">{value}</span></div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gray-200" role="img" aria-label={`${label}: ${value} out of 100`}>
        <div className="career-bar h-full rounded-full bg-[#012858]" style={{ width: `${value}%` }} />
      </div>
      <p className="mt-1.5 text-sm text-gray-700">{note}</p>
    </div>
  )
}

export default function PsychometricTest() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [state, setState] = useState<PsyState>(emptyState)
  const [step, setStep] = useState(0)
  const [resumable, setResumable] = useState(false)
  const [quizTop, setQuizTop] = useState<{ name: string; fit: number }[] | null>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLFieldSetElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const saved = parseState(localStorage.getItem(KEY))
      if (saved && answered(saved) > 0) { setState(saved); setResumable(true) }
      const quiz = decodeQuiz(localStorage.getItem(QUIZ_KEY))
      if (quiz && quiz.every((n) => n > 0)) setQuizTop(scoreQuiz(quiz).streams.slice(0, 3).map((s) => ({ name: s.name, fit: s.fit })))
    } catch { /* private mode: nothing to restore */ }
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [])

  const persist = useCallback((s: PsyState) => { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch { /* ignore */ } }, [])
  const done = answered(state)
  const result = useMemo(() => (phase === "result" ? scorePsy(state) : null), [phase, state])

  const toTop = () => headRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  const begin = (fresh: boolean) => {
    if (fresh) { const e = emptyState(); setState(e); persist(e); setStep(0) }
    else {
      const firstOpen = [...state.p.map((n) => n === 0), ...state.a.map((n) => n < 0)].findIndex(Boolean)
      setStep(firstOpen === -1 ? STEPS - 1 : firstOpen)
    }
    setResumable(false)
    setPhase("test")
    setTimeout(toTop, 50)
  }

  const answer = (value: number) => {
    setState((prev) => {
      const next: PsyState = { p: [...prev.p], a: [...prev.a] }
      if (step < P_TOTAL) next.p[step] = value
      else next.a[step - P_TOTAL] = value
      persist(next)
      return next
    })
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (step < STEPS - 1) { setStep((s) => s + 1); setTimeout(() => cardRef.current?.focus({ preventScroll: true }), 60) }
      else { setPhase("result"); setTimeout(toTop, 50) }
    }, 320)
  }

  const retake = () => { const e = emptyState(); setState(e); persist(e); setStep(0); setPhase("intro"); setTimeout(toTop, 50) }

  const inPersonality = step < P_TOTAL
  const item = inPersonality ? PERSONALITY[step] : APTITUDE[step - P_TOTAL]
  const current = inPersonality ? state.p[step] : state.a[step - P_TOTAL]

  return (
    <div ref={headRef} className="scroll-mt-28">
      {phase === "intro" && (
        <div className="psy-card-in rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-9">
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#012858]">A short test, one question at a time</h2>
              <p className="mt-3 text-gray-700">Twenty statements about how you work and feel, then nine quick reasoning questions with numbers, words and logic. About 10 minutes. You get a profile of your work style and a practice check of your reasoning.</p>
              <ul className="mt-5 space-y-2 text-sm text-gray-800">
                <li className="flex items-center gap-3"><Brain className="h-5 w-5 text-[#012858]" aria-hidden="true" /> Part 1: personality, five traits, 20 statements</li>
                <li className="flex items-center gap-3"><ListChecks className="h-5 w-5 text-[#012858]" aria-hidden="true" /> Part 2: reasoning, 9 questions with right answers</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-[#012858]" aria-hidden="true" /> Result: traits, reasoning score and what to explore next</li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {resumable && done < STEPS ? (
                  <>
                    <button type="button" onClick={() => begin(false)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white hover:bg-[#C90D11]">Continue ({done} of {STEPS}) <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                    <button type="button" onClick={() => begin(true)} className="min-h-11 rounded-xl px-5 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-300 hover:ring-[#012858]">Start again</button>
                  </>
                ) : (
                  <button type="button" onClick={() => begin(true)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#E0170F] px-7 py-3 text-sm font-bold text-white hover:bg-[#C90D11]">Start the test <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                )}
              </div>
            </div>
            <div className="relative mx-auto hidden h-56 w-56 md:block" aria-hidden="true">
              <span className="psy-orbit absolute inset-0 rounded-full border-2 border-dashed border-[#012858]/25" />
              <span className="psy-orbit psy-orbit--rev absolute inset-6 rounded-full border-2 border-dashed border-[#E0170F]/35" />
              <span className="absolute inset-0 flex items-center justify-center"><Brain className="psy-float h-20 w-20 text-[#012858]" strokeWidth={1.4} /></span>
              <span className="psy-float absolute left-2 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#012858] text-sm font-bold text-white" style={{ animationDelay: "0.4s" }}>+</span>
              <span className="psy-float absolute bottom-6 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#E0170F] text-sm font-bold text-white" style={{ animationDelay: "1s" }}>?</span>
              <span className="psy-float absolute right-4 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-[#012858] ring-2 ring-[#012858]" style={{ animationDelay: "1.6s" }}>A</span>
            </div>
          </div>
          <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 ring-1 ring-amber-200">
            <strong>Please read:</strong> this is a psychometric-style guidance test, not a standardised or validated psychometric instrument, not an IQ test and not a clinical test. Three sample questions per reasoning area cannot measure ability. Use it to start a conversation with a counsellor, a teacher and your family, not to decide your future. Your answers stay in your browser.
          </p>
        </div>
      )}

      {phase === "test" && (
        <div className="rounded-3xl bg-white p-5 ring-1 ring-gray-200 sm:p-8">
          <div className="flex items-center gap-4">
            <Ring done={done} label={`${done} of ${STEPS} answered`} />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#C90D11]">{inPersonality ? "Part 1 of 2 · Personality" : "Part 2 of 2 · Reasoning"}</p>
              <p className="text-sm font-semibold text-gray-800 tabular-nums">Question {step + 1} of {STEPS}</p>
            </div>
          </div>

          <fieldset key={step} ref={cardRef} tabIndex={-1} className="psy-card-in mt-6 rounded-2xl bg-[#F6F8FB] p-5 outline-none sm:p-7">
            <legend className="px-1 font-[family-name:var(--font-fraunces)] text-xl font-bold leading-snug text-[#012858] sm:text-2xl">{item.text}</legend>
            <div className={`mt-5 grid gap-2.5 ${inPersonality ? "sm:grid-cols-5" : "sm:grid-cols-2"}`}>
              {(inPersonality ? PERSONALITY_SCALE : (item as (typeof APTITUDE)[number]).options).map((label, idx) => {
                const value = inPersonality ? idx + 1 : idx
                const on = current === value
                return (
                  <label key={label} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm ring-1 transition-colors focus-within:ring-2 focus-within:ring-[#012858] ${on ? "psy-pick bg-[#012858] font-semibold text-white ring-[#012858]" : "bg-white text-gray-800 ring-gray-300 hover:ring-[#012858]"}`}>
                    <input type="radio" name={`psy-${step}`} value={value} checked={on} onChange={() => answer(value)} className="sr-only" />
                    <span aria-hidden="true" className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${on ? "bg-white text-[#012858]" : "bg-gray-100 text-gray-700"}`}>{inPersonality ? idx + 1 : String.fromCharCode(65 + idx)}</span>
                    <span>{label}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button type="button" onClick={() => (step === 0 ? setPhase("intro") : setStep(step - 1))} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-300 hover:ring-[#012858]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back</button>
            <p className="text-xs text-gray-600">Choose an answer to move on. You can go back and change it.</p>
          </div>
        </div>
      )}

      {phase === "result" && result && (
        <div className="space-y-6">
          <div className="psy-card-in grid gap-6 rounded-3xl bg-[#012858] p-6 text-white sm:p-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-200">Your reasoning check</p>
              <p className="mt-1 font-[family-name:var(--font-fraunces)] text-5xl font-bold">{result.aptitudeTotal}<span className="text-2xl text-blue-200"> / {A_TOTAL}</span></p>
              <p className="mt-3 max-w-xl text-blue-100">{result.aptitude.map((a) => `${a.name} ${a.correct} of ${a.total}`).join(", ")}. Nine sample questions are a practice check, not a measure of ability. Marks, practice and teacher feedback tell you more.</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {result.aptitude.map((a, i) => (
                <div key={a.code} className="psy-card-in rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/20" style={{ animationDelay: `${i * 120 + 200}ms` }}>
                  <p className="text-2xl font-bold tabular-nums">{a.correct}/{a.total}</p>
                  <p className="mt-0.5 text-xs text-blue-100">{a.name}</p>
                </div>
              ))}
            </div>
          </div>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby="traits-h">
            <h2 id="traits-h" className="text-xl font-bold text-[#012858]">Your work style</h2>
            <p className="mt-1 text-sm text-gray-700">Five traits, each from 0 to 100. There is no good or bad end. Each suits different settings.</p>
            <div className="mt-5 space-y-6">
              {result.traits.map((t) => <Bar key={t.code} label={t.name} value={t.score} note={t.text + (t.level === "high" ? ` This can suit ${t.workHigh}.` : "")} />)}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby="combine-h">
            <h2 id="combine-h" className="text-xl font-bold text-[#012858]">Put it together with your interests</h2>
            {quizTop ? (
              <>
                <p className="mt-2 text-sm text-gray-700">Your career quiz on this device pointed to these study paths:</p>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-gray-800">{quizTop.map((s) => <li key={s.name}><strong>{s.name}</strong> <span className="text-gray-600">(fit {s.fit} out of 100)</span></li>)}</ol>
                <p className="mt-3 text-sm text-gray-700">Check whether the work style above matches what those paths ask of you day to day.</p>
              </>
            ) : (
              <p className="mt-2 text-sm text-gray-700">This test shows how you work. To see what you enjoy, take the <Link href="/career-quiz" className="font-bold text-[#C90D11] hover:underline">career quiz</Link>; it ranks study paths. Together they give a fuller picture.</p>
            )}
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <Link href="/my-admission-plan" className="text-[#C90D11] hover:underline">Build my admission plan →</Link>
              <Link href="/counselling" className="text-[#C90D11] hover:underline">Talk to a counsellor →</Link>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby="review-h">
            <h2 id="review-h" className="text-xl font-bold text-[#012858]">Review your reasoning answers</h2>
            <ol className="mt-4 space-y-3">
              {result.review.map((r) => (
                <li key={r.id} className="rounded-2xl bg-[#F6F8FB] p-4 text-sm">
                  <p className="font-semibold text-gray-900">{r.id + 1}. {r.text}</p>
                  <p className={`mt-1 font-semibold ${r.ok ? "text-emerald-700" : "text-red-700"}`}>{r.ok ? "Correct" : `You chose: ${r.picked}. Right answer: ${r.right}.`}</p>
                  <p className="mt-1 text-gray-700">{r.why}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className="flex flex-wrap gap-3 print:hidden">
            <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-300 hover:ring-[#012858]"><Printer className="h-4 w-4" aria-hidden="true" /> Print or save as PDF</button>
            <button type="button" onClick={retake} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#C90D11] hover:underline"><RotateCcw className="h-4 w-4" aria-hidden="true" /> Retake</button>
          </div>
          <p className="text-xs leading-relaxed text-gray-600">Reminder: a psychometric-style guidance test, not standardised, validated, an IQ test or a clinical test. Traits can change and are not good or bad. Talk to a counsellor before making a decision.</p>
        </div>
      )}
    </div>
  )
}
