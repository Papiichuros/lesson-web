"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronLeft, Star } from "lucide-react";
import Image from "next/image";
import { AuroraText } from "@/components/magicui/aurora-text";
import { RetroGrid } from "@/components/magicui/retro-grid";

export default function BlogsPage() {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const router = useRouter();

  const buttonData = [
    { id: "ebook", label: "eBook", href: "/ebooks" },
    { id: "blog", label: "Blog", href: "/blogs" },
    { id: "about", label: "About", href: "/about" },
  ];

  const handleNavigation = (buttonId: string, href: string, closeMobileMenu = false) => {
    setActiveButton(buttonId);
    if (closeMobileMenu) setShowMobileMenu(false);
    router.push(href);
  };

  useEffect(() => {
    const matchedButton = buttonData.find((button) => pathname.includes(button.href));
    if (matchedButton) {
      setActiveButton(matchedButton.id);
    }
  }, [pathname]);

  const blogs = [
    {
      title: "Collaborative Learning",
      description: "Tackle social media regulation through argumentative writing.",
      author: "Jane Smith",
      publishedDate: "April 5, 2024",
      href: "/blogs/collaborative-learning",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full py-4 bg-white shadow-sm">
        <div className="container mx-auto px-5 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Knowledge Hub
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 bg-white -ml-28 px-6 py-3 rounded-full border border-gray-200 shadow-sm">
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
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 place-items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore Our&nbsp;<AuroraText>Blogs</AuroraText>
                </h1>
                <p className="max-w-[700px] text-slate-400 md:text-xl">
                  Discover insightful articles and tutorials to enhance your knowledge and skills.
                </p>
              </div>
              <RetroGrid />
            </div>
          </div>
        </section>

        <section className="w-full py-12 place-items-center">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {blogs.map((blog) => (
                <Card key={blog.title} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className="flex-1">
                    <CardTitle>{blog.title}</CardTitle>
                    <CardDescription>{blog.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {blog.publishedDate}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => router.push(blog.href)}
                    >
                      Read Blog
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background place-items-center">
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
  );
}