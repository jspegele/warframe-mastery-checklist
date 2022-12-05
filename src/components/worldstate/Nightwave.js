import React, { useEffect, useState } from "react"

import {
  Box,
  Card,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material"

import reputationIcon from "../../images/reputation.png"

const Nightwave = ({ elevation = 1 }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [challenges, setChallenges] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    fetch("https://api.warframestat.us/pc/nightwave")
      .then((res) => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            setChallenges(result.activeChallenges)
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
      <Typography component="h3" fontWeight="500" pb={3}>
        Active Nightwave Challenges
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
            Unable to retreive Nightwave challenges
          </Grid>
        )}
        {isLoaded && !error && challenges.length === 0 && (
          <Grid item xs={12}>
            No active Nightwave challenges
          </Grid>
        )}
        {isLoaded && !error && challenges.length > 0 && (
          <Grid
            container
            columns={30}
            spacing={2}
            sx={{ marginLeft: 0, width: "100%" }}
          >
            {challenges.map((challenge) => (
              <Grid item key={challenge.id} xs={15} sm={10} md={6}>
                <Paper elevation={elevation + 1} sx={{ height: "100%", p: 1 }}>
                  <Typography fontWeight="500">{challenge.title}</Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    mt={1}
                    spacing={1}
                  >
                    <Stack direction="row" spacing={1}>
                      <Box
                        component="img"
                        src={reputationIcon}
                        sx={{ width: "12px" }}
                      />
                      <Typography fontSize=".875rem">
                        {challenge.reputation}
                      </Typography>
                    </Stack>
                    <Typography fontSize=".875rem">
                      {challenge.isDaily ? "Daily" : "Weekly"}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography fontSize=".875rem">{challenge.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Card>
  )
}

export default Nightwave
