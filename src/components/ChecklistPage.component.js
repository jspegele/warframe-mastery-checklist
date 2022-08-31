import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Box, CircularProgress } from "@mui/material"

import { ItemsContext } from "../contexts/ItemsContext"
import { ChecklistContext } from "../contexts/ChecklistContext"

import ChecklistTabs from "./ChecklistTabs.component"

const ChecklistPage = () => {
  const { listId } = useParams()
  const { selectItems } = useContext(ItemsContext)
  const { startSetChecklist } = useContext(ChecklistContext)
  const items = selectItems()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadChecklist = () => {
      if (!listId && items.length <= 0) return
      startSetChecklist(listId, items).then(() => setLoading(false))
    }

    loadChecklist()
  }, [listId, items])

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
        <ChecklistTabs />
      )}
    </>
  )
}

export default ChecklistPage
