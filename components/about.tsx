'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ScrollScrub } from '@/components/ui/scroll-scrub'

// ─── Constants ─────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-80px' as const }

// ─── Data ──────────────────────────────────────────────────────────────────────
const SPEC_ITEMS = [
  {
    title: 'Desarrollo Front-End',
    desc:  'Especialista en React y Next.js de alto rendimiento',
  },
  {
    title: 'Arquitectura de Componentes',
    desc:  'Diseño de sistemas modulares y mantenibles (Design Systems)',
  },
  {
    title: 'Diseño y Experiencia de Usuario',
    desc:  'Convertir diseños de Figma en código y enfocarme en la accesibilidad',
  },
]

const HEXTECH_MODULES = [
  {
    title: 'Rendimiento',
    desc:  'Priorizo la velocidad de carga y optimización con las últimas funciones de Next.js.',
  },
  {
    title: 'Calidad',
    desc:  'Entrego productos terminados, probados y documentados, asegurando su escalabilidad a largo plazo.',
  },
  {
    title: 'Código Limpio',
    desc:  'Escribo código modular, bien tipado con TypeScript, fácil de entender y escalar.',
  },
  {
    title: 'Colaboración',
    desc:  'Excelente comunicación con equipos de diseño y backend para entregas eficientes.',
  },
]

// ─── Variants ──────────────────────────────────────────────────────────────────
const specContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const specItemVariant = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
}
const arrowVariant = {
  rest:  { x: 0 },
  hover: { x: 4 },
}
const hexContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const hexModuleVariant = {
  hidden:  { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.6, ease: EASE } },
}
const hexIconVariant = {
  rest:  { rotate: 0 },
  hover: { rotate: 30 },
}

// ─── SVG helpers ───────────────────────────────────────────────────────────────
function HexIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden>
      <polygon
        points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function GraffitiX() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden
      className="text-primary"
      style={{ opacity: 0.07, transform: 'rotate(-20deg)' }}
    >
      <line x1="0" y1="0" x2="16" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="0" x2="0" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function About() {
  const reduce = useReducedMotion()
  const noAnim = reduce ? false : undefined // shorthand for disabling initial

  return (
    <section id="sobre-mi" className="container mx-auto px-4 sm:px-6 py-20 md:py-32 overflow-hidden relative">

      {/* Graffiti X — corner decoration */}
      <div className="absolute top-12 right-8 pointer-events-none" aria-hidden>
        <GraffitiX />
      </div>

      <div className="max-w-4xl mx-auto">

        {/* ── Title ── */}
        <ScrollScrub direction="down" distance={80}>
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
              Sobre mí
            </h2>
            <motion.div
              className="graffiti-line mt-2"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VP}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </ScrollScrub>

        {/* ── Cards grid ── */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">

          {/* Card: Mi Historia */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <motion.div
              className="sketch-box p-6 bg-card h-full relative overflow-hidden transform-gpu"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Top border — draws left → right on scroll enter */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-primary"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VP}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                style={{ transformOrigin: 'left' }}
              />

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold font-[family-name:var(--font-caveat)]">
                  Mi Historia
                </h3>
                <span className="text-xs font-mono text-primary/40 font-bold select-none mt-1">
                  //01
                </span>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Soy un desarrollador Front-End apasionado por construir interfaces de usuario elegantes y funcionales.
                  Con más de 2 años de experiencia en el desarrollo web, me he enfocado en proyectos que demandan alta
                  calidad visual y un rendimiento excepcional.
                </p>
                <p>
                  Mi enfoque se centra en React, Next.js y en escribir código limpio y modular, priorizando siempre la
                  experiencia del usuario y las mejores prácticas de desarrollo moderno.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card: Especialización */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <motion.div
              className="sketch-box p-6 bg-card h-full relative overflow-hidden transform-gpu"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold font-[family-name:var(--font-caveat)]">
                  Especialización
                </h3>
                <span className="text-xs font-mono text-primary/40 font-bold select-none mt-1">
                  //02
                </span>
              </div>

              <motion.div
                variants={specContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VP}
              >
                {SPEC_ITEMS.map((item, i) => (
                  <motion.div key={item.title} variants={specItemVariant}>
                    {i > 0 && (
                      <div className="graffiti-line my-3" style={{ opacity: 0.3 }} />
                    )}
                    <motion.div
                      className="flex items-start gap-3 py-2 px-2 rounded-sm hover:bg-primary/5 transition-colors"
                      initial="rest"
                      whileHover="hover"
                    >
                      <motion.span
                        className="text-primary font-bold shrink-0 mt-0.5 leading-none"
                        variants={arrowVariant}
                        transition={{ duration: 0.2, ease: EASE }}
                      >
                        {'>'}
                      </motion.span>
                      <div>
                        <p className="font-medium text-foreground leading-tight">{item.title}</p>
                        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

        </div>

        {/* ── Hextech modules ── */}
        <div className="mt-12">
          <motion.h3
            className="text-xl sm:text-2xl font-semibold mb-6 font-[family-name:var(--font-caveat)]"
            initial={reduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Mi Enfoque Profesional
          </motion.h3>

          <motion.div
            className="flex gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-4 md:overflow-visible"
            variants={hexContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            {HEXTECH_MODULES.map((mod) => (
              /* Outer: entry animation via stagger variants */
              <motion.div
                key={mod.title}
                className="shrink-0 w-56 md:w-auto"
                variants={hexModuleVariant}
              >
                {/* Inner: hover interactions */}
                <motion.div
                  className="sketch-border hextech-glow bg-card p-5 h-full"
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Hexagon icon — rotates on hover via variant propagation */}
                  <motion.div
                    className="mb-3 text-secondary/40"
                    variants={hexIconVariant}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <HexIcon />
                  </motion.div>

                  <h4 className="font-bold text-foreground text-sm mb-2 leading-tight">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {mod.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
