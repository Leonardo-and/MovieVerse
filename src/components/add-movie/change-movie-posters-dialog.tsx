import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMoviePosters } from '@/hooks/useMoviePosters'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useContext } from 'react'
import { AddMovieContext } from '@/components/add-movie/add-movie-context'

interface Poster {
  url: string
}

export function ChangeMoviePostersDialog({
  setImage,
}: {
  setImage: React.Dispatch<React.SetStateAction<string | null>>
}) {
  const { selectedMovie, setSelectedMovie } = useContext(AddMovieContext)
  const { data: posters } = useMoviePosters(Number(selectedMovie?.id))
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Poster</Button>
      </DialogTrigger>
      <DialogContent className="h-[90%]">
        <DialogHeader>
          <DialogTitle>Edit movie poster</DialogTitle>
          <DialogDescription>
            Choose a new poster for the movie
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="grid gap-4">
          {posters?.map((poster: Poster, i: number) => {
            return (
              <DialogClose key={i}>
                <img
                  onClick={() => {
                    if (selectedMovie) {
                      setSelectedMovie({
                        ...selectedMovie,
                        poster_path: poster.url,
                      })
                      setImage(poster.url)
                    }
                  }}
                  src={poster.url}
                  alt=""
                  className="h-40 object-cover"
                />
              </DialogClose>
            )
          })}
        </ScrollArea>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
