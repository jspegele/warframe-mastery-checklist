import React, { useState, createContext } from "react"
import { getDatabase, ref, get, set, push } from "firebase/database"

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
    console.log(item)
    const { id, ...restOfItem } = item
    return new Promise((resolve, reject) => {
      if (id) {
        set(ref(database, "items/" + id), restOfItem)
          .then(() => {
            setItem(restOfItem, id)
            resolve("success")
          })
          .catch((error) => reject(error))
      } else {
        push(ref(database, "items/"), restOfItem)
          .then((response) => {
            setItem(restOfItem, response.key)
            resolve("success")
          })
          .catch((error) => reject(error))
      }
      
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
