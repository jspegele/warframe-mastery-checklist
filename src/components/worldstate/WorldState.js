import React from "react"

import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material"

import DailyReset from "./DailyReset"
import WorldCycles from "./WorldCycles"
import News from './News'
import Alerts from './Alerts'
import Invasions from './Invasions'
import Arbitration from "./Arbitration"
import Nightwave from "./Nightwave"
import Sortie from "./Sortie"
import ArchonHunt from "./ArchonHunt"
import Events from "./Events"

const WorldState = ({ elevation = 1 }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Box>
      <Typography component="h2" fontSize="1.25rem" fontWeight="500">
        World State
      </Typography>
      {isMobile ? (
        <Stack spacing={2}>
          <Nightwave elevation={elevation} />
          <Alerts elevation={elevation} />
          {/* <Events elevation={elevation} /> */}
          <Arbitration elevation={elevation} />
          {/* <Sortie elevation={elevation} />
          <ArchonHunt elevation={elevation} />
          <Invasions elevation={elevation} />
          <DailyReset elevation={elevation} />
          <WorldCycles elevation={elevation} />
          <News elevation={elevation} /> */}
        </Stack>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Nightwave elevation={elevation} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Alerts elevation={elevation} />
              {/* <Events elevation={elevation} />
              <DailyReset elevation={elevation} />
              <WorldCycles elevation={elevation} />
              <News elevation={elevation} /> */}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Arbitration elevation={elevation} />
              {/* <Sortie elevation={elevation} />
              <ArchonHunt elevation={elevation} />
              <Invasions elevation={elevation} /> */}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default WorldState
