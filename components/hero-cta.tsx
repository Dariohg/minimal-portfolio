'use client'

import { Button } from "@/components/ui/button"
import { Download, Mail, ArrowDown } from "lucide-react"
import Link from "next/link"
import { motion, useReducedMotion, type Variants } from "framer-motion"

const fadeUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

const buttonContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

const buttonItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export function HeroCTA() {
  const reduce = useReducedMotion()

  const descVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : fadeUp(0.1)

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center">

        {/* Párrafo */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty mb-10"
          variants={descVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          Me especializo en construir interfaces de usuario
          <span className="relative inline-block px-2 mx-1 font-semibold neon-magenta">
            modernas
            <span className="absolute inset-0 bg-primary/10 dark:bg-primary/15 border border-primary/30 -z-10 sketch-border-heavy" />
          </span>,
          responsivas y accesibles.
          Transformo diseños creativos en experiencias digitales fluidas.
        </motion.p>

        {/* Botones */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={reduce ? undefined : buttonContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <motion.div variants={reduce ? undefined : buttonItem}>
            <Link href="#proyectos">
              <Button
                size="lg"
                className="sketch-border-heavy hextech-glow h-12 px-8 text-lg hover:translate-x-1 hover:translate-y-1 transition-all hover:shadow-lg bg-primary text-primary-foreground font-semibold group"
              >
                Ver Proyectos
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce-subtle group-hover:translate-y-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={reduce ? undefined : buttonItem}>
            <Button
              size="lg"
              variant="outline"
              className="sketch-border hextech-glow h-12 px-8 hover:bg-accent transition-all bg-transparent hover:scale-105"
              asChild
            >
              <a href="/cv.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Descargar CV
              </a>
            </Button>
          </motion.div>

          <motion.div variants={reduce ? undefined : buttonItem}>
            <Link href="#contacto">
              <Button
                size="lg"
                variant="ghost"
                className="h-12 px-6 hover:bg-accent/50 transition-all hover:scale-105 neon-cyan hover:text-foreground"
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
