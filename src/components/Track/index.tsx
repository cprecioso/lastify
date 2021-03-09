import { FunctionComponent, useCallback } from "react"
import css from "styled-jsx/css"
import { types as t, usePlay } from "../../api"
import { useSelectedDevice } from "../../api/context"
import { Artist } from "./Artist"
import { TimeAgo } from "./TimeAgo"

export const Track: FunctionComponent<{
  track: t.Track
  playedAt: string | null
}> = ({ track, playedAt }) => {
  const play = usePlay()
  const { selectedDevice } = useSelectedDevice()

  const handleClick = useCallback(() => {
    play(track.uri, selectedDevice)
  }, [track.uri, selectedDevice])

  const albumImage = track.album.images[0].url

  const timeAgoStyle = css.resolve`
    .time-ago {
      flex-grow: 0;
      flex-shrink: 0;
      margin: 0 0.5em;
    }
  `

  return (
    <li>
      <style jsx>{`
        li {
          position: relative;
          height: 100px;
          margin: 10px;
          padding: 10px;
          overflow: hidden;
        }

        .wrapper {
          display: flex;
          flex-flow: row nowrap;
          align-content: center;
          background-color: rgba(0, 0, 0, 0.3);
          color: white;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .image {
          flex-grow: 0;
          cursor: pointer;
        }

        .image img {
          display: block;
          max-height: 100px;
          max-width: 100px;
          object-fit: cover;
        }

        .info {
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          flex-grow: 1;
          margin: 0 1em;
          overflow: hidden;
        }

        .info p {
          margin: 0;
          padding: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          overflow-wrap: break-word;
        }

        .info .artists {
          font-size: 0.8em;
          margin-top: 0.3em;
          color: lightgray;
        }

        .bg {
          background-position: center center;  
          background-size: cover;
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          filter: blur(20px);
          transform: scale(1.2);
          z-index: -1;
        }

        .image img {
          transition: border-radius 200ms ease-in-out;
        }

        .image:hover img {
          border-radius: 100%;
        }

        .is-playing .image img {
          animation: playalbum 10s linear infinite;
          border-radius: 100%;
        }

        .wrapper {
          border-top-left-radius: 50px;
          border-bottom-left-radius: 50px;
        }

        @keyframes playalbum {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      {timeAgoStyle.styles}

      <div className={`wrapper ${playedAt == null ? "is-playing" : ""}`}>
        <a onClick={handleClick} className="image" title="Play the track">
          <img crossOrigin="anonymous" src={albumImage} />
        </a>

        <div className="info">
          <p>
            <a href={track.external_urls.spotify}>{track.name}</a>
          </p>
          <p className="artists">
            {track.artists.map((artist, i) => (
              <Artist key={artist.id} first={i === 0} artist={artist} />
            ))}
          </p>
        </div>

        <TimeAgo
          className={`time-ago ${timeAgoStyle.className}`}
          timestamp={playedAt}
        />
      </div>

      <div
        style={{
          backgroundImage: `url("/api/bg?url=${encodeURIComponent(
            albumImage
          )}")`,
          color: "red",
        }}
        className="bg"
      />
    </li>
  )
}
