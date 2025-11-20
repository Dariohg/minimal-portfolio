"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"

export function SpotlightCard({
                                  children,
                                  className = "",
                                  spotlightColor = "rgba(var(--primary), 0.15)" // Ajusta el color aquí si quieres
                              }: {
    children: React.ReactNode
    className?: string
    spotlightColor?: string
}) {
    const divRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return

        const rect = divRef.current.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleMouseEnter = () => setOpacity(1)
    const handleMouseLeave = () => setOpacity(0)

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    )
}