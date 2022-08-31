import React, { useContext } from "react"

import { Card, Grid, TextField } from "@mui/material"

import { FiltersContext } from "../contexts/FiltersContext"

const ChecklistFilterPanel = () => {
  const { selectTextFilter, setTextFilter } = useContext(FiltersContext)
  const onTextFilterChange = (e) => setTextFilter(e.target.value)

  return (
    <Card sx={{ p: 3, width: "100%" }}>
      <Grid container>
        <Grid item xs={12} sm={9} md={10}>
          <TextField
            fullWidth
            onChange={onTextFilterChange}
            label="Filter by name, slot, type, or source"
            size="small"
            value={selectTextFilter()}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default ChecklistFilterPanel
