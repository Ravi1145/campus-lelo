import { mbaExams } from "@/data/mba/exams"

// MBA entrance-exam calendar built from the sourced exam data (src/data/mba/exams.ts).
// Used by the calendar page, its CSV download and the embeddable widget, so all
// three always show the same verified values. Nothing is written by hand here.

export interface CalendarRow {
  slug: string
  name: string
  fullName: string
  cycle: string
  registration: string
  examDate: string
  /** Shown when the current cycle's dates are not officially confirmed */
  note: string
  frequency: string
  officialSite: string
}

export function examCalendarRows(): CalendarRow[] {
  return mbaExams.map((e) => {
    const reg = e.keyDates.find((k) => /registration|application/i.test(k.label))
    const exam = e.keyDates.find((k) => /exam|test|window|session|attempt/i.test(k.label) && !/registration|result/i.test(k.label))
    return {
      slug: e.slug,
      name: e.name,
      fullName: e.fullName,
      cycle: e.cycleLabel,
      // No sourced date: say so plainly (the note, when present, explains why)
      registration: reg?.value ?? (e.datesNote ? "Not yet confirmed" : "See exam guide"),
      examDate: exam?.value ?? (e.datesNote ? "Not yet confirmed" : "See exam guide"),
      note: e.datesNote ?? "",
      frequency: e.frequency,
      officialSite: e.officialSite,
    }
  })
}

/** Latest "checked on" date across all key-date sources (ISO string). */
export function calendarLastVerified(): string {
  let latest = ""
  for (const e of mbaExams) for (const k of e.keyDates) if (k.source.accessed > latest) latest = k.source.accessed
  return latest
}

const csvCell = (v: string) => `"${v.replace(/"/g, '""')}"`

export function calendarCsv(): string {
  const head = ["exam", "full_name", "cycle", "registration", "exam_date", "frequency", "note", "official_site", "guide_url"]
  const rows = examCalendarRows().map((r) =>
    [r.name, r.fullName, r.cycle, r.registration, r.examDate, r.frequency, r.note, r.officialSite, `https://campuslelo.com/exams/${r.slug}`].map(csvCell).join(","),
  )
  return "﻿" + [head.join(","), ...rows].join("\r\n") + "\r\n"
}

/** "2026-10-04" → "4 Oct 2026" */
export function formatCalendarDate(iso: string): string {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export const CALENDAR_PATH = "/mba-exam-calendar"
