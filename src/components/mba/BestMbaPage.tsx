import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import AnswerBlock from "@/components/seo/AnswerBlock"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import { bestPages, getBestPage } from "@/data/mba/bestPages"
import { nirf2025Management, NIRF_SOURCE, type NirfRow } from "@/data/mba/nirf2025"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { INSTITUTE_SHORT } from "@/data/mba/instituteLabels"
import { getMbaExam } from "@/data/mba/exams"
import type { ProgramAdmission } from "@/data/mba/types"

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const examName = (slug: string) => getMbaExam(slug)?.name ?? slug.toUpperCase()
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`)
const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })

/** Cities (in our programme records) that belong to each place, for the "verified but not ranked" list. */
const PLACE_CITIES: Record<string, ProgramAdmission["city"][]> = {
  Delhi: ["Delhi"],
  Noida: ["Noida"],
  "Greater Noida": ["Greater Noida"],
  "Uttar Pradesh": ["Noida", "Greater Noida", "Ghaziabad", "Lucknow"],
  Uttarakhand: ["Kashipur", "Dehradun"],
  Haryana: ["Gurugram"],
  Maharashtra: ["Pune"],
}

export function bestMetadata(path: string): Metadata {
  const d = getBestPage(path)!
  return genMeta({ title: d.title, description: d.description, path: d.path, keywords: d.keywords })
}

export default function BestMbaPage({ path }: { path: string }) {
  const def = getBestPage(path)!
  const all = nirf2025Management.filter(def.match)
  const rows: NirfRow[] = def.limit ? all.slice(0, def.limit) : all
  const byId = new Map(programAdmissions.map((p) => [p.id, p]))
  const shownIds = new Set(rows.map((r) => r.programId).filter(Boolean) as string[])
  const cities = PLACE_CITIES[def.place] ?? []
  const verifiedOther = programAdmissions.filter((p) => cities.includes(p.city) && !shownIds.has(p.id))
  const updated = [NIRF_SOURCE.accessed, ...rows.map((r) => (r.programId ? byId.get(r.programId)?.source.accessed : undefined)).filter(Boolean) as string[]].sort().pop()!

  const top = rows.slice(0, 3)
  const topText = top.length
    ? `In the NIRF 2025 management ranking, ${list(top.map((r) => `${r.name} (${r.city}) is ranked ${r.rank}`))}.`
    : ""
  const answer = rows.length === 0
    ? `No institute from ${def.place} appears in the NIRF 2025 management top 100. NIRF ranks only the institutes that took part, so that is not a verdict on quality. See the institutes we have verified below.`
    : `${rows.length === 1 ? "One institute" : `${rows.length} institutes`} from ${def.place} ${rows.length === 1 ? "appears" : "appear"} in the NIRF 2025 management ranking${def.limit ? " top " + def.limit : ""}. ${topText} "Best" here means NIRF rank, a Ministry of Education framework; we show it as published and do not re-rank. Check each programme's accepted exams and current-cycle dates on its admission page before you apply.`

  const examsFor = (id?: string) => (id ? byId.get(id)?.examsAccepted ?? [] : [])
  const withExams = rows.filter((r) => examsFor(r.programId).length > 0)

  const faqs = [
    { question: `Which are the best MBA colleges in ${def.place}?`, answer },
    {
      question: "What does “best” mean on this page?",
      answer: `It means the rank the institute holds in the NIRF 2025 India Rankings, Management category, published by the Ministry of Education. NIRF scores teaching and resources, research, graduation outcomes, outreach and perception. Rank is one input: also check accreditation, the exact programme, total fees and the latest placement report.`,
    },
    {
      question: `Which entrance exams do the top MBA colleges in ${def.place} accept?`,
      answer: withExams.length
        ? `For the programmes we have verified: ${withExams.map((r) => `${INSTITUTE_SHORT[r.programId!] ?? r.name} accepts ${list(examsFor(r.programId).map(examName))}`).join("; ")}. Acceptance is set per programme and intake, so confirm the current cycle on the institute's page.`
        : `We have not yet verified exam acceptance for the ranked institutes on this page. Use each institute's own admission page, and our exam guides for CAT, XAT, GMAT, CMAT and MAT.`,
    },
    {
      question: "Is an institute missing from the NIRF list a poor choice?",
      answer: "Not necessarily. NIRF ranks only the institutes that submit data, and it lists 100 in this category. Some well-known schools do not appear in the list. Check the programme's approval, accreditation and placement report instead of relying on a single list.",
    },
    {
      question: `What are the fees and placements at MBA colleges in ${def.place}?`,
      answer: "Fees and placement results change by institute, programme and year, and we do not publish numbers we cannot source. Use each institute's own fee structure and placement report, and read our guides on total MBA cost and how to read a placement report.",
    },
    {
      question: "How do you verify this information?",
      answer: `Ranks, cities and scores are copied from ${NIRF_SOURCE.label} (checked ${fmt(NIRF_SOURCE.accessed)}). Exam acceptance comes from each institute's own admission page, dated on its record. If we cannot confirm a fact, we leave it out.`,
    },
  ]

  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "MBA & PGDM guide", url: "/mba" }, { name: def.h1, url: def.path }])
  const webPage = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE}${def.path}`, url: `${BASE}${def.path}`, name: def.h1, description: answer, inLanguage: "en-IN",
    dateModified: updated, isPartOf: { "@id": `${BASE}/#website` }, publisher: { "@type": "Organization", name: "CampusLelo", url: BASE },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
    citation: [{ "@type": "CreativeWork", name: NIRF_SOURCE.label, url: NIRF_SOURCE.url }],
  }
  const itemList = { "@context": "https://schema.org", "@type": "ItemList", name: def.h1, itemListOrder: "https://schema.org/ItemListOrderAscending", numberOfItems: rows.length, itemListElement: rows.map((r, i) => ({ "@type": "ListItem", position: i + 1, name: `${r.name}, ${r.city}` })) }

  const siblings = def.related.map((href) => ({ href, def: bestPages.find((b) => b.path === href) }))
  const label = (href: string, d?: { h1: string }) => d?.h1 ?? ({
    "/mba-colleges-in-delhi-ncr": "MBA colleges in Delhi NCR", "/mba-cutoff-delhi-ncr": "MBA cut-offs in Delhi NCR", "/fms-delhi-cat-cutoff": "FMS Delhi CAT cut-off", "/iift-cat-cutoff": "IIFT CAT cut-off",
    "/pgdm-colleges-noida": "PGDM colleges in Noida", "/mba-colleges-in-delhi-ncr-without-cat": "MBA in Delhi NCR without CAT", "/mba-colleges-in-lucknow": "MBA colleges in Lucknow", "/mba-colleges-in-ghaziabad": "MBA colleges in Ghaziabad",
    "/uptac-mba-counselling": "UPTAC MBA counselling", "/mba-cutoff-uttar-pradesh": "MBA cut-offs in Uttar Pradesh", "/mba-colleges-in-dehradun": "MBA colleges in Dehradun", "/mba-cutoff-uttarakhand": "MBA cut-offs in Uttarakhand",
    "/mdi-gurgaon-pgdm-admission": "MDI Gurgaon PGDM admission", "/mba-colleges-in-pune": "MBA colleges in Pune", "/top-10-mba-colleges-in-pune": "Top 10 MBA colleges in Pune", "/mba-cutoff-pune": "MBA cut-offs in Pune",
    "/mba-cutoff-mumbai": "MBA cut-offs in Mumbai", "/mba-exam-acceptance": "Which exam works where", "/mba-exam-calendar": "MBA exam calendar", "/mba-vs-pgdm": "MBA vs PGDM explained", "/mba-colleges-pune": "MBA colleges in Pune",
  } as Record<string, string>)[href] ?? (href.startsWith("/mba-admission/") ? `${INSTITUTE_SHORT[href.split("/")[2]] ?? href} admission` : href)

  return (
    <>
      <script id="webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPage) }} />
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />
      {rows.length > 0 && <script id="itemlist" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemList) }} />}

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
            <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" /> Ranks copied from NIRF 2025. Not re-ranked.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 space-y-10">
          <AnswerBlock id="best-q" question={`Which are the best MBA colleges in ${def.place}?`} updated={updated}><p>{answer}</p></AnswerBlock>

          {rows.length > 0 && (
            <section aria-labelledby="rank-h">
              <h2 id="rank-h" className="text-2xl font-extrabold text-[#012858]">NIRF 2025 management ranking: {def.place}</h2>
              <p className="mt-1 text-sm text-gray-600">Rank is the position in the all-India top 100, not within {def.place}. Score is out of 100.</p>
              <div className="mt-4 overflow-x-auto rounded-2xl bg-white ring-1 ring-gray-200">
                <table className="w-full min-w-[36rem] text-sm">
                  <caption className="sr-only">NIRF 2025 management ranking for {def.place}</caption>
                  <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                    <tr><th scope="col" className="px-4 py-3">NIRF rank</th><th scope="col" className="px-4 py-3">Institute</th><th scope="col" className="px-4 py-3">City</th><th scope="col" className="px-4 py-3">Score</th><th scope="col" className="px-4 py-3">Exams we verified</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rows.map((r) => {
                      const ex = examsFor(r.programId)
                      return (
                        <tr key={`${r.rank}-${r.name}`} className="align-top">
                          <th scope="row" className="px-4 py-3 text-left font-extrabold text-[#012858]">{r.rank}</th>
                          <td className="px-4 py-3 font-semibold text-gray-900">
                            {r.programId ? <Link href={`/mba-admission/${r.programId}`} className="text-[#012858] hover:text-[#C90D11] hover:underline">{r.name}</Link> : r.name}
                          </td>
                          <td className="px-4 py-3 text-gray-700">{r.city}</td>
                          <td className="px-4 py-3 tabular-nums text-gray-700">{r.score.toFixed(2)}</td>
                          <td className="px-4 py-3 text-gray-700">{ex.length ? list(ex.map(examName)) : <span className="text-gray-500">Not verified yet</span>}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-gray-600">
                Source:{" "}
                <a href={NIRF_SOURCE.url} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-1 font-semibold text-[#024692] hover:underline">{NIRF_SOURCE.label} <ExternalLink className="h-3 w-3" aria-hidden="true" /></a>
                {" "}· checked {fmt(NIRF_SOURCE.accessed)}. Institutes that did not take part are not ranked.
              </p>
            </section>
          )}

          {verifiedOther.length > 0 && (
            <section aria-labelledby="other-h">
              <h2 id="other-h" className="text-2xl font-extrabold text-[#012858]">{rows.length ? "Also verified by us, not in the NIRF top 100" : `Institutes we have verified in ${def.place}`}</h2>
              <p className="mt-1 text-sm text-gray-600">Being outside the NIRF list does not rule an institute out. These have an admission page we checked against the institute&apos;s own notice.</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {verifiedOther.map((p) => (
                  <li key={p.id}>
                    <Link href={`/mba-admission/${p.id}`} className="group flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:ring-[#012858]">
                      <span><span className="font-bold text-gray-900">{INSTITUTE_SHORT[p.id] ?? p.institution}</span><span className="block text-xs text-gray-600">{p.city} · {p.examsAccepted.length ? list(p.examsAccepted.map(examName)) : "see admission page"}</span></span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#C90D11] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="choose-h" className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
            <h2 id="choose-h" className="text-2xl font-extrabold text-[#012858]">How to pick from this list</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-gray-800">
              <li>Start from the exam you can realistically take this cycle. See the <Link href="/mba-exam-acceptance" className="font-bold text-[#C90D11] hover:underline">exam acceptance table</Link> and <Link href="/mba-exam-calendar" className="font-bold text-[#C90D11] hover:underline">exam calendar</Link>.</li>
              <li>Check whether the programme is an MBA or a PGDM, and what that means for equivalence: <Link href="/mba-vs-pgdm" className="font-bold text-[#C90D11] hover:underline">MBA vs PGDM</Link>.</li>
              <li>Read the institute&apos;s latest placement report the way the <Link href="/blog/mba-placements-and-salary-how-to-read-reports" className="font-bold text-[#C90D11] hover:underline">placement guide</Link> explains, and add up total cost with the <Link href="/blog/mba-fees-in-india-guide" className="font-bold text-[#C90D11] hover:underline">fees guide</Link>.</li>
              <li>Apply to each institute separately: exam registration and institute applications are different steps. See the <Link href="/blog/mba-admission-process-in-india" className="font-bold text-[#C90D11] hover:underline">admission process</Link>.</li>
            </ol>
            {def.admissionsPage && (
              <p className="mt-4 text-sm text-gray-700">Deeper on admissions: <Link href={def.admissionsPage.href} className="font-bold text-[#C90D11] hover:underline">{def.admissionsPage.label}</Link>.</p>
            )}
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
                <li key={href}><Link href={href} className="group flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:text-[#012858] hover:ring-[#012858]">{label(href, d)} <ArrowRight className="h-4 w-4 shrink-0 text-[#C90D11] transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link></li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-[calc(var(--leadbar-h,0px)+7.5rem)] lg:self-start">
          <MbaLeadForm placement={`best:${def.path.slice(1)}`} city={def.leadCity} source="mba_cluster" heading={`Get a free ${def.place} MBA/PGDM shortlist`} />
        </aside>
      </div>

      <RelatedMbaSearches path={def.path} />
    </>
  )
}
