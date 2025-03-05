"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Anime } from "@/lib/types"

interface FeaturedAnimeProps {
  featuredAnime: Anime[]
}

export default function FeaturedAnime({ featuredAnime }: FeaturedAnimeProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredAnime.length)
  }, [featuredAnime.length])

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredAnime.length) % featuredAnime.length)
  }

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }

    if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide])

  if (!featuredAnime || featuredAnime.length === 0) {
    return <div className="animate-pulse h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] bg-muted rounded-xl"></div>
  }

  const current = featuredAnime[currentIndex]

  if (!current) {
    return <div className="animate-pulse h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] bg-muted rounded-xl"></div>
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <img
        src={current.image || "/placeholder.svg?height=600&width=1200"}
        alt={current.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-10">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
            {current.genres.slice(0, 3).map((genre) => (
              <Badge key={genre} className="bg-primary/80 text-[10px] xs:text-xs">
                {genre}
              </Badge>
            ))}
          </div>
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2">
            {current.title}
          </h1>
          <p className="text-white/90 mb-3 sm:mb-4 md:mb-6 max-w-2xl text-xs xs:text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
            {current.description || current.synopsis || "Ma'lumot mavjud emas"}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <Button size="sm" className="h-8 text-xs sm:text-sm md:text-base" asChild>
              <Link href={`/anime/${current.id}`}>
                <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                Hozir ko'rish
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs sm:text-sm md:text-base" asChild>
              <Link href={`/anime/${current.id}`}>Batafsil</Link>
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-1 sm:left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/20 text-white hover:bg-background/40 h-7 w-7 sm:h-10 sm:w-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 sm:right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-background/20 text-white hover:bg-background/40 h-7 w-7 sm:h-10 sm:w-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-1 sm:gap-2">
        {featuredAnime.map((_, index) => (
          <button
            key={index}
            className={`h-1 sm:h-2 w-4 sm:w-8 rounded-full ${index === currentIndex ? "bg-primary" : "bg-white/50"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

