'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // 1. Usamos MotionValues para rendimiento (evita re-renders de React)
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // 2. Configuramos la física del "Seguidor" (el círculo grande)
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Desactivar en móviles
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        if (isTouchDevice) return;

        setIsVisible(true);

        const moveCursor = (e: MouseEvent) => {
            // Actualizamos los valores directamente
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.closest('input') ||
                target.closest('textarea');

            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        }
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <>
            {/* 1. EL PUNTERO (Precisión) - Se mueve instantáneamente */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-primary"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%", // Centrar exactamente en la punta del mouse
                    translateY: "-50%",
                }}
                animate={{
                    height: isHovering ? 8 : 8, // El punto siempre se mantiene pequeño y preciso
                    width: isHovering ? 8 : 8,
                    opacity: isHovering ? 0 : 1 // Opcional: ocultar el punto si el círculo grande indica la acción
                }}
                transition={{ duration: 0.1 }} // Transición rápida para cambios de estado
            />

            {/* 2. EL SEGUIDOR (Estética) - Se mueve con física suave (lag) */}
            <motion.div
                className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full sketch-circle"
                style={{
                    x: springX, // Este usa los valores con "Spring" (retraso)
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    borderStyle: "solid"
                }}
                animate={{
                    height: isHovering ? 60 : 24,
                    width: isHovering ? 60 : 24,
                    borderColor: "var(--primary)",
                    backgroundColor: isHovering ? "var(--primary)" : "transparent",
                    borderWidth: isHovering ? "1px" : "2px",
                    opacity: isHovering ? 0.1 : 0.5, // Más sutil cuando no está en hover
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                }}
            />
        </>
    );
}