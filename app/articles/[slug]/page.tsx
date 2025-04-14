import { notFound } from "next/navigation"

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
      
      <p>React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Why React?</h2>
      <p>React allows developers to create large web applications that can change data, without reloading the page. The main purpose of React is to be fast, scalable, and simple. It works only on user interfaces in the application. This corresponds to the view in the MVC template.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Setting Up Your First React App</h2>
      <p>The easiest way to get started with React is to use Create React App. It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production.</p>
      
      <pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
        <code>
npx create-react-app my-app
cd my-app
npm start
        </code>
      </pre>
      
      <p>This will create a directory called <code>my-app</code> inside the current folder. Inside that directory, it will generate the initial project structure and install the transitive dependencies:</p>
      
      <pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
        <code>
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
        </code>
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Your First Component</h2>
      <p>React is all about components. Let's create a simple component:</p>
      
      <pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
        <code>
import React from 'react';

function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}&lt;/h1&gt;;
}

export default Welcome;
        </code>
      </pre>
      
      <p>This is a functional component that takes props as an argument and returns a React element. You can use this component like this:</p>
      
      <pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
        <code>
import React from 'react';
import Welcome from './Welcome';

function App() {
  return (
    &lt;div&gt;
      &lt;Welcome name="Sara" /&gt;
      &lt;Welcome name="Cahal" /&gt;
      &lt;Welcome name="Edite" /&gt;
    &lt;/div&gt;
  );
}
        </code>
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p>React is a powerful library that makes it easy to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</p>
      
      <p>This tutorial just scratches the surface of what's possible with React. As you continue learning, you'll discover hooks, context, and many other features that make React a joy to work with.</p>
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
      
      <p>CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay out items in rows and columns, and has many features that make building complex layouts straightforward.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Basic Concepts</h2>
      <p>To get started with CSS Grid, you need to understand a few key concepts:</p>
      
      <ul class="list-disc pl-6 my-4">
        <li><strong>Grid Container</strong>: The element on which <code>display: grid</code> is applied.</li>
        <li><strong>Grid Item</strong>: The children of the grid container.</li>
        <li><strong>Grid Line</strong>: The dividing lines that make up the structure of the grid.</li>
        <li><strong>Grid Cell</strong>: The space between four grid lines.</li>
        <li><strong>Grid Track</strong>: The space between two adjacent grid lines, either a row or column.</li>
        <li><strong>Grid Area</strong>: The total space surrounded by four grid lines.</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Creating a Grid Container</h2>
      <p>To create a grid container, you set the display property to grid:</p>
      
      <pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
        <code>
.container {
  display: grid;
}
        </code>
      </pre>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Defining Grid Columns and Rows</h2>
      <p>You can define the columns and rows of your grid using the <code>grid-template-columns</code> and <code>grid-template-rows</code> properties:</p>
      
      <pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
        <code>
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
}
        </code>
      </pre>
      
      <p>This creates a grid with three columns, each 200px wide, and two rows, each 100px tall.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">The fr Unit</h2>
      <p>The <code>fr</code> unit represents a fraction of the available space in the grid container:</p>
      
      <pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
        <code>
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}
        </code>
      </pre>
      
      <p>This creates three columns where the middle column takes up twice as much space as the first and third columns.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Grid Gap</h2>
      <p>You can add space between grid items using the <code>gap</code> property:</p>
      
      <pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
        <code>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}
        </code>
      </pre>
      
      <p>This adds a 20px gap between all rows and columns.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Placing Items</h2>
      <p>You can place items in specific grid cells using the <code>grid-column</code> and <code>grid-row</code> properties:</p>
      
      <pre class="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
        <code>
.item {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}
        </code>
      </pre>
      
      <p>This places the item from column line 1 to column line 3, and from row line 1 to row line 2.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
      <p>CSS Grid Layout is a powerful tool for creating complex web layouts. With its two-dimensional system, you can create layouts that were previously impossible or required complex workarounds.</p>
      
      <p>As you continue to learn CSS Grid, explore concepts like named grid lines, grid template areas, and auto-placement algorithms to take your layouts to the next level.</p>
    `,
  },
]

export default async function ArticlePage({ params }: { readonly params: { readonly slug: string } }) {
  const { slug } = params
  const article = articles.find((article) => article.slug === slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </div>
  )
}
