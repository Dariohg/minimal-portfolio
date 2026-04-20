'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Timing ───────────────────────────────────────────────────────────────────
const CHAR_DELAY  = 60
const HOLD_MS     = 420
const EXIT_MS     = 750

const LOGO_TEXT   = '<Dariohg/>'
const TOTAL_CHARS = LOGO_TEXT.length
const TOTAL_MS    = TOTAL_CHARS * CHAR_DELAY + HOLD_MS

// ─── Paletas ──────────────────────────────────────────────────────────────────
const DARK_THEME  = {
  bg:      'oklch(0.08 0.02 280)',
  teal:    'oklch(0.65 0.25 195)',
  magenta: 'oklch(0.72 0.28 320)',
  dot:     [0, 185, 210] as [number,number,number],
  muted:   'oklch(0.5 0.04 280)',
}
const LIGHT_THEME = {
  bg:      'oklch(0.97 0.008 80)',
  teal:    'oklch(0.38 0.16 195)',
  magenta: 'oklch(0.42 0.20 320)',
  dot:     [0, 110, 145] as [number,number,number],
  muted:   'oklch(0.52 0.04 280)',
}

type Theme = typeof DARK_THEME

// ─── Grid de puntos ondulantes ────────────────────────────────────────────────
function DotGrid({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx    = canvas.getContext('2d')!
    let animId: number
    let t = 0
    const [r, g, b] = theme.dot

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const SPACING = 52

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cols = Math.ceil(canvas.width  / SPACING) + 1
      const rows = Math.ceil(canvas.height / SPACING) + 1
      const cx   = canvas.width  / 2
      const cy   = canvas.height / 2

      t += 0.022
      for (let c = 0; c < cols; c++) {
        for (let row = 0; row < rows; row++) {
          const x    = c * SPACING
          const y    = row * SPACING
          const dist = Math.hypot(x - cx, y - cy) / Math.max(canvas.width, canvas.height)
          const wave = Math.sin(t - dist * 7) * 0.5 + 0.5
          const op   = wave * 0.09 + 0.015

          ctx.beginPath()
          ctx.arc(x, y, 1.1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${op})`
          ctx.fill()
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden
    />
  )
}

// ─── Marcas de esquina ────────────────────────────────────────────────────────
function CornerMark({ pos, color }: { pos: 'tl' | 'tr' | 'bl' | 'br'; color: string }) {
  const size   = 28
  const offset = 28

  const style: React.CSSProperties = {
    position:    'absolute',
    width:       size,
    height:      size,
    borderColor: color,
    ...(pos === 'tl' && { top: offset, left:  offset, borderTop:    '1px solid', borderLeft:  '1px solid' }),
    ...(pos === 'tr' && { top: offset, right: offset, borderTop:    '1px solid', borderRight: '1px solid' }),
    ...(pos === 'bl' && { bottom: offset, left:  offset, borderBottom: '1px solid', borderLeft:  '1px solid' }),
    ...(pos === 'br' && { bottom: offset, right: offset, borderBottom: '1px solid', borderRight: '1px solid' }),
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      style={style}
      aria-hidden
    />
  )
}

// ─── Caracter del logo ────────────────────────────────────────────────────────
function Char({ char, visible, theme }: { char: string; visible: boolean; theme: Theme }) {
  const isSymbol = ['<', '>', '/'].includes(char)
  const color    = isSymbol ? theme.teal : theme.magenta

  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      style={{
        color,
        fontFamily:  'var(--font-caveat)',
        fontSize:    'clamp(2.2rem, 7vw, 4.5rem)',
        fontWeight:  700,
        lineHeight:  1,
        display:     'inline-block',
        textShadow:  visible ? `0 0 24px ${color.replace(')', ' / 0.45)')}` : 'none',
      }}
    >
      {char}
    </motion.span>
  )
}

// ─── Cursor parpadeante ───────────────────────────────────────────────────────
function Cursor({ show, color }: { show: boolean; color: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            color,
            fontFamily: 'var(--font-caveat)',
            fontSize:   'clamp(2.2rem, 7vw, 4.5rem)',
            fontWeight: 700,
            marginLeft: 2,
          }}
          aria-hidden
        >
          |
        </motion.span>
      )}
    </AnimatePresence>
  )
}

// ─── LoadingScreen ────────────────────────────────────────────────────────────
export function LoadingScreen() {
  const [mounted,      setMounted]      = useState(false)
  const [visibleChars, setVisibleChars] = useState(0)
  const [isExiting,    setIsExiting]    = useState(false)
  const [isDone,       setIsDone]       = useState(false)
  const [isDark,       setIsDark]       = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') || 'dark'
      setIsDark(saved === 'dark')
    } catch {}
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const charTimers = LOGO_TEXT.split('').map((_, i) =>
      setTimeout(() => setVisibleChars(i + 1), i * CHAR_DELAY)
    )

    const exitTimer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => setIsDone(true), EXIT_MS)
    }, TOTAL_MS)

    return () => {
      charTimers.forEach(clearTimeout)
      clearTimeout(exitTimer)
    }
  }, [mounted])

  if (!mounted || isDone) return null

  const theme   = isDark ? DARK_THEME : LIGHT_THEME
  const sepLine = (color: string, delay = 0) => ({
    width:           'min(280px, 60vw)',
    height:          1,
    background:      `linear-gradient(90deg, transparent, ${color.replace(')', ' / 0.3)')}, transparent)`,
    transformOrigin: 'center' as const,
    delay,
  })

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{
            clipPath:   'inset(0% 0% 100% 0%)',
            transition: { duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position:        'fixed',
            inset:           0,
            zIndex:          99999,
            backgroundColor: theme.bg,
            display:         'flex',
            flexDirection:   'column',
            alignItems:      'center',
            justifyContent:  'center',
            gap:             20,
            overflow:        'hidden',
          }}
        >
          <DotGrid theme={theme} />

          <CornerMark pos="tl" color={`${theme.teal.replace(')', ' / 0.35)')}`} />
          <CornerMark pos="tr" color={`${theme.teal.replace(')', ' / 0.35)')}`} />
          <CornerMark pos="bl" color={`${theme.teal.replace(')', ' / 0.35)')}`} />
          <CornerMark pos="br" color={`${theme.teal.replace(')', ' / 0.35)')}`} />

          {/* Separador superior */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={sepLine(theme.teal)}
            aria-hidden
          />

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {LOGO_TEXT.split('').map((char, i) => (
              <Char key={i} char={char} visible={i < visibleChars} theme={theme} />
            ))}
            <Cursor show={visibleChars < TOTAL_CHARS} color={theme.teal} />
          </div>

          {/* Loading */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              fontFamily:    'monospace',
              fontSize:      '0.7rem',
              letterSpacing: '0.2em',
              color:         theme.muted,
            }}
          >
            Loading
          </motion.span>

          {/* Separador inferior */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={sepLine(theme.magenta)}
            aria-hidden
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
