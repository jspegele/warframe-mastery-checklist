import React, { createContext, useState } from "react"
import { getDatabase, ref, set } from "firebase/database"
import { DateTime } from "luxon"

export const FiltersContext = createContext()

const initialState = {
  hideOwned: false,
  hideMastered: false,
  hideUnowned: false,
  maxMr: 17,
  text: "",
}

export const FiltersProvider = ({ children }) => {
  const database = getDatabase()

  const [filtersState, setFiltersState] = useState(initialState)

  const clearFiltersState = () => setFiltersState(initialState)

  const setFilters = (filters) =>
    setFiltersState((prevState) => ({ ...prevState, ...filters }))

  const setValue = (preference, value) => {
    setFiltersState((prevState) => ({ ...prevState, [preference]: value }))
  }

  const startSetValue = (listId, preference, value) => {
    return new Promise((resolve, reject) => {
      const listPath = "checklists/" + listId
      set(ref(database, listPath + "/lastModified"), DateTime.now().toISO())
      set(ref(database, listPath + "/preferences/" + preference), value)
        .then(() => {
          setValue(preference, value)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const selectFilters = () => filtersState
  const selectTextFilter = () => filtersState.text

  return (
    <FiltersContext.Provider
      value={{
        clearFiltersState,
        setFilters,
        setValue,
        startSetValue,
        selectFilters,
        selectTextFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export default FiltersProvider
