import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Filter, Search, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CoursesPage() {
  const courses = [
    {
      title: "Web Development Fundamentals",
      description: "Learn the core technologies that power the modern web: HTML, CSS, and JavaScript.",
      duration: "12 hours",
      enrolled: "2,345",
      level: "Beginner",
      category: "Programming",
      href: "/courses/web-development-fundamentals",
    },
    {
      title: "Advanced React Development",
      description: "Master React hooks, context API, and build complex applications with modern React patterns.",
      duration: "15 hours",
      enrolled: "1,876",
      level: "Intermediate",
      category: "Programming",
      href: "/courses/advanced-react-development",
    },
    {
      title: "UX/UI Design Principles",
      description: "Master the art of creating intuitive, user-friendly interfaces that delight users.",
      duration: "8 hours",
      enrolled: "1,543",
      level: "Beginner",
      category: "Design",
      href: "/courses/ux-ui-design-principles",
    },
    {
      title: "Python for Data Science",
      description: "Learn how to use Python for data analysis, visualization, and machine learning.",
      duration: "20 hours",
      enrolled: "3,210",
      level: "Intermediate",
      category: "Data Science",
      href: "/courses/python-for-data-science",
    },
    {
      title: "Digital Marketing Essentials",
      description: "Discover the fundamentals of digital marketing, from SEO to social media and content strategy.",
      duration: "10 hours",
      enrolled: "1,432",
      level: "Beginner",
      category: "Business",
      href: "/courses/digital-marketing-essentials",
    },
    {
      title: "Full-Stack JavaScript Development",
      description: "Build complete web applications with Node.js, Express, MongoDB, and React.",
      duration: "25 hours",
      enrolled: "2,187",
      level: "Advanced",
      category: "Programming",
      href: "/courses/full-stack-javascript-development",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Learn</span>Hub
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-sm font-medium text-primary">
              Courses
            </Link>
            <Link href="/ebooks" className="text-sm font-medium hover:text-primary">
              eBooks
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Browse Our Courses</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Discover high-quality courses designed to help you master new skills and advance your career.
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
                    <Input type="search" placeholder="Search courses..." className="w-full pl-8" />
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
                      <label className="text-sm font-medium mb-1 block">Level</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-1 block">Duration</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Any Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Duration</SelectItem>
                          <SelectItem value="short">Under 5 hours</SelectItem>
                          <SelectItem value="medium">5-15 hours</SelectItem>
                          <SelectItem value="long">Over 15 hours</SelectItem>
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {courses.map((course, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative">
                        <img
                          src="/placeholder.svg?height=200&width=400"
                          alt={course.title}
                          width={400}
                          height={200}
                          className="aspect-video w-full object-cover"
                        />
                        <div className="absolute right-2 top-2 flex gap-2">
                          <Badge>{course.level}</Badge>
                          <Badge variant="outline">{course.category}</Badge>
                        </div>
                      </div>
                      <CardHeader className="flex-1">
                        <CardTitle>{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.enrolled} enrolled</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link
                          href={course.href}
                          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                          View Course
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" disabled>
                      <span className="sr-only">Previous page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="font-medium">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="icon">
                      <span className="sr-only">Next page</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Button>
                  </div>
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
              <span className="text-primary">Learn</span>Hub
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering learners worldwide with quality educational content.
            </p>
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
          <p className="text-sm text-muted-foreground">© 2025 LearnHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
