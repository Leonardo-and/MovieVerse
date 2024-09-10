import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useMoviePosters(id: number) {
  const query = useQuery({
    queryKey: ['posters', id],
    queryFn: async () => {
      const response = await axios.get(
        'http://localhost:3001/api/movies/tmdb/posters/' + id,
      )
      return response?.data
    },
    enabled: !!id,
  })

  return query
}
