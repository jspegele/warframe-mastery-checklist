import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"

import AuthProvider from "./contexts/AuthContext"

import App from "./App"

const AuthCheck = () => {
  const [authState, setAuthState] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState(user)
    })
  }, [])

  return (
    <AuthProvider value={authState === null ? null : authState}>
      <App />
    </AuthProvider>
  )
}

export default AuthCheck
