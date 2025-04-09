import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock } from "lucide-react"
import { TextAnimate } from "./magicui/text-animate"
export default function FeaturedContent() {
  return (
    <section className="w-full py-12 md:py-24 place-items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Popular Resources</h2>
            <TextAnimate className="max-w-[600px] text-muted-foreground md:text-xl">
              {"Discover our most popular eBooks and articles that readers find most valuable."}
            </TextAnimate>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Data Science Essentials"
                width={400}
                height={200}
                className="aspect-video w-full object-cover"
              />
              <Badge className="absolute right-2 top-2 bg-blue-600">eBook</Badge>
            </div>
            <CardHeader className="flex-1">
              <CardTitle>Data Science Essentials</CardTitle>
              <CardDescription>
                A comprehensive guide to data analysis, visualization, and machine learning fundamentals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>320 pages</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
                <Link
                href="/ebooks/data-science-essentials"
                className=" inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                Read eBook
                </Link>
            </CardFooter>
          </Card>
          <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Modern JavaScript Guide"
                width={400}
                height={200}
                className="aspect-video w-full object-cover"
              />
              <Badge className="absolute right-2 top-2 bg-blue-600">eBook</Badge>
            </div>
            <CardHeader className="flex-1">
              <CardTitle>Modern JavaScript Guide</CardTitle>
              <CardDescription>
                Master JavaScript from the basics to advanced concepts like closures, promises, and async/await.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>450 pages</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/ebooks/modern-javascript"
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Read eBook
              </Link>
            </CardFooter>
          </Card>
          <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
            <div className="relative">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="UX Research Methods"
                width={400}
                height={200}
                className="aspect-video w-full object-cover"
              />
              <Badge className="absolute right-2 top-2 bg-blue-600">Article</Badge>
            </div>
            <CardHeader className="flex-1">
              <CardTitle>UX Research Methods</CardTitle>
              <CardDescription>
                A comprehensive overview of the most effective user research methods for product design.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>15 min read</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link
                href="/articles/ux-research-methods"
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Read Article
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="flex justify-center">
          <Link
            href="/browse"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Browse All Resources
          </Link>
        </div>
      </div>
    </section>
  )
}
