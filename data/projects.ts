import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "Plataforma E-commerce",
    description: "Tienda online completa con carrito de compras y pasarela de pagos",
    longDescription:
        "Desarrollé una plataforma de e-commerce completa desde cero utilizando Next.js 14 y el App Router. La aplicación incluye un sistema de autenticación robusto, gestión de inventario en tiempo real, carrito de compras persistente, integración con Stripe para pagos, y un panel de administración completo. Implementé optimizaciones de rendimiento como ISR y streaming para mejorar la experiencia del usuario.",
    category: "Full Stack",
    image: "/modern-minimalist-app-interface-design.jpg",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe", "Vercel"],
    links: {
      demo: "https://demo.example.com",
      github: "https://github.com/usuario/proyecto",
      live: "https://proyecto.com",
    },
    contribution:
        "Arquitectura completa, desarrollo frontend y backend, integración de pagos, despliegue y optimización",
    featured: true,
  },
  {
    id: "task-management",
    title: "Sistema de Gestión de Tareas",
    description: "Aplicación colaborativa para equipos con tableros Kanban",
    longDescription:
        "Creé una aplicación de gestión de tareas estilo Trello con funcionalidades de colaboración en tiempo real. Utilicé React para el frontend con drag-and-drop, Node.js para el backend, y WebSockets para actualizaciones en tiempo real. Los usuarios pueden crear tableros, listas y tarjetas, asignar tareas a miembros del equipo, establecer fechas límite y recibir notificaciones.",
    category: "Web App",
    image: "/clean-corporate-website-design.jpg",
    stack: ["React", "Node.js", "MongoDB", "Socket.io", "Express", "Redux"],
    links: {
      github: "https://github.com/usuario/task-manager",
      live: "https://tasks.example.com",
    },
    contribution:
        "Desarrollo full-stack, implementación de WebSockets, diseño de base de datos, sistema de autenticación",
    featured: true,
  },
  {
    id: "design-system",
    title: "Sistema de Diseño Corporativo",
    description: "Librería de componentes reutilizables para productos empresariales",
    longDescription:
        "Diseñé e implementé un sistema de diseño completo para una empresa con más de 50 componentes reutilizables. Incluye documentación interactiva con Storybook, tokens de diseño, guías de accesibilidad y mejores prácticas. El sistema está construido con React y TypeScript, publicado como paquete npm privado.",
    category: "Design System",
    image: "/design-system-ui-kit.png",
    stack: ["React", "TypeScript", "Storybook", "CSS Modules", "Figma"],
    links: {
      demo: "https://storybook.example.com",
    },
    contribution: "Diseño de componentes, implementación en React, documentación, tokens de diseño, guías de uso",
    featured: true,
  },
  {
    id: "analytics-dashboard",
    title: "Dashboard de Analytics",
    description: "Panel de control con visualización de datos en tiempo real",
    longDescription:
        "Desarrollé un dashboard interactivo para visualizar métricas de negocio en tiempo real. Incluye gráficos personalizados, filtros avanzados, exportación de datos y reportes automatizados. Utilicé React Query para el manejo de estado del servidor y Recharts para las visualizaciones.",
    category: "Data Visualization",
    image: "/minimalist-ecommerce-shop-design.jpg",
    stack: ["Next.js", "React Query", "Recharts", "PostgreSQL", "Prisma"],
    links: {
      demo: "https://analytics.example.com",
    },
    contribution: "Desarrollo frontend, integración con APIs, optimización de queries, diseño de visualizaciones",
    featured: false,
  },
  {
    id: "mobile-app",
    title: "App Móvil de Fitness",
    description: "Aplicación para seguimiento de ejercicios y nutrición",
    longDescription:
        "Creé una aplicación móvil multiplataforma para seguimiento de fitness usando React Native. Incluye planes de entrenamiento personalizados, seguimiento de calorías, integración con dispositivos wearables, y gamificación para motivar a los usuarios.",
    category: "Mobile",
    image: "/modern-minimalist-app-interface-design.jpg",
    stack: ["React Native", "Expo", "Firebase", "TypeScript"],
    links: {
      github: "https://github.com/usuario/fitness-app",
    },
    contribution: "Desarrollo completo de la app, integración con APIs de salud, diseño UX/UI",
    featured: false,
  },
  {
    id: "api-gateway",
    title: "API Gateway Microservicios",
    description: "Gateway para orquestar múltiples microservicios",
    longDescription:
        "Implementé un API Gateway robusto para gestionar la comunicación entre múltiples microservicios. Incluye autenticación centralizada, rate limiting, caching, logging y monitoreo. Construido con Node.js y desplegado en AWS con alta disponibilidad.",
    category: "Backend",
    image: "/clean-corporate-website-design.jpg",
    stack: ["Node.js", "Express", "Redis", "AWS", "Docker", "Kubernetes"],
    links: {
      github: "https://github.com/usuario/api-gateway",
    },
    contribution: "Arquitectura de microservicios, implementación del gateway, configuración de infraestructura",
    featured: false,
  },
  {
    id: "bovara-mobile-app",
    title: "Bovara: Gestión Ganadera",
    description: "Aplicación móvil nativa (Kotlin/Jetpack Compose) para la gestión de inventario, sanidad y trazabilidad de ganado.",
    longDescription:
        "Aplicación móvil nativa desarrollada en Kotlin y Jetpack Compose para la gestión completa de operaciones ganaderas. Bovara está diseñada bajo arquitectura MVVM con inyección de dependencias Koin. Incluye control de inventario, módulo de vacunación, registro de medicamentos y persistencia de datos mediante Room Database, con funciones para respaldo a Firebase.",
    category: "Mobile",
    image: null,
    stack: ["Kotlin", "Jetpack Compose", "Room DB", "Koin", "Firebase"],
    links: {
      github: "URL_DEL_REPOSITORIO_DE_BOVARA",
    },
    contribution:
        "Diseño y desarrollo completo de la aplicación móvil nativa, implementación de la arquitectura MVVM, lógica de persistencia de datos y módulos de sanidad.",
    featured: true,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)