import React, { useContext } from "react"

import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
} from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"

import { FiltersContext } from "../contexts/FiltersContext"
import { ChecklistContext } from "../contexts/ChecklistContext"

const ChecklistFilterPanel = () => {
  const { selectFilters, setValue, startSetValue } = useContext(FiltersContext)
  const { selectChecklistId } = useContext(ChecklistContext)
  const filters = selectFilters()
  const listId = selectChecklistId()

  const onTextFilterChange = (e) => setValue("text", e.target.value)

  const handleClearInput = () => {
    setValue("text", "")
  }

  const handleMouseDownText = (e) => {
    e.preventDefault()
  }

  return (
    <Card sx={{ p: 3, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9} md={10}>
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-text-filter">
              Filter by name, slot, type, or source
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-text-filter"
              label="Filter by name, slot, type, or source"
              onChange={onTextFilterChange}
              size="small"
              value={filters.text}
              endAdornment={
                !filters.text ? (
                  <></>
                ) : (
                  <InputAdornment position="end">
                    <Tooltip title="Clear filter">
                      <IconButton
                        aria-label="clear text input"
                        edge="end"
                        onClick={handleClearInput}
                        onMouseDown={handleMouseDownText}
                        size="small"
                        sx={{ color: "error.light", marginRight: "-12px" }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row={true}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.hideOwned}
                  onChange={() =>
                    startSetValue(listId, "hideOwned", !filters.hideOwned)
                  }
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
                  onChange={() =>
                    startSetValue(listId, "hideUnowned", !filters.hideUnowned)
                  }
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
                  onChange={() =>
                    startSetValue(listId, "hideMastered", !filters.hideMastered)
                  }
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
