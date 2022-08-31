import React from "react"

import { Card, Grid, TextField } from "@mui/material"

const ChecklistFilterPanel = ({ textFilter, setTextFilter }) => {
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
            value={textFilter}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default ChecklistFilterPanel
