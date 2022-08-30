import React, { useContext, useEffect, useState } from 'react'
import { getAuth } from "firebase/auth"

import { AuthContext } from "./contexts/AuthContext"
import { ItemsContext } from "./contexts/ItemsContext"

import AppRouter from "./app/AppRouter"
import LoadingPage from "./components/LoadingPage.component"

const App = () => {
  const auth = getAuth()
  const { setAuthState } = useContext(AuthContext)
  const { startSetItems } = useContext(ItemsContext)
  const [renderApp, setRenderApp] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      startSetItems().then(() => {
        if (user) {
          setAuthState(user)
          setRenderApp(true)
        } else {
          setRenderApp(true)
        }
      })
    })
  }, [auth, setAuthState, startSetItems])

  return (
    <>{renderApp ? <AppRouter /> : <LoadingPage />}</>
  )
}

export default App
