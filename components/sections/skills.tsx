'use client'

import { skillCategories } from "@/data/skills"
import { theme } from "@/theme"
import { FadeInStagger, FadeInItem } from "@/components/ui/fade-in-stagger"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { TextReveal } from "@/components/ui/text-reveal"

export function Skills() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "expert":
        return "text-green-600 dark:text-green-400"
      case "advanced":
        return "text-blue-600 dark:text-blue-400"
      case "intermediate":
        return "text-yellow-600 dark:text-yellow-400"
      case "beginner":
        return "text-orange-600 dark:text-orange-400"
      default:
        return "text-muted-foreground"
    }
  }

  return (
      <section id="habilidades" className="container mx-auto px-4 sm:px-6 py-20 md:py-32 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block overflow-hidden">
              <TextReveal text="Arsenal Tecnológico" />
            </h2>
            <div className="text-muted-foreground text-lg">
              <TextReveal text="Herramientas y tecnologías que domino para construir soluciones robustas." delay={0.2} />
            </div>
          </div>

          {/* Usamos FadeInStagger para animar la entrada de las categorías */}
          <FadeInStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, idx) => (
                <FadeInItem key={idx} className="h-full">
                  {/* Usamos SpotlightCard para el efecto hover cool */}
                  <SpotlightCard className="sketch-box p-6 h-full hover:translate-y-[-4px] transition-transform">
                    <h3 className="text-xl font-semibold mb-6 font-[family-name:var(--font-caveat)] text-2xl border-b border-border/50 pb-2">
                      {category.category}
                    </h3>
                    <div className="space-y-5">
                      {category.skills.map((skill, skillIdx) => {
                        const Icon = skill.icon
                        return (
                            <div key={skillIdx} className="flex items-start gap-3 group/skill">
                              <div className="mt-1 flex-shrink-0 text-muted-foreground group-hover/skill:text-primary transition-colors">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-sm font-medium truncate group-hover/skill:text-primary transition-colors">
                                        {skill.name}
                                    </span>
                                </div>
                                <span className={`text-[10px] uppercase tracking-wider font-medium ${getLevelColor(skill.level)}`}>
                                    {theme.skillLevels[skill.level]}
                                    </span>
                              </div>
                            </div>
                        )
                      })}
                    </div>
                  </SpotlightCard>
                </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>
  )
}