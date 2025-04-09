import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Filter, Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EbooksPage() {
  const ebooks = [
    {
      title: "Data Science Essentials",
      description: "A comprehensive guide to data analysis, visualization, and machine learning fundamentals.",
      pages: "320",
      rating: "4.8",
      reviews: "156",
      category: "Data Science",
      href: "/ebooks/data-science-essentials",
    },
    {
      title: "Modern JavaScript: From Fundamentals to Advanced",
      description: "Master JavaScript from the basics to advanced concepts like closures, promises, and async/await.",
      pages: "450",
      rating: "4.9",
      reviews: "203",
      category: "Programming",
      href: "/ebooks/modern-javascript",
    },
    {
      title: "The Complete Guide to UX Research",
      description: "Learn how to conduct effective user research to create products that truly meet user needs.",
      pages: "280",
      rating: "4.7",
      reviews: "124",
      category: "Design",
      href: "/ebooks/complete-guide-ux-research",
    },
    {
      title: "Digital Marketing Strategy Blueprint",
      description: "A strategic framework for planning and executing successful digital marketing campaigns.",
      pages: "210",
      rating: "4.6",
      reviews: "98",
      category: "Business",
      href: "/ebooks/digital-marketing-strategy",
    },
    {
      title: "Cloud Architecture Patterns",
      description: "Design patterns and best practices for building scalable and resilient cloud applications.",
      pages: "380",
      rating: "4.9",
      reviews: "176",
      category: "Programming",
      href: "/ebooks/cloud-architecture-patterns",
    },
    {
      title: "Machine Learning Algorithms Explained",
      description: "A deep dive into popular machine learning algorithms with practical examples and use cases.",
      pages: "420",
      rating: "4.8",
      reviews: "187",
      category: "Data Science",
      href: "/ebooks/machine-learning-algorithms",
    },
    {
      title: "Responsive Web Design Mastery",
      description: "Learn how to create websites that look great on any device with modern CSS techniques.",
      pages: "290",
      rating: "4.7",
      reviews: "142",
      category: "Design",
      href: "/ebooks/responsive-web-design-mastery",
    },
    {
      title: "DevOps Handbook",
      description: "A practical guide to implementing DevOps practices in your organization.",
      pages: "350",
      rating: "4.8",
      reviews: "165",
      category: "Programming",
      href: "/ebooks/devops-handbook",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 place-items-center">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Knowledge</span>Hub
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/ebooks" className="text-sm font-medium text-primary">
              eBooks
            </Link>
            <Link href="/articles" className="text-sm font-medium hover:text-primary">
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
            <Input type="search" placeholder="Search eBooks..." className="w-[200px] pl-8 md:w-[200px] lg:w-[300px]" />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 place-items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Browse Our eBooks</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Discover comprehensive guides and references to help you master new skills at your own pace.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 place-items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-20 md:flex-row">
              <div className="md:w-1/4 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search eBooks..." className="w-full pl-8" />
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
                      <label className="text-sm font-medium mb-1 block">Rating</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Any Rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Rating</SelectItem>
                          <SelectItem value="4.5">4.5 & Up</SelectItem>
                          <SelectItem value="4.0">4.0 & Up</SelectItem>
                          <SelectItem value="3.5">3.5 & Up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Length</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Any Length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Length</SelectItem>
                          <SelectItem value="short">Under 200 pages</SelectItem>
                          <SelectItem value="medium">200-400 pages</SelectItem>
                          <SelectItem value="long">Over 400 pages</SelectItem>
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {ebooks.map((ebook, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt={ebook.title}
                          width={400}
                          height={200}
                          className="aspect-video w-full object-cover"
                        />
                        <Badge className="absolute right-2 top-2">{ebook.category}</Badge>
                      </div>
                      <CardHeader className="flex-1">
                        <CardTitle>{ebook.title}</CardTitle>
                        <CardDescription>{ebook.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{ebook.pages} pages</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span>
                              {ebook.rating} ({ebook.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={ebook.href}
                          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                          Read eBook
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
      <footer className="border-t bg-background place-items-center">
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
