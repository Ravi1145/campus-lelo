// Points internal links straight at their final target instead of through a redirect.
// Sources: src/data/collegeRedirects.ts (guessed college slugs) and src/data/retiredPages.ts.
// Run: node scripts/fix-redirecting-links.mjs [--write]
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const WRITE = process.argv.includes("--write")

const pairs = []
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8")
for (const m of read("src/data/collegeRedirects.ts").matchAll(/^\s*"([a-z0-9-]+)":\s*"([^"]+)"/gm)) pairs.push([`/colleges/${m[1]}`, m[2]])
for (const m of read("src/data/retiredPages.ts").matchAll(/source:\s*"([^"]+)",\s*destination:\s*"([^"]+)"/g)) pairs.push([m[1], m[2]])
pairs.push(["/colleges/colleges", "/colleges"])
// longest sources first so a short slug never matches inside a longer one
pairs.sort((a, b) => b[0].length - a[0].length)

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const q = path.join(d, e.name)
    if (e.isDirectory()) walk(q, acc)
    else if (/\.(tsx?)$/.test(e.name)) acc.push(q)
  }
  return acc
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
let total = 0
let files = 0
for (const f of walk(path.join(root, "src"))) {
  if (/collegeRedirects\.ts$|retiredPages\.ts$/.test(f)) continue
  const raw = fs.readFileSync(f, "utf8")
  let s = raw
  for (const [from, to] of pairs) {
    // the link must be a whole string: preceded by a quote or backtick, followed by a quote, backtick, ? or #
    const re = new RegExp("([\"'`])" + esc(from) + "(?=[\"'`?#])", "g")
    s = s.replace(re, (m, q) => { total++; return q + to })
  }
  if (s !== raw) { files++; if (WRITE) fs.writeFileSync(f, s) }
}
console.log(WRITE ? "FIXED" : "DRY RUN", "links:", total, "files:", files)
