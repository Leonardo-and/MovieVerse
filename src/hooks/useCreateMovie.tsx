import { FormValues } from '@/schemas/movie-form'
import { useMutation } from '@tanstack/react-query'

async function createMovie(movieData: FormValues) {
  await new Promise((resolve) => setTimeout(resolve, 3000)) // TODO: make an api call
  return {
    id: crypto.randomUUID(),
  }
}

export function useCreateMovie() {
  return useMutation({
    mutationFn: async (movieData: FormValues) => {
      const createdMovie = await createMovie(movieData)
      return createdMovie
    },
  })
}
