import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardContentHeader } from "@/components/dashboard/dashboard-content-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { UserProfile } from "@/components/dashboard/user-profile"
import { UserPosts } from "@/components/dashboard/user-posts"
import { getUserData, getUserPosts } from "@/lib/actions"

interface UserPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { id } = await params
  const user = await getUserData(id, { next: { revalidate: 3600 } })

  if (!user) {
    return {
      title: "User Not Found",
    }
  }

  return {
    title: `User - ${user.name}`,
    description: `Profile for ${user.name}`,
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params

  return (
    <DashboardShell>
      <DashboardContentHeader heading="User Profile" description="View and manage user details">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/users">Back to Users List</Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/users/${id}/edit`}>Edit User</Link>
          </Button>
        </div>
      </DashboardContentHeader>
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfileWrapper userId={id} />
      </Suspense>
    </DashboardShell>
  )
}

async function UserProfileWrapper({ userId }: { userId: string }) {
  const user = await getUserData(userId, { next: { revalidate: 3600 } })

  if (!user) {
    notFound()
  }

  const posts = await getUserPosts(userId)

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="space-y-4">
        <UserProfile user={user} />
      </TabsContent>
      <TabsContent value="posts" className="space-y-4">
        <UserPosts posts={posts} />
      </TabsContent>
    </Tabs>
  )
}

function UserProfileSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
