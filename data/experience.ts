import type { Experience } from "@/types"

export const experiences: Experience[] = [
  {
    company: "Tech Solutions Inc.",
    role: "Senior Full Stack Developer",
    period: "2022 - Presente",
    description: "Liderando el desarrollo de aplicaciones web empresariales",
    achievements: [
      "Reduje el tiempo de carga de la aplicación principal en un 60% mediante optimizaciones",
      "Implementé arquitectura de microservicios que mejoró la escalabilidad",
      "Mentoricé a 5 desarrolladores junior en mejores prácticas de React y TypeScript",
      "Lideré la migración de Pages Router a App Router en Next.js 14",
    ],
    type: "full-time",
  },
  {
    company: "StartupXYZ",
    role: "Frontend Developer",
    period: "2020 - 2022",
    description: "Desarrollo de interfaces de usuario modernas y responsivas",
    achievements: [
      "Construí el sistema de diseño de la empresa desde cero",
      "Implementé testing automatizado que redujo bugs en producción en 40%",
      "Colaboré con diseñadores para crear experiencias de usuario excepcionales",
    ],
    type: "full-time",
  },
  {
    company: "Freelance",
    role: "Desarrollador Web Full Stack",
    period: "2019 - 2020",
    description: "Proyectos diversos para clientes internacionales",
    achievements: [
      "Completé más de 20 proyectos exitosos para clientes en 5 países",
      "Mantuve una calificación de 5 estrellas en plataformas freelance",
      "Desarrollé soluciones personalizadas en React, Vue y Node.js",
    ],
    type: "freelance",
  },
]
