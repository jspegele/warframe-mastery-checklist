import React from "react"
import { DateTime } from "luxon"

import { Card, Grid, Typography } from "@mui/material"

import Timer from "./Timer"

const DailyReset = ({ elevation = 1 }) => {
  const dailyReset = DateTime.now()
    .setZone("GMT")
    .plus({ days: 1 })
    .startOf("day")
  const sortieReset = DateTime.now()
    .setZone("GMT")
    .plus({ days: 1 })
    .startOf("day")
    .plus({ hours: 12 })
  const now = DateTime.now().setZone("GMT")

  const toDailyReset = dailyReset.diff(now) // Luxon objects contaning milliseconds to expiration
  const toSortieReset = sortieReset.diff(now)

  return (
    <Card elevation={elevation} sx={{ p: 2 }}>
      <Typography component="h3" fontWeight="500" pb={2}>
        Daily Resets
      </Typography>
      <Grid container fontSize=".875rem" spacing={2}>
        <Grid item xs={4}>
          Global
        </Grid>
        <Grid item xs={8} textAlign="right">
          <Timer timeDiff={toDailyReset} />
        </Grid>
        <Grid item xs={4}>
          Sortie
        </Grid>
        <Grid item xs={8} textAlign="right">
          <Timer timeDiff={toSortieReset} />
        </Grid>
      </Grid>
    </Card>
  )
}

export default DailyReset
