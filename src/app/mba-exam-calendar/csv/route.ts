import { calendarCsv } from "@/lib/mbaCalendar"

export const dynamic = "force-static"
export const revalidate = 3600

// Free CSV download of the MBA exam calendar (same data as the page and the widget).
export function GET() {
  return new Response(calendarCsv(), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="mba-exam-calendar-campuslelo.csv"',
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
