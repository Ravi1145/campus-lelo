// Parse the human-readable dates in src/data/exams.ts into a status timeline.
// Formats handled: "Nov 29, 2026", "Apr 20 – May 15, 2026", "Dec 15, 2025 – May 10, 2026",
// "Dec 13, 19 & 26, 2026", "Nov 2 – Dec 20, 2026 (testing window)". Anything else → no date.

const MONTHS: Record<string, number> = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 }
const UNCONFIRMED = /awaited|to be confirmed|several sessions|see |per session|check /i
const OPEN_UNTIL = /\b(till|until|closes)\b/i

/** All "Mon D" dates in a string, each paired with the next 4-digit year after it (UTC ms). */
export function parseDates(text: string): number[] {
  if (!text || UNCONFIRMED.test(text)) return []
  const out: number[] = []
  const re = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2})\b/gi
  for (const m of text.matchAll(re)) {
    const year = text.slice(m.index!).match(/\b(20\d\d)\b/)
    if (!year) continue
    out.push(Date.UTC(+year[1], MONTHS[m[1].slice(0, 3).toLowerCase()], +m[2]))
  }
  return out
}

export type ExamStatus = "open" | "upcoming" | "ongoing" | "completed" | "awaited"

export interface ExamTimeline {
  status: ExamStatus
  examStart?: number
  examEnd?: number
  appStart?: number
  appEnd?: number
  /** 0–1 position between registration opening and exam day */
  progress?: number
  daysTo?: number
}

const DAY = 86_400_000

export function examTimeline(applicationDate: string, examDate: string, now: number): ExamTimeline {
  const ex = parseDates(examDate)
  const ap = parseDates(applicationDate)
  if (!ex.length) return { status: "awaited" }
  const examStart = Math.min(...ex), examEnd = Math.max(...ex)
  // "PBT till Dec 14; CBT till Dec 21" → registration is open until the last date (no start date)
  const openUntil = OPEN_UNTIL.test(applicationDate)
  const appStart = ap.length && !openUntil ? Math.min(...ap) : undefined
  const appEnd = ap.length ? Math.max(...ap) : undefined
  const today = Math.floor(now / DAY) * DAY
  const base = { examStart, examEnd, appStart, appEnd }
  const progress = appStart !== undefined && examStart > appStart ? Math.min(1, Math.max(0, (today - appStart) / (examStart - appStart))) : undefined
  if (examEnd < today) return { ...base, status: "completed", progress: 1 }
  if (examStart <= today) return { ...base, status: "ongoing", progress: 1, daysTo: Math.round((examEnd - today) / DAY) }
  if (appEnd !== undefined && today <= appEnd && (appStart === undefined ? openUntil : appStart <= today))
    return { ...base, status: "open", progress, daysTo: Math.round((appEnd - today) / DAY) }
  return { ...base, status: "upcoming", progress, daysTo: Math.round((examStart - today) / DAY) }
}
