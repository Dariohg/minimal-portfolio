'use client'

import { motion, useReducedMotion, type Variants } from "framer-motion"
import { HeroReveal } from "@/components/HeroReveal"
import { Sparkles } from "lucide-react"

// ─── Variants ─────────────────────────────────────────────────────────────────

const nameContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } },
}

const nameContainerReduced: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
}

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -20, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const wordVariantReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export function Hero() {
  const reduce = useReducedMotion()

  const d = (delay: number) => reduce ? 0 : delay
  const dur = (duration: number) => reduce ? 0 : duration

  const greetingVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
      }

  const subtitleVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : {
        hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay: d(1.8), ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
      }

  const underlineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: d(1.5), duration: dur(1.1), ease: 'easeInOut' },
        opacity:    { delay: d(1.5), duration: 0.01 },
      },
    },
  }

  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden"
      style={{ height: '100svh' }}
    >
      {/* ── Fullscreen reveal image ── */}
      <HeroReveal fullscreen />

      {/* ── Dark overlay para legibilidad ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'linear-gradient(135deg, oklch(0.06 0.01 280 / 0.72) 0%, oklch(0.06 0.01 280 / 0.35) 50%, oklch(0.06 0.01 280 / 0.55) 100%)',
        }}
        aria-hidden
      />


      {/* ── Top-left: Hola soy + Nombre ── */}
      <div className="absolute top-0 left-0 z-20 p-8 md:p-12 lg:p-16 pointer-events-none" style={{ paddingTop: 'calc(var(--header-height, 80px) + 2rem)' }}>

        {/* "Hola, soy" */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-medium text-white/70 mb-3 font-[family-name:var(--font-caveat)] flex items-center gap-2"
          variants={greetingVariants}
          initial="hidden"
          animate="visible"
        >
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            className="shrink-0 opacity-50"
            style={{ transform: 'rotate(-15deg)' }}
            aria-hidden="true"
          >
            <line x1="0" y1="0" x2="16" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="16" y1="0" x2="0" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          Hola, soy
        </motion.p>

        {/* "Dario Hernandez" */}
        <div className="relative inline-block">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-[family-name:var(--font-caveat)] relative z-10 neon-magenta animate-flicker"
            style={{ perspective: '1000px', lineHeight: 1, textShadow: '0 2px 40px oklch(0.72 0.28 320 / 0.5)' }}
          >
            <motion.span
              className="relative inline-block"
              variants={reduce ? nameContainerReduced : nameContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                style={{ display: 'inline-block' }}
                variants={reduce ? wordVariantReduced : wordVariant}
              >
                Dario
              </motion.span>

              <span style={{ display: 'inline-block', width: '0.25em' }} aria-hidden="true" />

              <motion.span
                style={{ display: 'inline-block' }}
                variants={reduce ? wordVariantReduced : wordVariant}
              >
                Hernandez
              </motion.span>

              <motion.svg
                className="absolute w-full h-4 -bottom-2 left-0 text-primary pointer-events-none"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                initial="hidden"
                animate="visible"
              >
                <motion.path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  variants={underlineVariants}
                />
              </motion.svg>
            </motion.span>
          </h1>

          <div className="absolute -top-6 -right-8 text-secondary hidden md:block animate-hextech-pulse opacity-70">
            <Sparkles size={32} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* ── Bottom-right: Desarrollador / Front-End ── */}
      <div className="absolute bottom-0 right-0 z-20 p-8 md:p-12 lg:p-16 pointer-events-none">
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-right"
        >
          <h2
            className="font-[family-name:var(--font-space-grotesk)] font-bold tracking-tight leading-none subtitle-glow"
            style={{ textShadow: '0 2px 24px oklch(0.65 0.25 195 / 0.6)' }}
          >
            <span className="block text-2xl sm:text-3xl md:text-4xl text-white/80">Desarrollador</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl neon-cyan">Front-End</span>
          </h2>
        </motion.div>
      </div>

      {/* Línea graffiti decorativa */}
      <div className="absolute bottom-0 left-0 right-0 graffiti-line z-20" aria-hidden="true" />
    </section>
  )
}
