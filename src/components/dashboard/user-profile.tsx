import type { User } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Globe, MapPin, Briefcase } from "lucide-react"
import Link from "next/link"

interface UserProfileProps {
  user: User
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>User details and contact information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Full Name</h3>
            <p className="text-sm text-muted-foreground">{user.name}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Username</h3>
            <p className="text-sm text-muted-foreground">{user.username}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Email</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <Link href={`mailto:${user.email}`} target="_blank" className="hover:underline">
                {user.email}
              </Link>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Phone</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <Link href={`tel:${user.phone}`} target="_blank" className="hover:underline">
                {user.phone}
              </Link>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium">Website</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <Link href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {user.website}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>User&apos;s address information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <Button asChild> */}
            <Link href={`https://maps.google.com/maps/?q=${user.address.geo.lat},${user.address.geo.lng}`} target="_blank" className="flex items-start gap-2 hover:underline">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm">
                  {user.address.street}, {user.address.suite}
                </p>
                <p className="text-sm">
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </Link>
            {/* </Button> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Company</CardTitle>
            <CardDescription>User&apos;s company information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <Briefcase className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">{user.company.name}</p>
                <p className="text-sm text-muted-foreground">{user.company.catchPhrase}</p>
                <p className="text-sm text-muted-foreground">{user.company.bs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
