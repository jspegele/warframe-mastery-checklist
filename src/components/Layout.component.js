import React from "react"
import { Outlet } from "react-router-dom"
import { Box, Container } from "@mui/material"

import Header from "./Header.component"
import Footer from "./Footer.component"

const Layout = () => {
  return (
    <Box display="flex" minHeight="100vh">
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
