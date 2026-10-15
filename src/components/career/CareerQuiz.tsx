"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Copy, Printer, RotateCcw } from "lucide-react"
import { QUESTIONS, SCALE_INTEREST, SCALE_STRENGTH, STREAMS } from "@/data/career/questions"
import RiasecHex from "@/components/career/RiasecHex"
import { TOTAL, answeredCount, decode, emptyAnswers, encode, score, type Answers } from "@/lib/careerScore"

const PER_PAGE = 6
const PAGES = Math.ceil(TOTAL / PER_PAGE)
const KEY = "campuslelo-career-quiz-v1"

type Phase = "intro" | "quiz" | "result"

function Bar({ label, value, tone = "navy" }: { label: string; value: number; tone?: "navy" | "red" }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-semibold text-gray-900">{label}</span>
        <span className="tabular-nums text-gray-700">{value}</span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gray-200" role="img" aria-label={`${label}: ${value} out of 100`}>
        <div className={`career-bar h-full rounded-full ${tone === "red" ? "bg-[#E0170F]" : "bg-[#012858]"}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default function CareerQuiz() {
  const [phase, setPhase] = useState<Phase>("intro")
  const [answers, setAnswers] = useState<Answers>(emptyAnswers)
  const [page, setPage] = useState(0)
  const [copied, setCopied] = useState(false)
  const [restored, setRestored] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  // Restore a shared result from the link, or unfinished answers from this browser.
  useEffect(() => {
    try {
      const fromHash = decode(new URLSearchParams(window.location.hash.slice(1)).get("r"))
      if (fromHash && answeredCount(fromHash) === TOTAL) { setAnswers(fromHash); setPhase("result"); return }
      const saved = decode(localStorage.getItem(KEY))
      if (saved && answeredCount(saved) > 0) { setAnswers(saved); setRestored(true) }
    } catch { /* private mode: start fresh */ }
  }, [])

  const save = useCallback((a: Answers) => { try { localStorage.setItem(KEY, encode(a)) } catch { /* ignore */ } }, [])

  const setAnswer = (id: number, v: number) => {
    setAnswers((prev) => { const next = [...prev]; next[id] = v; save(next); return next })
  }

  const start = (fresh: boolean) => {
    if (fresh) { const e = emptyAnswers(); setAnswers(e); save(e); setPage(0) }
    else setPage(Math.min(PAGES - 1, Math.floor(answers.findIndex((n) => n === 0) / PER_PAGE)))
    setPhase("quiz")
    setRestored(false)
  }

  const pageQuestions = QUESTIONS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)
  const pageDone = pageQuestions.every((q) => answers[q.id] > 0)
  const done = answeredCount(answers)

  const goTo = (p: number) => { setPage(p); topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }) }

  const finish = () => {
    setPhase("result")
    try { history.replaceState(null, "", `#r=${encode(answers)}`) } catch { /* ignore */ }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const result = useMemo(() => (phase === "result" ? score(answers) : null), [phase, answers])

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#r=${encode(answers)}`); setCopied(true); setTimeout(() => setCopied(false), 2500) } catch { /* ignore */ }
  }

  const retake = () => {
    const e = emptyAnswers(); setAnswers(e); save(e); setPage(0); setPhase("intro")
    try { history.replaceState(null, "", window.location.pathname) } catch { /* ignore */ }
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      {phase === "intro" && (
        <div className="quiz-page-in grid gap-8 rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
          <h2 className="text-2xl font-bold text-[#012858]">Find out which path fits you</h2>
          <p className="mt-2 text-gray-700">48 short statements, about 8 minutes. You rate how much each one sounds like you. We turn your answers into your interest profile, your strengths and the study paths that fit best, with the exams and colleges to look at next.</p>
          <ul className="mt-5 grid gap-3 text-sm text-gray-800 sm:grid-cols-3">
            <li className="rounded-2xl bg-[#F1F4F9] p-4"><strong className="block text-[#012858]">36 interest statements</strong>Six kinds of work, six statements each.</li>
            <li className="rounded-2xl bg-[#F1F4F9] p-4"><strong className="block text-[#012858]">12 strength statements</strong>How you rate your own skills.</li>
            <li className="rounded-2xl bg-[#F1F4F9] p-4"><strong className="block text-[#012858]">Private by default</strong>Answers stay in your browser. Nothing is sent to us.</li>
          </ul>
          <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-950 ring-1 ring-amber-200">
            <strong>Please read:</strong> this is a guidance tool, not a clinical or diagnostic test, and it is not a validated psychometric instrument. It shows your interests and self-rated strengths today. They can change. Use it to start a conversation with a counsellor, a teacher and your family, not to make a final decision.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {restored && done > 0 && done < TOTAL ? (
              <>
                <button type="button" onClick={() => start(false)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white hover:bg-[#C90D11]">Continue ({done} of {TOTAL} answered) <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                <button type="button" onClick={() => start(true)} className="min-h-11 rounded-xl px-5 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-300 hover:ring-[#012858]">Start again</button>
              </>
            ) : (
              <button type="button" onClick={() => start(true)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#E0170F] px-7 py-3 text-sm font-bold text-white hover:bg-[#C90D11]">Start the quiz <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
            )}
          </div>
          </div>
          <div className="hidden md:block">
            <RiasecHex scores={{ R: 38, I: 82, A: 55, S: 30, E: 64, C: 46 }} label="Example of the interest shape you will get at the end" />
            <p className="mt-2 text-center text-xs text-gray-600">An example shape. Yours will be different.</p>
          </div>
        </div>
      )}

      {phase === "quiz" && (
        <div className="rounded-3xl bg-white p-5 ring-1 ring-gray-200 sm:p-8">
          <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
            <span>Page {page + 1} of {PAGES}</span>
            <span className="tabular-nums">{done} of {TOTAL} answered</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200" role="progressbar" aria-valuemin={0} aria-valuemax={TOTAL} aria-valuenow={done} aria-label="Quiz progress">
            <div className="h-full rounded-full bg-[#012858] transition-all duration-500" style={{ width: `${(done / TOTAL) * 100}%` }} />
          </div>
          <p className="mt-5 text-sm text-gray-700">
            {pageQuestions[0].kind === "interest" ? "How much does each statement sound like you? Go with your first feeling." : "How true is each statement for you right now?"}
          </p>

          <div key={page} className="quiz-page-in mt-4 space-y-5">
            {pageQuestions.map((q, i) => {
              const scale = q.kind === "interest" ? SCALE_INTEREST : SCALE_STRENGTH
              return (
                <fieldset key={q.id} className="rounded-2xl bg-[#F6F8FB] p-4 sm:p-5">
                  <legend className="px-1 text-base font-semibold text-gray-900"><span className="mr-2 text-gray-500 tabular-nums">{q.id + 1}.</span>{q.text}</legend>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-5">
                    {scale.map((label, idx) => {
                      const v = idx + 1
                      const on = answers[q.id] === v
                      return (
                        <label key={v} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm ring-1 transition-colors focus-within:ring-2 focus-within:ring-[#012858] ${on ? "quiz-pick bg-[#012858] font-semibold text-white ring-[#012858]" : "bg-white text-gray-800 ring-gray-300 hover:ring-[#012858]"}`}>
                          <input type="radio" name={`q-${q.id}`} value={v} checked={on} onChange={() => setAnswer(q.id, v)} className="sr-only" aria-label={`${label}, ${v} of 5`} data-first={i === 0 && idx === 0 ? "1" : undefined} />
                          <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${on ? "bg-white text-[#012858]" : "bg-gray-100 text-gray-700"}`}>{v}</span>
                          <span>{label}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              )
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={() => (page === 0 ? setPhase("intro") : goTo(page - 1))} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-300 hover:ring-[#012858]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back</button>
            {page < PAGES - 1 ? (
              <button type="button" disabled={!pageDone} onClick={() => goTo(page + 1)} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white hover:bg-[#C90D11] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600">Next <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
            ) : (
              <button type="button" disabled={done < TOTAL} onClick={finish} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white hover:bg-[#C90D11] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600">See my results <Check className="h-4 w-4" aria-hidden="true" /></button>
            )}
          </div>
          {!pageDone && <p className="mt-3 text-xs text-gray-600" aria-live="polite">Answer every statement on this page to continue.</p>}
        </div>
      )}

      {phase === "result" && result && (
        <div className="space-y-6">
          <div className="quiz-page-in grid gap-6 rounded-3xl bg-[#012858] p-6 text-white sm:p-8 md:grid-cols-[1.3fr_1fr] md:items-center">
           <div>
            <p className="text-xs font-bold uppercase tracking-widest text-orange-200">Your interest code</p>
            <p className="mt-1 font-[family-name:var(--font-fraunces)] text-5xl font-bold tracking-wide">{result.code}</p>
            <p className="mt-3 max-w-2xl text-blue-100">
              {result.code.split("").map((c) => result.interests.find((i) => i.code === c)).filter(Boolean).map((i) => `${i!.name} (${i!.nickname})`).join(", ")}. These are the kinds of work you said you enjoy most. {result.closeCall ? "Your top two study paths are close, so explore both." : ""}
            </p>
           </div>
           <div className="rounded-2xl bg-white p-4">
            <RiasecHex scores={Object.fromEntries(result.interests.map((i) => [i.code, i.score])) as Record<"R" | "I" | "A" | "S" | "E" | "C", number>} />
           </div>
          </div>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby="fit-heading">
            <h2 id="fit-heading" className="text-xl font-bold text-[#012858]">Study paths that fit your answers</h2>
            <p className="mt-1 text-sm text-gray-700">Scored from 0 to 100 against your interests and strengths. A higher number means a closer match, not a guarantee.</p>
            <ol className="mt-5 space-y-6">
              {result.streams.slice(0, 4).map((s, i) => {
                const info = STREAMS.find((x) => x.id === s.id)!
                return (
                  <li key={s.id}>
                    <Bar label={`${i + 1}. ${s.name}`} value={s.fit} tone={i === 0 ? "red" : "navy"} />
                    {i < 3 && (
                      <>
                        <p className="mt-2 text-sm text-gray-700">{info.what}</p>
                        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                          {info.links.map((l) => <Link key={l.href} href={l.href} className="text-[#C90D11] hover:underline">{l.label} →</Link>)}
                        </p>
                      </>
                    )}
                  </li>
                )
              })}
            </ol>
            <p className="mt-6 text-sm text-gray-700">Lowest matches today: {result.streams.slice(-2).map((s) => s.name).join(" and ")}. That does not rule them out. Interests change, and many careers sit between paths.</p>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200" aria-labelledby="int-heading">
              <h2 id="int-heading" className="text-lg font-bold text-[#012858]">Your interests</h2>
              <div className="mt-4 space-y-4">{[...result.interests].sort((a, b) => b.score - a.score).map((i) => <Bar key={i.code} label={`${i.name} (${i.nickname})`} value={i.score} />)}</div>
            </section>
            <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200" aria-labelledby="str-heading">
              <h2 id="str-heading" className="text-lg font-bold text-[#012858]">Your self-rated strengths</h2>
              <div className="mt-4 space-y-4">{[...result.strengths].sort((a, b) => b.score - a.score).map((s) => <Bar key={s.code} label={s.name} value={s.score} />)}</div>
              <p className="mt-4 text-xs text-gray-600">These are how you rate yourself, not a measured ability. Marks, practice and feedback from teachers tell you more.</p>
            </section>
          </div>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby="next-heading">
            <h2 id="next-heading" className="text-xl font-bold text-[#012858]">What to do next</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-gray-800">
              <li>Read the guide for your top path and note the entrance exams and dates.</li>
              <li>Turn it into a dated plan with the sources attached: <Link href="/my-admission-plan" className="font-bold text-[#C90D11] hover:underline">build my admission plan</Link>.</li>
              <li>See how you work, not just what you enjoy: <Link href="/psychometric-test" className="font-bold text-[#C90D11] hover:underline">take the psychometric test</Link>.</li>
              <li>Talk it through with a counsellor. The first call is free: <Link href="/counselling" className="font-bold text-[#C90D11] hover:underline">book counselling</Link>.</li>
            </ol>
            <div className="mt-5 flex flex-wrap gap-3 print:hidden">
              <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-300 hover:ring-[#012858]"><Printer className="h-4 w-4" aria-hidden="true" /> Print or save as PDF</button>
              <button type="button" onClick={copyLink} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-300 hover:ring-[#012858]"><Copy className="h-4 w-4" aria-hidden="true" /> {copied ? "Link copied" : "Copy my result link"}</button>
              <button type="button" onClick={retake} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#C90D11] hover:underline"><RotateCcw className="h-4 w-4" aria-hidden="true" /> Retake</button>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-gray-600">Reminder: this is a guidance tool, not a clinical or diagnostic test. The result link holds your answers in the link itself, so only share it with people you trust.</p>
          </section>
        </div>
      )}
    </div>
  )
}
