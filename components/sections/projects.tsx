'use client'

import Link from "next/link"
import Image from "next/image"
import { featuredProjects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { TiltCard } from "@/components/ui/tilt-card"
import { ScrollAnimation } from "@/components/ui/scroll-animation" // Trigger seguro

// Parallax INTERNO de la imagen (este sí puede ser Scrub porque está contenido)
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
      <div ref={ref} className="overflow-hidden h-full w-full relative">
        <motion.div style={{ y, height: "120%", width: "100%", position: "relative", top: "-10%" }}>
          <Image src={src} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"/>
        </motion.div>
      </div>
  )
}

export function Projects() {
  return (
      <section id="proyectos" className="container mx-auto px-4 sm:px-6 py-20 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <ScrollAnimation direction="down">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
                Proyectos Destacados
              </h2>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <p className="text-muted-foreground text-lg">Una selección de mis trabajos más recientes.</p>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, idx) => (
                // Animación limpia: Entra desde abajo y se queda fija
                <ScrollAnimation
                    key={project.id}
                    direction="up"
                    delay={idx * 0.15} // Efecto escalera
                    className="h-full"
                    viewportAmount={0.2}
                >
                  <TiltCard className="h-full">
                    <Link
                        href={`/proyectos/${project.id}`}
                        className="group sketch-box p-4 bg-card hover:translate-x-1 hover:translate-y-1 transition-all block h-full"
                    >
                      <div className="aspect-video overflow-hidden sketch-border mb-4 relative">
                        <ParallaxImage src={project.image || "/placeholder.svg"} alt={project.title} />
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground tracking-wide uppercase font-[family-name:var(--font-caveat)]">{project.category}</p>
                        <h3 className="text-xl font-semibold font-[family-name:var(--font-caveat)] group-hover:sketch-underline">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.stack.slice(0, 3).map((tech, i) => (
                              <span key={i} className="text-xs px-2 py-1 sketch-border bg-muted">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation direction="up" delay={0.4}>
            <div className="text-center">
              <Link href="/proyectos">
                <Button size="lg" className="sketch-box font-[family-name:var(--font-caveat)] text-lg">
                  Ver Todos los Proyectos
                </Button>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
  )
}