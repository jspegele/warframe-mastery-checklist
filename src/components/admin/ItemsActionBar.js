import React, { useState } from "react"

import { Button, Stack, TextField, Typography } from "@mui/material"

import ItemModal from "./ItemModal"

const ItemsActionBar = ({ textFilter, setTextFilter, visibleItems }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const onTextFilterChange = (e) => setTextFilter(e.target.value)

  return (
    <Stack
      sx={{
        alignItems: { xs: "flex-start", sm: "center" },
        flexDirection: { xs: "column-reverse", sm: "row" },
      }}
    >
      <TextField
        label="Filter items"
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
        Showing {visibleItems.length} items
      </Typography>
      <Button
        color="info"
        onClick={handleOpenModal}
        variant="contained"
        sx={{
          flexShrink: 0,
          marginLeft: { xs: 0, sm: "auto" },
          mb: { xs: 2, sm: 0 },
        }}
      >
        Add New Item
      </Button>
      <ItemModal modalOpen={modalOpen} handleCloseModal={handleCloseModal} />
    </Stack>
  )
}

export default ItemsActionBar
