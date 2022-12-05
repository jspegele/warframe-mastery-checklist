import React, { useEffect, useState } from "react"
import { DateTime } from "luxon"

import {
  Card,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material"

import Timer from "./Timer"

const ArchonHunt = ({ elevation = 1 }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [archonHuntInfo, setArchonHuntInfo] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    fetch("https://api.warframestat.us/pc/archonHunt")
      .then((res) => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            setArchonHuntInfo(result)
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
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        pb={2}
        spacing={1}
      >
        <Typography component="h3" fontWeight="500">
          Archon Hunt: {archonHuntInfo && `Subdue ${archonHuntInfo.boss}`}
        </Typography>
        {archonHuntInfo && archonHuntInfo.expiry && (
          <Timer
            timeDiff={DateTime.fromISO(archonHuntInfo.expiry).diff(
              DateTime.now().setZone("GMT")
            )}
          />
        )}
      </Stack>
      {!isLoaded && (
        <Skeleton
          variant="text"
          sx={{ color: "grey.400", fontSize: "2rem", width: "100%" }}
        />
      )}
      {isLoaded && error && "Unable to retreive alerts"}
      {isLoaded &&
        !error &&
        archonHuntInfo.missions.length === 0 &&
        "No active alerts"}
      {isLoaded && !error && archonHuntInfo.missions.length > 0 && (
        <Grid container spacing={1}>
          {archonHuntInfo.missions
            .sort((a, b) => (a.expiry < b.expiry ? 1 : -1))
            .map((mission, i) => (
              <Grid key={i} item xs={12} md={4}>
                <Typography fontWeight="500">{mission.node}</Typography>
                <Typography fontSize=".875rem">{mission.type}</Typography>
              </Grid>
            ))}
        </Grid>
      )}
    </Card>
  )
}

export default ArchonHunt
