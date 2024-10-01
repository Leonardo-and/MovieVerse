import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useUserMovieListStore } from '@/stores/user-list-store'
import Card, { CardSkeleton } from '@/components/card'
import { useFetchUserMovies } from '@/hooks/useFetchUserMovies'
import { Button } from '@/components/ui/button'
import { Helmet } from 'react-helmet-async'
import { ApiResponse, Movie } from '@/interfaces/movie-data'

export const Route = createLazyFileRoute('/my-list')({
  component: UserList,
})

function UserList() {
  const { userMovieList } = useUserMovieListStore()

  const { isLoading, data: movies } = useFetchUserMovies(userMovieList)

  return (
    <main className="m-10 flex h-[80vh] flex-col gap-6">
      <Helmet>
        <title>My List</title>
      </Helmet>
      <h1 className="text-3xl font-bold tracking-tight">My List</h1>
      <div className="flex flex-wrap gap-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={`my-list-card-skeleton-${index}`} />
            ))
          : movies
              .filter((movie): movie is ApiResponse<Movie> => !!movie)
              .map((movie) => <Card key={movie?.data.id} movie={movie.data} />)}
      </div>
      {!movies.length && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h3 className="text-3xl font-bold tracking-tight">
            Uh oh! There&apos;s nothing here. &#128533;
          </h3>
          <p>You can add some movies here to maybe see later.</p>
          <Link to="/">
            <Button>Go to home page</Button>
          </Link>
        </div>
      )}
    </main>
  )
}
