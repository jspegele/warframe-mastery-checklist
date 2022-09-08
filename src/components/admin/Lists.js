import React, { useContext, useState } from "react"

import { Box, Typography } from "@mui/material"

import { AdminChecklistsContext } from "../../contexts/AdminChecklistsContext"

import ListsActionsBar from "./ListsActionsBar"
import ListsTable from "./ListsTable"

const Lists = () => {
  const { selectAllChecklists } = useContext(AdminChecklistsContext)
  const [textFilter, setTextFilter] = useState("")

  const getVisibleLists = (lists) => {
    return lists
      .filter((list) => {
        const needle = textFilter.toLowerCase()
        return (
          list.id.toLowerCase().includes(needle) ||
          list.nickname?.toLowerCase().includes(needle)
        )
      })
  }

  const visibleLists = getVisibleLists(selectAllChecklists())

  return (
    <Box>
      <ListsActionsBar
        textFilter={textFilter}
        setTextFilter={setTextFilter}
        visibleLists={visibleLists}
      />
      {visibleLists?.length > 0 ? (
        <ListsTable visibleLists={visibleLists} />
      ) : (
        <Typography pt={10} textAlign="center">
          No items found
        </Typography>
      )}
    </Box>
  )
}

export default Lists
