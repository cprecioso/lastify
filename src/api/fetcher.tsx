import { LoginInfo } from "./login"
import t from "./types"

const makeSpotifyFetcher = (
  loginInfo: LoginInfo,
  resetLogin: () => void
) => async (url: string, options?: RequestInit & { json?: unknown }) => {
  const fullUrl = new URL(url, "https://api.spotify.com/").href
  const req: RequestInit = {
    ...options,
    headers: {
      Authorization: `Bearer ${loginInfo.accessToken}`,
      ...(options?.headers || {}),
    },
  }

  if (options?.json) {
    // @ts-expect-error
    delete req.json
    req.body = new Blob([JSON.stringify(options.json)], {
      type: "application/json",
    })
  }

  const res = await fetch(fullUrl, req)

  if (res.status === 204) return {}
  if (res.status === 401) {
    resetLogin()
    throw "Not logged in"
  }

  const data = await res.json()

  if (data.error) {
    const error = data.error as t.Error["error"]
    console.error(error)
    throw error
  }

  return data
}

export type SpotifyFetcher = ReturnType<typeof makeSpotifyFetcher>

export default makeSpotifyFetcher
