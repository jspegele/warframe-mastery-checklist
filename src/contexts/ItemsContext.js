import React, { useState, createContext } from "react"
import { getDatabase, ref, get, set, push } from "firebase/database"
import { DateTime } from "luxon"

export const ItemsContext = createContext()

const initialState = []

const saveToLocalStorage = (items) => {
  const database = getDatabase()

  get(ref(database, "itemsVersion"))
    .then((snap) => {
      localStorage.setItem("checklistItems", JSON.stringify(items))
      localStorage.setItem("checklistItemsVersion", JSON.stringify(snap.val()))
    })
    .catch((error) => {
      console.error(error)
    })
}

const loadItemsFromLocalStorage = () => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("checklistItems") === null) reject("Local data not found")

    resolve(JSON.parse(localStorage.getItem("checklistItems")))
  })
}

const loadItemsFromDatabase = () => {
  const database = getDatabase()

  return new Promise((resolve, reject) => {
    get(ref(database, "items/"))
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
        const sortedDataArray = dataArray.sort((a, b) => a.name > b.name)
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

  const clearItemsState = () => setItemsState(initialState)

  const startSetItems = () => {
    return new Promise((resolve, reject) => {
      // Compare versions, pull from db if local version is out of date
      const localDateText = localStorage.getItem("checklistItemsVersion") ? JSON.parse(localStorage.getItem("checklistItemsVersion")) : null
      const localDataSet = localStorage.getItem("checklistItems") ? true : false

      // Local data not set, load from server
      if (!localDateText || !localDataSet) {
        loadItemsFromDatabase()
          .then((data) => {
            setItemsState(data)
            saveToLocalStorage(data)
            resolve("success")
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
      }
      
      get(ref(database, "itemsVersion"))
        .then((snap) => {
          const serverDateText = snap.val()

          // if local version is equal, load items from localStorage
          if (localDateText === serverDateText) {
            loadItemsFromLocalStorage()
              .then((data) => {
                setItemsState(data)
                resolve("success")
              })
              .catch((error) => {
                console.error(error)
                reject(error)
              })
          } else {
            loadItemsFromDatabase()
              .then((data) => {
                setItemsState(data)
                saveToLocalStorage(data)
                resolve("success")
              })
              .catch((error) => {
                console.error(error)
                reject(error)
              })
          }
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  const setItem = (item, id) => {
    setItemsState((prevState) => [
      ...prevState.filter((prevItem) => prevItem.id !== id),
      { id, ...item },
    ])
  }

  const startSetItem = (item) => {
    // set version date
    set(ref(database, "itemsVersion"), DateTime.now().toISO())

    // set item
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
