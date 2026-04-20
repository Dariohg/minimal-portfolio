import type React from "react"
import type { Metadata } from "next"
import { Caveat, Inter, Space_Grotesk } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { Toaster } from "@/components/ui/toaster"
import { ThemeTransitionProvider } from "@/components/ui/theme-transition"
import { LoadingScreen } from "@/components/ui/loading-screen"

const caveat = Caveat({
    subsets: ["latin"],
    variable: "--font-caveat",
    weight: ["400", "500", "600", "700"],
})

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    weight: ["400", "500", "600", "700"],
})

const BASE_URL = 'https://dariohg.site'

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),

    title: {
        default: 'Dario Hernandez — Desarrollador Front-End',
        template: '%s | Dario Hernandez',
    },
    description: 'Desarrollador Front-End especializado en React, Next.js y TypeScript. Construyo interfaces modernas, responsivas y con animaciones de alto impacto.',
    keywords: ['Desarrollador Front-End', 'React', 'Next.js', 'TypeScript', 'Framer Motion', 'México', 'Chiapas', 'UI/UX', 'Portafolio'],
    authors: [{ name: 'Dario Hernandez', url: BASE_URL }],
    creator: 'Dario Hernandez',

    openGraph: {
        type: 'website',
        locale: 'es_MX',
        url: BASE_URL,
        siteName: 'Dario Hernandez — Portafolio',
        title: 'Dario Hernandez — Desarrollador Front-End',
        description: 'Desarrollador Front-End especializado en React, Next.js y TypeScript. Interfaces modernas con animaciones de alto impacto.',
        images: [
            {
                url: '/opengraph-image',
                width: 1200,
                height: 630,
                alt: 'Dario Hernandez — Desarrollador Front-End',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Dario Hernandez — Desarrollador Front-End',
        description: 'Desarrollador Front-End especializado en React, Next.js y TypeScript.',
        images: ['/opengraph-image'],
        creator: '@dariohg',
    },

    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/icon.svg', type: 'image/svg+xml' },
        ],
        apple: '/apple-touch-icon.png',
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    alternates: {
        canonical: BASE_URL,
    },

    verification: {
        google: '',
    },
}

const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dario Hernandez',
    url: BASE_URL,
    jobTitle: 'Desarrollador Front-End',
    description: 'Desarrollador Front-End especializado en React, Next.js y TypeScript.',
    sameAs: [
        'https://github.com/Dariohg',
        'https://www.linkedin.com/in/rubén-dario-hernandez-gonzález-549bbb249/',
    ],
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Node.js'],
    nationality: 'Mexican',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'MX',
        addressRegion: 'Chiapas',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
        {/* Aplica el tema antes del primer paint — evita flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}` }} />
        <body
            className={`${inter.variable} ${caveat.variable} ${spaceGrotesk.variable} font-sans antialiased`}
            suppressHydrationWarning
        >
        {/* Hidden SVG filter definitions — referenced globally by animated-background and other components */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="paint-filter" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04 0.06" numOctaves="4" seed="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="brushstroke-filter" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="turbulence" baseFrequency="0.02 0.08" numOctaves="3" seed="5" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="film-grain" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
              <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
              <feComposite in="blend" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
        </svg>

        {/* Global grain overlay — sits above all UI, mimics film/print grain */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99998,
            pointerEvents: 'none',
            opacity: 0.035,
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain-global" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.75 0.75" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain-global)" />
          </svg>
        </div>

        <LoadingScreen />
        <ThemeTransitionProvider>
            <CustomCursor />
            <SmoothScroll>
                <Suspense fallback={null}>{children}</Suspense>
            </SmoothScroll>
            <Toaster />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
            />
        </ThemeTransitionProvider>
        </body>
        </html>
    )
}
