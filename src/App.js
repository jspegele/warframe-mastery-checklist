import React, { useContext, useEffect } from "react"

import { ItemsContext } from "./contexts/ItemsContext"
import { SourcesContext } from "./contexts/SourcesContext"

import AppRouter from "./app/AppRouter"
import ErrorBoundary from "./ErrorBoundry"

const App = () => {
  const { startSetItems } = useContext(ItemsContext)
  const { startSetSources } = useContext(SourcesContext)

  useEffect(() => {
    startSetItems()
    startSetSources()
  }, [])

  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  )
}

export default App
