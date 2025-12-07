'use client'

import { experiences } from "@/data/experience"
import { Briefcase, Code } from "lucide-react"
import { ScrollScrub } from "@/components/ui/scroll-scrub" // <--- Importar

export function Experience() {
  const getIcon = (type: string) => {
    return type === "freelance" ? <Code className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />
  }

  return (
      <section id="experiencia" className="container mx-auto px-4 sm:px-6 py-20 md:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto">

          <ScrollScrub direction="down" distance={50}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
              Experiencia Profesional
            </h2>
          </ScrollScrub>

          <ScrollScrub direction="up" distance={50}>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Mi trayectoria profesional y los logros más importantes en cada etapa.
            </p>
          </ScrollScrub>

          <div className="space-y-8 relative">
            {/* Línea conectora sutil (opcional) */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border/50 hidden sm:block" />

            {experiences.map((exp, idx) => {
              // Alternar dirección de entrada: Pares izquierda, Impares derecha
              // O mejor aún: Todos entran desde abajo pero con "Zoom" sutil para que se sienta que vienen hacia ti
              return (
                  <ScrollScrub
                      key={idx}
                      direction={idx % 2 === 0 ? "right" : "left"}
                      distance={100}
                      className="relative z-10"
                  >
                    <div className="sketch-box p-6 bg-card hover:border-primary/50 transition-colors group">
                      <div className="flex items-start gap-4">
                        <div className="sketch-circle p-3 bg-muted flex-shrink-0 text-primary group-hover:scale-110 transition-transform duration-300">
                          {getIcon(exp.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h3 className="text-xl font-semibold font-[family-name:var(--font-caveat)] text-2xl group-hover:text-primary transition-colors">
                              {exp.role}
                            </h3>
                            <span className="text-sm text-muted-foreground font-[family-name:var(--font-caveat)] bg-muted px-3 py-1 rounded-full">
                                    {exp.period}
                                    </span>
                          </div>
                          <p className="text-lg font-medium mb-2">{exp.company}</p>
                          <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, achievementIdx) => (
                                <li key={achievementIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </ScrollScrub>
              )
            })}
          </div>
        </div>
      </section>
  )
}