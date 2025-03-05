"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Clock, Heart, MessageSquare, Share2, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import type { Anime } from "@/lib/types"
import { getComments, isFavorite } from "@/lib/api"
import { addCommentAction, toggleFavoriteAction } from "@/lib/actions"

interface AnimeDetailsProps {
  anime: Anime
}

export default function AnimeDetails({ anime }: AnimeDetailsProps) {
  const [isFavoriteState, setIsFavoriteState] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if anime is in favorites
    const favoriteStatus = isFavorite(anime.id)
    if (favoriteStatus !== isFavoriteState) {
      setIsFavoriteState(favoriteStatus)
    }

    // Get comments from localStorage
    const storedComments = getComments(anime.id)
    if (JSON.stringify(storedComments) !== JSON.stringify(comments)) {
      setComments(storedComments)
    }

    setIsLoading(false)
  }, [anime.id, isFavoriteState, comments])

  const toggleFavoriteHandler = async () => {
    const result = await toggleFavoriteAction(anime.id)

    if (result.success) {
      setIsFavoriteState(result.isAdded)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) return

    const result = await addCommentAction(anime.id, comment)

    if (result.success) {
      // Add the new comment to the local state
      setComments([...comments, result.comment])
      setComment("")
    } else {
      alert("Izoh qo'shishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-muted rounded w-1/2"></div>
        <div className="h-6 bg-muted rounded w-1/3"></div>
        <div className="h-24 bg-muted rounded"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
      <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
        <div className="rounded-lg overflow-hidden border shadow-lg">
          <img
            src={anime.image || "/placeholder.svg?height=600&width=1200"}
            alt={anime.title}
            className="w-full aspect-[3/4] object-cover"
            loading="eager"
          />
        </div>

        <div className="mt-4 space-y-4">
          <Button className="w-full" size="sm" onClick={toggleFavoriteHandler}>
            <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" fill={isFavoriteState ? "currentColor" : "none"} />
            {isFavoriteState ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
          </Button>

          <Button variant="outline" className="w-full" size="sm">
            <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Ulashish
          </Button>
        </div>
      </div>

      <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{anime.title}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {anime.genres.map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs sm:text-sm">
              {genre}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs sm:text-sm">Yil</span>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground" />
              <span className="text-xs sm:text-sm">{anime.year || "Ma'lum emas"}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs sm:text-sm">Qismlar</span>
            <div className="flex items-center">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-muted-foreground" />
              <span className="text-xs sm:text-sm">{anime.episodes || "?"} qism</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs sm:text-sm">Status</span>
            <span className="text-xs sm:text-sm">
              {anime.status === "completed"
                ? "Tugallangan"
                : anime.status === "ongoing"
                  ? "Davom etmoqda"
                  : "Tez kunda"}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs sm:text-sm">Studio</span>
            <span className="text-xs sm:text-sm">{anime.studio || "Ma'lum emas"}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 mb-6">
          <div className="flex items-center">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mr-1" fill="currentColor" />
            <span className="font-bold text-sm sm:text-base">{anime.rating ? anime.rating.toFixed(1) : "N/A"}</span>
            <span className="text-muted-foreground ml-1 text-xs sm:text-sm">/10</span>
          </div>

          <div className="flex items-center">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground mr-1" />
            <span className="text-xs sm:text-sm">
              {anime.views ? (anime.views / 1000).toFixed(1) + "K" : "N/A"} ko'rishlar
            </span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm md:text-base">
            <TabsTrigger value="overview">Tavsif</TabsTrigger>
            <TabsTrigger value="characters">Qahramonlar</TabsTrigger>
            <TabsTrigger value="comments">Izohlar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Qisqacha mazmun</h3>
            <p className="text-muted-foreground whitespace-pre-line text-xs sm:text-sm md:text-base">
              {anime.synopsis || anime.description || "Tavsif mavjud emas."}
            </p>
          </TabsContent>

          <TabsContent value="characters" className="mt-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Asosiy qahramonlar</h3>
            {anime.characters && anime.characters.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {anime.characters.map((character) => (
                  <div key={character.name} className="flex flex-col items-center text-center">
                    <Avatar className="w-16 h-16 sm:w-24 sm:h-24 mb-2">
                      <AvatarImage src={character.image} alt={character.name} />
                      <AvatarFallback>{character.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium text-xs sm:text-sm">{character.name}</h4>
                    <p className="text-xs text-muted-foreground">{character.role}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-xs sm:text-sm">Qahramonlar haqida ma'lumot mavjud emas.</p>
            )}
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Izohlar</h3>

            <form onSubmit={handleCommentSubmit} className="mb-6">
              <Textarea
                placeholder="Izohingizni yozing..."
                className="mb-2 text-xs sm:text-sm"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button type="submit" size="sm" disabled={!comment.trim()}>
                <MessageSquare className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Izoh qoldirish
              </Button>
            </form>

            <Separator className="my-4" />

            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 sm:gap-4">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarImage src={comment.avatar} alt={comment.user} />
                      <AvatarFallback>{comment.user.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-xs sm:text-sm">{comment.user}</div>
                      <p className="text-muted-foreground text-xs sm:text-sm">{comment.text}</p>
                      {comment.date && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                          {new Date(comment.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4 text-xs sm:text-sm">
                Hozircha izohlar yo'q. Birinchi izohni qoldiring!
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

