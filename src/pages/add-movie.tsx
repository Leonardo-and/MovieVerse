import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTMDBMovieData } from '@/hooks/useTMDBMovieData'
import { MovieDialog } from '@/components/add-movie/search-movie-dialog'
import { AddMovieForm } from '@/components/add-movie/add-movie-form'
import { ChangeMoviePostersDialog } from '@/components/add-movie/change-movie-posters-dialog'
import { useDebounce } from '@/hooks/useDebounce'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AddMovie() {
  const [searchParam, setSearchParam] = useState('')
  const debouncedSearchParam = useDebounce(searchParam, 500)
  const { data, isLoading } = useTMDBMovieData(debouncedSearchParam)

  const [image, setImage] = useState<string | null>(null)

  return (
    <main className="mb-8 flex justify-evenly">
      <Helmet>
        <title>Add Movie</title>
      </Helmet>
      <AddMovieForm
        className="w-2/3"
        dialog={
          <MovieDialog
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            data={data}
            isLoading={isLoading}
            setImage={setImage}
          />
        }
      />
      <div className="flex h-full w-1/4 flex-col gap-7">
        <Card>
          <CardContent className="mt-6 flex h-full min-h-80 items-center justify-center">
            {image ? (
              <div>
                <img
                  src={image}
                  alt="Movie Poster"
                  className="rounded-sm object-cover"
                />
                <ChangeMoviePostersDialog setImage={setImage} />
              </div>
            ) : (
              <span className="text-center">
                Select or upload a movie poster
              </span>
            )}
          </CardContent>
        </Card>
        <Button type="submit" size="lg" form="add-movie-form">
          Submit
        </Button>
      </div>
    </main>
  )
}
