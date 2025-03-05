export interface Anime {
  id: number
  title: string
  description: string
  image: string
  coverImage?: string
  year: number
  episodes: number
  status: "ongoing" | "completed" | "upcoming"
  studio: string
  genres: string[]
  rating: number
  views: number
  synopsis?: string
  characters?: Character[]
  comments?: Comment[]
}

export interface Character {
  name: string
  role: string
  image: string
}

export interface Comment {
  id: number
  user: string
  avatar: string
  text: string
  date?: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  favorites: number[]
}

