"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ArrowRight, ArrowLeft, Check, Loader2, ShieldCheck, User } from "lucide-react"
import { CONSENT_VERSION, ChipGroup, ConsentCheckbox, Field, Honeypot, PhoneField, inputCls } from "./LeadFormParts"
import { BUDGET_YEARLY, COURSES, LOCATIONS, utmFromLocation } from "./leadOptions"

const SESSION_KEY = "exit_popup_shown"

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

const BENEFITS = [
  "A shortlist matched to your score, budget and city",
  "Fees and cut-offs taken from official sources",
  "A counsellor who guides you — free for students",
]

export default function ExitPopup() {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState({ stream: "", location: "", budget: "", name: "", phone: "", consent: false, website: "" })
  const [errors, setErrors] = useState<{ stream?: string; name?: string; phone?: string; consent?: string; form?: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }))

  const close = useCallback(() => setVisible(false), [])

  const show = useCallback(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    setVisible(true)
    sessionStorage.setItem(SESSION_KEY, "1")
  }, [])

  useEffect(() => {
    // Desktop (mouse/trackpad) only. On phones a popup over the content is an
    // "intrusive interstitial" that Google can demote, and hijacking the back
    // button breaks navigation — mobile visitors use the inline forms instead.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    // Desktop: mouse leaves viewport upwards (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show()
    }

    // Fallback after 25s on the page
    const timer = setTimeout(show, 25000)

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(timer)
    }
  }, [show])

  // Escape closes; focus moves into the dialog when it opens
  useEffect(() => {
    if (!visible) return
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", esc)
    panelRef.current?.querySelector<HTMLElement>("input, button")?.focus()
    return () => window.removeEventListener("keydown", esc)
  }, [visible, close])

  function next() {
    if (!form.stream) { setErrors({ stream: "Choose the course you are looking for" }); return }
    setErrors({})
    setStep(2)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const eMap: typeof errors = {}
    if (form.name.trim().length < 2) eMap.name = "Please enter your name"
    if (!/^[6-9]\d{9}$/.test(form.phone)) eMap.phone = "Enter a valid 10-digit mobile number"
    if (!form.consent) eMap.consent = "Please tick the box so we can contact you"
    if (eMap.name || eMap.phone || eMap.consent) { setErrors(eMap); return }

    setErrors({})
    setSubmitting(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          stream: form.stream,
          budget: form.budget || undefined,
          city_preference: form.location || undefined,
          source: "exit_popup",
          message: "Free shortlist request via popup",
          ...utmFromLocation(),
          consent: form.consent,
          consent_version: CONSENT_VERSION,
          website: form.website,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === false) throw new Error("Server error")
      setDone(true)
      window.dataLayer?.push({ event: "generate_lead", lead_source: "exit_popup", course: form.stream, budget: form.budget || "none", location: form.location || "none" })
    } catch {
      setErrors({ form: "Something went wrong. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  if (!visible) return null

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="lead-popup-title" className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div className="fade-in absolute inset-0 bg-[#011B40]/70 backdrop-blur-sm" onClick={close} />

      <div ref={panelRef} className="hero-pop relative z-10 grid max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[0.9fr_1.1fr]" style={{ "--i": 0 } as React.CSSProperties}>
        <button type="button" onClick={close} aria-label="Close" className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow ring-1 ring-gray-200 transition hover:bg-gray-100 md:bg-gray-100 md:shadow-none md:ring-0">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Photo panel */}
        <div className="relative hidden min-h-[30rem] md:block">
          <Image src="/hero-students.webp" alt="" fill sizes="340px" className="object-cover object-[62%_20%]" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#011B40] via-[#011B40]/70 to-[#024692]/30" />
          <div className="absolute inset-x-0 bottom-0 p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-300">CampusLelo</p>
            <p className="mt-2 text-2xl font-extrabold leading-tight">Your college shortlist, built around your score and budget.</p>
            <ul className="mt-5 space-y-2.5">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-blue-50">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/90 text-[#011B40]"><Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" /></span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form panel */}
        <div className="relative max-h-[92vh] overflow-y-auto p-6 sm:p-8">
          {done ? (
            <div className="flex h-full min-h-[22rem] flex-col items-center justify-center text-center" role="status">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60"><Check className="h-8 w-8" strokeWidth={3} aria-hidden="true" /></span>
              <h2 id="lead-popup-title" className="mt-5 text-2xl font-extrabold text-[#012858]">Thanks, {form.name.trim().split(" ")[0]}!</h2>
              <p className="mt-2 max-w-xs text-sm text-gray-600">A CampusLelo counsellor will call you with options for {form.stream === "MBA" ? "MBA / PGDM" : "your course"}{form.location && form.location !== "Open to any" ? ` in ${form.location}` : ""}.</p>
              <div className="mt-5 flex flex-col gap-1.5 text-sm font-bold text-[#C90D11]">
                <Link href="/colleges" onClick={close} className="hover:underline">Browse colleges while you wait →</Link>
                <Link href="/mba" onClick={close} className="hover:underline">MBA &amp; PGDM guides →</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5">
              <Honeypot id="popup-website" value={form.website} onChange={(v) => set("website", v)} />

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-600">
                  <span>Step {step} of 2</span>
                  <span>{step === 1 ? "Your goal" : "Your contact"}</span>
                </div>
                <div className="mt-2 flex gap-1.5" aria-hidden="true">
                  <span className="h-1.5 flex-1 rounded-full bg-[#E0170F]" />
                  <span className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step === 2 ? "bg-[#E0170F]" : "bg-gray-200"}`} />
                </div>
              </div>

              {step === 1 ? (
                <>
                  <div>
                    <h2 id="lead-popup-title" className="text-2xl font-extrabold leading-tight text-[#012858]">Get a free shortlist</h2>
                    <p className="mt-1 text-sm text-gray-600">Tell us what you are looking for. It takes 20 seconds.</p>
                  </div>
                  <div>
                    <ChipGroup legend="Course" options={COURSES} value={form.stream} onChange={(v) => { set("stream", v); setErrors({}) }} />
                    {errors.stream && <p className="mt-1.5 text-xs font-medium text-red-700" role="alert">{errors.stream}</p>}
                  </div>
                  <ChipGroup legend="Preferred location" options={LOCATIONS} value={form.location} onChange={(v) => set("location", v)} />
                  <ChipGroup legend="Budget" hint="per year" options={BUDGET_YEARLY} value={form.budget} onChange={(v) => set("budget", v)} />
                  <button type="button" onClick={next} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#E0170F] py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-all hover:bg-[#C90D11]">
                    Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <h2 id="lead-popup-title" className="text-2xl font-extrabold leading-tight text-[#012858]">Where should we reach you?</h2>
                    <p className="mt-1 text-sm text-gray-600">
                      {[form.stream && COURSES.find((c) => c.value === form.stream)?.label, form.location, form.budget].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <Field label="Your name" htmlFor="popup-name" error={errors.name}>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                      <input id="popup-name" autoComplete="name" maxLength={50} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" aria-invalid={!!errors.name} className={`${inputCls} pl-10`} />
                    </div>
                  </Field>
                  <PhoneField id="popup-phone" value={form.phone} onChange={(v) => set("phone", v)} error={errors.phone} />
                  <ConsentCheckbox id="popup-consent" checked={form.consent} onChange={(v) => set("consent", v)} error={errors.consent} purpose="my free college shortlist" compact />
                  {errors.form && <p className="text-sm font-medium text-red-700" role="alert">{errors.form}</p>}
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setStep(1)} aria-label="Back" className="flex w-12 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-50">
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button type="submit" disabled={submitting} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E0170F] py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-all hover:bg-[#C90D11] disabled:opacity-60">
                      {submitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</> : "Get my free shortlist"}
                    </button>
                  </div>
                </>
              )}

              <p className="flex items-start gap-1.5 text-xs text-gray-600">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>Free, no spam. We never sell your details. <Link href="/privacy" className="font-semibold underline">Privacy policy</Link></span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
