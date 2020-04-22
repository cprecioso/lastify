import React, { FunctionComponent } from "react"
import { mutateCurrentlyPlaying } from "../api/hooks/currently-playing"
import { mutateDevices } from "../api/hooks/devices"
import { mutateLastPlayed } from "../api/hooks/recently-played"
import DeviceSelection from "./DeviceSelection"

export const TopBar: FunctionComponent<{ hidePlayer?: boolean }> = ({
  hidePlayer,
}) => (
  <div className="root">
    <style jsx>{`
      .root {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        margin-bottom: 3em;
        padding: 0.5em;
        font-size: 1.2em;
      }

      .root > :global(:not(hr)) {
        flex-shrink: 0;
      }

      a {
        color: inherit;
        text-decoration: none;
        cursor: pointer;
      }
      a:hover {
        text-decoration: underline;
      }

      hr {
        width: 100%;
        margin: auto 1em;
        background: white;
        height: 2px;
        border: 0;
      }

      .brand {
        font-weight: bold;
      }
    `}</style>
    <a
      title={hidePlayer ? "" : "Reload data"}
      className="brand"
      onClick={React.useCallback(() => {
        mutateCurrentlyPlaying()
        mutateLastPlayed()
        mutateDevices()
      }, [])}
    >
      Lastify
    </a>
    <hr />
    {hidePlayer ? null : <DeviceSelection />}
  </div>
)

export const BottomBar: FunctionComponent = () => (
  <div className="root">
    <style jsx>{`
      .root {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        margin-top: 3em;
        padding: 0.5em;
        font-size: 1.2em;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }

      .root > :not(hr) {
        flex-shrink: 0;
      }

      hr {
        width: 100%;
        margin: auto 1em;
        background: white;
        height: 2px;
        border: 0;
      }
    `}</style>
    <div>
      <a href="https://precioso.design">Carlos Precioso</a>
    </div>
    <hr />
    <div>
      <a href="https://github.com/cprecioso/lastify">Open source</a>
    </div>
  </div>
)
