import React, { useState, useEffect } from "react"

import {
  Box,
  Card,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"

const Invasions = () => {
  const theme = useTheme()
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [invasionList, setInvasionList] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    fetch("https://api.warframestat.us/pc/invasions")
      .then((res) => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            const activeInvasions = result.filter(
              (invasion) => !invasion.completed
            )
            setInvasionList(activeInvasions)
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

  const getFillColor = (faction) =>
    faction === "Grineer"
      ? theme.palette.error.dark
      : faction === "Corpus"
      ? theme.palette.info.dark
      : theme.palette.success.dark

  return (
    <Card sx={{ p: 2 }}>
      <Typography component="h3" fontWeight="500" pb={2}>
        Invasions
      </Typography>
      <Grid container fontSize=".875rem" spacing={1}>
        {!isLoaded && (
          <Grid item xs={12}>
            <Skeleton sx={{ fontSize: "2rem", mb: 3 }} />
            <Skeleton sx={{ fontSize: "2rem", mb: 3 }} />
            <Skeleton sx={{ fontSize: "2rem", mb: 3 }} />
            <Skeleton sx={{ fontSize: "2rem", mb: 3 }} />
            <Skeleton sx={{ fontSize: "2rem", mb: 3 }} />
          </Grid>
        )}
        {isLoaded && error && (
          <Grid item xs={12}>
            {error}
          </Grid>
        )}
        {isLoaded && !error && invasionList.length === 0 && (
          <Grid item xs={12}>
            No active invasions
          </Grid>
        )}
        {isLoaded &&
          !error &&
          invasionList.length > 0 &&
          invasionList.map((invasion, i) => {
            const attackFill = getFillColor(invasion.attackingFaction)
            const defendFill = getFillColor(invasion.defendingFaction)
            const fillLabel = Math.round(invasion.completion * 100) / 100 + "%"

            return (
              <Grid item key={i} xs={12}>
                <Typography fontSize=".75rem" textAlign="center">
                  {`${invasion.node} ${invasion.desc}`}
                </Typography>
                <Box
                  sx={{
                    background: `linear-gradient(
                      90deg,
                      ${attackFill} 0%,
                      ${attackFill} ${invasion.completion}%,
                      ${defendFill} ${invasion.completion}%,
                      ${defendFill} 100%)
                    `,
                    borderRadius: "3px",
                    display: "flex",
                    fontSize: ".75rem",
                    justifyContent: "center",
                    py: "2px",
                  }}
                >
                  {fillLabel}
                </Box>
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontSize=".75rem">
                    {invasion.attackerReward.asString}
                  </Typography>
                  <Typography fontSize=".75rem">
                    {invasion.defenderReward.asString}
                  </Typography>
                </Stack>
              </Grid>
            )
          })}
      </Grid>
    </Card>
  )
}

export default Invasions
