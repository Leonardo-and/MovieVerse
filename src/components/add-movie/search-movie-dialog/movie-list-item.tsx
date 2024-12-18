import { TMDBMovie } from '@/interfaces/movie-data'
import { DialogClose } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { TMDB_IMAGE_BASE_URL } from '@/utils/constants'

interface MovieListItemProps {
  movie: TMDBMovie
  onClick: () => void
  isLast: boolean
}

export function MovieListItem({ movie, onClick, isLast }: MovieListItemProps) {
  return (
    <>
      <DialogClose>
        <li
          className="flex w-full cursor-pointer items-center rounded p-2 text-center hover:bg-primary/20"
          onClick={onClick}
          tabIndex={0}
        >
          <img
            src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="h-[80px] rounded-sm object-cover"
            loading="lazy"
          />
          <div className="mx-auto px-2">
            <h2 className="font-medium">{movie.title}</h2>
            <p className="text-sm text-neutral-500">
              {format(new Date(movie.release_date), 'yyyy')}
            </p>
          </div>
        </li>
      </DialogClose>
      {!isLast && <Separator />}
    </>
  )
}
