import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import { Separator } from '@/components/ui/separator'
import { AddMovieContext } from '@/components/add-movie/add-movie-context'
import { useContext } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import TMDBLogo from '@/assets/tmdb-logo.svg'
import { format } from 'date-fns'

interface AddMovieDialogProps extends ButtonProps {
  searchParam: string
  setSearchParam: React.Dispatch<React.SetStateAction<string>>
  data: TMDBMovie[]
  isLoading: boolean
  setImage: React.Dispatch<React.SetStateAction<string | null>>
}

export function MovieDialog({
  searchParam,
  setSearchParam,
  data,
  isLoading,
  setImage,
}: AddMovieDialogProps) {
  const { setSelectedMovie } = useContext(AddMovieContext)

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline">
                <img className="h-full" src={TMDBLogo} alt="tmdb logo" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Use <code>TMDB API</code> for autofill
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select the movie</DialogTitle>
          <DialogDescription>
            Select the movie you want to use the autocomplete.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-96 flex-col gap-2">
          <Input
            type="search"
            onChange={(e) => setSearchParam(e.target.value)}
            placeholder="Search..."
            name="search"
            value={searchParam}
            className="w-full"
            autoFocus
          />
          <ScrollArea className="relative h-[300px] p-4">
            {isLoading ? (
              <Spinner />
            ) : data ? (
              <div>
                <ul className="flex flex-col gap-1">
                  {data.map((movie: TMDBMovie, i) => (
                    <DialogClose key={movie.id}>
                      <li
                        key={movie.id}
                        className="flex w-full cursor-pointer items-center p-2 text-center"
                        onClick={() => {
                          setSelectedMovie(movie)
                          setImage(
                            'https://image.tmdb.org/t/p/original/' +
                              movie.poster_path,
                          )
                        }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt=""
                          className="h-[80px] rounded-sm object-cover"
                        />
                        <div className="mx-auto px-2">
                          <h2 className="text-lg">{movie.title}</h2>
                          <p className="text-sm text-neutral-500">
                            {format(new Date(movie.release_date), 'yyyy')}
                          </p>
                        </div>
                      </li>
                      {i !== data.length - 1 && <Separator />}
                    </DialogClose>
                  ))}
                </ul>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0  h-40 bg-gradient-to-t from-background to-transparent" />
              </div>
            ) : (
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
