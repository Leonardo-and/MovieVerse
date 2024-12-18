import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel'
import Card from '@/components/card'
import { Movie } from '@/interfaces/movie-data'
import { useCallback, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

interface CarouselProps {
  movies: Movie[] | undefined
  title: string
  isLoading: boolean
}

export function Carousel({ movies, title, isLoading }: CarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [slidesToScroll, setSlidesToScroll] = useState(5)
  const [carouselParts, setCarouselParts] = useState<number[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  const updateScroll = useCallback(() => {
    if (!api) return

    setSlidesToScroll(api.slidesInView().length)
    setCarouselParts(api.scrollSnapList())
    setCurrentSlide(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return

    updateScroll()

    api.on('slidesChanged', updateScroll)
    api.on('select', updateScroll)
    api.on('resize', updateScroll)

    return () => {
      api.off('slidesChanged', updateScroll)
      api.off('select', updateScroll)
      api.off('resize', updateScroll)
    }
  }, [api, updateScroll])

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between">
        <h2 className="mb-3 border-l-2 border-l-primary pl-3 font-semibold">
          {title}
        </h2>
        <div className="flex gap-0.5">
          {carouselParts.length > 1 &&
            carouselParts.map((part, index) => (
              <span
                key={`${title}-part-${part}-${index}`}
                className={cn(
                  `h-[2px] w-4 transition-all duration-500`,
                  index === currentSlide ? 'bg-primary' : 'bg-secondary',
                )}
              />
            ))}
        </div>
      </div>
      <CarouselRoot
        orientation="horizontal"
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
          slidesToScroll,
        }}
      >
        <CarouselContent className="-ml-2">
          {isLoading
            ? Array.from({ length: 30 }).map((_, index) => (
                <CarouselItem
                  key={`carousel-skeleton-item-${index}`}
                  className="basis-auto pl-2"
                >
                  <Skeleton className="h-[300px] w-[200px]" />
                </CarouselItem>
              ))
            : movies?.map((movie) => (
                <CarouselItem key={movie.id} className="basis-auto pl-2">
                  <Card movie={movie} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn('mx-24', {
            hidden: !api?.canScrollPrev(),
          })}
        />
        <CarouselNext
          className={cn('mx-24', {
            hidden: !api?.canScrollNext(),
          })}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-20 bg-gradient-to-r from-black/70 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-20 bg-gradient-to-l from-black/70 to-transparent" />
      </CarouselRoot>
    </div>
  )
}
