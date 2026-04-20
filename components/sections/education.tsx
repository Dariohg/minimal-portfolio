'use client'

import { motion } from 'framer-motion'
import { education } from '@/data/education'
import { GraduationCap, Award, BookOpen, Sparkles } from 'lucide-react'
import { CredlyBadgeModal } from '@/components/CredlyBadgeModal'
import { TextReveal } from '@/components/ui/text-reveal'

// ─── Helpers ───────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-60px' as const }

function fmtPeriod(p: string) {
  // "2022 - 2025" → "//2022-2025"
  return '//' + p.replace(/\s*-\s*/g, '-')
}

// ─── Decorative X ──────────────────────────────────────────────────────────────
function GraffitiX() {
  return (
    <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden
      className="text-primary"
      style={{ opacity: 0.07, transform: 'rotate(-12deg)' }}
    >
      <line x1="0" y1="0" x2="16" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="0" x2="0" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Component ─────────────────────────────────────────────────────────────────
export function Education() {
  const degrees        = education.filter((e) => e.type === 'degree')
  const certifications = education.filter((e) => e.type === 'certification')
  const courses        = education.filter((e) => e.type === 'course')

  return (
    <section
      id="educacion"
      className="container mx-auto px-4 sm:px-6 py-20 md:py-32 bg-muted/30 graffiti-bg relative"
    >
      {/* Corner decoration */}
      <div className="absolute top-10 right-8 pointer-events-none" aria-hidden>
        <GraffitiX />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <div className="mb-16">
          {/* "ARCHIVO DE" label */}
          <div className="animate-flicker mb-1">
            <p className="text-xs font-mono uppercase tracking-widest text-secondary">
              ARCHIVO DE
            </p>
          </div>

          {/* h2 — neon-magenta + keep TextReveal */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block overflow-hidden neon-magenta">
            <TextReveal text="Trayectoria & Aprendizaje" />
          </h2>

          {/* Subtitle — keep TextReveal */}
          <div className="text-muted-foreground/70 max-w-2xl text-lg">
            <TextReveal
              text="Un recorrido por mi formación académica, certificaciones profesionales y las habilidades que sigo perfeccionando día a día."
              delay={0.2}
            />
          </div>

          {/* graffiti-line reveal */}
          <motion.div
            className="graffiti-line mt-4 max-w-sm"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative">

          {/* ── LEFT COLUMN — sticky ── */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-8">

              {/* Formación Base */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-secondary" />
                  <h3 className="font-bold uppercase tracking-wider text-sm text-primary/80">
                    Educación Formal
                  </h3>
                </div>

                {degrees.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-card relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                    style={{
                      border: '1px solid var(--border)',
                      borderLeft: '3px solid var(--secondary)',
                      borderRadius: '255px 8px 225px 8px / 8px 225px 8px 255px',
                    }}
                  >
                    {/* Hover glow circle — keep original */}
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />

                    <div className="p-6 relative z-10">
                      <h4 className="font-bold font-[family-name:var(--font-caveat)] text-2xl mb-1 neon-cyan">
                        {item.degree}
                      </h4>
                      <p className="text-sm font-medium text-foreground/80">{item.institution}</p>
                      <p className="text-xs font-mono text-primary/60 mt-2">
                        {fmtPeriod(item.period)}
                      </p>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Protocolo de Mejora Continua (decorative block) */}
              <div
                className="hidden lg:block p-6 bg-card/80 sketch-border hextech-glow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-12 h-12 text-secondary" />
                </div>

                <p className="text-xs font-mono text-secondary/60 uppercase tracking-wider mb-2">
                  // PROTOCOLO DE MEJORA CONTINUA
                </p>
                <p className="text-sm text-muted-foreground text-balance mb-4 leading-relaxed">
                  "El software no se detiene, y yo tampoco. Mi enfoque es la mejora continua y la adaptación a nuevas arquitecturas."
                </p>

                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-primary/10 rounded-none overflow-hidden">
                    <div
                      className="h-full w-3/4 animate-pulse"
                      style={{
                        background: 'linear-gradient(90deg, var(--secondary), var(--primary))',
                      }}
                    />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/60">
                    ACTUALIZANDO MÓDULOS...
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN — scrollable ── */}
          <div className="lg:w-2/3 space-y-12">

            {/* Certificaciones */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-secondary" />
                <h3 className="font-bold uppercase tracking-wider text-sm text-primary/80">
                  Certificaciones
                </h3>
              </div>
              <p className="text-xs font-mono text-primary/50 uppercase tracking-wider mb-5">
                // INSIGNIAS DE MISIÓN COMPLETADA
              </p>

              {/* graffiti-line after label */}
              <div className="graffiti-line mb-6" style={{ opacity: 0.3 }} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-card hover:shadow-md transition-all duration-300 flex flex-col h-full"
                    style={{
                      border: '1px solid var(--border)',
                      borderLeft: '3px solid var(--primary)',
                    }}
                  >
                    <div className="flex-1 p-5">
                      <h4 className="font-semibold mb-2 text-lg leading-tight font-[family-name:var(--font-caveat)] text-foreground">
                        {item.degree}
                      </h4>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="sketch-border text-xs text-secondary font-mono px-2 py-0.5">
                          {item.institution}
                        </span>
                        <span className="text-xs font-mono text-primary/50">
                          {fmtPeriod(item.period)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-muted-foreground/60 line-clamp-2 mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Credential button */}
                    <div
                      className="px-5 py-3 mt-auto"
                      style={{ borderTop: '1px dashed var(--border)' }}
                    >
                      {item.badgeId ? (
                        <div className="flex justify-end">
                          <CredlyBadgeModal
                            badgeId={item.badgeId}
                            degree={item.degree}
                            description={item.description}
                          />
                        </div>
                      ) : (
                        <p className="text-xs font-mono text-muted-foreground/30 text-right">
                          [CREDENCIAL NO DISPONIBLE]
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cursos */}
            {courses.length > 0 && (
              <div>
                {/* graffiti-line separator before courses */}
                <div className="graffiti-line mb-8" style={{ opacity: 0.3 }} />

                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <h3 className="font-bold uppercase tracking-wider text-sm text-primary/80">
                    Cursos Especializados
                  </h3>
                </div>
                <p className="text-xs font-mono text-primary/50 uppercase tracking-wider mb-5">
                  // MÓDULOS DE ENTRENAMIENTO ADICIONAL
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {courses.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-card/50 hover:bg-accent/5 transition-colors group"
                      style={{ border: '1px solid var(--border)' }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-accent font-mono text-sm shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform duration-200">
                          {'>'}
                        </span>
                        <div>
                          <h4 className="font-medium text-sm text-foreground">{item.degree}</h4>
                          <p className="text-xs text-muted-foreground/50">{item.institution}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-primary/60 bg-muted/50 px-2 py-0.5 shrink-0 ml-4">
                        {fmtPeriod(item.period)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
