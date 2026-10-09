// Finds internal links that 404 or redirect, across every page in the sitemap.
//   node scripts/seo-broken-links.mjs [base-url]       (default http://localhost:4400)
const BASE = (process.argv[2] || "http://localhost:4400").replace(/\/$/, "")
const CANON = "https://campuslelo.com"
const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
const pages = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname))]

const from = new Map() // href -> first 3 pages linking to it
let i = 0
await Promise.all(Array.from({ length: 10 }, async () => {
  while (i < pages.length) {
    const p = pages[i++]
    try {
      const html = await (await fetch(BASE + p)).text()
      for (const m of html.matchAll(/<a[^>]+href="([^"#]+)/g)) {
        let h = m[1].replace(CANON, "")
        if (!h.startsWith("/") || h.startsWith("//") || /\.(png|jpg|webp|svg|pdf|csv|xml|txt)$/.test(h)) continue
        if (!from.has(h)) from.set(h, [])
        if (from.get(h).length < 3) from.get(h).push(p)
      }
    } catch {}
  }
}))

const hrefs = [...from.keys()]
const bad = []
let j = 0
await Promise.all(Array.from({ length: 10 }, async () => {
  while (j < hrefs.length) {
    const h = hrefs[j++]
    try {
      const r = await fetch(BASE + h, { method: "GET", redirect: "manual" })
      if (r.status >= 400) bad.push({ h, status: r.status, from: from.get(h) })
      else if (r.status >= 300) bad.push({ h, status: r.status, to: r.headers.get("location"), from: from.get(h) })
    } catch { bad.push({ h, status: 0, from: from.get(h) }) }
  }
}))
const errs = bad.filter((b) => b.status >= 400 || b.status === 0)
const redirs = bad.filter((b) => b.status >= 300 && b.status < 400)
console.log(`pages ${pages.length}, unique internal links ${hrefs.length}`)
console.log(`\nBROKEN (4xx/5xx): ${errs.length}`)
errs.sort((a, b) => a.h.localeCompare(b.h)).forEach((b) => console.log(`  ${b.status} ${b.h}  ← ${b.from.join(", ")}`))
console.log(`\nREDIRECTING links (should point straight at the target): ${redirs.length}`)
redirs.sort((a, b) => a.h.localeCompare(b.h)).slice(0, 40).forEach((b) => console.log(`  ${b.h} → ${b.to}  ← ${b.from[0]}`))
process.exit(errs.length ? 1 : 0)
