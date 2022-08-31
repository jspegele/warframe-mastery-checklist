import React, { useContext } from "react"

import {
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material"

import { FiltersContext } from "../contexts/FiltersContext"
import { ChecklistContext } from "../contexts/ChecklistContext"

const ChecklistFilterPanel = () => {
  const { selectFilters, setValue, startSetValue } =
    useContext(FiltersContext)
  const { selectChecklistId } = useContext(ChecklistContext)
  const filters = selectFilters()
  const listId = selectChecklistId()
  const onTextFilterChange = (e) => setValue("text", e.target.value)

  return (
    <Card sx={{ p: 3, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={10}>
          <TextField
            fullWidth
            onChange={onTextFilterChange}
            label="Filter by name, slot, type, or source"
            size="small"
            value={filters.text}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup row={true}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.hideOwned}
                  onChange={() => startSetValue(listId, "hideOwned", !filters.hideOwned)}
                  size="small"
                />
              }
              label="Hide Owned"
              sx={{ mr: 3 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.hideUnowned}
                  onChange={() => startSetValue(listId, "hideUnowned", !filters.hideUnowned)}
                  size="small"
                />
              }
              label="Hide Unowned"
              sx={{ mr: 3 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.hideMastered}
                  onChange={() => startSetValue(listId, "hideMastered", !filters.hideMastered)}
                  size="small"
                />
              }
              label="Hide Mastered"
              sx={{ mr: 3 }}
            />
          </FormGroup>
        </Grid>
      </Grid>
    </Card>
  )
}

export default ChecklistFilterPanel
