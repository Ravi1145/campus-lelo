import Link from "next/link"
import { Target, ListChecks, Headphones } from "lucide-react"

const STEPS = [
  {
    icon: Target,
    step: "01",
    title: "Tell us your goal",
    desc: "Share your stream, marks, and budget. Takes under a minute.",
  },
  {
    icon: ListChecks,
    step: "02",
    title: "Get a shortlist",
    desc: "Our AI picks the best-fit colleges that match your profile and cutoffs.",
  },
  {
    icon: Headphones,
    step: "03",
    title: "Apply with free counselling",
    desc: "A real expert guides you through every step of admission — at zero cost.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 px-6" style={{ background: "#F6F8FB" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-bold text-3xl mb-2" style={{ color: "#0F172A" }}>How it works</h2>
          <p className="text-sm" style={{ color: "#475569" }}>From confusion to admission in 3 simple steps</p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {/* Connector line (desktop) */}
          <div
            className="hidden sm:block absolute"
            style={{
              top: "28px",
              left: "calc(16.67% + 28px)",
              right: "calc(16.67% + 28px)",
              height: "1px",
              background: "#E5E9F0",
            }}
          />

          {STEPS.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center relative">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-white relative z-10"
                style={{ border: "2px solid #E5E9F0" }}
              >
                <Icon className="w-6 h-6" style={{ color: "#0B1226" }} strokeWidth={1.5} />
              </div>
              <p className="text-xs font-bold tracking-widest mb-2" style={{ color: "#F97316" }}>
                STEP {step}
              </p>
              <h3 className="font-semibold text-base mb-2" style={{ color: "#0F172A" }}>{title}</h3>
              <p className="text-sm max-w-xs" style={{ color: "#475569", lineHeight: "1.65" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/counselling"
            className="inline-flex items-center gap-2 font-semibold text-white px-8 py-3.5 rounded-xl text-sm transition-opacity hover:opacity-90"
            style={{ background: "#F97316" }}
          >
            Get Free Counselling →
          </Link>
        </div>
      </div>
    </section>
  )
}
