import type { Education } from "@/types"

export const education: Education[] = [
  {
    institution: "Universidad Politecnica De Chiapas",
    degree: "Ingeniería en Desarrollo de Software",
    period: "2022 - 2025",
    description: "Especialización en desarrollo de software",
    type: "degree",
  },
  {
    institution: "AWS",
    degree: "AWS Certified Solutions Architect",
    period: "2023",
    description: "Certificación profesional en arquitectura de soluciones en AWS",
    type: "certification",
    // Este es el que ya probaste y funciona:
    badgeId: "0fdd590f-068c-4b66-9bef-c0ea043287bb"
  },
  {
    institution: "Meta",
    degree: "Meta Front-End Developer Professional Certificate",
    period: "2022",
    type: "certification",
    description: "Certificación profesional de desarrollo Front-End de Meta",
    // Asignando el segundo ID de tu lista:
    badgeId: "a7ed99e7-6775-4aff-b56d-f09d89a66230"
  },
  {
    institution: "Google",
    degree: "Google Cloud Professional Cloud Architect",
    period: "2022",
    type: "certification",
    description: "Arquitectura de soluciones en la nube de Google",
    // Asignando el tercer ID de tu lista:
    badgeId: "0e2e8ed3-59e1-44c8-8640-945340f11e39"
  },
  // --- Agregando los badges extra que me diste ---
  {
    institution: "Certificación Adicional",
    degree: "Nombre de la Certificación 4", // <--- EDITA ESTO CON EL NOMBRE REAL
    period: "2023",
    type: "certification",
    description: "Descripción de tu cuarta insignia",
    // Asignando el cuarto ID:
    badgeId: "b79edf4b-b648-44a1-b15c-76b562cc120e"
  },
  {
    institution: "Certificación Adicional",
    degree: "Nombre de la Certificación 5", // <--- EDITA ESTO CON EL NOMBRE REAL
    period: "2023",
    type: "certification",
    description: "Descripción de tu quinta insignia",
    // Asignando el quinto ID:
    badgeId: "cb966d36-ddbf-46e6-8d23-ea2429005aa5"
  },
  // -----------------------------------------------
  {
    institution: "Udemy",
    degree: "Advanced React Patterns & Performance",
    period: "2023",
    type: "course",
  },
  {
    institution: "Frontend Masters",
    degree: "Complete Intro to Web Development",
    period: "2021",
    type: "course",
  },
]