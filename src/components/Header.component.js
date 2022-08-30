import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import { Box, Button, Stack, Typography } from "@mui/material"

import { AuthContext } from "../contexts/AuthContext"

import wfLogo from "../images/warframe-logo.png"

const Header = () => {
  const navigate = useNavigate()
  const { selectUid, handleSignOut } = useContext(AuthContext)
  const uid = selectUid()

  const onAdminClick = () => navigate("/admin")

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        pb: { xs: 2, sm: 4, md: 8 },
      }}
    >
      <Box
        component={Link}
        to="/"
        sx={{
          alignItems: "center",
          color: "text.secondary",
          display: "flex",
          textDecoration: "none",
          "&:visited": {
            color: "text.secondary",
          }
        }}
      >
        <Box
          component="img"
          src={wfLogo}
          alt=""
          sx={{ height: { xs: "25px", sm: "40px", md: "60px" } }}
        />
        <Stack alignItems="center" sx={{ ml: { xs: .5, sm: 1, md: 2 } }}>
          <Typography
            component="span"
            sx={{
              fontFamily: "'B612', 'Roboto'",
              fontSize: { xs: "1.125rem", sm: "1.5rem", md: "2.5rem" },
              fontWeight: "700",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            Warframe
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: "'B612', 'Roboto'",
              fontSize: { xs: ".75rem", sm: "1rem", md: "1.5rem" },
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            Checklist
          </Typography>
        </Stack>
      </Box>
      {uid && (
        <Stack alignSelf="center" direction="row">
          <Button onClick={onAdminClick} variant="text">Admin</Button>
          <Button onClick={handleSignOut} variant="text">Logout</Button>
        </Stack>
      )}
    </Box>
  )
}

export default Header
