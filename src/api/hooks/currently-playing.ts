import React from "react"
import useSWR, { mutate } from "swr"
import { useNotifyError } from "../../components/ErrorView"
import type t from "../types"
import { mutateLastPlayed } from "./recently-played"

type Response = t.CurrentlyPlaying
type TrackResponse = Response & { item: t.Track }

const KEY = "/v1/me/player/currently-playing"

export const mutateCurrentlyPlaying = mutate.bind(null, KEY)

export const useCurrentlyPlaying = () => {
  const { data, isValidating, error } = useSWR<Response>(KEY)

  const notifyError = useNotifyError()
  React.useEffect(() => {
    if (error) notifyError(error)
  }, [error])

  const play =
    data?.item?.type === "track" && data.is_playing
      ? (data as TrackResponse)
      : null

  React.useEffect(() => {
    if (play?.is_playing) {
      const handle = setTimeout(() => {
        mutateCurrentlyPlaying()
        mutateLastPlayed()
      }, play.item.duration_ms - (play.progress_ms || 0) + 1000)

      return () => clearTimeout(handle)
    }
  }, [play])

  return { play, isValidating }
}
