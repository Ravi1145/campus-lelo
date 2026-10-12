// Pass 5: remove rank rows and tiles whose value is a bare rank ("#49 (COEP)") and similar, which earlier passes cannot see.
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const q = path.join(d, e.name)
    if (e.isDirectory()) walk(q, acc)
    else if (/\.tsx?$/.test(e.name)) acc.push(q)
  }
  return acc
}
const DROP = [
  /^\s*\{\s*label:\s*"Top NIRF Rank"/,
  /^\s*\{\s*param:\s*"NIRF Rank/,
  /^\s*\{\s*label:\s*"NIRF Rank"/,
  /^\s*\{\s*(?:param|label):\s*"(?:Average Placement|Highest Package|Avg Placement|Highest Avg Package|Best Avg Package|Min Avg Placement)"/,
  /Ranked by NIRF rank, NAAC grade/,
]
let removed = 0
for (const f of [...walk(path.join(root, "src/app")), ...walk(path.join(root, "src/components"))]) {
  if (/[\\/]admin[\\/]|[\\/]api[\\/]/.test(f)) continue
  const raw = fs.readFileSync(f, "utf8")
  const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  const lines = raw.replace(/\r\n/g, "\n").split("\n")
  const kept = lines.filter((l) => !DROP.some((r) => r.test(l)))
  if (kept.length !== lines.length) { removed += lines.length - kept.length; fs.writeFileSync(f, kept.join("\n").replace(/\n/g, nl)) }
}
console.log("removed lines:", removed)
