import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">404 - Page Not Found</h1>
      <p className="text-muted-foreground">The page you are looking for does not exist.</p>
      <Button asChild className="mt-4">
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  )
}
