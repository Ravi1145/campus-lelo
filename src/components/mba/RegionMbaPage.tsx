import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CalendarClock, ExternalLink, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import AnswerBlock from "@/components/seo/AnswerBlock"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import { ProgramList } from "@/components/exams/MbaExamPage"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { publishedCutoffs, noPublishedCutoff } from "@/data/mba/cutoffs"
import { getMbaExam } from "@/data/mba/exams"
import { examCalendarRows } from "@/lib/mbaCalendar"
import { getRegionPage, regionPages, type RegionPageDef } from "@/data/mba/regionPages"
import type { ProgramAdmission } from "@/data/mba/types"

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const examName = (slug: string) => getMbaExam(slug)?.name ?? slug.toUpperCase()
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`)
const short = (p: ProgramAdmission) => p.institution.match(/\(([A-Z][A-Za-z-]+)\)/)?.[1] ?? p.institution.split(",")[0]

function programmesFor(def: RegionPageDef): ProgramAdmission[] {
  return programAdmissions.filter((p) => {
    if (!def.cities.includes(p.city)) return false
    if (def.exam && !p.examsAccepted.includes(def.exam)) return false
    if (def.scope === "pgdm" && p.programType !== "PGDM") return false
    if (def.scope === "noCat" && p.examsAccepted.filter((e) => e !== "cat").length === 0) return false
    return true
  })
}

/** Programmes in the same cities that this page leaves out (used to be honest about CAT-only options). */
function leftOut(def: RegionPageDef, shown: ProgramAdmission[]) {
  const ids = new Set(shown.map((p) => p.id))
  return programAdmissions.filter((p) => def.cities.includes(p.city) && !ids.has(p.id))
}

export function regionMetadata(path: string): Metadata {
  const d = getRegionPage(path)!
  return genMeta({ title: d.title, description: d.description, path: d.path, keywords: d.keywords })
}

export default function RegionMbaPage({ path }: { path: string }) {
  const def = getRegionPage(path)!
  const programmes = programmesFor(def)
  const excluded = leftOut(def, programmes)
  const examSlugs = Array.from(new Set(programmes.flatMap((p) => p.examsAccepted)))
  const orderedExams = ["cat", "xat", "gmat", "cmat", "mat"].filter((e) => examSlugs.includes(e)).concat(examSlugs.filter((e) => !["cat", "xat", "gmat", "cmat", "mat"].includes(e)))
  const cutoffs = publishedCutoffs.filter((c) => def.cities.includes(c.city))
  const noCutoff = noPublishedCutoff.filter((c) => def.cities.includes(c.city))
  const calendar = examCalendarRows().filter((r) => orderedExams.includes(r.slug))
  const updated = [...programmes.map((p) => p.source.accessed), ...cutoffs.flatMap((c) => c.sources.map((s) => s.accessed))].sort().pop() ?? "2026-10-09"
  const placeIn = def.place === "Delhi NCR" ? "Delhi NCR" : def.place

  // ── answer block text (generated) ────────────────────────────────────────
  const names = programmes.map(short)
  const answer = programmes.length === 0
    ? `We have not yet verified any ${def.place} programmes for this exam. Check each institute's admission page.`
    : def.scope === "noCat"
      ? `Yes, for the programmes we have verified. ${list(names)} accept at least one exam besides CAT (${list(Array.from(new Set(programmes.flatMap((p) => p.examsAccepted.filter((e) => e !== "cat")).map(examName))))}). ${excluded.length ? `${list(excluded.map(short))} ${excluded.length === 1 ? "takes" : "take"} only CAT for the programmes we checked, so you would need a CAT score for ${excluded.length === 1 ? "it" : "them"}. ` : ""}Acceptance is set per programme and changes each cycle, so confirm on the institute's own page before you register.`
      : `We have verified ${programmes.length} ${def.exam ? `${examName(def.exam)}-accepting ` : ""}programme${programmes.length === 1 ? "" : "s"} in ${placeIn} against the institutes' official admission pages: ${list(programmes.map((p) => `${short(p)} (${p.examsAccepted.length ? list(p.examsAccepted.map(examName)) : "see its admission page"})`))}. Acceptance is set per programme and per intake, so confirm the current cycle on each institute's page.`

  // ── FAQs (all generated from the same records) ─────────────────────────────
  const faqs = [
    { question: def.question, answer },
    {
      question: `Which exams are accepted for MBA and PGDM in ${placeIn}?`,
      answer: programmes.length ? `Among the programmes we verified: ${programmes.map((p) => `${short(p)} ${p.examsAccepted.length ? `accepts ${list(p.examsAccepted.map(examName))}` : "uses the exams listed on its admission page"}`).join("; ")}.` : "We have not verified programmes for this selection yet.",
    },
    {
      question: `Is a PGDM from ${placeIn} the same as an MBA?`,
      answer: "Not automatically. An MBA is a degree awarded by a university; a PGDM is a diploma from an autonomous institute, usually AICTE-approved. Equivalence depends on the body that recognises it, so check the approval status of the exact programme. See our MBA vs PGDM guide.",
    },
    {
      question: `What are the fees and placements for MBA colleges in ${placeIn}?`,
      answer: "Fees and placement results differ by institute, programme and year, and we do not publish numbers we cannot source. Use each institute's own fee structure and placement report, and read our guides on total MBA cost and how to read a placement report.",
    },
    ...(cutoffs.length || noCutoff.length ? [{
      question: `What is the cut-off for MBA in ${placeIn}?`,
      answer: [
        ...cutoffs.map((c) => `${c.institution}: ${c.values.map((v) => `${v.category} ${v.value}`).join("; ")} (${c.measure}, ${c.examCycle})`),
        noCutoff.length ? `${list(noCutoff.map((n) => n.institution.replace(/\s*\(.*?\)/, "").split(",")[0]))} ${noCutoff.length === 1 ? "does" : "do"} not publish a fixed percentile cut-off.` : "",
      ].filter(Boolean).join(". ") + ".",
    }] : []),
    {
      question: "How do you verify this information?",
      answer: `Each programme above links to the institute's own admission page and shows the date we checked it (latest: ${new Date(updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}). If we cannot confirm a fact, we leave it out.`,
    },
  ]

  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "MBA & PGDM guide", url: "/mba" }, { name: def.h1, url: def.path }])
  const webPage = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE}${def.path}`, url: `${BASE}${def.path}`, name: def.h1, description: answer, inLanguage: "en-IN",
    dateModified: updated, isPartOf: { "@id": `${BASE}/#website` }, publisher: { "@type": "Organization", name: "CampusLelo", url: BASE },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
    citation: programmes.map((p) => ({ "@type": "CreativeWork", name: p.source.label, url: p.source.url })),
  }
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", name: def.h1, itemListElement: programmes.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: `${p.institution} — ${p.program}`, url: p.source.url })) }

  // Related pages plus every exam-specific page that covers an overlapping city (so none is left unlinked)
  const examSiblings = regionPages.filter((r) => r.exam && r.path !== def.path && r.cities.some((c) => def.cities.includes(c))).map((r) => r.path)
  const siblingPaths = Array.from(new Set([...def.related, ...examSiblings])).filter((h) => h !== def.path)
  const siblings = siblingPaths.map((href) => ({ href, def: regionPages.find((r) => r.path === href) }))
  const siblingLabel = (href: string, d?: RegionPageDef) => d?.h1 ?? ({
    "/mba-cutoff-delhi-ncr": "MBA cut-offs in Delhi NCR", "/mba-vs-pgdm": "MBA vs PGDM explained", "/mba-colleges-noida": "MBA colleges in Noida", "/pgdm-colleges-noida": "PGDM colleges in Noida",
    "/colleges-in-greater-noida": "All colleges in Greater Noida", "/blog/mba-colleges-delhi-ncr-noida-guide": "Delhi NCR & Noida MBA guide", "/blog/mba-without-cat-india": "MBA without CAT in India",
  } as Record<string, string>)[href] ?? (href.startsWith("/exams/") ? href.split("/").slice(2).map((s) => s.replace(/-/g, " ")).join(" · ").toUpperCase() : href)

  return (
    <>
      <script id="webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPage) }} />
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      {programmes.length > 0 && <script id="itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemList) }} />}

      <div className="bg-rich-navy relative overflow-hidden">
        <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-1.5 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span>
            <Link href="/mba" className="hover:text-white">MBA &amp; PGDM guide</Link><span aria-hidden="true">›</span>
            <span className="text-white" aria-current="page">{def.h1}</span>
          </nav>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">{def.h1}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">{def.description}</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20">
            <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" /> Every programme below links to its official source
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 space-y-10">
          <AnswerBlock id="region-q" question={def.question} updated={updated}><p>{answer}</p></AnswerBlock>

          {programmes.length > 0 && (
            <section aria-labelledby="progs-h">
              <h2 id="progs-h" className="text-2xl font-extrabold text-[#012858]">Verified programmes in {placeIn}</h2>
              <p className="mt-1 text-sm text-gray-600">Checked against each institute&apos;s admission page. Intake and date are shown for every record.</p>
              <div className="mt-4"><ProgramList programs={programmes} /></div>
              <ul className="mt-3 space-y-1 text-xs text-gray-600">
                {programmes.map((p) => (
                  <li key={p.id}>
                    <a href={p.source.url} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-1 font-semibold text-[#024692] hover:underline">
                      {p.source.label} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>{" "}
                    · checked {new Date(p.source.accessed).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {programmes.length > 1 && (
            <section aria-labelledby="matrix-h">
              <h2 id="matrix-h" className="text-2xl font-extrabold text-[#012858]">Which exam works where</h2>
              <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-gray-200">
                <table className="w-full min-w-[30rem] text-sm">
                  <caption className="sr-only">Entrance exams accepted by each verified programme in {placeIn}</caption>
                  <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                    <tr><th scope="col" className="px-4 py-3">Programme</th>{orderedExams.map((e) => <th key={e} scope="col" className="px-3 py-3 text-center">{examName(e)}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {programmes.map((p) => (
                      <tr key={p.id}>
                        <th scope="row" className="px-4 py-3 text-left font-semibold text-gray-900">{short(p)}<span className="block text-xs font-normal text-gray-500">{p.city}</span></th>
                        {orderedExams.map((e) => <td key={e} className="px-3 py-3 text-center">{p.examsAccepted.includes(e) ? <span aria-label="accepted" className="font-extrabold text-emerald-600">✓</span> : <span aria-label="not accepted" className="text-gray-300">–</span>}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {def.scope === "noCat" && excluded.length > 0 && (
                <p className="mt-3 text-sm text-gray-700"><strong>CAT-only:</strong> {list(excluded.map((p) => `${short(p)} (${p.city})`))} {excluded.length === 1 ? "does" : "do"} not take another exam for the programmes we checked.</p>
              )}
            </section>
          )}

          {(cutoffs.length > 0 || noCutoff.length > 0) && (
            <section aria-labelledby="cut-h">
              <h2 id="cut-h" className="text-2xl font-extrabold text-[#012858]">MBA cut-offs in {placeIn}</h2>
              <p className="mt-1 text-sm text-gray-600">Only officially published or consistently reported figures, and what each measures. Details: <Link href={def.cutoffPage ?? "/mba-cutoff-delhi-ncr"} className="font-bold text-[#C90D11] hover:underline">MBA cut-offs in Delhi NCR</Link>.</p>
              <div className="mt-4 space-y-3">
                {cutoffs.map((c) => (
                  <div key={c.institution} className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
                    <p className="font-extrabold text-[#012858]">{c.institution}</p>
                    <p className="text-xs text-gray-600">{c.program} · {c.admissionYear} · {c.examCycle}</p>
                    <p className="mt-2 text-sm text-gray-800"><strong>{c.measure}:</strong> {c.values.map((v) => `${v.category} — ${v.value}`).join("; ")}</p>
                    <p className="mt-1 text-sm text-gray-600">{c.howItWorks}</p>
                  </div>
                ))}
                {noCutoff.length > 0 && (
                  <p className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700 ring-1 ring-gray-200">
                    <strong>No fixed percentile cut-off published:</strong> {list(noCutoff.map((n) => n.institution.replace(/\s*\(.*?\)/, "")))}. They shortlist on the entrance score plus profile, so we show no number.
                  </p>
                )}
              </div>
            </section>
          )}

          {calendar.length > 0 && (
            <section aria-labelledby="dates-h">
              <h2 id="dates-h" className="flex items-center gap-2 text-2xl font-extrabold text-[#012858]"><CalendarClock className="h-6 w-6 text-[#E0170F]" aria-hidden="true" /> Exam dates you need</h2>
              <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-gray-200">
                <table className="w-full min-w-[34rem] text-sm">
                  <caption className="sr-only">Registration and exam dates for the exams accepted here</caption>
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
              <p className="mt-2 text-xs text-gray-600">All dates in one place: <Link href="/mba-exam-calendar" className="font-bold text-[#C90D11] hover:underline">MBA exam calendar</Link>.</p>
            </section>
          )}

          <section aria-labelledby="how-h" className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
            <h2 id="how-h" className="text-2xl font-extrabold text-[#012858]">How to apply in {placeIn}</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-gray-800">
              <li>Pick the exam{orderedExams.length > 1 ? "s" : ""} that fit your shortlist{orderedExams.length ? ` (${list(orderedExams.map(examName))})` : ""}. See the <Link href="/blog/mba-entrance-exams-in-india" className="font-bold text-[#C90D11] hover:underline">complete exam list</Link>.</li>
              <li>Check eligibility on the institute&apos;s page and in our <Link href="/blog/mba-eligibility-criteria-in-india" className="font-bold text-[#C90D11] hover:underline">eligibility guide</Link>.</li>
              <li>Register for the exam in its window, then apply to each institute separately: the application and its fee are not part of the exam registration.</li>
              <li>Prepare for the group discussion, written test and interview the institute uses. The steps are in the <Link href="/blog/mba-admission-process-in-india" className="font-bold text-[#C90D11] hover:underline">MBA admission process guide</Link>.</li>
            </ol>
          </section>

          <section aria-labelledby="unv-h" className="rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5">
            <h2 id="unv-h" className="text-lg font-extrabold text-amber-950">What we have not verified yet</h2>
            <p className="mt-2 text-sm leading-relaxed text-amber-950">
              This page lists {programmes.length} programme{programmes.length === 1 ? "" : "s"}, not every college in {placeIn}. Many other institutes exist, and fees, placement figures and direct-admission seats are not shown here because we cannot source them yet.
              To explore the rest, <Link href={`/colleges?search=${encodeURIComponent(def.place === "Delhi NCR" ? "delhi ncr" : def.place.toLowerCase())}&stream=MBA`} className="font-bold underline">search MBA colleges in {def.place}</Link>{" "}
              or read the <Link href="/blog/mba-fees-in-india-guide" className="font-bold underline">MBA fees guide</Link> and the <Link href="/blog/mba-placements-and-salary-how-to-read-reports" className="font-bold underline">placement guide</Link>.
            </p>
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

          <section aria-labelledby="more-h">
            <h2 id="more-h" className="text-xl font-extrabold text-[#012858]">More MBA pages</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {siblings.map(({ href, def: d }) => (
                <li key={href}><Link href={href} className="group flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:text-[#012858] hover:ring-[#012858]">{siblingLabel(href, d)} <ArrowRight className="h-4 w-4 shrink-0 text-[#E0170F] transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></li>
              ))}
              <li><Link href="/mba-colleges-in-pune" className="group flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:text-[#012858] hover:ring-[#012858]">MBA colleges in Pune <ArrowRight className="h-4 w-4 shrink-0 text-[#E0170F] transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></li>
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-[calc(var(--leadbar-h,0px)+7.5rem)] lg:self-start">
          <MbaLeadForm placement={`region:${def.path.slice(1)}`} city={def.leadCity} exam={def.exam ? examName(def.exam) : undefined} source="mba_cluster" heading={`Get a free ${def.place} MBA/PGDM shortlist`} />
        </aside>
      </div>

      <RelatedMbaSearches path={def.path} />
    </>
  )
}
