import React, { createContext, useState } from "react"
import { getDatabase, ref, set } from "firebase/database"

export const FiltersContext = createContext()

const initialState = {
  hideOwned: false,
  hideMastered: false,
  hideUnowned: false,
  maxMr: 16,
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
      const preferencePath = "checklists/" + listId + "/preferences/" + preference
      set(ref(database, preferencePath), value)
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
