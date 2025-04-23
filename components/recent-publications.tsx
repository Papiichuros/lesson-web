"use client";

import AuthModal from "@/components/auth-modal";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ChevronRightIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "./magicui/text-animate";
import { RainbowButton } from "./magicui/rainbow-button";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useTheme } from "next-themes";
import { User } from "firebase/auth"; // Ensure this import exists

export default function RecentPublications() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { theme = "light" } = useTheme()
  const [user, setUser] = useState<User | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setShowSignIn(false);
      toast.success("Successfully signed in!");
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  const handleSignUp = async (email: string, password: string, name?: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setShowSignUp(false);
      toast.success("Account successfully created!");
    } catch (error) {
      toast.error("Error creating account. Please try again.");
    }
  };

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
  };

  const handleAccessContent = (href: string) => {
    if (!isAuthenticated) {
      setShowSignIn(true); // Show the sign-in modal if the user is not authenticated
    } else {
      router.push(href); // Navigate to the content if authenticated
    }
  };

  const publications = [
    {
      title: "Introduction to React Hooks",
      description: "Learn how to use React's built-in hooks to manage state and side effects in your applications.",
      date: "April 2, 2025",
      readTime: "10 min read",
      category: "Programming",
      type: "Article",
      href: "/articles/introduction-to-react-hooks",
    },
    {
      title: "Data Visualization with D3.js",
      description: "Create interactive and dynamic data visualizations for the web using the powerful D3.js library.",
      date: "March 28, 2025",
      readTime: "12 min read",
      category: "Data Science",
      type: "Article",
      href: "/articles/data-visualization-with-d3js",
    },
    {
      title: "Responsive Design Best Practices",
      description: "Master the techniques for creating websites that look great on any device, from mobile to desktop.",
      date: "March 25, 2025",
      readTime: "8 min read",
      category: "Design",
      type: "Article",
      href: "/articles/responsive-design-best-practices",
    },
    {
      title: "Cloud Architecture Patterns",
      description: "Design patterns and best practices for building scalable and resilient cloud applications.",
      date: "March 20, 2025",
      readTime: "15 min read",
      category: "Programming",
      type: "Article",
      href: "/blogs/building-restful-apis-with-nodejs",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 place-items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Latest Blogs</h2>
            <TextAnimate className="max-w-[700px] text-slate-500/60 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay up-to-date with our latest blogs.
            </TextAnimate>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
          {publications.map((publication) => (
            <Card key={publication.title} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{publication.category}</Badge>
                  <Badge variant="secondary">{publication.type}</Badge>
                </div>
                <CardTitle className="mt-2">{publication.title}</CardTitle>
                <CardDescription>{publication.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{publication.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{publication.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white group"
                  onClick={() => handleAccessContent(publication.href)}
                >
                  Read Blog
                  <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <RainbowButton
            onClick={() => handleAccessContent("/blogs")}
          >
            View All Blogs
          </RainbowButton>
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
    </section >
  );
}
