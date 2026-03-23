'use client'

import { Button } from "@/components/ui/button"
import { Download, Mail, ArrowDown, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = (y: number, blur: number, delay: number, duration: number): Variants => ({
  hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

const nameContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
}

const nameContainerReduced: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
}

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 80, rotateX: -20, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const wordVariantReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

const buttonContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 2.0 } },
}

const buttonItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const buttonItemReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export function Hero() {
  const reduce = useReducedMotion()

  // Con reduced motion: sin transforms, sin blur, duración 0
  const d = (delay: number) => reduce ? 0 : delay
  const dur = (duration: number) => reduce ? 0 : duration

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: dur(0.6), delay: d(0), ease: 'easeOut' } },
  }

  const greetingVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : fadeUp(30, 8, 0.2, 0.7)

  const subtitleVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : fadeUp(20, 4, 1.4, 0.6)

  const descVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : fadeUp(15, 4, 1.7, 0.6)

  const arrowVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4, delay: 2.2, ease: 'easeOut' } } }

  const underlineVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: d(1.4), duration: dur(1.2), ease: 'easeInOut' },
        opacity:    { delay: d(1.4), duration: 0.01 },
      },
    },
  }

  const arrowDrawVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: d(2.2), duration: dur(0.6), ease: 'easeOut' },
        opacity:    { delay: d(2.2), duration: 0.01 },
      },
    },
  }

  const arrowTipVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: d(2.6), duration: dur(0.3), ease: 'easeOut' },
        opacity:    { delay: d(2.6), duration: 0.01 },
      },
    },
  }

  return (
    <section id="inicio" className="container mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-visible">

      {/* Fondo Decorativo (Grid sutil) */}
      <motion.div
        className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      />

      <div className="max-w-4xl mx-auto text-center relative">

        {/* "Hola, soy" */}
        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl font-medium text-muted-foreground mb-4 font-[family-name:var(--font-caveat)]"
          variants={greetingVariants}
          initial="hidden"
          animate="visible"
        >
          Hola, soy
        </motion.p>

        {/* "Dario Hernandez" — la estrella */}
        <div className="relative inline-block">
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-balance font-[family-name:var(--font-caveat)] relative z-10"
            style={{ perspective: '1000px' }}
          >
            <motion.span
              className="relative inline-block hover:scale-105 transition-transform cursor-default py-2"
              variants={reduce ? nameContainerReduced : nameContainer}
              initial="hidden"
              animate="visible"
            >
              {/* "Dario" */}
              <motion.span
                style={{ display: 'inline-block' }}
                variants={reduce ? wordVariantReduced : wordVariant}
              >
                Dario
              </motion.span>

              {/* espacio */}
              <span style={{ display: 'inline-block', width: '0.3em' }} aria-hidden="true" />

              {/* "Hernandez" */}
              <motion.span
                style={{ display: 'inline-block' }}
                variants={reduce ? wordVariantReduced : wordVariant}
              >
                Hernandez
              </motion.span>

              {/* Subrayado animado SVG */}
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

          {/* Decoración: Estrellita dibujada */}
          <div className="absolute -top-8 -right-8 text-yellow-500/80 hidden md:block animate-bounce-subtle">
            <Sparkles size={40} strokeWidth={1.5} />
          </div>
        </div>

        {/* "Desarrollador Front-End" */}
        <motion.div
          className="relative inline-block mb-10"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/80">
            Desarrollador Front-End
          </h2>
        </motion.div>

        {/* Párrafo descriptivo */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty mb-12 max-w-2xl mx-auto"
          variants={descVariants}
          initial="hidden"
          animate="visible"
        >
          Me especializo en construir interfaces de usuario
          <span className="relative inline-block px-2 mx-1 font-semibold text-foreground">
            modernas
            {/* Efecto de resaltador "marcador" detrás de la palabra clave */}
            <span className="absolute inset-0 bg-yellow-100/50 dark:bg-yellow-900/20 -rotate-2 rounded-sm -z-10 sketch-border border-transparent"></span>
          </span>,
          responsivas y accesibles.
          Transformo diseños creativos en experiencias digitales fluidas.
        </motion.p>

        {/* Botones */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16 relative"
          variants={reduce ? undefined : buttonContainer}
          initial="hidden"
          animate="visible"
        >

          {/* Flecha dibujada animada */}
          <motion.div
            className="absolute -left-20 top-4 hidden md:block -rotate-12 opacity-80"
            variants={arrowVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="font-[family-name:var(--font-caveat)] text-xl block mb-2 text-muted-foreground">
              ¡Mira mi trabajo!
            </span>
            <motion.svg
              width="60"
              height="30"
              viewBox="0 0 50 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial="hidden"
              animate="visible"
              className="text-foreground"
            >
              <motion.path
                d="M5 5 C 15 25, 35 25, 45 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={arrowDrawVariants}
              />
              <motion.path
                d="M45 10 L 35 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={arrowTipVariants}
              />
              <motion.path
                d="M45 10 L 40 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                variants={arrowTipVariants}
              />
            </motion.svg>
          </motion.div>

          <motion.div variants={reduce ? buttonItemReduced : buttonItem}>
            <Link href="#proyectos">
              <Button
                size="lg"
                className="sketch-box h-12 px-8 text-lg hover:translate-x-1 hover:translate-y-1 transition-all hover:shadow-lg bg-primary text-primary-foreground font-semibold group"
              >
                Ver Proyectos
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce-subtle group-hover:translate-y-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={reduce ? buttonItemReduced : buttonItem}>
            <Button
              size="lg"
              variant="outline"
              className="sketch-border h-12 px-8 hover:bg-accent transition-all bg-transparent hover:scale-105"
              asChild
            >
              <a href="/cv.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Descargar CV
              </a>
            </Button>
          </motion.div>

          <motion.div variants={reduce ? buttonItemReduced : buttonItem}>
            <Link href="#contacto">
              <Button
                size="lg"
                variant="ghost"
                className="h-12 px-6 hover:bg-accent/50 transition-all hover:scale-105 text-muted-foreground hover:text-foreground"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contactar
              </Button>
            </Link>
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}
