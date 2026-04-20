'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { experiences } from '@/data/experience'

// ─── Constants ─────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-60px' as const }

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatPeriod(p: string) {
  return '//' + p.replace(' - ', '—').toUpperCase()
}

function typeLabel(type: string): { text: string; cls: string } {
  if (type === 'full-time') return { text: 'CONTRATO PERMANENTE',    cls: 'bg-secondary/10 text-secondary border-secondary/30' }
  if (type === 'contract')  return { text: 'CONTRATO TEMPORAL',      cls: 'bg-accent/10 text-accent border-accent/30' }
  return                           { text: 'OPERACIÓN INDEPENDIENTE', cls: 'bg-primary/10 text-primary border-primary/30' }
}

// ─── Variants ──────────────────────────────────────────────────────────────────
const achievementsContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const achievementItem = {
  hidden:  { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
}
const checkVariant = {
  rest:  { scale: 1 },
  hover: { scale: 1.2 },
}
const roleArrowVariant = {
  rest:  { x: 0 },
  hover: { x: 6 },
}
const cardHoverVariant = {
  rest:  { y: 0 },
  hover: { y: -4, transition: { type: 'spring' as const, stiffness: 250, damping: 20 } },
}

// ─── Single experience card ─────────────────────────────────────────────────────
function ExperienceCard({
  exp,
  index,
  reduce,
}: {
  exp: typeof experiences[0]
  index: number
  reduce: boolean | null
}) {
  const ref     = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const label = typeLabel(exp.type)
  const num   = String(index + 1).padStart(2, '0')

  // Subtle scale-in driven by how far the card has scrolled into view
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
    layoutEffect: false,
  })
  const stickyScale   = useTransform(scrollYProgress, [0, 1], [0.97, 1])
  const stickyOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 1])

  return (
    <div
      ref={ref}
      style={{
        position: reduce ? 'relative' : 'sticky',
        top: reduce ? undefined : `${80 + index * 24}px`,
        marginBottom: '24px',
        zIndex: index + 1,
      }}
    >
      {/* Entry animation */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 60, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: EASE }}
      >
        {/* Scroll-driven scale as card enters sticky zone */}
        <motion.div
          style={reduce ? undefined : { scale: stickyScale, opacity: stickyOpacity }}
        >
          {/* Hover lift — propagates rest/hover to children */}
          <motion.div
            variants={cardHoverVariant}
            initial="rest"
            whileHover="hover"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className={`transition-shadow duration-300 ${hovered ? 'hextech-glow' : ''}`}
          >
            {/* Card shell */}
            <div
              className="bg-card/90 backdrop-blur-sm relative overflow-hidden"
              style={{
                border: '1px solid var(--border)',
                borderLeft: '4px solid var(--primary)',
              }}
            >
              {/* Decorative background number */}
              <span
                className="absolute bottom-2 right-4 font-[family-name:var(--font-caveat)] pointer-events-none select-none"
                style={{
                  fontSize: '15vw',
                  lineHeight: 1,
                  color: 'color-mix(in oklch, var(--primary) 6%, transparent)',
                  zIndex: 0,
                }}
                aria-hidden
              >
                {num}
              </span>

              <div className="relative z-10 p-6 md:p-8">

                {/* ── Header row ── */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono text-primary/50 tracking-wider">
                    CONTRATO #{num}
                  </span>
                  <span className={`sketch-border text-xs font-mono px-2 py-0.5 ${label.cls}`}>
                    {label.text}
                  </span>
                </div>

                <div className="graffiti-line mb-5" style={{ opacity: 0.4 }} />

                {/* ── Body — two columns on md+ ── */}
                <div className="grid md:grid-cols-[55%_45%] gap-6 md:gap-8">

                  {/* Left: company, role, description, date */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-caveat)] neon-cyan leading-tight mb-2">
                      {exp.company}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <motion.span
                        className="text-primary font-mono text-sm shrink-0"
                        variants={roleArrowVariant}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        {'>'}
                      </motion.span>
                      <span className="font-mono text-sm text-foreground/80">{exp.role}</span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="text-xs font-mono text-primary/60 mt-4">
                      {formatPeriod(exp.period)}
                    </div>
                  </div>

                  {/* Right: mission report */}
                  <div>
                    <div className="text-xs uppercase tracking-widest text-secondary font-mono mb-2">
                      INFORME DE MISIÓN:
                    </div>
                    <div className="text-muted-foreground/20 font-mono text-xs mb-3 select-none">
                      {'─'.repeat(28)}
                    </div>

                    <motion.ul
                      className="space-y-1"
                      variants={achievementsContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                    >
                      {exp.achievements.map((a, i) => (
                        <motion.li key={i} variants={achievementItem}>
                          <motion.div
                            className="flex items-start gap-2 px-2 py-1 rounded-sm hover:bg-primary/5 transition-colors"
                            initial="rest"
                            whileHover="hover"
                          >
                            <motion.span
                              className="text-primary font-mono text-sm shrink-0 mt-0.5"
                              variants={checkVariant}
                              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                              ✓
                            </motion.span>
                            <span className="text-sm text-foreground/80 leading-relaxed">{a}</span>
                          </motion.div>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>


              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────────
export function Experience() {
  const reduce = useReducedMotion()
  const n = experiences.length

  return (
    <section id="experiencia" className="container mx-auto px-4 sm:px-6 py-20 md:py-32 overflow-hidden relative">
      <div className="max-w-[900px] mx-auto">

        {/* ── Section header ── */}
        <div className="mb-16 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="animate-flicker mb-1">
              <motion.p
                className="text-xs uppercase tracking-widest text-secondary font-mono"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VP}
                transition={{ duration: 0.4, ease: EASE }}
              >
                REGISTRO DE
              </motion.p>
            </div>

            <motion.h2
              className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-caveat)] neon-magenta leading-tight"
              initial={reduce ? false : { opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE }}
            >
              EXPERIENCIA
            </motion.h2>

            <motion.div
              className="graffiti-line mt-3 max-w-[220px]"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

        </div>

        {/* ── Sticky stack ── */}
        <div style={{ position: 'relative' }}>
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={i}
              exp={exp}
              index={i}
              reduce={reduce}
            />
          ))}
        </div>

        {/* Spacer so last sticky card clears the section bottom */}
        {!reduce && <div style={{ height: `${(n - 1) * 24 + 80}px` }} />}

      </div>
    </section>
  )
}
