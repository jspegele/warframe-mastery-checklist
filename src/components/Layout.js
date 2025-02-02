import React from "react"
import { Outlet } from "react-router-dom"
import { Box, Container } from "@mui/material"

import Header from "./Header"
import Footer from "./Footer"
import SystemAlert from "./SystemAlert"

const Layout = () => {

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <SystemAlert />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          pt: { xs: 2, md: 4 },
        }}
      >
        <Header />
        <Box display="flex" flexDirection="column" flexGrow="1">
          <Outlet />
        </Box>
        <Footer />
      </Container>
    </Box>
  )
}

export default Layout
