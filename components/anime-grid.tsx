"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Anime } from "@/lib/types"
import { toggleFavoriteAction } from "@/lib/actions"

interface AnimeGridProps {
  animeList: Anime[]
  compact?: boolean
}

export default function AnimeGrid({ animeList, compact = false }: AnimeGridProps) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get favorites from localStorage
    if (typeof window !== "undefined") {
      const favs = JSON.parse(localStorage.getItem("anime_favorites") || "[]")
      // Only update state if the favorites have changed
      if (JSON.stringify(favs) !== JSON.stringify(favorites)) {
        setFavorites(favs)
      }
    }
  }, [favorites])

  const toggleFavoriteHandler = async (id: number) => {
    const result = await toggleFavoriteAction(id)

    if (result.success) {
      if (result.isAdded) {
        setFavorites((prev) => [...prev, id])
      } else {
        setFavorites((prev) => prev.filter((favId) => favId !== id))
      }
    }
  }

  if (!mounted) {
    return (
      <div
        className={`animate-pulse grid grid-cols-1 gap-3 xs:gap-4 sm:gap-6 
        ${
          compact
            ? "xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
            : "xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        }`}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-[300px] xs:h-[350px] sm:h-[400px] bg-muted rounded-lg"></div>
        ))}
      </div>
    )
  }

  if (!animeList || animeList.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <h3 className="text-lg sm:text-xl font-medium mb-2">Anime topilmadi</h3>
        <p className="text-muted-foreground">Hech qanday anime mavjud emas</p>
      </div>
    )
  }

  return (
    <div
      className={`grid grid-cols-1 gap-3 xs:gap-4 sm:gap-6 
      ${
        compact
          ? "xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
          : "xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      }`}
    >
      {animeList.map((anime) => (
        <Card key={anime.id} className="overflow-hidden h-full flex flex-col">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={anime.image || "/placeholder.svg?height=400&width=300"}
              alt={anime.title}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 flex gap-1 sm:gap-2 flex-wrap">
              <Badge variant="secondary" className="text-[10px] xs:text-xs">
                {anime.year || "N/A"}
              </Badge>
              <Badge className="text-[10px] xs:text-xs">{anime.episodes || "?"} qism</Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 left-2 rounded-full bg-background/80 h-7 w-7 sm:h-8 sm:w-8 ${
                favorites.includes(anime.id) ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={() => toggleFavoriteHandler(anime.id)}
            >
              <Heart className="h-4 w-4" fill={favorites.includes(anime.id) ? "currentColor" : "none"} />
            </Button>
          </div>
          <CardContent className="p-3 sm:p-4 flex-grow">
            <h3 className="font-bold text-sm xs:text-base sm:text-lg line-clamp-1">{anime.title}</h3>
            <div className="flex flex-wrap gap-1 mt-2">
              {anime.genres.slice(0, 3).map((genre) => (
                <Badge key={genre} variant="outline" className="text-[10px] xs:text-xs">
                  {genre}
                </Badge>
              ))}
              {anime.genres.length > 3 && (
                <Badge variant="outline" className="text-[10px] xs:text-xs">
                  +{anime.genres.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-3 sm:p-4 pt-0 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-xs sm:text-sm font-medium">{anime.rating ? anime.rating.toFixed(1) : "N/A"}</span>
            </div>
            <Button asChild size="sm" className="h-7 text-xs sm:text-sm px-2 sm:px-3">
              <Link href={`/anime/${anime.id}`}>
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Ko'rish
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

