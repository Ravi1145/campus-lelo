import { ShieldCheck, FileCheck2, PhoneCall } from "lucide-react"
import InlineLeadForm from "./InlineLeadForm"

// A lead form at the top of MBA and PGDM pages, for phones only. On large screens these pages already show the same
// kind of form in a sticky sidebar next to the content; on a phone that sidebar sits below the whole page, so visitors
// who never scroll that far never saw a form. The three promises are the ones the site already keeps: the counselling
// call is free, figures come from official pages, and a consent box is required before anything is saved.
export default function FirstScreenLead({ context }: { context: string }) {
  return (
    <div className="lg:hidden">
      <ul className="mb-3 grid grid-cols-1 gap-1.5 text-xs font-semibold text-[#012858] sm:grid-cols-3">
        <li className="flex items-center gap-1.5"><PhoneCall className="h-4 w-4 shrink-0 text-[#C90D11]" aria-hidden="true" />Free counselling call</li>
        <li className="flex items-center gap-1.5"><FileCheck2 className="h-4 w-4 shrink-0 text-[#C90D11]" aria-hidden="true" />Figures from official pages</li>
        <li className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 shrink-0 text-[#C90D11]" aria-hidden="true" />Saved only with your consent</li>
      </ul>
      <InlineLeadForm context={context} compact />
    </div>
  )
}
