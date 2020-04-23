import { AppProps } from "next/app"
import { FunctionComponent } from "react"
import { GoogleAnalytics, IconTheming, SiteMetadata } from "../components/Seo"

const LastifyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <IconTheming />
    <SiteMetadata />
    <GoogleAnalytics />
    <Component {...pageProps} />
  </>
)

export default LastifyApp
