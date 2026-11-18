import Link from "next/link"
import { ArrowRight, ExternalLink, FileCheck2, ShieldCheck, Trophy } from "lucide-react"
import { OFFICIAL_FEES } from "@/data/mba/officialFees"
import { programAdmissions } from "@/data/mba/programAdmissions"

// The home page's focal band for the business's main audience: students applying to MBA and PGDM in Delhi NCR.
// Every figure is the institute's own, with the batch, what it covers and the source. Server component.
const FLAGSHIP = "/blog/mba-in-delhi-ncr-2027-colleges-fees-cutoffs-admission"

export default function MbaFocusBand() {
  const verified = programAdmissions.length
  return (
    <section aria-labelledby="mba-band-h" className="bg-[#012858] px-5 py-10 text-white sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto grid max-w-[calc(var(--container-7xl)+6rem)] gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200">MBA and PGDM · Delhi NCR · 2027 intake</p>
          <h2 id="mba-band-h" className="mt-3 font-[family-name:var(--font-fraunces)] text-2xl font-bold leading-tight sm:text-4xl">
            What the fee actually is, from the institute itself
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100 sm:mt-4 sm:text-base">
            Education websites quote different fees for the same institute, sometimes on two pages of the same site. We show only the figure each institute publishes, for the batch it names, and say what it covers, so you can compare like with like.
          </p>
          <ul className="mt-6 hidden gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              { icon: ShieldCheck, t: `${verified} programmes`, d: "checked against official pages" },
              { icon: FileCheck2, t: "Source and date", d: "on every figure" },
              { icon: Trophy, t: "NIRF 2025", d: "ranks copied as published" },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                <Icon className="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                <span className="text-sm leading-tight"><strong className="block font-bold">{t}</strong><span className="text-blue-100">{d}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-7">
            <Link href={FLAGSHIP} className="inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C90D11]">
              Read the Delhi NCR 2027 guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/mba-admission-in-delhi#lead-form" className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#012858]">
              Get a free shortlist
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 text-[#0F172A] shadow-2xl shadow-black/30 sm:p-6">
          <h3 className="px-1 text-sm font-extrabold uppercase tracking-wider text-[#012858]">Official fees by institute</h3>
          <ul className="mt-3 divide-y divide-gray-100">
            {OFFICIAL_FEES.map((f, i) => (
              <li key={f.id} className={`${i >= 4 ? "hidden sm:flex" : "flex"} flex-wrap items-center justify-between gap-x-4 gap-y-1 px-1 py-3`}>
                <div className="min-w-0">
                  <p className="font-bold text-[#012858]">{f.name} <span className="text-xs font-semibold text-gray-500">· {f.city}</span></p>
                  <p className="text-xs leading-snug text-gray-600">{f.covers} · {f.batch}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <p className="text-base font-extrabold tabular-nums text-[#C90D11]">{f.fee}</p>
                  <p className="flex items-center gap-3 text-xs font-semibold">
                    <Link href={f.guide} className="text-[#024692] hover:underline">Details</Link>
                    <a href={f.source.url} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-1 text-gray-600 hover:text-[#012858]" aria-label={`${f.source.label} (opens the official page)`}>
                      Source <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-3 px-1 text-xs leading-relaxed text-gray-600">Institutes revise fees, so confirm on the official page before you pay. IIT Delhi DMS, IMI, LBSIM and FIIB are not shown because we have not verified their totals yet. <Link href="/mba-searches" className="font-semibold text-[#024692] hover:underline">See every institute</Link>.</p>
        </div>
      </div>
    </section>
  )
}
