import React, { createContext, useEffect, useState } from "react"
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
              const initialList = {
                id: key,
                created: null,
                lastModified: null,
                owned: [],
                mastered: [],
                intrinsics: {
                  command: 0,
                  engineering: 0,
                  gunnery: 0,
                  piloting: 0,
                  tactical: 0
                }
              }

              dataArray.push({
                ...initialList,
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
  
  useEffect(() => {
    startSetAdminChecklists()
  }, [])

  const removeChecklist = (listId) => {
    setAdminChecklistsState((prevState) => [
      ...prevState.filter((prevList) => prevList.id !== listId),
    ])
  }

  const selectAllChecklists = () => adminChecklistsState

  return (
    <AdminChecklistsContext.Provider
      value={{
        startSetAdminChecklists,
        removeChecklist,
        selectAllChecklists,
      }}
    >
      {props.children}
    </AdminChecklistsContext.Provider>
  )
}

export default AdminChecklistsProvider
