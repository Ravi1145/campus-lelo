import Link from "next/link"
import { ArrowRight, BookOpen, CalendarCheck, GraduationCap, Target, type LucideIcon } from "lucide-react"
import { colleges } from "@/data/colleges"

// Four entry cards right under the hero, the same job KollegeApply's "Explore" row does: one clear door each for
// colleges, exams, courses and the predictor. Only facts we can show are used (the college count is the real
// number of colleges in our data; links are pages that exist). Server component, no client JS.

interface Card { title: string; text: string; icon: LucideIcon; href: string; cta: string; chips: { label: string; href: string }[]; tint: string }

export default function ExploreCards() {
  const cards: Card[] = [
    {
      title: "Colleges", icon: GraduationCap, href: "/colleges", cta: "Browse all colleges", tint: "bg-blue-50 text-[#024692]",
      text: `${colleges.length}+ colleges with fees, courses and accepted exams.`,
      chips: [{ label: "Pune", href: "/colleges-in-pune" }, { label: "Noida", href: "/colleges-in-noida" }, { label: "Greater Noida", href: "/colleges-in-greater-noida" }],
    },
    {
      title: "Entrance exams", icon: CalendarCheck, href: "/exams", cta: "See all exams", tint: "bg-red-50 text-[#C90D11]",
      text: "Dates, eligibility and pattern, each linked to the official source.",
      chips: [{ label: "CAT", href: "/exams/cat" }, { label: "XAT", href: "/exams/xat" }, { label: "CMAT", href: "/exams/cmat" }, { label: "MAT", href: "/exams/mat" }],
    },
    {
      title: "Courses", icon: BookOpen, href: "/courses", cta: "Explore courses", tint: "bg-amber-50 text-amber-800",
      text: "Course length, the exams asked and the colleges that offer it.",
      chips: [{ label: "MBA", href: "/mba" }, { label: "BBA", href: "/courses/bba-bachelor-business-administration-pune" }, { label: "BCA", href: "/courses/bca-bachelor-computer-applications-pune" }, { label: "B.Tech", href: "/courses/btech-computer-engineering-pune" }],
    },
    {
      title: "College predictor", icon: Target, href: "/predictor", cta: "Predict my options", tint: "bg-emerald-50 text-emerald-700",
      text: "Enter your score and see colleges to aim for. Free, no sign-up.",
      chips: [{ label: "MBA cut-offs", href: "/mba-cutoff-checker" }, { label: "Compare", href: "/compare" }],
    },
  ]

  return (
    <section aria-labelledby="explore-h" className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[calc(var(--container-7xl)+6rem)] px-5 sm:px-8 lg:px-12">
        <h2 id="explore-h" className="sr-only">Explore CampusLelo</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title, text, icon: Icon, href, cta, chips, tint }) => (
            <li key={title} className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:ring-[#012858]/30">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="mt-3 text-lg font-bold text-[#012858]">{title}</h3>
              <p className="mt-1 text-sm leading-snug text-gray-600">{text}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {chips.map((c) => (
                  <li key={c.label}><Link href={c.href} className="inline-block rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold text-[#012858] ring-1 ring-gray-200 hover:ring-[#012858]">{c.label}</Link></li>
                ))}
              </ul>
              <Link href={href} className="group mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-[#C90D11] hover:underline">
                {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
