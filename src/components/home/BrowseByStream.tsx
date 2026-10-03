import Link from "next/link"
import { Cpu, Briefcase, Activity, Scale, Palette, BookOpen, Pill, TrendingUp, ChevronRight } from "lucide-react"

const STREAMS = [
  { name: "Engineering", icon: Cpu,         sub: "B.Tech / BE",       exam: "MHT-CET / JEE", count: 120, popular: true  },
  { name: "MBA",         icon: Briefcase,    sub: "MBA / PGDM",        exam: "CAT / MAH-CET",  count: 68               },
  { name: "Medical",     icon: Activity,     sub: "MBBS / BDS",        exam: "NEET",           count: 24               },
  { name: "Law",         icon: Scale,        sub: "LLB / BA LLB",      exam: "CLAT / MH-CET",  count: 18               },
  { name: "Design",      icon: Palette,      sub: "B.Des / BFA",       exam: "NID / NIFT",     count: 12               },
  { name: "Arts",        icon: BookOpen,     sub: "BA / BFA",          exam: "CET / Board",    count: 45               },
  { name: "Pharmacy",    icon: Pill,         sub: "B.Pharm / D.Pharm", exam: "MHT-CET",        count: 22               },
  { name: "Commerce",    icon: TrendingUp,   sub: "BCom / BBA",        exam: "Board / CET",    count: 55               },
]

export default function BrowseByStream() {
  return (
    <section className="py-16 px-6" style={{ background: "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-bold text-3xl" style={{ color: "#0F172A" }}>Browse by Stream</h2>
            <p className="mt-1 text-sm" style={{ color: "#475569" }}>Find colleges by your field of study</p>
          </div>
          <Link href="/colleges" className="text-sm font-semibold" style={{ color: "#F97316" }}>
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STREAMS.map(({ name, icon: Icon, sub, exam, count, popular }) => (
            <Link
              key={name}
              href={`/colleges?stream=${encodeURIComponent(name)}`}
              className="group relative rounded-xl p-5 transition-shadow hover:shadow-lg"
              style={{ border: "1px solid #E5E9F0", background: "#FFFFFF" }}
            >
              {popular && (
                <span
                  className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "#FFF3E8", color: "#F97316" }}
                >
                  Most Popular
                </span>
              )}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                style={{ background: "#EEF2FF" }}
              >
                <Icon className="w-5 h-5" style={{ color: "#0B1226" }} strokeWidth={1.5} />
              </div>
              <p className="font-semibold text-sm mb-0.5" style={{ color: "#0F172A" }}>{name}</p>
              <p className="text-xs mb-2.5" style={{ color: "#475569" }}>{sub}</p>
              <span
                className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-3"
                style={{ background: "#F1F5F9", color: "#64748B" }}
              >
                {exam}
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: "#0F172A" }}>{count} colleges</span>
                <ChevronRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#F97316" }}
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
