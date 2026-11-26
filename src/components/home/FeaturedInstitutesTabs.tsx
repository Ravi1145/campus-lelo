"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, MapPin } from "lucide-react"

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
            <ol className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-4" aria-label={`${t.label}: highest-ranked institutes, scroll sideways on a phone`}>
              {t.rows.map((r) => {
                const top = r.rank <= 3
                const cta = r.href ? { href: r.href, label: "View details" } : { href: t.id === "mba" ? "/mba-admission-in-delhi#lead-form" : "/counselling#book", label: "Free guidance" }
                return (
                  <li key={`${r.rank}-${r.name}`} className="w-[78vw] shrink-0 snap-start sm:w-auto">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(1,40,88,0.4)] hover:ring-[#012858]/30">
                      <div className="flex items-start justify-between gap-3">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-[family-name:var(--font-fraunces)] text-lg font-bold text-white ${top ? "bg-[#E0170F]" : "bg-[#012858]"}`} aria-label={`NIRF rank ${r.rank}`}>{r.rank}</span>
                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#024692]">NIRF 2025</span>
                      </div>
                      <h3 className="mt-3 line-clamp-2 min-h-[2.6rem] text-[15px] font-bold leading-snug text-[#012858]">{r.name}</h3>
                      <p className="mt-1 flex items-center gap-1 text-xs text-gray-600"><MapPin className="h-3.5 w-3.5 shrink-0 text-[#C90D11]" aria-hidden="true" />{r.city}, {r.state}</p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-600"><span>NIRF score</span><span className="tabular-nums text-[#012858]">{r.score.toFixed(2)} / 100</span></div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100" role="presentation"><div className={`h-full rounded-full ${top ? "bg-[#E0170F]" : "bg-[#024692]"}`} style={{ width: `${Math.min(100, r.score)}%` }} /></div>
                      </div>
                      {r.detail && <p className="mt-3 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-[#024692]">{r.detail}</p>}
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <Link href={cta.href} className="inline-flex items-center gap-1 text-sm font-bold text-[#C90D11] hover:underline">{cta.label}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
                      </div>
                    </article>
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
