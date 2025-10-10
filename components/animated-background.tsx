"use client"

import { useEffect, useState } from "react"

interface FloatingShape {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  shape: "circle" | "square" | "triangle" | "line"
}

export function AnimatedBackground() {
  const [shapes, setShapes] = useState<FloatingShape[]>([])

  useEffect(() => {
    const generatedShapes: FloatingShape[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      shape: ["circle", "square", "triangle", "line"][Math.floor(Math.random() * 4)] as FloatingShape["shape"],
    }))
    setShapes(generatedShapes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-10 z-0">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            animation: `float-slow ${shape.duration}s ease-in-out infinite`,
            animationDelay: `${shape.delay}s`,
          }}
        >
          {shape.shape === "circle" && (
            <div className="w-full h-full border-2 border-foreground/30 rounded-full sketch-circle" />
          )}
          {shape.shape === "square" && <div className="w-full h-full border-2 border-foreground/30 sketch-border" />}
          {shape.shape === "triangle" && (
            <div
              className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-foreground/30"
              style={{
                transform: "rotate(15deg)",
              }}
            />
          )}
          {shape.shape === "line" && (
            <div
              className="w-full h-0.5 bg-foreground/30"
              style={{
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
