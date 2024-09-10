import { ApiResponse, Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'
import { useUserMovieListStore } from '@/stores/user-list-store'
import { useQueries } from '@tanstack/react-query'
import Card, { CardSkeleton } from '@/components/card'

export function UserList() {
  const { userMovieList } = useUserMovieListStore()

  const query = useQueries({
    queries: userMovieList.map((movieId) => ({
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
        pending: results.some((result) => result.isPending),
      }
    },
  })

  return (
    <main className="m-10 flex flex-col gap-3">
      <h1 className="text-3xl font-bold tracking-tight">My List</h1>
      <div className="flex flex-wrap gap-4">
        {query.pending
          ? Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : query.data.map((movie) => (
              <Card key={movie?.data.id} movie={movie!.data} />
            ))}
      </div>
    </main>
  )
}
