import type React from "react"
import { DashboardHeader } from "@/components/layout/header"
import { DashboardDesktopSidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 w-full h-16 border-b bg-background">
        <DashboardHeader />
      </header>
      <div className="flex w-full min-h-[calc(100vh_-_4rem)]">
        <DashboardDesktopSidebar />
        <main className="w-full md:w-[calc(100vw_-_17.5rem)] p-6 md:pt-6">{children}</main>
      </div>
    </div>
  )
}
