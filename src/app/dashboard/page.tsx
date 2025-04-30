import { Suspense } from "react"
import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardContentHeader } from "@/components/dashboard/dashboard-content-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, FileText } from "lucide-react"
import { getPosts, getUsers } from "@/lib/actions"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User dashboard overview",
}

async function getStats() {
  const [users, posts] = await Promise.all([
    getUsers(),
    getPosts(),
  ])

  return {
    userCount: users.length,
    postCount: posts.length,
  }
}

function StatsCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="h-4 w-24" />
        </CardTitle>
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-12" />
        <Skeleton className="mt-1 h-4 w-32" />
      </CardContent>
    </Card>
  )
}

function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<><StatsCardSkeleton /><StatsCardSkeleton /><StatsCardSkeleton /></>}>
        <StatsCard />
      </Suspense>
    </div>
  )
}

async function StatsCard() {
  const stats = await getStats()

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.userCount}</div>
          <p className="text-xs text-muted-foreground">Registered users in the system</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.postCount}</div>
          <p className="text-xs text-muted-foreground">Posts created by users</p>
        </CardContent>
      </Card>
    </>
  )
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardContentHeader heading="Dashboard" description="Overview of your user data and posts." />
      <div className="grid gap-4 md:gap-8">
        <StatsCards />
      </div>
    </DashboardShell>
  )
}
