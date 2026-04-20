'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'

// ─── Oil pigment palette ───────────────────────────────────────────────────────
// Dark (Zaun): carmine / prussian blue / violet lamp black
const P_MAGENTA = { r: 45,  g: 12,  b: 40  } // oklch(0.15 0.08 320)
const P_CYAN    = { r: 10,  g: 32,  b: 45  } // oklch(0.12 0.06 195)
const P_PURPLE  = { r: 22,  g: 10,  b: 38  } // oklch(0.10 0.05 285)

// Light (Piltover): watercolor washes on cream paper
const P_MAGENTA_L = { r: 210, g: 175, b: 200 } // pale rose
const P_CYAN_L    = { r: 170, g: 205, b: 220 } // hazy sky
const P_PURPLE_L  = { r: 190, g: 180, b: 222 } // pale lavender

// Map dark → light color per blob
const LIGHT_COLORS = new Map([
  [P_MAGENTA, P_MAGENTA_L],
  [P_CYAN,    P_CYAN_L],
  [P_PURPLE,  P_PURPLE_L],
])

function rgba(c: { r: number; g: number; b: number }, a: number) {
  return `rgba(${c.r},${c.g},${c.b},${a})`
}

// ─── Oil blob data ─────────────────────────────────────────────────────────────
interface OilBlob {
  ox: number; oy: number
  radius: number
  color: typeof P_MAGENTA
  alpha: number
  speedX: number; speedY: number
  phase: number
  wobble: number
}

const OIL_BLOBS: OilBlob[] = [
  { ox: 0.18, oy: 0.30, radius: 650, color: P_MAGENTA, alpha: 0.75, speedX: 0.0025, speedY: 0.0018, phase: 0.0, wobble: 0.35 },
  { ox: 0.75, oy: 0.65, radius: 550, color: P_CYAN,    alpha: 0.65, speedX: 0.0018, speedY: 0.0025, phase: 2.1, wobble: 0.25 },
  { ox: 0.50, oy: 0.18, radius: 480, color: P_PURPLE,  alpha: 0.60, speedX: 0.0020, speedY: 0.0015, phase: 4.2, wobble: 0.30 },
  { ox: 0.12, oy: 0.78, radius: 420, color: P_CYAN,    alpha: 0.55, speedX: 0.0015, speedY: 0.0022, phase: 1.4, wobble: 0.20 },
  { ox: 0.88, oy: 0.42, radius: 500, color: P_MAGENTA, alpha: 0.65, speedX: 0.0022, speedY: 0.0019, phase: 3.0, wobble: 0.28 },
  { ox: 0.45, oy: 0.85, radius: 380, color: P_PURPLE,  alpha: 0.50, speedX: 0.0016, speedY: 0.0020, phase: 5.5, wobble: 0.32 },
]

// Organic blob shape — sinusoidal radius variation per control point
function drawIrregularBlob(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  radius: number, wobble: number, t: number,
) {
  const POINTS = 8
  ctx.beginPath()
  for (let i = 0; i <= POINTS; i++) {
    const angle = (i / POINTS) * Math.PI * 2
    const noise =
      Math.sin(angle * 3 + t * 0.003) * wobble * 0.30 +
      Math.sin(angle * 5 + t * 0.002) * wobble * 0.20 +
      Math.sin(angle * 7 + t * 0.001) * wobble * 0.10
    const r = radius * (1 + noise)
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
}

// ─── Brushstroke data ──────────────────────────────────────────────────────────
interface Brushstroke {
  path: string
  strokeWidth: number
  color: string
  filled: boolean
  animDuration: number
  animDelay: number
}

// Paths in viewBox="0 0 100 100" coordinate space (percent of screen)
const BRUSHSTROKES: Brushstroke[] = [
  {
    path: 'M 85 5 C 88 8, 92 12, 90 18 C 88 24, 84 20, 86 26 C 88 32, 93 28, 91 35',
    strokeWidth: 4, color: 'oklch(0.72 0.28 320 / 0.06)', filled: false,
    animDuration: 12, animDelay: 0,
  },
  {
    path: 'M 3 45 C 5 43, 8 44, 10 42 C 12 40, 11 43, 14 41',
    strokeWidth: 6, color: 'oklch(0.65 0.25 195 / 0.05)', filled: false,
    animDuration: 18, animDelay: 3,
  },
  {
    path: 'M 20 88 C 22 85, 28 86, 30 88 C 32 90, 28 92, 25 91 C 22 90, 21 92, 20 88 Z',
    strokeWidth: 0, color: 'oklch(0.58 0.22 285 / 0.06)', filled: true,
    animDuration: 20, animDelay: 7,
  },
  {
    path: 'M 55 2 C 57 5, 60 4, 62 7 C 64 10, 61 12, 63 15 C 65 18, 68 16, 67 20',
    strokeWidth: 3, color: 'oklch(0.65 0.25 195 / 0.04)', filled: false,
    animDuration: 15, animDelay: 5,
  },
  {
    path: 'M 92 55 C 95 57, 97 60, 96 64 C 95 68, 92 66, 93 70 Z',
    strokeWidth: 0, color: 'oklch(0.72 0.28 320 / 0.05)', filled: true,
    animDuration: 22, animDelay: 10,
  },
]

// ─── Sketch line data ──────────────────────────────────────────────────────────
interface SketchLine { points: [number, number][]; opacity: number; color: string }

// Slightly irregular lines — pencil underdrawing beneath paint layers
const SKETCH_LINES: SketchLine[] = [
  { points: [[2, 30], [15, 29.5], [28, 30.2], [40, 29.8], [55, 30.1]], opacity: 0.04, color: 'oklch(0.92 0.02 80)' },
  { points: [[8, 10], [7.8, 25], [8.1, 40], [7.9, 55], [8.2, 70]],    opacity: 0.03, color: 'oklch(0.92 0.02 80)' },
  { points: [[60, 5], [65, 20], [70, 35], [75, 50]],                   opacity: 0.035, color: 'oklch(0.92 0.02 80)' },
  { points: [[90, 60], [91.5, 72], [90.8, 84], [92, 95]],              opacity: 0.025, color: 'oklch(0.92 0.02 80)' },
  { points: [[30, 95], [42, 94.5], [55, 95.2], [68, 94.8]],            opacity: 0.03,  color: 'oklch(0.92 0.02 80)' },
]

// ─── Canvas init ───────────────────────────────────────────────────────────────
function initCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  // DPR max 1 — diffuse 120px blurs don't benefit from high resolution
  canvas.width        = window.innerWidth
  canvas.height       = window.innerHeight
  canvas.style.width  = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}

// ─── Oil canvas hook ───────────────────────────────────────────────────────────
function useOilCanvas(ref: React.RefObject<HTMLCanvasElement>, reduced: boolean, isDark: boolean) {
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    initCanvas(canvas, ctx)
    const onResize = () => initCanvas(canvas, ctx)
    window.addEventListener('resize', onResize)

    // In light mode, blobs are pale watercolor washes at low opacity
    const blobColor  = (b: OilBlob) => isDark ? b.color : (LIGHT_COLORS.get(b.color) ?? b.color)
    const blobAlpha  = (b: OilBlob) => isDark ? b.alpha : b.alpha * 0.30

    if (reduced) {
      ctx.filter = 'blur(120px)'
      OIL_BLOBS.forEach(b => {
        const x = b.ox * window.innerWidth
        const y = b.oy * window.innerHeight
        const c = blobColor(b)
        const a = blobAlpha(b)
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.radius)
        g.addColorStop(0,   rgba(c, a))
        g.addColorStop(0.5, rgba(c, a * 0.4))
        g.addColorStop(1,   rgba(c, 0))
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(x, y, b.radius, 0, Math.PI * 2); ctx.fill()
      })
      ctx.filter = 'none'
      return () => window.removeEventListener('resize', onResize)
    }

    let t = 0, raf: number

    const draw = () => {
      const W = window.innerWidth
      const H = window.innerHeight
      ctx.clearRect(0, 0, W, H)
      ctx.filter = 'blur(120px)'

      OIL_BLOBS.forEach(b => {
        const bx = b.ox * W + Math.sin(t * b.speedX + b.phase) * W * 0.15
        const by = b.oy * H + Math.cos(t * b.speedY + b.phase) * H * 0.10
        const c  = blobColor(b)
        const a  = blobAlpha(b)

        const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.radius)
        g.addColorStop(0,   rgba(c, a))
        g.addColorStop(0.4, rgba(c, a * 0.4))
        g.addColorStop(1,   rgba(c, 0))
        ctx.fillStyle = g
        drawIrregularBlob(ctx, bx, by, b.radius, b.wobble, t)
        ctx.fill()
      })

      ctx.filter = 'none'
      t++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [ref, reduced, isDark])
}

// ─── Parallax float wrapper ─────────────────────────────────────────────────────
function ParallaxFloat({
  parallax, floatDuration, floatDelay, smoothX, smoothY, children,
}: {
  parallax: number
  floatDuration: number
  floatDelay: number
  smoothX: MotionValue<number>
  smoothY: MotionValue<number>
  children: React.ReactNode
}) {
  const tx = useTransform(smoothX, (x) => (x - (typeof window !== 'undefined' ? window.innerWidth  : 0) / 2) * parallax)
  const ty = useTransform(smoothY, (y) => (y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * parallax)

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ x: tx, y: ty }}>
      <div style={{ animation: `float-slow ${floatDuration}s ease-in-out ${floatDelay}s infinite`, width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────────
export function AnimatedBackground() {
  const oilRef = useRef<HTMLCanvasElement>(null)
  const [reduced, setReduced] = useState(false)
  const [isDark, setIsDark]   = useState(true)

  // Viscous spring — suspended in thick paint
  const mouseX = useMotionValue(500)
  const mouseY = useMotionValue(400)
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 40 })
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 40 })

  useEffect(() => {
    mouseX.set(window.innerWidth  / 2)
    mouseY.set(window.innerHeight / 2)

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)

    const onMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  // Track dark/light mode changes
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  useOilCanvas(oilRef, reduced, isDark)

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

      {/* Layer 1 — Oil paint blobs */}
      <canvas
        ref={oilRef}
        className="absolute inset-0"
        style={{ zIndex: 1, width: '100%', height: '100%' }}
      />

      {/* Layer 2 — Brushstroke SVG marks */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0 }}
        >
          {BRUSHSTROKES.map((stroke, i) => (
            <motion.path
              key={i}
              d={stroke.path}
              fill={stroke.filled ? stroke.color : 'none'}
              stroke={stroke.filled ? 'none' : stroke.color}
              strokeWidth={stroke.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#brushstroke-filter)"
              vectorEffect="non-scaling-stroke"
              animate={{ opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: stroke.animDuration, delay: stroke.animDelay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      </div>

      {/* Layer 3 — Sketch lines (pencil underdrawing) */}
      {!reduced && (
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          <svg
            width="100%" height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0 }}
          >
            {SKETCH_LINES.map((line, i) => (
              <polyline
                key={i}
                points={line.points.map(([x, y]) => `${x},${y}`).join(' ')}
                fill="none"
                stroke={line.color}
                strokeWidth="0.15"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={line.opacity}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
      )}

      {/* Layer 4 — Parallax paint accents */}
      {!reduced && (
        <div className="absolute inset-0" style={{ zIndex: 4 }}>
          <ParallaxFloat parallax={0.02} floatDuration={14} floatDelay={0} smoothX={smoothX} smoothY={smoothY}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
              <path
                d="M 80 8 C 83 6, 87 9, 85 13 C 83 17, 79 14, 81 18"
                fill="none" stroke="oklch(0.72 0.28 320)" strokeWidth="2"
                strokeLinecap="round" opacity="0.05" vectorEffect="non-scaling-stroke"
              />
            </svg>
          </ParallaxFloat>
          <ParallaxFloat parallax={0.03} floatDuration={18} floatDelay={4} smoothX={smoothX} smoothY={smoothY}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
              <path
                d="M 10 78 C 12 75, 16 77, 15 81 C 14 84, 10 82, 12 86 Z"
                fill="oklch(0.65 0.25 195)" stroke="none"
                opacity="0.04" vectorEffect="non-scaling-stroke"
              />
            </svg>
          </ParallaxFloat>
          <ParallaxFloat parallax={0.015} floatDuration={22} floatDelay={8} smoothX={smoothX} smoothY={smoothY}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="none">
              <path
                d="M 48 95 C 50 92, 53 93, 55 95 C 57 97, 53 99, 50 98 C 47 97, 48 99, 48 95 Z"
                fill="oklch(0.72 0.28 320)" stroke="none"
                opacity="0.05" vectorEffect="non-scaling-stroke"
              />
            </svg>
          </ParallaxFloat>
        </div>
      )}

      {/* Layer 5 — Film grain (local, over background only) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.03,
          mixBlendMode: 'overlay',
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain-bg-local" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75 0.75" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-bg-local)" />
        </svg>
      </div>

    </div>
  )
}
