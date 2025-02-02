import React from "react"

import { Box, Grid, Typography } from "@mui/material"

import IntrinsicInput from "./IntrinsicInput"
import PlexusCheckbox from "./PlexusCheckbox"

const intrinsics = ["combat", "riding", "opportunity", "endurance"]

const DrifterMastery = () => (
  <Box>
    <Typography component="h2" fontSize="1.25rem" fontWeight="500" pb={1}>
      Drifter Mastery
    </Typography>
    <Box pb={2}>
      <PlexusCheckbox />
    </Box>
    <Grid
      container
      columns={6}
      spacing={2}
      sx={{ maxWidth: { xs: "220px", sm: "330px", md: "650px" } }}
    >
      {intrinsics.map((intrinsic) => (
        <Grid item key={intrinsic} xs={3} sm={2} md={1}>
          <IntrinsicInput intrinsic={intrinsic} />
        </Grid>
      ))}
    </Grid>
    <Typography
      color="text.secondary"
      fontSize=".875rem"
      mt={2}
      maxWidth="75ch"
    >
      Each intrinsic rank awards 1500 mastery for a total of 75000
    </Typography>
  </Box>
)

export default DrifterMastery
