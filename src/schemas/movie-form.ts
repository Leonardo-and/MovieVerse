import { z } from 'zod'

export const formSchema = z.object({
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
