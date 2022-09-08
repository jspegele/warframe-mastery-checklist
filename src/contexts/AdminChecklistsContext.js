import React, { useState, createContext } from "react"
import { getDatabase, ref, get } from "firebase/database"

export const AdminChecklistsContext = createContext()

const initialState = []

export const AdminChecklistsProvider = (props) => {
  const database = getDatabase()

  const [adminChecklistsState, setAdminChecklistsState] = useState(initialState)

  const startSetAdminChecklists = () => {
    return new Promise((resolve, reject) => {
      get(ref(database, "checklists/"))
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
          setAdminChecklistsState(dataArray.sort((a, b) => a.id > b.id))
          resolve("success")
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    })
  }

  startSetAdminChecklists()

  const selectAllChecklists = () => adminChecklistsState

  return (
    <AdminChecklistsContext.Provider
      value={{
        startSetAdminChecklists,
        selectAllChecklists
      }}
    >
      {props.children}
    </AdminChecklistsContext.Provider>
  )
}

export default AdminChecklistsProvider
