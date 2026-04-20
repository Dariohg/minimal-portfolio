'use client'

import Link from "next/link"
import { featuredProjects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion"
import { ProjectCardBanner } from "@/components/ui/project-card-banner"
import { ProjectsBanner } from "@/components/ui/projects-banner"
import { ArrowRight, Github, ExternalLink } from "lucide-react"

type Project = (typeof featuredProjects)[number]

const VERT_MARGIN = 8   // vh from top/bottom (card sits at top: 8vh)
const CARD_HEIGHT = 100 - VERT_MARGIN * 2  // 84vh
const COLLAPSE_RANGE = 3500  // px — how long to fully collapse

// ─── Sticky project card (Skiper34-style) ─────────────────────────────────────

function StickyProjectCard({ project, index }: { project: Project; index: number }) {
  const container  = useRef<HTMLDivElement>(null)
  const [maxScrollY, setMaxScrollY] = useState(Infinity)

  const rotation = useMotionValue(0)
  const scale    = useMotionValue(1)
  const negRot   = useTransform(rotation, v => -v)

  // scrollY tracks absolute window scroll (target only affects scrollYProgress)
  const { scrollY } = useScroll()

  // fires once when the card's top edge reaches VERT_MARGIN% from viewport top
  const isInView = useInView(container, {
    margin: `0px 0px -${100 - VERT_MARGIN}% 0px`,
    once: true,
  })

  // collapse animation driven by how far past capture point we are
  useEffect(() => {
    return scrollY.on("change", (y) => {
      if (y > maxScrollY) {
        const progress = Math.max(0, 1 - (y - maxScrollY) / COLLAPSE_RANGE)
        scale.set(progress)
        rotation.set((1 - progress) * 12)
      } else {
        scale.set(1)
        rotation.set(0)
      }
    })
  }, [maxScrollY, scale, rotation, scrollY])

  // capture scroll position when card first reaches its sticky resting spot
  useEffect(() => {
    if (isInView) setMaxScrollY(scrollY.get())
  }, [isInView, scrollY])

  const accentColors = [
    {
      text:   'oklch(0.65 0.25 195)',
      border: 'oklch(0.65 0.25 195 / 0.55)',
      glow:   'oklch(0.65 0.25 195 / 0.12)',
    },
    {
      text:   'oklch(0.72 0.28 320)',
      border: 'oklch(0.72 0.28 320 / 0.55)',
      glow:   'oklch(0.72 0.28 320 / 0.12)',
    },
  ]
  const a = accentColors[index % accentColors.length]

  return (
    <motion.div
      ref={container}
      className="sticky"
      style={{
        scale,
        rotate:       rotation,
        top:          `${VERT_MARGIN}vh`,
        height:       `${CARD_HEIGHT}vh`,
        zIndex:       index + 1,
        borderRadius: '1.5rem',
        willChange:   'transform',
      }}
    >
      {/* counter-rotate inner content so text stays level */}
      <motion.div style={{ rotate: negRot }} className="w-full h-full">
        <div
          className="w-full h-full flex flex-col md:flex-row overflow-hidden"
          style={{
            background:   'var(--card)',
            border:       `1px solid ${a.border}`,
            borderLeft:   `4px solid ${a.text}`,
            borderRadius: '1.5rem',
            boxShadow:    `0 0 0 1px ${a.border}, 0 28px 64px oklch(0 0 0 / 0.45)`,
          }}
        >
          {/* ── Left: text ── */}
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:p-16 gap-5 w-full md:w-[55%] overflow-hidden">

            {/* Background number */}
            <span
              className="absolute bottom-0 left-3 text-[20vw] font-bold font-[family-name:var(--font-caveat)] leading-none select-none pointer-events-none"
              style={{ color: a.glow }}
              aria-hidden
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Category badge */}
            <div className="relative flex items-center gap-3">
              <div className="h-px w-8 shrink-0" style={{ background: a.text }} />
              <span
                className="text-xs font-mono uppercase tracking-widest"
                style={{
                  color:        a.text,
                  border:       `1px solid ${a.border}`,
                  padding:      '1px 8px',
                  borderRadius: '2px',
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3
              className="relative text-3xl sm:text-4xl xl:text-5xl font-bold font-[family-name:var(--font-caveat)] leading-tight"
              style={{ color: a.text, textShadow: `0 0 24px ${a.text}` }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p className="relative text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Stack tags */}
            <div className="relative flex flex-wrap gap-2">
              {project.stack.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-background/60 text-xs font-mono text-muted-foreground"
                  style={{
                    border:       `1px solid ${a.border.replace('0.55)', '0.2)')}`,
                    borderRadius: '2px',
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 5 && (
                <span
                  className="px-3 py-1 text-xs font-mono"
                  style={{
                    color:        a.text,
                    border:       `1px solid ${a.border.replace('0.55)', '0.15)')}`,
                    borderRadius: '2px',
                  }}
                >
                  +{project.stack.length - 5}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="relative flex flex-wrap items-center gap-3 pt-1">
              <Link href={`/proyectos/${project.id}`}>
                <Button
                  className="sketch-border-heavy h-11 px-6 bg-primary text-primary-foreground font-semibold"
                  style={{ boxShadow: `0 0 14px ${a.text}` }}
                >
                  Ver Detalles
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>

              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="sketch-border w-11 h-11"
                    style={{ borderColor: a.border, color: a.text }}
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
                    className="sketch-border w-11 h-11"
                    style={{ borderColor: a.border, color: a.text }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* ── Right: visual banner (desktop only) ── */}
          <div
            className="relative hidden md:block w-[45%] overflow-hidden shrink-0"
            style={{
              clipPath:   'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
              marginLeft: '-3%',
              borderLeft: `1px dashed ${a.border.replace('0.55)', '0.12)')}`,
            }}
          >
            <ProjectCardBanner title={project.title} />
            {/* accent radial overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, ${a.glow} 0%, transparent 70%)` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Projects section ─────────────────────────────────────────────────────────

export function Projects() {
  return (
    <section id="proyectos" className="overflow-hidden">
      {/* Banner header */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-[8vh]">
        <div className="max-w-6xl mx-auto">
          <ProjectsBanner
            title="Proyectos Destacados"
            subtitle="Una selección de mis trabajos más recientes."
          />
        </div>
      </div>

      {/* Sticky card stack */}
      <div
        className="px-4 sm:px-6 lg:px-12 xl:px-20 flex flex-col"
        style={{ gap: '10vh', paddingBottom: '20vh' }}
      >
        {featuredProjects.map((project, i) => (
          <StickyProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/proyectos">
            <Button size="lg" className="sketch-box font-[family-name:var(--font-caveat)] text-lg">
              Ver Todos los Proyectos
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
