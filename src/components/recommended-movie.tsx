import { Button } from '@/components/ui/button'
import { Play, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ShortText } from '@/components/short-text'
import { useQuery } from '@tanstack/react-query'
import { type ApiResponse, type Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'
import { Skeleton } from '@/components/ui/skeleton'

export function RecommendedMovie() {
  const {
    data: movie,
    isError,
    isLoading,
  } = useQuery<ApiResponse<Movie>>({
    queryKey: ['recommendedMovie'],
    queryFn: async () => {
      const response = await api.get('/recommended')
      return response.data
    },
    staleTime: Infinity,
  })

  return (
    <aside
      style={{
        backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.9) 1%, rgba(0, 0, 0, 0) 70%), url(http://localhost:3001/background/${movie?.data.backgroundFilename})`,
      }}
      className="bg-brightness-dark relative -mt-24 flex h-[550px] items-center bg-cover bg-center text-zinc-200 before:bg-black/50"
    >
      <div className="z-10 mt-20 flex w-1/3 flex-col gap-4 p-10">
        {movie?.data.logoFilename ? (
          <img
            src={`http://localhost:3001/logo/${movie?.data.logoFilename}`}
            className="size-fit max-h-48"
            alt={movie.data.title}
            loading="lazy"
          />
        ) : (
          <h1 className="text-6xl font-semibold">
            {movie?.data.title || <Skeleton className="h-12 w-full" />}
          </h1>
        )}

        <div className="flex">
          <div className="flex flex-col gap-4">
            <ShortText className="pointer-events-none hidden select-none text-justify shadow-black text-shadow-lg sm:block">
              {movie?.data.overview || <Skeleton className="h-20 w-[90%]" />}
            </ShortText>

            {movie?.data && (
              <div className="flex gap-2">
                <Button
                  className="w-28 font-bold"
                  size={'lg'}
                  disabled={isLoading || isError}
                >
                  <Link
                    to={`/watch/${movie?.data.id}`}
                    className="flex items-center gap-1"
                  >
                    <Play fill="#fff" className="size-5" />
                    Play
                  </Link>
                </Button>
                <Button variant="secondary" size={'lg'} asChild>
                  <Link
                    to={`/movie/${movie?.data.id}`}
                    className="flex items-center gap-2"
                  >
                    <Info />
                    More Info
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
