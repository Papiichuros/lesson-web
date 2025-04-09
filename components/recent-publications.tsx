import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock } from "lucide-react"
import { TextAnimate } from "./magicui/text-animate"

export default function RecentPublications() {
  const publications = [
    {
      title: "Introduction to React Hooks",
      description: "Learn how to use React's built-in hooks to manage state and side effects in your applications.",
      date: "April 2, 2025",
      readTime: "10 min read",
      category: "Programming",
      type: "Article",
      href: "/articles/introduction-to-react-hooks",
    },
    {
      title: "Data Visualization with D3.js",
      description: "Create interactive and dynamic data visualizations for the web using the powerful D3.js library.",
      date: "March 28, 2025",
      readTime: "12 min read",
      category: "Data Science",
      type: "Article",
      href: "/articles/data-visualization-with-d3js",
    },
    {
      title: "Responsive Design Best Practices",
      description: "Master the techniques for creating websites that look great on any device, from mobile to desktop.",
      date: "March 25, 2025",
      readTime: "8 min read",
      category: "Design",
      type: "Article",
      href: "/articles/responsive-design-best-practices",
    },
    {
      title: "Cloud Architecture Patterns",
      description: "Design patterns and best practices for building scalable and resilient cloud applications.",
      date: "March 20, 2025",
      readTime: "15 min read",
      category: "Programming",
      type: "Article",
      href: "/articles/cloud-architecture-patterns",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 place-items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Recently Published</h2>
            <TextAnimate className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay up-to-date with our latest articles and publications.
            </TextAnimate>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
          {publications.map((publication, index) => (
            <Card key={publication.title} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{publication.category}</Badge>
                  <Badge variant="secondary">{publication.type}</Badge>
                </div>
                <CardTitle className="mt-2">{publication.title}</CardTitle>
                <CardDescription>{publication.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{publication.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{publication.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={publication.href}
                  className="bg-blue-600 hover:bg-blue-700 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Read Article
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/articles"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
