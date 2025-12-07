import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ProyectosPage() {
  return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <Link href="/#proyectos">
            <Button
                variant="ghost"
                className="mb-8 sketch-border hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>

          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
              Todos los Proyectos
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              Explora mi portafolio completo de proyectos y trabajos realizados
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                  <Link
                      key={project.id}
                      href={`/proyectos/${project.id}`}
                      className="group sketch-box p-4 bg-card hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    <div className="aspect-video overflow-hidden sketch-border mb-4">
                      {project.image && typeof project.image === 'string' ? (
                          <Image
                              src={project.image}
                              alt={project.title}
                              width={600}
                              height={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                      ) : (
                          <div
                              className="flex h-full w-full items-center justify-center bg-muted/80"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`
                              }}
                          >
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold font-[family-name:var(--font-caveat)] uppercase text-primary/70 px-4 text-center">
                        {project.title}
                      </span>
                          </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground tracking-wide uppercase font-[family-name:var(--font-caveat)]">
                          {project.category}
                        </p>
                        {project.featured && (
                            <span className="text-xs px-2 py-1 sketch-border bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
                        Destacado
                      </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold font-[family-name:var(--font-caveat)] group-hover:sketch-underline">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.stack.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 sketch-border bg-muted">
                        {tech}
                      </span>
                        ))}
                        {project.stack.length > 3 && (
                            <span className="text-xs px-2 py-1 text-muted-foreground">+{project.stack.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}