// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver) about every URL in the live sitemap.
// Google does not use IndexNow: for Google, submit the sitemap and use URL Inspection in Search Console.
//
//   node scripts/indexnow-submit.mjs [host]      default host: campuslelo.com
//
// Requires the key file to be live first: https://<host>/<key>.txt must return the key.
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const HOST = process.argv[2] || "campuslelo.com"
const route = fs.readFileSync(path.join(root, "src/app/api/indexnow/route.ts"), "utf8")
const KEY = (route.match(/INDEXNOW_KEY\s*=\s*process\.env\.INDEXNOW_KEY\s*\|\|\s*"([a-f0-9]+)"/) || [])[1]
if (!KEY) throw new Error("IndexNow key not found in src/app/api/indexnow/route.ts")

const keyUrl = `https://${HOST}/${KEY}.txt`
const k = await fetch(keyUrl, { redirect: "follow" })
const kt = (await k.text()).trim()
if (!k.ok || kt !== KEY) {
  console.error(`Key file not live yet: ${keyUrl} -> ${k.status}. Deploy first, then run again.`)
  process.exit(1)
}

const xml = await (await fetch(`https://${HOST}/sitemap.xml`, { redirect: "follow" })).text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
console.log(`submitting ${urls.length} URLs for ${HOST}`)

const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList: urls }),
})
console.log("IndexNow response:", r.status, r.status === 200 || r.status === 202 ? "(accepted)" : await r.text())
