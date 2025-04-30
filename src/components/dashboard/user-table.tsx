"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  User,
  Mail,
  Building,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SearchBar } from "@/components/ui/search-bar"
import type { User as UserType, SortConfig } from "@/lib/types"
import { Pagination } from "../ui/pagination"

interface UserTableProps {
  users: UserType[]
}

export function UserTable({ users }: UserTableProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get("search") || ""
  const sortKey = searchParams.get("sort") || ""
  const sortDir = (searchParams.get("dir") as "asc" | "desc") || "asc"
  const page = Number(searchParams.get("page") || "1")
  const itemsPerPage = Number(searchParams.get("limit") || "5")

  const [filteredUsers, setFilteredUsers] = useState(users)
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: sortKey as keyof UserType | "company.name" | "",
    direction: sortDir,
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0

    let valueA, valueB

    if (sortConfig.key === "company.name") {
      valueA = a.company.name
      valueB = b.company.name
    } else {
      valueA = a[sortConfig.key as keyof UserType]
      valueB = b[sortConfig.key as keyof UserType]
    }

    if (valueA < valueB) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (valueA > valueB) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  const paginatedUsers = sortedUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (sortConfig.key) {
      params.set("sort", sortConfig.key)
      params.set("dir", sortConfig.direction)
    } else {
      params.delete("sort")
      params.delete("dir")
    }

    params.set("page", page.toString())

    console.log("asdf", params.toString())
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [sortConfig, page, searchQuery, router, pathname, searchParams])

  const handleSort = (key: keyof UserType | "company.name") => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        }
      }
      return { key, direction: "asc" }
    })
  }

  const renderSortIcon = (key: keyof UserType | "company.name") => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="ml-1 h-4 w-4" />
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    )
  }

  return (
    <Card>
      <CardHeader className="gap-4">
        <CardTitle>
          <h3>Users Table</h3>
        </CardTitle>
        <SearchBar
          placeholder="Search by name, username, or email..."
          data={users}
          filterFunction={(user, searchTerm) =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.username.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
          }
          onFilteredData={setFilteredUsers}
          value={searchQuery}
          onChange={(searchTerm) => {
            const params = new URLSearchParams(searchParams)
            if (searchTerm) {
              params.set("search", searchTerm)
            } else {
              params.delete("search")
            }
            router.push(`${pathname}?${params.toString()}`, { scroll: false })
          }}
        />
      </CardHeader>
      <CardContent className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-max max-w-[80px] px-0">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("id")}>
                  # {renderSortIcon("id")}
                </Button>
              </TableHead>
              <TableHead className="px-0">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("name")}>
                  Name {renderSortIcon("name")}
                </Button>
              </TableHead>
              <TableHead className="px-0">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("username")}>
                  Username {renderSortIcon("username")}
                </Button>
              </TableHead>
              <TableHead className="px-0">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("email")}>
                  Email {renderSortIcon("email")}
                </Button>
              </TableHead>
              <TableHead className="px-0">
                <Button variant="ghost" className="p-0 font-medium" onClick={() => handleSort("company.name")}>
                  Company {renderSortIcon("company.name")}
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {user.company.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/dashboard/users/${user.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="w-full">
        <Pagination
          dataName="users"
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
        />
      </CardFooter>
    </Card>
  )
}
