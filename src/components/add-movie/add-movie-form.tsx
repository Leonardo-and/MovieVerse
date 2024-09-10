import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { AddMovieContext } from '@/components/add-movie/add-movie-context'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TagInput } from './add-movie-form-tag-input'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  overview: z.string().min(1, { message: 'Overview is required' }),
  release_date: z.string().date('Invalid date format yyyy-mm-dd'),
  genres: z
    .array(
      z.object({
        value: z.string().min(1, { message: 'Genre is required' }).max(20),
      }),
    )
    .nonempty({ message: 'At least one genre is required' }),
  cast: z
    .array(
      z.object({
        value: z.string().min(1, { message: 'Cast is required' }).max(20),
      }),
    )
    .nonempty({ message: 'At least one cast is required' }),
})

export type FormValues = z.infer<typeof formSchema>

interface AddMovieFormPros extends React.HTMLAttributes<HTMLDivElement> {
  dialog: JSX.Element
}

export function AddMovieForm({ dialog, ...props }: AddMovieFormPros) {
  const { selectedMovie } = useContext(AddMovieContext)

  async function onSubmit(values: FormValues) {
    console.log({
      ...values,
      genres: values.genres.map((genre) => genre.value),
      cast: values.cast.map((cast) => cast.value),
    })
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      overview: '',
      release_date: '',
      genres: [],
      cast: [],
    },
  })

  useEffect(() => {
    if (selectedMovie) {
      form.reset({
        ...selectedMovie,
        genres: selectedMovie.genres.map((genre) => ({
          value: genre,
        })),
        // cast: selectedMovie.cast.map((genre) => ({
        //   value: genre,
        // })),
      })
    }
  }, [selectedMovie, form])

  return (
    <Card {...props}>
      <CardHeader className="space-y-4">
        <div className="flex w-full justify-between">
          <div>
            <CardTitle>Add movie to catalog</CardTitle>
            <CardDescription>
              Fill in the form to add a new movie
            </CardDescription>
          </div>
          {dialog}
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            id="add-movie-form"
          >
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
                <TooltipContent>YYYY-MM-DD</TooltipContent>
                <FormField
                  control={form.control}
                  name="release_date"
                  render={({ field }) => (
                    <TooltipTrigger asChild>
                      <FormItem>
                        <FormLabel>Release Date</FormLabel>
                        <FormControl>
                          <Input placeholder="1995-03-17" {...field} />
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
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
