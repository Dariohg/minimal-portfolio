"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
    children: string;
    baseVelocity: number;
    colorClass: string;
}

function ParallaxText({ children, baseVelocity = 100, colorClass }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div
                className={`font-[family-name:var(--font-caveat)] font-bold uppercase text-4xl md:text-6xl flex flex-nowrap gap-8 ${colorClass}`}
                style={{ x }}
            >
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
            </motion.div>
        </div>
    );
}

export function VelocityScroll() {
    return (
        <section className="py-10 overflow-hidden graffiti-bg">
            <div className="graffiti-line opacity-30" />
            <ParallaxText baseVelocity={-2} colorClass="text-primary/25">
                Frontend Dev • React • Next.js • TypeScript • Framer Motion •
            </ParallaxText>
            <ParallaxText baseVelocity={2} colorClass="text-secondary/20">
                UI/UX • Animaciones • Diseño de Sistemas • Clean Code • Performance •
            </ParallaxText>
            <div className="graffiti-line opacity-30" />
        </section>
    );
}
