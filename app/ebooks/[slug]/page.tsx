"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import EbookContent from "@/components/ebook-content"
import EbookTableOfContents from "@/components/ebook-table-of-contents"

// Define proper types for our data
interface Chapter {
  id: string
  title: string
  content: string
}

interface Ebook {
  id: string
  title: string
  slug: string
  coverImage: string
  description: string
  author: string
  publishedDate: string
  chapters: Chapter[]
}

// Mock data for eBooks
const ebooks: Ebook[] = [
  {
    id: "web-development-fundamentals",
    title: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "A comprehensive guide to modern web development practices and technologies.",
    author: "Jane Smith",
    publishedDate: "March 15, 2024",
    chapters: [
      {
        id: "chapter-1",
        title: "Introduction to Web Development",
        content: `
          <h2>Introduction to Web Development</h2>
          <p>Web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services.</p>
          <p>The field of web development encompasses several different aspects, including:</p>
          <ul>
            <li>Front-end development (client-side)</li>
            <li>Back-end development (server-side)</li>
            <li>Database technology</li>
            <li>Web server configuration</li>
          </ul>
          <img src="/placeholder.svg?height=300&width=500" alt="Web Development Overview" />
          <p>In this book, we'll explore all these aspects and more, providing you with a solid foundation in modern web development practices.</p>
        `,
      },
      {
        id: "chapter-2",
        title: "HTML Fundamentals",
        content: `
          <h2>HTML Fundamentals</h2>
          <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and content of web pages.</p>
          <p>Here's a basic HTML document structure:</p>
          <pre><code>
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;My First Heading&lt;/h1&gt;
  &lt;p&gt;My first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
          </code></pre>
          <p>HTML uses "markup" to annotate text, images, and other content for display in a Web browser. HTML markup includes special "elements" such as &lt;head&gt;, &lt;title&gt;, &lt;body&gt;, &lt;header&gt;, &lt;footer&gt;, &lt;article&gt;, &lt;section&gt;, &lt;p&gt;, &lt;div&gt;, &lt;span&gt;, &lt;img&gt;, and many others.</p>
          <img src="/placeholder.svg?height=300&width=500" alt="HTML Structure Diagram" />
        `,
      },
      {
        id: "chapter-3",
        title: "CSS Styling",
        content: `
          <h2>CSS Styling</h2>
          <p>CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts.</p>
          <p>Here's a basic CSS example:</p>
          <pre><code>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f0f0f0;
}

h1 {
  color: #333;
  text-align: center;
}

p {
  line-height: 1.6;
  color: #666;
}
          </code></pre>
          <p>CSS can be added to HTML documents in 3 ways:</p>
          <ul>
            <li>Inline - by using the style attribute inside HTML elements</li>
            <li>Internal - by using a &lt;style&gt; element in the &lt;head&gt; section</li>
            <li>External - by using a &lt;link&gt; element to link to an external CSS file</li>
          </ul>
          <img src="/placeholder.svg?height=300&width=500" alt="CSS Box Model" />
        `,
      },
    ],
  },
  {
    id: "javascript-mastery",
    title: "JavaScript Mastery",
    slug: "javascript-mastery",
    coverImage: "/placeholder.svg?height=400&width=300",
    description: "Master JavaScript from basics to advanced concepts with practical examples.",
    author: "John Doe",
    publishedDate: "January 10, 2024",
    chapters: [
      {
        id: "chapter-1",
        title: "Introduction to JavaScript",
        content: `
          <h2>Introduction to JavaScript</h2>
          <p>JavaScript is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.</p>
          <p>JavaScript is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries.</p>
          <img src="/placeholder.svg?height=300&width=500" alt="JavaScript Overview" />
        `,
      },
      {
        id: "chapter-2",
        title: "Variables and Data Types",
        content: `
          <h2>Variables and Data Types</h2>
          <p>In JavaScript, variables are containers for storing data values. JavaScript provides different data types to hold different types of values.</p>
          <p>Here are the basic data types in JavaScript:</p>
          <ul>
            <li>String - for text values</li>
            <li>Number - for numeric values</li>
            <li>Boolean - true or false</li>
            <li>Object - for complex data structures</li>
            <li>Array - for lists of values</li>
            <li>Null - for intentional absence of value</li>
            <li>Undefined - for variables that have been declared but not assigned a value</li>
          </ul>
          <pre><code>
// Variable declaration
let name = "John";  // String
let age = 30;       // Number
let isActive = true; // Boolean
let user = {        // Object
  firstName: "John",
  lastName: "Doe"
};
let colors = ["Red", "Green", "Blue"]; // Array
let empty = null;   // Null
let notDefined;     // Undefined
          </code></pre>
          <img src="/placeholder.svg?height=300&width=500" alt="JavaScript Data Types" />
        `,
      },
      {
        id: "chapter-3",
        title: "Next.js Mastery",
        content: `
          <h2>Next.js Mastery</h2>
          <p>Next.js is a React framework that enables functionality such as server-side rendering and generating static websites for React-based web applications.</p>
          <p>Here are some key features of Next.js:</p>
          <ul>
            <li>File-based routing</li>
            <li>Server-side rendering (SSR)</li>
            <li>Static site generation (SSG)</li>
            <li>API routes</li>
            <li>Built-in CSS and Sass support</li>
            <li>Image optimization</li>
          </ul>
          <p>Here's an example of a simple Next.js page:</p>
          <pre><code>

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is a simple Next.js page.</p>
    </div>
  );
}
          </code></pre>
          <p>Next.js makes it easy to build fast, scalable, and SEO-friendly web applications.</p>
          <img src="/placeholder.svg?height=300&width=500" alt="Next.js Overview" />
        `,
      },
    ],
  },
]

export default function EbookPage() {
  const params = useParams<{ slug: string }>()
  const [ebook, setEbook] = useState<Ebook | null>(null)
  const [notFound404, setNotFound404] = useState(false)

  useEffect(() => {
    // Find the ebook based on the slug from params
    if (params && params.slug) {
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
      const foundEbook = ebooks.find((ebook) => ebook.slug === slug)

      if (foundEbook) {
        setEbook(foundEbook)
      } else {
        setNotFound404(true)
      }
    }
  }, [params])

  // Handle not found case
  if (notFound404) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">eBook Not Found</h1>
        <p className="text-gray-600">The eBook you're looking for doesn't exist.</p>
      </div>
    )
  }

  // Show loading state while ebook is being fetched
  if (!ebook) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading eBook...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-48 h-64">
                <Image
                  src={ebook.coverImage || "/placeholder.svg"}
                  alt={ebook.title}
                  fill
                  className="object-cover rounded-md shadow-md"
                />
              </div>
              <h2 className="text-xl font-semibold mt-4">{ebook.title}</h2>
              <p className="text-sm text-gray-600">By {ebook.author}</p>
              <p className="text-xs text-gray-500">{ebook.publishedDate}</p>
            </div>
            <EbookTableOfContents ebook={ebook} />
          </div>
        </div>
        <div className="md:col-span-3">
          <EbookContent ebook={ebook} />
        </div>
      </div>
    </div>
  )
}
