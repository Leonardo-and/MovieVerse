import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'

interface SearchButtonProps {
  isOnTop: boolean
}

export function SearchButton({ isOnTop }: SearchButtonProps) {
  const [searchParam, setSearchParam] = useState('')
  const debouncedSearchParam = useDebounce(searchParam, 500)
  const navigate = useNavigate()

  useEffect(() => {
    navigate({
      to: debouncedSearchParam ? '/search' : '/',
      search: { q: debouncedSearchParam },
    })
  }, [debouncedSearchParam, navigate])

  return (
    <div className="relative flex items-center">
      <Search className="absolute size-12 px-3.5 text-white" />
      <input
        placeholder="Search..."
        type="search"
        name="search"
        className={cn(
          `h-12 w-12 transform cursor-pointer rounded-full border bg-transparent outline-none
             transition-all duration-300 ease-in-out focus:w-64 focus:pl-16 [&:not(:focus)]:text-transparent [&:not(:focus)]:placeholder:text-transparent`,
          isOnTop && 'border-none focus:bg-background/30',
        )}
        value={searchParam}
        onChange={(e) => {
          setSearchParam(e.target.value)
        }}
      />
    </div>
  )
}
