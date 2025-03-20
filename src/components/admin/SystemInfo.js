import React, { useContext } from "react"

import { Box } from "@mui/material"

import SystemAlerts from "./SystemAlerts"
import SystemVersion from "./SystemVersion"

const SystemInfo = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row"}, gap: "1rem", width: "100%" }}>
      <Box sx={{ width: { xs: "100%", sm: "67%" } }}>
        <SystemAlerts />
      </Box>
      <Box sx={{ width: { xs: "100%", sm: "33%" } }}>
        <SystemVersion />
      </Box>
    </Box>
  )
}

export default SystemInfo
