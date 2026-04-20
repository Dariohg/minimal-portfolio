// components/contact.tsx
'use client'

import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ContactForm } from "@/components/contact-form"

const EASE = [0.16, 1, 0.3, 1] as const
const VP   = { once: true, margin: '-60px' as const }

const socialLinks = [
  {
    href:  'https://github.com/Dariohg',
    icon:  Github,
    label: 'GitHub',
    hoverColor: 'oklch(0.92 0.02 80)',
    hoverGlow:  '0 0 10px oklch(0.92 0.02 80 / 0.6)',
  },
  {
    href:  'https://www.linkedin.com/in/rubén-dario-hernandez-gonzález-549bbb249/',
    icon:  Linkedin,
    label: 'LinkedIn',
    hoverColor: '#0077b5',
    hoverGlow:  '0 0 10px #0077b5aa',
  },
  {
    href:  'https://twitter.com',
    icon:  Twitter,
    label: 'Twitter',
    hoverColor: '#1da1f2',
    hoverGlow:  '0 0 10px #1da1f2aa',
  },
]

function SocialIcon({
  href, icon: Icon, label, hoverColor, hoverGlow,
}: typeof socialLinks[0]) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col items-center gap-1"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.2, y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      style={{ color: hovered ? hoverColor : undefined, filter: hovered ? `drop-shadow(${hoverGlow})` : undefined }}
    >
      <Icon className="h-6 w-6 text-muted-foreground transition-colors duration-200" style={{ color: hovered ? hoverColor : undefined }} />
      <motion.span
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.15 }}
        className="absolute -bottom-5 text-xs font-mono text-muted-foreground whitespace-nowrap pointer-events-none"
      >
        {label}
      </motion.span>
      <span className="sr-only">{label}</span>
    </motion.a>
  )
}

export function Contact() {
  const [open, setOpen] = useState(false)

  return (
    <section id="contacto" className="container mx-auto px-6 py-20 md:py-32">
      <div className="max-w-2xl mx-auto text-center">

        {/* Section label */}
        <div className="animate-flicker mb-2">
          <p className="text-xs font-mono uppercase tracking-widest text-secondary">
            // CANAL DE COMUNICACIÓN
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 font-[family-name:var(--font-caveat)]">
          <span className="neon-magenta">Trabajemos juntos</span>
        </h2>

        {/* Graffiti line */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="graffiti-line max-w-xs w-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-12 text-balance">
          Si tienes un proyecto en mente o simplemente quieres charlar, no dudes en contactarme.
        </p>

        {/* Drawer Trigger */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <motion.div
              className="inline-block mb-12"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button
                size="lg"
                className="sketch-border-heavy hextech-glow bg-primary text-primary-foreground font-semibold"
              >
                <Mail className="mr-2 h-4 w-4" />
                Enviar mensaje
              </Button>
            </motion.div>
          </DrawerTrigger>

          <DrawerContent
            style={{
              borderTop: '2px solid color-mix(in oklch, var(--primary) 50%, transparent)',
              boxShadow: '0 -4px 30px color-mix(in oklch, var(--primary) 15%, transparent)',
            }}
          >
            <div className="mx-auto w-full max-w-md">
              <DrawerHeader>
                <DrawerTitle className="text-2xl font-[family-name:var(--font-caveat)] text-center neon-cyan">
                  Envíame un mensaje
                </DrawerTitle>
                <DrawerDescription className="text-center text-muted-foreground">
                  Completa el formulario y te responderé lo antes posible.
                </DrawerDescription>
              </DrawerHeader>

              <div className="p-4 pb-0 graffiti-bg">
                {/* Drag indicator */}
                <div className="w-12 h-1.5 bg-primary/40 rounded-full mx-auto mb-4" />
                <ContactForm onSuccess={() => setOpen(false)} />
              </div>

              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>

        {/* Social links */}
        <div className="flex items-center justify-center gap-10 mt-4">
          {socialLinks.map((s) => (
            <SocialIcon key={s.label} {...s} />
          ))}
        </div>

      </div>
    </section>
  )
}
