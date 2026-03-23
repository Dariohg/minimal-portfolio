'use client'

import { createContext, useContext, useCallback, useRef, useState, useEffect } from 'react'
import { motion, animate } from 'framer-motion'

const DARK_BG  = 'oklch(0.12 0.01 285)'
const LIGHT_BG = 'oklch(0.99 0.01 85)'

// ─── Blob path (Catmull-Rom → Cubic Bezier) ───────────────────────────────────
// Misma estructura de comandos en los 3 keyframes → Framer Motion puede interpolar `d`.

const N = 10
const K = 0.38

const OFF_SMALL = [ 0.08,-0.05, 0.11,-0.07, 0.06,-0.09, 0.10,-0.04, 0.12,-0.06]
const OFF_SPLAT = [ 0.62,-0.28, 0.78,-0.42, 0.68,-0.50, 0.42,-0.55, 0.72,-0.32]
const OFF_FULL  = [ 0.16,-0.11, 0.21,-0.09, 0.19,-0.13, 0.15,-0.08, 0.23,-0.10]

function f(n: number) { return n.toFixed(2) }

function blobPath(cx: number, cy: number, r: number, offsets: number[]): string {
  const pts: [number, number][] = offsets.map((off, i) => {
    const a = (2 * Math.PI * i) / N - Math.PI / 2
    return [cx + r * (1 + off) * Math.cos(a), cy + r * (1 + off) * Math.sin(a)]
  })
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N], p1 = pts[i]
    const p2 = pts[(i + 1) % N],     p3 = pts[(i + 2) % N]
    const cp1x = p1[0] + K * (p2[0] - p0[0]), cp1y = p1[1] + K * (p2[1] - p0[1])
    const cp2x = p2[0] - K * (p3[0] - p1[0]), cp2y = p2[1] - K * (p3[1] - p1[1])
    d += ` C ${f(cp1x)} ${f(cp1y)},${f(cp2x)} ${f(cp2y)},${f(p2[0])} ${f(p2[1])}`
  }
  return d + ' Z'
}

// Ruta compuesta: rect-pantalla-completa + blob.
// Con clip-rule="evenodd": el área DENTRO del blob queda fuera del clip (hueco),
// el área FUERA del blob queda dentro del clip (visible).
// Aplicado al overlay del tema origen: el overlay desaparece donde crece el blob,
// revelando el nuevo tema debajo.
function invertedBlobPath(cx: number, cy: number, r: number, offsets: number[]): string {
  return `M -9999 -9999 H 29999 V 29999 H -9999 Z ${blobPath(cx, cy, r, offsets)}`
}

// ─── Satélites ────────────────────────────────────────────────────────────────
const SATELLITES = [
  { id: 'sat0', angleDeg:  22, distFactor: 0.32, peakR: 11, delay: 0.07 },
  { id: 'sat1', angleDeg:  88, distFactor: 0.25, peakR:  7, delay: 0.12 },
  { id: 'sat2', angleDeg: 152, distFactor: 0.34, peakR: 14, delay: 0.09 },
  { id: 'sat3', angleDeg: 228, distFactor: 0.22, peakR:  9, delay: 0.10 },
  { id: 'sat4', angleDeg: 300, distFactor: 0.29, peakR: 16, delay: 0.06 },
]

// ─── Context ──────────────────────────────────────────────────────────────────
type AnimData    = { targetIsDark: boolean; onMidpoint: () => void; cx: number; cy: number }
type ContextType = { triggerTransition: (targetIsDark: boolean, onMidpoint: () => void) => void }

const ThemeTransitionContext = createContext<ContextType>({ triggerTransition: (_, cb) => cb() })

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ThemeTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const pendingRef                 = useRef<AnimData | null>(null)
  const isRunningRef               = useRef(false)

  const triggerTransition = useCallback((targetIsDark: boolean, onMidpoint: () => void) => {
    // StrictMode monta/desmonta el Provider dos veces en dev;
    // si isRunning quedó colgado pero ya no hay animación visible, resetear.
    if (isRunningRef.current && !isVisible) isRunningRef.current = false
    if (isRunningRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onMidpoint(); return }

    const btn  = document.querySelector<HTMLElement>('button.sketch-circle')
    const rect = btn?.getBoundingClientRect()
    const cx   = rect ? rect.left + rect.width  / 2 : window.innerWidth  / 2
    const cy   = rect ? rect.top  + rect.height / 2 : window.innerHeight / 2

    if (!document.getElementById('no-transitions')) {
      const s = document.createElement('style')
      s.id = 'no-transitions'
      s.textContent = '* { transition: none !important; }'
      document.head.appendChild(s)
    }

    isRunningRef.current = true
    pendingRef.current   = { targetIsDark, onMidpoint, cx, cy }
    setIsVisible(true)
  }, [])

  return (
    <ThemeTransitionContext.Provider value={{ triggerTransition }}>
      {children}
      {isVisible && pendingRef.current && (
        <InkSplatter
          key={Date.now()}
          data={pendingRef.current}
          onDone={() => {
            pendingRef.current   = null
            isRunningRef.current = false
            setIsVisible(false)
          }}
        />
      )}
    </ThemeTransitionContext.Provider>
  )
}

// ─── InkSplatter ──────────────────────────────────────────────────────────────
//
// Arquitectura de capas (fase única):
//
//  z-0  │ Página real → el tema cambia al inicio (onMidpoint antes de expandir)
//  ─────┤
//  SVG  │ Overlay del tema anterior cubre todo el viewport.
//       │   clip-rule=evenodd crea un "hueco" donde está el blob.
//       │   Blob crece hasta cubrir el 100% → overlay desaparece por completo.
//       │   SVG se desmonta instantáneamente → nuevo tema visible sin contracción.

function InkSplatter({ data, onDone }: { data: AnimData; onDone: () => void }) {
  const { targetIsDark, onMidpoint, cx, cy } = data
  // Protege onMidpoint contra la doble ejecución de useEffect en StrictMode
  const midpointFiredRef = useRef(false)
  // Ref al <path> DOM nativo — evita conflictos de Framer Motion dentro de <defs>
  const expandPathRef = useRef<SVGPathElement>(null)

  // oldBg = fondo del tema ACTUAL (antes del toggle)
  const oldBg = targetIsDark ? LIGHT_BG : DARK_BG
  const newBg = targetIsDark ? DARK_BG  : LIGHT_BG

  const maxR = Math.sqrt(
    Math.max(cx, window.innerWidth  - cx) ** 2 +
    Math.max(cy, window.innerHeight - cy) ** 2
  ) * 1.3

  useEffect(() => {
    const smallInv = invertedBlobPath(cx, cy, 2,           OFF_SMALL)
    const splatInv = invertedBlobPath(cx, cy, maxR * 0.38, OFF_SPLAT)
    const fullInv  = invertedBlobPath(cx, cy, maxR,        OFF_FULL)

    async function run() {
      // Guarda StrictMode: si el effect se re-ejecuta (mount→unmount→remount),
      // midpointFiredRef ya es true y no llama onMidpoint una segunda vez.
      if (!midpointFiredRef.current) {
        midpointFiredRef.current = true
        onMidpoint()
      }

      // Fase única — blob crece hasta cubrir todo el viewport (700ms)
      if (expandPathRef.current) {
        await animate(expandPathRef.current, { d: [smallInv, splatInv, fullInv] } as never, {
          duration: 0.7,
          ease: [0.2, 0, 0.8, 1],
        })
      }

      // Hold breve — el cerebro registra el nuevo tema (80ms)
      await new Promise<void>((res) => setTimeout(res, 80))

      // Desaparece instantáneamente — sin contracción
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            document.getElementById('no-transitions')?.remove()
            onDone()
          }, 32)
        })
      })
    }

    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <defs>
        {/* clip-rule="evenodd" crea el hueco: el rect cubre todo menos el blob. */}
        <clipPath id="ink-inverted" clipPathUnits="userSpaceOnUse">
          <path
            ref={expandPathRef}
            d={invertedBlobPath(cx, cy, 2, OFF_SMALL)}
            clipRule="evenodd"
          />
        </clipPath>
      </defs>

      {/* Overlay del tema anterior con hueco que crece */}
      <rect width="100%" height="100%" fill={oldBg} clipPath="url(#ink-inverted)" />

      {/* Gotas satélite — color del tema destino */}
      {SATELLITES.map(({ id, angleDeg, distFactor, peakR, delay }) => {
        const a    = (angleDeg * Math.PI) / 180
        const dist = maxR * 0.38 * distFactor
        return (
          <motion.circle
            key={id}
            cx={cx + dist * Math.cos(a)}
            cy={cy + dist * Math.sin(a)}
            fill={newBg}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: [0, peakR, peakR * 0.5, 0], opacity: [0, 1, 0.6, 0] }}
            transition={{ duration: 0.55, delay, ease: 'easeOut' }}
          />
        )
      })}
    </svg>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useThemeTransition() {
  return useContext(ThemeTransitionContext)
}
