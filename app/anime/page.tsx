import { Suspense } from "react"
import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AnimeGrid from "@/components/anime-grid"
import { searchAnime } from "@/lib/api"
import AnimeFilters from "@/components/anime-filters"
import { Skeleton } from "@/components/ui/skeleton"
import MobileNav from "@/components/mobile-nav"
import Link from "next/link"

export default async function AnimePage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string; genres?: string; years?: string; status?: string; sort?: string }
}) {
  const query = searchParams.q || ""
  const page = Number.parseInt(searchParams.page || "1")

  // Fetch anime based on search query
  const { data: animeList, pagination } = await searchAnime(query, page)

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
              <Link
                href="/"
                className="flex items-center text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Bosh sahifa
              </Link>
              <Link
                href="/anime"
                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
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

      <div className="container py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
          {query ? `"${query}" qidiruv natijalari` : "Barcha animalar"}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-56 lg:w-64">
            <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
              <AnimeFilters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <form action="/anime" method="GET" className="flex-1 flex">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    name="q"
                    placeholder="Anime qidirish..."
                    className="pl-8"
                    defaultValue={query}
                    aria-label="Anime qidirish"
                  />
                </div>
                <Button type="submit" className="ml-2">
                  Qidirish
                </Button>
              </form>

              {/* Mobile filter button */}
              <div className="md:hidden">
                <Button variant="outline" size="icon" asChild>
                  <a href="#filters-modal">
                    <Filter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="animate-pulse grid grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-[350px] sm:h-[400px] bg-muted rounded-lg"></div>
                  ))}
                </div>
              }
            >
              <AnimeGrid animeList={animeList} />
            </Suspense>

            {animeList.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Anime topilmadi</h3>
                <p className="text-muted-foreground">Boshqa qidiruv so'rovini kiriting</p>
                <Button variant="outline" className="mt-4" asChild>
                  <a href="/anime">Barcha animalarni ko'rish</a>
                </Button>
              </div>
            )}

            {/* Pagination */}
            {animeList.length > 0 && (
              <div className="flex justify-center mt-8">
                {page > 1 && (
                  <Button variant="outline" className="mr-2" asChild>
                    <Link href={`/anime?q=${encodeURIComponent(query)}&page=${page - 1}`}>Oldingi</Link>
                  </Button>
                )}
                {pagination.hasNextPage && (
                  <Button variant="outline" asChild>
                    <Link href={`/anime?q=${encodeURIComponent(query)}&page=${page + 1}`}>Keyingi</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile filters modal */}
        <div
          id="filters-modal"
          className="md:hidden fixed inset-0 bg-background/80 z-50 hidden target:flex items-center justify-center"
        >
          <div className="bg-background p-6 rounded-lg w-[90%] max-w-md max-h-[90vh] overflow-auto">
            <h3 className="text-xl font-bold mb-4">Filtrlar</h3>
            <AnimeFilters />
            <div className="mt-6 flex justify-end">
              <Button asChild>
                <a href="#" className="mt-4">
                  Yopish
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

