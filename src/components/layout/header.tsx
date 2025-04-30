"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, LogOut, UserCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { logout } from "@/lib/actions"
import { DashboardSidebarContent } from "./sidebar-content"

export function DashboardHeader() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex h-full items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-2 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 sm:max-w-xs">
          <DashboardSidebarContent />
        </SheetContent>
      </Sheet>
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <UserCircle2 className="h-6 w-6" />
        <span className="hidden md:inline-block">User Dashboard</span>
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <form action={logout}>
          <Button variant="ghost" size="icon" type="submit">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
