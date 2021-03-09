import { useEffect, useMemo } from "react"
import useSWR, { mutate } from "swr"
import { useNotifyError } from "../../components/ErrorView"
import { useSelectedDevice } from "../context"
import type t from "../types"

export type Response = { devices: t.Device[] }

export const KEY = "/v1/me/player/devices"

export const mutateDevices = mutate.bind(null, KEY)

export const useDevices = () => {
  const { data, error, isValidating } = useSWR<Response>(KEY)

  const notifyError = useNotifyError()
  useEffect(() => {
    if (error) notifyError(error)
  }, [error])

  const devices = data?.devices ?? []
  const activeDevice = useMemo(
    () =>
      devices.find((device) => device.is_active) ??
      (devices[0] as t.Device | undefined),
    [devices]
  )

  const { setSelectedDevice } = useSelectedDevice()
  useEffect(() => setSelectedDevice(activeDevice?.id), [activeDevice?.id])

  return { devices, activeDevice, isValidating }
}
