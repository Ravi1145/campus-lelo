import AnswerBlock from "./AnswerBlock"
import type { College } from "@/types"
import { formatCurrency, formatFeesRange } from "@/lib/utils"

// ~60-word factual summary built only from the college's own record (no new claims).
export default function CollegeAtAGlance({ college }: { college: College }) {
  const exams = Array.from(new Set(college.entranceExams.map((e) => e.replace(/\(.*?\)/g, "").replace(/\b20\d\d\b/g, "").trim()).filter(Boolean))).slice(0, 4)
  const hasFees = college.feesRange.min > 0 || college.feesRange.max > 0
  const facts = [
    `${college.name} is a ${college.type.toLowerCase()} ${college.stream} institution in ${college.location}${college.established ? `, established in ${college.established}` : ""}.`,
    `It holds NAAC grade ${college.naac}${college.nirfRank ? ` and is ranked #${college.nirfRank} in NIRF` : ""}.`,
    hasFees ? `Annual fees listed on CampusLelo are ${formatFeesRange(college.feesRange.min, college.feesRange.max)}${college.avgPlacement > 0 ? `, with an average package of ${formatCurrency(college.avgPlacement)}` : ""}.` : "",
    exams.length ? `Admission is through ${exams.join(", ")}.` : "",
    college.hostel ? "Hostel facilities are available." : "",
  ].filter(Boolean)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AnswerBlock id="glance-q" question={`What is ${college.shortName ?? college.name}? Key facts at a glance`}>
        <p>{facts.join(" ")}</p>
        <p className="text-xs text-gray-600">Fees, placements and cut-offs change every year. Confirm them on the college&apos;s official website before you apply.</p>
      </AnswerBlock>
    </div>
  )
}
