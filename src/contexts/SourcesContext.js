import React, { useState, createContext } from "react"
import { getDatabase, ref, get, set, push } from "firebase/database"

export const SourcesContext = createContext()

const initialState = []

export const SourcesProvider = (props) => {
  const database = getDatabase()

  const [sourcesState, setSourcesState] = useState(initialState)

  const clearSourcesState = () => setSourcesState(initialState)

  const startSetSources = () => {
    return new Promise((resolve, reject) => {
      get(ref(database, "sources/"))
        .then((snap) => {
          const dataArray = []
          if (snap.exists()) {
            for (const [key, value] of Object.entries(snap.val())) {
              dataArray.push({
                id: key,
                ...value,
              })
            }
          }
          setSourcesState(dataArray.sort((a, b) => a.name > b.name))
          resolve("success")
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    })
  }

  const setSource = (source, id) => {
    setSourcesState(prevState => ([
      ...prevState.filter(prevSource => prevSource.id !== id),
      { id, ...source }
    ]))
  }

  const startSetSource = (source) => {
    const { id, ...restOfSource } = source
    return new Promise((resolve, reject) => {
      if (id) {
        set(ref(database, "sources/" + id), restOfSource)
          .then(() => {
            setSource(restOfSource, id)
            resolve("success")
          })
          .catch((error) => reject(error))
      } else {
        push(ref(database, "sources/"), restOfSource)
          .then((response) => {
            setSource(restOfSource, response.key)
            resolve("success")
          })
          .catch((error) => reject(error))
      }
      
    })
  }

  const selectSources = () => sourcesState

  return (
    <SourcesContext.Provider
      value={{
        clearSourcesState,
        startSetSources,
        startSetSource,
        selectSources,
      }}
    >
      {props.children}
    </SourcesContext.Provider>
  )
}

export default SourcesProvider
