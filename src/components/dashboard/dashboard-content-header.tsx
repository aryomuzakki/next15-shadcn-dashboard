import type React from "react"
interface DashboardContentHeaderProps {
  heading: string
  description?: string
  children?: React.ReactNode
}

export function DashboardContentHeader({ heading, description, children }: DashboardContentHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {description && <p className="text-lg text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  )
}
