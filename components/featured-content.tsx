"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TimerProgress } from "@/components/timer-progress";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

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
];

const SLIDE_INTERVAL = 5000;

export default function FeaturedContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setUser(userCredential.user);
      setShowSignIn(false);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setUser(userCredential.user);
      setShowSignUp(false);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleReadClick = (slug: string, type: string) => {
    if (!isAuthenticated) {
      setShowSignIn(true);
    } else {
      router.push(type === "ebook" ? `/ebooks/${slug}` : `/articles/${slug}`);
    }
  };

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === featuredContent.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? featuredContent.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === activeIndex) return;
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, activeIndex]
  );

  const extractSize = (url: string, key: "width" | "height", fallback: number): number => {
    const match = url.match(new RegExp(`${key}=([0-9]+)`));
    return match ? parseInt(match[1], 10) : fallback;
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Content</h2>
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg"
              onClick={prevSlide}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg"
              onClick={nextSlide}
              aria-label="Next Slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-xl bg-white shadow-lg"
          style={{ minHeight: "500px" }}
        >
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
                  : "opacity-0 translate-x-full z-0"
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
                  <Button
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white"
                    onClick={() => handleReadClick(item.slug, item.type)}
                  >
                    {item.type === "ebook" ? <BookOpen size={16} /> : <FileText size={16} />}
                    Read {item.type === "ebook" ? "eBook" : "Article"}
                  </Button>
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

        <div className="flex justify-center mt-6 gap-2">
          {featuredContent.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === activeIndex ? "bg-blue-600 w-8" : "bg-blue-300"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}