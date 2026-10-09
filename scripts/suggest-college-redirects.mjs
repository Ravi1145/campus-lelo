// For each dead /colleges/<slug> link found by seo-broken-links, suggest the closest real college.
// Real = every slug in the local sitemap. Output: JSON {dead, to, score, how} for review.
//   node scripts/suggest-college-redirects.mjs <broken-links-report.txt> [base-url]
import fs from "node:fs"
const report = fs.readFileSync(process.argv[2], "utf8")
const BASE = process.argv[3] || "http://localhost:4400"
const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
const real = [...new Set([...xml.matchAll(/<loc>[^<]*\/colleges\/([a-z0-9-]+)<\/loc>/g)].map((m) => m[1]))]
const dead = [...new Set([...report.matchAll(/404 \/colleges\/([a-z0-9-]+)\s/g)].map((m) => m[1]))].filter((s) => !real.includes(s) && s !== "colleges")

const STOP = new Set(["pune", "college", "of", "the", "and", "institute", "university", "for", "in", "school", "centre", "center", "technology", "management", "engineering", "science", "medical", "arts", "commerce"])
const tok = (s) => s.split("-").filter(Boolean)
const keyTok = (s) => tok(s).filter((t) => !STOP.has(t))
// abbreviations that appear as the slug's lead token
const ALIAS = { bmcc: "brihan", sp: "parashurambhau", sibm: "sibm", sit: "symbiosis", vit: "vishwakarma", mitwpu: "mit-wpu" }

function score(a, b) {
  const A = new Set(tok(a)), B = new Set(tok(b))
  const KA = new Set(keyTok(a)), KB = new Set(keyTok(b))
  const inter = [...A].filter((t) => B.has(t)).length
  const keyInter = [...KA].filter((t) => KB.has(t)).length
  const union = new Set([...A, ...B]).size
  return { s: inter / union, k: KA.size ? keyInter / KA.size : 0 }
}
const out = dead.map((d) => {
  let best = { slug: "", s: 0, k: 0 }
  for (const r of real) { const x = score(d, r); if (x.k + x.s > best.k + best.s) best = { slug: r, ...x } }
  const confident = best.k >= 0.66 && best.s >= 0.45
  return { dead: d, to: confident ? `/colleges/${best.slug}` : `/colleges?search=${encodeURIComponent(keyTok(d).join(" ") || tok(d).slice(0, 2).join(" "))}`, how: confident ? "match" : "search", closest: best.slug, k: +best.k.toFixed(2), s: +best.s.toFixed(2) }
})
fs.writeFileSync(new URL("./.college-redirects.json", import.meta.url), JSON.stringify(out, null, 1))
console.log(`${dead.length} dead slugs · ${out.filter((o) => o.how === "match").length} matched · ${out.filter((o) => o.how === "search").length} → search`)
for (const o of out) console.log(`${o.how === "match" ? "MATCH " : "SEARCH"} ${o.dead.padEnd(58)} → ${o.to.replace("/colleges/", "").padEnd(52)} (closest ${o.closest}, ${o.k}/${o.s})`)
