import { Github, Linkedin } from 'lucide-react'

function GraffitiX() {
  return (
    <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden
      className="text-primary"
      style={{ opacity: 0.07, transform: 'rotate(-12deg)' }}
    >
      <line x1="0" y1="0" x2="16" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="0" x2="0" y2="16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border graffiti-bg relative">
      <div className="absolute bottom-3 right-4 pointer-events-none" aria-hidden>
        <GraffitiX />
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">

          {/* Left: logo + stack */}
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <p className="flex items-center gap-2">
              <span className="font-[family-name:var(--font-caveat)] text-sm font-bold logo-text">
                &lt;Dariohg/&gt;
              </span>
              <span className="text-xs font-mono text-muted-foreground/50">— {new Date().getFullYear()}</span>
            </p>
          </div>

          {/* Right: social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Dariohg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/rubén-dario-hernandez-gonzález-549bbb249/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
