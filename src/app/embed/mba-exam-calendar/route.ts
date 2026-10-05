import { calendarLastVerified, examCalendarRows, formatCalendarDate, CALENDAR_PATH } from "@/lib/mbaCalendar"

export const dynamic = "force-static"
export const revalidate = 3600

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

// Embeddable MBA exam calendar (loaded in an <iframe> on other sites). A plain
// route handler so it renders without the site header/footer. Framing is
// allowed for /embed/* only (see next.config.ts); the page is noindex.
export function GET() {
  const rows = examCalendarRows()
  const verified = calendarLastVerified()
  const body = rows
    .map(
      (r) => `<tr>
<th scope="row"><a href="${BASE}/exams/${esc(r.slug)}" target="_top">${esc(r.name)}</a><small>${esc(r.cycle)}</small></th>
<td><b>Registration</b> ${esc(r.registration)}<br><b>Exam</b> ${esc(r.examDate)}${r.note ? `<small class="note">${esc(r.note)}</small>` : ""}</td>
</tr>`,
    )
    .join("\n")

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,follow"><title>MBA entrance exam calendar</title>
<style>
*{box-sizing:border-box}body{margin:0;font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;background:#fff}
header{background:#012858;color:#fff;padding:12px 14px}header b{display:block;font-size:15px}header span{font-size:12px;color:#cbd5e1}
table{width:100%;border-collapse:collapse}tr+tr{border-top:1px solid #e5e7eb}
th,td{text-align:left;vertical-align:top;padding:10px 14px}th{width:34%;font-weight:700}
th a{color:#012858;text-decoration:none}th a:hover{text-decoration:underline}
small{display:block;font-weight:400;color:#475569;font-size:12px}small.note{color:#92400e;margin-top:2px}
td b{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#475569;margin-right:4px}
footer{padding:10px 14px;border-top:1px solid #e5e7eb;font-size:12px;color:#475569;background:#f8fafc}footer a{color:#C90D11;font-weight:700;text-decoration:none}
@media(max-width:480px){th{width:auto;display:block;padding-bottom:0}td{display:block;padding-top:4px}}
</style></head><body>
<header><b>MBA entrance exam calendar 2026–27</b><span>Verified${verified ? ` ${esc(formatCalendarDate(verified))}` : ""} · dates not yet confirmed are marked</span></header>
<table><tbody>
${body}
</tbody></table>
<footer>Data by <a href="${BASE}${CALENDAR_PATH}" target="_top">CampusLelo</a> · <a href="${BASE}/exams" target="_top">All exam guides</a></footer>
</body></html>`

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  })
}
