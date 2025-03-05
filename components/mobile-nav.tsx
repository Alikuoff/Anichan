"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Home, Film, Trophy, Calendar, Heart, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menyuni ochish</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px] pt-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-xl">AnimeHub</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span className="text-lg">Bosh sahifa</span>
            </Link>

            <Link
              href="/anime"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              <Film className="h-5 w-5" />
              <span className="text-lg">Barcha anime</span>
            </Link>

            <Link
              href="/top"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              <Trophy className="h-5 w-5" />
              <span className="text-lg">Top anime</span>
            </Link>

            <Link
              href="/seasonal"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-lg">Mavsumiy anime</span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              <Heart className="h-5 w-5" />
              <span className="text-lg">Sevimlilar</span>
            </Link>

            <Link
              href="/add-anime"
              className="flex items-center gap-2 px-2 py-3 rounded-md hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              <PlusCircle className="h-5 w-5" />
              <span className="text-lg">Anime qo'shish</span>
            </Link>
          </nav>

          <div className="mt-auto pt-6 border-t">
            <div className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AnimeHub</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

