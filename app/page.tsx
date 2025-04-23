"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes" // Adjust the import path based on your project setup
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, User } from "lucide-react"
import FeaturedContentSlideshow from "@/components/featured-content"
import { ContentCategories } from "@/components/content-categories"
import RecentPublications from "@/components/recent-publications"
import { TextAnimate } from "@/components/magicui/text-animate"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { SparklesText } from "@/components/magicui/sparkles-text"
import Image from "next/image"
import { toast, ToastContainer } from "react-toastify"
import { useAuth } from "@/context/auth-context"
import "react-toastify/dist/ReactToastify.css"
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@/lib/firebase" // Adjust the import path based on your project setup
import { useRouter, usePathname } from "next/navigation"
import { BlurFade } from "@/components/magicui/blur-fade"
import AuthModal from "@/components/auth-modal"

export default function Home() {
  const pathname = usePathname() // Call usePathname at the top level
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const { theme = "light" } = useTheme()
  const [showMobileMenu, setShowMobileMenu] = useState(false) // State for mobile menu visibility
  const [activeButton, setActiveButton] = useState("") // For navigation links
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Authentication state
  const [user, setUser] = useState<any>(null) // Store user profile information
  const router = useRouter()
  const buttonData = [
    { id: "ebook", label: "eBook", href: "/ebooks" },
    { id: "blog", label: "Blog", href: "/blogs" },
    { id: "about", label: "About", href: "/about" },
  ]

  const [isVisible, setIsVisible] = useState({
    featuredContent: false,
    contentCategories: false,
    recentPublications: false,
  })

  const featuredContentRef = useRef<HTMLDivElement>(null)
  const contentCategoriesRef = useRef<HTMLDivElement>(null)
  const recentPublicationsRef = useRef<HTMLDivElement>(null)

  // Function to handle authenticated navigation
  const handleNavigation = (buttonId: string, href: string, closeMobileMenu = false) => {
    if (!isAuthenticated) {
      setShowSignIn(true)
      if (closeMobileMenu) setShowMobileMenu(false)
    } else {
      setActiveButton(buttonId)
      if (closeMobileMenu) setShowMobileMenu(false)
      router.push(href)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === featuredContentRef.current) {
            setIsVisible((prev) => ({ ...prev, featuredContent: entry.isIntersecting }))
          } else if (entry.target === contentCategoriesRef.current) {
            setIsVisible((prev) => ({ ...prev, contentCategories: entry.isIntersecting }))
          } else if (entry.target === recentPublicationsRef.current) {
            setIsVisible((prev) => ({ ...prev, recentPublications: entry.isIntersecting }))
          }
        })
      },
      { threshold: 0.2 }, // Trigger when 20% of the section is visible
    )

    if (featuredContentRef.current) observer.observe(featuredContentRef.current)
    if (contentCategoriesRef.current) observer.observe(contentCategoriesRef.current)
    if (recentPublicationsRef.current) observer.observe(recentPublicationsRef.current)

    return () => {
      if (featuredContentRef.current) observer.unobserve(featuredContentRef.current)
      if (contentCategoriesRef.current) observer.unobserve(contentCategoriesRef.current)
      if (recentPublicationsRef.current) observer.unobserve(recentPublicationsRef.current)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true) // User is signed in
        setUser(user) // Store user information
      } else {
        setIsAuthenticated(false) // User is signed out
        setUser(null) // Clear user information
      }
    })

    return () => unsubscribe() // Cleanup subscription on unmount
  }, [])

  useEffect(() => {
    // Set the active button based on the current route
    const matchedButton = buttonData.find((button) => pathname.includes(button.href))
    if (matchedButton) {
      setActiveButton(matchedButton.id)
    }
  }, [pathname]) // Use the pathname variable here

  // Sign In Function
  const handleSignIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log("User signed in:", userCredential.user)
      setIsAuthenticated(true) // Update authentication state
      setUser(userCredential.user) // Store user information
      setShowSignIn(false) // Close the modal
      toast.success("Successfully signed in!") // Show success notification
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Invalid email or password. Please try again.") // Show error notification
      } else {
        toast.error("An unexpected error occurred. Please try again.") // Show generic error notification
      }
    }
  }

  // Sign Up Function
  const handleSignUp = async (email: string, password: string, name?: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update the user's profile with their name
      await updateProfile(user, {
        displayName: name,
      })

      console.log("User signed up:", user)
      setIsAuthenticated(true) // Update authentication state
      setUser(user) // Store user information
      setShowSignUp(false) // Close the modal
      toast.success("Account successfully created!") // Show success notification
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error creating account. Please try again.") // Show error notification
      } else {
        toast.error("An unexpected error occurred. Please try again.") // Show generic error notification
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log("User logged out")
      setIsAuthenticated(false)
      setUser(null)
      toast.success("You have successfully signed out!") // Show success notification
    } catch (error) {
      console.error("Error logging out:", error)
      toast.error("An error occurred while signing out. Please try again.") // Show error notification
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      console.log("User signed in with Google:", result.user)
      setIsAuthenticated(true)
      setUser(result.user)
      setShowSignIn(false)
      toast.success("Successfully signed in with Google!")
    } catch (error) {
      console.error("Error signing in with Google:", error)
      toast.error("An error occurred while signing in with Google. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
      <header className="sticky top-0 z-50 w-full py-4 bg-white shadow-sm">
        <ScrollProgress className="top-[76px]" />
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            Knowledge Hub
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center -ml-28 gap-8 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
            {buttonData.map((button) => (
              <button
                key={button.id}
                className={`relative text-sm font-medium transition-transform duration-300 ${activeButton === button.id
                  ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 scale-110"
                  : "text-gray-500 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:scale-110"
                  }`}
                onClick={() => handleNavigation(button.id, button.href)}
              >
                {button.label}
              </button>
            ))}
          </nav>

          {/* User Profile or Call-to-Action Button */}
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="relative group">
                {/* Profile Icon */}
                <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-700" />
                </button>

                {/* Profile Dropdown */}
                <div className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-lg p-4 z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out transform translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                  <p className="text-sm font-medium text-gray-700 mb-2">{user?.displayName ?? "User"}</p>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90"
                onClick={() => setShowSignUp(true)}
              >
                Get Unlimited Access
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700"
            onClick={() => setShowMobileMenu((prev) => !prev)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4 z-50">
            {buttonData.map((button) => (
              <button
                key={button.id}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => handleNavigation(button.id, button.href, true)}
              >
                {button.label}
              </button>
            ))}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <Button
                className="w-full bg-gray-100 text-gray-700 hover:text-gray-900 rounded-full px-4 py-2 mb-2"
                onClick={() => {
                  setShowSignIn(true)
                  setShowMobileMenu(false)
                }}
              >
                Sign In
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 rounded-full px-4 py-2"
                onClick={() => {
                  setShowSignUp(true)
                  setShowMobileMenu(false)
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background place-items-center overflow-hidden">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <BlurFade inViewMargin="-50px">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      <SparklesText>Discover Knowledge Resources for Growth</SparklesText>
                    </h1>
                    <TextAnimate className="max-w-[600px] text-slate-500/70 md:text-xl">
                      Access our collection of high-quality eBooks, articles, and resources designed to help you expand
                      your knowledge.
                    </TextAnimate>
                  </div>
                </BlurFade>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {!isAuthenticated && (
                    <BlurFade inViewMargin="-50px">
                      <Button
                        size="lg"
                        className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white group hover:shadow-lg"
                        onClick={() => setShowSignIn(true)}
                      >
                        Get Started
                        <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </BlurFade>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <BlurFade inViewMargin="-50px">
                  <Image
                    src="/assets/study.png"
                    alt="Knowledge resources illustration"
                    width={550}
                    height={450}
                    className="rounded-lg object-cover"
                  />
                </BlurFade>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Content Section */}
        <BlurFade inViewMargin="-50px">
          <FeaturedContentSlideshow />
        </BlurFade>

        {/* Content Categories Section */}
        <BlurFade inViewMargin="-50px">
          <ContentCategories />
        </BlurFade>

        {/* Recent Publications Section */}
        <BlurFade inViewMargin="-50px">
          <RecentPublications />
        </BlurFade>
      </main>
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="text-primary">Knowledge</span>Hub
            </Link>
            <p className="text-sm text-muted-foreground">Sharing valuable knowledge resources with our community.</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4">
            <Link href="/terms" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contact Us
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 KnowledgeHub. All rights reserved.</p>
        </div>
      </footer>

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
  )
}
