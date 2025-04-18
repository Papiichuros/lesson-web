"use client"

import { useState } from "react"
import { useTheme } from "next-themes" // Adjust the import path based on your project setup
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRightIcon, CheckIcon } from "lucide-react"
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
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State for mobile menu visibility
  const [activeButton, setActiveButton] = useState("ebooks"); // For navigation links
  const [activeAuthButton, setActiveAuthButton] = useState("signIn"); // For Sign In/Sign Up buttons
  const buttonData = [
    { id: "ebooks", label: "eBooks", href: "/ebooks" },
    { id: "articles", label: "Articles", href: "/articles" },
    { id: "resources", label: "Resources", href: "/resources" },
    { id: "about", label: "About", href: "/about" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 supports-[backdrop-filter]:bg-background/60 place-items-center">
        <ScrollProgress className="top-[65px]" />
        <div className="container flex h-16 items-center justify-between py-4 max-w-7xl">
          <div className="relative flex items-center justify-between w-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl bg-white rounded-xl px-3 py-2 border border-border w-fit">
              <span className="text-primary">Knowledge Hub</span>
            </Link>

            {/* Navigation Links (Desktop) */}
            <div className="relative hidden md:flex items-center gap-10 bg-white px-7 py-3 rounded-xl border border-border w-fit">
              {/* Sliding Background */}
              <div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md transition-all duration-300 ${activeButton ? "opacity-100" : "opacity-0"
                  }`}
                style={{
                  willChange: "auto",
                  width: `${100 / buttonData.length}%`,
                  transform: `translateX(${buttonData.findIndex((button) => button.id === activeButton) * 100}%)`,
                }}
              ></div>

              {/* Navigation Links */}
              {buttonData.map((button) => (
                <button
                  key={button.id}
                  className={`relative z-10 flex items-center justify-center text-sm font-medium transition-colors ${activeButton === button.id ? "text-white" : "text-gray-500 hover:text-white"
                    }`}
                  onMouseEnter={() => setActiveButton(button.id)}
                >
                  {button.label}
                </button>
              ))}
            </div>

            {/* Sign In/Sign Up Buttons */}
            <div className="relative hidden md:flex items-center gap-4 bg-white rounded-xl px-2 py-1 border border-border w-fit">
              {/* Sliding Background */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md transition-transform duration-300"
                style={{
                  width: `${50}%`,
                  transform: `translateX(${activeAuthButton === "signIn" ? 0 : 100}%)`,
                }}
              ></div>

              {/* Sign In Button (Hidden on Mobile) */}
              <Button
                size="sm"
                className={`relative z-10 items-center justify-center text-sm font-medium transition-colors ${activeAuthButton === "signIn" ? "text-white" : "text-gray-700 hover:text-black"
                  }`}
                onMouseEnter={() => setActiveAuthButton("signIn")}
                onClick={() => setShowSignIn(true)}
              >
                Sign In
              </Button>

              {/* Sign Up Button */}
              <Button
                size="sm"
                className={`relative z-10  items-center justify-center text-sm font-medium transition-colors ${activeAuthButton === "signUp" ? "text-white" : "text-gray-700 hover:text-black"
                  }`}
                onMouseEnter={() => setActiveAuthButton("signUp")}
                onClick={() => setShowSignUp(true)}
              >
                Sign Up
              </Button>
            </div>

            {/* Hamburger Menu (Mobile) */}
            <div className="flex md:hidden items-center">
              <>
                <button
                  className="ml-4 flex items-center justify-center w-10 h-10"
                  onClick={() => setShowMobileMenu((prev) => !prev)}
                >
                  <span className="sr-only">Toggle Menu</span>
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                </button>
                {showMobileMenu && (
                  <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setShowMobileMenu(false)}
                  ></div>
                )}
              </>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div
                className={`absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg p-4 z-[200] transition-all duration-300 ease-in-out ${showMobileMenu ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
                  }`}
              >
                {/* Header with Title and Close Button */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-700">Knowledge Hub</span>
                  <button
                    className="flex items-center justify-center w-8 h-8"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <span className="sr-only">Close Menu</span>
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Menu Content */}
                <div className="flex flex-col gap-4 mt-4 ">
                  {buttonData.map((button) => (
                    <button
                      key={button.id}
                      className="text-sm font-medium text-gray-700 hover:text-black flex justify-between items-center"
                      onClick={() => {
                        setActiveButton(button.id);
                        setShowMobileMenu(false);
                      }}
                    >
                      {button.label}
                      <ChevronRightIcon />
                    </button>
                  ))}
                  <div className="border-t border-border grid grid-cols-2 gap-2 py-3">
                    <Button
                      size="sm"
                      className="w-full bg-gray-100 text-gray-700 hover:text-black rounded-xl px-4 py-5"
                      onClick={() => {
                        setShowSignIn(true);
                        setShowMobileMenu(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 rounded-xl px-4 py-5"
                      onClick={() => {
                        setShowSignUp(true);
                        setShowMobileMenu(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header >
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background place-items-center overflow-hidden">
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
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-blue-700 text-white group"
                  >
                    Get Started
                    <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
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
                  <form>
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
                <CardFooter className=" grid grid-cols-2 gap-3  border-b border-border p-4 [.border-b]:pb-4">
                  <Button variant="outline" className="bg-white hover:bg-slate-200 hover:shadow-lg"  onClick={() => setShowSignIn(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:text-slate-200 hover:shadow-lgbg-gradient-to-r from-blue-500 to-purple-500 text-white hover:text-slate-200 hover:shadow-lg">Sign In</Button>
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
                  >
                  Sign Up
                  </Button>
                </CardFooter>
              </MagicCard>
            </Card>
          </div>
        )
      }
    </div >
  )
}
