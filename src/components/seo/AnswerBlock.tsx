// A question heading followed by a self-contained answer (the shape AI search quotes best).
// Server component. The `.quick-answer` class is what the pages' `speakable` schema points at.
export default function AnswerBlock({ id, question, children, updated, className = "" }: { id: string; question: string; children: React.ReactNode; updated?: string; className?: string }) {
  const when = updated ? new Date(updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : ""
  return (
    <section aria-labelledby={id} className={`quick-answer rounded-2xl border-l-4 border-[#E0170F] bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:p-6 ${className}`}>
      <h2 id={id} className="text-lg font-extrabold text-[#012858] sm:text-xl">{question}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-gray-700 sm:text-base">{children}</div>
      {updated && <p className="mt-3 text-xs text-gray-600">Last updated <time dateTime={updated}>{when}</time></p>}
    </section>
  )
}
