import { produce } from "immer"
import React from "react"
import { useNotifyError } from "../../components/ErrorView"
import { useFetcher } from "../context"
import { SpotifyFetcher } from "../fetcher"
import { mutateCurrentlyPlaying } from "./currently-playing"
import { mutateDevices, Response } from "./devices"
import { mutateLastPlayed } from "./recently-played"

const makeChangePlayer = (
  fetcher: SpotifyFetcher,
  notifyError: (err: string) => void
) => async (newId: string, forcePlay?: boolean) => {
  mutateDevices(
    produce((data: Response) => {
      if (!data) return
      for (const device of data.devices) {
        device.is_active = device.id === newId
      }
    }),
    false
  )

  try {
    await fetcher("/v1/me/player", {
      method: "PUT",
      json: { device_ids: [newId], play: forcePlay },
    })
  } catch (err) {
    notifyError("" + err)
  }
}

export const useChangePlayer = () => {
  const fetcher = useFetcher()
  const notifyError = useNotifyError()
  const changePlayer = React.useMemo(
    () => makeChangePlayer(fetcher, notifyError),
    [fetcher]
  )
  return changePlayer
}

const makePlay = (
  fetcher: SpotifyFetcher,
  notifyError: (err: string) => void
) => async (uri: string, deviceId?: string) => {
  try {
    await fetcher(
      `/v1/me/player/play${deviceId ? `?device_id=${deviceId}` : ""}`,
      {
        method: "PUT",
        json: {
          uris: [uri],
        },
      }
    )
  } catch (err) {
    notifyError("" + err)
  }

  mutateCurrentlyPlaying()
  mutateLastPlayed()
}

export const usePlay = () => {
  const fetcher = useFetcher()
  const notifyError = useNotifyError()

  const play = React.useMemo(() => makePlay(fetcher, notifyError), [fetcher])

  return play
}
