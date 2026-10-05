/**
 * QuickAnswer — AEO featured-snippet target box.
 *
 * Renders a visually distinct "In Short" answer box at the top of a page.
 * The CSS class "quick-answer" is targeted by speakable schema selectors,
 * signalling to Google AI Overview which paragraph to use for voice/AI answers.
 *
 * Usage:
 *   <QuickAnswer
 *     question="Which is the best engineering college in Noida?"
 *     answer="JIIT Noida (Sector 62) is the best engineering college in Noida for CS/IT..."
 *   />
 */

interface QuickAnswerProps {
  question: string
  answer: string
  /** Optional note — shown in smaller text below answer, e.g. "Updated: Oct 2026" */
  note?: string
}

export default function QuickAnswer({ question, answer, note }: QuickAnswerProps) {
  return (
    <div
      className="quick-answer speakable my-6 rounded-2xl border-l-4 p-5"
      data-speakable="true"
      style={{ background: "#F7F9FC", borderLeftColor: "#E0170F" }}
      itemScope
      itemType="https://schema.org/Question"
    >
      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#E0170F" }}>
        Quick Answer
      </p>
      <p className="font-semibold text-sm mb-2" style={{ color: "#012858" }} itemProp="name">
        {question}
      </p>
      <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
        <p className="text-sm leading-relaxed text-gray-700" itemProp="text">
          {answer}
        </p>
      </div>
      {note && (
        <p className="text-xs text-gray-400 mt-2">{note}</p>
      )}
    </div>
  )
}
