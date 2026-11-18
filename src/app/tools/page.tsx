import { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Calculator, CalendarDays, ClipboardCheck, GraduationCap, Headphones, ListChecks, Search, Sparkles, TrendingUp, Table2 } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import StartHere from "@/components/home/StartHere"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "Free College Tools: Test, Quiz, Admission Plan",
  description: "Free tools for choosing a college: a psychometric test, a career quiz, an admission plan with sources, an MBA cut-off checker, an exam acceptance table and more.",
  path: "/tools",
  keywords: ["free psychometric test after 12th", "career quiz after 12th", "college admission planner", "mba cutoff checker", "college predictor", "college fees calculator"],
})

const MORE = [
  { href: "/predictor", label: "College predictor", desc: "Find colleges by your entrance score", icon: GraduationCap },
  { href: "/roi-calculator", label: "ROI calculator", desc: "Compare fees against expected returns", icon: Calculator },
  { href: "/pune-college-fees-calculator", label: "Fees calculator", desc: "Add up the total course fee", icon: TrendingUp },
  { href: "/pune-admission-deadline-tracker-2026", label: "Admission deadlines", desc: "The 2026 deadline tracker", icon: CalendarDays },
  { href: "/ai-counselor", label: "AI career counsellor", desc: "Chat through your options", icon: Sparkles },
  { href: "/counselling", label: "Free counselling", desc: "Talk to an expert", icon: Headphones },
]

const MBA_TOOLS = [
  { href: "/mba-cutoff-checker", label: "MBA cut-off checker", desc: "Compare your score with published cut-offs", icon: ClipboardCheck },
  { href: "/mba-exam-acceptance", label: "Exam acceptance table", desc: "Which colleges take your exam", icon: Table2 },
  { href: "/mba-exam-calendar", label: "MBA exam calendar", desc: "Registration and test dates in one place", icon: CalendarDays },
  { href: "/blog/mba-pgdm-application-deadlines-2027-intake-delhi-ncr", label: "2027 application deadlines", desc: "Institute and exam last dates", icon: ListChecks },
  { href: "/mba-searches", label: "Fees, cut-offs and deadlines index", desc: "Every verified institute on one page", icon: Search },
  { href: "/mba-admission-in-delhi#lead-form", label: "Free Delhi MBA/PGDM shortlist", desc: "A counsellor matches your score and budget", icon: Headphones },
]

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateBreadcrumbSchema([
        { name: "Home", url: "/" }, { name: "Free tools", url: "/tools" },
      ])) }} />

      <div className="bg-[#012858] text-white">
        <div className="mx-auto max-w-[calc(var(--container-7xl)+6rem)] px-5 py-8 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-2 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link><span>›</span><span className="text-white">Free tools</span>
          </nav>
          <h1 className="text-2xl font-extrabold md:text-3xl">Free tools for choosing a college</h1>
          <p className="mt-2 max-w-3xl text-blue-100">Work out what suits you, check your scores against published cut-offs, and plan your admission dates. Every figure carries its source and the date we checked it.</p>
        </div>
      </div>

      <StartHere />

      <section aria-labelledby="mba-tools-heading" className="px-5 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[calc(var(--container-7xl)+6rem)]">
          <h2 id="mba-tools-heading" className="text-lg font-bold text-[#012858]">MBA and PGDM tools</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MBA_TOOLS.map(({ href, label, desc, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="group flex h-full items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-gray-200 transition-shadow hover:shadow-[0_10px_26px_-14px_rgba(1,40,88,0.35)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C90D11] text-white transition-transform group-hover:-rotate-6"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span>
                    <span className="flex items-center gap-1 text-sm font-bold text-[#012858]">{label}<ArrowUpRight className="h-3.5 w-3.5 text-[#C90D11]" aria-hidden="true" /></span>
                    <span className="mt-0.5 block text-sm text-gray-700">{desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="more-tools-heading" className="px-5 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[calc(var(--container-7xl)+6rem)]">
          <h2 id="more-tools-heading" className="text-lg font-bold text-[#012858]">Calculators and counselling</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MORE.map(({ href, label, desc, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="group flex h-full items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-gray-200 transition-shadow hover:shadow-[0_10px_26px_-14px_rgba(1,40,88,0.45)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#012858] text-white transition-transform group-hover:-rotate-6"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span>
                    <span className="flex items-center gap-1 text-sm font-bold text-[#012858]">{label}<ArrowUpRight className="h-3.5 w-3.5 text-[#C90D11]" aria-hidden="true" /></span>
                    <span className="mt-0.5 block text-sm text-gray-700">{desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
