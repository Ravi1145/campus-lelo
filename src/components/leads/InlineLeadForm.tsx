"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Loader2, MapPin, ShieldCheck, User, Wallet } from "lucide-react"
import { CONSENT_VERSION, ConsentCheckbox, Field, Honeypot, inputCls } from "./LeadFormParts"
import { BUDGET_YEARLY, LOCATIONS, utmFromLocation } from "./leadOptions"

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

interface InlineLeadFormProps {
  context?: string
}

// Compact lead band for lists and articles: name, phone, budget, location.
export default function InlineLeadForm({ context }: InlineLeadFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", budget: "", location: "", consent: false, website: "" })
  const [errors, setErrors] = useState<{ name?: string; phone?: string; consent?: string; form?: string }>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }))
  const uid = (context ?? "inline").replace(/[^a-z0-9]/gi, "-").toLowerCase()

  const validate = () => {
    const e: typeof errors = {}
    if (form.name.trim().length < 2) e.name = "Enter your name"
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter a valid 10-digit number"
    if (!form.consent) e.consent = "Please tick the box so we can contact you"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          budget: form.budget || undefined,
          city_preference: form.location || undefined,
          source: "inline_form",
          message: context,
          ...utmFromLocation(),
          consent: form.consent,
          consent_version: CONSENT_VERSION,
          website: form.website,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.success) {
        setSuccess(true)
        window.dataLayer?.push({ event: "generate_lead", lead_source: "inline_form", budget: form.budget || "none", location: form.location || "none" })
      } else {
        setErrors({ form: "Submission failed. Please try again." })
      }
    } catch {
      setErrors({ form: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-emerald-200" role="status">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-6 w-6" strokeWidth={3} aria-hidden="true" /></span>
        <div>
          <p className="font-extrabold text-[#012858]">Thanks, {form.name.trim().split(" ")[0]}: we have your details.</p>
          <p className="text-sm text-gray-600">A counsellor will contact you on WhatsApp or call with options that fit your budget{form.location && form.location !== "Open to any" ? ` in ${form.location}` : ""}.</p>
        </div>
      </div>
    )
  }

  return (
    <section aria-label="Get a free college shortlist" className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-blue-950/5 ring-1 ring-gray-200">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#E0170F] to-[#024692]" />
      <div className="grid gap-5 p-5 pl-7 lg:grid-cols-[0.75fr_1.6fr] lg:items-center lg:gap-8 lg:p-6 lg:pl-8">
        <div>
          <p className="text-lg font-extrabold leading-snug text-[#012858]">Get a shortlist that fits your budget</p>
          <p className="mt-1 text-sm text-gray-600">Tell us what you can spend and where you want to study. A counsellor sends matching colleges, free.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="relative">
          <Honeypot id={`${uid}-website`} value={form.website} onChange={(v) => set("website", v)} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name" htmlFor={`${uid}-name`} error={errors.name}>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <input id={`${uid}-name`} autoComplete="name" maxLength={50} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" aria-invalid={!!errors.name} className={`${inputCls} pl-9`} />
              </div>
            </Field>
            <Field label="WhatsApp number" htmlFor={`${uid}-phone`} error={errors.phone}>
              <div className="flex">
                <span className="inline-flex items-center rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-2.5 text-sm font-semibold text-gray-700">+91</span>
                <input id={`${uid}-phone`} type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} value={form.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit number" aria-invalid={!!errors.phone} className={`${inputCls} rounded-l-none`} />
              </div>
            </Field>
            <Field label="Budget (per year)" htmlFor={`${uid}-budget`}>
              <div className="relative">
                <Wallet className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <select id={`${uid}-budget`} value={form.budget} onChange={(e) => set("budget", e.target.value)} className={`${inputCls} appearance-none pl-9`}>
                  <option value="">Select budget</option>
                  {BUDGET_YEARLY.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>
            </Field>
            <Field label="Preferred location" htmlFor={`${uid}-loc`}>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <select id={`${uid}-loc`} value={form.location} onChange={(e) => set("location", e.target.value)} className={`${inputCls} appearance-none pl-9`}>
                  <option value="">Select location</option>
                  {LOCATIONS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
            </Field>
          </div>

          <div className="mt-4"><ConsentCheckbox id={`${uid}-consent`} checked={form.consent} onChange={(v) => set("consent", v)} error={errors.consent} purpose="my college shortlist and admission guidance" compact /></div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button type="submit" disabled={loading} className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#C90D11] disabled:opacity-60">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</> : <>Get my shortlist <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></>}
            </button>
            <p className="flex items-center gap-1.5 text-xs text-gray-600">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
              Free. We never sell your details. <Link href="/privacy" className="font-semibold underline">Privacy</Link>
            </p>
          </div>
          {errors.form && <p className="mt-2 text-sm font-medium text-red-700" role="alert">{errors.form}</p>}
        </form>
      </div>
    </section>
  )
}
