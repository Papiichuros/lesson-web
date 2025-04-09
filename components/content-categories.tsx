import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, Code, Database, Palette, LineChart } from "lucide-react"

export default function ContentCategories() {
  const categories = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Programming",
      description: "Web, mobile, and software development resources",
      href: "/category/programming",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Science",
      description: "Data analysis, machine learning, and AI resources",
      href: "/category/data-science",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Design",
      description: "UX/UI, graphic design, and creative tools",
      href: "/category/design",
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Business",
      description: "Marketing, entrepreneurship, and management",
      href: "/category/business",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Articles",
      description: "In-depth articles on various technology topics",
      href: "/articles",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "eBooks",
      description: "Comprehensive guides on technical subjects",
      href: "/ebooks",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 place-items-center bg-blue-200/65">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Browse by Category</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our wide range of content organized by subject area.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link key={category.title} href={category.href} className="group">
              <Card className="h-full transition-all group-hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 text-primary">{category.icon}</div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm font-medium text-primary group-hover:underline">
                    Explore {category.title} →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
