import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom'
import { ReturnButton } from '@/components/return-button'
import { parseMovieDuration } from '@/utils/parse-movie-duration'
import { AboutMovieNotFound } from '@/pages/about-movie-not-found'
import { useQuery } from '@tanstack/react-query'
import { type ApiResponse, type Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'
import { format } from 'date-fns'
import { useUserMovieListStore } from '@/stores/user-list-store'
import { Bookmark, Play } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useMemo } from 'react'

export function AboutMovie() {
  // TODO: add an video preview of the movie
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: movie } = useQuery<ApiResponse<Movie>>({
    queryKey: ['movie', id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Movie>>(`/movies/${id}`)

      return response.data
    },
    enabled: !!id,
  })

  const { addToUserMovieList, userMovieList, removeFromUserMovieList } =
    useUserMovieListStore()

  const isMovieInList = useMemo(() => {
    return userMovieList.includes(id!)
  }, [userMovieList, id])

  if (!id) return <Navigate to="/" replace />

  function handleAddOrRemoveFromList() {
    isMovieInList
      ? removeFromUserMovieList(String(id))
      : addToUserMovieList(String(id))
  }

  return movie?.data ? (
    <main
      style={{
        backgroundImage: `url(http://localhost:3001/background/${movie.data.backgroundFilename})`,
      }}
      className={`bg-brightness-dark -mt-24 flex min-h-screen w-full items-center justify-evenly bg-cover bg-center before:bg-black/80`}
    >
      <ReturnButton onClick={() => navigate(-1)} className="left-3 top-24" />
      <article className="flex max-h-screen w-1/3 flex-col items-center justify-center">
        <img
          src={`http://localhost:3001/logo/${movie.data.logoFilename}`}
          alt={movie.data.title}
          className="m-7 max-h-56"
        />
        <ScrollArea className="h-72">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-evenly font-medium">
              <p>{parseMovieDuration(movie.data.duration)}</p>
              <p>{format(new Date(movie.data.releaseDate), 'yyyy')}</p>
              <span className="flex items-center gap-2">
                8.5{' '}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                  alt=""
                  className="h-5"
                />
              </span>
            </div>
            <div>
              <h2 className="font-medium text-slate-200/40">Genres</h2>
              <div className="flex w-full gap-2 *:bg-secondary/30 *:px-3 *:py-1 *:font-normal">
                {movie.data.genres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-medium text-slate-200/40">Cast</h2>
              <div className="flex w-full gap-2 *:bg-secondary/30 *:px-3 *:py-1 *:font-normal">
                {movie.data.cast.map((cast) => (
                  <Badge
                    key={cast}
                    variant="secondary"
                    className="bg-secondary/30 px-3 py-1 font-normal"
                  >
                    {cast}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-medium text-slate-200/40">Overview</h2>
              <p className="w-[95%] text-justify text-slate-100">
                {movie?.data.overview}
              </p>
            </div>
          </div>
        </ScrollArea>
        <div className="mt-3 flex gap-3">
          <Button asChild>
            <Link to={`/watch/${movie.data.id}`} className="flex gap-2">
              <Play className="size-5 fill-foreground" />
              Play
            </Link>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleAddOrRemoveFromList}>
                  <Bookmark
                    className={`${isMovieInList ? 'fill-white' : ''}`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isMovieInList ? 'Remove from My List' : 'Add to My List'}{' '}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </article>
      <div className="w-1/3">
        <h1>Content</h1>
        <div className="w-full">
          <h2>Trailer</h2>
          <Link to={`/watch/${movie.data.id}/trailer`}>
            <Button>Watch Trailer</Button>
          </Link>
        </div>
      </div>
    </main>
  ) : (
    <AboutMovieNotFound />
  )
}
