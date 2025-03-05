"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchFormProps {
  defaultValue?: string
  placeholder?: string
  className?: string
}

export default function SearchForm({
  defaultValue = "",
  placeholder = "Qidirish...",
  className = "",
}: SearchFormProps) {
  const [query, setQuery] = useState(defaultValue)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (query.trim()) {
      startTransition(() => {
        router.push(`/anime?q=${encodeURIComponent(query.trim())}`)
      })
    } else {
      // Bo'sh qidiruv bo'lsa, barcha animalarni ko'rsatamiz
      startTransition(() => {
        router.push("/anime")
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative flex w-full ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg bg-background pl-8"
          aria-label="Anime qidirish"
        />
      </div>
      <Button type="submit" disabled={isPending} className="ml-2">
        {isPending ? "..." : "Qidirish"}
      </Button>
    </form>
  )
}

