import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ProjectsBanner } from "@/components/ui/projects-banner"
import { ProjectCardBanner } from "@/components/ui/project-card-banner"

export default function ProyectosPage() {
  return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-12">

          {/* Botón de volver */}
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

            {/* Banner decorativo */}
            <ProjectsBanner
                title="Todos los Proyectos"
                subtitle="Explora mi portafolio completo de proyectos y trabajos realizados"
            />

            {/* Grid de todos los proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                  <Link
                      key={project.id}
                      href={`/proyectos/${project.id}`}
                      className="group sketch-box p-4 bg-card hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col h-full"
                  >
                    {/* Banner decorativo en lugar de imagen */}
                    <div className="mb-4 -mx-4 -mt-4 sketch-border overflow-hidden">
                      <ProjectCardBanner title={project.title} />
                    </div>

                    {/* Contenido de la card */}
                    <div className="space-y-2 flex-1 flex flex-col">
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

                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {project.description}
                      </p>

                      {/* Stack de tecnologías */}
                      <div className="flex flex-wrap gap-2 pt-2 mt-auto">
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