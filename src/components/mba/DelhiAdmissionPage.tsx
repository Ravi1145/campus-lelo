import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarClock, ExternalLink, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import AnswerBlock from "@/components/seo/AnswerBlock"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { publishedCutoffs } from "@/data/mba/cutoffs"
import { getMbaExam } from "@/data/mba/exams"
import { examCalendarRows } from "@/lib/mbaCalendar"
import { INSTITUTE_SHORT } from "@/data/mba/instituteLabels"
import { delhiLeadGuides } from "@/data/blog-posts/delhi-lead-guides"

// Admission-process landing pages for Delhi (MBA and PGDM). Every institute, exam, intake and note is read from
// programAdmissions.ts, so the page never says more than the verified records do.

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const examName = (slug: string) => getMbaExam(slug)?.name ?? slug.toUpperCase()
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`)
const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })

export type DelhiAdmissionKind = "mba" | "pgdm"

const DEF = {
  mba: {
    path: "/mba-admission-in-delhi",
    type: "MBA" as const,
    title: "MBA Admission in Delhi 2027: Exams, Process, Dates",
    description: "How MBA admission works at FMS, IIFT and IIT Delhi DMS: the exam each uses, the steps after the score, key exam dates and a free shortlist. Checked against official pages.",
    h1: "MBA Admission in Delhi 2027",
    keywords: ["mba admission in delhi", "mba admission delhi 2027", "mba colleges in delhi admission open", "mba admission process delhi", "fms delhi admission process", "iift mba admission process", "iit delhi dms mba admission", "mba admission delhi university"],
    other: { href: "/pgdm-admission-in-delhi", label: "PGDM admission in Delhi" },
  },
  pgdm: {
    path: "/pgdm-admission-in-delhi",
    type: "PGDM" as const,
    title: "PGDM Admission in Delhi 2027: Exams, Process, Dates",
    description: "How PGDM admission works at IMI, FORE, LBSIM and FIIB: the exams each accepts, the steps after the score, key exam dates and a free shortlist. Checked against official pages.",
    h1: "PGDM Admission in Delhi 2027",
    keywords: ["pgdm admission in delhi", "pgdm delhi admission 2027", "pgdm admission delhi 2026", "pgdm admission process delhi", "imi delhi pgdm admission", "fore school pgdm admission", "lbsim pgdm admission", "fiib pgdm admission 2027"],
    other: { href: "/mba-admission-in-delhi", label: "MBA admission in Delhi" },
  },
}

export function delhiAdmissionMetadata(kind: DelhiAdmissionKind): Metadata {
  const d = DEF[kind]
  return genMeta({ title: d.title, description: d.description, path: d.path, keywords: d.keywords })
}

export default function DelhiAdmissionPage({ kind }: { kind: DelhiAdmissionKind }) {
  const d = DEF[kind]
  const programmes = programAdmissions.filter((p) => p.city === "Delhi" && p.programType === d.type)
  const exams = Array.from(new Set(programmes.flatMap((p) => p.examsAccepted)))
  const calendar = examCalendarRows().filter((r) => exams.includes(r.slug))
  const cutoffs = publishedCutoffs.filter((c) => c.city === "Delhi" && programmes.some((p) => c.institution.includes(INSTITUTE_SHORT[p.id]?.split(" ")[0] ?? "~~~")))
  const updated = programmes.map((p) => p.source.accessed).sort().pop() ?? "2026-10-16"
  const today = new Date().toISOString().slice(0, 10)
  const guides = delhiLeadGuides.filter((g) => g.publishAt <= today)
  const names = programmes.map((p) => INSTITUTE_SHORT[p.id] ?? p.institution)

  const answer = `${d.type} admission in Delhi starts with an entrance score, then the institute's own selection round. We have verified ${programmes.length} Delhi ${d.type} programmes against their official pages: ${list(programmes.map((p) => `${INSTITUTE_SHORT[p.id] ?? p.institution} (${p.examsAccepted.length ? list(p.examsAccepted.map(examName)) : "see its page"})`))}. Exam acceptance and dates change every cycle, so confirm on the institute's page before you register.`

  const steps = [
    { h: "Pick the exam you can take this cycle", p: `Among the Delhi ${d.type} programmes we verified, the exams listed are ${list(exams.map(examName))}. Check the registration dates below before you choose.` },
    { h: "Check eligibility on the institute's page", p: "Eligibility (graduation percentage, work experience, final-year rules) is set by each institute and can differ by programme. Read the line on its admission page, then our eligibility guide." },
    { h: "Register for the exam, then apply to each institute", p: "Exam registration and an institute's own application are separate steps with separate fees. An institute application is usually where you add your profile and, for some, your preferences." },
    { h: "Prepare for the selection round", p: "After the score, institutes typically hold a group discussion, written test or personal interview, or a mix. The exact steps for each programme are in the notes below." },
    { h: "Compare offers before you pay", p: "Compare the programme approval, total fees and the latest placement report from the institute itself before you pay a seat fee." },
  ]

  const faqs = [
    { question: `How do I get ${d.type} admission in Delhi?`, answer },
    { question: `Which exams are accepted for ${d.type} in Delhi?`, answer: `For the Delhi ${d.type} programmes we verified: ${programmes.map((p) => `${INSTITUTE_SHORT[p.id] ?? p.institution} lists ${p.examsAccepted.length ? list(p.examsAccepted.map(examName)) : "the exams on its admission page"}`).join("; ")}.` },
    { question: `Can I get ${d.type} admission in Delhi without CAT?`, answer: programmes.some((p) => p.examsAccepted.some((e) => e !== "cat")) ? `Some programmes list another exam as well as CAT: ${list(programmes.filter((p) => p.examsAccepted.some((e) => e !== "cat")).map((p) => INSTITUTE_SHORT[p.id] ?? p.institution))}. Others, such as ${list(programmes.filter((p) => p.examsAccepted.every((e) => e === "cat")).map((p) => INSTITUTE_SHORT[p.id] ?? p.institution)) || "none we verified"}, list only CAT. See the Delhi without-CAT page for the full picture.` : `The ${d.type} programmes we verified in Delhi all list CAT. Check each institute's page for any other route.` },
    { question: "What are the fees and placements?", answer: "Fees and placement results differ by institute, programme and year, and we do not publish numbers we cannot source. Use each institute's own fee structure and placement report." },
    { question: "How do you verify this information?", answer: `Each programme links to the institute's own admission page and shows the date we checked it (latest: ${fmt(updated)}). If we cannot confirm a fact, we leave it out.` },
  ]

  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "MBA & PGDM guide", url: "/mba" }, { name: d.h1, url: d.path }])
  const webPage = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE}${d.path}`, url: `${BASE}${d.path}`, name: d.h1, description: answer, inLanguage: "en-IN",
    dateModified: updated, isPartOf: { "@id": `${BASE}/#website` }, publisher: { "@type": "Organization", name: "CampusLelo", url: BASE },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
    citation: programmes.map((p) => ({ "@type": "CreativeWork", name: p.source.label, url: p.source.url })),
  }
  const howTo = { "@context": "https://schema.org", "@type": "HowTo", name: `How to get ${d.type} admission in Delhi`, step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.h, text: s.p })) }

  const more = [
    d.other,
    { href: kind === "mba" ? "/mba-colleges-in-delhi" : "/pgdm-colleges-in-delhi", label: kind === "mba" ? "MBA colleges in Delhi" : "PGDM colleges in Delhi" },
    { href: "/mba-colleges-in-delhi-without-cat", label: "MBA in Delhi without CAT" },
    { href: "/mba-colleges-in-delhi-accepting-cat", label: "Delhi colleges accepting CAT" },
    { href: "/mba-colleges-in-delhi-accepting-xat", label: "Delhi colleges accepting XAT" },
    { href: "/mba-colleges-in-delhi-accepting-gmat", label: "Delhi colleges accepting GMAT" },
    { href: "/best-mba-colleges-in-delhi", label: "Best MBA colleges in Delhi (NIRF 2025)" },
    { href: "/mba-cutoff-delhi-ncr", label: "MBA cut-offs in Delhi NCR" },
    { href: "/mba-colleges-in-delhi-ncr", label: "MBA colleges in Delhi NCR" },
    { href: "/mba-exam-calendar", label: "MBA exam calendar" },
  ]

  return (
    <>
      <script id="webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPage) }} />
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      <script id="howto" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(howTo) }} />

      <div className="bg-rich-navy relative overflow-hidden">
        <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-1.5 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span>
            <Link href="/mba" className="hover:text-white">MBA &amp; PGDM guide</Link><span aria-hidden="true">›</span>
            <span className="text-white" aria-current="page">{d.h1}</span>
          </nav>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">{d.h1}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">{d.description}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20">
            <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" /> Every programme links to its official source
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 space-y-10">
          <AnswerBlock id="adm-q" question={`How do I get ${d.type} admission in Delhi?`} updated={updated}><p>{answer}</p></AnswerBlock>

          <section aria-labelledby="steps-h">
            <h2 id="steps-h" className="text-2xl font-extrabold text-[#012858]">{d.type} admission in Delhi: step by step</h2>
            <ol className="mt-4 space-y-3">
              {steps.map((s, i) => (
                <li key={s.h} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-gray-200">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#012858] text-sm font-extrabold text-white" aria-hidden="true">{i + 1}</span>
                  <span><span className="block font-bold text-gray-900">{s.h}</span><span className="mt-1 block text-sm leading-relaxed text-gray-700">{s.p}</span></span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="progs-h">
            <h2 id="progs-h" className="text-2xl font-extrabold text-[#012858]">How each Delhi {d.type} programme admits</h2>
            <p className="mt-1 text-sm text-gray-600">From each institute&apos;s own page. Intake is the batch the source refers to.</p>
            <div className="mt-4 space-y-3">
              {programmes.map((p) => (
                <article key={p.id} className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
                  <h3 className="text-lg font-extrabold text-[#012858]"><Link href={`/mba-admission/${p.id}`} className="hover:text-[#C90D11] hover:underline">{INSTITUTE_SHORT[p.id] ?? p.institution}</Link></h3>
                  <p className="text-xs text-gray-600">{p.program} · intake {p.intake}</p>
                  <p className="mt-2 text-sm text-gray-800"><strong>Exams listed:</strong> {p.examsAccepted.length ? list(p.examsAccepted.map(examName)) : "see its admission page"}</p>
                  {p.notes && <p className="mt-2 text-sm leading-relaxed text-gray-700">{p.notes}</p>}
                  <p className="mt-2 text-xs text-gray-600">
                    <a href={p.source.url} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-1 font-semibold text-[#024692] hover:underline">{p.source.label} <ExternalLink className="h-3 w-3" aria-hidden="true" /></a> · checked {fmt(p.source.accessed)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {calendar.length > 0 && (
            <section aria-labelledby="dates-h">
              <h2 id="dates-h" className="flex items-center gap-2 text-2xl font-extrabold text-[#012858]"><CalendarClock className="h-6 w-6 text-[#C90D11]" aria-hidden="true" /> Exam dates you need</h2>
              <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-gray-200">
                <table className="w-full min-w-[34rem] text-sm">
                  <caption className="sr-only">Registration and exam dates for the exams these programmes accept</caption>
                  <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600"><tr><th scope="col" className="px-4 py-3">Exam</th><th scope="col" className="px-4 py-3">Registration</th><th scope="col" className="px-4 py-3">Exam</th></tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {calendar.map((r) => (
                      <tr key={r.slug} className="align-top">
                        <th scope="row" className="px-4 py-3 text-left"><Link href={`/exams/${r.slug}`} className="font-extrabold text-[#012858] hover:text-[#C90D11]">{r.name}</Link></th>
                        <td className="px-4 py-3 text-gray-800">{r.registration}</td>
                        <td className="px-4 py-3 text-gray-800">{r.examDate}{r.note && <span className="mt-1 block text-xs text-amber-800">{r.note}</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-gray-600">All exams in one place: <Link href="/mba-exam-calendar" className="font-bold text-[#C90D11] hover:underline">MBA exam calendar</Link>.</p>
            </section>
          )}

          {cutoffs.length > 0 && (
            <section aria-labelledby="cut-h">
              <h2 id="cut-h" className="text-2xl font-extrabold text-[#012858]">Published cut-offs</h2>
              <div className="mt-4 space-y-3">
                {cutoffs.map((c) => (
                  <div key={c.institution} className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
                    <p className="font-extrabold text-[#012858]">{c.institution}</p>
                    <p className="text-xs text-gray-600">{c.program} · {c.admissionYear} · {c.examCycle}</p>
                    <p className="mt-2 text-sm text-gray-800"><strong>{c.measure}:</strong> {c.values.map((v) => `${v.category}: ${v.value}`).join("; ")}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="cta-h" className="rounded-3xl bg-[#012858] p-6 text-white sm:p-8">
            <h2 id="cta-h" className="text-2xl font-extrabold">Get a free {d.type} shortlist for Delhi</h2>
            <p className="mt-2 text-sm leading-relaxed text-blue-100">Tell us your exam, score and budget on the form. A counsellor shares realistic options and deadlines for {list(names)} and other Delhi NCR institutes. Free, and no obligation.</p>
            <p className="mt-3 text-sm"><a href="#lead-form" className="inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-5 py-3 font-bold text-white hover:bg-[#C90D11]">Fill the form <ArrowRight className="h-4 w-4" aria-hidden="true" /></a></p>
          </section>

          <section aria-labelledby="faq-h">
            <h2 id="faq-h" className="text-2xl font-extrabold text-[#012858]">Frequently asked questions</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((f) => (
                <details key={f.question} className="group rounded-2xl bg-white ring-1 ring-gray-200 open:shadow-lg open:shadow-blue-950/8 open:ring-[#012858]/30">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg leading-none text-[#012858] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {guides.length > 0 && (
            <section aria-labelledby="guides-h">
              <h2 id="guides-h" className="text-xl font-extrabold text-[#012858]">Guides for Delhi MBA and PGDM applicants</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {guides.map((g) => (
                  <li key={g.slug}><Link href={`/blog/${g.slug}`} className="group flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:text-[#012858] hover:ring-[#012858]">{g.title} <ArrowRight className="h-4 w-4 shrink-0 text-[#C90D11] transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="more-h">
            <h2 id="more-h" className="text-xl font-extrabold text-[#012858]">More Delhi MBA pages</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {more.map((m) => (
                <li key={m.href}><Link href={m.href} className="group flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:text-[#012858] hover:ring-[#012858]">{m.label} <ArrowRight className="h-4 w-4 shrink-0 text-[#C90D11] transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></li>
              ))}
            </ul>
          </section>
        </div>

        <aside id="lead-form" className="lg:sticky lg:top-[calc(var(--leadbar-h,0px)+7.5rem)] lg:self-start">
          <MbaLeadForm placement={`delhi-admission:${kind}`} city="Delhi NCR" source="mba_cluster" heading={`Free Delhi ${d.type} shortlist`} />
        </aside>
      </div>

      <RelatedMbaSearches path={d.path} />
    </>
  )
}
