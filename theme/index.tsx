export const theme = {
  colors: {
    // Colores principales del tema hand-drawn
    primary: {
      light: "oklch(0.15 0.01 285)",
      dark: "oklch(0.96 0.01 85)",
    },
    background: {
      light: "oklch(0.99 0.01 85)",
      dark: "oklch(0.12 0.01 285)",
    },
    foreground: {
      light: "oklch(0.15 0.01 285)",
      dark: "oklch(0.96 0.01 85)",
    },
    muted: {
      light: "oklch(0.96 0.01 85)",
      dark: "oklch(0.18 0.01 285)",
    },
    accent: {
      light: "oklch(0.94 0.01 85)",
      dark: "oklch(0.22 0.01 285)",
    },
    border: {
      light: "oklch(0.2 0.01 285)",
      dark: "oklch(0.8 0.01 85)",
    },
  },

  typography: {
    fonts: {
      handwritten: "var(--font-caveat)",
      body: "var(--font-inter)",
    },
    sizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },
  },

  spacing: {
    section: {
      sm: "5rem", // 80px
      md: "8rem", // 128px
      lg: "10rem", // 160px
    },
    container: {
      padding: "1.5rem", // 24px
    },
  },

  borderRadius: {
    sketch: {
      sm: "8px 12px 10px 14px / 14px 10px 12px 8px",
      md: "255px 15px 225px 15px / 15px 225px 15px 255px",
      circle: "50% 48% 52% 50% / 50% 52% 48% 50%",
    },
  },

  skillLevels: {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    expert: "Experto",
  },
} as const

export type Theme = typeof theme
export type SkillLevel = keyof typeof theme.skillLevels
