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
} from "framer-motion"
import Lenis from 'lenis'
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github, ArrowRight } from "lucide-react"
import { ProjectsBanner } from "@/components/ui/projects-banner"
import { ProjectCardBanner } from "@/components/ui/project-card-banner"

type ProjectType = (typeof projects)[number]

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-60px' as const }

// ─── Progress Indicator ────────────────────────────────────────────────────────

function ProgressIndicator({ total, activeIndex }: { total: number; activeIndex: number }) {
  const lineHeight = (total - 1) * 64 + 20
  return (
    <div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="relative" style={{ height: lineHeight }}>
        <div className="absolute top-2.5 bottom-2.5 right-[5px] w-px bg-primary/20" />
        {Array.from({ length: total }).map((_, i) => {
          const pct      = total === 1 ? 0 : (i / (total - 1)) * 100
          const isActive = activeIndex === i
          return (
            <div
              key={i}
              className="absolute flex items-center gap-2.5"
              style={{ top: `${pct}%`, transform: 'translateY(-50%)', right: 0 }}
            >
              <span
                className="text-[10px] font-mono tabular-nums transition-all duration-400"
                style={{
                  opacity:    isActive ? 1 : 0.3,
                  fontWeight: isActive ? 700 : 400,
                  color:      isActive ? 'oklch(0.65 0.25 195)' : undefined,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div
                className="relative z-10 rounded-full transition-all duration-400"
                style={{
                  width:      isActive ? 8 : 5,
                  height:     isActive ? 8 : 5,
                  opacity:    isActive ? 1 : 0.35,
                  background: isActive ? 'oklch(0.65 0.25 195)' : 'oklch(0.55 0.04 280)',
                  boxShadow:  isActive ? '0 0 6px oklch(0.65 0.25 195 / 0.8)' : 'none',
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Stack Card ────────────────────────────────────────────────────────────────

function StackCard({ project, index, total }: { project: ProjectType; index: number; total: number }) {
  const router     = useRouter()
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset:  ['start start', 'end start'],
  })

  const isLast      = index === total - 1
  const scaleValue  = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const opacityValue = useTransform(scrollYProgress, [0, 1], [1, 0.72])
  const yValue      = useTransform(scrollYProgress, [0, 1], [0, -18])
  const stickyTop   = 80 + index * 20

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
          top:      stickyTop,
          height:   '80vh',
          zIndex:   index + 1,
          scale:    isLast ? 1 : scaleValue,
          opacity:  isLast ? 1 : opacityValue,
          y:        isLast ? 0 : yValue,
        }}
        className="px-4 sm:px-6 lg:px-16 xl:px-24"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div
          ref={cardRef}
          className={`w-full h-full max-w-7xl mx-auto bg-card overflow-hidden flex relative transition-shadow duration-300 ${isHovered ? 'hextech-glow' : ''}`}
          style={{
            border:     '1px solid oklch(0.25 0.06 280 / 0.5)',
            borderLeft: '4px solid var(--primary)',
            borderRadius: '4px',
            boxShadow:  isHovered
              ? '0 0 30px oklch(0.72 0.28 320 / 0.2), 8px 8px 0px 0px oklch(0.72 0.28 320 / 0.4)'
              : 'none',
          }}
        >
          {/* Giant background number */}
          <motion.span
            className="absolute bottom-0 left-2 text-[20vw] font-bold font-[family-name:var(--font-caveat)] leading-none z-0 select-none pointer-events-none"
            style={{ color: 'oklch(0.72 0.28 320 / 0.04)' }}
            animate={{ scale: isHovered ? 1.04 : 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>

          {/* ── Left column (55%) ── */}
          <div className="relative z-10 w-full md:w-[55%] flex flex-col justify-center p-6 sm:p-10 lg:p-14 gap-5 overflow-hidden">
            {/* Category */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 shrink-0" style={{ background: 'oklch(0.65 0.25 195 / 0.6)' }} />
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{ color: 'oklch(0.65 0.25 195)', border: '1px solid oklch(0.65 0.25 195 / 0.4)', padding: '1px 8px', borderRadius: '2px' }}
              >
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`text-3xl sm:text-4xl xl:text-6xl font-bold font-[family-name:var(--font-caveat)] leading-tight transition-all duration-300 ${isHovered ? 'neon-cyan' : 'text-foreground'}`}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base line-clamp-2">
              {project.description}
            </p>

            {/* Stack tags */}
            <div className="flex flex-wrap gap-2">
              {project.stack.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-background/60 text-xs font-mono transition-colors duration-200 hover:text-primary"
                  style={{
                    border: '1px solid oklch(0.72 0.28 320 / 0.2)',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.72 0.28 320 / 0.5)'
                    ;(e.currentTarget as HTMLElement).style.textShadow = '0 0 8px oklch(0.72 0.28 320 / 0.4)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.72 0.28 320 / 0.2)'
                    ;(e.currentTarget as HTMLElement).style.textShadow = 'none'
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 5 && (
                <span className="px-3 py-1 text-xs font-mono text-secondary" style={{ border: '1px solid oklch(0.65 0.25 195 / 0.2)', borderRadius: '2px' }}>
                  +{project.stack.length - 5}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <Button
                  className="sketch-border-heavy hextech-glow h-11 px-6 bg-primary text-primary-foreground font-semibold"
                  onClick={() => handleDetailNav(`/proyectos/${project.id}`)}
                >
                  Ver Detalles
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="sketch-border w-11 h-11 transition-all duration-200"
                    style={{ borderColor: 'oklch(0.65 0.25 195 / 0.3)', color: 'oklch(0.65 0.25 195)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.65 0.25 195)'
                      ;(e.currentTarget as HTMLElement).style.textShadow = '0 0 8px oklch(0.65 0.25 195 / 0.5)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.65 0.25 195 / 0.3)'
                      ;(e.currentTarget as HTMLElement).style.textShadow = 'none'
                    }}
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
                    className="sketch-border w-11 h-11 transition-all duration-200"
                    style={{ borderColor: 'oklch(0.65 0.25 195 / 0.3)', color: 'oklch(0.65 0.25 195)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.65 0.25 195)'
                      ;(e.currentTarget as HTMLElement).style.textShadow = '0 0 8px oklch(0.65 0.25 195 / 0.5)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.65 0.25 195 / 0.3)'
                      ;(e.currentTarget as HTMLElement).style.textShadow = 'none'
                    }}
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
              clipPath:    'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
              marginLeft:  '-3%',
              borderLeft:  '1px dashed oklch(0.72 0.28 320 / 0.15)',
            }}
          >
            <div className="w-full h-full">
              <ProjectCardBanner title={project.title} />
            </div>

            {/* Hover overlay */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center p-8 lg:p-10 gap-5"
              style={{
                pointerEvents: isHovered ? 'auto' : 'none',
                background: 'oklch(0.08 0.02 280 / 0.96)',
                backdropFilter: 'blur(4px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <h3 className="text-2xl font-bold font-[family-name:var(--font-caveat)] neon-cyan leading-tight line-clamp-2">
                {project.title}
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed line-clamp-5">
                {project.longDescription}
              </p>

              <div className="flex flex-col gap-2.5">
                {overlayButtons.map((btn, i) => (
                  <motion.div
                    key={btn.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.3, delay: isHovered ? i * 0.06 : 0, ease: EASE }}
                  >
                    {btn.internal ? (
                      <Button
                        className="w-full sketch-border-heavy bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                        onClick={() => handleDetailNav(btn.href)}
                      >
                        {btn.label}
                      </Button>
                    ) : (
                      <a href={btn.href} target="_blank" rel="noopener noreferrer" className="block">
                        <Button
                          variant="outline"
                          className="w-full sketch-border"
                          style={{ borderColor: 'oklch(0.65 0.25 195 / 0.4)', color: 'oklch(0.65 0.25 195)' }}
                        >
                          {!btn.internal && <btn.icon className="w-4 h-4 mr-2" />}
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

// ─── Simple Card (reduced motion fallback) ─────────────────────────────────────

function SimpleCard({ project }: { project: ProjectType }) {
  return (
    <div
      className="w-full bg-card overflow-hidden flex flex-col md:flex-row"
      style={{ border: '1px solid oklch(0.25 0.06 280 / 0.5)', borderLeft: '4px solid var(--primary)' }}
    >
      <div className="w-full md:w-[55%] flex flex-col justify-center p-8 md:p-12 gap-5">
        <div className="flex items-center gap-3">
          <div className="h-px w-8 shrink-0" style={{ background: 'oklch(0.65 0.25 195 / 0.6)' }} />
          <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'oklch(0.65 0.25 195)' }}>
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
              className="px-3 py-1 bg-background/60 text-xs font-mono"
              style={{ border: '1px solid oklch(0.72 0.28 320 / 0.2)', borderRadius: '2px' }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link href={`/proyectos/${project.id}`}>
            <Button className="sketch-border-heavy hextech-glow h-11 px-6 bg-primary text-primary-foreground font-semibold">
              Ver Detalles <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="sketch-border w-11 h-11" style={{ borderColor: 'oklch(0.65 0.25 195 / 0.3)', color: 'oklch(0.65 0.25 195)' }}>
                <Github className="w-4 h-4" />
              </Button>
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="sketch-border w-11 h-11" style={{ borderColor: 'oklch(0.65 0.25 195 / 0.3)', color: 'oklch(0.65 0.25 195)' }}>
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

// ─── CTA ───────────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <section className="container mx-auto px-4 py-32 text-center">
      <div className="max-w-2xl mx-auto pt-20" style={{ borderTop: '1px dashed oklch(0.72 0.28 320 / 0.2)' }}>
        {/* Graffiti line */}
        <div className="flex justify-center mb-8">
          <motion.div
            className="graffiti-line"
            style={{ width: 200, transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>

        <div className="overflow-hidden mb-10">
          <motion.h3
            className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-caveat)] font-bold neon-magenta"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 0.9, ease: EASE }}
            viewport={VP}
          >
            ¿Tienes un proyecto en mente?
          </motion.h3>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          viewport={{ once: true }}
        >
          <Link href="/#contacto">
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button
                size="lg"
                className="sketch-border-heavy hextech-glow h-16 px-12 text-xl bg-primary text-primary-foreground font-semibold"
              >
                Hablemos Ahora
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProyectosPage() {
  const reduce    = useReducedMotion()
  const stackRef  = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration:     1.2,
      easing:       (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:  'vertical',
      smoothWheel:  true,
    })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  const { scrollYProgress: stackProgress } = useScroll({
    target:  stackRef,
    offset:  ['start start', 'end end'],
  })
  useMotionValueEvent(stackProgress, 'change', (v) => {
    setActiveIndex(Math.min(Math.floor(v * projects.length), projects.length - 1))
  })

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-primary/10">

      {/* Back button */}
      <div className="fixed top-6 left-6 z-50 pointer-events-none">
        <Link href="/#proyectos" className="pointer-events-auto inline-block">
          <Button
            variant="outline"
            className="sketch-border hextech-glow bg-background/80 backdrop-blur shadow-lg hover:text-primary transition-all h-12 px-6"
            style={{ borderColor: 'oklch(0.72 0.28 320 / 0.5)' }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Inicio
          </Button>
        </Link>
      </div>

      {!reduce && (
        <ProgressIndicator total={projects.length} activeIndex={activeIndex} />
      )}

      {/* Banner */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section label */}
          <div className="animate-flicker mb-3">
            <p className="text-xs font-mono uppercase tracking-widest text-secondary">
              // ARCHIVO DE
            </p>
          </div>

          <ProjectsBanner
            title="Archivo de Proyectos"
            subtitle="Exploración técnica y creativa de soluciones de software"
          />

          {/* Graffiti line + scroll label */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <motion.div
              className="graffiti-line"
              style={{ width: 120, transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            />
            <motion.span
              className="text-xs font-mono uppercase tracking-widest text-secondary/50 animate-hextech-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              style={{ borderBottom: '1px solid oklch(0.65 0.25 195 / 0.3)', paddingBottom: '2px' }}
            >
              Scroll para explorar
            </motion.span>
          </div>
        </div>
      </div>

      {/* Projects */}
      {reduce ? (
        <div className="container mx-auto px-4 pb-16 flex flex-col gap-8">
          {projects.map((project) => (
            <SimpleCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
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

      <CTA />
    </div>
  )
}
