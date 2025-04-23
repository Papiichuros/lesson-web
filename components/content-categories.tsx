"use client";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BookType, Newspaper, BookImage, StickyNote } from "lucide-react"
import AuthModal from "@/components/auth-modal";
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
import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function ContentCategories() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { theme = "light" } = useTheme();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [user, setUser] = useState<any>(null); // Store user profile information
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true) // User is signed in
        setUser(user) // Store user information
      } else {
        setIsAuthenticated(false) // User is signed out
        setUser(null) // Clear user information
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);
  // Define buttonData with appropriate structure
  const buttonData = [
    { id: 1, href: "/ebooks", label: "E-Books" },
    { id: 2, href: "/articles", label: "Articles" },
    { id: 3, href: "/magazines", label: "Magazines" },
    { id: 4, href: "/blogs", label: "Blogs" },
  ];

  // State to track the active button
  const [activeButton, setActiveButton] = useState<number | null>(null);

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

  const features = [
    {
      Icon: BookType,
      name: "E-Books",
      description: "Discover a wide range of e-books to enhance your knowledge and skills.",
      href: "/ebooks",
      cta: "Learn more",
      onClick: () => {
        if (!isAuthenticated) {
          setShowSignIn(true); // Trigger Sign In modal only if not authenticated
          return; // Stop further execution
        }
        router.push("/ebooks"); // Navigate directly if authenticated
      },
      background: (
        <Image
          src="/assets/study.png"
          width={500}
          height={500}
          className="absolute -right-20 -top-20 opacity-60"
          alt="Background"
        />
      ),
      className: "col-span-3 lg:col-span-1",
    },
    {
      Icon: Newspaper,
      name: "Articles",
      description: "Discover a wide range of articles to enhance your knowledge and skills.",
      href: "/articles",
      cta: "Learn more",
      onClick: () => {
        if (!isAuthenticated) {
          setShowSignIn(true); // Trigger Sign In modal only if not authenticated
          return; // Stop further execution
        }
        router.push("/articles"); // Navigate directly if authenticated
      },
      background: (
        <Image
          src="/assets/study.png"
          width={500}
          height={500}
          className="absolute -right-20 -top-20 opacity-60"
          alt=""
        />
      ),
      className: "col-span-3 lg:col-span-2",
    },
    {
      Icon: BookImage,
      name: "Magazines",
      description: "Discover a wide range of magazines to enhance your knowledge and skills.",
      href: "/magazines",
      cta: "Learn more",
      onClick: () => {
        if (!isAuthenticated) {
          setShowSignIn(true); // Trigger Sign In modal only if not authenticated
          return; // Stop further execution
        }
        router.push("/magazines"); // Navigate directly if authenticated
      },
      background: (
        <Image
          src="/assets/study.png"
          width={500}
          height={500}
          className="absolute -right-20 -top-20 opacity-60"
          alt=""
        />
      ),
      className: "col-span-3 lg:col-span-2",
    },
    {
      Icon: StickyNote,
      name: "Blogs",
      description: "Discover a wide range of blogs to enhance your knowledge and skills.",
      href: "/blogs",
      cta: "Learn more",
      onClick: () => {
        if (!isAuthenticated) {
          setShowSignIn(true); // Trigger Sign In modal only if not authenticated
          return; // Stop further execution
        }
        router.push("/blogs"); // Navigate directly if authenticated
      },
      background: (
        <Image
          src="/assets/study.png"
          width={500}
          height={500}
          className="absolute -right-20 -top-20 opacity-60"
          alt=""
        />
      ),
      className: "col-span-3 lg:col-span-1",
    },
  ];

  return (
    <section className="container max-w-7xl py-8 md:py-16 lg:py-20 flex flex-col place-items-center ml-auto mr-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Categories</h2>
      <p className="text-base md:text-lg text-gray-600 mb-8 text-center">
        Explore our features designed to make your experience seamless and efficient.
      </p>
      <BentoGrid className="lg:grid-rows gap-4">
        {features.map((feature) => (
          <BentoCard
            key={feature.name}
            {...feature}
            onClick={feature.onClick} // Pass the onClick handler
          >
            <button
              className="cta-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card's onClick
                feature.onClick();
              }}
            >
              {feature.cta}
            </button>
          </BentoCard>
        ))}
      </BentoGrid>
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
    </section>
  );
}