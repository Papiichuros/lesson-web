"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Chapter {
  id: string
  title: string
  content: string
}

interface Ebook {
  id: string
  title: string
  chapters: Chapter[]
}

export default function EbookContent({ ebook }: { readonly ebook: Ebook }) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const currentChapter = ebook.chapters[currentChapterIndex]

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1)
      window.scrollTo(0, 0)
    }
  }

  const goToNextChapter = () => {
    if (currentChapterIndex < ebook.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1)
      window.scrollTo(0, 0)
    }
  }

  const goToChapter = (index: number) => {
    setCurrentChapterIndex(index)
    window.scrollTo(0, 0)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: currentChapter.content }} />

      <div className="flex justify-between mt-12 pt-6 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={goToPreviousChapter}
          disabled={currentChapterIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous Chapter
        </Button>

        <Button
          variant="outline"
          onClick={goToNextChapter}
          disabled={currentChapterIndex === ebook.chapters.length - 1}
          className="flex items-center gap-2"
        >
          Next Chapter
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
