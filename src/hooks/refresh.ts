import React from "react"

const tickers = new Set()
let handle: ReturnType<typeof setInterval> | null = null
const start = () => {
  if (handle) return
  handle = setInterval(() => {
    let hasRunOnce = false
    // @ts-expect-error
    for (const ticker of tickers) {
      ticker({})
      hasRunOnce = true
    }
    if (!hasRunOnce) {
      clearInterval(handle!)
      handle = null
    }
  }, 1000)
}

export const useRefresh = () => {
  const [, setTicker] = React.useState()

  React.useEffect(() => {
    tickers.add(setTicker)
    start()
    return () => void tickers.delete(setTicker)
  }, [])
}
