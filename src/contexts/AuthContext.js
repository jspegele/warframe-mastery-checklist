import React, { useEffect, useState, createContext } from "react"
import { getAuth, signOut } from "firebase/auth"

export const AuthContext = createContext()

const initialState = {
  uid: "",
}

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(initialState)
  const auth = getAuth()

  useEffect(() => {
    setAuthState(props.value)
  }, [props.value])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        clearAuthState()
      })
      .catch((error) => {
        console.log("error signing out", error)
      })
  }

  const clearAuthState = () => setAuthState(initialState)
  const selectUser = () => authState
  const selectUid = () => authState?.uid ? authState.uid : null

  return (
    <AuthContext.Provider
      value={{
        setAuthState,
        clearAuthState,
        handleSignOut,
        selectUser,
        selectUid,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
