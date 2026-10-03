"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

const STREAMS = ["Engineering", "MBA", "Medical", "Law", "Design", "Pharmacy", "Arts", "Commerce"]
const BUDGETS = ["Under ₹1L/yr", "₹1–3L/yr", "₹3–5L/yr", "Above ₹5L/yr"]

export default function AIFinderBand() {
  const [stream, setStream] = useState("")
  const [marks,  setMarks]  = useState("")
  const [budget, setBudget] = useState("")
  const router = useRouter()

  const handleShortlist = () => {
    const params = new URLSearchParams()
    if (stream) params.set("stream", stream)
    if (marks)  params.set("marks", marks)
    if (budget) params.set("budget", budget)
    router.push(`/colleges${params.toString() ? "?" + params.toString() : ""}`)
  }

  return (
    <section
      className="py-16 px-6"
      style={{ background: "linear-gradient(135deg, #0B1226 0%, #1E1B4B 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4.5 h-4.5" style={{ color: "#F97316" }} strokeWidth={1.5} />
              <span className="text-sm font-semibold" style={{ color: "#F97316" }}>AI College Finder</span>
            </div>
            <h2 className="font-bold text-2xl lg:text-3xl text-white mb-3" style={{ lineHeight: "1.25" }}>
              Not sure where to apply?<br />Answer 4 questions.
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.58)", lineHeight: "1.65" }}>
              Our AI shortlists colleges based on your stream, marks, and budget — personalised in under 30 seconds.
            </p>
          </div>

          {/* Right — inline form */}
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                STREAM
              </label>
              <select
                value={stream}
                onChange={e => setStream(e.target.value)}
                className="w-full px-3 py-3 rounded-xl text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 border-0"
              >
                <option value="">Select stream</option>
                {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                PERCENTILE / MARKS
              </label>
              <input
                type="text"
                value={marks}
                onChange={e => setMarks(e.target.value)}
                placeholder="e.g. 85 percentile"
                className="w-full px-3 py-3 rounded-xl text-sm bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 border-0"
              />
            </div>

            <div className="flex-1 min-w-0">
              <label className="block text-[11px] font-semibold mb-1.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                BUDGET
              </label>
              <select
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-full px-3 py-3 rounded-xl text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 border-0"
              >
                <option value="">Select budget</option>
                {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <button
              onClick={handleShortlist}
              className="shrink-0 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ background: "#F97316" }}
            >
              Get my shortlist →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
