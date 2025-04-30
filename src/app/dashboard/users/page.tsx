import { DashboardContentHeader } from "@/components/dashboard/dashboard-content-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { UserTable } from "@/components/dashboard/user-table"
import { Skeleton } from "@/components/ui/skeleton"
import { getUsers } from "@/lib/actions"
import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Users",
  description: "View all users",
}

async function UserTableWrapper() {
  const users = await getUsers()

  return <UserTable users={users} />
}

function UserTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="p-4">
        <Skeleton className="h-8 w-full max-w-sm" />
      </div>
      <div className="border-t">
        <div className="flex items-center p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="ml-4 space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="ml-4 space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="ml-4 space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UserPage() {
  return (
    <DashboardShell>
      <DashboardContentHeader heading="User" description="View and Manage all users." />
      <div className="">
        <Suspense fallback={<UserTableSkeleton />}>
          <UserTableWrapper />
        </Suspense>
      </div>
    </DashboardShell>
  )
}