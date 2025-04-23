"use client";

import { useParams, useRouter, usePathname } from "next/navigation"; // Import usePathname
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Correct import for navigation
import { ChevronLeftIcon, ChevronRightIcon, User } from "lucide-react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Mock data for eBooks
const ebooks = [
  {
    id: "web-development-fundamentals",
    title: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A comprehensive guide to modern web development practices and technologies.",
    author: "Jane Smith",
    publishedDate: "March 15, 2024",
    chapters: [
      {
        id: "chapter-1",
        title: "Introduction to Web Development",
        content: `
          <h2>Introduction to Web Development</h2>
          <p>Web development is the work involved in developing a website for the Internet or an intranet...</p>
        `,
      },
      {
        id: "chapter-2",
        title: "HTML Fundamentals",
        content: `
          <h2>HTML Fundamentals</h2>
          <p>HTML (HyperText Markup Language) is the standard markup language for documents...</p>
        `,
      },
    ],
  },
  {
    id: "javascript-mastery",
    title: "JavaScript Mastery",
    slug: "javascript-mastery",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "Master JavaScript with this comprehensive guide to modern JavaScript programming.",
    author: "John Doe",
    publishedDate: "January 10, 2025",
    chapters: [
      {
        id: "chapter-1",
        title: "Introduction to JavaScript",
        content: `
          <h2>Introduction to JavaScript</h2>
          <p>JavaScript is a versatile programming language used for web development...</p>
        `,
      },
      {
        id: "chapter-2",
        title: "Advanced JavaScript Concepts",
        content: `
          <h2>Advanced JavaScript Concepts</h2>
          <p>Learn about closures, promises, async/await, and other advanced JavaScript topics...</p>
        `,
      },
    ],
  },
];

export default function EbookPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current path
  const [ebook, setEbook] = useState<{
    id: string;
    title: string;
    slug: string;
    coverImage: string;
    description: string;
    author: string;
    publishedDate: string;
    chapters: { id: string; title: string; content: string }[];
  } | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [notFound404, setNotFound404] = useState(false);
  const [user, setUser] = useState<{ photoURL?: string; displayName?: string } | null>(null);

  useEffect(() => {
    const slug = params.slug;
    const foundebook = ebooks.find((ebook) => ebook.slug === slug);

    if (foundebook) {
      setEbook(foundebook);
    } else {
      setNotFound404(true);
    }
  }, [params]);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          photoURL: currentUser.photoURL || "/default-avatar.png",
          displayName: currentUser.displayName || "User",
        });
      } else {
        setUser(null); // User is signed out
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user data
      router.push("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (notFound404) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">eBook Not Found</h1>
        <p className="text-gray-600 mb-6">The eBook you're looking for doesn't exist.</p>
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl"
          onClick={() => router.push("/ebooks")}
        >
          Back to eBooks
        </button>
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300">
        <p className="text-lg text-gray-700">Loading eBook...</p>
      </div>
    );
  }

  const currentChapter = ebook.chapters[currentChapterIndex];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <ScrollProgress className="top-[75px]" />
        <div className="container mx-auto px-5 py-4 max-w-7xl flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800">
            Knowledge Hub
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
            {[
              { id: "ebook", label: "eBook", href: "/ebooks" },
              { id: "blog", label: "Blog", href: "/blogs" },
              { id: "about", label: "About", href: "/about" },
            ].map((button) => (
              <Link
                key={button.id}
                href={button.href}
                className={`relative text-sm font-medium transition-transform duration-300 ${pathname.includes(button.href) // Use pathname instead of router.pathname
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 scale-110"
                    : "text-gray-500 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:scale-110"
                  }`}
              >
                {button.label}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-700" />
            </button>

            {/* Profile Dropdown */}
            <div className="absolute right-0 w-48 bg-white shadow-lg rounded-lg p-4 z-50 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out transform translate-y-2 pointer-events-none group-hover:pointer-events-auto">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {user?.displayName || "User"}
              </p>
              <button
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="bg-white p-4">
        <RainbowButton
          className="text-gray-700 hover:text-black font-medium flex items-center"
          onClick={() => router.push("/ebooks")}
        >
          <ChevronLeftIcon className="inline-block mr-2 h-5 w-5" />
          Back to eBooks
        </RainbowButton>
      </div>

      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white text-black p-6 flex flex-col items-center">
          <div className="mb-8 flex flex-col items-center text-center">
            <Image
              src={ebook.coverImage || "/placeholder.svg"}
              alt={ebook.title}
              width={150}
              height={200}
              className="rounded-md shadow-md"
            />
            <h2 className="text-xl font-bold mt-4">{ebook.title}</h2>
            <p className="text-sm text-gray-500">{ebook.author}</p>
            <p className="text-sm text-gray-400">{ebook.publishedDate}</p>
          </div>
          <nav className="w-full">
            <ul className="space-y-4">
              {ebook.chapters.map((chapter, index) => (
                <li key={chapter.id} className="text-center">
                  <button
                    onClick={() => setCurrentChapterIndex(index)}
                    className={`block w-full text-gray-600 hover:text-black transition transform ${currentChapterIndex === index
                        ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 scale-105"
                        : ""
                      }`}
                  >
                    {chapter.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-8">
          <div className="max-w-4xl mx-auto">
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentChapter.title}</h3>
              <div
                className="prose prose-slate max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: currentChapter.content }}
              />
            </section>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <button
                disabled={currentChapterIndex === 0}
                onClick={() => setCurrentChapterIndex((prev) => prev - 1)}
                className={`px-4 py-2 rounded-full shadow transition-all duration-300 ${currentChapterIndex === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:text-white hover:bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg transform hover:scale-105"
                  }`}
              >
                <ChevronLeftIcon className="inline-block mr-2 h-5 w-5" />
                Previous Chapter
              </button>
              <button
                disabled={currentChapterIndex === ebook.chapters.length - 1}
                onClick={() => setCurrentChapterIndex((prev) => prev + 1)}
                className={`px-4 py-2 rounded-full shadow transition-all duration-300 ${currentChapterIndex === ebook.chapters.length - 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:text-white hover:bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg transform hover:scale-105"
                  }`}
              >
                Next Chapter
                <ChevronRightIcon className="inline-block ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
