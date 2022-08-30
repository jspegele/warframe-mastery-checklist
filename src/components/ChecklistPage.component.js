import React, { useState } from "react"
import { useParams } from "react-router-dom"

import { Box, CircularProgress, Typography } from "@mui/material"

const ChecklistPage = () => {
  const { listId } = useParams()

  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading ? (
        <Box sx={{ alignItems: "center", display: "flex", height: "80%", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography>Test: {listId}</Typography>
        </Box>
      )}
    </>
  )
}

export default ChecklistPage
