"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"

const featuredContent = [
  {
    id: 1,
    title: "The Lottery",
    slug: "the-lottery",
    type: "ebook",
    coverImage: "/images/pic1.png?height=400&width=300",
    description: " The Lottery is a short story by Shirley Jackson, first published in 1948. It explores themes of tradition, conformity, and the dark side of human nature.",
    author: "Shirley Jackson",
  },
  {
    id: 2,
    title: "Collaborative Learning",
    slug: "collaborative-learning",
    type: "blog",
    coverImage: "/images/blog.jpg?height=400&width=600",
    description: "Tackle social media regulation through argumentative writing.",
  },
]

const SLIDE_INTERVAL = 5000

export default function FeaturedContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  // This effect handles the automatic slideshow
  useEffect(() => {
    if (isAnimating) return

    const timer = setTimeout(() => {
      if (!isAnimating) {
        setIsAnimating(true)
        setActiveIndex((prevIndex) => (prevIndex + 1) % featuredContent.length)

        setTimeout(() => {
          setIsAnimating(false)
        }, 500)
      }
    }, SLIDE_INTERVAL)

    return () => clearTimeout(timer)
  }, [activeIndex, isAnimating])

  const handleNavigation = (index: number) => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex(index)

    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const handleReadClick = (slug: string, type: string) => {
    router.push(type === "ebook" ? `/ebooks/${slug}` : `/blogs/${slug}`)
  }

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isAnimating) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + (50 / SLIDE_INTERVAL) * 100
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isAnimating])

  useEffect(() => {
    setProgress(0)
  }, [activeIndex])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Content</h2>
          <div className="absolute right-32 flex space-x-2 z-20">
            <button
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md hover:opacity-90"
              onClick={() => {
                const prevIndex = (activeIndex - 1 + featuredContent.length) % featuredContent.length
                handleNavigation(prevIndex)
              }}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md hover:opacity-90"
              onClick={() => {
                const nextIndex = (activeIndex + 1) % featuredContent.length
                handleNavigation(nextIndex)
              }}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-white shadow-lg" style={{ minHeight: "500px" }}>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-20">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          {featuredContent.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "absolute inset-0 w-full transition-transform duration-500 ease-in-out",
                index === activeIndex
                  ? "translate-x-0 z-10"
                  : index < activeIndex
                  ? "-translate-x-full z-0"
                  : "translate-x-full z-0",
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-700 mb-6">{item.description}</p>
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-4 py-2 shadow-md hover:opacity-90"
                    onClick={() => handleReadClick(item.slug, item.type)}
                  >
                    {item.type === "ebook" ? <BookOpen size={16} /> : <FileText size={16} />}
                    Read {item.type === "ebook" ? "eBook" : "Blog"}
                  </Button>
                </div>
                <div className="relative">
                  <Image
                    src={item.coverImage || "/placeholder.svg"}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-r-xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
