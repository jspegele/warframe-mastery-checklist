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

  const selectFilters = () => filtersState

  return (
    <FiltersContext.Provider
      value={{
        clearFiltersState,
        setFilters,
        selectFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export default FiltersProvider
