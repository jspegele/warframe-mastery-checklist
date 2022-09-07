import React from "react"

import { Box, Card } from "@mui/material"

import LoginForm from "./LoginForm"

const LoginPage = () => (
  <Box
    sx={{
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      minHeight: "100%",
    }}
  >
    <Card
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        maxWidth: "25rem",
        p: 3,
        width: "100%",
      }}
    >
      <LoginForm />
    </Card>
  </Box>
)

export default LoginPage
