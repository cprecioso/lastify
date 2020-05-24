import Head from "next/head"
import React, { FunctionComponent } from "react"
import { useLoginInfo } from "../api/context"
import { mutateDevices } from "../api/hooks/devices"

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?(): void
  }

  namespace Spotify {
    class Player {
      constructor(options: {
        name: string
        getOAuthToken: (cb: (accessToken: string) => void) => void
        volume?: number
      })

      connect(): Promise<boolean>
      disconnect(): void
      addListener(event: string, cb: (...args: any[]) => void): boolean
      removeListener(event: string, cb?: (...args: any[]) => void): boolean
    }
  }
}

let globalPlayer: Spotify.Player | null = null

export const SpotifyPlayback: FunctionComponent = () => {
  const [player, setPlayer] = React.useState<Spotify.Player | null>(
    globalPlayer
  )
  const loginInfo = useLoginInfo()

  React.useEffect(() => {
    if (!player) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
          name: "Lastify",
          getOAuthToken: (cb) => cb(loginInfo.accessToken),
        })
        globalPlayer = player
        setPlayer(player)
        player.connect().then(() => setTimeout(() => mutateDevices(), 1000))
      }
      return () => (window.onSpotifyWebPlaybackSDKReady = undefined)
    }
  }, [player])

  return (
    <Head>
      <script
        async
        defer
        key="spotify-playback-sdk"
        src="https://sdk.scdn.co/spotify-player.js"
      />
    </Head>
  )
}
