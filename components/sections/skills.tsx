import { skillCategories } from "@/data/skills"
import { theme } from "@/theme"

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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
          Habilidades Técnicas
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Tecnologías y herramientas con las que trabajo día a día para crear soluciones de calidad.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="sketch-box p-6 bg-card hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              <h3 className="text-xl font-semibold mb-6 font-[family-name:var(--font-caveat)] text-2xl">
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => {
                  const Icon = skill.icon
                  return (
                    <div key={skillIdx} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-medium truncate">{skill.name}</span>
                        </div>
                        <span className={`text-xs font-medium ${getLevelColor(skill.level)}`}>
                          {theme.skillLevels[skill.level]}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
