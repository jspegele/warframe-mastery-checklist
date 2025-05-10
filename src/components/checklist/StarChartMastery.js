import React, { useContext, useState } from "react"

import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material"

import { ChecklistContext } from "../../contexts/ChecklistContext"

const maxStarChartMastery = 27519

const StarChartMastery = () => {
  const { startSetStarChartMastery, startSetSteelPathMastery, selectChecklistMastery } = useContext(ChecklistContext)
  const mastery = selectChecklistMastery()

  const [starChartValue, setStarChartValue] = useState(mastery.starChartMastery)
  const [starChartCompleted, setStarChartCompleted] = useState(mastery.starChartMastery === maxStarChartMastery)
  const [archivedStarChartInput, setArchivedStarChartInput] = useState(0)
  const [steelPathValue, setSteelPathValue] = useState(mastery.steelPathMastery)
  const [steelPathCompleted, setSteelPathCompleted] = useState(mastery.steelPathMastery === maxStarChartMastery)
  const [archivedSteelPathInput, setArchivedSteelPathInput] = useState(0)

  const onStarChartValueChange = (e) => {
    const value = e.target.value
    if (
      !value ||
      (value.match(/^\d+$/g) && value >= 0 && value <= maxStarChartMastery)
    ) {
      const intValue = !value ? 0 : parseInt(value)
      setStarChartValue(intValue)
      startSetStarChartMastery(intValue)
    }
  }

  const onStarChartCompletedChange = () => {
    if (starChartCompleted) {
      setStarChartCompleted(false)
      setStarChartValue(archivedStarChartInput)
      startSetStarChartMastery(archivedStarChartInput)
    } else {
      setStarChartCompleted(true)
      setStarChartValue(maxStarChartMastery)
      startSetStarChartMastery(maxStarChartMastery)
      setArchivedStarChartInput(starChartValue)
    }
  }

  const onSteelPathValueChange = (e) => {
    const value = e.target.value
    if (
      !value ||
      (value.match(/^\d+$/g) && value >= 0 && value <= maxStarChartMastery)
    ) {
      const intValue = !value ? 0 : parseInt(value)
      setSteelPathValue(intValue)
      startSetSteelPathMastery(intValue)
    }
  }

  const onSteelPathCompletedChange = () => {
    if (steelPathCompleted) {
      setSteelPathCompleted(false)
      setSteelPathValue(archivedSteelPathInput)
      startSetSteelPathMastery(archivedSteelPathInput)
    } else {
      setSteelPathCompleted(true)
      setSteelPathValue(maxStarChartMastery)
      startSetSteelPathMastery(maxStarChartMastery)
      setArchivedSteelPathInput(steelPathValue)
    }
  }

  return (
    <Box>
      <Typography component="h2" fontSize="1.25rem" fontWeight="500">
        Star Chart Mastery
      </Typography>
      <Grid container mt={1} spacing={2}>
        <Grid
          item
          xs={12}
          sm={2}
          lg={1}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <Typography component="span" fontSize=".875rem">
            Normal
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <TextField
            disabled={starChartCompleted}
            fullWidth
            label="Mastery Value"
            onChange={onStarChartValueChange}
            size="small"
            value={starChartValue}
            sx={{ maxWidth: "12rem" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={7}
          lg={9}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={starChartCompleted}
                onChange={onStarChartCompletedChange}
                size="small"
              />
            }
            label="All nodes and junctions complete"
            size="small"
            sx={{ mr: 3, "& > span": { fontSize: ".875rem" } }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          lg={1}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <Typography component="span" fontSize=".875rem">
            Steel Path
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <TextField
            disabled={steelPathCompleted}
            fullWidth
            label="Mastery Value"
            onChange={onSteelPathValueChange}
            size="small"
            value={steelPathValue}
            sx={{ maxWidth: "12rem" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={7}
          lg={9}
          sx={{ alignItems: "center", display: "flex" }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={steelPathCompleted}
                onChange={onSteelPathCompletedChange}
                size="small"
              />
            }
            label="All nodes and junctions complete"
            sx={{ mr: 3, "& > span": { fontSize: ".875rem" } }}
          />
        </Grid>
      </Grid>
      <Typography color="text.secondary" fontSize=".875rem" mt={2} maxWidth="75ch">
        Values must be between 0 and 27501 (max amount of mastery available from
        the standard and steel path star charts). Check corresponding box if{" "}
        <Typography component="span" fontWeight="500" fontStyle="italic">
          all
        </Typography>{" "}
        nodes and junctions (excluding railjack and Grendel nodes) are complete,
        otherwise copy value from your in-game profile.
      </Typography>
    </Box>
  )
}

export default StarChartMastery
