import React, { useState, createContext } from "react"
import { getDatabase, ref, get } from "firebase/database"

export const ItemsContext = createContext()

const initialState = []

export const ItemsProvider = (props) => {
  const database = getDatabase()

  const [itemsState, setItemsState] = useState(initialState)

  const clearItemsState = () => setItemsState(initialState)

  const startSetItems = () => {
    return new Promise((resolve) => {
      get(ref(database, "items/"))
        .then((snap) => {
          console.log('database call')
          const dataArray = []
          if (snap.exists()) {
            for (const [key, value] of Object.entries(snap.val())) {
              dataArray.push({
                id: key,
                ...value,
              })
            }
          }
          setItemsState(dataArray.sort((a, b) => a.name > b.name))
          resolve(true)
        })
        .catch((error) => {
          console.error(error)
          resolve([])
        })
    })
  }

  const selectItems = () => itemsState

  return (
    <ItemsContext.Provider
      value={{
        clearItemsState,
        startSetItems,
        selectItems,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  )
}

export default ItemsProvider
