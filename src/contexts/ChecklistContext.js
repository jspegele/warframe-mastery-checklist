import React, { useState, createContext, useContext } from "react"
import { getDatabase, ref, get, set } from "firebase/database"
import { DateTime } from "luxon"

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
  plexusMastery: 0,
  preferences: {
    hideOwned: false,
    hideMastered: false,
    hideUnowned: false,
  }
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

  const startSetOwnedList = (itemId, owned) => {
    let ownedList = []
    if (owned) ownedList = [...checklistState.owned, itemId]
    else ownedList = checklistState.owned.filter((id) => id !== itemId)

    return new Promise((resolve, reject) => {
      const listPath = "checklists/" + checklistState.listId
      set(ref(database, listPath + "/lastModified"), DateTime.now().toISO())
      set(ref(database, listPath + "/owned"), ownedList)
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

  const startSetMasteredList = (itemId, mastered) => {
    let masteredList = []
    if (mastered) masteredList = [...checklistState.mastered, itemId]
    else masteredList = checklistState.mastered.filter((id) => id !== itemId)

    return new Promise((resolve, reject) => {
      const listPath = "checklists/" + checklistState.listId
      set(ref(database, listPath + "/lastModified"), DateTime.now().toISO())
      set(ref(database, listPath + "/mastered"), masteredList)
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

  const startSetItemLevel = (itemId, level) => {
    return new Promise((resolve, reject) => {
      const listPath = "checklists/" + checklistState.listId
      set(ref(database, listPath + "/lastModified"), DateTime.now().toISO())
      set(ref(database, listPath + "/levels/" + itemId), level)
        .then(() => {
          setItemLevel(itemId, level)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const setStarChartMastery = (starChartMastery) => {
    setChecklistState((prevState) => ({ ...prevState, starChartMastery }))
  }

  const startSetStarChartMastery = (starChartMastery) => {
    return new Promise((resolve, reject) => {
      const listPath = "checklists/" + checklistState.listId
      set(ref(database, listPath + "/lastModified"), DateTime.now().toISO())
      set(ref(database, listPath + "/starChartMastery"), starChartMastery)
        .then(() => {
          setStarChartMastery(starChartMastery)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const setSteelPathMastery = (steelPathMastery) => {
    setChecklistState((prevState) => ({ ...prevState, steelPathMastery }))
  }

  const startSetSteelPathMastery = (steelPathMastery) => {
    return new Promise((resolve, reject) => {
      const listPath = "checklists/" + checklistState.listId
      set(ref(database, listPath + "/lastModified"), DateTime.now().toISO())
      set(ref(database, listPath + "/steelPathMastery"), steelPathMastery)
        .then(() => {
          setSteelPathMastery(steelPathMastery)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const setIntrinsic = (intrinsic, value) => {
    setChecklistState((prevState) => ({
      ...prevState,
      intrinsics: { ...prevState.intrinsics, [intrinsic]: value },
    }))
  }

  const startSetIntrinsic = (intrinsic, value) => {
    return new Promise((resolve, reject) => {
      const listPath = "checklists/" + checklistState.listId
      set(ref(database, listPath + "/lastModified"), DateTime.now().toISO())
      set(ref(database, listPath + "/intrinsics/" + intrinsic), value)
        .then(() => {
          setIntrinsic(intrinsic, value)
          resolve("success")
        })
        .catch((error) => reject(error))
    })
  }

  const setPlexusMastery = (value) => {
    setChecklistState((prevState) => ({
      ...prevState,
      plexusMastery: value
    }))
  }

  const startSetPlexusMastery = (value) => {
    return new Promise((resolve, reject) => {
      const listPath = "checklists/" + checklistState.listId
      set(ref(database, listPath + "/lastModified"), DateTime.now().toISO())
      set(ref(database, listPath + "/plexusMastery"), value)
        .then(() => {
          setPlexusMastery(value)
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
    masteredItemsIds: checklistState.mastered,
    masteredItemsLevels: checklistState.levels,
    starChartMastery: checklistState.starChartMastery,
    steelPathMastery: checklistState.steelPathMastery,
    intrinsics: checklistState.intrinsics,
    plexusMastery: checklistState.plexusMastery,
  })
  const selectIntrinsics = () => checklistState.intrinsics
  const selectPlexusMastery = () => checklistState.plexusMastery

  return (
    <ChecklistContext.Provider
      value={{
        clearChecklistState,
        startSetChecklist,
        startSetOwnedList,
        startSetMasteredList,
        startSetItemLevel,
        startSetStarChartMastery,
        startSetSteelPathMastery,
        startSetIntrinsic,
        setPlexusMastery,
        startSetPlexusMastery,
        selectChecklist,
        selectChecklistId,
        selectChecklistPreferences,
        selectChecklistMastery,
        selectIntrinsics,
        selectPlexusMastery,
      }}
    >
      {props.children}
    </ChecklistContext.Provider>
  )
}

export default ChecklistProvider
