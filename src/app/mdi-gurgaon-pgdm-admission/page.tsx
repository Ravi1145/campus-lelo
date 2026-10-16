import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"
import { noPublishedCutoff } from "@/data/mba/cutoffs"
import { programAdmissions } from "@/data/mba/programAdmissions"
import InstituteGuide from "@/components/mba/InstituteGuide"

export const revalidate = 3600

const PATH = "/mdi-gurgaon-pgdm-admission"
const admission = programAdmissions.find((p) => p.id === "mdi-gurugram-pgdm")!
const noCutoff = noPublishedCutoff.find((n) => n.institution.includes("MDI"))!

export const metadata: Metadata = genMeta({
  title: "MDI Gurgaon PGDM: GMAT Not for Indian Candidates",
  description: "MDI Gurgaon's PGDM page requires CAT. GMAT is an option only for PGDM-IB and not for Indian candidates. Eligibility, no fixed cut-off, sources.",
  path: PATH,
  keywords: ["mdi gurgaon pgdm gmat indian candidates", "mdi gurgaon gmat", "mdi gurgaon pgdm admission", "mdi gurgaon cat cutoff", "mdi gurgaon pgdm eligibility"],
})

const QUICK = `${admission.notes} ${noCutoff.shortlisting}`

const faqs = [
  { question: "Can Indian candidates apply to MDI Gurgaon on a GMAT score?", answer: "No. The MDI admission page says Indian candidates cannot apply on the basis of GMAT. The GMAT route is for NRI and international applicants, and only for PGDM-IB." },
  { question: "Which exam does MDI Gurgaon require for PGDM?", answer: "The page we checked requires CAT 2026 for its PGDM programmes for the 2027–29 intake." },
  { question: "What is the MDI Gurgaon CAT cut-off?", answer: noCutoff.shortlisting },
  { question: "What marks do I need to apply?", answer: "The page requires 50% in Class 10, Class 12 and graduation. Final-year students who complete their degree by 30 June 2027 can apply." },
  { question: "Which PGDM programmes does MDI offer?", answer: `The admission page covers ${admission.program}.` },
]

export default function Page() {
  return (
    <InstituteGuide
      path={PATH}
      h1="MDI Gurgaon PGDM admission: CAT required, GMAT not for Indian candidates"
      intro="Which exam MDI Gurgaon asks for, what the GMAT route is and who it is for, and why no percentile cut-off is printed here."
      quick={QUICK}
      reviewed="2026-10-15"
      parent={{ href: "/mba-colleges-in-delhi-ncr", label: "MBA colleges in Delhi NCR" }}
      faqs={faqs}
      noCutoff={noCutoff}
      admission={admission}
      howTo={[
        "If you are an Indian candidate, plan around CAT. A GMAT score will not let you apply to the MDI PGDM.",
        "There is no published percentile to aim for, so ask admissions how shortlisting weighs CAT sections and the application profile.",
        "Check the 50% requirement in Class 10, Class 12 and graduation before you apply.",
        "Read the current admission page on the MDI site; the intake and dates change every cycle.",
      ]}
      links={[
        { href: "/mba-colleges-in-delhi-ncr", label: "MBA colleges in Delhi NCR" },
        { href: "/mba-colleges-in-delhi-ncr-accepting-gmat", label: "Delhi NCR colleges listing GMAT" },
        { href: "/pgdm-colleges-in-delhi-ncr", label: "PGDM colleges in Delhi NCR" },
        { href: "/exams/gmat", label: "GMAT exam guide" },
      ]}
      leadCity="Gurugram"
      leadExam="CAT"
    />
  )
}
