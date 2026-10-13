import Link from "next/link"

// Plain links (no hooks, no server APIs) so it works inside client pages too.
// Gives tool pages a way forward instead of a dead end.
const STEPS = [
  { href: "/colleges", label: "Browse all colleges" },
  { href: "/mba", label: "MBA and PGDM guide" },
  { href: "/mba-exam-calendar", label: "MBA exam calendar" },
  { href: "/exams", label: "Entrance exam guides" },
  { href: "/mba-counselling", label: "Free MBA counselling" },
  { href: "/counselling", label: "College counselling" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/blog", label: "Admission guides" },
]

export type Step = { href: string; label: string }

export default function NextSteps({ exclude = "", steps = STEPS, title = "Where to go next" }: { exclude?: string; steps?: Step[]; title?: string }) {
  return (
    <section aria-label="Where to go next" className="mx-auto mt-10 max-w-6xl px-4 pb-10 sm:px-6">
      <h2 className="text-lg font-extrabold text-[#012858]">{title}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {steps.filter((s) => s.href !== exclude).map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition hover:text-[#C90D11] hover:ring-[#012858]/30">{s.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
