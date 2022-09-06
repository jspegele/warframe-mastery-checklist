import React from "react"

import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box py={2} textAlign="right">
      <Typography>
        Created by{" "}
        <a href="https://justinspegele.com" target="_blank" rel="noreferrer">
          Justin Spegele
        </a>{" "}
        |{" "}
        <a
          href="https://github.com/jspegele/warframe-mastery-checklist/issues"
          target="_blank"
          rel="noreferrer"
        >
          Report Issues
        </a>
      </Typography>
    </Box>
  )
}

export default Footer
