'use client'

import Image from "next/image"
import { useEffect, useRef, useCallback } from "react"
import { useReducedMotion } from "framer-motion"

// ─── Constantes ────────────────────────────────────────────────────────────────
const PARTICLE_RADIUS   = 65      // radio base visible
const DECAY_MOVING      = 3800    // ms de vida mientras el mouse se mueve
const IDLE_FACTOR_MAX   = 5.0     // x veces más rápido al detenerse
const IDLE_RAMP_MS      = 380     // ms para rampa de idle
const IDLE_THRESHOLD_MS = 90      // ms sin movimiento = "idle"
// Cap dinámico según velocidad del mouse
const MIN_PARTICLES     = 18      // mínimo al moverse muy lento
const MAX_PARTICLES     = 220     // máximo al moverse muy rápido
const VELOCITY_SMOOTH   = 0.25    // factor de lerp (0=no cambia, 1=instantáneo)
const VELOCITY_SCALE    = 3.2     // px/evento → partículas extra
const JITTER            = 8       // dispersión aleatoria
const STEP_PX           = 20      // px entre partículas interpoladas
// Blur aplicado UNA SOLA VEZ al compositar — no por partícula
const MASK_BLUR         = 20      // CSS px

// Stamp canvas (pre-renderizado una vez — evita gradiente por frame)
const STAMP_SIZE = 256

// Destellos idle
const GLINT_RADIUS   = 68
const GLINT_DURATION = 1050
const GLINT_MIN_MS   = 1800
const GLINT_MAX_MS   = 3200

// ─── Tipo de partícula (sin fases blob — ya no se necesitan) ───────────────────
type Particle = {
  x: number; y: number; r: number
  t: number; duration: number
  isGlint?: boolean
}

function makeParticle(
  x: number, y: number, r: number,
  duration = DECAY_MOVING,
  isGlint  = false
): Particle {
  return { x, y, r, t: Date.now(), duration, isGlint }
}

// ─── Edad con decay dinámico ───────────────────────────────────────────────────
function calcAge(p: Particle, now: number, lastMove: number): number {
  if (p.isGlint) return Math.min((now - p.t) / p.duration, 1)

  const idleStart  = lastMove + IDLE_THRESHOLD_MS
  const isIdle     = now > idleStart
  const timeMoving = isIdle ? Math.max(0, idleStart - p.t) : Math.max(0, now - p.t)
  const timeIdle   = isIdle ? Math.max(0, now - idleStart) : 0
  const idleFactor = 1 + Math.min(timeIdle / IDLE_RAMP_MS, 1) * (IDLE_FACTOR_MAX - 1)

  return Math.min((timeMoving + timeIdle * idleFactor) / p.duration, 1)
}

// ─── Pre-renderizar stamp (círculo suave) ─────────────────────────────────────
// Se crea UNA VEZ al montar y se reutiliza en cada frame via drawImage (GPU).
// Reemplaza createRadialGradient + fill() por partícula — enorme ahorro de CPU.
function createStamp(): HTMLCanvasElement {
  const c   = document.createElement('canvas')
  c.width   = STAMP_SIZE
  c.height  = STAMP_SIZE
  const ctx = c.getContext('2d')!
  const cx  = STAMP_SIZE / 2
  const r   = STAMP_SIZE / 2

  const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, r)
  g.addColorStop(0,    'rgba(255,255,255,1)')
  g.addColorStop(0.45, 'rgba(255,255,255,0.75)')
  g.addColorStop(0.75, 'rgba(255,255,255,0.3)')
  g.addColorStop(1,    'rgba(255,255,255,0)')

  ctx.fillStyle = g
  ctx.fillRect(0, 0, STAMP_SIZE, STAMP_SIZE)
  return c
}

// ─── HeroReveal ───────────────────────────────────────────────────────────────
type HeroRevealProps = { fullscreen?: boolean }

export function HeroReveal({ fullscreen = false }: HeroRevealProps) {
  const reduce = useReducedMotion()

  const containerRef  = useRef<HTMLDivElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const stampRef      = useRef<HTMLCanvasElement | null>(null)
  const particlesRef  = useRef<Particle[]>([])
  const animIdRef     = useRef<number>(0)
  const isRunningRef  = useRef(false)
  const imgLoadedRef  = useRef(false)
  const revealImgRef  = useRef<HTMLImageElement | null>(null)
  const startLoopRef  = useRef<() => void>(() => {})
  const isHoveringRef = useRef(false)
  const glintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevPosRef    = useRef<{ x: number; y: number } | null>(null)
  const lastMoveRef   = useRef<number>(0)
  const velocityRef   = useRef<number>(0)   // velocidad suavizada (px/evento)

  useEffect(() => {
    if (reduce) return

    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Máscara a resolución 1× — el blur la suaviza de todas formas
    const maskCanvas = document.createElement('canvas')
    maskCanvasRef.current = maskCanvas
    const mCtx = maskCanvas.getContext('2d')
    if (!mCtx) return

    // Stamp pre-renderizado una sola vez
    stampRef.current = createStamp()

    let mounted = true

    // ── Dimensiones (main canvas a DPR, mask a 1×) ────────────────────
    function setSize() {
      const dpr = window.devicePixelRatio || 1
      const w   = container!.offsetWidth
      const h   = container!.offsetHeight

      // Canvas principal a DPR completo (nitidez de imagen)
      canvas!.width  = w * dpr
      canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Máscara a 1× — el blur borrará cualquier escalonado
      maskCanvas.width  = w
      maskCanvas.height = h
    }
    setSize()

    // ── Precargar imagen reveal ───────────────────────────────────────
    const img = new window.Image()
    img.src = '/images/hero-reveal.jpeg'
    revealImgRef.current = img
    img.onload = () => { imgLoadedRef.current = true }
    if (img.complete) imgLoadedRef.current = true

    // ── RAF loop ─────────────────────────────────────────────────────
    function draw() {
      const w        = container!.offsetWidth
      const h        = container!.offsetHeight
      const now      = Date.now()
      const lastMove = lastMoveRef.current
      const stamp    = stampRef.current!

      ctx!.clearRect(0, 0, w, h)

      // Expirar partículas muertas
      particlesRef.current = particlesRef.current.filter(
        p => calcAge(p, now, lastMove) < 1
      )

      if (particlesRef.current.length === 0) {
        isRunningRef.current = false
        return
      }

      // ── 1. Dibujar imagen reveal (cover centrada) ──────────────────
      if (imgLoadedRef.current && revealImgRef.current) {
        const ri = revealImgRef.current
        const ir = ri.naturalWidth / ri.naturalHeight
        const br = w / h
        let dw: number, dh: number, dx: number, dy: number
        if (ir > br) {
          dh = h; dw = h * ir; dy = 0; dx = (w - dw) / 2
        } else {
          dw = w; dh = w / ir; dx = 0; dy = 0
        }
        ctx!.drawImage(ri, dx, dy, dw, dh)
      }

      // ── 2. Construir máscara: stamp por partícula (drawImage GPU) ──
      // SIN ctx.filter en este paso — el blur va en el composite
      mCtx!.clearRect(0, 0, w, h)

      for (const p of particlesRef.current) {
        const age = calcAge(p, now, lastMove)
        if (age >= 1) continue

        // Ease-out cuadrático para salida suave
        const opacity = Math.pow(1 - age, 1.8)
        if (opacity < 0.02) continue

        const r   = p.r * (1 + age * 0.06)   // ligera expansión al morir
        const dia = r * 2

        // globalAlpha + drawImage: operación GPU, sin gradiente por frame
        mCtx!.globalAlpha = opacity
        mCtx!.drawImage(stamp, p.x - r, p.y - r, dia, dia)
      }
      mCtx!.globalAlpha = 1

      // ── 3. Composite: aplicar blur UNA VEZ aquí (no por partícula) ─
      // El blur sobre el drawImage de la máscara crea el efecto metaball/agua:
      // las burbujas contiguas se fusionan orgánicamente.
      ctx!.globalCompositeOperation = 'destination-in'
      ctx!.filter = `blur(${MASK_BLUR}px)`
      ctx!.drawImage(maskCanvas, 0, 0, w, h)
      ctx!.filter = 'none'
      ctx!.globalCompositeOperation = 'source-over'

      animIdRef.current = requestAnimationFrame(draw)
    }

    function startLoop() {
      if (isRunningRef.current) return
      isRunningRef.current = true
      animIdRef.current = requestAnimationFrame(draw)
    }
    startLoopRef.current = startLoop

    // ── Destellos idle ───────────────────────────────────────────────
    function scheduleGlint() {
      const delay = GLINT_MIN_MS + Math.random() * (GLINT_MAX_MS - GLINT_MIN_MS)
      glintTimerRef.current = setTimeout(() => {
        if (!mounted) return
        if (!isHoveringRef.current) {
          const w     = container!.offsetWidth
          const h     = container!.offsetHeight
          const count = 1 + Math.floor(Math.random() * 2)
          for (let i = 0; i < count; i++) {
            const x = w * (0.12 + Math.random() * 0.76)
            const y = h * (0.12 + Math.random() * 0.76)
            const r = GLINT_RADIUS * (0.7 + Math.random() * 0.6)
            particlesRef.current.push(makeParticle(x, y, r, GLINT_DURATION, true))
          }
          startLoop()
        }
        scheduleGlint()
      }, delay)
    }
    scheduleGlint()

    const ro = new ResizeObserver(setSize)
    ro.observe(container)

    return () => {
      mounted = false
      cancelAnimationFrame(animIdRef.current)
      if (glintTimerRef.current) clearTimeout(glintTimerRef.current)
      ro.disconnect()
      isRunningRef.current = false
    }
  }, [reduce])

  // ── Handlers ───────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const cx   = e.clientX - rect.left
    const cy   = e.clientY - rect.top
    const prev = prevPosRef.current

    lastMoveRef.current = Date.now()

    if (prev) {
      const dx   = cx - prev.x
      const dy   = cy - prev.y
      const dist = Math.hypot(dx, dy)

      // Suavizar velocidad con lerp
      velocityRef.current = velocityRef.current * (1 - VELOCITY_SMOOTH) + dist * VELOCITY_SMOOTH

      if (dist > 0) {
        // Cap calculado una vez antes del loop
        const dynamicMax = Math.round(
          Math.min(MIN_PARTICLES + velocityRef.current * VELOCITY_SCALE, MAX_PARTICLES)
        )

        const steps = Math.max(1, Math.ceil(dist / STEP_PX))
        for (let s = 0; s < steps; s++) {
          const t  = s / steps
          const ix = prev.x + dx * t
          const iy = prev.y + dy * t
          const jx = (Math.random() - 0.5) * JITTER
          const jy = (Math.random() - 0.5) * JITTER
          const r  = PARTICLE_RADIUS * (0.75 + Math.random() * 0.5)
          particlesRef.current.push(makeParticle(ix + jx, iy + jy, r))
          // Eliminar de a UNA por push — nunca un splice masivo
          if (particlesRef.current.length > dynamicMax) {
            particlesRef.current.shift()
          }
        }
      }
    } else {
      velocityRef.current = 0
      particlesRef.current.push(makeParticle(cx, cy, PARTICLE_RADIUS))
    }

    prevPosRef.current = { x: cx, y: cy }
    startLoopRef.current()
  }, [reduce])

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true
    lastMoveRef.current   = Date.now()
  }, [])

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false
    prevPosRef.current    = null
    velocityRef.current   = 0
  }, [])

  // ── Render ─────────────────────────────────────────────────────────
  if (fullscreen) {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 select-none overflow-hidden"
        style={{ lineHeight: 0 }}
      >
        <Image
          src="/images/hero-base.jpeg"
          alt="Dario Hernandez"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          className="select-none pointer-events-none"
        />

        {reduce && (
          <Image
            src="/images/hero-reveal.jpeg"
            alt=""
            fill
            sizes="100vw"
            style={{
              objectFit:      'cover',
              objectPosition: 'center top',
              opacity:        0,
              transition:     'opacity 0.5s ease',
            }}
            className="hover:opacity-100"
            aria-hidden
          />
        )}

        {!reduce && (
          <canvas
            ref={canvasRef}
            style={{
              position:      'absolute',
              inset:         0,
              width:         '100%',
              height:        '100%',
              pointerEvents: 'none',
            }}
            aria-hidden
          />
        )}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '480px' }}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative select-none overflow-hidden"
        style={{
          borderRadius: '1.25rem',
          border:       '1px solid oklch(0.65 0.25 195 / 0.35)',
          boxShadow:    '0 0 0 1px oklch(0.65 0.25 195 / 0.1), 0 24px 60px oklch(0 0 0 / 0.5)',
          lineHeight:   0,
        }}
      >
        <Image
          src="/images/hero-base.jpeg"
          alt="Dario Hernandez"
          width={1179}
          height={787}
          priority
          sizes="(max-width: 1024px) 100vw, 480px"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          className="select-none pointer-events-none"
        />

        {reduce && (
          <Image
            src="/images/hero-reveal.jpeg"
            alt=""
            width={1600}
            height={1074}
            sizes="(max-width: 1024px) 100vw, 480px"
            style={{
              position:       'absolute',
              inset:          0,
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: 'center top',
              opacity:        0,
              transition:     'opacity 0.5s ease',
            }}
            className="hover:opacity-100"
            aria-hidden
          />
        )}

        {!reduce && (
          <canvas
            ref={canvasRef}
            style={{
              position:      'absolute',
              inset:         0,
              width:         '100%',
              height:        '100%',
              pointerEvents: 'none',
            }}
            aria-hidden
          />
        )}

        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:   'linear-gradient(to top, oklch(0.06 0.01 280 / 0.45) 0%, transparent 30%)',
            borderRadius: '1.25rem',
          }}
          aria-hidden
        />
      </div>
    </div>
  )
}
