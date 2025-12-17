// components/contact-form.tsx
'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contactFormSchema, type ContactFormData } from "@/lib/schemas"
import { sendEmail } from "@/app/actions/send-email"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send } from "lucide-react"

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
            _honey: "", // Campo oculto vacío por defecto
        },
    })

    async function onSubmit(data: ContactFormData) {
        setIsSubmitting(true)
        try {
            const response = await sendEmail(data)

            if (response.success) {
                toast({
                    title: "¡Mensaje enviado!",
                    description: "Gracias por contactarme. Te responderé pronto.",
                })
                form.reset()
                if (onSuccess) onSuccess()
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.error || "Algo salió mal.",
                })
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Hubo un problema de conexión.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Campo Honeypot Oculto */}
                <input type="text" {...form.register("_honey")} className="hidden" aria-hidden="true" autoComplete="off" tabIndex={-1} />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Tu nombre" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="tucorreo@ejemplo.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mensaje</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Cuéntame sobre tu proyecto..."
                                    className="min-h-[120px] resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full sketch-box font-bold" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" /> Enviar Mensaje
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}