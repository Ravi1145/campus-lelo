"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Loader2, ShieldCheck, User } from "lucide-react"
import { CONSENT_VERSION, ChipGroup, ConsentCheckbox, Field, Honeypot, PhoneField, inputCls } from "./LeadFormParts"
import { BUDGET_TOTAL, utmFromLocation } from "./leadOptions"

// Short MBA/PGDM lead form for exam hubs, city × exam pages and MBA guides.
// Posts to /api/leads; context (exam, programme, city, budget, UTM, page) travels
// with the lead so counsellors know what the student was reading.

const EXAMS = ["CAT", "XAT", "CMAT", "MAT", "MAH MBA CET", "SNAP", "NMAT", "ATMA", "GMAT", "Not taken yet"]
const CITIES = ["Pune", "Mumbai", "Noida", "Greater Noida", "Delhi NCR", "Open to any"]
const PROGRAMS = ["MBA", "PGDM", "Both", "Not sure"] as const

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

interface Props {
  /** Pre-selected exam (display name, e.g. "CAT") */
  exam?: string
  /** Pre-selected city */
  city?: string
  /** Where on the site the form sits — e.g. "exam_hub:cat" */
  placement: string
  heading?: string
  subheading?: string
  source?: "exam_page" | "mba_cluster"
  variant?: "card" | "plain"
}

export default function MbaLeadForm({
  exam, city, placement,
  heading = "Get a free MBA/PGDM shortlist",
  subheading = "Tell us your exam, budget and city — a counsellor will share realistic options and deadlines.",
  source = "exam_page", variant = "card",
}: Props) {
  const [form, setForm] = useState({ name: "", phone: "", exam: exam ?? "", score: "", program: "Not sure" as (typeof PROGRAMS)[number], city: city ?? "", budget: "", consent: false, website: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [serverMsg, setServerMsg] = useState("")

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }))

  function validate() {
    const e: Record<string, string> = {}
    if (form.name.trim().length < 2) e.name = "Please enter your name"
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit mobile number"
    if (!form.consent) e.consent = "Please agree so our counsellor can contact you"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setStatus("loading")
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          stream: "MBA",
          budget: form.budget || undefined,
          exam_type: form.exam || undefined,
          exam_score: form.score.trim() || undefined,
          program_type: form.program,
          city_preference: form.city || undefined,
          source,
          message: `MBA/PGDM shortlist request · ${placement} · ${window.location.pathname}`,
          ...utmFromLocation(),
          consent: form.consent,
          consent_version: CONSENT_VERSION,
          website: form.website,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setStatus("done")
        window.dataLayer?.push({ event: "generate_lead", lead_source: source, lead_placement: placement, exam: form.exam || "none", program_type: form.program, budget: form.budget || "none", location: form.city || "none" })
      } else {
        setStatus("error")
        setServerMsg(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setServerMsg("Network error. Please check your connection and try again.")
    }
  }

  const card = variant === "card"
  const wrap = card ? "relative overflow-hidden rounded-2xl bg-white shadow-lg shadow-blue-950/8 ring-1 ring-gray-200" : "relative"
  const id = (k: string) => `mba-lead-${placement.replace(/[^a-z0-9]/gi, "-")}-${k}`

  if (status === "done") {
    return (
      <div className={`${wrap} p-6 text-center`} role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60"><Check className="h-7 w-7" strokeWidth={3} aria-hidden="true" /></span>
        <p className="mt-4 text-lg font-extrabold text-[#012858]">Thanks, {form.name.split(" ")[0]}!</p>
        <p className="mt-1 text-sm text-gray-600">A CampusLelo counsellor will call you shortly. Meanwhile:</p>
        <div className="mt-3 flex flex-col gap-1.5 text-sm font-bold text-[#C90D11]">
          <Link href="/mba-vs-pgdm" className="hover:underline">MBA vs PGDM — what&apos;s right for you? →</Link>
          <Link href="/exams" className="hover:underline">All entrance exam guides →</Link>
          <Link href="/mba-counselling" className="hover:underline">MBA counselling and career guidance →</Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className={wrap} aria-label={heading}>
      {card ? (
        <div className="bg-rich-navy relative px-5 py-4 text-white">
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#E0170F]/30 blur-2xl" />
          <p className="relative text-base font-extrabold leading-snug">{heading}</p>
          <p className="relative mt-1 text-xs leading-relaxed text-blue-100">{subheading}</p>
        </div>
      ) : (
        <div className="mb-4">
          <p className="text-base font-extrabold text-[#012858]">{heading}</p>
          <p className="mt-1 text-xs text-gray-600">{subheading}</p>
        </div>
      )}

      <div className={card ? "space-y-4 p-5" : "space-y-4"}>
        <Honeypot id={id("website")} value={form.website} onChange={(v) => set("website", v)} />

        <Field label="Your name" htmlFor={id("name")} error={errors.name}>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
            <input id={id("name")} className={`${inputCls} pl-10`} placeholder="Full name" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
          </div>
        </Field>
        <PhoneField id={id("phone")} value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} />

        <div className="grid grid-cols-2 gap-3">
          <Field label="Entrance exam" htmlFor={id("exam")}>
            <select id={id("exam")} className={inputCls} value={form.exam} onChange={(e) => set("exam", e.target.value)}>
              <option value="">Select</option>
              {EXAMS.map((x) => <option key={x}>{x}</option>)}
            </select>
          </Field>
          <Field label="Score / %ile" htmlFor={id("score")}>
            <input id={id("score")} className={inputCls} placeholder="Optional" maxLength={20} value={form.score} onChange={(e) => set("score", e.target.value)} />
          </Field>
          <Field label="Programme" htmlFor={id("program")}>
            <select id={id("program")} className={inputCls} value={form.program} onChange={(e) => set("program", e.target.value as (typeof PROGRAMS)[number])}>
              {PROGRAMS.map((p) => <option key={p} value={p}>{p === "Not sure" ? "MBA or PGDM?" : p}</option>)}
            </select>
          </Field>
          <Field label="Preferred city" htmlFor={id("city")}>
            <select id={id("city")} className={inputCls} value={form.city} onChange={(e) => set("city", e.target.value)}>
              <option value="">Select</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <ChipGroup legend="Budget" hint="full programme" options={BUDGET_TOTAL} value={form.budget} onChange={(v) => set("budget", v)} />

        <ConsentCheckbox id="mba-consent" checked={form.consent} onChange={(v) => set("consent", v)} error={errors.consent} purpose="my MBA/PGDM shortlist and admission guidance" compact />

        <button type="submit" disabled={status === "loading"} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#E0170F] py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-all hover:bg-[#C90D11] disabled:opacity-60">
          {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</> : <>Get my free shortlist <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></>}
        </button>
        {status === "error" && <p className="text-sm font-medium text-red-700" role="alert">{serverMsg}</p>}
        <p className="flex items-center gap-1.5 text-xs text-gray-600"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" /> Free counselling · takes 30 seconds</p>
      </div>
    </form>
  )
}
