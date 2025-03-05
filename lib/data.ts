import type { Anime, User } from "./types"

// Simulated database
const animeData: Anime[] = [
  {
    id: 1,
    title: "Demon Slayer: Kimetsu no Yaiba",
    description:
      "Tanjiro Kamado va uning singlisi Nezuko Kamado haqidagi hikoya. Ular demonlar tomonidan hujum qilingan oilasining o'limidan keyin hayotda qolganlar.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2019,
    episodes: 26,
    status: "completed",
    studio: "ufotable",
    genres: ["Action", "Fantasy", "Historical", "Supernatural"],
    rating: 4.9,
    views: 1250000,
    synopsis:
      "Tanjiro Kamado, oilasi demonlar tomonidan o'ldirilgandan so'ng, singlisi Nezuko demonlarga aylantirilganidan keyin, inson qilib qaytarish uchun yo'l izlaydi. Ular Demon Slayer Corps saflariga qo'shilib, demonlarga qarshi kurashadi va oilasini o'ldirgan demonni topishga harakat qiladi.",
    characters: [
      { name: "Tanjiro Kamado", role: "Bosh qahramon", image: "/placeholder.svg?height=150&width=150" },
      { name: "Nezuko Kamado", role: "Tanjironing singlisi", image: "/placeholder.svg?height=150&width=150" },
      { name: "Zenitsu Agatsuma", role: "Demon Slayer", image: "/placeholder.svg?height=150&width=150" },
      { name: "Inosuke Hashibira", role: "Demon Slayer", image: "/placeholder.svg?height=150&width=150" },
    ],
    comments: [
      {
        id: 1,
        user: "AnimeExpert",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Bu anime juda ajoyib! Animation sifati va syujet rivojlanishi zo'r.",
      },
      {
        id: 2,
        user: "OtakuFan",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Eng sevimli animalarimdan biri. Har bir qismini qayta-qayta ko'raman.",
      },
      {
        id: 3,
        user: "AnimeLover",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Soundtrack ham juda yaxshi. Openings va endings lar ajoyib!",
      },
    ],
  },
  {
    id: 2,
    title: "Attack on Titan",
    description:
      "Eren Yeager va uning do'stlari Mikasa Ackerman va Armin Arlert titanlar deb ataladigan ulkan insonsimon mavjudotlar tomonidan hujum qilingan dunyoda yashaydilar.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2013,
    episodes: 75,
    status: "completed",
    studio: "Wit Studio",
    genres: ["Action", "Drama", "Fantasy"],
    rating: 4.8,
    views: 1500000,
    synopsis:
      "Eren Yeager va uning do'stlari Mikasa Ackerman va Armin Arlert titanlar deb ataladigan ulkan insonsimon mavjudotlar tomonidan hujum qilingan dunyoda yashaydilar. Ular Titan hujumidan keyin omon qolganlar va insoniyatni qutqarish uchun kurashishga qaror qilishadi.",
    characters: [
      { name: "Eren Yeager", role: "Bosh qahramon", image: "/placeholder.svg?height=150&width=150" },
      { name: "Mikasa Ackerman", role: "Bosh qahramon", image: "/placeholder.svg?height=150&width=150" },
      { name: "Armin Arlert", role: "Bosh qahramon", image: "/placeholder.svg?height=150&width=150" },
      { name: "Levi Ackerman", role: "Scout Regiment Captain", image: "/placeholder.svg?height=150&width=150" },
    ],
    comments: [
      {
        id: 1,
        user: "TitanFan",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Bu anime mening eng sevimli animalarimdan biri. Syujet juda chuqur va qiziqarli.",
      },
      {
        id: 2,
        user: "AnimeWatcher",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Har bir mavsum yanada yaxshilanib boradi. Final mavsumi ajoyib bo'ldi!",
      },
    ],
  },
  {
    id: 3,
    title: "My Hero Academia",
    description:
      "Izuku Midoriya, superkuchlarsiz dunyoda tug'ilgan bola, o'zining eng sevimli qahramoni All Might kabi bo'lishni orzu qiladi.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2016,
    episodes: 113,
    status: "ongoing",
    studio: "Bones",
    genres: ["Action", "Comedy", "Superhero"],
    rating: 4.7,
    views: 1100000,
    synopsis:
      "Izuku Midoriya, superkuchlarsiz dunyoda tug'ilgan bola, o'zining eng sevimli qahramoni All Might kabi bo'lishni orzu qiladi. All Might uni o'zining vorisi sifatida tanlaydi va unga o'zining kuchini beradi. Izuku U.A. High School'ga o'qishga kiradi va professional qahramon bo'lish yo'lida harakat qiladi.",
    characters: [
      { name: "Izuku Midoriya", role: "Bosh qahramon", image: "/placeholder.svg?height=150&width=150" },
      { name: "All Might", role: "Mentor", image: "/placeholder.svg?height=150&width=150" },
      { name: "Katsuki Bakugo", role: "Raqib", image: "/placeholder.svg?height=150&width=150" },
      { name: "Ochaco Uraraka", role: "Do'st", image: "/placeholder.svg?height=150&width=150" },
    ],
    comments: [
      {
        id: 1,
        user: "HeroFan",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Izuku Midoriya eng yaxshi qahramon! Uning rivojlanishi juda yaxshi ko'rsatilgan.",
      },
      {
        id: 2,
        user: "PlusUltra",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "PLUS ULTRA! Bu anime menga juda ilhom beradi.",
      },
    ],
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    description:
      "Yuji Itadori, g'ayritabiiy kuchga ega bo'lgan o'quvchi, la'natlangan Ryomen Sukuna barmoqlarini yutgandan so'ng, jujutsu dunyosiga qo'shiladi.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2020,
    episodes: 24,
    status: "ongoing",
    studio: "MAPPA",
    genres: ["Action", "Supernatural"],
    rating: 4.8,
    views: 980000,
    synopsis:
      "Yuji Itadori, g'ayritabiiy kuchga ega bo'lgan o'quvchi, la'natlangan Ryomen Sukuna barmoqlarini yutgandan so'ng, jujutsu dunyosiga qo'shiladi. U Jujutsu Tech'ga o'qishga kiradi va boshqa jujutsu sorcererlar bilan birga la'natlangan ruhlarga qarshi kurashadi.",
    characters: [
      { name: "Yuji Itadori", role: "Bosh qahramon", image: "/placeholder.svg?height=150&width=150" },
      { name: "Megumi Fushiguro", role: "Jujutsu Sorcerer", image: "/placeholder.svg?height=150&width=150" },
      { name: "Nobara Kugisaki", role: "Jujutsu Sorcerer", image: "/placeholder.svg?height=150&width=150" },
      { name: "Satoru Gojo", role: "O'qituvchi", image: "/placeholder.svg?height=150&width=150" },
    ],
    comments: [
      {
        id: 1,
        user: "JujutsuFan",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Animation sifati juda yuqori! MAPPA studio ajoyib ish qilgan.",
      },
      {
        id: 2,
        user: "GojoStan",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Gojo eng zo'r character! Uning kuchlari va shaxsiyati juda qiziqarli.",
      },
    ],
  },
  {
    id: 5,
    title: "One Punch Man",
    description:
      "Saitama, bir zarbada har qanday dushmanni yengadigan superqahramon, kuchli raqib topish uchun kurashadi.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2015,
    episodes: 24,
    status: "ongoing",
    studio: "Madhouse",
    genres: ["Action", "Comedy", "Superhero"],
    rating: 4.8,
    views: 1300000,
    synopsis:
      "Saitama, bir zarbada har qanday dushmanni yengadigan superqahramon, kuchli raqib topish uchun kurashadi. U Hero Association'ga qo'shiladi va boshqa qahramonlar bilan birga turli xil dushmanlar va monsterlar bilan kurashadi.",
    characters: [
      { name: "Saitama", role: "Bosh qahramon", image: "/placeholder.svg?height=150&width=150" },
      { name: "Genos", role: "Shogird", image: "/placeholder.svg?height=150&width=150" },
      { name: "Tatsumaki", role: "S-Class Hero", image: "/placeholder.svg?height=150&width=150" },
      { name: "King", role: "S-Class Hero", image: "/placeholder.svg?height=150&width=150" },
    ],
    comments: [
      {
        id: 1,
        user: "OnePunchFan",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Bu anime juda kulgili! Saitama eng zo'r superqahramon.",
      },
      {
        id: 2,
        user: "HeroHunter",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Birinchi mavsum animation sifati juda yuqori edi. Ikkinchi mavsum ham yaxshi.",
      },
    ],
  },
  {
    id: 6,
    title: "Spy x Family",
    description:
      "Twilight, maxfiy agent, tinchlik missiyasi uchun soxta oila tuzishi kerak, ammo uning 'qizi' telepatiya kuchiga ega va 'xotini' yollanma qotil.",
    image: "/placeholder.svg?height=600&width=1200",
    coverImage: "/placeholder.svg?height=400&width=1200",
    year: 2022,
    episodes: 25,
    status: "ongoing",
    studio: "Wit Studio",
    genres: ["Action", "Comedy", "Spy"],
    rating: 4.9,
    views: 950000,
    synopsis:
      "Twilight, maxfiy agent, tinchlik missiyasi uchun soxta oila tuzishi kerak, ammo uning 'qizi' telepatiya kuchiga ega va 'xotini' yollanma qotil. Ular bir-birlarining haqiqiy shaxsiyatlarini bilmagan holda, oila sifatida yashashga harakat qilishadi.",
    characters: [
      { name: "Loid Forger", role: "Bosh qahramon", image: "/placeholder.svg?height=150&width=150" },
      { name: "Anya Forger", role: "Loidning 'qizi'", image: "/placeholder.svg?height=150&width=150" },
      { name: "Yor Forger", role: "Loidning 'xotini'", image: "/placeholder.svg?height=150&width=150" },
      { name: "Bond", role: "Oila iti", image: "/placeholder.svg?height=150&width=150" },
    ],
    comments: [
      {
        id: 1,
        user: "SpyFan",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Anya eng shirin anime character! Waku waku!",
      },
      {
        id: 2,
        user: "FamilyLover",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Bu anime juda qiziqarli va kulgili. Oila dinamikasi juda yaxshi ko'rsatilgan.",
      },
    ],
  },
]

const userData: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    favorites: [1, 3],
  },
]

// Current user simulation (in a real app, this would be handled by authentication)
const currentUser: User | null = userData[0]

// Data access functions
export function getAllAnime() {
  return animeData
}

export function getAnimeById(id: number) {
  return animeData.find((anime) => anime.id === id) || null
}

export function getFeaturedAnime() {
  return animeData.slice(0, 3)
}

export function getPopularAnime() {
  return [...animeData].sort((a, b) => b.views - a.views).slice(0, 6)
}

export function getNewestAnime() {
  return [...animeData].sort((a, b) => b.year - a.year).slice(0, 6)
}

export function searchAnime(query: string, filters: any = {}) {
  let results = [...animeData]

  // Search by title
  if (query) {
    const lowerQuery = query.toLowerCase()
    results = results.filter(
      (anime) => anime.title.toLowerCase().includes(lowerQuery) || anime.description.toLowerCase().includes(lowerQuery),
    )
  }

  // Filter by genres
  if (filters.genres && filters.genres.length > 0) {
    results = results.filter((anime) => filters.genres.every((genre: string) => anime.genres.includes(genre)))
  }

  // Filter by years
  if (filters.years && filters.years.length > 0) {
    results = results.filter((anime) => filters.years.includes(anime.year.toString()))
  }

  // Filter by status
  if (filters.status && filters.status !== "all") {
    results = results.filter((anime) => anime.status === filters.status)
  }

  // Sort results
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "newest":
        results.sort((a, b) => b.year - a.year)
        break
      case "oldest":
        results.sort((a, b) => a.year - b.year)
        break
      case "rating":
        results.sort((a, b) => b.rating - a.rating)
        break
      case "popularity":
        results.sort((a, b) => b.views - a.views)
        break
    }
  }

  return results
}

// User functions
export function getCurrentUser() {
  return currentUser
}

export function toggleFavorite(animeId: number) {
  if (!currentUser) return false

  const index = currentUser.favorites.indexOf(animeId)
  if (index > -1) {
    currentUser.favorites.splice(index, 1)
  } else {
    currentUser.favorites.push(animeId)
  }

  // Update user in database
  const userIndex = userData.findIndex((user) => user.id === currentUser!.id)
  if (userIndex > -1) {
    userData[userIndex] = currentUser
  }

  return index === -1 // Return true if added to favorites, false if removed
}

export function isFavorite(animeId: number) {
  return currentUser ? currentUser.favorites.includes(animeId) : false
}

// Add new anime
export function addAnime(anime: Omit<Anime, "id" | "views" | "rating">) {
  const newId = Math.max(...animeData.map((a) => a.id)) + 1

  const newAnime: Anime = {
    ...anime,
    id: newId,
    views: 0,
    rating: 0,
    comments: [],
  }

  animeData.push(newAnime)
  return newAnime
}

// Add comment
export function addComment(animeId: number, text: string) {
  if (!currentUser) return null

  const anime = getAnimeById(animeId)
  if (!anime) return null

  if (!anime.comments) {
    anime.comments = []
  }

  const newComment = {
    id: Math.max(...anime.comments.map((c) => c.id), 0) + 1,
    user: currentUser.name,
    avatar: currentUser.avatar || "/placeholder.svg?height=40&width=40",
    text,
    date: new Date().toISOString(),
  }

  anime.comments.push(newComment)

  // Update anime in database
  const animeIndex = animeData.findIndex((a) => a.id === animeId)
  if (animeIndex > -1) {
    animeData[animeIndex] = anime
  }

  return newComment
}

