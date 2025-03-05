"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react"

export default function AnimeFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popularity")

  // Initialize from URL params
  useEffect(() => {
    const genresParam = searchParams.get("genres")
    const yearsParam = searchParams.get("years")
    const statusParam = searchParams.get("status")
    const sortParam = searchParams.get("sort")

    const newGenres = genresParam ? genresParam.split(",") : []
    const newYears = yearsParam ? yearsParam.split(",") : []
    const newStatus = statusParam || "all"
    const newSort = sortParam || "popularity"

    // Only update state if values have changed
    if (JSON.stringify(newGenres) !== JSON.stringify(selectedGenres)) {
      setSelectedGenres(newGenres)
    }

    if (JSON.stringify(newYears) !== JSON.stringify(selectedYears)) {
      setSelectedYears(newYears)
    }

    if (newStatus !== selectedStatus) {
      setSelectedStatus(newStatus)
    }

    if (newSort !== sortBy) {
      setSortBy(newSort)
    }
  }, [searchParams, selectedGenres, selectedYears, selectedStatus, sortBy])

  const genres = [
    { id: "1", name: "Action" },
    { id: "2", name: "Adventure" },
    { id: "4", name: "Comedy" },
    { id: "8", name: "Drama" },
    { id: "10", name: "Fantasy" },
    { id: "14", name: "Horror" },
    { id: "7", name: "Mystery" },
    { id: "22", name: "Romance" },
    { id: "24", name: "Sci-Fi" },
    { id: "36", name: "Slice of Life" },
    { id: "30", name: "Sports" },
    { id: "37", name: "Supernatural" },
  ]

  const years = ["2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"]

  const toggleGenre = (genreId: string): void => {
    setSelectedGenres((prev: string[]) => (prev.includes(genreId) ? prev.filter((g: string) => g !== genreId) : [...prev, genreId]))
  }

  const toggleYear = (year: string): void => {
    setSelectedYears((prev: string[]) => (prev.includes(year) ? prev.filter((y: string) => y !== year) : [...prev, year]))
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Update params
    if (selectedGenres.length > 0) {
      params.set("genres", selectedGenres.join(","))
    } else {
      params.delete("genres")
    }

    if (selectedYears.length > 0) {
      params.set("years", selectedYears.join(","))
    } else {
      params.delete("years")
    }

    if (selectedStatus !== "all") {
      params.set("status", selectedStatus)
    } else {
      params.delete("status")
    }

    params.set("sort", sortBy)

    // Reset to page 1 when filters change
    params.set("page", "1")

    router.push(`/anime?${params.toString()}`)
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSelectedYears([])
    setSelectedStatus("all")
    setSortBy("popularity")

    const params = new URLSearchParams(searchParams.toString())
    params.delete("genres")
    params.delete("years")
    params.delete("status")
    params.delete("sort")

    router.push(`/anime?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Saralash</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Saralash" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Mashhurlik bo'yicha</SelectItem>
            <SelectItem value="rating">Reyting bo'yicha</SelectItem>
            <SelectItem value="newest">Eng yangi</SelectItem>
            <SelectItem value="oldest">Eng eski</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Janrlar</h3>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
          {genres.map((genre) => (
            <div key={genre.id} className="flex items-center space-x-2">
              <Checkbox
                id={`genre-${genre.id}`}
                checked={selectedGenres.includes(genre.id)}
                onCheckedChange={() => toggleGenre(genre.id)}
              />
              <Label htmlFor={`genre-${genre.id}`}>{genre.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Yillar</h3>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
          {years.map((year) => (
            <div key={year} className="flex items-center space-x-2">
              <Checkbox
                id={`year-${year}`}
                checked={selectedYears.includes(year)}
                onCheckedChange={() => toggleYear(year)}
              />
              <Label htmlFor={`year-${year}`}>{year}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Status</h3>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Statusni tanlang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Barchasi</SelectItem>
            <SelectItem value="ongoing">Davom etmoqda</SelectItem>
            <SelectItem value="completed">Tugallangan</SelectItem>
            <SelectItem value="upcoming">Tez kunda</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={applyFilters}>Filtrlash</Button>
        <Button variant="outline" onClick={clearFilters}>
          Filtrlarni tozalash
        </Button>
      </div>
    </div>
  )
}

