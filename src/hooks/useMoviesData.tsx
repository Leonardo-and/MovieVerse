import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Movie, ApiResponse } from '@/interfaces/movie-data'

export function useMoviesData() {
  const query = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const response = await axios.get<ApiResponse<Movie[]>>(
        'http://localhost:3001/api/v1/movies/',
      )
      return response?.data
    },
    staleTime: Infinity,
  })
  return query
}
