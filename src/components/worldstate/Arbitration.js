import React, { useEffect, useState } from "react"
import { DateTime } from "luxon"

import { Box, Card, Skeleton, Stack, Typography } from "@mui/material"

import Timer from "./Timer"

const Arbitration = ({ elevation = 1 }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [arbitration, setArbitration] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    fetch("https://api.warframestat.us/pc/arbitration")
      .then((res) => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            setArbitration(result)
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
      <Stack direction="row" spacing={2} pb={2}>
        <Typography component="h3" fontWeight="500">
          Arbitration
        </Typography>
        {arbitration?.expiry && <Timer timeDiff={DateTime.fromISO(arbitration.expiry).diff(DateTime.now().setZone("GMT"))} />}
      </Stack>
      {!isLoaded && (
        <Skeleton
          variant="text"
          sx={{ color: "grey.400", fontSize: "2rem", width: "100%" }}
        />
      )}
      {isLoaded && error && (
        <Typography fontSize=".875rem">
          Unable to retreive arbitration information
        </Typography>
      )}
      {isLoaded && !error && !arbitration?.id && (
        <Typography fontSize=".875rem">
          Active arbitration not found
        </Typography>
      )}
      {isLoaded && !error && arbitration?.id && (
        <Box>
          <Typography fontSize=".875rem" fontWeight="500" pb={1}>{arbitration.node}</Typography>
          <Typography fontSize=".875rem">Mission: {arbitration.type.toUpperCase()}</Typography>
          <Typography fontSize=".875rem">Enemies: {arbitration.enemy}</Typography>
        </Box>
      )}
    </Card>
  )
}

export default Arbitration
