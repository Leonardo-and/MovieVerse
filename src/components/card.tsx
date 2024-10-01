import { Movie } from '@/interfaces/movie-data'
import { useCallback, useState, MouseEventHandler } from 'react'
import { Link } from '@tanstack/react-router'
import { Skeleton } from './ui/skeleton'
import { AspectRatio } from './ui/aspect-ratio'
import { clsx } from 'clsx'
import { useUserSettingsStore } from '@/stores/user-settings-store'

interface CardProps {
  movie: Movie
}

export default function Card({ movie }: CardProps) {
  const {
    settings: { animatedCards },
  } = useUserSettingsStore()
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove: MouseEventHandler<HTMLImageElement> = useCallback(
    (event) => {
      const card = event.currentTarget
      const cardRect = card.getBoundingClientRect()
      const cardX = event.clientX - cardRect.left
      const cardY = event.clientY - cardRect.top

      const rotateX = (cardY / cardRect.height - 0.5) * -20
      const rotateY = (cardX / cardRect.width - 0.5) * 20

      setRotation({ x: rotateX, y: rotateY })
    },
    [],
  )

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 })
  }, [])

  return (
    <Link to={`/movies/${movie.id}`}>
      <div className="w-[170px]">
        <AspectRatio ratio={2 / 3}>
          <img
            className="h-full w-full cursor-pointer rounded-md object-cover shadow-lg transition-transform duration-100"
            src={`http://localhost:3001/poster/${movie.posterFilename}`}
            alt={movie.title}
            style={{
              transform: clsx(
                animatedCards &&
                  `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              ),
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </AspectRatio>
      </div>
    </Link>
  )
}

export function CardSkeleton() {
  return <Skeleton className="h-[300px] w-[200px] rounded-md" />
}
