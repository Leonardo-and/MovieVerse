import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Movie, ApiResponse } from '@/interfaces/movie-data'

export function useMovieData(id: string) {
  const query = useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const response = await axios.get<ApiResponse<Movie>>(
        `http://localhost:3001/api/movies/${id}`,
      )
      return response.data
    },
  })
  return query
}
