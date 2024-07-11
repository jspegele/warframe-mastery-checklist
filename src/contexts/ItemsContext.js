import React, { useState, useEffect, createContext, useCallback } from "react"
import { getDatabase, ref, get, set, push } from "firebase/database"
import { DateTime } from "luxon"
import { useLocalStorage } from "../hooks/useLocalStorage"

export const ItemsContext = createContext()

const initialState = []

const loadItemsFromDatabase = () => {
  const database = getDatabase()
  return new Promise((resolve, reject) => {
    get(ref(database, "items/"))
      .then((snap) => {
        const dataArray = []
        if (snap.exists()) {
          for (const [key, value] of Object.entries(snap.val())) {
            dataArray.push({ id: key, ...value })
          }
        }
        const sortedDataArray = dataArray.sort((a, b) =>
          a.name > b.name ? 1 : -1
        )
        resolve(sortedDataArray)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const ItemsProvider = (props) => {
  const database = getDatabase()
  const [itemsState, setItemsState] = useState(initialState)
  const [localItems, setLocalItems] = useLocalStorage(
    "checklistItems",
    initialState
  )
  const [localVersion, setLocalVersion] = useLocalStorage(
    "checklistItemsVersion",
    null
  )

  const clearItemsState = () => setItemsState(initialState)

  const startSetItems = useCallback(async () => {
    try {
      const serverVersionSnap = await get(ref(database, "itemsVersion"))
      const serverVersion = serverVersionSnap.val()

      if (localVersion !== serverVersion) {
        const data = await loadItemsFromDatabase()
        setItemsState(data)
        setLocalItems(data)
        setLocalVersion(serverVersion)
      } else {
        setItemsState(localItems)
      }
    } catch (error) {
      console.error("Error setting items", error)
    }
  }, [database, localItems, localVersion, setLocalItems, setLocalVersion])

  useEffect(() => {
    startSetItems()
  }, [startSetItems])

  const setItem = (item, id) => {
    setItemsState((prevState) => [
      ...prevState.filter((prevItem) => prevItem.id !== id),
      { id, ...item },
    ])
  }

  const startSetItem = (item) => {
    set(ref(database, "itemsVersion"), DateTime.now().toISO())

    const { id, ...restOfItem } = item
    return new Promise((resolve, reject) => {
      if (id) {
        set(ref(database, "items/" + id), restOfItem)
          .then(() => {
            setItem(restOfItem, id)
            resolve("success")
          })
          .catch(reject)
      } else {
        push(ref(database, "items/"), restOfItem)
          .then((response) => {
            setItem(restOfItem, response.key)
            resolve("success")
          })
          .catch(reject)
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
