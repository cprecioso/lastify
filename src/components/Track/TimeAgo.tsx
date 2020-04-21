import ScheduleIcon from "@material-ui/icons/Schedule"
import VolumeUpIcon from "@material-ui/icons/VolumeUp"
import React, { FunctionComponent } from "react"
import { useRefresh } from "../../hooks/refresh"
import {
  closeTimeFormat,
  exactTimeFormat,
  farTimeFormat,
  isFarTime,
  now,
  parseSpotifyTimestamp,
} from "../../util/format-date"

export const TimeAgo: FunctionComponent<{
  timestamp: string | null
  className?: string
}> = ({ timestamp, className }) => {
  useRefresh()

  const date = React.useMemo(
    () => (timestamp ? parseSpotifyTimestamp(timestamp) : null),
    [timestamp]
  )

  return (
    <div className={`wrapper ${className}`}>
      <style jsx>{`
        .wrapper {
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
        }

        time {
          margin-right: 0.3em;
        }
      `}</style>
      {date ? (
        <>
          <time dateTime={timestamp!} title={exactTimeFormat(date)}>
            {isFarTime(date) ? farTimeFormat(date) : closeTimeFormat(date)}
          </time>
          <ScheduleIcon style={{ fontSize: "1em" }} />
        </>
      ) : (
        <>
          <time>{now()}</time>
          <VolumeUpIcon style={{ fontSize: "1em" }} />
        </>
      )}
    </div>
  )
}
