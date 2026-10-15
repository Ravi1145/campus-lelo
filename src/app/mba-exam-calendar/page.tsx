import type { Metadata } from "next"
import Link from "next/link"
import { CalendarClock, Download, ExternalLink, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { calendarLastVerified, examCalendarRows, CALENDAR_PATH } from "@/lib/mbaCalendar"
import CopyBox from "@/components/ui/CopyBox"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const revalidate = 3600

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

export const metadata: Metadata = genMeta({
  title: "MBA Entrance Exam Calendar 2026–27: CAT, XAT, SNAP, NMAT",
  description: "All MBA and PGDM entrance exam dates in one table. CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH-MBA-CET, ATMA and GMAT. Verified against official sources; free CSV download and embeddable widget.",
  path: CALENDAR_PATH,
  keywords: ["mba entrance exam calendar", "mba entrance exam dates 2027", "cat 2026 exam date", "snap 2026 exam date", "xat 2027 exam date", "mba exam dates"],
})

export default function MbaExamCalendarPage() {
  const rows = examCalendarRows()
  const verified = calendarLastVerified()
  const verifiedText = verified ? new Date(verified).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : ""

  const embedCode = `<iframe src="${BASE}/embed/mba-exam-calendar" title="MBA entrance exam calendar" width="100%" height="640" style="border:1px solid #e5e7eb;border-radius:12px" loading="lazy"></iframe>\n<p style="font-size:12px;margin:6px 0 0">MBA exam dates by <a href="${BASE}${CALENDAR_PATH}">CampusLelo</a></p>`
  const citation = `CampusLelo, "MBA Entrance Exam Calendar 2026–27", ${verifiedText ? `last verified ${verifiedText}, ` : ""}${BASE}${CALENDAR_PATH}`

  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "MBA & PGDM guide", url: "/mba" }, { name: "MBA exam calendar", url: CALENDAR_PATH }])
  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "MBA entrance exam calendar 2026–27",
    description: "Registration and exam dates for India's main MBA and PGDM entrance exams, taken from the exam bodies' own notices and cross-checked. Dates that are not officially confirmed are marked as such.",
    url: `${BASE}${CALENDAR_PATH}`,
    creator: { "@type": "Organization", name: "CampusLelo", url: BASE },
    dateModified: verified || undefined,
    keywords: ["MBA", "PGDM", "entrance exam", "CAT", "XAT", "SNAP", "NMAT", "CMAT", "MAT", "GMAT"],
    distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${BASE}${CALENDAR_PATH}/csv` }],
  }

  return (
    <>
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="dataset" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(dataset) }} />

      <div className="bg-rich-navy relative overflow-hidden">
        <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-5 flex gap-1.5 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span>
            <Link href="/mba" className="hover:text-white">MBA &amp; PGDM guide</Link><span aria-hidden="true">›</span>
            <span className="text-white" aria-current="page">Exam calendar</span>
          </nav>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">MBA entrance exam calendar 2026–27</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
            Registration and exam dates for CAT, XAT, SNAP, NMAT, CMAT, MAT, MAH-MBA-CET, ATMA and GMAT, in one table, each linked to its official site.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20">
            <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" /> Last verified {verifiedText || "recently"} · dates not yet confirmed are marked
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6">
        <section aria-labelledby="cal-h">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="cal-h" className="flex items-center gap-2 text-2xl font-extrabold text-[#012858]"><CalendarClock className="h-6 w-6 text-[#C90D11]" aria-hidden="true" /> Dates at a glance</h2>
            <a href={`${CALENDAR_PATH}/csv`} download className="inline-flex items-center gap-2 rounded-xl bg-[#012858] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#024692]">
              <Download className="h-4 w-4" aria-hidden="true" /> Download CSV
            </a>
          </div>

          <div className="mt-5 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
            <table className="w-full min-w-[40rem] text-sm">
              <caption className="sr-only">MBA entrance exam registration and exam dates</caption>
              <thead className="bg-gradient-to-r from-[#011B40] to-[#024692] text-left text-[11px] font-bold uppercase tracking-wider text-blue-100">
                <tr>
                  <th scope="col" className="px-4 py-3.5">Exam</th>
                  <th scope="col" className="px-4 py-3.5">Registration</th>
                  <th scope="col" className="px-4 py-3.5">Exam date / window</th>
                  <th scope="col" className="px-4 py-3.5">Official site</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((r) => (
                  <tr key={r.slug} className="align-top transition-colors hover:bg-blue-50/50">
                    <th scope="row" className="px-4 py-4 text-left">
                      <Link href={`/exams/${r.slug}`} className="font-extrabold text-[#012858] hover:text-[#C90D11]">{r.name}</Link>
                      <span className="mt-0.5 block text-xs font-normal text-gray-600">{r.cycle}</span>
                    </th>
                    <td className="px-4 py-4 text-gray-800">{r.registration}</td>
                    <td className="px-4 py-4 text-gray-800">
                      {r.examDate}
                      {r.note && <span className="mt-1 block text-xs text-amber-800">{r.note}</span>}
                    </td>
                    <td className="px-4 py-4">
                      <a href={r.officialSite} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-1 text-xs font-bold text-[#024692] hover:underline">
                        Visit <ExternalLink className="h-3 w-3" aria-hidden="true" /><span className="sr-only"> {r.name} official site (opens in a new tab)</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Each exam&apos;s page has its pattern, eligibility, syllabus and sources. Where an official date is not yet confirmed we say so instead of guessing. See our <Link href="/editorial-policy" className="font-bold text-[#012858] underline-offset-2 hover:underline">editorial policy</Link>.
          </p>
        </section>

        <section aria-labelledby="share-h" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-8">
          <h2 id="share-h" className="text-2xl font-extrabold text-[#012858]">Use this calendar on your site</h2>
          <p className="mt-1 text-sm text-gray-600">Teachers, coaching centres, college blogs and student communities are welcome to embed or cite it, free. The embed updates automatically when dates change.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <CopyBox label="Embed code" text={embedCode} rows={6} />
            <CopyBox label="Cite this page" text={citation} rows={6} />
          </div>
        </section>
      </div>

      <RelatedMbaSearches path={CALENDAR_PATH} />
    </>
  )
}
