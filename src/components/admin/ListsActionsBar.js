import React from "react"

import { Stack, TextField, Typography } from "@mui/material"

const ListsActionsBar = ({ textFilter, setTextFilter, visibleLists }) => {
  const onTextFilterChange = (e) => setTextFilter(e.target.value)

  // const getAllEmptyLists = () => {
  //   get(ref(database, "checklists")).then((snap) => {
  //     const checklistArray = []
  //     for (const [key, value] of Object.entries(snap.val())) {
  //       if (
  //         Object.keys(value).length === 1 &&
  //         value.hasOwnProperty("created")
  //       ) {
  //         checklistArray.push({
  //           num_properties: Object.keys(value).length,
  //           id: key,
  //           ...value,
  //         })
  //       }
  //     }
  //     setLists(checklistArray)
  //   })
  // }

  // const removeAllEmptyLists = () => {
  //   get(ref(database, "checklists")).then((snap) => {
  //     for (const [key, value] of Object.entries(snap.val())) {
  //       if (
  //         Object.keys(value).length === 1 &&
  //         value.hasOwnProperty("created")
  //       ) {
  //         remove(ref(database, "checklists/" + key))
  //         console.log(key + "removed")
  //       }
  //     }
  //   })
  // }

  // const getAllListsWithNothingOwned = () => {
  //   get(ref(database, "checklists")).then((snap) => {
  //     const checklistArray = []
  //     for (const [key, value] of Object.entries(snap.val())) {
  //       if (!value.hasOwnProperty("owned")) {
  //         checklistArray.push({
  //           num_properties: Object.keys(value).length,
  //           id: key,
  //           ...value,
  //         })
  //       }
  //     }
  //     setLists(checklistArray)
  //   })
  // }

  return (
    <Stack
      sx={{
        alignItems: { xs: "flex-start", sm: "center" },
        flexDirection: { xs: "column-reverse", sm: "row" },
      }}
    >
      <TextField
        label="Filter lists"
        onChange={onTextFilterChange}
        size="small"
        value={textFilter}
        sx={{ flexGrow: 1, maxWidth: "400px", width: "100%" }}
      />
      <Typography
        sx={{
          color: "text.secondary",
          flexShrink: 0,
          fontSize: ".875rem",
          mb: { xs: 1, sm: 0 },
          px: 1,
        }}
      >
        Showing {visibleLists.length} lists
      </Typography>
    </Stack>
  )
}

export default ListsActionsBar
