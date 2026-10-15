import type { Metadata } from "next"
import Link from "next/link"
import { CalendarClock, Download, FileText, Mail, Newspaper, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import CopyBox from "@/components/ui/CopyBox"

export const revalidate = 86400

export const metadata: Metadata = genMeta({
  title: "Press & Media Kit | CampusLelo",
  description: "About CampusLelo, topics our editors can comment on, citable data (MBA exam calendar, published cut-offs) and logo downloads for journalists and bloggers.",
  path: "/press",
  keywords: ["campuslelo press", "campuslelo media kit"],
})

const BOILERPLATE =
  "CampusLelo (campuslelo.com) is an AI-powered college discovery portal for students in Pune and Delhi NCR. It helps students compare colleges and understand entrance exams, with a dedicated MBA and PGDM section that links every exam date and cut-off to its official source."

const TOPICS = [
  "How MBA and PGDM admissions work: entrance exams, dates, shortlisting and cut-offs",
  "MBA vs PGDM: approval, recognition and equivalence",
  "How to read a college placement report and total fee before choosing",
  "Choosing colleges in Pune and Delhi NCR by exam score, budget and city",
  "Why students should check official sources before paying a seat-confirmation fee",
]

const DATA = [
  { href: "/mba-exam-calendar", title: "MBA entrance exam calendar 2026–27", desc: "Registration and exam dates for nine exams, with a free CSV and embeddable widget." },
  { href: "/mba-cutoff-delhi-ncr", title: "MBA cut-offs in Delhi NCR", desc: "Only officially published cut-offs, with exactly what each number measures." },
  { href: "/mba-vs-pgdm", title: "MBA vs PGDM explained", desc: "What the difference means for admission, recognition and jobs." },
  { href: "/editorial-policy", title: "Editorial and data policy", desc: "How facts are sourced, reviewed and corrected." },
]

const ASSETS = [
  { href: "/logo.svg", label: "Logo (SVG)" },
  { href: "/logo.png", label: "Logo (PNG)" },
  { href: "/og-image.png", label: "Social card (PNG)" },
]

export default function PressPage() {
  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Press & media kit", url: "/press" }])
  return (
    <>
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />

      <div className="bg-rich-navy relative overflow-hidden">
        <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-5 flex gap-1.5 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span><span className="text-white" aria-current="page">Press &amp; media kit</span>
          </nav>
          <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl"><Newspaper className="h-9 w-9 text-orange-300" aria-hidden="true" /> Press &amp; media kit</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">Writing about MBA admissions or colleges in Pune and Delhi NCR? Here is what you can quote, cite and download.</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 sm:px-6">
        <section aria-labelledby="about-h">
          <h2 id="about-h" className="text-2xl font-extrabold text-[#012858]">About CampusLelo</h2>
          <p className="mt-3 text-gray-700">{BOILERPLATE}</p>
          <div className="mt-4"><CopyBox label="Boilerplate (copy and paste)" text={BOILERPLATE} rows={4} /></div>
        </section>

        <section aria-labelledby="topics-h">
          <h2 id="topics-h" className="text-2xl font-extrabold text-[#012858]">Topics our editors can comment on</h2>
          <ul className="mt-4 space-y-2.5">
            {TOPICS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-gray-800"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E0170F]" />{t}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="data-h">
          <h2 id="data-h" className="flex items-center gap-2 text-2xl font-extrabold text-[#012858]"><ShieldCheck className="h-6 w-6 text-emerald-600" aria-hidden="true" /> Data you can cite</h2>
          <p className="mt-1 text-sm text-gray-600">Every fact on these pages links to its source and review date. You are welcome to cite them with a link.</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {DATA.map((d) => (
              <li key={d.href} className="group relative rounded-2xl bg-white p-5 ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-[#012858]/25">
                <h3 className="flex items-center gap-2 font-extrabold text-[#012858]">
                  {d.href === "/mba-exam-calendar" ? <CalendarClock className="h-4 w-4 text-[#C90D11]" aria-hidden="true" /> : <FileText className="h-4 w-4 text-[#C90D11]" aria-hidden="true" />}
                  <Link href={d.href} className="before:absolute before:inset-0 group-hover:text-[#C90D11]">{d.title}</Link>
                </h3>
                <p className="mt-1.5 text-sm text-gray-600">{d.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="assets-h">
          <h2 id="assets-h" className="text-2xl font-extrabold text-[#012858]">Logo and brand assets</h2>
          <p className="mt-1 text-sm text-gray-600">Please use the logo unaltered, with clear space around it, and link to campuslelo.com.</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {ASSETS.map((a) => (
              <li key={a.href}>
                <a href={a.href} download className="inline-flex items-center gap-2 rounded-xl bg-[#012858] px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#024692]">
                  <Download className="h-4 w-4" aria-hidden="true" /> {a.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="contact-h" className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
          <h2 id="contact-h" className="text-2xl font-extrabold text-[#012858]">Contact</h2>
          <p className="mt-2 text-gray-700">For interviews, quotes or corrections, email the editorial team. Please mention your outlet and deadline.</p>
          <a href="mailto:support@campuslelo.com?subject=Press%20enquiry" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition hover:bg-[#C90D11]">
            <Mail className="h-4 w-4" aria-hidden="true" /> support@campuslelo.com
          </a>
        </section>
      </div>
    </>
  )
}
