import { createFileRoute } from '@tanstack/react-router'
import Card from '@/components/card'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { ApiResponse, Movie } from '@/interfaces/movie-data'
import { Helmet } from 'react-helmet-async'
import { z } from 'zod'

const movieSearchSchema = z.object({
  q: z.string().catch(''),
})

export const Route = createFileRoute('/search')({
  component: Search,
  validateSearch: movieSearchSchema,
})

function Search() {
  const { q } = Route.useSearch()

  const { data: movies, isError } = useQuery<ApiResponse<Movie[]>>({
    queryKey: ['search', q],
    queryFn: async () => {
      const response = await api.get('/search', {
        params: {
          q,
        },
      })

      return response.data
    },
    enabled: !!q,
  })

  const { data: alternativeMovies } = useQuery<ApiResponse<Movie[]>>({
    queryKey: ['search', q, 'alternatives'],
    queryFn: async () => {
      const response = await api.get('/movies')
      return response.data
    },
    enabled: !movies?.data?.length || isError,
  })

  return (
    <main className="mx-10 min-h-screen">
      <Helmet>
        <title>{q}</title>
      </Helmet>
      {q && movies?.data.length ? (
        <h3>
          Results to{' '}
          <span className="font-bold text-primary">&quot;{q}&quot;</span>
        </h3>
      ) : (
        <h3>
          No results for{' '}
          <span className="font-bold text-primary">&quot;{q}&quot;</span>
          <h2 className="font-semibold">See also:</h2>
        </h3>
      )}
      <section className="my-8 flex flex-wrap gap-4">
        {movies && movies.data
          ? movies.data.map((movie) => <Card key={movie.id} movie={movie} />)
          : alternativeMovies?.data.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
      </section>
    </main>
  )
}
