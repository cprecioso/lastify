import { AppProps } from "next/app"
import Head from "next/head"
import { FunctionComponent } from "react"
import { GoogleAnalytics, IconTheming, SiteMetadata } from "../components/Seo"

const LastifyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <IconTheming />
    <SiteMetadata />
    <GoogleAnalytics />
    <Head>
      <meta name="monetization" content="$precioso.design" />
    </Head>
    <Component {...pageProps} />
  </>
)

export default LastifyApp
