import { createFileRoute, Link } from '@tanstack/react-router'
import Card, { CardSkeleton } from '@/components/card'
import { useQuery } from '@tanstack/react-query'
import { ApiResponse, Movie } from '@/interfaces/movie-data'
import { api } from '@/lib/axios'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/category/$category')({
  component: MovieCategory,
})

export function MovieCategory() {
  const { category } = Route.useParams()

  const { data: movies, isLoading } = useQuery<ApiResponse<Movie[]>>({
    queryKey: ['movies-category', category],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Movie[]>>('/movies', {
        params: {
          g: category,
        },
      })
      return response.data
    },
  })

  return (
    <main className="m-10">
      <Breadcrumb>
        <BreadcrumbList className="mb-4 flex items-center">
          <BreadcrumbItem>
            <BreadcrumbLink className="text-base">
              <Link to="/category">Movies</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {category && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-semibold">
                  {category}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <section className="flex flex-wrap items-center justify-center gap-2">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={`movie-skeleton-${index}`} />
            ))
          : movies?.data.map((movie) => <Card key={movie.id} movie={movie} />)}
      </section>
      {!movies?.data.length && (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4">
          <h3 className="text-3xl font-bold tracking-tight">
            Uh oh! There&apos;s nothing here. &#128533;
          </h3>
          <p>We couldn&apos;t find any movies in the {category} category.</p>
          <Button>Return</Button>
        </div>
      )}
    </main>
  )
}
