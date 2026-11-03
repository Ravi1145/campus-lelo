import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { INSTITUTE_SHORT, CUTOFF_MATCH } from "@/data/mba/instituteLabels"
import { FEE_GUIDES, CUTOFF_PAGES, DEADLINE_GUIDE, VERIFIED_DEADLINES, XAT_GUIDE } from "@/data/mba/instituteGuides"
import { mbaExams } from "@/data/mba/exams"
import { regionPages } from "@/data/mba/regionPages"
import PageSchema from "@/components/seo/PageSchema"

export const metadata = genMeta({
  title: "MBA & PGDM Topic Index: Fees, Cut-offs, Deadlines",
  description: "Every verified MBA and PGDM institute with its admission, 2027-29 fee, cut-off and deadline pages, plus exam and city guides, in one index.",
  path: "/mba-searches",
  keywords: ["mba fees 2027", "mba cutoff", "mba last date to apply", "pgdm admission", "mba colleges delhi ncr"],
})
export const revalidate = 3600

const REGION_CUTOFF: Record<string, string> = {
  Delhi: "/mba-cutoff-delhi-ncr", Gurugram: "/mba-cutoff-delhi-ncr", Ghaziabad: "/mba-cutoff-delhi-ncr", Noida: "/mba-cutoff-delhi-ncr", "Greater Noida": "/mba-cutoff-delhi-ncr",
  Lucknow: "/mba-cutoff-uttar-pradesh", Kashipur: "/mba-cutoff-uttarakhand", Dehradun: "/mba-cutoff-uttarakhand", Pune: "/mba-cutoff-pune",
}
const CITY_ORDER = ["Delhi", "Gurugram", "Ghaziabad", "Noida", "Greater Noida", "Dehradun", "Kashipur", "Lucknow", "Pune"]

const dash = <span className="text-gray-400" aria-label="not available yet">-</span>
const lk = (href: string, text: string) => <Link href={href} className="font-semibold text-[#024692] hover:text-[#C90D11] hover:underline">{text}</Link>

export default function MbaSearchesPage() {
  const rows = [...programAdmissions].sort((a, b) => CITY_ORDER.indexOf(a.city) - CITY_ORDER.indexOf(b.city) || (INSTITUTE_SHORT[a.id] ?? a.institution).localeCompare(INSTITUTE_SHORT[b.id] ?? b.institution))
  const cityPages = regionPages.filter((r) => !r.exam && r.scope === "all")

  return (
    <>
      <PageSchema name="MBA & PGDM topic index" path="/mba-searches" description="Index of verified MBA and PGDM institutes with admission, fee, cut-off and deadline pages, plus exam and city guides." />
      <div className="bg-rich-navy">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-1.5 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span>
            <Link href="/mba" className="hover:text-white">MBA &amp; PGDM guide</Link><span aria-hidden="true">›</span>
            <span className="text-white" aria-current="page">Topic index</span>
          </nav>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">MBA and PGDM topic index: fees, cut-offs and deadlines by institute</h1>
          <p className="mt-3 max-w-2xl text-blue-100">Find the exact page you need: an institute&apos;s admission and exams, its official 2027-29 fee, its published cut-off and its application deadline. A dash means we have not verified that figure yet, so we do not show one.</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        <section aria-labelledby="inst-h">
          <h2 id="inst-h" className="text-2xl font-extrabold text-[#012858]">Institutes we have verified</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-gray-200">
            <table className="w-full min-w-[40rem] text-sm">
              <caption className="sr-only">Verified institutes with links to admission, fee, cut-off and deadline pages</caption>
              <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                <tr><th scope="col" className="px-4 py-3">Institute</th><th scope="col" className="px-3 py-3">City</th><th scope="col" className="px-3 py-3">Admission and exams</th><th scope="col" className="px-3 py-3">Fees 2027-29</th><th scope="col" className="px-3 py-3">Cut-off</th><th scope="col" className="px-3 py-3">Last date to apply</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((p) => {
                  const name = INSTITUTE_SHORT[p.id] ?? p.institution
                  const cut = CUTOFF_PAGES[p.id] ?? (CUTOFF_MATCH[p.id] ? REGION_CUTOFF[p.city] : undefined)
                  return (
                    <tr key={p.id} className="align-top">
                      <th scope="row" className="px-4 py-3 text-left font-bold text-gray-900">{name}</th>
                      <td className="px-3 py-3 text-gray-700">{p.city}</td>
                      <td className="px-3 py-3">{lk(`/mba-admission/${p.id}`, `${name} admission`)}</td>
                      <td className="px-3 py-3">{FEE_GUIDES[p.id] ? lk(FEE_GUIDES[p.id], `${name} fees`) : dash}</td>
                      <td className="px-3 py-3">{cut ? lk(cut, `${name} cut-off`) : dash}</td>
                      <td className="px-3 py-3">{VERIFIED_DEADLINES.has(p.id) ? lk(DEADLINE_GUIDE, "Deadline") : dash}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="exam-h">
          <h2 id="exam-h" className="text-2xl font-extrabold text-[#012858]">By entrance exam</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mbaExams.map((e) => (
              <li key={e.slug} className="rounded-2xl bg-white p-4 ring-1 ring-gray-200">
                <p className="font-extrabold text-[#012858]">{e.name}</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>{lk(`/exams/${e.slug}`, `${e.name} dates, eligibility and fee`)}</li>
                  <li>{lk(`/exams/${e.slug}/syllabus`, `${e.name} syllabus and pattern`)}</li>
                  <li>{lk(`/exams/${e.slug}/colleges`, `Colleges accepting ${e.name}`)}</li>
                  {e.slug === "xat" && <li>{lk(XAT_GUIDE, "XAT 2027 colleges in Delhi NCR")}</li>}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-gray-700">More: {lk("/blog/mba-entrance-exam-fees-2026-27-what-each-test-costs", "what each exam costs")}, {lk("/blog/which-mba-entrance-exam-should-you-take-comparison", "which exam to take")} and the {lk("/mba-exam-calendar", "MBA exam calendar")}.</p>
        </section>

        <section aria-labelledby="city-h">
          <h2 id="city-h" className="text-2xl font-extrabold text-[#012858]">By city and region</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {cityPages.map((r) => (
              <li key={r.path}>{lk(r.path, r.h1)}</li>
            ))}
            <li>{lk("/best-mba-colleges-in-india", "Best MBA colleges in India (NIRF 2025)")}</li>
          </ul>
        </section>

        <section aria-labelledby="topic-h">
          <h2 id="topic-h" className="text-2xl font-extrabold text-[#012858]">By question</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            <li>{lk("/blog/mba-in-delhi-ncr-2027-colleges-fees-cutoffs-admission", "MBA in Delhi NCR 2027: colleges, fees, cut-offs, admission")}</li>
            <li>{lk("/blog/mba-pgdm-application-deadlines-2027-intake-delhi-ncr", "MBA and PGDM application deadlines for 2027")}</li>
            <li>{lk("/mba-colleges-in-delhi-without-cat", "MBA in Delhi without CAT")}</li>
            <li>{lk("/mba-admission-in-delhi", "MBA admission in Delhi")}</li>
            <li>{lk("/pgdm-admission-in-delhi", "PGDM admission in Delhi")}</li>
            <li>{lk("/mba-vs-pgdm", "MBA vs PGDM")}</li>
            <li>{lk("/mba-kya-hai", "MBA kya hai (Hindi)")}</li>
            <li>{lk("/mba-cutoff-checker", "MBA cut-off checker")}</li>
          </ul>
        </section>

        <p className="rounded-2xl bg-white p-5 text-sm text-gray-700 ring-1 ring-gray-200">
          Want help choosing? <Link href="/mba-admission-in-delhi#lead-form" className="font-bold text-[#C90D11] hover:underline">Get a free Delhi NCR shortlist</Link>. Every figure on the linked pages is traced to an official source: read our <Link href="/editorial-policy" className="font-bold text-[#024692] hover:underline">editorial policy</Link>.
        </p>
      </div>
    </>
  )
}
