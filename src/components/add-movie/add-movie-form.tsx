import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AddMovieContext } from '@/components/add-movie/add-movie-context'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TagInput } from './tag-input'
import { SearchMovieDialog } from './search-movie-dialog'
import { FormValues, formSchema } from '@/schemas/movie-form'
import { TMDB_IMAGE_BASE_URL } from '@/utils/constants'
import { useToast } from '../hooks/use-toast'
import { Button } from '../ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useCreateMovie } from '@/hooks/useCreateMovie'

const defaultFormValues = {
  title: '',
  overview: '',
  release_date: '',
  genres: [],
  cast: [],
}

export function AddMovieForm() {
  const { selectedMovie } = useContext(AddMovieContext)
  const { toast } = useToast()
  const navigate = useNavigate()
  const { isPending, mutateAsync } = useCreateMovie()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  })

  useEffect(() => {
    if (selectedMovie) {
      form.reset({
        ...selectedMovie,
        genres: selectedMovie.genres.map((genre) => ({
          value: genre,
        })),
      })
    }
  }, [selectedMovie, form])

  async function onSubmit(values: FormValues) {
    await mutateAsync(values, {
      onSuccess: ({ id }) => {
        toast({
          title: 'Success',
          description: 'Movie added successfully',
        })
        navigate({
          from: '/add-movie',
          to: '/movies/$id',
          params: { id },
        })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Failed to add movie. Please try again.',
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Add movie to catalog</CardTitle>
          <SearchMovieDialog />
        </div>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The Shawshank Redemption" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipContent>Enter date in YYYY-MM-DD format</TooltipContent>
                <FormField
                  control={form.control}
                  name="release_date"
                  render={({ field }) => (
                    <TooltipTrigger asChild>
                      <FormItem>
                        <FormLabel>Release Date</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1995-03-17"
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </TooltipTrigger>
                  )}
                />
              </Tooltip>
            </TooltipProvider>

            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A compelling story of hope and friendship in the face of adversity..."
                      className="min-h-28 resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genres"
              render={() => (
                <FormItem>
                  <FormLabel>Genres</FormLabel>
                  <FormControl>
                    <TagInput control={form.control} tag="genres" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cast"
              render={() => (
                <FormItem>
                  <FormLabel>Cast</FormLabel>
                  <FormControl>
                    <TagInput control={form.control} tag="cast" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : 'Add movie'}
            </Button>
          </form>
        </Form>
      </CardContent>
      {selectedMovie?.poster_path && (
        <img
          src={`${TMDB_IMAGE_BASE_URL}${selectedMovie.poster_path}`}
          alt=""
        />
      )}
    </Card>
  )
}
