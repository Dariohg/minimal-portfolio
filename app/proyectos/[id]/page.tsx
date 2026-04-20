'use client'

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

// ─── BannerTextLoop ────────────────────────────────────────────────────────────

const BannerTextLoop = ({ text }: { text: string }) => {
  const repeatedText = `${text} • ${text} • ${text} • `

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
      {/* Scrolling background text */}
      <motion.div
        className="flex items-center whitespace-nowrap absolute top-1/2 -translate-y-1/2"
        style={{ width: '200%' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 15, ease: 'linear' } }}
      >
        <span className="text-9xl md:text-10xl lg:text-11xl font-bold font-[family-name:var(--font-caveat)] uppercase tracking-widest px-4"
          style={{ color: 'oklch(0.72 0.28 320 / 0.06)' }}>
          {repeatedText}
        </span>
        <span className="text-9xl md:text-10xl lg:text-11xl font-bold font-[family-name:var(--font-caveat)] uppercase tracking-widest px-4"
          style={{ color: 'oklch(0.72 0.28 320 / 0.06)' }}>
          {repeatedText}
        </span>
      </motion.div>

      {/* Floating circles */}
      <motion.div
        className="absolute w-16 h-16 rounded-full"
        style={{ border: '2px solid oklch(0.65 0.25 195 / 0.3)', top: '15%', left: '10%' }}
        animate={{ y: [0, -25, 0], rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{ border: '2px solid oklch(0.65 0.25 195 / 0.2)', bottom: '10%', right: '8%' }}
        animate={{ y: [0, 25, 0], rotate: [360, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-10 h-10 rounded-lg"
        style={{ background: 'oklch(0.72 0.28 320 / 0.15)', top: '25%', right: '15%' }}
        animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Main centered title */}
      <div className="relative z-10 text-center pointer-events-none flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-caveat)] uppercase neon-cyan sketch-underline">
            {text}
          </h2>
        </motion.div>
      </div>

      {/* Decorative lines below title */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-16 flex gap-3 justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.div
          className="w-8 h-1 rounded-full"
          style={{ background: 'oklch(0.72 0.28 320 / 0.35)' }}
          animate={{ scaleX: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{
            background:  'oklch(0.65 0.25 195 / 0.5)',
            boxShadow:   '0 0 8px oklch(0.65 0.25 195 / 0.6)',
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="w-8 h-1 rounded-full"
          style={{ background: 'oklch(0.72 0.28 320 / 0.35)' }}
          animate={{ scaleX: [1, 0.6, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
    </div>
  )
}

// ─── AnimatedBadge ─────────────────────────────────────────────────────────────

const AnimatedBadge = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 20, rotate: -5 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ delay, duration: 0.5, type: 'spring', stiffness: 100 }}
    whileHover={{ scale: 1.05, rotate: 2 }}
    className="px-4 py-2 sketch-border bg-primary/5 font-medium inline-block cursor-pointer transition-colors duration-200 hover:text-primary"
    style={{ borderColor: 'oklch(0.72 0.28 320 / 0.3)' }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textShadow = '0 0 8px oklch(0.72 0.28 320 / 0.5)' }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textShadow = 'none' }}
  >
    {children}
  </motion.span>
)

// ─── AnimatedSection ───────────────────────────────────────────────────────────

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, type: 'spring' }}
    viewport={{ once: true, margin: '-100px' }}
  >
    {children}
  </motion.div>
)

// ─── Card h2 style ─────────────────────────────────────────────────────────────

const cardHeadingStyle = {
  textShadow: '0 0 15px oklch(0.65 0.25 195 / 0.3)',
  color:       'oklch(0.65 0.25 195)',
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ProyectoDetallePage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)
  if (!project) notFound()

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background blobs */}
      <motion.div
        className="fixed -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'oklch(0.72 0.28 320 / 0.06)', filter: 'blur(80px)' }}
        animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="fixed -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'oklch(0.65 0.25 195 / 0.05)', filter: 'blur(80px)' }}
        animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-12 relative z-10">

        {/* Back button */}
        <AnimatedSection>
          <Link href="/proyectos">
            <Button
              variant="ghost"
              className="mb-8 sketch-border hextech-glow transition-all hover:text-primary"
              style={{ borderColor: 'oklch(0.72 0.28 320 / 0.4)' }}
            >
              <motion.span
                className="inline-flex items-center"
                whileHover="hover"
                initial="rest"
              >
                <motion.span
                  variants={{ rest: { x: 0 }, hover: { x: -3 } }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="mr-2 inline-flex"
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.span>
                Volver a proyectos
              </motion.span>
            </Button>
          </Link>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">

          {/* ── Header ── */}
          <AnimatedSection delay={0.1}>
            <div className="mb-12">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-xs font-mono uppercase tracking-widest text-secondary mb-2"
              >
                {`// ${project.category}`}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline neon-magenta">
                  {project.title}
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground/80 leading-relaxed"
              >
                {project.description}
              </motion.p>
            </div>
          </AnimatedSection>

          {/* ── Image / Banner ── */}
          <AnimatedSection delay={0.2}>
            <motion.div
              className="aspect-video overflow-hidden sketch-border-heavy mb-8 relative bg-muted/80"
              style={{
                borderColor: 'oklch(0.72 0.28 320 / 0.4)',
                boxShadow:   '0 0 30px oklch(0.72 0.28 320 / 0.1), inset 0 0 30px oklch(0.08 0.02 280 / 0.5)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 50px oklch(0.72 0.28 320 / 0.25), inset 0 0 30px oklch(0.08 0.02 280 / 0.5)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {project.image && typeof project.image === 'string' ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <BannerTextLoop text={project.title} />
              )}
            </motion.div>
          </AnimatedSection>

          {/* ── Action buttons ── */}
          {(project.links.live || project.links.demo || project.links.github) && (
            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap gap-4 mb-12">
                {(project.links.live || project.links.demo) && (
                  <motion.a
                    href={project.links.live || project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="sketch-border-heavy hextech-glow bg-primary text-primary-foreground font-semibold">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {project.links.live ? 'Ver Sitio en Vivo' : 'Ver Demo'}
                    </Button>
                  </motion.a>
                )}
                {project.links.github && (
                  <motion.a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="sketch-border transition-all duration-200"
                      style={{ borderColor: 'oklch(0.65 0.25 195 / 0.4)' }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color       = 'oklch(0.65 0.25 195)'
                        el.style.borderColor = 'oklch(0.65 0.25 195)'
                        el.style.boxShadow   = '0 0 12px oklch(0.65 0.25 195 / 0.25)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color       = ''
                        el.style.borderColor = 'oklch(0.65 0.25 195 / 0.4)'
                        el.style.boxShadow   = 'none'
                      }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Ver Código
                    </Button>
                  </motion.a>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* ── Description card ── */}
          <AnimatedSection delay={0.4}>
            <motion.div
              className="sketch-border-heavy p-6 md:p-8 bg-card mb-8 relative overflow-hidden group"
              style={{ borderLeft: '3px solid var(--primary)' }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-300"
                style={{ background: 'oklch(0.72 0.28 320 / 0.06)' }}
              />
              <h2
                className="text-3xl font-bold mb-4 font-[family-name:var(--font-caveat)] relative z-10"
                style={cardHeadingStyle}
              >
                Descripción del Proyecto
              </h2>
              <p className="text-muted-foreground/80 leading-relaxed relative z-10">
                {project.longDescription}
              </p>
            </motion.div>
          </AnimatedSection>

          {/* ── Tech stack card ── */}
          <AnimatedSection delay={0.5}>
            <motion.div
              className="sketch-border-heavy p-6 md:p-8 bg-card mb-8 relative overflow-hidden group"
              style={{ borderLeft: '3px solid var(--primary)' }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className="absolute bottom-0 left-0 w-32 h-32 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-all duration-300"
                style={{ background: 'oklch(0.72 0.28 320 / 0.06)' }}
              />
              <h2
                className="text-3xl font-bold mb-6 font-[family-name:var(--font-caveat)] relative z-10 flex items-center gap-2"
                style={cardHeadingStyle}
              >
                <Sparkles className="w-6 h-6 text-secondary" />
                Tecnologías Utilizadas
              </h2>
              <div className="flex flex-wrap gap-3 relative z-10">
                {project.stack.map((tech, idx) => (
                  <AnimatedBadge key={idx} delay={0.05 * idx}>
                    {tech}
                  </AnimatedBadge>
                ))}
              </div>
            </motion.div>
          </AnimatedSection>

          {/* ── Contribution card ── */}
          <AnimatedSection delay={0.6}>
            <motion.div
              className="sketch-border-heavy p-6 md:p-8 bg-card relative overflow-hidden group"
              style={{ borderLeft: '3px solid var(--primary)' }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className="absolute top-0 left-1/2 w-32 h-32 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-all duration-300"
                style={{ background: 'oklch(0.72 0.28 320 / 0.06)' }}
              />
              <h2
                className="text-3xl font-bold mb-4 font-[family-name:var(--font-caveat)] relative z-10"
                style={cardHeadingStyle}
              >
                Mi Contribución
              </h2>
              <p className="text-muted-foreground/80 leading-relaxed relative z-10">
                {project.contribution}
              </p>
            </motion.div>
          </AnimatedSection>

        </div>
      </div>
    </div>
  )
}
