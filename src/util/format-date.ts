export const parseSpotifyTimestamp = (timestamp: string) => new Date(timestamp)

export const closeTimeFormat = (date: Date) => {
  const diff = Date.now() - +date
  if (diff > 60 * 60 * 1000) {
    return `${Math.round(diff / (60 * 60 * 1000))}h ago`
  } else {
    return `${Math.round(diff / (60 * 1000))}m ago`
  }
}

const farTimeFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "numeric",
})
export const farTimeFormat = (date: Date) => farTimeFormatter.format(date)

export const now = () => "now"

const exactTimeFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
})
export const exactTimeFormat = (date: Date) => exactTimeFormatter.format(date)

export const isFarTime = (date: Date) => Date.now() - +date > 2 * 60 * 60 * 1000
