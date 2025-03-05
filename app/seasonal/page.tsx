import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AnimeGrid from "@/components/anime-grid"
import { getSeasonalAnime } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

export default async function SeasonalAnimePage({
  searchParams,
}: {
  searchParams: { season?: string; year?: string }
}) {
  // Validate season parameter
  const validSeasons = ["winter", "spring", "summer", "fall", "now"]
  const season = validSeasons.includes(searchParams.season || "") ? searchParams.season : "now"

  const year = searchParams.year ? Number.parseInt(searchParams.year) : undefined

  // Fetch seasonal anime
  const animeList = await getSeasonalAnime(year, season)

  const currentYear = new Date().getFullYear()

  return (
    <div className="container py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Mavsumiy animalar</h1>

      <Tabs defaultValue={season} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-5 text-xs sm:text-sm md:text-base">
          <TabsTrigger value="now" asChild>
            <Link href="/seasonal?season=now">Joriy mavsum</Link>
          </TabsTrigger>
          <TabsTrigger value="winter" asChild>
            <Link href="/seasonal?season=winter">Qish</Link>
          </TabsTrigger>
          <TabsTrigger value="spring" asChild>
            <Link href="/seasonal?season=spring">Bahor</Link>
          </TabsTrigger>
          <TabsTrigger value="summer" asChild>
            <Link href="/seasonal?season=summer">Yoz</Link>
          </TabsTrigger>
          <TabsTrigger value="fall" asChild>
            <Link href="/seasonal?season=fall">Kuz</Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={season} className="mt-6">
          <div className="flex justify-end mb-4">
            <select
              className="px-3 py-2 border rounded-md"
              onChange={(e) => {
                window.location.href = `/seasonal?season=${season}&year=${e.target.value}`
              }}
              defaultValue={year || currentYear}
            >
              {Array.from({ length: 10 }, (_, i) => currentYear - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

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
                  Tanlangan mavsum uchun anime mavjud emas yoki API bilan bog'lanishda xatolik yuz berdi
                </p>
                <Button asChild>
                  <Link href="/seasonal">Joriy mavsum</Link>
                </Button>
              </div>
            )}
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

