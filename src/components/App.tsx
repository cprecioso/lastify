import type { FunctionComponent } from "react"
import { useLastPlayed } from "../api"
import { Track } from "./Track"
import { TrackList } from "./Track/List"

const LoadMoreButton: FunctionComponent<{
  isLoadingMore: boolean
  loadMore: () => void
  isReachingEnd: boolean
}> = ({ isLoadingMore, isReachingEnd, loadMore }) => {
  const isEnabled = !isLoadingMore && !isReachingEnd
  return (
    <li
      onClick={isEnabled ? loadMore : undefined}
      className={isEnabled ? "" : "disabled"}
    >
      <style jsx>{`
        li {
          background: white;
          color: black;
          text-align: center;
          padding: 0.2em;
          cursor: pointer;
          margin: 2em;
        }

        li.disabled {
          background: black;
          color: white;
          cursor: auto;
        }
      `}</style>
      <p>
        {isLoadingMore ? (
          <>Loading...</>
        ) : isReachingEnd ? (
          <>That's it!</>
        ) : (
          <>Load more</>
        )}
      </p>
    </li>
  )
}

const App: FunctionComponent = ({}) => {
  const { isLoadingMore, pages, loadMore } = useLastPlayed(({ plays }) => (
    <>
      {plays.map((play) => (
        <Track
          key={play.played_at}
          track={play.track}
          playedAt={play.played_at}
        />
      ))}
    </>
  ))

  return (
    <div>
      <TrackList>
        {pages}
        <LoadMoreButton
          isLoadingMore={isLoadingMore}
          loadMore={loadMore}
          isReachingEnd={true}
        />
      </TrackList>
    </div>
  )
}

export default App
