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
  const [challenges, setChallenges] = useState([]) // default to []

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    ;(async () => {
      try {
        const res = await fetch("https://api.warframestat.us/pc/nightwave", {
          signal,
        })

        if (!res.ok) {
          let detail = ""
          try {
            detail = await res.text()
          } catch {
            /* ignore */
          }
          throw new Error(
            `HTTP ${res.status} ${res.statusText}${
              detail ? ` — ${detail}` : ""
            }`
          )
        }

        const data = await res.json()
        // use empty array if field missing
        setChallenges(
          Array.isArray(data?.activeChallenges) ? data.activeChallenges : []
        )
        setError(null)
      } catch (err) {
        if (signal.aborted) return
        setError(err instanceof Error ? err : new Error("Unknown error"))
        setChallenges([]) // ensure it’s an array so rendering stays safe
      } finally {
        if (!signal.aborted) setIsLoaded(true)
      }
    })()

    return () => controller.abort()
  }, [])

  const hasChallenges = challenges.length > 0

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
            Unable to retrieve Nightwave challenges
          </Grid>
        )}

        {isLoaded && !error && !hasChallenges && (
          <Grid item xs={12}>
            No active Nightwave challenges
          </Grid>
        )}

        {isLoaded && !error && hasChallenges && (
          <Grid
            container
            columns={30}
            spacing={2}
            sx={{ marginLeft: 0, width: "100%" }}
          >
            {challenges.map((challenge) => (
              <Grid item key={challenge.id} xs={30} sm={15} md={10} lg={6}>
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
