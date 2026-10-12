// Repairs UTF-8 text that was saved after being decoded as Windows-1252 ("â‚¹" -> "₹", "â€”" -> "—", ...).
// Run: node scripts/fix-mojibake.mjs [--write]
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const WRITE = process.argv.includes("--write")

// Windows-1252 byte for each of the 0x80-0x9F code points that differ from Latin-1
const CP1252 = { "€": 0x80, "‚": 0x82, "ƒ": 0x83, "„": 0x84, "…": 0x85, "†": 0x86, "‡": 0x87, "ˆ": 0x88, "‰": 0x89, "Š": 0x8a, "‹": 0x8b, "Œ": 0x8c, "Ž": 0x8e, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95, "–": 0x96, "—": 0x97, "˜": 0x98, "™": 0x99, "š": 0x9a, "›": 0x9b, "œ": 0x9c, "ž": 0x9e, "Ÿ": 0x9f }

function toBytes(str) {
  const out = []
  for (const ch of str) {
    const cp = ch.codePointAt(0)
    if (cp < 0x100) out.push(cp)
    else if (CP1252[ch] !== undefined) out.push(CP1252[ch])
    else return null
  }
  return Buffer.from(out)
}

// A mojibake run starts with Ã, Â, â, Ð or Å followed by continuation-looking characters
const RUN = /[ÃÂâÐÅ][\u0080-¿ŒœŠšŸŽžƒˆ˜–—‘-„†-•…‰‹›€™]+/g

function fix(text) {
  return text.replace(RUN, (run) => {
    // try the whole run first, then shorter prefixes
    for (let end = run.length; end >= 2; end--) {
      const bytes = toBytes(run.slice(0, end))
      if (!bytes) continue
      const decoded = new TextDecoder("utf-8", { fatal: true })
      try {
        const s = decoded.decode(bytes)
        if (!s.includes("�")) return s + run.slice(end)
      } catch { /* try shorter */ }
    }
    return run
  })
}

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const q = path.join(d, e.name)
    if (e.isDirectory()) walk(q, acc)
    else if (/\.(tsx?|mjs|css)$/.test(e.name)) acc.push(q)
  }
  return acc
}

let files = 0
let runs = 0
for (const f of walk(path.join(root, "src"))) {
  const raw = fs.readFileSync(f, "utf8")
  const fixed = fix(raw)
  if (fixed !== raw) {
    files++
    runs += (raw.match(RUN) || []).length
    if (WRITE) fs.writeFileSync(f, fixed)
    else console.log("would fix", path.relative(root, f))
  }
}
console.log(WRITE ? "FIXED" : "DRY RUN", "files:", files, "runs:", runs)
