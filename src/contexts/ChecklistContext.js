import React, { useState, createContext, useContext } from "react"
import { getDatabase, ref, get } from "firebase/database"

export const ChecklistContext = createContext()

const initialState = {
  listId: "",
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

  const [checklistState, setChecklistState] = useState(initialState)

  const clearChecklistState = () => setChecklistState(initialState)

  const startSetChecklist = (listId, items) => {
    return new Promise((resolve, reject) => {
      get(ref(database, "checklists/" + listId))
        .then((snap) => {
          console.log("database call")
          const data = snap.val()
          let itemMastery = 0

          if (data.mastered && data.mastered.length) itemMastery = calculateItemMastery(items, data)

          if (!snap.exists()) reject("Checklist not found")
          setChecklistState((prevState) => ({
            ...prevState,
            listId,
            itemMastery,
            ...data,
          }))

          resolve("success")
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    })
  }

  const selectChecklist = () => checklistState

  return (
    <ChecklistContext.Provider
      value={{
        clearChecklistState,
        startSetChecklist,
        selectChecklist,
      }}
    >
      {props.children}
    </ChecklistContext.Provider>
  )
}

export default ChecklistProvider
