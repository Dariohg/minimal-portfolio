import type React from "react"
import type { SkillLevel } from "@/theme"

export interface Skill {
  name: string
  level: SkillLevel
  icon: React.ComponentType<{ className?: string }>
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  image?: string | null
  stack: string[]
  links: {
    demo?: string
    github?: string
    live?: string
  }
  contribution: string
  featured?: boolean
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  type: "full-time" | "freelance" | "contract"
}

export interface Education {
  institution: string
  degree: string
  period: string
  description?: string
  type: "degree" | "certification" | "course"
  badgeId?: string
}
