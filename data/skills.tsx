import {
  Atom,
  Triangle,
  FileCode,
  Paintbrush,
  Layers,
  Server,
  Code,
  Database,
  Network,
  Container,
  Cloud,
  Workflow,
  GitBranch,
  Figma,
  Send,
  BookOpen,
  FlaskConical,
} from "lucide-react"
import type { SkillCategory } from "@/types"

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: "advanced", icon: Atom },
      { name: "Next.js", level: "intermediate", icon: Triangle },
      { name: "TypeScript", level: "intermediate", icon: FileCode },
      { name: "Tailwind CSS", level: "intermediate", icon: Paintbrush },
      { name: "Vue.js", level: "beginner", icon: Layers },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: "advanced", icon: Server },
      { name: "Python", level: "intermediate", icon: Code },
      { name: "PostgreSQL", level: "intermediate", icon: Database },
      { name: "MongoDB", level: "intermediate", icon: Database },
      { name: "GraphQL", level: "beginner", icon: Network },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Docker", level: "beginner", icon: Container },
      { name: "AWS", level: "intermediate", icon: Cloud },
      { name: "CI/CD", level: "beginner", icon: Workflow },
      { name: "Vercel", level: "intermediate", icon: Triangle },
    ],
  },
  {
    category: "Herramientas",
    skills: [
      { name: "Git", level: "advanced", icon: GitBranch },
      { name: "Figma", level: "advanced", icon: Figma },
      { name: "Storybook", level: "intermediate", icon: BookOpen },
      { name: "Jest", level: "intermediate", icon: FlaskConical },
      { name: "Postman", level: "advanced", icon: Send },
    ],
  },
]