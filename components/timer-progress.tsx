"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimerProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  progressColor?: string
  trackColor?: string
  thickness?: number
  position?: "top" | "bottom"
  duration?: number
  isRunning?: boolean
  onComplete?: () => void
  containerClassName?: string
  progressClassName?: string
  trackClassName?: string
}

export const TimerProgress = React.forwardRef<HTMLDivElement, TimerProgressProps>(
  (
    {
      progressColor = "bg-gradient-to-r from-[#0000FF] via-[#00FFFF] to-[#89CFF0]",
      trackColor = "bg-muted/50",
      thickness = 4,
      position = "bottom",
      duration = 6000,
      isRunning = true,
      onComplete,
      className,
      containerClassName,
      progressClassName,
      trackClassName,
      ...props
    },
    ref,
  ) => {
    const [progress, setProgress] = React.useState(0)
    const progressIntervalRef = React.useRef<NodeJS.Timeout | null>(null)
    const lastUpdateTimeRef = React.useRef<number>(Date.now())

    React.useEffect(() => {
      if (!isRunning) {
        // Just clear the interval when not running
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
          progressIntervalRef.current = null
        }
        return
      }

      // Set initial time reference
      lastUpdateTimeRef.current = Date.now()

      // Clear any existing interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }

      // Update progress every 16ms (roughly 60fps)
      progressIntervalRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = now - lastUpdateTimeRef.current
        const increment = (elapsed / duration) * 100

        setProgress((prev) => {
          const newProgress = prev + increment

          // If we've reached 100%, call onComplete and reset
          if (newProgress >= 100) {
            if (onComplete) {
              setTimeout(() => onComplete(), 0) // Ensure onComplete is called outside render
            }
            return 0
          }

          return newProgress
        })

        lastUpdateTimeRef.current = now
      }, 16)

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
          progressIntervalRef.current = null
        }
      }
    }, [isRunning, duration, onComplete])

    return (
      <div
        ref={ref}
        className={cn(
          "w-full absolute left-0 z-20",
          position === "top" ? "top-0" : "bottom-0",
          containerClassName,
          className,
        )}
        {...props}
      >
        <div className={cn("w-full", trackColor, trackClassName)} style={{ height: thickness }}>
          <div
            className={cn("h-full transition-all duration-[16ms] ease-linear", progressColor, progressClassName)}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  },
)

TimerProgress.displayName = "TimerProgress"
