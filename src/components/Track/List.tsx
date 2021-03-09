import type { FunctionComponent } from "react"
import { Track } from "."
import { useCurrentlyPlaying } from "../../api"

const CurrentlyPlaying: FunctionComponent = () => {
  const { play } = useCurrentlyPlaying()

  if (play) {
    return <Track key={play.item.id} track={play.item} playedAt={null} />
  } else {
    return null
  }
}

export const TrackList: FunctionComponent<{}> = ({ children }) => {
  return (
    <ul>
      <style jsx>{`
        ul {
          list-style: none;
          padding-left: 0;
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
      <CurrentlyPlaying />
      {children}
    </ul>
  )
}
