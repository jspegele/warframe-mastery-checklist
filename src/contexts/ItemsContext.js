import React, { useState, createContext } from "react"
import { getDatabase, ref, get, set } from "firebase/database"

export const ItemsContext = createContext()

const initialState = []

export const ItemsProvider = (props) => {
  const database = getDatabase()

  const [itemsState, setItemsState] = useState(initialState)

  const clearItemsState = () => setItemsState(initialState)

  const startSetItems = () => {
    return new Promise((resolve, reject) => {
      get(ref(database, "items/"))
        .then((snap) => {
          console.log("database call")
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
          resolve("success")
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    })
  }

  const setItem = (item, id) => {
    setItemsState(prevState => ([
      ...prevState.filter(prevItem => prevItem.id !== id),
      { id, ...item }
    ]))
  }

  const startSetItem = (item) => {
    const { id, ...restOfItem } = item
    return new Promise((resolve, reject) => {
      const preferencePath = "items/" + id
      set(ref(database, preferencePath), restOfItem)
        .then(() => {
          setItem(restOfItem, id)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const selectItems = () => itemsState
  const selectItemsByCategory = (category) =>
    itemsState.filter((item) => item.category === category)

  return (
    <ItemsContext.Provider
      value={{
        clearItemsState,
        startSetItems,
        startSetItem,
        selectItems,
        selectItemsByCategory,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  )
}

export default ItemsProvider
