import { APTITUDE, AREAS, PERSONALITY, TRAITS, type Area, type Trait } from "@/data/career/psychometric"

export interface PsyState { p: number[]; a: number[] }

export const P_TOTAL = PERSONALITY.length
export const A_TOTAL = APTITUDE.length
export const STEPS = P_TOTAL + A_TOTAL

export function emptyState(): PsyState {
  return { p: new Array(P_TOTAL).fill(0), a: new Array(A_TOTAL).fill(-1) }
}

export function answered(s: PsyState): number {
  return s.p.filter((n) => n > 0).length + s.a.filter((n) => n >= 0).length
}

export function parseState(raw: string | null): PsyState | null {
  if (!raw) return null
  try {
    const j = JSON.parse(raw) as PsyState
    if (Array.isArray(j.p) && Array.isArray(j.a) && j.p.length === P_TOTAL && j.a.length === A_TOTAL) return j
  } catch { /* ignore */ }
  return null
}

export type Level = "high" | "middle" | "low"

export interface PsyResult {
  traits: { code: Trait; name: string; score: number; level: Level; text: string; workHigh: string }[]
  aptitude: { code: Area; name: string; correct: number; total: number }[]
  review: { id: number; text: string; picked: string; right: string; ok: boolean; why: string }[]
  aptitudeTotal: number
}

function level(score: number): Level {
  return score >= 67 ? "high" : score <= 33 ? "low" : "middle"
}

export function scorePsy(s: PsyState): PsyResult {
  const traits = TRAITS.map((t) => {
    const items = PERSONALITY.filter((i) => i.trait === t.code)
    const sum = items.reduce((acc, i) => {
      const v = s.p[i.id]
      return acc + (i.reverse ? 6 - v : v)
    }, 0)
    const sc = Math.round(((sum - items.length) / (items.length * 4)) * 100)
    const lv = level(sc)
    const text = lv === "high" ? t.high : lv === "low" ? t.low : "You sit between the two ends here, so you can lean either way depending on the situation."
    return { code: t.code, name: t.name, score: sc, level: lv, text, workHigh: t.workHigh }
  })

  const aptitude = AREAS.map((ar) => {
    const items = APTITUDE.filter((q) => q.area === ar.code)
    return { code: ar.code, name: ar.name, total: items.length, correct: items.filter((q) => s.a[q.id] === q.answer).length }
  })

  const review = APTITUDE.map((q) => ({
    id: q.id, text: q.text, picked: s.a[q.id] >= 0 ? q.options[s.a[q.id]] : "not answered", right: q.options[q.answer], ok: s.a[q.id] === q.answer, why: q.why,
  }))

  return { traits, aptitude, review, aptitudeTotal: aptitude.reduce((n, a) => n + a.correct, 0) }
}
