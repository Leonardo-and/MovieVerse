import { createLazyFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import { useMoviesData } from '@/hooks/useMoviesData'
import { RecommendedMovie } from '@/components/recommended-movie'
import { Carousel } from '@/components/Carousel'

export const Route = createLazyFileRoute('/')({
  component: Home,
})

function Home() {
  const movies = useMoviesData()

  return (
    <div className="min-h-screen w-full">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <RecommendedMovie />
      <main>
        <div className="px-9 py-5">
          <Carousel
            movies={movies.data?.data}
            title="Discover"
            isLoading={movies.isLoading}
          />
        </div>
      </main>
    </div>
  )
}
