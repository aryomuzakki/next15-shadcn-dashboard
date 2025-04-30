"use client"

import { useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { SearchBar } from "@/components/ui/search-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Post } from "@/lib/types"
import PostCard from "./post-card"
import { Pagination } from "../ui/pagination"

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get("search") || ""
  const page = Number(searchParams.get("page") || "1")
  const itemsPerPage = Number(searchParams.get("limit") || "9")

  const [filteredPosts, setFilteredPosts] = useState(posts)

  const paginatedPosts = filteredPosts.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="space-y-4">
      <SearchBar
        placeholder="Search posts by title or content..."
        data={posts}
        filterFunction={(post, searchTerm) =>
          post.title.toLowerCase().includes(searchTerm) || post.body.toLowerCase().includes(searchTerm)
        }
        onFilteredData={setFilteredPosts}
        value={searchQuery}
        onChange={(searchTerm) => {
          const params = new URLSearchParams(searchParams)
          if (searchTerm) {
            params.set("search", searchTerm)
          } else {
            params.delete("search")
          }
          router.push(`${pathname}?${params.toString()}`, { scroll: false })
        }}
      />

      {paginatedPosts.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <Pagination
            dataName="posts"
            totalItems={filteredPosts.length}
            itemsPerPage={itemsPerPage}
            currentPage={page}
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Posts Found</CardTitle>
            <CardDescription>No posts match your search criteria. Try a different search term.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => {
                setFilteredPosts(posts)
                router.push(pathname, { scroll: false })
              }}
            >
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
