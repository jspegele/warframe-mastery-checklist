import React, { useContext } from "react"

import { Card, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import InfoIcon from "@mui/icons-material/Info"

import { ChecklistContext } from "../../contexts/ChecklistContext"
import ChecklistMasteryBreakdown from "./ChecklistMasteryBreakdown"

const masteryRanks = [
  { rank: "0", mastery: 0 },
  { rank: "1", mastery: 2500 },
  { rank: "2", mastery: 10000 },
  { rank: "3", mastery: 22500 },
  { rank: "4", mastery: 40000 },
  { rank: "5", mastery: 62500 },
  { rank: "6", mastery: 90000 },
  { rank: "7", mastery: 122500 },
  { rank: "8", mastery: 160000 },
  { rank: "9", mastery: 202500 },
  { rank: "10", mastery: 250000 },
  { rank: "11", mastery: 302500 },
  { rank: "12", mastery: 360000 },
  { rank: "13", mastery: 422500 },
  { rank: "14", mastery: 490000 },
  { rank: "15", mastery: 562000 },
  { rank: "16", mastery: 640000 },
  { rank: "17", mastery: 722500 },
  { rank: "18", mastery: 810000 },
  { rank: "19", mastery: 902500 },
  { rank: "20", mastery: 1000000 },
  { rank: "21", mastery: 1102500 },
  { rank: "22", mastery: 1210000 },
  { rank: "23", mastery: 1322500 },
  { rank: "24", mastery: 1440000 },
  { rank: "25", mastery: 1562500 },
  { rank: "26", mastery: 1690000 },
  { rank: "27", mastery: 1822500 },
  { rank: "28", mastery: 1960000 },
  { rank: "29", mastery: 2102500 },
  { rank: "30", mastery: 2250000 },
  { rank: "L1", mastery: 2397500 },
  { rank: "L2", mastery: 2545000 },
  { rank: "L3", mastery: 2692500 },
  { rank: "L4", mastery: 2840000 },
  { rank: "L5", mastery: 2987500 },
  { rank: "L6", mastery: 3315000 },
  { rank: "L7", mastery: 3282500 },
  { rank: "L8", mastery: 3430000 },
  { rank: "L9", mastery: 3577500 },
  { rank: "L10", mastery: 3725000 },
]

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const ChecklistMasteryOverview = () => {
  const { selectChecklistMastery } = useContext(ChecklistContext)
  const {
    itemMastery,
    starChartMastery,
    steelPathMastery,
    intrinsics,
    plexusMastery,
  } = selectChecklistMastery()

  // Popper
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleOpenPopover = (event) => setAnchorEl(event.currentTarget)
  const handleClosePopover = () => setAnchorEl(null)

  // total mastery from intrinsics
  let intrinsicsMastery = 0
  for (let [, value] of Object.entries(intrinsics)) {
    intrinsicsMastery += value * 1500 // 1500 mastery for each rank
  }

  const totalMastery =
    itemMastery +
    starChartMastery +
    steelPathMastery +
    intrinsicsMastery +
    plexusMastery
  const ranksAchieved = masteryRanks.filter(
    (rank) => totalMastery >= rank.mastery
  )
  const index = ranksAchieved.length - 1
  const rank = masteryRanks[index].rank
  const toNextMR = masteryRanks[index + 1].mastery - totalMastery
  const numWeapons = Math.max(
    Math.round((parseInt(toNextMR) / 3000) * 10) / 10
  ).toFixed(1)

  return (
    <Card sx={{ p: 3, width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: ".875rem",
              fontWeight: "500",
            }}
          >
            Mastery
          </Typography>
          <Stack alignItems="center" direction="row" spacing={.5}>
            <Typography fontSize="1.125rem">
              {formatNumber(totalMastery)}
            </Typography>
            <Tooltip title="View mastery breakdown">
              <IconButton onClick={handleOpenPopover}>
                <InfoIcon sx={{ fontSize: "1.125rem" }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: ".875rem",
              fontWeight: "500",
            }}
          >
            MR{rank}
          </Typography>
          <Typography sx={{ fontSize: "1.125rem" }}>
            {formatNumber(toNextMR)} to next rank
          </Typography>
          <Typography sx={{ fontSize: ".875rem", fontStyle: "italic" }}>
            ~{numWeapons} weapons
          </Typography>
        </Grid>
      </Grid>
      <ChecklistMasteryBreakdown
        anchorEl={anchorEl}
        handleClosePopover={handleClosePopover}
      />
    </Card>
  )
}

export default ChecklistMasteryOverview
