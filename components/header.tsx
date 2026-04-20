"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { Magnetic } from "@/components/ui/magnetic"
import { useThemeTransition } from "@/components/ui/theme-transition"
import BubbleMenu from "@/components/ui/bubble-menu"
import type { BubbleMenuItem } from "@/components/ui/bubble-menu"

export function Header() {
  const [isDark, setIsDark] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { triggerTransition } = useThemeTransition()

  const navLinks = [
    { href: "#inicio",      label: "Inicio" },
    { href: "#sobre-mi",    label: "Sobre mí" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#proyectos",   label: "Proyectos" },
    { href: "#experiencia", label: "Experiencia" },
    { href: "#educacion",   label: "Educación" },
    { href: "#contacto",    label: "Contacto" },
  ]

  const bubbleItems: BubbleMenuItem[] = [
    { href: "#inicio",      label: "Inicio",      rotation: -3, hoverStyles: { bgColor: 'oklch(0.42 0.18 195 / 0.15)', textColor: 'oklch(0.72 0.28 195)' } },
    { href: "#sobre-mi",    label: "Sobre mí",    rotation:  2, hoverStyles: { bgColor: 'oklch(0.48 0.22 320 / 0.15)', textColor: 'oklch(0.72 0.28 320)' } },
    { href: "#habilidades", label: "Habilidades", rotation: -2, hoverStyles: { bgColor: 'oklch(0.40 0.16 285 / 0.15)', textColor: 'oklch(0.65 0.25 285)' } },
    { href: "#proyectos",   label: "Proyectos",   rotation:  3, hoverStyles: { bgColor: 'oklch(0.42 0.18 195 / 0.15)', textColor: 'oklch(0.72 0.28 195)' } },
    { href: "#experiencia", label: "Experiencia", rotation: -2, hoverStyles: { bgColor: 'oklch(0.48 0.22 320 / 0.15)', textColor: 'oklch(0.72 0.28 320)' } },
    { href: "#educacion",   label: "Educación",   rotation:  2, hoverStyles: { bgColor: 'oklch(0.40 0.16 285 / 0.15)', textColor: 'oklch(0.65 0.25 285)' } },
    { href: "#contacto",    label: "Contacto",    rotation: -3, hoverStyles: { bgColor: 'oklch(0.48 0.22 320 / 0.15)', textColor: 'oklch(0.72 0.28 320)' } },
  ]

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)

    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''))
    const observers = sections.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    triggerTransition(next, () => {
      document.documentElement.classList.toggle("dark")
      try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
      setIsDark(next)
    })
  }

  const handleBubbleItemClick = (item: BubbleMenuItem) => {
    const id = item.href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Desktop header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden lg:block"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? 'bg-background/95 backdrop-blur-md'
              : 'bg-background'
          }`}
          style={{
            borderBottom: `1px solid ${isScrolled
              ? isDark ? 'oklch(0.72 0.28 320 / 0.25)' : 'oklch(0.48 0.22 320 / 0.18)'
              : 'var(--border)'}`,
            boxShadow: isScrolled
              ? isDark
                ? '0 1px 0 0 oklch(0.72 0.28 320 / 0.1), 0 4px 12px 0 oklch(0.08 0.02 280 / 0.8)'
                : '0 2px 20px 0 oklch(0.48 0.22 320 / 0.07)'
              : 'none',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <nav className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                href="#inicio"
                className="text-xl sm:text-2xl font-bold tracking-tight font-[family-name:var(--font-caveat)] hover:scale-110 transition-all duration-300 logo-text"
              >
                {"<Dariohg/>"}
              </Link>

              {/* Desktop nav links + theme toggle */}
              <div className="flex items-center gap-6">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('#', '')
                  const isActive = activeSection === sectionId
                  return (
                    <Magnetic key={link.href}>
                      <Link
                        href={link.href}
                        className={`text-sm transition-all duration-300 relative group hover:scale-110 ${
                          isActive
                            ? 'text-secondary'
                            : 'text-muted-foreground hover:text-secondary'
                        }`}
                      >
                        {link.label}
                        <span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </Link>
                    </Magnetic>
                  )
                })}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="ml-2 sketch-circle hextech-glow hover:rotate-180 transition-all duration-500"
                >
                  {isDark
                    ? <Sun className="h-4 w-4 text-secondary" />
                    : <Moon className="h-4 w-4 text-primary" />
                  }
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile BubbleMenu ── */}
      <div className="block lg:hidden">
        <BubbleMenu
          logo={
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold font-[family-name:var(--font-caveat)] logo-text">
                {"<Dariohg/>"}
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:rotate-180"
                style={{ background: 'color-mix(in oklch, var(--primary) 10%, transparent)' }}
                aria-label="Toggle theme"
              >
                {isDark
                  ? <Sun className="h-3.5 w-3.5 text-secondary" />
                  : <Moon className="h-3.5 w-3.5 text-primary" />
                }
              </button>
            </div>
          }
          items={bubbleItems}
          menuBg="var(--card)"
          menuContentColor="var(--foreground)"
          useFixedPosition={true}
          activeHref={activeSection ? `#${activeSection}` : undefined}
          onItemClick={handleBubbleItemClick}
        />
      </div>
    </>
  )
}
