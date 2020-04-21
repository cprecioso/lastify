import React from "react"
import { LoginButtonComponent } from "../api/context"
import { TopBar } from "./Bars"
import { ErrorView } from "./ErrorView"

const LoginButton: LoginButtonComponent = ({ loginUrl }) => {
  return (
    <div>
      <style jsx>{`
        .wrapper {
          min-height: 30vh;
          max-width: 600px;
          margin: 0 auto;
          padding: 2em;
        }

        .explanation {
          border: 2px solid white;
          padding: 1em;
        }

        .login {
          text-align: center;
          background: white;
          color: black;
          padding: 2em;
          cursor: pointer;
        }

        a {
          text-decoration: none;
          color: inherit;
          font-weight: bold;
        }

        .privacy {
          font-size: 0.8em;
          color: lightgray;
          text-align: center;
        }
      `}</style>
      <TopBar hidePlayer={true} />
      <ErrorView />
      <div className="wrapper">
        <div className="explanation">
          <p>Lastify shows you the last 50 songs you listened to on Spotify.</p>
          <p>That simple.</p>
          <p>
            If you forgot that awesome song you heard yesterday, you can come
            back here, find it, and play it.
          </p>
          <p>Only available for Spotify Premium users.</p>
        </div>

        <a href={loginUrl}>
          <p className="login">Log in with Spotify</p>
        </a>

        <p className="privacy">
          (We don't see <em>any</em> of your data. Your music is personal, so it
          should be private.)
        </p>
      </div>
    </div>
  )
}

export default LoginButton
