import React from "react"

import { Stack, Typography } from "@mui/material"

import AppOverview from "./AppOverview"
import AdminTabs from "./AdminTabs"

const AdminDashboardPage = () => {
  return (
    <Stack spacing={2}>
      <Typography
        component="h1"
        sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
      >
        Admin Dashboard
      </Typography>
      <AppOverview />
      <AdminTabs />
    </Stack>
  )
}

export default AdminDashboardPage
