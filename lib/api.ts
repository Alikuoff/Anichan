import type { Anime, Character, Comment } from "./types"

// Jikan API endpoints
const JIKAN_API_BASE = "https://api.jikan.moe/v4"

// Fallback data for when API is unavailable
const FALLBACK_TOP_ANIME: Anime[] = [
  {
    id: 5114,
    title: "Fullmetal Alchemist: Brotherhood",
    description:
      "After a horrific alchemy experiment goes wrong, brothers Edward and Alphonse Elric search for the Philosopher's Stone to restore their bodies.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2009,
    episodes: 64,
    status: "completed",
    studio: "Bones",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    rating: 9.1,
    views: 1500000,
    synopsis:
      "After a horrific alchemy experiment goes wrong, brothers Edward and Alphonse Elric search for the Philosopher's Stone to restore their bodies.",
  },
  {
    id: 41467,
    title: "Bleach: Thousand-Year Blood War",
    description:
      "The peace is suddenly broken when warning sirens blare through the Soul Society. Residents are disappearing without a trace and nobody knows who's behind it.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2022,
    episodes: 13,
    status: "completed",
    studio: "Pierrot",
    genres: ["Action", "Adventure", "Fantasy"],
    rating: 9.0,
    views: 1200000,
    synopsis:
      "The peace is suddenly broken when warning sirens blare through the Soul Society. Residents are disappearing without a trace and nobody knows who's behind it.",
  },
  {
    id: 38524,
    title: "Shingeki no Kyojin: The Final Season",
    description: "The final season of Shingeki no Kyojin.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2020,
    episodes: 16,
    status: "completed",
    studio: "MAPPA",
    genres: ["Action", "Drama", "Fantasy", "Mystery"],
    rating: 8.9,
    views: 1300000,
    synopsis: "The final season of Shingeki no Kyojin.",
  },
  {
    id: 9253,
    title: "Steins;Gate",
    description: "A self-proclaimed mad scientist discovers time travel and must use it to prevent a terrible future.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2011,
    episodes: 24,
    status: "completed",
    studio: "White Fox",
    genres: ["Drama", "Sci-Fi", "Thriller"],
    rating: 9.0,
    views: 1100000,
    synopsis: "A self-proclaimed mad scientist discovers time travel and must use it to prevent a terrible future.",
  },
  {
    id: 28977,
    title: "Gintama°",
    description: "The continuation of the Gintama series.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2015,
    episodes: 51,
    status: "completed",
    studio: "Bandai Namco Pictures",
    genres: ["Action", "Comedy", "Sci-Fi"],
    rating: 9.0,
    views: 900000,
    synopsis: "The continuation of the Gintama series.",
  },
  {
    id: 1535,
    title: "Death Note",
    description:
      "A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim's name.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2006,
    episodes: 37,
    status: "completed",
    studio: "Madhouse",
    genres: ["Mystery", "Psychological", "Supernatural", "Thriller"],
    rating: 8.6,
    views: 1800000,
    synopsis:
      "A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim's name.",
  },
]

const FALLBACK_SEASONAL_ANIME: Anime[] = [
  {
    id: 52991,
    title: "Blue Lock 2nd Season",
    description: "Second season of Blue Lock.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2024,
    episodes: 12,
    status: "ongoing",
    studio: "8bit",
    genres: ["Sports"],
    rating: 8.2,
    views: 800000,
    synopsis: "Second season of Blue Lock.",
  },
  {
    id: 53887,
    title: "Mushoku Tensei II: Isekai Ittara Honki Dasu Part 2",
    description: "Second part of the second season of Mushoku Tensei: Jobless Reincarnation.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2024,
    episodes: 12,
    status: "ongoing",
    studio: "Studio Bind",
    genres: ["Drama", "Fantasy", "Ecchi"],
    rating: 8.7,
    views: 900000,
    synopsis: "Second part of the second season of Mushoku Tensei: Jobless Reincarnation.",
  },
  {
    id: 55644,
    title: "Kamonohashi Ron no Kindan Suiri",
    description:
      "Ron Kamonohashi, a former detective genius who now lives in seclusion, teams up with Totomaru Isshiki, a police detective, to solve various challenging cases.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2024,
    episodes: 12,
    status: "ongoing",
    studio: "Diomedéa",
    genres: ["Mystery"],
    rating: 7.5,
    views: 500000,
    synopsis:
      "Ron Kamonohashi, a former detective genius who now lives in seclusion, teams up with Totomaru Isshiki, a police detective, to solve various challenging cases.",
  },
  {
    id: 54595,
    title: "Sousou no Frieren",
    description:
      "The adventure is over but life goes on for an elf mage just beginning to learn what living is all about.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2023,
    episodes: 28,
    status: "ongoing",
    studio: "Madhouse",
    genres: ["Adventure", "Drama", "Fantasy"],
    rating: 9.0,
    views: 1100000,
    synopsis:
      "The adventure is over but life goes on for an elf mage just beginning to learn what living is all about.",
  },
  {
    id: 54595,
    title: "Demon Slayer: Hashira Training Arc",
    description: "The Hashira Training Arc of Demon Slayer.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2024,
    episodes: 8,
    status: "ongoing",
    studio: "ufotable",
    genres: ["Action", "Fantasy", "Historical", "Supernatural"],
    rating: 8.8,
    views: 1300000,
    synopsis: "The Hashira Training Arc of Demon Slayer.",
  },
  {
    id: 55642,
    title: "Wind Breaker",
    description: "Haruka Sakura, a transfer student who fights to protect the town of Furin.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2024,
    episodes: 12,
    status: "ongoing",
    studio: "CloverWorks",
    genres: ["Action", "Drama"],
    rating: 7.9,
    views: 700000,
    synopsis: "Haruka Sakura, a transfer student who fights to protect the town of Furin.",
  },
]

// Rate limiting helper with improved implementation
const apiQueue: (() => Promise<any>)[] = []
let isProcessingQueue = false
let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 1000 // 1 second between requests
const MAX_RETRIES = 3

async function processQueue() {
  if (isProcessingQueue || apiQueue.length === 0) return

  isProcessingQueue = true

  try {
    // Ensure we're respecting rate limits
    const now = Date.now()
    const timeToWait = Math.max(0, MIN_REQUEST_INTERVAL - (now - lastRequestTime))

    if (timeToWait > 0) {
      await new Promise((resolve) => setTimeout(resolve, timeToWait))
    }

    const nextRequest = apiQueue.shift()
    if (nextRequest) {
      lastRequestTime = Date.now()
      await nextRequest()
    }
  } catch (error) {
    console.error("Error in queue processing:", error)
  } finally {
    isProcessingQueue = false

    // Continue processing the queue
    if (apiQueue.length > 0) {
      setTimeout(() => {
        processQueue()
      }, MIN_REQUEST_INTERVAL)
    }
  }
}

async function queueApiRequest<T>(requestFn: () => Promise<T>, retries = 0): Promise<T> {
  return new Promise((resolve, reject) => {
    apiQueue.push(async () => {
      try {
        const result = await requestFn()
        resolve(result)
      } catch (error) {
        console.error(`API request failed (attempt ${retries + 1}/${MAX_RETRIES + 1}):`, error)

        // Retry logic
        if (retries < MAX_RETRIES) {
          console.log(`Retrying request (${retries + 1}/${MAX_RETRIES})...`)
          try {
            const result = await queueApiRequest(requestFn, retries + 1)
            resolve(result)
          } catch (retryError) {
            reject(retryError)
          }
        } else {
          reject(error)
        }
      }
    })

    processQueue()
  })
}

// Helper function to safely fetch with timeout
async function safeFetch(url: string, options?: RequestInit, timeout = 10000): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

// Convert Jikan API anime to our Anime type
function convertJikanAnime(jikanAnime: any): Anime {
  return {
    id: jikanAnime.mal_id,
    title: jikanAnime.title,
    description: jikanAnime.synopsis || "",
    image:
      jikanAnime.images?.jpg?.large_image_url ||
      jikanAnime.images?.jpg?.image_url ||
      "/placeholder.svg?height=600&width=1200",
    coverImage:
      jikanAnime.images?.jpg?.large_image_url ||
      jikanAnime.images?.jpg?.image_url ||
      "/placeholder.svg?height=400&width=1200",
    year: jikanAnime.year || new Date(jikanAnime.aired?.from || Date.now()).getFullYear(),
    episodes: jikanAnime.episodes || 0,
    status:
      jikanAnime.status === "Completed"
        ? "completed"
        : jikanAnime.status === "Currently Airing"
          ? "ongoing"
          : "upcoming",
    studio: jikanAnime.studios?.[0]?.name || "Unknown",
    genres: jikanAnime.genres?.map((g: any) => g.name) || [],
    rating: jikanAnime.score || 0,
    views: jikanAnime.members || 0,
    synopsis: jikanAnime.synopsis || "",
    comments: [],
  }
}

// API functions
export async function searchAnime(
  query: string,
  page = 1,
): Promise<{ data: Anime[]; pagination: { hasNextPage: boolean } }> {
  try {
    return await queueApiRequest(async () => {
      // Agar query bo'sh bo'lsa, top anime qaytaramiz
      if (!query || query.trim() === "") {
        const topAnime = await getTopAnime(page, "bypopularity")
        return {
          data: topAnime,
          pagination: {
            hasNextPage: true, // Har doim keyingi sahifa mavjud deb hisoblaymiz
          },
        }
      }

      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: "24",
        sfw: "true",
      })

      const response = await safeFetch(`${JIKAN_API_BASE}/anime?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      return {
        data: data.data.map(convertJikanAnime),
        pagination: {
          hasNextPage: data.pagination.has_next_page,
        },
      }
    })
  } catch (error) {
    console.error("Error searching anime:", error)
    // Xatolik yuz berganda bo'sh natija qaytaramiz
    return {
      data: [],
      pagination: {
        hasNextPage: false,
      },
    }
  }
}

// Rename the original getAnimeById function to fetchAnimeById
export async function fetchAnimeById(id: number): Promise<Anime | null> {
  try {
    return await queueApiRequest(async () => {
      try {
        const response = await safeFetch(`${JIKAN_API_BASE}/anime/${id}/full`)

        if (!response.ok) {
          if (response.status === 404) {
            return null
          }
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        return convertJikanAnime(data.data)
      } catch (error) {
        console.error("Error fetching anime by ID:", error)
        return null
      }
    })
  } catch (error) {
    console.error("Failed to fetch anime by ID after retries:", error)
    return null
  }
}

// Replace the duplicate getAnimeById function with a combined version
export async function getAnimeById(id: number): Promise<Anime | null> {
  // If ID is negative, it's a user-added anime
  if (id < 0 && typeof window !== "undefined") {
    const existingAnimeJSON = localStorage.getItem(USER_ANIME_KEY)
    const existingAnime: Anime[] = existingAnimeJSON ? JSON.parse(existingAnimeJSON) : []
    const userAnime = existingAnime.find((anime) => anime.id === id)
    return userAnime || null
  }

  // Otherwise, fetch from API
  return fetchAnimeById(id)
}

export async function getAnimeCharacters(animeId: number): Promise<Character[]> {
  try {
    return await queueApiRequest(async () => {
      try {
        // Don't try to fetch characters for user-added anime (negative IDs)
        if (animeId < 0) return []

        const response = await safeFetch(`${JIKAN_API_BASE}/anime/${animeId}/characters`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()

        return data.data.slice(0, 8).map((char: any) => ({
          name: char.character.name,
          role: char.role,
          image: char.character.images?.jpg?.image_url || "/placeholder.svg?height=150&width=150",
        }))
      } catch (error) {
        console.error("Error fetching anime characters:", error)
        return []
      }
    })
  } catch (error) {
    console.error("Failed to fetch anime characters after retries:", error)
    return []
  }
}

// Updated getTopAnime function with fallback data
export async function getTopAnime(page = 1, filter = "bypopularity"): Promise<Anime[]> {
  try {
    return await queueApiRequest(async () => {
      try {
        // Validate filter parameter - only use valid values
        const validFilters = ["airing", "upcoming", "bypopularity", "favorite"]
        const safeFilter = validFilters.includes(filter) ? filter : "bypopularity"

        const response = await safeFetch(`${JIKAN_API_BASE}/top/anime?page=${page}&filter=${safeFilter}&limit=24`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        return data.data.map(convertJikanAnime)
      } catch (error) {
        console.error("Error fetching top anime:", error)
        // Return fallback data instead of empty array
        return FALLBACK_TOP_ANIME
      }
    })
  } catch (error) {
    console.error("Failed to fetch top anime after retries:", error)
    // Return fallback data if all retries fail
    return FALLBACK_TOP_ANIME
  }
}

export async function getSeasonalAnime(year?: number, season = "now"): Promise<Anime[]> {
  try {
    return await queueApiRequest(async () => {
      try {
        // Validate season parameter
        const validSeasons = ["winter", "spring", "summer", "fall", "now"]
        const safeSeason = validSeasons.includes(season) ? season : "now"

        const seasonParam = year ? `${year}/${safeSeason}` : safeSeason
        const response = await safeFetch(`${JIKAN_API_BASE}/seasons/${seasonParam}?limit=24`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        return data.data.map(convertJikanAnime)
      } catch (error) {
        console.error("Error fetching seasonal anime:", error)
        // Return fallback data instead of empty array
        return FALLBACK_SEASONAL_ANIME
      }
    })
  } catch (error) {
    console.error("Failed to fetch seasonal anime after retries:", error)
    // Return fallback data if all retries fail
    return FALLBACK_SEASONAL_ANIME
  }
}

export async function getAnimeByGenre(
  genreId: number,
  page = 1,
): Promise<{ data: Anime[]; pagination: { hasNextPage: boolean } }> {
  try {
    return await queueApiRequest(async () => {
      try {
        const params = new URLSearchParams({
          genres: genreId.toString(),
          page: page.toString(),
          limit: "24",
          sfw: "true",
        })

        const response = await safeFetch(`${JIKAN_API_BASE}/anime?${params.toString()}`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()

        return {
          data: data.data.map(convertJikanAnime),
          pagination: {
            hasNextPage: data.pagination.has_next_page,
          },
        }
      } catch (error) {
        console.error("Error fetching anime by genre:", error)
        return {
          data: [],
          pagination: {
            hasNextPage: false,
          },
        }
      }
    })
  } catch (error) {
    console.error("Failed to fetch anime by genre after retries:", error)
    return {
      data: [],
      pagination: {
        hasNextPage: false,
      },
    }
  }
}

// Local storage for user data
const FAVORITES_KEY = "anime_favorites"
const COMMENTS_KEY = "anime_comments"

// User functions
export function getFavorites(): number[] {
  if (typeof window === "undefined") return []

  const favorites = localStorage.getItem(FAVORITES_KEY)
  return favorites ? JSON.parse(favorites) : []
}

export function toggleFavorite(animeId: number): boolean {
  if (typeof window === "undefined") return false

  const favorites = getFavorites()
  const index = favorites.indexOf(animeId)

  if (index > -1) {
    favorites.splice(index, 1)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    return false
  } else {
    favorites.push(animeId)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    return true
  }
}

export function isFavorite(animeId: number): boolean {
  if (typeof window === "undefined") return false

  try {
    const favorites = getFavorites()
    return favorites.includes(animeId)
  } catch (error) {
    console.error("Error checking favorite status:", error)
    return false
  }
}

// Comments functions
interface StoredComments {
  [animeId: number]: Comment[]
}

export function getComments(animeId: number): Comment[] {
  if (typeof window === "undefined") return []

  const allComments = localStorage.getItem(COMMENTS_KEY)
  const commentsObj: StoredComments = allComments ? JSON.parse(allComments) : {}

  return commentsObj[animeId] || []
}

export function addComment(animeId: number, text: string): Comment {
  if (typeof window === "undefined") throw new Error("Cannot add comment on server")

  const allComments = localStorage.getItem(COMMENTS_KEY)
  const commentsObj: StoredComments = allComments ? JSON.parse(allComments) : {}

  if (!commentsObj[animeId]) {
    commentsObj[animeId] = []
  }

  const newComment: Comment = {
    id: Date.now(),
    user: "Demo User",
    avatar: "/placeholder.svg?height=40&width=40",
    text,
    date: new Date().toISOString(),
  }

  commentsObj[animeId].push(newComment)
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(commentsObj))

  return newComment
}

// Local storage for user-added anime
const USER_ANIME_KEY = "user_added_anime"

// Function to add a new anime
export function addAnime(animeData: Omit<Anime, "id" | "views" | "rating" | "comments">): Anime {
  if (typeof window === "undefined") throw new Error("Cannot add anime on server")

  // Get existing user-added anime
  const existingAnimeJSON = localStorage.getItem(USER_ANIME_KEY)
  const existingAnime: Anime[] = existingAnimeJSON ? JSON.parse(existingAnimeJSON) : []

  // Generate a unique ID (negative to avoid conflicts with API IDs)
  const newId = existingAnime.length > 0 ? Math.min(...existingAnime.map((a) => a.id)) - 1 : -1

  // Create new anime object
  const newAnime: Anime = {
    ...animeData,
    id: newId,
    views: 0,
    rating: 0,
    comments: [],
  }

  // Add to local storage
  existingAnime.push(newAnime)
  localStorage.setItem(USER_ANIME_KEY, JSON.stringify(existingAnime))

  return newAnime
}

