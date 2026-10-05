"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

// Read-only code/text box with a copy button (embed code, citation text).
export default function CopyBox({ label, text, rows = 4 }: { label: string; text: string; rows?: number }) {
  const [copied, setCopied] = useState(false)
  const id = `copybox-${label.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: select the text so the user can copy by hand
      const el = document.getElementById(id) as HTMLTextAreaElement | null
      el?.select()
    }
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-bold uppercase tracking-wide text-gray-600">{label}</label>
        <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg bg-[#012858] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#024692]">
          {copied ? <><Check className="h-3.5 w-3.5" aria-hidden="true" /> Copied</> : <><Copy className="h-3.5 w-3.5" aria-hidden="true" /> Copy</>}
        </button>
      </div>
      <textarea id={id} readOnly rows={rows} value={text} onFocus={(e) => e.currentTarget.select()} className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 font-mono text-xs leading-relaxed text-gray-800 focus:border-[#024692] focus:outline-none focus:ring-4 focus:ring-[#024692]/10" />
      <span className="sr-only" role="status">{copied ? "Copied to clipboard" : ""}</span>
    </div>
  )
}
