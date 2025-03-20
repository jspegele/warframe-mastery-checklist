import React, { useContext } from "react"

import { Box, Card, Grid, Stack, Typography } from "@mui/material"

import { ItemsContext } from "../../contexts/ItemsContext"

const AppOverview = () => {
  const { selectItems } = useContext(ItemsContext)
  const items = selectItems()

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row"}, gap: "1rem", width: "100%" }}>
      <Box sx={{ width: { xs: "100%" } }}>
        <Card sx={{ p: 2, height: "100%" }}>
          <Typography component="h3" fontWeight="500" pb={2}>
            Overview
          </Typography>
          <Grid container spacing={5} sx={{ fontSize: ".875rem" }}>
            <Grid item xs={6} sm={3}>
              <Stack>
                <Typography color="text.secondary" fontSize=".875rem" pb={1}>
                  Warframes
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <span>Standard</span>
                  <span>
                    {
                      items.filter(
                        (item) => item.category === "Warframe" && !item.prime
                      ).length
                    }
                  </span>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <span>Primes</span>
                  <span>
                    {
                      items.filter(
                        (item) => item.category === "Warframe" && item.prime
                      ).length
                    }
                  </span>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <span>Total</span>
                  <span>
                    {
                      items.filter((item) => item.category === "Warframe")
                        .length
                    }
                  </span>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Stack>
                <Typography color="text.secondary" fontSize=".875rem" pb={1}>
                  Weapons
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <span>Primaries</span>
                  <span>
                    {
                      items.filter(
                        (item) =>
                          item.category === "Weapon" && item.slot === "Primary"
                      ).length
                    }
                  </span>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <span>Secondaries</span>
                  <span>
                    {
                      items.filter(
                        (item) =>
                          item.category === "Weapon" &&
                          item.slot === "Secondary"
                      ).length
                    }
                  </span>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <span>Melees</span>
                  <span>
                    {
                      items.filter(
                        (item) =>
                          item.category === "Weapon" && item.slot === "Melee"
                      ).length
                    }
                  </span>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <span>Total</span>
                  <span>
                    {items.filter((item) => item.category === "Weapon").length}
                  </span>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Stack>
                <Typography color="text.secondary" fontSize=".875rem" pb={1}>
                  Companions
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <span>Total</span>
                  <span>
                    {
                      items.filter((item) => item.category === "Companion")
                        .length
                    }
                  </span>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Stack>
                <Typography color="text.secondary" fontSize=".875rem" pb={1}>
                  Vehicles
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <span>Total</span>
                  <span>
                    {items.filter((item) => item.category === "Vehicle").length}
                  </span>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  )
}

export default AppOverview
