import React, { FunctionComponent, useContext } from "react"

const ErrorContext = React.createContext<
  [string | undefined, (err: string | undefined) => void]
>([undefined, () => {}])

export const ErrorView: FunctionComponent = () => {
  const [error, setError] = useContext(ErrorContext)
  const reset = React.useCallback(() => setError(undefined), [])
  if (!error) return null
  return (
    <a onClick={reset} title="Close error">
      <div>
        <style jsx>{`
          div {
            background: white;
            color: black;
            font-family: monospace;
            margin: 2em auto;
            padding: 1em;
            max-width: 600px;
          }
        `}</style>
        {error}
      </div>
    </a>
  )
}

export const ErrorBoundary: FunctionComponent = ({ children }) => {
  const error = React.useState<string | undefined>(undefined)
  return <ErrorContext.Provider value={error}>{children}</ErrorContext.Provider>
}

export const useNotifyError = () => {
  const [, setError] = React.useContext(ErrorContext)
  return setError
}
