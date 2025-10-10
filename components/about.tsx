export function About() {
  return (
    <section id="sobre-mi" className="container mx-auto px-4 sm:px-6 py-20 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-8 font-[family-name:var(--font-caveat)] sketch-underline inline-block">
          Sobre mí
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
          <div className="sketch-box p-6 bg-card">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 font-[family-name:var(--font-caveat)]">
              Mi Historia
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Soy un desarrollador de software apasionado por crear soluciones tecnológicas que marquen la diferencia.
                Con más de 3 años de experiencia en el desarrollo web, he trabajado en proyectos que van desde startups
                hasta empresas consolidadas.
              </p>
              <p>
                Mi enfoque se centra en escribir código limpio, escalable y mantenible, siempre buscando las mejores
                prácticas y las tecnologías más adecuadas para cada proyecto.
              </p>
            </div>
          </div>

          <div className="sketch-box p-6 bg-card">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 font-[family-name:var(--font-caveat)]">
              Especialización
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="sketch-circle w-2 h-2 bg-foreground mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Desarrollo Full Stack</p>
                  <p className="text-sm text-muted-foreground">Frontend y Backend con tecnologías modernas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="sketch-circle w-2 h-2 bg-foreground mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Arquitectura de Software</p>
                  <p className="text-sm text-muted-foreground">Diseño de sistemas escalables y mantenibles</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="sketch-circle w-2 h-2 bg-foreground mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">DevOps & Cloud</p>
                  <p className="text-sm text-muted-foreground">Despliegue y gestión de infraestructura</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sketch-border p-8 bg-muted/30">
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 font-[family-name:var(--font-caveat)]">
            Mi Enfoque Profesional
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                Innovación Constante
              </h4>
              <p className="text-sm text-muted-foreground">
                Siempre explorando nuevas tecnologías y metodologías para mejorar la calidad del software.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                Orientado a Resultados
              </h4>
              <p className="text-sm text-muted-foreground">
                Enfocado en entregar valor real y soluciones que impacten positivamente en el negocio.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                Trabajo en Equipo
              </h4>
              <p className="text-sm text-muted-foreground">
                Creo en la colaboración y la comunicación efectiva para lograr los mejores resultados.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                Aprendizaje Continuo
              </h4>
              <p className="text-sm text-muted-foreground">
                Comprometido con el crecimiento profesional y la actualización constante de conocimientos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
