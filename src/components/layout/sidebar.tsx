"use client"

import type React from "react"
import { DashboardSidebarContent } from "./sidebar-content"

// import { useState, useEffect } from "react"

export function DashboardDesktopSidebar() {
  // const [isMounted, setIsMounted] = useState(false)

  // useEffect(() => {
  //   setIsMounted(true)
  // }, [])

  // if (!isMounted) {
  //   return null
  // }

  return (
    <div className="hidden border-r bg-background md:block shrink-0">
      <DashboardSidebarContent />
    </div>
  )
}
