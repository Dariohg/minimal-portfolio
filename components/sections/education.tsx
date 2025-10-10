import { education } from "@/data/education"
import { GraduationCap, Award, BookOpen } from "lucide-react"

export function Education() {
  const getIcon = (type: string) => {
    switch (type) {
      case "degree":
        return <GraduationCap className="w-5 h-5" />
      case "certification":
        return <Award className="w-5 h-5" />
      case "course":
        return <BookOpen className="w-5 h-5" />
      default:
        return <GraduationCap className="w-5 h-5" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "degree":
        return "Educación Formal"
      case "certification":
        return "Certificación"
      case "course":
        return "Curso"
      default:
        return ""
    }
  }

  const degrees = education.filter((e) => e.type === "degree")
  const certifications = education.filter((e) => e.type === "certification")
  const courses = education.filter((e) => e.type === "course")

  return (
    <section id="educacion" className="container mx-auto px-4 sm:px-6 py-20 md:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
          Educación y Certificaciones
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          Mi formación académica y certificaciones profesionales que respaldan mi experiencia.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Educación Formal */}
          <div>
            <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-caveat)] text-3xl">Educación Formal</h3>
            <div className="space-y-4">
              {degrees.map((item, idx) => (
                <div
                  key={idx}
                  className="sketch-box p-5 bg-card hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="flex items-start gap-3">
                    <div className="sketch-circle p-2 bg-muted flex-shrink-0">{getIcon(item.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 font-[family-name:var(--font-caveat)] text-xl">
                        {item.degree}
                      </h4>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{item.institution}</p>
                      <p className="text-xs text-muted-foreground mb-2">{item.period}</p>
                      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificaciones */}
          <div>
            <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-caveat)] text-3xl">
              Certificaciones Técnicas
            </h3>
            <div className="space-y-4">
              {certifications.map((item, idx) => (
                <div
                  key={idx}
                  className="sketch-box p-5 bg-card hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="flex items-start gap-3">
                    <div className="sketch-circle p-2 bg-muted flex-shrink-0">{getIcon(item.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 font-[family-name:var(--font-caveat)] text-xl">
                        {item.degree}
                      </h4>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{item.institution}</p>
                      <p className="text-xs text-muted-foreground">{item.period}</p>
                      {item.description && <p className="text-sm text-muted-foreground mt-2">{item.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cursos Adicionales */}
        {courses.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-caveat)] text-3xl">
              Cursos y Formación Adicional
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((item, idx) => (
                <div
                  key={idx}
                  className="sketch-box p-4 bg-card hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  <div className="flex items-start gap-3">
                    <div className="sketch-circle p-2 bg-muted flex-shrink-0">{getIcon(item.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1 text-sm font-[family-name:var(--font-caveat)] text-lg">
                        {item.degree}
                      </h4>
                      <p className="text-xs text-muted-foreground">{item.institution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
