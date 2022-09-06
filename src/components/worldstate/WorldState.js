import React from "react"

import { Box, Grid, Stack, Typography } from "@mui/material"

import DailyReset from "./DailyReset"
import WorldCycles from "./WorldCycles"
import News from './News'
// import Alerts from './Alerts'
// import Invasions from './Invasions'

const WorldState = () => {
  return (
    <Box>
      <Typography fontSize="1.25rem" fontWeight="500">
        PC World State
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <DailyReset />
            <WorldCycles />
            <News />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            {/* <Alerts /> */}
            {/* <Invasions /> */}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WorldState
