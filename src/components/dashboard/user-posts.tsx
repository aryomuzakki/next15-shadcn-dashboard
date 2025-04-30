"use client"

import type { Post } from "@/lib/types"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PostCard from "./post-card"
import { useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { SearchBar } from "@/components/ui/search-bar"
import { Pagination } from "../ui/pagination"

interface UserPostsProps {
  posts: Post[]
}

export function UserPosts({ posts }: UserPostsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get("search") || ""
  const page = Number(searchParams.get("page") || "1")
  const itemsPerPage = Number(searchParams.get("limit") || "5")

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
              <PostCard key={post.id} post={post} />)
            )}
          </div>
          <Pagination
            dataName="posts"
            totalItems={filteredPosts.length}
            itemsPerPage={itemsPerPage}
            currentPage={page}
          />
        </>
      ) : (
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>No Posts Found</CardTitle>
            <CardDescription>This user hasn&apos;t created any posts yet.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
