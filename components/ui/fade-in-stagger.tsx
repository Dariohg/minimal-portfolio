"use client"

import { motion } from "framer-motion"
import React from "react"

// Contenedor padre
export function FadeInStagger({ children, className, faster = false }: { children: React.ReactNode, className?: string, faster?: boolean }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ staggerChildren: faster ? 0.05 : 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Elemento hijo
export function FadeInItem({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 15 }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}