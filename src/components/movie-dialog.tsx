import { Button } from '@/components/ui/button'
import { Movie } from '@/interfaces/movie-data'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Link } from '@tanstack/react-router'

dayjs.extend(duration)

interface MovieDialogProps {
  movie: Movie
}

export function MovieDialog({ movie }: MovieDialogProps) {
  const parseMovieDuration = (minutes: number) => {
    const duration = dayjs.duration(minutes, 'minutes')
    const hours = duration.hours() > 0 ? `${duration.hours()}h` : ''
    const minutesValue = duration.minutes() > 0 ? duration.minutes() : ''
    const minutesText = duration.minutes() === 1 ? 'min' : 'mins'
    return `${hours} ${minutesValue ? `${minutesValue}${minutesText}` : ''}`.trim()
  }

  return (
    <div className="flex flex-col">
      <div className="relative -m-6">
        <div className="absolute inset-0 bg-black opacity-40" />
        <img
          className="h-24 w-full object-cover"
          src={`http://localhost:3001/background/${movie.backgroundFilename}`}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2 rounded p-4">
        <h1 className="mb-2 text-xl font-bold">{movie.title}</h1>
        <p>
          <strong>Release:</strong> {new Date(movie.releaseDate).toUTCString()}
        </p>
        <p>{movie.genres.join(', ')}</p>
        <p>
          <strong>Duration:</strong> {parseMovieDuration(movie.duration)}
        </p>
        <p className="text-justify">
          <strong>Overview:</strong> {movie.overview}
        </p>
        <Link to="/watch/$movieId" params={{ movieId: movie.id }}>
          <Button>Play</Button>
        </Link>
      </div>
    </div>
  )
}
