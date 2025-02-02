import React, { useState, createContext, useEffect } from "react"
import { getDatabase, ref, get, set } from "firebase/database"

export const SystemAlertContext = createContext()

const initialState = ""

export const SystemAlertProvider = (props) => {
  const database = getDatabase()
  const [systemAlertState, setSystemAlertState] = useState(initialState)

  useEffect(() => {
    const fetchSystemAlert = () => {
      return new Promise((resolve, reject) => {
        get(ref(database, "systemAlert/"))
          .then((snap) => {
            if (snap.exists()) {
              setSystemAlertState(snap.val())
            }
            resolve("success")
          })
          .catch((error) => {
            console.error(error)
            reject(error)
          })
      })
    }

    fetchSystemAlert()
  }, [])

  const clearSystemAlertState = () => setSystemAlertState(initialState)

  const setSystemAlert = (message) => {
    return new Promise((resolve, reject) => {
      set(ref(database, "systemAlert/"), message)
        .then(() => {
          setSystemAlertState(message)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const selectSystemAlert = () => systemAlertState

  return (
    <SystemAlertContext.Provider
      value={{
        clearSystemAlertState,
        selectSystemAlert,
        setSystemAlert,
      }}
    >
      {props.children}
    </SystemAlertContext.Provider>
  )
}

export default SystemAlertProvider
