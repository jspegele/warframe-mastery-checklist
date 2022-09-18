import React, { useContext, useState } from "react"

import { Box, Typography } from "@mui/material"

import { AdminChecklistsContext } from "../../contexts/AdminChecklistsContext"

import ListsActionsBar from "./ListsActionsBar"
import ListsTable from "./ListsTable"

const Lists = () => {
  const { selectAllChecklists } = useContext(AdminChecklistsContext)
  const [textFilter, setTextFilter] = useState("")
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("id")

  const getVisibleLists = (lists) => {
    return lists
      .filter((list) => {
        const needle = textFilter.toLowerCase()
        return (
          list.id.toLowerCase().includes(needle) ||
          list.nickname?.toLowerCase().includes(needle)
        )
      })
      .sort((a, b) => {
        const aIntrinsicsTotal = a.intrinsics
          ? a.intrinsics.command +
            a.intrinsics.engineering +
            a.intrinsics.gunnery +
            a.intrinsics.piloting +
            a.intrinsics.tactical
          : 0
        const bIntrinsicsTotal = b.intrinsics
          ? b.intrinsics.command +
            b.intrinsics.engineering +
            b.intrinsics.gunnery +
            b.intrinsics.piloting +
            b.intrinsics.tactical
          : 0

        if (orderBy === "id" && order === "asc") return a.id > b.id ? 1 : -1
        if (orderBy === "id" && order === "desc") return a.id < b.id ? 1 : -1
        if (orderBy === "created" && order === "asc") {
          if (a.created === null || a.created === "") return 1
          if (b.created === null || b.created === "") return -1
          return a.created > b.created ? 1 : a.created < b.created ? -1 : 0
        }
        if (orderBy === "created" && order === "desc") {
          if (a.created === null || a.created === "") return 1
          if (b.created === null || b.created === "") return -1
          return a.created < b.created  ? 1 : a.created > b.created ? -1 : 0
        }
        if (orderBy === "modified" && order === "asc") {
          if (a.lastModified === null || a.lastModified === "") return 1
          if (b.lastModified === null || b.lastModified === "") return -1
          return a.lastModified > b.lastModified ? 1 : a.lastModified < b.lastModified ? -1 : 0
        }
        if (orderBy === "modified" && order === "desc") {
          if (a.lastModified === null || a.lastModified === "") return 1
          if (b.lastModified === null || b.lastModified === "") return -1
          return a.lastModified < b.lastModified  ? 1 : a.lastModified > b.lastModified ? -1 : 0
        }
        if (orderBy === "owned" && order === "asc")
          return a.owned?.length > b.owned?.length ? 1 : -1
        if (orderBy === "owned" && order === "desc")
          return a.owned?.length < b.owned?.length ? 1 : -1
        if (orderBy === "mastered" && order === "asc")
          return a.mastered?.length > b.mastered?.length ? 1 : -1
        if (orderBy === "mastered" && order === "desc")
          return a.mastered?.length < b.mastered?.length ? 1 : -1
        if (orderBy === "intrinsics" && order === "asc")
          return aIntrinsicsTotal > bIntrinsicsTotal ? 1 : -1
        if (orderBy === "intrinsics" && order === "desc")
          return aIntrinsicsTotal < bIntrinsicsTotal ? 1 : -1
        return 1
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
        <ListsTable
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          visibleLists={visibleLists}
        />
      ) : (
        <Typography pt={10} textAlign="center">
          No items found
        </Typography>
      )}
    </Box>
  )
}

export default Lists
