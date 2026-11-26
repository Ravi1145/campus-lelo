"use client"
import * as Accordion from "@radix-ui/react-accordion"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, ChevronDown } from "lucide-react"
import { homeFaqs } from "@/data/homeFaqs"

// Home FAQ: question rows on the left, one help card on the right. The help card only promises what the site
// already keeps: the first counselling call is free, and facts come from official pages.

const faqs = homeFaqs

const INITIAL_COUNT = 5
const PROMISES = ["Free first counselling call", "College shortlisting for your score", "Fees, exams and cut-offs explained"]

export default function FAQSection() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? faqs : faqs.slice(0, INITIAL_COUNT)

  return (
    <section aria-labelledby="faq-heading" className="bg-gray-50 py-10 sm:py-12">
      <div className="mx-auto max-w-[calc(var(--container-7xl)+6rem)] px-5 sm:px-8 lg:px-12">
        <h2 id="faq-heading" className="text-2xl font-bold text-[#0F172A] sm:text-3xl">Frequently asked questions</h2>
        <p className="mt-1 text-sm text-gray-600">Short answers about admissions, fees and entrance exams, with links to the pages that go deeper.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div>
            <Accordion.Root type="single" collapsible className="space-y-2.5">
              {visible.map((faq, i) => (
                <Accordion.Item
                  key={faq.q}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-xl bg-white ring-1 ring-gray-200 transition-shadow data-[state=open]:shadow-[0_8px_24px_-12px_rgba(1,40,88,0.3)] data-[state=open]:ring-[#012858]/30"
                >
                  <Accordion.Header className="m-0">
                    <Accordion.Trigger className="group flex w-full items-center gap-4 px-5 py-4 text-left">
                      <span className="flex-1 text-sm font-bold text-gray-900 group-data-[state=open]:text-[#012858] sm:text-[15px]">{faq.q}</span>
                      <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#012858]" aria-hidden="true" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="acc-content">
                    <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-700">{faq.a}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>

            {!showAll && faqs.length > INITIAL_COUNT && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#C90D11] hover:underline"
              >
                Show {faqs.length - INITIAL_COUNT} more questions
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Help card */}
          <aside aria-label="Talk to a counsellor" className="rounded-2xl bg-[#012858] p-6 text-white lg:sticky lg:top-[calc(var(--leadbar-h,0px)+8rem)]">
            <h3 className="text-2xl font-bold leading-tight">Still have a question?</h3>
            <p className="mt-2 text-sm text-blue-100">Ask a counsellor. Tell us your exam, score and budget and we will point you to realistic options.</p>
            <ul className="mt-5 space-y-2.5">
              {PROMISES.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm font-semibold">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E0170F]"><Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" /></span>
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/counselling" className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C90D11]">
              Talk to a counsellor <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
