import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useTMDBMovieData(movieTitle: string) {
  const query = useQuery({
    queryKey: ['movies', movieTitle],
    queryFn: async () => {
      const response = await axios.get(
        'http://localhost:3001/api/movies/tmdb/' + movieTitle,
      )
      return response?.data
    },
    enabled: !!movieTitle,
  })
  return query
}
