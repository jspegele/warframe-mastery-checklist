import React, { useEffect, useState } from "react"
import { DateTime } from "luxon"

import { Box, Card, Grid, Skeleton, Stack, Typography } from "@mui/material"

import Timer from "./Timer"

const Events = ({ elevation = 1 }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [eventsList, setEventsList] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    fetch("https://api.warframestat.us/pc/events")
      .then((res) => res.json())
      .then(
        (result) => {
          if (isSubscribed) {
            setEventsList(result)
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
        Events
      </Typography>
      {!isLoaded && (
        <Skeleton
          variant="text"
          sx={{ color: "grey.400", fontSize: "2rem", width: "100%" }}
        />
      )}
      {isLoaded && error && (
        <Typography fontSize=".875rem">Unable to retreive events</Typography>
      )}
      {isLoaded && !error && eventsList.length === 0 && (
        <Typography fontSize=".875rem">No active events</Typography>
      )}
      {isLoaded &&
        !error &&
        eventsList.length > 0 &&
        eventsList
          .sort((a, b) => (a.expiry < b.expiry ? 1 : -1))
          .map((event) => {
            const expiry = DateTime.fromISO(event.expiry)
            const toExpiry = expiry.diff(DateTime.now().setZone("GMT"))

            return (
              <Stack
                key={event.id}
                direction="row"
                mb={2}
                spacing={1}
                width="100%"
              >
                {/* {event.mission.reward.thumbnail ? (
                  <Box component="img"src={event.mission.reward.thumbnail} alt={event.mission.reward.itemString} sx={{ alignSelf: "center", width: "100px" }} />
                ) : (
                  <Box width="100px" />
                )} */}
                <Stack flexGrow="1">
                  <Typography fontWeight="500">{event.description}</Typography>
                  <Typography fontSize=".875rem">
                    Location: {event.node}
                  </Typography>
                  <Typography fontSize=".875rem">
                    Rewards:{" "}
                    {event.rewards.map((reward) =>
                      reward.items.map(
                        (item, i) => `${i > 0 ? ", " : ""}${item}`
                      )
                    )}
                  </Typography>
                </Stack>
                <Timer timeDiff={toExpiry} />
              </Stack>
            )
          })}
    </Card>
  )
}

export default Events
