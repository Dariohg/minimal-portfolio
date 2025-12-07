'use client'

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const BannerTextLoop = ({ text }: { text: string }) => {
    const baseDuration = 15;
    const repeatedText = `${text} • ${text} • ${text} • `

    return (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            {/* Animated background text loop - Much larger */}
            <motion.div
                className="flex items-center whitespace-nowrap absolute top-1/2 -translate-y-1/2"
                style={{ width: '200%' }}
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: baseDuration,
                        ease: 'linear',
                    },
                }}
            >
                <span className="text-9xl md:text-10xl lg:text-11xl font-bold font-[family-name:var(--font-caveat)] uppercase text-primary/8 tracking-widest px-4">
                    {repeatedText}
                </span>
                <span className="text-9xl md:text-10xl lg:text-11xl font-bold font-[family-name:var(--font-caveat)] uppercase text-primary/8 tracking-widest px-4">
                    {repeatedText}
                </span>
            </motion.div>

            {/* Animated floating elements */}
            <motion.div
                className="absolute w-16 h-16 border-2 border-primary/20 rounded-full"
                animate={{
                    y: [0, -25, 0],
                    rotate: [0, 360],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ top: '15%', left: '10%' }}
            />
            <motion.div
                className="absolute w-24 h-24 border-2 border-primary/15 rounded-full"
                animate={{
                    y: [0, 25, 0],
                    rotate: [360, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ bottom: '10%', right: '8%' }}
            />
            <motion.div
                className="absolute w-10 h-10 bg-primary/10 rounded-lg"
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 45, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ top: '25%', right: '15%' }}
            />

            {/* Main content - centered ABOVE the decorative line */}
            <div className="relative z-10 text-center pointer-events-none flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-caveat)] uppercase text-foreground/80 sketch-underline">
                        {text}
                    </h2>
                </motion.div>
            </div>

            {/* Decorative lines - BELOW the main text */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-16 flex gap-3 justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <motion.div
                    className="w-8 h-1 bg-primary/30 rounded-full"
                    animate={{ scaleX: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                    className="w-2 h-2 bg-primary/40 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="w-8 h-1 bg-primary/30 rounded-full"
                    animate={{ scaleX: [1, 0.6, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
            </motion.div>
        </div>
    );
};

const AnimatedBadge = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
    <motion.span
        initial={{ opacity: 0, y: 20, rotate: -5 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        className="px-4 py-2 sketch-border bg-muted font-medium inline-block cursor-pointer"
    >
        {children}
    </motion.span>
);

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, type: "spring" }}
        viewport={{ once: true, margin: "-100px" }}
    >
        {children}
    </motion.div>
);

export default async function ProyectoDetallePage({ params }: { params: { id: string } }) {
    const project = projects.find((p) => p.id === params.id)

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="fixed -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    y: [0, 100, 0],
                    x: [0, 50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
                className="fixed -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
                animate={{
                    y: [0, -100, 0],
                    x: [0, -50, 0],
                }}
                transition={{ duration: 25, repeat: Infinity }}
            />

            <div className="container mx-auto px-4 sm:px-6 py-12 relative z-10">
                <AnimatedSection>
                    <Link href="/proyectos">
                        <Button
                            variant="ghost"
                            className="mb-8 sketch-border hover:translate-x-1 hover:translate-y-1 transition-transform"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver a proyectos
                        </Button>
                    </Link>
                </AnimatedSection>

                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <AnimatedSection delay={0.1}>
                        <div className="mb-12">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-sm text-muted-foreground tracking-wide uppercase font-[family-name:var(--font-caveat)] mb-2"
                            >
                                {project.category}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-block"
                            >
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-[family-name:var(--font-caveat)] sketch-underline">
                                    {project.title}
                                </h1>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-muted-foreground leading-relaxed"
                            >
                                {project.description}
                            </motion.p>
                        </div>
                    </AnimatedSection>

                    {/* Image Banner */}
                    <AnimatedSection delay={0.2}>
                        <motion.div
                            className="aspect-video overflow-hidden sketch-border mb-8 relative bg-muted/80"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {project.image && typeof project.image === 'string' ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={1200}
                                    height={675}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            ) : (
                                <BannerTextLoop text={project.title} />
                            )}
                        </motion.div>
                    </AnimatedSection>

                    {/* Action Buttons */}
                    {(project.links.live || project.links.demo || project.links.github) && (
                        <AnimatedSection delay={0.3}>
                            <div className="flex flex-wrap gap-4 mb-12">
                                {(project.links.live || project.links.demo) && (
                                    <motion.a
                                        href={project.links.live || project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            className="sketch-box hover:translate-x-1 hover:translate-y-1 transition-transform"
                                            variant={project.links.live ? "default" : "outline"}
                                        >
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            {project.links.live ? 'Ver Sitio en Vivo' : 'Ver Demo'}
                                        </Button>
                                    </motion.a>
                                )}

                                {project.links.github && (
                                    <motion.a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="outline"
                                            className="sketch-box hover:translate-x-1 hover:translate-y-1 transition-transform bg-transparent"
                                        >
                                            <Github className="w-4 h-4 mr-2" />
                                            Ver Código
                                        </Button>
                                    </motion.a>
                                )}
                            </div>
                        </AnimatedSection>
                    )}

                    {/* Project Description */}
                    <AnimatedSection delay={0.4}>
                        <motion.div
                            className="sketch-box p-6 md:p-8 bg-card mb-8 relative overflow-hidden group"
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.div
                                className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-300"
                            />
                            <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-caveat)] text-3xl relative z-10">
                                Descripción del Proyecto
                            </h2>
                            <p className="text-muted-foreground leading-relaxed relative z-10">
                                {project.longDescription}
                            </p>
                        </motion.div>
                    </AnimatedSection>

                    {/* Technology Stack */}
                    <AnimatedSection delay={0.5}>
                        <motion.div
                            className="sketch-box p-6 md:p-8 bg-card mb-8 relative overflow-hidden group"
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.div
                                className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-300"
                            />
                            <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-caveat)] text-3xl relative z-10 flex items-center gap-2">
                                <Sparkles className="w-6 h-6" />
                                Tecnologías Utilizadas
                            </h2>
                            <div className="flex flex-wrap gap-3 relative z-10">
                                {project.stack.map((tech, idx) => (
                                    <AnimatedBadge key={idx} delay={0.05 * idx}>
                                        {tech}
                                    </AnimatedBadge>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    {/* Contribution */}
                    <AnimatedSection delay={0.6}>
                        <motion.div
                            className="sketch-box p-6 md:p-8 bg-card relative overflow-hidden group"
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <motion.div
                                className="absolute top-0 left-1/2 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mt-16 group-hover:scale-150 transition-transform duration-300"
                            />
                            <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-caveat)] text-3xl relative z-10">
                                Mi Contribución
                            </h2>
                            <p className="text-muted-foreground leading-relaxed relative z-10">
                                {project.contribution}
                            </p>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    )
}