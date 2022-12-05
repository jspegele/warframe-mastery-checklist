import React, { useEffect, useState } from "react"
import { DateTime } from "luxon"

import { Box, Card, Divider, Skeleton, Stack, Typography } from "@mui/material"

import Timer from "./Timer"

import sortieIcon from "../../images/sortie.png"

const Sortie = ({ elevation = 1 }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [sortieInfo, setSortieInfo] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    fetch("https://api.warframestat.us/pc/sortie")
      .then((res) => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            setSortieInfo(result)
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
      <Stack alignItems="center" direction="row" pb={2} spacing={1}>
        <Box component="img" src={sortieIcon} sx={{ width: "22px" }} />
        <Typography component="h3" fontWeight="500">
          Sortie: {sortieInfo && `${sortieInfo.boss} (${sortieInfo.faction})`}
        </Typography>
        <Box sx={{ marginLeft: "auto !important" }}>
          {sortieInfo && sortieInfo.expiry && (
            <Timer
              timeDiff={DateTime.fromISO(sortieInfo.expiry).diff(
                DateTime.now().setZone("GMT")
              )}
            />
          )}
        </Box>
      </Stack>
      {!isLoaded && (
        <Skeleton
          variant="text"
          sx={{ color: "grey.400", fontSize: "2rem", width: "100%" }}
        />
      )}
      {isLoaded && error && "Unable to retreive sortie"}
      {isLoaded &&
        !error &&
        sortieInfo.variants.length === 0 &&
        "No active sortie"}
      {isLoaded &&
        !error &&
        sortieInfo.variants.length > 0 &&
        sortieInfo.variants
          .sort((a, b) => (a.expiry < b.expiry ? 1 : -1))
          .map((mission, i) => (
            <Box key={i}>
              <Stack spacing={0.5} width="100%">
                {i !== 0 && <Divider sx={{ my: 2 }} />}
                <Typography fontWeight="500">{mission.node}</Typography>
                <Typography fontSize=".875rem">
                  Mission: {mission.missionType}
                </Typography>
                <Typography fontSize=".875rem">
                  Conditions: {mission.modifier}
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", fontSize: ".875rem" }}
                >
                  {mission.modifierDescription}
                </Typography>
              </Stack>
            </Box>
          ))}
    </Card>
  )
}

export default Sortie
