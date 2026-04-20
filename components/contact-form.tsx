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
import { motion } from "framer-motion"

// ─── Styled label ───────────────────────────────────────────────────────────────
function ZaunLabel({ children }: { children: React.ReactNode }) {
  return (
    <FormLabel className="font-mono text-sm font-medium text-secondary">
      {children}
    </FormLabel>
  )
}

// ─── Styled error ───────────────────────────────────────────────────────────────
function ZaunError() {
  return (
    <FormMessage className="text-primary text-xs font-mono" />
  )
}

// ─── Input styles ───────────────────────────────────────────────────────────────
const inputClass = [
  'bg-white/5 border border-white/15 font-mono text-sm text-white/90 placeholder:text-white/30',
  'focus-visible:border-primary/60 focus-visible:ring-0 focus-visible:outline-none',
  'focus-visible:shadow-[0_0_15px_oklch(0.72_0.28_320_/_0.2)]',
].join(' ')

export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting]   = useState(false)
  const [isSuccess, setIsSuccess]         = useState(false)
  const { toast } = useToast()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name:    '',
      email:   '',
      message: '',
      _honey:  '',
    },
  })

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true)
    try {
      const response = await sendEmail(data)

      if (response.success) {
        toast({
          title:       '¡Mensaje enviado!',
          description: 'Gracias por contactarme. Te responderé pronto.',
        })
        // Flash success state before closing
        setIsSuccess(true)
        form.reset()
        setTimeout(() => {
          setIsSuccess(false)
          if (onSuccess) onSuccess()
        }, 800)
      } else {
        toast({
          variant:     'destructive',
          title:       'Error',
          description: response.error || 'Algo salió mal.',
        })
      }
    } catch {
      toast({
        variant:     'destructive',
        title:       'Error',
        description: 'Hubo un problema de conexión.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot */}
        <input
          type="text"
          {...form.register('_honey')}
          className="hidden"
          aria-hidden="true"
          autoComplete="off"
          tabIndex={-1}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <ZaunLabel>Nombre</ZaunLabel>
              <FormControl>
                <Input
                  placeholder="Tu nombre"
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <ZaunError />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <ZaunLabel>Email</ZaunLabel>
              <FormControl>
                <Input
                  placeholder="tucorreo@ejemplo.com"
                  type="email"
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <ZaunError />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <ZaunLabel>Mensaje</ZaunLabel>
              <FormControl>
                <Textarea
                  placeholder="Cuéntame sobre tu proyecto..."
                  className={`min-h-[120px] resize-none ${inputClass}`}
                  {...field}
                />
              </FormControl>
              <ZaunError />
            </FormItem>
          )}
        />

        {/* Submit */}
        <motion.div
          whileHover={!isSubmitting && !isSuccess ? {
            boxShadow: '0 0 20px oklch(0.72 0.28 320 / 0.4), 0 0 40px oklch(0.72 0.28 320 / 0.2)',
          } : {}}
          transition={{ duration: 0.2 }}
        >
          <Button
            type="submit"
            className="w-full sketch-border-heavy bg-primary text-primary-foreground font-semibold"
            disabled={isSubmitting || isSuccess}
            style={isSuccess ? {
              color:      'oklch(0.65 0.25 195)',
              background: 'transparent',
              borderColor: 'oklch(0.65 0.25 195 / 0.5)',
            } : undefined}
          >
            {isSuccess ? (
              'Mensaje enviado'
            ) : isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar mensaje
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}
