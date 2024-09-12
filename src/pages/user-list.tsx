import { useUserMovieListStore } from '@/stores/user-list-store'
import Card, { CardSkeleton } from '@/components/card'
import { useFetchUserMovies } from '@/hooks/useFetchUserMovies'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function UserList() {
  const { userMovieList } = useUserMovieListStore()

  const query = useFetchUserMovies(userMovieList)

  return (
    <main className="m-10 flex flex-col gap-3">
      <h1 className="text-3xl font-bold tracking-tight">My List</h1>
      <div className="flex flex-wrap gap-4">
        {query.isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : query.data.length ? (
          query.data.map((movie) => (
            <Card key={movie?.data.id} movie={movie!.data} /> // TODO: fix this, TYPEscript isn't happy
          ))
        ) : (
          <p>
            Uh oh! There&apos;s nothing here. Add some movies to your list on
            the{' '}
            <Button variant="link" asChild className="m-0 p-0">
              <Link to="/">home page</Link>
            </Button>
            .
          </p>
        )}
      </div>
    </main>
  )
}
