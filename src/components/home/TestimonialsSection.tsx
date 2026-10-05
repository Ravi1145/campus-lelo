import Link from "next/link"
import { ArrowRight, BadgeCheck, CalendarClock, GitCompare, Headphones, Sparkles, TrendingUp } from "lucide-react"
import Reveal from "./Reveal"
import { VIDEO_PRICE_INR } from "@/data/counselling"

// "Why CampusLelo" — replaces the old testimonials block. Every card describes a
// feature that exists on the site and links to it; no unverifiable quotes,
// ratings or student counts (see docs/archive/replaced-components-2026-10-05).

const FEATURES = [
  { icon: GitCompare, title: "Compare side by side", desc: "Put two colleges next to each other — fees, placements, exams accepted, NAAC and NIRF.", href: "/compare", cta: "Compare colleges" },
  { icon: Sparkles, title: "AI college finder", desc: "Answer four quick questions about your stream, score and budget and get a matched shortlist.", href: "/ai-finder", cta: "Try the finder" },
  { icon: CalendarClock, title: "Exam guides with dates", desc: "CAT, XAT, SNAP, NMAT, MAT and more — dates, pattern and eligibility, linked to the official source.", href: "/exams", cta: "See exam guides" },
  { icon: TrendingUp, title: "Published cut-offs", desc: "Only cut-offs that colleges or exam bodies have published — with the source and review date.", href: "/mba-cutoff-delhi-ncr", cta: "MBA cut-offs" },
]

export default function TestimonialsSection() {
  return (
    <section aria-labelledby="why-heading" className="py-16 px-4 sm:px-6 section-ivory">
      <Reveal className="mx-auto max-w-7xl">
        <div className="reveal-item max-w-2xl" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Why CampusLelo</p>
          <h2 id="why-heading" className="mt-2 text-3xl font-extrabold text-[#012858] sm:text-4xl">Everything you need to choose with confidence</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">Tools to research, compare and shortlist — and a human counsellor when you want one. Free for students.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Counselling feature card — large */}
          <div className="reveal-item relative overflow-hidden rounded-3xl bg-rich-navy p-7 text-white shadow-xl shadow-blue-950/20 sm:p-9 lg:row-span-2" style={{ "--i": 1 } as React.CSSProperties}>
            <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.1]" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-[#E0170F]/30 blur-3xl" />
            <div className="relative flex h-full flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-orange-300 ring-1 ring-white/20"><Headphones className="h-6 w-6" aria-hidden="true" /></span>
              <h3 className="mt-6 text-2xl font-extrabold leading-tight sm:text-3xl">Guidance that fits: a free call, or a ₹{VIDEO_PRICE_INR} video session</h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-100 sm:text-base">Not sure which college or exam is right? Start with free phone counselling, scholarship information and alumni to talk to. For one-to-one help with CAP rounds, career choice and a personal shortlist, book an expert video session.</p>
              <ul className="mt-6 space-y-3 text-sm text-blue-50">
                {["Free phone counselling, scholarships and alumni connect", `Expert video session — ₹${VIDEO_PRICE_INR}: CAP rounds, career choice, shortlist`, "Help with forms and deadlines"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5"><BadgeCheck className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />{t}</li>
                ))}
              </ul>
              <Link href="/counselling#plans" className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-[#C90D11] lg:mt-auto">
                See free and paid options <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Four feature cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
            {FEATURES.map(({ icon: Icon, title, desc, href, cta }, i) => (
              <Link key={title} href={href} className="reveal-item group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-[#012858]/25" style={{ "--i": i + 2 } as React.CSSProperties}>
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#E0170F] via-[#FB4312] to-[#024692] transition-transform duration-500 group-hover:scale-x-100" />
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#012858] to-[#024692] text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold text-[#012858]">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{desc}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11]">
                  {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Honest trust line */}
        <p className="reveal-item mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-gray-600" style={{ "--i": 7 } as React.CSSProperties}>
          <BadgeCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
          Exam dates and cut-offs link to their official source.
          <Link href="/editorial-policy" className="font-bold text-[#012858] underline-offset-2 hover:underline">How we verify data</Link>
        </p>
      </Reveal>
    </section>
  )
}
