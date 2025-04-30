import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

if (process.env.JWT_SECRET === undefined) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

const publicPaths = ["/login"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicPaths.includes(pathname)) {
    if (pathname === "/login") {
      const token = request.cookies.get("auth-token")?.value
      if (token) {
        try {
          await jwtVerify(token, JWT_SECRET)
          const url = new URL("/dashboard", request.url)
          return NextResponse.redirect(url)
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Token error:", error);
          }
        }
      }
      return NextResponse.next()
    }
    return NextResponse.next()
  }

  const token = request.cookies.get("auth-token")?.value

  if (!token) {
    const url = new URL("/login", request.url)
    return NextResponse.redirect(url)
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Token error:", error);
    }
    const url = new URL("/login", request.url)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
