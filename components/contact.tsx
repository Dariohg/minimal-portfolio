// components/contact.tsx
'use client'

import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import React, { useState } from "react";
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

export function Contact() {
  const [open, setOpen] = useState(false)

  return (
      <section id="contacto" className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 font-[family-name:var(--font-caveat)]">
            <span className="sketch-underline">Trabajemos juntos</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-12 text-balance">
            Si tienes un proyecto en mente o simplemente quieres charlar, no dudes en contactarme.
          </p>

          {/* Drawer Trigger */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button size="lg" className="mb-12 sketch-box hover:translate-x-1 hover:translate-y-1 transition-all">
                <Mail className="mr-2 h-4 w-4" />
                Enviar mensaje
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-md">
                <DrawerHeader>
                  <DrawerTitle className="text-2xl font-[family-name:var(--font-caveat)] text-center">Envíame un mensaje</DrawerTitle>
                  <DrawerDescription className="text-center">
                    Completa el formulario y te responderé lo antes posible.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <ContactForm onSuccess={() => setOpen(false)} />
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          <div className="flex items-center justify-center gap-6">
            <a
                href="https://github.com/Dariohg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
                href="https://www.linkedin.com/in/rubén-dario-hernandez-gonzález-549bbb249/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 transform duration-200"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </section>
  )
}