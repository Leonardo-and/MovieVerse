import { api } from '@/lib/axios'
import Plyr from 'plyr-react'
import React from 'react'
import 'plyr-react/plyr.css'

interface VideoPlayerProps {
  movieId: string
  trailer?: boolean
}

export const VideoPlayer = React.memo(
  ({ movieId, trailer }: VideoPlayerProps) => (
    <Plyr
      source={
        trailer // TODO: meybe this isn't the best way to do it
          ? {
              type: 'video',
              sources: [
                {
                  provider: 'youtube', // FIXME: isn't working
                  src: `https://www.youtube.com/embed/bTqVqk7FSmY?autoplay=0`,
                },
              ],
            }
          : {
              type: 'video',
              sources: [
                {
                  src: `${api.getUri({
                    url: `/movies/watch/${movieId}`,
                  })}`,
                  type: 'video/mp4',
                },
              ],
            }
      }
      autoPlay // FIXME: isn't working, i don't know why. maybe because of react.memo? or the browser is blocking?
    />
  ),
)

VideoPlayer.displayName = 'VideoPlayer'
