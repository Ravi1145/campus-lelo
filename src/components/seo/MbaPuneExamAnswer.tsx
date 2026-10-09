import Link from "next/link"
import AnswerBlock from "./AnswerBlock"
import { admissionsByCity, maharashtraCap } from "@/data/mba/programAdmissions"
import { mbaExams } from "@/data/mba/exams"

// "Which entrance exams do MBA colleges in Pune accept?" — generated from the verified
// programme data (src/data/mba/programAdmissions.ts), never typed by hand.
export default function MbaPuneExamAnswer() {
  const name = (slug: string) => mbaExams.find((e) => e.slug === slug)?.name ?? slug.toUpperCase()
  const programmes = admissionsByCity("Pune")
  const short = (inst: string) => inst.match(/\(([A-Z][A-Za-z-]+)\)/)?.[1] ?? inst.split(",")[0].replace("MIT World Peace University — ", "MIT-WPU ")
  const cap = maharashtraCap.allIndiaSeatExams.map(name)

  return (
    <AnswerBlock id="pune-exams-q" question="Which entrance exams do MBA colleges in Pune accept?" updated="2026-10-04">
      <p>
        There is no single exam. Each programme sets its own, so check the institute&apos;s admission page for the cycle you are applying to.
        We have verified {programmes.length} Pune programmes against their official pages:
      </p>
      <ul className="list-disc space-y-1 pl-5">
        {programmes.map((p) => (
          <li key={p.id}>
            <strong>{short(p.institution)}</strong>: {p.examsAccepted.map(name).join(", ")}
          </li>
        ))}
      </ul>
      <p>
        Colleges that take part in Maharashtra&apos;s centralised admission process (CAP) allot seats through the State CET Cell. Maharashtra-domicile
        candidates use MAH-MBA-CET, and the all-India seats accept {cap.slice(0, -1).join(", ")} and {cap[cap.length - 1]} scores.
        See the <Link href="/exams" className="font-bold text-[#C90D11] hover:underline">exam guides</Link> and the{" "}
        <Link href="/mba-admission-process-pune" className="font-bold text-[#C90D11] hover:underline">MBA admission process in Pune</Link>.
      </p>
    </AnswerBlock>
  )
}
