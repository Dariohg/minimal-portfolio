// app/page.tsx
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import Script from "next/script"
import {VelocityScroll} from "@/components/ui/velocity-scroll";

export default function Home() {
    return (
        <div className="min-h-screen relative">
            <AnimatedBackground />
            <Header />
            <main className="relative z-10">
                <Hero />
                <VelocityScroll />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Education />
                <Contact />
            </main>
            <Footer />

            {/* 2. AÑADE ESTE SCRIPT (¡SIN 'onLoad'!) */}
            <Script
                id="credly-api-script"
                src="https://cdn.credly.com/assets/api.js"
                strategy="lazyOnload" // Carga el script después de que la página sea interactiva
            />
        </div>
    )
}