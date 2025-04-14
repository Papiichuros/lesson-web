import { notFound } from "next/navigation";

// Mock data for articles
const articles = [
  {
    id: "getting-started-with-react",
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    coverImage: "/placeholder.svg?height=400&width=600",
    description: "Learn the basics of React and how to set up your first React application.",
    author: "Jane Smith",
    publishedDate: "April 5, 2024",
    content: `
      <h1>Getting Started with React</h1>
      <p class="text-gray-600 mb-6">Published on April 5, 2024 by Jane Smith</p>
      <img src="/placeholder.svg?height=400&width=800" alt="React Logo" class="w-full rounded-lg mb-6" />
      <p>React is a JavaScript library for building user interfaces...</p>
    `,
  },
  {
    id: "css-grid-layout-tutorial",
    title: "CSS Grid Layout Tutorial",
    slug: "css-grid-layout-tutorial",
    coverImage: "/placeholder.svg?height=400&width=600",
    description: "Master CSS Grid Layout with this comprehensive tutorial.",
    author: "John Doe",
    publishedDate: "March 22, 2024",
    content: `
      <h1>CSS Grid Layout Tutorial</h1>
      <p class="text-gray-600 mb-6">Published on March 22, 2024 by John Doe</p>
      <img src="/placeholder.svg?height=400&width=800" alt="CSS Grid Layout" class="w-full rounded-lg mb-6" />
      <p>CSS Grid Layout is a two-dimensional layout system...</p>
    `,
  },
];

// ✅ Correct props typing (this is what Next.js expects in App Router)
type ArticlePageProps = {
  params: {
    slug: string;
  };
};

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find((article) => article.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}
