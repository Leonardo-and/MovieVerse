import { ApiResponse, Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { Carousel } from '@/components/Carousel'

export function Releases() {
  const movies = useQuery<ApiResponse<Movie[]>>({
    queryKey: ['releases'],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Movie[]>>('/movies/releases')
      return response.data
    },
  })

  return (
    <div className="m-10 flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Releases</h1>
      <Carousel movies={movies} title="Added recently" />
    </div>
  )
}
