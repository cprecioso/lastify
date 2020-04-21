import React from "react"
import useSWR, { mutate } from "swr"
import { useNotifyError } from "../../components/ErrorView"
import type t from "../types"

export type Response = { devices: t.Device[] }

export const KEY = "/v1/me/player/devices"

export const mutateDevices = mutate.bind(null, KEY)

export const useDevices = () => {
  const { data, error, isValidating } = useSWR<Response>(KEY)

  const notifyError = useNotifyError()
  React.useEffect(() => {
    if (error) notifyError(error)
  }, [error])

  const devices = data?.devices ?? []
  const activeDevice = React.useMemo(
    () => devices.find((device) => device.is_active),
    [devices]
  )
  return { devices, activeDevice, isValidating }
}
