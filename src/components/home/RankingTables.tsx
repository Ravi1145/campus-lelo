"use client"
import { collegeHref } from "@/lib/collegeHref"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Briefcase, Cog, Stethoscope, Trophy } from "lucide-react"
import { getTopEngineeringColleges, getTopMBAColleges, getTopMedicalColleges } from "@/data/colleges"
import { formatFeesRange, getNaacColor, cn } from "@/lib/utils"
import * as Tabs from "@radix-ui/react-tabs"

type Row = ReturnType<typeof getTopEngineeringColleges>

const tabs = [
  { id: "engineering", label: "B.Tech", icon: Cog, title: "Popular B.Tech Engineering Colleges in Pune" },
  { id: "mba", label: "MBA", icon: Briefcase, title: "Popular MBA Colleges in Pune" },
  { id: "medical", label: "Medical", icon: Stethoscope, title: "Popular Medical Colleges in Pune (NEET)" },
]

function RankTable({ colleges, title }: { colleges: Row; title: string }) {
  const rows = colleges.slice(0, 10)

  return (
    <div>
      <h3 className="hero-in mb-4 text-lg font-extrabold text-[#012858] sm:text-xl">{title}</h3>
      <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-blue-950/8 ring-1 ring-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem]">
            <caption className="sr-only">{title}</caption>
            <thead className="bg-gradient-to-r from-[#011B40] to-[#024692] text-left text-[11px] font-bold uppercase tracking-wider text-blue-100">
              <tr>
                <th scope="col" className="w-14 px-3 py-3.5 sm:px-5"><span className="sr-only">Number</span></th>
                <th scope="col" className="px-3 py-3.5">College</th>
                <th scope="col" className="hidden px-3 py-3.5 text-center sm:table-cell">NAAC</th>
                <th scope="col" className="hidden px-3 py-3.5 md:table-cell">Annual fees</th>
                <th scope="col" className="w-12 px-3 py-3.5 sm:px-5"><span className="sr-only">Open</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((college, i) => (
                <tr key={college.id} className="hero-in group relative bg-white transition-colors hover:bg-blue-50/60" style={{ "--i": i } as React.CSSProperties}>
                  <td className="px-3 py-3.5 sm:px-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-sm font-extrabold text-gray-600">
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <Link href={collegeHref(college.slug)} className="block after:absolute after:inset-0 after:content-['']">
                      <span className="block text-sm font-bold text-gray-900 transition-colors group-hover:text-[#C90D11]">{college.name}</span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-gray-600">
                        {college.location}
                      </span>
                    </Link>
                  </td>
                  <td className="hidden px-3 py-3.5 text-center sm:table-cell">
                    <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", getNaacColor(college.naac))}>{college.naac}</span>
                  </td>
                  <td className="hidden px-3 py-3.5 text-sm font-semibold text-gray-800 md:table-cell">
                    {formatFeesRange(college.feesRange.min, college.feesRange.max)}
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
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E0170F] to-[#FB4312] text-white">
              <Trophy className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="rankings-heading" className="text-2xl font-extrabold text-[#012858] sm:text-3xl">Popular Pune Colleges</h2>
              <p className="mt-0.5 text-sm text-gray-600">Browse by stream. Open a profile for courses, fees and admission details</p>
            </div>
          </div>
          <Link href="/colleges" className="group inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11]">
            Browse all colleges <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <Tabs.Root defaultValue="engineering">
          <Tabs.List aria-label="College category" className="mb-6 inline-flex w-full max-w-full gap-1 overflow-x-auto rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-gray-200 [scrollbar-width:none] sm:w-auto [&::-webkit-scrollbar]:hidden">
            {tabs.map(({ id, label, icon: Icon }) => (
              <Tabs.Trigger
                key={id}
                value={id}
                className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#012858] data-[state=active]:to-[#024692] data-[state=active]:text-white data-[state=active]:shadow-md sm:flex-none"
              >
                <Icon className="h-4 w-4 text-[#C90D11] group-data-[state=active]:text-orange-300" aria-hidden="true" />
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
