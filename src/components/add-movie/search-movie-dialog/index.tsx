import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TMDBMovie } from '@/interfaces/movie-data'
import { Spinner } from '@/components/spinner'
import { AddMovieContext } from '@/components/add-movie/add-movie-context'
import { useContext, useState } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import TMDBLogo from '@/assets/tmdb-logo.svg'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useDebounce } from '@/hooks/useDebounce'
import { MovieListItem } from './movie-list-item'

interface SearchMovieResponse {
  data: TMDBMovie[]
}

export function SearchMovieDialog({ disabled, className }: ButtonProps) {
  const [searchParam, setSearchParam] = useState('')
  const { setSelectedMovie } = useContext(AddMovieContext)
  const debouncedSearchParam = useDebounce(searchParam, 1000)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { isLoading, data, error } = useQuery({
    queryKey: ['movies', debouncedSearchParam],
    queryFn: async () => {
      const response = await api.get<SearchMovieResponse>('/ext/search', {
        params: { q: debouncedSearchParam },
      })
      return response.data.data
    },
    enabled: !!debouncedSearchParam && isDialogOpen,
  })

  const handleMovieClick = (movie: TMDBMovie) => {
    setSelectedMovie(movie)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className={className}
                disabled={disabled}
              >
                <img className="h-full" src={TMDBLogo} alt="tmdb logo" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Use <span className="text-cyan-400">TMDB API</span> for autofill
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select the movie</DialogTitle>
          <DialogDescription>
            Select the movie you want to use the autocomplete.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            type="search"
            onChange={(e) => setSearchParam(e.target.value)}
            placeholder="Search..."
            name="tmdb-movie-search"
            value={searchParam}
            className="w-full"
            autoFocus
          />
          <ScrollArea className="relative h-[300px] p-4">
            {isLoading && <Spinner />}

            {error && (
              <div className="flex h-full items-center justify-center text-red-500">
                <p>
                  {error instanceof Error
                    ? error.message
                    : 'Error loading movies'}
                </p>
              </div>
            )}

            {!isLoading && !error && data && (
              <ul className="flex flex-col gap-1">
                {data.map((movie, index) => (
                  <MovieListItem
                    key={movie.id}
                    movie={movie}
                    onClick={() => handleMovieClick(movie)}
                    isLast={index === data.length - 1}
                  />
                ))}
              </ul>
            )}

            {!isLoading && !error && !data && (
              <div className="flex h-[300px] w-full items-center justify-center">
                <p className="text-slate-700">Search for a movie</p>
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
