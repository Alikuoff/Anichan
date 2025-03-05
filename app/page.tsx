import { Input } from "@/components/ui/input"
import Link from "next/link"
import AnimeGrid from "@/components/anime-grid"
import FeaturedAnime from "@/components/featured-anime"
import MobileNav from "@/components/mobile-nav"
import SearchForm from "@/components/search-form"
import { Button } from "@/components/ui/button"
import { getSeasonalAnime, getTopAnime } from "@/lib/api"

export default async function Home() {
  // Fetch data from API with error handling
  let featuredAnime = []
  let popularAnime = []
  let newestAnime = []

  try {
    // Use Promise.allSettled to handle potential failures in any of the requests
    const results = await Promise.allSettled([
      getTopAnime(1, "bypopularity").then((data) => data.slice(0, 3)),
      getTopAnime(1, "bypopularity").then((data) => data.slice(0, 6)),
      getSeasonalAnime().then((data) => data.slice(0, 6)),
    ])

    // Extract data from successful promises
    if (results[0].status === "fulfilled") featuredAnime = results[0].value
    if (results[1].status === "fulfilled") popularAnime = results[1].value
    if (results[2].status === "fulfilled") newestAnime = results[2].value
  } catch (error) {
    console.error("Error fetching data for homepage:", error)
    // Fallback data is handled in the API functions
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
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <SearchForm placeholder="Qidirish..." className="md:w-[200px] lg:w-[300px]" />
            </div>
            <nav className="hidden sm:flex items-center space-x-2">
              <Button size="sm" className="text-xs sm:text-sm md:text-base" asChild>
                <Link href="/add-anime">Anime qo'shish</Link>
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm md:text-base" asChild>
                <Link href="/favorites">Sevimlilar</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="container py-4 sm:py-6 px-2 sm:px-4 md:px-6">
        <section className="mb-8 sm:mb-12">
          <FeaturedAnime featuredAnime={featuredAnime} />
        </section>
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Eng yangi animalar</h2>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm" asChild>
              <Link href="/seasonal">Barchasini ko'rish</Link>
            </Button>
          </div>
          <AnimeGrid animeList={newestAnime} />
        </section>
        <section className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Mashhur animalar</h2>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm" asChild>
              <Link href="/top">Barchasini ko'rish</Link>
            </Button>
          </div>
          <AnimeGrid animeList={popularAnime} />
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-6 sm:py-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-medium">AnimeHub</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Eng yangi va sifatli animalarni tomosha qilish uchun mukammal platforma.
              </p>
            </div>
            <div>
              <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-medium">Havolalar</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground">
                    Bosh sahifa
                  </Link>
                </li>
                <li>
                  <Link href="/anime" className="text-muted-foreground hover:text-foreground">
                    Barcha anime
                  </Link>
                </li>
                <li>
                  <Link href="/top" className="text-muted-foreground hover:text-foreground">
                    Top anime
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-medium">Yordam</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    Ko'p so'raladigan savollar
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Bog'lanish
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Foydalanish shartlari
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-medium">Obuna bo'ling</h3>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                Eng so'nggi yangiliklar va yangilanishlardan xabardor bo'lish uchun obuna bo'ling.
              </p>
              <div className="flex space-x-2">
                <Input placeholder="Email" className="max-w-[180px] h-8 sm:h-10 text-xs sm:text-sm" />
                <Button size="sm" className="h-8 sm:h-10 text-xs sm:text-sm">
                  Obuna
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 border-t pt-4 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AnimeHub. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
    </div>
  )
}

