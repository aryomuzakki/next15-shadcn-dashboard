import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DashboardContentHeader } from "@/components/dashboard/dashboard-content-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { UserEditForm } from "@/components/dashboard/user-edit-form"
import { Skeleton } from "@/components/ui/skeleton"
import { getUserData } from "@/lib/actions"

interface EditUserPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: EditUserPageProps): Promise<Metadata> {
  const { id } = await params
  const user = await getUserData(id, { cache: "no-store" })

  if (!user) {
    return {
      title: "User Not Found",
    }
  }

  return {
    title: `Edit User - ${user.name}`,
    description: `Edit profile for ${user.name}`,
  }
}



export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params

  return (
    <DashboardShell>
      <DashboardContentHeader heading="Edit User" description="Update user information" />
      <div className="grid gap-8">
        <Suspense fallback={<UserEditFormSkeleton />}>
          <UserEditFormWrapper userId={id} />
        </Suspense>
      </div>
    </DashboardShell>
  )
}

async function UserEditFormWrapper({ userId }: { userId: string }) {
  const user = await getUserData(userId, { cache: "no-store" })

  if (!user) {
    notFound()
  }

  return <UserEditForm user={user} />
}

function UserEditFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  )
}
