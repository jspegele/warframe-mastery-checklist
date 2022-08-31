import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDatabase, ref, onValue } from "firebase/database"

import { Box, CircularProgress } from "@mui/material"

import { ItemsContext } from "../contexts/ItemsContext"
import Checklist from "./Checklist.component"

const defaultChecklistState = {
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

// Create object for checklist state
const createChecklistObject = (listId, data) => ({
  listId,
  ...(data.starChartMastery && {
    starChartMastery: data.starChartMastery,
  }),
  ...(data.steelPathMastery && {
    steelPathMastery: data.steelPathMastery,
  }),
  ...(data.intrinsics && { intrinsics: data.intrinsics }),
  ...(data.owned && { owned: data.owned }),
  ...(data.mastered && { mastered: data.mastered }),
  ...(data.levels && { levels: data.levels }),
})

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

const ChecklistPage = () => {
  const database = getDatabase()
  const { listId } = useParams()
  const { selectItems } = useContext(ItemsContext)

  const [loading, setLoading] = useState(true)
  const [checklist, setChecklist] = useState(defaultChecklistState)

  const setItemMastery = (itemMastery) =>
    setChecklist((prevState) => ({ ...prevState, itemMastery }))

  useEffect(() => {
    const loadChecklist = () => {
      if (!listId) return

      const itemsRef = ref(database, "checklists/" + listId)
      onValue(itemsRef, (snap) => {
        console.log('database call')
        const data = snap.val()

        if (!data) return
        setChecklist(createChecklistObject(listId, data))

        if (!data.mastered || !data.mastered.length) return
        const items = selectItems()
        setItemMastery(calculateItemMastery(items, data))

        // Set user preferences in store
        // if (data.preferences) {
        //   setHideOwned(data.preferences.hideOwned)
        //   setHideMastered(data.preferences.hideMastered)
        // }

        setLoading(false)
      })
    }

    loadChecklist()
  }, [])

  return (
    <>
      {loading ? (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            height: "80%",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Checklist checklist={checklist} />
      )}
    </>
  )
}

export default ChecklistPage
