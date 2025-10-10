import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"
import React from "react";

export function Contact() {
  return (
    <section id="contact" className="container mx-auto px-6 py-20 md:py-32">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Trabajemos juntos</h2>

        <p className="text-lg text-muted-foreground mb-12 text-balance">
          Si tienes un proyecto en mente o simplemente quieres charlar, no dudes en contactarme.
        </p>

        <Button size="lg" className="mb-12">
          <Mail className="mr-2 h-4 w-4" />
          Enviar mensaje
        </Button>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/Dariohg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rubén-dario-hernandez-gonzález-549bbb249/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </section>
  )
}
