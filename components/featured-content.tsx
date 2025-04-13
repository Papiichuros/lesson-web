"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import {ChevronLeft, ChevronRight, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TimerProgress } from "@/components/timer-progress"

// Mock data for featured content
const featuredContent = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    type: "ebook",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A comprehensive guide to modern web development practices and technologies.",
    author: "Jane Smith",
  },
  {
    id: 2,
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    type: "article",
    coverImage: "/placeholder.svg?height=400&width=600",
    description: "Learn the basics of React and how to set up your first React application.",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "JavaScript Mastery",
    slug: "javascript-mastery",
    type: "ebook",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "Master JavaScript from basics to advanced concepts with practical examples.",
    author: "John Doe",
  },
  {
    id: 4,
    title: "CSS Grid Layout Tutorial",
    slug: "css-grid-layout-tutorial",
    type: "article",
    coverImage: "/placeholder.svg?height=400&width=600",
    description: "Master CSS Grid Layout with this comprehensive tutorial.",
    author: "John Doe",
  },
]

// Slide interval in milliseconds
const SLIDE_INTERVAL = 5000

export default function FeaturedContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  const nextSlide = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prev) => (prev === featuredContent.length - 1 ? 0 : prev + 1))

    // Briefly pause the timer during animation
    setIsTimerRunning(false)

    setTimeout(() => {
      setIsAnimating(false)
      // Resume the timer after animation completes
      setIsTimerRunning(true)
    }, 500)
  }, [isAnimating, featuredContent.length])

  // Update the prevSlide function similarly
  const prevSlide = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? featuredContent.length - 1 : prev - 1))

    // Briefly pause the timer during animation
    setIsTimerRunning(false)

    setTimeout(() => {
      setIsAnimating(false)
      // Resume the timer after animation completes
      setIsTimerRunning(true)
    }, 500)
  }, [isAnimating, featuredContent.length])

  // Update the goToSlide function similarly
  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return

      setIsAnimating(true)
      setActiveIndex(index)

      // Briefly pause the timer during animation
      setIsTimerRunning(false)

      setTimeout(() => {
        setIsAnimating(false)
        // Resume the timer after animation completes
        setIsTimerRunning(true)
      }, 500)
    },
    [isAnimating, activeIndex],
  )

  // Pause auto-advance on hover
  const pauseSlideshow = () => {
    setIsTimerRunning(false)
  }

  const resumeSlideshow = () => {
    setIsTimerRunning(true)
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Content</h2>
            <p className="text-slate-600">Handpicked resources to help you learn and grow</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button size="icon" onClick={prevSlide} className="rounded-full bg-blue-600 hover:bg-blue-700">
              <ChevronLeft size={18} />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button size="icon" onClick={nextSlide} className="rounded-full bg-blue-600 hover:bg-blue-700">
              <ChevronRight size={18} />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-xl bg-white shadow-lg"
          style={{ minHeight: "500px" }}
          onMouseEnter={pauseSlideshow}
          onMouseLeave={resumeSlideshow}
        >
          {/* Magic UI Timer Progress component */}
          <TimerProgress
            thickness={3}
            position="bottom"
            duration={SLIDE_INTERVAL}
            isRunning={isTimerRunning && !isAnimating}
            onComplete={nextSlide}
          />

          {featuredContent.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "absolute inset-0 w-full transition-all duration-500 ease-in-out",
                index === activeIndex
                  ? "opacity-100 translate-x-0 z-10"
                  : index < activeIndex
                    ? "opacity-0 -translate-x-full z-0"
                    : "opacity-0 translate-x-full z-0",
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span
                      className={`inline-block text-sm px-3 py-1 rounded-full ${
                        item.type === "ebook" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.type === "ebook" ? "eBook" : "Article"}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">By {item.author}</p>
                  <p className="text-slate-700 mb-6">{item.description}</p>
                  <div>
                    <Link href={item.type === "ebook" ? `/ebooks/${item.slug}` : `/articles/${item.slug}`}>
                      <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                        {item.type === "ebook" ? <BookOpen size={16} /> : <FileText size={16} />}
                        Read {item.type === "ebook" ? "eBook" : "Article"}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center bg-slate-100 p-8">
                  <img
                    src={item.coverImage || "/placeholder.svg"}
                    alt={item.title}
                    className="max-h-80 object-contain rounded-md shadow-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {featuredContent.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === activeIndex ? "bg-blue-600 w-8" : "bg-blue-300",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
