"use client"

import { useMemo, useState } from "react"
import { AlertTriangle, CheckCircle2, CircleHelp, XCircle } from "lucide-react"
import { CATEGORIES, checkRules, type Category, type CheckRule, type Minimums } from "@/data/mba/checker"

// Compares your CAT percentiles with the minimums institutes have published.
// It runs in the browser only: nothing you type is sent anywhere.

type Field = "qa" | "dilr" | "vrc" | "overall"
const FIELDS: { key: Field; label: string; hint: string }[] = [
  { key: "qa", label: "QA", hint: "Quantitative Ability" },
  { key: "dilr", label: "DILR", hint: "Data Interpretation and Logical Reasoning" },
  { key: "vrc", label: "VRC", hint: "Verbal Ability and Reading Comprehension" },
  { key: "overall", label: "Overall", hint: "Overall percentile" },
]

type Status = "meets" | "below" | "needs-input" | "not-comparable" | "no-category"
interface Result { rule: CheckRule; status: Status; lines: { label: string; need: number; have?: number; ok?: boolean }[]; missing: Field[] }

function evaluate(rule: CheckRule, category: Category, values: Partial<Record<Field, number>>): Result {
  if (rule.notComparable) return { rule, status: "not-comparable", lines: [], missing: [] }
  const mins: Minimums | undefined = rule.minimums[category]
  if (!mins) return { rule, status: "no-category", lines: [], missing: [] }
  const lines: Result["lines"] = []
  const missing: Field[] = []
  for (const f of FIELDS) {
    const need = mins[f.key]
    if (need === undefined) continue
    const have = values[f.key]
    if (have === undefined) { missing.push(f.key); lines.push({ label: f.label, need }); continue }
    lines.push({ label: f.label, need, have, ok: have >= need })
  }
  const failed = lines.some((l) => l.ok === false)
  const status: Status = failed ? "below" : missing.length ? "needs-input" : "meets"
  return { rule, status, lines, missing }
}

const BADGE: Record<Status, { text: string; cls: string; icon: typeof CheckCircle2 }> = {
  meets: { text: "Meets every published minimum", cls: "bg-emerald-50 text-emerald-800 ring-emerald-200", icon: CheckCircle2 },
  below: { text: "Below a published minimum", cls: "bg-red-50 text-red-800 ring-red-200", icon: XCircle },
  "needs-input": { text: "Add the missing score to finish", cls: "bg-amber-50 text-amber-900 ring-amber-200", icon: CircleHelp },
  "not-comparable": { text: "Cannot compare with percentiles", cls: "bg-gray-100 text-gray-800 ring-gray-200", icon: CircleHelp },
  "no-category": { text: "No published figure for this category", cls: "bg-gray-100 text-gray-800 ring-gray-200", icon: CircleHelp },
}

const inputCls = "w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-base text-gray-900 focus:border-[#012858] focus:outline-none focus:ring-2 focus:ring-[#012858]/25"

export default function CutoffChecker() {
  const [category, setCategory] = useState<Category>("General")
  const [raw, setRaw] = useState<Record<Field, string>>({ qa: "", dilr: "", vrc: "", overall: "" })
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})

  const values = useMemo(() => {
    const out: Partial<Record<Field, number>> = {}
    const errs: Partial<Record<Field, string>> = {}
    for (const f of FIELDS) {
      const s = raw[f.key].trim()
      if (!s) continue
      const n = Number(s)
      if (!Number.isFinite(n) || n < 0 || n > 100) errs[f.key] = "Enter a percentile between 0 and 100."
      else out[f.key] = n
    }
    return { out, errs }
  }, [raw])

  const any = Object.keys(values.out).length > 0 && Object.keys(values.errs).length === 0
  const results = useMemo(() => (any ? checkRules.map((r) => evaluate(r, category, values.out)) : []), [any, category, values.out])

  return (
    <div>
      <form className="rounded-3xl bg-white p-5 ring-1 ring-gray-200 sm:p-7" onSubmit={(e) => { e.preventDefault(); setErrors(values.errs) }} aria-label="CAT percentile cut-off checker" noValidate>
        <fieldset>
          <legend className="text-sm font-bold text-[#012858]">Your CAT percentiles</legend>
          <p className="mt-1 text-sm text-gray-600">Enter what you have. Leave a box empty if you do not know it yet.</p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label htmlFor={`chk-${f.key}`} className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-700">{f.label}</label>
                <input
                  id={`chk-${f.key}`}
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="e.g. 92.5"
                  value={raw[f.key]}
                  onChange={(e) => setRaw((r) => ({ ...r, [f.key]: e.target.value }))}
                  aria-describedby={`chk-${f.key}-hint`}
                  aria-invalid={values.errs[f.key] ? true : undefined}
                  className={inputCls}
                />
                <p id={`chk-${f.key}-hint`} className={`mt-1 text-[11px] ${values.errs[f.key] ? "font-semibold text-red-700" : "text-gray-600"}`}>{values.errs[f.key] ?? f.hint}</p>
              </div>
            ))}
          </div>
        </fieldset>
        <div className="mt-5 max-w-xs">
          <label htmlFor="chk-category" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-700">Category</label>
          <select id="chk-category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className={inputCls}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <p className="mt-4 text-xs text-gray-600">Nothing you type leaves your browser. We do not save it.</p>
        <span className="sr-only" aria-live="polite">{errors && Object.keys(values.errs).length ? "Fix the highlighted percentiles." : ""}</span>
      </form>

      <div className="mt-6" aria-live="polite">
        {!any && <p className="rounded-2xl bg-white p-5 text-sm text-gray-700 ring-1 ring-gray-200">Enter at least one percentile to see how it compares with each published minimum.</p>}
        {any && (
          <ul className="space-y-4">
            {results.map((r) => {
              const b = BADGE[r.status]
              const Icon = b.icon
              return (
                <li key={r.rule.id} className="rounded-3xl bg-white p-5 ring-1 ring-gray-200 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#012858]">{r.rule.institution}</h3>
                      <p className="mt-0.5 text-xs text-gray-600">{r.rule.examCycle}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${b.cls}`}>
                      <Icon className="h-4 w-4" aria-hidden="true" /> {b.text}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-700">{r.rule.basis}</p>
                  {r.rule.notComparable && <p className="mt-2 rounded-xl bg-gray-50 p-3 text-sm text-gray-700">{r.rule.notComparable}</p>}
                  {r.lines.length > 0 && (
                    <div className="mt-3 overflow-x-auto">
                      <table className="w-full min-w-[22rem] text-sm">
                        <caption className="sr-only">{r.rule.short}: your percentile against the published minimum, {category} category</caption>
                        <thead><tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-600"><th scope="col" className="py-2 pr-3">Part</th><th scope="col" className="py-2 pr-3">Published minimum</th><th scope="col" className="py-2 pr-3">You</th><th scope="col" className="py-2">Result</th></tr></thead>
                        <tbody>
                          {r.lines.map((l) => (
                            <tr key={l.label} className="border-b border-gray-100 last:border-0">
                              <th scope="row" className="py-2 pr-3 font-semibold text-gray-900">{l.label}</th>
                              <td className="py-2 pr-3 tabular-nums text-gray-800">{l.need}</td>
                              <td className="py-2 pr-3 tabular-nums text-gray-800">{l.have ?? "not entered"}</td>
                              <td className="py-2 font-semibold">
                                {l.ok === undefined ? <span className="text-gray-600">Add to check</span> : l.ok
                                  ? <span className="text-emerald-700">Meets</span>
                                  : <span className="text-red-700">{(l.need - (l.have ?? 0)).toFixed(1)} short</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <p className="mt-3 flex gap-2 text-xs leading-relaxed text-gray-600"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" aria-hidden="true" />{r.rule.caveat}</p>
                  {r.rule.sources.length > 0 && (
                    <p className="mt-2 text-xs text-gray-600">
                      Source{r.rule.sources.length > 1 ? "s" : ""}:{" "}
                      {r.rule.sources.map((s, i) => (
                        <span key={s.url}>{i > 0 && " · "}<a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C90D11]">{s.label}</a> (checked {s.accessed})</span>
                      ))}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
