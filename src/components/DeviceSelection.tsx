import React, { FunctionComponent } from "react"
import { useChangePlayer, useDevices } from "../api"
import { useSelectedDevice } from "../api/context"

const DeviceSelection: FunctionComponent = () => {
  const { devices, activeDevice } = useDevices()
  const changePlayer = useChangePlayer()

  const { setSelectedDevice } = useSelectedDevice()

  const handleChange = React.useCallback((e) => {
    changePlayer(e.currentTarget.value)
  }, [])

  React.useEffect(() => {
    setSelectedDevice(activeDevice?.id)
  }, [activeDevice])

  return (
    <div>
      <style jsx>{`
        font-size: 0.9em;
        select {
          background: inherit;
          color: inherit;
          font-size: inherit;
        }
      `}</style>
      <label>
        Play in{" "}
        <select onChange={handleChange} value={activeDevice?.id}>
          <option selected disabled>
            (choose a device)
          </option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default DeviceSelection