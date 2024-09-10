import { TMDBMovie } from '@/interfaces/movie-data'
import { ReactNode, createContext, useState } from 'react'

interface AddMovieContext {
  setSelectedMovie: React.Dispatch<React.SetStateAction<TMDBMovie | null>>
  selectedMovie: TMDBMovie | null
}

export const AddMovieContext = createContext({} as AddMovieContext)

interface AddMovieProviderProps {
  children: ReactNode
}

export function AddMovieProvider({ children }: AddMovieProviderProps) {
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null)

  return (
    <AddMovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </AddMovieContext.Provider>
  )
}
