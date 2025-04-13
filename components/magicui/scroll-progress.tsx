"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, useScroll } from "motion/react";
import React from "react";
interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 origin-left bg-gradient-to-r from-[#0000FF] via-[#00FFFF] to-[#89CFF0]",
        className,
      )}
      style={{
        scaleX: scrollYProgress,
        height: "2px", // Adjust the thickness of the line here
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";
