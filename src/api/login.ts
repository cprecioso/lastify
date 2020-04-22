export const getLoginUrl = (clientId: string, redirectUrl: string | URL) => {
  const authUrl = new URL("https://accounts.spotify.com/authorize")
  authUrl.searchParams.set("client_id", clientId)
  authUrl.searchParams.set("response_type", "token")
  authUrl.searchParams.set("redirect_uri", "" + redirectUrl)
  authUrl.searchParams.set(
    "scope",
    "user-read-recently-played user-modify-playback-state user-read-playback-state streaming user-read-email user-read-private"
  )

  return authUrl.href
}

export type LoginInfo = { accessToken: string }

export const retrieveLoginInfo = (currentUrl: string): LoginInfo | null => {
  const hashPos = currentUrl.indexOf("#")

  if (hashPos !== -1) {
    const hash = currentUrl.slice(hashPos + 1)
    const urlParams = new URLSearchParams(hash)
    const accessToken = urlParams.get("access_token")

    if (accessToken) {
      return { accessToken }
    }
  }

  return null
}
