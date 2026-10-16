import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"
import { publishedCutoffs } from "@/data/mba/cutoffs"
import { programAdmissions } from "@/data/mba/programAdmissions"
import InstituteGuide from "@/components/mba/InstituteGuide"

export const revalidate = 3600

const PATH = "/fms-delhi-cat-cutoff"
const cutoff = publishedCutoffs.find((c) => c.institution.includes("FMS"))!
const admission = programAdmissions.find((p) => p.id === "fms-delhi-mba")!
const general = cutoff.values[0].value

export const metadata: Metadata = genMeta({
  title: "FMS Delhi CAT Cutoff: Composite Score and Shortlist",
  description: "FMS Delhi's reported CAT composite-score cut-off for the interview shortlist, how the score is weighted, and what the bulletin says. Sources linked.",
  path: PATH,
  keywords: ["fms delhi cat cutoff", "fms delhi cutoff", "fms mba cutoff", "fms delhi composite score", "fms delhi shortlist cutoff"],
})

const QUICK = `The FMS Delhi CAT cut-off is a composite score, not a percentile. For the ${cutoff.admissionYear} batch (${cutoff.examCycle}) the General category cut-off for the interview shortlist was reported as ${general}. FMS builds the composite from CAT section scores, so you cannot compare it with percentile cut-offs. FMS publishes cut-offs for other categories too; we show only the figure we could cross-check.`

const faqs = [
  { question: "What is the FMS Delhi CAT cut-off?", answer: `For the ${cutoff.admissionYear} batch, based on ${cutoff.examCycle}, the General category cut-off for the interview shortlist was reported as ${general}. ${cutoff.howItWorks}` },
  { question: "Is the FMS cut-off a CAT percentile?", answer: "No. FMS shortlists on a composite score built from the CAT section scores, so the number is not a percentile and cannot be compared with percentile cut-offs at other institutes." },
  { question: "Does FMS consider candidates without a CAT score?", answer: `No. ${admission.notes}` },
  { question: "Does clearing the cut-off guarantee a seat?", answer: "No. It is the cut-off for the interview shortlist. After it, FMS runs a discussion on the statement of purpose, an extempore and a personal interview." },
  { question: "Where can I see the FMS notice itself?", answer: "FMS publishes shortlist notices on its Results and Notifications page. The links are under the table above." },
]

export default function Page() {
  return (
    <InstituteGuide
      path={PATH}
      h1="FMS Delhi CAT cutoff"
      intro="The shortlist cut-off FMS Delhi reported for the interview round, how the composite score works, and what the admission bulletin says."
      quick={QUICK}
      reviewed="2026-10-15"
      parent={{ href: "/mba-cutoff-delhi-ncr", label: "MBA cut-offs in Delhi NCR" }}
      faqs={faqs}
      cutoff={cutoff}
      admission={admission}
      yearNote={`this is the ${cutoff.admissionYear} batch, which used ${cutoff.examCycle}. The FMS bulletin for the next intake (CAT 2026) was not published when we checked, so treat the number as a level, not this year's requirement.`}
      howTo={[
        "The composite score weights the three CAT sections, so a weak section can pull it down even with a high overall percentile.",
        "A cut-off is a filter for the interview call. Selection also depends on the discussion, extempore and interview.",
        "Do not compare the FMS composite score with percentile cut-offs at other colleges. Use the cut-off checker only for percentile-based minimums.",
        "Re-read the FMS Results and Notifications page when the next cycle opens; this page is updated after that.",
      ]}
      links={[
        { href: "/mba-cutoff-delhi-ncr", label: "MBA cut-offs in Delhi NCR" },
        { href: "/mba-colleges-in-delhi", label: "MBA colleges in Delhi" },
        { href: "/exams/cat/score-vs-percentile", label: "How CAT percentiles work" },
        { href: "/iift-cat-cutoff", label: "IIFT CAT cutoff" },
      ]}
      leadCity="Delhi"
      leadExam="CAT"
    />
  )
}
