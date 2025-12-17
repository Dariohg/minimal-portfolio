'use client'

import { Button } from "@/components/ui/button"
import { Download, Mail, ArrowDown, Sparkles } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion, type Variants } from "framer-motion"

// CORRECCIÓN: Tipamos explícitamente como 'Variants' para que TS entienda la estructura
const drawAnimation: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      // TS infiere "spring" correctamente gracias al tipo Variants
      pathLength: { delay: i * 0.5, type: "spring", duration: 1.5, bounce: 0 },
      opacity: { delay: i * 0.5, duration: 0.01 }
    }
  })
}

export function Hero() {
  return (
      <section id="inicio" className="container mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-visible">

        {/* Fondo Decorativo (Grid sutil) */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-4xl mx-auto text-center relative">

          <ScrollReveal animation="fade-in-up">
            <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-muted-foreground mb-4 font-[family-name:var(--font-caveat)]">
              Hola, soy
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-up" delay={100}>
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-balance font-[family-name:var(--font-caveat)] relative z-10">
                <span className="relative inline-block hover:scale-105 transition-transform cursor-default py-2">
                  Dario Hernandez
                  {/* Subrayado animado SVG detrás del nombre */}
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
                        variants={drawAnimation}
                        custom={1} // Retraso
                    />
                  </motion.svg>
                </span>
              </h1>

              {/* Decoración: Estrellita dibujada */}
              <div className="absolute -top-8 -right-8 text-yellow-500/80 hidden md:block animate-bounce-subtle">
                <Sparkles size={40} strokeWidth={1.5} />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-right" delay={200}>
            <div className="relative inline-block mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/80">
                Desarrollador Front-End
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-up" delay={300}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty mb-12 max-w-2xl mx-auto">
              Me especializo en construir interfaces de usuario
              <span className="relative inline-block px-2 mx-1 font-semibold text-foreground">
                modernas
                {/* Efecto de resaltador "marcador" detrás de la palabra clave */}
                <span className="absolute inset-0 bg-yellow-100/50 dark:bg-yellow-900/20 -rotate-2 rounded-sm -z-10 sketch-border border-transparent"></span>
              </span>,
              responsivas y accesibles.
              Transformo diseños creativos en experiencias digitales fluidas.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="scale-in" delay={400}>
            <div className="flex flex-wrap justify-center gap-4 mb-16 relative">

              {/* Flecha dibujada animada apuntando al botón */}
              <div className="absolute -left-20 top-4 hidden md:block -rotate-12 opacity-80">
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
                      variants={drawAnimation}
                      custom={2.5} // Se dibuja después del nombre
                  />
                  <motion.path
                      d="M45 10 L 35 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      variants={drawAnimation}
                      custom={3}
                  />
                  <motion.path
                      d="M45 10 L 40 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      variants={drawAnimation}
                      custom={3}
                  />
                </motion.svg>
              </div>

              <Link href="#proyectos">
                <Button
                    size="lg"
                    className="sketch-box h-12 px-8 text-lg hover:translate-x-1 hover:translate-y-1 transition-all hover:shadow-lg bg-primary text-primary-foreground font-semibold group"
                >
                  Ver Proyectos
                  <ArrowDown className="ml-2 h-5 w-5 animate-bounce-subtle group-hover:translate-y-1 transition-transform" />
                </Button>
              </Link>

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
            </div>
          </ScrollReveal>

        </div>
      </section>
  )
}