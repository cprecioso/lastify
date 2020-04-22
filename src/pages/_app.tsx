import { AppProps } from "next/app"
import Head from "next/head"
import { FunctionComponent } from "react"

const LastifyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
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
    <Component {...pageProps} />
  </>
)

export default LastifyApp
