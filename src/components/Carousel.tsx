import {
  Carousel as CarouselRoot,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { type CarouselApi } from '@/components/ui/carousel'
import { useCallback, useEffect, useState } from 'react'
import Card from '@/components/card'
import { UseQueryResult } from '@tanstack/react-query'
import { ApiResponse, Movie } from '@/interfaces/movie-data'

interface CarouselProps {
  movies: UseQueryResult<ApiResponse<Movie[]>, Error>
  title: string
}

export function Carousel({ movies, title }: CarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [shouldLoop, setShouldLoop] = useState<boolean>(false)
  const [carouselParts, setCarouselParts] = useState<number>(1)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const slidesToScroll = 5

  const updateLoop = useCallback(() => {
    if (api) {
      setTimeout(() => {
        setShouldLoop(true)
      }, 500)
    }
  }, [api])

  useEffect(() => {
    if (!api) return

    const handleSelect = () => {
      updateLoop()
      setCurrentSlide(api.selectedScrollSnap())
    }

    setCarouselParts(api.scrollSnapList().length)

    api.on('select', handleSelect)

    return () => {
      api.off('select', handleSelect)
    }
  }, [api, updateLoop, shouldLoop])

  useEffect(() => {
    if (api && movies.data) {
      const parts = api.scrollSnapList().length
      setCarouselParts(parts)
    }
  }, [api, movies.data])

  return (
    <div className="flex flex-col py-5">
      <div className="flex items-baseline justify-between px-9">
        <h2 className="mb-3 border-l-2 border-l-primary pl-3 font-semibold">
          {title}
        </h2>
        <div className="flex gap-0.5">
          {carouselParts !== 1 &&
            Array.from({ length: carouselParts }).map((_, i) => (
              <span
                key={i}
                className={`h-[2px] w-4 ${i === currentSlide ? 'bg-primary' : 'bg-secondary'}`}
              />
            ))}
        </div>
      </div>
      <CarouselRoot
        setApi={setApi}
        orientation="horizontal"
        opts={{
          loop: shouldLoop,
          align: shouldLoop ? 'center' : 'start',
          slidesToScroll,
        }}
        className={`group relative w-full hover:cursor-grab ${shouldLoop ? '' : 'pl-9'}`}
      >
        <CarouselContent className="-ml-2 select-none md:-ml-4">
          {movies.isLoading || !movies?.data?.data?.length || movies.isError
            ? Array.from({ length: 20 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/5 pl-2 md:basis-[18%] md:pl-4"
                >
                  <Skeleton className="flex h-[280px] w-[180px] items-center justify-center rounded-md" />
                </CarouselItem>
              ))
            : movies.data.data.map((movie) => (
                <CarouselItem
                  key={movie.id}
                  className="md:basis-1/4 lg:basis-1/5"
                >
                  <Card movie={movie} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious
          className={`mx-16 hidden group-hover:flex ${shouldLoop ? '' : 'group-hover:hidden'}`}
        />
        <CarouselNext
          className={`mx-16 hidden ${carouselParts > 1 && 'group-hover:flex'}`}
        />
        <div
          className={`pointer-events-none absolute bottom-0 left-0 top-0 hidden w-16 bg-gradient-to-r from-black/50 to-transparent group-hover:block ${shouldLoop ? '' : 'group-hover:hidden'}`}
        ></div>
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-16 bg-gradient-to-l from-black/50 to-transparent group-hover:block"></div>
      </CarouselRoot>
    </div>
  )
}
