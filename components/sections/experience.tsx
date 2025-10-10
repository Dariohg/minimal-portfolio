import { experiences } from "@/data/experience"
import { Briefcase, Code } from "lucide-react"

export function Experience() {
  const getIcon = (type: string) => {
    return type === "freelance" ? <Code className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />
  }

  return (
    <section id="experiencia" className="container mx-auto px-4 sm:px-6 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
          Experiencia Profesional
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Mi trayectoria profesional y los logros más importantes en cada etapa.
        </p>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="sketch-box p-6 bg-card hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              <div className="flex items-start gap-4">
                <div className="sketch-circle p-3 bg-muted flex-shrink-0">{getIcon(exp.type)}</div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold font-[family-name:var(--font-caveat)] text-2xl">{exp.role}</h3>
                    <span className="text-sm text-muted-foreground font-[family-name:var(--font-caveat)]">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-lg font-medium mb-2">{exp.company}</p>
                  <p className="text-muted-foreground mb-4">{exp.description}</p>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achievementIdx) => (
                      <li key={achievementIdx} className="flex items-start gap-2 text-sm">
                        <span className="text-foreground mt-1">•</span>
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
