"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"

export interface FeaturedRow { rank: number; name: string; city: string; state: string; score: number; href?: string; detail?: string }
interface Tab { id: string; label: string; rows: FeaturedRow[]; source: string; more?: { href: string; label: string } }

// All panels are rendered into the HTML; the inactive ones are only hidden, so crawlers and AI readers see every list.
export default function FeaturedInstitutesTabs({ tabs, regions }: { tabs: Tab[]; regions: { href: string; label: string }[] }) {
  const [active, setActive] = useState(tabs[0].id)

  return (
    <section aria-labelledby="featured-h" className="py-10 section-pearl">
      <div className="max-w-[calc(var(--container-7xl)+6rem)] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#C90D11" }}>Top colleges in India</p>
            <h2 id="featured-h" className="text-2xl sm:text-3xl font-bold" style={{ color: "#0F172A" }}>
              Highest-ranked colleges, <span style={{ color: "#C90D11" }}>NIRF 2025</span>
            </h2>
            <p className="mt-1.5 text-sm max-w-2xl" style={{ color: "#475569" }}>
              Ranks and scores are copied from the Ministry of Education&apos;s NIRF list, not re-ranked. NIRF ranks only the institutes that took part.
            </p>
          </div>
          <Link href="/best-mba-colleges-in-india" className="hidden sm:flex items-center gap-1.5 font-semibold text-sm transition-opacity hover:opacity-80" style={{ color: "#C90D11" }}>
            Best MBA colleges in India <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div role="tablist" aria-label="College field" className="mb-5 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`feat-tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls={`feat-panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === t.id ? "bg-[#012858] text-white" : "bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-[#012858]"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tabs.map((t) => (
          <div key={t.id} role="tabpanel" id={`feat-panel-${t.id}`} aria-labelledby={`feat-tab-${t.id}`} hidden={active !== t.id}>
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.rows.map((r) => {
                const body = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#012858] text-sm font-extrabold text-white" aria-label={`NIRF rank ${r.rank}`}>{r.rank}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold leading-snug text-gray-900">{r.name}</span>
                      <span className="block text-xs text-gray-600">{r.city}, {r.state} · score {r.score.toFixed(2)}</span>
                      {r.detail && <span className="mt-0.5 block text-xs font-semibold text-[#024692]">{r.detail}</span>}
                    </span>
                  </>
                )
                return (
                  <li key={`${r.rank}-${r.name}`}>
                    {r.href ? (
                      <Link href={r.href} className="flex h-full items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:ring-[#012858]">{body}</Link>
                    ) : (
                      <div className="flex h-full items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-gray-200">{body}</div>
                    )}
                  </li>
                )
              })}
            </ol>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
              <a href={t.source} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-1 font-semibold text-[#024692] hover:underline">
                Official NIRF 2025 list <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              {t.more && <Link href={t.more.href} className="font-bold text-[#C90D11] hover:underline">{t.more.label} →</Link>}
            </p>
          </div>
        ))}

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-600">Best MBA colleges by region</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {regions.map((g) => (
              <li key={g.href}><Link href={g.href} className="inline-block rounded-full bg-white px-3 py-1.5 text-sm text-gray-800 ring-1 ring-gray-200 transition-colors hover:text-[#012858] hover:ring-[#012858]">{g.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
