"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import Link from "next/link";

// Mock data for blogs
const blogs = [
  {
    id: "collaborative-learning",
    title:
      "Collaborative Learning: Tackling Social Media Regulation Through Argumentative Writing",
    slug: "collaborative-learning",
    description:
      "Learn the basics of React and how to set up your first React application.",
    publishedDate: "April 26, 2025",
    iframeUrl: "https://new.express.adobe.com/webpage/c3M8A2dgkxfqG", // Add iframe URL here
  },
];

export default function BlogPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const [blog, setBlog] = useState<{
    id: string;
    title: string;
    slug: string;
    description: string;
    publishedDate: string;
    content?: string;
    iframeUrl?: string;
  } | null>(null);
  const [notFound404, setNotFound404] = useState(false);

  useEffect(() => {
    // Find the blog based on the slug from params
    const slug = params.slug;
    const foundBlog = blogs.find((blog) => blog.slug === slug);

    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      setNotFound404(true);
    }
  }, [params]);

  // Handle not found case
  if (notFound404) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <p className="text-gray-600">
          The blog you&apos;re looking for doesn&apos;t exist.
        </p>
        <RainbowButton onClick={() => router.push("/blogs")}>
          Back to Blogs
        </RainbowButton>
      </div>
    );
  }

  // Show loading state while blog is being fetched
  if (!blog) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading blog...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full bg-white place-items-center">
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
                className={`relative text-sm font-medium transition-transform duration-300 ${
                  pathname.includes(button.href)
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 scale-110"
                    : "text-gray-500 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:scale-110"
                }`}
              >
                {button.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Back to Blogs Button */}
      <RainbowButton
        className="mt-4 ml-14"
        onClick={() => router.push("/blogs")}
      >
        Back to Blogs
      </RainbowButton>

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span className="text-gray-800">{blog.title}</span>
        </nav>

        <div className="grid grid-cols-1 max-w-7xl lg:grid-cols-[3fr_1px_1fr] gap-8">
          {/* Blog Content */}
          <article className="bg-white">
            {/* Post Title */}
            <header className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
              <div className="text-sm text-gray-600">
                <span>{blog.publishedDate}</span>
              </div>
            </header>

            {/* Divider */}
            <hr className="my-6 border-gray-300" />

            {/* Render iframe if iframeUrl exists */}
            {blog.iframeUrl ? (
              <iframe
                src={blog.iframeUrl}
                title={blog.title}
                className="w-full border rounded-lg custom-iframe-scrollbar"
                style={{ height: "100vh", overflow: "auto" }} // Allow scrolling inside the iframe
                frameBorder="0"
              ></iframe>
            ) : (
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              />
            )}
          </article>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-[1px] bg-gray-300"></div>

          {/* Table of Contents */}
          <aside className="hidden lg:block bg-white">
            <h2 className="text-lg font-bold mb-4">Other Blogs</h2>

            {/* Divider */}
            <hr className="mb-4 border-gray-300" />

            <ul className="space-y-2 text-sm">
              {blogs
                .filter((otherBlog) => otherBlog.id !== blog.id) // Exclude the current blog
                .map((otherBlog) => (
                  <li key={otherBlog.id}>
                    <Link
                      href={`/blogs/${otherBlog.slug}`}
                      className="relative text-black transition-all duration-300 bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"
                    >
                      {otherBlog.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </aside>
        </div>
      </div>

      {/* --- Assessment Criteria Section --- */}
      <section className="mt-12 mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Assessment Criteria
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 border-b text-left font-semibold">
                  Criteria
                </th>
                <th className="px-4 py-2 border-b text-left font-semibold">
                  Weighting
                </th>
                <th className="px-4 py-2 border-b text-left font-semibold">
                  Elements
                </th>
                <th className="px-4 py-2 border-b text-left font-semibold">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  rowSpan={3}
                  className="px-4 py-2 border-b align-top font-medium"
                >
                  I. Content & Argumentation
                </td>
                <td rowSpan={3} className="px-4 py-2 border-b align-top">
                  25%
                </td>
                <td className="px-4 py-2 border-b">
                  Clarity of Argument – Logical, well-structured argument with a
                  clear stance.
                </td>
                <td className="px-4 py-2 border-b">10%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Use of Evidence & Research – Arguments supported by credible
                  sources and examples.
                </td>
                <td className="px-4 py-2 border-b">10%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Effective Use of Conjunctions – Coordinating, subordinating,
                  and correlative conjunctions used correctly.
                </td>
                <td className="px-4 py-2 border-b">5%</td>
              </tr>
              <tr>
                <td
                  rowSpan={3}
                  className="px-4 py-2 border-b align-top font-medium"
                >
                  II. Project Planning & Collaboration
                </td>
                <td rowSpan={3} className="px-4 py-2 border-b align-top">
                  20%
                </td>
                <td className="px-4 py-2 border-b">
                  Defined Goals & Objectives – Clear purpose and intended
                  outcomes of the project.
                </td>
                <td className="px-4 py-2 border-b">5%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Collaboration & Teamwork – Effective teamwork, role
                  distribution, and contributions from all members.
                </td>
                <td className="px-4 py-2 border-b">10%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Problem-Solving & Adaptability – Ability to address challenges
                  and adapt as needed.
                </td>
                <td className="px-4 py-2 border-b">5%</td>
              </tr>
              <tr>
                <td
                  rowSpan={3}
                  className="px-4 py-2 border-b align-top font-medium"
                >
                  III. Blog Design & User Experience
                </td>
                <td rowSpan={3} className="px-4 py-2 border-b align-top">
                  20%
                </td>
                <td className="px-4 py-2 border-b">
                  Visual Appeal & Layout – Aesthetically pleasing,
                  well-organized, and easy to navigate.
                </td>
                <td className="px-4 py-2 border-b">10%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Multimedia Integration – Effective use of images, graphics, or
                  media elements for engagement.
                </td>
                <td className="px-4 py-2 border-b">5%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Accessibility & Readability – Readable and accessible to a
                  diverse audience.
                </td>
                <td className="px-4 py-2 border-b">5%</td>
              </tr>
              <tr>
                <td
                  rowSpan={3}
                  className="px-4 py-2 border-b align-top font-medium"
                >
                  IV. Reflection & Learning
                </td>
                <td rowSpan={3} className="px-4 py-2 border-b align-top">
                  20%
                </td>
                <td className="px-4 py-2 border-b">
                  Depth of Reflection – Insightful discussion of learning
                  experiences and teamwork.
                </td>
                <td className="px-4 py-2 border-b">10%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Critical Analysis – Thoughtful critique of strengths and areas
                  for improvement.
                </td>
                <td className="px-4 py-2 border-b">5%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Connection to Real-World Issues – Relates topic to broader
                  societal and ethical concerns.
                </td>
                <td className="px-4 py-2 border-b">5%</td>
              </tr>
              <tr>
                <td
                  rowSpan={2}
                  className="px-4 py-2 border-b align-top font-medium"
                >
                  V. Project Overview & Technological Integration
                </td>
                <td rowSpan={2} className="px-4 py-2 border-b align-top">
                  15%
                </td>
                <td className="px-4 py-2 border-b">
                  Clear Project Overview – Effective presentation of the
                  project&apos;s purpose, audience, and context.
                </td>
                <td className="px-4 py-2 border-b">5%</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b">
                  Technological Tools & Pedagogical Integration – Effective use
                  of digital tools and teaching strategies.
                </td>
                <td className="px-4 py-2 border-b">10%</td>
              </tr>
              <tr className="bg-blue-50 font-bold">
                <td colSpan={3} className="px-4 py-2 text-right">
                  Total:
                </td>
                <td className="px-4 py-2">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
