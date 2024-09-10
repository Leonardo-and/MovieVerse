export interface TMDBMovie {
  adult: boolean
  backdrop_path: string | null
  genres: string[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface ApiResponse<T> {
  message: string
  status: number
  data: T
  error: boolean
}

export interface Movie {
  id: string
  title: string
  overview: string
  posterFilename: string
  videoFilename: string
  logoFilename: string
  backgroundFilename: string
  genres: string[]
  cast: string[]
  duration: number
  releaseDate: Date
}
