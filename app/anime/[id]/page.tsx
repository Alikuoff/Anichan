import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getAnimeById, getAnimeCharacters } from "@/lib/api"
import AnimeDetails from "@/components/anime-details"
import MobileNav from "@/components/mobile-nav"

export default async function AnimePage({ params }: { params: { id: string } }) {
  const animeId = Number.parseInt(params.id)

  // Fetch anime data
  const anime = await getAnimeById(animeId)

  // Fetch characters
  const characters = await getAnimeCharacters(animeId)

  // If anime not found
  if (!anime) {
    return (
      <div className="container py-6 sm:py-10 text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Anime topilmadi</h1>
        <p className="text-muted-foreground mb-6 text-sm">So'ralgan anime mavjud emas yoki o'chirilgan</p>
        <Button asChild>
          <Link href="/anime">Barcha animalar</Link>
        </Button>
      </div>
    )
  }

  // Add characters to anime object
  const animeWithCharacters = {
    ...anime,
    characters,
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-14 sm:h-16 items-center space-x-2 sm:space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 md:gap-10 items-center">
            <MobileNav />
            <Link href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-lg sm:text-xl">AnimeHub</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href="/" className="flex items-center text-lg font-medium transition-colors hover:text-primary">
                Bosh sahifa
              </Link>
              <Link
                href="/anime"
                className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Barcha anime
              </Link>
              <Link
                href="/top"
                className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Top anime
              </Link>
              <Link
                href="/seasonal"
                className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Mavsumiy anime
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative h-[150px] xs:h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <img
          src={anime.coverImage || anime.image || "/placeholder.svg?height=400&width=1200"}
          alt={anime.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="container relative z-20 -mt-10 xs:-mt-16 sm:-mt-24 md:-mt-32 px-2 sm:px-4 md:px-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/anime">
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Orqaga
          </Link>
        </Button>

        <Suspense fallback={<AnimeDetailsSkeleton />}>
          <AnimeDetails anime={animeWithCharacters} />
        </Suspense>
      </div>
    </div>
  )
}

function AnimeDetailsSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
      <div className="w-full md:w-1/4 lg:w-1/5">
        <Skeleton className="aspect-[3/4] w-full rounded-lg" />
        <div className="mt-4 space-y-4">
          <Skeleton className="h-8 sm:h-10 w-full" />
          <Skeleton className="h-8 sm:h-10 w-full" />
        </div>
      </div>

      <div className="w-full md:w-3/4 lg:w-4/5">
        <Skeleton className="h-8 sm:h-10 w-3/4 mb-2" />
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 sm:h-6 w-16 sm:w-20" />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-12 sm:h-16" />
          ))}
        </div>

        <Skeleton className="h-6 sm:h-8 w-full mb-6" />

        <Skeleton className="h-[300px] sm:h-[400px] w-full" />
      </div>
    </div>
  )
}

