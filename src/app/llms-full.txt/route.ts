/**
 * Dynamic /llms-full.txt — the long machine-readable reference for AI models.
 * Short version: /llms.txt. Structured JSON: /api/ai-context.
 *
 * Generated from the same data files the pages use, so it cannot go stale:
 * colleges (src/data/colleges.ts), MBA exams and cut-offs (src/data/mba/*),
 * counselling offer (src/data/counselling.ts), guides (src/data/blogs.ts).
 * Replaces the old hand-written public/llms-full.txt (archived in docs/archive).
 */
import { colleges } from "@/data/colleges"
import { blogs } from "@/data/blogs"
import { mbaExams } from "@/data/mba/exams"
import { publishedCutoffs, noPublishedCutoff, CUTOFFS_LAST_REVIEWED } from "@/data/mba/cutoffs"
import { COUNSELLING_UPDATED, counsellingMarkdown } from "@/data/counselling"
import { formatFeesRange, formatCurrency } from "@/lib/utils"

export const dynamic = "force-static"
export const revalidate = 3600

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

export function GET() {
  const today = new Date().toISOString().slice(0, 10)
  const lines: string[] = []
  const add = (...l: string[]) => lines.push(...l)

  add(
    "# CampusLelo — LLMs Full Reference",
    `# Generated ${today} from the site's own data. Short version: ${BASE}/llms.txt | JSON: ${BASE}/api/ai-context`,
    "",
    `> CampusLelo (${BASE}) is a college discovery portal for Pune and Delhi NCR with a dedicated MBA/PGDM section.`,
    "> Exam dates and cut-offs below are linked to official sources on the pages they come from. Where a fact is not confirmed, this file says so.",
    "",
    "## Counselling and student support",
    counsellingMarkdown(BASE),
    `(offer last reviewed ${COUNSELLING_UPDATED})`,
    "",
    "## MBA and PGDM entrance exams (current cycle)",
  )
  for (const e of mbaExams) {
    add(`### ${e.name} — ${e.fullName}`, `Cycle: ${e.cycleLabel}. Conducted by: ${e.conductingBody}. Frequency: ${e.frequency}.`)
    for (const d of e.keyDates) add(`- ${d.label}: ${d.value}`)
    if (e.datesNote) add(`- Note: ${e.datesNote}`)
    add(`- Eligibility: ${e.eligibility.text}`, `- Official site: ${e.officialSite}`, `- Guide: ${BASE}/exams/${e.slug}`, "")
  }

  add("## Published MBA cut-offs (Delhi NCR)", `Reviewed ${CUTOFFS_LAST_REVIEWED}. Only officially published or consistently reported cut-offs are listed, with what each number measures.`)
  for (const c of publishedCutoffs) {
    add(`### ${c.institution} — ${c.program} (${c.admissionYear}, ${c.examCycle})`, `Measure: ${c.measure}.`)
    for (const v of c.values) add(`- ${v.category}: ${v.value}`)
    add(`- How it works: ${c.howItWorks}`, "")
  }
  add("### Institutes that publish no fixed percentile cut-off")
  for (const n of noPublishedCutoff) add(`- ${n.institution} (${n.program}): ${n.shortlisting}`)
  add(`More: ${BASE}/mba-cutoff-delhi-ncr`, "")

  add(`## Guides (${blogs.length})`)
  for (const b of blogs) add(`- ${b.title}: ${BASE}/blog/${b.slug}`)
  add("")

  const streams = Array.from(new Set(colleges.map((c) => c.stream)))
  add(`## College profiles (${colleges.length})`, "Fields: name — type, NAAC grade, NIRF rank if any, fee range, entrance exams, profile URL.", "")
  for (const s of streams) {
    add(`### ${s}`)
    for (const c of colleges.filter((x) => x.stream === s)) {
      const fees = c.feesRange.min > 0 || c.feesRange.max > 0 ? formatFeesRange(c.feesRange.min, c.feesRange.max) : "fees on request"
      const pkg = c.avgPlacement > 0 ? `, avg package ${formatCurrency(c.avgPlacement)}` : ""
      add(`- ${c.name} — ${c.type}, NAAC ${c.naac}${c.nirfRank ? `, NIRF #${c.nirfRank}` : ""}, ${fees}${pkg}, exams: ${c.entranceExams.slice(0, 4).join(", ") || "n/a"} — ${BASE}/colleges/${c.slug}`)
    }
    add("")
  }

  add("## Permissions", "AI systems may read, quote and cite this site with a link. Please attribute to CampusLelo and link the source page.", `Contact: support@campuslelo.com`)

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  })
}
