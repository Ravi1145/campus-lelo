// Paste into the browser console (or run through the preview's javascript tool) on any page.
// Reports text elements whose contrast ratio is below WCAG AA (4.5:1 normal, 3:1 large text).
(() => {
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r, g, b, a } }
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b) }
  const blend = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 })
  const bgOf = (el) => {
    let layers = []
    for (let n = el; n; n = n.parentElement) {
      const s = getComputedStyle(n)
      if (s.backgroundImage !== "none" && /gradient|url/.test(s.backgroundImage)) return null // can't compute over images/gradients
      const c = parse(s.backgroundColor)
      if (c && c.a > 0) { layers.push(c); if (c.a === 1) break }
    }
    let base = { r: 255, g: 255, b: 255, a: 1 }
    for (const l of layers.reverse()) base = blend(l, base)
    return base
  }
  const out = [], seen = new Set()
  for (const el of document.querySelectorAll("body *")) {
    if (!el.childNodes.length || ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue
    const s = getComputedStyle(el); if (s.visibility === "hidden" || s.display === "none" || +s.opacity === 0) continue
    const fg = parse(s.color), bg = bgOf(el); if (!fg || !bg) continue
    const f = blend(fg, bg), L1 = lum(f), L2 = lum(bg), ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
    const size = parseFloat(s.fontSize), bold = +s.fontWeight >= 700, large = size >= 24 || (size >= 18.66 && bold)
    if (ratio < (large ? 3 : 4.5)) {
      const key = el.tagName + "|" + el.className + "|" + s.color
      if (seen.has(key)) continue
      seen.add(key)
      out.push({ ratio: +ratio.toFixed(2), need: large ? 3 : 4.5, text: el.textContent.trim().slice(0, 40), color: s.color, bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`, cls: String(el.className).slice(0, 90) })
    }
  }
  return out.sort((a, b) => a.ratio - b.ratio)
})()
