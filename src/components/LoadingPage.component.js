import React from "react"

import { Box, CircularProgress, Typography } from "@mui/material"

import logo from "../images/warframe-logo.png"

const LoadingPage = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: (theme) => theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        padding: "0!important",
        width: "100%",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Warframe Checklist"
        sx={{ maxWidth: { xs: "4rem", md: "6rem" }, paddingBottom: 2, width: "100%" }}
      />
      <Typography
        component="span"
        sx={{
          color: "text.secondary",
          fontFamily: "'B612', 'Roboto'",
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          fontWeight: "700",
          lineHeight: 1,
          paddingBottom: 4,
          textTransform: "uppercase",
        }}
      >
        Warframe Checklist
      </Typography>
      <CircularProgress size={50} sx={{ color: "text.secondary" }} />
    </Box>
  )
}

export default LoadingPage
