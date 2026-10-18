import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { mbaExams } from "@/data/mba/exams"
import AnswerBlock from "@/components/seo/AnswerBlock"
import MbaLeadForm from "@/components/leads/MbaLeadForm"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const metadata: Metadata = genMeta({
  title: "MBA Kya Hai? Exams, Admission aur PGDM se Fark",
  description: "MBA kya hai, MBA aur PGDM mein fark, admission kaise hota hai aur kaun se entrance exam chalte hain. Hindi (Roman) mein, official sources ke saath.",
  path: "/mba-kya-hai",
  keywords: ["mba kya hai", "mba kya hota hai", "mba kaise kare", "mba ke liye kya chahiye", "pgdm kya hai", "mba aur pgdm mein fark", "mba entrance exam kaun se hain"],
})

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const UPDATED = "2026-10-18"

const faqs = [
  { question: "MBA kya hai?", answer: "MBA ka matlab Master of Business Administration hai. Yeh ek master's degree hai jo university deti hai. Ismein management ke subjects padhaye jaate hain, jaise marketing, finance, HR aur operations." },
  { question: "MBA aur PGDM mein kya fark hai?", answer: "MBA ek degree hai jo university deti hai. PGDM ek post-graduate diploma hai jo AICTE se approved autonomous institute deta hai. PGDM apne aap MBA ke barabar nahi maana jaata. Kisi khaas PGDM programme ko AIU MBA ke barabar maan sakta hai, isliye programme ki approval alag se check karein." },
  { question: "MBA ke liye CAT dena zaroori hai?", answer: "Nahi. Yeh programme par depend karta hai. Kai institutes CAT ke alawa XAT, GMAT, CMAT, MAT ya apna test bhi lete hain. Hamare verified records mein har programme ke saath accepted exams likhe hain, aur har cycle mein badal sakte hain, isliye institute ka admission page zaroor dekhein." },
  { question: "MBA mein admission kaise milta hai?", answer: "Aam taur par aap pehle ek entrance exam dete hain, phir har institute mein alag se apply karte hain. Kai institutes group discussion, written test aur interview bhi lete hain. Exam registration aur institute ka application alag steps hain." },
  { question: "MBA ki fees kitni hoti hai?", answer: "Fees institute, programme aur saal ke hisaab se bahut alag hoti hai, aur hum woh number nahi dikhate jo hum source nahi kar sakte. Institute ki apni fee structure dekhein aur total cost ka hisaab lagayein." },
]

export default function MbaKyaHaiPage() {
  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "MBA & PGDM guide", url: "/mba" }, { name: "MBA kya hai", url: "/mba-kya-hai" }])
  const webPage = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE}/mba-kya-hai`, url: `${BASE}/mba-kya-hai`, name: "MBA kya hai", description: faqs[0].answer, inLanguage: "hi-Latn",
    dateModified: UPDATED, isPartOf: { "@id": `${BASE}/#website` }, publisher: { "@type": "Organization", name: "CampusLelo", url: BASE },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
  }
  const exams = mbaExams.slice(0, 12)

  return (
    <>
      <script id="webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPage) }} />
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqs)) }} />

      <div className="bg-rich-navy relative overflow-hidden">
        <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-1.5 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span>
            <Link href="/mba" className="hover:text-white">MBA &amp; PGDM guide</Link><span aria-hidden="true">›</span>
            <span className="text-white" aria-current="page">MBA kya hai</span>
          </nav>
          <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">MBA kya hai? Admission, exams aur PGDM se fark</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">Hindi (Roman) mein seedhi jaankari: MBA kya hota hai, kaise milta hai admission, aur kaun se exam dene padte hain.</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20">
            <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" /> Exam aur programme ki details official sources se
          </p>
        </div>
      </div>

      <div lang="hi-Latn" className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0 space-y-10">
          <AnswerBlock id="kya-hai" question="MBA kya hai?" updated={UPDATED}>
            <p>{faqs[0].answer}</p>
            <p>PGDM ek alag cheez hai: woh diploma hai, degree nahi. Dono ka fark neeche aur <Link href="/mba-vs-pgdm" className="font-bold text-[#C90D11] hover:underline">MBA vs PGDM</Link> page par detail mein hai.</p>
          </AnswerBlock>

          <section aria-labelledby="fark-h" className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
            <h2 id="fark-h" className="text-2xl font-extrabold text-[#012858]">MBA aur PGDM mein fark</h2>
            <ul className="mt-4 space-y-3 text-gray-800">
              <li><strong>Kaun deta hai:</strong> MBA university deti hai. PGDM AICTE se approved autonomous institute deta hai.</li>
              <li><strong>Kya milta hai:</strong> MBA se master&apos;s degree milti hai. PGDM se post-graduate diploma milta hai.</li>
              <li><strong>Equivalence:</strong> PGDM apne aap MBA ke barabar nahi hota. AIU kisi khaas programme ko ek tay samay ke liye barabar maan sakta hai. PhD, UGC-NET ya &quot;MBA or equivalent&quot; wali naukri ke liye yeh zaroori ho sakta hai.</li>
              <li><strong>Behtar kaun sa hai:</strong> label se nahi, programme se tay karein: current AICTE approval, accreditation, latest placement report, total fees aur accepted exams.</li>
            </ul>
          </section>

          <section aria-labelledby="admission-h" className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
            <h2 id="admission-h" className="text-2xl font-extrabold text-[#012858]">MBA admission kaise hota hai?</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-gray-800">
              <li>Apne shortlist ke hisaab se entrance exam chunein. Neeche exams ki list hai.</li>
              <li>Eligibility institute ke page par aur hamare <Link href="/blog/mba-eligibility-criteria-in-india" className="font-bold text-[#C90D11] hover:underline">eligibility guide</Link> mein check karein.</li>
              <li>Exam ke registration window mein register karein, phir har institute mein alag se apply karein. Application aur uski fee exam registration ka hissa nahi hai.</li>
              <li>Group discussion, written test aur interview ki taiyari karein. Steps <Link href="/blog/mba-admission-process-in-india" className="font-bold text-[#C90D11] hover:underline">admission process guide</Link> mein hain.</li>
            </ol>
          </section>

          <section aria-labelledby="exams-h">
            <h2 id="exams-h" className="text-2xl font-extrabold text-[#012858]">Kaun se entrance exam dene padte hain?</h2>
            <p className="mt-1 text-sm text-gray-600">Har exam ka official guide, dates aur pattern ke saath. Dates har cycle mein badalti hain, isliye exam body ki site dekhein.</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {exams.map((e) => (
                <li key={e.slug}>
                  <Link href={`/exams/${e.slug}`} className="group flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:ring-[#012858]">
                    <span><span className="font-bold text-gray-900">{e.name}</span><span className="block text-xs text-gray-600">{e.conductingBody}</span></span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#C90D11] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-gray-700">Kaun sa exam kahan chalta hai: <Link href="/mba-exam-acceptance" className="font-bold text-[#C90D11] hover:underline">exam acceptance table</Link> aur <Link href="/mba-exam-calendar" className="font-bold text-[#C90D11] hover:underline">MBA exam calendar</Link>.</p>
          </section>

          <section aria-labelledby="colleges-h" className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
            <h2 id="colleges-h" className="text-2xl font-extrabold text-[#012858]">College dhoondhne ke liye</h2>
            <ul className="mt-4 grid gap-2 text-sm font-semibold sm:grid-cols-2">
              {[["Best MBA colleges in India (NIRF 2025)", "/best-mba-colleges-in-india"], ["MBA colleges in Delhi", "/mba-colleges-in-delhi"], ["MBA colleges in Noida", "/mba-colleges-noida"], ["MBA colleges in Pune", "/mba-colleges-in-pune"], ["PGDM colleges in India", "/pgdm-colleges-in-india"], ["MBA admission by college", "/mba-admission"]].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-[#012858] hover:text-[#C90D11] hover:underline">{label}</Link></li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="faq-h">
            <h2 id="faq-h" className="text-2xl font-extrabold text-[#012858]">Aksar poochhe jaane wale sawal</h2>
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
        </div>

        <aside className="lg:sticky lg:top-[calc(var(--leadbar-h,0px)+7.5rem)] lg:self-start">
          <MbaLeadForm placement="mba-kya-hai" city="Delhi NCR" source="mba_cluster" heading="Free MBA/PGDM shortlist paayein" />
        </aside>
      </div>

      <RelatedMbaSearches path="/mba-kya-hai" />
    </>
  )
}
