"use client";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BookType, Newspaper, BookImage, StickyNote } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export function ContentCategories() {
  const pathname = usePathname();
  const router = useRouter();

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
    // Set the active button based on the current route
    const matchedButton = buttonData.find((button) => pathname.includes(button.href));
    if (matchedButton) {
      setActiveButton(matchedButton.id);
    }
  }, [pathname]);

  const features = [
    {
      Icon: BookType,
      name: "E-Books",
      description: "Discover a wide range of e-books to enhance your knowledge and skills.",
      href: "/ebooks",
      cta: "Learn more",
      onClick: () => router.push("/ebooks"),
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
      onClick: () => router.push("/articles"),
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
      onClick: () => router.push("/magazines"),
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
      onClick: () => router.push("/blogs"),
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
    </section>
  );
}