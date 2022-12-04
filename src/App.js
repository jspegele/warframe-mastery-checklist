import React, { useContext, useEffect, useState } from 'react'
import { getAuth } from "firebase/auth"

import { AuthContext } from "./contexts/AuthContext"
import { ItemsContext } from "./contexts/ItemsContext"
import { SourcesContext } from "./contexts/SourcesContext"

import AppRouter from "./app/AppRouter"
import LoadingPage from "./components/LoadingPage"

const App = () => {
  const auth = getAuth()
  const { setAuthState } = useContext(AuthContext)
  const { startSetItems } = useContext(ItemsContext)
  const { startSetSources } = useContext(SourcesContext)
  const [renderApp, setRenderApp] = useState(false)

  useEffect(() => {
    startSetItems()
    startSetSources()
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setAuthState(user)
        setRenderApp(true)
      } else {
        setRenderApp(true)
      }
    })
  }, [])

  return (
    <>{renderApp ? <AppRouter /> : <LoadingPage />}</>
  )
}

export default App
