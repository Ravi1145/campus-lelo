import Link from "next/link"
import { ArrowUpRight, BadgeCheck, BarChart3, Brain, ClipboardList, Compass, GitCompare, Grid3x3, Sparkles } from "lucide-react"
import Reveal from "./Reveal"
import type { HeroProof } from "./HeroSection"

// "Start here": the tools students can use today, next to the reason to trust them. Built from the
// portal research: competitors lead with predictors and comparisons but show no source on figures.

const TOOLS = [
  { icon: Brain, title: "Psychometric test", desc: "Ten minutes, one question at a time. See your work style and a short reasoning check, then what to explore.", href: "/psychometric-test", tag: "New" },
  { icon: Compass, title: "Career quiz", desc: "48 short statements, 8 minutes. See your interest code and which study paths fit, from engineering to MBA.", href: "/career-quiz", tag: "New" },
  { icon: ClipboardList, title: "My admission plan", desc: "Pick your exams and city. Get your dates and colleges on one page, every line with its source and check date.", href: "/my-admission-plan", tag: "New" },
  { icon: BarChart3, title: "MBA cut-off checker", desc: "Type your CAT percentiles and see which published minimums you meet, and by how much you miss the rest.", href: "/mba-cutoff-checker" },
  { icon: Grid3x3, title: "Exam acceptance table", desc: "Pick the exams you took. Only colleges that list all of them stay in view, each linked to its own page.", href: "/mba-exam-acceptance" },
  { icon: Sparkles, title: "AI college finder", desc: "Answer four questions about stream, exam, score and budget and get a matched shortlist.", href: "/ai-finder" },
  { icon: GitCompare, title: "Compare two colleges", desc: "Put two colleges side by side on the facts we have checked.", href: "/compare" },
]

export default function StartHere(_props: { proof: HeroProof }) {
  return (
    <section aria-labelledby="start-heading" className="section-ivory px-4 py-16 sm:px-6 sm:py-20">
      <Reveal className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="reveal-item lg:col-span-5" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#C90D11]">Why trust the numbers</p>
          <h2 id="start-heading" className="mt-2 text-3xl font-bold leading-tight text-[#012858] sm:text-4xl">Every figure has a source and a date</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
            We read each college&apos;s own admission page, link it, and show the day we checked. If we cannot confirm a fact, we leave it out, and we say so.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray-800">
            <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span><strong>The official page is linked</strong> next to every exam, eligibility and cut-off fact</span></li>
            <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span><strong>The year is shown</strong>, so a 2024 cut-off is never passed off as this year&apos;s</span></li>
            <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span><strong>Gaps are stated</strong>: colleges that publish no cut-off are listed as such, not guessed</span></li>
          </ul>
          <Link href="/editorial-policy" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#012858] underline-offset-4 hover:underline">
            How we verify data <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {TOOLS.map(({ icon: Icon, title, desc, href, tag }, i) => (
            <li key={title} className="reveal-item" style={{ "--i": i + 1 } as React.CSSProperties}>
              <Link href={href} className="group relative flex h-full flex-col rounded-3xl bg-[#F1F4F9] p-6 ring-1 ring-transparent transition-colors duration-200 hover:bg-white hover:ring-[#012858]/30">
                <span className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#012858] text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"><Icon className="h-6 w-6" aria-hidden="true" /></span>
                  {tag && <span className="rounded-full bg-[#E0170F] px-2.5 py-1 text-[11px] font-bold text-white">{tag}</span>}
                </span>
                <span className="mt-5 block text-lg font-bold text-[#012858]">{title}</span>
                <span className="mt-1.5 block flex-1 text-sm leading-relaxed text-gray-700">{desc}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11]">
                  Open <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
