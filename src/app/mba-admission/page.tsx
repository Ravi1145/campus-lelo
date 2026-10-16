import { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { mbaExams } from "@/data/mba/exams"
import { INSTITUTE_SHORT } from "@/data/mba/instituteLabels"

export const revalidate = 3600

const examName = (slug: string) => mbaExams.find((e) => e.slug === slug)?.name ?? slug.toUpperCase()
const CITY_ORDER = ["Pune", "Delhi", "Gurugram", "Ghaziabad", "Noida", "Greater Noida", "Lucknow", "Kashipur", "Dehradun"]

export const metadata: Metadata = genMeta({
  title: "MBA and PGDM Admission by College: Exams and Eligibility",
  description: "One page per verified MBA or PGDM programme: the exams it lists, eligibility and selection steps from its own admission page, with sources and check dates.",
  path: "/mba-admission",
  keywords: ["mba admission process by college", "pgdm admission exams accepted", "mba colleges exams accepted", "mba admission eligibility"],
})

export default function Page() {
  const rows = programAdmissions.filter((p) => INSTITUTE_SHORT[p.id])
  const cities = CITY_ORDER.filter((c) => rows.some((r) => r.city === c))
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "MBA & PGDM", url: "/mba" }, { name: "MBA admission by college", url: "/mba-admission" },
      ])) }} />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#012858] text-white">
          <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-blue-200">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/mba" className="hover:text-white">MBA &amp; PGDM</Link><span>›</span>
              <span className="text-white">Admission by college</span>
            </nav>
            <h1 className="mb-2 text-2xl font-extrabold md:text-3xl">MBA and PGDM admission by college</h1>
            <p className="max-w-3xl text-blue-100">{rows.length} programmes checked against the institute&apos;s own admission page. Each page shows the exams it lists, eligibility and selection steps, and the source with its check date.</p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl space-y-5 px-5 py-6 sm:px-8">
          {cities.map((city) => (
            <section key={city} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-3 text-lg font-bold text-gray-900">{city}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {rows.filter((r) => r.city === city).map((r) => (
                  <li key={r.id}>
                    <Link href={`/mba-admission/${r.id}`} className="block rounded-xl p-3 ring-1 ring-gray-200 transition-colors hover:bg-orange-50 hover:ring-orange-200">
                      <span className="block font-semibold text-[#012858]">{INSTITUTE_SHORT[r.id]} {r.programType} admission</span>
                      <span className="mt-0.5 block text-xs text-gray-600">Lists: {r.examsAccepted.map(examName).join(", ")} · {r.intake.length > 24 ? "see source" : r.intake}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="text-sm text-gray-700">Filter every college by the exams you took in the <Link href="/mba-exam-acceptance" className="font-semibold text-orange-600 underline">exam acceptance table</Link>, or check your percentile with the <Link href="/mba-cutoff-checker" className="font-semibold text-orange-600 underline">cut-off checker</Link>. How we verify: <Link href="/editorial-policy" className="underline">editorial policy</Link>.</p>
        </div>
      </div>
    </>
  )
}
