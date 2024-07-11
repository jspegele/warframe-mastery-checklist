import { useState, useEffect } from "react"
import { getDatabase, ref, get, set, push } from "firebase/database"

export const useDatabase = () => {
  const database = getDatabase()

  const loadItemsFromDatabase = () => {
    return new Promise((resolve, reject) => {
      get(ref(database, "items/"))
        .then((snap) => {
          const dataArray = []
          if (snap.exists()) {
            for (const [key, value] of Object.entries(snap.val())) {
              dataArray.push({ id: key, ...value })
            }
          }
          const sortedDataArray = dataArray.sort((a, b) => (a.name > b.name ? 1 : -1))
          resolve(sortedDataArray)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  return { loadItemsFromDatabase }
}