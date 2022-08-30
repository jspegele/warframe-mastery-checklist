import React from "react"

import { Box, Typography } from "@mui/material"

const DashboardPage = () => {
  return (
    <Box>
      <Typography component="h1" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, pb: 2 }}>Welcome to Warframe Checklist</Typography>
      <Typography>
        Warframe Checklist is a site to help you plan what gear to grind for
        next. Check off frames, weapons, companions, etc that you already own
        and have mastered, find gear that is available to you at your current
        mastery rank, learn how to obtain it, and see how many items you need to
        master to hit the next rank.
      </Typography>
    </Box>
  )
}

export default DashboardPage
