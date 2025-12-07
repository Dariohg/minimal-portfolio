"use client"

import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { useRef } from "react"

interface ScrollScrubProps {
    children: React.ReactNode
    direction?: "left" | "right" | "up" | "down" | "zoom"
    distance?: number // Qué tanta distancia recorre (en px)
    className?: string
    opacity?: boolean // Si quieres que también controle la opacidad
}

export function ScrollScrub({
                                children,
                                direction = "up",
                                distance = 100,
                                className = "",
                                opacity = true
                            }: ScrollScrubProps) {
    const ref = useRef<HTMLDivElement>(null)

    // Configuración clave:
    // "start end" = Cuando el TOP del elemento toca el FONDO de la pantalla (empieza a entrar)
    // "end center" = Cuando el BOTTOM del elemento toca el CENTRO de la pantalla (ya está visible)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end center"]
    })

    // Transformaciones basadas DIRECTAMENTE en el scroll
    // Si scrollYProgress es 0 (apenas entrando), x/y están en 'distance'
    // Si scrollYProgress es 1 (ya en su lugar), x/y están en 0

    const xTransform = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "left" ? [-distance, 0] : direction === "right" ? [distance, 0] : [0, 0]
    )

    const yTransform = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "up" ? [distance, 0] : direction === "down" ? [-distance, 0] : [0, 0]
    )

    const scaleTransform = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "zoom" ? [0.8, 1] : [1, 1]
    )

    const opacityTransform = useTransform(scrollYProgress, [0, 0.8], [0, 1])

    return (
        <motion.div
            ref={ref}
            style={{
                x: xTransform,
                y: yTransform,
                scale: scaleTransform,
                opacity: opacity ? opacityTransform : 1,
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}