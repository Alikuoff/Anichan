import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimeGrid from "@/components/anime-grid"
import { getTopAnime } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default async function TopAnimePage({
  searchParams,
}: {
  searchParams: { filter?: string; page?: string }
}) {
  // Validate filter parameter
  const validFilters = ["airing", "upcoming", "bypopularity", "favorite"]
  const filter = validFilters.includes(searchParams.filter || "") ? searchParams.filter : "bypopularity"

  const page = Number.parseInt(searchParams.page || "1")

  // Fetch top anime
  const animeList = await getTopAnime(page, filter)

  return (
    <div className="container py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Top animalar</h1>

      <Tabs defaultValue={filter} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-4 text-xs sm:text-sm md:text-base">
          <TabsTrigger value="bypopularity" asChild>
            <Link href="/top?filter=bypopularity">Mashhurlik bo'yicha</Link>
          </TabsTrigger>
          <TabsTrigger value="favorite" asChild>
            <Link href="/top?filter=favorite">Sevimli</Link>
          </TabsTrigger>
          <TabsTrigger value="airing" asChild>
            <Link href="/top?filter=airing">Efirdagi</Link>
          </TabsTrigger>
          <TabsTrigger value="upcoming" asChild>
            <Link href="/top?filter=upcoming">Tez kunda</Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <Suspense
            fallback={
              <div className="animate-pulse grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-[400px]" />
                ))}
              </div>
            }
          >
            {animeList.length > 0 ? (
              <AnimeGrid animeList={animeList} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">Ma'lumot topilmadi</h3>
                <p className="text-muted-foreground mb-6">
                  Hozirda bu toifada anime mavjud emas yoki API bilan bog'lanishda xatolik yuz berdi
                </p>
                <Button asChild>
                  <Link href="/anime">Barcha animalar</Link>
                </Button>
              </div>
            )}
          </Suspense>

          {/* Pagination */}
          {animeList.length > 0 && (
            <div className="flex justify-center mt-8">
              {page > 1 && (
                <Button variant="outline" className="mr-2" asChild>
                  <Link href={`/top?filter=${filter}&page=${page - 1}`}>Oldingi</Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href={`/top?filter=${filter}&page=${page + 1}`}>Keyingi</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

