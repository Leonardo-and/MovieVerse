import { useParams } from 'react-router-dom'
import Card from '@/components/card'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse, Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'

export function MovieCategory() {
  const category = useParams().category

  const { data: movies, isError } = useQuery<ApiResponse<Movie[]>>({
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
    <section className="m-10 flex flex-wrap justify-center gap-4">
      {!movies?.data.length || isError ? (
        <p>No movies found</p>
      ) : (
        movies?.data.map((movie) => <Card key={movie.id} movie={movie} />)
      )}
    </section>
  )
}
