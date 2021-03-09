import {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useState,
} from "react"

const ErrorContext = createContext<
  [any | undefined, (err: any | undefined) => void]
>([undefined, () => {}])

export const ErrorView: FunctionComponent = () => {
  const [error, setError] = useContext(ErrorContext)
  const reset = useCallback(() => setError(undefined), [])
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
        {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
      </div>
    </a>
  )
}

export const ErrorBoundary: FunctionComponent = ({ children }) => {
  const error = useState<string | undefined>(undefined)
  return <ErrorContext.Provider value={error}>{children}</ErrorContext.Provider>
}

export const useNotifyError = () => {
  const [, setError] = useContext(ErrorContext)
  return setError
}
