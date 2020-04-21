import React, { FunctionComponent } from "react"
import type { types as t } from "../../api"

export const Artist: FunctionComponent<{
  artist: t.Artist
  first?: boolean
}> = ({ artist, first }) => (
  <span>
    <style jsx>{`
      a {
        color: inherit;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `}</style>
    {!first ? <>, </> : null}
    <a href={artist.external_urls.spotify}>{artist.name}</a>
  </span>
)
