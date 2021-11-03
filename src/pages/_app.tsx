import type { NextPage } from "next"
import type { AppProps } from "next/app"
import { GoogleAnalytics, IconTheming, SiteMetadata } from "../components/Seo"

const LastifyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <>
    <IconTheming />
    <SiteMetadata />
    <GoogleAnalytics />
    <Component {...pageProps} />
  </>
)

export default LastifyApp
