import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardContentHeader } from "@/components/dashboard/dashboard-content-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { getPostData } from "@/lib/actions"
import PostDetail from "@/components/dashboard/post-detail"

interface PostPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = await getPostData(id, { next: { revalidate: 3600 } })

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `Post - ${post.title}`,
    description: `${post.body}`,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params

  return (
    <DashboardShell>
      <DashboardContentHeader heading="Post Detail" description="View post details">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/posts">Back to Posts List</Link>
          </Button>
        </div>
      </DashboardContentHeader>
      <Suspense fallback={<PostProfileSkeleton />}>
        <PostProfileWrapper postId={id} />
      </Suspense>
    </DashboardShell>
  )
}

async function PostProfileWrapper({ postId }: { postId: string }) {
  const post = await getPostData(postId, { next: { revalidate: 3600 } })

  if (!post) {
    notFound()
  }

  return (
    <PostDetail post={post} />
  )
}

function PostProfileSkeleton() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-6 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-11/12" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-5/6" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
