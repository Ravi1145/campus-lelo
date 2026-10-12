// Pass 3: delete standalone array/object elements that still carry a package or NIRF figure.
import fs from "node:fs"
import path from "node:path"
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const lines = fs.readFileSync(path.join(root, "docs/figure-leftovers.txt"), "utf8").split("\n").filter(Boolean)
const byFile = {}
for (const l of lines) {
  const m = l.match(/^(.+?):(\d+): /)
  if (!m) continue
  if (/src[\/]data[\/]|placements[\/]page|placement|highest-package|scholarships|AlumniQA|ScholarshipFinder/.test(m[1])) continue
  ;(byFile[m[1]] ??= []).push(+m[2])
}
let removed = 0
for (const [f, nums] of Object.entries(byFile)) {
  const p = path.join(root, f)
  const raw = fs.readFileSync(p, "utf8"); const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  const arr = raw.replace(/\r\n/g, "\n").split("\n")
  const drop = new Set()
  for (const n of nums) {
    const t = arr[n - 1].trim()
    const standalone = /^\{[^\n]*\},?$/.test(t) || /^"[^"\n]*",?$/.test(t) || /^\{ ?(param|label|icon)[^\n]*\},?$/.test(t)
    // keep object-literal lines that define pages (title/description) or JSX; only drop real list elements
    if (standalone && !/^\{\s*(name|title)\s*:/.test(t)) drop.add(n - 1)
  }
  if (drop.size) { fs.writeFileSync(p, arr.filter((_, i) => !drop.has(i)).join("\n").replace(/\n/g, nl)); removed += drop.size }
}
console.log("removed standalone elements:", removed)
