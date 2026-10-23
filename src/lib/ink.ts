// AI-Generated-File (Created using Claude)

/**
 * ink.ts: deterministic hand-drawn strokes.
 *
 * Every function is pure and returns SVG path data (`d` strings).
 * Same seed in, same mark out, so marks never change between renders or SSR/CSR.
 * Seed by content so each mark is stable and unique.
 */

type Seed = string | number
type Point = readonly [number, number]

interface LineOptions {
  seed?: Seed
  /** 0..2, how much the stroke wanders. Default 1. */
  wobble?: number
  /** px the stroke runs past each end. Default 0. */
  overshoot?: number
  /** sideways bow as a fraction of length. Default 0.012. Use ~0.0015 for long rules. */
  bow?: number
}

/* ---------------------------------------------------------------- seeding */

function hash(seed: Seed | undefined): number {
  if (typeof seed === "number") return (seed * 2654435761) >>> 0 || 1
  let h = 2166136261
  const s = String(seed ?? "ink")
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0 || 1
}

/** mulberry32: small, fast, deterministic PRNG returning [0, 1). */
function rng(seed: Seed | undefined): () => number {
  let a = hash(seed)
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const f = (n: number) => Math.round(n * 10) / 10

/** Catmull-Rom through points → cubic Béziers: smooth vector-pen curves. */
function smooth(p: readonly Point[]): string {
  if (p.length < 2) return ""
  let d = `M${f(p[0][0])} ${f(p[0][1])}`
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i],
      p1 = p[i],
      p2 = p[i + 1],
      p3 = p[i + 2] ?? p2
    d +=
      `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ` +
      `${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`
  }
  return d
}

/** One wobbly line from (x1,y1) to (x2,y2). */
function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  o: LineOptions = {}
): string {
  const r = rng(o.seed)
  const dx = x2 - x1,
    dy = y2 - y1,
    len = Math.hypot(dx, dy) || 1
  const ux = dx / len,
    uy = dy / len,
    nx = -uy,
    ny = ux
  const ov = o.overshoot ?? 0,
    w = o.wobble ?? 1
  const s0 = -ov * (0.35 + 0.65 * r()),
    s1 = len + ov * (0.35 + 0.65 * r())
  const k = Math.max(3, Math.min(14, Math.round(len / 36)))
  const amp = w * Math.min(2.4, 0.5 + len * 0.007)
  const ph1 = r() * 6.283,
    ph2 = r() * 6.283,
    f1 = 1 + r() * 1.2,
    f2 = 2.2 + r() * 1.6
  const bow = (o.bow ?? 0.012) * len * (r() < 0.5 ? -1 : 1)
  const pts: Point[] = []
  for (let i = 0; i <= k; i++) {
    const t = i / k,
      s = s0 + (s1 - s0) * t
    const off =
      amp *
        (0.62 * Math.sin(t * Math.PI * f1 + ph1) +
          0.38 * Math.sin(t * Math.PI * f2 + ph2)) +
      bow * Math.sin(t * Math.PI)
    pts.push([x1 + ux * s + nx * off, y1 + uy * s + ny * off])
  }
  return smooth(pts)
}

/** Underline for a word `w` px wide, in a 0..height box (default 12). Slightly rising, overshoots both ends. */
export function underline(
  w: number,
  o: { seed?: Seed; height?: number } = {}
): string {
  const r = rng(o.seed),
    h = o.height ?? 12
  const ov = Math.max(4, w * 0.05)
  const y1 = h * (0.5 + r() * 0.25),
    y2 = h * (0.25 + r() * 0.2)
  return line(-ov * 0.3, y1, w + ov * 0.3, y2, {
    seed: o.seed,
    overshoot: ov,
    wobble: 1.1,
    bow: 0.03 + r() * 0.03,
  })
}
