import Link from "next/link"
import { Search, Filter, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

// Mock data for articles
const articles = [
  {
    id: 1,
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    author: "Jane Smith",
    publishedDate: "April 5, 2024",
    coverImage: "/placeholder.svg?height=400&width=600",
    category: "Frontend",
    readTime: "8 min read",
    description: "Learn the basics of React and how to set up your first React application.",
  },
  {
    id: 2,
    title: "CSS Grid Layout Tutorial",
    slug: "css-grid-layout-tutorial",
    author: "John Doe",
    publishedDate: "March 22, 2024",
    coverImage: "/placeholder.svg?height=400&width=600",
    category: "CSS",
    readTime: "10 min read",
    description: "Master CSS Grid Layout with this comprehensive tutorial.",
  },
  {
    id: 3,
    title: "Introduction to TypeScript",
    slug: "introduction-to-typescript",
    author: "Sarah Johnson",
    publishedDate: "March 15, 2024",
    coverImage: "/placeholder.svg?height=400&width=600",
    category: "TypeScript",
    readTime: "12 min read",
    description: "Discover the benefits of TypeScript and how to use it in your projects.",
  },
  {
    id: 4,
    title: "Building RESTful APIs with Node.js",
    slug: "building-restful-apis-with-nodejs",
    author: "Michael Chen",
    publishedDate: "March 10, 2024",
    coverImage: "/placeholder.svg?height=400&width=600",
    category: "Backend",
    readTime: "15 min read",
    description: "Learn how to create robust RESTful APIs using Node.js and Express.",
  },
  {
    id: 5,
    title: "Responsive Web Design Best Practices",
    slug: "responsive-web-design-best-practices",
    author: "Lisa Rodriguez",
    publishedDate: "March 5, 2024",
    coverImage: "/placeholder.svg?height=400&width=600",
    category: "Design",
    readTime: "9 min read",
    description: "Implement responsive design techniques for modern web applications.",
  },
  {
    id: 6,
    title: "JavaScript Promises and Async/Await",
    slug: "javascript-promises-and-async-await",
    author: "David Wilson",
    publishedDate: "February 28, 2024",
    coverImage: "/placeholder.svg?height=400&width=600",
    category: "JavaScript",
    readTime: "11 min read",
    description: "Master asynchronous programming in JavaScript with Promises and async/await.",
  },
]

export default function ArticlesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Articles</h1>
          <p className="text-gray-600">Explore our latest articles and tutorials</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input placeholder="Search articles..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-36">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            {/* Fixed: Added position-relative and height to the image container */}
            <div className="relative w-full h-48">
              <Image src={article.coverImage || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
            <div className="p-4 flex-grow">
              <div className="flex justify-between items-center mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-gray-500">{article.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-3">
                By {article.author} • {article.publishedDate}
              </p>
              <p className="text-gray-700 text-sm mb-4">{article.description}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <Link href={`/articles/${article.slug}`}>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <BookOpen size={16} />
                  Read Article
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
