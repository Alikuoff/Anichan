"use server"

import { revalidatePath } from "next/cache"
import { addComment, toggleFavorite, addAnime } from "./api"

export async function toggleFavoriteAction(animeId: number) {
  const isAdded = toggleFavorite(animeId)

  revalidatePath(`/anime/${animeId}`)
  revalidatePath("/")
  revalidatePath("/favorites")

  return { success: true, isAdded }
}

export async function addCommentAction(animeId: number, text: string) {
  try {
    const newComment = addComment(animeId, text)

    revalidatePath(`/anime/${animeId}`)

    return { success: true, comment: newComment }
  } catch (error) {
    console.error("Error adding comment:", error)
    return { success: false, error: "Failed to add comment" }
  }
}

export async function addAnimeAction(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const year = Number.parseInt(formData.get("year") as string)
    const episodes = Number.parseInt(formData.get("episodes") as string)
    const status = formData.get("status") as "ongoing" | "completed" | "upcoming"
    const studio = formData.get("studio") as string
    const genres = (formData.get("genres") as string).split(",")
    const synopsis = formData.get("synopsis") as string
    const image = formData.get("image") as string
    const coverImage = formData.get("coverImage") as string

    const newAnime = {
      title,
      description,
      year,
      episodes,
      status,
      studio,
      genres,
      synopsis,
      image,
      coverImage,
    }

    const anime = addAnime(newAnime)
    revalidatePath("/anime")
    return { success: true, animeId: anime.id }
  } catch (error) {
    console.error("Error adding anime:", error)
    return { success: false, error: "Failed to add anime" }
  }
}

