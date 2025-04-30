export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface PostWithUser extends Post {
  user: User
}

export interface UserWithPosts extends User {
  posts: Post[]
}

export interface SortConfig {
  key: keyof User | "company.name" | ""
  direction: "asc" | "desc"
}

export interface PaginationState {
  currentPage: number
  itemsPerPage: number
  totalItems: number
}
