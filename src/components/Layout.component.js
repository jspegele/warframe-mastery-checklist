import React from "react"
import { Outlet } from "react-router-dom"
import { Box, CssBaseline } from "@mui/material"

import CustomizedTheme from "../app/CustomizedTheme"

const Layout = () => {
  return (
    <CustomizedTheme>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div>Header</div>
        <Outlet />
        <Box sx={{ marginTop: "auto" }}>Footer</Box>
      </Box>
    </CustomizedTheme>
  )
}

export default Layout
