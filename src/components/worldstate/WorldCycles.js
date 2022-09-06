import React from "react"

import { Card, Grid, Typography } from "@mui/material"

import WorldCycle from "./WorldCycle"

const WorldCycles = () => {
  return (
    <Card sx={{ p: 2 }}>
      <Typography component="h3" fontWeight="500" pb={2}>World Cycles</Typography>
      <Grid container fontSize=".875rem" spacing={2}>
        <WorldCycle
          world="Earth"
          path="https://api.warframestat.us/pc/earthCycle"
        />
        <WorldCycle
          world="Cetus"
          path="https://api.warframestat.us/pc/cetusCycle"
        />
        <WorldCycle
          world="Vallis"
          path="https://api.warframestat.us/pc/vallisCycle"
        />
        <WorldCycle
          world="Cambion"
          path="https://api.warframestat.us/pc/cambionCycle"
        />
      </Grid>
    </Card>
  )
}

export default WorldCycles
