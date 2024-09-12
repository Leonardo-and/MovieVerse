import 'plyr-react/plyr.css'
import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse, type Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'
import { ArrowLeft } from 'lucide-react'
import { VideoPlayer } from '@/components/video-player'
import { Spinner } from '@/components/spinner'

interface MoviePlayerProps {
  trailer?: boolean
}

export function MoviePlayer({ trailer }: MoviePlayerProps) {
  const movieId = useParams().movieId
  const navigate = useNavigate()

  const { data: movie } = useQuery<ApiResponse<Movie>>({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Movie>>('/movies/' + movieId)
      return response.data
    },
  })

  return (
    <div className="group flex h-screen w-screen select-none items-center justify-center bg-black">
      <Helmet>
        <title>{movie?.data.title}</title>
      </Helmet>
      <div className="absolute left-10 top-10 z-50">
        <div className="hidden items-center gap-7 group-hover:flex">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="size-10" />
          </button>
          <h1 className="pointer-events-none select-none text-3xl font-semibold">
            {trailer ? `${movie?.data.title} | Trailer` : movie?.data.title}
          </h1>
        </div>
      </div>
      <div className="md:*:w-screen lg:*:h-screen">
        {movieId && movie?.data ? (
          <VideoPlayer movieId={movieId} trailer={trailer} />
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  )
}
