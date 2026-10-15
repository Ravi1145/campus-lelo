"use client"
import { useEffect, useId, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Loader2, ShieldCheck, User, Video, PhoneCall } from "lucide-react"
import { cn } from "@/lib/utils"
import { CONSENT_VERSION, ChipGroup, ConsentCheckbox, Field, Honeypot, MultiChipGroup, PhoneField, inputCls } from "./LeadFormParts"
import { BUDGET_YEARLY, LOCATIONS } from "./leadOptions"
import { HELP_TOPICS, PLANS, VIDEO_PRICE_INR, type PlanId } from "@/data/counselling"
import { PLAN_EVENT } from "@/components/counselling/PlanCta"

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

const STREAMS = ["Engineering", "Medical", "MBA", "Law", "Arts & Science", "Commerce", "Design", "Pharmacy", "Other"]
const TIMES = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
]

interface Props {
  /** Pre-selected plan, e.g. from a "Book video session" button */
  defaultPlan?: PlanId
  /** Pre-selected stream, e.g. "MBA" on the MBA counselling page */
  defaultStream?: string
  /** Topic chips to offer instead of the general list */
  topicOptions?: string[]
  heading?: string
  intro?: string
}

// Counselling request: choose free phone counselling or the paid video session,
// say what you need and when. No payment is taken here — for the video session
// the team confirms the slot and sends a payment link.
export default function CounsellingBooking({ defaultPlan = "free_phone", defaultStream = "", topicOptions = HELP_TOPICS, heading = "Tell us what you need. We'll take it from there.", intro = "Pick free phone counselling or an expert video session. Add your budget and city so the first conversation starts with options, not questions." }: Props) {
  const uid = useId()
  const [plan, setPlan] = useState<PlanId>(defaultPlan)
  const [form, setForm] = useState({ name: "", phone: "", stream: defaultStream, location: "", budget: "", date: "", time: "", consent: false, website: "" })
  const [topics, setTopics] = useState<string[]>([])
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string; form?: string }>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<{ ref: string; plan: PlanId } | null>(null)
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }))
  const isVideo = plan === "video_199"

  // Deep link: /counselling?plan=video preselects the paid session
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("plan")
    if (p === "video") setPlan("video_199")
    else if (p === "free") setPlan("free_phone")
    // Plan buttons on this page pick a plan without reloading
    const onPlan = (e: Event) => setPlan((e as CustomEvent<PlanId>).detail)
    window.addEventListener(PLAN_EVENT, onPlan)
    return () => window.removeEventListener(PLAN_EVENT, onPlan)
  }, [])

  const validate = () => {
    const e: typeof errors = {}
    if (form.name.trim().length < 2) e.name = "Please enter your name"
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number"
    if (!form.consent) e.consent = "Please tick the box so we can contact you"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/counselling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          stream: form.stream || undefined,
          plan,
          budget: form.budget || undefined,
          city_preference: form.location || undefined,
          help_topics: topics.length ? topics : undefined,
          preferred_date: form.date || undefined,
          preferred_time: form.time || undefined,
          consent: form.consent,
          consent_version: CONSENT_VERSION,
          website: form.website,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.success) {
        setSuccess({ ref: data.bookingRef, plan })
        window.dataLayer?.push({ event: "generate_lead", lead_source: "counselling", counselling_plan: plan, budget: form.budget || "none", location: form.location || "none" })
      } else {
        setErrors({ form: data.message || "Submission failed. Please try again." })
      }
    } catch {
      setErrors({ form: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="book" aria-labelledby="book-h" className="bg-rich-navy relative scroll-mt-32 overflow-hidden px-4 py-14 sm:px-6 sm:py-20">
      <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.1]" />
      <div className="relative mx-auto grid max-w-5xl items-start gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
        {/* Left: what you get */}
        <div className="text-white">
          <h2 id="book-h" className="text-3xl font-extrabold leading-tight sm:text-4xl">{heading}</h2>
          <p className="mt-3 text-base leading-relaxed text-blue-100">{intro}</p>
          <ul className="mt-6 space-y-3 text-sm text-blue-50">
            {(isVideo ? PLANS[1] : PLANS[0]).includes.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/90 text-[#011B40]"><Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" /></span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-blue-200">Free, no spam. We contact you only about your request.</p>
        </div>

        {/* Right: form */}
        <div className="rounded-3xl bg-white p-5 shadow-2xl sm:p-7">
          {success ? (
            <div className="py-6 text-center" role="status">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60"><Check className="h-8 w-8" strokeWidth={3} aria-hidden="true" /></span>
              <h3 className="mt-5 text-2xl font-extrabold text-[#012858]">{success.plan === "video_199" ? "Video session requested" : "Call requested"}</h3>
              <p className="mt-1 text-sm font-bold text-[#C90D11]">Reference {success.ref}</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-gray-600">
                {success.plan === "video_199"
                  ? `We will confirm your slot on WhatsApp and send a secure payment link for ₹${VIDEO_PRICE_INR}. You pay only after the slot is confirmed.`
                  : "A counsellor will call or WhatsApp you to talk through your options. It is free."}
              </p>
              <div className="mt-5 flex flex-col gap-1.5 text-sm font-bold text-[#C90D11]">
                <Link href="/scholarships" className="hover:underline">Explore scholarships while you wait →</Link>
                <Link href="/colleges" className="hover:underline">Browse colleges →</Link>
              </div>
              <button type="button" onClick={() => setSuccess(null)} className="mt-5 text-sm font-semibold text-gray-600 underline underline-offset-2 hover:text-[#012858]">Make another request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
              <Honeypot id={`${uid}-website`} value={form.website} onChange={(v) => set("website", v)} />

              {/* Plan picker */}
              <fieldset>
                <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-600">Choose counselling</legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {PLANS.map((p) => {
                    const on = plan === p.id
                    const Icon = p.id === "video_199" ? Video : PhoneCall
                    return (
                      <label key={p.id} className="cursor-pointer">
                        <input type="radio" name={`${uid}-plan`} value={p.id} checked={on} onChange={() => setPlan(p.id)} className="peer sr-only" />
                        <span className={cn(
                          "flex h-full flex-col rounded-2xl p-4 ring-1 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-[#024692]",
                          on ? "bg-[#012858] text-white shadow-lg ring-[#012858]" : "bg-white text-gray-800 ring-gray-200 hover:ring-[#012858]",
                        )}>
                          <span className="flex items-center justify-between">
                            <Icon className={cn("h-5 w-5", on ? "text-orange-300" : "text-[#C90D11]")} aria-hidden="true" />
                            <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-extrabold", on ? "bg-white text-[#012858]" : "bg-gray-100 text-[#012858]")}>{p.priceLabel}</span>
                          </span>
                          <span className="mt-2 text-sm font-extrabold leading-snug">{p.id === "video_199" ? "Expert video session" : "Phone counselling"}</span>
                          <span className={cn("mt-0.5 text-xs", on ? "text-blue-100" : "text-gray-600")}>{p.id === "video_199" ? "CAP, career and your shortlist" : "A call or WhatsApp chat"}</span>
                        </span>
                      </label>
                    )
                  })}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name" htmlFor={`${uid}-name`} error={errors.name}>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                    <input id={`${uid}-name`} autoComplete="name" maxLength={50} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" aria-invalid={!!errors.name} className={`${inputCls} pl-10`} />
                  </div>
                </Field>
                <PhoneField id={`${uid}-phone`} label="WhatsApp number" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} />
              </div>

              <Field label="Stream / field" htmlFor={`${uid}-stream`}>
                <select id={`${uid}-stream`} value={form.stream} onChange={(e) => set("stream", e.target.value)} className={inputCls}>
                  <option value="">Select your stream</option>
                  {STREAMS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>

              <MultiChipGroup legend="What do you need help with?" hint="Pick any" options={topicOptions} value={topics} onChange={setTopics} />
              <ChipGroup legend="Preferred location" options={LOCATIONS} value={form.location} onChange={(v) => set("location", v)} />
              <ChipGroup legend="Budget" hint="per year" options={BUDGET_YEARLY} value={form.budget} onChange={(v) => set("budget", v)} />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={isVideo ? "Preferred date for the video call" : "Preferred date for the call"} htmlFor={`${uid}-date`}>
                  <input id={`${uid}-date`} type="date" value={form.date} min={new Date().toISOString().split("T")[0]} onChange={(e) => set("date", e.target.value)} className={inputCls} />
                </Field>
                <ChipGroup legend="Preferred time" options={TIMES} value={form.time} onChange={(v) => set("time", v)} />
              </div>

              {isVideo && (
                <p className="rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 ring-1 ring-amber-200">
                  <strong>How payment works:</strong> you send this request first. We confirm the slot on WhatsApp and send a secure payment link for ₹{VIDEO_PRICE_INR}. Nothing is charged on this page.
                </p>
              )}

              {errors.form && <p className="text-sm font-medium text-red-700" role="alert">{errors.form}</p>}

              <ConsentCheckbox id={`${uid}-consent`} checked={form.consent} onChange={(v) => set("consent", v)} error={errors.consent} purpose={isVideo ? "my counselling session and admission guidance" : "free counselling and admission guidance"} />

              <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#E0170F] py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-all hover:bg-[#C90D11] disabled:opacity-60">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</> : <>{isVideo ? `Request video session: ₹${VIDEO_PRICE_INR}` : "Request a free call"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></>}
              </button>
              <p className="flex items-start gap-1.5 text-xs text-gray-600">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>We never sell your details. <Link href="/privacy" className="font-semibold underline">Privacy policy</Link></span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
