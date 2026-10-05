// Harvest real Google (India) autocomplete suggestions for MBA / PGDM queries.
// Run:  node docs/keywords/harvest.mjs   → writes docs/keywords/raw-suggestions.json
// Autocomplete = what people actually type; it carries NO search-volume data.
// "rank" is the position inside the suggestion list (1 = strongest signal).
import fs from "node:fs"

const CITIES = ["pune", "noida", "greater noida", "delhi", "delhi ncr", "gurgaon", "mumbai", "bangalore", "hyderabad", "india"]
const EXAMS = ["cat", "xat", "snap", "cmat", "mat", "nmat", "gmat", "mah cet", "mba cet", "atma", "cuet pg"]
const TOPICS = [
  "fees", "cutoff", "placements", "ranking", "admission", "eligibility", "without cat", "direct admission", "scholarship",
  "hostel", "low fees", "government", "private", "best", "top", "list", "average package", "percentile", "syllabus",
  "distance", "online", "executive", "part time", "after btech", "after bcom", "with work experience", "for freshers",
]
const SPECS = ["marketing", "finance", "hr", "business analytics", "operations", "international business", "healthcare", "digital marketing", "entrepreneurship", "data science", "supply chain", "banking"]
const COLLEGES = ["sibm pune", "scmhrd", "mit wpu", "symbiosis", "fms delhi", "iift", "bimtech", "jaipuria noida", "iim", "xlri", "nmims", "ipe", "great lakes", "welingkar", "flame", "pumba", "imt ghaziabad", "mdi gurgaon", "jbims", "spjimr"]
const GENERAL = [
  "mba vs pgdm", "pgdm vs mba which is better", "mba or pgdm", "is pgdm equal to mba", "mba admission process", "mba entrance exams in india",
  "mba entrance exam list", "mba after graduation", "mba eligibility criteria", "mba salary in india", "mba roi", "mba education loan",
  "is mba worth it", "mba without entrance exam", "mba without cat colleges", "mba in india fees", "best mba colleges in india",
  "best b schools in india", "top mba colleges in india", "mba cutoff", "mba percentile required", "mba syllabus", "mba specializations",
  "mba career options", "mba course details", "mba duration", "mba full form", "pgdm full form", "mba admission 2027", "mba admission 2026",
  "mba entrance exam dates 2027", "cat 2026 registration", "cat 2026 exam date", "xat 2027 exam date", "snap 2026 exam date", "cmat 2027 exam date",
  "nmat 2026 registration", "mat 2026 exam date", "mba cet 2027", "gmat vs cat", "cat vs xat", "cat vs gmat", "snap vs cat",
  "mba abroad vs india", "executive mba india", "mba for working professionals", "mba weekend classes", "one year mba india", "mba in 1 year",
]

const seeds = new Set()
for (const c of CITIES) {
  seeds.add(`mba colleges in ${c}`); seeds.add(`pgdm colleges in ${c}`); seeds.add(`best mba colleges in ${c}`)
  seeds.add(`top mba colleges in ${c}`)
  for (const t of TOPICS) seeds.add(`mba in ${c} ${t}`)
  for (const t of TOPICS.slice(0, 10)) seeds.add(`mba colleges in ${c} ${t}`)
  for (const e of EXAMS) seeds.add(`mba colleges in ${c} accepting ${e}`)
}
for (const e of EXAMS) {
  for (const t of ["exam date", "registration", "syllabus", "exam pattern", "eligibility", "cutoff", "colleges", "fees", "preparation", "result", "percentile", "score", "vs"]) seeds.add(`${e} ${t}`)
}
for (const s of SPECS) { seeds.add(`mba in ${s}`); seeds.add(`mba ${s} colleges`); seeds.add(`mba ${s} salary`); seeds.add(`best colleges for mba in ${s}`) }
for (const c of COLLEGES) for (const t of ["fees", "cutoff", "placements", "admission", "ranking", "eligibility", "reviews", "average package"]) seeds.add(`${c} mba ${t}`)
for (const g of GENERAL) seeds.add(g)

// A–Z expansion for head terms (long-tail discovery)
const HEAD = ["mba colleges in pune", "mba colleges in noida", "mba colleges in greater noida", "mba colleges in delhi", "mba colleges in delhi ncr",
  "mba admission", "mba cutoff", "pgdm colleges", "mba fees", "cat exam", "mba without cat", "mba entrance exam", "mba vs pgdm", "best mba colleges"]
for (const h of HEAD) for (const ch of "abcdefghijklmnopqrstuvwxyz") seeds.add(`${h} ${ch}`)

const list = [...seeds]
console.log("seeds:", list.length)

const out = {} // query -> { seeds: [...], bestRank }
let done = 0
async function one(seed) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=in&q=${encodeURIComponent(seed)}`
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(15000) })
      if (!r.ok) throw new Error(String(r.status))
      const j = await r.json()
      ;(j[1] || []).forEach((q, i) => {
        const k = q.toLowerCase().trim()
        const e = (out[k] ||= { seeds: [], bestRank: 99 })
        if (e.seeds.length < 3) e.seeds.push(seed)
        e.bestRank = Math.min(e.bestRank, i + 1)
      })
      return
    } catch { await new Promise((r) => setTimeout(r, 800 * (attempt + 1))) }
  }
}

const CONC = 6
let idx = 0
async function worker() {
  while (idx < list.length) {
    const s = list[idx++]
    await one(s)
    if (++done % 100 === 0) console.log(`${done}/${list.length}  unique=${Object.keys(out).length}`)
    await new Promise((r) => setTimeout(r, 120))
  }
}
await Promise.all(Array.from({ length: CONC }, worker))

fs.writeFileSync(new URL("./raw-suggestions.json", import.meta.url), JSON.stringify(out, null, 1))
console.log("done. unique queries:", Object.keys(out).length)
