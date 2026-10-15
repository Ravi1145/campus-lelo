import { INTERESTS, QUESTIONS, STRENGTHS, STREAMS, type Interest, type Strength } from "@/data/career/questions"

// Scores the career self-assessment. Pure functions, no network. Answers are 1 to 5 (0 = not answered).

export type Answers = number[]

export const TOTAL = QUESTIONS.length

export function emptyAnswers(): Answers {
  return new Array(TOTAL).fill(0)
}

export function encode(a: Answers): string {
  return a.map((n) => String(Math.max(0, Math.min(5, n | 0)))).join("")
}

export function decode(s: string | null | undefined): Answers | null {
  if (!s || s.length !== TOTAL || !/^[0-5]+$/.test(s)) return null
  return s.split("").map(Number)
}

export function answeredCount(a: Answers): number {
  return a.filter((n) => n > 0).length
}

export interface Result {
  interests: { code: Interest; name: string; nickname: string; score: number }[]
  strengths: { code: Strength; name: string; score: number }[]
  code: string
  streams: { id: string; name: string; fit: number }[]
  closeCall: boolean
}

function pct(sum: number, count: number): number {
  if (count === 0) return 0
  const min = count
  const max = count * 5
  return Math.round(((sum - min) / (max - min)) * 100)
}

export function score(a: Answers): Result {
  const iSum: Record<string, [number, number]> = {}
  const sSum: Record<string, [number, number]> = {}
  QUESTIONS.forEach((q, i) => {
    const v = a[i]
    if (!v) return
    const bucket = q.kind === "interest" ? iSum : sSum
    const cur = bucket[q.key] ?? [0, 0]
    bucket[q.key] = [cur[0] + v, cur[1] + 1]
  })

  const interests = INTERESTS.map((t) => ({ code: t.code, name: t.name, nickname: t.nickname, score: pct(...(iSum[t.code] ?? [0, 0])) }))
  const strengths = STRENGTHS.map((s) => ({ code: s.code, name: s.name, score: pct(...(sSum[s.code] ?? [0, 0])) }))
  const iScore = Object.fromEntries(interests.map((x) => [x.code, x.score])) as Record<Interest, number>
  const sScore = Object.fromEntries(strengths.map((x) => [x.code, x.score])) as Record<Strength, number>

  const code = [...interests].sort((x, y) => y.score - x.score).slice(0, 3).map((x) => x.code).join("")

  const streams = STREAMS.map((st) => {
    let total = 0
    let weight = 0
    for (const [k, w] of Object.entries(st.interests)) { total += (iScore[k as Interest] ?? 0) * (w as number); weight += w as number }
    for (const [k, w] of Object.entries(st.strengths)) { total += (sScore[k as Strength] ?? 0) * (w as number); weight += w as number }
    return { id: st.id, name: st.name, fit: weight ? Math.round(total / weight) : 0 }
  }).sort((x, y) => y.fit - x.fit)

  const closeCall = streams.length > 1 && streams[0].fit - streams[1].fit < 6
  return { interests, strengths, code, streams, closeCall }
}
