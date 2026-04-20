'use client'

import { useState, useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { skillCategories } from '@/data/skills'
import { SpotlightCard } from '@/components/ui/spotlight-card'

// ─── Constants ─────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-60px' as const }

const LEVEL_CONFIG = {
  expert:       { color: 'oklch(0.72 0.28 320)', label: 'EXPERTO',    blocks: 5 },
  advanced:     { color: 'oklch(0.65 0.25 195)', label: 'AVANZADO',   blocks: 4 },
  intermediate: { color: 'oklch(0.58 0.22 285)', label: 'INTERMEDIO', blocks: 3 },
  beginner:     { color: 'oklch(0.40 0.04 280)', label: 'APRENDIZ',   blocks: 2 },
} as const

type Level = keyof typeof LEVEL_CONFIG
type Skill = typeof skillCategories[0]['skills'][0]

// ─── Variants ──────────────────────────────────────────────────────────────────
const typeContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.03 } },
}
const letterVariant = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
}
const skillsContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
}
const skillItemVariant = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
}
const skillArrowVariant = {
  rest:  { x: 0 },
  hover: { x: 6 },
}
// Card hover: y lift + module number scale via variant propagation
const cardHoverVariant = {
  rest:  { y: 0 },
  hover: { y: -6, transition: { type: 'spring' as const, stiffness: 250, damping: 18 } },
}
const moduleNumVariant = {
  rest:  { scale: 1,    opacity: 0.4 },
  hover: { scale: 1.15, opacity: 1,   transition: { duration: 0.2, ease: EASE } },
}

// ─── Level blocks ──────────────────────────────────────────────────────────────
function LevelBlocks({ level }: { level: string }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const cfg    = LEVEL_CONFIG[level as Level] ?? LEVEL_CONFIG.beginner

  return (
    <div ref={ref} className="flex items-end gap-[2px]" aria-label={cfg.label}>
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className={i < cfg.blocks ? undefined : 'level-block-empty'}
          style={{
            width: '4px',
            height: '12px',
            background: i < cfg.blocks ? cfg.color : undefined,
            transformOrigin: 'bottom',
            flexShrink: 0,
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.2, delay: i * 0.08, ease: EASE }}
        />
      ))}
    </div>
  )
}

// ─── Skill row ─────────────────────────────────────────────────────────────────
function SkillItem({ skill }: { skill: Skill }) {
  const cfg  = LEVEL_CONFIG[skill.level as Level] ?? LEVEL_CONFIG.beginner
  const Icon = skill.icon

  return (
    <motion.div variants={skillItemVariant}>
      <motion.div
        className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-primary/5 transition-colors"
        initial="rest"
        whileHover="hover"
      >
        <motion.span
          className="text-primary font-mono text-xs shrink-0 leading-none"
          variants={skillArrowVariant}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {'>'}
        </motion.span>

        <Icon className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />

        <span className="text-sm font-medium text-foreground flex-1 truncate">
          {skill.name}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <LevelBlocks level={skill.level} />
          <span
            className="text-[9px] font-mono tracking-wider hidden sm:block"
            style={{ color: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Category card ─────────────────────────────────────────────────────────────
function CategoryCard({
  category, index, delay, reduce,
}: {
  category: typeof skillCategories[0]
  index: number
  delay: number
  reduce: boolean | null
}) {
  const [hovered, setHovered] = useState(false)
  const moduleNum = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 30, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VP}
      transition={{ duration: 0.7, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {/* Hover wrapper — propagates rest/hover variants + manages hextech-glow state */}
      <motion.div
        className={`h-full transition-shadow duration-300 ${hovered ? 'hextech-glow' : ''}`}
        variants={cardHoverVariant}
        initial="rest"
        whileHover="hover"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <SpotlightCard className="h-full">
          <div
            className="sketch-border bg-card graffiti-bg p-5 h-full relative overflow-hidden"
            style={{ borderLeftColor: 'var(--primary)', borderLeftWidth: '3px' }}
          >
            {/* Status dot */}
            <div
              className="absolute top-4 right-4 w-2 h-2 rounded-full bg-secondary animate-hextech-pulse status-dot-glow"
            />

            {/* Card header */}
            <div className="flex items-baseline gap-3 mb-5 pr-6">
              <motion.span
                className="text-xs font-mono text-primary"
                variants={moduleNumVariant}
              >
                // {moduleNum}
              </motion.span>
              <h3 className="text-lg font-bold font-[family-name:var(--font-caveat)] neon-cyan">
                {category.category}
              </h3>
            </div>

            {/* Skills list */}
            <motion.div
              variants={skillsContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {category.skills.map((skill) => (
                <SkillItem key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  )
}

// ─── System OS card ────────────────────────────────────────────────────────────
function SystemOsCard({ delay, reduce }: { delay: number; reduce: boolean | null }) {
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)

  return (
    <motion.div
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 30, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={VP}
      transition={{ duration: 0.7, delay: reduce ? 0 : delay, ease: EASE }}
    >
      <SpotlightCard className="h-full">
        <div className="sketch-border-heavy hextech-glow bg-card graffiti-bg p-5 h-full font-mono text-xs relative overflow-hidden">

          <div className="text-secondary/60 mb-2 tracking-wider">
            // SISTEMA_OPERATIVO.exe
          </div>
          <div className="text-border/40 mb-3 select-none">
            {'─'.repeat(22)}
          </div>

          <div className="space-y-2 text-muted-foreground">
            <div>
              <span className="text-primary/60">{'>'}</span>
              {' '}INICIALIZANDO...
            </div>
            <div>
              <span className="text-primary/60">{'>'}</span>
              {' '}SUJETO:{' '}
              <span className="text-secondary font-bold">DARIOHG</span>
            </div>

            <div className="text-border/40 select-none">{'─'.repeat(22)}</div>

            <div>
              <span className="text-primary/60">{'>'}</span>
              {' '}SKILLS_DETECTADOS:{' '}
              <span className="text-secondary font-bold">{totalSkills}</span>
            </div>
            <div>
              <span className="text-primary/60">{'>'}</span>
              {' '}EXPERIENCIA:{' '}
              <span className="text-secondary font-bold">3+</span>
              {' '}AÑOS
            </div>
            <div>
              <span className="text-primary/60">{'>'}</span>
              {' '}PROYECTOS:{' '}
              <span className="text-secondary font-bold">10+</span>
            </div>

            <div className="text-border/40 select-none">{'─'.repeat(22)}</div>
          </div>

          <div className="mt-3 flex items-center gap-1 flex-wrap">
            <span className="text-primary/60">{'>'}</span>
            {' '}
            <span className="text-muted-foreground">STATUS:</span>
            {' '}
            <span style={{ color: 'oklch(0.70 0.20 145)' }}>OPERACIONAL</span>
            {' '}
            <motion.span
              className="text-secondary"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.49, 0.5, 1],
              }}
            >
              _
            </motion.span>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export function Skills() {
  const reduce     = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-100px' })

  const ANALYSIS = 'ANÁLISIS DE'

  return (
    <section
      ref={sectionRef}
      id="habilidades"
      className="container mx-auto px-4 sm:px-6 py-20 md:py-32 bg-muted/30 overflow-hidden relative"
    >

      {/* ── Scan line — one-time vertical sweep ── */}
      {!reduce && (
        <motion.div
          className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
          style={{ background: 'color-mix(in oklch, var(--secondary) 30%, transparent)' }}
          initial={{ y: 0, opacity: 0.6 }}
          animate={inView ? { y: 1600, opacity: 0 } : {}}
          transition={{ duration: 1.2, ease: 'linear' }}
        />
      )}

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-16 flex flex-wrap items-start justify-between gap-6">
          <div>

            {/* "ANÁLISIS DE" — typewriter + persistent flicker */}
            <div className="animate-flicker mb-1">
              <motion.p
                className="text-xs uppercase tracking-widest text-secondary font-mono"
                variants={reduce ? undefined : typeContainer}
                initial={reduce ? false : 'hidden'}
                whileInView="visible"
                viewport={VP}
              >
                {ANALYSIS.split('').map((char, i) => (
                  <motion.span key={i} variants={reduce ? undefined : letterVariant}>
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.p>
            </div>

            {/* "CAPACIDADES" */}
            <motion.h2
              className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-caveat)] neon-magenta leading-tight"
              initial={reduce ? false : { opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.33, ease: EASE }}
            >
              CAPACIDADES
            </motion.h2>

            {/* Graffiti line */}
            <motion.div
              className="graffiti-line mt-3 max-w-xs"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Subtitle */}
            <motion.p
              className="text-sm text-muted-foreground/60 italic mt-3"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VP}
              transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
            >
              Herramientas y tecnologías que domino para construir soluciones robustas.
            </motion.p>
          </div>

        </div>

        {/* ── Row 1: Frontend + Backend ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {skillCategories.slice(0, 2).map((cat, i) => (
            <CategoryCard
              key={cat.category}
              category={cat}
              index={i}
              delay={i * 0.12}
              reduce={reduce}
            />
          ))}
        </div>

        {/* ── Row 2: DevOps + Herramientas + Sistema OS ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.slice(2, 4).map((cat, i) => (
            <CategoryCard
              key={cat.category}
              category={cat}
              index={i + 2}
              delay={(i + 2) * 0.12}
              reduce={reduce}
            />
          ))}
          <SystemOsCard delay={4 * 0.12} reduce={reduce} />
        </div>

      </div>
    </section>
  )
}
