"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

interface Chapter {
  id: string
  title: string
}

interface Ebook {
  id: string
  title: string
  chapters: Chapter[]
}

export default function EbookTableOfContents({ ebook }: { readonly ebook: Ebook }) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <button
        className="flex items-center justify-between w-full cursor-pointer mb-2 focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h3 className="font-semibold text-lg">Table of Contents</h3>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <ul className="space-y-2 mt-3">
          {ebook.chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                className="block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors text-sm"
              >
                <span className="font-medium">
                  {index + 1}. {chapter.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
        </div>
      )
    }
