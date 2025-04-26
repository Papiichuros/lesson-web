"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ChevronRightIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextAnimate } from "./magicui/text-animate";
import { RainbowButton } from "./magicui/rainbow-button";

export default function RecentPublications() {
  const router = useRouter();

  const publications = [
    {
      title: "Collaborative Learning",
      description: "Tackle social media regulation through argumentative writing.",
      date: "April 26, 2025",
      type: "Blog",
      href: "/blogs/collaborative-learning",
    },
  ];

  const handleAccessContent = (href: string) => {
    router.push(href); // Navigate to the content directly
  };

  return (
    <section className="w-full py-12 md:py-24 place-items-center">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Latest Blogs</h2>
            <TextAnimate className="max-w-[700px] text-slate-500/60 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stay up-to-date with our latest blogs.
            </TextAnimate>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
          {publications.map((publication) => (
            <Card key={publication.title} className="flex flex-col overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex-1">
                <div className="flex items-center justify-between">
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
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg text-white group"
                  onClick={() => handleAccessContent(publication.href)}
                >
                  Read Blog
                  <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <RainbowButton onClick={() => handleAccessContent("/blogs")}>
            View All Blogs
          </RainbowButton>
        </div>
      </div>
    </section>
  );
}
