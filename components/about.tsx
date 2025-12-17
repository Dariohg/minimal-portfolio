import { ScrollScrub } from "@/components/ui/scroll-scrub"

export function About() {
  return (
      <section id="sobre-mi" className="container mx-auto px-4 sm:px-6 py-20 md:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto">

          <ScrollScrub direction="down" distance={80}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
              Sobre mí
            </h2>
          </ScrollScrub>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">

            <ScrollScrub direction="left" distance={150}>
              <div className="sketch-box p-6 bg-card h-full transform-gpu">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 font-[family-name:var(--font-caveat)]">
                  Mi Historia
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Soy un desarrollador Front-End apasionado por construir interfaces de usuario elegantes y funcionales.
                    Con más de 2 años de experiencia en el desarrollo web, me he enfocado en proyectos que demandan alta
                    calidad visual y un rendimiento excepcional.
                  </p>
                  <p>
                    Mi enfoque se centra en React, Next.js y en escribir código limpio y modular, priorizando siempre la
                    experiencia del usuario y las mejores prácticas de desarrollo moderno.
                  </p>
                </div>
              </div>
            </ScrollScrub>

            <ScrollScrub direction="right" distance={150}>
              <div className="sketch-box p-6 bg-card h-full transform-gpu">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 font-[family-name:var(--font-caveat)]">
                  Especialización
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="sketch-circle w-2 h-2 bg-foreground mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Desarrollo Front-End</p>
                      <p className="text-sm text-muted-foreground">Especialista en React y Next.js de alto rendimiento</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="sketch-circle w-2 h-2 bg-foreground mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Arquitectura de Componentes</p>
                      <p className="text-sm text-muted-foreground">Diseño de sistemas modulares y mantenibles (Design Systems)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="sketch-circle w-2 h-2 bg-foreground mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Diseño y Experiencia de Usuario</p>
                      <p className="text-sm text-muted-foreground">Convertir diseños de Figma en código y enfocarme en la accesibilidad</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollScrub>
          </div>

          <ScrollScrub direction="zoom" distance={0} className="mt-12">
            <div className="sketch-border p-8 bg-muted/30">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 font-[family-name:var(--font-caveat)]">
                Mi Enfoque Profesional
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    Rendimiento
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Priorizo la velocidad de carga y optimización con las últimas funciones de Next.js.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    Calidad y Mantenimiento
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Entrego productos terminados, probados y documentados, asegurando su escalabilidad a largo plazo.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    Código Limpio
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Escribo código modular, bien tipado con TypeScript, fácil de entender y escalar.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    Colaboración Ágil
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Excelente comunicación con equipos de diseño y backend para entregas eficientes.
                  </p>
                </div>
              </div>
            </div>
          </ScrollScrub>
        </div>
      </section>
  )
}