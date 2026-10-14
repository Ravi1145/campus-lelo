import { Metadata } from "next"
import NextSteps from "@/components/seo/NextSteps"
import { generateMetadata as genMeta } from "@/lib/seo"
import AIComparison from "@/components/ai/AIComparison"
import { colleges } from "@/data/colleges"

export const metadata: Metadata = genMeta({
  title: "Compare Colleges in Pune 2026 | AI Side-by-Side Tool | CampusLelo",
  description: "Compare any two Pune colleges side-by-side with AI, fees, placements, NAAC grade, campus & faculty. Make the right 2026 admission decision in minutes.",
  path: "/compare",
  keywords: ["compare colleges pune", "college comparison pune", "coep vs pict", "sibm vs mit-som"],
})

const valid = (slug?: string | string[]) => (typeof slug === "string" && colleges.some((c) => c.slug === slug) ? slug : "")

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ c1?: string | string[]; c2?: string | string[] }> }) {
  const { c1, c2 } = await searchParams
  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-gradient-to-r from-[#011B40] to-[#024692] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Compare Colleges in Pune
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Pick any two Pune colleges to see their key facts side by side instantly, then get an optional AI analysis of academics, placements, fees and campus life.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIComparison initialCollege1={valid(c1)} initialCollege2={valid(c2)} />
      </div>
      <NextSteps exclude="/compare" />
    </div>
  )
}
