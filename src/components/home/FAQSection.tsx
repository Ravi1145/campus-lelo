"use client"
import * as Accordion from "@radix-ui/react-accordion"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Headphones, HelpCircle, Plus } from "lucide-react"

const faqs = [
  {
    q: "Which is the best college in Pune for B.Tech / engineering in 2026?",
    a: "COEP (College of Engineering Pune) is the best engineering college in Pune in 2026. It is a government autonomous institute established in 1854, NAAC A+ accredited with NIRF Rank 49. Annual fees: ₹80,000–1.8L. Average placement: ₹12 LPA, highest ₹45 LPA. MHT-CET 2026 cutoff: 97+ percentile for Computer Engineering. Other top options: PICT (best for CS/IT, avg ₹7.5 LPA), VIT Pune (NIRF #101, avg ₹8.5 LPA), and SIT Pune — Symbiosis (best deemed, avg ₹9.8 LPA)."
  },
  {
    q: "What is the best MBA college in Pune for 2026 admissions?",
    a: "SIBM Pune (Symbiosis Institute of Business Management) is the top MBA college in Pune, NIRF Rank 13, average placements ₹28 LPA. Recruiters: McKinsey, BCG, P&G, Deloitte. SNAP 2026 cutoff: 60+ percentile. Fees: ₹16–22L total. Other strong options: MIT-SOM (avg ₹12 LPA, fees ₹7–11L), BIMM (avg ₹8.5 LPA, fees ₹5–7.5L), Indira Institute of Management (best ROI, avg ₹7.2 LPA, fees ₹4.2–6.5L)."
  },
  {
    q: "Which medical college in Pune has the best NEET cutoff and facilities?",
    a: "AFMC (Armed Forces Medical College) is Pune's best medical college — NIRF Rank 4, NAAC A++, nearly free (₹50,000 total). Requires 650+ NEET 2026 score + separate AFMC test + SSB. BJ Medical College (NIRF #18) is the best government option accessible through NEET state quota (625+ for open category). For private options: D.Y. Patil Medical College and Bharati Vidyapeeth Medical College have good facilities at ₹11–15 LPA fees."
  },
  {
    q: "What is MHT-CET 2026 and which Pune colleges accept it?",
    a: "MHT-CET 2026 (Maharashtra Common Entrance Test) is scheduled for April 20–May 15, 2026. It tests PCM (Physics, Chemistry, Maths) for engineering admission. All SPPU-affiliated Pune colleges accept MHT-CET. Cutoffs: COEP CSE 97+ percentile, PICT 92–95 percentile, VIT Pune 88–92 percentile, SIT Pune (via SET instead). Private colleges like JSPM, AISSMS, Sinhgad accept 65–75 percentile. Results: June 2026. CAP process: July–August 2026."
  },
  {
    q: "What are the fees for B.Tech in Pune colleges in 2026?",
    a: "B.Tech fees in Pune 2026 vary by college type: Government (COEP): ₹80,000–1.8L/year. Autonomous private (PICT, VIT Pune, Cummins): ₹1.4L–2.2L/year. Deemed universities (SIT Pune — Symbiosis, MIT-WPU): ₹2L–4.8L/year. Private affordable (JSPM RSCOE, AISSMS, Sinhgad): ₹95K–1.7L/year. SC/ST/OBC students at government colleges get full fee waiver through state scholarships. EBC (Economically Backward Class) scholarship also available."
  },
  {
    q: "Which Pune colleges offer hostel facilities in 2026?",
    a: "Most top Pune colleges offer hostel facilities in 2026. Hostel fees: COEP (govt): ₹55,000–70,000/yr. VIT Pune: ₹80,000–1,00,000/yr including meals. SIT Pune: ₹1,10,000–1,40,000/yr (AC/non-AC). SIBM Pune MBA: ₹1,20,000–1,60,000/yr. AFMC: Free hostel for all students. BJ Medical College: ₹60,000–75,000/yr. Fergusson College (arts): ₹40,000–55,000/yr. Apply for hostels immediately after admission — government college hostels fill within days."
  },
  {
    q: "How does NAAC grading work and which Pune colleges have A++ or A+ grade?",
    a: "NAAC (National Assessment and Accreditation Council) grades colleges as: A++ (best) → A+ → A → B++ → B+ → B. In Pune, AFMC is the only A++ college. Colleges with NAAC A+: COEP, SIBM Pune, MIT-WPU, SIT Pune, VIT Pune, Cummins College, Fergusson College, SP College, Garware College. NAAC grade is a quality indicator — banks and employers check NAAC grade for loan and recruitment decisions. Colleges must reapply for NAAC every 5 years."
  },
  {
    q: "What are the best low-budget colleges in Pune for 2026?",
    a: "Best low-budget options in Pune 2026 — Engineering: COEP (₹80K/yr, govt), JSPM RSCOE (₹1.2L/yr), AISSMS COE (₹1.1L/yr). Arts & Science: Fergusson College (₹15K–45K/yr), SP College (₹12K–35K/yr), Modern College (₹18K–50K/yr). MBA: Indira Institute of Management (₹4.2–6.5L total), BIMM (₹5–7.5L total). Government scholarship (Rajarshi Chhatrapati Shahu Maharaj Scholarship) provides full fee waiver for students whose family income is below ₹8L/year."
  },
  {
    q: "Which is the No. 1 college in Pune in 2026?",
    a: "AFMC (Armed Forces Medical College) is Pune's highest NIRF-ranked college at #4 nationally. Among engineering colleges, COEP is #1 in Pune (NIRF #49, NAAC A+, fees ₹80K/yr). Among MBA colleges, SIBM Pune is #1 (NIRF #13, avg ₹28 LPA). For arts and science, Fergusson College (est. 1885, NAAC A+) is the most prestigious. For design, Symbiosis Institute of Design (SID) ranks among India's top 5."
  },
  {
    q: "When does college admission start in Pune 2026?",
    a: "Pune college admissions 2026 calendar: MHT-CET exam — April 20–May 15, 2026. NEET — May 3, 2026. MHT-CET results — June 2026. CAP Round 1 for engineering — July 2026. Arts, Commerce, Science (CUET/HSC-merit based) — June–July 2026. MBA (CAT/SNAP) — November–December 2026 for the 2027 batch. Direct / management quota admissions open in July–August 2026 after CAP rounds close."
  },
  {
    q: "Which areas in Pune have the best colleges?",
    a: "Major college zones in Pune 2026: Shivajinagar / Deccan — COEP, SP College, Fergusson, Garware. Katraj / Dhankawadi — PICT, Sinhgad COE. Bibwewadi — VIT Pune. Akurdi / Pimpri-Chinchwad — DY Patil Engineering, AISSMS, DY Patil ACS. Lavale / Mulshi — Full Symbiosis campus (SIBM, SIT, SID, SMCW). Alandi — MIT-ADT campus (MITAOE, MIT ACS). Erandwane — SCACS and other Sinhgad colleges. Loni Kalbhor — MIT-ID design school."
  },
  {
    q: "Which colleges in Pune are NAAC A+ accredited in 2026?",
    a: "NAAC A+ (and A++) colleges in Pune 2026: AFMC (A++ — highest grade), COEP (A+), MIT-WPU (A+), SIT Pune / Symbiosis (A+), VIT Pune (A+), Cummins College (A+), Fergusson College (A+), SP College (A+), Garware College (A+), SIBM Pune (A+), Symbiosis Institute of Design / SID (A+), MIT-ADT University (A+). NAAC grade is checked by banks for education loans and by employers for recruitment."
  }
]

const INITIAL_COUNT = 5

export default function FAQSection() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? faqs : faqs.slice(0, INITIAL_COUNT)

  return (
    <section aria-labelledby="faq-heading" className="py-16 sm:py-20 section-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-14 lg:px-8">
        {/* Intro — sticks while the list scrolls */}
        <div className="lg:sticky lg:top-[calc(var(--leadbar-h,0px)+8rem)] lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700 ring-1 ring-orange-200">
            <HelpCircle className="h-4 w-4" aria-hidden="true" /> FAQ
          </span>
          <h2 id="faq-heading" className="mt-4 text-3xl font-extrabold leading-tight text-[#012858] sm:text-4xl">
            Common questions about Pune colleges 2026
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Admissions, fees, placements and entrance exams — answered in one place.
          </p>

          <div className="bg-rich-navy relative mt-8 overflow-hidden rounded-3xl p-6 text-white shadow-xl shadow-blue-950/20">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-[#E0170F]/30 blur-3xl" />
            <div className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-orange-300 ring-1 ring-white/20"><Headphones className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="mt-4 text-lg font-extrabold">Still have a question?</h3>
              <p className="mt-1 text-sm text-blue-100">Ask a counsellor — it&apos;s free.</p>
              <Link href="/counselling" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-[#C90D11]">
                Talk to a counsellor
              </Link>
            </div>
          </div>
        </div>

        <div>
          <Accordion.Root type="single" collapsible className="space-y-3">
            {visible.map((faq, i) => (
              <Accordion.Item
                key={faq.q}
                value={`item-${i}`}
                className="hero-in group/item overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition-all duration-300 data-[state=open]:shadow-lg data-[state=open]:shadow-blue-950/10 data-[state=open]:ring-[#012858]/30"
                style={{ "--i": i >= INITIAL_COUNT ? i - INITIAL_COUNT : i } as React.CSSProperties}
              >
                <Accordion.Header className="m-0">
                  <Accordion.Trigger className="group flex w-full items-center gap-4 px-4 py-4 text-left sm:px-6 sm:py-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs font-extrabold text-[#012858] transition-colors group-data-[state=open]:bg-[#E0170F] group-data-[state=open]:text-white">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm font-bold text-gray-900 transition-colors group-data-[state=open]:text-[#012858] sm:text-base">{faq.q}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-[#012858] group-data-[state=open]:text-white">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="acc-content">
                  <p className="border-t border-gray-100 px-4 py-4 text-sm leading-relaxed text-gray-700 sm:pl-[4.75rem] sm:pr-6 sm:py-5">{faq.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          {!showAll && (
            <div className="mt-6 text-center lg:text-left">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="group inline-flex items-center gap-2 rounded-xl bg-[#012858] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#024692]"
              >
                Show {faqs.length - INITIAL_COUNT} more questions
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

