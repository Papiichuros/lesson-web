"use client"

import { useState, useCallback, useEffect } from "react"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TimerProgress } from "@/components/timer-progress"
import Image from "next/image"
import { useRouter } from "next/navigation" // Updated import
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card" // Import Card components
import { MagicCard } from "@/components/magicui/magic-card" // Import MagicCard component
import { Label } from "@/components/ui/label" // Import Label component
import { Input } from "@/components/ui/input" // Import Input component
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

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
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Track authentication status
  const { theme } = useTheme() // Dynamically retrieve the current theme
  const [showSignUp, setShowSignUp] = useState(false) // Define showSignUp state
  const [showSignIn, setShowSignIn] = useState(false) // Track Sign In modal visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is signed in
      } else {
        setIsAuthenticated(false); // User is signed out
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Sign In Function
  const handleSignIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      setIsAuthenticated(true); // Update authentication state
      setShowSignIn(false); // Close the modal
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing in:", error.message);
      } else {
        console.error("Error signing in:", error);
      }
    }
  };

  // Sign Up Function
  const handleSignUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      setIsAuthenticated(true); // Update authentication state
      setShowSignUp(false); // Close the modal
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing up:", error.message);
      } else {
        console.error("Error signing up:", error);
      }
    }
  };

  const handleReadClick = (slug: string, type: string) => {
    if (!isAuthenticated) {
      setShowSignIn(true); // Show Sign In modal
    } else {
      router.push(type === "ebook" ? `/ebooks/${slug}` : `/articles/${slug}`);
    }
  };

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
  }, [isAnimating])

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
  }, [isAnimating])

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

  const extractSize = (url: string, key: "width" | "height", fallback: number): number => {
    const match = url.match(new RegExp(`${key}=([0-9]+)`));
    return match ? parseInt(match[1], 10) : fallback;
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Content</h2>
            <p className="text-slate-600">Handpicked resources to help you learn and grow</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button size="icon" onClick={prevSlide} className="rounded-half text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg">
              <ChevronLeft size={18} />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button size="icon" onClick={nextSlide} className="rounded-half text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg">
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
                      className={`inline-block text-sm px-3 py-1 rounded-full ${item.type === "ebook" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {item.type === "ebook" ? "eBook" : "Article"}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">By {item.author}</p>
                  <p className="text-slate-700 mb-6">{item.description}</p>
                  <div>
                    <Button
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white"
                      onClick={() => handleReadClick(item.slug, item.type)}
                    >
                      {item.type === "ebook" ? <BookOpen size={16} /> : <FileText size={16} />}
                      Read {item.type === "ebook" ? "eBook" : "Article"}
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center bg-slate-100 p-8">
                  <Image
                    src={item.coverImage || "/assets/study.png"}
                    width={extractSize(item.coverImage, "width", 300)}
                    height={extractSize(item.coverImage, "height", 400)}
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

        {/* Sign In Modal */}
        {
          showSignIn && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <Card className="p-0 max-w-sm w-full shadow-none border-none">
                <MagicCard
                  gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                  className="p-0"
                >
                  <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                      Enter your credentials to access your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const email = (e.target as any).email.value;
                        const password = (e.target as any).password.value;
                        handleSignIn(email, password);
                      }}
                    >
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="Enter your password" />
                        </div>
                      </div>
                      <CardFooter className="grid grid-cols-2 gap-3 p-4 border-t border-border">
                        <Button variant="outline" onClick={() => setShowSignIn(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          Sign In
                        </Button>
                      </CardFooter>
                    </form>
                  </CardContent>
                  <div className="text-center mt-4 mb-4">
                    <p className="text-sm text-slate-600">
                      Don't have an account?{" "}
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => {
                          setShowSignIn(false);
                          setShowSignUp(true);
                        }}
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
                </MagicCard>
              </Card>
            </div>
          )
        }

        {/* Sign Up Modal */}
        {
          showSignUp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <Card className="p-0 max-w-sm w-full shadow-none border-none">
                <MagicCard
                  gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                  className="p-0"
                >
                  <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                      Create a new account to start your journey with us
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const email = (e.target as any).email.value;
                        const password = (e.target as any).password.value;
                        handleSignUp(email, password);
                      }}
                    >
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="placeholder:text-slate-400 text-black  border-slate-400"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name" type="name"
                            placeholder="Enter your name"
                            className="placeholder:text-slate-400 text-black  border-slate-400" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="placeholder:text-slate-400 text-black  border-slate-400" />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className=" grid grid-cols-2 gap-3 p-4 border-t border-border [.border-t]:pt-4">
                    <Button
                      variant="outline"
                      className="bg-white hover:bg-slate-200 hover:shadow-lg"
                      onClick={() => setShowSignUp(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:text-slate-200 hover:shadow-lg"
                      onClick={() => {
                        const email = (document.getElementById("email") as HTMLInputElement).value;
                        const password = (document.getElementById("password") as HTMLInputElement).value;
                        handleSignUp(email, password);
                      }}
                    >
                      Sign Up
                    </Button>
                  </CardFooter>
                  <div className="text-center mt-4 mb-4">
                    <p className="text-sm text-slate-600">
                      Already have an account?{" "}
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => {
                          setShowSignIn(true);
                          setShowSignUp(false);
                        }}
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </MagicCard>
              </Card>
            </div>
          )
        }
      </div>
    </section>
  )
}
