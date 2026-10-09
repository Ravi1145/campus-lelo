// Internal-link graph: fetches every sitemap URL, records which internal pages each one links to,
// then reports pages with no or very few inbound links (orphans) and the weakest hubs.
//
//   node scripts/seo-link-graph.mjs [base-url]      (default https://www.campuslelo.com)
import fs from "node:fs"

const BASE = (process.argv[2] || "https://www.campuslelo.com").replace(/\/$/, "")
const CANON = "https://campuslelo.com"
const norm = (p) => (p.split(/[?#]/)[0].replace(/\/$/, "") || "/")

const xml = await (await fetch(`${BASE}/sitemap.xml`, { redirect: "follow" })).text()
const pages = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(new URL(m[1]).pathname)))]
const set = new Set(pages)
console.log(`sitemap pages: ${pages.length}`)

const inbound = new Map(pages.map((p) => [p, new Set()]))
const outCount = new Map()
let i = 0, failed = 0
async function one(p) {
  try {
    const r = await fetch(BASE + p, { redirect: "follow", signal: AbortSignal.timeout(30000) })
    const html = await r.text()
    // main content links only: strip header / footer / nav so site-wide menus don't hide orphans
    const body = html.replace(/<header[\s\S]*?<\/header>/gi, "").replace(/<footer[\s\S]*?<\/footer>/gi, "").replace(/<nav[\s\S]*?<\/nav>/gi, "")
    const hrefs = new Set([...body.matchAll(/<a[^>]+href="([^"#]+)[^"]*"/g)].map((m) => m[1]).filter((h) => h.startsWith("/") || h.startsWith(CANON) || h.startsWith(BASE)).map((h) => norm(h.replace(CANON, "").replace(BASE, "") || "/")))
    let n = 0
    for (const h of hrefs) if (h !== p && inbound.has(h)) { inbound.get(h).add(p); n++ }
    outCount.set(p, n)
  } catch { failed++ }
}
await Promise.all(Array.from({ length: 10 }, async () => { while (i < pages.length) await one(pages[i++]) }))

const rows = pages.map((p) => ({ p, in: inbound.get(p).size, out: outCount.get(p) ?? 0 }))
const zero = rows.filter((r) => r.in === 0), few = rows.filter((r) => r.in > 0 && r.in <= 2), noOut = rows.filter((r) => r.out === 0)
console.log(`crawled ${pages.length - failed}/${pages.length}`)
console.log(`\nORPHANS (0 in-content links from other sitemap pages): ${zero.length}`)
zero.slice(0, 60).forEach((r) => console.log("  ", r.p, `(links out: ${r.out})`))
console.log(`\nWEAK (1–2 inbound): ${few.length}`)
few.slice(0, 25).forEach((r) => console.log("  ", r.p, `(in: ${r.in})`))
console.log(`\nDEAD ENDS (no in-content links to other sitemap pages): ${noOut.length}`)
noOut.slice(0, 20).forEach((r) => console.log("  ", r.p))
const avg = rows.reduce((s, r) => s + r.in, 0) / rows.length
console.log(`\naverage inbound links per page: ${avg.toFixed(1)}`)
fs.writeFileSync(new URL("./.link-graph.json", import.meta.url), JSON.stringify({ zero: zero.map((r) => r.p), few: few.map((r) => r.p), noOut: noOut.map((r) => r.p) }, null, 1))
