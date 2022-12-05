import React from "react"

import { Box, Grid, Stack, Typography } from "@mui/material"

import DailyReset from "./DailyReset"
import WorldCycles from "./WorldCycles"
import News from './News'
import Alerts from './Alerts'
import Invasions from './Invasions'
import Arbitration from "./Arbitration"
import Nightwave from "./Nightwave"

const WorldState = ({ elevation = 1 }) => {
  return (
    <Box>
      <Typography component="h2" fontSize="1.25rem" fontWeight="500">
        World State
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Nightwave elevation={elevation} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <DailyReset elevation={elevation} />
            <WorldCycles elevation={elevation} />
            <News elevation={elevation} />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <Alerts elevation={elevation} />
            <Arbitration elevation={elevation} />
            <Invasions elevation={elevation} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WorldState
