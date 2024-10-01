import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useDebounce } from '@/hooks/useDebounce'

interface SearchButtonProps {
  isOnTop: boolean
}

export function SearchButton({ isOnTop }: SearchButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
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
      <Search
        className={`absolute w-12 ${isOpen && 'border-r border-r-zinc-200'} px-3.5`}
      />
      <input
        placeholder="Search..."
        type="search"
        name="search"
        className={`h-12 w-12 transform cursor-pointer rounded-full ${isOnTop && isOpen ? 'bg-background opacity-60' : 'bg-transparent'} outline-none transition-all
             duration-300 ease-in-out focus:w-64 focus:pl-16 ${
               !isOpen && 'text-transparent placeholder:text-transparent'
             }`}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        value={searchParam}
        onChange={(e) => {
          setSearchParam(e.target.value)
        }}
      />
    </div>
  )
}
