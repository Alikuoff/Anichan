"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { addAnimeAction } from "@/lib/actions"

export default function AddAnimePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [year, setYear] = useState("")
  const [episodes, setEpisodes] = useState("")
  const [status, setStatus] = useState<"ongoing" | "completed" | "upcoming">("ongoing")
  const [studio, setStudio] = useState("")
  const [synopsis, setSynopsis] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [genres, setGenres] = useState<string[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const availableGenres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: "poster" | "cover") => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === "poster") {
          setImagePreview(reader.result as string)
        } else {
          setCoverImagePreview(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const addGenre = () => {
    if (selectedGenre && !genres.includes(selectedGenre)) {
      setGenres([...genres, selectedGenre])
      setSelectedGenre("")
    }
  }

  const removeGenre = (genre: string) => {
    setGenres(genres.filter((g) => g !== genre))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !description || !year || !episodes || !status || !studio || genres.length === 0) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring")
      return
    }

    setIsSubmitting(true)

    // Create FormData for submission
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("year", year)
    formData.append("episodes", episodes)
    formData.append("status", status)
    formData.append("studio", studio)
    formData.append("genres", genres.join(","))
    formData.append("synopsis", synopsis)

    // In a real app, we would upload the images to a storage service
    // For now, we'll just use the placeholder or the data URL
    formData.append("image", imagePreview || "/placeholder.svg?height=600&width=1200")
    formData.append("coverImage", coverImagePreview || "/placeholder.svg?height=400&width=1200")

    try {
      const result = await addAnimeAction(formData)

      if (result.success) {
        alert("Anime muvaffaqiyatli qo'shildi!")
        router.push(`/anime/${result.animeId}`)
      } else {
        alert("Anime qo'shishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      }
    } catch (error) {
      console.error("Error adding anime:", error)
      alert("Anime qo'shishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 30 }, (_, i) => currentYear - i)

  return (
    <div className="container py-4 sm:py-6 md:py-10 px-2 sm:px-4 md:px-6">
      <Card className="max-w-full sm:max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Yangi anime qo'shish</CardTitle>
          <CardDescription>Yangi anime ma'lumotlarini to'ldiring va saytga qo'shing</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Anime nomi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Anime nomini kiriting"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Qisqacha tavsif <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Anime haqida qisqacha ma'lumot kiriting"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="synopsis">To'liq mazmun</Label>
              <Textarea
                id="synopsis"
                placeholder="Anime haqida to'liq ma'lumot kiriting"
                rows={4}
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="year">
                  Chiqarilgan yil <span className="text-red-500">*</span>
                </Label>
                <Select value={year} onValueChange={setYear} required>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Yilni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="episodes">
                  Qismlar soni <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="episodes"
                  type="number"
                  placeholder="Qismlar sonini kiriting"
                  min="1"
                  value={episodes}
                  onChange={(e) => setEpisodes(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={status}
                  onValueChange={(value: "ongoing" | "completed" | "upcoming") => setStatus(value)}
                  required
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Statusni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ongoing">Davom etmoqda</SelectItem>
                    <SelectItem value="completed">Tugallangan</SelectItem>
                    <SelectItem value="upcoming">Tez kunda</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studio">
                  Studio <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="studio"
                  placeholder="Studio nomini kiriting"
                  value={studio}
                  onChange={(e) => setStudio(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>
                Janrlar <span className="text-red-500">*</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge key={genre} className="flex items-center gap-1">
                    {genre}
                    <button
                      type="button"
                      onClick={() => removeGenre(genre)}
                      className="ml-1 rounded-full hover:bg-primary/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger id="genre" className="flex-1">
                    <SelectValue placeholder="Janr tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableGenres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addGenre} disabled={!selectedGenre}>
                  Qo'shish
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="poster-image">
                Poster rasmi <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="poster-image"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Rasmni yuklash uchun bosing</span> yoki shu yerga tashlang
                        </p>
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG yoki GIF (MAX. 2MB)</p>
                      </div>
                      <Input
                        id="poster-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, "poster")}
                      />
                    </label>
                  </div>
                </div>
                {imagePreview && (
                  <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setImagePreview(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="cover-image">Muqova rasmi</Label>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="cover-image"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/40 hover:bg-muted/60"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Muqova rasmini yuklash (ixtiyoriy)</p>
                      </div>
                      <Input
                        id="cover-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, "cover")}
                      />
                    </label>
                  </div>
                </div>
                {coverImagePreview && (
                  <div className="relative h-32 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={coverImagePreview || "/placeholder.svg"}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setCoverImagePreview(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/")} disabled={isSubmitting}>
              Bekor qilish
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

