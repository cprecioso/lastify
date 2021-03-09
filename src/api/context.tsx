import { useRouter } from "next/router"
import {
  ComponentType,
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { SWRConfig } from "swr"
import makeSpotifyFetcher, { SpotifyFetcher } from "./fetcher"
import { getLoginUrl, LoginInfo, retrieveLoginInfo } from "./login"

export interface APIContextValue {
  fetcher: SpotifyFetcher
  loginInfo: LoginInfo
  selectedDevice: string | undefined
  setSelectedDevice: React.Dispatch<React.SetStateAction<string | undefined>>
}

const APIContext = createContext<APIContextValue>({
  fetcher() {
    throw new Error("No APIProvider")
  },
  get loginInfo(): never {
    throw new Error("No APIProvider")
  },
  get selectedDevice(): never {
    throw new Error("No APIProvider")
  },
  setSelectedDevice() {
    throw new Error("No APIProvider")
  },
})

export type LoginButtonComponent = ComponentType<{ loginUrl: string }>

const RealAPIProvider: FunctionComponent<{
  clientId: string
  loginInfo: LoginInfo
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfo | null>>
}> = ({ loginInfo, children, setLoginInfo }) => {
  const fetcher = useMemo(
    () => makeSpotifyFetcher(loginInfo, () => setLoginInfo(null)),
    [loginInfo]
  )

  const [selectedDevice, setSelectedDevice] = useState<string | undefined>(
    undefined
  )

  return (
    <APIContext.Provider
      value={{ fetcher, selectedDevice, setSelectedDevice, loginInfo }}
    >
      <SWRConfig value={{ refreshInterval: 30 * 1000, fetcher }}>
        {children}
      </SWRConfig>
    </APIContext.Provider>
  )
}

export const APIProvider: FunctionComponent<{
  clientId: string
  redirectUrl: string | URL
  loginButton: LoginButtonComponent
}> = ({ children, clientId, loginButton: LoginButton, redirectUrl }) => {
  const router = useRouter()
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null)

  useEffect(() => {
    const loginInfo = retrieveLoginInfo(router.asPath)
    if (loginInfo) setLoginInfo(loginInfo)
  }, [router.asPath])

  if (loginInfo == null) {
    const loginUrl = getLoginUrl(clientId, redirectUrl)
    return <LoginButton loginUrl={loginUrl} />
  }

  return (
    <RealAPIProvider
      clientId={clientId}
      loginInfo={loginInfo}
      setLoginInfo={setLoginInfo}
    >
      {children}
    </RealAPIProvider>
  )
}

export const useFetcher = () => useContext(APIContext).fetcher

export const useSelectedDevice = () => {
  const { selectedDevice, setSelectedDevice } = useContext(APIContext)
  return { selectedDevice, setSelectedDevice }
}

export const useLoginInfo = () => useContext(APIContext).loginInfo
