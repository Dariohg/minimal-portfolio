// components/ui/project-card-banner.tsx
'use client'

import { motion } from "framer-motion"

interface ProjectCardBannerProps {
    title: string
}

export function ProjectCardBanner({ title }: ProjectCardBannerProps) {
    const repeatedText = `${title} • ${title} • ${title} • `

    return (
        <div className="relative w-full h-40 overflow-hidden bg-muted/30 flex items-center justify-center">

            {/* Animated background text loop - más pequeño */}
            <motion.div
                className="flex items-center whitespace-nowrap absolute"
                style={{ width: '200%' }}
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 15,
                        ease: 'linear',
                    },
                }}
            >
        <span className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-caveat)] uppercase text-primary/8 tracking-widest px-4">
          {repeatedText}
        </span>
                <span className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-caveat)] uppercase text-primary/8 tracking-widest px-4">
          {repeatedText}
        </span>
            </motion.div>

            {/* Elementos flotantes más pequeños */}
            <motion.div
                className="absolute w-8 h-8 border-2 border-primary/20 rounded-full"
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 360],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ top: '15%', left: '10%' }}
            />
            <motion.div
                className="absolute w-12 h-12 border-2 border-primary/15 rounded-full"
                animate={{
                    y: [0, 15, 0],
                    rotate: [360, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ bottom: '10%', right: '10%' }}
            />
            <motion.div
                className="absolute w-5 h-5 bg-primary/10 rounded-lg"
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 45, 0],
                }}
                transition={{ duration: 6, repeat: Infinity }}
                style={{ top: '25%', right: '15%' }}
            />

            {/* Título centrado */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                className="relative z-10 text-center pointer-events-none"
            >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-caveat)] uppercase text-foreground/80">
                    {title}
                </h3>
            </motion.div>
        </div>
    )
}