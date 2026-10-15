import { INTERESTS, type Interest } from "@/data/career/questions"

// The Holland hexagon: six interest types around a ring, neighbours overlap most. With scores it draws your
// own shape (grows once from the centre); with links it works as a map of the six sections on the types page.
// Pure SVG, no script, so it is sharp at any size and works without JavaScript.

const ORDER: Interest[] = ["R", "I", "A", "S", "E", "C"]
const CX = 130
const CY = 130
const RADIUS = 86

function point(i: number, ratio: number): [number, number] {
  const angle = (-90 + i * 60) * (Math.PI / 180)
  return [CX + Math.cos(angle) * RADIUS * ratio, CY + Math.sin(angle) * RADIUS * ratio]
}
const ring = (ratio: number) => ORDER.map((_, i) => point(i, ratio).join(",")).join(" ")

export default function RiasecHex({ scores, linkTypes = false, label }: { scores?: Record<Interest, number>; linkTypes?: boolean; label?: string }) {
  const shape = scores ? ORDER.map((c, i) => point(i, Math.max(0.04, scores[c] / 100)).join(",")).join(" ") : null
  const desc = scores ? `Interest profile: ${ORDER.map((c) => `${INTERESTS.find((x) => x.code === c)!.name} ${scores[c]} out of 100`).join(", ")}.` : "The six career interest types arranged in a hexagon."

  return (
    <svg viewBox="0 -14 260 292" role="img" aria-label={label ?? desc} className="mx-auto h-auto w-full max-w-[22rem]">
      {[0.25, 0.5, 0.75, 1].map((r) => <polygon key={r} points={ring(r)} fill={r === 1 ? "#F1F4F9" : "none"} stroke="#CBD5E1" strokeWidth={r === 1 ? 1.5 : 1} />)}
      {ORDER.map((_, i) => { const [x, y] = point(i, 1); return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="#CBD5E1" strokeWidth="1" /> })}
      {shape && (
        <>
          <polygon className="hex-shape" points={shape} fill="#E0170F" fillOpacity="0.22" stroke="#C90D11" strokeWidth="2.5" strokeLinejoin="round" />
          {ORDER.map((c, i) => { const [x, y] = point(i, Math.max(0.04, scores![c] / 100)); return <circle key={c} className="hex-dot" style={{ "--d": i } as React.CSSProperties} cx={x} cy={y} r="4.5" fill="#C90D11" /> })}
        </>
      )}
      {ORDER.map((c, i) => {
        const info = INTERESTS.find((x) => x.code === c)!
        const [x, y] = point(i, 1.2)
        const node = (
          <g className={linkTypes ? "hex-node" : undefined}>
            <circle cx={x} cy={y} r="17" fill="#012858" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="var(--font-fraunces), Georgia, serif">{c}</text>
          </g>
        )
        const name = <text x={x} y={y + (i === 0 ? -24 : 32)} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#334155">{info.nickname}</text>
        return linkTypes ? (
          <a key={c} href={`#type-${c}`} aria-label={`${info.name}: ${info.nickname}`}>{node}{name}</a>
        ) : (
          <g key={c}>{node}{name}</g>
        )
      })}
    </svg>
  )
}

