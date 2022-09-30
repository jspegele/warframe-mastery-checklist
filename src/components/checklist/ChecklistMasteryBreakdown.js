import React, { useContext, useEffect, useState } from "react"

import { Box, Grid, IconButton, Popover, Stack, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import { ItemsContext } from "../../contexts/ItemsContext"
import { ChecklistContext } from "../../contexts/ChecklistContext"

import { formatNumber } from "./ChecklistMasteryOverview"

const ChecklistMasteryBreakdown = ({ anchorEl, handleClosePopover }) => {
  const { selectItems } = useContext(ItemsContext)
  const items = selectItems()
  const { selectChecklistMastery } = useContext(ChecklistContext)
  const {
    masteredItemsIds,
    masteredItemsLevels,
    starChartMastery,
    steelPathMastery,
    intrinsics,
  } = selectChecklistMastery()

  const [masteredItems, setMasteredItems] = useState([])

  useEffect(() => {
    let tempArray = []

    masteredItemsIds.forEach((id) => {
      const masteryItem = items.filter((item) => item.id === id)[0]
      const masteryPerLevel =
        ["Necramech", "Warframe"].includes(masteryItem.category) ||
        ["Archwing", "Companion", "K-Drive"].includes(masteryItem.slot)
          ? 200
          : 100

      const mastery =
        masteryItem.maxLevel === 40 &&
        masteredItemsLevels.hasOwnProperty(masteryItem.id)
          ? masteredItemsLevels[masteryItem.id] * masteryPerLevel
          : masteryItem.mastery

      tempArray.push({
        id: masteryItem.id,
        category: masteryItem.category,
        slot: masteryItem.slot,
        type: masteryItem.type,
        mastery,
      })
    })
    setMasteredItems(tempArray)
  }, [])

  const getTotalWarframeMastery = () =>
    masteredItems
      .filter((item) => item.category === "Warframe")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalPrimaryMastery = () =>
    masteredItems
      .filter(
        (item) =>
          item.category === "Weapon" &&
          item.slot === "Primary" &&
          item.type !== "Kitgun"
      )
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalSecondaryMastery = () =>
    masteredItems
      .filter(
        (item) =>
          item.category === "Weapon" &&
          item.slot === "Secondary" &&
          item.type !== "Kitgun"
      )
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalMeleeMastery = () =>
    masteredItems
      .filter((item) => item.category === "Weapon" && item.slot === "Melee")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalKitgunMastery = () =>
    masteredItems
      .filter((item) => item.type === "Kitgun")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getIntrinsicsMastery = () => {
    let intrinsicsMastery = 0
    for (let [, value] of Object.entries(intrinsics)) {
      intrinsicsMastery += value * 1500 // 1500 mastery for each rank
    }
    return intrinsicsMastery
  }

  const getTotalSentinelMastery = () =>
    masteredItems
      .filter(
        (item) => item.category === "Companion" && item.type === "Sentinel"
      )
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalRoboticMastery = () =>
    masteredItems
      .filter(
        (item) =>
          item.category === "Companion" &&
          (item.slot === "Robotic" || item.slot === "Hound Weapon")
      )
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalCompanionMastery = () =>
    masteredItems
      .filter((item) => item.slot === "Companion" && item.type !== "Sentinel")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalArchwingMastery = () =>
    masteredItems
      .filter((item) => item.slot === "Archwing")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalArchgunMastery = () =>
    masteredItems
      .filter((item) => item.slot === "Arch-Gun")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalArchmeleeMastery = () =>
    masteredItems
      .filter((item) => item.slot === "Arch-Melee")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalAmpMastery = () =>
    masteredItems
      .filter((item) => item.type === "Amp")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalKDriveMastery = () =>
    masteredItems
      .filter((item) => item.slot === "K-Drive")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const getTotalNecramechMastery = () =>
    masteredItems
      .filter((item) => item.category === "Necramech")
      .reduce((accumulator, curValue) => accumulator + curValue.mastery, 0)

  const popoverOpen = Boolean(anchorEl)

  return (
    <Popover
      id="mastery-breakdown-popover"
      open={popoverOpen}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box fontSize=".875rem" p={2}>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Typography color="text.secondary" fontSize=".875rem">Mastery Breakdown</Typography>
          <IconButton onClick={handleClosePopover} size="small">
            <CloseIcon fontSize="1rem" />
          </IconButton>
        </Stack>
        <Grid container fontSize=".875rem" maxWidth="250px" mt={1} spacing={.5}>
          <Grid item xs={4}>
            {masteredItems.length > 0 &&
              formatNumber(getTotalWarframeMastery())}
          </Grid>
          <Grid item xs={8}>
            Warframes
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 && formatNumber(getTotalPrimaryMastery())}
          </Grid>
          <Grid item xs={8}>
            Primary Weapons
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 &&
              formatNumber(getTotalSecondaryMastery())}
          </Grid>
          <Grid item xs={8}>
            Secondary Weapons
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 && formatNumber(getTotalMeleeMastery())}
          </Grid>
          <Grid item xs={8}>
            Melee Weapons
          </Grid>
        </Grid>
        <Grid container fontSize=".875rem" maxWidth="250px" mt={1} spacing={.5}>
          <Grid item xs={4}>
            {masteredItems.length > 0 && formatNumber(getTotalKitgunMastery())}
          </Grid>
          <Grid item xs={8}>
            Kitguns
          </Grid>
          <Grid item xs={4}>
            {formatNumber(starChartMastery)}
          </Grid>
          <Grid item xs={8}>
            Star Chart Missions
          </Grid>
          <Grid item xs={4}>
            {formatNumber(steelPathMastery)}
          </Grid>
          <Grid item xs={8}>
            Steel Path Missions
          </Grid>
          <Grid item xs={4}>
            {formatNumber(getIntrinsicsMastery())}
          </Grid>
          <Grid item xs={8}>
            Railjack Intrinsics
          </Grid>
        </Grid>
        <Grid container fontSize=".875rem" maxWidth="250px" mt={1} spacing={.5}>
          <Grid item xs={4}>
            {masteredItems.length > 0 &&
              formatNumber(getTotalSentinelMastery())}
          </Grid>
          <Grid item xs={8}>
            Sentinels
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 && formatNumber(getTotalRoboticMastery())}
          </Grid>
          <Grid item xs={8}>
            Sentinel Weapons
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 &&
              formatNumber(getTotalCompanionMastery())}
          </Grid>
          <Grid item xs={8}>
            Companions
          </Grid>
        </Grid>
        <Grid container fontSize=".875rem" maxWidth="250px" mt={1} spacing={.5}>
          <Grid item xs={4}>
            {masteredItems.length > 0 &&
              formatNumber(getTotalArchwingMastery())}
          </Grid>
          <Grid item xs={8}>
            Archwings
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 && formatNumber(getTotalArchgunMastery())}
          </Grid>
          <Grid item xs={8}>
            Archguns
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 &&
              formatNumber(getTotalArchmeleeMastery())}
          </Grid>
          <Grid item xs={8}>
            Archmelees
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 && formatNumber(getTotalAmpMastery())}
          </Grid>
          <Grid item xs={8}>
            Amps
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 && formatNumber(getTotalKDriveMastery())}
          </Grid>
          <Grid item xs={8}>
            K-Drives
          </Grid>
          <Grid item xs={4}>
            {masteredItems.length > 0 &&
              formatNumber(getTotalNecramechMastery())}
          </Grid>
          <Grid item xs={8}>
            Necramechs
          </Grid>
        </Grid>
      </Box>
    </Popover>
  )
}

export default ChecklistMasteryBreakdown
