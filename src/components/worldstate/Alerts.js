import React, { useEffect, useState } from "react"
import { DateTime } from "luxon"

import { Box, Card, Grid, Skeleton, Stack, Typography } from "@mui/material"

import Timer from "./Timer"

const Alerts = ({ elevation = 1 }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [alertsList, setAlertsList] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    fetch("https://api.warframestat.us/pc/alerts")
      .then((res) => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            setAlertsList(result)
            setIsLoaded(true)
          }
        },
        (error) => {
          if (isSubscribed) {
            setError(error)
            setIsLoaded(true)
          }
        }
      )

    return () => (isSubscribed = false)
  }, [])

  return (
    <Card elevation={elevation} sx={{ p: 2 }}>
      <Typography component="h3" fontWeight="500" pb={2}>
        Alerts
      </Typography>
      <Grid container fontSize=".875rem" spacing={2}>
        {!isLoaded && (
          <Grid item xs={12}>
            <Skeleton
              variant="text"
              sx={{ color: "grey.400", fontSize: "2rem", width: "100%" }}
            />
          </Grid>
        )}
        {isLoaded && error && (
          <Grid item xs={12}>
            Unable to retreive alerts
          </Grid>
        )}
        {isLoaded && !error && alertsList.length === 0 && (
          <Grid item xs={12}>
            No active alerts
          </Grid>
        )}
        {isLoaded &&
          !error &&
          alertsList.length > 0 &&
          alertsList
            .sort((a, b) => (a.expiry < b.expiry ? 1 : -1))
            .map((alert) => {
              const expiry = DateTime.fromISO(alert.expiry)
              const toExpiry = expiry.diff(DateTime.now().setZone("GMT"))

              return (
                <Stack key={alert.id} direction="row" mb={2} spacing={1} width="100%">
                  {alert.mission.reward.thumbnail ? (
                    <Box component="img"src={alert.mission.reward.thumbnail} alt={alert.mission.reward.itemString} sx={{ alignSelf: "center", width: "100px" }} />
                  ) : (
                    <Box width="100px" />
                  )}
                  <Stack flexGrow="1">
                    <Typography fontWeight="500">{alert.mission.node}</Typography>
                    <Typography fontSize=".875rem">{alert.mission.type} - {alert.mission.faction}</Typography>
                    <Typography fontSize=".875rem">Level: {alert.mission.minEnemyLevel} - {alert.mission.maxEnemyLevel}</Typography>
                    <Typography fontSize=".875rem">Reward(s): {alert.mission.reward.asString}</Typography>
                  </Stack>
                  <Timer timeDiff={toExpiry} />
                </Stack>
              )
            })}
      </Grid>
    </Card>
  )
}

export default Alerts
