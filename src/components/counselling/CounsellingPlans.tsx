import { Check, PhoneCall, Video } from "lucide-react"
import { PLANS } from "@/data/counselling"
import PlanCta from "./PlanCta"

// Free vs paid counselling, side by side. Server component — reused on the
// counselling page and the homepage.
export default function CounsellingPlans({ headingId = "plans-h" }: { headingId?: string }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2" role="list" aria-labelledby={headingId}>
      {PLANS.map((p) => {
        const featured = p.id === "video_199"
        const Icon = featured ? Video : PhoneCall
        return (
          <article
            key={p.id}
            role="listitem"
            className={
              featured
                ? "bg-rich-navy relative flex flex-col overflow-hidden rounded-3xl p-7 text-white shadow-2xl shadow-blue-950/25 ring-1 ring-white/10 sm:p-8"
                : "relative flex flex-col overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200 sm:p-8"
            }
          >
            {featured && (
              <>
                <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#E0170F]/30 blur-3xl" />
                <span className="absolute right-6 top-6 rounded-full bg-orange-400 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#011B40]">Most helpful</span>
              </>
            )}
            <div className="relative flex flex-1 flex-col">
              <span className={featured ? "flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-orange-300 ring-1 ring-white/20" : "flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#012858]"}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold">{p.name}</h3>
              <p className={featured ? "mt-1 text-sm text-blue-100" : "mt-1 text-sm text-gray-600"}>{p.tagline}</p>

              <p className="mt-5 flex items-baseline gap-2">
                <span className={featured ? "text-5xl font-extrabold text-white" : "text-5xl font-extrabold text-[#012858]"}>{p.priceLabel}</span>
                <span className={featured ? "text-sm text-blue-200" : "text-sm text-gray-600"}>{p.priceNote}</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {p.includes.map((item) => (
                  <li key={item} className={featured ? "flex items-start gap-2.5 text-sm text-blue-50" : "flex items-start gap-2.5 text-sm text-gray-800"}>
                    <span className={featured ? "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/90 text-[#011B40]" : "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"}>
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <PlanCta
                plan={p.id}
                className={
                  featured
                    ? "group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-[#C90D11]"
                    : "group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#012858] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#024692]"
                }
              >
                {p.cta}
              </PlanCta>
            </div>
          </article>
        )
      })}
    </div>
  )
}
