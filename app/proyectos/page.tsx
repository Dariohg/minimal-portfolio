'use client'

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import Lenis from 'lenis'
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { ProjectsBanner } from "@/components/ui/projects-banner"
// Importamos tu componente específico
import { ProjectCardBanner } from "@/components/ui/project-card-banner"

// --- COMPONENTE DE TARJETA INDIVIDUAL ---
const ProjectItem = ({ project, index }: { project: any, index: number }) => {
    // Animación suave de entrada al hacer scroll
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0.8 1"] // Se anima cuando entra en el viewport
    })

    const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1])
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className="w-full max-w-4xl mx-auto mb-24 last:mb-0"
        >
            <div className="group relative bg-card border-2 border-foreground rounded-[2rem] overflow-hidden sketch-box transition-all duration-500 hover:shadow-[8px_8px_0px_0px_currentColor]">

                {/* HEADER: TU BANNER DE TEXTO */}
                {/* Usamos un fondo sutil para que el banner resalte */}
                <div className="w-full bg-muted/30 border-b-2 border-dashed border-foreground/20 overflow-hidden relative">
                    <div className="py-12 md:py-16 px-4 flex items-center justify-center">
                        {/* Contenedor del banner con efecto hover */}
                        <div className="w-full max-w-2xl transform group-hover:scale-105 transition-transform duration-700">
                            <ProjectCardBanner title={project.title} />
                        </div>
                    </div>

                    {/* Badge Índice (Estilo Sketch) */}
                    <div className="absolute top-6 right-6 z-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-foreground text-sm font-bold font-mono shadow-sm sketch-circle">
                    {String(index + 1).padStart(2, '0')}
                </span>
                    </div>
                </div>

                {/* CONTENIDO: INFO DEL PROYECTO */}
                <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 bg-card">

                    {/* Columna Izquierda: Textos */}
                    <div className="md:w-2/3 space-y-6">
                        <div className="flex items-center gap-3">
                    <span className="text-xs font-mono border border-foreground/30 px-3 py-1 rounded-md uppercase tracking-wider bg-muted/50">
                        {project.category}
                    </span>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-caveat)] uppercase leading-[0.9]">
                            {project.title}
                        </h3>

                        <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                            {project.description}
                        </p>

                        {/* Stack Tecnológico */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {project.stack.map((tech: string, i: number) => (
                                <span key={i} className="px-3 py-1.5 bg-background border-2 border-foreground/10 rounded-lg text-xs font-bold hover:border-foreground/30 transition-colors cursor-default">
                            {tech}
                        </span>
                            ))}
                        </div>
                    </div>

                    {/* Columna Derecha: Botones de Acción */}
                    <div className="md:w-1/3 flex flex-col justify-end items-start md:items-end gap-4 pt-6 md:pt-0 md:border-l-2 md:border-dashed md:border-foreground/10 md:pl-10">
                        <Link href={`/proyectos/${project.id}`} className="w-full">
                            <Button className="w-full h-14 text-lg sketch-box hover:translate-x-1 hover:translate-y-1 transition-transform bg-foreground text-background hover:bg-foreground/90 font-bold shadow-md">
                                Ver Detalles
                            </Button>
                        </Link>

                        <div className="flex gap-3 w-full">
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="outline" className="w-full h-12 sketch-border bg-transparent hover:bg-muted border-2">
                                        <Github className="w-5 h-5 mr-2" /> GitHub
                                    </Button>
                                </a>
                            )}
                            {project.links.live && (
                                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <Button variant="outline" className="w-full h-12 sketch-border bg-transparent hover:bg-muted border-2">
                                        <ExternalLink className="w-5 h-5 mr-2" /> Demo
                                    </Button>
                                </a>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    )
}

// --- PÁGINA PRINCIPAL ---
export default function ProyectosPage() {

    // Inicialización de Scroll Suave (Lenis)
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial suave
            orientation: 'vertical',
            smoothWheel: true,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
        return () => lenis.destroy()
    }, [])

    return (
        <div className="bg-background min-h-screen font-sans selection:bg-foreground/10">

            {/* BOTÓN VOLVER FIJO */}
            <div className="fixed top-6 left-6 z-50 pointer-events-none">
                <Link href="/#proyectos" className="pointer-events-auto inline-block">
                    <Button variant="outline" className="sketch-box bg-background/80 backdrop-blur shadow-lg hover:translate-x-1 transition-transform border-2 border-foreground h-12 px-6">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Inicio
                    </Button>
                </Link>
            </div>

            {/* CONTENEDOR PRINCIPAL */}
            <div className="container mx-auto px-4 pt-32 pb-32">

                {/* Banner Principal de la Sección */}
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <div className="transform hover:scale-[1.01] transition-transform duration-500">
                        <ProjectsBanner
                            title="Archivo de Proyectos"
                            subtitle="Exploración técnica y creativa de soluciones de software"
                        />
                    </div>
                    <div className="mt-12 flex flex-col items-center gap-4 opacity-60 animate-bounce-subtle">
                    <span className="text-sm font-mono uppercase tracking-widest border-b border-foreground pb-1">
                        SCROLL DOWN
                    </span>
                    </div>
                </div>

                {/* LISTA VERTICAL DE PROYECTOS */}
                <div className="flex flex-col w-full relative">
                    {/* Línea conectora vertical decorativa (opcional) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-foreground/10 -z-10 hidden md:block" />

                    {projects.map((project, index) => (
                        <ProjectItem key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* CTA FINAL */}
                <div className="mt-32 text-center border-t-2 border-dashed border-foreground/10 pt-20">
                    <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-caveat)] font-bold mb-8">
                        ¿Tienes un proyecto en mente?
                    </h3>
                    <Link href="/#contacto">
                        <Button size="lg" className="sketch-box h-16 px-12 text-xl border-2">
                            Hablemos Ahora
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}