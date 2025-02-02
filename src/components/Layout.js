import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import { Alert, Box, Container } from "@mui/material"

import { SystemAlertContext } from "../contexts/SystemAlertContext"
import Header from "./Header"
import Footer from "./Footer"

const Layout = () => {
  const { selectSystemAlert } = useContext(SystemAlertContext)
  const alert = selectSystemAlert()

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {alert?.message && (
        <Alert severity={alert.severity || "info"}>{alert.message}</Alert>
      )}
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
