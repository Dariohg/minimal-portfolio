"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Magnetic } from "@/components/ui/magnetic"

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark")
    setIsDark(!isDark)
  }

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#sobre-mi", label: "Sobre mí" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#experiencia", label: "Experiencia" },
    { href: "#educacion", label: "Educación" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="hand-drawn-line border-b-2 border-foreground/20">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="#inicio"
              className="text-xl sm:text-2xl font-bold tracking-tight font-[family-name:var(--font-caveat)] hover:scale-110 transition-transform duration-300"
            >
              {"<Dariohg />"}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                  <Magnetic key={link.href}>
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 relative group hover:scale-110"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
                  </Magnetic>
              ))}

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="ml-2 sketch-circle hover:rotate-180 transition-all duration-500"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="sketch-circle hover:rotate-180 transition-all duration-500"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sketch-circle hover:scale-110 transition-transform"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 sketch-border bg-card p-4 animate-in slide-in-from-top duration-300">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 px-3 hover:bg-accent rounded-md"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
