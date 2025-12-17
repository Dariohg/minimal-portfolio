import { z } from "zod"

export const contactFormSchema = z.object({
    name: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, introduce un email válido.",
    }),
    message: z.string().min(10, {
        message: "El mensaje debe tener al menos 10 caracteres.",
    }).max(1000, {
        message: "El mensaje es demasiado largo.",
    }),
    // Campo "Honeypot" oculto para bots. Si se llena, es spam.
    _honey: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>