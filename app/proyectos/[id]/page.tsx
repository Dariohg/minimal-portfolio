import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default function ProyectoDetallePage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <Link href="/proyectos">
          <Button
            variant="ghost"
            className="mb-8 sketch-border hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a proyectos
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground tracking-wide uppercase font-[family-name:var(--font-caveat)] mb-2">
              {project.category}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground">{project.description}</p>
          </div>

          {/* Image */}
          <div className="aspect-video overflow-hidden sketch-border mb-8">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Links */}
          {(project.links.demo || project.links.github || project.links.live) && (
            <div className="flex flex-wrap gap-4 mb-12">
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <Button className="sketch-box hover:translate-x-1 hover:translate-y-1 transition-transform">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Sitio en Vivo
                  </Button>
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="sketch-box hover:translate-x-1 hover:translate-y-1 transition-transform bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Demo
                  </Button>
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="sketch-box hover:translate-x-1 hover:translate-y-1 transition-transform bg-transparent"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Ver Código
                  </Button>
                </a>
              )}
            </div>
          )}

          {/* Description */}
          <div className="sketch-box p-6 md:p-8 bg-card mb-8">
            <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-caveat)] text-3xl">
              Descripción del Proyecto
            </h2>
            <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Stack */}
          <div className="sketch-box p-6 md:p-8 bg-card mb-8">
            <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-caveat)] text-3xl">
              Tecnologías Utilizadas
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((tech, idx) => (
                <span key={idx} className="px-4 py-2 sketch-border bg-muted font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contribution */}
          <div className="sketch-box p-6 md:p-8 bg-card">
            <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-caveat)] text-3xl">Mi Contribución</h2>
            <p className="text-muted-foreground leading-relaxed">{project.contribution}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
