import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"
import { publishedCutoffs } from "@/data/mba/cutoffs"
import { programAdmissions } from "@/data/mba/programAdmissions"
import InstituteGuide from "@/components/mba/InstituteGuide"

export const revalidate = 3600

const PATH = "/iift-cat-cutoff"
const cutoff = publishedCutoffs.find((c) => c.institution.includes("IIFT"))!
const admission = programAdmissions.find((p) => p.id === "iift-delhi-mba-ib")!
const general = cutoff.values.find((v) => v.category === "General")!.value

export const metadata: Metadata = genMeta({
  title: "IIFT CAT Cutoff: Sectional Minimum Percentiles",
  description: "IIFT's sectional CAT minimums by category for the MBA (IB) shortlist, with what the prospectus says and why a minimum is not a guarantee. Sources linked.",
  path: PATH,
  keywords: ["iift cat cutoff", "iift cat sectional cutoff", "iift mba cutoff", "iift sectional cutoff percentile", "iift shortlist cutoff"],
})

const QUICK = `For the ${cutoff.admissionYear} MBA (International Business) batch, based on ${cutoff.examCycle}, the IIFT General category minimum was ${general}. The other categories had lower minimums, listed in the table below. These are sectional minimums for consideration, not the score that guarantees an interview call: the final shortlist also depends on an overall score threshold that IIFT sets each year.`

const faqs = [
  { question: "What is the IIFT CAT sectional cut-off?", answer: `For the ${cutoff.admissionYear} batch (${cutoff.examCycle}): ${cutoff.values.map((v) => `${v.category}, ${v.value}`).join("; ")}.` },
  { question: "Does meeting the sectional cut-off get me an interview call?", answer: cutoff.howItWorks },
  { question: "Does the IIFT prospectus list these numbers?", answer: cutoff.caveats },
  { question: "Which exam does IIFT use?", answer: admission.notes ?? "See the admission details above." },
  { question: "Is this the cut-off for the next admission cycle?", answer: "No. These figures belong to the batch shown. The next prospectus will state the criteria for the next cycle, and this page is updated when it is published." },
]

export default function Page() {
  return (
    <InstituteGuide
      path={PATH}
      h1="IIFT CAT cutoff"
      intro="The sectional CAT minimums reported for the IIFT MBA (International Business) shortlist, with the prospectus and the limits of what a minimum means."
      quick={QUICK}
      reviewed="2026-10-15"
      parent={{ href: "/mba-cutoff-delhi-ncr", label: "MBA cut-offs in Delhi NCR" }}
      faqs={faqs}
      cutoff={cutoff}
      admission={admission}
      yearNote={`these figures are for the ${cutoff.admissionYear} batch (${cutoff.examCycle}). The 2027–29 prospectus was not published when we checked, so use them as a level, not this year's requirement.`}
      howTo={[
        "Check each CAT section against the minimum for your category; missing one section can rule you out whatever your overall percentile is.",
        "Meeting the minimums makes you eligible for consideration. The overall threshold for the shortlist is decided each year.",
        "Compare with percentile minimums at other institutes using the cut-off checker.",
        "Read the current prospectus on the IIFT website before you apply.",
      ]}
      links={[
        { href: "/mba-cutoff-delhi-ncr", label: "MBA cut-offs in Delhi NCR" },
        { href: "/fms-delhi-cat-cutoff", label: "FMS Delhi CAT cutoff" },
        { href: "/mba-colleges-in-delhi", label: "MBA colleges in Delhi" },
        { href: "/exams/cat/score-vs-percentile", label: "How CAT percentiles work" },
      ]}
      leadCity="Delhi"
      leadExam="CAT"
    />
  )
}
