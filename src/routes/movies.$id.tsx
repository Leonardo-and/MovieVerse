import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ReturnButton } from '@/components/return-button'
import { parseMovieDuration } from '@/utils/parse-movie-duration'
import { useQuery } from '@tanstack/react-query'
import { type ApiResponse, type Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'
import { format } from 'date-fns'
import { useUserMovieListStore } from '@/stores/user-list-store'
import { Bookmark, Play, Clapperboard } from 'lucide-react'
import { useMemo } from 'react'
import { clsx } from 'clsx'

export const Route = createFileRoute('/movies/$id')({
  component: AboutMovie,
})

function AboutMovie() {
  // TODO: add an video preview of the movie
  const { id } = Route.useParams()

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
    return userMovieList.includes(id)
  }, [userMovieList, id])

  function handleEditList() {
    isMovieInList ? removeFromUserMovieList(id) : addToUserMovieList(id)
  }

  return movie?.data ? (
    <main
      style={{
        backgroundImage: `url(http://localhost:3001/background/${movie.data.backgroundFilename})`,
      }}
      className="bg-brightness-dark -mt-24 flex min-h-screen w-full items-center justify-evenly bg-cover bg-center before:bg-black/80"
    >
      <Link to="/">
        <ReturnButton className="left-3 top-24" />
      </Link>
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
                8.5 {/* TODO: use an imdb rating from api */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                  alt=""
                  className="h-5"
                />
              </span>
            </div>
            <div>
              <h2 className="font-medium text-slate-200/40">Genres</h2>
              <div className="flex w-full gap-2">
                {movie.data.genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-secondary/30 px-3 py-1 font-normal"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-medium text-slate-200/40">Cast</h2>
              <div className="flex w-full gap-2">
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
        <div className="mt-2 w-full">
          <Button
            variant="ghost"
            onClick={handleEditList}
            className="flex gap-2"
          >
            <Bookmark className={clsx({ 'fill-white': isMovieInList })} />
            {isMovieInList ? 'Remove from My List' : 'Add to My List'}
          </Button>
        </div>
      </article>
      <div className="flex w-1/3 flex-col gap-3">
        <Link
          to={`/watch/${movie.data.id}`}
          className="group flex items-center justify-center"
        >
          <Play className="absolute z-10 size-10 fill-foreground" />
          <img
            src="https://picsum.photos/700/400"
            className="rounded-sm group-hover:brightness-50"
            alt="placeholder image"
          />
        </Link>
        <Link to={`/watch/${movie.data.id}/trailer`}>
          <Button variant="secondary" className="flex gap-2">
            <Clapperboard />
            Trailers
          </Button>
        </Link>
      </div>
    </main>
  ) : (
    <div>
      <h1>Movie not found</h1>
      <Link to="..">
        <Button>Go back</Button>
      </Link>
    </div>
  )
}
