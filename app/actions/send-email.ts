// app/actions/send-email.ts
'use server'

import { contactFormSchema } from "@/lib/schemas"
import FormData from 'form-data'
import Mailgun from 'mailgun.js'

const mailgun = new Mailgun(FormData)
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
    // url: 'https://api.eu.mailgun.net', // Descomenta solo si es región Europa
})

// ... (MANTÉN AQUÍ TUS FUNCIONES DE ESTILOS getAdminEmailHtml Y getUserConfirmationHtml IGUAL QUE ANTES) ...
// Copia y pega aquí las funciones styles, getAdminEmailHtml, y getUserConfirmationHtml del código anterior
// Para ahorrar espacio, pongo solo la función sendEmail modificada abajo:

// --- Asegúrate de tener las funciones de HTML arriba ---
// (Si necesitas que te las pase de nuevo dímelo, pero son las mismas del paso anterior)

const styles = {
    container: `
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    color: #1a1a1a;
    line-height: 1.6;
  `,
    header: `
    padding: 20px 0;
    text-align: center;
    border-bottom: 2px solid #000;
    margin-bottom: 30px;
  `,
    logo: `
    font-size: 24px;
    font-weight: 700;
    text-decoration: none;
    color: #000;
    letter-spacing: -0.5px;
  `,
    contentBox: `
    padding: 30px;
    border: 2px solid #000;
    border-radius: 8px;
    background-color: #fafafa;
    box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
    margin-bottom: 30px;
  `,
    heading: `
    font-size: 22px;
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 20px;
    color: #000;
  `,
    text: `
    font-size: 16px;
    color: #444;
    margin-bottom: 15px;
  `,
    label: `
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
    color: #666;
    display: block;
    margin-bottom: 5px;
  `,
    messageBody: `
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 4px;
    font-style: italic;
    white-space: pre-wrap;
  `,
    button: `
    display: inline-block;
    padding: 12px 24px;
    background-color: #000;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    border-radius: 4px;
    margin-top: 20px;
  `,
    footer: `
    text-align: center;
    font-size: 12px;
    color: #888;
    margin-top: 40px;
    border-top: 1px solid #eaeaea;
    padding-top: 20px;
  `
}

function getAdminEmailHtml(name: string, email: string, message: string) {
    return `
    <div style="${styles.container}">
      <div style="${styles.header}">
        <span style="${styles.logo}">Dario Hernandez</span>
      </div>
      
      <div style="${styles.contentBox}">
        <h2 style="${styles.heading}">Nuevo mensaje recibido</h2>
        
        <p style="${styles.text}">Has recibido un nuevo contacto a través de tu portafolio.</p>
        
        <div style="margin-bottom: 20px;">
          <span style="${styles.label}">De:</span>
          <div style="font-size: 16px; font-weight: 500;">${name} (${email})</div>
        </div>

        <div style="margin-bottom: 20px;">
           <span style="${styles.label}">Mensaje:</span>
           <div style="${styles.messageBody}">${message}</div>
        </div>
        
        <a href="mailto:${email}" style="${styles.button}">Responder ahora</a>
      </div>
      
      <div style="${styles.footer}">
        Recibido desde dariohernandez.dev
      </div>
    </div>
  `
}

function getUserConfirmationHtml(name: string) {
    return `
    <div style="${styles.container}">
      <div style="${styles.header}">
        <span style="${styles.logo}">Dario Hernandez</span>
      </div>
      
      <div style="${styles.contentBox}">
        <h2 style="${styles.heading}">¡Hola ${name}!</h2>
        
        <p style="${styles.text}">
          Muchas gracias por escribirme. He recibido tu mensaje correctamente.
        </p>
        
        <p style="${styles.text}">
          Revisaré tu consulta y te responderé lo antes posible (usualmente en menos de 24 horas).
        </p>

        <p style="${styles.text}">
          Mientras tanto, puedes echar un vistazo a mis últimos proyectos en mi portafolio o conectar conmigo en LinkedIn.
        </p>
        
        <div style="margin-top: 30px; text-align: center;">
             <a href="https://dariohernandez.dev" style="${styles.button}">Volver al Portafolio</a>
        </div>
      </div>
      
      <div style="${styles.footer}">
        &copy; ${new Date().getFullYear()} Dario Hernandez. Desarrollador Front-End.<br>
        Este es un mensaje automático, por favor no respondas a este correo.
      </div>
    </div>
  `
}

export async function sendEmail(data: unknown) {
    const result = contactFormSchema.safeParse(data)

    if (!result.success) {
        return { success: false, error: "Datos inválidos. Por favor revisa el formulario." }
    }

    const { name, email, message, _honey } = result.data

    if (_honey) return { success: true }

    const domain = process.env.MAILGUN_DOMAIN || ''
    const fromAddress = `Dario Hernandez <${process.env.EMAIL_FROM}>`

    // PASO A: Enviar correo al ADMIN (Esto es lo importante, NO debe fallar)
    try {
        await mg.messages.create(domain, {
            from: `Portafolio Contacto <${process.env.EMAIL_FROM}>`,
            to: [process.env.EMAIL_TO || ''],
            subject: `Nuevo mensaje de ${name}`,
            text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
            html: getAdminEmailHtml(name, email, message),
            'h:Reply-To': email,
        })
    } catch (error) {
        console.error("Error crítico enviando al admin:", error)
        return { success: false, error: "Error al conectar con el servidor de correo." }
    }

    // PASO B: Enviar confirmación al USUARIO (Opcional en Sandbox)
    // Usamos un try/catch separado para que si falla (por no estar autorizado), no rompa el envío anterior.
    try {
        await mg.messages.create(domain, {
            from: fromAddress,
            to: [email],
            subject: `He recibido tu mensaje - Dario Hernandez`,
            text: `Hola ${name}, gracias por contactarme.`,
            html: getUserConfirmationHtml(name),
        })
    } catch (error) {
        // Solo hacemos log, no devolvemos error al cliente
        console.warn("No se pudo enviar la confirmación (Posible limitación de Sandbox):", error)
    }

    return { success: true }
}