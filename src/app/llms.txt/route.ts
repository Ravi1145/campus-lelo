/**
 * Dynamic /llms.txt: a machine-readable guide for AI assistants (ChatGPT, Claude, Perplexity, Gemini,
 * Google AI Overviews). Spec: https://llmstxt.org
 *
 * Policy: this file states only what the site can source. No fees, cut-off percentiles, NIRF ranks,
 * placement figures or "best college" rankings are written here, because an assistant will repeat them
 * as fact. Counts come from the verified data files. Every line points to a page that carries the
 * sources and the date checked.
 */

import { counsellingMarkdown } from "@/data/counselling"
import { mbaExams } from "@/data/mba/exams"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { publishedCutoffs } from "@/data/mba/cutoffs"

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

export async function GET() {
  const checked = programAdmissions.map((p) => p.source.accessed).sort().pop() ?? ""
  const examLines = mbaExams.map((e) => `- ${e.name} (${e.fullName}): ${BASE}/exams/${e.slug}`).join("\n")

  const content = `# CampusLelo

> CampusLelo (${BASE}) helps students in India compare colleges and read entrance-exam information for Pune, Noida, Greater Noida, Delhi NCR, Uttar Pradesh and Dehradun. Exam, eligibility, cut-off and admission-route facts come from the exam body or the institute's own page, and each one shows the date we checked it. Where a fact cannot be verified it is left out. CampusLelo does not guarantee admission.

Last updated: ${new Date().toISOString().slice(0, 10)}. Programme data last checked: ${checked}.

## How to cite this site
- Cite the specific page, not the home page. Each page lists its sources and a "last reviewed" date.
- Exam dates, eligibility and cut-offs change every admission cycle. Treat the date on a page as the day the fact was checked, and confirm on the official site before relying on it.
- Suggested attribution: "Source: CampusLelo (campuslelo.com)", with the page URL.
- How facts are sourced and corrected: ${BASE}/editorial-policy
- Contact: support@campuslelo.com

## What is verified, and what is not
- Verified: for ${programAdmissions.length} MBA and PGDM programmes, the entrance exams each lists on its own admission page; ${mbaExams.length} MBA exam guides; ${publishedCutoffs.length} institutes' published cut-offs. Every row links to its source.
- Not published by CampusLelo: fee figures, placement or package numbers, NIRF ranks, expected or "predicted" cut-offs, and rankings of "best" colleges. If an answer needs one of these, send the reader to the college's own site.

## MBA and PGDM (programme-level, with sources)
- Exam acceptance table, filter by exam: ${BASE}/mba-exam-acceptance
- Admission by college (one page per verified programme: exams listed, eligibility, process): ${BASE}/mba-admission
- Cut-off checker, your percentile against published minimums: ${BASE}/mba-cutoff-checker
- Exam calendar: ${BASE}/mba-exam-calendar
- MBA and PGDM guide: ${BASE}/mba
- MBA vs PGDM: ${BASE}/mba-vs-pgdm
- FMS Delhi CAT cut-off (composite score): ${BASE}/fms-delhi-cat-cutoff
- IIFT CAT cut-off (sectional minimums): ${BASE}/iift-cat-cutoff
- MDI Gurgaon PGDM admission (CAT required; GMAT is not open to Indian candidates): ${BASE}/mdi-gurgaon-pgdm-admission
- IIM Kashipur CAT cut-off and Uttarakhand: ${BASE}/mba-cutoff-uttarakhand
- MBA cut-offs in Delhi NCR: ${BASE}/mba-cutoff-delhi-ncr
- MBA cut-offs in Uttar Pradesh: ${BASE}/mba-cutoff-uttar-pradesh
- MBA cut-offs in Pune: ${BASE}/mba-cutoff-pune
- MBA cut-offs in Mumbai and Maharashtra CAP: ${BASE}/mba-cutoff-mumbai

## MBA exam guides
${examLines}

## MBA colleges by city
- Pune: ${BASE}/mba-colleges-in-pune
- Delhi NCR: ${BASE}/mba-colleges-in-delhi-ncr
- Delhi: ${BASE}/mba-colleges-in-delhi
- Noida: ${BASE}/mba-colleges-noida
- Greater Noida: ${BASE}/mba-colleges-in-greater-noida
- Gurugram: ${BASE}/mba-colleges-in-gurugram
- Ghaziabad: ${BASE}/mba-colleges-in-ghaziabad
- Lucknow: ${BASE}/mba-colleges-in-lucknow
- Uttar Pradesh: ${BASE}/mba-colleges-in-uttar-pradesh
- Dehradun: ${BASE}/mba-colleges-in-dehradun
- Uttarakhand: ${BASE}/mba-colleges-in-uttarakhand

## Which colleges accept which exam
- ATMA: ${BASE}/blog/mba-colleges-accepting-atma
- CMAT, Delhi NCR: ${BASE}/blog/mba-colleges-delhi-ncr-accepting-cmat
- XAT, Delhi NCR: ${BASE}/blog/mba-colleges-delhi-ncr-accepting-xat
- GMAT: ${BASE}/blog/mba-colleges-accepting-gmat-india
- NMAT: ${BASE}/blog/mba-colleges-accepting-nmat
- Noida: ${BASE}/blog/mba-colleges-noida-exams-accepted
- Greater Noida: ${BASE}/blog/pgdm-mba-colleges-greater-noida-exams-accepted
- Dehradun and Kashipur: ${BASE}/blog/mba-colleges-dehradun-uttarakhand-exams-accepted

## Admission process by region
- Dehradun and Uttarakhand: ${BASE}/blog/mba-admission-process-dehradun-uttarakhand
- Lucknow: ${BASE}/blog/mba-admission-process-lucknow
- Noida and Greater Noida: ${BASE}/blog/mba-admission-process-noida-greater-noida
- Delhi, Gurugram and Ghaziabad: ${BASE}/blog/mba-admission-process-delhi-gurugram-ghaziabad

## Free tools
- All free tools: ${BASE}/tools
- Psychometric test, work style and reasoning, about 10 minutes: ${BASE}/psychometric-test
- Career quiz, interest code and study paths: ${BASE}/career-quiz
- My admission plan, dates and colleges with sources, kept in the browser: ${BASE}/my-admission-plan
- AI college finder: ${BASE}/ai-finder
- Compare two colleges: ${BASE}/compare

## Colleges, courses and other guides
- All colleges, filter by stream: ${BASE}/colleges
- Courses: ${BASE}/courses
- Entrance exams: ${BASE}/exams
- Blog and guides: ${BASE}/blog
- Admission news: ${BASE}/news
- Scholarships: ${BASE}/scholarships
- Every page, grouped: ${BASE}/site-map

## Counselling

${counsellingMarkdown(BASE)}

## Machine-readable
- Sitemap: ${BASE}/sitemap.xml
- Structured JSON context: ${BASE}/api/ai-context
- Fuller reference: ${BASE}/llms-full.txt

## Contact
Website: ${BASE}
Email: support@campuslelo.com
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
