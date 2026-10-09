// Extra harvest for North India focus cities (UP, Uttarakhand, rest of NCR). Merges into raw-suggestions.json.
// Run:  node docs/keywords/harvest-north.mjs   then   node docs/keywords/cluster.mjs && node docs/keywords/report.mjs
import fs from "node:fs"

const CITIES = ["ghaziabad", "lucknow", "uttar pradesh", "dehradun", "uttarakhand", "faridabad", "meerut", "kanpur", "haridwar", "roorkee", "up", "agra", "varanasi", "prayagraj", "gurugram"]
const EXAMS = ["cat", "xat", "cmat", "mat", "gmat", "cuet pg", "upsee", "aktu"]
const TOPICS = [
  "fees", "cutoff", "placements", "ranking", "admission", "eligibility", "without cat", "direct admission", "scholarship",
  "hostel", "low fees", "government", "private", "best", "top", "list", "average package", "percentile", "distance", "online", "executive", "part time",
]
const COLLEGES = ["amity noida", "jbs noida", "sharda university", "galgotias", "gl bajaj", "jims", "lbsim", "fore school", "bml munjal", "upes dehradun", "graphic era", "doon university", "ims unison", "iim lucknow", "iim kashipur", "aktu", "lucknow university", "bbau lucknow", "iiml noida", "mdi gurgaon", "imt ghaziabad", "jaipuria lucknow", "amity lucknow"]

const seeds = new Set()
for (const c of CITIES) {
  seeds.add(`mba colleges in ${c}`); seeds.add(`pgdm colleges in ${c}`); seeds.add(`best mba colleges in ${c}`); seeds.add(`top mba colleges in ${c}`)
  for (const t of TOPICS) seeds.add(`mba in ${c} ${t}`)
  for (const t of TOPICS.slice(0, 10)) seeds.add(`mba colleges in ${c} ${t}`)
  for (const e of EXAMS) seeds.add(`mba colleges in ${c} accepting ${e}`)
}
for (const t of ["cutoff", "fees", "admission", "eligibility", "colleges", "counselling", "registration"]) { seeds.add(`upsee mba ${t}`); seeds.add(`aktu mba ${t}`); seeds.add(`up mba admission ${t}`) }
for (const c of COLLEGES) for (const t of ["fees", "cutoff", "placements", "admission", "ranking", "eligibility", "reviews", "average package"]) seeds.add(`${c} mba ${t}`)
for (const h of ["mba colleges in noida", "mba colleges in greater noida", "mba colleges in delhi", "mba colleges in uttar pradesh", "mba colleges in dehradun", "mba colleges in lucknow", "mba cutoff noida", "mba cutoff delhi", "mba cutoff dehradun", "mba cutoff up"]) for (const ch of "abcdefghijklmnopqrstuvwxyz") seeds.add(`${h} ${ch}`)

const list = [...seeds]
console.log("seeds:", list.length)
const rawPath = new URL("./raw-suggestions.json", import.meta.url)
const out = JSON.parse(fs.readFileSync(rawPath, "utf8"))
const before = Object.keys(out).length
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
        if (e.seeds.length < 3 && !e.seeds.includes(seed)) e.seeds.push(seed)
        e.bestRank = Math.min(e.bestRank, i + 1)
      })
      return
    } catch { await new Promise((r) => setTimeout(r, 800 * (attempt + 1))) }
  }
}
let idx = 0
async function worker() {
  while (idx < list.length) {
    const s = list[idx++]
    await one(s)
    if (++done % 100 === 0) console.log(`${done}/${list.length}  unique=${Object.keys(out).length}`)
    await new Promise((r) => setTimeout(r, 120))
  }
}
await Promise.all(Array.from({ length: 6 }, worker))
fs.writeFileSync(rawPath, JSON.stringify(out, null, 1))
console.log(`done. unique queries: ${before} -> ${Object.keys(out).length}`)
