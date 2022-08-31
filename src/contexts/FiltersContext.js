import React, { createContext, useState } from "react"

export const FiltersContext = createContext()

const initialState = {
  hideOwned: false,
  hideMastered: false,
  hideUnowned: false,
  maxMr: null,
  text: "",
}

export const FiltersProvider = ({ children }) => {
  const [filtersState, setFiltersState] = useState(initialState)

  const clearFiltersState = () => setFiltersState(initialState)

  const setFilters = (filters) =>
    setFiltersState((prevState) => ({ ...prevState, ...filters }))

  const setTextFilter = (text) =>
    setFiltersState((prevState) => ({ ...prevState, text }))

  const selectFilters = () => filtersState
  const selectTextFilter = () => filtersState.text

  return (
    <FiltersContext.Provider
      value={{
        clearFiltersState,
        setFilters,
        setTextFilter,
        selectFilters,
        selectTextFilter,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export default FiltersProvider
