import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Box, CircularProgress, Stack, Typography } from "@mui/material"

import { ItemsContext } from "../../contexts/ItemsContext"
import { ChecklistContext } from "../../contexts/ChecklistContext"

import ChecklistTabs from "./ChecklistTabs"
import ChecklistFilterPanel from "./ChecklistFilterPanel"
import ChecklistMasteryOverview from "./ChecklistMasteryOverview"
import BookmarkAlert from "./BookmarkAlert"
import WorldStateAccordion from "./WorldStateAccordion"

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
    // eslint-disable-next-line
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
            <Typography color="error">Unable to retreive checklist}</Typography>
          ) : (
            <CircularProgress />
          )}
        </Box>
      )}

      {!loading && (
        <Stack spacing={2}>
          <WorldStateAccordion />
          <Stack sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}>
            <Box sx={{ width: { xs: "100%", sm: "50%", lg: "34%" } }}>
              <ChecklistMasteryOverview />
            </Box>
            <Box
              sx={{
                margin: { xs: "0 0 1rem", sm: "0 0 0 1rem" },
                width: { xs: "100%", sm: "50%", lg: "66%" },
              }}
            >
              <BookmarkAlert />
            </Box>
          </Stack>
          <ChecklistFilterPanel />
          <ChecklistTabs />
        </Stack>
      )}
    </>
  )
}

export default ChecklistPage
