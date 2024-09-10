import { useSearchParams } from 'react-router-dom'
import Card from '@/components/card'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { ApiResponse, Movie } from '@/interfaces/movie-data'
import { Helmet } from 'react-helmet-async'

export function Search() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q')?.toLowerCase()

  const { data: movies, isError } = useQuery<ApiResponse<Movie[]>>({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      const response = await api.get('/search', {
        params: {
          q: searchQuery,
        },
      })

      return response.data
    },
    enabled: !!searchQuery,
  })

  const { data: alternativeMovies } = useQuery<ApiResponse<Movie[]>>({
    queryKey: ['search', searchQuery, 'alternatives'],
    queryFn: async () => {
      const response = await api.get('/movies')
      return response.data
    },
    enabled: !movies?.data?.length || isError,
  })

  return (
    <main className="mx-10 min-h-screen">
      <Helmet>
        <title>{searchQuery}</title>
      </Helmet>
      {searchQuery && movies?.data.length ? (
        <h3>
          Results to{' '}
          <span className="font-bold text-primary">
            &quot;{searchQuery}&quot;
          </span>
        </h3>
      ) : (
        <h3>
          No results for{' '}
          <span className="font-bold text-primary">
            &quot;{searchQuery}&quot;
          </span>
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
