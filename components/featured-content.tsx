"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useTheme } from "next-themes"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import AuthModal from "./auth-modal"

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
    type: "blog",
    coverImage: "/placeholder.svg?height=400&width=600",
    description: "Learn the basics of React and how to set up your first React application.",
    author: "Jane Smith",
  },
  {
    id: 3,
    title: "Mastering TypeScript",
    slug: "mastering-typescript",
    type: "ebook",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "Deep dive into TypeScript and learn how to write robust, type-safe code.",
    author: "John Doe",
  },
  {
    id: 4,
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    type: "blog",
    coverImage: "/placeholder.svg?height=400&width=600",
    description: "Learn the basics of React and how to set up your first React application.",
    author: "Jane Smith",
  },
]

const SLIDE_INTERVAL = 5000

export default function FeaturedContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const { theme = "light" } = useTheme()
  const router = useRouter()
  // This effect handles the automatic slideshow
  useEffect(() => {
    // Don't start a timer if we're animating
    if (isAnimating) return

    // Set up a timer for automatic slide transition
    const timer = setTimeout(() => {
      // Only proceed if we're not in the middle of an animation
      if (!isAnimating) {
        setIsAnimating(true)
        // Always go to the next slide in sequence
        setActiveIndex((prevIndex) => (prevIndex + 1) % featuredContent.length)

        // Clear animation flag after transition completes
        setTimeout(() => {
          setIsAnimating(false)
        }, 500)
      }
    }, SLIDE_INTERVAL)

    // Clean up the timer when component unmounts or dependencies change
    return () => clearTimeout(timer)
  }, [activeIndex, isAnimating])

  // Function to handle manual navigation
  const handleNavigation = (index: number) => {
    // Don't do anything if we're already animating
    if (isAnimating) return

    setIsAnimating(true)
    setActiveIndex(index)

    // Clear animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user)
      setUser(user || null)
    })
    return () => unsubscribe()
  }, [])

  const handleSignIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setIsAuthenticated(true)
      setUser(userCredential.user)
      setShowSignIn(false)
      toast.success("Successfully signed in!")
    } catch (error) {
      toast.error("Invalid email or password. Please try again.")
    }
  }

  const handleSignUp = async (email: string, password: string, name?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setIsAuthenticated(true)
      setUser({ ...userCredential.user, displayName: name })
      setShowSignUp(false)
      toast.success("Account successfully created!")
    } catch (error) {
      toast.error("Error creating account. Please try again.")
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      setIsAuthenticated(true)
      setUser(result.user)
      setShowSignIn(false)
      toast.success("Successfully signed in with Google!")
    } catch (error) {
      toast.error("An error occurred while signing in with Google. Please try again.")
    }
  }

  const handleReadClick = (slug: string, type: string) => {
    if (!isAuthenticated) {
      setShowSignIn(true)
    } else {
      router.push(type === "ebook" ? `/ebooks/${slug}` : `/blogs/${slug}`)
    }
  }

  // Calculate progress for the timer
  const [progress, setProgress] = useState(0)

  // Update progress every 50ms
  useEffect(() => {
    // Don't update progress if we're animating
    if (isAnimating) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Reset to 0 when we reach 100
        if (prev >= 100) {
          return 0
        }
        // Otherwise increment by a small amount
        return prev + (50 / SLIDE_INTERVAL) * 100
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isAnimating])

  // Reset progress when activeIndex changes
  useEffect(() => {
    setProgress(0)
  }, [activeIndex])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Content</h2>
          {/* Next and Previous Buttons */}
          <div className="absolute right-20 flex space-x-2 z-20">
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
          {/* Custom Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-20">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-50 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Slides */}
          {featuredContent.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "absolute inset-0 w-full transition-transform duration-500 ease-in-out",
                index === activeIndex
                  ? "translate-x-0 z-10" // Active slide
                  : index < activeIndex
                    ? "-translate-x-full z-0" // Previous slide
                    : "translate-x-full z-0", // Next slide
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Content Section */}
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

                {/* Image Section */}
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
        <AuthModal
          type="signIn"
          isVisible={showSignIn}
          onClose={() => setShowSignIn(false)}
          onGoogleSignIn={handleGoogleSignIn}
          onSubmit={handleSignIn}
          theme={theme}
        />
        <AuthModal
          type="signUp"
          isVisible={showSignUp}
          onClose={() => setShowSignUp(false)}
          onGoogleSignIn={handleGoogleSignIn}
          onSubmit={handleSignUp}
          theme={theme}
        />
      </div>
    </section>
  )
}
