'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  animate,
  type Variants,
} from "framer-motion"
import Lenis from 'lenis'
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github, ArrowRight } from "lucide-react"
import { ProjectsBanner } from "@/components/ui/projects-banner"
import { ProjectCardBanner } from "@/components/ui/project-card-banner"

type ProjectType = (typeof projects)[number]

// ─── Progress Indicator ───────────────────────────────────────────────────────

function ProgressIndicator({
  total,
  activeIndex,
}: {
  total: number
  activeIndex: number
}) {
  const lineHeight = (total - 1) * 64 + 20
  return (
    <div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="relative" style={{ height: lineHeight }}>
        {/* Vertical line */}
        <div className="absolute top-2.5 bottom-2.5 right-[5px] w-px bg-foreground/20" />

        {Array.from({ length: total }).map((_, i) => {
          const pct = total === 1 ? 0 : (i / (total - 1)) * 100
          const isActive = activeIndex === i
          return (
            <div
              key={i}
              className="absolute flex items-center gap-2.5"
              style={{ top: `${pct}%`, transform: 'translateY(-50%)', right: 0 }}
            >
              <span
                className="text-[10px] font-mono tabular-nums transition-all duration-400"
                style={{ opacity: isActive ? 1 : 0.3, fontWeight: isActive ? 700 : 400 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div
                className="relative z-10 rounded-full bg-foreground transition-all duration-400"
                style={{
                  width: isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  opacity: isActive ? 1 : 0.35,
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Stack Card ───────────────────────────────────────────────────────────────

function StackCard({
  project,
  index,
  total,
}: {
  project: ProjectType
  index: number
  total: number
}) {
  const router = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const isLast = index === total - 1
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacityValue = useTransform(scrollYProgress, [0, 1], [1, 0.72])
  const yValue = useTransform(scrollYProgress, [0, 1], [0, -18])

  const stickyTop = 80 + index * 20

  const handleDetailNav = async (href: string) => {
    if (cardRef.current) {
      await animate(cardRef.current, { scale: 1.02 }, { duration: 0.15 })
    }
    router.push(href)
  }

  type OverlayBtn =
    | { label: string; href: string; internal: true }
    | { label: string; href: string; internal: false; icon: typeof Github }

  const overlayButtons: OverlayBtn[] = [
    { label: 'Ver Detalles', href: `/proyectos/${project.id}`, internal: true },
    ...(project.links.github
      ? [{ label: 'GitHub', href: project.links.github, internal: false as const, icon: Github }]
      : []),
    ...(project.links.live
      ? [{ label: 'Demo', href: project.links.live, internal: false as const, icon: ExternalLink }]
      : []),
  ]

  return (
    <div ref={sectionRef} style={{ height: '100vh', position: 'relative' }}>
      <motion.div
        style={{
          position: 'sticky',
          top: stickyTop,
          height: '80vh',
          zIndex: index + 1,
          scale: isLast ? 1 : scaleValue,
          opacity: isLast ? 1 : opacityValue,
          y: isLast ? 0 : yValue,
        }}
        className="px-4 sm:px-6 lg:px-16 xl:px-24"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div
          ref={cardRef}
          className="w-full h-full max-w-7xl mx-auto bg-card border border-foreground/10 rounded-2xl overflow-hidden flex relative shadow-2xl"
        >
          {/* Giant background number */}
          <motion.span
            className="absolute bottom-0 left-2 text-[20vw] font-bold font-[family-name:var(--font-caveat)] leading-none z-0 select-none pointer-events-none text-foreground/[0.04]"
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>

          {/* ── Left column (55%) ── */}
          <div className="relative z-10 w-full md:w-[55%] flex flex-col justify-center p-6 sm:p-10 lg:p-14 gap-5 overflow-hidden">
            {/* Category line */}
            <div className="flex items-center gap-4">
              <div className="h-px w-8 bg-foreground/40 shrink-0" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl xl:text-6xl font-bold font-[family-name:var(--font-caveat)] leading-tight text-foreground">
              {project.title}
            </h2>

            {/* Description (short) */}
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-2">
              {project.description}
            </p>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-background/60 border border-foreground/10 rounded-full text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                className="sketch-box h-11 px-6 bg-foreground text-background hover:bg-foreground/90 font-semibold"
                onClick={() => handleDetailNav(`/proyectos/${project.id}`)}
              >
                Ver Detalles
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="sketch-circle w-11 h-11 border border-foreground/20 hover:bg-accent"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="sketch-circle w-11 h-11 border border-foreground/20 hover:bg-accent"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* ── Right column (45%) — diagonal clip + hover reveal ── */}
          <div
            className="relative hidden md:block w-[45%] overflow-hidden shrink-0"
            style={{
              clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
              marginLeft: '-3%',
            }}
          >
            {/* Banner */}
            <div className="w-full h-full">
              <ProjectCardBanner title={project.title} />
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 bg-foreground/90 flex flex-col justify-center p-8 lg:p-10 gap-5"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <h3 className="text-2xl font-bold font-[family-name:var(--font-caveat)] text-background leading-tight line-clamp-2">
                {project.title}
              </h3>
              <p className="text-background/80 text-sm leading-relaxed line-clamp-5">
                {project.longDescription}
              </p>

              {/* Staggered buttons */}
              <div className="flex flex-col gap-2.5">
                {overlayButtons.map((btn, i) => (
                  <motion.div
                    key={btn.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={
                      isHovered
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 8 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: isHovered ? i * 0.06 : 0,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {btn.internal ? (
                      <Button
                        className="w-full bg-background text-foreground hover:bg-background/90 font-semibold"
                        onClick={() => handleDetailNav(btn.href)}
                      >
                        {btn.label}
                      </Button>
                    ) : (
                      <a
                        href={btn.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-background/30 text-background hover:bg-background/10"
                        >
                          {!btn.internal && (
                            <btn.icon className="w-4 h-4 mr-2" />
                          )}
                          {btn.label}
                        </Button>
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Simple Card (reduced motion fallback) ────────────────────────────────────

function SimpleCard({ project }: { project: ProjectType }) {
  return (
    <div className="w-full bg-card border border-foreground/10 rounded-2xl overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-[55%] flex flex-col justify-center p-8 md:p-12 gap-5">
        <div className="flex items-center gap-4">
          <div className="h-px w-8 bg-foreground/40 shrink-0" />
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {project.category}
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-caveat)] leading-tight">
          {project.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-background/60 border border-foreground/10 rounded-full text-xs font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link href={`/proyectos/${project.id}`}>
            <Button className="sketch-box h-11 px-6 bg-foreground text-background hover:bg-foreground/90 font-semibold">
              Ver Detalles <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="sketch-circle w-11 h-11">
                <Github className="w-4 h-4" />
              </Button>
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="sketch-circle w-11 h-11">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          )}
        </div>
      </div>
      <div className="w-full md:w-[45%] min-h-[240px]">
        <ProjectCardBanner title={project.title} />
      </div>
    </div>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="container mx-auto px-4 py-32 text-center">
      <div className="max-w-2xl mx-auto border-t border-dashed border-foreground/10 pt-20">
        <div className="overflow-hidden mb-10">
          <motion.h3
            className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-caveat)] font-bold"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-80px' }}
          >
            ¿Tienes un proyecto en mente?
          </motion.h3>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <Link href="/#contacto">
            <Button
              size="lg"
              className="sketch-box h-16 px-12 text-xl border-2 bg-foreground text-background hover:bg-foreground/90 font-semibold"
            >
              Hablemos Ahora
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProyectosPage() {
  const reduce = useReducedMotion()
  const stackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  // Track active card index from stack scroll progress
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })
  useMotionValueEvent(stackProgress, 'change', (v) => {
    setActiveIndex(Math.min(Math.floor(v * projects.length), projects.length - 1))
  })

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-foreground/10">

      {/* Back button */}
      <div className="fixed top-6 left-6 z-50 pointer-events-none">
        <Link href="/#proyectos" className="pointer-events-auto inline-block">
          <Button
            variant="outline"
            className="sketch-box bg-background/80 backdrop-blur shadow-lg hover:translate-x-1 transition-transform border-2 border-foreground h-12 px-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Inicio
          </Button>
        </Link>
      </div>

      {/* Progress indicator (desktop only, no reduced motion) */}
      {!reduce && (
        <ProgressIndicator total={projects.length} activeIndex={activeIndex} />
      )}

      {/* Banner */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <ProjectsBanner
            title="Archivo de Proyectos"
            subtitle="Exploración técnica y creativa de soluciones de software"
          />

          {/* Animated horizontal line + scroll label */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <motion.div
              className="h-px bg-foreground/40 origin-left"
              style={{ width: 120 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="text-xs font-mono uppercase tracking-widest text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              Scroll para explorar
            </motion.span>
          </div>
        </div>
      </div>

      {/* Projects */}
      {reduce ? (
        /* Simple vertical list for reduced motion */
        <div className="container mx-auto px-4 pb-16 flex flex-col gap-8">
          {projects.map((project) => (
            <SimpleCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        /* Sticky stack */
        <div ref={stackRef}>
          {projects.map((project, i) => (
            <StackCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </div>
      )}

      {/* CTA */}
      <CTA />

    </div>
  )
}
