"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"

interface ScrollAnimationProps {
    children: React.ReactNode
    direction?: "left" | "right" | "up" | "down" | "none"
    delay?: number
    duration?: number
    className?: string
    viewportAmount?: number
    once?: boolean // Si es false, la animación se repite al subir/bajar
}

export function ScrollAnimation({
                                    children,
                                    direction = "up",
                                    delay = 0,
                                    duration = 0.5,
                                    className = "",
                                    viewportAmount = 0.2,
                                    once = false // <--- OJO: En false imita el comportamiento de Lando (reacciona siempre)
                                }: ScrollAnimationProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: once, margin: "-50px", amount: viewportAmount })

    // Configuramos la posición inicial según la dirección
    const getHiddenVariant = () => {
        switch (direction) {
            case "left": return { opacity: 0, x: -100, y: 0 }
            case "right": return { opacity: 0, x: 100, y: 0 }
            case "up": return { opacity: 0, x: 0, y: 100 }
            case "down": return { opacity: 0, x: 0, y: -100 }
            case "none": return { opacity: 0, x: 0, y: 0 }
            default: return { opacity: 0, x: 0, y: 100 }
        }
    }

    const variants: Variants = {
        hidden: getHiddenVariant(),
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: duration,
                ease: [0.22, 1, 0.36, 1], // Curva "cubic-bezier" suave estilo Apple/Lando
                delay: delay,
            },
        },
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    )
}