"use client"
import { useEffect, useId, useState } from "react"
import { SlidersHorizontal, X, ChevronDown, RotateCcw, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { FACETS, countActiveFilters, isSelected, keyOf, DEFAULT_FILTERS, type FacetKey, type FacetOption, type FiltersState } from "@/lib/collegeFacets"

// Filter sidebar for /colleges. Every group: title, optional search box, a
// scrollable checkbox list with live counts. Fully controlled by CollegeGrid.

function Section({ title, selectedCount, defaultOpen, options, onToggle, isOn }: {
  title: string
  selectedCount: number
  defaultOpen: boolean
  options: FacetOption[]
  onToggle: (value: string) => void
  isOn: (value: string) => boolean
}) {
  const [open, setOpen] = useState(defaultOpen || selectedCount > 0)
  const [q, setQ] = useState("")
  const id = useId()
  const searchable = options.length > 7
  const shown = q ? options.filter((o) => o.value.toLowerCase().includes(q.toLowerCase())) : options

  return (
    <div className="border-b border-gray-100 py-3.5 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between text-left text-sm font-extrabold text-[#012858]"
      >
        <span className="flex items-center gap-2">
          {title}
          {selectedCount > 0 && <span className="rounded-full bg-[#E0170F] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">{selectedCount}</span>}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-gray-500 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
      </button>

      <div id={id} className={cn("grid transition-[grid-template-rows,opacity] duration-300 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <div className="pt-3">
            {searchable && (
              <div className="relative mb-2">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <label htmlFor={`${id}-q`} className="sr-only">Search {title}</label>
                <input
                  id={`${id}-q`}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={`Search by ${title}`}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-8 pr-2 text-xs text-gray-900 placeholder:text-gray-500 focus:border-[#024692] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#024692]/20"
                />
              </div>
            )}
            <ul className="max-h-48 space-y-0.5 overflow-y-auto pr-1 [scrollbar-width:thin]">
              {shown.map((o) => {
                const on = isOn(o.value)
                const dim = o.count === 0 && !on
                return (
                  <li key={o.value}>
                    <label className={cn("flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-[13px] transition-colors hover:bg-blue-50/60", dim && "opacity-45")}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => onToggle(o.value)}
                        className="h-4 w-4 shrink-0 rounded border-gray-300 accent-[#E0170F]"
                      />
                      <span className={cn("flex-1 truncate", on ? "font-bold text-[#012858]" : "text-gray-800")}>{o.value}</span>
                      <span className="text-xs tabular-nums text-gray-500">({o.count})</span>
                    </label>
                  </li>
                )
              })}
              {shown.length === 0 && <li className="px-1.5 py-2 text-xs text-gray-500">No match</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className="flex w-full items-center justify-between gap-3 rounded-lg py-1.5 text-left text-[13px] font-medium text-gray-800">
      {label}
      <span className={cn("relative h-6 w-11 shrink-0 rounded-full transition-colors", checked ? "bg-[#E0170F]" : "bg-gray-300")}>
        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", checked ? "left-[22px]" : "left-0.5")} />
      </span>
    </button>
  )
}

interface CollegeFiltersProps {
  filters: FiltersState
  onChange: (f: FiltersState) => void
  options: Record<FacetKey, FacetOption[]>
  mobileOpen: boolean
  onMobileClose: () => void
  resultCount: number
}

export default function CollegeFilters({ filters, onChange, options, mobileOpen, onMobileClose, resultCount }: CollegeFiltersProps) {
  const active = countActiveFilters(filters)

  const toggle = (key: FacetKey, value: string) => {
    const on = isSelected(filters, key, value)
    onChange({ ...filters, [key]: on ? filters[key].filter((s) => keyOf(key, s) !== keyOf(key, value)) : [...filters[key], value] })
  }

  // Lock page scroll behind the mobile sheet; close on Escape
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onMobileClose() }
    window.addEventListener("keydown", esc)
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", esc) }
  }, [mobileOpen, onMobileClose])

  const body = (
    <>
      {FACETS.map(({ key, title, defaultOpen }) => {
        const opts = options[key] ?? []
        // A group with a single choice (e.g. one state) can't narrow anything
        if (opts.length < 2 && filters[key].length === 0) return null
        return (
          <Section
            key={key}
            title={title}
            selectedCount={filters[key].length}
            defaultOpen={defaultOpen}
            options={opts}
            onToggle={(v) => toggle(key, v)}
            isOn={(v) => isSelected(filters, key, v)}
          />
        )
      })}
      <div className="py-3.5">
        <Switch label="Has hostel facility" checked={filters.hostel} onChange={(v) => onChange({ ...filters, hostel: v })} />
        <Switch label="NIRF ranked only" checked={filters.nirfRanked} onChange={(v) => onChange({ ...filters, nirfRanked: v })} />
      </div>
    </>
  )

  const header = (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-base font-extrabold text-[#012858]">
        <SlidersHorizontal className="h-4 w-4 text-[#E0170F]" aria-hidden="true" /> Filter By
        {active > 0 && <span className="rounded-full bg-[#E0170F] px-2 py-0.5 text-xs font-bold text-white">{active}</span>}
      </h2>
      {active > 0 && (
        <button type="button" onClick={() => onChange(DEFAULT_FILTERS)} className="inline-flex items-center gap-1 text-xs font-bold text-[#C90D11] hover:underline">
          <RotateCcw className="h-3 w-3" aria-hidden="true" /> Reset all
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop: sticky card */}
      <aside aria-label="Filter colleges" className="hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 lg:sticky lg:top-[calc(var(--leadbar-h,0px)+7.5rem)] lg:block lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto [scrollbar-width:thin]">
        {header}
        <div className="mt-2">{body}</div>
      </aside>

      {/* Mobile: bottom sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[120] lg:hidden" role="dialog" aria-modal="true" aria-label="Filter colleges">
          <div className="fade-in absolute inset-0 bg-[#011B40]/60 backdrop-blur-sm" onClick={onMobileClose} />
          <div className="sheet-up absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-2xl">
            <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-gray-300" aria-hidden="true" />
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
              {header}
              <button type="button" onClick={onMobileClose} aria-label="Close filters" className="ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="overflow-y-auto px-5">{body}</div>
            <div className="flex gap-3 border-t border-gray-100 px-5 py-4">
              <button type="button" onClick={() => onChange(DEFAULT_FILTERS)} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-700">Reset</button>
              <button type="button" onClick={onMobileClose} className="flex-[2] rounded-xl bg-[#E0170F] py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20">
                Show {resultCount} colleges
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
