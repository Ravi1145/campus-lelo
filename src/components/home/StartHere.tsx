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
    <section aria-labelledby="start-heading" className="section-ivory px-4 py-10 sm:px-6 sm:py-12">
      <Reveal className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="reveal-item lg:col-span-5" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-xs font-bold uppercase tracking-widest text-[#C90D11]">Why trust the numbers</p>
          <h2 id="start-heading" className="mt-2 text-3xl font-bold leading-tight text-[#012858] sm:text-4xl">Every figure has a source and a date</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
            We read each college&apos;s own admission page, link it, and show the day we checked. If we cannot confirm a fact, we leave it out, and we say so.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-800">
            <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span><strong>The official page is linked</strong> next to every exam, eligibility and cut-off fact</span></li>
            <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span><strong>The year is shown</strong>, so a 2024 cut-off is never passed off as this year&apos;s</span></li>
            <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" /><span><strong>Gaps are stated</strong>: colleges that publish no cut-off are listed as such, not guessed</span></li>
          </ul>
          <Link href="/editorial-policy" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#012858] underline-offset-4 hover:underline">
            How we verify data <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 lg:col-span-7 lg:grid-cols-3">
          {TOOLS.map(({ icon: Icon, title, desc, href, tag }, i) => (
            <li key={title} className="reveal-item" style={{ "--i": i + 1 } as React.CSSProperties}>
              <Link href={href} className="group relative flex h-full flex-col rounded-2xl bg-[#F1F4F9] p-3.5 ring-1 ring-transparent transition-colors duration-200 hover:bg-white hover:ring-[#012858]/30">
                <span className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#012858] text-white transition-transform duration-300 group-hover:-rotate-6"><Icon className="h-[18px] w-[18px]" aria-hidden="true" /></span>
                  {tag && <span className="rounded-full bg-[#E0170F] px-2 py-0.5 text-[10px] font-bold text-white">{tag}</span>}
                </span>
                <span className="mt-2.5 flex items-center gap-1 text-sm font-bold text-[#012858]">{title}<ArrowUpRight className="h-3.5 w-3.5 text-[#C90D11]" aria-hidden="true" /></span>
                <span className="mt-1 line-clamp-3 text-xs leading-relaxed text-gray-700">{desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
