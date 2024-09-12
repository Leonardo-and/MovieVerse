import { ApiResponse, Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'
import { useQueries } from '@tanstack/react-query'

export function useFetchUserMovies(movieIds: string[]) {
  return useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ['movie', movieId],
      queryFn: async () => {
        const response = await api.get<ApiResponse<Movie>>('/movies/' + movieId)
        return response.data
      },
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isPending: results.some((result) => result.isPending),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
      }
    },
  })
}
