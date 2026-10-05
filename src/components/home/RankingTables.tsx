"use client"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Award, Briefcase, Cog, Stethoscope, Trophy } from "lucide-react"
import { getTopEngineeringColleges, getTopMBAColleges, getTopMedicalColleges } from "@/data/colleges"
import { formatCurrency, formatFeesRange, getNaacColor, cn } from "@/lib/utils"
import * as Tabs from "@radix-ui/react-tabs"

type Row = ReturnType<typeof getTopEngineeringColleges>

const tabs = [
  { id: "engineering", label: "B.Tech", icon: Cog, title: "Top 10 B.Tech Engineering Colleges in Pune 2026" },
  { id: "mba", label: "MBA", icon: Briefcase, title: "Top 10 MBA Colleges in Pune 2026" },
  { id: "medical", label: "Medical", icon: Stethoscope, title: "Top Medical Colleges in Pune 2026 (NEET)" },
]

const MEDAL = [
  "bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow-amber-500/40",
  "bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800 shadow-slate-400/40",
  "bg-gradient-to-br from-orange-300 to-orange-600 text-orange-950 shadow-orange-500/40",
]

function RankTable({ colleges, title }: { colleges: Row; title: string }) {
  const rows = colleges.slice(0, 10)
  // Bars are relative to the best average package in this list (computed from the data)
  const maxPackage = Math.max(1, ...rows.map((c) => c.avgPlacement))

  return (
    <div>
      <h3 className="hero-in mb-4 text-lg font-extrabold text-[#012858] sm:text-xl">{title}</h3>
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-950/8 ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem]">
            <caption className="sr-only">{title}</caption>
            <thead className="bg-gradient-to-r from-[#011B40] to-[#024692] text-left text-[11px] font-bold uppercase tracking-wider text-blue-100">
              <tr>
                <th scope="col" className="w-14 px-3 py-3.5 sm:px-5">Rank</th>
                <th scope="col" className="px-3 py-3.5">College</th>
                <th scope="col" className="hidden px-3 py-3.5 text-center sm:table-cell">NAAC</th>
                <th scope="col" className="hidden px-3 py-3.5 md:table-cell">Annual fees</th>
                <th scope="col" className="hidden w-52 px-3 py-3.5 lg:table-cell">Avg package</th>
                <th scope="col" className="w-12 px-3 py-3.5 sm:px-5"><span className="sr-only">Open</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((college, i) => (
                <tr key={college.id} className="hero-in group relative bg-white transition-colors hover:bg-blue-50/60" style={{ "--i": i } as React.CSSProperties}>
                  <td className="px-3 py-3.5 sm:px-5">
                    <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold", i < 3 ? `${MEDAL[i]} shadow-md` : "bg-gray-100 text-gray-600")}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <Link href={`/colleges/${college.slug}`} className="block after:absolute after:inset-0 after:content-['']">
                      <span className="block text-sm font-bold text-gray-900 transition-colors group-hover:text-[#C90D11]">{college.name}</span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-gray-600">
                        {college.location}
                        {college.nirfRank && (
                          <span className="inline-flex items-center gap-1 font-semibold text-[#C90D11]"><Award className="h-3 w-3" aria-hidden="true" />NIRF #{college.nirfRank}</span>
                        )}
                      </span>
                    </Link>
                  </td>
                  <td className="hidden px-3 py-3.5 text-center sm:table-cell">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", getNaacColor(college.naac))}>{college.naac}</span>
                  </td>
                  <td className="hidden px-3 py-3.5 text-sm font-semibold text-gray-800 md:table-cell">
                    {formatFeesRange(college.feesRange.min, college.feesRange.max)}
                  </td>
                  <td className="hidden px-3 py-3.5 lg:table-cell">
                    {college.avgPlacement > 0 ? (
                      <div>
                        <span className="text-sm font-extrabold text-emerald-700">{formatCurrency(college.avgPlacement)}</span>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                          <div className="rank-bar h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#024692]" style={{ width: `${(college.avgPlacement / maxPackage) * 100}%`, "--i": i } as React.CSSProperties} />
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3.5 text-right sm:px-5">
                    <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#012858] transition-all duration-300 group-hover:bg-[#E0170F] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function RankingTables() {
  const data: Record<string, Row> = {
    engineering: getTopEngineeringColleges(),
    mba: getTopMBAColleges(),
    medical: getTopMedicalColleges(),
  }

  return (
    <section aria-labelledby="rankings-heading" className="py-16 section-pearl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E0170F] to-[#FB4312] text-white shadow-lg shadow-red-900/25">
              <Trophy className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="rankings-heading" className="text-2xl font-extrabold text-[#012858] sm:text-3xl">Pune College Rankings 2026</h2>
              <p className="mt-0.5 text-sm text-gray-600">Ordered by NAAC grade, NIRF rank, placements and student reviews</p>
            </div>
          </div>
          <Link href="/colleges" className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11]">
            Browse all colleges <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <Tabs.Root defaultValue="engineering">
          <Tabs.List aria-label="Ranking category" className="mb-6 inline-flex w-full max-w-full gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-gray-200 [scrollbar-width:none] sm:w-auto [&::-webkit-scrollbar]:hidden">
            {tabs.map(({ id, label, icon: Icon }) => (
              <Tabs.Trigger
                key={id}
                value={id}
                className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#012858] data-[state=active]:to-[#024692] data-[state=active]:text-white data-[state=active]:shadow-md sm:flex-none"
              >
                <Icon className="h-4 w-4 text-[#E0170F] group-data-[state=active]:text-orange-300" aria-hidden="true" />
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {tabs.map((t) => (
            <Tabs.Content key={t.id} value={t.id} className="focus-visible:outline-offset-4">
              <RankTable colleges={data[t.id]} title={t.title} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  )
}
