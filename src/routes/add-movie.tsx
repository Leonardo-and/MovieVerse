import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import { AddMovieForm } from '@/components/add-movie/add-movie-form'
import { Button } from '@/components/ui/button'
import { AddMovieProvider } from '@/components/add-movie/add-movie-context'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/add-movie')({
  component: AddMovie,
})

function AddMovie() {
  return (
    <main className="m-10">
      <AddMovieProvider>
        <Helmet>
          <title>Add Movie</title>
        </Helmet>
        <div className="">
          <AddMovieForm />
        </div>
        <Button
          type="button"
          size="lg"
          variant="default"
          className="fixed bottom-2 right-2 flex gap-2"
        >
          Next step
          <ArrowRight />
        </Button>
      </AddMovieProvider>
    </main>
  )
}
