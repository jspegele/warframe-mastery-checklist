import React, { useContext, useState } from "react"

import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material"

import { ChecklistContext } from "../../contexts/ChecklistContext"

const PlexusCheckbox = () => {
  const { selectPlexusMastery, startSetPlexusMastery } = useContext(ChecklistContext)
  const [plexusMastered, setPlexusMastered] = useState(selectPlexusMastery() > 0)

  const onPlexusMasteredChange = () => {
    setPlexusMastered((prevState) => {
      if (!prevState) startSetPlexusMastery(6000)
      if (prevState) startSetPlexusMastery(0)
      return !prevState
    })
  }

  return (
    <Stack alignItems="center" direction="row">
      <FormControlLabel
        control={
          <Checkbox
            checked={plexusMastered}
            onChange={onPlexusMasteredChange}
            size="small"
          />
        }
        label="Plexus Mastered"
        size="small"
        sx={{ marginRight: "8px", "& > span": { fontSize: ".875rem" } }}
      />
      <Typography component="span" color="text.secondary" fontSize=".875rem">6000 mastery</Typography>
    </Stack>
  )
}

export default PlexusCheckbox
