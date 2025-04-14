import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BookType, Newspaper, BookImage, StickyNote } from "lucide-react"
import Image from "next/image";

const features = [
  {
    Icon: BookType,
    name: "E-Books",
    description: "Discover a wide range of e-books to enhance your knowledge and skills.",
    href: "/",
    cta: "Learn more",
    background: <Image src="/path-to-image.jpg" className="absolute -right-20 -top-20 opacity-60" alt="Background" />,
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Newspaper,
    name: "Articles",
    description: "Discover a wide range of e-books to enhance your knowledge and skills.",
    href: "/",
    cta: "Learn more",
    background: <Image src="/path-to-image.jpg" className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: BookImage,
    name: "Magazines",
    description: "Discover a wide range of e-books to enhance your knowledge and skills.",
    href: "/",
    cta: "Learn more",
    background: <Image src="/path-to-image.jpg" className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: StickyNote,
    name: "Blogs",
    description: "Discover a wide range of e-books to enhance your knowledge and skills.",
    href: "/",
    cta: "Learn more",
    background: <Image src="/path-to-image.jpg" className="absolute -right-20 -top-20 opacity-60" alt="" />,
    className: "col-span-3 lg:col-span-1",
  },
];

export function ContentCategories() {
  return (
    <section className="container max-w-7xl py-8 md:py-16 lg:py-20 flex flex-col place-items-center ml-auto mr-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Categories</h2>
      <p className="text-base md:text-lg text-gray-600 mb-8 text-center">
        Explore our features designed to make your experience seamless and efficient.
      </p>
      <BentoGrid className="lg:grid-rows gap-4">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}
