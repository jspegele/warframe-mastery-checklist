import React, { useState, createContext, useContext } from "react"
import { getDatabase, ref, get, set } from "firebase/database"

import { FiltersContext } from "./FiltersContext"

export const ChecklistContext = createContext()

const initialState = {
  listId: "",
  nickname: "",
  owned: [],
  mastered: [],
  levels: [],
  itemMastery: 0,
  starChartMastery: 0,
  steelPathMastery: 0,
  intrinsics: {
    tactical: 0,
    piloting: 0,
    gunnery: 0,
    engineering: 0,
    command: 0,
  },
  preferences: {
    hideOwned: false,
    hideMastered: false,
    hideUnowned: false,
  },
}

// Calculate and set user mastery value in store
const calculateItemMastery = (items, data) => {
  let itemMastery = 0
  items.forEach((item) => {
    if (data.mastered.includes(item.id)) {
      const masteryPerLevel =
        ["Necramech", "Warframe"].includes(item.category) ||
        ["Archwing", "Companion", "K-Drive"].includes(item.slot)
          ? 200
          : 100

      const newMastery =
        item.maxLevel === 30
          ? 30 * masteryPerLevel
          : data.levels
          ? data.levels[item.id]
            ? data.levels[item.id] * masteryPerLevel
            : 30 * masteryPerLevel
          : 30 * masteryPerLevel

      itemMastery += newMastery
    }
  })
  return itemMastery
}

export const ChecklistProvider = (props) => {
  const database = getDatabase()
  const { setFilters } = useContext(FiltersContext)

  const [checklistState, setChecklistState] = useState(initialState)

  const clearChecklistState = () => setChecklistState(initialState)

  const startSetChecklist = (listId, items) => {
    return new Promise((resolve, reject) => {
      get(ref(database, "checklists/" + listId))
        .then((snap) => {
          if (!snap.exists()) reject("Checklist not found")
          console.log("database call")

          const data = snap.val()
          let itemMastery = 0

          if (data.mastered && data.mastered.length)
            itemMastery = calculateItemMastery(items, data)

          setChecklistState({
            ...initialState,
            listId,
            itemMastery,
            ...data,
          })

          // set filters with stored preferences
          if (data.preferences) setFilters(data.preferences)

          resolve("success")
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    })
  }

  const setOwnedList = (owned) => {
    setChecklistState((prevState) => ({ ...prevState, owned }))
  }

  const startSetOwnedList = (listId, itemId, owned) => {
    let ownedList = []
    if (owned) ownedList = [...checklistState.owned, itemId]
    else ownedList = checklistState.owned.filter((id) => id !== itemId)

    return new Promise((resolve, reject) => {
      const preferencePath = "checklists/" + listId + "/owned"
      set(ref(database, preferencePath), ownedList)
        .then(() => {
          setOwnedList(ownedList)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const setMasteredList = (mastered) => {
    setChecklistState((prevState) => ({ ...prevState, mastered }))
  }

  const startSetMasteredList = (listId, itemId, mastered) => {
    let masteredList = []
    if (mastered) masteredList = [...checklistState.mastered, itemId]
    else masteredList = checklistState.mastered.filter((id) => id !== itemId)

    return new Promise((resolve, reject) => {
      const preferencePath = "checklists/" + listId + "/mastered"
      set(ref(database, preferencePath), masteredList)
        .then(() => {
          setMasteredList(masteredList)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const setItemLevel = (itemId, level) => {
    const { levels, ...restOfObject } = checklistState
    setChecklistState({
      ...restOfObject,
      levels: {
        ...levels,
        [itemId]: level,
      },
    })
  }

  const startSetItemLevel = (listId, itemId, level) => {
    return new Promise((resolve, reject) => {
      const preferencePath = "checklists/" + listId + "/levels/" + itemId
      set(ref(database, preferencePath), level)
        .then(() => {
          setItemLevel(itemId, level)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const selectChecklist = () => checklistState
  const selectChecklistId = () => checklistState.listId
  const selectChecklistPreferences = () => checklistState.preferences
  const selectChecklistMastery = () => ({
    itemMastery: checklistState.itemMastery,
    starChartMastery: checklistState.starChartMastery,
    steelPathMastery: checklistState.steelPathMastery,
    intrinsics: checklistState.intrinsics,
  })

  return (
    <ChecklistContext.Provider
      value={{
        clearChecklistState,
        startSetChecklist,
        startSetOwnedList,
        startSetMasteredList,
        startSetItemLevel,
        selectChecklist,
        selectChecklistId,
        selectChecklistPreferences,
        selectChecklistMastery,
      }}
    >
      {props.children}
    </ChecklistContext.Provider>
  )
}

export default ChecklistProvider
