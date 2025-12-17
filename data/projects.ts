import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "bovara-mobile-app",
    title: "Bovara: Gestión Ganadera",
    description: "Aplicación móvil nativa para la gestión de inventario y sanidad animal.",
    longDescription:
        "Aplicación móvil nativa desarrollada en Kotlin y Jetpack Compose para la gestión integral de operaciones ganaderas. Diseñada bajo arquitectura MVVM con inyección de dependencias (Koin), permite el control de inventario, seguimiento de vacunación, registro de medicamentos y trazabilidad. Cuenta con persistencia de datos local mediante Room Database y sincronización de respaldo en la nube con Firebase.",
    category: "Mobile Development",
    image: null,
    stack: ["Kotlin", "Jetpack Compose", "Room DB", "Koin", "Firebase"],
    links: {
      github: "https://github.com/Dariohg/bovara",
    },
    contribution:
        "Diseño y desarrollo completo de la aplicación nativa, definición de arquitectura MVVM, implementación de base de datos local y lógica de negocio.",
    featured: true,
  },
  {
    id: "emotion-ai",
    title: "Emotion AI",
    description: "IA para análisis de atención, emociones y estados cognitivos en tiempo real.",
    longDescription:
        "Sistema de inteligencia artificial integrado en móvil para analizar el estado del usuario en tiempo real mediante visión artificial. Utiliza modelos de TensorFlow Lite y Google ML Kit para procesar el flujo de la cámara y detectar métricas complejas como: nivel de atención, frustración, confusión y somnolencia. El sistema fue desarrollado como un paquete modular en Flutter, optimizado para inferencia en el dispositivo (Edge AI).",
    category: "AI & Mobile",
    image: null,
    stack: ["Flutter", "Dart", "TensorFlow Lite", "Google ML Kit", "Computer Vision"],
    links: {
      github: "https://github.com/Dariohg/simulated_app",
    },
    contribution:
        "Implementación de modelos TFLite personalizados, algoritmos de cálculo de atención y somnolencia basados en landmarks faciales, y optimización de rendimiento en tiempo real.",
    featured: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)