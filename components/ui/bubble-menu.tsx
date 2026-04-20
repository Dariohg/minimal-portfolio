'use client'

import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// ─── Types ────────────────────────────────────────────────────────────────────
export type BubbleMenuItem = {
  label: string
  href: string
  ariaLabel?: string
  rotation?: number
  hoverStyles?: {
    bgColor?: string
    textColor?: string
  }
}

export type BubbleMenuProps = {
  logo: ReactNode
  items: BubbleMenuItem[]
  menuAriaLabel?: string
  /** CSS color string — supports var() */
  menuBg?: string
  /** CSS color string — supports var() */
  menuContentColor?: string
  useFixedPosition?: boolean
  animationEase?: string
  animationDuration?: number
  staggerDelay?: number
  activeHref?: string
  onItemClick?: (item: BubbleMenuItem, idx: number) => void
  onMenuToggle?: (open: boolean) => void
}

// ─── BubbleMenu ────────────────────────────────────────────────────────────────
export default function BubbleMenu({
  logo,
  items,
  menuAriaLabel = 'Toggle navigation',
  menuBg = 'var(--card)',
  menuContentColor = 'var(--foreground)',
  useFixedPosition = true,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.1,
  activeHref,
  onItemClick,
  onMenuToggle,
}: BubbleMenuProps) {
  const [isOpen, setIsOpen]           = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)
  const pillsRef   = useRef<HTMLAnchorElement[]>([])
  const labelsRef  = useRef<HTMLSpanElement[]>([])

  const posClass = useFixedPosition ? 'fixed' : 'absolute'

  // ─── Toggle ────────────────────────────────────────────────────────────────
  const handleToggle = () => {
    const next = !isOpen
    if (next) setShowOverlay(true)
    setIsOpen(next)
    onMenuToggle?.(next)
  }

  // ─── GSAP entrance / exit ─────────────────────────────────────────────────
  useEffect(() => {
    const overlay = overlayRef.current
    const pills   = pillsRef.current.filter(Boolean)
    const labels  = labelsRef.current.filter(Boolean)
    if (!overlay || !pills.length) return

    if (isOpen) {
      gsap.set(overlay, { display: 'flex' })
      gsap.killTweensOf([...pills, ...labels])
      gsap.set(pills,  { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(labels, { y: 20, autoAlpha: 0 })

      pills.forEach((pill, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.03, 0.03)
        const tl = gsap.timeline({ delay })
        tl.to(pill, { scale: 1, duration: animationDuration, ease: animationEase })
        if (labels[i]) {
          tl.to(
            labels[i],
            { y: 0, autoAlpha: 1, duration: animationDuration * 0.9, ease: 'power3.out' },
            `-=${animationDuration * 0.85}`,
          )
        }
      })
    } else if (showOverlay) {
      gsap.killTweensOf([...pills, ...labels])
      gsap.to(labels, { y: 20, autoAlpha: 0, duration: 0.15, ease: 'power3.in' })
      gsap.to(pills, {
        scale: 0,
        duration: 0.15,
        ease: 'power3.in',
        stagger: { each: 0.04, from: 'end' },
        onComplete: () => {
          gsap.set(overlay, { display: 'none' })
          setShowOverlay(false)
        },
      })
    }
  }, [isOpen, showOverlay, animationEase, animationDuration, staggerDelay])

  // ─── Escape to close ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleToggle() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // ─── Grid math: always 3 cols, center last row ────────────────────────────
  const cols         = 3
  const lastRowCount = items.length % cols
  const lastRowOffset = lastRowCount === 0 ? '0'
    : lastRowCount === 1 ? 'calc(100% / 3)'
    : 'calc(100% / 6)'

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <nav
        className={`${posClass} left-0 right-0 top-[1.5em] z-[99] flex items-center justify-between gap-4 px-5 pointer-events-none`}
        aria-label="Main navigation"
      >
        {/* Logo bubble */}
        <div
          className="pointer-events-auto inline-flex items-center justify-center rounded-full shadow-md"
          style={{
            height: '48px',
            padding: '0 16px',
            background: menuBg,
            border: '1px solid color-mix(in oklch, var(--border) 70%, transparent)',
          }}
        >
          {logo}
        </div>

        {/* Toggle bubble */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isOpen}
          className="pointer-events-auto w-12 h-12 rounded-full shadow-md flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: menuBg,
            border: '1px solid color-mix(in oklch, var(--border) 70%, transparent)',
          }}
        >
          {isOpen ? (
            /* X icon */
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: menuContentColor }} />
              <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: menuContentColor }} />
            </svg>
          ) : (
            /* Hamburger */
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: menuContentColor }} />
              <line x1="2" y1="7" x2="16" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: menuContentColor }} />
              <line x1="4" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: menuContentColor }} />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Pills overlay ───────────────────────────────────────────────────── */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className={`${posClass} inset-0 z-[98] pointer-events-none bg-background/90 backdrop-blur-2xl`}
          style={{
            display: 'none', // GSAP controls this
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '80px',
          }}
          aria-hidden={!isOpen}
        >
          {/* Graffiti line below top bar */}
          <div
            className="graffiti-line absolute left-0 right-0"
            style={{ top: '72px', opacity: 0.35 }}
          />

          <ul
            className="list-none m-0 flex flex-wrap pointer-events-auto w-full"
            style={{
              maxWidth: '900px',
              padding: '0 12px',
              rowGap: '8px',
              gap: 0,
            }}
            role="menu"
          >
            {items.map((item, idx) => {
              const isInLastRow    = lastRowCount > 0 && idx >= items.length - lastRowCount
              const isFirstOfLast  = isInLastRow && (idx % cols === 0)

              return (
                <PillItem
                  key={item.href}
                  item={item}
                  idx={idx}
                  menuBg={menuBg}
                  menuContentColor={menuContentColor}
                  isActive={activeHref === item.href}
                  marginLeft={isFirstOfLast ? lastRowOffset : undefined}
                  pillsRef={pillsRef}
                  labelsRef={labelsRef}
                  onItemClick={(itm, i) => {
                    handleToggle()
                    onItemClick?.(itm, i)
                  }}
                />
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}

// ─── PillItem ─────────────────────────────────────────────────────────────────
function PillItem({
  item, idx, menuBg, menuContentColor, isActive, marginLeft, pillsRef, labelsRef, onItemClick,
}: {
  item: BubbleMenuItem
  idx: number
  menuBg: string
  menuContentColor: string
  isActive?: boolean
  marginLeft?: string
  pillsRef: React.MutableRefObject<HTMLAnchorElement[]>
  labelsRef: React.MutableRefObject<HTMLSpanElement[]>
  onItemClick: (item: BubbleMenuItem, idx: number) => void
}) {
  const [hovered, setHovered] = useState(false)

  const accentColor  = item.hoverStyles?.textColor ?? 'oklch(0.72 0.28 195)'
  const accentBg     = item.hoverStyles?.bgColor   ?? menuBg
  const isElevated   = hovered || isActive

  const rotation  = item.rotation ?? 0
  const transform = isElevated
    ? `rotate(${rotation}deg) scale(1.04)`
    : `rotate(${rotation}deg)`

  const background = isElevated ? accentBg : menuBg
  const color      = isElevated ? accentColor : menuContentColor

  const border = isActive
    ? `1.5px solid ${accentColor}`
    : hovered
      ? `1.5px solid color-mix(in oklch, ${accentColor} 50%, transparent)`
      : `1px solid color-mix(in oklch, var(--border) 80%, transparent)`

  const boxShadow = isActive
    ? `0 0 0 1px ${accentColor}, 0 8px 28px oklch(0 0 0 / 0.22), inset 0 1px 0 oklch(1 0 0 / 0.06)`
    : hovered
      ? `0 6px 20px oklch(0 0 0 / 0.16), inset 0 1px 0 oklch(1 0 0 / 0.05)`
      : `0 2px 8px oklch(0 0 0 / 0.12), inset 0 1px 0 oklch(1 0 0 / 0.04)`

  return (
    <li
      role="none"
      className="flex justify-center items-stretch box-border"
      style={{
        flex: '0 0 calc(100% / 3)',
        marginLeft,
        padding: '4px',
      }}
    >
      <a
        role="menuitem"
        href={item.href}
        aria-label={item.ariaLabel ?? item.label}
        ref={el => { if (el) pillsRef.current[idx] = el }}
        onClick={e => { e.preventDefault(); setHovered(false); onItemClick(item, idx) }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => { setHovered(false) }}
        onTouchCancel={() => setHovered(false)}
        className="w-full rounded-[2rem] flex items-center justify-center will-change-transform box-border overflow-hidden select-none cursor-pointer"
        style={{
          minHeight: 'clamp(88px, 22vw, 140px)',
          padding: '1rem 0.5rem',
          height: '10px',
          fontSize: 'clamp(1.3rem, 5.5vw, 2rem)',
          fontFamily: 'var(--font-caveat)',
          fontWeight: 700,
          lineHeight: 1,
          textDecoration: 'none',
          letterSpacing: '0em',
          background,
          color,
          boxShadow,
          transform,
          transition: 'background 0.25s ease, color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          border,
        }}
      >
        <span
          ref={el => { if (el) labelsRef.current[idx] = el }}
          style={{ display: 'inline-block', lineHeight: 1.1 }}
        >
          {item.label}
          {isActive && (
            <span
              style={{
                display: 'block',
                height: '2px',
                borderRadius: '9999px',
                marginTop: '2px',
                background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                opacity: 0.8,
              }}
            />
          )}
        </span>
      </a>
    </li>
  )
}
