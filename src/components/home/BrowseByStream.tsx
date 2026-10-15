import Link from "next/link"
import { colleges } from "@/data/colleges"
import { searchColleges } from "@/lib/collegeSearch"
import type { College } from "@/types"
import { Cpu, Briefcase, Activity, Scale, Palette, BookOpen, Pill, TrendingUp, ChevronRight } from "lucide-react"

const STREAMS = [
  { name: "Engineering", icon: Cpu,         sub: "B.Tech / BE",       exam: "MHT-CET / JEE", popular: true  },
  { name: "MBA",         icon: Briefcase,    sub: "MBA / PGDM",        exam: "CAT / MAH-CET" },
  { name: "Medical",     icon: Activity,     sub: "MBBS / BDS",        exam: "NEET" },
  { name: "Law",         icon: Scale,        sub: "LLB / BA LLB",      exam: "CLAT / MH-CET" },
  { name: "Design",      icon: Palette,      sub: "B.Des / BFA",       exam: "NID / NIFT" },
  { name: "Arts",        icon: BookOpen,     sub: "BA / BFA",          exam: "CET / Board" },
  { name: "Pharmacy",    icon: Pill,         sub: "B.Pharm / D.Pharm", exam: "MHT-CET" },
  { name: "Commerce",    icon: TrendingUp,   sub: "BCom / BBA",        exam: "Board / CET" },
]

// Counts come from the real college data, using the same rules as /colleges:
// stream tabs filter by stream; course-like streams (Design, Pharmacy…) by keyword.
const STREAM_FIELD: Record<string, College["stream"][]> = {
  Engineering: ["Engineering"], MBA: ["MBA", "Management"], Medical: ["Medical"], Law: ["Law"], Arts: ["Arts & Science"],
}
function collegeCount(name: string): number {
  const streams = STREAM_FIELD[name]
  return streams ? colleges.filter((c) => streams.includes(c.stream)).length : searchColleges(colleges, name).length
}

export default function BrowseByStream() {
  return (
    <section className="section-pearl py-16 px-6" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-bold text-3xl" style={{ color: "#0F172A" }}>Browse by Stream</h2>
            <p className="mt-1 text-sm" style={{ color: "#475569" }}>Find colleges by your field of study</p>
          </div>
          <Link href="/colleges" className="text-sm font-semibold" style={{ color: "#C90D11" }}>
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STREAMS.map(({ name, icon: Icon, sub, exam, popular }) => (
            <Link
              key={name}
              href={`/colleges?stream=${encodeURIComponent(name)}`}
              className="group relative rounded-xl p-5 transition-shadow hover:shadow-lg"
              style={{ border: "1px solid #E5E9F0", background: "#FFFFFF" }}
            >
              {popular && (
                <span
                  className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "#FFF4F2", color: "#C90D11" }}
                >
                  Most Popular
                </span>
              )}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ background: "#EEF2FF" }}
              >
                <Icon className="w-5 h-5" style={{ color: "#011B40" }} strokeWidth={1.5} />
              </div>
              <p className="font-semibold text-sm mb-0.5" style={{ color: "#0F172A" }}>{name}</p>
              <p className="text-xs mb-2.5" style={{ color: "#475569" }}>{sub}</p>
              <span
                className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3"
                style={{ background: "#F1F5F9", color: "#475569" }}
              >
                {exam}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: "#0F172A" }}>{collegeCount(name) > 0 ? `${collegeCount(name)} colleges` : "Explore"}</span>
                <ChevronRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#C90D11" }}
                  strokeWidth={1.5}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
