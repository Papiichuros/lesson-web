"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  inViewMargin?: string
  fadeDirection?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  delay?: number
  blur?: number
  scale?: number
  once?: boolean
}

export function BlurFade({
  children,
  className,
  inViewMargin = "0px",
  fadeDirection = "up",
  duration = 600,
  delay = 0,
  blur = 10,
  scale = 0.95,
  once = true,
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      { rootMargin: inViewMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [inViewMargin, once])

  const getTransform = () => {
    if (fadeDirection === "none") return ""
    
    const translateMap = {
      up: "translateY(20px)",
      down: "translateY(-20px)",
      left: "translateX(20px)",
      right: "translateX(-20px)",
    }
    
    return `${translateMap[fadeDirection]} scale(${scale})`
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isInView ? 1 : 0,
        filter: isInView ? "blur(0)" : `blur(${blur}px)`,
        transform: isInView ? "translateY(0) scale(1)" : getTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, filter ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
