// components/ui/projects-banner.tsx
'use client'

import { motion } from "framer-motion"

interface ProjectsBannerProps {
    title: string
    subtitle?: string
}

export function ProjectsBanner({ title, subtitle }: ProjectsBannerProps) {
    return (
        <div className="relative w-full h-80 overflow-hidden sketch-border mb-12 bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center">

            {/* Animated gradient background orbs */}
            <motion.div
                className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
                animate={{
                    y: [0, 40, 0],
                    x: [0, 30, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
                animate={{
                    y: [0, -40, 0],
                    x: [0, -30, 0],
                }}
                transition={{ duration: 25, repeat: Infinity }}
            />

            {/* Animated floating elements */}
            <motion.div
                className="absolute w-20 h-20 border-2 border-primary/20 rounded-full"
                animate={{
                    y: [0, -30, 0],
                    rotate: [0, 360],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ top: '15%', left: '10%' }}
            />
            <motion.div
                className="absolute w-32 h-32 border-2 border-primary/15 rounded-full"
                animate={{
                    y: [0, 30, 0],
                    rotate: [360, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ bottom: '10%', right: '8%' }}
            />
            <motion.div
                className="absolute w-12 h-12 bg-primary/10 rounded-lg"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 45, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ top: '25%', right: '12%' }}
            />
            <motion.div
                className="absolute w-16 h-16 border-2 border-primary/15 rounded-full"
                animate={{
                    y: [0, 25, 0],
                    rotate: [0, -360],
                }}
                transition={{ duration: 9, repeat: Infinity }}
                style={{ bottom: '20%', left: '8%' }}
            />

            {/* Main content - centered */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
                className="relative z-10 text-center space-y-4 px-4 sm:px-8"
            >
                {/* Main title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
                    className="text-5xl sm:text-6xl md:text-6xl font-bold font-[family-name:var(--font-caveat)] uppercase text-foreground/90 leading-tight"
                >
                    {title}
                </motion.h2>

                {/* Line under title */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="h-1.5 bg-primary/40 rounded-full mx-auto"
                    style={{ width: '60%' }}
                />

                {/* Subtitle */}
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {/* Decorative animated elements */}
                <motion.div
                    className="flex gap-4 justify-center items-center pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <motion.div
                        className="w-12 h-1 bg-primary/25 rounded-full"
                        animate={{ scaleX: [0.5, 1.2, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                        className="w-3 h-3 bg-primary/40 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                        className="w-12 h-1 bg-primary/25 rounded-full"
                        animate={{ scaleX: [1.2, 0.5, 1.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}