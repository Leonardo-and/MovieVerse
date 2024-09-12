import { useParams } from 'react-router-dom'
import Card from '@/components/card'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse, Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'

export function MovieCategory() {
  const category = useParams().category

  const { data: movies } = useQuery<ApiResponse<Movie[]>>({
    queryKey: ['movies-category', category],
    queryFn: async () => {
      const response = await api.get('/movies', {
        params: {
          g: category,
        },
      })

      return response.data
    },
    enabled: !!category,
  })

  return (
    <main className="m-10">
      <div>
        <h1 className="mb-4 flex items-center gap-3 text-3xl font-semibold">
          <h2 className="text-lg text-neutral-500">Movies</h2>
          <span className="text-lg text-neutral-500">&gt;</span>
          {category}
        </h1>
        <div className="flex flex-wrap gap-2">
          {movies?.data ? (
            movies.data.map((movie) => <Card key={movie.id} movie={movie} />)
          ) : (
            <p>Uh oh! No movies found.</p>
          )}
        </div>
      </div>
    </main>
  )
}
