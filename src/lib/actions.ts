"use server"

import { cookies } from "next/headers"
import { SignJWT } from "jose"
import { redirect } from "next/navigation"
import { Post, PostWithUser, User } from "./types"

const VALID_USERNAME = "testuser"
const VALID_PASSWORD = "testpass"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-at-least-32-characters-long")
const JWT_EXPIRATION = "8h"

export async function login(username: string, password: string): Promise<boolean> {
  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return false
  }

  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET);

  (await cookies()).set({
    name: "auth-token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  })

  return true
}

export async function logout() {
  (await cookies()).delete("auth-token")
  redirect("/login")
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch users")
  }

  return res.json()
}

export async function getUserData(id: string, options?: RequestInit): Promise<User | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, options)

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}
export async function getPostData(id: string, options?: RequestInit): Promise<PostWithUser | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, options)

    if (!res.ok) {
      return null
    }

    const post = await res.json()
    const user = await getUserData(post.userId)

    return { ...post, user }
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }

  return res.json()
}

export async function getUserPosts(userId: string): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?userId=${userId}`)

    if (!res.ok) {
      return []
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}