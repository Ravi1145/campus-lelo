"use client"

import { useMemo, useState } from "react"
import { Check, Minus } from "lucide-react"

// College by exam. A tick means the institute's own page (linked) lists that exam for that programme.
// A dash means the page we checked does not list it, which is not the same as "not accepted".

export interface MatrixRow {
  id: string
  institution: string
  program: string
  city: string
  intake: string
  accepted: string[]
  route: string
  sourceUrl: string
  sourceLabel: string
  checked: string
}
export interface MatrixExam { slug: string; name: string }

export default function AcceptanceMatrix({ rows, exams, cities }: { rows: MatrixRow[]; exams: MatrixExam[]; cities: string[] }) {
  const [city, setCity] = useState("All")
  const [wanted, setWanted] = useState<string[]>([])

  const visible = useMemo(
    () => rows.filter((r) => (city === "All" || r.city === city) && wanted.every((w) => r.accepted.includes(w))),
    [rows, city, wanted],
  )
  const toggle = (slug: string) => setWanted((w) => (w.includes(slug) ? w.filter((x) => x !== slug) : [...w, slug]))

  return (
    <div>
      <div className="rounded-3xl bg-white p-5 ring-1 ring-gray-200 sm:p-6">
        <fieldset>
          <legend className="text-sm font-bold text-[#012858]">I have a score in</legend>
          <p className="mt-1 text-sm text-gray-600">Pick every exam you have taken. Only colleges that list all of them stay in the table.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {exams.map((e) => {
              const on = wanted.includes(e.slug)
              return (
                <button
                  key={e.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(e.slug)}
                  className={`min-h-11 rounded-full px-4 text-sm font-semibold ring-1 transition-colors ${on ? "bg-[#012858] text-white ring-[#012858]" : "bg-white text-[#012858] ring-gray-300 hover:ring-[#012858]"}`}
                >
                  {on && <Check className="mr-1 inline h-4 w-4" aria-hidden="true" />}{e.name}
                </button>
              )
            })}
            {wanted.length > 0 && (
              <button type="button" onClick={() => setWanted([])} className="min-h-11 rounded-full px-4 text-sm font-semibold text-[#C90D11] underline-offset-2 hover:underline">Clear</button>
            )}
          </div>
        </fieldset>
        <div className="mt-4 max-w-xs">
          <label htmlFor="mx-city" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-700">City</label>
          <select id="mx-city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-base text-gray-900 focus:border-[#012858] focus:outline-none focus:ring-2 focus:ring-[#012858]/25">
            <option>All</option>
            {cities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <p className="mt-4 text-sm font-semibold text-gray-800" aria-live="polite">{visible.length} of {rows.length} verified programmes shown</p>
      </div>

      <div className="mt-5 overflow-x-auto rounded-3xl bg-white ring-1 ring-gray-200">
        <table className="w-full min-w-[44rem] text-sm">
          <caption className="sr-only">Entrance exams accepted by each verified MBA or PGDM programme</caption>
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-700">
              <th scope="col" className="sticky left-0 z-10 bg-gray-50 px-4 py-3">Programme</th>
              {exams.map((e) => <th key={e.slug} scope="col" className="px-2 py-3 text-center">{e.name}</th>)}
              <th scope="col" className="px-4 py-3">Source</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 align-top last:border-0">
                <th scope="row" className="sticky left-0 z-10 bg-white px-4 py-3 text-left font-normal">
                  <span className="block font-semibold text-gray-900">{r.institution}</span>
                  <span className="block text-xs text-gray-600">{r.program} · {r.city} · intake {r.intake}</span>
                </th>
                {exams.map((e) => {
                  const yes = r.accepted.includes(e.slug)
                  return (
                    <td key={e.slug} className="px-2 py-3 text-center">
                      {yes
                        ? <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800"><Check className="h-4 w-4" aria-hidden="true" /><span className="sr-only">Listed</span></span>
                        : <span className="inline-flex h-7 w-7 items-center justify-center text-gray-400"><Minus className="h-4 w-4" aria-hidden="true" /><span className="sr-only">Not listed</span></span>}
                    </td>
                  )
                })}
                <td className="px-4 py-3 text-xs text-gray-700">
                  <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C90D11]">{r.sourceLabel}</a>
                  <span className="mt-0.5 block text-gray-600">checked {r.checked}</span>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr><td colSpan={exams.length + 2} className="px-4 py-8 text-center text-gray-700">No verified programme lists all of those exams in this city. Remove one exam or change the city.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
