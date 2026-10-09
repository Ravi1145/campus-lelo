import Link from "next/link"
import AnswerBlock from "@/components/seo/AnswerBlock"
import { VIDEO_PRICE_INR } from "@/data/counselling"

// Short, self-contained definition of the site (homepage). Plain facts about what exists on the site.
export default function WhatIsCampusLelo() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <AnswerBlock id="what-is-q" question="What is CampusLelo?" updated="2026-10-05">
          <p>
            CampusLelo is a college discovery portal for students in Pune and Delhi NCR. You can compare colleges by fees, entrance exams, NAAC grade and
            NIRF rank, follow MBA and PGDM exam dates with links to the official sources, and read scholarship information. Phone counselling is free; a
            one-to-one video session costs ₹{VIDEO_PRICE_INR}. CampusLelo does not guarantee admission.
          </p>
          <p>
            Learn more <Link href="/about" className="font-bold text-[#C90D11] hover:underline">about us</Link>, how we handle facts in our{" "}
            <Link href="/editorial-policy" className="font-bold text-[#C90D11] hover:underline">editorial policy</Link>, or start with the{" "}
            <Link href="/mba" className="font-bold text-[#C90D11] hover:underline">MBA and PGDM guide</Link>.
          </p>
        </AnswerBlock>
      </div>
    </section>
  )
}
