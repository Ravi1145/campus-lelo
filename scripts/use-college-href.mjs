// Replaces `/colleges/${c.slug}` style links with collegeHref(c.slug) so links skip redirects.
//   node scripts/use-college-href.mjs [--write]
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const WRITE = process.argv.includes("--write")
const SKIP = [/[\\/]admin[\\/]/, /[\\/]api[\\/]/, /collegeHref\.ts$/, /collegeRedirects\.ts$/, /next\.config/]
const RE = /`\/colleges\/\$\{(c|college|col)\.slug\}`/g

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const q = path.join(d, e.name)
    if (e.isDirectory()) walk(q, acc)
    else if (/\.tsx?$/.test(e.name) && !SKIP.some((r) => r.test(q))) acc.push(q)
  }
  return acc
}

let files = 0, links = 0
for (const f of walk(path.join(root, "src"))) {
  const raw = fs.readFileSync(f, "utf8")
  if (!RE.test(raw)) continue
  RE.lastIndex = 0
  const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  let s = raw.replace(/\r\n/g, "\n")
  s = s.replace(RE, (m, v) => { links++; return `collegeHref(${v}.slug)` })
  if (!s.includes('from "@/lib/collegeHref"')) {
    // after the "use client" directive if there is one, otherwise before the first import
    const imp = 'import { collegeHref } from "@/lib/collegeHref"\n'
    const m = s.match(/^import /m)
    s = m ? s.slice(0, m.index) + imp + s.slice(m.index) : imp + s
  }
  files++
  if (WRITE) fs.writeFileSync(f, s.replace(/\n/g, nl))
}
console.log(WRITE ? "WROTE" : "DRY RUN", "files:", files, "links:", links)
