import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="space-y-4 p-0 pt-6 md:p-0 w-full">{children}</div>
    </div>
  )
}
