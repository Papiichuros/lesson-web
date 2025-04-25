"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "lucide-react"
import FeaturedContentSlideshow from "@/components/featured-content"
import { ContentCategories } from "@/components/content-categories"
import RecentPublications from "@/components/recent-publications"
import { TextAnimate } from "@/components/magicui/text-animate"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { SparklesText } from "@/components/magicui/sparkles-text"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { BlurFade } from "@/components/magicui/blur-fade"

export default function Home() {
  const pathname = usePathname()
  const [activeButton, setActiveButton] = useState("") // For navigation links
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

  const handleNavigation = (buttonId: string, href: string) => {
    setActiveButton(buttonId)
    router.push(href)
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
      { threshold: 0.2 }
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
    const matchedButton = buttonData.find((button) => pathname.includes(button.href))
    if (matchedButton) {
      setActiveButton(matchedButton.id)
    }
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full py-4 bg-white shadow-sm">
        <ScrollProgress className="top-[76px]" />
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Knowledge Hub
          </Link>

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
        </div>
      </header>
      <main className="flex-1">
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

        <BlurFade inViewMargin="-50px">
          <FeaturedContentSlideshow />
        </BlurFade>

        <BlurFade inViewMargin="-50px">
          <ContentCategories />
        </BlurFade>

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
    </div>
  )
}