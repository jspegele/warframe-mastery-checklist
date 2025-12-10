import React, { useEffect, useState } from "react"
import { DateTime } from "luxon"
import { Box, Card, Grid, Skeleton, Stack, Typography } from "@mui/material"
import Timer from "./Timer"

const Alerts = ({ elevation = 1 }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [alertsList, setAlertsList] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    ;(async () => {
      try {
        const res = await fetch("https://api.warframestat.us/pc/alerts", { signal })
        if (!res.ok) {
          let detail = ""
          try { detail = await res.text() } catch {}
          throw new Error(`HTTP ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`)
        }
        const data = await res.json()
        setAlertsList(Array.isArray(data) ? data : [])
        setError(null)
      } catch (err) {
        if (signal.aborted) return
        setError(err instanceof Error ? err : new Error("Unknown error"))
        setAlertsList([])
      } finally {
        if (!signal.aborted) setIsLoaded(true)
      }
    })()

    return () => controller.abort()
  }, [])

  const hasAlerts = alertsList.length > 0

  return (
    <Card elevation={elevation} sx={{ p: 2 }}>
      <Typography component="h3" fontWeight="500" pb={2}>
        Alerts
      </Typography>
      <Grid container fontSize=".875rem" spacing={2}>
        {!isLoaded && (
          <Grid item xs={12}>
            <Skeleton variant="text" sx={{ color: "grey.400", fontSize: "2rem", width: "100%" }} />
          </Grid>
        )}

        {isLoaded && error && (
          <Grid item xs={12}>
            Unable to retrieve alerts
          </Grid>
        )}

        {isLoaded && !error && !hasAlerts && (
          <Grid item xs={12}>
            No active alerts
          </Grid>
        )}

        {isLoaded && !error && hasAlerts &&
          alertsList
            .slice()
            .sort((a, b) => (a?.expiry < b?.expiry ? 1 : -1))
            .map((alert) => {
              const expiryISO = alert?.expiry
              const expiry = expiryISO ? DateTime.fromISO(expiryISO) : null
              const toExpiry = expiry ? expiry.diff(DateTime.now().setZone("GMT")) : null

              const rewardThumb = alert?.mission?.reward?.thumbnail
              const rewardStr = alert?.mission?.reward?.asString
              const node = alert?.mission?.node
              const type = alert?.mission?.type
              const faction = alert?.mission?.faction
              const minLvl = alert?.mission?.minEnemyLevel
              const maxLvl = alert?.mission?.maxEnemyLevel

              return (
                <Stack key={alert?.id ?? `${expiryISO}-${node}`} direction="row" mb={2} spacing={1} width="100%">
                  {rewardThumb ? (
                    <Box
                      component="img"
                      src={rewardThumb}
                      alt={rewardStr || "Alert reward"}
                      sx={{ alignSelf: "center", width: "100px" }}
                    />
                  ) : (
                    <Box width="100px" />
                  )}

                  <Stack flexGrow={1}>
                    <Typography fontWeight="500">{node || "Unknown Node"}</Typography>
                    <Typography fontSize=".875rem">
                      {(type || "Unknown Type")} {faction ? ` - ${faction}` : ""}
                    </Typography>
                    {(minLvl != null || maxLvl != null) && (
                      <Typography fontSize=".875rem">
                        Level: {minLvl ?? "?"} - {maxLvl ?? "?"}
                      </Typography>
                    )}
                    {rewardStr && (
                      <Typography fontSize=".875rem">
                        Reward(s): {rewardStr}
                      </Typography>
                    )}
                  </Stack>

                  {toExpiry && <Timer timeDiff={toExpiry} />}
                </Stack>
              )
            })}
      </Grid>
    </Card>
  )
}

export default Alerts
