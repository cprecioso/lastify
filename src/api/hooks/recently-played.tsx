import { ComponentType, useEffect } from "react"
import useSWR, { mutate, useSWRPages } from "swr"
import { useNotifyError } from "../../components/ErrorView"
import type t from "../types"

export type Response = t.PagingObject<t.PlayHistory>

const KEY = "/v1/me/player/recently-played?limit=50"

export const mutateLastPlayed = mutate.bind(null, KEY)

export const useLastPlayed = (
  PageComponent: ComponentType<{
    plays: t.PlayHistory[]
    isValidating: boolean
  }>
) => {
  return useSWRPages<string | null, Response>(
    "recently-played",
    ({ offset, withSWR }) => {
      const { data, error, isValidating } = withSWR(
        useSWR(
          offset || KEY,
          offset
            ? {
                refreshInterval: 0,
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
              }
            : undefined
        )
      )

      const notifyError = useNotifyError()
      useEffect(() => {
        if (error) notifyError(error)
      }, [error])

      const plays = data?.items ?? []
      return <PageComponent plays={plays} isValidating={isValidating} />
    },
    ({ data }) => data?.next ?? null
  )
}
