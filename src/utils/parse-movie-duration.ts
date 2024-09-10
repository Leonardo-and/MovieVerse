import { intervalToDuration } from 'date-fns'

export const parseMovieDuration = (minutes: number): string => {
  const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 })
  const hours = duration.hours ? `${duration.hours}h` : ''
  const mins = duration.minutes ? `${duration.minutes}mins` : ''

  return `${hours} ${mins}`.trim()
}
