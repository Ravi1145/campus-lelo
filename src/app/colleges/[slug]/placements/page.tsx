import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ExternalLink, ShieldCheck } from "lucide-react"
import { colleges } from "@/data/colleges"
import { titleName, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"

// Placement figures were removed from this page: the earlier version showed three
// "batches" computed from one number, a made-up sector split and padded recruiter lists.
// Until a college's own placement report is sourced and dated, we link to it instead.
// The page stays reachable from the profile but is kept out of search (noindex) and the sitemap.

export function generateStaticParams() {
  return colleges.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const col = colleges.find((c) => c.slug === slug)
  if (!col) return {}
  return {
    title: { absolute: `${titleName(col)} placements: where to check` },
    description: `How to check ${col.name}'s placement report: what to ask, how to read average and median, and a link to the college's own website.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"}/colleges/${slug}/placements` },
    robots: { index: false, follow: true },
  }
}

export const revalidate = 3600

export default async function CollegePlacements({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const col = colleges.find((c) => c.slug === slug)
  if (!col) notFound()

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges", url: "/colleges" },
    { name: col.name, url: `/colleges/${col.slug}` },
    { name: "Placements", url: `/colleges/${col.slug}/placements` },
  ])

  return (
    <>
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <div className="bg-surface min-h-screen">
        <div className="bg-gradient-to-r from-[#011B40] to-[#024692] py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-3">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link><span>›</span>
              <Link href={`/colleges/${col.slug}`} className="hover:text-white">{col.shortName}</Link><span>›</span>
              <span className="text-white">Placements</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white mb-2">{col.name}: placements</h1>
            <p className="text-gray-200 text-sm">We do not publish placement figures for this college until we can source and date them.</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <section className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Why there are no numbers here</h2>
            <p className="text-sm text-gray-700 leading-relaxed">Average package, highest package and recruiter lists change every year and differ by programme. A figure without a source and a year can mislead you, so we show placement results only when we can link the college&apos;s own report and say when we checked it.</p>
          </section>

          <section className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-3">What to ask for before you decide</h2>
            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
              <li>The latest placement report for your programme and year, not a college-wide headline.</li>
              <li>Median package as well as average, and how many students sat for placements versus how many were placed.</li>
              <li>How &quot;highest package&quot; is defined, and how many students received offers near it.</li>
              <li>Whether the figure includes internships, pre-placement offers or students who opted out.</li>
            </ul>
            <p className="text-sm text-gray-700 mt-4">Read our guide: <Link href="/blog/mba-placements-and-salary-how-to-read-reports" className="font-bold text-[#C90D11] hover:underline">how to read a placement report →</Link></p>
          </section>

          <section className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Check it at the source</h2>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              {col.website && (
                <a href={col.website} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-1.5 rounded-lg bg-[#012858] px-4 py-2 text-white hover:bg-[#024692]">
                  {col.shortName} official website <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <Link href={`/colleges/${col.slug}`} className="inline-flex items-center rounded-lg px-4 py-2 ring-1 ring-gray-300 text-gray-800 hover:bg-gray-50">Back to {col.shortName} profile</Link>
            </div>
          </section>

          <div className="bg-gradient-to-r from-[#011B40] to-[#024692] rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Comparing colleges on outcomes?</h2>
            <p className="text-gray-200 text-sm mb-4">A counsellor can help you ask the right questions and compare reports fairly. Free.</p>
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors inline-block">Free counselling →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
