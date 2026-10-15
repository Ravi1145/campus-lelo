import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { clustersForPath, relatedSearches } from "@/lib/mbaKeywords"
import MoreInCluster from "@/components/seo/MoreInCluster"

// "Related searches" block for MBA pages. Server component: the links are in
// the HTML (crawlable). Each chip is a real query that people type into Google
// (harvested from autocomplete) and links to the best page for that query.
function RelatedChips({ path, title = "Related MBA searches", inline = false, requireCluster = false }: { path: string; title?: string; inline?: boolean; requireCluster?: boolean }) {
  if (requireCluster && clustersForPath(path).length === 0) return null
  const items = relatedSearches(path, 12)
  if (items.length === 0) return null

  if (inline) {
    return (
      <section aria-labelledby="related-mba-heading" className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 id="related-mba-heading" className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-800">
          <Search className="h-4 w-4 text-[#C90D11]" aria-hidden="true" /> {title}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {items.map((i) => (
            <li key={i.label}><Link href={i.href} className="inline-block rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-800 ring-1 ring-gray-200 transition-colors hover:bg-white hover:text-[#012858] hover:ring-[#012858]">{i.label}</Link></li>
          ))}
        </ul>
        <p className="mt-3 text-xs"><Link href="/mba" className="font-bold text-[#C90D11] hover:underline">All MBA &amp; PGDM guides →</Link></p>
      </section>
    )
  }

  return (
    <section aria-labelledby="related-mba-heading" className="section-pearl py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="related-mba-heading" className="flex items-center gap-2 text-lg font-extrabold text-[#012858] sm:text-xl">
            <Search className="h-5 w-5 text-[#C90D11]" aria-hidden="true" /> {title}
          </h2>
          <Link href="/mba" className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11]">
            All MBA &amp; PGDM guides <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {items.map((i) => (
            <li key={i.label}>
              <Link
                href={i.href}
                className="inline-block rounded-full bg-white px-3.5 py-2 text-sm font-medium text-gray-800 ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:text-[#012858] hover:ring-[#012858]"
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function RelatedMbaSearches(props: { path: string; title?: string; inline?: boolean; requireCluster?: boolean }) {
  return (
    <>
      <RelatedChips {...props} />
      <MoreInCluster pool="mba" path={props.path} />
    </>
  )
}
