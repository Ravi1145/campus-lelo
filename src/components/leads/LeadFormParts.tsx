"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"
import type { Option } from "./leadOptions"

// Building blocks shared by the lead forms. Native inputs underneath, so
// keyboard, autofill and screen readers behave; only the styling is custom.

export const inputCls =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-900 placeholder:text-gray-500 shadow-sm transition focus:border-[#024692] focus:outline-none focus:ring-4 focus:ring-[#024692]/10"

export function Field({ label, htmlFor, error, children, className }: { label: string; htmlFor: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-red-700" role="alert">{error}</p>}
    </div>
  )
}

/** Single-choice pills (radio group). Tap to choose; arrow keys move between options. */
export function ChipGroup({ legend, hint, options, value, onChange }: { legend: string; hint?: string; options: Option[]; value: string; onChange: (v: string) => void }) {
  const name = useId()
  return (
    <fieldset>
      <legend className="mb-2 flex w-full items-baseline justify-between gap-2 text-xs font-bold uppercase tracking-wide text-gray-600">
        <span>{legend}</span>
        {hint && <span className="text-[11px] font-medium normal-case tracking-normal text-gray-500">{hint}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="cursor-pointer">
            <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={() => onChange(opt.value)} className="peer sr-only" />
            <span
              className={cn(
                "inline-flex items-center rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-gray-700 ring-1 ring-gray-200 transition-all",
                "hover:ring-[#012858] peer-checked:bg-[#012858] peer-checked:text-white peer-checked:shadow-md peer-checked:ring-[#012858]",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-[#024692] active:scale-95",
              )}
            >
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** +91 mobile field */
export function PhoneField({ id, value, onChange, error, label = "Mobile number" }: { id: string; value: string; onChange: (v: string) => void; error?: string; label?: string }) {
  return (
    <Field label={label} htmlFor={id} error={error}>
      <div className="flex">
        <span className="inline-flex items-center rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-700">+91</span>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="10-digit number"
          aria-invalid={!!error}
          className={cn(inputCls, "rounded-l-none")}
        />
      </div>
    </Field>
  )
}

/** Hidden from people and screen readers; bots fill it, the API drops the lead. */
export function Honeypot({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={id}>Website</label>
      <input id={id} tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

/** Multi-choice pills (checkbox group). */
export function MultiChipGroup({ legend, hint, options, value, onChange }: { legend: string; hint?: string; options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (o: string) => onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o])
  return (
    <fieldset>
      <legend className="mb-2 flex w-full items-baseline justify-between gap-2 text-xs font-bold uppercase tracking-wide text-gray-600">
        <span>{legend}</span>
        {hint && <span className="text-[11px] font-medium normal-case tracking-normal text-gray-500">{hint}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="checkbox" checked={value.includes(o)} onChange={() => toggle(o)} className="peer sr-only" />
            <span
              className={cn(
                "inline-flex items-center rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-gray-700 ring-1 ring-gray-200 transition-all",
                "hover:ring-[#012858] peer-checked:bg-[#012858] peer-checked:text-white peer-checked:shadow-md peer-checked:ring-[#012858]",
                "peer-focus-visible:ring-2 peer-focus-visible:ring-[#024692] active:scale-95",
              )}
            >
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Version of the notice text shown next to the consent box. Bump when the wording changes. */
export const CONSENT_VERSION = "2026-10-09"

/**
 * DPDP Act 2023 consent: a separate, unticked box that says what data is used, why, who sees it,
 * how to withdraw, and links the privacy notice. The form must not submit until it is ticked.
 */
export function ConsentCheckbox({
  id,
  checked,
  onChange,
  error,
  purpose = "counselling and admission guidance",
  dark = false,
  compact = false,
}: {
  id: string
  checked: boolean
  onChange: (v: boolean) => void
  error?: string
  purpose?: string
  dark?: boolean
  compact?: boolean
}) {
  const text = dark ? "text-blue-100" : "text-gray-600"
  const link = dark ? "font-semibold text-white underline" : "font-semibold text-[#024692] underline"
  return (
    <div>
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error}
          aria-describedby={`${id}-note`}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#E0170F]"
        />
        <label htmlFor={id} id={`${id}-note`} className={cn("cursor-pointer leading-snug", compact ? "text-[11px]" : "text-xs", text)}>
          I agree that CampusLelo may use my name, mobile number and the details I enter to contact me by call or WhatsApp for {purpose}, and share them only with the colleges or counsellors I ask about. I am 18 or older, or a parent or guardian is submitting this form. I can withdraw consent or ask for my data to be erased at any time by emailing{" "}
          <a href="mailto:grievance@campuslelo.com" className={link}>grievance@campuslelo.com</a>. Read the{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className={link}>Privacy Notice</a>.
        </label>
      </div>
      {error && <p className="mt-1 text-xs font-medium text-red-700" role="alert">{error}</p>}
    </div>
  )
}
