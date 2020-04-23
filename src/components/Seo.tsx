import Head from "next/head"
import { FunctionComponent } from "react"

export const IconTheming: FunctionComponent = () => (
  <Head>
    <link
      key="apple-touch-icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />
    <link
      key="icon"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    />
    <link
      key="icon"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    />
    <link key="manifest" rel="manifest" href="/site.webmanifest" />
    <link
      key="mask-icon"
      rel="mask-icon"
      href="/safari-pinned-tab.svg"
      color="#fc897b"
    />
    <meta
      key="apple-mobile-web-app-title"
      name="apple-mobile-web-app-title"
      content="Lastify"
    />
    <meta key="application-name" name="application-name" content="Lastify" />
    <meta
      key="msapplication-TileColor"
      name="msapplication-TileColor"
      content="#fc897b"
    />
    <meta key="theme-color" name="theme-color" content="#ffffff" />
  </Head>
)

export const SiteMetadata: FunctionComponent = () => (
  <Head>
    <title>Lastify</title>
    <meta key="title" name="title" content="Lastify" />
    <meta
      key="description"
      name="description"
      content="Lastify shows you the last 50 songs you listened to on Spotify. That simple."
    />
    <meta key="og:type" property="og:type" content="website" />
    <meta key="og:url" property="og:url" content="https://lastify.now.sh/" />
    <meta key="og:title" property="og:title" content="Lastify" />
    <meta
      key="og:description"
      property="og:description"
      content="Lastify shows you the last 50 songs you listened to on Spotify. That simple."
    />
    <meta
      key="og:image"
      property="og:image"
      content="https://lastify.now.sh/static/preview.jpg"
    />
    <meta
      key="twitter:card"
      property="twitter:card"
      content="summary_large_image"
    />
    <meta
      key="twitter:url"
      property="twitter:url"
      content="https://lastify.now.sh/"
    />
    <meta key="twitter:title" property="twitter:title" content="Lastify" />
    <meta
      key="twitter:description"
      property="twitter:description"
      content="Lastify shows you the last 50 songs you listened to on Spotify. That simple."
    />
    <meta
      key="twitter:image"
      property="twitter:image"
      content="https://lastify.now.sh/static/preview.jpg"
    />
  </Head>
)

export const GoogleAnalytics: FunctionComponent = () => (
  <Head>
    <script
      key="gtm"
      async
      src="https://www.googletagmanager.com/gtag/js?id=UA-60468768-5"
    />
    <script
      key="ga-init"
      dangerouslySetInnerHTML={{
        __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-60468768-5');`,
      }}
    />
  </Head>
)
