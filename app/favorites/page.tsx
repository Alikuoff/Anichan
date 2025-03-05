"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimeGrid from "@/components/anime-grid"
import { getFavorites, getAnimeById } from "@/lib/api"
import type { Anime } from "@/lib/types"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadFavorites() {
      const favoriteIds = getFavorites()

      if (favoriteIds.length === 0) {
        if (isMounted) setIsLoading(false)
        return
      }

      const animePromises = favoriteIds.map((id) => getAnimeById(id))
      const animeResults = await Promise.all(animePromises)

      // Filter out null results
      const validAnime = animeResults.filter((anime) => anime !== null) as Anime[]

      if (isMounted) {
        setFavorites(validAnime)
        setIsLoading(false)
      }
    }

    loadFavorites()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="container py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Sevimli animalar</h1>

      {isLoading ? (
        <div className="animate-pulse grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[400px] bg-muted rounded-lg"></div>
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <AnimeGrid animeList={favorites} />
      ) : (
        <div className="text-center py-12">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Sevimli animalar yo'q</h3>
          <p className="text-muted-foreground mb-6">Siz hali hech qanday animeni sevimlilar ro'yxatiga qo'shmagansiz</p>
          <Button asChild>
            <Link href="/anime">Animalarni ko'rish</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

