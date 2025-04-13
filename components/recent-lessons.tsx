import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"

export default function RecentLessons() {
  const lessons = [
    {
      title: "Introduction to React Hooks",
      description: "Learn how to use React's built-in hooks to manage state and side effects in your applications.",
      date: "April 2, 2025",
      category: "Programming",
      type: "Lesson",
      href: "/lessons/introduction-to-react-hooks",
    },
    {
      title: "Data Visualization with D3.js",
      description: "Create interactive and dynamic data visualizations for the web using the powerful D3.js library.",
      date: "March 28, 2025",
      category: "Data Science",
      type: "Tutorial",
      href: "/lessons/data-visualization-with-d3js",
    },
    {
      title: "Responsive Design Best Practices",
      description: "Master the techniques for creating websites that look great on any device, from mobile to desktop.",
      date: "March 25, 2025",
      category: "Design",
      type: "Guide",
      href: "/lessons/responsive-design-best-practices",
    },
    {
      title: "Introduction to TypeScript",
      description: "Get started with TypeScript and learn how it improves JavaScript development with static typing.",
      date: "March 20, 2025",
      category: "Programming",
      type: "Lesson",
      href: "/lessons/introduction-to-typescript",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 place-items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Recently Added Lessons</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay up-to-date with our latest educational content and learning resources.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
          {lessons.map((lesson, index) => (
            <Card key={lesson.title} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{lesson.category}</Badge>
                  <Badge variant="secondary">{lesson.type}</Badge>
                </div>
                <CardTitle className="mt-2">{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{lesson.date}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={lesson.href}
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  Read Lesson
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Link
            href="/lessons"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            View All Lessons
          </Link>
        </div>
      </div>
    </section>
  )
}
