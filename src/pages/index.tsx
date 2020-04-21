import Head from "next/head"
import React from "react"
import { APIProvider } from "../api"
import App from "../components/App"
import { BottomBar, TopBar } from "../components/Bars"
import { ErrorBoundary, ErrorView } from "../components/ErrorView"
import LoginButton from "../components/LoginButton"

export default () => {
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
          clientId={process.env.CLIENT_ID!}
          loginButton={LoginButton}
          redirectUrl="http://localhost:3000/"
        >
          <TopBar />
          <ErrorView />
          <App />
        </APIProvider>
        <BottomBar />
      </ErrorBoundary>
    </div>
  )
}
