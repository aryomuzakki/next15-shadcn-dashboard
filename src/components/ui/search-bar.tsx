"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

interface SearchBarProps<T> {
  placeholder: string
  data: T[]
  filterFunction: (item: T, searchTerm: string) => boolean
  onFilteredData: (filteredData: T[]) => void
  value: string
  onChange: (value: string) => void
}

export function SearchBar<T>({
  placeholder,
  data,
  filterFunction,
  onFilteredData,
  value,
  onChange,
}: SearchBarProps<T>) {
  const [searchTerm, setSearchTerm] = useState(value)
  
  useEffect(() => {
    setSearchTerm(value)
  }, [value])
  
  const handleDebouncedSearch = useCallback(
    useDebouncedCallback((term: string) => {
      onChange(term)
      const filteredData = data.filter((item) => filterFunction(item, term.toLowerCase()))
      onFilteredData(filteredData)
    }, 500),
    [data, filterFunction, onChange, onFilteredData]
  )

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-8"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            handleDebouncedSearch(e.target.value)
          }}
        />
      </div>
    </form>
  )
}