'use client'

import { education } from "@/data/education"
import { GraduationCap, Award, BookOpen, Sparkles, ExternalLink } from "lucide-react"
import { CredlyBadgeModal } from "@/components/CredlyBadgeModal"
import { TextReveal } from "@/components/ui/text-reveal"

export function Education() {
  const degrees = education.filter((e) => e.type === "degree")
  const certifications = education.filter((e) => e.type === "certification")
  const courses = education.filter((e) => e.type === "course")

  return (
      <section id="educacion" className="container mx-auto px-4 sm:px-6 py-20 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block overflow-hidden">
              <TextReveal text="Trayectoria & Aprendizaje" />
            </h2>

            <div className="text-muted-foreground max-w-2xl text-lg">
              <TextReveal
                  text="Un recorrido por mi formación académica, certificaciones profesionales y las habilidades que sigo perfeccionando día a día."
                  delay={0.2}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative">

            {/* COLUMNA IZQUIERDA (Sticky) */}
            <div className="lg:w-1/3">
              <div className="sticky top-24 space-y-8">

                {/* Bloque Educación Formal */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4 text-primary/80">
                    <GraduationCap className="w-5 h-5" />
                    <h3 className="font-bold uppercase tracking-wider text-sm">Educación Formal</h3>
                  </div>

                  {degrees.map((item, idx) => (
                      <div key={idx} className="sketch-box p-6 bg-card border-2 border-primary/5 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500" />

                        <h4 className="font-bold font-[family-name:var(--font-caveat)] text-2xl mb-1 relative z-10">
                          {item.degree}
                        </h4>
                        <p className="text-sm font-medium text-foreground/80 relative z-10">{item.institution}</p>
                        <p className="text-xs text-muted-foreground mt-2 font-mono bg-muted inline-block px-2 py-0.5 rounded-md relative z-10">
                          {item.period}
                        </p>
                        {item.description && (
                            <p className="text-sm text-muted-foreground mt-3 leading-relaxed relative z-10">
                              {item.description}
                            </p>
                        )}
                      </div>
                  ))}
                </div>

                {/* ELEMENTO CREATIVO */}
                <div className="hidden lg:block p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>

                  <h4 className="font-bold text-lg mb-2 font-[family-name:var(--font-caveat)]">Mindset de Crecimiento</h4>
                  <p className="text-sm text-muted-foreground text-balance mb-4">
                    "El software no se detiene, y yo tampoco. Mi enfoque es la mejora continua y la adaptación a nuevas arquitecturas."
                  </p>

                  {/* Barra de progreso decorativa */}
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full animate-pulse" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">Cargando...</span>
                  </div>
                </div>

              </div>
            </div>

            {/* COLUMNA DERECHA (Scrollable) */}
            <div className="lg:w-2/3 space-y-12">

              {/* Bloque Certificaciones */}
              <div>
                <div className="flex items-center gap-2 mb-6 text-primary/80">
                  <Award className="w-5 h-5" />
                  <h3 className="font-bold uppercase tracking-wider text-sm">Certificaciones</h3>
                </div>

                {/* Grid de 2 columnas para compactar la altura */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certifications.map((item, idx) => (
                      <div
                          key={idx}
                          className="sketch-box p-5 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col h-full"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2 text-lg leading-tight font-[family-name:var(--font-caveat)]">
                            {item.degree}
                          </h4>
                          <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                    {item.institution}
                                </span>
                            <span className="text-xs text-muted-foreground font-mono">
                                    {item.period}
                                </span>
                          </div>
                          {item.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                {item.description}
                              </p>
                          )}
                        </div>

                        {/* Botón para el modal */}
                        <div className="pt-2 mt-auto border-t border-dashed border-border">
                          {item.badgeId ? (
                              <div className="w-full flex justify-end">
                                <CredlyBadgeModal
                                    badgeId={item.badgeId}
                                    degree={item.degree}
                                    description={item.description}
                                />
                              </div>
                          ) : (
                              <div className="mt-2 text-xs text-muted-foreground flex items-center justify-end gap-1 opacity-50 cursor-not-allowed py-1">
                                Ver Credencial <ExternalLink className="w-3 h-3" />
                              </div>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>

              {/* Bloque Cursos */}
              {courses.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-6 text-primary/80">
                      <BookOpen className="w-5 h-5" />
                      <h3 className="font-bold uppercase tracking-wider text-sm">Cursos Especializados</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {courses.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors hover:translate-x-1 transition-transform">
                            <div>
                              <h4 className="font-medium text-sm">{item.degree}</h4>
                              <p className="text-xs text-muted-foreground">{item.institution}</p>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                                    {item.period}
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