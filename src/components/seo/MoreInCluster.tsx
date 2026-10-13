import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { clusterPools } from "@/data/clusterPools"

// "More guides" block for topic clusters. Each page links to the next few pages in its cluster's list
// (wrapping around), so every page in the cluster gets inbound links and none is left isolated.
// Server component: the links are plain HTML and crawlable.
export default function MoreInCluster({ pool, path, count = 8, title = "More guides in this topic" }: { pool: "mba" | "btech"; path: string; count?: number; title?: string }) {
  const list = clusterPools[pool]
  const i = list.findIndex((l) => l.href === path)
  if (i < 0 || list.length < 2) return null
  const next = Array.from({ length: Math.min(count, list.length - 1) }, (_, k) => list[(i + 1 + k) % list.length])
  return (
    <section aria-labelledby={`more-${pool}-h`} className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
      <h2 id={`more-${pool}-h`} className="text-lg font-extrabold text-[#012858]">{title}</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {next.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="flex items-center justify-between gap-2 rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition hover:text-[#C90D11] hover:ring-[#012858]/30">
              <span>{l.label}</span> <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
