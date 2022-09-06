import React, { useState, useEffect } from "react"
import { DateTime } from "luxon"

import { Grid, Skeleton, Stack } from "@mui/material"

import WbSunnyIcon from "@mui/icons-material/WbSunny"
import ModeNightIcon from "@mui/icons-material/ModeNight"
import AcUnitIcon from "@mui/icons-material/AcUnit"
import FemaleIcon from "@mui/icons-material/Female"
import MaleIcon from "@mui/icons-material/Male"

import Timer from "./Timer"
import { Box } from "@mui/system"

const WorldCycle = ({ world, path }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [worldState, setWorldState] = useState({})
  const [timeDiff, setTimeDiff] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    fetch(path)
      .then((res) => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            const expiry = DateTime.fromISO(result.expiry)
            const now = DateTime.now()
            const diff = expiry.diff(now) // Luxon object contaning milliseconds to expiration

            setTimeDiff(diff)
            setWorldState(result)
            setIsLoaded(true)
          }
        },
        (error) => {
          if (isSubscribed) {
            setIsLoaded(true)
            setError(error)
          }
        }
      )

    return () => (isSubscribed = false)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Grid item xs={4} md={3} lg={2}>
        <span>{world}</span>
      </Grid>
      {isLoaded && timeDiff ? (
        error ? (
          <Grid item xs={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
            {error}
          </Grid>
        ) : (
          <>
            <Grid item xs={4} md={5} lg={6}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                {world === "Earth" || world === "Cetus" ? (
                  worldState.isDay ? (
                    <><WbSunnyIcon size="small" sx={{ color: "warning.light" }} /><span>Day</span></>
                  ) : (
                    <><ModeNightIcon size="small" sx={{ color: "grey.400" }} /><span>Night</span></>
                  )
                ) : world === "Vallis" ? (
                  worldState.isWarm ? (
                    <><WbSunnyIcon size="small" sx={{ color: "warning.light" }} /><span>Warm</span></>
                  ) : (
                    <><AcUnitIcon size="small" sx={{ color: "info.light" }} /><span>Cold</span></>
                  )
                ) : world === "Cambion" ? (
                  worldState.active === "vome" ? (
                    <><FemaleIcon size="small" sx={{ color: "info.dark" }} /><span>Vome</span></>
                  ) : (
                    <><MaleIcon size="small" sx={{ color: "warning.dark" }} /><span>Fass</span></>
                  )
                ) : (
                  "Resets in"
                )}
              </Stack>
            </Grid>
            <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Timer timeDiff={timeDiff} />
            </Grid>
          </>
        )
      ) : (
        <Skeleton variant="text" sx={{ color: "grey.400", fontSize: "1rem", maxWidth: "8rem", width: "100%" }} />
      )}
    </>
  )
}

export default WorldCycle
