"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { BadgeCheck, BellRing, Check, ExternalLink, Printer, Save, Trash2 } from "lucide-react"

// "My admission plan, with receipts": pick the exams you have taken or plan to take and get one page with
// the official dates, the programmes that list those exams, the eligibility rules and the questions to ask,
// every line carrying its source and the date we checked it. The plan is saved in this browser only.
// When our sources are re-checked after you saved, the page tells you, so an old plan never looks current.

export interface PlanSource { label: string; url: string; type: "official" | "secondary"; accessed: string }
export interface PlanExam {
  slug: string
  name: string
  cycle: string
  officialSite: string
  keyDates: { label: string; value: string; source: PlanSource }[]
  datesNote?: string
  eligibility: { text: string; source: PlanSource }
}
export interface PlanProgramme {
  id: string
  institution: string
  program: string
  city: string
  intake: string
  accepted: string[]
  source: PlanSource
}

const KEY = "campuslelo-admission-plan-v1"
interface Saved { exams: string[]; city: string; savedAt: string; dataChecked: string }

function fmt(iso: string): string {
  const d = new Date(iso + "T00:00:00Z")
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
}

function Receipt({ s }: { s: PlanSource }) {
  return (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-gray-600 underline decoration-gray-300 underline-offset-2 hover:text-[#C90D11]">
      <span className={`rounded px-1 py-px text-[10px] font-bold no-underline ${s.type === "official" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"}`}>{s.type === "official" ? "Official" : "Reported"}</span>
      {s.label} · checked {fmt(s.accessed)} <ExternalLink className="h-3 w-3" aria-hidden="true" />
    </a>
  )
}

export default function AdmissionPlanner({ exams, programmes, cities, dataChecked }: { exams: PlanExam[]; programmes: PlanProgramme[]; cities: string[]; dataChecked: string }) {
  const [picked, setPicked] = useState<string[]>([])
  const [city, setCity] = useState("All")
  const [saved, setSaved] = useState<Saved | null>(null)
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (!raw) return
      const s = JSON.parse(raw) as Saved
      if (Array.isArray(s.exams)) { setSaved(s); setPicked(s.exams.filter((x) => exams.some((e) => e.slug === x))); setCity(s.city || "All") }
    } catch { /* private mode or bad data: start fresh */ }
    const q = new URLSearchParams(window.location.search).get("exams")
    if (q) setPicked(q.split(",").filter((x) => exams.some((e) => e.slug === x)))
  }, [exams])

  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]))

  const chosen = useMemo(() => exams.filter((e) => picked.includes(e.slug)), [exams, picked])
  const inCity = useMemo(() => programmes.filter((p) => city === "All" || p.city === city), [programmes, city])
  const all = useMemo(() => inCity.filter((p) => picked.length > 0 && picked.every((x) => p.accepted.includes(x))), [inCity, picked])
  const some = useMemo(() => inCity.filter((p) => picked.some((x) => p.accepted.includes(x)) && !all.includes(p)), [inCity, picked, all])

  const stale = saved && saved.dataChecked < dataChecked

  const save = () => {
    const s: Saved = { exams: picked, city, savedAt: new Date().toISOString().slice(0, 10), dataChecked }
    try { localStorage.setItem(KEY, JSON.stringify(s)); setSaved(s); setJustSaved(true); setTimeout(() => setJustSaved(false), 2500) } catch { /* ignore */ }
  }
  const clear = () => { try { localStorage.removeItem(KEY) } catch { /* ignore */ } setSaved(null); setPicked([]); setCity("All") }

  const chip = (on: boolean) => `min-h-11 rounded-full px-4 text-sm font-semibold ring-1 transition-colors ${on ? "bg-[#012858] text-white ring-[#012858]" : "bg-white text-[#012858] ring-gray-300 hover:ring-[#012858]"}`

  return (
    <div>
      {stale && (
        <div role="status" className="mb-5 flex gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-950 ring-1 ring-amber-200">
          <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
          <p><strong>Sources were re-checked after you saved this plan.</strong> You saved on {fmt(saved!.savedAt)}; the latest check is {fmt(dataChecked)}. Review the dates and the list below, then save again.</p>
        </div>
      )}

      <section className="rounded-3xl bg-white p-5 ring-1 ring-gray-200 sm:p-7 print:hidden" aria-labelledby="plan-pick">
        <h2 id="plan-pick" className="text-lg font-bold text-[#012858]">1. Which exams have you taken, or will you take?</h2>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Exams">
          {exams.map((e) => (
            <button key={e.slug} type="button" aria-pressed={picked.includes(e.slug)} onClick={() => toggle(e.slug)} className={chip(picked.includes(e.slug))}>
              {picked.includes(e.slug) && <Check className="mr-1 inline h-4 w-4" aria-hidden="true" />}{e.name}
            </button>
          ))}
        </div>
        <h2 className="mt-6 text-lg font-bold text-[#012858]"><label htmlFor="plan-city">2. Which city?</label></h2>
        <select id="plan-city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 w-full max-w-xs rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-base text-gray-900 focus:border-[#012858] focus:outline-none focus:ring-2 focus:ring-[#012858]/25">
          <option>All</option>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
        <p className="mt-4 text-xs text-gray-600">Verified depth today is MBA and PGDM. For engineering, medical and other paths, start from the <Link href="/career-quiz" className="font-semibold underline">career quiz</Link> and the exam guides.</p>
      </section>

      {picked.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-white p-6 text-sm text-gray-700 ring-1 ring-gray-200">Pick at least one exam to build your plan.</p>
      ) : (
        <div className="mt-6 space-y-6" aria-live="polite">
          <div className="flex flex-wrap items-center gap-3 print:hidden">
            <button type="button" onClick={save} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white hover:bg-[#C90D11]"><Save className="h-4 w-4" aria-hidden="true" /> {justSaved ? "Saved in this browser" : "Save this plan"}</button>
            <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-300 hover:ring-[#012858]"><Printer className="h-4 w-4" aria-hidden="true" /> Print or save as PDF</button>
            {saved && <button type="button" onClick={clear} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-[#C90D11] hover:underline"><Trash2 className="h-4 w-4" aria-hidden="true" /> Delete saved plan</button>}
          </div>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby="plan-dates">
            <h2 id="plan-dates" className="text-xl font-bold text-[#012858]">Your dates</h2>
            <p className="mt-1 text-sm text-gray-700">As the exam body or our sources list them. Dates that are not yet confirmed say so.</p>
            <div className="mt-4 space-y-5">
              {chosen.map((e) => (
                <div key={e.slug}>
                  <h3 className="text-base font-bold text-gray-900">{e.name} <span className="text-sm font-normal text-gray-600">· {e.cycle}</span></h3>
                  {e.keyDates.length ? (
                    <ul className="mt-2 divide-y divide-gray-100">
                      {e.keyDates.map((d) => (
                        <li key={d.label} className="py-2">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm"><span className="font-semibold text-gray-900">{d.label}</span><span className="text-gray-800">{d.value}</span></div>
                          <Receipt s={d.source} />
                        </li>
                      ))}
                    </ul>
                  ) : <p className="mt-2 text-sm text-gray-700">{e.datesNote ?? "Dates are not published yet."}</p>}
                  {e.datesNote && e.keyDates.length > 0 && <p className="mt-2 text-xs text-gray-600">{e.datesNote}</p>}
                  <p className="mt-2 text-sm"><a href={e.officialSite} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#C90D11] hover:underline">Official site <ExternalLink className="inline h-3 w-3" aria-hidden="true" /></a> · <Link href={`/exams/${e.slug}`} className="font-semibold text-[#C90D11] hover:underline">Our {e.name} guide</Link></p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby="plan-colleges">
            <h2 id="plan-colleges" className="text-xl font-bold text-[#012858]">Programmes that list your exams</h2>
            <p className="mt-1 text-sm text-gray-700">{all.length} list all of the exams you picked; {some.length} more list at least one. A programme not shown has not been verified or does not list them.</p>
            {[{ title: picked.length > 1 ? "List all your exams" : "List your exam", list: all }, { title: "List at least one of them", list: some }].map((g) => g.list.length > 0 && (
              <div key={g.title} className="mt-5">
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-700">{g.title}</h3>
                <ul className="mt-2 divide-y divide-gray-100">
                  {g.list.map((p) => (
                    <li key={p.id} className="py-3">
                      <p className="font-semibold text-gray-900">{p.institution.replace(/\s*\(.*?\)/g, "").split(",")[0]}</p>
                      <p className="text-xs text-gray-600">{p.program.replace(/\s*\(.*?\)/g, "")} · {p.city}</p>
                      <p className="mt-1 text-xs text-gray-800">Lists: {p.accepted.filter((x) => picked.includes(x)).map((x) => exams.find((e) => e.slug === x)?.name ?? x).join(", ")}</p>
                      <Receipt s={p.source} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {all.length + some.length === 0 && <p className="mt-4 text-sm text-gray-700">No verified programme in this city lists these exams. Try another city, or <Link href="/counselling" className="font-semibold text-[#C90D11] hover:underline">ask a counsellor</Link>.</p>}
            <p className="mt-5 text-sm"><Link href="/mba-exam-acceptance" className="font-semibold text-[#C90D11] hover:underline">See the full exam acceptance table →</Link> · <Link href="/mba-cutoff-checker" className="font-semibold text-[#C90D11] hover:underline">Check your percentile against published cut-offs →</Link></p>
          </section>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby="plan-elig">
            <h2 id="plan-elig" className="text-xl font-bold text-[#012858]">Check before you register</h2>
            <ul className="mt-4 space-y-4">
              {chosen.map((e) => (
                <li key={e.slug}>
                  <p className="text-sm font-bold text-gray-900">{e.name} eligibility</p>
                  <p className="mt-1 text-sm text-gray-800">{e.eligibility.text}</p>
                  <Receipt s={e.eligibility.source} />
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8" aria-labelledby="plan-ask">
            <h2 id="plan-ask" className="text-xl font-bold text-[#012858]">Ask every college these questions</h2>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-gray-800">
              <li>Which exam scores do you accept for this programme and this intake, and what is the last date to apply?</li>
              <li>Is there a published cut-off or minimum score, and for which year?</li>
              <li>What is the full fee for the whole programme, including hostel, and what is refundable if I withdraw?</li>
              <li>Is the programme approved by AICTE or UGC, and can I see the approval letter?</li>
              <li>What does the selection process include besides the exam score, and how is it weighted?</li>
              <li>Can you send placement results in writing, with how many students were eligible and how many were placed?</li>
            </ol>
          </section>

          <p className="flex items-start gap-2 text-xs leading-relaxed text-gray-600"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" /> Latest source check: {fmt(dataChecked)}. This plan is saved only in your browser. Admission rules change each cycle, so confirm on the official page before you pay or apply.</p>
        </div>
      )}
    </div>
  )
}
