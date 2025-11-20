import type React from "react"
import type { Metadata } from "next"
import { Caveat, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { SmoothScroll } from "@/components/smooth-scroll"
import {CustomCursor} from "@/components/ui/custom-cursor";


const caveat = Caveat({
    subsets: ["latin"],
    variable: "--font-caveat",
    weight: ["400", "500", "600", "700"],
})


const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
})

export const metadata: Metadata = {
    title: "Dariohg - Portafolio",
    description: "Desarrollador de Software",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
        <body
            className={`${inter.variable} ${caveat.variable} font-sans antialiased`}
            suppressHydrationWarning
        >
        <CustomCursor />
        <SmoothScroll>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Analytics />
        </SmoothScroll>
        </body>
        </html>
    )
}