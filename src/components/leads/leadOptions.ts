// Shared option lists and helpers for the lead forms (popup, inline, MBA).

export interface Option { value: string; label: string }
const o = (value: string, label = value): Option => ({ value, label })

/** Annual budget — used by the general college forms. The label is stored as-is on the lead. */
export const BUDGET_YEARLY: Option[] = [
  o("Under ₹1L per year", "Under ₹1L"),
  o("₹1–2L per year", "₹1–2L"),
  o("₹2–4L per year", "₹2–4L"),
  o("₹4–8L per year", "₹4–8L"),
  o("Above ₹8L per year", "₹8L+"),
  o("Not sure yet", "Not sure"),
]

/** Total programme budget — used by the MBA / PGDM forms (two-year programmes). */
export const BUDGET_TOTAL: Option[] = [
  o("Under ₹5L total", "Under ₹5L"),
  o("₹5–10L total", "₹5–10L"),
  o("₹10–15L total", "₹10–15L"),
  o("₹15–20L total", "₹15–20L"),
  o("Above ₹20L total", "₹20L+"),
  o("Not sure yet", "Not sure"),
]

/** Where the student wants to study (sent as `city_preference`, max 40 chars). */
export const LOCATIONS: Option[] = [
  o("Pune"), o("Noida"), o("Greater Noida"), o("Delhi NCR"), o("Mumbai"), o("Bangalore"), o("Other city"), o("Open to any"),
]

export const COURSES: Option[] = [
  o("BTech", "B.Tech"), o("MBA", "MBA / PGDM"), o("MBBS", "MBBS"), o("BBA", "BBA"),
  o("BArch", "B.Arch"), o("BSc", "B.Sc"), o("BCom", "B.Com"), o("Law", "Law"), o("Other", "Other"),
]

/** UTM params from the current URL (the API stores them with the lead). */
export function utmFromLocation() {
  const sp = new URLSearchParams(window.location.search)
  return {
    utm_source: sp.get("utm_source") || undefined,
    utm_medium: sp.get("utm_medium") || undefined,
    utm_campaign: sp.get("utm_campaign") || undefined,
    utm_content: sp.get("utm_content") || undefined,
  }
}
