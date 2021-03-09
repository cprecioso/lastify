import type { NextPage } from "next"
import type { AppProps } from "next/app"
import Head from "next/head"
import { GoogleAnalytics, IconTheming, SiteMetadata } from "../components/Seo"

const LastifyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
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
