'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/components/ui/dialog'
import { ExternalLink } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner' // Asegúrate de tener este componente o usa un texto

interface CredlyBadgeModalProps {
    badgeId: string
    degree: string
    description?: string
}

export function CredlyBadgeModal({ badgeId, degree, description }: CredlyBadgeModalProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="mt-2 text-primary hover:underline px-0 py-1 h-auto text-base"
                >
                    Ver Credencial <ExternalLink className="ml-1 w-4 h-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950">
                <DialogHeader>
                    <DialogTitle className="font-[family-name:var(--font-caveat)] text-2xl">
                        {degree}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className="text-muted-foreground">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <div className="flex justify-center items-center w-full min-h-[300px] py-4 relative">
                    {/* Loading State */}
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                            <Spinner className="w-8 h-8 text-primary mb-2" />
                            <span className="text-sm text-muted-foreground">Cargando credencial...</span>
                        </div>
                    )}

                    {/* Credly Embed Directo vía Iframe
                       La URL estándar es: https://www.credly.com/embedded_badge/{ID}
                    */}
                    <iframe
                        src={`https://www.credly.com/embedded_badge/${badgeId}`}
                        width="300"
                        height="320"
                        frameBorder="0"
                        allowFullScreen
                        title={`Credencial Credly: ${degree}`}
                        className="z-10 relative"
                        onLoad={() => setIsLoading(false)}
                        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}