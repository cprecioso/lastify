import type { NextPage } from "next"
import Head from "next/head"
import { APIProvider } from "../api"
import App from "../components/App"
import { BottomBar, TopBar } from "../components/Bars"
import { ErrorBoundary, ErrorView } from "../components/ErrorView"
import LoginButton from "../components/LoginButton"
import { SpotifyPlayback } from "../components/SpotifyPlayback"

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <style jsx>{`
        :global(body) {
          background: black;
          color: white;
          font-family: system-ui, sans-serif;
        }
      `}</style>

      <ErrorBoundary>
        <APIProvider
          clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}
          loginButton={LoginButton}
          redirectUrl={process.env.NEXT_PUBLIC_REDIRECT_URI!}
        >
          <SpotifyPlayback />
          <TopBar />
          <ErrorView />
          <App />
        </APIProvider>
        <BottomBar />
      </ErrorBoundary>
    </div>
  )
}

export default IndexPage
