"use client"

import { useState } from "react"
import { useTheme } from "next-themes" // Adjust the import path based on your project setup
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronRightIcon, CheckIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import FeaturedContentSlideshow from "@/components/featured-content"
import { ContentCategories } from "@/components/content-categories"
import RecentPublications from "@/components/recent-publications"
import { TextAnimate } from "@/components/magicui/text-animate"
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { SparklesText } from "@/components/magicui/sparkles-text"
import { MagicCard } from "@/components/magicui/magic-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image"

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 place-items-center">
        <ScrollProgress className="top-[65px]" />
        <div className="container flex h-16 items-center justify-between py-4 max-w-7xl">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Knowledge</span>Hub
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/ebooks" className="text-sm font-medium hover:text-primary">
              eBooks
            </Link>
            <Link href="/articles" className="text-sm font-medium hover:text-primary">
              Articles
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary">
              Resources
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" variant="outline" onClick={() => setShowSignIn(true)}>
              Sign In
            </Button>
            <Button size="sm" onClick={() => setShowSignUp(true)}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background place-items-center">
          <div className="container px-4 md:px-6 max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    <SparklesText>Discover Knowledge Resources for Growth</SparklesText>
                  </h1>
                  <TextAnimate className="max-w-[600px] text-slate-500/70 md:text-xl">
                    Access our collection of high-quality eBooks, articles, and resources designed to help you expand
                    your knowledge.
                  </TextAnimate>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Browse eBooks
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white hover:bg-slate-300/20">
                    Explore Articles
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/study.png"
                  alt="Knowledge resources illustration"
                  width={550}
                  height={450}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <FeaturedContentSlideshow />
        <ContentCategories />
        <RecentPublications />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
                <TextAnimate className="max-w-[600px] text-slate-500/60 md:text-xl">
                  Subscribe to our newsletter and get the latest updates on new content and resources.
                </TextAnimate>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="flex space-x-2">
                  <Input placeholder="Enter your email" type="email" className="border-slate-400/25" />
                  <AnimatedSubscribeButton
                    className="w-36 bg-blue-600 hover:bg-blue-700 text-white"
                    style={{ minWidth: "9rem" }}
                  >
                    <span className="group inline-flex items-center w-36 justify-center">
                      Subscribe
                      <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="group inline-flex items-center justify-center">
                      <CheckIcon className="mr-2 size-4" />
                      Subscribed
                    </span>
                  </AnimatedSubscribeButton>
                </div>
                <p className="text-xs text-muted-foreground">
                  We respect your privacy and will never share your information.
                </p>
              </div>
            </div>
          </div>
        </section>
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

      {/* Sign In Modal */}
      {showSignIn && (
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
                <form>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="text-slate-400" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter your password" className="text-slate-400" />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
                <Button variant="outline" onClick={() => setShowSignIn(false)}>
                  Cancel
                </Button>
                <Button className="w-full">Sign In</Button>
              </CardFooter>
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
                  <form>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email" className="text-slate-400" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="name" placeholder="Enter your name" className="text-slate-400" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" className="text-slate-400" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
                  <Button variant="outline" onClick={() => setShowSignUp(false)}>
                    Cancel
                  </Button>
                  <Button className="w-full">Sign Up</Button>
                </CardFooter>
              </MagicCard>
            </Card>
          </div>
        )
      }
    </div >
  )
}
