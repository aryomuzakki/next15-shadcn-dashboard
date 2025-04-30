import { Suspense } from "react"
import type { Metadata } from "next"
import { DashboardContentHeader } from "@/components/dashboard/dashboard-content-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { PostList } from "@/components/dashboard/post-list"
import { Skeleton } from "@/components/ui/skeleton"
import { getPosts, getUsers } from "@/lib/actions"

export const metadata: Metadata = {
  title: "Posts",
  description: "View all posts from users",
}

async function PostListWrapper() {
  const [users, posts] = await Promise.all([
    getUsers(),
    getPosts(),
  ])

  const postsWithUser = posts.map((post) => {
    const user = users.find((user) => user.id === post.userId)
    return {
      ...post,
      user,
    }
  })
  
  return <PostList posts={postsWithUser} />
}

function PostListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="p-6 pt-0">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PostsPage() {
  return (
    <DashboardShell>
      <DashboardContentHeader heading="Posts" description="View and manage all posts from users." />
      <Suspense fallback={<PostListSkeleton />}>
        <PostListWrapper />
      </Suspense>
    </DashboardShell>
  )
}
