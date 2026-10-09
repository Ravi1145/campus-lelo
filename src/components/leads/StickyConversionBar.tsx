"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, ArrowRight } from "lucide-react"

const STORAGE_KEY = "sticky_bar_dismissed_v1"

export default function StickyConversionBar() {
  const [visible, setVisible]     = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Show after user scrolls 500px, hide if they dismiss
  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(STORAGE_KEY)) return

    const onScroll = () => {
      if (window.scrollY > 500 && !dismissed) setVisible(true)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [dismissed])

  const dismiss = () => {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem(STORAGE_KEY, "1")
  }

  if (!visible || dismissed) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] shadow-2xl"
      style={{ background: "linear-gradient(90deg, #011B40 0%, #012858 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4">

        {/* Left copy */}
        <div className="shrink-0 hidden sm:block">
          <p className="text-white font-bold text-sm leading-tight">
            📋 Get Your FREE 2026 College Shortlist
          </p>
          <p className="text-gray-400 text-xs">Expert counsellor calls within 2 hours</p>
        </div>
        <p className="text-white font-bold text-xs sm:hidden shrink-0">
          📋 Free 2026 College Shortlist
        </p>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

        {/* Consent-first: the request form (with the DPDP consent box) lives on the counselling page */}
        <div className="flex flex-1 items-center gap-2 min-w-0 justify-end sm:justify-start">
          <Link
            href="/counselling#book"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-white font-bold text-xs transition-all hover:opacity-90 shrink-0 whitespace-nowrap"
            style={{ background: "#E0170F" }}
          >
            Get Shortlist <ArrowRight className="w-3.5 h-3.5" />
          </Link>

        {/* WhatsApp alt */}
          <a
            href={`https://wa.me/917753831118?text=${encodeURIComponent("Hi! I want a free 2026 college shortlist for Pune.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-white text-xs shrink-0 transition-opacity hover:opacity-90"
            style={{ background: "#25D366" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="text-gray-500 hover:text-white transition-colors p-1 shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
