import React, { useEffect, useState } from "react"
import { DateTime } from "luxon"
import { Box, Card, Skeleton, Stack, Typography } from "@mui/material"
import Timer from "./Timer"

const Arbitration = ({ elevation = 1 }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [arbitration, setArbitration] = useState({})

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    ;(async () => {
      try {
        const res = await fetch("https://api.warframestat.us/pc/arbitration", { signal })
        if (!res.ok) {
          let detail = ""
          try { detail = await res.text() } catch {}
          throw new Error(`HTTP ${res.status} ${res.statusText}${detail ? ` — ${detail}` : ""}`)
        }
        const data = await res.json()
        setArbitration(data && typeof data === "object" ? data : {})
        setError(null)
      } catch (err) {
        if (signal.aborted) return
        setError(err instanceof Error ? err : new Error("Unknown error"))
        setArbitration({})
      } finally {
        if (!signal.aborted) setIsLoaded(true)
      }
    })()

    return () => controller.abort()
  }, [])

  const hasArb = Boolean(arbitration?.id)
  const expiryISO = arbitration?.expiry
  const timerDiff = expiryISO
    ? DateTime.fromISO(expiryISO).diff(DateTime.now().setZone("GMT"))
    : null

  return (
    <Card elevation={elevation} sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} pb={2} alignItems="center">
        <Typography component="h3" fontWeight="500">Arbitration</Typography>
        {timerDiff && <Timer timeDiff={timerDiff} />}
      </Stack>

      {!isLoaded && (
        <Skeleton variant="text" sx={{ color: "grey.400", fontSize: "2rem", width: "100%" }} />
      )}

      {isLoaded && error && (
        <Typography fontSize=".875rem">
          Unable to retrieve arbitration information
        </Typography>
      )}

      {isLoaded && !error && !hasArb && (
        <Typography fontSize=".875rem">Active arbitration not found</Typography>
      )}

      {isLoaded && !error && hasArb && (
        <Box>
          <Typography fontSize=".875rem" fontWeight="500" pb={1}>
            {arbitration?.node || "Unknown Node"}
          </Typography>
          <Typography fontSize=".875rem">
            Mission: {(arbitration?.type || "Unknown").toString().toUpperCase()}
          </Typography>
          <Typography fontSize=".875rem">
            Enemies: {arbitration?.enemy || "Unknown"}
          </Typography>
        </Box>
      )}
    </Card>
  )
}

export default Arbitration
