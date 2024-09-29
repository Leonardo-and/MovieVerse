import { Helmet } from 'react-helmet-async'
import { useMoviesData } from '@/hooks/useMoviesData'
import { RecommendedMovie } from '@/components/recommended-movie'
import { Carousel } from '@/components/Carousel'

export function Home() {
  const movies = useMoviesData()

  return (
    <div className="min-h-screen w-full">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <RecommendedMovie />
      <main>
        <Carousel
          movies={movies.data?.data}
          title="Discover"
          isLoading={movies.isLoading}
        />
        <Carousel
          movies={movies.data?.data}
          title="Trending"
          isLoading={movies.isLoading}
        />
        <Carousel
          movies={movies.data?.data}
          title="Top Rated"
          isLoading={movies.isLoading}
        />
      </main>
    </div>
  )
}
