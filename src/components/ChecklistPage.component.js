import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Box, CircularProgress, Stack, Typography } from "@mui/material"

import { ItemsContext } from "../contexts/ItemsContext"
import { ChecklistContext } from "../contexts/ChecklistContext"

import ChecklistTabs from "./ChecklistTabs.component"
import ChecklistFilterPanel from "./ChecklistFilterPanel.component"

const ChecklistPage = () => {
  const { listId } = useParams()
  const { selectItems } = useContext(ItemsContext)
  const { startSetChecklist, selectChecklistId } = useContext(ChecklistContext)
  const items = selectItems()
  const currentListId = selectChecklistId()

  const [loading, setLoading] = useState(listId !== currentListId)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadChecklist = () => {
      if (!listId || listId === currentListId || items.length <= 0) return
      startSetChecklist(listId, items)
        .then(() => setLoading(false))
        .catch((err) => setError(err))
    }

    loadChecklist()
  }, [listId, currentListId, items])

  return (
    <>
      {loading && (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            height: "80%",
            justifyContent: "center",
          }}
        >
          {!!error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <CircularProgress />
          )}
        </Box>
      )}

      {!loading && (
        <Stack spacing={2}>
          <ChecklistFilterPanel />
          <ChecklistTabs />
        </Stack>
      )}
    </>
  )
}

export default ChecklistPage
