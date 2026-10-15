"use client"
import * as Accordion from "@radix-ui/react-accordion"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Headphones, HelpCircle, Plus } from "lucide-react"
import { homeFaqs } from "@/data/homeFaqs"

const faqs = homeFaqs

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
          <h2 id="faq-heading" className="mt-4 text-3xl font-bold leading-tight text-[#012858] sm:text-4xl">
            Questions students ask us
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Short answers, with links to the pages that go deeper.
          </p>

          <div className="bg-rich-navy relative mt-8 overflow-hidden rounded-3xl p-6 text-white">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-[#E0170F]/30 blur-3xl" />
            <div className="relative">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-orange-300 ring-1 ring-white/20"><Headphones className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="mt-4 text-lg font-extrabold">Still have a question?</h3>
              <p className="mt-1 text-sm text-blue-100">Ask a counsellor. The first call is free.</p>
              <Link href="/counselling" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#C90D11]">
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
                className="group inline-flex items-center gap-2 rounded-xl bg-[#012858] px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#024692]"
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

