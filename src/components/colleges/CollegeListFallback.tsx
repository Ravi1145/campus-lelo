import { collegeHref } from "@/lib/collegeHref"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { colleges } from "@/data/colleges"

// Server-rendered list shown while the interactive CollegeGrid loads (it reads
// URL params, so Next renders it client-side only). This puts every college
// link in the initial HTML for crawlers and gives slow phones real content
// instead of a "Loading…" message.
export default function CollegeListFallback() {
  return (
    <div className="max-w-[calc(var(--container-7xl)+3rem)] mx-auto px-4 sm:px-6 py-8">
      <p className="text-sm text-gray-600 mb-4">{colleges.length} colleges · loading filters…</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {colleges.map((c) => (
          <li key={c.slug}>
            <Link href={collegeHref(c.slug)} className="block h-full bg-white rounded-xl border border-gray-200 p-4 hover:border-orange-300">
              <span className="block font-semibold text-gray-900">{c.name}</span>
              <span className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                {c.location} · {c.stream}{c.naac ? ` · NAAC ${c.naac}` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
