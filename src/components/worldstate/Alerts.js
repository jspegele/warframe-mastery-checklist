import React, { useEffect, useState } from "react"
import { DateTime } from "luxon"

import { Card, Grid, Skeleton, Typography } from "@mui/material"

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
                <React.Fragment key={alert.id}>
                  <Grid item xs={8}>
                    <Typography fontSize=".875rem" fontWeight="500">
                      Alert
                    </Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography fontSize=".875rem" fontWeight="500">
                      Expires
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    `${alert.mission.description} (${alert.mission.node}/$
                    {alert.mission.faction})`
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Timer timeDiff={toExpiry} />
                  </Grid>
                </React.Fragment>
              )
            })}
      </Grid>
    </Card>
  )
}

export default Alerts
