import { Button } from "@/components/ui/button"
import { Download, Mail, ArrowDown } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Hero() {
  return (
    <section id="inicio" className="container mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-32 relative">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal animation="fade-in-left">
          <p className="text-base sm:text-lg text-muted-foreground mb-4 font-[family-name:var(--font-caveat)] text-2xl animate-wiggle">
            Hola, soy
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-in-up" delay={100}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-balance font-[family-name:var(--font-caveat)]">
            <span className="sketch-underline inline-block hover:scale-105 transition-transform">Dario Hernandez</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="fade-in-right" delay={200}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-muted-foreground">
            Desarrollador de Software Full Stack
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-in-up" delay={300}>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty mb-12 max-w-2xl">
            Creo soluciones digitales innovadoras y escalables. Me apasiona transformar ideas en productos funcionales
            que resuelven problemas reales y mejoran la experiencia de los usuarios.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="scale-in" delay={400}>
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="#proyectos">
              <Button
                size="lg"
                className="sketch-box hover:translate-x-1 hover:translate-y-1 transition-all hover:shadow-lg"
              >
                Ver Proyectos
                <ArrowDown className="ml-2 h-4 w-4 animate-bounce-subtle" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="sketch-border hover:bg-accent transition-all bg-transparent hover:scale-105"
              asChild
            >
              <a href="/cv.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Descargar CV
              </a>
            </Button>

            <Link href="#contacto">
              <Button
                size="lg"
                variant="outline"
                className="sketch-border hover:bg-accent transition-all bg-transparent hover:scale-105"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contactar
              </Button>
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
