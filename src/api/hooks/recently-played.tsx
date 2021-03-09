import { useEffect } from "react"
import useSWR, { mutate } from "swr"
import { useNotifyError } from "../../components/ErrorView"
import type t from "../types"

export type Response = t.PagingObject<t.PlayHistory>

const KEY = "/v1/me/player/recently-played?limit=50"

export const mutateLastPlayed = mutate.bind(null, KEY)

export const useLastPlayed = () => {
  const { data, error, isValidating } = useSWR<Response>(KEY, {
    refreshInterval: 60 * 1000,
  })

  const notifyError = useNotifyError()
  useEffect(() => {
    if (error) notifyError(error)
  }, [error])

  const plays = data?.items ?? []
  return { plays, isValidating }
}
