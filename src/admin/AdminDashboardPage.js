import React from "react"

import { Box, Typography } from "@mui/material"

import AppOverview from "./AppOverview"

const AdminDashboardPage = () => {
  return (
    <Box>
      <Typography
        component="h1"
        sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, pb: 2 }}
      >
        Admin Dashboard
      </Typography>
      <AppOverview />
    </Box>
  )
}

export default AdminDashboardPage
