import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ArticlesPage() {
  const articles = [
    {
      title: "Introduction to React Hooks",
      description: "Learn how to use React's built-in hooks to manage state and side effects in your applications.",
      date: "April 2, 2025",
      readTime: "10 min read",
      category: "Programming",
      href: "/articles/introduction-to-react-hooks",
    },
    {
      title: "Data Visualization with D3.js",
      description: "Create interactive and dynamic data visualizations for the web using the powerful D3.js library.",
      date: "March 28, 2025",
      readTime: "12 min read",
      category: "Data Science",
      href: "/articles/data-visualization-with-d3js",
    },
    {
      title: "Responsive Design Best Practices",
      description: "Master the techniques for creating websites that look great on any device, from mobile to desktop.",
      date: "March 25, 2025",
      readTime: "8 min read",
      category: "Design",
      href: "/articles/responsive-design-best-practices",
    },
    {
      title: "Cloud Architecture Patterns",
      description: "Design patterns and best practices for building scalable and resilient cloud applications.",
      date: "March 20, 2025",
      readTime: "15 min read",
      category: "Programming",
      href: "/articles/cloud-architecture-patterns",
    },
    {
      title: "Introduction to TypeScript",
      description: "Get started with TypeScript and learn how it improves JavaScript development with static typing.",
      date: "March 15, 2025",
      readTime: "10 min read",
      category: "Programming",
      href: "/articles/introduction-to-typescript",
    },
    {
      title: "Machine Learning for Beginners",
      description: "A gentle introduction to machine learning concepts and applications for beginners.",
      date: "March 10, 2025",
      readTime: "12 min read",
      category: "Data Science",
      href: "/articles/machine-learning-for-beginners",
    },
    {
      title: "Color Theory in UI Design",
      description:
        "Learn how to use color effectively in your user interface designs to improve usability and aesthetics.",
      date: "March 5, 2025",
      readTime: "8 min read",
      category: "Design",
      href: "/articles/color-theory-in-ui-design",
    },
    {
      title: "Serverless Architecture Explained",
      description: "Understand the benefits and challenges of serverless architecture for modern applications.",
      date: "March 1, 2025",
      readTime: "14 min read",
      category: "Programming",
      href: "/articles/serverless-architecture-explained",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Knowledge</span>Hub
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/ebooks" className="text-sm font-medium hover:text-primary">
              eBooks
            </Link>
            <Link href="/articles" className="text-sm font-medium text-primary">
              Articles
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary">
              Resources
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
          </div>
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-[200px] pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Browse Our Articles</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Discover insightful articles on programming, design, data science, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="md:w-1/4 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search articles..." className="w-full pl-8" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Filters</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Category</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="programming">Programming</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Date</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Any Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Date</SelectItem>
                          <SelectItem value="this-week">This Week</SelectItem>
                          <SelectItem value="this-month">This Month</SelectItem>
                          <SelectItem value="this-year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Read Time</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Any Length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Length</SelectItem>
                          <SelectItem value="short">Under 5 min</SelectItem>
                          <SelectItem value="medium">5-15 min</SelectItem>
                          <SelectItem value="long">Over 15 min</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">
                      <Filter className="mr-2 h-4 w-4" />
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:w-3/4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {articles.map((article, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                      <CardHeader className="flex-1">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{article.category}</Badge>
                        </div>
                        <CardTitle className="mt-2">{article.title}</CardTitle>
                        <CardDescription>{article.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={article.href}
                          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                          Read Article
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background">
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
  )
}
