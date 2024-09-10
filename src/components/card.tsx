import { Movie } from '@/interfaces/movie-data'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePersistentState } from '@/hooks/usePersistState'
import { Skeleton } from './ui/skeleton'

interface CardProps {
  movie: Movie
}

export default function Card({ movie }: CardProps) {
  const [shouldAnimateCards] = usePersistentState('animated', true)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const card = event.currentTarget
    const cardRect = card.getBoundingClientRect()
    const cardX = event.clientX - cardRect.left
    const cardY = event.clientY - cardRect.top

    const rotateX = (cardY / cardRect.height - 0.5) * -20
    const rotateY = (cardX / cardRect.width - 0.5) * 20

    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
  }

  return (
    <Link to={`/movie/${movie.id}`}>
      <img
        className="h-[300px] w-[200px] cursor-pointer rounded-md bg-gray-800 object-cover shadow-lg transition-transform duration-100"
        src={`http://localhost:3001/poster/${movie.posterFilename}`}
        alt={movie.title}
        style={{
          transform: shouldAnimateCards
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : '',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </Link>
  )
}

export function CardSkeleton() {
  return <Skeleton className="h-[300px] w-[200px] rounded-md" />
}
